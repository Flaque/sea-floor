const { app, BrowserWindow, ipcMain } = require("electron");
const dataUri = require("strong-data-uri");
const path = require("path");
const url = require("url");
const compiler = require("../compiler");
const ReactDOMServer = require("react-dom/server");
const fs = require("fs");
const React = require("react");
const errors = require("./errors.js");
const _eval = require("eval");
const buildHtmlDataUri = require("./html.js");
const createWindow = require("./window.js");

const COMPONENT_FILEPATH = path.join(
  process.cwd(),
  ".sea",
  "bundle",
  compiler.constants.USER_BUNDLE_FILENAME
);

/**
 * TODO: Move this into a setup script or something.
 */
function compileRenderer() {
  return compiler.renderer("src/client/index.js");
}

/**
 * Opens a react component in an Electron app
 * @param {React} component 
 */
function openApp(component, sourceFilepath, windowOptions) {
  app.on("ready", () => {
    let window = createWindow(
      buildHtmlDataUri(
        ReactDOMServer.renderToString(component),
        sourceFilepath
      ),
      windowOptions
    );

    window.once("ready-to-show", () => {
      window.show();
      window.webContents.send("sea-update", component);
    });
  });

  app._events.ready(); // TODO: Setup a better compile->launch pipeline because this is a hack

  return app;
}

/**
 * Opens a new Electron window with a React Component filepath. 
 * @param {String} filepath 
 * @param {Object} windowOptions passed into the window
 * @return {Promise} a promise for when the project opens.
 */
function open(filepath, windowOptions) {
  compileRenderer();

  return compiler.component(filepath).then(stats => {
    const App = __non_webpack_require__(COMPONENT_FILEPATH).app.default;
    return openApp(<App />, COMPONENT_FILEPATH, windowOptions);
  });
}

module.exports = { open };
