#! /usr/bin/env node

const compiler = require("../compiler");
const args = require("minimist")(process.argv.slice(2));
const electron = require("electron");
const proc = require("../util/logged-process.js");
const path = require("path");

// Read in input and compile it to the cache.
const inputFile = args._[0];
console.log(`Compiling ${inputFile}`);
const webpack = compiler.main(inputFile);

webpack.run((err, status) => {
  // Launch electron
  const bundle = path.resolve(
    process.cwd(),
    ".sea",
    "bundle",
    "sea.bundle.main.js"
  ); // TODO: put this in constants
  const child = proc.spawn(electron, [bundle]);
});
