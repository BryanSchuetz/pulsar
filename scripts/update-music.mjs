import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const getArgValue = (name, fallback) => {
  const prefix = `${name}=`;
  const match = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : fallback;
};

const days = Number(getArgValue('--days', '90'));
const limit = Number(getArgValue('--limit', '12'));
const outputPath = getArgValue('--output', 'src/content/music/recent-albums.json');
const candidateLimit = limit * 4;

if (!Number.isFinite(days) || days <= 0) {
  throw new Error('Expected --days to be a positive number.');
}

if (!Number.isFinite(limit) || limit <= 0) {
  throw new Error('Expected --limit to be a positive number.');
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

function getRecentlyPlayedTracks() {
  const rawOutput = execFileSync(
    'osascript',
    ['-l', 'JavaScript', '-e', jxaScript, String(cutoff)],
    { encoding: 'utf8', maxBuffer: 1024 * 1024 * 20 },
  );

  return JSON.parse(rawOutput);
}

function groupAlbums(tracks) {
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

  return Array.from(albumsByKey.values())
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
    .sort((a, b) => b.score - a.score || b.lastPlayed.localeCompare(a.lastPlayed))
    .slice(0, candidateLimit);
}

function normalize(value) {
  return value
    .toLocaleLowerCase()
    .replace(/\([^)]*\)|\[[^\]]*\]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function artworkUrl(url, size = 600) {
  return url?.replace(/\d+x\d+bb\.(jpg|png|webp)$/i, `${size}x${size}bb.$1`) ?? '';
}

async function searchItunes(album) {
  const params = new URLSearchParams({
    term: `${album.artist} ${album.album}`,
    media: 'music',
    entity: 'album',
    country: 'US',
    limit: '5',
  });

  const response = await fetch(`https://itunes.apple.com/search?${params}`);

  if (!response.ok) {
    throw new Error(`iTunes Search failed for ${album.artist} - ${album.album}: ${response.status}`);
  }

  const payload = await response.json();
  const albumName = normalize(album.album);
  const artistName = normalize(album.artist);
  const results = payload.results ?? [];
  const match = results.find((result) => (
    normalize(result.artistName ?? '') === artistName
    && normalize(result.collectionName ?? '') === albumName
  ));

  return {
    ...album,
    link: match?.collectionViewUrl ?? '',
    image: artworkUrl(match?.artworkUrl100),
    itunesCollectionId: match?.collectionId ? String(match.collectionId) : undefined,
    releaseDate: match?.releaseDate ?? undefined,
  };
}

const tracks = getRecentlyPlayedTracks();
const albums = groupAlbums(tracks);
const enrichedAlbums = (await Promise.all(albums.map(searchItunes)))
  .filter((album) => album.link && album.image)
  .slice(0, limit);

writeFileSync(`${process.cwd()}/${outputPath}`, `${JSON.stringify(enrichedAlbums, null, 2)}\n`);

console.log(`Found ${tracks.length} recently played tracks from the last ${days} days.`);
console.log(`Wrote ${enrichedAlbums.length} albums to ${outputPath}.`);
