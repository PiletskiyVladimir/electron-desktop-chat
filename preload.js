const {ipcRenderer, contextBridge} = require('electron');

let validIPCChannels = [
    'error'
]

contextBridge.exposeInMainWorld('Electron', {
    errors: {
        showError: (channel, message, title) => {
            if (validIPCChannels.includes(channel)) {
                ipcRenderer.send(channel, message, title);
            }
        }
    }
})