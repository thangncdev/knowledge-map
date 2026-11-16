import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, 'src'), { recursive: true });
for (const file of ['index.html', 'styles.css']) cpSync(join(root, file), join(dist, file));
for (const file of ['app.js', 'data.js']) cpSync(join(root, 'src', file), join(dist, 'src', file));
writeFileSync(join(dist, '.nojekyll'), '');
console.log('Đã tạo dist/ cho GitHub Pages.');
