// 加载数据库模块
var sqlite = require('sqlite3');
var db = require('./connectionDB');

// 创建设备表
module.exports.createEquipment = function () {  
    db.serialize(function () {  
        let sql = 'create table if not exists equipment (id text primary key not null, name text, '+
            'buyTime text, supplier text, price text, station integer )';
        db.run(sql);
        console.log('设备表创建成功');
    });
}

// 查询所有设备信息
module.exports.all = function (backcall) {
    db.serialize(function () {  
        let sql = 'select * from equipment order by id';
        db.all(sql, function (err, rows) {  
            backcall(err,rows);
        });
    });
}

// 添加设备
module.exports.insert = function (id, name, buyTime, supplier, price, station, callback) {  
    db.serialize(function () {  
        let sql = 'insert into equipment (id, name, buyTime, supplier, price, station) values (?,?,?,?,?,?)';
        db.run(sql, id, name, buyTime, supplier, price, station, function (err) {  
            callback(err);
        });
    });
}

// 通过编号查找设备是否存在
module.exports.haveID = function (id, callback) {
    let haved = false;
    let data;
    db.serialize(function () {
        let sql = "select * from equipment";
        db.all(sql, function (err, rows) {  
            rows.map(function (value) {  
                if(value.id === id){
                    haved = true;
                    data = value;
                }
            });
            callback(haved, data);
        });
    });
}

// 修改设备信息
// module.exports.modify = (username, password, ck) => {
//     db.serialize(function () {
//         let sql = 'UPDATE equipment set password=? where username=?';
//         db.run(sql, password, username, function(err){
//             ck(err);
//         });
//     });
// }
module.exports.replace = (id, name, buyTime, supplier, price, station, callback) => {
    db.serialize(function () {  
        let sql = 'replace into equipment (id, name, buyTime, supplier, price, station) values (?,?,?,?,?,?)';
        db.run(sql, id, name, buyTime, supplier, price, station, function (err) {  
            callback(err);
        });
    });
}

// 删除设备信息
module.exports.delete = (id, callback) => {
    db.serialize(function () {  
        let sql = 'delete from equipment where id=?';
        db.run(sql, id, function (err) {  
            callback(err);
        });
    });
}
