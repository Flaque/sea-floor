const configs = require("../index.js");
const { USER_BUNDLE_FILENAME } = require("../../constants.js");
const config = configs.component;

describe("userComponent", () => {
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
    expect(config("dummy").output.filename).toBe(USER_BUNDLE_FILENAME);
  });

  test("it's being bundled as a commonjs library", () => {
    expect(config("dummy").output.library).toBeDefined();
    expect(config("dummy").output.libraryTarget).toBe("commonjs");
  });
});
