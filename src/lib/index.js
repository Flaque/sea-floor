const { app, BrowserWindow, ipcMain } = require("electron");
const dataUri = require("strong-data-uri");
const path = require("path");
const url = require("url");
const compiler = require("../compiler");
const ReactDOMServer = require("react-dom/server");

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
    </html>
  `;

  return "data:text/html;charset=UTF-8," + encodeURIComponent(markup);
}

/**
 * TODO: Move this into a setup script or something.
 */
function compileRenderer() {
  compiler.renderer("src/client/index.js").run((err, status) => {
    console.log("Compiled Renderer");
  });
}

function open(component) {
  compileRenderer();

  app.on("ready", () => {
    let window = createWindow(
      buildHtmlDataUri(ReactDOMServer.renderToString(component))
    );

    window.once("ready-to-show", () => {
      window.show();
    });
  });

  return app;
}

module.exports = { open };
