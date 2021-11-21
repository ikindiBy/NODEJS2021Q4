const { getChainConfig } = require('./getChainConfig');
const { showError } = require('./showError');

jest.mock('./showError');

const correctConfigArgsLongWithSortFlags = ['-c', 'C1-R0-A', '-i', './input.txt', '-o', './output.txt'];
const correctConfigArgsWithoutDivider = ['-c', 'A', '-i', './input.txt', '-o', './output.txt'];
const correctConfigArgsLongWithLongFlags = ['--config', 'C1-R0-A', '--input', './input.txt', '--output', './output.txt'];

describe("getChainConfig ", () => {
  test('for correct config with short flag', () => {
    const result = getChainConfig(correctConfigArgsLongWithSortFlags);
    expect(result[0]).toStrictEqual('C1');
    expect(result[1]).toStrictEqual('R0');
    expect(result[2]).toStrictEqual('A');
  });

  test('for correct config with long flag', () => {
    const result = getChainConfig(correctConfigArgsLongWithLongFlags);
    expect(result[0]).toStrictEqual('C1');
    expect(result[1]).toStrictEqual('R0');
    expect(result[2]).toStrictEqual('A');
  });

  test('for correct config with only one parameter for encrypting type', () => {
    const result = getChainConfig(correctConfigArgsWithoutDivider);
    expect(result[0]).toStrictEqual('A');
  });
});

describe("getChainConfig with errors ", () => {
  beforeEach(() => showError.mockClear());

  // CASE #1 from Error scenarios in task
  test('for type or incorrect value #1', () => {
    const result = getChainConfig(['-c', 'A', '--config', 'C1-R0', '-i', './input.txt', '-o', './output.txt']);
    expect(showError).toHaveBeenCalled();
    expect(showError).toBeCalledWith('config', 'you provided -c argument more than once');
  });

  // CASE #1 from Error scenarios in task
  test('for type or incorrect value #2', () => {
    const result = getChainConfig(['-c', 'A', '-c', 'C1-R0', '-i', './input.txt', '-o', './output.txt']);
    expect(showError).toHaveBeenCalled();
    expect(showError).toBeCalledWith('config', 'you provided -c argument more than once');
  });

  // CASE #2 from Error scenarios in task
  test('for case with mistaken config', () => {
    const result = getChainConfig(['-i', './input.txt', '-o', './output.txt']);
    expect(showError).toHaveBeenCalled();
    expect(showError).toBeCalledWith('config', 'need correct spelling, looks like -c or --config is missed.');
  });
});
