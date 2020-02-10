import TurndownService from 'sitdown/dist/lib/turndown';

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

export function extraFootLinks(node: TurndownService.Node) {
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
export const applyWechatRule = (turndownService: TurndownService) => {
  // 公式
  const oldBlankReplace = turndownService.rules.blankRule.replacement;
  turndownService.rules.blankRule = {
    replacement: (content, node, options) => {
      if (node.nodeName === 'svg') {
        (node.parentNode as TurndownService.Node).unNeedEscape = true;
        return node.outerHTML;
      }
      return oldBlankReplace.call(
        turndownService.rules,
        content,
        node,
        options
      );
    },
  };
  turndownService.addRule('paragraph', {
    filter: 'p',

    replacement: function(content, node) {
      return '\n\n' + node.unNeedEscape ? content : escape(content) + '\n\n';
    },
  });

  turndownService.addRule('wechatImg', {
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

  turndownService.remove(['figcaption', 'sup']);
  turndownService.addRule('wechatFootnoteLink-section', {
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

  turndownService.addRule('wechatFootnoteLink', {
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

  turndownService.keep(function(node) {
    return (
      node.nodeName === 'SPAN' &&
      node.style.display === 'block' &&
      node.style.textAlign === 'center'
    );
  });
};
