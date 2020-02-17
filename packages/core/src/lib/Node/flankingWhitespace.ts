import isBlock from '../../util/isBlock';
import { Node } from '../turndown';

export default function flankingWhitespace(node: Node) {
  var leading = '';
  var trailing = '';

  if (!node.isBlock) {
    var hasLeading = /^[ \r\n\t]/.test(node.textContent || '');
    var hasTrailing = /[ \r\n\t]$/.test(node.textContent || '');

    if (hasLeading && !isFlankedByWhitespace('left', node)) {
      leading = ' ';
    }
    if (hasTrailing && !isFlankedByWhitespace('right', node)) {
      trailing = ' ';
    }
  }

  return { leading: leading, trailing: trailing };
}

function isFlankedByWhitespace(side: string, node: Node) {
  var sibling;
  var regExp;
  var isFlanked;

  if (side === 'left') {
    sibling = node.previousSibling;
    regExp = / $/;
  } else {
    sibling = node.nextSibling;
    regExp = /^ /;
  }

  if (sibling) {
    if (sibling.nodeType === 3) {
      isFlanked = regExp.test(sibling.nodeValue || '');
    } else if (sibling.nodeType === 1 && !isBlock(sibling as Node)) {
      isFlanked = regExp.test(sibling.textContent || '');
    }
  }
  return isFlanked;
}
