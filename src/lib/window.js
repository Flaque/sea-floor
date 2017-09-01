const { app, BrowserWindow, ipcMain } = require("electron");

const WINDOW_DEFAULTS = {
  width: 800,
  height: 600,
  show: false
};

function createWindow(url, windowOptions) {
  // Override the defaults with the user's options
  windowOptions = windowOptions === undefined ? {} : windowOptions;
  let finalOptions = Object.apply({}, WINDOW_DEFAULTS, windowOptions);

  const mainWindow = new BrowserWindow(finalOptions);
  mainWindow.loadURL(url);
  return mainWindow;
}

module.exports = createWindow;
