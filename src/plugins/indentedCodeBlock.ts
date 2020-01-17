import TurndownService, { Options } from 'turndown';
import {
  findOrderListIndentNumber,
  findParentNumber,
  repeat,
  IndentCodeIsListfirstChild,
} from '../util';

function caclListIndent(node: TurndownService.Node, options: Options): number {
  var nestULCount = findParentNumber(node, 'UL');
  var nestOLCount = findParentNumber(node, 'OL');
  if (nestOLCount) {
    // Info:如果这个缩进代码父元素是有序列表，并它是第一个元素
    const parentNode = node.parentNode;
    const isFirstChild =
      parentNode &&
      parentNode.firstChild &&
      parentNode.nodeName === 'LI' &&
      parentNode.firstChild === node;
    const IndentCodeIsfirstChild = IndentCodeIsListfirstChild(
      parentNode as HTMLElement,
      options
    );
    return (
      nestULCount * 2 +
      nestOLCount * 4 +
      4 +
      findOrderListIndentNumber(node) +
      (isFirstChild ? -4 : 0) +
      (IndentCodeIsfirstChild ? -1 : 0)
    );
  }
  return nestULCount * 2 + 4;
}
export const applyIndentedCodeBlockRule = (
  turndownService: TurndownService
) => {
  turndownService.addRule('indentedCodeBlock', {
    filter: function(node, options) {
      return !!(
        options.codeBlockStyle === 'indented' &&
        node.nodeName === 'PRE' &&
        node.firstChild &&
        node.firstChild.nodeName === 'CODE'
      );
    },

    replacement: function(_: string, node, options: Options) {
      const indent = repeat(' ', caclListIndent(node, options));
      return node.firstChild && node.firstChild.textContent
        ? '\n\n' +
            indent +
            node.firstChild.textContent.replace(/\n/g, '\n' + indent) +
            '\n\n'
        : '\n\n    \n\n';
    },
  });
};
