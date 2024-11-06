import { trackService } from "../../renderer/services/trackService";
import { Track } from "../models/track";

export async function fetchTracks(query: string): Promise<Track[]> {
  return await trackService.searchTracks(query);
}
