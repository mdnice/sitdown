import Service from '../service';

export const applyBrRule = (service: Service) => {
  service.addRule('hr', {
    filter: 'br',

    replacement: function(_content, _node, options) {
      return options.br + '\n';
    },
  });
};
