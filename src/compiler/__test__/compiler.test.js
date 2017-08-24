const compiler = require("../index.js");

describe("compiler", () => {
  it("has a main compiler", () => {
    expect(compiler.main).toBeDefined();
  });

  it("has a renderer compiler", () => {
    expect(compiler.renderer).toBeDefined();
  });
});
