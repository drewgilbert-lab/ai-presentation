import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const decksFolder = './decks';
const outputFolder = './dist';

// 1. Ensure the root output directory exists
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

// 2. Build each file explicitly into the root dist folder
files.forEach(file => {
  const name = path.parse(file).name;
  console.log(`Building presentation: ${name}...`);
  
  // Compiles directly to the root ./dist/folder-name where Vercel expects it
  execSync(`npx slidev build ${decksFolder}/${file} --out ../dist/${name} --base /${name}/`, { 
    cwd: decksFolder, // Runs inside the decks folder context to handle references cleanly
    stdio: 'inherit',
    env: { ...process.env, CI: 'true' } 
  });
});

console.log('All presentations built successfully!');
