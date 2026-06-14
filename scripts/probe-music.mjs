import { execFileSync } from 'node:child_process';

const args = new Set(process.argv.slice(2));
const getArgValue = (name, fallback) => {
  const prefix = `${name}=`;
  const match = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : fallback;
};

const days = Number(getArgValue('--days', '90'));
const limit = Number(getArgValue('--limit', '12'));
const sort = getArgValue('--sort', 'recent');
const outputJson = args.has('--json');

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
  const Music = Application('Music');
  const library = Music.libraryPlaylists[0];
  const tracks = library.tracks.whose({ playedDate: { _greaterThan: new Date(cutoff) } })();
  const recentTracks = [];

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

    recentTracks.push({
      album,
      artist,
      track: readString(track.name).trim(),
      playedAt: new Date(playedAt).toISOString(),
      playCount: readNumber(track.playedCount),
    });
  }

  return JSON.stringify(recentTracks);
}
`;

const rawOutput = execFileSync(
  'osascript',
  ['-l', 'JavaScript', '-e', jxaScript, String(cutoff)],
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
      recentTrackCount: 1,
      totalPlayCount: track.playCount,
      latestTrack: track.track,
    });
    continue;
  }

  existing.recentTrackCount += 1;
  existing.totalPlayCount += track.playCount;

  if (track.playedAt > existing.lastPlayed) {
    existing.lastPlayed = track.playedAt;
    existing.latestTrack = track.track;
  }
}

const albums = Array.from(albumsByKey.values())
  .map((album) => {
    const daysSincePlayed = Math.max(
      0,
      (now - new Date(album.lastPlayed).getTime()) / (24 * 60 * 60 * 1000),
    );
    const recencyBonus = Math.max(0, days - daysSincePlayed);

    return {
      ...album,
      score: Math.round((album.recentTrackCount * 10 + recencyBonus) * 100) / 100,
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
  .slice(0, limit);

if (outputJson) {
  console.log(JSON.stringify(albums, null, 2));
} else {
  console.log(`Found ${tracks.length} recently played tracks from the last ${days} days.`);
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
