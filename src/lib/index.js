const electron = require("electron");
const dataUri = require("strong-data-uri");
const path = require("path");
const url = require("url");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

function createWindow(url) {
  const mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL(url);
  return mainWindow;
}

function buildHtmlDataUri(src) {
  const loadView = () => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hi</title>
        <meta charset="UTF-8">
      </head>
      <body>
        <div id="root">
        </div>
        <script>
          console.log("Hey!");
        </script>
      </body>
    </html>
  `;
  };

  return "data:text/html;charset=UTF-8," + encodeURIComponent(loadView());
}

function open(component) {
  console.log(JSON.stringify(component));

  app.on("ready", () => {
    createWindow(buildHtmlDataUri("oh"));
  });

  return app;
}

module.exports = { open };
