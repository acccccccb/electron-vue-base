const http = require('http');
const os=require('os');
const system = os.platform();

let init = function(option){
    http.createServer(function(req, res){
        console.log(req);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('X-Foo', 'bar');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><h1>success</h1></body></html>');
        res.end();
    }).listen(option.port);
    console.log('自动部署服务启动于：' + system + '操作系统，端口号：' + option.port);
};

module.exports = init;