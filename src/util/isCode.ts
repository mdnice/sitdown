import TurndownService from '@type/turndown';

export function isCode(node: TurndownService.Node) {
  var hasSiblings = node.previousSibling || node.nextSibling;
  var isCodeBlock =
    node.parentNode && node.parentNode.nodeName === 'PRE' && !hasSiblings;

  return node.nodeName === 'CODE' && !isCodeBlock;
}
