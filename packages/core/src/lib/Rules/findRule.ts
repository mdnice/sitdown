import { Rule, Node, TagName, Options } from '../turndown';

function filterValue(rule: Rule, node: Node, options: Options) {
  var filter = rule.filter;
  if (typeof filter === 'string') {
    return filter === node.nodeName.toLowerCase();
  } else if (Array.isArray(filter)) {
    return filter.indexOf(<TagName>node.nodeName.toLowerCase()) > -1;
  } else if (typeof filter === 'function') {
    return filter.call(rule, node, options);
  } else {
    throw new TypeError('`filter` needs to be a string, array, or function');
  }
}

export default function findRule(rules: Rule[], node: Node, options: Options) {
  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i];
    if (filterValue(rule, node, options)) return rule;
  }
  return void 0;
}
