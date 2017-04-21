/**
 * Created by zhaoyi on 17-4-20.
 */
var tablename = 'userinfo';
var user = {
    insert:'INSERT INTO ' + tablename + ' (Id, UserName, UserPass) VALUES(0,?,?)',
    update:'update ' + tablename + ' set UserName=?, UserPass=? where Id=?',
    delete: 'delete from ' + tablename + ' where Id=?',
    queryById: 'select * from ' + tablename + ' where Id=?',
    queryAll: 'select * from ' + tablename,
    findOne:'select * from ' + tablename + ' where UserName=?',
    checkOne:'select UserPass ' + tablename + ' where UserName=?'
};

module.exports = user;