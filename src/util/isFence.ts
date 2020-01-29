import { Options } from '../types';
import TurndownService from '@type/turndown';

export function isFence(options: Options, node: TurndownService.Node): boolean {
  return !!(
    options.codeBlockStyle === 'fenced' &&
    node.nodeName === 'PRE' &&
    node.firstChild &&
    node.firstChild.nodeName === 'CODE'
  );
}
