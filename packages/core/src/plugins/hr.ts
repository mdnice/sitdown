import TurndownService from '../service/turndown';

export const applyHrRule = (turndownService: TurndownService) => {
  turndownService.addRule('hr', {
    filter: 'hr',

    replacement: function(_, __, options) {
      return '\n' + options.hr + '\n';
    },
  });
};
