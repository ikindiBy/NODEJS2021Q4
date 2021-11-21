const { getOutputFile } = require('./getOutputFile');
const { showError } = require('./showError');

jest.mock('./showError');

describe("getOutputFile ", () => {
  beforeEach(() => showError.mockClear());

  test('for incorrect config with short flag', () => {
    const result = getOutputFile(['-c', 'A', '-o', './output.txt']);
    expect(result).toStrictEqual('./output.txt');
  });

  test('for incorrect config with long flag', () => {
    const result = getOutputFile(['-c', 'A', '--output', './output.txt']);
    expect(result).toStrictEqual('./output.txt');
  });

  test('for incorrect config', () => {
    const result = getOutputFile(['-c', 'A', '-o', './output.txt', '--output', './output2.txt']);
    expect(showError).toHaveBeenCalled();
    expect(showError).toBeCalledWith('output file', 'should be only one output argument.');
  });
});
