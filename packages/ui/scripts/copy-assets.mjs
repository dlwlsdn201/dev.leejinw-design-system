import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = resolve(packageRoot, 'src/assets');
const outputDir = resolve(packageRoot, 'dist');

await mkdir(outputDir, { recursive: true });
await Promise.all(['fonts.css', 'PretendardVariable.woff2', 'OFL.txt'].map((fileName) => (
  copyFile(resolve(sourceDir, fileName), resolve(outputDir, fileName))
)));

// Vite extracts styles.css into style.css; keep the emitted declaration aligned.
const declarationPath = resolve(outputDir, 'index.d.ts');
const declaration = await readFile(declarationPath, 'utf8');
await writeFile(declarationPath, declaration.replace("import './styles.css';", "import './style.css';"));
