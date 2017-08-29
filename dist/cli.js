#!/usr/bin/env node
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
  RENDERER_BUNDLE_FILENAME: "sea.bundle.renderer.js",
  MAIN_BUNDLE_FILENAME: "sea.bundle.main.js",
  USER_BUNDLE_FILENAME: "sea.bundle.userComponent.js"
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
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
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const compiler = __webpack_require__(5);
const args = __webpack_require__(11)(process.argv.slice(2));
const electron = __webpack_require__(12);
const proc = __webpack_require__(13);
const path = __webpack_require__(0);
const cli = __webpack_require__(15);
const pkg = __webpack_require__(16);

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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const webpack = __webpack_require__(6);
const path = __webpack_require__(0);
const fs = __webpack_require__(2);
const configs = __webpack_require__(7);
const constants = __webpack_require__(1);

/**
 * Creates a compiler for the "main" or node.js files running on electron
 * @return {compiler} compiler instance
 */
function main(file) {
  return new Promise((resolve, reject) => {
    webpack(configs.main(file)).run((err, stats) => {
      if (err || stats.hasErrors()) {
        reject(stats.toString());
      }
      resolve(stats.toString());
    });
  });
}

/**
 * Creates a compiler for the "renderer" or browser-side code. 
 * @return {compiler} compiler instance 
 */
function renderer(file) {
  return webpack(configs.renderer(file));
}

/**
 * Creates a compiler for a React Component file
 * @param {String} file 
 */
function component(file) {
  return new Promise((resolve, reject) => {
    webpack(configs.component(file)).run((err, stats) => {
      if (err || stats.hasErrors()) {
        reject(stats.toString());
      }
      resolve(stats.toString());
    });
  });
}

module.exports = { main, renderer, component, constants };


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const main = __webpack_require__(8);
const renderer = __webpack_require__(9);
const component = __webpack_require__(10);

module.exports = { main, renderer, component };


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const { MAIN_BUNDLE_FILENAME } = __webpack_require__(1);
const reactModules = __webpack_require__(3);
const path = __webpack_require__(0);
const fs = __webpack_require__(2);

/**
 * This fixes an error where requiring items from the electron main process
 * will result in a weird webpack issue like this:
 * 
 * Critical dependencies:
 * 50:48-69 the request of a dependency is an expression
 * 
 * You can read more about what this does here: 
 * http://jlongster.com/Backend-Apps-with-Webpack--Part-I
 */
const getExternals = () => {
  let nodeModules = {};
  fs
    .readdirSync("node_modules")
    .filter(function(x) {
      return [".bin"].indexOf(x) === -1;
    })
    .forEach(function(mod) {
      nodeModules[mod] = "commonjs " + mod;
    });
  return nodeModules;
};

/**
 * A function that returns our webpack config for Electron's 
 * "main" process.
 * @param {String} fileToOpen 
 */
const config = fileToOpen => {
  return {
    context: path.resolve(__dirname, "../../../"),
    entry: `./${fileToOpen}`,
    output: {
      path: path.resolve(process.cwd(), ".sea/bundle"),
      filename: MAIN_BUNDLE_FILENAME
    },
    node: {
      __dirname: true,
      __filename: true
    },
    target: "electron-main",
    module: reactModules,
    externals: getExternals()
  };
};

module.exports = config;

/* WEBPACK VAR INJECTION */}.call(exports, "src/compiler/configs"))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const { RENDERER_BUNDLE_FILENAME } = __webpack_require__(1);
const path = __webpack_require__(0);

const config = fileToOpen => {
  return {
    entry: `./${fileToOpen}`,
    output: {
      path: path.resolve(process.cwd(), ".sea/bundle"),
      filename: RENDERER_BUNDLE_FILENAME
    }
  };
};

module.exports = config;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const { USER_BUNDLE_FILENAME } = __webpack_require__(1);
const reactModules = __webpack_require__(3);
const path = __webpack_require__(0);

const config = fileToOpen => {
  return {
    entry: `${fileToOpen}`,
    output: {
      path: path.resolve(process.cwd(), ".sea/bundle"),
      filename: USER_BUNDLE_FILENAME,
      library: "app",
      libraryTarget: "commonjs"
    },
    target: "electron-renderer",
    module: reactModules
  };
};

module.exports = config;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("minimist");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * A node child process that spits out it's info to the main console.log
 */

const proc = __webpack_require__(14);

/**
 * Spawns a child process that will log it's info.
 */
function spawn(command, args, options) {
  const child = proc.spawn(command, args, options);

  child.stdout.on("data", function(data) {
    console.log(data.toString());
    //Here is where the output goes
  });
  child.stderr.on("data", function(data) {
    console.error(data.toString());
    //Here is where the error output goes
  });
  child.on("close", function(code) {
    console.log("Child process exited with: " + code);
    //Here you can get the exit code of the script
  });

  return child;
}

module.exports = { spawn };


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {"name":"sea-floor","version":"0.1.3","author":"@flaque","main":"src/index.js","license":"MIT","description":"A little tool for running electron apps.","scripts":{"start":"node ./dist/cli.js examples/counter/main.js","test":"jest","test-watch":"jest --watch","prepublish":"webpack --config src/cli/cli.config.js"},"devDependencies":{"jest":"^20.0.4"},"bin":{"sea":"./dist/cli.js"},"dependencies":{"ajv-keywords":"^2.1.0","babel-core":"^6.25.0","babel-loader":"^7.1.2","babel-preset-es2015":"^6.24.1","babel-preset-react":"^6.24.1","commander":"^2.11.0","electron":"1.7.5","eval":"^0.1.2","react":"^15.6.1","react-dom":"^15.6.1","strong-data-uri":"^1.0.4","webpack":"^3.5.4"}}

/***/ })
/******/ ]);