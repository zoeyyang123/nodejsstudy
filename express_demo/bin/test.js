/**
 * Created by zhaoyi on 17-4-20.
 */
var userDao = require('../dao/userDao');

var uname = 'zoey';
var infouser = {
    UserName : 'zoey',
    UserPass : '0987',
};

userDao.findOne(uname);
userDao.add(infouser);
