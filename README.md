# Mem-Wiki (芒伊木 Wiki)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploys by Netlify](https://www.netlify.com/img/global/badges/netlify-color-accent.svg)](https://www.netlify.com)

> **A non-commercial, open-source community Wiki project for the "Don't Starve Together" mod.**

This repository hosts the source code for the Mem-Wiki documentation website. It is built using [VitePress](https://vitepress.dev/) and is deployed via the [Netlify Open Source Plan](https://www.netlify.com/legal/open-source-policy/). 

## 🛡️ License & Open Source

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.
This is a volunteer-driven, non-commercial community project designed to help players understand and enjoy the mod. 

## 🤝 Code of Conduct

We are committed to providing a friendly, safe and welcoming environment for all. Please read and respect our [Code of Conduct](CODE_OF_CONDUCT.md).

## 🚀 Development

### Prerequisites
- Node.js 24 (also recorded in `.nvmrc` and `netlify.toml`)

### Local Setup
```bash
npm ci
npm run docs:dev
```

### Checks and production build
```bash
npm test
npm run docs:build
npm run docs:preview
```

The local production preview uses Vite's server to read the current build files
on each request. After another build finishes, refresh the browser to load the
new HTML and hashed scripts. VitePress 1.6's own preview caches its file list at
startup, so rebuilding under that server can leave the skill tree and page
outline blank when new scripts return 404. Use `npm run docs:preview` here;
use `npm run docs:dev` for live source editing.

Every build checks noun links against rendered page anchors and skill IDs, and
checks that aliases and special links agree with the noun map. A broken target
fails the build. To recheck an existing build, run `npm run docs:check` (or
`npm run docs:check -- path/to/output` for a custom output directory).

When adding or renaming a term, keep `.vitepress/theme/components/icons.js`
and its `[#词条名]` definition anchor in sync. Skill links must use an existing ID
from `.vitepress/data/skilltree.js`. The existing auto-anchor scripts rewrite
source files; review their diff and run a build after using them.

### Netlify deployment
Netlify builds from the Git repository using the root `netlify.toml`: tests run
first, then VitePress builds and validates links; `.vitepress/dist` is published.
Build output and cache directories are generated locally and are not tracked
in Git. A fresh checkout needs `npm ci` and a build, not committed HTML files.

### Dependency maintenance
VitePress remains on stable 1.6.4. The `speech-rule-engine` override updates its
pinned XML parser to the security-patched `@xmldom/xmldom` 0.9.12; re-evaluate the
override when its parent dependency changes.

As of 2026-10-04, `npm audit` still flags the VitePress / Vite 5 / esbuild chain.
Resolving that chain requires a framework/toolchain compatibility change, so it
is deferred rather than forced across the declared dependency ranges. These
reports concern development/build tooling; the published site is static.
Keep the development server local (the default), and assess these advisories
before using `--host` to expose it to a network. Recheck with `npm audit` when
updating dependencies.

### Layout maintenance
The base document layout lives in `.vitepress/theme/custom.css`. The archive
pages share `archive.css`, with page-specific rules in `items.css` and
`enemies.css`. Columns use the named `wiki-content` container and depend on
available article width, not just browser width. Archive articles fill the
space between navigation and the outline; do not reinstate a fixed 860px cap.

In an `.archive-illustrated` block, place inline media before `.archive-copy`.
At an article width of at least 760px, media floats right and text returns to
full width below it; narrower articles stack their content. Preserve the copy
width constraints so long formulas cannot expand the page. Long formulas and
comparison tables scroll within their own region. Repeated noun links retain
their icons so readers can identify terms wherever they enter a long page.

Use lowercase native HTML tags in Markdown (for example, `<u>`). Uppercase `<U>`
was interpreted differently during server rendering and browser hydration.

### Chinese and English editions

Chinese pages keep their original URLs. English pages mirror them under `/en/`.
The language control preserves the corresponding page, query and section/selected
skill hash. Skill-point allocations remain page-local and reset on route remount
or refresh, as documented by the simulator.

English source files retain canonical Chinese `[#definition]` anchors and
`[noun]` tokens intentionally. The Markdown renderer translates display labels
before search indexing; canonical keys keep icons, hover definitions and links
unambiguous even when two concepts share an English name. Plain translated
headings keep explicit matching anchor IDs. Do not translate those IDs.

Shared display strings live in `.vitepress/data/ui-en.js` and `terms-en.js`.
The original skill graph, requirements and calculation modules remain the
source of truth. Translate their presentation without changing their values.

After editing either edition, run:

```bash
npm test
npm run docs:build
npm run docs:check-locales
```

The locale check compares all translated pages and numeric tokens, verifies
heading/definition anchors and internal links, checks rendered English text and
accessibility labels, and queries the actual emitted English search index.
Exact Chinese `/mem` command arguments are preserved because they are game input.
