var express = require('express');
var router = express.Router();

router.get('/user', function (req, res, next) {  
    res.end('ADMIN - user');
});

module.exports = router;