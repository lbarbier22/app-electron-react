import { Artist } from '../models/artist';
import { artistService } from '../../renderer/services/artistService';

export async function fetchArtists(query: string): Promise<Artist[]> {
  return await artistService.searchArtists(query);
}
