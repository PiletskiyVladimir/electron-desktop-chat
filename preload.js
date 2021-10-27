const {ipcRenderer, contextBridge} = require('electron');

let validIPCChannels = [
    'error',
    'fileSave'
]

contextBridge.exposeInMainWorld('Electron', {
    errors: {
        showError: (channel, message, title) => {
            if (validIPCChannels.includes(channel)) {
                ipcRenderer.send(channel, message, title);
            }
        }
    },
    fileSave: (channel, privateKey) => {
        if (validIPCChannels.includes(channel)) {
            ipcRenderer.send(channel, privateKey);
        }
    }
})