const { getInputFile } = require('./getInputFile');
const { showError } = require('./showError');

jest.mock('./showError');

describe("getInputFile ", () => {
  beforeEach(() => showError.mockClear());

  test('for incorrect config with short flag', () => {
    const result = getInputFile(['-c', 'A', '-i', './input.txt', '-o', './output.txt']);
    expect(result).toStrictEqual('./input.txt');
  });

  test('for incorrect config with long flag', () => {
    const result = getInputFile(['-c', 'A', '-o', './output.txt', '--input', './input2.txt',]);
    expect(result).toStrictEqual('./input2.txt');
  });

  test('for incorrect config', () => {
    const result = getInputFile(['-c', 'A', '-i', './input.txt', '-o', './output.txt', '--input', './input2.txt',]);
    expect(showError).toHaveBeenCalled();
    expect(showError).toBeCalledWith('input file', 'should be only one input argument.');
  });
});