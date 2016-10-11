// based onm @sokra's jade-loader tests:
// https://github.com/webpack/jade-loader/blob/afee6b0b/test/fakeModuleSystem.js

var fs = require("fs");
var path = require("path");

module.exports = function runLoader(loader, directory, filename, arg, callback) {
  var async = false; // don't default to true or sync loaders won't work
  var loaderContext = {
    _deps: [],
    addDependency: function(path) {
      this._deps.push(path)
    },
    async: function() {
      async = true;
      return callback;
    },
    dependency: function(path) {
      return this.addDependency(path);
    },
    loaders: ["itself"],
    loaderIndex: 0,
    options: {},
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
  if(!async) callback.call(loaderContext, null, res);
}
