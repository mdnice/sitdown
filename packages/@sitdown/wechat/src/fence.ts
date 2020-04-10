import Service from 'sitdown/dist/service';
// @ts-ignore
import { Util } from 'sitdown/dist/src.esm';

const isFence = Util.isFence;
function fenceReplacement(
  content: string,
  node: HTMLElement | Document | DocumentFragment | Element,
  options: Service['options']
) {
  var className = node.firstChild ? (node.firstChild as Element).className : '';
  var language = (className.match(/language-(\S+)/) || [null, ''])[1];

  const isWechatFence = (node as Element).className.match(/code-snippet/);
  if (isWechatFence) {
    const wechatFenceLang = (node as Element).getAttribute('data-lang');
    language = wechatFenceLang;
  }

  var startFence =
    options.startFence != undefined ? options.startFence : options.fence;
  var endFence =
    options.endFence != undefined ? options.endFence : options.fence;

  var parent = node.parentNode;
  var parentIsList = parent && parent.nodeName === 'LI';
  let code = node.firstChild ? node.firstChild.textContent : '';

  if (isWechatFence) {
    code = Array.from(node.children)
      .map(item => item.textContent)
      .join('\n');
  }
  return (
    (parentIsList ? '\n' : '\n\n') +
    startFence +
    language +
    '\n' +
    code +
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
export const applyFenceRule = (service: Service) => {
  // 1. blankReplacement ul and li
  const oldBlankReplace = service.rules.blankRule.replacement;
  service.rules.blankRule = {
    replacement: (content, node, options) => {
      const parent = node.parentElement;
      const isWechatFenceIndex =
        parent &&
        parent.nodeName === 'UL' &&
        node.nodeName === 'LI' &&
        parent.className.includes('code-snippet__line-index');
      if (isWechatFenceIndex) {
        return '';
      }
      return oldBlankReplace.call(service.rules, content, node, options);
    },
  };
  // 2. pre and code span replacement
  service.addRule('fencedCodeBlock', {
    filter: function(node, options) {
      return isFence(options, node);
    },

    replacement: fenceReplacement,
  });
};
