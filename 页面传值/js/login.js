

let nameIpt  = document.getElementById('nameIpt');
let pswIpt   = document.getElementById('pswIpt');
let loginBtn = document.getElementById('loginBtn');


loginBtn.addEventListener('click', function() {
	// 异常处理
	if (!nameIpt.value || !pswIpt.value) {
		alert(`请输入账号密码！`);
		return;
	}
	// 登录判断
	if (nameIpt.value == `Admin` && pswIpt.value == `123`) {
		// 存储登录状态
		sessionStorage.setItem(`loginstate`, true);
		// 传值
		let value = `nikname=群魔觉愁&area=艾欧利亚&level=最强王者`;
		location.href = "index.html" + "?" + value;
	}else {
		alert(`登录失败，请重新输入账号密码！`);
	}

}, false);



































