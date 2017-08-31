const configs = require("../index.js");
const { RENDERER_BUNDLE_FILENAME } = require("../../constants.js");
const config = configs.renderer;

describe("renderer", () => {
  test("it is defined", () => {
    expect(config).toBeDefined();
  });

  test("it is targeting electron-renderer", () => {
    expect(config("dummy").target).toBe("electron-renderer");
  });

  test("it has an entry point", () => {
    expect(config("dummy").entry).toBe("./dummy");
  });

  test("it has an output", () => {
    expect(config("dummy").output.filename).toBe(RENDERER_BUNDLE_FILENAME);
  });
});
