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

module.exports = buildHtmlDataUri;
