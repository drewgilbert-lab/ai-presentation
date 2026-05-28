# Changelog

All notable changes to the HG Insights AI Presentation Pipeline.

## [Unreleased]

### Changed — Production URL (2026-05-28)

- Updated live site URL to `https://ai-presentation-seven-omega.vercel.app` in [`.cursorrules`](.cursorrules), [`README.md`](README.md), [`.env.example`](.env.example), and [`scripts/commit-deck.js`](scripts/commit-deck.js)

---

### Fixed — Content scaling, footer spacing, and collapsible nav (2026-05-28)

- **Problem:** After the initial footer buffer fix, dense slides still had content clipped rather than resized. Footer reserved too much bottom space. A persistent slide outline appeared top-right with no way to hide it.
- **Fix:**
  - Added [`hg-theme/components/HgFitContent.vue`](hg-theme/components/HgFitContent.vue) — auto-scales slide body content down (min 55%) to fit the area above the footer instead of clipping
  - Integrated `HgFitContent` into [`hg-theme/layouts/default.vue`](hg-theme/layouts/default.vue)
  - Reduced footer buffer by ~50%: `h-7` + `mt-3` + `pb-3` (was `h-14` + `mt-6` + `pb-6`)
  - Added [`hg-theme/global-top.vue`](hg-theme/global-top.vue) — collapsible **Outline** (slide TOC) and **Controls** (Slidev play UI) toggles, hidden by default, state persisted in `localStorage`
  - CSS in [`hg-theme/style.css`](hg-theme/style.css) hides in-slide TOC overlays and default controls until toggled
  - Set `drawings.presenterOnly: true` in [`hg-theme/package.json`](hg-theme/package.json) to hide drawing toolbar in play mode
- Updated design docs: auto-scale behavior, ~52px footer safe zone, no embedded `<Toc>` in decks

---

### Fixed — Default layout footer (2026-05-28)

- **Problem:** Body content on dense slides (e.g. 2×2 card grids) overflowed into the footer, overlapping the logo, copyright text, and page number. Footer logo was bottom-aligned while copyright and page number were vertically misaligned.
- **Fix:** Restructured [`hg-theme/layouts/default.vue`](hg-theme/layouts/default.vue) as a flex column per [Slidev layout conventions](https://sli.dev/guide/layout):
  - Body content in a dedicated upper zone separated from the footer band
  - Fixed footer bar with `flex items-center` for vertical alignment of logo, copyright, and slide number
  - Logo constrained with `max-h-10` to align with 9px footer text
- Added supporting CSS in [`hg-theme/style.css`](hg-theme/style.css) for `.default-layout-content` and `.default-layout-footer`
- Updated design docs with **content safe zone** guidance:
  - [`.cursor/skills/hg-slidev-deck/SKILL.md`](.cursor/skills/hg-slidev-deck/SKILL.md)
  - [`.cursorrules`](.cursorrules)
  - [`prompts/claude-system-prompt.md`](prompts/claude-system-prompt.md)

---

### Added — Cursor rules, deck skill, and TAM report deck (2026-05-28)

- Created [`.cursorrules`](.cursorrules) — project conventions for Cursor agents
- Created [`.cursor/skills/hg-slidev-deck/SKILL.md`](.cursor/skills/hg-slidev-deck/SKILL.md) — full deck generation skill with composable visual patterns
- Added [`decks/tam-report.md`](decks/tam-report.md) — TAM report presentation
- Updated [`vercel.json`](vercel.json) — routing rewrites for `/tam-report/`

---

## [0.1.0] — 2026-05-28

### Summary

Completed **Phase 3 (Pipeline Stabilization)** and **Phase 4 (LLM Integration)** from the product requirements document. The Vercel build failure caused by logo asset resolution on Linux is fixed. The repo now includes a working multi-deck build, Vercel routing config, a Claude system prompt, and a GitHub commit script for zero-touch deck publishing.

**Validation:** All automated tests passed (clean rebuild, dist artifacts, HgStatBox compilation, `commit-deck.js` validation, `vercel.json` JSON validity).

---

### Fixed — Phase 3: Build & Deployment

#### Logo asset path (Vercel blocker)

- **Problem:** SVG logos lived in `hg-theme/Public/` (capital P). Slidev/Vite expects `hg-theme/public/` (lowercase). Builds failed on Vercel Linux with:
  ```
  Rollup failed to resolve import "/HGInsights-Logo-white.svg" from hg-theme/layouts/cover.vue
  ```
- **Fix:** Renamed `hg-theme/Public/` → `hg-theme/public/` via two-step `git mv` so git tracks the case change on macOS.
- **Additional fix:** Updated [`hg-theme/layouts/cover.vue`](hg-theme/layouts/cover.vue) and [`hg-theme/layouts/default.vue`](hg-theme/layouts/default.vue) to import SVGs from `../public/` instead of using absolute `/` paths, ensuring Vite bundles logos correctly at build time.

#### Missing `HgStatBox` component

- **Problem:** [`decks/marketing.md`](decks/marketing.md) referenced `<HgStatBox>` but no component existed.
- **Fix:** Created [`hg-theme/components/HgStatBox.vue`](hg-theme/components/HgStatBox.vue) using existing UnoCSS shortcuts (`hg-stat-box`, `hg-stat-num`, `hg-stat-label`).

#### Build script hardening

- Updated [`build.js`](build.js):
  - Clears entire `dist/` directory before building (Slidev CLI v0.49 does not support Vite's `--emptyOutDir` flag).
  - Clears each per-deck output directory before individual builds.
  - Generates [`dist/index.html`](dist/index.html) — a landing page listing all decks with links to `/{slug}/`.

#### Vercel routing

- Created [`vercel.json`](vercel.json):
  - `outputDirectory`: `dist`
  - SPA rewrites for `/marketing/` and `/sales/` with asset passthrough rules so JS/CSS bundles are not swallowed by `index.html` fallbacks.

---

### Added — Phase 4: LLM Integration

#### Claude system prompt

- Created [`prompts/claude-system-prompt.md`](prompts/claude-system-prompt.md):
  - Markdown-only output contract for `decks/{slug}.md`
  - Required `layout: cover` on first slide; `layout: default` on content slides
  - Forbidden patterns: `theme: default`, custom CSS, inline styles, non-brand colors
  - Allowed component: `<HgStatBox num="..." label="..." />`
  - Full UnoCSS shortcut reference from `hg-theme/uno.config.ts`
  - Canonical example: `decks/marketing.md`

#### GitHub commit script

- Created [`scripts/commit-deck.js`](scripts/commit-deck.js):
  - Commits or updates `decks/{name}.md` via GitHub Contents API
  - Usage: `npm run commit-deck -- --file decks/my-deck.md` or stdin with `--name`
  - Validates kebab-case filenames and `layout: cover` on first slide
  - Warns on suspicious patterns (inline styles, unknown layouts, non-brand hex colors, unknown components)
  - Prints GitHub commit URL and expected Vercel live URL
  - Exit codes: `1` missing token, `2` file not found, `3` empty stdin, `4` validation, `5` API error, `64` usage

#### Environment & documentation

- Created [`.env.example`](.env.example) — `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, `LIVE_URL_BASE`
- Created [`.gitignore`](.gitignore) — ignores `node_modules/`, `dist/`, `.env`, `.DS_Store`
- Expanded [`README.md`](README.md) — architecture, local dev, build/deploy, PAT setup, commit-deck usage, LLM generation guide, new-deck checklist
- Added `"commit-deck"` script to [`package.json`](package.json)
- Generated [`package-lock.json`](package-lock.json) via `npm install`

---

### Validation Results (2026-05-28)

| Test | Result |
|------|--------|
| Clean rebuild (`rm -rf dist node_modules && npm install && npm run build`) | PASS |
| `dist/index.html` links to marketing and sales | PASS |
| `dist/marketing/index.html` exists | PASS |
| `dist/sales/index.html` exists | PASS |
| Logo SVGs in `dist/marketing/assets/` | PASS |
| `HgStatBox` compiled into marketing bundle | PASS |
| `hg-theme/public/` exists (lowercase) | PASS |
| `commit-deck.js` — no args shows usage (exit 64) | PASS |
| `commit-deck.js` — invalid deck fails validation (exit 4) | PASS |
| `commit-deck.js` — valid deck passes validation; 401 without real token (exit 5) | PASS |
| `vercel.json` valid JSON | PASS |

**Build output (marketing deck):** 420 modules, ~2.1s  
**Build output (sales deck):** 414 modules, ~1.9s

---

### Files Changed

| File | Change |
|------|--------|
| `hg-theme/Public/` → `hg-theme/public/` | Renamed (logo SVGs) |
| `hg-theme/components/HgStatBox.vue` | Created |
| `hg-theme/layouts/cover.vue` | Modified — SVG import |
| `hg-theme/layouts/default.vue` | Modified — SVG import |
| `build.js` | Modified — dist cleanup, index.html generation |
| `vercel.json` | Created |
| `prompts/claude-system-prompt.md` | Created |
| `scripts/commit-deck.js` | Created |
| `.env.example` | Created |
| `.gitignore` | Created |
| `README.md` | Expanded |
| `package.json` | Added `commit-deck` script |
| `package-lock.json` | Created |
| `CHANGELOG.md` | Created |

---

### Known Issues & Follow-ups

1. **New deck routing is manual** — Each new deck requires two rewrite entries in `vercel.json`. Consider auto-generating rewrites in a future iteration.

2. **Slidev outDir warning** — Vite logs a non-fatal warning that `outDir` is outside project root. Build succeeds; warning is expected given multi-deck architecture.

3. **npm audit** — `npm install` reports moderate/low vulnerabilities in dependencies. Not blocking; consider dependency updates separately.

4. **E2E with real GitHub token** — Full pipeline test (Claude → commit-deck → Vercel → live URL) requires a GitHub PAT in `.env`. See README for setup.

5. **Dense slide content** — Footer overflow is prevented by layout separation; content auto-scales via `HgFitContent` (min 55%). Extremely dense slides may still need to be split across two slides.
