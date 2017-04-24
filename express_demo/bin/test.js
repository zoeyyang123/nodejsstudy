/**
 * Created by zhaoyi on 17-4-20.
 */
var userDao = require('../dao/userDao');

var uname = 'zoey';
var infouser = {
    UserName : 'zoey',
    UserPass : '0987',
};

/*userDao.findOne(uname, function (err, res) {
//    if(res)  console.log(res);
//    else console.log('没找到');
    var res1 = res[0].UserName;
    console.log(res1);
});*/
userDao.checkOne(uname, function (err, doc) {
   /* var pass = res[0]['UserPass'];
    if(pass)  console.log(pass);
    else console.log('没找到');*/

    var PassWord='';
    if(err){
//        res.send(500);
        console.log(err);
    }else if(doc.length==0){
/*        req.session.error = '用户名不存在';
        res.send(404);*/
        console.log('用户不存在');
    }else{
        PassWord = doc[0].UserPass;
        console.log(PassWord);
    }
//    console.log(res);
});
//userDao.add(infouser);
