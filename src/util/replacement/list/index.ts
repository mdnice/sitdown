import TurndownService from '../../../../lib/turndown';
import {
  findOrderListIndentNumber,
  IndentCodeIsListfirstChild,
  repeat,
} from '../../../util';
import { ListNode } from './listNode';

export function listReplacement(
  content: string,
  node: TurndownService.Node,
  options: TurndownService.Options
) {
  var listNode = new ListNode(node);
  var {
    parent,
    parentIsOL,
    nestULCount,
    nestOLCount,
    nestCount,
    isLoose,
    isNewList: newList,
  } = listNode;

  var bulletListMarker = newList ? '+' : options.bulletListMarker;
  var prefix = bulletListMarker + ' ';

  var replaceTaget = `\n    ${repeat(' ', nestCount - 1)}$1`;
  if (IndentCodeIsListfirstChild(node, options) && nestOLCount) {
    replaceTaget = `\n  ${repeat(' ', nestCount)}$1`;
  } else if (nestULCount) {
    replaceTaget = `\n${repeat(' ', nestCount * 2)}$1`;
  }

  content = content
    .replace(/^\n+/, '') // remove leading newlines
    .replace(/\n+$/, '\n') // replace trailing newlines with just a single one
    .replace(/\n(\S)/gm, replaceTaget); // indent

  if (parent && parentIsOL) {
    var start = (parent as HTMLElement).getAttribute('start');
    var index = Array.prototype.indexOf.call(parent.children, node);
    prefix =
      (start ? Number(start) + index : index + 1) + (newList ? ')  ' : '.  ');
  }
  if (listNode.followCode) {
    if (!isLoose) prefix = ' ' + prefix + '   '; // example 235
    if (listNode.inLast && isLoose) {
      // example 293
      prefix = '  ' + prefix;
    }
  }

  if (nestULCount > 1) {
    prefix = repeat(' ', (nestULCount - 1) * 2) + prefix;
  }
  if (nestULCount && nestOLCount) {
    const indent = findOrderListIndentNumber(node);
    prefix = repeat(' ', nestULCount * 4 + indent) + prefix;
  }
  // Info：嵌套列表且父列表为空
  if (listNode.nestListAndParentIsEmpty) {
    prefix = prefix.trimStart();
  }

  return (
    prefix +
    content +
    (node.nextSibling && !/\n$/.test(content) ? '\n' : '') +
    (isLoose ? '\n' : '')
  );
}
