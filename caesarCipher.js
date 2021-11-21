const { SHIFT_STEP_CEASAR } = require('./cipherConstants');
const { getShiftedEncrypted } = require('./cipherWithShift');

const getCaesarEncrypted = (string, decipher) => getShiftedEncrypted(string, SHIFT_STEP_CEASAR, decipher);


module.exports = { getCaesarEncrypted };