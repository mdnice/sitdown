import TurndownService from '../lib/turndown';

export const applyBlockquoteRule = (turndownService: TurndownService) => {
  turndownService.addRule('hr', {
    filter: 'blockquote',

    replacement: function(content, node) {
      var parent = node.parentNode;
      var parentIsList = parent && parent.nodeName === 'LI';
      var blank = parentIsList ? '\n' : '\n\n';
      content = content.replace(/^\n+|\n+$/g, '').replace(/^/gm, '> ');
      return blank + content + blank;
    },
  });
};
