// result.ts (modèle de type ResultListProps)
import { Album } from './album';
import { Artist } from './artist';

export interface ResultListProps {
  result: Album[] | Artist[];
  onClick: (id: string) => void;
  searchType: 'album' | 'artist';
}
