var vjade = require('virtual-jade');

module.exports = function(source) {
  this.cacheable && this.cacheable();
  return vjade(source, {name: 'template'}) +
    "\nmodule.exports = function(locals) { return template(locals || {}); };";
};
