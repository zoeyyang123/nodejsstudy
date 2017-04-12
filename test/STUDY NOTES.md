#Node.js初学随心笔记：
[Node.js菜鸟教程](http://www.runoob.com/nodejs/nodejs-buffer.html) 为基础，同时学习积分项目区块链的服务器部署。
[Node.js API文档](http://nodejs.cn/) --与官方同步中文文档

- **npm install**
   npm install 命令根据package.jason文件自动安装下载所需模块

- **自动重启服务器**
``` javascript
nodemon server.js
```

- **apidoc**
  把server/api/v1中所有的文件的注释内容生成api文档保存在doc/中，查看doc/中的index.html可以看API注释
``` javascript
apidoc -i server/api/v1 -o doc/
```
编写api是有注释文档的规范的。[利用apidoc在注释里写API文档](http://www.jianshu.com/p/a799c23234b8) 

- **node.js中的箭头函数=>**
  类似代替“function”，在需要一些短小的代码里使用，回调函数.etc。
  但是要注意：
  - this不再善变，这一点很重要，只能在函数定义的模块中使用
  - 箭头函数不能用new来实例化
  - 没有arguments
  - 不可以使用yield命令

- **emitter中的监听器**
  emitter.listener与emitter.on都在emitter.listenerCount中计数

- **Buffer比较**
```JavaScript
buf.compare(otherBuffer);
```
>otherBuffer - 与 buf 对象比较的另外一个 Buffer 对象。
	"aBC>ABC"
	"AB<ABC"

- **Buffer的输出**
```JavaScript
console.log("buffer1 : " + buffer1.toString());
```
有关[Node.js Buffer](http://www.runoob.com/nodejs/nodejs-buffer.html) 模块的常用方法

- **File System模块**
  注意在fs中的流的使用stream，包括管道流（pipe stream）与链式流（chain stream），使用链式流与管道流协同可以产生很顺畅的文件操作。例如：
```JavaScript
var fs = require("fs");
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
  
// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt'));
```
- **定时器**
```JavaScript
var(t) = setTimeout(cb, ms);//用于生成一个定时函数，cb可以是function，ms毫秒数,返回一个句柄。
clearTimeout(t);//用于销毁一个定时器，目前理解为在编译时可以阻止此定时器任务发生。
```

- **Node.js常用工具——util 提供常用函数集合**

> ***util.inherits***

首先先理解一下JavaScript中的prototype，是的，没有JavaScript基础的悲剧:cry:

prototype 属性使你有能力向对象添加属性和方法。

```javascript
object.prototype.name = value；
```

然后util.inherits:

```javascript
var util = require('util'); 
function Base() { 
	this.name = 'base'; 
	this.base = 1991; 
	this.sayHello = function() { 
	console.log('Hello ' + this.name); 
	}; 
} //这个构造函数定义了三个属性
Base.prototype.showName = function() { 
	console.log(this.name);
}; //这里是一个原型定义了一个属性
function Sub() { 
	this.name = 'sub'; 
} 
util.inherits(Sub, Base); //这里只能继承原型的属性也就是只能定义“showName”的method
var objBase = new Base(); 
objBase.showName(); 
objBase.sayHello(); 
console.log(objBase); 
var objSub = new Sub(); 
objSub.showName(); 
//objSub.sayHello(); //这句会报错，因为Sub不能继承“sayHello”的method
//console.log('objBase base:'+ objSub.base);//这代码不报错，但是会提示objBase base:undefined
console.log(objSub); 
```

> ***util.inpect***

用法：util.inspect(object,[showHidden],[depth],[colors])

```JavaScript
var util = require('util'); 
function Person() { 
	this.name = 'byvoid'; 
	this.toString = function() { 
	return this.name; 
	}; 
} 
var obj = new Person(); 
console.log(util.inspect(obj)); //一般这样写就够了，可以看到一个函数里有哪些结构
//比如这段会有这样的输出：Person { name: 'byvoid', toString: [Function] }
console.log(util.inspect(obj, true)); 
```

其他几个简单method

> util.isArray(object)如果给定的参数 "object" 是一个数组返回true，否则返回false。
>
> util.isRegExp(object)如果给定的参数 "object" 是一个正则表达式返回true，否则返回false
>
> util.isDate(object)如果给定的参数 "object" 是一个日期返回true，否则返回false。
>
> util.isError(object)如果给定的参数 "object" 是一个错误对象返回true，否则返回false。

- **文件操作fs**

一些文件操作包括 同步异步打开关闭 用到再说，链接：[文件系统](http://www.runoob.com/nodejs/nodejs-fs.html)

- **Node.js中文乱码问题**

Node.js中文支持有问题，在服务器建立时可以如下更改：

```javascript
//res.writeHead(200, {'Content-Type': 'text/html'}); 
res.writeHead(200, {'Content-Type': 'text/plain ; charset=utf8'});
```

- **URL解析**

```JavaScript
var http = require('http');
var url = require('url');
var util = require('util');
 
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    res.write("网站名：" + params.name);
    res.write("\n");
    res.write("网站 URL：" + params.url);
    res.end();
 
}).listen(3000);
```

- **监听端口被占用时解决办法----小TIPS**

```shell
sudo fuser -n tcp 3000
# 这里会输出一个pid kill这个pid号，例如pid是14117
sudo kill 14117
```


































