import isBlock from './isBlock';
import isVoid from './isVoid';
import { Node } from '../types';

interface Options {
  element: Node;
  isBlock: typeof isBlock;
  isVoid: typeof isVoid;
  isPre?: (node: Node) => boolean;
}

/**
 * collapseWhitespace(options) removes extraneous whitespace from an the given element.
 *
 * @param {Object} options
 */
function collapseWhitespace(options: Options) {
  var element = options.element;
  var isBlock = options.isBlock;
  var isVoid = options.isVoid;
  var isPre =
    options.isPre ||
    function(node: any) {
      return node.nodeName === 'PRE';
    };

  if (!element.firstChild || isPre(element)) return;

  var prevText = null;
  var prevVoid = false;

  var prev = null;
  var node = next(prev, element, isPre);

  while (node !== element) {
    if (node.nodeType === 3 || node.nodeType === 4) {
      // Node.TEXT_NODE or Node.CDATA_SECTION_NODE
      var text = node.data ? node.data.replace(/[ \r\n\t]+/g, ' ') : '';
      if (
        (!prevText || !prevText.data || / $/.test(prevText.data)) &&
        !prevVoid &&
        text[0] === ' '
      ) {
        text = text.substr(1);
      }

      // `text` might be empty at this point.
      if (!text) {
        node = remove(node);
        continue;
      }

      node.data = text;

      prevText = node;
    } else if (node.nodeType === 1) {
      // Node.ELEMENT_NODE
      if (isBlock(node) || node.nodeName === 'BR') {
        if (prevText && prevText.data) {
          prevText.data = prevText.data.replace(/ $/, '');
        }

        prevText = null;
        prevVoid = false;
      } else if (isVoid(node)) {
        // Avoid trimming space around non-block, non-BR void elements.
        prevText = null;
        prevVoid = true;
      }
    } else if (node.nodeType === 8) {
      if (node.nextElementSibling && node.parentNode) {
        const index = Array.from(node.parentNode.childNodes).findIndex(
          n => n === node
        );
        (node.parentNode.childNodes[index + 1] as Node).unNeedEscape = true;
      }
    } else {
      node = remove(node);
      continue;
    }

    var nextNode = next(prev, node, isPre);
    prev = node;
    node = nextNode;
  }

  if (prevText && prevText.data) {
    prevText.data = prevText.data.replace(/ $/, '');
    if (!prevText.data) {
      remove(prevText);
    }
  }
}

/**
 * remove(node) removes the given node from the DOM and returns the
 * next node in the sequence.
 *
 * @param {Node} node
 * @return {Node} node
 */
function remove(node: Node) {
  var next = node.nextSibling || node.parentNode;

  node.parentNode && node.parentNode.removeChild(node);

  return next as Node;
}

/**
 * next(prev, current, isPre) returns the next node in the sequence, given the
 * current and previous nodes.
 *
 * @param {Node} prev
 * @param {Node} current
 * @param {Function} isPre
 * @return {Node}
 */
function next(
  prev: Node | null,
  current: Node,
  isPre: (node: Node) => boolean
) {
  if ((prev && prev.parentNode === current) || isPre(current)) {
    return (current.nextSibling || current.parentNode) as Node;
  }

  return (current.firstChild ||
    current.nextSibling ||
    current.parentNode) as Node;
}

export default collapseWhitespace;
