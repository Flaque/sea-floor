const { USER_BUNDLE_FILENAME } = require("../constants.js");
const reactModules = require("./reactmodule.js");
const path = require("path");

const config = fileToOpen => {
  return {
    entry: `${fileToOpen}`,
    output: {
      path: path.resolve(process.cwd(), ".sea/bundle"),
      filename: USER_BUNDLE_FILENAME,
      library: "app",
      libraryTarget: "commonjs"
    },
    target: "electron-renderer",
    module: reactModules
  };
};

module.exports = config;
