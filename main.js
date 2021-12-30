const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const electron = require("electron");
const MenuItem = electron.MenuItem;
const Menu = electron.Menu;
const path = require("path");
const fs = require('fs');
const resourcePath = "";
let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800, height: 600, 
        frame: false, 
        resizable: false, 
        alwaysOnTop: true, 
        transparent: true, 
        webPreferences: {
           preload: path.join(__dirname, 'preload.js')
        }
    })
    // and load the index.html of the app.
    win.loadFile('main.html')
}

ipcMain.on('open-dialog', function (event, options) {
    event.returnValue = dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), options);
});

ipcMain.on('get-history', function (event) {
    var data = fs.readFileSync(resourcePath + "history.json");
    data = JSON.parse(data);
    event.returnValue = data;
});


app.on('ready', function () {
    setTimeout(function () {
        createWindow();
    }, 1000);
});