### 一些JS的实例

#### 网页祝福语

​	

```javascript
var S = {
  init: function () {
    var action = window.location.href,
        i = action.indexOf('?a=');

    S.Drawing.init('.canvas');
    document.body.classList.add('body--ready');

    if (i !== -1) {
      S.UI.simulate(decodeURI(action).substring(i + 3));
    } else {
      S.UI.simulate('#rectangle|#countdown 3|The Day is|#Date|The Time Is|#time|迪丽热巴|小姐姐喜欢你|Best Wishes!|#author||');
    }

    S.Drawing.loop(function () {
      S.Shape.render();
    });
  }
};
```

