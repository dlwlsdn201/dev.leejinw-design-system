import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(await readFile(resolve(packageRoot, 'tokens/tokens.json'), 'utf8'));

const findToken = (path) => path.split('.').reduce((current, key) => current?.[key], tokens);
const resolveColor = (path, visited = new Set()) => {
  if (visited.has(path)) throw new Error(`Circular token alias: ${path}`);
  const token = findToken(path);
  if (!token || token.$type !== 'color') throw new Error(`Missing color token: ${path}`);
  if (typeof token.$value === 'string') {
    const nextPath = token.$value.slice(1, -1);
    return resolveColor(nextPath, new Set([...visited, path]));
  }
  return token.$value.hex;
};

const luminance = (hex) => {
  const channels = hex.slice(1).match(/.{2}/g).map((channel) => parseInt(channel, 16) / 255);
  const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};

const checks = [
  ['color.text.primary', 'color.surface.default', 4.5],
  ['color.text.secondary', 'color.surface.default', 4.5],
  ['color.text.secondary', 'color.surface.canvas', 4.5],
  ['color.text.accent', 'color.surface.default', 4.5],
  ['color.text.accent', 'color.surface.accentSubtle', 4.5],
  ['color.text.onAccent', 'color.action.default', 4.5],
  ['color.text.onAccent', 'color.action.hover', 4.5],
  ['color.text.error', 'color.surface.default', 4.5],
  ['color.border.control', 'color.surface.default', 3],
  ['color.focus.ring', 'color.surface.canvas', 3],
];

const failures = [];
for (const [foregroundPath, backgroundPath, minimum] of checks) {
  const foreground = resolveColor(foregroundPath);
  const background = resolveColor(backgroundPath);
  const light = Math.max(luminance(foreground), luminance(background));
  const dark = Math.min(luminance(foreground), luminance(background));
  const ratio = (light + 0.05) / (dark + 0.05);
  if (ratio < minimum) failures.push(`${foregroundPath} on ${backgroundPath}: ${ratio.toFixed(2)} < ${minimum}`);
}

if (failures.length) throw new Error(`Contrast checks failed:\n${failures.join('\n')}`);
console.log(`${checks.length} color contrast pairs passed`);
