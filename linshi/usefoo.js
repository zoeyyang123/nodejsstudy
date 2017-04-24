/**
 * Created by zhaoyi on 17-4-24.
 */
foo = require("./foo");
var a = 'test';
foo.foo(a, function(doc){
  //doc = a;
  console.log(doc);
});