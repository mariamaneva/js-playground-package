#!/usr/bin/env node
const creatorFn = require("./creator");
const yargs = require("yargs");
const chalk = require("chalk");
const generateNav = require("./../buildNavigation");

yargs
  .scriptName("playground")
  .usage("$0 [args]")
  .command(
    "new-page",
    "provide a relative path and filename for the new template, which will be crated in the sections folder. This automatically updates the nav.generated.js file",
    (yargs) => {
      yargs.positional("path", {
        type: "string",
      });
    },
    creatorFn
  )
  .example(
    chalk.bold.greenBright("npm run new-page -- test_sub_dir/binary_tree.ts")
  )
  .command(
    "update-nav",
    "rebuild the navigation config after manually editing the sections folder",
    generateNav
  )
  .example(chalk.bold.greenBright("npm run update-nav"))
  .help().argv;

require("./index.js")();
