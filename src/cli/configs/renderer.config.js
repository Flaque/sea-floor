const { RENDERER_BUNDLE_FILENAME } = require("./constants.js");

const config = fileToOpen => {
  return {
    entry: `./${fileToOpen}`,
    output: {
      path: path.resolve(process.cwd(), ".sea/bundle"),
      filename: RENDERER_BUNDLE_FILE_NAME
    }
  };
};

module.exports = config;
