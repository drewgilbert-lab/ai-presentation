#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { text } from 'node:stream/consumers';

const GITHUB_API = 'https://api.github.com';
const ALLOWED_LAYOUTS = new Set(['cover', 'default']);
const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const BRAND_HEX = new Set([
  '003366', '2d59a7', '3b86d4', 'bfe2f5', 'cc1e4c', '6e3191', 'eaebed', '424242', '818282',
  'fff', 'ffffff',
]);

const CHART_DIMENSION_PROPS = new Set([
  'height',
  'width',
  'min-height',
  'max-height',
  'min-width',
  'max-width',
  'flex-basis',
]);

function parseArgs(argv) {
  const args = { file: null, name: null };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--file' && argv[i + 1]) {
      args.file = argv[++i];
    } else if (argv[i] === '--name' && argv[i + 1]) {
      args.name = argv[++i];
    } else if (argv[i] === '--help' || argv[i] === '-h') {
      printUsage();
      process.exit(0);
    } else {
      console.error(`Unknown argument: ${argv[i]}`);
      printUsage();
      process.exit(64);
    }
  }
  return args;
}

function printUsage() {
  console.error(`Usage:
  node scripts/commit-deck.js --file decks/my-deck.md
  node scripts/commit-deck.js --name my-deck < deck.md
  echo "<markdown>" | node scripts/commit-deck.js --name my-deck

Environment variables:
  GITHUB_TOKEN   (required) GitHub PAT with repo contents write access
  GITHUB_OWNER   (default: drewgilbert-lab)
  GITHUB_REPO    (default: ai-presentation)
  LIVE_URL_BASE  (default: https://ai-presentation-seven-omega.vercel.app)`);
}

function expandHex(hex) {
  const h = hex.toLowerCase();
  if (h.length === 3) {
    return h.split('').map((c) => c + c).join('');
  }
  return h;
}

function findDisallowedInlineStyles(content) {
  const disallowed = new Set();
  const styleMatches = content.matchAll(/\bstyle\s*=\s*(["'])([\s\S]*?)\1/gi);

  for (const [, , styleValue] of styleMatches) {
    const declarations = styleValue.split(';').map((part) => part.trim()).filter(Boolean);

    for (const declaration of declarations) {
      const colonIndex = declaration.indexOf(':');
      if (colonIndex === -1) {
        disallowed.add(declaration);
        continue;
      }

      const prop = declaration.slice(0, colonIndex).trim().toLowerCase();
      if (!CHART_DIMENSION_PROPS.has(prop)) {
        disallowed.add(prop);
      }
    }
  }

  return [...disallowed];
}

function validateDeckName(name) {
  if (!KEBAB_CASE.test(name)) {
    throw new Error(`Deck name "${name}" must be kebab-case (e.g. q3-strategy)`);
  }
}

function validateFirstSlideCover(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    throw new Error('Deck is missing YAML frontmatter on the first slide');
  }

  const frontmatter = match[1];
  const layoutMatch = frontmatter.match(/^layout:\s*(\S+)\s*$/m);
  if (!layoutMatch) {
    throw new Error('First slide frontmatter must include layout: cover');
  }

  if (layoutMatch[1] !== 'cover') {
    throw new Error(`First slide must have layout: cover (found layout: ${layoutMatch[1]})`);
  }
}

function validateDeckOnlyPatterns(content) {
  if (/<\/?Toc\b/i.test(content)) {
    throw new Error('Deck contains <Toc> — slide sidebars and TOC are forbidden; use cover/default layouts only');
  }

  if (/\bglobal-top\b|\bglobal-bottom\b|\bslide-top\b|\bslide-bottom\b/i.test(content)) {
    throw new Error('Deck references global/slide layer files — navigation sidebars are forbidden');
  }
}

function warnSuspiciousPatterns(content) {
  const warnings = [];

  if (/<style[\s>]/i.test(content)) {
    warnings.push('Contains <style> block — custom CSS is forbidden');
  }

  const disallowedInlineStyles = findDisallowedInlineStyles(content);
  if (disallowedInlineStyles.length > 0) {
    warnings.push(
      `Contains disallowed inline style properties: ${disallowedInlineStyles.join(', ')} — use UnoCSS classes (chart height/width only is allowed)`,
    );
  }

  if (/^theme:\s*/m.test(content)) {
    warnings.push('Uses theme: frontmatter — use layout: cover or layout: default instead');
  }

  const layoutMatches = [...content.matchAll(/^layout:\s*(\S+)\s*$/gm)];
  for (const [, layout] of layoutMatches) {
    if (!ALLOWED_LAYOUTS.has(layout)) {
      warnings.push(`Unknown layout "${layout}" — allowed: cover, default`);
    }
  }

  const hexMatches = content.match(/#([0-9a-fA-F]{3,8})\b/g) || [];
  for (const raw of hexMatches) {
    const normalized = expandHex(raw.slice(1));
    if (!BRAND_HEX.has(normalized)) {
      warnings.push(`Non-brand color detected: ${raw}`);
    }
  }

  if (/\brgb\s*\(/i.test(content) || /\bhsl\s*\(/i.test(content)) {
    warnings.push('Contains rgb()/hsl() color — use brand UnoCSS tokens instead');
  }

  const componentMatches = content.match(/<[A-Z][A-Za-z0-9]*/g) || [];
  const unknownComponents = [...new Set(componentMatches)]
    .map((tag) => tag.slice(1))
    .filter((name) => name !== 'HgStatBox' && name !== 'HgIcon' && name !== 'div');
  if (unknownComponents.length > 0) {
    warnings.push(`Unknown components: ${unknownComponents.join(', ')} — only HgStatBox and HgIcon are allowed`);
  }

  const slides = content.split(/^---$/m).slice(1);
  for (let i = 0; i < slides.length; i++) {
    const slideBody = slides[i].replace(/^\s*[\r\n]+/, '');
    if (/^ {2,}<[^\n]*>\n\n^ {2,}</m.test(slideBody)) {
      warnings.push(
        `Slide ${i + 1}: blank line inside indented HTML block — Slidev will render following lines as raw code`,
      );
    }
  }

  return warnings;
}

async function readStdin() {
  if (process.stdin.isTTY) {
    return null;
  }

  return text(process.stdin);
}

async function githubRequest(url, token, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API ${response.status}: ${body}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function getExistingSha(owner, repo, filePath, token) {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`;
  try {
    const data = await githubRequest(url, token);
    return data.sha;
  } catch (error) {
    if (error.message.includes('404')) {
      return null;
    }
    throw error;
  }
}

async function commitFile(owner, repo, filePath, content, message, token, sha) {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`;
  const body = {
    message,
    content: Buffer.from(content, 'utf8').toString('base64'),
  };
  if (sha) {
    body.sha = sha;
  }

  return githubRequest(url, token, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

async function main() {
  const args = parseArgs(process.argv);

  if (!args.file && !args.name) {
    printUsage();
    process.exit(64);
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('Error: GITHUB_TOKEN environment variable is required');
    process.exit(1);
  }

  const owner = process.env.GITHUB_OWNER || 'drewgilbert-lab';
  const repo = process.env.GITHUB_REPO || 'ai-presentation';
  const liveUrlBase = (process.env.LIVE_URL_BASE || 'https://ai-presentation-seven-omega.vercel.app').replace(/\/$/, '');

  let content;
  let name;

  if (args.file) {
    const filePath = path.resolve(args.file);
    if (!fs.existsSync(filePath)) {
      console.error(`Error: File not found: ${filePath}`);
      process.exit(2);
    }
    content = fs.readFileSync(filePath, 'utf8');
    name = args.name || path.parse(filePath).name;
  } else {
    name = args.name;
    content = await readStdin();
    if (content === null || content.trim() === '') {
      console.error('Error: --name requires deck Markdown content on stdin');
      process.exit(3);
    }
  }

  try {
    validateDeckName(name);
    validateFirstSlideCover(content);
    validateDeckOnlyPatterns(content);
  } catch (error) {
    console.error(`Validation error: ${error.message}`);
    process.exit(4);
  }

  const warnings = warnSuspiciousPatterns(content);
  for (const warning of warnings) {
    console.warn(`Warning: ${warning}`);
  }

  const repoPath = `decks/${name}.md`;
  const commitMessage = `Add/update deck: ${name}`;

  try {
    const existingSha = await getExistingSha(owner, repo, repoPath, token);
    const action = existingSha ? 'Updating' : 'Creating';
    console.log(`${action} ${repoPath} in ${owner}/${repo}...`);

    const result = await commitFile(owner, repo, repoPath, content, commitMessage, token, existingSha);

    const commitUrl = result.commit.html_url;
    const liveUrl = `${liveUrlBase}/${name}/`;

    console.log('');
    console.log('Success!');
    console.log(`Commit:    ${commitUrl}`);
    console.log(`Live URL:  ${liveUrl} (available after CI deploy)`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(5);
  }
}

main();
