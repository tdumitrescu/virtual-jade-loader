var vjade = require('virtual-jade');

module.exports = function(source) {
  this.cacheable && this.cacheable();
  return vjade(source, {name: '_jade_template_fn'}) +
    "\nmodule.exports = _jade_template_fn;";
};
