const { app, BrowserWindow, globalShortcut, dialog } = require('electron');
const path = require('path');
const url = require('url');
const { registerShortcut } = require('./js/shortcut.js');
const { dragArea } = require('./js/dragArea.js');
const { saveScreenshot } = require('./js/saveScreenshot.js');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();
  registerShortcut('F6', () => {
    dragArea(mainWindow, (err, data) => {
      if (err) throw err;
      dialog.showSaveDialog(mainWindow, {
        defaultPath: path.join(app.getPath('desktop'), 'screenshot.png'),
      }, (filename) => {
        if (filename) {
          saveScreenshot(filename, data);
        }
      });
    });
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});