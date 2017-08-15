/**
 * TODO: NOT BEING USED YET BUT WILL BE EVENTUALLY.
 */
console.log("Sea has created an electron window!");

var { ipcRenderer, remote } = require("electron");
var ReactDOM = require("react-dom");

ipcRenderer.on("sea-update", (event, component) => {
  console.log("Updating React Component");
  ReactDOM.render(component, document.getElementById("root"));
});

console.log("Finished initalizing...");
