// let cmd = 'electron-packager . electron1 --platform=win32 --arch=x64  --out=./pack --asar --app-version=0.0.1 --overwrite';
// export default cmd;
const config = require('./package.json');
const electronPackager = require('electron-packager');
let date = new Date();
let now = date.getFullYear().toString() + (date.getMonth()+1).toString() + date.getDate().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();
electronPackager({
    name:config.name,
    dir:'.',
    icon:'./favicon.ico',
    platform:'win32',
    arch:'x64',
    out:'./pack',
    appVersion:config.version,
    overwrite:true,
    asar:true,
    ignore:/(\/pack\/|\/.idea\/|\/.git\/)/
});
