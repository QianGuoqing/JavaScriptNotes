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
    if (!curEle['myBind' + eventType]) {
        curEle['myBind' + eventType] = [];
    }

    // 解决重复问题: 每一次自己在往自定义属性对应的容器中添加前，看一下之前是否已经有了，有的话就不用再重新的添加了，同理也不需要往事件池中存储了
    var ary = curEle['myBind' + eventType];
    for (var i = 0; i < ary.length; i++) {
        var cur = ary[i];
        if (cur.photo === eventFn) {
            return;
        }
    }

    curEle['myBind' + eventType].push(tempFn);

    curEle.attachEvent('on' + eventFn, tempFn);
}

function unbind(curEle, eventType, eventFn) {
    if (document.addEventListener) {
        curEle.removeEventListener(eventType, eventFn, false);
        return;
    }

    // -> 拿eventFn到curEle['myBind']这里找到化妆后的结果，找到之后再事件池中化妆后的的结果，找到之后再事件池中把化妆后的结果移出事件池
    var ary = curEle['myBind' + eventType];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i].photo === eventFn) {
            ary.splice(i, 1);
            curEle.detachEvent('on' + eventFn, ary[i]);
            break;
        }
    }
}

// -> 解决顺序问题: 不用浏览器自带的事件池了，而是自己模拟标准浏览器的事件池实现一次

// on: 创建事件池，并且把需要给当前元素绑定的方法依次的增加到事件池中
function on(curEle, eventType, eventFn) {
    if (!curEle['myEvent' + eventType]) {
        curEle['myEvent' + eventType] = [];
    }
    var ary = curEle['myEvent' + eventType];
    for (var i = 0; i < ary.length; i++) {
        var cur = ary[i];
        if (cur === eventFn) {
            return;
        }
    }
    ary.push(eventFn);
    curEle.addEventListener(eventType, run, false); // 执行on的时候，给当前元素绑定了一个点击的行为，当点击的时候执行run方法: run方法中的this是当前元素curEle,并且浏览器run传递一个MouseEvent事件对象
}

// off: 在自己的事件池中把某一个方法移除
function off(curEle, eventType, eventFn) {

}

// run: 只给当前元素的点击行为绑定一个方法run，当触发点击的时候执行的是run方法，在run方法中根据自己存储的顺序分别执行里面的方法
function run(e) {
    e = e || window.event;
    var flag = e.target ? true : false;
    if (!flag) {
        e.target = e.srcElement;
        e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        e.preventDefault = function () {
            e.returnValue = false;
        }
        e.stopPropagation = function () {
            e.cancelBubble = true;
        }
    }

    // 获取自己事件池中绑定的那些方法，并且让这些方法依次的执行
    var ary = e.target['myEvent' + e.type];
    for (var i = 0; i < ary.length; i++) {
        var tempFn = ary[i];
        tempFn.call(e.target);
    }
}