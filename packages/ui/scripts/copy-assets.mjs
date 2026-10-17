import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = resolve(packageRoot, 'src/assets');
const outputDir = resolve(packageRoot, 'dist');

await mkdir(outputDir, { recursive: true });
await Promise.all(['fonts.css', 'PretendardVariable.woff2', 'OFL.txt'].map((fileName) => (
  copyFile(resolve(sourceDir, fileName), resolve(outputDir, fileName))
)));
