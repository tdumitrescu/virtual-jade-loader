// copied from @sokra's jade-loader tests:
// https://github.com/webpack/jade-loader/blob/afee6b0b/test/fakeModuleSystem.js

var fs = require("fs");
var path = require("path");

module.exports = function runLoader(loader, directory, filename, arg, callback) {
  var async = false; // don't default to true or sync loaders won't work
  var loaderContext = {
    async: function() {
      async = true;
      return callback;
    },
    loaders: ["itself"],
    loaderIndex: 0,
    query: "",
    resource: filename,
    callback: function() {
      async = true;
      return callback.apply(this, arguments);
    },
    resolve: function(context, request, callback) {
      callback(null, path.resolve(context, request));
    },
    loadModule: function(request, callback) {
      request = request.replace(/^-?!+/, "");
      request = request.split("!");
      var content = fs.readFileSync(request.pop(), "utf-8");
      if(request[0] && /stringify/.test(request[0]))
        content = JSON.stringify(content);
      return callback(null, content);
    }
  };
  var res = loader.call(loaderContext, arg);
  if(!async) callback(null, res);
}
