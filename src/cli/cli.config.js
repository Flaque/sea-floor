const path = require("path");
const webpack = require("webpack");
const fs = require("fs");

// Ignores weird node module issues
var nodeModules = {};
fs
  .readdirSync("node_modules")
  .filter(function(x) {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = "commonjs " + mod;
  });

// The actual config
module.exports = {
  entry: path.resolve("src/cli/index.js"),
  output: {
    path: path.resolve("dist"),
    filename: "cli.js"
  },
  plugins: [
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })
  ],
  node: {
    __dirname: true,
    __filename: true
  },
  target: "node",
  externals: nodeModules
};
