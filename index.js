#!/usr/bin/env node

// process.on("beforeExit", (code) => {
//   console.log("Process beforeExit event with code: ", code);
// });

// process.on("exit", (code) => {
//   console.log("Process exit event with code: ", code);
// });

// const args = process.argv.slice(2);

// process.stdout.write("enter your name: ");

// process.stdin.on("data", (data) => {
//   console.log(data.toString());
//   process.exit();
// });
// console.log(`Your Home Directory: ${process.env.HOME}`);
// console.log(`Your Shell: ${process.env.SHELL}`);
// console.log(`Hello, ${process.env.MY_NAME || "Guest"}!`);
// console.log(`Current working directory: ${process.cwd()}`);
// process.on("exit", (code) => {
//   console.log(`Process is exiting with code ${code}`);
// });
// console.log(`Process ID: ${process.pid}`);
// console.log(`Node.js version: ${process.version}`);
// console.log(`Running on: ${process.platform}`);
/* "win32" → Windows
"darwin" → macOS
"linux" → Linux */


process.stdout.write("Proxy Name");
process.stdin.on("data", (data) => {
  console.log(`Hello, ${data.toString().trim()}!`);
  process.exit(0);
});

process.on("exit", () => {
  console.log("Goodbye!");
});
