import { execFileSync } from 'node:child_process';

const args = new Set(process.argv.slice(2));
const getArgValue = (name, fallback) => {
  const prefix = `${name}=`;
  const match = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : fallback;
};

const days = Number(getArgValue('--days', '14'));
const limit = Number(getArgValue('--limit', '12'));
const sort = getArgValue('--sort', 'recent');
const outputJson = args.has('--json');
const compare = args.has('--compare');
const rotationPlaylist = getArgValue('--rotation-playlist', 'Heavy Rotation');

if (!Number.isFinite(days) || days <= 0) {
  throw new Error('Expected --days to be a positive number.');
}

if (!Number.isFinite(limit) || limit <= 0) {
  throw new Error('Expected --limit to be a positive number.');
}

if (!['recent', 'score', 'track-count'].includes(sort)) {
  throw new Error('Expected --sort to be "recent", "score", or "track-count".');
}

const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;

const jxaScript = String.raw`
function readString(value) {
  try {
    return value() || '';
  } catch (_error) {
    return '';
  }
}

function readNumber(value) {
  try {
    return value() || 0;
  } catch (_error) {
    return 0;
  }
}

function run(argv) {
  const cutoff = Number(argv[0]);
  const rotationPlaylistName = argv[1];
  const Music = Application('Music');
  const library = Music.libraryPlaylists[0];
  const rotationTracks = Music.playlists.byName(rotationPlaylistName).tracks();
  const rotationTrackRanks = {};

  for (let index = 0; index < rotationTracks.length; index += 1) {
    const persistentId = readString(rotationTracks[index].persistentID);
    if (persistentId) rotationTrackRanks[persistentId] = index + 1;
  }

  const tracks = library.tracks.whose({ playedDate: { _greaterThan: new Date(cutoff) } })();
  const recentTracks = [];
  const recentTrackIds = {};

  for (let index = 0; index < tracks.length; index += 1) {
    const track = tracks[index];
    let playedDate;

    try {
      playedDate = track.playedDate();
    } catch (_error) {
      continue;
    }

    if (!playedDate) continue;

    const playedAt = new Date(playedDate).getTime();
    if (!Number.isFinite(playedAt)) continue;

    const album = readString(track.album).trim();
    const trackArtist = readString(track.artist).trim();
    const albumArtist = readString(track.albumArtist).trim();
    const artist = albumArtist || trackArtist;

    if (!album || !artist) continue;

    const persistentId = readString(track.persistentID);
    if (persistentId) recentTrackIds[persistentId] = true;

    recentTracks.push({
      album,
      artist,
      track: readString(track.name).trim(),
      playedAt: new Date(playedAt).toISOString(),
      playCount: readNumber(track.playedCount),
      rotationRank: rotationTrackRanks[persistentId] || 0,
    });
  }

  for (let index = 0; index < rotationTracks.length; index += 1) {
    const track = rotationTracks[index];
    const persistentId = readString(track.persistentID);
    if (persistentId && recentTrackIds[persistentId]) continue;

    const album = readString(track.album).trim();
    const trackArtist = readString(track.artist).trim();
    const albumArtist = readString(track.albumArtist).trim();
    const artist = albumArtist || trackArtist;
    if (!album || !artist) continue;

    recentTracks.push({
      album,
      artist,
      track: readString(track.name).trim(),
      playedAt: '',
      playCount: readNumber(track.playedCount),
      rotationRank: index + 1,
    });
  }

  return JSON.stringify(recentTracks);
}
`;

const rawOutput = execFileSync(
  'osascript',
  ['-l', 'JavaScript', '-e', jxaScript, String(cutoff), rotationPlaylist],
  { encoding: 'utf8', maxBuffer: 1024 * 1024 * 20 },
);

const tracks = JSON.parse(rawOutput);
const albumsByKey = new Map();
const now = Date.now();

for (const track of tracks) {
  const key = `${track.album.toLocaleLowerCase()}\u0000${track.artist.toLocaleLowerCase()}`;
  const existing = albumsByKey.get(key);

  if (!existing) {
    albumsByKey.set(key, {
      album: track.album,
      artist: track.artist,
      lastPlayed: track.playedAt,
      recentTrackCount: track.playedAt ? 1 : 0,
      totalPlayCount: track.playCount,
      latestTrack: track.track,
      playedAt: track.playedAt ? [track.playedAt] : [],
      rotationTrackCount: track.rotationRank ? 1 : 0,
      rotationRank: track.rotationRank || Infinity,
    });
    continue;
  }

  if (track.playedAt) existing.recentTrackCount += 1;
  existing.totalPlayCount += track.playCount;
  if (track.playedAt) existing.playedAt.push(track.playedAt);
  if (track.rotationRank) {
    existing.rotationTrackCount += 1;
    existing.rotationRank = Math.min(existing.rotationRank, track.rotationRank);
  }

  if (track.playedAt && track.playedAt > existing.lastPlayed) {
    existing.lastPlayed = track.playedAt;
    existing.latestTrack = track.track;
  }
}

const albums = Array.from(albumsByKey.values())
  .map((album) => {
    const weightedRecentTrackCount = album.playedAt.reduce((total, playedAt) => {
      const daysSincePlayed = Math.max(
        0,
        (now - new Date(playedAt).getTime()) / (24 * 60 * 60 * 1000),
      );

      return total + Math.max(0, 1 - daysSincePlayed / days);
    }, 0);

    return {
      album: album.album,
      artist: album.artist,
      lastPlayed: album.lastPlayed,
      recentTrackCount: album.recentTrackCount,
      totalPlayCount: album.totalPlayCount,
      latestTrack: album.latestTrack,
      weightedRecentTrackCount: Math.round(weightedRecentTrackCount * 100) / 100,
      rotationTrackCount: album.rotationTrackCount,
      rotationRank: Number.isFinite(album.rotationRank) ? album.rotationRank : undefined,
      score: Math.round(weightedRecentTrackCount * album.recentTrackCount * 100) / 100,
    };
  })
  .sort((a, b) => {
    if (sort === 'score') {
      return b.score - a.score || b.lastPlayed.localeCompare(a.lastPlayed);
    }

    if (sort === 'track-count') {
      return b.recentTrackCount - a.recentTrackCount || b.lastPlayed.localeCompare(a.lastPlayed);
    }

    return b.lastPlayed.localeCompare(a.lastPlayed);
  })
  .slice(0, compare ? Infinity : limit);

function capAlbumsPerArtist(candidates, maxPerArtist = 2) {
  const artistCounts = new Map();

  return candidates.filter((album) => {
    const artist = album.artist.toLocaleLowerCase();
    const count = artistCounts.get(artist) ?? 0;
    if (count >= maxPerArtist) return false;
    artistCounts.set(artist, count + 1);
    return true;
  });
}

function printRanking(title, candidates) {
  console.log(`\n${title}`);

  candidates.slice(0, limit).forEach((album, index) => {
    console.log(`${index + 1}. ${album.album} - ${album.artist}`);
    console.log(`   recent tracks: ${album.recentTrackCount}, weighted: ${album.weightedRecentTrackCount}, heavy rotation tracks: ${album.rotationTrackCount}, playlist rank: ${album.rotationRank ?? '-'}, current score: ${album.score}`);
  });
}

if (compare) {
  const byCurrentScore = [...albums]
    .filter((album) => album.recentTrackCount > 0)
    .sort((a, b) => b.score - a.score || b.lastPlayed.localeCompare(a.lastPlayed));
  const byLinearRecency = [...albums]
    .filter((album) => album.recentTrackCount > 0)
    .sort((a, b) => b.weightedRecentTrackCount - a.weightedRecentTrackCount || b.lastPlayed.localeCompare(a.lastPlayed));
  const sourceCandidates = capAlbumsPerArtist(
    albums
      .sort((a, b) => {
        const rotationDifference = Number(b.rotationTrackCount > 0) - Number(a.rotationTrackCount > 0);
        if (rotationDifference) return rotationDifference;
        if (a.rotationTrackCount && b.rotationTrackCount) {
          return b.rotationTrackCount - a.rotationTrackCount || a.rotationRank - b.rotationRank;
        }
        return b.weightedRecentTrackCount - a.weightedRecentTrackCount || b.lastPlayed.localeCompare(a.lastPlayed);
      }),
  );

  console.log(`Found ${tracks.length} recent and ${rotationPlaylist} candidate tracks.`);
  console.log(`Comparing ${limit}-album selections using “${rotationPlaylist}” as the rotation playlist.`);
  printRanking('CURRENT: quadratic album-breadth score', byCurrentScore);
  printRanking('LINEAR: recency-weighted distinct tracks', byLinearRecency);
  printRanking('SOURCE: Heavy Rotation albums first, recent albums as fallback, max 2 per artist', sourceCandidates);
} else if (outputJson) {
  console.log(JSON.stringify(albums, null, 2));
} else {
  console.log(`Found ${tracks.length} recent and ${rotationPlaylist} candidate tracks.`);
  const sortLabel = {
    recent: 'latest played track',
    score: 'heavy-rotation score',
    'track-count': 'recent track count',
  }[sort];

  console.log(`Showing ${albums.length} albums sorted by ${sortLabel}.\n`);

  albums.forEach((album, index) => {
    console.log(`${index + 1}. ${album.album} - ${album.artist}`);
    console.log(`   latest: ${album.latestTrack} (${album.lastPlayed})`);
    console.log(`   recent tracks: ${album.recentTrackCount}, aggregate play count: ${album.totalPlayCount}, score: ${album.score}`);
  });
}
