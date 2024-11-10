export const artistService = {
  async searchArtists(query: string) {
    return await window.electronAPI.ipcRenderer.invoke('search-artists', query);
  },
};
