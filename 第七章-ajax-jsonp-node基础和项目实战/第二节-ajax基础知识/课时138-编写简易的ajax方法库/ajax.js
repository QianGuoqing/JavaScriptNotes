/**
 * Created by qianguoqing on 17/3/20.
 */

// ajax: 实现ajax请求的公共方法; 当一个方法传递的参数值过多,而且不固定，则使用对象统一传参
function ajax(options) {
    // 把需要使用的参数值设定一个规则和初始值
    var _default = {
        url: '', // 请求地址
        type: 'get', // 请求方式
        dataType: 'json', // 请求回来的内容格式
        async: true, // 请求同步还是异步
        data: null, // 放在请求主体中的内容(post)
        getHead: null, // 当readystate === 2 的时候执行的回调方法
        success: null // 当 readystate === 4 的时候执行的回调方法
    };

    // 使用用户自己传递进来的值覆盖默认的值
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            _default[key] = options[key];
        }
    }

    // 如果当前的请求方式是get请求，需要在URL的末尾加随机数清除缓存
    if (_default.type === 'get') {
        _default.url.indexOf('?') >= 0 ? _default.url += '&' : _default.url += '?';
        _default.url += '_=' + Math.random();
    }

    var xhr = new XMLHttpRequest();
    xhr.open(_default.type, _default.url, _default.async);
    xhr.onreadystatechange = function () {
        if (/^2\d{2}$/.test(xhr.status)) {
            if (xhr.readyState === 2) {
                if (typeof _default.getHead === 'function') {
                    _default.getHead.call(xhr);
                }
            }
            if (xhr.readyState === 4) {
                var val = xhr.responseText;
                // 如果传递的参数值是json，说明获取的内容应该是json格式的对象
                if (_default.dataType === 'json') {
                    val = JSON.parse(val);
                }
                _default.success && _default.success.call(xhr, val);
            }
        }
    };
    xhr.send(_default.data);
}
