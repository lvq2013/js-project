/**
 * 获取随机数
 */

{
	var LHY_RANDOM = {
		arbitrary: function(min, max) {
			return Math.random() * (max - min) + min;
		},
		int: function(min, max) {
		  return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}
}


/**
 * 类型判断
 */

{
	var LHY_TYPE = {
	/**
	 * 功能：获取值的数据类型
	 * @param  {AnyObject} val 需要查询类型的值
	 * @return {AnyObject}     [返回对应的数据类型]
	 */
	getType: function(val) {
		// 获取参数返回类型（肯定是对象）和构造函数类型
		var call = Object.prototype.toString.call(val);
		// 下标开始位置
		var startIdx = call.indexOf(" ") + 1;
		// 下标结束为止
		var endIdx = call.lastIndexOf("\]");
		// 将截取出来的字符串转成小写字母并返回
		return call.slice(startIdx, endIdx).toLowerCase();
	}
}
	var types = ["Null", "Undefined", "Number", "String", "Object", "Function", "RegExp", "Math", "Date", "Array"];
	types.map(function(type){
		LHY_TYPE["is" + type] = function(val) {
			return LHY_TYPE.getType(val) === type.toLowerCase();
		}
	});
}

/**
 * 将字符串转为Unicode编码
 * 
 */
{
	Object.prototype.toUnicodeString = function(val) {
		var s = val || this.valueOf() ;
		var numCode = ``;
		var resStr = ``;
		for (var i = 0; i < s.length; i++) {
			numCode = s.charCodeAt(i);
			numCode = numCode.toString(16);
			numCode = '\\u' + numCode;
			resStr += numCode;
		}
		return resStr;
		
	}
}




/**
 * 页面传值时将location.search的内容转换为对象
 */
function locSearchValToObj(searchStr) {
	// 异常处理
	if (searchStr.length == 0) {
		return null;
	}else {
		var str = searchStr.slice(1);
		var strArr = str.split('&');
		var obj = {};
		strArr.forEach(function(item, idx, arr){
			var arr = item.split('=');
			var key = arr[0];
			var val = arr[1];
			obj[key] = val;
		});
		return obj;
	}
}


/**
 * 事件添加，兼容IE
 */
function addEvent(el, event, callback) {
	// 判断当前浏览器是否支持‘addEventListener’
	if ('addEventListener' in el) { // 如果支持，则直接使用‘addEventListener’
		el.addEventListener(event, callback, false);
	}else { // 如果不支持，就执行向下兼容的代码
		// 向下兼容的代码必须添加两个方法到事件处理程序要附加到的元素上。然后在元素上的事件触发时，使用attachEvent方法来调用他们
		// 元素触发事件执行方法，提示：方括号用来添加一个方法名到元素上，
		el['e' + event + callback] = callback;

		el[event + callback] = function () {
			el['e' + event + callback](window.event);
		};
		el.attachEvent('on' + event, el[event + callback]);
	}
}



/**
 * 获取非行间样式
 */
function getStyle(obj, attr) {
	// 兼容IE
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}else {
		return getComputedStyle(obj, false)[attr];
	}
}



/**
 * 获取元素节点
 */
function $(Selector) {
	// 异常处理
	if (typeof Selector != 'string' || Selector == '' || /\s/.test(Selector) == true) {
		return null;
	}
	if (/^#/.test(Selector) == true) {
		return document.getElementById(Selector.slice(1));
	}
	if (/^\./.test(Selector) == true) {
		return document.getElementsByClassName(Selector.slice(1));
	}
	return document.getElementsByTagName(Selector);
}

/**
 * 创建节点元素
 * @param {[string]} parentNode [父节点]
 * @param {[string]} tag        [子节点（标签）]
 * @param {[string]} text       [文本节点]
 * @param {[object]} attr       [属性节点]
 * @param {[string]} styles     [设置样式]
 */
function addElement(parentNode, tagName, text, attr, styles) {
	if (parentNode == '' || tagName == '') {
		return null;
	}
	var tag = document.createElement(tagName);
	// 如果有文本节点，则添加文本节点
	if (typeof text != undefined) {
		var text = document.createTextNode(text);
		tag.appendChild(text);
	}
	// 如果有属性节点，则添加属性节点
	if (typeof attr != undefined) {
		for (var attrName in attr) {
			tag.setAttribute(attrName, attr[attrName]);
		}
	}
	if (typeof styles != undefined) {
		tag.style.cssText = styles;
	}
	parentNode.appendChild(tag);
}


















