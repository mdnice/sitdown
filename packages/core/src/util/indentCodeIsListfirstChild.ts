import { Options, Node } from '../types';

export function IndentCodeIsListfirstChild(list: Node, options: Options) {
  return (
    options.codeBlockStyle !== 'fenced' &&
    list &&
    list.firstChild &&
    list.nodeName === 'LI' &&
    list.firstChild.nodeName === 'PRE'
  );
}
