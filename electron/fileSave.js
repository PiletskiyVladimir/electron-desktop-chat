const fs = require('fs');

module.exports = (ipcMain, window) => {
    ipcMain.on('keySave', (event, key, type) => {
        switch (type) {
            case 'public': {
                fs.writeFileSync('./public.pem', key);
                break;
            }
            case 'private': {
                fs.writeFileSync('./private.pem', key);
                break;
            }
        }
    })

    // ipcMain.on('')
}