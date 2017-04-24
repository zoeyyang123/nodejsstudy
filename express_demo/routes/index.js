var express = require('express');
var router = express.Router();

/* GET Index page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.route('/login').get(function(req,res){
    res.render("login",{title:'User Login'});
}).post(function(req,res){
    //get User info
    //这里的User就是从model中获取user对象，通过global，dbhandel全局方法（这个方法在app.js中已经实现）
    var uname = req.body.uname;
    findOne(uname,function(err,doc){
        if(err){
            res.send(500);
            console.log(err);
        }else if(!doc){
            req.session.error = '用户名不存在';
            res.send(404);
        }else{}
    })
});


module.exports = router;
