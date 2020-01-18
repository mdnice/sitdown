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

export function listReplacement(
  content: string,
  node: TurndownService.Node,
  options: TurndownService.Options
) {
  var parent = node.parentNode;
  var nestULCount = findParentNumber(node, 'UL');
  var nestOLCount = findParentNumber(node, 'OL');
  var nestCount = nestULCount + nestOLCount;
  var isLoose = node.firstChild && node.firstChild.nodeName === 'P'; // Todo:isBlock
  var newList =
    parent &&
    parent.previousSibling &&
    parent.previousSibling.nodeName === parent.nodeName;
  var bulletListMarker = newList ? '+' : options.bulletListMarker;
  var prefix = bulletListMarker + ' ';
  debugger;

  var replaceTaget = `\n    ${repeat(' ', nestCount - 1)}$1`;
  if (IndentCodeIsListfirstChild(node, options) && nestOLCount) {
    replaceTaget = `\n   ${repeat(' ', nestCount - 1)}$1`;
  } else if (options.codeBlockStyle === 'fenced' && nestULCount) {
    replaceTaget = `\n  ${repeat(' ', nestCount - 1)}$1`;
  }
  content = content
    .replace(/^\n+/, '') // remove leading newlines
    .replace(/\n+$/, '\n') // replace trailing newlines with just a single one
    .replace(/\n(\S)/gm, replaceTaget); // indent

  if (parent && parent.nodeName === 'OL') {
    var start = (parent as HTMLElement).getAttribute('start');
    var index = Array.prototype.indexOf.call(parent.children, node);
    prefix =
      (start ? Number(start) + index : index + 1) + (newList ? ')  ' : '.  ');
  }
  if (parent && parent.nextSibling && parent.nextSibling.nodeName === 'PRE') {
    if (!isLoose) prefix = ' ' + prefix + '   '; // example 235
    if (parent.lastChild === node && isLoose) {
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
  var nestListAndParentIsEmpty =
    nestOLCount + nestULCount > 1 &&
    node.parentNode &&
    node.parentNode.parentNode &&
    (node.parentNode.parentNode as HTMLElement).innerHTML ===
      (node.parentNode as HTMLElement).outerHTML;
  if (nestListAndParentIsEmpty) {
    prefix = prefix.trimStart();
  }

  return (
    prefix +
    content +
    (node.nextSibling && !/\n$/.test(content) ? '\n' : '') +
    (isLoose ? '\n' : '')
  );
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
  } else if (node.nodeName.toLowerCase() === 'li') {
    return listReplacement(content, node, options);
  } else if (node.nodeName.toLowerCase() === 'ul') {
    return content + '\n\n';
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

export function findParentNumber(
  node: TurndownService.Node,
  parentName: string,
  count = 0
): number {
  if (!node.parentNode) {
    return count;
  }
  if (node.parentNode.nodeName === parentName) {
    count++;
  }

  return findParentNumber(node.parentNode as HTMLElement, parentName, count);
}

export function findOrderListIndentNumber(
  node: TurndownService.Node,
  count = 0
): number {
  const parentName = 'OL';
  const parent = node.parentNode as HTMLElement;
  if (!parent) {
    return count;
  }
  if (parent.nodeName === parentName) {
    var start = parent.getAttribute('start');
    if (start && start.length > 1) {
      count += start.length - 1;
    }
  }

  return findOrderListIndentNumber(parent, count);
}

export function IndentCodeIsListfirstChild(
  list: TurndownService.Node,
  options: Options
) {
  return (
    options.codeBlockStyle !== 'fenced' &&
    list &&
    list.firstChild &&
    list.nodeName === 'LI' &&
    list.firstChild.nodeName === 'PRE'
  );
}
