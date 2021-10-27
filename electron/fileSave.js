const fs = require('fs');

module.exports = (ipcMain, window) => {
    ipcMain.on('fileSave', (event, privateKey) => {
        fs.writeFileSync('private.pem', privateKey);
    })
}