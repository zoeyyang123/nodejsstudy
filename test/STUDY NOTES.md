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


































