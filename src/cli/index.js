#! /usr/bin/env node

const { compile } = require("./compiler.js");
const args = require("minimist")(process.argv.slice(2));
const electron = require("electron");
const proc = require("child_process");
const path = require("path");

// Read in input and compile it to the cache.
const inputFile = args._[0];
compile(inputFile);

// Launch electron
const bundle = path.resolve(process.cwd(), ".sea", "bundle", "sea.bundle.js"); // TODO: put this in constants
const child = proc.spawn(electron, [bundle]);
