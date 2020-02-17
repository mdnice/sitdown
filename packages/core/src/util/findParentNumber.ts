import { Node } from '../types';

export function findParentNumber(
  node: Node,
  parentName: string,
  count = 0
): number {
  if (!node.parentNode) {
    return count;
  }
  if (node.parentNode.nodeName === parentName) {
    count++;
  }

  return findParentNumber(node.parentNode as HTMLElement, parentName, count);
}
