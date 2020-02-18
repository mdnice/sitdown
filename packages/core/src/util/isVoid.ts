import { Node } from '../types';

export const voidElements = [
  'area',
  'base',
  'br',
  'col',
  'command',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
];

export default function isVoid(node: Node) {
  return voidElements.indexOf(node.nodeName.toLowerCase()) !== -1;
}
