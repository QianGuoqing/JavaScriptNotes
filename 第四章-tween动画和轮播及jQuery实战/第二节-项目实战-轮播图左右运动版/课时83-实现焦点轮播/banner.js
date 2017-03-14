/**
 * Created by qianguoqing on 17/3/14.
 */
~function () {
    var banner = document.getElementById('banner');
    var bannerInner = utils.firstChild(banner);
    var bannerTip = document.getElementsByClassName('bannerTip')[0];
    var imgList = bannerInner.getElementsByTagName('img');
    var oLis = bannerTip.getElementsByTagName('li');

    // 1. 实现数据绑定: Ajax请求数据、
    var jsonData = null;
    var count = null;
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
            // -> 为了实现无缝滚动，需要把第一张图片克隆一份一模一样的放在末尾
            str += '<div><img src="" trueImg="' + jsonData[0]['img'] + '"></div>';
        }
        bannerInner.innerHTML = str;
        count = (jsonData.length) + 1;
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

    // 4. 实现自动轮播
    var step = 0; // -> 记录的是步长，当前是哪一张图片，0是第一张图片
    var interval = 1000;
    var autoTimer = window.setInterval(autoMove, interval);
    function autoMove() {
        if (step >= (count - 1)) {
            step = 0;
            utils.css(bannerInner, 'left', 0);
            return;
        }
        step++;
        zhufengAnimate(bannerInner, {left: -step*1000});
        changeTip();
    }
    // 第一张图片 step = 0, 2000, step = 1 -> move to -1000
    // 第二张图片 step = 1, 2000, step = 2 -> move to -2000

    // 5. 实现焦点对对齐
    function changeTip() {
        var tmpStep = step > oLis.length - 1 ? 0 : step;
        for (var i = 0; i < oLis.length; i++) {
            var curLi = oLis[i];
            i === step ? utils.addClass(curLi, 'bg') : utils.removeClass(curLi, 'bg');
        }
    }

    // 6. 停止和开启自动轮播
    banner.onmouseover = function () {
        window.clearInterval(autoTimer);
    }
    banner.onmouseout = function () {
        autoTimer = window.setInterval(autoMove, interval);
    }

   // 7. 点击焦点实现轮播图切换
    ~function () {
        for (var i = 0; i < oLis.length; i++) {
            var curLi = oLis[i];
            i === step ? utils.addClass(curLi, 'bg') : utils.removeClass(curLi, 'bg');
            curLi.index = i;
            curLi.onclick = function () {
                step = this.index;
                changeTab();
                zhufengAnimate(bannerInner, {left:-step*1000}, 500);
            }
        }
    }();
}();