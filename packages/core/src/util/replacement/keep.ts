import { Node } from '../../types';

export function keepReplacement(content: string, node: Node) {
  let html = (node as HTMLElement).outerHTML;
  if (!content) {
    let attrs = '';
    for (let i = 0; i < node.attributes.length; i++) {
      let attr = node.attributes[i];
      attrs += `${attr.name}="${attr.nodeValue}"`;
    }
    html = `<${node.localName.toLowerCase()} ${attrs} />`;
  }
  return node.isBlock ? '\n\n' + html + '\n' : html;
}
