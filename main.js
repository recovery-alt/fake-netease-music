/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const { join } = require('path');

const isMac = process.platform !== 'darwin';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 680,
    titleBarStyle: 'hidden',
    show: false,
    webPreferences: {
      contextIsolation: false,
      enableRemoteModule: false,
      webSecurity: true,
      nodeIntegration: true,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();
    isDev && mainWindow.webContents.openDevTools();
  });

  mainWindow.on('close', e => {
    e.preventDefault();
    mainWindow.hide();
  });

  isDev
    ? mainWindow.loadURL('http://localhost:3000')
    : mainWindow.loadFile(join(__dirname, 'dist/index.html'));

  return mainWindow;
}

app.whenReady().then(() => {
  const mainWindow = createWindow();

  app.on('activate', () => {
    mainWindow.show();
  });

  app.on('before-quit', () => {
    mainWindow.close();
    app.quit();
  });
});

app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});
