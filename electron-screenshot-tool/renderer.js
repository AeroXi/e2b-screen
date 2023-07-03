const { ipcRenderer } = require('electron');
const { shortcut } = require('./shortcut.js');
const { screenshot } = require('./screenshot.js');
const { saveDialog } = require('./saveDialog.js');

let screenshotData = null;

document.getElementById('confirmButton').addEventListener('click', () => {
  if (screenshotData) {
    saveDialog(screenshotData);
  }
});

ipcRenderer.on('takeScreenshot', () => {
  screenshotData = screenshot();
});

ipcRenderer.on('saveScreenshot', (event, path) => {
  if (screenshotData) {
    screenshotData.toPNG().then(data => {
      fs.writeFile(path, data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    });
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === shortcut) {
    ipcRenderer.send('takeScreenshot');
  }
});