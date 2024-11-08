// src/core/models/album.ts
import { Track } from './track';

export interface Rating {
  track: Track;
  rating: number;
  name: string;
}

export interface RatingListProps {
  ratings: Rating[];
}
