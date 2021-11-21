const path = require("path");
const fs = require("fs");

const { showError } = require('./showError');

const checkInputFile = (pathFromCli) => {
  const inputFilePath = path.resolve(pathFromCli);

  if (!fs.existsSync(inputFilePath, fs.constants.R_OK)) {
    showError('input file', `file with the path: ${pathFromCli} doesn't exist or has no permission for reading`);
  }
};

module.exports = { checkInputFile };