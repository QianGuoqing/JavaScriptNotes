/**
 * Created by qianguoqing on 17/3/14.
 */
~function () {
    var banner = document.getElementById('banner');
    var bannerInner = utils.firstChild(banner);
    var bannerTip = document.getElementsByClassName('bannerTip')[0];
    var imgList = bannerInner.getElementsByTagName('img');

    // 1. 实现数据绑定: Ajax请求数据、
    var jsonData = null;
    ~function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'json/banner.txt', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
               jsonData = JSON.parse(xhr.responseText);
            }
        }
        xhr.send(null);
    }();

    // 2.按照字符串拼接的方式绑定数据
    ~function () {
        // 绑定的是轮播图区域的数据
        var str = '';
        if (jsonData) {
            for (var i = 0, len = jsonData.length; i < len; i++) {
                var curData = jsonData[i];
                str += '<div><img src="" trueImg="' + curData['img'] + '"></div>';
            }
        }
        bannerInner.innerHTML = str;
        //utils.css(bannerInner, 'width', jsonData.length * 1000);

        // 2. 绑定焦点区的数据
        str = '';
        if (jsonData) {
            for (var i = 0, len = jsonData.length; i < len; i++) {
                str += '<li></li>';
            }
        }
        //console.log(str);
        //bannerTip.innerHTML = str;
    }();

    // 3. 实现图片懒加载
    function lazyLoad() {
        for (var i = 0, len = imgList.length; i < len; i++) {
            ~function (i) {
                var curImg = imgList[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute('trueImg');
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = 'block';
                    zhufengAnimate(curImg, {opaicty: 1}, 500);
                    oImg = null;
                }
            }(i);
        }
    }

    window.setTimeout(lazyLoad, 500);
}();