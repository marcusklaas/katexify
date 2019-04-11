# katexify

Recursively walks a filesystem, katexifying all html files in its path. Turns `$...$` spans into inline math, and `$$...$$` into display math.

To print regular dollers, they can be escaped with backslashes and will be unescaped. For example:
`The sum of \$5 and \$3 is \$8` will become `The sum of $5 and $3 is $8`. To produce a regular backslash before a math span, escape backslash themselves:
`\\$f(x) = x^2$` will produce `\<span class="katex">…</span>`. Note that only escaped backslashes immediately preceding a doller will be unescaped. All
other escape sequences are untouched.

## Usage

Run test suite:
```bash
npm test
```

Simple usage without installation:
```
node bin/index.js <dir>
```

## Installation

```bash
sudo npm install -g
katexify <dir>
```
