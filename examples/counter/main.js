import path from "path";
import Sea from "../../src/lib"; // In your app, make this "sea-floor"

Sea.open(path.resolve(__dirname, "./components/App.js"))
  .then(app => {
    // console.log(app);
  })
  .catch(err => {
    console.error(err);
  });
