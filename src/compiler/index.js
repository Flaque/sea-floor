const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const configs = require("./configs");
const constants = require("./constants.js");

/**
 * Creates a compiler for the "main" or node.js files running on electron
 * @return {compiler} compiler instance
 */
function main(file) {
  return new Promise((resolve, reject) => {
    webpack(configs.main(file)).run((err, stats) => {
      if (err || stats.hasErrors()) {
        reject(stats.toString());
      }
      resolve(stats.toString());
    });
  });
}

/**
 * Creates a compiler for the "renderer" or browser-side code. 
 * @return {compiler} compiler instance 
 */
function renderer(file) {
  return webpack(configs.renderer(file));
}

/**
 * Creates a compiler for a React Component file
 * @param {String} file 
 */
function component(file) {
  return new Promise((resolve, reject) => {
    webpack(configs.component(file)).run((err, stats) => {
      if (err || stats.hasErrors()) {
        reject(stats.toString());
      }
      resolve(stats.toString());
    });
  });
}

module.exports = { main, renderer, component, constants, configs };
