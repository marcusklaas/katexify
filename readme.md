# katexify

Recursively walks a filesystem, katexifying all html files in its path. Turns `$...$` spans into inline math, and `$$...$$` into display math.

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
