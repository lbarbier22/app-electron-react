export const albumService = {
  async searchAlbums(query: string) {
    return window.electronAPI.ipcRenderer.invoke('search-albums', query);
  },
  async searchAlbumsByArtist(query: string) {
    return window.electronAPI.ipcRenderer.invoke(
      'search-albums-by-artist',
      query,
    );
  },
};
