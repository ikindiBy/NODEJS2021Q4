const { CEASER_TYPE, ATBASH_TYPE, ROT8_TYPE } = require('../constants/cipherConstants');
const {
    ENCODING_FLAG,
    DECODING_FLAG,
    MAX_LENGTH_CONFIG_ITEM,
} = require('../constants/cliConstants');

const { showError } = require('./showError');

const checkEncodingDecodingFlag = (flag) => {
  if (!flag) {
      showError('config', 'config should include encoding/decoding flag.');
  }

  if (flag !== ENCODING_FLAG && flag !== DECODING_FLAG) {
      showError('config', 'config should include encoding/decoding flag like 0 or 1.');
  }
};

const validateConfig = (configItem) => {
  if (configItem[0] !== ATBASH_TYPE
      && configItem[0] !== CEASER_TYPE
      && configItem[0] !== ROT8_TYPE
  ) {
      showError('config', 'config should include only A or C or R flags.');
  }

  if (configItem.length > MAX_LENGTH_CONFIG_ITEM) {
      showError('config', 'incorrect config: should include only A/C/R flags and 0/1.');
  }

  if (configItem[0] === ATBASH_TYPE && configItem.length > 1) {
      showError('config', 'atbash config shouldn\'t include encoding/decoding flag');
  }

  if ((configItem[0] === CEASER_TYPE || configItem[0] === ROT8_TYPE) && configItem.length !== 2) {
      showError('config', 'C or R config should include direction of encoding (0 or 1)');
  }

  if (configItem.length === MAX_LENGTH_CONFIG_ITEM) {
      checkEncodingDecodingFlag(configItem[1]);
  }
};

module.exports = { validateConfig, checkEncodingDecodingFlag };
