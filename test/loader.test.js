var expect = require('expect.js');
var loader = require('../');

describe('loader', function() {
  it('creates a template function', function() {
    expect(loader('.bla Hello world')).to.contain('function template(');
  });
});
