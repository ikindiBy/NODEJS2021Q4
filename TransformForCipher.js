const { Transform } = require('stream');
const { getCaesarEncrypted } = require('./caesarCipher');
const { getAtbashEncrypted } = require('./atbashCipher');
const { getRot8Encrypted } = require('./rot8Cipher');

const { CEASER_TYPE, ATBASH_TYPE, ROT8_TYPE } = require('./cipherConstants');


class TransformForCipher extends Transform {
    constructor (options = {}) {
        options = Object.assign({}, options, {
            decodeStrings: false // for UTF8
        });
        super(); // think about items that will be passed here
        this.params = options;
    }

    _transform(chunk, encoding, cb) {
        let handledString;
        if (this.params.type === ATBASH_TYPE) {
            handledString =  getAtbashEncrypted(chunk.toString());
        } else if (this.params.type === CEASER_TYPE) {
            handledString = getCaesarEncrypted(chunk.toString(), this.params.decipher);
        } else if (this.params.type === ROT8_TYPE) {
            handledString = getRot8Encrypted(chunk.toString(), this.params.decipher);
        }
        
        this.push(handledString);
        cb();
    }

};

module.exports = { TransformForCipher };