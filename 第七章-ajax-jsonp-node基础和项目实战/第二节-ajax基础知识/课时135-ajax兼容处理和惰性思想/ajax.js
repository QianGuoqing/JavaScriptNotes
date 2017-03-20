/**
 * Created by qianguoqing on 17/3/20.
 */

// createXHR: 兼容所有浏览器
function createXHR() {
    var xhr = null,
        flag = false,
        ary = [
            function () {
                return new XMLHttpRequest;
            },
            function () {
                return new ActiveXObject('Microsoft.XMLHTTP');
            },
            function () {
                return new ActiveXObject('Msxml2.XMLHTTP');;
            },
            function () {
                return new ActiveXObject('Msxml3.XMLHTTP');;
            }
        ];
    for (var i = 0, len = ary.length; i < len; i++) {
        var curFn = ary[i];
        try {
            xhr = curFn();
            // 本次循环获取的方法执行没有出现错误: 说明此方法是想要的,下一次直接执行这个方法即可,
            // 这就需要把createXHR重写为小方法(完成后不需要再判断下面的了,直接退出循环即可)
            createXHR = curFn;
            flag = true;
            break;
        } catch (e) {
            // 本次循环获取的方法执行出现错误: 继续执行下一次的循环
        }
    }
    if (!flag) {
        throw new Error('Your browser does not support Ajax...');
    }
    return xhr;
}
