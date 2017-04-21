# **Express 框架学习笔记**

- **更改views内部文件格式**

在路由里，可以省去 `index.html`的后缀，直接写index即可，但是在 视图里 include的时候，还是需要写上`.html`的后缀，否则报错

```javascript
app.set('views', path.join(__dirname, 'views'));
app.engine("html",require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
//app.set('view engine', 'ejs');
app.set('view engine', 'html');
```

不去深究__express和renderFile是什么了，反正这两句话就是修改渲染引擎为html.

- **利用express.use中间件修改路由**


例如：

```javascript
app.use('/', routes);  // 即为为路径 / 设置路由
app.use('/users', users); // 即为为路径 /users 设置路由
app.use('/login',routes); // 即为为路径 /login 设置路由
app.use('/register',routes); // 即为为路径 /register 设置路由
app.use('/home',routes); // 即为为路径 /home 设置路由
app.use("/logout",routes); // 即为为路径 /logout 设置路由
```

在routes目录下有两个路由文件，分别为users.js与index.js.

- **在express框架中配合mysql模块实现数据库操作**

首先，实现mysql模块的使用。

简单用法：（包括创建连接，连接，断开）

```JavaScript
var mysql = require('mysql');
var connection = mysql.createConnection({
    host    :'localhost',   //主机
    user    :'ocetl',       //mysql用户名
    password:'123',         //密码
});
connection.connect();
//数据库操作
connection.end();
```

数据库操作举例：

> INSERT

```JavaScript
var  userAddSql = 'INSERT INTO userinfo(Id,UserName,UserPass) VALUES(0,?,?)';
var  userAddSql_Params = ['Wilson', 'abcd'];
connection.query(userAddSql,userAddSql_Params/*,callbackfunction*/);
```

>UPDATE

```JavaScript
var userModSql = 'UPDATE userinfo SET UserName = ?,UserPass = ? WHERE Id = ?';
var userModSql_Params = ['zoey', '5678',1];
connection.query(userModSql,userModSql_Params/*,callbackfunction*/);
```

> SELECT

```javascript
var  userGetSql = 'SELECT * FROM userinfo';
connection.query(userGetSql/*,callbackfunction*/);
```

> DELETE

```javascript
var  userDelSql = 'DELETE FROM userinfo';
connection.query(userDelSql/*,callbackfunction*/);
```

以上是简单的操作。在具体应用时采用交互的方式可能更好

> **step1：** 在conf目录下写mysql数据库链接配置：

```JavaScript
// conf/db.js
// MySQL数据库联接配置
module.exports = {
    mysql:{
        host : 'localhost',
        user : 'ocetl',
        password : '123',
        database : 'nodesample',
        port : 3306
    }
};
```

> **step2：**在dao目录下写CRUD语句

```JavaScript
// dao/userSqlMapping.js
// CRUD SQL语句
var tablename = 'userinfo';
var user = {
    insert:'INSERT INTO ' + tablename + '(id, name, age) VALUES(0,?,?)',
    update:'update ' + tablename + ' set name=?, age=? where id=?',
    delete: 'delete from ' + tablename + ' where id=?',
    queryById: 'select * from ' + tablename + ' where id=?',
    queryAll: 'select * from ' + tablename
};

module.exports = user;
```

> **step3：**封装CRUD功能（使用连接池，提升性能？？？）

```JavaScript
// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

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
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;

			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query($sql.insert, [param.name, param.age], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
					};    
				}

				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);

				// 释放连接 
				connection.release();
			});
		});
	},
	delete: function (req, res, next) {
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
	update: function (req, res, next) {
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
	queryById: function (req, res, next) {
		var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, id, function(err, result) {
				jsonWrite(res, result);
				connection.release();

			});
		});
	},
	queryAll: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	}

};
```

































