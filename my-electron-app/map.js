const { app, BrowserWindow, ipcMain } = require('electron');


let mapWindow;

function createMapWindow () {
mapWindow = new BrowserWindow({
    width: 400,
    height: 300,
    parent: mainWindow,
    webPreferences: {
    nodeIntegration: true
    }
});

mapWindow.loadFile('map.html');

mapWindow.on('closed', function () {
    mapWindow = null;
});
}

app.on('ready', createMapWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createMainWindow();
});
