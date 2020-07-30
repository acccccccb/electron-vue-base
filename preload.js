// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
global.electron = require('electron');
global.ipcRenderer = electron.ipcRenderer;
global.Notification = electron.Notification;
global.address = require('address');
global.child_process = require('child_process');
global.iconv = require('iconv-lite');
global.os = require('os');
global.http = require('http');
global.nodeRequest = require('request');
global.axios = require('axios');
global.fetch = require('node-fetch');
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
});
