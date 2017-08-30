const webpack = require("webpack");
const configs = require("./configs");

/**
 * Compiles a file with a specific config, then returns a promise
 * @param {String} type 
 * @param {String} file
 * @return {Promise}
 */
function compileWith(type, file) {
  return new Promise((resolve, reject) => {
    webpack(configs[type](file)).run((err, stats) => {
      if (err || stats.hasErrors()) {
        reject(stats.toString());
      }
      resolve(stats.toString());
    });
  });
}

module.exports = compileWith;
