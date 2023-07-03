const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { registerShortcut } = require('./shortcut');
const { takeScreenshot } = require('./screenshot');
const { saveDialog } = require('./saveDialog');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  registerShortcut(mainWindow, 'F6', () => {
    takeScreenshot(mainWindow, (err, data) => {
      if (err) throw err;
      mainWindow.webContents.send('takeScreenshot', data);
    });
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('saveScreenshot', (event, screenshotData) => {
  saveDialog(mainWindow, screenshotData, (err, filePath) => {
    if (err) throw err;
    mainWindow.webContents.send('saveScreenshot', filePath);
  });
});