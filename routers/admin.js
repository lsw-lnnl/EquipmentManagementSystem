var express = require('express');
var router = express.Router();
var equipment = require('../models/equipment');

// 统一返回格式
let responseData;
router.use(function (req, res, next) {  
    responseData = {
        code: 0,
        message: ''
    }
    next();
});

// router.get('/user', function (req, res, next) {  
//     res.end('ADMIN - user');
// });

/**
 * 增添设备
 */
router.post('/equipment/add',function (req, res) { 
    let ID = req.body.equipID; 
    let name = req.body.equipName;
    let buytime = req.body.equipBuytime;
    let supplier = req.body.equipSupplier;      
    let price = req.body.equipPrice;    
    let station = req.body.equipStation;
    equipment.haveID(ID, function (haved, data) {
        if(!haved){
            equipment.insert(ID, name, buytime, supplier, price, station, function(err){
                if(err){
                    console.log(err);
                    responseData.code = 1;
                    responseData.message = '错误';
                }else{
                    responseData.code = 0;
                    responseData.message = '设备添加成功';
                }
                res.json(responseData);                                                 
            });
        }else{
            responseData.code = 2;
            responseData.message = '此设备已存在';
            res.json(responseData);                    
        }
    });
});


/**
 * 获取所有设备信息表
 */
router.post('/equipment/list',function (req, res) { 
    equipment.all(function (err, list) {  
        if(err){
            console.log(err);
            responseData.code = 1;
            responseData.message = '显示错误';
            res.json(responseData); 
        }else{
            // list.map(function(value){
            //     console.log(value);
            // });
            responseData.code = 0;
            responseData.message = list;
            res.json(responseData); 
        }
    });   
});

/**
 * 修改设备信息
 */
router.post('/equipment/modify',function (req, res) { 
    let ID = req.body.equipID; 
    let name = req.body.equipName;
    let buytime = req.body.equipBuytime;
    let supplier = req.body.equipSupplier;      
    let price = req.body.equipPrice;    
    let station = req.body.equipStation;
    equipment.haveID(ID, function (haved, data) {
        if(haved){
            equipment.replace(ID, name, buytime, supplier, price, station, function(err){
                if(err){
                    console.log(err);
                    responseData.code = 1;
                    responseData.message = '错误';
                }else{
                    responseData.code = 0;
                    responseData.message = '设备修改成功';
                }
                res.json(responseData);                                                 
            });
        }else{
            responseData.code = 2;
            responseData.message = '此设备不存在';
            res.json(responseData);                    
        }
    });  
});

/**
 * 删除设备信息
 */
router.post('/equipment/delete',function (req, res) { 
    let ID = req.body.equipID; 
    equipment.haveID(ID, function (haved, data) {
        if(haved){
            equipment.delete(ID, function(err){
                if(err){
                    console.log(err);
                    responseData.code = 1;
                    responseData.message = '错误';
                }else{
                    responseData.code = 0;
                    responseData.message = '设备删除成功';
                }
                res.json(responseData);                                                 
            });
        }else{
            responseData.code = 2;
            responseData.message = '此设备不存在';
            res.json(responseData);                    
        }
    });  
});

module.exports = router;