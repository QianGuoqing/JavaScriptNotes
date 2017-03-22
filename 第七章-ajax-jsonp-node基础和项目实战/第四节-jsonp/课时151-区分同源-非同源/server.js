/**
 * Created by qianguoqing on 17/3/21.
 */
var http = require('http'),
    fs = require('fs'),
    url = require('url');

var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query; // 存储的是客户端请求的URL地址中问候参数后面的信息，并且是以对象的键值对方式存储的

    var reg = /\.(HTML|CSS|JS|ICO)/i;
    if (reg.test(pathname)) {
        var suffix = reg.exec(pathname)[1].toUpperCase();
        var suffixMIME = 'text/html';
        switch (suffix) {
            case 'CSS':
                suffixMIME = 'text/css';
                break;
            case 'JS':
                suffixMIME = 'text/javascript';
                break;
        }
        try {
            var conFile = fs.readFileSync('.' + pathname, 'utf-8');
            res.writeHead(200, {'content-type': suffixMIME + ';charset=utf-8;'});
            res.end(conFile);
        } catch (e) {
            res.writeHead(404, {'content-type': 'text/plain'});
            res.end('File is not found.');
        }
        return;
    }

    // JSONP处理
    if (pathname === '/getAll') {
        // 接收客户端传递进来的函数名
        var fnName = query['callback'];
        // 准备数据
        var con = JSON.parse(fs.readFileSync('./custom.json', 'utf-8'));
        // 返回给客户端内容
        res.writeHead(200, {'content-type': 'text/javascript;charset=utf-8'});
        res.end(fnName + '(' + con + ')');
    }
});

server.listen(1333, function () {
    console.log('server is listening 1333...');
});