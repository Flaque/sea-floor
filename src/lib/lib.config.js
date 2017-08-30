const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const compiler = require("../compiler");

const config = compiler.configs.main("/src/lib/index.js");
config.output = {
  path: path.resolve("dist"),
  filename: "lib.js",
  library: "app",
  libraryTarget: "commonjs2"
};
config.target = "node";

module.exports = config;
