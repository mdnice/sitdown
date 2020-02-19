import Service from 'sitdown/dist/service';

export const applyJuejinRule = (turndownService: Service) => {
  turndownService.addRule('juejinImg', {
    filter: 'img',

    replacement: function(_content: string, node) {
      var alt = node.getAttribute('alt') || '';
      var src = node.getAttribute('data-src') || node.getAttribute('src') || '';
      var title = node.title || '';
      var titlePart = title ? ' "' + title + '"' : '';
      return src ? '![' + alt + ']' + '(' + src + titlePart + ')' : '';
    },
  });
};
