
page({
	id: 'wrap',
	curPage: 1,
	allPage: 10,
	callBack: function(curPage, allPage) {
		var p = document.getElementsByTagName('p')[0];
		p.innerHTML = '当前页：' + curPage + '，总共页：' + allPage;
	}
});
 

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
	var oSpan = document.createElement('span');
	oSpan.innerHTML = '共' + allPage + '页';
	obj.appendChild(oSpan);

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






























