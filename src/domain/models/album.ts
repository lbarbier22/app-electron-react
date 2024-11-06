// src/core/models/album.ts
export interface Album {
  id: string;
  name: string;
  artists: { name: string }[];
  images: { url: string }[];
  release_date: string;
  total_tracks: number;
}
