/**
 * 应用程序的启动（入口）文件
 */

// 加载express模块
var express = require('express');
// 加载模板处理模块
var swig = require('swig');
// 加载数据库模块
// var sqlite = require('sqlite3');
// var dbPath = './db/';
var user = require('./models/user');
// 加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');
// 创建app应用
var app = express();

// 设置静态文件托管
// 当用户访问的url以/public开始，那么直接返回对应__dirname+'./public'下的文件
app.use('/public', express.static(__dirname + '/public'));

/**
 * 配置应用模板
 * 定义当前应用所使用的模板引擎
 * 第一个参数：模板引擎的名称，同时也是模板文件的后缀
 * 第二个参数：用于解析处理模板内容的方法
 */
app.engine('html', swig.renderFile);

/**
 * 设置模板文件存放的目录
 * 第一个参数必须是views
 * 第二个参数是目录
 */
app.set('views', './views');

/**
 * 注册所使用的模板引擎
 * 第一个参数必须是view engine
 * 第二个参数和app.engine这个方法里定义的模板引擎的名称是一致的
 */
app.set('view engine', 'html');

// 在开发过程中，需要取消模板缓存
swig.setDefaults({cache: false});

// bodyparser设置,设置后，可以通过res.body获取post提交过来的数据
app.use(bodyParser.urlencoded({extented: true}));

/**
 * req  request对象
 * res  response对象
 * next 函数
 */
// app.get('/', function(req, res, next){
//     /**
//      * 读取view目录下的指定文件，解析并返回个客户端
//      * 第一个参数：表示模板的文件，相当于views目录 view/index.heml
//      * 第二个参数：传递给模板使用的数据
//      */
//     res.render('index');
// });

// 根据不同的功能划分模块
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

// 连接数据库,创建用户表
user.createUser();

// 监听http请求
console.log('启动服务器');
app.listen(8081);

 


// 用户发送http请求 -> url -> 解析路由 -> 找到匹配规则 -> 执行指定的绑定函数，返回对应内容给用户
// /public -> 静态 -> 直接读取指定目录下的文件，返回给用户
// -> 动态 -> 处理业务逻辑，加载模板，解析模板 -> 返回数据给用户
