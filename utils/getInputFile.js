const {
  SHORT_INPUT_OPTION,
  LONG_INPUT_OPTION,
} = require('../constants/cliConstants');

const { showError } = require('./showError');
const getInputFile = (args) => {
  let inputFile;

  const inputArguments = args.filter(arg => arg === SHORT_INPUT_OPTION || arg === LONG_INPUT_OPTION);
  if (inputArguments.length > 1) {
      showError('input file', 'should be only one input argument.');
  }

  const idxShortInputOption = args.indexOf(SHORT_INPUT_OPTION);
  const idxLongInputOption = args.indexOf(LONG_INPUT_OPTION);

  if (idxShortInputOption >= 0) {
      inputFile = args[idxShortInputOption + 1];
  } else if (idxLongInputOption >= 0) {
      inputFile = args[idxLongInputOption + 1];
  }

  return inputFile;
};

module.exports = { getInputFile };