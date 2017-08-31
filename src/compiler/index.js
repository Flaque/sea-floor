const path = require("path");
const fs = require("fs");
const configs = require("./configs");
const constants = require("./constants.js");
const compileWith = require("./compileWith.js");

/**
 * Creates a compiler for the "main" or node.js files running on electron
 * @return {Promise}
 */
function main(file) {
  return compileWith("main", file);
}

/**
 * Creates a compiler for the "renderer" or browser-side code. 
 * @return {Promise}
 */
function renderer(file) {
  return compileWith("renderer", file);
}

/**
 * Creates a compiler for a React Component file
 * @param {String} file 
 * @return {Promise}
 */
function component(file) {
  return compileWith("component", file);
}

module.exports = { main, renderer, component, constants, configs };
