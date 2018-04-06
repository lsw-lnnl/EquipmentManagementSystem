var express = require('express');
var router = express.Router();

router.get('/index', function (req, res, next) {  
    res.render('index');
});

router.get('/', function (req, res, next) {  
    res.render('login');
});

module.exports = router;