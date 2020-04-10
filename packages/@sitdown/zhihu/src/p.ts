import Service from 'sitdown/dist/service';

var escapes: [RegExp, string][] = [[/\s-/g, ' \\-']];

function escape(string: string) {
  return escapes.reduce(function(accumulator, escape) {
    return accumulator.replace(escape[0], escape[1]);
  }, string);
}
export const applyParagraphRule = (service: Service) => {
  service.addRule('paragraph', {
    filter: 'p',

    replacement: function(content, node) {
      const cantEscape = Array.from(node.childNodes).some(
        (item: ChildNode & { isFormula?: boolean }) =>
          item.nodeType === 8 || item.isFormula
      );
      return '\n\n' + (cantEscape ? content : escape(content)) + '\n\n';
    },
  });
};
