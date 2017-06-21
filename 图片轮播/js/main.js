

let oWrap   = $(`#wrap`);
let oImgBox = $(`#imglist`);
let oIdots  = $(`#idotlist`).children;
let oPrev   = $(`#prev`);
let oNext   = $(`#next`);

// 记录当前图片的位置
let curImgIdx = 1;
// 记录动画执行状态
let isAnimating = false;
// 定时器
let timer = null; 
// 启动自动播放
play();

// 上一张
oPrev.onclick = function() {
	// 如果动画正在执行，则直接返回，不做任何处理
	if (isAnimating) {
		return;
	}
	if (curImgIdx == 1) {
		curImgIdx = 6;
	}else {
		curImgIdx--;
	}

	tab(520);
	changeIdots();
}
// 下一张
oNext.onclick = function() {
	if (isAnimating) {
		return;
	}
	if (curImgIdx == 6) {
		curImgIdx = 1;
	}else {
		curImgIdx++;
	}
	tab(-520);
	changeIdots();
}

// 为小圆点添加点击事件
for(let i = 0; i < oIdots.length; i++) {
	oIdots[i].idx = i + 1;
	oIdots[i].onclick = function() {

		if (this.idx == curImgIdx || isAnimating) {
			return;
		}
		let offset = -520 * (this.idx - curImgIdx);
		curImgIdx = this.idx;

		tab(offset);
		changeIdots();
		
	}
}

oWrap.onmouseover = stop;
oWrap.onmouseout  = play;



function tab(offset) {
	// 动画持续总时间
	let duration = 500; 
	// 位移动画每一帧持续时间
	let interval = 15;
	// 位移动画每一帧移动的距离
	let speed = Math.ceil(offset/(500/15));
	// 目标偏移量
	let desOffset = parseInt(getStyle(oImgBox, `left`)) + offset;
	let t = setInterval(function() {
		isAnimating = true;
		let curOffset  = parseInt(getStyle(oImgBox, `left`));
		if ((offset < 0 && curOffset > desOffset) || (offset > 0 && curOffset < desOffset)) {
			oImgBox.style.left = curOffset + speed + 'px';
		}else {	
			isAnimating = false;
			oImgBox.style.left = desOffset + 'px';
			if (parseInt(oImgBox.style.left) < -3120) {
				oImgBox.style.left = `-520px`;
			}else if(parseInt(oImgBox.style.left) > -520) {
				oImgBox.style.left = `-3120px`;
			}
			// 动画结束，清除定时器
			clearInterval(t);
			
		}
	}, interval);
}

function changeIdots() {
	for(let i = 0; i < oIdots.length; i++) {
		if (oIdots[i].classList.contains(`selected`)) {
			oIdots[i].classList.remove(`selected`);
			break;
		}
	}
	oIdots[curImgIdx - 1].classList.add(`selected`);
}


function play() {
	timer = setInterval(function() {
		oNext.onclick();
	}, 3000);
}

function stop() {
	clearInterval(timer);
}

























