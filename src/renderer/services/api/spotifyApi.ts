import fetch from 'node-fetch';

export async function getBearerToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: '<DELETED>',
      client_secret: '<DELETED>',
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.access_token;
  }
  console.error(
    'Erreur lors de la récupération du bearer token:',
    response.statusText,
  );
  return null;
}

export async function searchAlbums(query: string, bearerToken: string) {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=3`,
    {
      headers: { Authorization: `Bearer ${bearerToken}` },
    },
  );
  const data = await response.json();
  return data.albums.items;
}

export async function getAlbumTracks(albumId: string, bearerToken: string) {
  const response = await fetch(
    `https://api.spotify.com/v1/albums/${albumId}/tracks`,
    {
      headers: { Authorization: `Bearer ${bearerToken}` },
    },
  );
  const data = await response.json();
  return data.items;
}
