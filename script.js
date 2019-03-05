const {app, dialog}  = require("electron").remote;
const currentWindow = require('electron').remote.getCurrentWindow();
const fs = require('fs');
const resourcePath = "";



var defaultImgPath, imageHeight, imageWidth;
document.addEventListener("DOMContentLoaded",function(){
    showLoadPictureTextIfEmpty();
    loadHistory();
    document.getElementById("load_pic_text").addEventListener("click",openFilePickerDialog);

    console.log("screen hegit" , window.screen.height, "x" , window.screen.width)
});

function loadHistory(){
    fs.readFile(resourcePath + "history.json", function (err, data) {
        if (err) return console.log(err)
        data = JSON.parse(data);
        if(data.lastPath)defaultImgPath = data.lastPath;
        
    });
}

function openFilePickerDialog(){
    var imagePath = dialog.showOpenDialog(currentWindow, {
        properties: ['openFile'],
        message: "Choose picture location",
        filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }],
        defaultPath: defaultImgPath ? defaultImgPath : app.getPath("pictures")
    });
    if(imagePath)
        setImage(imagePath[0]);
}

function setImage(path){
    document.getElementById("img1").setAttribute("src",path);
    document.getElementById("load_pic_text").classList.add("hidden");
    console.log(document.getElementById("img1").getAttribute("src"));
    var myImage = new Image();
    myImage.name = path;
    myImage.onload = resizeWindowToImage;
    myImage.src = path;

    var history = {};
    history.lastPath = path.substring(0, path.lastIndexOf("\\"));
    defaultImgPath = history.lastPath;
    fs.writeFile(resourcePath + "history.json", JSON.stringify(history), (err) => {
        if (err) return console.log(err)
        
    });
}

function showLoadPictureTextIfEmpty(){
    var imgEle = document.getElementById("img1");
    var image = imgEle.getAttribute("src");
    if(image == null)
        document.getElementById("load_pic_text").classList.remove("hidden");
}

 function resizeWindowToImage() {
    imageHeight = this.height;
    imageWidth = this.width;
    var img = document.getElementById("img1");
    console.log("Image dimension ", imageHeight,"x",imageWidth)
    var screenHeight =  window.screen.height;
    var screenWidth =  window.screen.width;
    var ratio = 1;
    var tooBig = false;
    if(imageHeight > screenHeight){
        ratio = screenHeight / imageHeight;
        tooBig = true;
   }

   if(imageWidth > screenWidth){
    if(screenWidth/imageWidth < ratio)ratio = screenWidth/imageWidth;
    tooBig = true;
   }
console.log(ratio, " ratio")
   ratio*=0.95;
    imageHeight *= ratio;
    imageWidth *= ratio;
    if(tooBig){
        img.height = imageHeight;
        img.width = imageWidth;
    }
    window.resizeTo(imageWidth, imageHeight )
    return true;
  }

