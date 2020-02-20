import collapseWhitespace from '../util/collapse-whitespace';
import isBlock from '../util/isBlock';
import isVoid from '../util/isVoid';
import HTMLParser from './HTMLParser';

var _htmlParser: DOMParser;

function htmlParser() {
  _htmlParser = _htmlParser || new HTMLParser();
  return _htmlParser;
}

export function createRootNode(input: string) {
  var root;
  if (typeof input === 'string') {
    var doc = htmlParser().parseFromString(
      // DOM parsers arrange elements in the <head> and <body>.
      // Wrapping in a custom element ensures elements are reliably arranged in
      // a single element.
      '<x-sitdown id="root-node">' + input + '</x-sitdown>',
      'text/html'
    );
    root = doc.getElementById('root-node');
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

export default class RootNode {
  constructor(input: string){
    // @ts-ignore
    return createRootNode(input);
  }
}