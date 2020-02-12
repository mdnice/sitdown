import TurndownService from '../lib/turndown';

var escapes: [RegExp, string][] = [[/\s-/g, ' \\-']];

function escape(string: string) {
  return escapes.reduce(function(accumulator, escape) {
    return accumulator.replace(escape[0], escape[1]);
  }, string);
}
export const applyParagraphRule = (turndownService: TurndownService) => {
  turndownService.addRule('paragraph', {
    filter: 'p',

    replacement: function(content, node) {
      const hasCommentChild = Array.from(node.childNodes).some(
        item => item.nodeType === 8
      );
      return '\n\n' + (hasCommentChild ? content : escape(content)) + '\n\n';
    },
  });
};
