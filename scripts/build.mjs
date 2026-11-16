import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, 'src'), { recursive: true });
const hash = source => createHash('sha256').update(source).digest('hex').slice(0, 10);
const css = readFileSync(join(root, 'styles.css'), 'utf8');
const cleanCode = readFileSync(join(root, 'src', 'clean-code.js'), 'utf8');
const security = readFileSync(join(root, 'src', 'security.js'), 'utf8');
const designPatterns = readFileSync(join(root, 'src', 'design-patterns.js'), 'utf8');
const data = readFileSync(join(root, 'src', 'data.js'), 'utf8').replace("from './clean-code.js'", `from './clean-code.js?v=${hash(cleanCode)}'`).replace("from './security.js'", `from './security.js?v=${hash(security)}'`).replace("from './design-patterns.js'", `from './design-patterns.js?v=${hash(designPatterns)}'`);
const locale = readFileSync(join(root, 'src', 'locale.js'), 'utf8');
const app = readFileSync(join(root, 'src', 'app.js'), 'utf8').replace("from './data.js'", `from './data.js?v=${hash(data)}'`).replace("from './locale.js'", `from './locale.js?v=${hash(locale)}'`);
const html = readFileSync(join(root, 'index.html'), 'utf8')
  .replace('href="./styles.css"', `href="./styles.css?v=${hash(css)}"`)
  .replace('src="./src/app.js"', `src="./src/app.js?v=${hash(app)}"`);
writeFileSync(join(dist, 'index.html'), html);
writeFileSync(join(dist, 'styles.css'), css);
writeFileSync(join(dist, 'src', 'app.js'), app);
writeFileSync(join(dist, 'src', 'data.js'), data);
writeFileSync(join(dist, 'src', 'clean-code.js'), cleanCode);
writeFileSync(join(dist, 'src', 'security.js'), security);
writeFileSync(join(dist, 'src', 'design-patterns.js'), designPatterns);
writeFileSync(join(dist, 'src', 'locale.js'), locale);
writeFileSync(join(dist, '.nojekyll'), '');
console.log('Đã tạo dist/ cho GitHub Pages.');
