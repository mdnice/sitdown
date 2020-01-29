module.exports = {
  "transform": {
    '.(ts|tsx|js|jsx)': require.resolve('ts-jest/dist'),
    "\\.html$": "jest-raw-loader",
    "\\.md$": "jest-raw-loader"
  }
}