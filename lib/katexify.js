const katex = require('katex');
const parser = require('node-html-parser');

const skippedElements = ['script', 'style', 'pre'];

const katexifyText = text => 
    text.replace(/\$\$(.*?)\$\$/sg, (outer, inner) => katex.renderToString(inner, { displayMode: true }))
        .replace(/(?<!\\)(\\\\)*\$(.*?[^\\](\\\\)*)\$/sg, (_outer, backslashes, inner) => {
            const prefix = backslashes || '';
            return prefix + katex.renderToString(inner, { displayMode: false });
        });

const walkTree = node => {
    if (skippedElements.includes(node.tagName)) {
        return node;
    }

    // text node
    if (node.nodeType === 3) {
        // replace katex sequences inside text
        node.rawText = katexifyText(node.rawText);
    } else {
        // walk children
        node.childNodes.forEach(walkTree);
    }

    // return self so we can chain
    return node;
};

module.exports = inp => {
    const root = parser.parse(inp, {
        lowerCaseTagName: true,
        script: true,
        style: true,
        pre: true,
    });
    
    if (root.childNodes.length > 0) {
        // Find prefix that was dropped by root (for example, <!doctype html>) and prepend it.
        const prefixLength = inp.search(new RegExp(`<${root.childNodes[0].tagName}`, 'i'));

        return inp.substring(0, prefixLength) + walkTree(root).toString();
    } else {
        return katexifyText(inp);
    }
};
