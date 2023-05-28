const dirTree = require("directory-tree");
const p = require("path");
const util = require("util");
const fs = require("fs");
const chalk = require("chalk");

const sectionsPath = p.join(__dirname, "..", "..", "..", "sections");
const navFilePath = p.join(__dirname, "..", "..", "..", "nav.generated.js");

let importStrings = "";

const nodeCallback = (item, _path) => {
  const { path, name } = item;
  const baseName = p.parse(path).name;
  const relativePath = path.replace(sectionsPath, "");
  const namespace = relativePath.replace(/\.(js|ts)$/g, "");
  const codeNamespace = namespace.split("\\").join("_");

  item.id = namespace.split("\\").join("");
  item.name = baseName.replaceAll("_", " ");
  // if it's a file
  if (!!p.extname(path)) {
    item.code = codeNamespace;
    importStrings += `\n import ${codeNamespace} from "./sections${relativePath.replaceAll(
      "\\",
      "/"
    )}"`;
  }
  delete item.path;
};

module.exports = () => {
  const navTree = dirTree(
    sectionsPath,
    { extensions: /\.(js|ts)$/ },
    nodeCallback,
    nodeCallback
  );

  const navString = util
    .inspect(navTree.children, { depth: 10 })
    // unquote import
    .replace(/code: '(.+)'/g, "code: $1");

  const navContent = `${importStrings}\n\n\nexport default ${navString}`;

  fs.writeFile(navFilePath, navContent, "utf8", (err) => {
    if (err) throw ("Error crating nav file", err);
    console.log(
      chalk.bold.greenBright("Navigation config file successfully updated!")
    );
  });
};
