var expect = require('expect.js');
var fs = require('fs');
var path = require('path');

var runLoader = require("./fakeModuleSystem");
var vjadeLoader = require('../');

var fixturesPath = path.join(__dirname, 'fixtures');

function loadFixture(fixtureName, options, loadedCB) {
  if (arguments.length < 3) {
    loadedCB = options;
  }
  options = options || {};

  var filename = path.join(fixturesPath, fixtureName);
  runLoader(
    vjadeLoader, fixturesPath, filename, fs.readFileSync(filename, "utf-8"), options,
    function(err, loaded) {
      if (err) {
        throw err;
      }
      expect(loaded).to.be.a('string');
      loadedCB(this, loaded);
    }
  );
}

describe('virtual-jade loader', function() {
  it('compiles jade files', function(done) {
    loadFixture('hello.jade', function(loaderContext, loaded) {
      expect(loaded).to.contain('h("div", {');
      expect(loaded).to.contain('hello');
      expect(loaded).to.contain('world!');
      done();
    });
  });

  it('exports a template function', function(done) {
    loadFixture('hello.jade', function(loaderContext, loaded) {
      expect(loaded).to.contain('exports = _jade_template_fn');
      done();
    });
  });

  it('inserts included file content', function(done) {
    loadFixture('include.jade', function(loaderContext, loaded) {
      expect(loaded).to.contain('h("div", {');
      expect(loaded).to.contain('Hello');
      expect(loaded).to.contain('llamas!!!');
      expect(loaded).to.contain('world');
      expect(loaderContext._deps[0].endsWith(__dirname + '/fixtures/included-file.jade')).to.equal(true)
      done();
    });
  });

  it('inserts extended file content', function(done) {
    loadFixture('extends.jade', function(loaderContext, loaded) {
      expect(loaded).to.contain('h("div", {');
      expect(loaded).to.contain('capybara');
      expect(loaded).not.to.contain('overridden animal');
      expect(loaded).to.contain('default content');
      expect(loaderContext._deps[0].endsWith(__dirname + '/fixtures/extended-layout.jade')).to.equal(true)
      done();
    });
  });

  context('passing user options', function() {
    it('passes "pretty" from query string', function(done) {
      loadFixture('hello.jade', {query: '?pretty=false'}, function(loaderContext, loaded) {
        expect(loaded).not.to.contain('h("div", {');
        expect(loaded).to.contain('h("div",{');
        done();
      });
    });
  });
});
