'use strict';
let db = null;
let ctx = { type: '', gal: [] };
let seq = 1;

const NAV = [
  ['dashboard', 'Tổng quan'],
  ['projects', 'Dự án'],
  ['news', 'Tin tức'],
  ['jobs', 'Tuyển dụng'],
  ['team', 'Ban lãnh đạo'],
  ['faq', 'FAQ'],
  ['categories', 'Danh mục'],
  ['media', 'Thư viện ảnh'],
  ['about', 'Giới thiệu'],
  ['settings', 'Cài đặt'],
  ['leads', 'Khách gửi form']
];

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const view = () => $('#view');
const uid = p => p + (seq++);
const todayVN = () => {
  const d = new Date();
  return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear();
};

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

async function api(url, opt) {
  opt = opt || {};
  const headers = {};
  let body = opt.body;
  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(body);
  }
  let res;
  try {
    res = await fetch(url, { method: opt.method || 'GET', headers, body, credentials: 'same-origin' });
  } catch (e) {
    const err = new Error('Không kết nối được server. Chạy node server.js rồi mở http://127.0.0.1:8080/admin/');
    err.network = true;
    throw err;
  }
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && !url.endsWith('/api/login')) {
    showLogin();
    const err = new Error('auth');
    err.auth = true;
    throw err;
  }
  if (!res.ok) throw new Error(data.error || 'Có lỗi xảy ra');
  return data;
}

function showLogin() {
  $('#loginView').hidden = false;
  $('#app').hidden = true;
}

function keyOf() {
  return ((location.hash || '#/dashboard').replace(/^#\//, '').split('/')[0]) || 'dashboard';
}

function setTitle(t) {
  $('#title').textContent = t;
  document.title = t + ' · Quản trị';
}
function setActions(html) { $('#actions').innerHTML = html || ''; }

const routeGuard = { dirty: false, bypass: false, backTo: '', lastHash: '' };
function startEditGuard(backTo) {
  routeGuard.dirty = false;
  routeGuard.bypass = false;
  routeGuard.backTo = backTo || '';
  routeGuard.lastHash = location.hash;
  const box = view();
  const flag = () => { routeGuard.dirty = true; };
  box.addEventListener('input', flag);
  box.addEventListener('change', flag);
}
function clearEditGuard() { routeGuard.backTo = ''; }
function confirmLeave() {
  if (routeGuard.bypass) { routeGuard.bypass = false; return true; }
  if (!routeGuard.dirty) return true;
  return confirm('Bạn chưa lưu thay đổi. Rời khỏi trang này?');
}
function leaveTo(hash) {
  if (!confirmLeave()) return false;
  routeGuard.dirty = false;
  routeGuard.bypass = true;
  routeGuard.backTo = '';
  if (hash) location.hash = hash;
  return true;
}
function parseVNDate(s) {
  const m = String(s || '').trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return 0;
  return Date.UTC(+m[3], +m[2] - 1, +m[1]);
}
function plainExcerpt(s) {
  return String(s || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/\s+/g, ' ').trim();
}
function catBadge(cat) {
  const pal = ['c0', 'c1', 'c2', 'c3', 'c4', 'c5'];
  const s = String(cat || '');
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return `<span class="nbadge ${pal[Math.abs(h) % pal.length]}">${esc(s || 'Chưa phân loại')}</span>`;
}

let newsListState = { q: '', cat: '', sort: 'manual' };

async function saveContent() {
  const res = await api('/api/content', { method: 'PUT', body: db });
  db = res.content;
  toast('Đã lưu. Tải lại trang website để thấy nội dung mới.');
}

function statusLabel(id) {
  const s = (db.statuses || []).find(x => x.id === id);
  return s ? s.label : id;
}

function fld(label, inner) {
  return `<label class="fld"><span>${label}</span>${inner}</label>`;
}
function inp(id, val, attrs) {
  return `<input id="${id}" value="${esc(val ?? '')}" ${attrs || ''}>`;
}
function area(id, val, rows) {
  return `<textarea id="${id}" rows="${rows || 4}">${esc(val || '')}</textarea>`;
}
function autoGrow(el) {
  if (!el) return;
  const grow = () => { el.style.height = 'auto'; el.style.height = Math.min(480, Math.max(168, el.scrollHeight)) + 'px'; };
  el.addEventListener('input', grow);
  grow();
}
function options(list, cur) {
  const all = list.slice();
  if (cur && all.indexOf(cur) < 0) all.push(cur);
  return all.map(v => `<option value="${esc(v)}" ${v === cur ? 'selected' : ''}>${esc(v)}</option>`).join('');
}
function coverBlock(inputId, url, label) {
  return `<div class="cover"><div class="imgprev ${url ? '' : 'empty'}"><img id="${inputId}Prev" src="${esc(url || '')}" alt=""></div>
    ${fld(label, inp(inputId, url || '', `data-liveimg="${inputId}Prev" placeholder="https://... hoặc tải file"`))}
    <div class="rowact"><button type="button" class="btn sm" data-act="pick" data-for="${inputId}">Tải ảnh</button>
    <button type="button" class="btn sm ghost" data-act="clear-img" data-for="${inputId}">Gỡ ảnh</button></div>
    <input type="file" hidden accept="image/*" data-file="${inputId}"></div>`;
}


const HERO_PAGES = [
  { id: 'about', label: 'Giới thiệu', note: 'Tiêu đề và mô tả cũng chỉnh được ở mục Giới thiệu.' },
  { id: 'projects', label: 'Dự án' },
  { id: 'news', label: 'Tin tức' },
  { id: 'jobs', label: 'Tuyển dụng' },
  { id: 'contact', label: 'Liên hệ' },
  { id: 'finance', label: 'Công cụ tài chính' },
  { id: 'compare', label: 'So sánh dự án' },
  { id: 'quiz', label: 'AI tư vấn tìm nhà' }
];

function looksHtml(s) { return /<[a-z][\s\S]*>/i.test(String(s || '')); }
function plainToHtml(s) {
  s = String(s || '').replace(/^\uFEFF/, '').replace(/^\s+|\s+$/g, '');
  if (!s) return '';
  if (looksHtml(s)) return s;
  return s.split(/\n{2,}/).map(p => '<p>' + esc(p).replace(/\r?\n/g, '<br>') + '</p>').join('');
}
function safeHref(u) {
  const raw = String(u || '').trim();
  if (!raw) return '';
  const lower = raw.toLowerCase();
  if (lower.indexOf('javascript:') === 0 || lower.indexOf('vbscript:') === 0 || lower.indexOf('data:') === 0) return '';
  if (/^(https?:|mailto:|tel:)/i.test(raw) || raw.charAt(0) === '#' || raw.charAt(0) === '/') return raw;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(raw)) return raw;
  return '';
}
function safeSrc(u) {
  const raw = String(u || '').trim();
  if (!raw) return '';
  const lower = raw.toLowerCase();
  if (lower.indexOf('javascript:') === 0 || lower.indexOf('vbscript:') === 0) return '';
  if (/^https?:\/\//i.test(raw) || raw.charAt(0) === '/' || raw.indexOf('./') === 0 || raw.indexOf('../') === 0) return raw;
  if (lower.indexOf('data:image/') === 0) return raw;
  return '';
}
function clientClean(html) {
  const box = document.createElement('div');
  box.innerHTML = String(html || '');
  const root = box.querySelector('body') || box;
  const allowed = { P: 1, H2: 1, H3: 1, H4: 1, STRONG: 1, B: 1, EM: 1, I: 1, U: 1, UL: 1, OL: 1, LI: 1, BR: 1, BLOCKQUOTE: 1, A: 1, IMG: 1, TABLE: 1, THEAD: 1, TBODY: 1, TFOOT: 1, TR: 1, TH: 1, TD: 1, HR: 1 };
  function walk(node) {
    if (node.nodeType === 3) return node.nodeValue;
    if (node.nodeType !== 1) return '';
    const tag = node.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'META' || tag === 'LINK' || tag === 'XML') return '';
    const inner = Array.prototype.map.call(node.childNodes, walk).join('');
    if (!allowed[tag]) return inner;
    if (tag === 'BR') return '<br>';
    if (tag === 'HR') return '<hr>';
    if (tag === 'IMG') {
      const src = safeSrc(node.getAttribute('src'));
      if (!src) return '';
      return '<img src="' + esc(src) + '" alt="' + esc(node.getAttribute('alt') || '') + '">';
    }
    if (tag === 'A') {
      const href = safeHref(node.getAttribute('href'));
      if (!href) return inner;
      return '<a href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + inner + '</a>';
    }
    const t = tag.toLowerCase();
    let attrs = '';
    if (tag === 'TH' || tag === 'TD') {
      ['colspan', 'rowspan'].forEach(a => {
        const v = node.getAttribute(a);
        if (v && /^[0-9]{1,2}$/.test(v)) attrs += ' ' + a + '="' + v + '"';
      });
    }
    return '<' + t + attrs + '>' + inner + '</' + t + '>';
  }
  return Array.prototype.map.call(root.childNodes, walk).join('');
}
function richBlock(id, value, label, hint) {
  const html = plainToHtml(value || '');
  return `<div class="fld richfld"><span>${label}</span>${hint ? `<p class="hint">${hint}</p>` : ''}
    <div class="rich" data-rich="${id}">
      <div class="rich-bar" role="toolbar" aria-label="Định dạng">
        <button type="button" data-cmd="bold" title="Đậm"><b>B</b></button>
        <button type="button" data-cmd="italic" title="Nghiêng"><i>I</i></button>
        <button type="button" data-cmd="underline" title="Gạch dưới"><u>U</u></button>
        <span class="sep"></span>
        <button type="button" data-cmd="formatBlock" data-val="H2" title="Tiêu đề lớn">H2</button>
        <button type="button" data-cmd="formatBlock" data-val="H3" title="Tiêu đề vừa">H3</button>
        <button type="button" data-cmd="formatBlock" data-val="H4" title="Tiêu đề nhỏ">H4</button>
        <button type="button" data-cmd="formatBlock" data-val="P" title="Đoạn văn">Đoạn</button>
        <span class="sep"></span>
        <button type="button" data-cmd="insertUnorderedList" title="Danh sách chấm">•</button>
        <button type="button" data-cmd="insertOrderedList" title="Danh sách số">1.</button>
        <button type="button" data-cmd="formatBlock" data-val="BLOCKQUOTE" title="Trích dẫn">“ ”</button>
        <span class="sep"></span>
        <button type="button" data-cmd="createLink" title="Chèn liên kết">Link</button>
        <button type="button" data-cmd="insertImage" title="Chèn ảnh">Ảnh</button>
        <button type="button" data-cmd="insertTable" title="Chèn bảng">Bảng</button>
        <span class="sep"></span>
        <button type="button" data-cmd="undo" title="Hoàn tác">↩</button>
        <button type="button" data-cmd="removeFormat" title="Xóa định dạng">Tx</button>
      </div>
      <div class="rich-ed" contenteditable="true" id="${id}Ed" role="textbox" aria-multiline="true">${html}</div>
      <textarea id="${id}" hidden></textarea>
    </div>
  </div>`;
}
function syncRich(id) {
  const ed = document.getElementById(id + 'Ed');
  const ta = document.getElementById(id);
  if (ed && ta) ta.value = ed.innerHTML.trim();
}
function richVal(id) {
  syncRich(id);
  const ta = document.getElementById(id);
  return ta ? ta.value : '';
}
function onRichPaste(e) {
  e.preventDefault();
  const cd = e.clipboardData || window.clipboardData;
  const html = cd && cd.getData('text/html');
  const text = (cd && cd.getData('text/plain')) || '';
  const insert = (html && looksHtml(html)) ? (clientClean(html) || plainToHtml(text)) : plainToHtml(text);
  document.execCommand('insertHTML', false, insert || esc(text));
}
async function onRichCmd(e, ed, sync) {
  const btn = e.target.closest('button[data-cmd]');
  if (!btn) return;
  const cmd = btn.dataset.cmd;
  const val = btn.dataset.val;
  ed.focus();
  if (cmd === 'createLink') {
    const url = prompt('Dán liên kết (https://...)');
    const href = url && safeHref(url.trim());
    if (href) document.execCommand('createLink', false, href);
    sync();
    return;
  }
  if (cmd === 'insertImage') {
    const url = prompt('Dán liên kết ảnh, hoặc để trống rồi chọn file trên máy:');
    if (url && url.trim()) {
      const src = safeSrc(url.trim());
      if (src) document.execCommand('insertHTML', false, '<img src="' + esc(src) + '" alt="">');
      sync();
      return;
    }
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = 'image/*';
    inp.onchange = async () => {
      const file = inp.files && inp.files[0];
      if (!file) return;
      try {
        const u = await uploadOne(file);
        ed.focus();
        document.execCommand('insertHTML', false, '<img src="' + esc(u) + '" alt="">');
        sync();
        toast('Đã chèn ảnh');
      } catch (err) { if (!err.auth) toast(err.message); }
    };
    inp.click();
    return;
  }
  if (cmd === 'insertTable') {
    document.execCommand('insertHTML', false, '<table><thead><tr><th>Cột 1</th><th>Cột 2</th></tr></thead><tbody><tr><td></td><td></td></tr><tr><td></td><td></td></tr></tbody></table>');
    sync();
    return;
  }
  if (cmd === 'formatBlock') document.execCommand('formatBlock', false, val);
  else document.execCommand(cmd, false, val || null);
  sync();
}
function wireRich(root) {
  (root || document).querySelectorAll('[data-rich]').forEach(box => {
    if (box.dataset.wired) return;
    box.dataset.wired = '1';
    const id = box.dataset.rich;
    const ed = box.querySelector('.rich-ed');
    const ta = document.getElementById(id);
    const sync = () => { if (ta && ed) ta.value = ed.innerHTML.trim(); };
    sync();
    ed.addEventListener('input', sync);
    ed.addEventListener('blur', sync);
    ed.addEventListener('paste', onRichPaste);
    const bar = box.querySelector('.rich-bar');
    bar.addEventListener('mousedown', ev => { if (ev.target.closest('button')) ev.preventDefault(); });
    bar.addEventListener('click', ev => onRichCmd(ev, ed, sync));
  });
}
function heroOf(id) {
  const all = (db.settings && db.settings.heroes) || {};
  return all[id] || {};
}
function heroPanel(s) {
  const heroes = (s && s.heroes) || {};
  const about = db.about || {};
  const cards = HERO_PAGES.map(pg => {
    const h = heroes[pg.id] || {};
    const title = pg.id === 'about' ? (h.title || about.title || '') : (h.title || '');
    const sub = pg.id === 'about' ? (h.subtitle || about.lead || '') : (h.subtitle || '');
    const image = pg.id === 'about' ? (h.image || about.heroImage || '') : (h.image || '');
    return `<div class="hero-card">
      <h4>${esc(pg.label)}</h4>
      ${pg.note ? `<p class="hint">${pg.note}</p>` : ''}
      ${fld('Tiêu đề banner', inp('h-' + pg.id + '-title', title))}
      ${fld('Mô tả dưới tiêu đề (Enter để xuống dòng)', area('h-' + pg.id + '-sub', sub, 3))}
      ${coverBlock('h-' + pg.id + '-image', image, 'Ảnh nền banner (trống = ảnh mặc định)')}
    </div>`;
  }).join('');
  return `<div id="heroBox" class="panel" style="margin:6px 0 16px">
    <h3>Banner các trang trong</h3>
    <p class="hint">Đổi ảnh nền, tiêu đề và mô tả banner đầu trang (Giới thiệu, Dự án, Tin tức, Tuyển dụng, Liên hệ...). Để trống thì website giữ nội dung hiện tại. Nhớ bấm <b>Lưu cài đặt</b>.</p>
    <div class="hero-list">${cards}</div>
  </div>`;
}
function readHeroes() {
  const out = {};
  HERO_PAGES.forEach(pg => {
    const subEl = document.getElementById('h-' + pg.id + '-sub');
    out[pg.id] = {
      title: val('h-' + pg.id + '-title'),
      subtitle: subEl ? String(subEl.value || '').replace(/^\s+|\s+$/g, '') : '',
      image: val('h-' + pg.id + '-image')
    };
  });
  return out;
}

function wireSearch() {
  const q = $('#q');
  if (!q) return;
  q.oninput = () => {
    const s = q.value.trim().toLowerCase();
    document.querySelectorAll('#view .row').forEach(row => {
      row.hidden = !!(s && row.textContent.toLowerCase().indexOf(s) < 0);
    });
  };
}

function listPage(title, key, hash, rowHtml, search) {
  setTitle(title);
  setActions(`<a class="btn gold" href="${hash}">Thêm mới</a>`);
  const items = db[key] || [];
  view().innerHTML = `<div class="toolbar"><input id="q" placeholder="${esc(search)}"></div><div class="list">${items.map(rowHtml).join('') || '<p class="empty">Chưa có mục nào.</p>'}</div>`;
  wireSearch();
}

function moveButtons(list, id) {
  return `<button type="button" class="icon" data-act="up" data-list="${list}" data-id="${esc(id)}" aria-label="Lên">↑</button>
    <button type="button" class="icon" data-act="down" data-list="${list}" data-id="${esc(id)}" aria-label="Xuống">↓</button>
    <button type="button" class="btn sm danger" data-act="del" data-list="${list}" data-id="${esc(id)}">Xóa</button>`;
}

function renderDashboard() {
  setTitle('Tổng quan');
  setActions('<a class="btn gold" href="/" target="_blank" rel="noopener">Mở website</a>');
  const box = view();
  box.innerHTML = '<p class="muted">Đang tải...</p>';
  api('/api/leads').then(res => {
    if (keyOf() !== 'dashboard') return;
    const leads = res.leads || [];
    const cards = [
      ['Dự án', db.projects.length, '#/projects'],
      ['Tin tức', db.news.length, '#/news'],
      ['Tuyển dụng', db.jobs.length, '#/jobs'],
      ['Khách gửi form', leads.length, '#/leads']
    ];
    box.innerHTML = `<div class="note">Sửa danh mục, dự án, tin, ảnh tại đây. Bấm lưu là server ghi <b>data/content.json</b> và cập nhật <b>js/data.js</b>. Ảnh tải lên nằm trong thư mục <b>uploads</b>.</div>
      <div class="cards">${cards.map(([n, c, h]) => `<a class="card" href="${h}"><span>${n}</span><b>${c}</b></a>`).join('')}</div>
      <div class="panel"><h3>Khách mới gửi form</h3>${leads.length ? `<table><thead><tr><th>Thời gian</th><th>Khách</th><th>Dự án</th><th>Việc</th></tr></thead><tbody>
        ${leads.slice(0, 6).map(l => `<tr><td>${esc(fmtTime(l.time))}</td><td>${esc(l.name)}<br><small>${esc(l.phone || '')}</small></td><td>${leadProjectLink(l)}</td><td>${esc(l.action || '')}${l.unit ? `<br><small>Căn ${esc(l.unit)}</small>` : ''}</td></tr>`).join('')}
      </tbody></table>` : '<p class="empty">Chưa có khách nào gửi form qua server này.</p>'}</div>`;
  }).catch(e => { if (!e.auth) box.innerHTML = `<p class="empty">${esc(e.message)}</p>`; });
}

function fmtTime(t) {
  const d = new Date(t);
  if (Number.isNaN(d.getTime())) return t || '';
  return d.toLocaleString('vi-VN');
}

function leadsOf(all, projectId) {
  return (all || []).filter(l => l.projectId === projectId).sort((a, b) => String(b.time || '').localeCompare(String(a.time || '')));
}

function dayLabel(t) {
  const d = new Date(t);
  if (Number.isNaN(d.getTime())) return 'Không rõ ngày';
  return d.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
}

async function renderProjects() {
  clearEditGuard();
  setTitle('Dự án');
  setActions('<a class="btn gold" href="#/projects/edit">Thêm dự án</a>');
  view().innerHTML = '<p class="muted">Đang tải...</p>';
  const res = await api('/api/leads');
  if (keyOf() !== 'projects' || (location.hash || '').indexOf('/edit') >= 0 || (location.hash || '').split('/').length > 2) return;
  const leads = res.leads || [];
  const items = db.projects || [];
  const statuses = db.statuses || [];
  const areas = [];
  items.forEach(p => { if (p.area && areas.indexOf(p.area) < 0) areas.push(p.area); });
  const totalLeads = items.reduce((n, p) => n + leadsOf(leads, p.id).length, 0);
  view().innerHTML = `<div class="psum"><div><b>${items.length}</b><span>Dự án</span></div><div><b>${totalLeads}</b><span>Phiếu gắn dự án</span></div><div><b>${items.filter(p => p.hot).length}</b><span>Đang nổi bật</span></div></div>
    <div class="projbar"><input id="q" placeholder="Tìm tên, khu vực, chủ đầu tư" aria-label="Tìm dự án">
      <select id="fStatus" aria-label="Lọc trạng thái"><option value="">Mọi trạng thái</option>${statuses.map(s => `<option value="${esc(s.id)}">${esc(s.label)}</option>`).join('')}</select>
      <select id="fArea" aria-label="Lọc khu vực"><option value="">Mọi khu vực</option>${areas.map(a => `<option value="${esc(a)}">${esc(a)}</option>`).join('')}</select>
    </div>
    <div class="projgrid">${items.map(p => {
      const n = leadsOf(leads, p.id).length;
      const q = [p.name, p.area, p.type, p.dev, statusLabel(p.status)].join(' ').toLowerCase();
      return `<article class="pcard" data-q="${esc(q)}" data-status="${esc(p.status)}" data-area="${esc(p.area)}">
        <a class="pcover" href="#/projects/${esc(p.id)}"><img src="${esc(p.thumb || p.image || '')}" alt=""><span class="spill s-${esc(p.status)}">${esc(statusLabel(p.status))}</span>${p.hot ? '<em>HOT</em>' : ''}</a>
        <div class="pbody">
          <a href="#/projects/${esc(p.id)}"><b>${esc(p.name)}</b></a>
          <small>${esc(p.type)} · ${esc(p.area)}</small>
          <div class="pstats"><span>${esc(p.priceFrom)} – ${esc(p.priceTo)} tỷ</span><a href="#/projects/${esc(p.id)}">${n} phiếu</a></div>
          <div class="rowact"><a class="btn sm" href="#/projects/${esc(p.id)}">Chi tiết</a><a class="btn sm ghost" href="#/projects/edit/${esc(p.id)}">Sửa</a>${moveButtons('projects', p.id)}</div>
        </div>
      </article>`;
    }).join('') || '<p class="empty">Chưa có dự án.</p>'}</div>`;
  const apply = () => {
    const s = ($('#q').value || '').trim().toLowerCase();
    const st = $('#fStatus').value;
    const ar = $('#fArea').value;
    document.querySelectorAll('.pcard').forEach(card => {
      const ok = (!s || card.dataset.q.indexOf(s) >= 0) && (!st || card.dataset.status === st) && (!ar || card.dataset.area === ar);
      card.hidden = !ok;
    });
  };
  $('#q').oninput = apply;
  $('#fStatus').onchange = apply;
  $('#fArea').onchange = apply;
}

async function renderProjectDesk(id) {
  const p = (db.projects || []).find(x => x.id === id);
  setTitle(p ? p.name : 'Dự án');
  view().innerHTML = '<p class="muted">Đang tải...</p>';
  const res = await api('/api/leads');
  const now = decodeURIComponent((location.hash || '').replace(/^#\/projects\//, ''));
  if (now !== id || now.indexOf('edit') === 0) return;
  if (!p) { view().innerHTML = '<p class="empty">Không tìm thấy dự án. <a href="#/projects">Về danh sách</a></p>'; return; }
  renderProject(id, res.leads || []);
}

function projectLeadsHtml(leads, projectId) {
  const mine = leadsOf(leads, projectId);
  let last = '';
  const blocks = mine.map(l => {
    const day = dayLabel(l.time);
    const head = day === last ? '' : `<h3 class="lday">${esc(day)}</h3>`;
    last = day;
    return head + leadCard(l, true);
  }).join('');
  return `<aside class="pwork-side"><h3>Form của dự án này · ${mine.length} phiếu, mới nhất trước</h3>${mine.length ? `<div class="leads">${blocks}</div>` : '<p class="empty">Chưa có khách gửi form cho dự án này.</p>'}</aside>`;
}

const GAL_CATS = ['Phối cảnh', 'Tiện ích', 'Nhà mẫu', 'Thực tế'];

function blankProject() {
  return { id: '', name: '', area: db.areas[0] || '', type: db.types[0] || '', status: (db.statuses[0] && db.statuses[0].id) || '', priceFrom: 0, priceTo: 0, beds: [], dev: '', scale: '', handover: '', yield: 0, growth: 0, hot: false, desc: '', legal: '', address: '', video: '', tour: '', amenities: [], image: '', gallery: [], overview: '', density: '', ownership: '', contractor: '', highlights: [], connections: [], amenitiesOut: [], floorplans: [], priceList: [], policies: [], payments: [], promo: '', progress: '', progressAt: '', milestones: [], galleryCats: [], loanRatio: 70, loanYears: 20, loanRate: 9.5, faqs: [] };
}

function srow(cls, inner) {
  return `<div class="srow ${cls}">${inner}<button type="button" class="icon" data-act="row-del" aria-label="Xóa">✕</button></div>`;
}
function kv(k, v, attrs) { return `<input data-k="${k}" value="${esc(v ?? '')}" ${attrs || ''}>`; }

function sectionRows(kind, items) {
  const list = items || [];
  if (kind === 'hl') return list.map(h => srow('hl', `${kv('title', h.title, 'placeholder="Tiêu đề"')}${kv('text', h.text, 'placeholder="Nội dung"')}`)).join('');
  if (kind === 'conn') return list.map(c => srow('conn', `${kv('icon', c.icon, 'placeholder="🚇"')}${kv('name', c.name, 'placeholder="Điểm kết nối"')}${kv('minutes', c.minutes, 'inputmode="numeric" placeholder="phút"')}`)).join('');
  if (kind === 'fp') return list.map(u => srow('fp', `${kv('name', u.name, 'placeholder="Tên loại căn"')}${kv('beds', u.beds, 'inputmode="numeric" placeholder="PN"')}${kv('area', u.area, 'inputmode="numeric" placeholder="m²"')}${kv('baths', u.baths, 'inputmode="numeric" placeholder="WC"')}${kv('price', u.price, 'inputmode="decimal" placeholder="tỷ"')}${kv('image', u.image, 'placeholder="Ảnh mặt bằng"')}`)).join('');
  if (kind === 'pr') return list.map(u => srow('pr', `${kv('code', u.code, 'placeholder="Mã"')}${kv('type', u.type, 'placeholder="Loại"')}${kv('floor', u.floor, 'inputmode="numeric" placeholder="Tầng"')}${kv('dir', u.dir, 'placeholder="Hướng"')}${kv('area', u.area, 'inputmode="numeric" placeholder="m²"')}${kv('price', u.price, 'inputmode="decimal" placeholder="tỷ"')}<label class="chk"><input data-k="sold" type="checkbox" ${u.sold ? 'checked' : ''}> Đã bán</label>`)).join('');
  if (kind === 'pol') return list.map(x => srow('pol', `${kv('value', x.value, 'placeholder="30%"')}${kv('text', x.text, 'placeholder="Diễn giải"')}`)).join('');
  if (kind === 'pay') return list.map(x => srow('pay', `${kv('step', x.step, 'placeholder="Đợt thanh toán"')}${kv('amount', x.amount, 'placeholder="10%"')}`)).join('');
  if (kind === 'ms') return list.map(x => srow('ms', `${kv('title', x.title, 'placeholder="Mốc"')}${kv('when', x.when, 'placeholder="Q4/2026"')}<label class="chk"><input data-k="done" type="checkbox" ${x.done ? 'checked' : ''}> Xong</label>${kv('image', x.image, 'placeholder="Ảnh tiến độ"')}`)).join('');
  if (kind === 'faq') return list.map(x => srow('faq', `<div class="qa"><input data-k="q" value="${esc(x.q || '')}" placeholder="Câu hỏi"><textarea data-k="a" rows="2" placeholder="Câu trả lời">${esc(x.a || '')}</textarea></div>`)).join('');
  return '';
}

function blankSectionRow(kind) {
  const empty = { title: '', text: '', icon: '', name: '', minutes: '', beds: '', area: '', baths: '', price: '', image: '', code: '', type: '', floor: '', dir: '', value: '', step: '', amount: '', when: '', q: '', a: '' };
  return sectionRows(kind, [empty]);
}

function renderProject(id, leads) {
  const isNew = !id;
  const p = isNew ? blankProject() : db.projects.find(x => x.id === id);
  if (!p) { setTitle('Dự án'); view().innerHTML = '<p class="empty">Không tìm thấy dự án.</p>'; return; }
  const withLeads = Array.isArray(leads);
  ctx = { type: 'project', originalId: isNew ? '' : p.id, gal: (p.gallery || []).slice(), galCats: (p.galleryCats || []).slice() };
  setTitle(isNew ? 'Thêm dự án' : p.name);
  setActions(isNew ? '' : `<a class="btn ghost" target="_blank" rel="noopener" href="/du-an-chi-tiet.html?id=${esc(p.id)}">Xem website</a>`);
  const statuses = db.statuses.map(s => `<option value="${esc(s.id)}" ${s.id === p.status ? 'selected' : ''}>${esc(s.label)}</option>`).join('');
  const panes = [
    ['info', 'Thông tin'],
    ['tong-quan', 'Tổng quan'],
    ['vi-tri', 'Vị trí'],
    ['tien-ich', 'Tiện ích'],
    ['mat-bang', 'Mặt bằng'],
    ['bang-gia', 'Bảng giá'],
    ['chinh-sach', 'Chính sách'],
    ['tien-do', 'Tiến độ'],
    ['thu-vien', 'Thư viện'],
    ['tinh-vay', 'Tính vay'],
    ['hoi-dap', 'Hỏi đáp']
  ];
  const box = (kind, id, items, label) => `<div class="srows" id="${id}">${sectionRows(kind, items)}</div><button type="button" class="btn sm" data-act="sec-add" data-kind="${kind}" data-box="${id}">${label}</button>`;
  const form = `<form id="editForm">
    <div class="panel phead">${coverBlock('f-image', p.image, 'Ảnh bìa')}</div>
    <div class="ptabs" id="ptabs">${panes.map(([k, t], i) => `<button type="button" class="${i ? '' : 'on'}" data-pane="${k}">${t}</button>`).join('')}</div>
    <div class="panel ppane" data-pane="info">
      ${fld('Tên dự án', inp('f-name', p.name, 'required'))}
      ${fld('Mã liên kết (để trống sẽ tạo từ tên)', inp('f-id', isNew ? '' : p.id, 'placeholder="aurora-riverside"'))}
      <div class="split">${fld('Khu vực', `<input id="f-area" list="areaList" value="${esc(p.area)}"><datalist id="areaList">${options(db.areas, '')}</datalist>`)}${fld('Loại hình', `<input id="f-type" list="typeList" value="${esc(p.type)}"><datalist id="typeList">${options(db.types, '')}</datalist>`)}</div>
      ${fld('Trạng thái', `<select id="f-status">${statuses}</select>`)}
      <div class="split">${fld('Giá từ (tỷ)', inp('f-from', p.priceFrom, 'inputmode="decimal"'))}${fld('Giá đến (tỷ)', inp('f-to', p.priceTo, 'inputmode="decimal"'))}</div>
      ${fld('Số phòng ngủ, cách nhau bởi dấu phẩy', inp('f-beds', (p.beds || []).join(', '), 'placeholder="1, 2, 3 — để trống nếu là đất nền"'))}
      <div class="split">${fld('Chủ đầu tư', inp('f-dev', p.dev))}${fld('Quy mô', inp('f-scale', p.scale))}</div>
      <div class="split">${fld('Bàn giao', inp('f-hand', p.handover))}${fld('Lợi suất thuê %/năm', inp('f-yield', p.yield, 'inputmode="decimal"'))}</div>
      ${fld('Tăng giá kỳ vọng %/năm', inp('f-growth', p.growth, 'inputmode="decimal"'))}
      ${fld('Mô tả ngắn (hiện trên ảnh bìa)', area('f-desc', p.desc, 3))}
      <label class="check"><input id="f-hot" type="checkbox" ${p.hot ? 'checked' : ''}> Dự án nổi bật (HOT)</label>
    </div>
    <div class="panel ppane" data-pane="tong-quan" hidden>
      <p class="hint">Nội dung mục Tổng quan trên trang dự án.</p>
      ${fld('Bài tổng quan', area('f-overview', p.overview, 5))}
      <div class="split">${fld('Pháp lý', inp('f-legal', p.legal))}${fld('Mật độ xây dựng', inp('f-density', p.density, 'placeholder="28%"'))}</div>
      <div class="split">${fld('Hình thức sở hữu', inp('f-own', p.ownership))}${fld('Tổng thầu', inp('f-contractor', p.contractor))}</div>
      <h3>Điểm nhấn</h3>
      ${box('hl', 'hlRows', p.highlights, 'Thêm điểm nhấn')}
    </div>
    <div class="panel ppane" data-pane="vi-tri" hidden>
      <p class="hint">Bản đồ lấy theo địa chỉ. Mỗi dòng kết nối là một điểm trên mục Vị trí.</p>
      ${fld('Địa chỉ / từ khóa bản đồ', inp('f-address', p.address, 'placeholder="Để trống thì bản đồ theo khu vực"'))}
      <h3>Kết nối vùng</h3>
      ${box('conn', 'connRows', p.connections, 'Thêm điểm kết nối')}
    </div>
    <div class="panel ppane" data-pane="tien-ich" hidden>
      ${fld('Tiện ích nội khu, mỗi dòng một ý. Có thể bắt đầu bằng emoji.', area('f-amen', (p.amenities || []).join('\n'), 8))}
      ${fld('Tiện ích ngoại khu, mỗi dòng một ý.', area('f-amen-out', (p.amenitiesOut || []).join('\n'), 8))}
    </div>
    <div class="panel ppane" data-pane="mat-bang" hidden>
      <p class="hint">Mỗi dòng là một loại căn trên mục Mặt bằng. Giá tính bằng tỷ.</p>
      ${box('fp', 'fpRows', p.floorplans, 'Thêm loại căn')}
    </div>
    <div class="panel ppane" data-pane="bang-gia" hidden>
      <p class="hint">Bảng giá chi tiết. Giá tính bằng tỷ. Đánh dấu căn đã bán.</p>
      ${box('pr', 'priceRows', p.priceList, 'Thêm căn')}
    </div>
    <div class="panel ppane" data-pane="chinh-sach" hidden>
      <h3>Các mức chính sách</h3>
      ${box('pol', 'polRows', p.policies, 'Thêm mức')}
      <h3>Tiến độ thanh toán</h3>
      ${box('pay', 'payRows', p.payments, 'Thêm đợt')}
      ${fld('Ưu đãi', area('f-promo', p.promo, 3))}
    </div>
    <div class="panel ppane" data-pane="tien-do" hidden>
      <div class="split">${fld('Phần trăm hoàn thành', inp('f-progress', p.progress == null ? '' : p.progress, 'inputmode="numeric" placeholder="58"'))}${fld('Mốc cập nhật', inp('f-progress-at', p.progressAt, 'placeholder="10/2026"'))}</div>
      <h3>Các mốc xây dựng</h3>
      ${box('ms', 'msRows', p.milestones, 'Thêm mốc')}
    </div>
    <div class="panel ppane" data-pane="thu-vien" hidden>
      ${fld('Link video', inp('f-video', p.video))}
      ${fld('Link tour 360°', inp('f-tour', p.tour))}
      <h3>Thư viện ảnh</h3>
      <p class="hint">Chọn nhóm cho từng ảnh: Phối cảnh, Tiện ích, Nhà mẫu, Thực tế. Thứ tự bằng nút lên / xuống.</p>
      <div id="gal" class="gal"></div>
      <div class="rowact" style="margin-top:8px">
        <button type="button" class="btn sm" data-act="gal-add">Tải nhiều ảnh</button>
        <button type="button" class="btn sm ghost" data-act="gal-url">Thêm bằng liên kết</button>
      </div>
      <input type="file" id="galFile" hidden accept="image/*" multiple>
    </div>
    <div class="panel ppane" data-pane="tinh-vay" hidden>
      <p class="hint">Giá căn lấy từ khoảng giá của dự án. Ba số dưới là giá trị mặc định khi khách mở mục Tính vay.</p>
      <div class="split">${fld('Tỷ lệ vay mặc định %', inp('f-loan-ratio', p.loanRatio == null ? 70 : p.loanRatio, 'inputmode="numeric"'))}${fld('Thời hạn mặc định (năm)', inp('f-loan-years', p.loanYears || 20, 'inputmode="numeric"'))}</div>
      ${fld('Lãi suất mặc định %/năm', inp('f-loan-rate', p.loanRate == null ? 9.5 : p.loanRate, 'inputmode="decimal"'))}
    </div>
    <div class="panel ppane" data-pane="hoi-dap" hidden>
      <p class="hint">Câu hỏi thường gặp riêng của dự án này.</p>
      ${box('faq', 'faqRows', p.faqs, 'Thêm câu hỏi')}
    </div>
    <div class="formbar"><button class="btn gold" type="submit">Lưu dự án</button><button class="btn ghost" type="button" data-act="back-list" data-to="#/projects">Hủy</button>${isNew ? '' : `<a class="btn ghost" target="_blank" rel="noopener" href="/du-an-chi-tiet.html?id=${esc(p.id)}">Xem trang</a>`}</div>
  </form>`;
  view().innerHTML = withLeads
    ? `<p class="back"><a href="#/projects" data-act="back-list" data-to="#/projects">← Quay lại danh sách</a></p><div class="pwork"><div class="pwork-main">${form}</div>${projectLeadsHtml(leads, p.id)}</div>`
    : `<p class="back"><a href="#/projects" data-act="back-list" data-to="#/projects">← Quay lại danh sách</a></p>${form}`;
  paintGal();
  startEditGuard('#/projects');
  $('#ptabs').onclick = e => {
    const b = e.target.closest('button');
    if (!b) return;
    $$('#ptabs button').forEach(x => x.classList.toggle('on', x === b));
    $$('.ppane').forEach(pane => { pane.hidden = pane.dataset.pane !== b.dataset.pane; });
  };
  $('#editForm').onsubmit = e => { e.preventDefault(); saveProject(); };
}

function syncGalCats() {
  if (!Array.isArray(ctx.galCats)) ctx.galCats = [];
  while (ctx.galCats.length < ctx.gal.length) ctx.galCats.push(GAL_CATS[ctx.galCats.length % GAL_CATS.length]);
  ctx.galCats.length = ctx.gal.length;
}

function paintGal() {
  const el = $('#gal');
  if (!el) return;
  syncGalCats();
  el.innerHTML = ctx.gal.map((url, i) => {
    const cur = ctx.galCats[i] || GAL_CATS[0];
    const opts = (GAL_CATS.indexOf(cur) < 0 ? [cur] : []).concat(GAL_CATS);
    return `<div class="gitem"><img src="${esc(url)}" alt=""><input data-gi="${i}" value="${esc(url)}" aria-label="Liên kết ảnh ${i + 1}"><select data-gc="${i}" aria-label="Nhóm ảnh ${i + 1}">${opts.map(c => `<option ${c === cur ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select><div class="gact">
    <button type="button" data-act="gal-up" data-i="${i}">↑</button><button type="button" data-act="gal-down" data-i="${i}">↓</button><button type="button" data-act="gal-del" data-i="${i}">✕</button>
  </div></div>`;
  }).join('') || '<p class="hint">Chưa có ảnh trong thư viện.</p>';
}

function readRows(id) {
  return [...document.querySelectorAll('#' + id + ' .srow')];
}
function cell(row, k) {
  const el = row.querySelector('[data-k="' + k + '"]');
  if (!el) return '';
  if (el.type === 'checkbox') return el.checked;
  return (el.value || '').trim();
}
function numCell(row, k) {
  return Number(String(cell(row, k)).replace(',', '.')) || 0;
}

function val(id) { return ($('#' + id).value || '').trim(); }

async function saveProject() {
  const item = {
    id: val('f-id'),
    name: val('f-name'),
    area: val('f-area'),
    type: val('f-type'),
    status: $('#f-status').value,
    priceFrom: Number(val('f-from').replace(',', '.')) || 0,
    priceTo: Number(val('f-to').replace(',', '.')) || 0,
    beds: val('f-beds').split(/[^0-9]+/).filter(Boolean).map(Number),
    dev: val('f-dev'),
    scale: val('f-scale'),
    handover: val('f-hand'),
    yield: Number(val('f-yield').replace(',', '.')) || 0,
    growth: Number(val('f-growth').replace(',', '.')) || 0,
    hot: $('#f-hot').checked,
    desc: $('#f-desc').value.trim(),
    legal: val('f-legal'),
    address: val('f-address'),
    video: val('f-video'),
    tour: val('f-tour'),
    amenities: $('#f-amen').value.split(/\r?\n/).map(s => s.trim()).filter(Boolean),
    image: val('f-image'),
    thumb: val('f-image'),
    overview: $('#f-overview').value.trim(),
    density: val('f-density'),
    ownership: val('f-own'),
    contractor: val('f-contractor'),
    highlights: readRows('hlRows').map(r => ({ title: cell(r, 'title'), text: cell(r, 'text') })).filter(x => x.title || x.text),
    connections: readRows('connRows').map(r => ({ icon: cell(r, 'icon'), name: cell(r, 'name'), minutes: numCell(r, 'minutes') })).filter(x => x.name),
    amenitiesOut: $('#f-amen-out').value.split(/\r?\n/).map(s => s.trim()).filter(Boolean),
    floorplans: readRows('fpRows').map(r => ({ name: cell(r, 'name'), beds: numCell(r, 'beds'), area: numCell(r, 'area'), baths: numCell(r, 'baths'), price: numCell(r, 'price'), image: cell(r, 'image') })).filter(x => x.name),
    priceList: readRows('priceRows').map(r => ({ code: cell(r, 'code'), type: cell(r, 'type'), floor: numCell(r, 'floor'), dir: cell(r, 'dir'), area: numCell(r, 'area'), price: numCell(r, 'price'), sold: cell(r, 'sold') })).filter(x => x.code || x.type),
    policies: readRows('polRows').map(r => ({ value: cell(r, 'value'), text: cell(r, 'text') })).filter(x => x.value || x.text),
    payments: readRows('payRows').map(r => ({ step: cell(r, 'step'), amount: cell(r, 'amount') })).filter(x => x.step || x.amount),
    promo: $('#f-promo').value.trim(),
    progress: val('f-progress') === '' ? null : Number(val('f-progress').replace(',', '.')),
    progressAt: val('f-progress-at'),
    milestones: readRows('msRows').map(r => ({ title: cell(r, 'title'), when: cell(r, 'when'), done: cell(r, 'done'), image: cell(r, 'image') })).filter(x => x.title),
    loanRatio: Number(val('f-loan-ratio').replace(',', '.')) || 0,
    loanYears: Number(val('f-loan-years').replace(',', '.')) || 20,
    loanRate: Number(val('f-loan-rate').replace(',', '.')) || 0,
    faqs: readRows('faqRows').map(r => ({ q: cell(r, 'q'), a: cell(r, 'a') })).filter(x => x.q || x.a)
  };
  syncGalCats();
  const photos = ctx.gal.map((url, i) => ({ url: String(url).trim(), cat: ctx.galCats[i] || '' })).filter(x => x.url);
  item.gallery = photos.map(x => x.url);
  item.galleryCats = photos.map(x => x.cat);
  if (!item.name) return toast('Nhập tên dự án');
  const i = ctx.originalId ? db.projects.findIndex(p => p.id === ctx.originalId) : -1;
  if (i >= 0) db.projects[i] = item; else db.projects.push(item);
  try {
    await saveContent();
    routeGuard.dirty = false;
    const saved = db.projects.find(p => p.id === (item.id || ctx.originalId)) || db.projects.find(p => p.name === item.name);
    const next = '#/projects/' + encodeURIComponent(saved ? saved.id : item.id);
    if (location.hash === next) render();
    else location.hash = next;
  } catch (e) { if (!e.auth) toast(e.message); }
}

function renderNewsList() {
  setTitle('Tin tức');
  setActions('<a class="btn gold" href="#/news/edit">Thêm mới</a>');
  clearEditGuard();
  const items = db.news || [];
  const cats = [];
  items.forEach(n => { if (n.cat && cats.indexOf(n.cat) < 0) cats.push(n.cat); });
  const st = newsListState;
  view().innerHTML = `<div class="toolbar newsbar">
      <input id="q" placeholder="Tìm tiêu đề, chuyên mục, tóm tắt..." aria-label="Tìm tin" value="${esc(st.q)}">
      <select id="fCat" aria-label="Lọc chuyên mục"><option value="">Mọi chuyên mục</option>${cats.map(c => `<option value="${esc(c)}" ${st.cat === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select>
      <select id="fSort" aria-label="Sắp xếp">
        <option value="manual" ${st.sort === 'manual' ? 'selected' : ''}>Thứ tự hiện tại</option>
        <option value="date-desc" ${st.sort === 'date-desc' ? 'selected' : ''}>Ngày mới nhất</option>
        <option value="date-asc" ${st.sort === 'date-asc' ? 'selected' : ''}>Ngày cũ nhất</option>
        <option value="title" ${st.sort === 'title' ? 'selected' : ''}>Theo tiêu đề</option>
      </select>
      <span class="ncount" id="newsCount"></span>
    </div>
    <div class="nlist" id="nlist"></div>`;
  const paint = () => {
    st.q = ($('#q').value || '').trim();
    st.cat = $('#fCat').value;
    st.sort = $('#fSort').value;
    const q = st.q.toLowerCase();
    let rows = items.slice();
    if (st.sort === 'date-desc') rows.sort((a, b) => parseVNDate(b.date) - parseVNDate(a.date));
    else if (st.sort === 'date-asc') rows.sort((a, b) => parseVNDate(a.date) - parseVNDate(b.date));
    else if (st.sort === 'title') rows.sort((a, b) => String(a.title || '').localeCompare(String(b.title || ''), 'vi'));
    const vis = rows.filter(n => {
      if (st.cat && n.cat !== st.cat) return false;
      if (!q) return true;
      return [n.title, n.cat, n.date, n.excerpt].join(' ').toLowerCase().indexOf(q) >= 0;
    });
    $('#newsCount').textContent = items.length ? (vis.length + ' / ' + items.length + ' bài') : '0 bài';
    const box = $('#nlist');
    if (!items.length) {
      box.innerHTML = '<div class="empty">Chưa có bài viết. Bấm <b>Thêm mới</b> để đăng tin.</div>';
      return;
    }
    if (!vis.length) {
      box.innerHTML = '<div class="empty">Không tìm thấy bài viết phù hợp.</div>';
      return;
    }
    box.innerHTML = vis.map(n => {
      const ex = plainExcerpt(n.excerpt || n.body);
      const img = n.image ? `<img src="${esc(n.image)}" alt="">` : '<div class="nph">Không có ảnh</div>';
      return `<article class="nrow">
        <a class="nthumb" href="#/news/edit/${esc(n.id)}">${img}</a>
        <div class="nmain">
          <div class="nmeta">${catBadge(n.cat)}<time>${esc(n.date || '')}</time></div>
          <h3><a href="#/news/edit/${esc(n.id)}">${esc(n.title)}</a></h3>
          <p>${esc(ex)}</p>
        </div>
        <div class="rowact nacts">
          <a class="btn sm" href="#/news/edit/${esc(n.id)}">Sửa</a>
          <a class="btn sm ghost" target="_blank" rel="noopener" href="/tin-tuc-chi-tiet.html?id=${esc(n.id)}">Xem</a>
          ${moveButtons('news', n.id)}
        </div>
      </article>`;
    }).join('');
  };
  $('#q').oninput = paint;
  $('#fCat').onchange = paint;
  $('#fSort').onchange = paint;
  paint();
}

function renderNews(id) {
  const isNew = !id;
  const n = isNew ? { id: '', cat: db.newsCats[0] || 'Tin tức', title: '', date: todayVN(), excerpt: '', body: '', image: '' } : db.news.find(x => x.id === id);
  if (!n) { setTitle('Tin tức'); view().innerHTML = '<p class="empty">Không tìm thấy bài viết. <a href="#/news">← Quay lại danh sách</a></p>'; return; }
  ctx = { type: 'news', originalId: isNew ? '' : n.id };
  setTitle(isNew ? 'Thêm tin' : 'Sửa tin');
  setActions(`<a class="btn ghost" href="#/news" data-act="back-list" data-to="#/news">← Quay lại danh sách</a>`);
  view().innerHTML = `<p class="back"><a href="#/news" data-act="back-list" data-to="#/news">← Quay lại danh sách</a></p>
  <form id="editForm" class="news-edit">
    <div class="panel news-edit-main">
      ${fld('Tiêu đề', inp('f-title', n.title, 'required'))}
      ${fld('Tóm tắt (hiện ở danh sách, Enter để xuống dòng)', area('f-excerpt', n.excerpt, 4))}
      ${richBlock('f-body', n.body, 'Nội dung bài viết', 'Dán toàn bộ bài, dùng thanh công cụ để tạo tiêu đề, in đậm, danh sách, liên kết và ảnh. Bài cũ dạng thuần văn bản sẽ được chuyển thành đoạn văn khi mở.')}
    </div>
    <div class="panel news-edit-side">
      ${fld('Danh mục', `<input id="f-cat" list="catList" value="${esc(n.cat)}"><datalist id="catList">${options(db.newsCats, '')}</datalist>`)}
      ${fld('Ngày hiển thị', inp('f-date', n.date, 'placeholder="28/10/2026"'))}
      ${fld('Mã liên kết (để trống sẽ tạo từ tiêu đề)', inp('f-id', isNew ? '' : n.id))}
      ${coverBlock('f-image', n.image, 'Ảnh bìa')}
      <div class="formbar"><button class="btn gold" type="submit">Lưu</button><button class="btn ghost" type="button" data-act="back-list" data-to="#/news">Hủy</button>${isNew ? '' : `<a class="btn ghost" target="_blank" rel="noopener" href="/tin-tuc-chi-tiet.html?id=${esc(n.id)}">Xem</a>`}</div>
    </div>
  </form>`;
  wireRich(view());
  startEditGuard('#/news');
  $('#editForm').onsubmit = async e => {
    e.preventDefault();
    const item = { id: val('f-id'), title: val('f-title'), cat: val('f-cat') || 'Tin tức', date: val('f-date'), excerpt: $('#f-excerpt').value.replace(/^\s+|\s+$/g, ''), body: richVal('f-body'), image: val('f-image') };
    if (!item.title) return toast('Nhập tiêu đề');
    const i = ctx.originalId ? db.news.findIndex(x => x.id === ctx.originalId) : -1;
    if (i >= 0) db.news[i] = item; else db.news.unshift(item);
    try { await saveContent(); routeGuard.dirty = false; location.hash = '#/news'; } catch (err) { if (!err.auth) toast(err.message); }
  };
}

function linesOf(id) { return $('#' + id).value.split(/\r?\n/).map(s => s.trim()).filter(Boolean); }

function renderJobs() {
  clearEditGuard();
  listPage('Tuyển dụng', 'jobs', '#/jobs/edit', j => `<article class="row">
    <img alt="" src="">
    <div><b>${esc(j.title)}</b><small>${esc(j.place)} · ${esc(j.qty)} người · hạn ${esc(j.deadline)}</small></div>
    <em>${esc(j.salary)}</em>
    <div class="rowact"><a class="btn sm" href="#/jobs/edit/${esc(j.id)}">Sửa</a><a class="btn sm ghost" target="_blank" rel="noopener" href="/tuyen-dung-chi-tiet.html?id=${esc(j.id)}">Xem</a>${moveButtons('jobs', j.id)}</div>
  </article>`, 'Tìm vị trí...');
}

function renderJob(id) {
  const isNew = !id;
  const j = isNew ? { id: '', title: '', place: 'TP.HCM', qty: 1, salary: '', deadline: '', duties: [], requirements: [], benefits: [] } : db.jobs.find(x => x.id === id);
  if (!j) { setTitle('Tuyển dụng'); view().innerHTML = '<p class="empty">Không tìm thấy vị trí.</p>'; return; }
  ctx = { type: 'job', originalId: isNew ? '' : j.id };
  setTitle(isNew ? 'Thêm vị trí' : 'Sửa vị trí');
  setActions(`<a class="btn ghost" href="#/jobs" data-act="back-list" data-to="#/jobs">← Quay lại danh sách</a>`);
  const block = (fid, label, arr) => fld(label, area(fid, (arr || []).join('\n'), 5));
  view().innerHTML = `<p class="back"><a href="#/jobs" data-act="back-list" data-to="#/jobs">← Quay lại danh sách</a></p><form id="editForm" class="panel">
    ${fld('Chức danh', inp('f-title', j.title, 'required'))}
    ${fld('Mã liên kết', inp('f-id', isNew ? '' : j.id))}
    <div class="split">${fld('Nơi làm việc', inp('f-place', j.place))}${fld('Số lượng', inp('f-qty', j.qty, 'inputmode="numeric"'))}</div>
    <div class="split">${fld('Thu nhập', inp('f-salary', j.salary))}${fld('Hạn nộp', inp('f-deadline', j.deadline))}</div>
    <p class="hint">Mỗi dòng một ý. Để trống thì trang chi tiết dùng mô tả mặc định.</p>
    ${block('f-duties', 'Mô tả công việc', j.duties)}
    ${block('f-req', 'Yêu cầu', j.requirements)}
    ${block('f-ben', 'Quyền lợi', j.benefits)}
    <div class="formbar"><button class="btn gold" type="submit">Lưu vị trí</button><button class="btn ghost" type="button" data-act="back-list" data-to="#/jobs">Hủy</button></div>
  </form>`;
  $('#editForm').onsubmit = async e => {
    e.preventDefault();
    const item = { id: val('f-id'), title: val('f-title'), place: val('f-place'), qty: Number(val('f-qty')) || 1, salary: val('f-salary'), deadline: val('f-deadline'), duties: linesOf('f-duties'), requirements: linesOf('f-req'), benefits: linesOf('f-ben') };
    if (!item.title) return toast('Nhập chức danh');
    const i = ctx.originalId ? db.jobs.findIndex(x => x.id === ctx.originalId) : -1;
    if (i >= 0) db.jobs[i] = item; else db.jobs.push(item);
    try { await saveContent(); routeGuard.dirty = false; location.hash = '#/jobs'; } catch (err) { if (!err.auth) toast(err.message); }
  };
  startEditGuard('#/jobs');
}

function rowBtns() {
  return `<button type="button" class="icon" data-act="row-up" aria-label="Lên">↑</button><button type="button" class="icon" data-act="row-down" aria-label="Xuống">↓</button><button type="button" class="icon" data-act="row-del" aria-label="Xóa">✕</button>`;
}

function renderTeam() {
  setTitle('Ban lãnh đạo');
  setActions('');
  const rows = (db.team || []).map(teamRow).join('');
  view().innerHTML = `<form id="editForm"><p class="hint">Ảnh có thể dán liên kết hoặc tải từ máy. Thứ tự ở đây là thứ tự trên trang Giới thiệu.</p><div id="teamList" class="catlist">${rows}</div>
    <div class="formbar" style="margin-top:12px"><button type="button" class="btn" data-act="team-add">Thêm người</button><button class="btn gold" type="submit">Lưu đội ngũ</button></div></form>`;
  $('#editForm').onsubmit = async e => {
    e.preventDefault();
    db.team = [...document.querySelectorAll('#teamList .personrow')].map(row => ({
      name: row.querySelector('[data-k="name"]').value.trim(),
      role: row.querySelector('[data-k="role"]').value.trim(),
      image: row.querySelector('[data-k="image"]').value.trim()
    })).filter(t => t.name);
    try { await saveContent(); render(); } catch (err) { if (!err.auth) toast(err.message); }
  };
}

function teamRow(t) {
  t = t || {};
  const id = uid('timg');
  return `<div class="personrow"><div class="imgprev ${t.image ? '' : 'empty'}"><img id="${id}Prev" src="${esc(t.image || '')}" alt=""></div>
    <input data-k="name" value="${esc(t.name || '')}" placeholder="Họ tên">
    <input data-k="role" value="${esc(t.role || '')}" placeholder="Chức vụ">
    <input id="${id}" data-k="image" data-liveimg="${id}Prev" value="${esc(t.image || '')}" placeholder="Liên kết ảnh">
    <button type="button" class="btn sm" data-act="pick" data-for="${id}">Ảnh</button>
    <input type="file" hidden accept="image/*" data-file="${id}">
    ${rowBtns()}</div>`;
}

function renderFaq() {
  setTitle('FAQ');
  setActions('');
  const rows = (db.faq || []).map(f => `<div class="personrow" style="grid-template-columns:1fr auto auto auto">
    <div><input data-k="k" value="${esc((f.k || []).join(', '))}" placeholder="Từ khóa, cách nhau bởi dấu phẩy"><textarea class="grow" data-k="a" rows="3" placeholder="Câu trả lời. Có thể chèn HTML, ví dụ link.">${esc(f.a || '')}</textarea></div>
    ${rowBtns()}</div>`).join('');
  view().innerHTML = `<form id="editForm"><p class="hint">Từ khóa giúp trợ lý AI nhận câu hỏi. Câu trả lời hiện khi khách chat đúng chủ đề.</p><div id="faqList" class="catlist">${rows}</div>
    <div class="formbar" style="margin-top:12px"><button type="button" class="btn" data-act="faq-add">Thêm câu hỏi</button><button class="btn gold" type="submit">Lưu FAQ</button></div></form>`;
  $('#editForm').onsubmit = async e => {
    e.preventDefault();
    db.faq = [...document.querySelectorAll('#faqList .personrow')].map(row => ({
      k: row.querySelector('[data-k="k"]').value.split(',').map(s => s.trim()).filter(Boolean),
      a: row.querySelector('[data-k="a"]').value.trim()
    })).filter(f => f.a && f.k.length);
    try { await saveContent(); render(); } catch (err) { if (!err.auth) toast(err.message); }
  };
}

function catBox(id, values, countOf) {
  return `<div id="${id}" class="catlist">${values.map(v => {
    if (!countOf) return `<div class="catrow" data-old="${esc(v)}"><input value="${esc(v)}">${rowBtns()}</div>`;
    const n = countOf(v);
    return `<div class="catrow cnt ${n ? '' : 'zero'}" data-old="${esc(v)}" data-n="${n}"><input value="${esc(v)}"><small class="muted">${n ? n + ' dự án' : 'chưa có dự án'}</small>${rowBtns()}</div>`;
  }).join('')}</div>`;
}

function renderCategories() {
  setTitle('Danh mục');
  setActions('');
  const statuses = db.statuses.map(s => `<div class="catrow two" data-old="${esc(s.id)}"><input data-k="id" value="${esc(s.id)}" aria-label="Mã"><input data-k="label" value="${esc(s.label)}" aria-label="Tên">${rowBtns()}</div>`).join('');
  view().innerHTML = `<form id="editForm"><p class="hint">Đổi tên danh mục sẽ cập nhật các dự án / tin đang dùng tên cũ. Mục đang được dùng sẽ không bị xóa.</p>
    <div class="cols3">
      <div class="panel"><h3>Khu vực</h3><p class="hint">Khu vực chưa có dự án (viền cam) sẽ không hiện ở trang chủ.</p>${catBox('areas', db.areas, a => db.projects.filter(p => p.area === a).length)}<button type="button" class="btn sm" data-act="cat-add" data-list="areas" style="margin-top:8px">Thêm khu vực</button> <button type="button" class="btn sm ghost" data-act="area-prune" style="margin-top:8px">Xóa khu vực chưa có dự án</button></div>
      <div class="panel"><h3>Loại hình</h3>${catBox('types', db.types)}<button type="button" class="btn sm" data-act="cat-add" data-list="types" style="margin-top:8px">Thêm loại hình</button></div>
      <div class="panel"><h3>Chuyên mục tin</h3>${catBox('newsCats', db.newsCats)}<button type="button" class="btn sm" data-act="cat-add" data-list="newsCats" style="margin-top:8px">Thêm chuyên mục</button></div>
    </div>
    <div class="panel" style="margin-top:14px"><h3>Trạng thái dự án</h3><p class="hint">Cột trái là mã (dùng trong liên kết), cột phải là tên hiển thị.</p><div id="statuses" class="catlist">${statuses}</div>
      <button type="button" class="btn sm" data-act="status-add" style="margin-top:8px">Thêm trạng thái</button></div>
    <div class="formbar" style="margin-top:14px"><button class="btn gold" type="submit">Lưu danh mục</button></div></form>`;
  $('#editForm').onsubmit = e => { e.preventDefault(); saveCats(); };
}

function takeRows(id) {
  return [...document.querySelectorAll('#' + id + ' .catrow')].map(row => ({
    old: row.dataset.old || '',
    val: row.querySelector('input').value.trim()
  })).filter(x => x.val);
}

function applyRename(listKey, field, rows, collection) {
  const target = collection === 'news' ? db.news : db.projects;
  rows.forEach(r => {
    if (r.old && r.old !== r.val) target.forEach(item => { if (item[field] === r.old) item[field] = r.val; });
  });
  const next = [];
  const seen = new Set();
  rows.forEach(r => { if (!seen.has(r.val)) { seen.add(r.val); next.push(r.val); } });
  const used = (db[listKey] || []).filter(v => !seen.has(v) && target.some(item => item[field] === v));
  if (used.length) toast('Giữ vì đang dùng: ' + used.join(', '));
  db[listKey] = next.concat(used);
}

async function saveCats() {
  applyRename('areas', 'area', takeRows('areas'));
  applyRename('types', 'type', takeRows('types'));
  applyRename('newsCats', 'cat', takeRows('newsCats'), 'news');
  const statusRows = [...document.querySelectorAll('#statuses .catrow')].map(row => ({
    old: row.dataset.old || '',
    id: row.querySelector('[data-k="id"]').value.trim(),
    label: row.querySelector('[data-k="label"]').value.trim()
  })).filter(s => s.id && s.label);
  statusRows.forEach(s => {
    if (s.old && s.old !== s.id) db.projects.forEach(p => { if (p.status === s.old) p.status = s.id; });
  });
  const ids = new Set(statusRows.map(s => s.id));
  const kept = db.statuses.filter(s => !ids.has(s.id) && db.projects.some(p => p.status === s.id));
  if (kept.length) toast('Giữ trạng thái đang dùng: ' + kept.map(s => s.label).join(', '));
  db.statuses = statusRows.map(s => ({ id: s.id, label: s.label })).concat(kept);
  try { await saveContent(); render(); } catch (e) { if (!e.auth) toast(e.message); }
}

async function renderMedia() {
  setTitle('Thư viện ảnh');
  setActions('<button type="button" class="btn gold" data-act="media-add">Tải ảnh lên</button>');
  view().innerHTML = '<p class="muted">Đang tải...</p>';
  const res = await api('/api/media');
  if (keyOf() !== 'media') return;
  const files = res.files || [];
  view().innerHTML = `<p class="hint">Ảnh dùng chung. Bấm chép liên kết rồi dán vào dự án, tin hoặc đội ngũ. ${files.length ? '' : ''}</p>
    <input type="file" id="mediaFile" hidden accept="image/*" multiple>
    <div class="media">${files.map(f => `<article class="mitem"><img src="${esc(f.url)}" alt=""><div>
      <button type="button" class="btn sm" data-act="copy" data-url="${esc(f.url)}">Chép link</button>
      <button type="button" class="btn sm danger" data-act="media-del" data-name="${esc(f.name)}">Xóa</button>
    </div></article>`).join('') || '<p class="empty">Chưa có ảnh tải lên. Ảnh Unsplash sẵn có vẫn nằm trên từng dự án.</p>'}</div>`;
}

function histRow(h) {
  h = h || {};
  return `<div class="catrow two"><input data-k="year" value="${esc(h.year || '')}" placeholder="Năm"><input data-k="text" value="${esc(h.text || '')}" placeholder="Sự kiện">${rowBtns()}</div>`;
}

function renderAbout() {
  setTitle('Trang giới thiệu');
  setActions('');
  const a = db.about || {};
  view().innerHTML = `<form id="editForm" class="split">
    <div class="panel">
      <p class="hint">Enter trong các ô mô tả để xuống dòng, website sẽ hiện đúng như vậy.</p>
      ${fld('Tiêu đề', inp('f-title', a.title))}
      ${fld('Đoạn mở đầu (Enter để xuống dòng)', area('f-lead', a.lead, 8))}
      ${fld('Tiêu đề lịch sử', inp('f-ht', a.historyTitle))}
      <span class="fld"><span>Cột mốc</span></span>
      <div id="hist" class="catlist">${(a.history || []).map(histRow).join('')}</div>
      <button type="button" class="btn sm" data-act="hist-add" style="margin-top:8px">Thêm cột mốc</button>
      ${fld('Tầm nhìn', area('f-vision', a.vision, 3))}
      ${fld('Sứ mệnh', area('f-mission', a.mission, 3))}
      ${fld('Giá trị cốt lõi', area('f-values', a.values, 2))}
    </div>
    <div class="panel">${coverBlock('f-hero', a.heroImage || heroOf('about').image, 'Ảnh nền')}<p class="hint">Ảnh nền banner đầu trang Giới thiệu. Gỡ ảnh để dùng ảnh mặc định.</p>${coverBlock('f-image', a.image, 'Ảnh minh họa (mục lịch sử)')}</div>
    <div class="formbar"><button class="btn gold" type="submit">Lưu giới thiệu</button><a class="btn ghost" href="/gioi-thieu.html" target="_blank" rel="noopener">Xem trang</a></div>
  </form>`;
  $('#editForm').onsubmit = async e => {
    e.preventDefault();
    db.about = {
      title: val('f-title'),
      lead: $('#f-lead').value.trim(),
      historyTitle: val('f-ht'),
      history: [...document.querySelectorAll('#hist .catrow')].map(row => ({
        year: row.querySelector('[data-k="year"]').value.trim(),
        text: row.querySelector('[data-k="text"]').value.trim()
      })).filter(h => h.year || h.text),
      vision: $('#f-vision').value.trim(),
      mission: $('#f-mission').value.trim(),
      values: $('#f-values').value.trim(),
      image: val('f-image'),
      heroImage: val('f-hero')
    };
    db.settings = Object.assign({}, db.settings, { heroes: Object.assign({}, (db.settings && db.settings.heroes) || {}, { about: Object.assign({}, heroOf('about'), { title: db.about.title, subtitle: db.about.lead, image: db.about.heroImage }) }) });
    try { await saveContent(); } catch (err) { if (!err.auth) toast(err.message); }
  };
  autoGrow($('#f-lead'));
}

function statRow(s) {
  s = s || { n: 0, label: '' };
  return `<div class="catrow two"><input data-k="n" inputmode="numeric" value="${esc(s.n)}" placeholder="Số"><input data-k="label" value="${esc(s.label || '')}" placeholder="Nhãn, ví dụ Năm kinh nghiệm">${rowBtns()}</div>`;
}

const DEFAULT_LOGO_SVG = h => `<svg viewBox="0 0 40 40" width="${h}" height="${h}"><defs><linearGradient id="lg" x1="0" x2="1"><stop stop-color="#E8C877"/><stop offset="1" stop-color="#B8892F"/></linearGradient></defs><path d="M20 3 36 13v24H4V13z" fill="none" stroke="url(#lg)" stroke-width="2.5"/><path d="M13 30V17h3v5l5-5h4l-6 6 6 7h-4l-5-6v6z" fill="url(#lg)"/></svg>`;

function logoPanel(s) {
  const url = (s && s.logo) || '';
  return `<div id="logoBox" class="panel" style="margin:6px 0 16px">
    <h3>Logo &amp; nhận diện</h3>
    <p class="hint">Tải một file ảnh logo (PNG, SVG, JPG hoặc WebP, nền trong suốt càng tốt). Bấm <b>Dùng logo mặc định</b> để quay lại logo cũ. Nhớ bấm <b>Lưu cài đặt</b>.</p>
    <div class="logo-one">
      <div class="logo-prev"><div class="on-head" id="logoPrevHead"></div></div>
      <input type="hidden" id="f-logo" value="${esc(url)}">
      <div class="rowact">
        <button type="button" class="btn sm" data-act="pick" data-for="f-logo">Tải ảnh lên</button>
        <button type="button" class="btn sm ghost" data-act="logo-reset">Dùng logo mặc định</button>
      </div>
      <input type="file" hidden accept="image/*" data-file="f-logo">
    </div>
  </div>`;
}

function paintLogoPrev() {
  const head = $('#logoPrevHead');
  if (!head) return;
  const logo = ($('#f-logo') && $('#f-logo').value.trim()) || '';
  head.innerHTML = logo
    ? `<div class="lgo"><img src="${esc(logo)}" alt="Logo"></div>`
    : `<div class="lgo">${DEFAULT_LOGO_SVG(38)}<span>Khang Thịnh<b>LAND</b></span></div>`;
}

function renderSettings() {
  setTitle('Cài đặt');
  setActions('');
  const s = db.settings;
  view().innerHTML = `<form id="editForm" class="panel">
    <div class="split">${fld('Tên website', inp('f-site', s.siteName))}${fld('Tên công ty', inp('f-co', s.company))}</div>
    <div class="split">${fld('Hotline hiển thị', inp('f-hot', s.hotline))}${fld('Email', inp('f-mail', s.email))}</div>
    ${fld('Địa chỉ', inp('f-addr', s.address))}
    <div class="split">${fld('Giờ làm việc', inp('f-hours', s.hours))}${fld('Zalo (link)', inp('f-zalo', s.zalo))}</div>
    ${fld('Từ khóa bản đồ văn phòng', inp('f-map', s.mapQuery))}
    ${logoPanel(s)}
    ${heroPanel(s)}
    <h3>Số liệu trang chủ</h3>
    <div id="stats" class="catlist">${(s.stats || []).map(statRow).join('')}</div>
    <button type="button" class="btn sm" data-act="stat-add" style="margin:8px 0 16px">Thêm số liệu</button>
    <button class="btn gold" type="submit">Lưu cài đặt</button>
  </form>
  <form id="passForm" class="panel" style="margin-top:14px">
    <h3>Đổi mật khẩu quản trị</h3>
    ${fld('Mật khẩu hiện tại', '<input id="p-cur" type="password" autocomplete="current-password">')}
    ${fld('Mật khẩu mới', '<input id="p-next" type="password" autocomplete="new-password" minlength="6">')}
    ${fld('Nhập lại', '<input id="p-again" type="password" autocomplete="new-password" minlength="6">')}
    <button class="btn" type="submit">Đổi mật khẩu</button>
  </form>`;
  paintLogoPrev();
  $('#editForm').onsubmit = async e => {
    e.preventDefault();
    db.settings = Object.assign({}, db.settings, {
      siteName: val('f-site'),
      company: val('f-co'),
      hotline: val('f-hot'),
      email: val('f-mail'),
      address: val('f-addr'),
      hours: val('f-hours'),
      zalo: val('f-zalo'),
      mapQuery: val('f-map'),
      logo: val('f-logo'),
      heroes: readHeroes(),
      stats: [...document.querySelectorAll('#stats .catrow')].map(row => ({
        n: Number(row.querySelector('[data-k="n"]').value) || 0,
        label: row.querySelector('[data-k="label"]').value.trim()
      })).filter(x => x.label)
    });
    const ha = (db.settings.heroes || {}).about || {};
    if (ha.title || ha.subtitle || ha.image) {
      db.about = Object.assign({}, db.about, {
        title: ha.title || (db.about && db.about.title) || '',
        lead: ha.subtitle || (db.about && db.about.lead) || '',
        heroImage: ha.image || (db.about && db.about.heroImage) || ''
      });
    }
    try { await saveContent(); render(); } catch (err) { if (!err.auth) toast(err.message); }
  };
  $('#passForm').onsubmit = async e => {
    e.preventDefault();
    const next = $('#p-next').value;
    if (next !== $('#p-again').value) return toast('Mật khẩu nhập lại không khớp');
    try {
      await api('/api/password', { method: 'POST', body: { current: $('#p-cur').value, next } });
      e.target.reset();
      toast('Đã đổi mật khẩu');
    } catch (err) { if (!err.auth) toast(err.message); }
  };
}

function projectOf(id) {
  return (db.projects || []).find(p => p.id === id);
}

function leadProjectLink(l) {
  if (!l.projectId) return '<span class="muted">Chưa gắn dự án</span>';
  const href = '#/projects/' + encodeURIComponent(l.projectId);
  const p = projectOf(l.projectId);
  const img = (p && (p.thumb || p.image)) || '';
  const bits = [l.projectType || (p && p.type), l.projectArea || (p && p.area)].filter(Boolean).join(' · ');
  return `<a class="lead-proj" href="${href}">${img ? `<img src="${esc(img)}" alt="">` : '<i></i>'}<span><b>${esc(l.projectName || (p && p.name) || l.projectId)}</b>${bits ? `<small>${esc(bits)}</small>` : ''}</span></a>`;
}

function leadCard(l, hideProject) {
  const tel = String(l.phone || '').replace(/[^\d+]/g, '');
  const facts = [];
  const add = (k, html) => { if (html) facts.push(`<div><span>${k}</span><div>${html}</div></div>`); };
  add('Việc', esc(l.action || 'Gửi form'));
  if (l.unit) add('Căn giữ chỗ', esc(l.unit));
  if (l.need) add('Nhu cầu', esc(l.need));
  if (l.visitDate || l.visitTime) add('Lịch xem', esc([l.visitDate, l.visitTime].filter(Boolean).join(' · ')));
  if (l.msg) add('Lời nhắn', esc(l.msg));
  if (l.jobTitle) {
    const href = l.jobId ? '/tuyen-dung-chi-tiet.html?id=' + encodeURIComponent(l.jobId) : '';
    add('Vị trí tuyển', href ? `<a href="${href}" target="_blank" rel="noopener">${esc(l.jobTitle)}</a>` : esc(l.jobTitle));
  }
  if (l.cv) add('CV', /^https?:\/\//i.test(l.cv) ? `<a href="${esc(l.cv)}" target="_blank" rel="noopener">Mở hồ sơ</a>` : esc(l.cv));
  if (l.page) add('Trang khách đã gửi', `<a href="${esc(l.page)}" target="_blank" rel="noopener">${esc(l.page)}</a>`);
  const proj = hideProject ? '' : `<div class="proj">${leadProjectLink(l)}${l.projectId ? `<a class="btn sm" href="#/projects/${encodeURIComponent(l.projectId)}">Mở dự án trong quản trị</a>` : ''}</div>`;
  return `<article class="leadcard" data-project="${esc(l.projectId || '')}">
    <header><div><b>${esc(l.name || 'Khách')}</b><div class="who">${tel ? `<a href="tel:${esc(tel)}">${esc(l.phone)}</a>` : ''}${l.email ? `<a href="mailto:${esc(l.email)}">${esc(l.email)}</a>` : ''}</div></div><time>${esc(fmtTime(l.time))}</time></header>
    ${proj}
    <div class="facts">${facts.join('')}</div>
    <div><button type="button" class="btn sm danger" data-act="lead-del" data-id="${esc(l.id)}">Xóa phiếu</button></div>
  </article>`;
}

async function renderLeads() {
  setTitle('Khách gửi form');
  setActions('<button type="button" class="btn danger" data-act="leads-clear">Xóa tất cả</button>');
  view().innerHTML = '<p class="muted">Đang tải...</p>';
  const res = await api('/api/leads');
  if (keyOf() !== 'leads') return;
  const leads = (res.leads || []).slice().sort((a, b) => String(b.time || '').localeCompare(String(a.time || '')));
  if (!leads.length) {
    view().innerHTML = '<p class="empty">Chưa có dữ liệu. Form trên website sẽ đổ về đây khi chạy bằng node server.js.</p>';
    return;
  }
  const projects = [];
  leads.forEach(l => { if (l.projectId && !projects.some(p => p.id === l.projectId)) projects.push({ id: l.projectId, name: l.projectName || l.projectId }); });
  view().innerHTML = `<div class="leadbar"><label>Dự án <select id="leadFilter" aria-label="Lọc theo dự án"><option value="">Tất cả (${leads.length})</option>${projects.map(p => `<option value="${esc(p.id)}">${esc(p.name)}</option>`).join('')}<option value="__none">Chưa gắn dự án</option></select></label></div><div class="leads">${leads.map(leadCard).join('')}</div>`;
  $('#leadFilter').onchange = () => {
    const v = $('#leadFilter').value;
    document.querySelectorAll('.leadcard').forEach(card => {
      const id = card.dataset.project || '';
      card.hidden = v === '__none' ? !!id : !!(v && id !== v);
    });
  };
}

function render() {
  ctx = { type: '', gal: [] };
  const parts = (location.hash || '#/dashboard').replace(/^#\//, '').split('/');
  const key = parts[0] || 'dashboard';
  $('#nav').innerHTML = NAV.map(([k, label]) => `<a href="#/${k}" class="${k === key ? 'on' : ''}">${label}</a>`).join('');
  if (key === 'projects' && parts[1] === 'edit') {
    const eid = decodeURIComponent(parts.slice(2).join('/'));
    if (eid) { location.hash = '#/projects/' + encodeURIComponent(eid); return; }
    return renderProject('');
  }
  if (key === 'projects' && parts[1]) return renderProjectDesk(decodeURIComponent(parts.slice(1).join('/')));
  if (key === 'news' && parts[1] === 'edit') return renderNews(decodeURIComponent(parts.slice(2).join('/')));
  if (key === 'jobs' && parts[1] === 'edit') return renderJob(decodeURIComponent(parts.slice(2).join('/')));
  const pages = { dashboard: renderDashboard, projects: renderProjects, news: renderNewsList, jobs: renderJobs, team: renderTeam, faq: renderFaq, categories: renderCategories, media: renderMedia, about: renderAbout, settings: renderSettings, leads: renderLeads };
  Promise.resolve((pages[key] || renderDashboard)()).catch(err => {
    if (err && !err.auth) view().innerHTML = `<p class="empty">${esc(err.message || 'Lỗi')}</p>`;
  });
}

async function uploadOne(file) {
  const fd = new FormData();
  fd.append('file', file);
  const res = await api('/api/upload', { method: 'POST', body: fd });
  return res.url;
}

function swap(arr, a, b) { const t = arr[a]; arr[a] = arr[b]; arr[b] = t; }

document.body.addEventListener('click', async e => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const act = el.dataset.act;
  if (act === 'pick') {
    const input = document.querySelector(`[data-file="${el.dataset.for}"]`);
    if (input) input.click();
    return;
  }
  if (act === 'clear-img') {
    const input = document.getElementById(el.dataset.for);
    if (input) { input.value = ''; input.dispatchEvent(new Event('input', { bubbles: true })); }
    return;
  }
  if (act === 'gal-add') { const f = $('#galFile'); if (f) f.click(); return; }
  if (act === 'gal-url') {
    const url = prompt('Dán liên kết ảnh');
    if (url && url.trim()) { ctx.gal.push(url.trim()); paintGal(); }
    return;
  }
  if (act === 'gal-up' || act === 'gal-down' || act === 'gal-del') {
    const i = +el.dataset.i;
    syncGalCats();
    if (act === 'gal-del') { ctx.gal.splice(i, 1); ctx.galCats.splice(i, 1); }
    if (act === 'gal-up' && i > 0) { swap(ctx.gal, i, i - 1); swap(ctx.galCats, i, i - 1); }
    if (act === 'gal-down' && i < ctx.gal.length - 1) { swap(ctx.gal, i, i + 1); swap(ctx.galCats, i, i + 1); }
    paintGal();
    return;
  }
  if (act === 'sec-add') {
    const box = document.getElementById(el.dataset.box);
    if (box) box.insertAdjacentHTML('beforeend', blankSectionRow(el.dataset.kind));
    return;
  }
  if (act === 'row-del') { const row = el.closest('.catrow, .personrow, .srow'); if (row) row.remove(); return; }
  if (act === 'row-up' || act === 'row-down') {
    const row = el.closest('.catrow, .personrow, .srow');
    if (!row) return;
    if (act === 'row-up' && row.previousElementSibling) row.parentNode.insertBefore(row, row.previousElementSibling);
    if (act === 'row-down' && row.nextElementSibling) row.parentNode.insertBefore(row.nextElementSibling, row);
    return;
  }
  if (act === 'cat-add') {
    const list = document.getElementById(el.dataset.list);
    if (list) list.insertAdjacentHTML('beforeend', `<div class="catrow" data-old=""><input value="" placeholder="Tên mới">${rowBtns()}</div>`);
    return;
  }
  if (act === 'status-add') {
    $('#statuses').insertAdjacentHTML('beforeend', `<div class="catrow two" data-old=""><input data-k="id" placeholder="ma-trang-thai"><input data-k="label" placeholder="Tên hiển thị">${rowBtns()}</div>`);
    return;
  }
  if (act === 'team-add') { $('#teamList').insertAdjacentHTML('beforeend', teamRow({})); return; }
  if (act === 'faq-add') {
    $('#faqList').insertAdjacentHTML('beforeend', `<div class="personrow" style="grid-template-columns:1fr auto auto auto"><div><input data-k="k" placeholder="Từ khóa, cách nhau bởi dấu phẩy"><textarea class="grow" data-k="a" rows="3" placeholder="Câu trả lời"></textarea></div>${rowBtns()}</div>`);
    return;
  }
  if (act === 'hist-add') { $('#hist').insertAdjacentHTML('beforeend', histRow({})); return; }
  if (act === 'back-list') {
    e.preventDefault();
    leaveTo(el.dataset.to || routeGuard.backTo);
    return;
  }
  if (act === 'logo-reset') {
    const i = document.getElementById('f-logo');
    if (i) { i.value = ''; i.dispatchEvent(new Event('input', { bubbles: true })); }
    paintLogoPrev();
    toast('Đã chọn logo mặc định. Bấm Lưu cài đặt để áp dụng.');
    return;
  }
  if (act === 'area-prune') {
    const rows = [...document.querySelectorAll('#areas .catrow[data-n="0"]')];
    rows.forEach(r => r.remove());
    toast(rows.length ? 'Đã bỏ ' + rows.length + ' khu vực trống. Bấm Lưu danh mục để lưu.' : 'Không có khu vực trống.');
    return;
  }
  if (act === 'stat-add') { $('#stats').insertAdjacentHTML('beforeend', statRow({ n: 0, label: '' })); return; }
  if (act === 'media-add') { const f = $('#mediaFile'); if (f) f.click(); return; }
  if (act === 'copy') {
    try { await navigator.clipboard.writeText(el.dataset.url); toast('Đã chép liên kết'); }
    catch (err) { prompt('Liên kết ảnh', el.dataset.url); }
    return;
  }
  if (act === 'logout') {
    try { await api('/api/logout', { method: 'POST', body: {} }); } catch (err) { /* vẫn thoát màn hình */ }
    location.href = '/admin/';
    location.reload();
    return;
  }
  if (act === 'up' || act === 'down' || act === 'del') {
    const list = db[el.dataset.list];
    if (!list) return;
    const i = list.findIndex(x => x.id === el.dataset.id);
    if (i < 0) return;
    if (act === 'del') {
      const item = list[i];
      if (!confirm('Xóa "' + (item.name || item.title) + '"?')) return;
      list.splice(i, 1);
    } else {
      const j = i + (act === 'up' ? -1 : 1);
      if (j < 0 || j >= list.length) return;
      const [it] = list.splice(i, 1);
      list.splice(j, 0, it);
    }
    try { await saveContent(); render(); } catch (err) { if (!err.auth) toast(err.message); }
    return;
  }
  if (act === 'media-del') {
    if (!confirm('Xóa file ảnh này?')) return;
    try {
      await api('/api/media?name=' + encodeURIComponent(el.dataset.name), { method: 'DELETE' });
      toast('Đã xóa ảnh');
      render();
    } catch (err) { if (!err.auth) toast(err.message); }
    return;
  }
  if (act === 'lead-del') {
    try { await api('/api/leads?id=' + encodeURIComponent(el.dataset.id), { method: 'DELETE' }); render(); }
    catch (err) { if (!err.auth) toast(err.message); }
    return;
  }
  if (act === 'leads-clear') {
    if (!confirm('Xóa toàn bộ khách đã gửi?')) return;
    try { await api('/api/leads', { method: 'DELETE' }); render(); }
    catch (err) { if (!err.auth) toast(err.message); }
  }
});

document.body.addEventListener('change', async e => {
  const f = e.target;
  if (f.dataset && f.dataset.file) {
    const file = f.files && f.files[0];
    f.value = '';
    if (!file) return;
    try {
      const url = await uploadOne(file);
      const box = document.getElementById(f.dataset.file);
      if (box) { box.value = url; box.dispatchEvent(new Event('input', { bubbles: true })); }
      toast('Đã tải ảnh');
    } catch (err) { if (!err.auth) toast(err.message); }
    return;
  }
  if (f.id === 'galFile') {
    const files = [...f.files];
    f.value = '';
    for (const file of files) {
      try { ctx.gal.push(await uploadOne(file)); }
      catch (err) { if (!err.auth) toast(err.message); }
    }
    paintGal();
    return;
  }
  if (f.id === 'mediaFile') {
    const files = [...f.files];
    f.value = '';
    try {
      for (const file of files) await uploadOne(file);
      toast('Đã tải ảnh');
      render();
    } catch (err) { if (!err.auth) toast(err.message); }
  }
});

document.body.addEventListener('input', e => {
  const t = e.target;
  if (t.closest && t.closest('#logoBox')) setTimeout(paintLogoPrev);
  if (t.dataset && t.dataset.gc != null) ctx.galCats[+t.dataset.gc] = t.value.trim();
  if (t.dataset && t.dataset.gi != null) {
    ctx.gal[+t.dataset.gi] = t.value.trim();
    const img = t.closest('.gitem') && t.closest('.gitem').querySelector('img');
    if (img) img.src = t.value.trim();
  }
  if (t.dataset && t.dataset.liveimg) {
    const img = document.getElementById(t.dataset.liveimg);
    const wrap = img && img.parentElement;
    if (img) img.src = t.value.trim();
    if (wrap) wrap.classList.toggle('empty', !t.value.trim());
  }
});

async function enter() {
  const res = await api('/api/content');
  db = res.content;
  $('#loginView').hidden = true;
  $('#app').hidden = false;
  routeGuard.lastHash = location.hash;
  if (!location.hash) location.hash = '#/dashboard';
  else render();
}

$('#loginForm').onsubmit = async e => {
  e.preventDefault();
  $('#loginErr').textContent = '';
  const fd = new FormData(e.target);
  try {
    await api('/api/login', { method: 'POST', body: { username: fd.get('username'), password: fd.get('password') } });
    await enter();
  } catch (err) {
    $('#loginErr').textContent = err.message || 'Không đăng nhập được';
  }
};

window.addEventListener('hashchange', () => {
  if (!confirmLeave()) {
    routeGuard.bypass = true;
    location.hash = routeGuard.lastHash;
    return;
  }
  routeGuard.lastHash = location.hash;
  if (db) render();
});

document.addEventListener('click', e => {
  if (e.defaultPrevented) return;
  const a = e.target.closest && e.target.closest('a[href]');
  if (!a || a.target === '_blank' || a.getAttribute('data-act') === 'back-list') return;
  const href = a.getAttribute('href') || '';
  if (href.charAt(0) !== '#' || !routeGuard.dirty || href === location.hash) return;
  e.preventDefault();
  e.stopPropagation();
  leaveTo(href);
}, true);

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape' || !routeGuard.backTo) return;
  e.preventDefault();
  leaveTo(routeGuard.backTo);
});

window.addEventListener('beforeunload', e => {
  if (!routeGuard.dirty) return;
  e.preventDefault();
  e.returnValue = '';
});

api('/api/me').then(enter).catch(err => {
  showLogin();
  if (err.network) $('#loginErr').textContent = err.message;
});
