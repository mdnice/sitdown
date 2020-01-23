// blank
import TurndownService from '../../../lib/turndown';
import { isCode } from '../isCode';
import { isFence } from '../isFence';
import { fenceReplacement } from './fence';
import { listReplacement } from './list';
import { Options } from '../../types';

export function blankReplacement(
  content: string,
  node: TurndownService.Node & { isBlock?: boolean },
  options: Options
) {
  if (isFence(options, node)) {
    return fenceReplacement(content, node, options);
  } else if (isCode(node)) {
    var delimiter = options.codeDelimiter ? options.codeDelimiter : '`';

    return (
      delimiter +
      (options.codeBlockStyle === 'fenced' ? ' ' : '') +
      (content || ' ') +
      delimiter +
      '\n'
    );
  } else if (node.nodeName.toLowerCase() === 'blockquote') {
    return '>';
  } else if (node.nodeName.toLowerCase() === 'li') {
    return listReplacement(content, node, options);
  } else if (node.nodeName.toLowerCase() === 'ul') {
    return content + '\n\n';
  }
  return node.isBlock ? content + '\n\n' : '';
}
