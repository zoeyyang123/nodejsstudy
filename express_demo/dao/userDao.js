/**
 * Created by zhaoyi on 17-4-20.
 */
// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var dbconf = require('../conf/db');
//var util = require('util');
var $sql = require('./usermqlMapping');

// 使用连接池，提升性能???????????
var pool  = mysql.createPool(Object.assign({}, dbconf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function (req) {
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
    /*    delete: function (req, res) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var id = +req.query.id;
            connection.query($sql.delete, id, function(err, result) {
                if(result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function (req, res) {
        // update by id
        // 为了简单，要求同时传name和age两个参数
        var param = req.body;
        if(param.name == null || param.age == null || param.id == null) {
            jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
                // 使用页面进行跳转提示
                if(result.affectedRows > 0) {
                    res.render('suc', {
                        result: result
                    }); // 第二个参数可以直接在jade中使用
                } else {
                    res.render('fail',  {
                        result: result
                    });
                }

                connection.release();
            });
        });

    },
    queryById: function (req, res) {
        var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, id, function(err, result) {
                jsonWrite(res, result);
                connection.release();

            });
        });
    },
    queryAll: function (req, res) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },*/
    findOne : function(uname){
        var res = uname;
        pool.getConnection(function(err, connection){
            if(err) throw err;
            connection.query($sql.findOne, uname, function (err, result) {
                //jsonWrite(res, result);
                if(err) throw err;
 //               console.log($sql.findOne);
 //               console.log(uname);
 //               res = result;
                connection.release();
            });
//            console.log(res);
//            return res;
        });
    },
};



























