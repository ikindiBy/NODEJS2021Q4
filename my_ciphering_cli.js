
const { pipeline } = require('stream');

const { ReadableForCipherSource } = require('./modules/ReadableForCipherSource');
const { WritableForCipher } = require('./modules/WritableForCipher');
const {
    getArrayOfTransformStreams,
    getChainConfig,
    getInputFile,
    getOutputFile,
    showError,
} = require('./utils');

const args = process.argv.slice(2);

const chainConfig = getChainConfig(args);
const inputFile = getInputFile(args);
const outputFile = getOutputFile(args);

const readableSource = inputFile ? new ReadableForCipherSource(inputFile) : process.stdin;
const writableStream = outputFile ? new WritableForCipher(outputFile) : process.stdout;
const arrayOfTransformStreams = getArrayOfTransformStreams(chainConfig);

pipeline(
    readableSource,
    ...arrayOfTransformStreams,
    writableStream,
    (err) => {
        if (err) {
            showError('pipeline', err.message || 'something went wrong');
        } 
    }
);
