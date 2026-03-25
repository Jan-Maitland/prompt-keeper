const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('promptKeeper', {
  copyToClipboard: (text) => ipcRenderer.invoke('clipboard-write', text),
  navigateBrowser: (url) => ipcRenderer.invoke('navigate', url),
  browserBack: () => ipcRenderer.invoke('browser-back'),
  browserForward: () => ipcRenderer.invoke('browser-forward'),
  exportPdf: (prompts) => ipcRenderer.invoke('export-pdf', prompts),
  onUrlChanged: (callback) => ipcRenderer.on('url-changed', (_event, url) => callback(url)),
});
