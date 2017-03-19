/**
 * Created by qianguoqing on 17/3/19.
 */

// 导入三个常用的Node内置模块
var http = require('http');
var fs = require('fs');
var url = require('url'); // URL模块中提供了一个方法 url.parse，用来解析URL地址

// 1. HTTP
// http.createServer: 创建一个服务,变量server就是创建出来的那个服务
// server.listen: 为创建出来的服务监听一个端口80
var server = http.createServer(function (request, response) {
    // 当客户端向服务器端的当前服务(port是1333这个服务)发送一个请求,
    // 并且当前服务已经成功接收到这个请求后执行这个回调函数
    // console.log('haha');

    // request(请求): 存放的是所有客户端的请求信息,包含客户端通过问好传参的方法传递给服务器的数据内容
    // 客户端请求地址: localhost:1333?name=derrick,通过request.url取到的数据是:
    // /?username=derrick
    // request.url: 存放的是客户端请求的文件资源的目录和名称,以及传给服务器的数据
    // console.log(request.url);
    var urlObj = url.parse(request.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;

    if (pathname === '/1.html') {
        // 根据请求的URL地址(具体的是根据地址中的pathname)获取到对应资源文件中的源代码
        // fs.readFileSync(pathname, encode): 同步读取指定文件中的内容
        // 同步读取: 文件中的内容读取不完不执行下面的操作，只有都读取完毕才执行后面的操作
        var con = fs.readFileSync('./1.html', 'utf-8');

        // response(响应): 提供了向客户端返回内容和数据的方法
        // response.write: 向客户端返回内容
        response.write(con);
        // response.end: 告诉服务器响应结束了(一定要加)
        response.end();
    }
});
server.listen(1333, function () {
    // 当服务创建成功，端口号监听成功后执行
    console.log('server is listening port 1333...');
});

