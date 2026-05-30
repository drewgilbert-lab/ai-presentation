#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { text } from 'node:stream/consumers';
import { getDriveClient, uploadMarkdownFile } from './drive-client.js';
import { validateDeck } from './deck-validation.js';

const decksFolder = path.resolve('./decks');

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
  node scripts/upload-deck-to-drive.js --file decks/my-deck.md
  node scripts/upload-deck-to-drive.js --name my-deck < deck.md
  echo "<markdown>" | node scripts/upload-deck-to-drive.js --name my-deck

Environment variables:
  GDRIVE_FOLDER_ID             (required) Shared Drive folder ID
  GDRIVE_SERVICE_ACCOUNT_JSON  (required) Service account key JSON string
  LIVE_URL_BASE                (default: https://ai-presentation-seven-omega.vercel.app)`);
}

async function readStdin() {
  if (process.stdin.isTTY) {
    return null;
  }

  return text(process.stdin);
}

async function main() {
  const args = parseArgs(process.argv);

  if (!args.file && !args.name) {
    printUsage();
    process.exit(64);
  }

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

  if (!fs.existsSync(decksFolder)) {
    fs.mkdirSync(decksFolder, { recursive: true });
  }

  const localPath = path.join(decksFolder, `${name}.md`);
  fs.writeFileSync(localPath, content, 'utf8');
  console.log(`Wrote local copy: ${localPath}`);

  const { drive, folderId } = getDriveClient({ write: true });
  const filename = `${name}.md`;

  try {
    const result = await uploadMarkdownFile(drive, folderId, filename, content);
    const liveUrl = `${liveUrlBase}/${name}/`;

    console.log('');
    console.log('Success!');
    console.log(`Drive:     ${result.action} ${filename} in folder ${folderId}`);
    console.log(`Live URL:  ${liveUrl}`);
    console.log('');
    console.log('Note: Allow at least 5 minutes for Drive sync and Vercel deploy before the URL is live.');
    console.log('You can trigger a faster sync via GitHub Actions → Sync decks from Google Drive.');
  } catch (error) {
    console.error(`Error uploading to Drive: ${error.message}`);
    process.exit(5);
  }
}

main();
