import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// 1. Get absolute paths for the directories
const rootDir = path.resolve('.');
const decksFolder = path.resolve('./decks');
const outputFolder = path.resolve('./dist');

// Ensure the root output directory exists
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

if (!fs.existsSync(decksFolder)) {
  console.error('Error: "decks" folder not found!');
  process.exit(1);
}

const files = fs.readdirSync(decksFolder)
  .filter(file => file.endsWith('.md'));

console.log(`Found ${files.length} presentations inside "decks/":`, files);

// 2. Build each file explicitly using absolute paths
files.forEach(file => {
  const name = path.parse(file).name;
  const absoluteFilePath = path.join(decksFolder, file);
  const absoluteOutputPath = path.join(outputFolder, name);
  
  console.log(`Building presentation: ${name}...`);
  
  // Build directly from the absolute file path into the absolute output path
  execSync(`npx slidev build "${absoluteFilePath}" --out "${absoluteOutputPath}" --base "/${name}/"`, { 
    stdio: 'inherit',
    env: { ...process.env, CI: 'true' } 
  });
});

console.log('All presentations built successfully!');
