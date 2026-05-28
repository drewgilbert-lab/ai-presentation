import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// 1. Find all markdown files at the root level (ignoring README.md)
const files = fs.readdirSync('.')
  .filter(file => file.endsWith('.md') && file.toLowerCase() !== 'readme.md');

console.log(`Found ${files.length} presentations to build:`, files);

// 2. Loop through each file and build it automatically
files.forEach(file => {
  const name = path.parse(file).name; // e.g., "marketing" from "marketing.md"
  console.log(`Building presentation: ${name}...`);
  
  // Run the slidev build command for this specific file dynamically
  execSync(`npx slidev build ${file} --out dist/${name} --base /${name}/`, { stdio: 'inherit' });
});

console.log('All presentations built successfully!');
