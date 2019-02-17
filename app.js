var express = require('express');
var routes = require('./routes');
//var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
//var ejs = require('ejs');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// 下面的方法也可以给设置模板文件后缀为html
//app.engine('html',ejs.__express);
//app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname, '/public'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + 'uploads'));

routes(app);

app.listen(3000);

/*
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
*/
