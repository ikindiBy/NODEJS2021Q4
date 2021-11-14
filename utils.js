const { TransformForCipher } = require('./TransformForCipher');
const { CEASER_TYPE, ATBASH_TYPE, ROT8_TYPE } = require('./cipherConstants');
const {
    SHORT_CONFIG_OPTION,
    LONG_CONFIG_OPTION,
    SHORT_INPUT_OPTION,
    LONG_INPUT_OPTION,
    SHORT_OUTPUT_OPTION,
    LONG_OUTPUT_OPTION,
    SEPARATOR_IN_CONFIG,
} = require('./cliConstants');

const showError = (area, description) => {
    process.stderr.write(`Error in ${area}: ${description}`);
    process.exit(1);
};

const getArrayOfTransformStreams = (configArray) => {
    const arrayOfTransformStreams = configArray.map(configItem => {
        if (configItem === ATBASH_TYPE) {
            return new TransformForCipher({type: ATBASH_TYPE});
        }
    
        if (configItem[0] === CEASER_TYPE && configItem[1] === '0') {
            return  new TransformForCipher({type: CEASER_TYPE, decipher: true});
        }
    
        if (configItem[0] === CEASER_TYPE && configItem[1] === '1') {
            return  new TransformForCipher({type: CEASER_TYPE, decipher: false});
        }
    
        if (configItem[0] === ROT8_TYPE && configItem[1] === '0') {
            return  new TransformForCipher({type: ROT8_TYPE, decipher: true});
        }
    
        if (configItem[0] === ROT8_TYPE && configItem[1] === '1') {
            return  new TransformForCipher({type: ROT8_TYPE, decipher: false});
        }
    
        //error handling
    });

    return arrayOfTransformStreams;
};

const getChainConfig = (args) => {
    let chainConfig = [];
    const configArguments = args.filter(arg => arg === SHORT_CONFIG_OPTION || arg === LONG_CONFIG_OPTION);
    if (configArguments.length > 1) {
        showError('config', 'should be only one config argument.');
    }
    const idxShortConfigFlag = args.indexOf(SHORT_CONFIG_OPTION);
    const idxLongConfigFlag = args.indexOf(LONG_CONFIG_OPTION);
    
    if (idxShortConfigFlag >= 0 && idxLongConfigFlag < 0) {
        chainConfig = args[idxShortConfigFlag + 1].split(SEPARATOR_IN_CONFIG);
    } else if (idxLongConfigFlag >= 0 && idxShortConfigFlag < 0) {
        chainConfig = args[idxLongConfigFlag + 1].split(SEPARATOR_IN_CONFIG);
    } else if (idxShortConfigFlag < 0 && idxLongConfigFlag < 0){
       showError('config', 'need correct spelling');
    }

    return chainConfig;
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
    getChainConfig,
    getInputFile,
    getOutputFile,
    showError,
};
