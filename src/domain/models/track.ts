// src/core/models/album.ts
export interface Track {
  id: string;
  name: string;
  duration_ms: number;
}

export interface TracksListProps {
  tracks: Track[];
}
