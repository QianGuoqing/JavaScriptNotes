/**
 * Created by qianguoqing on 17/3/20.
 */
var http = require('http'),
    fs = require('fs'),
    url = require('url');

var server1 = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;

    // 处理静态资源文件请求(html, css, javascript...) => "前端路由"
    var reg = /\.(HTML|JS|CSS|JSON|TXT|ICO|JPG|GIF|PNG|BMP|)/i;
    if (reg.test(pathname)) {
        // 获取请求文件的后缀名
        var suffix = reg.exec(pathname)[1].toUpperCase();
        // 根据请求文件的后缀名获取到当前文件的MIME类型
        var suffixMIME = 'text/plain';
        switch (suffix) {
            case 'HTML':
                suffixMIME = 'text/html';
                break;
            case 'CSS':
                suffixMIME = 'text/css';
                break;
            case 'JS':
                suffixMIME = 'text/javascript';
                break;
            case 'JSON':
                suffixMIME = 'application/json';
                break;
            case 'ICO':
                suffixMIME = 'application/octet-stream';
                break;
        }

        try {
            // 按照指定的目录读取文件中的内容(代码)，读取出来的内容都是字符串格式的
            var conFile = fs.readFileSync('.' + pathname, 'utf-8');

            // 重写响应头信息: 告诉客户端的浏览器返回的内容是什么样的MIME类型,
            // 并且指定返回的内容格式是UTF-8编码格式，返回的中文汉字就不会出现乱码了
            response.writeHead(200, {
                'content-type': suffixMIME + ';charset=utf-8;'
            });

            // 服务端向客户端返回的内容应该也是字符串
            response.end(conFile);
        } catch (e) {
            response.writeHead(404, {
                'content-type': 'text/plain;charset=utf-8'
            });
            response.end('File is not found.');
        }
    }
});

server1.listen(1333, function () {
    console.log('server in listening port 1333');
});