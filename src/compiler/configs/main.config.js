const { MAIN_BUNDLE_FILENAME } = require("../constants.js");
const reactModules = require("./reactmodule.js");
const path = require("path");
const fs = require("fs");

/**
 * This fixes an error where requiring items from the electron main process
 * will result in a weird webpack issue like this:
 * 
 * Critical dependencies:
 * 50:48-69 the request of a dependency is an expression
 * 
 * You can read more about what this does here: 
 * http://jlongster.com/Backend-Apps-with-Webpack--Part-I
 */
const getExternals = () => {
  let nodeModules = {};
  fs
    .readdirSync("node_modules")
    .filter(function(x) {
      return [".bin"].indexOf(x) === -1;
    })
    .forEach(function(mod) {
      nodeModules[mod] = "commonjs " + mod;
    });
  return nodeModules;
};

/**
 * A function that returns our webpack config for Electron's 
 * "main" process.
 * @param {String} fileToOpen 
 */
const config = fileToOpen => {
  return {
    context: path.resolve(__dirname, "../../../"),
    entry: `./${fileToOpen}`,
    output: {
      path: path.resolve(process.cwd(), ".sea/bundle"),
      filename: MAIN_BUNDLE_FILENAME
    },
    node: {
      __dirname: true,
      __filename: true
    },
    resolveLoader: {
      modules: ["node_modules", "node_modules/sea-floor/node_modules"]
    },
    target: "electron-main",
    module: reactModules,
    externals: getExternals()
  };
};

module.exports = config;
