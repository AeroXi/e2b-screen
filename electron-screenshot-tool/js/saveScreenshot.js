const { dialog } = require('electron').remote;
const fs = require('fs');
const path = require('path');

function saveScreenshot(imageData) {
    dialog.showSaveDialog({
        title: 'Save screenshot',
        filters: [
            { name: 'Images', extensions: ['png', 'jpg', 'gif', 'bmp'] }
        ]
    }).then(result => {
        if (!result.canceled) {
            fs.writeFile(result.filePath, imageData.toPNG(), function (err) {
                if (err) throw err;
            });
        }
    }).catch(err => {
        console.log(err)
    });
}

module.exports = saveScreenshot;