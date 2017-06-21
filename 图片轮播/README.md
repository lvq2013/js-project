# 一、轮播图实现

  轮播图的应用非常广泛，其实现的原理也比较简单，网络上也有大量关于轮播图实现的方法。这里就具体讲解轮播图的实现方案。

# 二、布局 html

  html部分代码比较简单，其结构主要如下：

```html
<div class="wrap">
    <div class="imglist">
    	<a href="javascript:;"><img src="img-path"></a>
    	......
    </div>
	<div class="idots">
		<span></span>
		......
	</div>
	<div class="btns">
		<span class="prev"></span>
		<span class="next"></span>
	</div>
</div> 
```

> tips：
>
> 设置图片的时候，预设图片要比实际图片多两张，即在第一张图片前放置一张最后一张图片，在最后一张图片后放置一张第一张图片，假设你有5张图片，则放置为：`5 1 2 3 4 5 1`，这样做的目的是为了后面做无限滚动使用。

# 三、样式 css

  页面基本布局这里不再细说，不过你需要注意的是，在设计 `imglist` 宽度的时候，其值应设为：`imgWidth * (imgCount + 2)`，并且将其相对定位，设置`left` 值为`-imgWidth`。`wrap` 设置 `:hover` 下显示按钮。

# 四、实现 JavaScript

## 1、获取元素

   在JavaScript中你需要获取`wrap`、`imglist`、`idots`、`prev` 及`next` 元素节点。

## 2、实现左右切换

  实现左右切换，主要是修改 *oUl.style.left* 的值，其值的变换就是在原来的基础上做一个 `+/-` 图片宽度的操作，这里需要对获取到的*left*值做一个转型parseInt，因为获取到的值带有 *px* 后缀。

```javascript
/**
 * 事件处理
 */
oPrev.onclick = function() {
	tab(-520);
}
oNext.onclick = function() {
	tab(520);
}


/**
 * 函数定义
 */

function tab(offset) {
	var curLeft = getStyle(oUl, 'left');
	oUl.style.left = parseInt(curLeft) + offset + 'px';
}

// 获取非行间样式的值
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}else {
		return getComputedStyle(obj, false)[attr];
	}
}

```

  上述代码中的*getStyle()*函数主要用于获取非行间样式，*tab()*方法封装的是图片的切换。

## 3、无限滚动

  无限滚动直接根据*left*的值判断做一个归位的操作。比如显示第一张图片的时候如果点击上一张则设置left为最后一张的left值，当显示最后一张图片的时候设置left为第一张的left值。这里直接在*tab()*方法中修改即可。

```javascript
function tab(offset) {
	let curLeft = getStyle(oUl, 'left');
	let newLeft = parseInt(curLeft) + offset;
	oImgsBox.style.left = newLeft + 'px';
	
	if (newLeft > -520) {
		oImgsBox.style.left = '-3120px';
	}
	if (newLeft < -3120) {
		oImgsBox.style.left = '-520px';
	}
}
```

## 4、原点与图片同步

  设置*idx*记录图片当前位置的下标，在点击上一张或下一张图片的时候让*idx*自增或自减，但要注意边界值的处理。然后根据idx取到对应的是哪一个小圆点，将对应原点元素添加*class*属性设置为*active*即可，我们已经设置了“ *.active{}*的样式”。在此之前我们还需要清除上一次小圆点的样式。

```javascript
// 定义下标
var curImgIdx = 1;

oPrev.onclick = function() {
	if (curImgIdx == 1) {
		curImgIdx = 6;
	}else {
		curImgIdx--;
	}
	tab(520);
	changeIdots();
}

// 根据点击更新下标值
oNext.onclick = function() {
	if (curImgIdx == 6) {
		curImgIdx = 1;
	}else {
		curImgIdx++;
	}
	tab(-520);
	changeIdots();
}

// 根据下标志修改原点样式
function changeIdots() {
	for (var i = 0; i < aIdots.length; i++) {
        // 异常处理
		if (aIdots[i].className == 'active') {
			aIdots[i].className = '';
			break;
		}
	}
	aIdots[curImgIdx - 1].className = 'active' ;
}
```

## 5、为小圆点添加事件

  遍历小圆点并为其添加点击事件，事件内计算偏移（offset）并调用 *tab()* 方法。*offset* 的计算公式为：`-imgWidth * (destIdx - curIdx)`。异常处理，如果点击当前所在的小圆点，则直接return，不做任何处理。当然，执行完了以后，我们需要更新当前显示图片的下标。代码如下所示：

```javascript
for (var i = 0; i < aIdots.length; i++) {
	aIdots[i].onclick = function() {
		if (this.className == 'active') {
			return;
		}
		var bournIdx = parseInt(this.getAttribute('idx'));
		var offset = -520 * (bournIdx - curImgIdx);
		
		curImgIdx = bournIdx;

		tab(offset);
		changeIdots();
	}
}
```

## 6、动画实现

```javascript
function tab(offset) {
	var desLeft = parseInt(getStyle(oUl, 'left')) + offset;

	var time = 500; // 位移总时间 .5s
	var interval = 15; // 时间间隔
	var speed = Math.ceil(offset/(time/interval)); // 每次位移移动多少
	var t = setInterval(function() {
		if ((speed < 0 && parseInt(getStyle(oUl, 'left')) > desLeft)||(speed > 0 && parseInt(getStyle(oUl, 'left')) < desLeft)) {
			oUl.style.left = parseInt(getStyle(oUl, 'left')) + speed + 'px';
		}else {
			oUl.style.left = desLeft + 'px';
			if (desLeft > -520) {
				oUl.style.left = '-3120px';
			}

			if (desLeft < -3120) {
				oUl.style.left = '-520px';
			}
			clearInterval(t);
			console.log('清除定时器！');
		}
	}, interval);
}
```

## 7、自动轮播

  自动轮播直接设置定时器调用next点击关联方法即可。但是需要注意当鼠标经过或移开需要重启或清除定时器。异常处理，定义布尔值`isAnimating`记录轮播动画状态，如果当前正在执行轮播动画，则不作任何处理，否则用户可以无限点击按钮，导致页面卡死。

```javascript
// 自动轮播
function play() {
	timer = setInterval(function() {
		oNext.onclick();
	}, 3000);
}
// 停止轮播
function stop() {
	clearInterval(timer);
}

oWrap.onmouseover = stop;
oWrap.onmouseout = play;
```























