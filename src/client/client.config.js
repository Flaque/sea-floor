const path = require("path");

const config = {
  entry: path.resolve("src/client/index.js"),
  output: {
    path: path.resolve("dist"),
    filename: "renderer.js"
  },
  target: "electron-renderer"
};

module.exports = config;
