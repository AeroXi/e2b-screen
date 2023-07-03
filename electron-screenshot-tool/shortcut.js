const { app, globalShortcut } = require('electron')

function registerShortcut(win) {
  globalShortcut.register('F6', () => {
    win.webContents.send('takeScreenshot')
  })

  app.on('will-quit', () => {
    globalShortcut.unregisterAll()
  })
}

module.exports = registerShortcut