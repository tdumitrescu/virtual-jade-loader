var expect = require('expect.js');
var fs = require('fs');
var path = require('path');

var runLoader = require("./fakeModuleSystem");
var vjadeLoader = require('../');

var fixturesPath = path.join(__dirname, 'fixtures');

function loadFixture(fixtureName, loadedCB) {
  var filename = path.join(fixturesPath, fixtureName);
  runLoader(
    vjadeLoader, fixturesPath, filename, fs.readFileSync(filename, "utf-8"), loadedCB
  );
}

describe('virtual-jade loader', function() {
  it('compiles jade files', function(done) {
    loadFixture('hello.jade', function(err, loaded) {
      if (err) {
        throw err;
      }
      expect(loaded).to.be.a('string');
      expect(loaded).to.contain('h("div", {');
      expect(loaded).to.contain('hello');
      expect(loaded).to.contain('world!');
      done();
    });
  });

  it('exports a template function', function(done) {
    loadFixture('hello.jade', function(err, loaded) {
      expect(loaded).to.contain('exports = _jade_template_fn');
      done();
    });
  });

  it('inserts included file content', function(done) {
    loadFixture('include.jade', function(err, loaded) {
      if (err) {
        throw err;
      }
      expect(loaded).to.be.a('string');
      expect(loaded).to.contain('h("div", {');
      expect(loaded).to.contain('Hello');
      expect(loaded).to.contain('llamas!!!');
      expect(loaded).to.contain('world');
      done();
    });
  });
});
