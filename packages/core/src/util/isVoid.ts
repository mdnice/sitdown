import TurndownService from '../lib/turndown';

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

export default function isVoid(node: TurndownService.Node) {
  return voidElements.indexOf(node.nodeName.toLowerCase()) !== -1;
}
