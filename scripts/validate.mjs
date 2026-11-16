import { readFileSync } from 'node:fs';
import { domains, nodes, setContentLanguage } from '../src/data.js';

const errors = [];
const domainIds = new Set(domains.map(domain => domain.id));
const nodeIds = new Set();
const byId = new Map();

for (const node of nodes) {
  if (!node.id || nodeIds.has(node.id)) errors.push(`ID trùng hoặc rỗng: ${node.id}`);
  nodeIds.add(node.id);
  byId.set(node.id, node);
  if (!domainIds.has(node.domain)) errors.push(`${node.id}: domain không tồn tại (${node.domain})`);
  if (!Number.isInteger(node.order) || node.order < 1) errors.push(`${node.id}: order không hợp lệ`);
  if (!node.title?.trim() || !node.summary?.trim() || !node.takeaway?.trim()) errors.push(`${node.id}: thiếu nội dung cơ bản`);
  if (!Array.isArray(node.sections) || node.sections.length === 0 || node.sections.some(section => section.length !== 2 || !section[0]?.trim() || !section[1]?.trim())) errors.push(`${node.id}: sections không hợp lệ`);
}

for (const domain of domains) {
  const orders = nodes.filter(node => node.domain === domain.id).map(node => node.order);
  if (new Set(orders).size !== orders.length) errors.push(`${domain.id}: order bị trùng`);
}

for (const node of nodes) {
  for (const id of node.prerequisites) {
    if (!byId.has(id)) errors.push(`${node.id}: tiền đề không tồn tại (${id})`);
    if (id === node.id) errors.push(`${node.id}: tự phụ thuộc chính mình`);
  }
  for (const id of node.related) if (!byId.has(id)) errors.push(`${node.id}: bài liên quan không tồn tại (${id})`);
}

const visiting = new Set();
const visited = new Set();
function visit(id, path = []) {
  if (visiting.has(id)) { errors.push(`Vòng lặp tiền đề: ${[...path, id].join(' → ')}`); return; }
  if (visited.has(id)) return;
  visiting.add(id);
  for (const prerequisite of byId.get(id)?.prerequisites ?? []) if (byId.has(prerequisite)) visit(prerequisite, [...path, id]);
  visiting.delete(id);
  visited.add(id);
}
for (const id of nodeIds) visit(id);

setContentLanguage('vi');
const vietnameseLessons = new Map(nodes.filter(node => node.contentStatus !== 'outline').map(node => [node.id, {
  title: node.title,
  sections: node.sections.map(([heading, body]) => [heading, body]),
}]));
setContentLanguage('en');
for (const node of nodes.filter(node => node.contentStatus !== 'outline')) {
  const vi = vietnameseLessons.get(node.id);
  if (!vi) { errors.push(`${node.id}: thiếu bản tiếng Việt`); continue; }
  if (!node.title?.trim() || node.title === vi.title) errors.push(`${node.id}: thiếu tiêu đề tiếng Anh riêng`);
  if (node.sections.length !== vi.sections.length) errors.push(`${node.id}: số mục Việt/Anh không tương đương`);
  if (!node.sections.at(-1)?.[1]?.includes('href=') || !vi.sections.at(-1)?.[1]?.includes('href=')) errors.push(`${node.id}: thiếu nguồn trực tiếp ở một ngôn ngữ`);
}
setContentLanguage('vi');

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
if (!html.includes('./styles.css') || !html.includes('./src/app.js')) errors.push('index.html thiếu đường dẫn asset tương đối');

if (errors.length) {
  console.error(`Kiểm tra thất bại (${errors.length} lỗi):\n${errors.map(error => `- ${error}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Hợp lệ: ${domains.length} lĩnh vực, ${nodes.length} mốc, graph tiền đề không có vòng lặp.`);
}
