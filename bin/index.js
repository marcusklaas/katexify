#!/usr/bin/env node

const katexify = require('../lib/katexify');
const fs = require('fs').promises;
const path = require('path');

const allowedFileExtensions = ['.html', '.md'];

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

const katexifyFile = async filePath => {
    if (allowedFileExtensions.indexOf(path.extname(filePath).toLowerCase()) >= 0) {
        const contents = await fs.readFile(filePath, 'utf8');
        await fs.writeFile(filePath, katexify(contents));
        console.log(`Katexified ${filePath}`);
        return 1;
    } else {
        return 0;
    }
};

const dir = process.argv.length >= 3 ? process.argv[2] : './';

walk(dir)
    .then(fileList => Promise.all(fileList.map(katexifyFile)).then(l => l.reduce((a, b) => a + b, 0)))
    .then(count => console.log(`Katexified ${count} files without errors!`))
    .catch(e => console.warn(`Oh no, we got the following error: ${e}`));
