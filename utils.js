const { TransformForCipher } = require('./TransformForCipher');
const { CEASER_TYPE, ATBASH_TYPE, ROT8_TYPE } = require('./cipherConstants');

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
}



module.exports = {
    getArrayOfTransformStreams,
};
