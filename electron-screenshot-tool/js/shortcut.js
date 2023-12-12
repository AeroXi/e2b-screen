const { globalShortcut } = require('electron')

function registerShortcut(win) {
    globalShortcut.register('F6', () => {
        win.webContents.send('capture', 'start');
    });

    globalShortcut.register('CommandOrControl+Shift+X', () => {
        win.webContents.send('capture', 'start');
    });
}

function unregisterShortcut() {
    globalShortcut.unregisterAll();
}

module.exports = {
    registerShortcut,
    unregisterShortcut
}