// 加载数据库模块
var sqlite = require('sqlite3');
var db = require('./connectionDB');


// 创建用户表
module.exports.createUser = function () {  
    db.serialize(function () {  
        let sql = 'create table if not exists user (username text primary key not null, password text, power int)';
        db.run(sql);
        console.log('用户表创建成功');
    });
}

// 查询所有用户
module.exports.allUser = function () {
    // db.serialize(function () {  
        let sql = 'select * from user';
        db.all(sql, function (err, rows) {  
            console.log(rows);
            rows.map(function (value) {  
                console.log(value.username);
            })
            // backcall(err,rows);
        });
        db.each(sql, function (err,row) {  
            console.log(row)
            // backcall(err,row);
        })
    // });
}

// 通过用户名查找用户是否存在
module.exports.haveUser = function (username, callback) {
    let haved = false;
    let data;
    db.serialize(function () {
        let sql = "select * from user";
        db.all(sql, function (err, rows) {  
            rows.map(function (value) {  
                if(value.username === username){
                    haved=true;
                    data = value;
                }
            });
            callback(haved, data);
        });
    });
}

// 添加用户
module.exports.insertUser = function (username, password, power, callback) {  
    db.serialize(function () {  
        let sql = 'insert into user (username, password, power) values (?,?,?)';
        db.run(sql,username, password, power, function (err) {  
            callback(err);
        });
    });
}

// 修改用户登录密码
module.exports.modify = (username, password, ck) => {
    db.serialize(function () {
        let sql = 'UPDATE user set password=? where username=?';
        db.run(sql, password, username, function(err){
            ck(err);
        });
    });
}

