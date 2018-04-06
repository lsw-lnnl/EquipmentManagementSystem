var sqlite = require('sqlite3');
var dbPath = './db/';


// 打开数据库
var db = new sqlite.Database(dbPath + 'data.db',function (err) {  
    if(err){
        console.log('数据库开启失败');
    }else{
        console.log('数据库开启成功');
    }
});
module.exports = db;