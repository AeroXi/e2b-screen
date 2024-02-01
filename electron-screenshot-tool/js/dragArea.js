```javascript
const { ipcRenderer, screen } = require('electron');

let dragArea = null;
let startX = 0;
let startY = 0;

ipcRenderer.on('shortcut-pressed', () => {
    if (!dragArea) {
        dragArea = document.createElement('div');
        dragArea.style.position = 'absolute';
        dragArea.style.border = '1px solid #f00';
        document.body.appendChild(dragArea);
    }

    dragArea.style.width = '0px';
    dragArea.style.height = '0px';
    dragArea.style.left = '0px';
    dragArea.style.top = '0px';

    document.onmousedown = (e) => {
        startX = e.pageX;
        startY = e.pageY;

        dragArea.style.width = '0px';
        dragArea.style.height = '0px';
        dragArea.style.left = `${startX}px`;
        dragArea.style.top = `${startY}px`;
    };

    document.onmousemove = (e) => {
        dragArea.style.width = `${Math.abs(e.pageX - startX)}px`;
        dragArea.style.height = `${Math.abs(e.pageY - startY)}px`;
        dragArea.style.left = `${Math.min(e.pageX, startX)}px`;
        dragArea.style.top = `${Math.min(e.pageY, startY)}px`;
    };

    document.onmouseup = () => {
        document.onmousedown = null;
        document.onmousemove = null;
        ipcRenderer.send('area-selected', {
            x: Math.min(e.pageX, startX),
            y: Math.min(e.pageY, startY),
            width: Math.abs(e.pageX - startX),
            height: Math.abs(e.pageY - startY)
        });
    };
});
```