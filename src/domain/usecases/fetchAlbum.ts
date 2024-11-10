import { albumService } from '../../renderer/services/albumService';
import { Album } from '../models/album';

export async function fetchAlbums(query: string): Promise<Album[]> {
  return albumService.searchAlbums(query);
}
