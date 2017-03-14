/**
 * Created by qianguoqing on 17/3/13.
 */
~function () {
    var qianEffect = {
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        }
    };

    // -> move: 实现多方向的运动动画
    // -> curEle: 当前要运动的元素
    // -> target: 当前动画的目标位置,存储的是每一个方向的目标位置{left: xxx; top: xxx; ..}
    function move(curEle, target, duration, callback) {
        // -> 在每一次执行方法之前，首先把当前元素正在运行的动画结束掉
        window.clearInterval(curEle.qianTimer);

        // -> 根据target获取每一个方向上的起始值begin和总距离change
        var begin = {}, change = {};
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                begin[key] = utils.css(curEle, key);
                change[key] = target[key] - begin[key];
            }
        }

        // -> 实现多方向运动的动画
        var time = 0;
        curEle.qianTimer = window.setInterval(function () {
            time += 10;
            // -> 到达目标: 结束目标，让当前元素的样式等于目标样式值
            if (time >= duration) {
                utils.css(curEle, target);
                window.clearInterval(curEle.qianTimer);
                // 在动画结束的时候，如果用户把回调函数传递了，就把那个函数执行
                // typeof callback === 'function' ? callback() : null;
                // 不仅执行，还让回调函数中的this变为当前要操作的元素
                callback && callback.call(curEle);
                return;
            }
            // -> 没到达目标: 分别的获取每一个方向的当前位置，给当前元素设置样式即可
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    var curPos = qianEffect.Linear(time, begin[key], change[key], duration);
                    utils.css(curEle, key, curPos);
                }
            }
        }, 10);
    }

    window.qianAnimate = move;
}();