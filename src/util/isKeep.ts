import { Options } from '../types';
import TurndownService from '@type/turndown';

export function isKeep(options: Options, node: TurndownService.Node): boolean {
  const filters = options.keepFilter ? options.keepFilter : ['div', 'style'];

  return Array.isArray(filters)
    ? filters.some(filter => filter === node.nodeName.toLowerCase())
    : typeof filters === 'function'
    ? filters(node, options)
    : filters === node.nodeName.toLowerCase();
}
