import TurndownService from '../../../../lib/turndown';
import { ListNode } from './listNode';

export function listReplacement(
  content: string,
  node: TurndownService.Node,
  options: TurndownService.Options
) {
  var listNode = new ListNode(node);
  var { isLoose, isNewList: newList } = listNode;

  var bulletListMarker = newList ? '+' : options.bulletListMarker;
  var prefix = listNode.caclPrefix(bulletListMarker + ' ');

  content = content
    .replace(/^\n+/, '') // remove leading newlines
    .replace(/\n+$/, '\n') // replace trailing newlines with just a single one
    .replace(/\n(\S)/gm, listNode.lineIndent(options)); // indent

  return (
    prefix +
    content +
    (node.nextSibling && !/\n$/.test(content) ? '\n' : '') +
    (isLoose ? '\n' : '')
  );
}
