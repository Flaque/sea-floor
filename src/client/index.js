console.log("Sea has created an electron window!");

var { ipcRenderer, remote } = require("electron");
var ReactDOM = require("react-dom");
var React = require("react");

ipcRenderer.on("sea-update", (event, component) => {
  console.log("Updating sea");
  console.log(window.__sea_root);
  ReactDOM.render(window.__sea_root, document.getElementById("root"));
});

console.log("Finished initalizing...");
