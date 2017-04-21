/**
 * Created by zhaoyi on 17-4-20.
 */
var userDao = require('../dao/userDao');
var mysql = require('mysql');
var dbconf = require('../conf/db');
//var util = require('util');
var $sql = require('./usermqlMapping');
var uname = 'Wilson';
var infouser = {
    UserName : 'zoey',
    UserPass : '0987',
};
var res = '';
//res = userDao.findOne(uname);
//userDao.add(infouser);
//console.log(res);
//
function add(req) {
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数
        var param = req;

        // 建立连接，向表中插入值
        // 'INSERT INTO ' + tablename + '(Id, UserName, UserPass) VALUES(0,?,?)',
        connection.query($sql.insert, [param.UserName, param.UserPass], function(err, result) {
            /*                if(result) {
             result = {
             code: 200,
             msg:'增加成功'
             };
             }*/

            // 以json形式，把操作结果返回给前台页面
            // jsonWrite(res, result);
//                console.log(result);
            // 释放连接
            connection.release();
        });
    });
},