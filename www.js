var http = require('http');
var express = require('express');
var path = require('path'); // 系统路径模块
var app = express();
//app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/public'));
// 视图引擎配置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
//使用ejs渲染html模板引擎
app.engine('html', require('ejs').renderFile);
var port = 1338;
app.set('port', port);
app.listen(port);
var server = http.createServer(app);
var router = express.Router();
server.on('error', err => {
    console.log(err.message);
    throw err;
});
server.on('listening', function() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? '管道 ' + addr : '端口 ' + addr.port;
    console.log(bind);
});
app.get(['/home', '/'], function(req, res, next) {
    console.log('into****** index page');
    res.render('index', {});
});
app.get('/data', function(req, res) {

    var data = require('fs').readFileSync('./public/data.json', 'utf-8');
    try {
        data = data.length && data;
    } catch (ex) {
        data = data;
        console.log('err', ex.message);
    }
    // res.writeHead(200, {
    //     'Content-Type': 'application/json'
    // });
    //res.set('Content-Type', 'text/plain');
    res.set('Content-Type', 'application/json');
    res.send(data);
    //res.jsonp(data);
});