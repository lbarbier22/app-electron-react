import path from 'path';
import {app, BrowserWindow, ipcMain, shell} from 'electron';
import fetch from 'node-fetch'; // Assurez-vous que node-fetch est installé
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
export let bearerToken = getBearerToken(); // Stockage du bearer token

const createWindow = async () => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => path.join(RESOURCES_PATH, ...paths);

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  new AppUpdater();
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

ipcMain.handle('search-albums', async (_, query: string) => {
  return await searchAlbums(query);
});

ipcMain.handle('get-album-tracks', async (_, albumId: string) => {
  return await getAlbumTracks(albumId);
});

// @ts-ignore
async function getBearerToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': 'ece01d967d6642069f005d077112f7f9',
      'client_secret': 'c408c84aa31d40b1884a07308e9adb36'
    })
  });

  if (response.ok) {
    const data = await response.json();
    // @ts-ignore
    console.log('Search results:', data.access_token);
    // @ts-ignore
    bearerToken = data.access_token
  } else {
    console.error('Search failed:', response.statusText);
  }
}

export async function searchAlbums(query: string) {
  const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=3`, {
    headers: { Authorization: `Bearer ${bearerToken}` },
  });
  const data = await response.json();
  return data.albums.items;
}

export async function getAlbumTracks(albumId: string) {
  const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
    headers: { Authorization: `Bearer ${bearerToken}` },
  });
  const data = await response.json();
  return data.items;
}
