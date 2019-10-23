'use strict';

function initGallery() {
    let strHTML = '';
    for (let i = 0; i < gStarterImgs.length; i++) {
        strHTML += `<img class="starter-img" id="${gStarterImgs[i].id}" src="starter-images/${gStarterImgs[i].fileName}.jpg" onclick="onImg(this.id)">`;
    }
    let ElGallery = document.querySelector('.gallery');
    ElGallery.innerHTML = strHTML;
}

function initEditor() {
    gChosenImg = JSON.parse(localStorage.getItem('chosenImg'));
    elCanvas = document.getElementById('canvas');
    ctx = elCanvas.getContext('2d');
    renderCanvasImg();
}

function onImg(imgId) {
    localStorage.setItem('chosenImg', JSON.stringify(gStarterImgs[imgId]));
    window.location = 'editor.html';
}

function renderCanvasImg() {
    let starterImg = document.querySelector('.starter-img');
    starterImg.src = `starter-images/${gChosenImg.fileName}.jpg`;
    starterImg.onload = function () {
        ctx.drawImage(starterImg, 0, 0, 300, 150);
    }
}

function onAddText(txt = 'lorem') {
    ctx.fillText(txt, 150, 75);
    ctx.strokeText(txt, 150, 75);
}

function pressDownOnCanvas() {
    canvasIsPressed = true;
}

function endPressOnCanvas() {
    canvasIsPressed = false;
}

function moveOnCanvas(X, Y) {

}