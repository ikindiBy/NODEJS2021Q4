const { TransformForCipher } = require('../modules/TransformForCipher');
const { CEASER_TYPE, ATBASH_TYPE, ROT8_TYPE } = require('../constants/cipherConstants');
const {
    ENCODING_FLAG,
    DECODING_FLAG,
} = require('../constants/cliConstants');

const { validateConfig } = require('./validateConfig');

const getArrayOfTransformStreams = (configArray) => {
    const arrayOfTransformStreams = configArray.map(configItem => {
        validateConfig(configItem);

        if (configItem[0] === ATBASH_TYPE) {
            return new TransformForCipher({type: ATBASH_TYPE});
        }

        if (configItem[0] === CEASER_TYPE && configItem[1] === DECODING_FLAG) {
            return  new TransformForCipher({type: CEASER_TYPE, decipher: true});
        }
    
        if (configItem[0] === CEASER_TYPE && configItem[1] === ENCODING_FLAG) {
            return  new TransformForCipher({type: CEASER_TYPE, decipher: false});
        }
    
        if (configItem[0] === ROT8_TYPE && configItem[1] === DECODING_FLAG) {
            return  new TransformForCipher({type: ROT8_TYPE, decipher: true});
        }
    
        if (configItem[0] === ROT8_TYPE && configItem[1] === ENCODING_FLAG) {
            return  new TransformForCipher({type: ROT8_TYPE, decipher: false});
        }
    });

    return arrayOfTransformStreams;
};

module.exports = { getArrayOfTransformStreams };
