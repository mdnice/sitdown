import TurndownService from '../../../lib/turndown';
import { fenceReplacement, isCode, listReplacement } from '../../util';
import { Options } from '../../types';
import { isFence } from '../../util/isFence';

export function blankReplacement(
  content: string,
  node: TurndownService.Node & { isBlock?: boolean },
  options: Options
) {
  if (isFence(options, node)) {
    return fenceReplacement(content, node, options);
  } else if (isCode(node)) {
    var delimiter = options.codeDelimiter ? options.codeDelimiter : '`';

    return delimiter + ' ' + content + delimiter + '\n';
  } else if (node.nodeName.toLowerCase() === 'blockquote') {
    return '>';
  } else if (node.nodeName.toLowerCase() === 'li') {
    return listReplacement(content, node, options);
  } else if (node.nodeName.toLowerCase() === 'ul') {
    return content + '\n\n';
  }
  return node.isBlock ? '\n\n' : '';
}
