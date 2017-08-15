const configs = require("../index.js");
const { MAIN_BUNDLE_FILENAME } = require("../../constants.js");
const fs = require("fs");
const path = require("path");

const config = configs.main;

describe("main config", () => {
  test("it is targeting node", () => {
    expect(config("dummy").target).toBe("electron");
  });

  test("it has an entry point", () => {
    expect(config("dummy").entry).toBe("./dummy");
  });

  test("it has an output", () => {
    expect(config("dummy").output.filename).toBe(MAIN_BUNDLE_FILENAME);
  });

  test("it's using a valid context", () => {
    const context = config("dummy").context;

    // node_modules are required in the context otherwise require's will fail.
    const contextHasNodeModules = fs.existsSync(
      path.resolve(context, "node_modules")
    );
    expect(contextHasNodeModules).toBe(true);
  });
});
