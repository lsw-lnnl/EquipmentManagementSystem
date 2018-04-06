// var userSchema = require('../schemas/users');
// 加载数据库模块
var sqlite = require('sqlite3');
var db = require('./connectionDB');


// 创建用户表
module.exports.createUser = function () {  
    db.serialize(function () {  
        let sql = 'create table if not exists user (username text primary key not null, password text, power int)';
        db.run(sql);
        console.log('表创建成功');
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

// 修改用户信息
// module.exports.modify = (...rest) => {
//     db.serialize(function () {  
//         let sql1 = ''
//     })
// }

























// module.exports = function(){
    // // 创建表
    // function createTable(db, tableName, dataSchema) {  
    //     let sql = 'create table if not exists ' + tableName + ' (';
    //     for(let key in dataSchema){
    //         sql = sql + key + ' ' + dataSchema[key] + ',';
    //     }
    //     sql = sql.slice(0,-1);
    //     sql += ')';

    //     // 执行创建表的sql语句
    //     db.run(sql);
    // }

    // // 插入一条数据数据,还需执行#.run( , , )语句,和insert.finalize();结束操作
    // function insertDB(db, tableName, dataSchema, ...rest) {  
    //     let sql = 'INSERT OR INTO ' + tableName + '(';
    //     for(let key in dataSchema){
    //         sql = sql + key + ',';
    //     }
    //     sql = sql.slice(0,-1);
    //     sql += ') values (';
    //     for(let key in dataSchema){
    //         sql = sql +'?,';
    //     }
    //     sql = sql.slice(0,-1);
    //     sql += ')';

    //     // 预执行插入的sql语句
    //     let insert = db.prepare(sql);
    //     return insert;
    // }

    // function modifyDB(db, tableName) {  

    // }

    // function deleteDB(db, sql) {  

    // }
// }