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

function renderCanvas() {
    renderCanvasImg();
    setTimeout(renderCanvasTxt);
}

function renderCanvasImg() {
    let elStarterImg = document.querySelector('.starter-img');
    elStarterImg.src = `starter-images/${gChosenImg.fileName}.jpg`;
    elStarterImg.onload = function () {
        ctx.drawImage(elStarterImg, 0, 0, 300, 300);
    }
}

function onAddTxt() {
    if (txts.length === 1 && gSelectedTxt.txt == 'lorem') {
        renderSpecTxt(undefined, 150, 75, 15);
        return;
    }
    addTxt();
    renderSpecTxt(undefined, 150, 75, 15);
    document.querySelector('.txt-input').value = 'lorem';
}

function renderSpecTxt(txt = 'lorem', xCoord, yCoord, size) {
    ctx.font = `${size}px Impact`;
    ctx.fillStyle = "white";
    ctx.fillText(txt, xCoord, yCoord);
    ctx.fillStyle = "black";
    ctx.strokeText(txt, xCoord, yCoord);
}

function renderCanvasTxt() {
    for (let i = 0; i < txts.length; i++) {
        renderSpecTxt(txts[i].txt, txts[i].xCoord, txts[i].yCoord, txts[i].size);
    }
}

function changeTxt() {
    let gSelectedId = gSelectedTxt.id;
    let elInput = document.querySelector('.txt-input');
    txts[gSelectedId].txt = elInput.value;
    renderCanvas();
}

function pressDownOnCanvas(X, Y) {
    canvasIsPressed = true;
    gLastX = X;
    gLastY = Y;
}

function endPressOnCanvas() {
    canvasIsPressed = false;
}

function moveOnCanvas(X, Y) {
    if (!canvasIsPressed) return;
    moveInCanvasModel(X, Y);
    renderCanvas();
}

function moveBetweenTexts(diff) {
    gSelectedId = gSelectedTxt.id;
    if (gSelectedId > 0 && gSelectedId < txts.length - 1) {
        gSelectedTxt = txts[gSelectedId + diff];
    } else if (gSelectedId === 0) {
        if (diff < 0) {
            gSelectedTxt = txts[txts.length - 1];
        } else {
            gSelectedTxt = txts[gSelectedId + diff];
        }
    } else {
        if (diff < 0) {
            gSelectedTxt = txts[gSelectedId + diff];
        } else {
            gSelectedTxt = txts[0];
        }
    }
    gSelectedId = gSelectedTxt.id;
    document.querySelector('.txt-input').value = gSelectedTxt.txt;
}

function onDeleteTxt() {
    deleteTxt();
    document.querySelector('.txt-input').value = gSelectedTxt.txt;
    renderCanvas();
}

function onEnlargeSize(value) {
    txts[gSelectedId].size += 5;
    renderCanvas();
}

function onLessenSize(value) {
    txts[gSelectedId].size -= 5;
    renderCanvas();
}

function done() {
    dataURLstring = elCanvas.toDataURL();
    openModal(dataURLstring);
}

function openModal(dataURLstring) {
    document.querySelector('.screen').classList.remove('hide');
    document.querySelector('.modal').classList.remove('hide');
    document.querySelector('.modal > img').src = dataURLstring;
}

function closeModal() {
    document.querySelector('.screen').classList.add('hide');
    document.querySelector('.modal').classList.add('hide');
}

function save() {
    document.querySelector('.save-btn').href = dataURLstring;
}

function share(elShareBtn) {
    let elFinishedMeme = document.querySelector('.finished-meme');
    let u = elFinishedMeme.src;
    let t = elFinishedMeme.getAttribute('alt');
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(u));
    return false;
}
setTimeout(() => {
    elCanvas.addEventListener('touchstart', function (event) {
        pressDownOnCanvas(event.touches[0].clientX, event.touches[0].clientY);
    });
    elCanvas.addEventListener('touchmove', (event) => {
        moveOnCanvas(event.touches[0].clientX, event.touches[0].clientY);
        event.preventDefault();
    });
    elCanvas.addEventListener('touchend', function () {
        endPressOnCanvas()
    });
}, 300);