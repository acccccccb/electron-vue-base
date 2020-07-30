// Modules to control application life and create native browser window
const { app, BrowserWindow, screen ,dialog,session,ipcMain,shell,webFrame,Notification,Tray,Menu,net} = require('electron');
const path = require('path');
let mainWindow;
let tray = null;
let quit = function(){
    let options = {
        type:'question',
        title:'关闭确认',
        message:'确定要关闭应用吗？',
        buttons:['确定','取消'],
        cancelId:2
    };
    dialog.showMessageBox(mainWindow,options).then((res)=>{
        if(res.response===0) {
            mainWindow.close();
        }
    });
};
let creatTray = function(){
    tray = new Tray(__dirname + '/favicon.ico');
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '显示主窗口', type: 'normal',visible:false ,click:function(){
                contextMenu.items[0].visible = false;
                contextMenu.items[1].visible = true;
                mainWindow.show();
            }
        },
        {
            label: '隐藏主窗口', type: 'normal',visible:true ,click:function(){
                contextMenu.items[0].visible = true;
                contextMenu.items[1].visible = false;
                mainWindow.hide();
            }
        },
        {
            label: '打开调试窗口', type: 'normal' ,click:function(){
                mainWindow.webContents.openDevTools();
            }
        },
        {
            label: '置顶', type: 'checkbox',checked:mainWindow.isAlwaysOnTop() ,click:function(){
                mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop());
                let result = mainWindow.isAlwaysOnTop()?'isTop':'isNotTop';
                mainWindow.webContents.send('windowReplay',result);
            }
        },
        {
            label: '退出', type: 'normal' ,click:function(){
                quit();
            }
        },
    ]);
    tray.setToolTip('鼠标放在托盘上显示的文字');
    tray.setContextMenu(contextMenu);
    // 托盘单击事件
    tray.on('balloon-click',function(){

    });
    // 托盘双击事件
    tray.on('double-click',function(){
        if(!mainWindow.isVisible()) {
            mainWindow.show();
        }
    });
};
let createWindow = function() {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({
      show:false,
      width: 800,
      height: 600,
      frame:false,
      resizable: false,
      fullscreenable:false,
      maximizable:false,
      transparent:true,
      // backgroundColor:'#ffffff',
      webPreferences: {
          devTools:true,
          enableRemoteModule:true,
          webSecurity:false,
          allowRunningInsecureContent:true,
          preload: path.join(__dirname, 'preload.js')
      }
  });
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        creatTray();
    });
    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:8080',{
        userAgent:'electron'
    });
    // mainWindow.loadFile('./dist/index.html');
    // mainWindow.webContents.on('did-finish-load', function(){
    //     console.log('did-finish-load');
    // });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
  createWindow();
    // 在主进程中.
    ipcMain.on('window', (event, arg) => {
        let result = arg;
        if(arg==='quit') {
            quit();
        }
        if(arg==='show') {
            mainWindow.show();
        }
        if(arg==='hide') {
            mainWindow.hide();
        }
        if(arg==='top') {
            result = mainWindow.isAlwaysOnTop()?'isNotTop':'isTop';
            mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop());
        }
        event.reply('windowReplay', result);
    });
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
      tray.destroy();
      app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
