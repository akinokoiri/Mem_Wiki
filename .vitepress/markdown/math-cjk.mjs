// MathJax 3's server-side SVG uses a 1000-unit Han advance but an
// x-height-normalized 884px fallback glyph. Mark only that known output;
// the archive theme supplies the matching full-width font size and face.
export function archiveMathCjk(md) {
  for (const type of ['math_inline', 'math_block']) {
    const render = md.renderer.rules[type]
    md.renderer.rules[type] = (tokens, idx, options, env, self) => {
      const html = render(tokens, idx, options, env, self)
      if (!String(env.frontmatter?.pageClass || '').split(/\s+/).includes('ink-archive')) return html
      return html.replace(
        /<text\b([^>]*\bfont-size="884px"[^>]*)>(\p{Script=Han})<\/text>/gu,
        '<text class="archive-math-cjk"$1>$2</text>'
      )
    }
  }
}
