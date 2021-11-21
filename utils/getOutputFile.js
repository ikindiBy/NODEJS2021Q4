const {
  SHORT_OUTPUT_OPTION,
  LONG_OUTPUT_OPTION,
} = require('../constants/cliConstants');

const { showError } = require('./showError');

const getOutputFile = (args) => {
  let outputFile;

  const outputArguments = args.filter(arg => arg === SHORT_OUTPUT_OPTION || arg === LONG_OUTPUT_OPTION);
  if (outputArguments.length > 1) {
      showError('output file', 'should be only one argument.');
  }

  const idxShortOutputOption = args.indexOf(SHORT_OUTPUT_OPTION);
  const idxLongOutputOption = args.indexOf(LONG_OUTPUT_OPTION);

  if (idxShortOutputOption >= 0) {
      outputFile = args[idxShortOutputOption + 1];
  } else if (idxLongOutputOption >= 0) {
      outputFile = args[idxLongOutputOption + 1];
  }

  return outputFile;
};

module.exports = { getOutputFile };
