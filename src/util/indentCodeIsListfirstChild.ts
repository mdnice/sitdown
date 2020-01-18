import TurndownService from "../../lib/turndown";
import {Options} from "../types";

export function IndentCodeIsListfirstChild(
    list: TurndownService.Node,
    options: Options
) {
    return (
        options.codeBlockStyle !== 'fenced' &&
        list &&
        list.firstChild &&
        list.nodeName === 'LI' &&
        list.firstChild.nodeName === 'PRE'
    );
}
