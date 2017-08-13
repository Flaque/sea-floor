#! /usr/bin/env node

const { compile } = require("./compiler.js");
const args = require("minimist")(process.argv.slice(2));
const electron = require("electron");
const proc = require("child_process");
const path = require("path");

// Read in input and compile it to the cache.
const inputFile = args._[0];
console.log(`Compiling ${inputFile}`);
const webpack = compile(inputFile);

webpack.run((err, status) => {
  // Launch electron
  const bundle = path.resolve(
    process.cwd(),
    ".sea",
    "bundle",
    "sea.bundle.main.js"
  ); // TODO: put this in constants
  const child = proc.spawn(electron, [bundle]);

  child.stdout.on("data", function(data) {
    console.log(data.toString());
    //Here is where the output goes
  });
  child.stderr.on("data", function(data) {
    console.error("ERROR" + data.toString());
    //Here is where the error output goes
  });
  child.on("close", function(code) {
    console.log("Closing code:", code);
    //Here you can get the exit code of the script
  });
});
