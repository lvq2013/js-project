/**
 * Created by LiHongyao on 2017/4/18.
 */


let oBtn = document.getElementById('backToBtn');
let offset = 0;

// events
addEvent(window, 'scroll', function() {
    // 为window添加一个scroll的方法，
    // 通过scrollTop获得滚动距离
    // document.documentElement.scrollTop
    // document.body.scrollTop（兼容 chrome）
    offset = document.documentElement.scrollTop || document.body.scrollTop;
    if (offset > 200) {
        oBtn.style.display = 'block';
    }else {
        oBtn.style.display = 'none';
    }
});

addEvent(oBtn, 'click', function() {
    let duration = 500;
    let interval = 15;
    let speed    = Math.ceil(offset / (duration / interval));

    let t = setInterval(function () {
        if(offset > 0) {
            document.documentElement.scrollTop = document.body.scrollTop = offset - speed;
        }else {
            document.documentElement.scrollTop = document.body.scrollTop = 0;
            clearInterval(t);
        }
    }, interval);
});


// functions
function addEvent(target, type, callBack) {
    if(target.addEventListener) {
        addEvent = function (target, type, callBack) {
            target.addEventListener(type, callBack, false);
        }
    }else {
        addEvent = function (target, type, callBack) {
            target.attachEvent('on' + type, callBack);
            //必须加上ON的前缀才能生效
        }
    }
    addEvent(target, type, callBack);
}