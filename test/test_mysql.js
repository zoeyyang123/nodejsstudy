/**
 * Created by zhaoyi on 17-4-19.
 */
var mysql = require('mysql');

//创建一个connection
var connection = mysql.createConnection({
    host    :'localhost',   //主机
    user    :'ocetl',       //mysql用户名
    password:'123',         //密码
    port: '3306',
    database: 'nodesample',
});

connection.connect(function (err) {
    if(err){
        console.log('[query] - :' + err);
        return;
    }
        console.log('[connection connect] succeed!');
});
//执行SQL语句
var  userAddSql = 'INSERT INTO userinfo(Id,UserName,UserPass) VALUES(0,?,?)';
var  userAddSql_Params = ['Wilson', 'abcd'];
var  userAddSql_Params1 = ['Wilson', 'abcd'];

var userModSql = 'UPDATE userinfo SET UserName = ?,UserPass = ? WHERE Id = ?';
var userModSql_Params = ['钟慰', '5678',8];
//增
//connection.query(userModSql,userModSql_Params);
connection.query(userAddSql,userAddSql_Params,function (err, result) {
    if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
    }

    console.log('--------------------------INSERT----------------------------');
    //console.log('INSERT ID:',result.insertId);
    console.log('INSERT ID:',result);
    console.log('-----------------------------------------------------------------\n\n');
});
//connection.query(userAddSql,userAddSql_Params1);



var  userDelSql = 'DELETE FROM userinfo';
//删
connection.query(userDelSql,function (err, result) {
    if(err){
        console.log('[DELETE ERROR] - ',err.message);
        return;
    }

    console.log('--------------------------DELETE----------------------------');
    console.log('DELETE affectedRows',result.affectedRows);
    console.log('-----------------------------------------------------------------\n\n');
});


connection.end(function(err){
    if(err){
        return;
    }
    console.log('[connection end] succeed!');
});