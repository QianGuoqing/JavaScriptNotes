/**
 * Created by qianguoqing on 17/3/19.
 */

var url = require('url');
var str = 'http://192.168.1.1:1333/index.html?name=derrick&age=20';
console.log(url.parse(str));

/*
* Url {
 protocol: 'http:', -> 传输协议
 slashes: true,
 auth: null,
 host: '192.168.1.1:1333', -> 域名加端口
 port: '1333',  -> 端口号
 hostname: '192.168.1.1', -> 域名(IP)
 hash: null, ->有无哈希值
 search: '?name=derrick&age=20', -> 问好+传递进来的数据
 query: 'name=derrick&age=20',  -> 传递进来的数据，没有问好
 pathname: '/index.html',    -> 请求文件的路径及名称
 path: '/index.html?name=derrick&age=20', -> 路径名称+传递的数据
 href: 'http://192.168.1.1:1333/index.html?name=derrick&age=20' -> 原来请求的URL地址
}
* */

console.log(url.parse(str, true)); // 增加true后，query中存储的是经过处理解析后的结果: 把
// 传递进来的多组数据，以键值对方式进行存储
/*
* Url {
 protocol: 'http:',
 slashes: true,
 auth: null,
 host: '192.168.1.1:1333',
 port: '1333',
 hostname: '192.168.1.1',
 hash: null,
 search: '?name=derrick&age=20',
 query: { name: 'derrick', age: '20' }, -> 区别在此
 pathname: '/index.html',
 path: '/index.html?name=derrick&age=20',
 href: 'http://192.168.1.1:1333/index.html?name=derrick&age=20'
}
* */