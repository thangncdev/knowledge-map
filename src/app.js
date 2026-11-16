import { domains, nodes, nodeById, domainById, setContentLanguage } from './data.js';
import { translateInterface } from './locale.js';

const STORAGE_KEY = 'knowledge-map-progress-v1';
const LANGUAGE_KEY = 'knowledge-map-language';
const THEME_KEY = 'knowledge-map-theme';
const SIDEBAR_KEY = 'knowledge-map-sidebar-collapsed';
const app = document.querySelector('#app');
const state = { progress: loadProgress(), language: localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'vi', theme: localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark', sidebarCollapsed: localStorage.getItem(SIDEBAR_KEY) === 'true', sidebarGroups: new Set(['foundation']), sidebarDomains: new Set(), sidebarTracks: new Set(), view: 'overview', domain: null, node: null, panel: null, listMode: false, mobileNav: false, expanded: new Set(['backend']), selected: null, filter: 'all', search: '', map: { x: 0, y: 0, zoom: 0.7 }, mapReady: false };
setContentLanguage(state.language);

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (saved.schemaVersion !== 1 || typeof saved.nodes !== 'object' || !saved.nodes) return {};
    return Object.fromEntries(Object.entries(saved.nodes).filter(([id, entry]) => nodeById[id] && ['in_progress', 'mastered', 'skipped'].includes(entry?.status)));
  } catch { return {}; }
}
function persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 1, nodes: state.progress })); }
function status(node) {
  if (state.progress[node.id]?.status) return state.progress[node.id].status;
  const missing = node.prerequisites.filter(id => state.progress[id]?.status !== 'mastered');
  if (missing.length) return 'locked';
  return state.progress[node.id]?.status || 'available';
}
function completed(domainId) { return nodes.filter(n => !domainId || n.domain === domainId).filter(n => status(n) === 'mastered').length; }
function skipped(domainId) { return nodes.filter(n => !domainId || n.domain === domainId).filter(n => status(n) === 'skipped').length; }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]); }
function domainNodes(id) { return nodes.filter(node => node.domain === id).sort((a,b) => a.order - b.order); }
function domainTracks(id) {
  return domainNodes(id).reduce((tracks, node) => {
    const existing = tracks.find(track => track.name === node.group);
    if (existing) existing.nodes.push(node);
    else tracks.push({ name: node.group, nodes: [node] });
    return tracks;
  }, []);
}
function navigate(view, id) {
  if (view === 'lesson' && nodeById[id]?.contentStatus === 'outline') {
    state.selected = id;
    return navigate('domain', nodeById[id].domain);
  }
  state.view = view;
  state.domain = view === 'domain' ? id : view === 'lesson' ? nodeById[id]?.domain : null;
  state.node = view === 'lesson' ? id : null;
  state.panel = null;
  if (state.domain) { state.sidebarGroups.add(groupForDomain(state.domain)); state.sidebarDomains.add(state.domain); }
  if (state.node) state.sidebarTracks.add(`${state.domain}:${nodeById[state.node].group}`);
  if(view === 'domain') { state.filter = 'all'; state.expanded.add(id); state.focusDomain = id; }
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
  return `<span class="status status-${s}"><span class="status-dot"></span>${tr(...({ locked:['Chưa học · có tiền đề','Not started · prerequisites'], available:['Chưa học','Not started'], in_progress:['Đang học','In progress'], mastered:['Đã học','Completed'], skipped:['Đã bỏ qua','Skipped'] }[s]))}</span>`;
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
const groups = [
  { id: 'foundation', title: 'Nền tảng kỹ thuật', en: 'Engineering foundations', ids: ['security','clean_code','design_patterns'] },
  { id: 'systems', title: 'Xây dựng hệ thống', en: 'Building systems', ids: ['backend','data','devops','system_design','architecture'] },
  { id: 'products', title: 'Xây dựng sản phẩm', en: 'Building products', ids: ['ba','po','product','project','ux','ui'] },
  { id: 'ai', title: 'AI trong công việc', en: 'AI at work', ids: ['ai','ai_roles'] },
  { id: 'collaboration', title: 'Năng lực phối hợp', en: 'Working together', ids: ['senior'] },
];
const tr = (vi,en) => state.language === 'en' ? en : vi;
const optionalTopics = new Set(['design_patterns.3','ui.3','ux.3','project.3','ai_roles.3']);
const coreDomains = new Set(['security','clean_code','backend','data','product','ai']);
function importance(node) {
  if (['core','recommended','optional'].includes(node.importance)) return node.importance;
  if (optionalTopics.has(node.id)) return 'optional';
  return node.order === 1 || (coreDomains.has(node.domain) && node.order === 2) ? 'core' : 'recommended';
}
function groupForDomain(id) { return groups.find(group => group.ids.includes(id))?.id || 'foundation'; }
function importanceLabel(value) { return tr(...({ core:['Cốt lõi','Core'], recommended:['Nên học','Recommended'], optional:['Mở rộng','Optional'] }[value])); }
let graph = { width: 1440, height: 1600, items: [], lines: [] };
function shell(content) {
  return `<div class="app-shell ${state.view !== 'lesson' ? 'map-shell' : ''} ${state.sidebarCollapsed ? 'sidebar-collapsed' : ''}">
    <aside class="sidebar ${state.mobileNav ? 'sidebar-open' : ''}" aria-label="Điều hướng chính">
      <div class="sidebar-head"><button class="brand" data-nav="overview" aria-label="Về roadmap tổng quan"><span class="brand-mark">&gt;_</span><span><strong>knowledge<span class="brand-light">map</span></strong><small>PERSONAL KNOWLEDGE SYSTEM</small></span></button><button class="sidebar-collapse-button" data-action="sidebar-toggle" aria-label="${tr('Ẩn thanh điều hướng','Hide sidebar')}" title="${tr('Ẩn thanh điều hướng','Hide sidebar')}">‹</button></div>
      <div class="sidebar-section-label">EXPLORER <span>${domains.length}</span></div>
      <button data-nav="overview" class="side-link ${state.filter === 'all' && state.view !== 'lesson' ? 'active' : ''}">${icon('grid',16)} ${tr('Toàn bộ kiến thức','All knowledge')}</button>
      <nav class="side-nav" aria-label="${tr('Danh mục kiến thức','Knowledge categories')}">${groups.map(g=>`<div class="explorer-group"><button class="explorer-heading ${state.sidebarGroups.has(g.id) ? 'selected' : ''}" data-sidebar-group="${g.id}" aria-expanded="${state.sidebarGroups.has(g.id)}"><span class="tree-caret">${state.sidebarGroups.has(g.id)?'⌄':'›'}</span> ${tr(g.title,g.en)} <small>${g.ids.length}</small></button>${state.sidebarGroups.has(g.id) ? g.ids.map(id=>`<div class="sidebar-domain"><div class="sidebar-domain-row"><button data-sidebar-domain="${id}" class="side-link ${state.domain === id ? 'active' : ''}" aria-expanded="${state.sidebarDomains.has(id)}"><span class="tree-caret">${state.sidebarDomains.has(id)?'⌄':'›'}</span><span>${domainById[id].title}</span><small>${completed(id)}/${domainNodes(id).length}</small></button><button class="sidebar-domain-map" data-domain="${id}" title="${tr('Xem trên roadmap','Show on roadmap')}" aria-label="${tr('Xem trên roadmap','Show on roadmap')}: ${domainById[id].title}">↗</button></div>${state.sidebarDomains.has(id) ? `<div class="sidebar-tracks">${domainTracks(id).map(track=>{const key=`${id}:${track.name}`, open=state.sidebarTracks.has(key);return `<div class="sidebar-track"><button data-sidebar-track="${escapeHtml(key)}" class="sidebar-track-heading" aria-expanded="${open}"><span class="tree-caret">${open?'⌄':'›'}</span><span>${escapeHtml(track.name)}</span><small>${track.nodes.length}</small></button>${open?`<div class="sidebar-topics">${track.nodes.map(n=>`<button data-sidebar-topic="${n.id}" class="sidebar-topic ${state.node===n.id?'active':''}" title="${escapeHtml(n.title)}"><span class="topic-mini-status">${status(n)==='mastered'?'✓':'·'}</span><span>${escapeHtml(n.title)}</span></button>`).join('')}</div>`:''}</div>`}).join('')}</div>` : ''}</div>`).join('') : ''}</div>`).join('')}</nav>
      <div class="side-bottom"><div class="side-progress-label"><span>LEARNING_PROGRESS</span><strong>${completed()}/${nodes.length}</strong></div><div class="progress-track"><span style="width:${completed()/nodes.length*100}%"></span></div><p>Tiến độ lưu trên trình duyệt của bạn.</p><button class="side-transfer" data-panel="transfer">${icon('download',15)} Export / Import</button></div>
    </aside>${state.mobileNav ? '<button class="mobile-scrim" data-action="mobile-nav" aria-label="Đóng menu"></button>' : ''}
    <div class="main-column"><header class="topbar"><button class="desktop-sidebar-toggle icon-button" data-action="sidebar-toggle" aria-label="${state.sidebarCollapsed ? tr('Hiện thanh điều hướng','Show sidebar') : tr('Ẩn thanh điều hướng','Hide sidebar')}" aria-expanded="${!state.sidebarCollapsed}">${icon('menu')}</button><button class="mobile-menu icon-button" data-action="mobile-nav" aria-label="Mở menu" aria-expanded="${state.mobileNav}">${icon('menu')}</button><div class="topbar-path"><span class="prompt-char">~</span><button data-nav="overview">knowledge</button><span class="slash">/</span><strong>${state.view === 'lesson' ? 'docs / '+escapeHtml(state.node) : 'roadmap'}</strong></div><div class="topbar-right"><button class="search-trigger" data-action="search" aria-label="${tr('Tìm kiến thức','Search knowledge')}">${icon('list',14)} <span>${tr('Tìm kiến thức…','Find knowledge…')}</span><kbd>⌘ K</kbd></button><button class="theme-switch" data-action="theme" aria-label="${state.theme === 'dark' ? tr('Chuyển sang nền sáng','Switch to light mode') : tr('Chuyển sang nền tối','Switch to dark mode')}" title="${state.theme === 'dark' ? tr('Nền sáng','Light mode') : tr('Nền tối','Dark mode')}" aria-pressed="${state.theme === 'light'}">${state.theme === 'dark' ? '☀' : '☾'}</button><button class="language-switch" data-action="language" aria-label="${state.language === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt'}">${state.language === 'vi' ? 'EN' : 'VI'}</button><span class="prototype-pill">PREVIEW / V0.3</span></div></header><main id="main-content">${content}</main></div>${state.panel ? panel() : ''}</div>`;
}
function buildGraph() {
  const items = [], lines = [];
  const addLine = (x1,y1,x2,y2,kind='tree')=>lines.push({x1,y1,x2,y2,kind});
  items.push({kind:'root',x:550,y:35,w:340,h:64});
  addLine(720,99,720,135); addLine(720,135,80,135);
  let y=165, previous=135;
  groups.filter(g=>state.filter==='all'||state.filter===g.id).forEach((g,gi)=>{
    addLine(80,previous,80,y+21); addLine(80,y+21,555,y+21);
    items.push({kind:'group',id:g.id,x:555,y,w:330,h:42,index:groups.indexOf(g)});
    let rowY=y+90, previousRowHeight=105;
    for(let offset=0;offset<g.ids.length;offset+=3) {
      const row=g.ids.slice(offset,offset+3);
      const positions=row.length===1?[720]:row.length===2?[505,935]:[290,720,1150];
      const expandedCount=Math.max(0,...row.filter(id=>state.expanded.has(id)).map(id=>domainNodes(id).length));
      const rowHeight=expandedCount ? 91+expandedCount*67+22 : 105;
      const busY=rowY-25;
      if(offset===0) addLine(720,y+42,720,busY);
      else addLine(80,rowY-previousRowHeight+64,80,busY);
      if(offset>0) addLine(80,busY,positions[0],busY);
      if(row.length>1) addLine(positions[0],busY,positions.at(-1),busY);
      row.forEach((id,j)=>{
        const x=positions[j]-155;
        addLine(positions[j],busY,positions[j],rowY);
        items.push({kind:'domain',id,x,y:rowY,w:310,h:64});
        if(state.expanded.has(id)) {
          const children=domainNodes(id);
          children.forEach((n,i)=>{
            const ny=rowY+91+i*67;
            addLine(x+12,i===0?rowY+64:ny-39,x+12,ny+28,'branch');
            addLine(x+12,ny+28,x+32,ny+28,'branch');
            items.push({kind:'node',id:n.id,x:x+32,y:ny,w:278,h:56});
            if(i>0 && n.prerequisites.includes(children[i-1].id)) addLine(x+285,ny-11,x+285,ny,'prereq');
          });
        }
      });
      if(offset===0 && g.ids.length>3) {addLine(positions[0],busY,80,busY);addLine(80,busY,80,rowY+64);}
      previousRowHeight=rowHeight;
      rowY+=rowHeight;
    }
    previous=y+21;
    y=rowY+70;
  });
  graph={width:1440,height:y+25,items,lines};
}
function roadmapView() {
  buildGraph();
  const selected=nodeById[state.selected];
  return `<div class="roadmap-page"><div class="map-heading"><div><div class="eyebrow">// YOUR KNOWLEDGE, CONNECTED</div><h1>${tr('Bản đồ kiến thức','Knowledge roadmap')}<span>_</span></h1><p>${tr('Nhìn toàn cảnh. Mở từng nhánh. Hiểu đến tận gốc.','See the whole picture. Explore each branch. Understand deeply.')}</p></div><div class="map-totals"><strong>${domains.length}<small>${tr('lĩnh vực','domains')}</small></strong><span>/</span><strong>${nodes.length}<small>${tr('chủ đề','topics')}</small></strong></div></div>
    <div class="map-toolbar"><div class="map-tabs"><button data-filter="all" class="${state.filter==='all'?'active':''}">${tr('Toàn cảnh','Overview')}</button>${groups.map(g=>`<button data-filter="${g.id}" class="${state.filter===g.id?'active':''}">${tr(g.title,g.en)}</button>`).join('')}</div><div class="map-actions"><button data-action="expand-all">${tr('Mở tất cả','Expand all')}</button><button data-action="collapse-all">${tr('Thu gọn','Collapse')}</button></div></div>
    <div class="map-viewport" aria-label="${tr('Bản đồ tương tác. Kéo để di chuyển; dùng các nút để phóng to hoặc thu nhỏ.','Interactive roadmap. Drag to pan; use controls to zoom.')}" tabindex="0"><div class="map-canvas" style="width:${graph.width}px;height:${graph.height}px">${graphMarkup()}</div><div class="canvas-label"><span class="live-dot"></span> knowledge.tree <span> / ${state.filter==='all'?'all':state.filter}</span></div><div class="canvas-hint">${tr('Kéo để di chuyển · Bấm nhánh để mở','Drag to explore · Click a branch to expand')}</div>
      <div class="map-controls"><button data-action="zoom-out" aria-label="${tr('Thu nhỏ','Zoom out')}">−</button><span id="zoom-value">${Math.round(state.map.zoom*100)}%</span><button data-action="zoom-in" aria-label="${tr('Phóng to','Zoom in')}">+</button><i></i><button data-action="fit" aria-label="${tr('Xem toàn cảnh','Fit overview')}">${icon('grid',16)}</button><button data-action="reset-map" aria-label="${tr('Về điểm bắt đầu','Back to start')}">↖</button></div>
      <button class="minimap" data-action="minimap" aria-label="${tr('Di chuyển trên bản đồ thu nhỏ','Navigate minimap')}"><svg viewBox="0 0 ${graph.width} ${graph.height}" aria-hidden="true">${graph.items.map(n=>`<rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" class="mini-${n.kind}"/>`).join('')}<rect id="mini-window" x="0" y="0" width="800" height="600"/></svg></button>
      ${selected ? inspector(selected) : ''}
    </div><footer class="map-statusbar"><div class="map-legend"><span><i class="legend-icon done">✓</i>${tr('Đã học','Completed')}</span><span><i class="legend-icon active">◐</i>${tr('Đang học','In progress')}</span><span><i class="legend-icon todo">○</i>${tr('Chưa học','Not started')}</span><span><i class="legend-icon skip">↷</i>${tr('Bỏ qua','Skipped')}</span><span class="legend-importance">★ ${tr('Cốt lõi','Core')} · ◇ ${tr('Nên học','Recommended')} · + ${tr('Mở rộng','Optional')}</span></div><span>${completed()}/${nodes.length} ${tr('đã học','completed')} · ${skipped()} ${tr('bỏ qua','skipped')}</span></footer></div>`;
}
function graphMarkup() {
  const selected=nodeById[state.selected];
  const related=new Set(selected?[...selected.prerequisites,...selected.related, ...nodes.filter(n=>n.prerequisites.includes(selected.id)).map(n=>n.id)]:[]);
  return `<svg class="graph-edges" width="${graph.width}" height="${graph.height}" aria-hidden="true">${graph.lines.map(l=>`<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" class="edge-${l.kind}"/>`).join('')}</svg>${graph.items.map(item=>{
    const style=`left:${item.x}px;top:${item.y}px;width:${item.w}px;height:${item.h}px`;
    if(item.kind==='root') return `<div class="graph-root" style="${style}"><span>&gt;_</span><div>knowledge.map<small>${tr('HỆ THỐNG TRI THỨC CÁ NHÂN','PERSONAL KNOWLEDGE SYSTEM')}</small></div></div>`;
    if(item.kind==='group') {const g=groups.find(g=>g.id===item.id);return `<div class="graph-group group-${g.id}" style="${style}"><span>0${item.index+1}</span>${tr(g.title,g.en)}</div>`;}
    if(item.kind==='domain') {const d=domainById[item.id],done=completed(d.id),total=domainNodes(d.id).length;return `<button class="graph-domain group-${groupForDomain(d.id)} ${state.expanded.has(d.id)?'expanded':''} ${state.domain===d.id?'focused':''}" data-expand="${d.id}" aria-expanded="${state.expanded.has(d.id)}" style="${style}"><span class="graph-folder">${state.expanded.has(d.id)?'−':'+'}</span><span class="graph-domain-copy"><strong>${d.title}</strong><small>${total} ${tr('chủ đề','topics')} <span>· ${done}/${total} ${tr('đã học','completed')}</span></small><span class="domain-completion" aria-hidden="true"><i style="width:${done/total*100}%"></i></span></span><span class="graph-domain-arrow">${state.expanded.has(d.id)?'⌃':'⌄'}</span></button>`;}
    const n=nodeById[item.id],s=status(n),priority=importance(n);
    const symbol={mastered:'✓',in_progress:'◐',skipped:'↷',locked:'○',available:'○'}[s];
    const stateLabel=tr(...({mastered:['Đã học','Completed'],in_progress:['Đang học','In progress'],skipped:['Đã bỏ qua','Skipped'],locked:['Chưa học','Not started'],available:['Chưa học','Not started']}[s]));
    return `<button class="graph-topic group-${groupForDomain(n.domain)} importance-${priority} ${state.selected===n.id?'selected':''} ${related.has(n.id)?'related':''} ${s}" data-select="${n.id}" style="${style}" aria-label="${escapeHtml(n.title)} · ${importanceLabel(priority)} · ${stateLabel}" aria-pressed="${state.selected===n.id}"><span class="topic-status" aria-hidden="true">${symbol}</span><span>${escapeHtml(n.title)}</span><small class="importance-mark" aria-hidden="true">${{core:'★',recommended:'◇',optional:'+'}[priority]}</small></button>`;
  }).join('')}`;
}
function inspectorReadAction(n) {
  if (n.contentStatus === 'outline') return `<p class="inspector-footnote">${tr('Đây là mốc định hướng ngắn. Bài chuyên sâu đang được biên soạn từ nguồn gốc.','This is a short roadmap milestone. The full source-based lesson is being written.')}</p>`;
  const label = n.contentStatus === 'draft' ? tr('Đọc bản biên tập đầu','Read the first editorial draft') : tr('Đọc bài chuyên sâu','Read the full lesson');
  return `<button class="primary-button read-topic" data-read="${n.id}">${label} ${icon('arrow',17)}</button><p class="inspector-footnote">${n.contentStatus === 'draft' ? tr('Bài đang được mở rộng và rà soát chuyên môn.','This lesson is being expanded and reviewed.') : tr('Bài viết mở ngay trong Knowledge Map.','Read right here in Knowledge Map.')}</p>`;
}
function inspector(n) {
  const priority=importance(n),s=status(n);
  return `<aside class="node-inspector group-${groupForDomain(n.domain)}" aria-label="${tr('Xem nhanh chủ đề','Topic preview')}"><div class="inspector-top"><span>DOC_PREVIEW / ${escapeHtml(n.domain.toUpperCase())}</span><button data-action="close-inspector" aria-label="${tr('Đóng','Close')}">${icon('close',16)}</button></div><div class="inspector-body"><div class="inspector-id">${n.id}</div><h2>${n.title}</h2><p>${n.summary}</p><div class="inspector-tags"><span class="importance-tag importance-${priority}">${{core:'★',recommended:'◇',optional:'+'}[priority]} ${importanceLabel(priority)}</span>${badge(n)}<span class="inspector-duration">${n.duration}</span></div><div class="inspector-progress"><span>${tr('TIẾN ĐỘ CỦA BẠN','YOUR PROGRESS')}</span><div><button type="button" data-progress="mastered" aria-pressed="${s==='mastered'}">✓ ${tr('Đã học','Completed')}</button><button type="button" data-progress="skipped" aria-pressed="${s==='skipped'}">↷ ${tr('Bỏ qua','Skip')}</button>${['mastered','skipped','in_progress'].includes(s)?`<button type="button" data-progress="clear" aria-label="${tr('Bỏ đánh dấu tiến độ','Clear progress')}">↺</button>`:''}</div></div><div class="inspector-section"><h3>${tr('Bạn sẽ hiểu được','What you will understand')}</h3><p>${n.takeaway}</p></div><div class="inspector-section"><h3>${tr('Nên học trước','Learn first')}</h3>${n.prerequisites.length?n.prerequisites.map(id=>`<button data-jump="${id}"><span>${state.progress[id]?.status==='mastered'?'✓':'○'}</span>${nodeById[id].title} ↗</button>`).join(''):`<p>${tr('Có thể bắt đầu tại đây.','Start here. No prerequisites.')}</p>`}</div>${n.related.length?`<div class="inspector-section"><h3>${tr('Kiến thức liên quan','Related knowledge')}</h3>${n.related.map(id=>`<button data-jump="${id}">${nodeById[id].title} ↗</button>`).join('')}</div>`:''}${inspectorReadAction(n)}</div></aside>`;
}
function sectionBody(body) { return /^\s*<(?:p|pre|ul|ol|div)\b/i.test(body) ? body : `<p>${body}</p>`; }
function lessonView() {
  const n = nodeById[state.node], d = domainById[n.domain], s = status(n);
  const readable = domainNodes(n.domain).filter(item => item.contentStatus !== 'outline');
  const position = readable.findIndex(item => item.id === n.id);
  const previous = position > 0 ? readable[position - 1] : null;
  const next = position >= 0 && position < readable.length - 1 ? readable[position + 1] : null;
  return `<div class="page lesson-page"><div class="breadcrumbs"><button data-nav="overview">roadmap</button><span>/</span><button data-domain="${d.id}">${d.id}</button><span>/</span><strong>${n.id}</strong></div><div class="lesson-header"><div><span class="eyebrow dark">DOC / ${escapeHtml(n.id)}</span><h1>${n.title}<span class="cursor">_</span></h1><p>${n.summary}</p><div class="lesson-meta">${badge(n)}<span>◷ ${n.duration} ${tr('đọc','read')}</span><span>◇ ${n.level}</span></div></div><span class="lesson-header-symbol ${d.color}">${d.icon}</span></div>
    <div class="lesson-layout"><article class="article">${n.contentStatus === 'draft' ? `<p class="editorial-note">${tr('Bản biên tập đầu — nội dung đang được mở rộng và rà soát chuyên môn.','First editorial draft — content is being expanded and reviewed.')}</p>` : ''}<div class="article-callout"><span>SAU BÀI NÀY, BẠN CÓ THỂ</span><strong>${n.takeaway}</strong></div>${n.sections.map(([heading, body], i) => `<section id="section-${i+1}" class="article-section"><span class="section-number">${String(i+1).padStart(2,'0')}</span><div><h2>${heading}</h2>${sectionBody(body)}</div></section>`).join('')}${lessonExample(n)}<div class="article-tip"><span>✳</span><p><strong>Tự đào sâu</strong><br>Thử giải thích khái niệm này cho một đồng nghiệp bằng ví dụ từ công việc của bạn. Ghi lại câu hỏi nào bạn chưa trả lời chắc chắn.</p></div>
      <div class="lesson-actions">${s === 'mastered' ? `<button class="secondary-button" data-action="unmaster">${icon('check',18)} Đã nắm · Bỏ đánh dấu</button>` : `<button class="primary-button" data-action="master">${icon('check',18)} Đánh dấu đã nắm</button>`}<button class="plain-button" data-domain="${d.id}">${tr('Về danh mục','Back to category')} ${icon('arrow',16)}</button></div>
      ${(previous || next) ? `<nav class="lesson-pagination" aria-label="${tr('Điều hướng giữa các bài học','Lesson navigation')}">${previous ? `<button class="lesson-pagination-card previous" data-node="${previous.id}">${icon('back',20)}<span>${tr('BÀI TRƯỚC','PREVIOUS LESSON')}<strong>${previous.title}</strong></span></button>` : '<span></span>'}${next ? `<button class="lesson-pagination-card next" data-node="${next.id}"><span>${tr('HỌC TIẾP','CONTINUE LEARNING')}<strong>${next.title}</strong></span>${icon('arrow',20)}</button>` : '<span></span>'}</nav>` : ''}</article>
      <aside class="lesson-aside"><div class="aside-card toc"><span class="aside-kicker">TRONG BÀI NÀY</span>${n.sections.map(([heading],i)=>`<a href="#section-${i+1}"><span>${String(i+1).padStart(2,'0')}</span>${heading}</a>`).join('')}</div><div class="aside-card prerequisite-card"><span class="aside-kicker">TIỀN ĐỀ</span>${n.prerequisites.length ? n.prerequisites.map(id=>`<button data-node="${id}">${icon('book',16)} ${nodeById[id].title} ${status(nodeById[id]) === 'mastered' ? '<span>✓</span>' : ''}</button>`).join('') : '<p>Mốc khởi đầu, không có tiền đề bắt buộc.</p>'}</div><div class="aside-card related-card"><span class="aside-kicker">KHÁM PHÁ THÊM</span>${n.related.filter(id=>nodeById[id]).map(id=>`<button data-node="${id}">${nodeById[id].title} ${icon('arrow',15)}</button>`).join('')}</div></aside></div></div>`;
}
function lessonExample(n) {
  if(n.id!=='backend.api') return '';
  return `<section class="worked-example"><div class="eyebrow">// EXAMPLE · ORDER API</div><h2>${tr('Từ yêu cầu đến hợp đồng API','From a requirement to an API contract')}</h2><p>${tr('Người dùng xác nhận giỏ hàng để tạo đơn. Trước khi viết controller, cần thống nhất dữ liệu đầu vào, quyền truy cập, kết quả và hành vi khi gửi lại yêu cầu.','A customer confirms their cart to place an order. Before writing the controller, agree on inputs, access, outputs, and what happens if the request is retried.')}</p><div class="request-flow"><span>Client</span><b>→</b><span>Validate & authorize</span><b>→</b><span>Create order</span></div><pre><code>POST /api/orders
Authorization: Bearer &lt;token&gt;
Idempotency-Key: checkout-2026-001

{
  "items": [{ "productId": "book-01", "quantity": 2 }],
  "shippingAddressId": "address-01"
}

201 Created
Location: /api/orders/order-123

{
  "id": "order-123",
  "status": "pending",
  "total": 240000,
  "currency": "VND"
}</code></pre><h3>${tr('Những quyết định cần làm rõ','Decisions to make explicit')}</h3><ul><li>${tr('Server tính giá từ dữ liệu sản phẩm; không tin giá do client gửi.','Calculate prices on the server; do not trust prices submitted by the client.')}</li><li>${tr('Kiểm tra địa chỉ giao hàng có thuộc người đang đăng nhập không.','Check that the shipping address belongs to the signed-in customer.')}</li><li>${tr('Cùng một Idempotency-Key và cùng nội dung phải trả về cùng một kết quả, tránh tạo hai đơn khi retry.','The same idempotency key and payload should return the same outcome to avoid duplicate orders on retries.')}</li></ul><div class="example-errors"><span><code>400</code> ${tr('Dữ liệu sai định dạng','Invalid input')}</span><span><code>403</code> ${tr('Không có quyền','Access denied')}</span><span><code>409</code> ${tr('Xung đột trạng thái','State conflict')}</span></div><div class="practice-block"><span>TRY IT YOURSELF</span><p>${tr('Nếu mặt hàng hết tồn kho sau khi người dùng thêm vào giỏ, API nên phản hồi thế nào? Mô tả response và cách giao diện giúp người dùng xử lý tiếp.','If an item goes out of stock after it was added to the cart, how should the API respond? Describe the response and how the interface helps the customer continue.')}</p></div></section>`;
}
function panel() {
  if (state.panel === 'search') return searchPanel();
  if (state.panel === 'transfer') return `<div class="modal-backdrop" data-close="true"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close icon-button" data-action="close" aria-label="${tr('Đóng','Close')}">${icon('close')}</button><span class="eyebrow dark">DỮ LIỆU CỦA BẠN</span><h2 id="modal-title">Tiến độ học tập</h2><p>Tiến độ chỉ lưu trên trình duyệt hiện tại. Xuất file JSON để sao lưu hoặc chuyển sang thiết bị khác.</p><div class="transfer-summary"><strong>${completed()} / ${nodes.length}</strong><span>mốc đã nắm</span></div><div class="modal-actions"><button class="primary-button" data-action="export">${icon('download',17)} Xuất JSON</button><label class="secondary-button file-label">${icon('upload',17)} Nhập JSON<input id="import-file" type="file" accept="application/json,.json" /></label></div><p class="modal-fine">Khi nhập, trạng thái hợp lệ trong file sẽ thay thế tiến độ hiện tại. Mốc không còn tồn tại sẽ được bỏ qua.</p><div id="import-preview" aria-live="polite"></div></section></div>`;
  const id = state.panel.split(':')[1], node = nodeById[id], missing = node.prerequisites.filter(pid => state.progress[pid]?.status !== 'mastered');
  return `<div class="modal-backdrop" data-close="true"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close icon-button" data-action="close" aria-label="${tr('Đóng','Close')}">${icon('close')}</button><span class="lock-icon">${icon('lock',24)}</span><span class="eyebrow dark">MỐC CHƯA MỞ</span><h2 id="modal-title">${node.title}</h2><p>Để bắt đầu mốc này, hãy đánh dấu đã nắm các tiền đề bắt buộc bên dưới.</p><div class="missing-list">${missing.map(pid => `<button data-node="${pid}"><span><small>TIỀN ĐỀ CẦN HỌC</small><strong>${nodeById[pid].title}</strong><em>${domainById[nodeById[pid].domain].title}</em></span>${icon('arrow',19)}</button>`).join('')}</div><p class="modal-fine">Bạn có thể mở mốc tiền đề để học hoặc tự đánh dấu nếu đã nắm kiến thức đó.</p></section></div>`;
}
function render() {
  const sidebarScrollTop = app.querySelector('.sidebar')?.scrollTop ?? 0;
  app.innerHTML = shell(state.view === 'lesson' ? lessonView() : roadmapView());
  if (state.language === 'en') translateInterface(app);
  document.documentElement.lang = state.language;
  document.documentElement.dataset.theme = state.theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', state.theme === 'light' ? '#f4f6f8' : '#0b1116');
  const sidebar = app.querySelector('.sidebar');
  if (sidebar) sidebar.scrollTop = sidebarScrollTop;
  if(state.view !== 'lesson') requestAnimationFrame(mountMap);
  if(state.panel) requestAnimationFrame(()=>(document.querySelector('.modal input')||document.querySelector('.modal button'))?.focus());
  document.title = `${state.view === 'lesson' ? nodeById[state.node].title + ' — ' : ''}Knowledge Map`;
}
function setStatus(id, value) { if (!value) delete state.progress[id]; else state.progress[id] = { status: value, updatedAt: new Date().toISOString() }; persist(); render(); }
function exportProgress() { const file = new Blob([JSON.stringify({schemaVersion:1,nodes:state.progress}, null, 2)], {type:'application/json'}); const url=URL.createObjectURL(file); const a=document.createElement('a'); a.href=url; a.download='knowledge-map-progress.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); }
async function previewImport(file) {
  const target = document.querySelector('#import-preview');
  try {
    const raw = JSON.parse(await file.text());
    if (raw.schemaVersion !== 1 || !raw.nodes || typeof raw.nodes !== 'object' || Array.isArray(raw.nodes)) throw new Error('File JSON không đúng định dạng tiến độ phiên bản 1.');
    const valid = Object.entries(raw.nodes).filter(([id, entry]) => nodeById[id] && ['in_progress','mastered','skipped'].includes(entry?.status));
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
  const target = event.target.closest('[data-nav],[data-domain],[data-node],[data-panel],[data-action],[data-close],[data-expand],[data-select],[data-filter],[data-jump],[data-read],[data-progress],[data-sidebar-group],[data-sidebar-domain],[data-sidebar-track],[data-sidebar-topic]');
  if (!target) { if(state.selected && !event.target.closest('.node-inspector')) { state.selected=null; renderKeepingMap(); } return; }
  if (target.dataset.expand) { state.expanded.has(target.dataset.expand)?state.expanded.delete(target.dataset.expand):state.expanded.add(target.dataset.expand); return renderKeepingMap(); }
  if (target.dataset.select) { state.selected=target.dataset.select; return renderKeepingMap(); }
  if (target.dataset.progress) { const value=target.dataset.progress; return setStatus(state.selected,value==='clear'?null:value); }
  if (target.dataset.sidebarGroup) { const id=target.dataset.sidebarGroup; state.sidebarGroups.has(id)?state.sidebarGroups.delete(id):state.sidebarGroups.add(id); return renderKeepingMap(); }
  if (target.dataset.sidebarDomain) { const id=target.dataset.sidebarDomain; state.sidebarDomains.has(id)?state.sidebarDomains.delete(id):state.sidebarDomains.add(id); return renderKeepingMap(); }
  if (target.dataset.sidebarTrack) { const id=target.dataset.sidebarTrack; state.sidebarTracks.has(id)?state.sidebarTracks.delete(id):state.sidebarTracks.add(id); return renderKeepingMap(); }
  if (target.dataset.sidebarTopic) return navigate('lesson',target.dataset.sidebarTopic);
  if (target.dataset.filter) { state.filter=target.dataset.filter; state.selected=null; state.mapReady=false; return navigate('overview'); }
  if (target.dataset.jump) return jumpToNode(target.dataset.jump);
  if (target.dataset.read) return navigate('lesson',target.dataset.read);
  if (target.dataset.nav) { state.filter='all'; return navigate('overview'); }
  if (target.dataset.domain) return navigate('domain', target.dataset.domain);
  if (target.dataset.node) return navigate('lesson',target.dataset.node);
  if (target.dataset.panel) { state.panel=target.dataset.panel; return render(); }
  if (target.dataset.close && event.target === target) { state.panel=null; return render(); }
  const action=target.dataset.action;
  if (action==='return-map') return navigate('overview');
  if (action==='search') { state.panel='search'; state.search=''; return renderKeepingMap(); }
  if (action==='close-inspector') { state.selected=null; return renderKeepingMap(); }
  if (action==='expand-all'||action==='collapse-all') { state.expanded=action==='expand-all'?new Set(domains.map(d=>d.id)):new Set(); return renderKeepingMap(); }
  if (action==='zoom-in'||action==='zoom-out') return zoomMap(action==='zoom-in'?1.2:1/1.2);
  if (action==='fit'||action==='reset-map') return resetMap(action==='fit');
  if (action==='minimap') { const box=target.getBoundingClientRect(); state.map.y=-(event.clientY-box.top)/box.height*graph.height*state.map.zoom+document.querySelector('.map-viewport').clientHeight/2; return applyMap(); }
  if (action==='language') { state.language = state.language === 'vi' ? 'en' : 'vi'; localStorage.setItem(LANGUAGE_KEY, state.language); setContentLanguage(state.language); return render(); }
  if (action==='theme') { state.theme = state.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem(THEME_KEY, state.theme); return render(); }
  if (action==='sidebar-toggle') { state.sidebarCollapsed=!state.sidebarCollapsed; localStorage.setItem(SIDEBAR_KEY,String(state.sidebarCollapsed)); return render(); }
  if (action==='close') { state.panel=null; return render(); }
  if (action==='toggle-list') { state.listMode=!state.listMode; return render(); }
  if (action==='mobile-nav') { state.mobileNav=!state.mobileNav; return render(); }
  if (action==='master') return setStatus(state.node,'mastered');
  if (action==='unmaster') return setStatus(state.node,'in_progress');
  if (action==='export') return exportProgress();
  if (action==='confirm-import' && state.pendingImport) { state.progress=state.pendingImport; state.pendingImport=null; persist(); state.panel=null; return render(); }
});
app.addEventListener('change', event => { if (event.target.id === 'import-file' && event.target.files[0]) previewImport(event.target.files[0]); });
window.addEventListener('hashchange', syncHash);
window.addEventListener('keydown', event => { if ((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k') { event.preventDefault(); state.panel='search'; state.search=''; renderKeepingMap(); } if(event.key==='Escape') { if(state.panel){state.panel=null;renderKeepingMap();} else if(state.selected){state.selected=null;renderKeepingMap();} } });
function renderKeepingMap() { render(); }
function applyMap() {
  const canvas=document.querySelector('.map-canvas'), viewport=document.querySelector('.map-viewport');
  if(!canvas||!viewport) return;
  canvas.style.transform=`translate(${state.map.x}px,${state.map.y}px) scale(${state.map.zoom})`;
  document.querySelector('#zoom-value').textContent=Math.round(state.map.zoom*100)+'%';
  const mini=document.querySelector('#mini-window');
  mini?.setAttribute('x',-state.map.x/state.map.zoom);
  mini?.setAttribute('y',-state.map.y/state.map.zoom);
  mini?.setAttribute('width',viewport.clientWidth/state.map.zoom);
  mini?.setAttribute('height',viewport.clientHeight/state.map.zoom);
}
function resetMap(all=false) {
  const viewport=document.querySelector('.map-viewport'); if(!viewport)return;
  state.map.zoom=all?Math.min(.92,(viewport.clientWidth-64)/graph.width,(viewport.clientHeight-64)/graph.height):Math.max(viewport.clientWidth<=650?.8:.15,Math.min(.92,(viewport.clientWidth-64)/graph.width));
  state.map.x=(viewport.clientWidth-graph.width*state.map.zoom)/2;
  state.map.y=all?(viewport.clientHeight-graph.height*state.map.zoom)/2:25;
  state.mapReady=true; applyMap();
}
function zoomMap(factor,point) {
  const v=document.querySelector('.map-viewport');if(!v)return;
  const px=point?.x??v.clientWidth/2,py=point?.y??v.clientHeight/2;
  const old=state.map.zoom,zoom=Math.max(.15,Math.min(1.8,old*factor));
  state.map.x=px-(px-state.map.x)*zoom/old;
  state.map.y=py-(py-state.map.y)*zoom/old;
  state.map.zoom=zoom;applyMap();
}
function jumpToNode(id) {
  const n=nodeById[id];if(!n)return;
  state.filter='all';state.expanded.add(n.domain);state.selected=id;state.panel=null;
  const wasLesson=state.view==='lesson';state.view='overview';
  state.focusNode=id;render();
  if(wasLesson) { history.pushState(null,'','#/roadmap'); state.domain=null; state.node=null; }
}
function mountMap() {
  const v=document.querySelector('.map-viewport');if(!v)return;
  if(!state.mapReady)resetMap();
  if(state.focusDomain||state.focusNode) {
    const item=graph.items.find(n=>state.focusNode?n.id===state.focusNode:n.kind==='domain'&&n.id===state.focusDomain);
    if(item){state.map.zoom=Math.min(.95,(v.clientWidth-(state.selected&&v.clientWidth>650?360:50))/600);state.map.x=(v.clientWidth-(state.selected&&v.clientWidth>650?330:0))/2-(item.x+item.w/2)*state.map.zoom;state.map.y=state.selected&&v.clientWidth<=650?50:v.clientHeight*.3-item.y*state.map.zoom;}
    state.focusNode=null;state.focusDomain=null;
  }
  applyMap();
  let drag=null;
  v.addEventListener('pointerdown',event=>{
    if(event.target.closest('button,a,input,.node-inspector')||event.button!==0)return;
    drag={x:event.clientX,y:event.clientY,mx:state.map.x,my:state.map.y};
    v.setPointerCapture(event.pointerId);v.classList.add('dragging');
  });
  v.addEventListener('pointermove',event=>{if(!drag)return;state.map.x=drag.mx+event.clientX-drag.x;state.map.y=drag.my+event.clientY-drag.y;applyMap();});
  const end=()=>{drag=null;v.classList.remove('dragging');};v.addEventListener('pointerup',end);v.addEventListener('pointercancel',end);
  v.addEventListener('wheel',event=>{
    if(event.target.closest('.node-inspector'))return;
    event.preventDefault();
    if(event.ctrlKey||event.metaKey){const r=v.getBoundingClientRect();zoomMap(Math.exp(-event.deltaY*.008),{x:event.clientX-r.left,y:event.clientY-r.top});}
    else{state.map.y-=event.deltaY;state.map.x-=event.deltaX;applyMap();}
  },{passive:false});
  v.addEventListener('keydown',event=>{if(event.target!==v)return;const step=80;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','+','-','Home'].includes(event.key))event.preventDefault();if(event.key==='ArrowUp')state.map.y+=step;if(event.key==='ArrowDown')state.map.y-=step;if(event.key==='ArrowLeft')state.map.x+=step;if(event.key==='ArrowRight')state.map.x-=step;if(event.key==='+')return zoomMap(1.2);if(event.key==='-')return zoomMap(1/1.2);if(event.key==='Home')return resetMap();applyMap();});
}
function searchResults(query) {
  const norm=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replaceAll('đ','d').toLowerCase();
  const q=norm(query.trim());
  const found=nodes.filter(n=>!q||norm(n.title+' '+n.id+' '+domainById[n.domain].title).includes(q)).slice(0,12);
  return found.length?found.map(n=>`<button data-jump="${n.id}" class="search-result"><span><strong>${escapeHtml(n.title)}</strong><small>${domainById[n.domain].title} / ${n.id}</small></span>${icon('arrow',16)}</button>`).join(''):`<p class="search-empty">${tr('Không tìm thấy chủ đề phù hợp.','No matching topics.')}</p>`;
}
function searchPanel() {
  return `<div class="modal-backdrop" data-close="true"><section class="modal search-modal" role="dialog" aria-modal="true" aria-labelledby="search-title"><div class="search-title"><h2 id="search-title">${tr('Tìm trong bản đồ','Search knowledge')}</h2><button data-action="close" class="icon-button" aria-label="${tr('Đóng','Close')}">${icon('close',18)}</button></div><label class="sr-only" for="knowledge-search">${tr('Tìm kiếm chủ đề','Search topics')}</label><input id="knowledge-search" type="search" placeholder="${tr('Tên chủ đề, lĩnh vực hoặc keyword…','Topic, domain, or keyword…')}" autocomplete="off" value="${escapeHtml(state.search)}"><div class="search-results" aria-live="polite">${searchResults(state.search)}</div><div class="search-footer">ESC ${tr('để đóng','to close')} <span>↵ ${tr('chọn kết quả để tới bản đồ','choose a result to locate it')}</span></div></section></div>`;
}
app.addEventListener('input',event=>{if(event.target.id==='knowledge-search'){state.search=event.target.value;document.querySelector('.search-results').innerHTML=searchResults(state.search);}});
app.addEventListener('keydown',event=>{
  if(event.target.id==='knowledge-search'&&event.key==='Enter'){const first=document.querySelector('.search-result');if(first){event.preventDefault();first.click();}}
  if(event.key==='Tab'&&state.panel){const modal=document.querySelector('.modal');const focusable=[...modal.querySelectorAll('button,input,a[href]')].filter(el=>!el.disabled);const first=focusable[0],last=focusable.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
});
window.addEventListener('resize',()=>{if(state.view!=='lesson')applyMap();});

syncHash();
