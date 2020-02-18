import Service from '../service';

export const applyHrRule = (service: Service) => {
  service.addRule('hr', {
    filter: 'hr',

    replacement: function(_, __, options) {
      return '\n' + options.hr + '\n';
    },
  });
};
