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

  return warnings;
}

export function validateDeck(name, content) {
  validateDeckName(name);
  validateFirstSlideCover(content);
  validateDeckOnlyPatterns(content);
  return warnSuspiciousPatterns(content);
}
