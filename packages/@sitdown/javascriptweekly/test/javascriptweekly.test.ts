import { Sitdown } from 'sitdown';
import { applyJSWeeklyRule } from '../src';

describe('javascriptweekly', () => {
  it('works', () => {
    let sitdown = new Sitdown({
      keepFilter: ['style'],
      codeBlockStyle: 'fenced',
      bulletListMarker: '-',
      hr: '---',
      convertNoHeaderTable: true,
    });
    sitdown.use(applyJSWeeklyRule);
    const expected = sitdown.HTMLToMD(
      require('./spec/markdownPaper/paper1.html')
    );
    expect(expected).toEqual(require('./spec/markdownPaper/paper1.md'));
  });
});
