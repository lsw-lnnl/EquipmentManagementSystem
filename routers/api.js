var express = require('express');
var router = express.Router();
var user = require('../models/user');

// 统一返回格式
let responseData;
router.use(function (req, res, next) {  
    responseData = {
        code: 0,
        message: ''
    }
    next();
});

/**
 * 用户注册
 */
router.post('/user/register', function (req, res, next) {  
    let username = req.body.username;
    let password = req.body.password;
    let repassword = req.body.repassword;
    // 用户是否已经被注册了，如果数据中有已经存在和我们要注册的用户的同名
    user.haveUser(username, function (haved, data) {  
        if(haved){
            responseData.code = 4;
            responseData.message = '用户已经被注册了';
            res.json(responseData);             
        }else{ 
            // 向数据库中写入用户信息
            user.insertUser(username, password, 0,function (err) {  
                if(err){
                    console.log(err);
                }else{
                    responseData.message = '注册成成功';
                    res.json(responseData);
                }
            });                    
        }
    });
});

/**
 * 用户登陆
 */
router.post('/user/login',function (req, res) {  
    let username = req.body.username;
    let password = req.body.password;
    // let power = req.body.power;

    // 从数据库中查询相同用户名和密码的记录是否存在,如果存在,则登陆成功
    user.haveUser(username, function (haved, data) {  
        if(haved){
            if(data.password === password){
                responseData.code = 0;
                responseData.message = '登陆成功';
            }else{
                responseData.code = 2;
                responseData.message = '密码错误';
            }
            res.json(responseData);             
        }else{ 
            responseData.code = 3;
            responseData.message = '用户不存在';
            res.json(responseData);
        }
    });
})

module.exports = router;