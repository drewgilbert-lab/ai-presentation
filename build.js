import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const rootDir = path.resolve('.');
const decksFolder = path.resolve('./decks');
const outputFolder = path.resolve('./dist');
const themeFolder = path.resolve('./hg-theme'); 

if (fs.existsSync(outputFolder)) {
  fs.rmSync(outputFolder, { recursive: true, force: true });
}
fs.mkdirSync(outputFolder, { recursive: true });

const files = fs.readdirSync(decksFolder)
  .filter(file => file.endsWith('.md'));

console.log(`Found ${files.length} presentations. Applying HG Insights Theme...`);

files.forEach(file => {
  const name = path.parse(file).name;
  const absoluteFilePath = path.join(decksFolder, file);
  const absoluteOutputPath = path.join(outputFolder, name);
  
  // The --theme flag forces Slidev to wrap the markdown in your new layout files
  if (fs.existsSync(absoluteOutputPath)) {
    fs.rmSync(absoluteOutputPath, { recursive: true, force: true });
  }

  // Slidev CLI does not support Vite's --emptyOutDir; clear output dir manually.
  execSync(`npx slidev build "${absoluteFilePath}" --out "${absoluteOutputPath}" --base "/${name}/" --theme "${themeFolder}"`, { 
    stdio: 'inherit',
    env: { ...process.env, CI: 'true' } 
  });
});

const deckLinks = files.map(file => {
  const name = path.parse(file).name;
  return `    <li><a href="/${name}/">${name}</a></li>`;
}).join('\n');

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HG Insights Presentations</title>
</head>
<body>
  <h1>HG Insights Presentations</h1>
  <ul>
${deckLinks}
  </ul>
</body>
</html>
`;

fs.writeFileSync(path.join(outputFolder, 'index.html'), indexHtml);

console.log('All presentations built successfully!');
