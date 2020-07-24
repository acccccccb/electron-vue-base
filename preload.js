// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
global.electron = require('electron');
global.ipcRenderer = require('electron').ipcRenderer;
global.address = require('address');
global.child_process = require('child_process');
global.iconv = require('iconv-lite');
global.os = require('os');
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
});
