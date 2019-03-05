const { app, BrowserWindow } = require('electron');
const electron = require("electron");
const MenuItem = electron.MenuItem;
const Menu = electron.Menu;
let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600, frame:false, resizable:true, alwaysOnTop:true, transparent:true})
    // and load the index.html of the app.
    win.loadFile('main.html')
}

app.on('ready', function(){
    createWindow();


})