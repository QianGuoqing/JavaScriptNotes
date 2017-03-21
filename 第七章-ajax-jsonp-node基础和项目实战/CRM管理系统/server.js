/**
 * Created by qianguoqing on 17/3/21.
 */
var http = require('http'),
    fs = require('fs'),
    url = require('url');

var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;

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

    // API数据接口的处理
    var con = null, customPath = './json/custom.json';
    var result = null;
    // 1) 获取所有的客户信息
    if (pathname === '/getList') {
        con = fs.readFileSync(customPath, 'utf-8');
        con.length === 0 ? con = '[]' : null; // 为了防止custom.json中什么都没有，什么都没有，con是一个空字符串，使用JSON.parse
        // 转化的时候会报错，所以让其等于一个空数组
        con = JSON.parse(con);

        // 开始按照API文档中的规范准备给客户端返回的数据
        result = {
            code: 1,
            msg: '没有任何客户的信息',
            data: null
        };
        if (con.length > 0) {
            result = {
                code: 0,
                msg: '成功',
                data: con
            };
        }
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
        return;
    }
});

server.listen(1333, function () {
    console.log('server is listening 1333...');
});