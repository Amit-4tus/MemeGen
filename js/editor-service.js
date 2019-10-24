'use strict';

let elCanvas;
let ctx;
let gChosenImg;
let canvasIsPressed = false;
let gId = 0;
let txts = [];
let gSelectedTxt;
let gSelectedId = -1;
let gLastX = 0;
let gLastY = 0;
let dataURLstring;

function addTxt(txt = 'lorem', xCoord = 150, yCoord = 75) {
    let newTxt = { id: gId++, txt: txt, size: '15', xCoord, yCoord};
    txts.push(newTxt);
    gSelectedTxt = newTxt;
    gSelectedId += 1;
    return newTxt;
}

function moveInCanvasModel(X, Y) {
    let xShift = X - gLastX;
    let yShift = Y - gLastY;
    txts[gSelectedId].xCoord = txts[gSelectedId].xCoord + xShift;
    txts[gSelectedId].yCoord = txts[gSelectedId].yCoord + yShift;
    gLastX = X;
    gLastY = Y;
}

// This function deletes the txt that is created due to the mouseclick that is received from the combination of mousedown and mouseup events.
function ignoreClick() {
    txts.pop();
}

function deleteTxt() {
    if (gSelectedId < txts.length - 1) {
        for (let i = gSelectedId + 1; i < txts.length; i++) {
            txts[i].id -= 1;
        }
    }
    txts.splice(gSelectedId, 1);
    if (gSelectedId === 0) return;
    gSelectedId -= 1;
    gSelectedTxt = txts[gSelectedId];

}