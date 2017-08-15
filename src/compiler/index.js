const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const configs = require("./configs");

/**
 * Creates a compiler for the "main" or node.js files running on electron
 * @return {compiler} file
 */
function main(file) {
  return webpack(configs.main(file));
}

/**
 * Creates a compiler for the "renderer" or browser-side code. 
 * @param {compiler} file 
 */
function renderer(file) {
  return webpack(configs.renderer(file));
}

module.exports = { main, renderer };
