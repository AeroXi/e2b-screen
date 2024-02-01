```javascript
const { ipcRenderer } = require('electron');
const dragArea = require('./js/dragArea');
const saveScreenshot = require('./js/saveScreenshot');

let selectedArea = null;

ipcRenderer.on('shortcut-pressed', () => {
    selectedArea = dragArea.startDrag();
});

ipcRenderer.on('confirm-pressed', () => {
    if (selectedArea) {
        const screenshot = saveScreenshot.capture(selectedArea);
        saveScreenshot.save(screenshot);
    }
});
```