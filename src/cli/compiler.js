const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const configs = require("./configs");

/**
 * Creates the compiler
 * @return {compiler}
 */
function compile(file) {
  return webpack(configs.main(file));
}

module.exports = { compile, config };
