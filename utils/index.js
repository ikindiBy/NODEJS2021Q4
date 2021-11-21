const { showError } = require('./showError');
const { getChainConfig } = require('./getChainConfig');
const { getInputFile } = require('./getInputFile');
const { getOutputFile } = require('./getOutputFile');
const { getArrayOfTransformStreams } = require('./getArrayOfTransformStreams');

module.exports = {
  getArrayOfTransformStreams,
  getChainConfig,
  getInputFile,
  getOutputFile,
  showError,
};
