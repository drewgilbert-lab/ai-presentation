# ai-presentation

HG Insights branded Slidev presentations, built from Markdown decks and deployed to Vercel.

## Architecture

```
ai-presentation/
├── decks/                  # Markdown source files (one file = one presentation)
│   ├── marketing.md
│   └── sales.md
├── hg-theme/               # Custom Slidev theme
│   ├── layouts/
│   │   ├── cover.vue       # Title slide (navy background, white logo)
│   │   └── default.vue     # Content slides (white background, footer)
│   ├── uno.config.ts       # Brand colors and UnoCSS shortcuts
│   └── style.css           # Global typography and heading styles
├── prompts/
│   └── claude-system-prompt.md  # LLM instructions for generating decks
├── scripts/
│   └── commit-deck.js      # Commit deck Markdown to GitHub via API
├── build.js                # Builds all decks in decks/ to dist/
└── vercel.json             # Routing rewrites for each built deck
```

**Flow:** Markdown deck → Slidev build (with `hg-theme`) → static HTML in `dist/{slug}/` → Vercel deploy.

Each deck file uses Slidev frontmatter to select layouts:

- `layout: cover` — title slide only
- `layout: default` — all content slides

See `decks/marketing.md` for the canonical deck structure.

## Local development

```bash
# Install dependencies
npm install

# Preview a single deck (pick any file in decks/)
npx slidev decks/marketing.md --theme hg-theme

# Or use the default dev script (opens slidev entry)
npm run dev
```

Build all decks locally:

```bash
npm run build
# Output: dist/marketing/, dist/sales/, etc.
```

## Build & deploy

Vercel runs `npm run build` on push to `main`. The build script:

1. Reads every `*.md` file in `decks/`
2. Runs `slidev build` with `--theme hg-theme` and `--base /{slug}/`
3. Writes output to `dist/{slug}/`

After adding a new deck, update `vercel.json` rewrites so the new slug is routable:

```json
{ "source": "/my-deck/assets/:path*", "destination": "/my-deck/assets/:path*" },
{ "source": "/my-deck/:path*", "destination": "/my-deck/index.html" }
```

## GitHub PAT setup

The `commit-deck` script pushes deck Markdown directly to GitHub using the Contents API.

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Create a token (classic) with **`repo`** scope, or a fine-grained token with **Contents: Read and write** on this repository
3. Copy the token and create a local `.env` file:

```bash
cp .env.example .env
# Edit .env and set GITHUB_TOKEN=ghp_...
```

| Variable       | Required | Default            | Description                          |
|----------------|----------|--------------------|--------------------------------------|
| `GITHUB_TOKEN` | Yes      | —                  | GitHub PAT with contents write access|
| `GITHUB_OWNER` | No       | `drewgilbert-lab`  | Repository owner                     |
| `GITHUB_REPO`  | No       | `ai-presentation`  | Repository name                      |
| `LIVE_URL_BASE`| No       | Vercel project URL | Base URL for live deck links         |

Load env vars before running (e.g. `export $(grep -v '^#' .env | xargs)` or use a tool like `dotenv-cli`).

## commit-deck usage

Commit or update a deck file in the remote repository without a local git push:

```bash
# From an existing local file
npm run commit-deck -- --file decks/my-deck.md

# From LLM stdout (pipe Markdown to stdin)
echo "---\nlayout: cover\n---\n\n# Title" | npm run commit-deck -- --name my-deck

# Override the remote deck name while reading from a file
npm run commit-deck -- --file decks/draft.md --name final-deck-name
```

The script will:

- Validate the deck name is kebab-case
- Require `layout: cover` on the first slide
- Warn on suspicious patterns (inline styles, custom CSS, non-brand colors, unknown layouts/components)
- Create or update `decks/{name}.md` via the GitHub Contents API
- Print the commit URL and expected live URL

Exit codes: `1` missing token, `2` file not found, `3` empty stdin, `4` validation failure, `5` GitHub API error, `64` usage error.

## LLM deck generation

Use `prompts/claude-system-prompt.md` as the system prompt when asking Claude (or another LLM) to generate decks. The prompt enforces:

- Markdown-only output to `decks/{slug}.md`
- Allowed layouts: `cover`, `default`
- Allowed component: `HgStatBox`
- HG brand UnoCSS shortcuts from `hg-theme/uno.config.ts`
- No custom CSS, inline styles, or off-brand colors

Reference `decks/marketing.md` in your user message as the style guide.

## New deck checklist

- [ ] Create `decks/{slug}.md` with kebab-case filename
- [ ] First slide uses `layout: cover`; all others use `layout: default`
- [ ] Follow patterns in `decks/marketing.md` (cards, stat boxes, bullet lists)
- [ ] No inline styles, custom CSS, or non-brand colors
- [ ] Preview locally: `npx slidev decks/{slug}.md --theme hg-theme`
- [ ] Add Vercel rewrites in `vercel.json` for the new slug
- [ ] Commit via git push or `npm run commit-deck -- --file decks/{slug}.md`
- [ ] Verify live URL after deploy: `https://ai-presentation.vercel.app/{slug}/`
