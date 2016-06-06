var expect = require('expect.js');
var fs = require('fs');
var path = require('path');

var runLoader = require("./fakeModuleSystem");
var vjadeLoader = require('../');

var fixturesPath = path.join(__dirname, 'fixtures');

describe('virtual-jade loader', function() {
  context('when run directly', function() {
    var loaded = vjadeLoader('.bla Hello world');

    it('creates a template function', function() {
      expect(loaded).to.contain('function _jade_template_fn(');
    });

    it('exports a template function', function() {
      expect(loaded).to.contain('exports = _jade_template_fn');
    });

    it('returns a virtual-dom node from the template function', function() {
      expect(loaded).to.contain('h("div", {');
    });

    it('passes static text content', function() {
      expect(loaded).to.contain('Hello world');
    });
  });

  context('when run with webpack module loader', function() {
    it('compiles jade files', function(done) {
      var filename = path.join(fixturesPath, 'hello.jade');
      runLoader(vjadeLoader, fixturesPath, filename, fs.readFileSync(filename, "utf-8"),
        function(err, loaded) {
          if (err) {
            throw err;
          }
          expect(loaded).to.be.a('string');
          expect(loaded).to.contain('h("div", {');
          expect(loaded).to.contain('hello');
          expect(loaded).to.contain('world!');
          done();
        }
      );
    });

    it('inserts included file content', function(done) {
      var filename = path.join(fixturesPath, 'include.jade');
      runLoader(vjadeLoader, fixturesPath, filename, fs.readFileSync(filename, "utf-8"),
        function(err, loaded) {
          if (err) {
            throw err;
          }
          expect(loaded).to.be.a('string');
          expect(loaded).to.contain('h("div", {');
          expect(loaded).to.contain('Hello');
          expect(loaded).to.contain('llamas!!!');
          expect(loaded).to.contain('world');
          done();
        }
      );
    });
  });
});
