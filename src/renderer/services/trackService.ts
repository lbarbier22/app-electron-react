export const trackService = {
  async searchTracks(query: string) {
    return await window.electronAPI.ipcRenderer.invoke('get-album-tracks', query);
  },
};
