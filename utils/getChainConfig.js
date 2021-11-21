const {
  SHORT_CONFIG_OPTION,
  LONG_CONFIG_OPTION,
  SEPARATOR_IN_CONFIG,
} = require('../constants/cliConstants');

const { showError } = require('./showError');

const getChainConfig = (args) => {
  let chainConfig = [];
  const configArguments = args.filter(arg => arg === SHORT_CONFIG_OPTION || arg === LONG_CONFIG_OPTION);
  if (configArguments.length > 1) {
      showError('config', 'you provided -c argument more than once');
  }
  const idxShortConfigFlag = args.indexOf(SHORT_CONFIG_OPTION);
  const idxLongConfigFlag = args.indexOf(LONG_CONFIG_OPTION);
  
  if (idxShortConfigFlag >= 0) {
      chainConfig = args[idxShortConfigFlag + 1].split(SEPARATOR_IN_CONFIG);
  } else if (idxLongConfigFlag >= 0) {
      chainConfig = args[idxLongConfigFlag + 1].split(SEPARATOR_IN_CONFIG);
  } else if (idxShortConfigFlag < 0 && idxLongConfigFlag < 0){
     showError('config', 'need correct spelling, looks like -c or --config is missed.');
  }

  return chainConfig;
};

module.exports = { getChainConfig };
