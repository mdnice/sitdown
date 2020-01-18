import TurndownService from '../../../../lib/turndown';
import {findOrderListIndentNumber, findParentNumber, IndentCodeIsListfirstChild,repeat} from "../../../util";

export function listReplacement(
    content: string,
    node: TurndownService.Node,
    options: TurndownService.Options
) {
    var parent = node.parentNode;
    var nestULCount = findParentNumber(node, 'UL');
    var nestOLCount = findParentNumber(node, 'OL');
    var nestCount = nestULCount + nestOLCount;
    var isLoose = node.firstChild && node.firstChild.nodeName === 'P'; // Todo:isBlock
    var newList =
        parent &&
        parent.previousSibling &&
        parent.previousSibling.nodeName === parent.nodeName;
    var bulletListMarker = newList ? '+' : options.bulletListMarker;
    var prefix = bulletListMarker + ' ';

    var replaceTaget = `\n    ${repeat(' ', nestCount - 1)}$1`;
    if (IndentCodeIsListfirstChild(node, options) && nestOLCount) {
        replaceTaget = `\n  ${repeat(' ', nestCount)}$1`;
    } else if (nestULCount) {
        replaceTaget = `\n${repeat(' ', nestCount * 2)}$1`;
    }

    content = content
        .replace(/^\n+/, '') // remove leading newlines
        .replace(/\n+$/, '\n') // replace trailing newlines with just a single one
        .replace(/\n(\S)/gm, replaceTaget); // indent

    if (parent && parent.nodeName === 'OL') {
        var start = (parent as HTMLElement).getAttribute('start');
        var index = Array.prototype.indexOf.call(parent.children, node);
        prefix =
            (start ? Number(start) + index : index + 1) + (newList ? ')  ' : '.  ');
    }
    if (parent && parent.nextSibling && parent.nextSibling.nodeName === 'PRE') {
        if (!isLoose) prefix = ' ' + prefix + '   '; // example 235
        if (parent.lastChild === node && isLoose) {
            // example 293
            prefix = '  ' + prefix;
        }
    }

    if (nestULCount > 1) {
        prefix = repeat(' ', (nestULCount - 1) * 2) + prefix;
    }
    if (nestULCount && nestOLCount) {
        const indent = findOrderListIndentNumber(node);
        prefix = repeat(' ', nestULCount * 4 + indent) + prefix;
    }
    // Info：嵌套列表且父列表为空
    var nestListAndParentIsEmpty =
        nestOLCount + nestULCount > 1 &&
        node.parentNode &&
        node.parentNode.parentNode &&
        (node.parentNode.parentNode as HTMLElement).innerHTML ===
        (node.parentNode as HTMLElement).outerHTML;
    if (nestListAndParentIsEmpty) {
        prefix = prefix.trimStart();
    }

    return (
        prefix +
        content +
        (node.nextSibling && !/\n$/.test(content) ? '\n' : '') +
        (isLoose ? '\n' : '')
    );
}