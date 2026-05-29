#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { text } from 'node:stream/consumers';
import { validateDeck } from './deck-validation.js';

const GITHUB_API = 'https://api.github.com';

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
    const warnings = validateDeck(name, content);
    for (const warning of warnings) {
      console.warn(`Warning: ${warning}`);
    }
  } catch (error) {
    console.error(`Validation error: ${error.message}`);
    process.exit(4);
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
