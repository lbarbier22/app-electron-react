// src/core/models/album.ts
import { Album } from './album';

export interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  albums: Album[];
}
