const katex = require('katex');
const parser = require('node-html-parser');

const skippedElements = ['script', 'style', 'pre'];

const katexifyText = text => 
    text.replace(/(?<!\\)(\\\\)*\$\$(.*?[^\\](\\\\)*)\$\$/sg, (_outer, backslashes, inner) => {
            let prefix = backslashes || '';
            // unescape backslashes by cutting sequence in half 
            prefix = prefix.substring(prefix.length / 2);
            return prefix + katex.renderToString(inner, { displayMode: true });
        })
        .replace(/(?<!\\)(\\\\)*\$(.*?[^\\](\\\\)*)\$/sg, (_outer, backslashes, inner) => {
            let prefix = backslashes || '';
            prefix = prefix.substring(prefix.length / 2);
            return prefix + katex.renderToString(inner, { displayMode: false });
        })
        // Replace escaped dollers by regular dollars. Not 100% sure this is the right thing
        // to do. We choose not to unescape backslashes. Also not sure if that is sensible.
        .replace(/\\\$/sg, _ => '$');

const walkTree = node => {
    if (!skippedElements.includes(node.tagName)) {
        // text node
        if (node.nodeType === 3) {
            // replace katex sequences inside text
            node.rawText = katexifyText(node.rawText);
        } else {
            // walk children
            node.childNodes.forEach(walkTree);
        }
    }

    // return self so we can chain
    return node;
};

module.exports = inp => {
    const wrapped = '<dummy>' + inp + '</dummy>';
    const root = parser.parse(wrapped, {
        lowerCaseTagName: true,
        script: true,
        style: true,
        pre: true,
    }).childNodes[0];

    return walkTree(root).toString().slice(7, -8);
};
