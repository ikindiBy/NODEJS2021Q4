const { getShiftedEncrypted, getIndexDependingOnDecipher } = require('./cipherWithShift');
const { SHIFT_STEP_CEASAR, SHIFT_STEP_ROT8 } = require('../constants/cipherConstants');

describe("getIndexDependingOnDecipher ", () => {
  test('for CEASER in decipher mode', () => {
    expect(getIndexDependingOnDecipher(SHIFT_STEP_CEASAR, true, 1)).toBe(0);
  });
  
  test('for CEASER in cipher mode', () => {
    expect(getIndexDependingOnDecipher(SHIFT_STEP_CEASAR, false, 1)).toBe(2);
  });

  test('for ROT8 in decipher mode', () => {
    expect(getIndexDependingOnDecipher(SHIFT_STEP_ROT8, true, 25)).toBe(17);
  });

  test('for ROT8 in cipher mode', () => {
    expect(getIndexDependingOnDecipher(SHIFT_STEP_ROT8, false, 25)).toBe(7);
  });
});

describe("getShiftedEncrypted ", () => {
  test('for empty string', () => {
    const result = getShiftedEncrypted('');
    expect(result.length).toBe(0);
  });

  test('for string in lover case', () => {
    expect(getShiftedEncrypted('abc', SHIFT_STEP_CEASAR)).toBe('bcd');
  });

  test('for string in lover case in decifer mode', () => {
    expect(getShiftedEncrypted('abc', SHIFT_STEP_CEASAR, true)).toBe('zab');
  });

  test('for string in upper case', () => {
    expect(getShiftedEncrypted('ABC', SHIFT_STEP_CEASAR)).toBe('BCD');
  });

  test('for string in upper case in decifer mode', () => {
    expect(getShiftedEncrypted('ABC', SHIFT_STEP_CEASAR, true)).toBe('ZAB');
  });

  test('for string with not appropriate letters', () => {
    expect(getShiftedEncrypted('123Тест*+-:№"%:!', SHIFT_STEP_CEASAR)).toBe('123Тест*+-:№"%:!');
  });

});
