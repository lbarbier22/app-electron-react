import { useEffect, useState } from "react";
import { fetchAlbums } from "../../domain/usecases/fetchAlbum";
import { Album } from "../../domain/models/album";

export function useAlbumSearch(query: string) {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    if (query) {
      fetchAlbums(query).then(setAlbums);
    }
  }, [query]);

  return albums;
}
