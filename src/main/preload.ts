import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'search-albums' | 'get-album-tracks';

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
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronHandler);

export type ElectronHandler = typeof electronHandler;
