import TurndownService from '../../../lib/turndown';

export function keepReplacement(
  _: string,
  node: TurndownService.Node & { isBlock?: boolean }
) {
  return node.isBlock
    ? '\n\n' + (node as HTMLElement).outerHTML + '\n'
    : (node as HTMLElement).outerHTML;
}
