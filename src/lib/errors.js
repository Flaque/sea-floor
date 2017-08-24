module.exports = {
  PATH_IS_NOT_ABSOLUTE: filepath =>
    new Error(
      `The file path: "${filepath}" is not an absolute path. That's currently not supported! 😭
       Example usage: Sea.open(path.resolve(__dirname, "./components/App.js")); \n `
    )
};
