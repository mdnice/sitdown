import TurndownService from 'turndown';
import { Options } from './types';

export function escape(
  escapes: [RegExp, string | ((substring: string, ...args: any[]) => string)][],
  string: string
) {
  return escapes.reduce(function(accumulator, escape) {
    return accumulator.replace(escape[0], <string>escape[1]);
  }, string);
}

export function repeat(character: string, count: number) {
  return Array(count + 1).join(character);
}

export function isFence(options: Options, node: TurndownService.Node): boolean {
  return !!(
    options.codeBlockStyle === 'fenced' &&
    node.nodeName === 'PRE' &&
    node.firstChild &&
    node.firstChild.nodeName === 'CODE'
  );
}

export function isCode(node: TurndownService.Node) {
  var hasSiblings = node.previousSibling || node.nextSibling;
  var isCodeBlock =
    node.parentNode && node.parentNode.nodeName === 'PRE' && !hasSiblings;

  return node.nodeName === 'CODE' && !isCodeBlock;
}

export function fenceReplacement(
  _: string,
  node: HTMLElement | Document | DocumentFragment | Element,
  options: Options
) {
  var className = node.firstChild ? (node.firstChild as Element).className : '';
  var language = (className.match(/language-(\S+)/) || [null, ''])[1];
  var startFence =
    options.startFence != undefined ? options.startFence : options.fence;
  var endFence =
    options.endFence != undefined ? options.endFence : options.fence;

  return (
    '\n\n' +
    startFence +
    language +
    '\n' +
    (node.firstChild ? node.firstChild.textContent : '') +
    endFence +
    '\n\n'
  );
}

export function codeReplacement(
  content: string,
  _: HTMLElement | Document | DocumentFragment | Element,
  options: Options
) {
  if (!content.trim()) return '';

  var delimiter = options.codeDelimiter ? options.codeDelimiter : '`';
  var leadingSpace = '';
  var trailingSpace = '';
  var matches = content.match(/`+/gm);
  if (matches) {
    if (/^`/.test(content)) leadingSpace = ' ';
    if (/`$/.test(content)) trailingSpace = ' ';
    while (matches.indexOf(delimiter) !== -1) delimiter = delimiter + '`';
  }

  return delimiter + leadingSpace + content + trailingSpace + delimiter;
}

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
  }
  return node.isBlock ? '\n\n' : '';
}

export function keepReplacement(
  _: string,
  node: TurndownService.Node & { isBlock?: boolean }
) {
  return node.isBlock
    ? '\n\n' + (node as HTMLElement).outerHTML + '\n'
    : (node as HTMLElement).outerHTML;
}
