import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// 1. Scan the decks folder for markdown files
const decksFolder = './decks';

if (!fs.existsSync(decksFolder)) {
  console.error('Error: "decks" folder not found!');
  process.exit(1);
}

const files = fs.readdirSync(decksFolder)
  .filter(file => file.endsWith('.md'));

console.log(`Found ${files.length} presentations inside "decks/":`, files);

// 2. Loop through each file and build it dynamically using CI environment flags
files.forEach(file => {
  const name = path.parse(file).name;
  console.log(`Building presentation: ${name}...`);
  
  // Enforcing CI=true tells Slidev it is running on a cloud machine so it executes completely
  execSync(`npx slidev build ${decksFolder}/${file} --out dist/${name} --base /${name}/`, { 
    stdio: 'inherit',
    env: { ...process.env, CI: 'true' } 
  });
});

console.log('All presentations built successfully!');
