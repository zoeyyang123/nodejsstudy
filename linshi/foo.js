/**
 * Created by zhaoyi on 17-4-24.
 */
function foo(a, callback){
  var b = null;
  console.log(a);
  b = a;
  callback(b);
};
exports.foo = foo;