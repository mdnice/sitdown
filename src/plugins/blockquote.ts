import TurndownService from 'turndown';

export const applyBlockquoteRule = (turndownService: TurndownService) => {
  turndownService.addRule('hr', {
    filter: 'blockquote',

    replacement: function(content, node) {
      var parent = node.parentNode;
      var parentIsList = parent && parent.nodeName === 'LI';
      content = content.replace(/^\n+|\n+$/g, '');
      content = content.replace(/^/gm, '> ');
      return (parentIsList ? '\n' : '\n\n') + content + '\n\n';
    },
  });
};
