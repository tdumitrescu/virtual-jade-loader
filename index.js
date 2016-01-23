var vjade = require('virtual-jade');

module.exports = function(source) {
  return vjade(source, {name: 'template'}) +
    "\nmodule.exports = function(locals) { template(locals || {}); };";
};
