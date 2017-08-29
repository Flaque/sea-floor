const compiler = require("../compiler");
const args = require("minimist")(process.argv.slice(2));
const electron = require("electron");
const proc = require("../util/logged-process.js");
const path = require("path");

// Read in input and compile it to the cache.
const inputFile = args._[0];

compiler
  .main(inputFile)
  .then(status => {
    console.log(`Compiled main process at "${inputFile}".`);
    // Launch electron
    const bundle = path.resolve(
      process.cwd(),
      ".sea",
      "bundle",
      "sea.bundle.main.js"
    ); // TODO: put this in constants
    const child = proc.spawn(electron, [bundle]);
  })
  .catch(status => {
    console.error(status);
  });
