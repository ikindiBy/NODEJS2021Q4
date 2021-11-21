const { showError } = require('./showError');

describe("showError ", () => {
  test('should call process\'s methods', () => {
    const mockProcessExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const mockProcessStderr = jest.spyOn(process.stderr, 'write').mockImplementation(() => {});
    showError('test', 'test description');
    expect(mockProcessStderr).toHaveBeenCalledTimes(1);
    expect(mockProcessStderr).toHaveBeenCalledWith('Error in test: test description');
    expect(mockProcessExit).toHaveBeenCalledTimes(1);
    
    mockProcessExit.mockRestore();
    mockProcessStderr.mockRestore();
  });
});
