const
    {dialog} = require('electron');

module.exports = (ipcMain, window) => {
    ipcMain.on('error', (event, message, title) => {
        const options = {
            type: "none",
            buttons: ["Okay"],
            title: title,
            message: message
        }

        dialog.showMessageBoxSync(window, options);
    })
}