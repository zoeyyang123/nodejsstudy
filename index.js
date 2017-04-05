/**
 * Created by zoey on 17-4-3.
 */
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}; //定义句柄 在router时路由到不同应用
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);