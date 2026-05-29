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
│   ├── commit-deck.js      # Commit deck Markdown to GitHub via API
│   ├── sync-decks-from-drive.js  # Sync decks from Google Shared Drive
│   └── deck-validation.js  # Shared validation for sync and commit-deck
├── .github/workflows/
│   └── sync-decks-from-drive.yml  # Scheduled Drive → GitHub sync
├── build.js                # Builds all decks in decks/ to dist/
└── vercel.json             # Wildcard routing rewrites per deck slug
```

**Flow (Cowork):** Claude Cowork saves `.md` to Google Drive → GitHub Action syncs to `decks/` → Vercel build → live at `/{slug}/`.

**Flow (direct):** Markdown deck → `commit-deck` or git push → Vercel build → live at `/{slug}/`.

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

Wildcard rewrites in `vercel.json` route any built deck slug automatically — no per-deck config needed.

## Google Drive sync (Cowork workflow)

Cowork users save deck `.md` files to a shared Google Shared Drive folder. A GitHub Action syncs them into `decks/` every 5 minutes (or on manual trigger), then Vercel deploys.

### Admin setup (one-time)

1. **Google Cloud:** Create a project, enable the **Google Drive API**, create a **service account**, download the JSON key.
2. **Shared Drive:** Add the service account email as **Viewer** on the shared drive (or share the specific folder).
3. **GitHub secrets** (repo Settings → Secrets and variables → Actions):
   - `GDRIVE_FOLDER_ID` — folder ID from the Drive URL (`.../folders/FOLDER_ID`)
   - `GDRIVE_SERVICE_ACCOUNT_JSON` — paste the entire service account JSON
4. **Optional repo variable:** `SYNC_PRUNE` = `true` to delete `decks/*.md` files not present in Drive (default: off).
5. **Migrate existing decks:** Copy current files from `decks/` into the Shared Drive folder.
6. **Verify:** Actions → **Sync decks from Google Drive** → Run workflow.

If `main` has branch protection, allow the GitHub Actions bot to bypass or use a PAT with bypass permission.

### Production configuration (HG)

| Setting | Value |
|---------|--------|
| GCP project | `swift-casing-496920-e4` |
| Service account | `drive-to-github@swift-casing-496920-e4.iam.gserviceaccount.com` |
| Shared Drive folder ID | `18cqtrCBfZ9w58_ZVa5mhAwVgtcgRuQbv` |
| Folder URL | https://drive.google.com/drive/folders/18cqtrCBfZ9w58_ZVa5mhAwVgtcgRuQbv |

The service account must have **Viewer** access on the folder. The JSON key lives in GitHub secret `GDRIVE_SERVICE_ACCOUNT_JSON` only — never commit it.

### Cowork user workflow

1. Generate deck in Claude Cowork using the deck skill / system prompt.
2. Save as kebab-case `.md` (e.g. `q3-strategy.md`) in the shared Drive folder — filename becomes the live URL slug.
3. First slide must use `layout: cover`.
4. Deck goes live ~5 minutes after save, or immediately after a manual workflow run.
5. Live URL: `https://ai-presentation-seven-omega.vercel.app/{slug}/`

### Local sync test

```bash
export GDRIVE_FOLDER_ID=your_folder_id
export GDRIVE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'
npm run sync-decks
git diff decks/
npm run build
```

Exit codes: `1` missing env, `4` validation failure, `5` Drive API error.

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

- [ ] Save `{slug}.md` with kebab-case filename to the shared Google Drive folder (Cowork) or create locally in `decks/`
- [ ] First slide uses `layout: cover`; all others use `layout: default`
- [ ] Follow patterns in `decks/marketing.md` (cards, stat boxes, bullet lists)
- [ ] No inline styles, custom CSS, or non-brand colors
- [ ] Preview locally: `npx slidev decks/{slug}.md --theme hg-theme`
- [ ] For Cowork: wait for Drive sync or trigger the GitHub Action manually
- [ ] For direct publish: `npm run commit-deck -- --file decks/{slug}.md` or git push
- [ ] Verify live URL after deploy: `https://ai-presentation-seven-omega.vercel.app/{slug}/`
