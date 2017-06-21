/**
 * Created by HuoYu on 2017/5/10.
 */





var contact = {
    aContactList: document.getElementById("contact-list"),
    oCancel: document.getElementById("cancel"),
    oSidePage: document.getElementById("side-page"),
    oIpt: document.getElementById("ipt"),
    oClose: document.getElementById("close"),
    oMask: document.getElementById("mask"),
    oKeyboard: document.getElementById("keyboard"),
    oTransferBox: document.getElementById("transfer-box"),
    oIptMoney: document.getElementById("ipt-money"),
    oTurnMoney: document.getElementById("turn-money"),
    aBlack: document.getElementsByClassName("black-point"),
    oSuccess: document.getElementById("success"),
    oFinish: document.getElementById("finish"),
    oTips: document.getElementById("tips"),
    toName : document.getElementById("toName"),
    toWho : document.getElementById("toWho"),
    lastMoney : document.getElementById("lastMoney"),

};

// 返回到联系人的点击事件
contact.oCancel.onclick = function () {
    contact.oSidePage.style.right = "-100%";
    contact.oIptMoney.value = " ";
};

//点击完成返回主页
contact.oFinish.onclick = function () {
    contact.oSuccess.style.right = "-100%";
    contact.oIptMoney.value = " ";
};



transfer();

function transfer() {

    var $ = new getContact();
    $.getData(function (data) {
        for (var i in data) {
            contact.aContactList.innerHTML += `
             <li class="contact-item">
                <div class="wrap">
                    <img class="dis-ib" src="images/${data[i]['img']}" alt="">
                    <span class="dis-ib">${data[i]["name"]}</span>
                </div>
            </li>`;

        }
        loadPerson(data);
    });
}
var oContactItem = contact.aContactList.children;
var oPerson = document.getElementById("person");
function loadPerson(data) {
    var length = oContactItem.length;
    for (var j = 0; j < length; j++) {
        (function (x) {
            oContactItem[x].onclick = function () {
                contact.oSidePage.style.right = "0";
                oPerson.innerHTML = `<div class="contact-wrap pos-a">
                <p class="imgbox"><img src="images/${data[x]["img"]}" alt=""></p>
                <p><span>${data[x]["name"]}</span></p>
            </div>`;
                loadName(data[x]["name"]);
            }
        })(j);
    }
}
function loadName(name) {
    contact.toName.innerHTML = name;
    contact.toWho.innerHTML = name;
}

window.onload = function () {
    getContact();
}
function getContact() {
    function getItem(callback) {
        var xhr = new XMLHttpRequest();
        var url = "data/contactdata.json";
        xhr.open("GET", url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var str = xhr.responseText;
                var obj = JSON.parse(str);
                callback(obj);
            }
        }
    }

    return {
        getData: getItem
    }
}


//转账按钮
contact.oIpt.onclick = function () {
    for (var k = 0; k < contact.aBlack.length; k++) {
        if (contact.aBlack[k].classList.contains("show")) {
            contact.aBlack[k].classList.remove("show");
        }
    }

    var val = Number(contact.oIptMoney.value);
    if (val === 0 || val < 0 || val ===null) {

    } else {
        contact.oMask.style.display = "block";
        contact.oKeyboard.style.display = "block";
        contact.oTransferBox.style.display = "block";
        //获取转账金额
        contact.oTurnMoney.textContent = val.toFixed(2);
        contact.lastMoney.textContent = val.toFixed(2);
    }
    //调用键盘输入函数
    enterPsw();
};
contact.oClose.onclick = function () {

    contact.oMask.style.display = "none";
    contact.oKeyboard.style.display = "none";
    contact.oTransferBox.style.display = "none";


};

//键盘输入密码
function enterPsw() {
    var oUl = contact.oKeyboard.children[0];
    var aLi = oUl.children;
    var length = aLi.length;
    var arr = [];
    for (var m = 0; m < length - 1; m++) {
        (function (x) {
            aLi[x].onclick = function () {
                var j = 0;
                var pswVal = aLi[x].textContent;
                for (var k = 0; k < contact.aBlack.length; k++) {
                    if (contact.aBlack[k].classList.contains("show")) {
                        j++;
                    }
                }
                if (j < 6) {
                    contact.aBlack[j].classList.add("show");
                    arr.push(pswVal);
                    if (arr.length == 6) {
                        var str = arr.join("");
                        if (str === "123456") {
                            contact.oSidePage.style.right = "-100%";
                            contact.oSuccess.style.right = "0";
                            contact.oTips.style.display = "none";
                            contact.oClose.onclick();
                        }else {
                            contact.oTips.style.display = "block";
                        }
                    }
                }
            }
        })(m);
    }
    aLi[length - 1].onclick = function () {
        var i = 0;
        for (var k = 0; k < contact.aBlack.length; k++) {
            if (contact.aBlack[k].classList.contains("show")) {
                i++;
            }
        }
        if (i - 1 > -1) {
            contact.aBlack[i - 1].classList.remove("show");
            arr.pop();
        }
    }
}




