const {ipcRenderer, contextBridge} = require('electron');

let validIPCChannels = [
    'error',
    'keySave'
]

contextBridge.exposeInMainWorld('Electron', {
    errors: {
        showError: (channel, message, title) => {
            if (validIPCChannels.includes(channel)) {
                ipcRenderer.send(channel, message, title);
            }
        }
    },
    files: {
        keySave: (channel, key, type) => {
            if (validIPCChannels.includes(channel)) {
                ipcRenderer.send(channel, key, type);
            }
        }
    }
})