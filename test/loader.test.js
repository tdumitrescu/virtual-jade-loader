var expect = require('expect.js');
var loader = require('../');

describe('loader', function() {
  it('temporarily returns identity', function() {
    expect(loader('.bla Hello world')).to.eql('.bla Hello world');
  });
});
