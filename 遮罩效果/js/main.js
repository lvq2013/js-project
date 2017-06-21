/**
 * Created by LiHongyao on 2017/4/17.
 */

let oClickBtn   = document.getElementById('clickBtn');
let oCloseBtn   = document.getElementById('closeBtn');
let oContentBox = document.getElementById('content-box');


let sWidth = document.body.clientWidth;
let sHeight = document.body.clientHeight;

// create mask
let oMask = document.createElement('div');
oMask.style.cssText = `width: ${sWidth}px; height: ${sHeight}px;`;
oMask.className = 'mask';

// events
oClickBtn.onclick = function() {
    document.body.insertBefore(oMask, document.scripts[0]);
    oContentBox.style.display = 'table';
}
oCloseBtn.onclick = function () {
    document.body.removeChild(oMask);
    oContentBox.style.display = 'none';
}

















