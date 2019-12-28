module.exports = {
  "transform": {
    '.(ts|tsx)': require.resolve('ts-jest/dist'),
    "\\.html$": "jest-raw-loader",
    "\\.md$": "jest-raw-loader"
  }
}