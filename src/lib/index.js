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

const COMPONENT_FILEPATH = path.join(
  process.cwd(),
  ".sea",
  "bundle",
  compiler.constants.USER_BUNDLE_FILENAME
);

function createWindow(url) {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: true
  });
  mainWindow.loadURL(url);
  return mainWindow;
}

function nodeModulePath(mod) {
  var nodeModDir = __non_webpack_require__.resolve(mod);
  var dirnm = "node_modules";
  var pos = nodeModDir.lastIndexOf(dirnm);
  if (pos != -1) nodeModDir = nodeModDir.substr(0, pos + dirnm.length + 1);

  return nodeModDir + mod;
}

function buildHtmlDataUri(component, sourceFilepath) {
  const reactDOMPath = nodeModulePath("react-dom");
  const reactPath = nodeModulePath("react");

  const markup = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hi</title>
        <meta charset="UTF-8">
      </head>
        <div id="root">
          ${component}
        </div>
      <footer>
        <script> 
        var ReactDOM = require("${reactDOMPath}");
        var React = require("${reactPath}");

        var componentFunc = require("${sourceFilepath}").app.default; 
        var component = React.createElement(componentFunc, {}, null);
        
        ReactDOM.render(component, document.getElementById("root"));
        </script>
      </footer>
    </html>
  `;

  return "data:text/html;charset=UTF-8," + encodeURIComponent(markup);
}

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
function openApp(component, sourceFilepath) {
  app.on("ready", () => {
    let window = createWindow(
      buildHtmlDataUri(ReactDOMServer.renderToString(component), sourceFilepath)
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
 * @return {Promise} a promise for when the project opens.
 */
function open(filepath) {
  if (!path.isAbsolute(filepath)) {
    throw errors.PATH_IS_NOT_ABSOLUTE(filepath);
  }

  compileRenderer();

  return compiler.component(filepath).then(stats => {
    const App = __non_webpack_require__(COMPONENT_FILEPATH).app.default;
    return openApp(<App />, COMPONENT_FILEPATH);
  });
}

module.exports = { open };
