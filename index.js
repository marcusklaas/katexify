#!/usr/bin/env node

const katex = require('katex');
const fs = require('fs').promises;
const path = require('path');
const parser = require('node-html-parser');

const walk = async (dir, filelist = []) => {
    const files = await fs.readdir(dir);

    for (file of files) {
        const filepath = path.join(dir, file);
        const stat = await fs.stat(filepath);

        if (stat.isDirectory()) {
            filelist = await walk(filepath, filelist);
        } else {
            filelist.push(filepath);
        }
    }

    return filelist;
}

const walkTree = (node) => {
    // text node
    if (node.nodeType === 3) {
        // replace katex sequences inside text
        node.rawText = node.rawText
            .replace(/\$\$(.*?)\$\$/g, (outer, inner) => katex.renderToString(inner, { displayMode: true }))
            .replace(/\$(.*?)\$/g, (outer, inner) => katex.renderToString(inner, { displayMode: false }));
    } else {
        // walk children
        node.childNodes.forEach(walkTree);
    }

    // return self so we can chain
    return node;
};

const katexifyFile = async (filePath) => {
    if (path.extname(filePath).toLowerCase() == '.html') {
        const contents = await fs.readFile(filePath, 'utf8');
        const root = parser.parse(contents);
        const katexifiedContents = walkTree(root).toString();

        await fs.writeFile(filePath, katexifiedContents);
        console.log(`Katexified ${filePath}`);
        return 1;
    } else {
        return 0;
    }
};

const dir = process.argv.length >= 3 ? process.argv[2] : './';

const fileList = walk(dir)
    .then(fileList => Promise.all(fileList.map(katexifyFile)).then(l => l.reduce((a, b) => a + b, 0)))
    .then(count => console.log(`Katexified ${count} files without errors!`))
    .catch(e => console.warn(`Oh no, we got the following error: ${e}`));
