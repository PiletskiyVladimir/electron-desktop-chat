const
    path = require('path'),
    {app, BrowserWindow, Notification} = require('electron'),
    isDev = !app.isPackaged;

app.setAppUserModelId("CryptoGram");

async function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    await win.loadFile('./index.html');
    if (settings.type === 'DEV') win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        await createWindow();
    }
})