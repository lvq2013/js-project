/***************************************【DOM 操作】***************************************/

/**
 * 1、获取元素节点
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
 * 2、创建元素节点
 */

function addElement(parentNode, tagName, attr, text, styles) {

    if (!parentNode || !tagName) {
        return undefined;
    }

    var element = document.createElement(tagName);
    // 如果有文本节点，则添加文本节点
    if (text) {
        var text = document.createTextNode(text);
        element.appendChild(text);
    }
    // 如果设置了样式，则添加样式
    if (styles) {
        element.style.cssText = styles;
    }
    // 如果有属性节点，则添加属性节点
    if (attr) {
        for (var attrName of Object.keys(attr)) {
            element.setAttribute(attrName, attr[attrName]);
        }
    }
    parentNode.appendChild(element);
    return element;
}


/**
 * 3、添加class属性
 */
function addClass(el, className) {
    if (!el || !className || (typeof className != 'string') || /^[0-9]/.test(className)) {
        return false;

    }else {
        el.classList.add(className);
        return true;
    }
}

/**
 * 4、删除class属性
 */
function delClass(el, className) {
    if (el.classList.contains(className)) {
        el.remove(className);
    }
    return true;
}

/**
 * 5、事件添加，兼容IE
 */
function addEvent(target, type, callBack) {
    if(target.addEventListener) {
        addEvent = function (target, type, callBack) {
            target.addEventListener(type, callBack, false);
        }
    }else {
        addEvent = function (target, type, callBack) {
            target.attachEvent('on' + type, callBack);
        }
    }
    addEvent(target, type, callBack);
}

/**
 * 6、事件删除，兼容IE
 */
function removeEvent(target, type, callBack){
    if(target.removeEventListener){
        removeEvent = function(target, type, callBack){
            target.removeEventListener(type, callBack, false);
        }
    }else {
        removeEvent = function(target, type, callBack){
            target.detachEvent("on"+type, callBack);
        }
    }
    removeEvent(target, eventType, handler);
}


/**
 * 7、获取非行间样式
 */
function getStyle(obj, attr) {
    // 兼容IE
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }else {
        return getComputedStyle(obj, false)[attr];
    }
}

/***************************************【MATH 】***************************************/
/**
 * 1、获取随机数
 */

Math.random = function(min, max) {
	if (!min || !max || isNaN(min) || isNaN(max)) {
		return -1;
	}else {
		return Math.random() * (max - min) + min;
	}
};

Math.randomInteger = function(min, max) {
	if (!min || !max || isNaN(min) || isNaN(max)) {
		return -1;
	}else {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
};


/***************************************【数据类型】***************************************/
/**
 * 1、获取元素类型
 */

function getType(val) {
	// 获取参数返回类型（肯定是对象）和构造函数类型
	var call = Object.prototype.toString.call(val);
	// 下标开始位置
	var startIdx = call.indexOf(" ") + 1;
	// 下标结束为止
	var endIdx = call.lastIndexOf("\]");
	// 将截取出来的字符串转成小写字母并返回
	return call.slice(startIdx, endIdx).toLowerCase();	
}

/**
 * 2、类型判断
 */
var types = ["Null", "Undefined", "Number", "String", "Object", "Function", "RegExp", "Math", "Date", "Array"];
types.map(function(type){
	this["is" + type] = function(val) {
		return this.getType(val) === type.toLowerCase();
	}
});

/**
 * 3、将字符串转为Unicode编码
 * 
 */
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

/***************************************【BOM 操作】***************************************/
/**
 * 1、页面传值时将location.search的内容转换为对象
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
			var key = decodeURI(arr[0]);
			var val = decodeURI(arr[1]);
			obj[key] = val;
		});
		return obj;
	}
}

/***************************************【异常处理】***************************************/
function assert(expression, message) {
    if (!expression){
        throw {name: 'Assertion Exception', message: message};
    }
}

/***************************************【other】***************************************/
/**
 * 分页
 * opt {
 *    id:'',
 * 	  curPage:..,
 *    allPage:..,
 *    callBack:..
 * }
 */

function page(opt) {
	// 异常处理：判断调用时是否传入id，只在传入id的情况下使用该分页函数
	if (!opt.id || opt.curPage <= 0 || opt.allPage <= 0 || opt.curPage > opt.allPage) {return false};

	// 获取元素及参数，对参数做异常处理
	var obj      = document.getElementById(opt.id);
	var curPage  = opt.curPage  || 1; // 当前页，默认1
	var allPage  = opt.allPage  || 5; // 总页码，默认5
	var callBack = opt.callBack || function(){};

	//【首页】仅在当前页大于等于4，且总页数大于等于6的情况下出现首页
	if (curPage >= 4 && allPage >= 6) {
		var oA = document.createElement('a');
		oA.href = '#1';
		oA.innerHTML = '首页';
		obj.appendChild(oA);
	}

	// 【上一页】在当前页大于等于2的情况下出现上一页
	if (curPage >= 2) {
		var oA = document.createElement('a');
		oA.href = '#' + (curPage - 1);
		oA.innerHTML = '上一页';
		obj.appendChild(oA);
	}

	// 假设页码显示的数量为五个，则分为两种情况
	// 1、总页码小于等于5
	// 2、总页码大于5
	if (allPage <= 5) { // 当总页数少于5个的时候
		for (var i = 1; i <= allPage; i++) {
			var oA = document.createElement('a');
			oA.href = '#' + i;
			if (curPage == i) { // 当前页码不加‘[]’
				oA.innerHTML = i; 
			}else {
				oA.innerHTML = '[' + i + ']';
			}
			obj.appendChild(oA);
		}
	}else { // 当总页数大于5页的时候
		for(var i = 1; i <= 5; i++) {
			var oA = document.createElement('a');
			if (curPage < 3) {  // 当前页小于3，即1、2页时
				oA.href = '#' + i;
				if (curPage == i) {
					oA.innerHTML = i;
				}else {
					oA.innerHTML = '['+ i +']'
				}
			}else if(curPage > allPage - 2){ // 当前页为最后两页时
				oA.href = '#' + (allPage - 5 + i);
				if (curPage == (allPage - 5 + i)) {
					oA.innerHTML = (allPage - 5 + i);
				}else {
					oA.innerHTML = '[' + (allPage - 5 + i) + ']'
				}
			}else {
				oA.href = '#' + (curPage - 3 + i);
				if (i == 3) {
					oA.innerHTML = (curPage - 3 + i);
				}else {
					oA.innerHTML = '[' + (curPage - 3 + i) + ']';
				}
			}
			obj.appendChild(oA);
		}
	}

	// 【下一页】当前页不等于总页码数且总页码数大于等于2的情况下
	if ((allPage - curPage) >= 1)  {
		var oA = document.createElement('a');
		oA.href = '#' + (curPage + 1);
		oA.innerHTML = '下一页';
		obj.appendChild(oA);
	}

	// 【尾页】当总页数比当前页至少大3，且总页码数大于等于6的情况下出现
	if ((allPage - curPage) >= 3 && allPage >= 6) {
		var oA = document.createElement('a');
		oA.href = '#' + allPage;
		oA.innerHTML = '尾页';
		obj.appendChild(oA);
	}

	// 总页码
	var oA = document.createElement('a');
	oA.innerHTML = '共' + allPage + '页';
	obj.appendChild(oA);

	// 执行回调函数
	callBack(curPage, allPage);

	// 为每一个a添加点击事件
	var aA = obj.getElementsByTagName('a');
	for (var i = 0; i < aA.length; i++) {
		aA[i].onclick = function() {
			var curPage = parseInt(this.getAttribute('href').slice(1));
			obj.innerHTML = '';
			page({
				id: opt.id,
				curPage: curPage,
				allPage: allPage,
				callBack: callBack

			});
			// 阻止默认事件
			return false;
		}
	}
}














