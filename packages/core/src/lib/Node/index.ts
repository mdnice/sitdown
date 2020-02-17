import isBlock from '../../util/isBlock';
import isBlank from './isBlank';
import flankingWhitespace from './flankingWhitespace';

export default class Node {
    unNeedEscape?: boolean;
    data?: string;
    isBlank?: boolean;
    isBlock?: boolean;
    isCode?: boolean;
    flankingWhitespace?: {
        leading: string;
        trailing: string;
    };

    constructor(node:HTMLElement) {
        const newNode = node as Node & HTMLElement;
        newNode.isBlock = isBlock(node);
        newNode.isCode =
            node.nodeName.toLowerCase() === 'code' ||
            (node.parentNode as Node).isCode;
        newNode.isBlank = isBlank(node);
        newNode.flankingWhitespace = flankingWhitespace(node);
        return Object.assign(node,newNode);
    }
}
