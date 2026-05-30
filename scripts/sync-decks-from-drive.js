#!/usr/bin/env node

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import {
  downloadFile,
  getDriveClient,
  listMarkdownFiles,
} from './drive-client.js';
import { validateDeck } from './deck-validation.js';

const decksFolder = path.resolve('./decks');

function sha256(content) {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

function writeDeckIfChanged(slug, content, summary) {
  const destPath = path.join(decksFolder, `${slug}.md`);
  const exists = fs.existsSync(destPath);
  const nextHash = sha256(content);

  if (exists) {
    const currentHash = sha256(fs.readFileSync(destPath, 'utf8'));
    if (currentHash === nextHash) {
      summary.unchanged += 1;
      return;
    }

    fs.writeFileSync(destPath, content, 'utf8');
    summary.updated += 1;
    return;
  }

  fs.writeFileSync(destPath, content, 'utf8');
  summary.added += 1;
}

function pruneMissingDecks(driveSlugs, summary) {
  if (process.env.SYNC_PRUNE !== 'true') {
    return;
  }

  for (const file of fs.readdirSync(decksFolder)) {
    if (!file.endsWith('.md')) {
      continue;
    }

    const slug = path.parse(file).name;
    if (!driveSlugs.has(slug)) {
      fs.unlinkSync(path.join(decksFolder, file));
      summary.pruned += 1;
    }
  }
}

async function main() {
  const { drive, folderId } = getDriveClient();

  if (!fs.existsSync(decksFolder)) {
    fs.mkdirSync(decksFolder, { recursive: true });
  }

  console.log(`Syncing decks from Google Drive folder ${folderId}...`);

  let files;
  try {
    files = await listMarkdownFiles(drive, folderId);
  } catch (error) {
    console.error(`Error listing Drive files: ${error.message}`);
    process.exit(5);
  }

  const summary = {
    added: 0,
    updated: 0,
    unchanged: 0,
    skipped: 0,
    pruned: 0,
  };

  const driveSlugs = new Set();

  for (const file of files) {
    const slug = path.parse(file.name).name;

    let content;
    try {
      content = await downloadFile(drive, file.id);
    } catch (error) {
      console.error(`Error downloading ${file.name}: ${error.message}`);
      process.exit(5);
    }

    try {
      const warnings = validateDeck(slug, content);
      for (const warning of warnings) {
        console.warn(`Warning (${file.name}): ${warning}`);
      }
    } catch (error) {
      console.error(`Validation error (${file.name}): ${error.message}`);
      process.exit(4);
    }

    driveSlugs.add(slug);
    writeDeckIfChanged(slug, content, summary);
  }

  pruneMissingDecks(driveSlugs, summary);

  console.log('');
  console.log('Sync summary:');
  console.log(`  Added:     ${summary.added}`);
  console.log(`  Updated:   ${summary.updated}`);
  console.log(`  Unchanged: ${summary.unchanged}`);
  console.log(`  Pruned:    ${summary.pruned}`);
  console.log(`  Total in Drive folder: ${files.length}`);
}

main();
