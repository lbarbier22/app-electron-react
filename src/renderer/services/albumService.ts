export const albumService = {
  async searchAlbums(query: string) {
    return await window.electronAPI.ipcRenderer.invoke('search-albums', query);
  },
};
