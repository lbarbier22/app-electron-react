import { albumService } from '../../renderer/services/albumService';
import { Album } from '../models/album';

export async function fetchAlbumsByArtist(id: string): Promise<Album[]> {
  return albumService.searchAlbumsByArtist(id);
}
