const compiler = require("../index.js");

// If this fails, we want to wait a bit so we can see the actual error
// and not just some weird timeout issue.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

function testCompiler(type, filename) {
  expect.assertions(1);
  return expect(compiler[type](filename)).resolves.toBeDefined();
}

describe("compiler", () => {
  it("can compile an example main with no errors", () => {
    return testCompiler("main", "examples/counter/main.js");
  });

  it("can compile a component file with no errors", () => {
    return testCompiler("component", "examples/counter/components/App.js");
  });
});
