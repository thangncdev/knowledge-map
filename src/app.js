import { domains, nodes, nodeById, domainById, setContentLanguage } from './data.js';
import { translateInterface } from './locale.js';

const STORAGE_KEY = 'knowledge-map-progress-v1';
const LANGUAGE_KEY = 'knowledge-map-language';
const app = document.querySelector('#app');
const state = { progress: loadProgress(), language: localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'vi', view: 'overview', domain: null, node: null, panel: null, listMode: false, mobileNav: false };
setContentLanguage(state.language);

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (saved.schemaVersion !== 1 || typeof saved.nodes !== 'object' || !saved.nodes) return {};
    return Object.fromEntries(Object.entries(saved.nodes).filter(([id, entry]) => nodeById[id] && ['in_progress', 'mastered'].includes(entry?.status)));
  } catch { return {}; }
}
function persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 1, nodes: state.progress })); }
function status(node) {
  const missing = node.prerequisites.filter(id => state.progress[id]?.status !== 'mastered');
  if (missing.length) return 'locked';
  return state.progress[node.id]?.status || 'available';
}
function completed(domainId) { return nodes.filter(n => !domainId || n.domain === domainId).filter(n => status(n) === 'mastered').length; }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]); }
function domainNodes(id) { return nodes.filter(node => node.domain === id).sort((a,b) => a.order - b.order); }
function navigate(view, id) {
  state.view = view;
  state.domain = view === 'domain' ? id : view === 'lesson' ? nodeById[id]?.domain : null;
  state.node = view === 'lesson' ? id : null;
  state.panel = null;
  state.mobileNav = false;
  const hash = view === 'overview' ? '#/roadmap' : view === 'domain' ? `#/roadmap/${id}` : `#/knowledge/${id}`;
  if (location.hash !== hash) location.hash = hash;
  render(); window.scrollTo({ top: 0, behavior: 'instant' });
}
function syncHash() {
  const parts = location.hash.replace(/^#\/?/, '').split('/');
  if (['map', 'roadmap'].includes(parts[0]) && domainById[parts[1]]) navigate('domain', parts[1]);
  else if (parts[0] === 'knowledge' && nodeById[parts[1]]) navigate('lesson', parts[1]);
  else navigate('overview');
}
function badge(node) {
  const s = status(node);
  return `<span class="status status-${s}"><span class="status-dot"></span>${{ locked:'Chưa mở', available:'Sẵn sàng', in_progress:'Đang học', mastered:'Đã nắm' }[s]}</span>`;
}
function icon(name, size = 20) {
  const paths = {
    grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>', back:'<path d="M19 12H5m6 6-6-6 6-6"/>',
    check:'<path d="m5 12 4 4L19 6"/>', lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    download:'<path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"/>', upload:'<path d="M12 16V4m-4 4 4-4 4 4M4 17v4h16v-4"/>',
    list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>', menu:'<path d="M4 7h16M4 12h16M4 17h16"/>', close:'<path d="M5 5l14 14M19 5 5 19"/>',
    book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}
function shell(content) {
  const total = nodes.length;
  return `<div class="app-shell">
    <aside class="sidebar ${state.mobileNav ? 'sidebar-open' : ''}" aria-label="Điều hướng chính">
      <button class="brand" data-nav="overview" aria-label="Về roadmap tổng quan"><span class="brand-mark">&gt;_</span><span><strong>knowledge<span class="brand-light">map</span></strong><small>DEVELOPER ROADMAP</small></span></button>
      <div class="sidebar-section-label">// NAVIGATION</div>
      <nav class="side-nav"><button data-nav="overview" class="side-link ${state.view === 'overview' ? 'active' : ''}">${icon('grid')}<span>Roadmap</span></button>
      ${domains.map(d => `<button data-domain="${d.id}" class="side-link ${state.domain === d.id ? 'active' : ''}"><span class="side-domain-icon ${d.color}">${d.icon}</span><span>${d.title}</span></button>`).join('')}</nav>
      <div class="side-bottom"><div class="side-progress-label"><span>YOUR_PROGRESS</span><strong>${completed()}/${total}</strong></div><div class="progress-track"><span style="width:${completed()/total*100}%"></span></div><p>Tiến độ lưu trên trình duyệt của bạn.</p><button class="side-transfer" data-panel="transfer">${icon('download',17)} Export / Import</button></div>
    </aside>${state.mobileNav ? `<button class="mobile-scrim" data-action="mobile-nav" aria-label="Đóng menu"></button>` : ''}
    <div class="main-column"><header class="topbar"><button class="mobile-menu icon-button" data-action="mobile-nav" aria-label="${state.mobileNav ? 'Đóng' : 'Mở'} menu" aria-expanded="${state.mobileNav}">${icon('menu')}</button><div class="topbar-path"><span class="prompt-char">~</span><span>/ roadmap</span>${state.domain ? `<span class="slash">/</span><strong>${escapeHtml(domainById[state.domain]?.title || '')}</strong>` : ''}</div><div class="topbar-right"><button class="language-switch" data-action="language" aria-label="${state.language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}">${state.language === 'vi' ? 'EN' : 'VI'}</button><span class="prototype-pill"><span></span> PROTOTYPE V0.1</span><button class="topbar-progress" data-panel="transfer">${icon('download',16)} <span>Tiến độ</span></button></div></header><main id="main-content">${content}</main></div>
    ${state.panel ? panel() : ''}
  </div>`;
}
function overview() {
  return `<div class="page overview-page"><div class="page-intro"><div class="terminal-bar"><span class="terminal-dots"><i></i><i></i><i></i></span><span>~/knowledge-map/roadmap</span><span class="terminal-mode">● LIVE</span></div><div class="intro-content"><span class="eyebrow">$ knowledge-map --start</span><h1>Build your<br><em>knowledge graph<span class="cursor">_</span></em></h1><p>Khám phá ${domains.length} lĩnh vực về kỹ thuật, sản phẩm, AI và năng lực phối hợp. Chọn nhánh cần tìm hiểu rồi đi sâu theo nhu cầu của bạn.</p><div class="hero-command"><span>$</span> chọn lĩnh vực bên dưới để bắt đầu <span class="cursor">_</span></div></div><div class="intro-art" aria-hidden="true"><div class="graph-node graph-a">01</div><div class="graph-node graph-b">02</div><div class="graph-node graph-c">03</div><div class="graph-node graph-d">04</div><div class="graph-line line-a"></div><div class="graph-line line-b"></div><div class="graph-line line-c"></div></div></div>
    <section class="overview-stats" aria-label="Tổng quan tiến độ"><div><span class="stat-symbol">01</span><strong>${domains.length}<small> lĩnh vực</small></strong></div><div><span class="stat-symbol">02</span><strong>${nodes.length}<small> mốc kiến thức</small></strong></div><div><span class="stat-symbol">03</span><strong>${completed()}<small> đã nắm</small></strong></div><p><span class="prompt-char">›</span> Mỗi mốc chỉ khóa khi có tiền đề thật sự bắt buộc.</p></section>
    <div class="section-heading"><div><span class="eyebrow dark">// ROADMAP OVERVIEW</span><h2>Chọn nhánh để khám phá</h2></div><span class="section-hint">${domains.length} tracks · ${nodes.length} nodes</span></div>
    <div class="domain-grid">${domains.map((d, i) => `<button class="domain-card ${d.color}" data-domain="${d.id}"><span class="domain-card-top"><span class="domain-symbol">${d.icon}</span><span class="domain-index">TRACK_${String(i+1).padStart(2,'0')}</span></span><span class="domain-copy"><span class="domain-eyebrow">${d.eyebrow}</span><strong>${d.title}</strong><span>${d.description}</span></span><span class="mini-path" aria-hidden="true"><i class="${status(domainNodes(d.id)[0])}"></i><b></b><i class="${status(domainNodes(d.id)[1])}"></i><b></b><i class="${status(domainNodes(d.id)[2])}"></i><span>${completed(d.id)}/3 completed</span></span><span class="domain-card-footer">Mở nhánh roadmap <span>${icon('arrow',18)}</span></span></button>`).join('')}</div>
    <div class="overview-note"><span>&gt;_</span><p><strong>Học theo nhịp của bạn.</strong> Đọc mốc đã mở, tự đánh dấu phần quen thuộc và quay lại bất cứ lúc nào.</p></div></div>`;
}
function milestone(node, index) {
  const s = status(node);
  return `<button class="milestone ${s}" data-node="${node.id}"><span class="milestone-number">${s === 'mastered' ? icon('check',22) : s === 'locked' ? icon('lock',18) : String(index+1).padStart(2,'0')}</span><span class="milestone-content"><span class="milestone-meta">NODE / ${escapeHtml(node.id)} <span>·</span> ${node.duration}</span><strong>${node.title}</strong><span class="milestone-summary">${node.summary}</span><span class="milestone-bottom">${badge(node)} <span class="milestone-arrow">${icon('arrow',18)}</span></span></span></button>`;
}
function domainView() {
  const d = domainById[state.domain], dn = domainNodes(d.id), next = dn.find(n => status(n) === 'in_progress') || dn.find(n => status(n) === 'available') || dn.find(n => status(n) === 'locked');
  return `<div class="page domain-page"><button class="text-back" data-nav="overview">${icon('back',16)} Roadmap</button><section class="domain-hero ${d.color}"><div><span class="eyebrow">TRACK / ${d.id.toUpperCase()}</span><h1>${d.title}<span class="cursor">_</span></h1><p>${d.description} Ba mốc minh họa thứ tự học và những tiền đề cần thiết.</p><div class="hero-chips"><span>${dn.length} NODES</span><span>${completed(d.id)}/${dn.length} COMPLETED</span></div></div><span class="hero-glyph" aria-hidden="true">${d.icon}</span></section>
    <div class="domain-layout"><section class="journey-section"><div class="section-heading compact"><div><span class="eyebrow dark">// STAGE 01 · ${d.stage.toUpperCase()}</span><h2>Learning path</h2></div><button class="view-toggle" data-action="toggle-list" aria-pressed="${state.listMode}">${icon('list',17)} ${state.listMode ? 'Roadmap view' : 'List view'}</button></div><div class="journey ${state.listMode ? 'list-mode' : ''}">${dn.map(milestone).join('')}</div></section>
    <aside class="journey-aside"><div class="aside-card next-card"><span class="aside-kicker">✦ GỢI Ý TIẾP THEO</span><h3>${next ? next.title : 'Bạn đã hoàn thành chặng này'}</h3><p>${next ? status(next) === 'locked' ? 'Mốc này cần tiền đề từ lĩnh vực khác. Mở mốc để xem đường đi phù hợp.' : next.summary : 'Bạn có thể quay lại các mốc bất cứ lúc nào.'}</p>${next ? `<button class="aside-link" data-node="${next.id}">${status(next) === 'locked' ? 'Xem tiền đề' : 'Đi tới mốc'} ${icon('arrow',17)}</button>` : `<button class="aside-link" data-nav="overview">Xem toàn cảnh ${icon('arrow',17)}</button>`}</div><div class="aside-card legend-card"><h3>Trạng thái mốc</h3><div>${['mastered','in_progress','available','locked'].map(s => `<span class="legend-line"><i class="legend-dot ${s}"></i>${{mastered:'Đã nắm',in_progress:'Đang học',available:'Sẵn sàng',locked:'Chưa mở'}[s]}</span>`).join('')}</div><p>Mốc chưa mở vẫn có thể bấm để xem tiền đề cần học.</p></div></aside></div></div>`;
}
function lessonView() {
  const n = nodeById[state.node], d = domainById[n.domain], s = status(n), dn = domainNodes(n.domain), next = dn.find(x => x.order > n.order);
  return `<div class="page lesson-page"><div class="breadcrumbs"><button data-nav="overview">roadmap</button><span>/</span><button data-domain="${d.id}">${d.id}</button><span>/</span><strong>${n.id}</strong></div><div class="lesson-header"><div><span class="eyebrow dark">DOC / ${escapeHtml(n.id)}</span><h1>${n.title}<span class="cursor">_</span></h1><p>${n.summary}</p><div class="lesson-meta">${badge(n)}<span>◷ ${n.duration} đọc</span><span>◇ ${n.level}</span></div></div><span class="lesson-header-symbol ${d.color}">${d.icon}</span></div>
    <div class="lesson-layout"><article class="article"><div class="article-callout"><span>SAU BÀI NÀY, BẠN CÓ THỂ</span><strong>${n.takeaway}</strong></div>${n.sections.map(([heading, body], i) => `<section id="section-${i+1}" class="article-section"><span class="section-number">0${i+1}</span><div><h2>${heading}</h2><p>${body}</p></div></section>`).join('')}<div class="article-tip"><span>✳</span><p><strong>Tự đào sâu</strong><br>Thử giải thích khái niệm này cho một đồng nghiệp bằng ví dụ từ công việc của bạn. Ghi lại câu hỏi nào bạn chưa trả lời chắc chắn.</p></div>
      <div class="lesson-actions">${s === 'locked' ? `<button class="primary-button" data-panel="locked:${n.id}">${icon('lock',17)} Xem tiền đề cần học</button>` : s === 'mastered' ? `<button class="secondary-button" data-action="unmaster">${icon('check',18)} Đã nắm · Bỏ đánh dấu</button>` : `<button class="primary-button" data-action="master">${icon('check',18)} Đánh dấu đã nắm</button>${s === 'available' ? `<button class="secondary-button" data-action="start">Bắt đầu học</button>` : ''}`}<button class="plain-button" data-domain="${d.id}">Quay về roadmap ${icon('arrow',16)}</button></div>
      ${next ? `<button class="next-lesson" data-node="${next.id}"><span>MỐC TIẾP THEO<strong>${next.title}</strong></span>${icon('arrow',20)}</button>` : ''}</article>
      <aside class="lesson-aside"><div class="aside-card toc"><span class="aside-kicker">TRONG BÀI NÀY</span>${n.sections.map(([heading],i)=>`<a href="#section-${i+1}"><span>0${i+1}</span>${heading}</a>`).join('')}</div><div class="aside-card prerequisite-card"><span class="aside-kicker">TIỀN ĐỀ</span>${n.prerequisites.length ? n.prerequisites.map(id=>`<button data-node="${id}">${icon('book',16)} ${nodeById[id].title} ${status(nodeById[id]) === 'mastered' ? '<span>✓</span>' : ''}</button>`).join('') : '<p>Mốc khởi đầu, không có tiền đề bắt buộc.</p>'}</div><div class="aside-card related-card"><span class="aside-kicker">KHÁM PHÁ THÊM</span>${n.related.filter(id=>nodeById[id]).map(id=>`<button data-node="${id}">${nodeById[id].title} ${icon('arrow',15)}</button>`).join('')}</div></aside></div></div>`;
}
function panel() {
  if (state.panel === 'transfer') return `<div class="modal-backdrop" data-close="true"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close icon-button" data-action="close" aria-label="Đóng">${icon('close')}</button><span class="eyebrow dark">DỮ LIỆU CỦA BẠN</span><h2 id="modal-title">Tiến độ học tập</h2><p>Tiến độ chỉ lưu trên trình duyệt hiện tại. Xuất file JSON để sao lưu hoặc chuyển sang thiết bị khác.</p><div class="transfer-summary"><strong>${completed()} / ${nodes.length}</strong><span>mốc đã nắm</span></div><div class="modal-actions"><button class="primary-button" data-action="export">${icon('download',17)} Xuất JSON</button><label class="secondary-button file-label">${icon('upload',17)} Nhập JSON<input id="import-file" type="file" accept="application/json,.json" /></label></div><p class="modal-fine">Khi nhập, trạng thái hợp lệ trong file sẽ thay thế tiến độ hiện tại. Mốc không còn tồn tại sẽ được bỏ qua.</p><div id="import-preview" aria-live="polite"></div></section></div>`;
  const id = state.panel.split(':')[1], node = nodeById[id], missing = node.prerequisites.filter(pid => state.progress[pid]?.status !== 'mastered');
  return `<div class="modal-backdrop" data-close="true"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close icon-button" data-action="close" aria-label="Đóng">${icon('close')}</button><span class="lock-icon">${icon('lock',24)}</span><span class="eyebrow dark">MỐC CHƯA MỞ</span><h2 id="modal-title">${node.title}</h2><p>Để bắt đầu mốc này, hãy đánh dấu đã nắm các tiền đề bắt buộc bên dưới.</p><div class="missing-list">${missing.map(pid => `<button data-node="${pid}"><span><small>TIỀN ĐỀ CẦN HỌC</small><strong>${nodeById[pid].title}</strong><em>${domainById[nodeById[pid].domain].title}</em></span>${icon('arrow',19)}</button>`).join('')}</div><p class="modal-fine">Bạn có thể mở mốc tiền đề để học hoặc tự đánh dấu nếu đã nắm kiến thức đó.</p></section></div>`;
}
function render() { app.innerHTML = shell(state.view === 'overview' ? overview() : state.view === 'domain' ? domainView() : lessonView()); if (state.language === 'en') translateInterface(app); document.documentElement.lang = state.language; document.title = `${state.view === 'lesson' ? nodeById[state.node].title + ' — ' : ''}Knowledge Map`; }
function setStatus(id, value) { if (!value) delete state.progress[id]; else state.progress[id] = { status: value, updatedAt: new Date().toISOString() }; persist(); render(); }
function exportProgress() { const file = new Blob([JSON.stringify({schemaVersion:1,nodes:state.progress}, null, 2)], {type:'application/json'}); const url=URL.createObjectURL(file); const a=document.createElement('a'); a.href=url; a.download='knowledge-map-progress.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); }
async function previewImport(file) {
  const target = document.querySelector('#import-preview');
  try {
    const raw = JSON.parse(await file.text());
    if (raw.schemaVersion !== 1 || !raw.nodes || typeof raw.nodes !== 'object' || Array.isArray(raw.nodes)) throw new Error('File JSON không đúng định dạng tiến độ phiên bản 1.');
    const valid = Object.entries(raw.nodes).filter(([id, entry]) => nodeById[id] && ['in_progress','mastered'].includes(entry?.status));
    const mastered = valid.filter(([,entry])=>entry.status==='mastered').length;
    const unknown = Object.keys(raw.nodes).length-valid.length;
    target.innerHTML = `<div class="import-preview"><strong>Tìm thấy ${valid.length} mốc hợp lệ</strong><p>${mastered} mốc đã nắm${unknown ? ` · ${unknown} mục không hợp lệ hoặc không còn trong bản đồ sẽ được bỏ qua` : ''}. Nhập sẽ thay thế tiến độ hiện tại.</p><button class="primary-button" data-action="confirm-import">Xác nhận nhập</button></div>`;
    if (state.language === 'en') translateInterface(target);
    state.pendingImport = Object.fromEntries(valid);
  } catch (error) { state.pendingImport = null; target.innerHTML = `<div class="import-error" role="alert">${escapeHtml(error.message)}</div>`; if (state.language === 'en') translateInterface(target); }
}
app.addEventListener('click', event => {
  const sectionLink = event.target.closest('a[href^="#section-"]');
  if (sectionLink) { event.preventDefault(); document.querySelector(sectionLink.getAttribute('href'))?.scrollIntoView({behavior:'smooth',block:'start'}); return; }
  const target = event.target.closest('[data-nav],[data-domain],[data-node],[data-panel],[data-action],[data-close]'); if (!target) return;
  if (target.dataset.nav) return navigate('overview');
  if (target.dataset.domain) return navigate('domain', target.dataset.domain);
  if (target.dataset.node) { const n=nodeById[target.dataset.node]; return status(n)==='locked' ? (state.panel=`locked:${n.id}`,render()) : navigate('lesson',n.id); }
  if (target.dataset.panel) { state.panel=target.dataset.panel; return render(); }
  if (target.dataset.close && event.target === target) { state.panel=null; return render(); }
  const action=target.dataset.action;
  if (action==='language') { state.language = state.language === 'vi' ? 'en' : 'vi'; localStorage.setItem(LANGUAGE_KEY, state.language); setContentLanguage(state.language); return render(); }
  if (action==='close') { state.panel=null; return render(); }
  if (action==='toggle-list') { state.listMode=!state.listMode; return render(); }
  if (action==='mobile-nav') { state.mobileNav=!state.mobileNav; return render(); }
  if (action==='master') return setStatus(state.node,'mastered');
  if (action==='unmaster') return setStatus(state.node,'in_progress');
  if (action==='start') return setStatus(state.node,'in_progress');
  if (action==='export') return exportProgress();
  if (action==='confirm-import' && state.pendingImport) { state.progress=state.pendingImport; state.pendingImport=null; persist(); state.panel=null; return render(); }
});
app.addEventListener('change', event => { if (event.target.id === 'import-file' && event.target.files[0]) previewImport(event.target.files[0]); });
window.addEventListener('hashchange', syncHash);
window.addEventListener('keydown', event => { if (event.key==='Escape' && state.panel) { state.panel=null; render(); } });
syncHash();
