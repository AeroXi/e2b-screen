const { ipcRenderer, clipboard } = require('electron');
const { dialog } = require('electron').remote;
const fs = require('fs');
const path = require('path');

ipcRenderer.on('capture', (event, rect) => {
  capture(rect);
});

function capture(rect) {
  const screenshotPath = dialog.showSaveDialogSync({
    buttonLabel: 'Save screenshot',
    defaultPath: path.join(__dirname, 'screenshot.png')
  });

  if (screenshotPath) {
    const img = clipboard.readImage();
    const imgCrop = img.crop(rect);
    const imgBuf = imgCrop.toPNG();

    fs.writeFile(screenshotPath, imgBuf, err => {
      if (err) {
        console.log('Failed to save screenshot', err);
      } else {
        console.log('Screenshot saved successfully');
      }
    });
  }
}