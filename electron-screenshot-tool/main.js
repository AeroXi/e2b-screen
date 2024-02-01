```javascript
const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  globalShortcut.register('F6', () => {
    mainWindow.webContents.send('shortcut-pressed');
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('register-shortcut', (event, key) => {
  const result = globalShortcut.register(key, () => {
    mainWindow.webContents.send('shortcut-pressed');
  });

  event.returnValue = result;
});

ipcMain.on('unregister-shortcut', (event, key) => {
  const result = globalShortcut.unregister(key);
  event.returnValue = result;
});
```