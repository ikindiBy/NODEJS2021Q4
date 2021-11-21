const { getCaesarEncrypted } = require('./caesarCipher');

test('caesarCipher for empty string', () => {
  expect(getCaesarEncrypted('')).toBe('');
});

test('caesarCipher for string in lower case', () => {
  expect(getCaesarEncrypted('abc')).toBe('bcd');
});

test('caesarCipher for string in upper case', () => {
  expect(getCaesarEncrypted('XYZ')).toBe('YZA');
});

test('caesarCipher for string in lower case in decipher mode', () => {
  expect(getCaesarEncrypted('abc', true)).toBe('zab');
});

test('caesarCipher for string in upper case in decipher mode', () => {
  expect(getCaesarEncrypted('XYZ', true)).toBe('WXY');
});

test('caesarCipher for string with not appropriate letters', () => {
  expect(getCaesarEncrypted('123Тест*+-:№"%:!')).toBe('123Тест*+-:№"%:!');
});