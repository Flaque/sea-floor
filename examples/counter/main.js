import path from "path";
import Sea from "../../src/lib"; // In your app, make this "sea-floor"

Sea.open(path.join(__dirname, "components/App.js"))
  .then(app => {
    console.log("We got an app!");
  })
  .catch(err => {
    console.error(err);
  });
