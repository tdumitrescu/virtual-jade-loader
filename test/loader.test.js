var expect = require('expect.js');
var fs = require('fs');
var path = require('path');

var runLoader = require("./fakeModuleSystem");
var vjadeLoader = require('../');

var fixturesPath = path.join(__dirname, 'fixtures');

function loadFixture(fixtureName, loadedCB) {
  var filename = path.join(fixturesPath, fixtureName);
  runLoader(
    vjadeLoader, fixturesPath, filename, fs.readFileSync(filename, "utf-8"),
    function(err, loaded) {
      if (err) {
        throw err;
      }
      expect(loaded).to.be.a('string');
      loadedCB(loaded);
    }
  );
}

describe('virtual-jade loader', function() {
  it('compiles jade files', function(done) {
    loadFixture('hello.jade', function(loaded) {
      expect(loaded).to.contain('h("div", {');
      expect(loaded).to.contain('hello');
      expect(loaded).to.contain('world!');
      done();
    });
  });

  it('exports a template function', function(done) {
    loadFixture('hello.jade', function(loaded) {
      expect(loaded).to.contain('exports = _jade_template_fn');
      done();
    });
  });

  it('inserts included file content', function(done) {
    loadFixture('include.jade', function(loaded) {
      expect(loaded).to.contain('h("div", {');
      expect(loaded).to.contain('Hello');
      expect(loaded).to.contain('llamas!!!');
      expect(loaded).to.contain('world');
      done();
    });
  });

  it('inserts extended file content', function(done) {
    loadFixture('extends.jade', function(loaded) {
      expect(loaded).to.contain('h("div", {');
      expect(loaded).to.contain('capybara');
      expect(loaded).not.to.contain('overridden animal');
      expect(loaded).to.contain('default content');
      done();
    });
  });
});
