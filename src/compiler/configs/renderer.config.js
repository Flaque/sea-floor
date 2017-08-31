const { RENDERER_BUNDLE_FILENAME } = require("../constants.js");
const path = require("path");

const config = fileToOpen => {
  return {
    entry: `./${fileToOpen}`,
    output: {
      path: path.resolve(process.cwd(), ".sea/bundle"),
      filename: RENDERER_BUNDLE_FILENAME
    },
    target: "electron-renderer"
  };
};

module.exports = config;
