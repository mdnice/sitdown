import collapseWhitespace from './collapse-whitespace';
import isBlock from './isBlock';
import isVoid from './isVoid';

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

var HTMLParser = canParseHTMLNatively()
  ? (root as Window & typeof globalThis).DOMParser
  : Parser;

var _htmlParser: DOMParser;

function htmlParser() {
  _htmlParser = _htmlParser || new HTMLParser();
  return _htmlParser;
}

export default function RootNode(input: string) {
  var root;
  if (typeof input === 'string') {
    var doc = htmlParser().parseFromString(
      // DOM parsers arrange elements in the <head> and <body>.
      // Wrapping in a custom element ensures elements are reliably arranged in
      // a single element.
      '<x-turndown id="turndown-root">' + input + '</x-turndown>',
      'text/html'
    );
    root = doc.getElementById('turndown-root');
  } else {
    root = (input as HTMLElement).cloneNode(true);
  }
  collapseWhitespace({
    element: root as HTMLElement,
    isBlock: isBlock,
    isVoid: isVoid,
  });

  return root;
}
