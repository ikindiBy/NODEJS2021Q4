const { SHIFT_STEP_ROT8 } = require('../constants/cipherConstants');
const { getShiftedEncrypted } = require('./cipherWithShift');

const getRot8Encrypted = (string, decipher) => getShiftedEncrypted(string, SHIFT_STEP_ROT8, decipher);

module.exports = { getRot8Encrypted };