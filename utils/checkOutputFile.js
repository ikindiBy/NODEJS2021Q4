const path = require("path");
const fs = require("fs");

const { showError } = require('./showError');

const checkOutputFile = (pathFromCli) => {
  const outputFilePath = path.resolve(pathFromCli);

  if (!fs.existsSync(outputFilePath, fs.constants.W_OK)) {
    showError('output file', `file with the path: ${pathFromCli} doesn't exist or has no permission for writing`);
  }
};

module.exports = { checkOutputFile };