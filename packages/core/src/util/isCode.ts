import { Node } from '../types';

export function isCode(node: Node) {
  var hasSiblings = node.previousSibling || node.nextSibling;
  var isCodeBlock =
    node.parentNode && node.parentNode.nodeName === 'PRE' && !hasSiblings;

  return node.nodeName === 'CODE' && !isCodeBlock;
}
