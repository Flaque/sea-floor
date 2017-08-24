import path from "path";
import Sea from "../../src/lib"; // In your app, make this "sea-floor"

const app = Sea.open(path.resolve(__dirname, "./components/App.js"));
