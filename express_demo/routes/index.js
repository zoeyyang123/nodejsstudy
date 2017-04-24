var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');
/* GET Index page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.route('/login').get(function(req,res){
    res.render("login",{title:'User Login1111111'});
}).post(function(req,res){
    console.log('进来了');
    //get User info
    //这里的User就是从model中获取user对象，通过global，dbhandel全局方法（这个方法在app.js中已经实现）
//    var User = global.dbHandel.getModel('user');
    var uname = req.body.uname;
    console.log('req.body.uname:'+ uname);
    userDao.checkOne(uname,function(err,doc){
        if(err){
            res.send(500);
            console.log(err);
        }else if(doc.length == 0){
            req.session.error = '用户名不存在';
            res.send(404);
        }else{
            if(req.body.upwd!=doc[0].UserPass){
                req.session.error='密码错误';
                res.send(404);
            }else{
                console.log('req.body.uname:'+ uname);
                req.session.user=doc[0];
                res.send(200);
//                res.redirect("/home");
            }
        }
    });
});

/* GET register page. */
router.route("/register").get(function(req,res){    // 到达此路径则渲染register文件，并传出title值供 register.html使用
    res.render("register",{title:'User register'});
}).post(function(req,res){
    //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
//    var User = global.dbHandel.getModel('user');
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    userDao.checkOne(uname,function(err,doc){   // 同理 /login 路径的处理方式
        if(err){
            res.send(500);
            req.session.error =  '网络异常错误！';
            console.log(err);
        }else if(doc.length != 0){
            req.session.error = '用户名已存在！';
            res.send(500);
        }else{
            var temp = {
                UserName: uname,
                UserPass: upwd
            };
            userDao.add(temp ,function(err,doc){
                if (err) {
                    res.send(500);
                    console.log(err);
                } else {
                    req.session.error = '用户名创建成功！';
                    res.send(200);
                }
            });
        }
    });
});


module.exports = router;
