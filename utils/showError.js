const showError = (area, description) => {
  process.stderr.write(`Error in ${area}: ${description}`);
  process.exit(1);
};

module.exports = { showError };