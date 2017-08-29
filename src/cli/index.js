const compiler = require("../compiler");
const args = require("minimist")(process.argv.slice(2));
const electron = require("electron");
const proc = require("../util/logged-process.js");
const path = require("path");
const cli = require("commander");
const pkg = require("../../package.json");

/**
 * Launch an electron app.
 * @param {String} inputFile 
 */
function runElectronApp(inputFile) {
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
}

// Generic CLI version and description
cli.version(pkg.version).description(pkg.description);

// Define the "dev" action
cli
  .command("dev [filepath]")
  .description("Runs your electron app in development mode")
  .action((filepath, _) => {
    runElectronApp(filepath);
  });

// Boot up our CLI (Note that this needs to happen last)
cli.parse(process.argv);
