const ALLOWED_LAYOUTS = new Set(['cover', 'default']);
const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const BRAND_HEX = new Set([
  '003366', '2d59a7', '3b86d4', 'bfe2f5', 'cc1e4c', '6e3191', 'eaebed', '424242', '818282',
  'fff', 'ffffff',
]);

const CHART_DIMENSION_PROPS = new Set([
  'height',
  'width',
  'min-height',
  'max-height',
  'min-width',
  'max-width',
  'flex-basis',
]);

function expandHex(hex) {
  const h = hex.toLowerCase();
  if (h.length === 3) {
    return h.split('').map((c) => c + c).join('');
  }
  return h;
}

function findDisallowedInlineStyles(content) {
  const disallowed = new Set();
  const styleMatches = content.matchAll(/\bstyle\s*=\s*(["'])([\s\S]*?)\1/gi);

  for (const [, , styleValue] of styleMatches) {
    const declarations = styleValue.split(';').map((part) => part.trim()).filter(Boolean);

    for (const declaration of declarations) {
      const colonIndex = declaration.indexOf(':');
      if (colonIndex === -1) {
        disallowed.add(declaration);
        continue;
      }

      const prop = declaration.slice(0, colonIndex).trim().toLowerCase();
      if (!CHART_DIMENSION_PROPS.has(prop)) {
        disallowed.add(prop);
      }
    }
  }

  return [...disallowed];
}

const MAX_TABLE_COLUMNS = 4;
const MAX_TABLE_ROWS = 4;
const MAX_CELL_CHARS = 40;
const TABLE_ROW_RE = /^\|.+\|$/;

function parseTableRow(line) {
  return line.split('|').slice(1, -1).map((cell) => cell.trim());
}

function isSeparatorRow(line) {
  const cells = parseTableRow(line);
  return cells.length > 0 && cells.every((cell) => /^:?-+:?$/.test(cell));
}

function parseMarkdownTables(slideBody) {
  const lines = slideBody.split('\n');
  const tables = [];
  let i = 0;

  while (i < lines.length) {
    if (!TABLE_ROW_RE.test(lines[i].trim())) {
      i++;
      continue;
    }

    const tableLines = [];
    while (i < lines.length && TABLE_ROW_RE.test(lines[i].trim())) {
      tableLines.push(lines[i].trim());
      i++;
    }

    if (tableLines.length < 2) {
      continue;
    }

    const headerCells = parseTableRow(tableLines[0]);
    let dataStart = 1;
    if (tableLines.length > 1 && isSeparatorRow(tableLines[1])) {
      dataStart = 2;
    }

    const dataRows = tableLines.slice(dataStart).filter((line) => !isSeparatorRow(line));
    const allCells = [
      ...headerCells,
      ...dataRows.flatMap((line) => parseTableRow(line)),
    ];

    tables.push({
      columnCount: headerCells.length,
      dataRowCount: dataRows.length,
      allCells,
    });
  }

  return tables;
}

export function warnTableDensity(content) {
  const warnings = [];
  const slides = content.split(/^---$/m).slice(1);

  for (let i = 0; i < slides.length; i++) {
    const slideNum = i + 1;
    const slideBody = slides[i].replace(/^\s*[\r\n]+/, '');

    for (const match of slideBody.matchAll(/\bgrid-cols-(?:([5-9]|1[0-2]))\b/g)) {
      warnings.push(`Slide ${slideNum}: grid-cols-${match[1]} too wide for tabular data (max 4)`);
    }

    const tables = parseMarkdownTables(slideBody);

    for (const table of tables) {
      if (table.columnCount > MAX_TABLE_COLUMNS) {
        warnings.push(`Slide ${slideNum}: markdown table has ${table.columnCount} columns (max 4)`);
      }

      if (table.dataRowCount > MAX_TABLE_ROWS) {
        warnings.push(`Slide ${slideNum}: markdown table has ${table.dataRowCount} rows (max 4 per slide)`);
      }

      if (table.allCells.some((cell) => cell.length > MAX_CELL_CHARS)) {
        warnings.push(`Slide ${slideNum}: table cell exceeds 40 chars — abbreviate or split slide`);
      }
    }

    if (/border-l-4/.test(slideBody)) {
      for (const table of tables) {
        if (table.columnCount >= 3) {
          warnings.push(`Slide ${slideNum}: dense table + callout on same slide — split across slides`);
          break;
        }
      }
    }
  }

  return warnings;
}

export function validateDeckName(name) {
  if (!KEBAB_CASE.test(name)) {
    throw new Error(`Deck name "${name}" must be kebab-case (e.g. q3-strategy)`);
  }
}

export function validateFirstSlideCover(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    throw new Error('Deck is missing YAML frontmatter on the first slide');
  }

  const frontmatter = match[1];
  const layoutMatch = frontmatter.match(/^layout:\s*(\S+)\s*$/m);
  if (!layoutMatch) {
    throw new Error('First slide frontmatter must include layout: cover');
  }

  if (layoutMatch[1] !== 'cover') {
    throw new Error(`First slide must have layout: cover (found layout: ${layoutMatch[1]})`);
  }
}

export function validateDeckOnlyPatterns(content) {
  if (/<\/?Toc\b/i.test(content)) {
    throw new Error('Deck contains <Toc> — slide sidebars and TOC are forbidden; use cover/default layouts only');
  }

  if (/\bglobal-top\b|\bglobal-bottom\b|\bslide-top\b|\bslide-bottom\b/i.test(content)) {
    throw new Error('Deck references global/slide layer files — navigation sidebars are forbidden');
  }
}

export function warnSuspiciousPatterns(content) {
  const warnings = [];

  if (/<style[\s>]/i.test(content)) {
    warnings.push('Contains <style> block — custom CSS is forbidden');
  }

  const disallowedInlineStyles = findDisallowedInlineStyles(content);
  if (disallowedInlineStyles.length > 0) {
    warnings.push(
      `Contains disallowed inline style properties: ${disallowedInlineStyles.join(', ')} — use UnoCSS classes (chart height/width only is allowed)`,
    );
  }

  if (/^theme:\s*/m.test(content)) {
    warnings.push('Uses theme: frontmatter — use layout: cover or layout: default instead');
  }

  const layoutMatches = [...content.matchAll(/^layout:\s*(\S+)\s*$/gm)];
  for (const [, layout] of layoutMatches) {
    if (!ALLOWED_LAYOUTS.has(layout)) {
      warnings.push(`Unknown layout "${layout}" — allowed: cover, default`);
    }
  }

  const hexMatches = content.match(/#([0-9a-fA-F]{3,8})\b/g) || [];
  for (const raw of hexMatches) {
    const normalized = expandHex(raw.slice(1));
    if (!BRAND_HEX.has(normalized)) {
      warnings.push(`Non-brand color detected: ${raw}`);
    }
  }

  if (/\brgb\s*\(/i.test(content) || /\bhsl\s*\(/i.test(content)) {
    warnings.push('Contains rgb()/hsl() color — use brand UnoCSS tokens instead');
  }

  const componentMatches = content.match(/<[A-Z][A-Za-z0-9]*/g) || [];
  const unknownComponents = [...new Set(componentMatches)]
    .map((tag) => tag.slice(1))
    .filter((name) => name !== 'HgStatBox' && name !== 'HgIcon' && name !== 'div');
  if (unknownComponents.length > 0) {
    warnings.push(`Unknown components: ${unknownComponents.join(', ')} — only HgStatBox and HgIcon are allowed`);
  }

  const slides = content.split(/^---$/m).slice(1);
  for (let i = 0; i < slides.length; i++) {
    const slideBody = slides[i].replace(/^\s*[\r\n]+/, '');
    if (/^ {2,}<[^\n]*>\n\n^ {2,}</m.test(slideBody)) {
      warnings.push(
        `Slide ${i + 1}: blank line inside indented HTML block — Slidev will render following lines as raw code`,
      );
    }
  }

  warnings.push(...warnTableDensity(content));

  return warnings;
}

export function validateDeck(name, content) {
  validateDeckName(name);
  validateFirstSlideCover(content);
  validateDeckOnlyPatterns(content);
  return warnSuspiciousPatterns(content);
}
