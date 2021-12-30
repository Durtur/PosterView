


var defaultImgPath, imageHeight, imageWidth;
document.addEventListener("DOMContentLoaded", function () {
    showLoadPictureTextIfEmpty();
    loadHistory();
    document.getElementById("load_pic_text").addEventListener("click", openFilePickerDialog);

    console.log("screen hegit", window.screen.height, "x", window.screen.width)
});

//Drag drop
document.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.dataTransfer.files)
    if (event.dataTransfer.files?.length > 0) {
        var f = event.dataTransfer.files[0];
        console.log('File Path of dragged files: ', f.path)
        var path = f.path;
        setImage(path);

    }

});
document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

function loadHistory() {
    var data = window.api.getHistory();
    if (data.lastPath) defaultImgPath = data.lastPath;
}

function openFilePickerDialog() {
    var imagePath = window.api.showOpenDialogSync({
        properties: ['openFile'],
        message: "Choose picture location",
        filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }],
        defaultPath: defaultImgPath ? defaultImgPath : app.getPath("pictures")
    });
    if (imagePath)
        setImage(imagePath[0]);
}

function setImage(imgPath) {
    document.getElementById("img1").setAttribute("src", imgPath);
    document.getElementById("load_pic_text").classList.add("hidden");

    var myImage = new Image();
    myImage.name = imgPath;
    myImage.onload = resizeWindowToImage;
    myImage.src = imgPath;
    console.log(imgPath)
    var history = {};
    history.lastPath = imgPath.substring(0, imgPath.lastIndexOf("\\"));
    defaultImgPath = history.lastPath;
    document.querySelector(".container").style.backgroundColor = "transparent";
}

function showLoadPictureTextIfEmpty() {
    var imgEle = document.getElementById("img1");
    var image = imgEle.getAttribute("src");
    if (image == null)
        document.getElementById("load_pic_text").classList.remove("hidden");
}

function resizeWindowToImage() {
    imageHeight = this.height;
    imageWidth = this.width;
    var img = document.getElementById("img1");
    console.log("Image dimension ", imageHeight, "x", imageWidth)
    var screenHeight = window.screen.height;
    var screenWidth = window.screen.width;
    var ratio = 1;
    var tooBig = false;
    if (imageHeight > screenHeight) {
        ratio = screenHeight / imageHeight;
        tooBig = true;
    }

    if (imageWidth > screenWidth) {
        if (screenWidth / imageWidth < ratio) ratio = screenWidth / imageWidth;
        tooBig = true;
    }
    console.log(ratio, " ratio")
    ratio *= 0.95;
    imageHeight *= ratio;
    imageWidth *= ratio;
    if (tooBig) {
        img.height = imageHeight;
        img.width = imageWidth;
    }
    window.resizeTo(imageWidth, imageHeight)
    return true;
}

