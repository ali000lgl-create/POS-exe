const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.maximize();
  win.loadFile('pos-system.html');

  // أمر فحص التحديثات بمجرد فتح البرنامج
  win.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// إعدادات التحديث التلقائي
autoUpdater.on('update-available', () => {
  console.log('يوجد تحديث جديد، يتم التحميل الآن في الخلفية...');
});

autoUpdater.on('update-downloaded', () => {
  console.log('تم تحميل التحديث بنجاح. سيتم تثبيته عند إغلاق البرنامج.');
});
