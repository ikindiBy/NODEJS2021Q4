
const { pipeline } = require('stream');
const { ReadableForCipherSource } = require('./ReadableForCipherSource');
const { WritableForCipher } = require('./WritableForCipher');
const {
    SHORT_CONFIG_OPTION,
    LONG_CONFIG_OPTION,
    SHORT_INPUT_OPTION,
    LONG_INPUT_OPTION,
    SHORT_OUTPUT_OPTION,
    LONG_OUTPUT_OPTION,
    SEPARATOR_IN_CONFIG,
} = require('./cliConstants');

const { getArrayOfTransformStreams } = require('./utils');

const showError = (message) => {
    process.stderr.write(`Smth went wrong with ${message}.`);
    // console.log('Smth went wrong with ', message);
};

const args = process.argv.slice(2);

let chainConfig = [];
const idxShortConfigFlag = args.indexOf(SHORT_CONFIG_OPTION);
const idxLongConfigFlag = args.indexOf(LONG_CONFIG_OPTION);

if (idxShortConfigFlag >= 0) {
    chainConfig = args[idxShortConfigFlag + 1].split(SEPARATOR_IN_CONFIG);
} else if (idxLongConfigFlag >= 0) {
    chainConfig = args[idxLongConfigFlag + 1].split(SEPARATOR_IN_CONFIG);
} else {
    showError('config');
}

let inputFile;
const idxShortInputOption = args.indexOf(SHORT_INPUT_OPTION);
const idxLongInputOption = args.indexOf(LONG_INPUT_OPTION);

if (idxShortInputOption >= 0) {
    inputFile = args[idxShortInputOption + 1];
} else if (idxLongInputOption >= 0) {
    inputFile = args[idxLongInputOption + 1];
} else {
    showError('input file');
}

let outputFile;
const idxShortOutputOption = args.indexOf(SHORT_OUTPUT_OPTION);
const idxLongOutputOption = args.indexOf(LONG_OUTPUT_OPTION);

if (idxShortOutputOption >= 0) {
    outputFile = args[idxShortOutputOption + 1];
} else if (idxLongOutputOption >= 0) {
    outputFile = args[idxLongOutputOption + 1];
} else {
    showError('output file');
}

if (inputFile && outputFile) {
    const readableSource = new ReadableForCipherSource(inputFile);
    const writableStream = new WritableForCipher(outputFile);
    const arrayOfTransformStreams = getArrayOfTransformStreams(chainConfig);

    pipeline(
        readableSource,
        ...arrayOfTransformStreams,
        writableStream,
        (err) => {
            if (err) {
                showError('pipeline');
            } 
        }
    );
}



// console.log(process.argv, chainConfig, inputFile, outputFile);
// process.stdout.write('The end!');
// Buffer.concat([a,b,c])
// process.stdout
// process.stdin
// hightWatterMark <--> drain 
