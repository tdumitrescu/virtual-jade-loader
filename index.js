var loaderUtils = require('loader-utils');
var jade = require('jade');

module.exports = function(source) {
  this.cacheable && this.cacheable();

  var filename = loaderUtils.getRemainingRequest(this).replace(/^!/, '');
  var loader = this;
  var vjade = require('virtual-jade');

 function registerFileWithWebpack(parser, type) {
    var fs = require('fs');
    var tok = peekExpect(parser, type);
    var path = parser.resolvePath(tok.val.trim(), type);
    loader.addDependency(path);
  }

  function peekExpect(parser, type) {
    if (parser.peek().type === type) {
      return parser.peek();
    } else {
      throw new Error('expected "' + type + '", but got "' + parser.peek().type + '"');
    }
  }

  function MyParser(str, filename, options) {
    jade.Parser.call(this, str, filename, options);
  }

  MyParser.prototype = Object.create(jade.Parser.prototype);

  MyParser.prototype.parseExtends = function() {
    registerFileWithWebpack(this, 'extends')
    return jade.Parser.prototype.parseExtends.call(this)
  }

  MyParser.prototype.parseInclude = function() {
    registerFileWithWebpack(this, 'include')
    return jade.Parser.prototype.parseInclude.call(this);
  }

  return vjade(source, {
    filename: filename,
    name: '_jade_template_fn',
    parser: MyParser,
    pretty: true,
  }) + "\nmodule.exports = _jade_template_fn;";
};
