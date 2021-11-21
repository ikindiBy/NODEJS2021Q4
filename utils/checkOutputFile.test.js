const fs = require("fs");

const { checkOutputFile } = require('./checkOutputFile');
const { showError } = require('./showError');

jest.mock('./showError');

// CASE #4 from Error scenarios in task
describe("checkOutputFile ", () => {
  beforeEach(() => showError.mockClear());

  test('for correct output file in config', () => {
    const mockExistsSync = jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    checkOutputFile('./out.txt');
    expect(showError).not.toHaveBeenCalled();
    mockExistsSync.mockRestore();
  });

  test('for incorrect output file in config', () => {
    const mockExistsSync = jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    checkOutputFile('./out.txt');
    expect(showError).toHaveBeenCalled();
    expect(showError).toBeCalledWith('output file', `file with the path: ./out.txt doesn't exist or has no permission for writing`);
    mockExistsSync.mockRestore();
  });
});