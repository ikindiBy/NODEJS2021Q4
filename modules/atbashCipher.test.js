const { getAtbashEncrypted } = require('./atbashCipher');

test('atbashCipher for empty string', () => {
  const result = getAtbashEncrypted('');
  expect(result.length).toBe(0);
});

test('atbashCipher for string in lower case', () => {
  expect(getAtbashEncrypted('abc')).toBe('zyx');
});

test('atbashCipher for string in upper case', () => {
  expect(getAtbashEncrypted('XYZ')).toBe('CBA');
});

test('for string with not appropriate letters', () => {
  expect(getAtbashEncrypted('123Тест*+-:№"%:!')).toBe('123Тест*+-:№"%:!');
});