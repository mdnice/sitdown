import isBlock from '../../util/isBlock';
import isBlank from './isBlank';
import flankingWhitespace from './flankingWhitespace';
import { Node as NodeType } from '../turndown';

export default function createNode(node: HTMLElement) {
  const newNode = node as NodeType;
  newNode.isBlock = isBlock(node);
  newNode.isCode =
    node.nodeName.toLowerCase() === 'code' ||
    (newNode.parentNode as NodeType).isCode;
  newNode.isBlank = isBlank(node);
  newNode.flankingWhitespace = flankingWhitespace(node);
  return newNode;
}
