var loaderUtils = require('loader-utils');

module.exports = function(source) {
  this.cacheable && this.cacheable();

  var vjade = require('virtual-jade');
  var filename = loaderUtils.getRemainingRequest(this).replace(/^!/, '');

  return vjade(source, {
    filename: filename,
    name: '_jade_template_fn',
    pretty: true,
  }) + "\nmodule.exports = _jade_template_fn;";
};
