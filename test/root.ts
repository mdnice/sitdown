var root = (typeof window !== 'undefined' ? window : {});

/**
 * remove(node) removes the given node from the DOM and returns the
 * next node in the sequence.
 *
 * @param {Node} node
 * @return {Node} node
 */
// @ts-ignore
function remove (node) {
    var next = node.nextSibling || node.parentNode;

    node.parentNode.removeChild(node);

    return next
}

/**
 * next(prev, current, isPre) returns the next node in the sequence, given the
 * current and previous nodes.
 *
 * @param {Node} prev
 * @param {Node} current
 * @param {Function} isPre
 * @return {Node}
 */
// @ts-ignore
function next (prev, current, isPre) {
    if ((prev && prev.parentNode === current) || isPre(current)) {
        return current.nextSibling || current.parentNode
    }

    return current.firstChild || current.nextSibling || current.parentNode
}

var blockElements = [
    'address', 'article', 'aside', 'audio', 'blockquote', 'body', 'canvas',
    'center', 'dd', 'dir', 'div', 'dl', 'dt', 'fieldset', 'figcaption',
    'figure', 'footer', 'form', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'header', 'hgroup', 'hr', 'html', 'isindex', 'li', 'main', 'menu', 'nav',
    'noframes', 'noscript', 'ol', 'output', 'p', 'pre', 'section', 'table',
    'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul'
];

// @ts-ignore
function isBlock (node) {
    return blockElements.indexOf(node.nodeName.toLowerCase()) !== -1
}

var voidElements = [
    'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input',
    'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
];

// @ts-ignore
function isVoid (node) {
    return voidElements.indexOf(node.nodeName.toLowerCase()) !== -1
}

function canParseHTMLNatively () {
    // @ts-ignore
    var Parser = root.DOMParser;
    var canParse = false;

    // Adapted from https://gist.github.com/1129031
    // Firefox/Opera/IE throw errors on unsupported types
    try {
        // WebKit returns null on unsupported types
        if (new Parser().parseFromString('', 'text/html')) {
            canParse = true;
        }
    } catch (e) {}

    return canParse
}

/**
 * collapseWhitespace(options) removes extraneous whitespace from an the given element.
 *
 * @param {Object} options
 */
// @ts-ignore
function collapseWhitespace (options) {
    var element = options.element;
    var isBlock = options.isBlock;
    var isVoid = options.isVoid;
    // @ts-ignore
    var isPre = options.isPre || function (node) {
        return node.nodeName === 'PRE'
    };

    if (!element.firstChild || isPre(element)) return

    var prevText = null;
    var prevVoid = false;

    var prev = null;
    var node = next(prev, element, isPre);

    while (node !== element) {
        if (node.nodeType === 3 || node.nodeType === 4) { // Node.TEXT_NODE or Node.CDATA_SECTION_NODE
            var text = node.data.replace(/[ \r\n\t]+/g, ' ');

            if ((!prevText || / $/.test(prevText.data)) &&
                !prevVoid && text[0] === ' ') {
                text = text.substr(1);
            }

            // `text` might be empty at this point.
            if (!text) {
                node = remove(node);
                continue
            }

            node.data = text;

            prevText = node;
        } else if (node.nodeType === 1) { // Node.ELEMENT_NODE
            if (isBlock(node) || node.nodeName === 'BR') {
                if (prevText) {
                    prevText.data = prevText.data.replace(/ $/, '');
                }

                prevText = null;
                prevVoid = false;
            } else if (isVoid(node)) {
                // Avoid trimming space around non-block, non-BR void elements.
                prevText = null;
                prevVoid = true;
            }
        } else {
            node = remove(node);
            continue
        }

        var nextNode = next(prev, node, isPre);
        prev = node;
        node = nextNode;
    }

    if (prevText) {
        prevText.data = prevText.data.replace(/ $/, '');
        if (!prevText.data) {
            remove(prevText);
        }
    }
}

function createHTMLParser () {
    var Parser = function () {};

    {
        var JSDOM = require('jsdom').JSDOM;
        Parser.prototype.parseFromString = function (string:string) {
            return new JSDOM(string).window.document
        };
    }
    return Parser
}

// @ts-ignore
var HTMLParser = canParseHTMLNatively() ? root.DOMParser : createHTMLParser();

export function RootNode (input:string) {
    var root;
    if (typeof input === 'string') {
        var doc = htmlParser().parseFromString(
            // DOM parsers arrange elements in the <head> and <body>.
            // Wrapping in a custom element ensures elements are reliably arranged in
            // a single element.
            '<x-turndown id="turndown-root">' + input + '</x-turndown>',
            'text/html'
        );
        root = doc.getElementById('turndown-root');
    } else {
        // @ts-ignore
        root = input.cloneNode(true);
    }
    collapseWhitespace({
        element: root,
        isBlock: isBlock,
        isVoid: isVoid
    });

    return root
}

// @ts-ignore
var _htmlParser;
function htmlParser () {
    // @ts-ignore
    _htmlParser = _htmlParser || new HTMLParser();
    return _htmlParser
}