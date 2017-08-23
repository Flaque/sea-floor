const compiler = require("../index.js");

// If this fails, we want to wait a bit so we can see the actual error
// and not just some weird timeout issue.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("main compiler", () => {
  it("can compile an example with no errors", () => {
    expect.assertions(1);
    return expect(
      compiler.main("examples/counter/main.js")
    ).resolves.toBeDefined();
  });
});
