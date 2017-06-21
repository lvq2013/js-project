
function getUserInfo() {
	// 判断本地是否存在用户数组仓库，不存在则创建，存在则直接获取
	var userObj = localStorage.getItem('UserInfo') == undefined ? {users:[], loginstate:false, username:""} : JSON.parse(localStorage.getItem('UserInfo'));
	return userObj;
}

function registerUser(userInfo) {
	// 异常处理
	if (Object.keys(userInfo).length != 0) {
		// 获取用户信息
		var userObj = getUserInfo();

		userObj.users.push(userInfo);
		userObj.loginstate = true;
		userObj.username = userInfo.username;

		// 存储用户信息
		saveUserInfo(userObj)
		alert('恭喜您，注册成功！');
		window.location.href = "../html/index.html";
	}else {

	}
}

function saveUserInfo(userObj) {
	userObj = JSON.stringify(userObj);
	localStorage.setItem('UserInfo', userObj);
}

















