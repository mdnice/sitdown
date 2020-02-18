import Service from '../service';

export const applyStrongRule = (service: Service) => {
  service.addRule('hr', {
    filter: ['strong', 'b'],

    replacement: function(content, _node, options) {
      if (!content.trim()) return '';
      return options.strongDelimiter + content + options.strongDelimiter;
    },
  });
};
