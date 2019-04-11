# katexify

Recursively walks a filesystem, katexifying all html files in its path. Turns `$...$` spans into inline math, and `$$...$$` into display math.

To print regular dollers, they can be escaped with backslashes and will be unescaped. For example:
`The sum of \$5 and \$3 is \$8` will become `The sum of $5 and $3 is $8`. To produce a regular backslash before a math span, escape backslash themselves:
`\\$f(x) = x^2$` will produce `\<span class="katex">…</span>`. Note that only escaped backslashes immediately preceding a doller will be unescaped. All
other escape sequences are untouched.

## Example

```html
<html>
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.1/dist/katex.min.css" integrity="sha384-dbVIfZGuN1Yq7/1Ocstc1lUEm+AT+/rCkibIcC/OmWo5f0EA48Vf8CytHzGrSwbQ" crossorigin="anonymous">
    </head>
    <body>
        Let $x$ be a variable and $$\Sigma_{i = 0}^n i = \frac{n(n-1)}{2}$$ a formula.
        Also replace when delimiters are on different lines:
        $$
            \Sigma_x {f^2(x)} \leq \left({ \Sigma_x f(x)}\right)^2
        $$
    </body>
</html>
```

renders to:

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.1/dist/katex.min.css" integrity="sha384-dbVIfZGuN1Yq7/1Ocstc1lUEm+AT+/rCkibIcC/OmWo5f0EA48Vf8CytHzGrSwbQ" crossorigin="anonymous">

Let <span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>x</mi></mrow><annotation encoding="application/x-tex">x</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.43056em;vertical-align:0em;"></span><span class="mord mathdefault">x</span></span></span></span> be a variable and <span class="katex-display"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><msubsup><mi mathvariant="normal">Σ</mi><mrow><mi>i</mi><mo>=</mo><mn>0</mn></mrow><mi>n</mi></msubsup><mi>i</mi><mo>=</mo><mfrac><mrow><mi>n</mi><mo>(</mo><mi>n</mi><mo>−</mo><mn>1</mn><mo>)</mo></mrow><mn>2</mn></mfrac></mrow><annotation encoding="application/x-tex">\Sigma_{i = 0}^n i = \frac{n(n-1)}{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9613919999999999em;vertical-align:-0.247em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.7143919999999999em;"><span style="top:-2.4530000000000003em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathdefault mtight">i</span><span class="mrel mtight">=</span><span class="mord mtight">0</span></span></span></span><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathdefault mtight">n</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.247em;"><span></span></span></span></span></span></span><span class="mord mathdefault">i</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height:2.113em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">2</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathdefault">n</span><span class="mopen">(</span><span class="mord mathdefault">n</span><span class="mspace" style="margin-right:0.2222222222222222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222222222222222em;"></span><span class="mord">1</span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span> a formula.
Also replace when delimiters are on different lines:
<span class="katex-display"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mi>x</mi></msub><mrow><msup><mi>f</mi><mn>2</mn></msup><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>≤</mo><msup><mrow><mo fence="true">(</mo><mrow><msub><mi mathvariant="normal">Σ</mi><mi>x</mi></msub><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo fence="true">)</mo></mrow><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">
    \Sigma_x {f^2(x)} \leq \left({ \Sigma_x f(x)}\right)^2
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1141079999999999em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.151392em;"><span style="top:-2.5500000000000003em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathdefault mtight">x</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord"><span class="mord"><span class="mord mathdefault" style="margin-right:0.10764em;">f</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641079999999999em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord mathdefault">x</span><span class="mclose">)</span></span><span class="mspace" style="margin-right:0.2777777777777778em;"></span><span class="mrel">≤</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height:1.204008em;vertical-align:-0.25em;"></span><span class="minner"><span class="minner"><span class="mopen delimcenter" style="top:0em;">(</span><span class="mord"><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.151392em;"><span style="top:-2.5500000000000003em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathdefault mtight">x</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord mathdefault" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord mathdefault">x</span><span class="mclose">)</span></span><span class="mclose delimcenter" style="top:0em;">)</span></span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.954008em;"><span style="top:-3.2029em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span>


## Usage

Run test suite:
```bash
npm test
```

Simple usage without installation:
```
node bin/index.js <dir>
```

Note that katexify only produces the semantic structure in HTML. To properly render the math, you'll need KaTeX CSS. This can be loaded through a CDN by including
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.1/dist/katex.min.css" integrity="sha384-dbVIfZGuN1Yq7/1Ocstc1lUEm+AT+/rCkibIcC/OmWo5f0EA48Vf8CytHzGrSwbQ" crossorigin="anonymous">
```
in your your HTML. For more information, check the [KaTeX browser installation page].

## Installation

```bash
sudo npm install -g
katexify <dir>
```

[KaTeX browser installation page]: https://katex.org/docs/browser.html
