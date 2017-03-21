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
});

server.listen(1333, function () {
    console.log('server is listening 1333...');
});