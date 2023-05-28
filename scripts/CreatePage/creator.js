const fs = require("fs");
const path = require("path");
const getDirName = require("path").dirname;
const generateNav = require("./../buildNavigation");
const chalk = require("chalk");

module.exports = ({ path: argsPath }) => {
  try {
    const templateFilePath = path.join(__dirname, "sample.js");
    const destinationFilePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "..",
      "sections",
      argsPath
    );
    fs.readFile(templateFilePath, "utf8", (err, fileContents) => {
      if (err) throw ("Error reading template", err);
      fs.mkdir(getDirName(destinationFilePath), { recursive: true }, () => {
        fs.writeFile(destinationFilePath, fileContents, "utf8", (err) => {
          if (err) throw ("Error crating file", err);
          console.log(chalk.bold.greenBright("Template successfully created!"));
          generateNav();
        });
      });
    });
  } catch (err) {
    throw err;
  }
};
