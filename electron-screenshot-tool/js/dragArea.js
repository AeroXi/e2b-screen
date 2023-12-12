const { desktopCapturer, screen } = require('electron');

let x, y, width, height;

function dragArea() {
    window.addEventListener('mousedown', (e) => {
        x = e.x;
        y = e.y;
    });

    window.addEventListener('mouseup', (e) => {
        width = e.x - x;
        height = e.y - y;
        takeScreenshot();
    });
}

async function takeScreenshot() {
    const displays = screen.getAllDisplays();
    const wholeSize = displays.reduce((size, display) => {
        size.width += display.bounds.width;
        size.height = Math.max(size.height, display.bounds.height);
        return size;
    }, { width: 0, height: 0 });

    const sources = await desktopCapturer.getSources({
        types: ['screen'],
        thumbnailSize: wholeSize
    });

    const fullImage = sources[0].thumbnail;
    const croppedImage = fullImage.crop({
        x: x,
        y: y,
        width: width,
        height: height
    });

    return croppedImage.toDataURL();
}

module.exports = {
    dragArea: dragArea
};