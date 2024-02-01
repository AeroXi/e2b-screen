const { ipcRenderer } = require('electron');

ipcRenderer.on('register-shortcut', () => {
    ipcRenderer.send('register-shortcut-success', {
        success: true,
        message: 'Shortcut registered successfully'
    });
});

ipcRenderer.on('unregister-shortcut', () => {
    ipcRenderer.send('unregister-shortcut-success', {
        success: true,
        message: 'Shortcut unregistered successfully'
    });
});