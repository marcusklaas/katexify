# katexify

Recursively walks a filesystem, katexifying all html files in its path. Turns `$...$` spans into inline math, and `$$...$$` into display math.

## Usage

```bash
npm install
node index.js <dir>
```

## Link as command line script

```bash
npm install
sudo npm link
katexify <dir>
```
