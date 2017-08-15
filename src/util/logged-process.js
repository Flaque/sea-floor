/**
 * A node child process that spits out it's info to the main console.log
 */

const proc = require("child_process");

/**
 * Spawns a child process that will log it's info.
 */
function spawn(command, args, options) {
  const child = proc.spawn(command, args, options);

  child.stdout.on("data", function(data) {
    console.log(data.toString());
    //Here is where the output goes
  });
  child.stderr.on("data", function(data) {
    console.error(data.toString());
    //Here is where the error output goes
  });
  child.on("close", function(code) {
    console.log("Child process exited with: " + code);
    //Here you can get the exit code of the script
  });

  return child;
}

module.exports = { spawn };
