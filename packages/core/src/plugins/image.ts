import TurndownService from '../lib/turndown';

export const applyImageRule = (turndownService: TurndownService) => {
  turndownService.addRule('hr', {
    filter: 'img',

    replacement: function(_content, node) {
      var alt = node.getAttribute('alt') || '';
      var src = node.getAttribute('src') || '';
      var title = node.title || '';
      var titlePart = title ? ' "' + title + '"' : '';
      return src ? '![' + alt + ']' + '(' + src + titlePart + ')' : '';
    },
  });
};
