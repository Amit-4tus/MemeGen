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
    renderCanvas();
}

function onImg(imgId) {
    localStorage.setItem('chosenImg', JSON.stringify(gStarterImgs[imgId]));
    window.location = 'editor.html';
}

function renderCanvas() {
    renderCanvasImg();
    setTimeout(renderCanvasTxt, 100);
}

function renderCanvasImg() {
    let starterImg = document.querySelector('.starter-img');
    starterImg.src = `starter-images/${gChosenImg.fileName}.jpg`;
    starterImg.onload = function () {
        ctx.drawImage(starterImg, 0, 0, 300, 150);
    }
}

function onAddTxt() {
    addTxt();
    renderTxt(undefined, 150, 75);
}

function renderTxt(txt = 'lorem', xCoord, yCoord) {
    ctx.fillText(txt, xCoord, yCoord);
    ctx.strokeText(txt, xCoord, yCoord);
}

function renderCanvasTxt() {
    for (let i = 0; i < txts.length; i++) {
        renderTxt(txts[i].txt, txts[i].xCoord, txts[i].yCoord);
    }
}

function changeTxt() {
    let gSelectedId = gSelectedTxt.id;
    let elInput = document.querySelector('.txt-input');
    txts[gSelectedId].txt = elInput.value;
    elInput.value = '';
    renderCanvas();
}

function pressDownOnCanvas() {
    canvasIsPressed = true;
}

function endPressOnCanvas() {
    canvasIsPressed = false;
}

function moveOnCanvas(X, Y) {
    if (!canvasIsPressed) return;
    console.log('x', X, 'y', Y);
    
    // txts[gSelectedId].xCoord += ;
    // left here ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}

function goToLastTxt() {
    let gSelectedId = gSelectedTxt.id;
    if (gSelectedId > 0) {
        gSelectedTxt = txts[gSelectedId - 1];
    }
    else {
        gSelectedTxt = txts[txts.length - 1];
    }
}

function goToNextTxt() {
    let gSelectedId = gSelectedTxt.id;
    if (gSelectedId === txts.length - 1 && gSelectedId !== 0) {
        gSelectedTxt = txts[0];
    }
    else {
        gSelectedTxt = txts[gSelectedId + 1];
    }
}