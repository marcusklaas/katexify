const assert = require('assert');
const katexify = require('../lib/katexify');

const yoloTranslation = katexify('$yolo$');
const displayYoloTranslation = katexify('$$yolo$$');

describe('katexify', () => {
    it('should work on plain text', () => {
        assert(yoloTranslation.includes('katex'));
    });

    it('should not match escaped starting dollers', () => {
        const input = String.raw`I had 5\$. I gave you 3$. How many dollers do I have now?`;
        assert.equal(katexify(input), input);
    });

    it('should not match escaped ending delimiters', () => {
        const input = String.raw`I had 5$. I gave you 3\$. How many dollers do I have now?`;
        assert.equal(katexify(input), input);
    });

    it('should handle escaped dollers inside a katex string', () => {
        const input = String.raw`Formula: $f(x) = \$ + \$$`;
        const katexified = katexify(input);
        assert(katexified.startsWith('Formula: <span'));
        assert(katexified.endsWith('</span>'));
    });

    it('should match dollers preceded by escaped backslashes', () => {
        const input = String.raw`In latex displays, you can end a line with \\$yolo$`;
        const expected = String.raw`In latex displays, you can end a line with \\${yoloTranslation}`;
        assert.equal(katexify(input), expected);
    });

    it('should differentiate between normal and display latex', () => {
        assert.notEqual(yoloTranslation, displayYoloTranslation);
        assert(displayYoloTranslation.includes('display'));
        assert(! yoloTranslation.includes('display'));
    });
    
    it('should look inside html', () => {
        const input = '<html><body>$yolo$</body></html>';
        const expected = `<html><body>${yoloTranslation}</body></html>`;
        assert.equal(katexify(input), expected);
    });
    
    it('should format display blocks on double dollar', () => {
        const input = '<html><body>$$yolo$$</body></html>';
        const expected = `<html><body>${displayYoloTranslation}</body></html>`;
        assert.equal(katexify(input), expected);
    });

    it('should do all occurences', () => {
        const input = '<html><body>$yolo$ swag $yolo$</body></html>';
        const expected = `<html><body>${yoloTranslation} swag ${yoloTranslation}</body></html>`;
        assert.equal(katexify(input), expected);
    });

    it('should also transform multiline sequences', () => {
        const input = '<html><body>$\nyolo\n$</body></html>';
        const expected = `<html><body>${yoloTranslation}</body></html>`;
        assert.equal(katexify(input).replace(/\n/g, ''), expected);
    });

    it('should skip script tags', () => {
        const input = '<html><head><script>$swagger$</script></head></html>';
        const expected = input;
        assert.equal(katexify(input), expected);
    });

    it('should skip style tags', () => {
        const input = '<html><head><style>$swagger$</style></head></html>';
        const expected = input;
        assert.equal(katexify(input), expected);
    });

    it('should skip pre tags', () => {
        const input = '<html><body><pre><code>$swagger$</code></pre></body></html>';
        const expected = input;
        assert.equal(katexify(input), expected);
    });

    it('shouldn\'t mess with attributes', () => {
        const input = '<html><body><a href="$YOLO$">swag</a></body></html>';
        const expected = input;
        assert.equal(katexify(input), expected);
    });

    it('should deal ok with doctypes', () => {
        const input = `<!doctype html><html></html>`;
        const expected = input;
        assert.equal(katexify(input), expected);
    });
});

