import isVoid, { voidElements } from '../../util/isVoid';
import { Node } from '../../types';

var voidSelector = voidElements.join();
function hasVoid(node: Node) {
  return node.querySelector && node.querySelector(voidSelector);
}
export default function isBlank(node: Node) {
  return (
    [
      'A',
      'TABLE',
      'THEAD',
      'TBODY',
      'TR',
      'TH',
      'TD',
      'IFRAME',
      'SCRIPT',
      'AUDIO',
      'VIDEO',
    ].indexOf(node.nodeName) === -1 &&
    /^\s*$/i.test(node.textContent || '') &&
    !isVoid(node) &&
    !hasVoid(node)
  );
}
