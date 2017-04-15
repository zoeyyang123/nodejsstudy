/**
 * Created by zhaoyi on 17-4-12.
 */
var os = require("os");
console.log('endian:' + os.endianness());
console.log('type :' + os.type());
console.log('platform : ' + os.platform());
console.log('total memory : ' + os.totalmem() + " bytes.");
console.log('free memory : ' + os.freemem() + " bytes.");