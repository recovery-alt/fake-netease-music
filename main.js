/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const { join } = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 680,
  });

  isDev
    ? mainWindow.loadURL('http://localhost:3000')
    : mainWindow.loadFile(join(__dirname, 'dist/index.html'));

  isDev && mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
