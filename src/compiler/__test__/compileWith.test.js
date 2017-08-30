const compileWith = require("../compileWith.js");

// If this fails, we want to wait a bit so we can see the actual error
// and not just some weird timeout issue.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

function isFunction(functionToCheck) {
  var getType = {};
  return (
    functionToCheck &&
    getType.toString.call(functionToCheck) === "[object Function]"
  );
}

describe("compileWith", () => {
  test("it is defined as a function", () => {
    expect(isFunction(compileWith)).toBe(true);
  });
});
