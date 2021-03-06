import Service from 'sitdown/dist/service';

export const applyJuejinRule = (service: Service) => {
  service.addRule('juejinImg', {
    filter: 'img',

    replacement: function(_content: string, node) {
      var alt = node.getAttribute('alt') || '';
      var src = node.getAttribute('data-src') || node.getAttribute('src') || '';
      var title = node.title || '';
      var titlePart = title ? ' "' + title + '"' : '';
      return src ? '![' + alt + ']' + '(' + src + titlePart + ')' : '';
    },
  });

  service.addRule('juejinCopyCode', {
    filter(node) {
      return (node.tagName === 'SPAN' &&
          node.innerText === '复制代码')
    },
    replacement() {
      return ''
    }
  });
};
