const { app, BrowserWindow, ipcMain } = require("electron");
const dataUri = require("strong-data-uri");
const path = require("path");
const url = require("url");
const compiler = require("../compiler");
const ReactDOMServer = require("react-dom/server");
const fs = require("fs");
const tosource = require("tosource");
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
    show: false
  });
  mainWindow.loadURL(url);
  return mainWindow;
}

function buildHtmlDataUri(react) {
  const src = path.join(process.cwd(), "./src/client/index.js");

  const markup = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hi</title>
        <meta charset="UTF-8">
      </head>
      <body>
        <div id="root">
          ${react}
        </div>
      </body>
      <footer>
        
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
function openApp(component) {
  app.on("ready", () => {
    let window = createWindow(
      buildHtmlDataUri(ReactDOMServer.renderToString(component), component)
    );

    window.once("ready-to-show", () => {
      window.show();
      window.webContents.send("sea-update", component);
    });
  });

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
    return openApp(<App />);
  });
}

module.exports = { open };
