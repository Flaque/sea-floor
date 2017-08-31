const compiler = require("../index.js");

// If this fails, we want to wait a bit so we can see the actual error
// and not just some weird timeout issue.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("compiler", () => {
  it("can compile an example main with no errors", () => {
    expect.assertions(1);
    return expect(
      compiler.main("examples/counter/main.js")
    ).resolves.toBeDefined();
  });

  it("can compile a renderer client file with no errors", () => {
    expect.assertions(1);
    return expect(
      compiler.renderer("src/client/index.js")
    ).resolves.toBeDefined();
  });

  it("can compile a component file with no errors", () => {
    expect.assertions(1);
    return expect(
      compiler.component("examples/counter/components/App.js")
    ).resolves.toBeDefined();
  });

  // TODO Create tests for compiler.renderer and compiler.component
});
