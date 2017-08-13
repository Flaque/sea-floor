const { MAIN_BUNDLE_FILENAME } = require("./constants.js");

const config = fileToOpen => {
  return {
    context: path.resolve(__dirname, "../../"),
    entry: `./${fileToOpen}`,
    output: {
      path: path.resolve(process.cwd(), ".sea/bundle"),
      filename: MAIN_BUNDLE_FILENAME
    },
    target: "electron",
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["es2015", "react"]
          }
        },
        {
          test: /\.jsx$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["es2015", "react"]
          }
        }
      ]
    }
  };
};

module.exports = config;
