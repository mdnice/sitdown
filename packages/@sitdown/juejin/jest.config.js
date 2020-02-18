module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: {
        pathRegex: /\.(spec|test)\.ts$/
      }
    }
  },
  "transform": {
    "\\.md$": "jest-raw-loader",
    "\\.html": "jest-raw-loader",
    '.(ts|tsx|js|jsx)': 'ts-jest',
  }
};