import TurndownService from '../service/turndown';
import { escape } from '../util';

const specialChars = [' ', '(', ')', '\\', '"'];
const escapes: [RegExp, string][] = [[/"/g, '&quot;']];
export const applyLinkRule = (turndownService: TurndownService) => {
  turndownService.addRule('link', {
    filter: function(node, options) {
      return !!(options.linkStyle === 'inlined' && node.nodeName === 'A');
    },

    replacement: function(content, node) {
      var href = (node as HTMLElement).getAttribute('href');
      if (!href && !content) {
        return '';
      }
      // Info:autolink
      var normalizeHref = href
        ? decodeURIComponent(href).replace('mailto:', '')
        : '';
      if (node.firstChild && normalizeHref === node.firstChild.nodeValue) {
        return '<' + node.firstChild.nodeValue + '>';
      }
      if (
        href &&
        normalizeHref.split('').some(char => specialChars.includes(char))
      ) {
        href = '<' + decodeURIComponent(href) + '>';
      }
      var title = escape(escapes, (node as HTMLElement).title);
      title = title ? ' "' + title + '"' : '';
      return '[' + content + '](' + href + title + ')';
    },
  });
};
