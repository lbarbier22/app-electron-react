import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'search-albums' | 'search-artists' | 'get-album-tracks';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    invoke(channel: Channels, ...args: unknown[]) {
      return ipcRenderer.invoke(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => func(...args);
      ipcRenderer.on(channel, subscription);
      return () => ipcRenderer.removeListener(channel, subscription);
    },
    insertRating: (trackId: string, rating: number, name: string) => {
      return ipcRenderer.invoke('insert-rating', trackId, rating, name); // Ajout du retour ici
    },
    getRating: (trackId: string) => {
      return ipcRenderer.invoke('get-rating', trackId);
    },
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronHandler);

export type ElectronHandler = typeof electronHandler;
