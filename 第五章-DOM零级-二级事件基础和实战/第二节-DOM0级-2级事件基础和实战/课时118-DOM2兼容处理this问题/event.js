/**
 * Created by qianguoqing on 17/3/18.
 */
/*
* bind: 处理DOM2级事件绑定的兼容性问题(绑定方法)
* @parameter:
* curEle -> 要绑定事件的元素
* eventType -> 要绑定的时间类型('click', 'mouseover', ...)
* eventFn -> 要绑定的方法
* */

var tempFn = null;

function bind(curEle, eventType, eventFn) {
    if (document.addEventListener) {
        curEle.addEventListener(eventType, eventFn, false);
        return;
    }

    // 给eventFn化妆，并且把化妆前的照片贴在自己对应的脑门上
    tempFn = function () {
        eventFn.call(curEle);
    }
    tempFn.photo = eventFn;

    // 首先判断该自定义属性之前是否存在，不存在的话就创建一个，由于要存储多个方法化妆后的结果，所以让其值是一个数组
    if (!curEle['myBind']) {
        curEle['myBind'] = [];
    }
    curEle['myBind'].push(tempFn);

    curEle.attachEvent('on' + eventFn, tempFn);
}

function unbind(curEle, eventType, eventFn) {
    if (document.addEventListener) {
        curEle.removeEventListener(eventType, eventFn, false);
        return;
    }

    // -> 拿eventFn到curEle['myBind']这里找到化妆后的结果，找到之后再事件池中化妆后的的结果，找到之后再事件池中把化妆后的结果移出事件池
    var ary = curEle['myBind'];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i].photo === eventFn) {
            curEle.detachEvent('on' + eventFn, ary[i]);
            break;
        }
    }
}