const { TransformForCipher } = require('../modules/TransformForCipher');
const { CEASER_TYPE, ATBASH_TYPE, ROT8_TYPE } = require('../constants/cipherConstants');
const {
    ENCODING_FLAG,
    DECODING_FLAG,
    SHORT_INPUT_OPTION,
    LONG_INPUT_OPTION,
    SHORT_OUTPUT_OPTION,
    LONG_OUTPUT_OPTION,
} = require('../constants/cliConstants');

const { showError } = require('./showError');
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

const getInputFile = (args) => {
    let inputFile;

    const inputArguments = args.filter(arg => arg === SHORT_INPUT_OPTION || arg === LONG_INPUT_OPTION);
    if (inputArguments.length > 1) {
        showError('input file', 'should be only one argument.');
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


module.exports = {
    getArrayOfTransformStreams,
    getInputFile,
    getOutputFile,
};
