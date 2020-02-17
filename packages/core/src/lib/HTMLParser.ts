/*
 * Set up window for Node.js
 */

var root = typeof window !== 'undefined' ? window : {};

/*
 * Parsing HTML strings
 */

function canParseHTMLNatively() {
  var Parser = (root as Window & typeof globalThis).DOMParser;
  var canParse = false;

  // Adapted from https://gist.github.com/1129031
  // Firefox/Opera/IE throw errors on unsupported types
  try {
    // WebKit returns null on unsupported types
    if (new Parser().parseFromString('', 'text/html')) {
      canParse = true;
    }
  } catch (e) {}

  return canParse;
}

class Parser {
  parseFromString(string: string) {
    const JSDOM = require('jsdom').JSDOM;
    return new JSDOM(string).window.document;
  }
}

export default canParseHTMLNatively()
  ? (root as Window & typeof globalThis).DOMParser
  : Parser;
