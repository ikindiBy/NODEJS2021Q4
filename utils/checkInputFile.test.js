const fs = require("fs");

const { checkInputFile } = require('./checkInputFile');
const { showError } = require('./showError');

jest.mock('./showError');

// CASE #3 from Error scenarios in task
describe("checkInputFile ", () => {
  beforeEach(() => showError.mockClear());

  test('for correct input file in config', () => {
    const mockExistsSync = jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    checkInputFile('./in.txt');
    expect(showError).not.toHaveBeenCalled();
    mockExistsSync.mockRestore();
  });

  test('for incorrect input file in config', () => {
    const mockExistsSync = jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    checkInputFile('./in.txt');
    expect(showError).toHaveBeenCalled();
    expect(showError).toBeCalledWith('input file', `file with the path: ./in.txt doesn't exist or has no permission for reading`);
    mockExistsSync.mockRestore();
  });
});