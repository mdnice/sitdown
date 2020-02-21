import Service from 'sitdown/dist/service';
import {Node} from 'sitdown/dist/types';

interface FootLink {
  ref: string;
  link: string;
  desc: string;
}

var escapes: [RegExp, string][] = [[/\s-/g, ' \\-']];

function escape(string: string) {
  return escapes.reduce(function(accumulator, escape) {
    return accumulator.replace(escape[0], escape[1]);
  }, string);
}

function extraFootLink(child: ChildNode): FootLink | null {
  let footLink = null;
  if (
    child &&
    child.childNodes &&
    child.childNodes[1] &&
    child.childNodes[1].childNodes
  ) {
    try {
      let ref = (child.childNodes[0] as HTMLElement).innerHTML;
      let desc = child.childNodes[1].childNodes[0].nodeValue;
      let link = (child.childNodes[1].childNodes[1] as HTMLElement).innerHTML;
      if (ref && desc && link && link.match(/https?:\/\//)) {
        footLink = {
          ref,
          desc,
          link,
        };
      }
    } catch (e) {}
  }
  return footLink;
}

export function extraFootLinks(node: Node) {
  const sections = node.querySelectorAll('section');
  const footLinks: FootLink[] = [];
  Array.from(sections).forEach(section => {
    Array.from(section.childNodes).forEach(child => {
      let footLink = extraFootLink(child);
      if (footLink) {
        footLinks.push({
          ...footLink,
          desc: footLink.desc.replace(': ', ''),
        });
      }
    });
  });
  return footLinks;
}
export const applyWechatRule = (service: Service) => {
  // 公式
  const oldBlankReplace = service.rules.blankRule.replacement;
  service.rules.blankRule = {
    replacement: (content, node, options) => {
      if (node.nodeName === 'svg') {
        (node.parentNode as Node).unNeedEscape = true;
        return node.outerHTML;
      }
      return oldBlankReplace.call(
        service.rules,
        content,
        node,
        options
      );
    },
  };
  service.addRule('paragraph', {
    filter: 'p',

    replacement: function(content, node) {
      return '\n\n' + node.unNeedEscape ? content : escape(content) + '\n\n';
    },
  });

  service.addRule('wechatImg', {
    filter: 'img',

    replacement: function(_content: string, node) {
      var alt = node.getAttribute('alt') || '';
      if (
        node.nextElementSibling &&
        node.nextElementSibling.nodeName === 'FIGCAPTION'
      ) {
        alt = node.nextElementSibling.textContent || '';
      }
      var src = node.getAttribute('data-src') || node.getAttribute('src') || '';
      var title = node.title || '';
      var titlePart = title ? ' "' + title + '"' : '';
      return src ? '![' + alt + ']' + '(' + src + titlePart + ')' : '';
    },
  });

  // @ts-ignore
  service.remove(['figcaption', 'sup']);
  service.addRule('wechatFootnoteLink-section', {
    filter: function(node) {
      let rst = false;
      if (node.nodeName === 'SECTION') {
        Array.from(node.childNodes).forEach(child => {
          if (extraFootLink(child)) {
            rst = true;
          }
        });
      }
      // if (node.nodeName === 'H3' && node.innerHTML === '参考资料') {
      //   rst = true;
      // }
      return rst;
    },
    replacement: function() {
      return '';
    },
  });

  service.addRule('wechatFootnoteLink', {
    filter: function(node) {
      const isWechatLink =
        node.nodeName === 'SPAN' &&
        node.nextElementSibling &&
        node.nextElementSibling.nodeName === 'SUP';
      return !!isWechatLink;
    },
    replacement: function(content, node, options) {
      if (options.env && options.env.footLinks) {
        const footLinks = options.env.footLinks;
        const ref = node.nextElementSibling
          ? node.nextElementSibling.innerHTML
          : '1';
        const footLink =
          footLinks.find((item: FootLink) => item.ref === ref) || {};
        const desc = footLink.desc;
        const link = footLink.link;
        return `[${content}](${link} "${desc}")`;
      }
      return content;
    },
  });

  service.addRule('wechatFormula', {
    filter: function(node) {
      const isFormula = node.getAttribute('data-formula');
      return !!isFormula;
    },

    replacement: function(_content: string, node: HTMLElement) {
      var formula = node.getAttribute('data-formula');

      if (formula) {
        var formulaType = node.getAttribute('data-formula-type');
        var isBlockFormula = formulaType === 'block-equation';
        return isBlockFormula ? `\n\n$$\n${formula.trimEnd()}\n$$\n\n` : `$${formula.trimEnd()}$`;
      }
      return '';
    },
  });

  service.keep(function(node) {
    return (
      node.nodeName === 'SPAN' &&
      node.style.display === 'block' &&
      node.style.textAlign === 'center'
    );
  });
};
