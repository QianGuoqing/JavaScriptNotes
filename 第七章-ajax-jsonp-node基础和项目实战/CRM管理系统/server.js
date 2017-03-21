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

    // API数据接口的处理
    var con = null, customPath = './json/custom.json';
    var result = null;
    var customId = null;

    // 首先把custom.json文件中的内容都获取到
    con = fs.readFileSync(customPath, 'utf-8');
    con.length === 0 ? con = '[]' : null;
    con = JSON.parse(con);

    // 1) 获取所有的客户信息
    if (pathname === '/getList') {
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

    // 2) 根据传递进来的客户ID，获取某一个具体的客户信息
    if (pathname === '/getInfo') {
        // 把客户端传递进来的ID获取到
        customId = query['id'];

        result = {
            code: 1,
            msg: '客户不存在',
            data: null
        };

        //console.log(con[0]['id']);
        for (var i = 0; i < con.length; i++) {
            if (con[i]['id'] == customId) {
                result = {
                    code: 0,
                    msg: '成功',
                    data: con[i]
                };
                break;
            }
        }
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
        return;
    }

    // 3) 根据客户ID删除客户
    if (pathname === '/removeInfo') {
        customId = query['id'];
        var flag = false;
        for (var i = 0; i < con.length; i++) {
            if (con[i]['id'] == customId) {
                con.splice(i, 1);
                flag = true;
                break;
            }
        }
        result = {
            code: 1,
            msg: '删除失败',
            data: null
        };
        if (flag) {
            fs.writeFileSync(customPath, JSON.stringify(con), 'utf-8');
            result = {
                code: 0,
                msg: '删除成功',
            };
        }
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
        return;
    }

    // 4) 增加客户信息
    if (pathname === '/addInfo') {
        // 获取客户端通过请求主体传递进来的内容
        var str = '';
        req.on('data', function (chunk) {
            str += chunk;
        });
        req.on('end', function () {
            if (str.length === 0) {
                res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
                res.end(JSON.stringify({
                    code: 1,
                    msg: '增加失败,没有传递任何需要增加的信息'
                }));
                return;
            }
            var data = JSON.parse(str);
            // 在现有的data中追加一个id: 获取con中最后一项id，新的id是在原有基础上+1
            data['id'] = con.length === 0 ? 1 : parseFloat(con[con.length - 1]['id']) + 1;
            con.push(data);
            fs.writeFileSync(customPath, JSON.stringify(con), 'utf-8');
            res.end(JSON.stringify({
                code: 0,
                msg: '成功'
            }));
        });
        return;
    }

    // 5) 修改客户信息
    if (pathname === '/updateInfo') {
        str = '';
        req.on('data', function (chunk) {
            str += chunk;
        });
        req.on('end', function () {
            if (str.length === 0) {
                res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
                res.end(JSON.stringify({
                    code: 1,
                    msg: '修改失败,没有传递任何需要修改的信息'
                }));
                return;
            }
            var flag = false,
                data = JSON.parse(str);
            for (var i = 0; i < con.length; i++) {
                if (con[i]['id'] == data['id']) {
                    con[i] = data;
                    break;
                }
            }
            result.msg = '修改失败,需要修改的客户不存在';
            if (flag) {
                fs.writeFileSync(customPath, JSON.stringify(con), 'utf-8');
                result = {
                    code: 0,
                    msg: '修改成功'
                };
            }
            res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
            res.end(JSON.stringify(result));
        });
        return;
    }

    // 如果请求的地址不是上述任何一个，则提示不存在即可
    res.writeHead(404, {'content-type': 'text/plain;charset=utf-8;'});
    res.end('请求的数据接口不存在');
});

server.listen(1333, function () {
    console.log('server is listening 1333...');
});