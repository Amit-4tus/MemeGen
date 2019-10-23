'use strict';

let elCanvas;
let ctx;
let gChosenImg;
let canvasIsPressed = false;
let gId = 0;
let txts = [{id: gId++, txt: 'lorem', xCoord: 150, yCoord: 75}];
let gSelectedTxt = txts[0];
let gSelectedId = gSelectedTxt.id;

function addTxt(txt = 'lorem', xCoord = 150, yCoord = 75) {
    let newTxt = {id: gId++, txt: txt, xCoord: xCoord, yCoord: yCoord};
    txts.push(newTxt);
    return newTxt;
}