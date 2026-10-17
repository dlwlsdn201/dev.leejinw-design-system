import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = resolve(packageRoot, 'tokens/tokens.json');
const outputPath = resolve(packageRoot, 'src/tokens.css');
const tokens = JSON.parse(await readFile(sourcePath, 'utf8'));
const declarations = [];

const toName = (path) => `--ds-${path.join('-').replaceAll(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
const walk = (node, path = []) => {
  if (node && typeof node === 'object' && '$type' in node) {
    const value = node.$value;
    let cssValue;
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
      cssValue = `var(${toName(value.slice(1, -1).split('.'))})`;
    } else if (node.$type === 'color') {
      cssValue = value.hex;
    } else if (node.$type === 'dimension' || node.$type === 'duration') {
      cssValue = `${value.value}${value.unit}`;
    } else {
      cssValue = value;
    }
    declarations.push(`  ${toName(path)}: ${cssValue};`);
    return;
  }
  if (node && typeof node === 'object') {
    Object.entries(node).forEach(([key, child]) => {
      if (!key.startsWith('$')) walk(child, [...path, key]);
    });
  }
};

walk(tokens);
await writeFile(outputPath, `/* Generated from tokens/tokens.json. Do not edit directly. */\n:root {\n${declarations.join('\n')}\n}\n`);
console.log(`Generated ${declarations.length} CSS tokens`);
