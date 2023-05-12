const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;
let mapWindow;

function createMainWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

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

app.on('ready', createMainWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createMainWindow();
});

// 메인 윈도우에서 버튼 클릭 시 맵 윈도우를 생성합니다.
ipcMain.on('open-map-window', (event, arg) => {
  createMapWindow();
});

// 맵 윈도우에서 버튼 클릭 시 메인 윈도우를 생성합니다.
ipcMain.on('open-main-window', (event, arg) => {
  createMainWindow();
});
