import { Sitdown } from '../src';
import md from './spec/markdownPaper/paper1.md';
import html from './spec/markdownPaper/paper1-juejin.html';

import TurndownService from '../src/lib/turndown';

export const applyJuejinRule = (turndownService: TurndownService) => {
  turndownService.addRule('juejinImg', {
    filter: 'img',

    replacement: function(_content:string, node) {
      var alt = node.getAttribute('alt') || '';
      var src = node.getAttribute('data-src') || node.getAttribute('src') || '';
      var title = node.title || '';
      var titlePart = title ? ' "' + title + '"' : '';
      return src ? '![' + alt + ']' + '(' + src + titlePart + ')' : ''
    },
  });
};

describe('juejin', () => {
  it('works', () => {
    let sitdown = new Sitdown({
      keepFilter: ['style'],
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
      hr: '---'
    });
    applyJuejinRule(sitdown.service);
    const expected = sitdown.HTMLToMD(html);
    expect(expected).toEqual(md);
  });
});
