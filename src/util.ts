import TurndownService from 'turndown';
import { Options } from './types';

export function escape(escapes: [RegExp, string][], string: string) {
  return escapes.reduce(function(accumulator, escape) {
    return accumulator.replace(escape[0], escape[1]);
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

export function blankReplacement(
  _: string,
  node: TurndownService.Node & { isBlock?: boolean },
  options: Options
) {
  if (isFence(options, node)) {
    return fenceReplacement(_, node, options);
  }
  return node.isBlock ? '\n\n' : '';
}
