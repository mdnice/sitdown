//em
import TurndownService from 'turndown';

export const applyEmRule = (turndownService: TurndownService) => {
  turndownService.addRule('em', {
    filter: ['em', 'i'],

    replacement: function(content, node, options) {
      if (!content.trim()) return '';
      let emDelimiter = options.emDelimiter;
      if (
        node.parentNode &&
        node.parentNode.nodeName === 'EM' &&
        node.parentNode.firstChild === node.parentNode.lastChild
      ) {
        emDelimiter = emDelimiter === '_' ? '*' : '_';
      }
      return emDelimiter + content + emDelimiter;
    },
  });
};
