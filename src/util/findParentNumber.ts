import TurndownService from '../../lib/turndown';

export function findParentNumber(
  node: TurndownService.Node,
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
