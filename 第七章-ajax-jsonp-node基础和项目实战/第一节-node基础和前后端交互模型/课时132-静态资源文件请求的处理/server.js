/**
 * Created by qianguoqing on 17/3/20.
 */
var http = require('http'),
    fs = require('fs'),
    url = require('url');

// 1. 创建一个服务
var server1 = http.createServer(function (request, response) {
    // response.write('Node server');
    // 解析客户端请求地址中的文件目录名称，以及传递给当前服务的数据内容
    var urlObj = url.parse(request.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;

    // 如果客户端请求的资源文件不存在，不加try catch，服务会终止，这样不好，所以增加try catch捕获异常信息，这样即使不存在
    // 服务也不会报错
    try {
        var con = fs.readFileSync('.' + pathname, 'utf-8');
        response.end(con);
    } catch (e) {
        response.end('request file is not found');
    }

    // if (pathname === '/index.html') {
    //     var con = fs.readFileSync('./index.html', 'utf-8');
    //     response.end(con);
    //     return;
    // }
    //
    // if (pathname === '/css/index.css') {
    //     con = fs.readFileSync('./css/index.css', 'utf-8');
    //     response.end(con);
    //     return;
    // }
    //
    // if (pathname === '/js/index.js') {
    //     con = fs.readFileSync('./js/index.js', 'utf-8');
    //     response.end(con);
    //     return;
    // }
});
// 为当前的这个服务配置监听端口
server1.listen(1333, function () {
    console.log('server in listening port 1333');
});