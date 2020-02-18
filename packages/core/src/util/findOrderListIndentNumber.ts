import { Node } from '../types';

export function findOrderListIndentNumber(node: Node, count = 0): number {
  const parentName = 'OL';
  const parent = node.parentNode as HTMLElement;
  if (!parent) {
    return count;
  }
  if (parent.nodeName === parentName) {
    var start = parent.getAttribute('start');
    if (start && start.length > 1) {
      count += start.length - 1;
    }
  }

  return findOrderListIndentNumber(parent, count);
}
