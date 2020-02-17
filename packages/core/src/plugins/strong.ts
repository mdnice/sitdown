import TurndownService from '../service/turndown';

export const applyStrongRule = (turndownService: TurndownService) => {
  turndownService.addRule('hr', {
    filter: ['strong', 'b'],

    replacement: function(content, _node, options) {
      if (!content.trim()) return '';
      return options.strongDelimiter + content + options.strongDelimiter;
    },
  });
};
