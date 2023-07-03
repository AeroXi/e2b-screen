const { dialog } = require('electron');
const fs = require('fs');

function saveScreenshot(screenshotData) {
  dialog.showSaveDialog({
    title: 'Save screenshot',
    defaultPath: `~/screenshot.png`,
    filters: [
      { name: 'Images', extensions: ['png'] },
    ],
  }).then(result => {
    if (!result.canceled) {
      fs.writeFile(result.filePath, screenshotData, 'base64', function(err) {
        if (err) throw err;
      });
    }
  }).catch(err => {
    console.log(err)
  });
}

module.exports = saveScreenshot;