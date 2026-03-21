import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
const api = {
  sendDirectory: (data) => ipcRenderer.send('sidebarSendFiles', data),
  getDirectory: (callback) => ipcRenderer.on('sidebarGetFiles', (event, data) => {
    console.log(data);
    callback(data)
  })
}


try {
  contextBridge.exposeInMainWorld('electron', electronAPI)
  contextBridge.exposeInMainWorld('api', api)
} catch (error) {
  console.error(error)
}
