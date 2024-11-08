import path from 'path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import initializeDatabase from '../domain/database/initDatabase';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import {
  getAllRatings,
  getRating,
  upsertRating,
} from '../domain/database/queries/ratingQueries';
import {
  getAlbumTracks,
  getBearerToken,
  searchAlbums,
} from '../renderer/services/api/spotifyApi';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

// eslint-disable-next-line no-use-before-define,import/no-mutable-exports
const bearerToken = getBearerToken(); // Stockage du bearer token

const createWindow = async () => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string =>
    path.join(RESOURCES_PATH, ...paths);

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

initializeDatabase().then(() => {
  console.log('getAllRatings:', getAllRatings());
});

ipcMain.handle('insert-rating', async (event, trackId, rating, name) => {
  return upsertRating(trackId, rating, name);
});

ipcMain.handle('get-rating', (event, trackId) => {
  return getRating(trackId);
});

ipcMain.handle('search-albums', async (_, query: string) => {
  return searchAlbums(query, await bearerToken);
});

ipcMain.handle('get-album-tracks', async (_, albumId: string) => {
  return getAlbumTracks(albumId, await bearerToken);
});
