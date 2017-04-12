/**
 * Created by zhaoyi on 17-4-10.
 */
var util = require('util');
function Base() {
	this.name = 'base';
	this.base = 1991;
	this.sayHello = function() {
	console.log('Hello ' + this.name);
	};
}
Base.prototype.showName = function() {
	console.log(this.name);
};
function Sub() {
	this.name = 'sub';
}
util.inherits(Sub, Base);
var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log('objBase console:'+ objBase);
console.log('objBase base:'+ objBase.base);
var objSub = new Sub();
objSub.showName();
console.log('objBase base:'+ objSub.base);
//objSub.sayHello();
console.log('objSub console:' + objSub);

function Person() {
	this.name = 'byvoid';
	this.toString = function() {
	return this.name;
	};
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true, 1 ,true));