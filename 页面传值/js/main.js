

let isLogin = Boolean(sessionStorage.getItem(`loginstate`));

if (!isLogin) {
	location.href = `login.html`;
}

let obj = locSearchValToObj(location.search);
console.log(obj);

document.body.innerHTML = `
		<p>昵称：${obj.nikname}</p>
		<p>大区：${dobj.area}</p>
		<p>段位：${obj.level}</p>`;





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

































