class ExistingFileError extends Error {
    constructor(message, cause) {
      super(message);
      this.cause = cause;
      this.name = 'ExistingFileError';
    }
}

module.exports = { ExistingFileError };