console.info("程序开始执行：");

var counter = 10;
console.log("计数: %d", counter);

console.time("获取数据");
//
// 执行一些代码
// 输出全局变量 __filename 的值
console.log( __filename );
// 输出全局变量 __dirname 的值
console.log( __dirname );

function printHello(){
    console.log( "Hello, World!");
}
// 两秒后执行以上函数
var t = setTimeout(printHello, 2000);

// 清除定时器
clearTimeout(t);

var s = setInterval(printHello, 2000);

clearInterval(s);

var b= 'a' ;
console.log('Hello world');
console.log('byvoid%diovyb');
console.log('byvoid%diovyb',100);
console.log('byvoid%siovyb', b);

console.trace();
//
console.timeEnd('获取数据');

console.info("程序执行完毕。");