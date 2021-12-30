

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    showOpenDialogSync: (options) => { return ipcRenderer.sendSync('open-dialog', options) },
    getHistory: () => { return ipcRenderer.sendSync('get-history') }
})
