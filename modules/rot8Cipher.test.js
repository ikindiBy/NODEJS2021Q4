const { getRot8Encrypted } = require('./rot8Cipher');

test('ROT8 for empty string', () => {
  expect(getRot8Encrypted('')).toBe('');
});

test('ROT8 for string in lower case', () => {
  expect(getRot8Encrypted('abc')).toBe('ijk');
});

test('ROT8 for string in upper case', () => {
  expect(getRot8Encrypted('XYZ')).toBe('FGH');
});

test('ROT8 for string in lower case in decipher mode', () => {
  expect(getRot8Encrypted('abc', true)).toBe('stu');
});

test('ROT8 for string in upper case in decipher mode', () => {
  expect(getRot8Encrypted('ABC', true)).toBe('STU');
});

test('ROT8 for string with not appropriate letters', () => {
  expect(getRot8Encrypted('123Тест*+-:№"%:!')).toBe('123Тест*+-:№"%:!');
});