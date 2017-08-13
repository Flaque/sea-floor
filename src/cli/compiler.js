const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const { RENDERER_BUNDLE_FILENAME } = require("./constants.js");

/**
 * Main webpack config 
 */
const config = fileToOpen => {
  return {
    context: path.resolve(__dirname, "../../"),
    entry: `./${fileToOpen}`,
    output: {
      path: path.resolve(process.cwd(), ".sea/bundle"),
      filename: RENDERER_BUNDLE_FILENAME
    },
    target: "electron"
  };
};

/**
 * Creates the compiler
 * @return {compiler}
 */
function compile(file) {
  return webpack(config(file), (err, status) => {
    if (err) console.error(err);
    console.log(status.toString());
  });
}

module.exports = { compile, config };
