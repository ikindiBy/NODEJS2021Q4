const { validateConfig, checkEncodingDecodingFlag } = require('./validateConfig');
const { showError } = require('./showError');

jest.mock('./showError');

beforeEach(() => showError.mockClear());

// CASE 5 from Error scenarios in task
describe("validateConfig ", () => {
  test('for incorrect type in config', () => {
    validateConfig('F');
    expect(showError).toHaveBeenCalled();
    expect(showError).toBeCalledWith('config', 'config should include only A or C or R flags.');
  });

  test('for type or incorrect value', () => {
    validateConfig('C1A');
    expect(showError).toHaveBeenCalled();
    expect(showError).toBeCalledWith('config', 'incorrect config: should include only A/C/R flags and 0/1.');
  });

  test('for incorrect direction of ciphering in config C', () => {
    validateConfig('C2');
    expect(showError).toHaveBeenCalled();
    expect(showError).toBeCalledWith('config', 'config should include encoding/decoding flag like 0 or 1.');
  });

  test('for incorrect direction of ciphering in config R', () => {
    validateConfig('R8');
    expect(showError).toHaveBeenCalled();
    expect(showError).toBeCalledWith('config', 'config should include encoding/decoding flag like 0 or 1.');
  });

  test('for incorrect direction of ciphering in config A', () => {
    validateConfig('A1');
    expect(showError).toHaveBeenCalled();
    expect(showError).toBeCalledWith('config', 'atbash config shouldn\'t include encoding/decoding flag');
  });
});

describe("validateConfig for correct config", () => {
  test('for Atbash correct config should not be called', () => {
    validateConfig('A');
    expect(showError).toBeCalledTimes(0);
  });

  test('for Ceaser correct config should not be called', () => {
    validateConfig('C1');
    expect(showError).toBeCalledTimes(0);
  });

  test('for ROT8 correct config should not be called', () => {
    validateConfig('R0');
    expect(showError).toBeCalledTimes(0);
  });
});

describe("checkEncodingDecodingFlag for incorrect config", () => {
  test('without value should type error', () => {
    checkEncodingDecodingFlag('');
    expect(showError).toHaveBeenCalled();
    expect(showError).toBeCalledWith('config', 'config should include encoding/decoding flag.');
  });

  test('with value doesn\'t equal 1 or 0 should type error', () => {
    checkEncodingDecodingFlag('');
    expect(showError).toHaveBeenCalled();
    expect(showError).toBeCalledWith('config', 'config should include encoding/decoding flag like 0 or 1.');
  });

});

describe("checkEncodingDecodingFlag for correct config", () => {
  test('for Atbash correct config should not be called', () => {
    checkEncodingDecodingFlag('1');
    expect(showError).toBeCalledTimes(0);
  });

  test('for Ceaser correct config should not be called', () => {
    checkEncodingDecodingFlag('0');
    expect(showError).toBeCalledTimes(0);
  });
});