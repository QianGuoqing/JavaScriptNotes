/**
 * Created by qianguoqing on 17/3/19.
 */
function fn() {
    console.log('B模块下的方法...');
}

var a = require('./a');
a.fn();