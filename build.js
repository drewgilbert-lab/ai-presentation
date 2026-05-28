import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const rootDir = path.resolve('.');
const decksFolder = path.resolve('./decks');
const outputFolder = path.resolve('./dist');
const themeFolder = path.resolve('./hg-theme'); 

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

const files = fs.readdirSync(decksFolder)
  .filter(file => file.endsWith('.md'));

console.log(`Found ${files.length} presentations. Applying HG Insights Theme...`);

files.forEach(file => {
  const name = path.parse(file).name;
  const absoluteFilePath = path.join(decksFolder, file);
  const absoluteOutputPath = path.join(outputFolder, name);
  
  // The --theme flag forces Slidev to wrap the markdown in your new layout files
  execSync(`npx slidev build "${absoluteFilePath}" --out "${absoluteOutputPath}" --base "/${name}/" --theme "${themeFolder}"`, { 
    stdio: 'inherit',
    env: { ...process.env, CI: 'true' } 
  });
});

console.log('All presentations built successfully!');
