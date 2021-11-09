const
    {app, BrowserWindow, ipcMain} = require('electron'),
    path = require('path');

app.setName("CryptoGram");

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

let mainWindow;

async function createWindow () {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            preload: path.resolve(app.getAppPath(), 'preload.js')
        }
    })

    await win.loadFile("index.html")
}

app.whenReady().then(createWindow);

// default handlers for macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow = await createWindow();
    }
})

require('./electron/ipcMain')(ipcMain, mainWindow);
require('./electron/fileSave')(ipcMain, mainWindow);