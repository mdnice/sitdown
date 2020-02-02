import TurndownService from '../../lib/turndown';

export function fenceReplacement(
  content: string,
  node: HTMLElement | Document | DocumentFragment | Element,
  options: TurndownService.Options
) {
  var className = node.firstChild ? (node.firstChild as Element).className : '';
  var language = (className.match(/language-(\S+)/) || [null, ''])[1];
  var startFence =
    options.startFence != undefined ? options.startFence : options.fence;
  var endFence =
    options.endFence != undefined ? options.endFence : options.fence;

  var parent = node.parentNode;
  var parentIsList = parent && parent.nodeName === 'LI';
  return (
    (parentIsList ? '\n' : '\n\n') +
    startFence +
    language +
    '\n' +
    (node.firstChild ? node.firstChild.textContent : '') +
    ((node.firstChild &&
      node.firstChild.textContent &&
        node.firstChild.textContent.endsWith('\n')) ||
    !content
      ? ''
      : '\n') +
    endFence +
    '\n\n'
  );
}
