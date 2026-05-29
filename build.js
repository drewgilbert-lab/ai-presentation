import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const rootDir = path.resolve('.');
const decksFolder = path.resolve('./decks');
const outputFolder = path.resolve('./dist');
const themeFolder = path.resolve('./hg-theme');

const FORBIDDEN_GLOBAL_LAYERS = [
  path.join(themeFolder, 'global-top.vue'),
  path.join(decksFolder, 'global-top.vue'),
];

const FORBIDDEN_DIST_STRINGS = [
  'hg-slide-nav-panel',
  'hg-global-nav',
  '<Toc',
];

function assertNoForbiddenGlobalLayers() {
  for (const filePath of FORBIDDEN_GLOBAL_LAYERS) {
    if (fs.existsSync(filePath)) {
      console.error(`Build failed: forbidden global layer file exists: ${filePath}`);
      process.exit(1);
    }
  }
}

function assertDistHasNoSidebarArtifacts() {
  const violations = [];

  function scanDir(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
        continue;
      }

      if (!/\.(js|html)$/i.test(entry.name)) {
        continue;
      }

      const content = fs.readFileSync(fullPath, 'utf8');
      for (const needle of FORBIDDEN_DIST_STRINGS) {
        if (content.includes(needle)) {
          violations.push({ file: fullPath, needle });
        }
      }
    }
  }

  scanDir(outputFolder);

  if (violations.length > 0) {
    console.error('Build failed: sidebar artifacts found in dist/:');
    for (const { file, needle } of violations) {
      console.error(`  - "${needle}" in ${path.relative(rootDir, file)}`);
    }
    process.exit(1);
  }
}

assertNoForbiddenGlobalLayers();

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

assertDistHasNoSidebarArtifacts();

console.log('All presentations built successfully!');
