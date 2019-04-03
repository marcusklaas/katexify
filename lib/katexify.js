const katex = require('katex');
const parser = require('node-html-parser');

const skippedElements = ['script', 'style', 'pre'];

const walkTree = node => {
    if (skippedElements.includes(node.tagName)) {
        return node;
    }

    // text node
    if (node.nodeType === 3) {
        // replace katex sequences inside text
        node.rawText = node.rawText
            .replace(/\$\$(.*?)\$\$/sg, (outer, inner) => katex.renderToString(inner, { displayMode: true }))
            .replace(/\$(.*?)\$/sg, (outer, inner) => katex.renderToString(inner, { displayMode: false }));
    } else {
        // walk children
        node.childNodes.forEach(walkTree);
    }

    // return self so we can chain
    return node;
};

module.exports = inp => {
    const wrapped = `<dummy>${inp}</dummy>`;
    const root = parser.parse(wrapped, {
        lowerCaseTagName: true,
        script: true,
        style: true,
        pre: true,
    }).childNodes[0];
    return walkTree(root).childNodes[0].toString();
};
