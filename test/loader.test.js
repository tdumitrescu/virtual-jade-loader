var expect = require('expect.js');
var loader = require('../');

describe('loader', function() {
  var loaded = loader('.bla Hello world');

  it('creates a template function', function() {
    expect(loaded).to.contain('function _jade_template_fn(');
  });

  it('exports a template function', function() {
    expect(loaded).to.contain('exports = _jade_template_fn');
  });

  it('returns a virtual-dom node from the template function', function() {
    expect(loaded).to.contain('h("div",{');
  });

  it('passes static text content', function() {
    expect(loaded).to.contain('Hello world');
  });
});
