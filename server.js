/* Khang Thịnh Land – server local (Node.js, không cần npm install).
   Chạy: node server.js
   Website: http://127.0.0.1:8080
   Quản trị: http://127.0.0.1:8080/admin/
   Dữ liệu: data/content.json  →  sinh ra js/data.js
   Ảnh tải lên: uploads/ */
'use strict';

const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');

const ROOT = __dirname;
const DATA = path.join(ROOT, 'data');
const UPLOADS = path.join(ROOT, 'uploads');
const CONTENT = path.join(DATA, 'content.json');
const AUTH = path.join(DATA, 'auth.json');
const LEADS = path.join(DATA, 'leads.json');
const PORT = Number(process.env.PORT) || 8080;
const sessions = new Map();

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2'
};

function slugify(s) {
  const out = String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return out || 'muc';
}

function uniq(list) {
  const out = [];
  const seen = new Set();
  list.forEach(item => {
    const v = String(item || '').trim();
    if (!v || seen.has(v)) return;
    seen.add(v);
    out.push(v);
  });
  return out;
}

function lines(v) {
  if (Array.isArray(v)) return v.map(s => String(s).trim()).filter(Boolean);
  return String(v || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
}

function assignIds(items, nameKey) {
  const seen = new Set();
  items.forEach(it => {
    let id = slugify(it.id || it[nameKey] || 'muc');
    const base = id;
    let n = 2;
    while (seen.has(id)) id = base + '-' + (n++);
    it.id = id;
    seen.add(id);
  });
}

function textOf(v) {
  return String(v == null ? '' : v).trim();
}

function numOf(v) {
  const n = Number(String(v == null ? '' : v).replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
}

function rowsOf(v) {
  return Array.isArray(v) ? v.filter(x => x && typeof x === 'object') : [];
}

function buildSections(p) {
  const isLand = !p.beds.length;
  const isApt = p.type === 'Căn hộ' || p.type === 'Condotel';
  const photos = p.gallery.length ? p.gallery : (p.image ? [p.image] : ['']);
  const gAt = i => photos[((i % photos.length) + photos.length) % photos.length];
  const beds = isLand ? [0, 1, 2] : p.beds;
  const floorplans = beds.map((b, i, a) => {
    const t = a.length > 1 ? i / (a.length - 1) : 0;
    const area = isLand ? 80 + i * 20 : (isApt ? 38 + b * 24 : 90 + b * 35);
    const name = isLand ? ['Nền tiêu chuẩn', 'Nền rộng', 'Nền góc'][i] : isApt ? (b === 1 ? '1PN / Studio' : b + ' phòng ngủ') : (p.type + ' ' + b + 'PN');
    return {
      name,
      beds: b,
      area,
      baths: isLand ? 0 : Math.max(1, b - (b > 2 ? 1 : 0)),
      price: Math.round((p.priceFrom + (p.priceTo - p.priceFrom) * t * 0.85) * 100) / 100,
      image: gAt(i + 2)
    };
  });
  const dirs = ['Đông Nam', 'Tây Bắc', 'Đông Bắc', 'Tây Nam', 'Nam', 'Bắc'];
  let seed = String(p.id || '').length * 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const priceList = [];
  for (let k = 0; k < 18; k++) {
    const u = floorplans[k % floorplans.length];
    const floor = isApt ? 3 + Math.floor(rnd() * 35) : 1 + Math.floor(rnd() * 3);
    const dir = dirs[Math.floor(rnd() * 6)];
    const price = u.price * (1 + (isApt ? floor * 0.004 : 0) + (dir.indexOf('Nam') >= 0 ? 0.03 : 0) + rnd() * 0.05);
    const code = isApt
      ? 'A' + String(floor).padStart(2, '0') + '.' + String(1 + Math.floor(rnd() * 12)).padStart(2, '0')
      : (isLand ? 'L' : 'V') + (k + 1);
    priceList.push({
      code,
      type: u.name,
      floor,
      dir,
      area: u.area + Math.round(rnd() * 8),
      price: Math.round(price * 100) / 100,
      sold: rnd() < 0.25
    });
  }
  const progress = p.status === 'da-ban-giao' ? 100 : p.status === 'dang-mo-ban' ? 58 : 12;
  const cats = ['Phối cảnh', 'Tiện ích', 'Nhà mẫu', 'Thực tế'];
  return {
    overview: (p.desc ? p.desc + ' ' : '') + 'Dự án được quy hoạch đồng bộ, hướng tới cộng đồng cư dân văn minh với hệ tiện ích chuẩn resort và kết nối thuận tiện tới các trục giao thông huyết mạch.',
    density: isLand ? '55%' : '28%',
    ownership: p.type === 'Condotel' ? '50 năm' : 'Lâu dài (người Việt)',
    contractor: 'Tổng thầu xây dựng hạng A',
    highlights: [
      { title: 'Tầm nhìn', text: 'Đa hướng, thoáng vĩnh viễn' },
      { title: 'Kết nối', text: '5 phút đến trục chính' },
      { title: 'Thiết kế', text: 'Kiến trúc xanh, đạt chuẩn EDGE' },
      { title: 'Lợi suất', text: p.yield ? ('~' + p.yield + '%/năm') : ('Tăng giá ~' + p.growth + '%/năm') }
    ],
    connections: [
      { icon: '🚇', name: 'Ga Metro / trục giao thông chính', minutes: 5 },
      { icon: '🏫', name: 'Trường quốc tế', minutes: 7 },
      { icon: '🏥', name: 'Bệnh viện đa khoa', minutes: 10 },
      { icon: '🛍️', name: 'Trung tâm thương mại', minutes: 8 },
      { icon: '🏢', name: 'Trung tâm hành chính ' + (p.area || ''), minutes: 15 },
      { icon: '✈️', name: 'Sân bay', minutes: 30 }
    ],
    amenitiesOut: [
      '🏫 Trường học các cấp',
      '🏥 Bệnh viện quốc tế',
      '🛒 Siêu thị – TTTM',
      '🌊 Công viên ven sông',
      '🏛️ Trung tâm hành chính',
      '🚌 Bến xe buýt – Metro',
      '⛳ Sân golf',
      '🏦 Ngân hàng'
    ],
    floorplans,
    priceList,
    policies: [
      { value: '30%', text: 'Thanh toán đến khi nhận nhà' },
      { value: '70%', text: 'Ngân hàng hỗ trợ vay' },
      { value: '0%', text: 'Lãi suất trong 18 tháng' },
      { value: '9%', text: 'Chiết khấu thanh toán sớm' }
    ],
    payments: [
      { step: 'Ký thỏa thuận đặt cọc', amount: '10%' },
      { step: 'Ký HĐMB (30 ngày)', amount: '20%' },
      { step: 'Đợt 3–6 (3 tháng/đợt)', amount: '5%/đợt' },
      { step: 'Nhận bàn giao', amount: '25%' },
      { step: 'Nhận sổ hồng', amount: '5%' }
    ],
    promo: 'Tặng gói nội thất 150 triệu và miễn 2 năm phí quản lý cho 20 khách đầu tiên.',
    progress,
    progressAt: '10/2026',
    milestones: [
      ['Khởi công', 'Q1/2025', true],
      ['Hoàn thiện móng & hầm', 'Q3/2025', true],
      ['Thi công phần thân', 'Q2/2026', progress >= 50],
      ['Cất nóc', 'Q4/2026', progress >= 70],
      ['Hoàn thiện & bàn giao', p.handover || '', progress >= 100]
    ].map((row, i) => ({ title: row[0], when: row[1], done: !!row[2], image: gAt(i + 3) })),
    galleryCats: p.gallery.map((_, i) => cats[i % cats.length]),
    loanRatio: 70,
    loanYears: 20,
    loanRate: 9.5,
    faqs: [
      { q: 'Pháp lý dự án hiện tại thế nào?', a: (p.legal || (p.name + ' đã có quy hoạch 1/500, giấy phép xây dựng và bảo lãnh ngân hàng.')) + ' Khang Thịnh Land gửi bản tóm tắt pháp lý khi khách yêu cầu.' },
      { q: 'Ngân hàng hỗ trợ vay bao nhiêu?', a: 'Tối đa 70% giá trị sản phẩm, thời hạn đến 25 năm, ân hạn nợ gốc 12–24 tháng và hỗ trợ lãi suất 0% trong 18 tháng.' },
      { q: 'Khi nào bàn giao? Bàn giao tiêu chuẩn gì?', a: 'Dự kiến bàn giao ' + (p.handover || 'theo tiến độ chủ đầu tư') + ', hoàn thiện cơ bản nội thất liền tường, thiết bị vệ sinh và bếp cao cấp.' },
      { q: 'Người nước ngoài có được mua không?', a: 'Người nước ngoài được sở hữu căn hộ trong hạn mức pháp luật cho phép (tối đa 30% số căn của tòa, thời hạn 50 năm, có thể gia hạn).' },
      { q: 'Phí quản lý bao nhiêu?', a: p.type === 'Đất nền' ? 'Đất nền không phát sinh phí quản lý căn hộ. Phí bảo trì hạ tầng khu dân cư được thông báo theo quy chế ban quản lý.' : 'Phí quản lý dự kiến 12.000 – 18.000 đ/m²/tháng, tùy loại hình và khối tiện ích.' },
      { q: 'Có cam kết cho thuê không?', a: p.yield ? ('Lợi suất cho thuê tham khảo khu vực ~' + p.yield + '%/năm. Liên hệ để nhận phương án cho thuê chi tiết.') : 'Đất nền chủ yếu đầu tư tăng giá; chuyên viên sẽ tư vấn phương án khai thác.' }
    ]
  };
}

function cleanSections(p, gallery) {
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const progress = p.progress === '' || p.progress == null ? null : clamp(Math.round(numOf(p.progress)), 0, 100);
  let galleryCats = Array.isArray(p.galleryCats) ? p.galleryCats.map(textOf) : [];
  while (galleryCats.length < gallery.length) galleryCats.push('');
  galleryCats = galleryCats.slice(0, gallery.length);
  return {
    overview: textOf(p.overview),
    density: textOf(p.density),
    ownership: textOf(p.ownership),
    contractor: textOf(p.contractor),
    highlights: rowsOf(p.highlights).map(h => ({ title: textOf(h.title), text: textOf(h.text) })).filter(h => h.title || h.text),
    connections: rowsOf(p.connections).map(c => ({ icon: textOf(c.icon) || '📍', name: textOf(c.name), minutes: Math.max(0, Math.round(numOf(c.minutes))) })).filter(c => c.name),
    amenitiesOut: lines(p.amenitiesOut),
    floorplans: rowsOf(p.floorplans).map(u => ({
      name: textOf(u.name),
      beds: Math.round(numOf(u.beds)),
      area: Math.round(numOf(u.area)),
      baths: Math.round(numOf(u.baths)),
      price: Math.round(numOf(u.price) * 100) / 100,
      image: textOf(u.image)
    })).filter(u => u.name),
    priceList: rowsOf(p.priceList).map(u => ({
      code: textOf(u.code),
      type: textOf(u.type),
      floor: Math.round(numOf(u.floor)),
      dir: textOf(u.dir),
      area: Math.round(numOf(u.area)),
      price: Math.round(numOf(u.price) * 100) / 100,
      sold: u.sold === true || u.sold === 'true' || u.sold === 1 || u.sold === '1'
    })).filter(u => u.code || u.type),
    policies: rowsOf(p.policies).map(x => ({ value: textOf(x.value), text: textOf(x.text) })).filter(x => x.value || x.text),
    payments: rowsOf(p.payments).map(x => ({ step: textOf(x.step), amount: textOf(x.amount) })).filter(x => x.step || x.amount),
    promo: textOf(p.promo),
    progress,
    progressAt: textOf(p.progressAt),
    milestones: rowsOf(p.milestones).map(x => ({ title: textOf(x.title), when: textOf(x.when), done: x.done === true || x.done === 'true' || x.done === 1, image: textOf(x.image) })).filter(x => x.title),
    galleryCats,
    loanRatio: clamp(Math.round(numOf(p.loanRatio == null ? 70 : p.loanRatio)), 0, 90),
    loanYears: clamp(Math.round(numOf(p.loanYears == null ? 20 : p.loanYears)) || 20, 1, 35),
    loanRate: Math.round(numOf(p.loanRate == null ? 9.5 : p.loanRate) * 10) / 10,
    faqs: rowsOf(p.faqs).map(x => ({ q: textOf(x.q), a: textOf(x.a) })).filter(x => x.q || x.a)
  };
}


const HERO_PAGE_IDS = ['about', 'projects', 'news', 'jobs', 'contact', 'finance', 'compare', 'quiz'];

function looksHtml(s) {
  return /<[a-z][\s\S]*>/i.test(String(s || ''));
}

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function safeUrl(u, kind) {
  const raw = String(u || '').trim();
  if (!raw) return '';
  const lower = raw.toLowerCase();
  if (lower.indexOf('javascript:') === 0 || lower.indexOf('vbscript:') === 0) return '';
  if (lower.indexOf('data:text/html') === 0) return '';
  if (kind === 'img') {
    if (/^https?:\/\//i.test(raw) || raw.charAt(0) === '/' || raw.indexOf('./') === 0 || raw.indexOf('../') === 0) return raw;
    if (lower.indexOf('data:image/') === 0) return raw;
    return '';
  }
  if (/^(https?:|mailto:|tel:)/i.test(raw) || raw.charAt(0) === '#' || raw.charAt(0) === '/') return raw;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(raw)) return raw;
  return '';
}

const ALLOWED_TAGS = {
  p: [], h2: [], h3: [], h4: [], strong: [], b: [], em: [], i: [], u: [],
  ul: [], ol: [], li: [], br: [], blockquote: [], hr: [],
  a: ['href', 'target', 'rel'],
  img: ['src', 'alt'],
  table: [], thead: [], tbody: [], tfoot: [], tr: [],
  th: ['colspan', 'rowspan'], td: ['colspan', 'rowspan']
};

function sanitizeHtml(input) {
  let html = String(input || '');
  if (!html.trim()) return '';
  html = html.replace(/<!--[\s\S]*?-->/g, '');
  html = html.replace(/<\s*(script|style|iframe|object|embed|form|input|button|textarea|svg|math|link|meta|base|video|audio|source|noscript)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '');
  html = html.replace(/<\s*(script|style|iframe|object|embed|form|input|button|textarea|svg|math|link|meta|base|video|audio|source|noscript)\b[^>]*\/?\s*>/gi, '');
  html = html.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, function (m, name) {
    const close = /^\s*<\s*\//.test(m);
    const tag = name.toLowerCase();
    if (!Object.prototype.hasOwnProperty.call(ALLOWED_TAGS, tag)) return '';
    if (close) return '</' + tag + '>';
    const attrsSrc = m.replace(/^<\/?[a-zA-Z][a-zA-Z0-9]*\b/, '').replace(/\/?\s*>$/, '');
    let out = '<' + tag;
    const allowed = ALLOWED_TAGS[tag];
    const attrRe = /([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
    let a, seen = {};
    while ((a = attrRe.exec(attrsSrc))) {
      const an = a[1].toLowerCase();
      if (an.charAt(0) === 'on' || an === 'style' || an === 'class' || an.indexOf('xmlns') === 0) continue;
      if (allowed.indexOf(an) < 0) continue;
      if (seen[an]) continue;
      seen[an] = true;
      let val = a[2] != null ? a[2] : (a[3] != null ? a[3] : (a[4] != null ? a[4] : ''));
      if (an === 'href') { val = safeUrl(val, 'href'); if (!val) continue; }
      else if (an === 'src') { val = safeUrl(val, 'img'); if (!val) continue; }
      else if (an === 'target') { if (val !== '_blank' && val !== '_self') continue; }
      else if (an === 'rel') { val = 'noopener noreferrer'; }
      else if (an === 'colspan' || an === 'rowspan') { if (!/^[0-9]{1,2}$/.test(String(val))) continue; }
      else if (an === 'alt') { val = String(val).slice(0, 200); }
      out += ' ' + an + '="' + String(val).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;') + '"';
    }
    if (tag === 'a' && !seen.href) return '';
    if (tag === 'a') out += ' rel="noopener noreferrer"';
    if (tag === 'img' && !/\ssrc="/.test(out)) return '';
    return out + '>';
  });
  return html;
}

function richOrPlain(v) {
  const s = String(v == null ? '' : v);
  if (!s.trim()) return '';
  return looksHtml(s) ? sanitizeHtml(s) : s;
}

function normalizeHeroes(raw) {
  const src = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  const out = {};
  HERO_PAGE_IDS.forEach(k => {
    const h = src[k] && typeof src[k] === 'object' ? src[k] : {};
    out[k] = {
      title: String(h.title || '').replace(/^\s+|\s+$/g, ''),
      subtitle: String(h.subtitle || '').replace(/^\s+|\s+$/g, ''),
      image: String(h.image || '').trim()
    };
  });
  return out;
}

function normalize(input) {
  const c = input && typeof input === 'object' && !Array.isArray(input) ? input : {};
  const settings = Object.assign({
    siteName: 'Khang Thịnh Land',
    company: 'CÔNG TY CP KHANG THỊNH LAND',
    hotline: '0900 000 000',
    email: 'info@khangthinhland.com',
    address: 'Tầng 10, Tòa nhà Khang Thịnh, TP. Thủ Đức, TP.HCM',
    hours: '8:00 – 20:00, T2 – CN',
    zalo: 'https://zalo.me/0900000000',
    mapQuery: 'Thu Duc, Ho Chi Minh',
    stats: [
      { n: 12, label: 'Năm kinh nghiệm' },
      { n: 45, label: 'Dự án phân phối' },
      { n: 18500, label: 'Khách hàng' },
      { n: 1200, label: 'Chuyên viên' }
    ]
  }, c.settings || {});
  settings.hotline = String(settings.hotline || '').trim() || '0900 000 000';
  settings.hotlineTel = String(settings.hotline).replace(/\D/g, '');
  settings.email = String(settings.email || '').trim();
  settings.address = String(settings.address || '').trim();
  settings.hours = String(settings.hours || '').trim();
  settings.zalo = String(settings.zalo || '').trim();
  settings.company = String(settings.company || '').trim();
  settings.siteName = String(settings.siteName || '').trim() || 'Khang Thịnh Land';
  settings.mapQuery = String(settings.mapQuery || '').trim() || settings.address;
  /* Logo & nhận diện: thiếu trường (dữ liệu cũ) => dùng logo SVG mặc định */
  settings.logo = String(settings.logo || '').trim();
  settings.logoFooter = String(settings.logoFooter || '').trim();
  settings.favicon = String(settings.favicon || '').trim();
  settings.logoText = settings.logoText !== false;
  settings.logoName = settings.logoName == null ? 'Khang Thịnh' : String(settings.logoName).trim();
  settings.logoSub = settings.logoSub == null ? 'LAND' : String(settings.logoSub).trim();
  const logoH = Math.round(Number(settings.logoHeight));
  settings.logoHeight = logoH >= 20 && logoH <= 120 ? logoH : 38;
  settings.heroes = normalizeHeroes(settings.heroes);
  settings.stats = (Array.isArray(settings.stats) ? settings.stats : []).slice(0, 8).map(s => ({
    n: Number(s && s.n) || 0,
    label: String((s && s.label) || '').trim()
  })).filter(s => s.label);

  const rawStatuses = (Array.isArray(c.statuses) && c.statuses.length ? c.statuses : [
    { id: 'dang-mo-ban', label: 'Đang mở bán' },
    { id: 'sap-mo-ban', label: 'Sắp mở bán' },
    { id: 'da-ban-giao', label: 'Đã bàn giao' }
  ]);
  const statusMap = {};
  const seenStatus = new Set();
  const statuses = [];
  rawStatuses.forEach(s => {
    const src = String((s && (s.id || s.label)) || '').trim();
    let id = slugify(src);
    const base = id;
    let n = 2;
    while (seenStatus.has(id)) id = base + '-' + (n++);
    seenStatus.add(id);
    const label = String((s && s.label) || src || id).trim() || id;
    statuses.push({ id, label });
    if (src) statusMap[src] = id;
    statusMap[id] = id;
  });

  let projects = (Array.isArray(c.projects) ? c.projects : []).map(p => {
    const gallery = (Array.isArray(p.gallery) ? p.gallery : []).map(x => String(x).trim()).filter(Boolean);
    const image = String(p.image || '').trim() || gallery[0] || '';
    const beds = Array.isArray(p.beds)
      ? p.beds.map(Number).filter(n => !Number.isNaN(n))
      : String(p.beds || '').split(/[^0-9]+/).filter(Boolean).map(Number);
    const base = {
      id: String(p.id || ''),
      name: String(p.name || '').trim(),
      area: String(p.area || '').trim(),
      type: String(p.type || '').trim(),
      status: String(p.status || ''),
      priceFrom: Number(p.priceFrom) || 0,
      priceTo: Number(p.priceTo) || 0,
      beds,
      dev: String(p.dev || '').trim(),
      scale: String(p.scale || '').trim(),
      handover: String(p.handover || '').trim(),
      yield: Number(p.yield) || 0,
      growth: Number(p.growth) || 0,
      hot: !!p.hot,
      desc: String(p.desc || '').trim(),
      legal: String(p.legal || '').trim(),
      address: String(p.address || '').trim(),
      video: String(p.video || '').trim(),
      tour: String(p.tour || '').trim(),
      amenities: lines(p.amenities),
      image,
      thumb: String(p.thumb || '').trim() || image,
      gallery
    };
    const sections = Array.isArray(p.connections) ? cleanSections(p, gallery) : buildSections(base);
    return Object.assign(base, sections);
  }).filter(p => p.name);
  projects.forEach(p => {
    if (statusMap[p.status]) p.status = statusMap[p.status];
    if (!statuses.some(s => s.id === p.status)) p.status = statuses[0].id;
  });
  assignIds(projects, 'name');

  const areas = uniq([].concat(c.areas || [], projects.map(p => p.area)));
  const types = uniq([].concat(c.types || [], projects.map(p => p.type)));

  let news = (Array.isArray(c.news) ? c.news : []).map(n => ({
    id: String(n.id || ''),
    cat: String(n.cat || '').trim() || 'Tin tức',
    title: String(n.title || '').trim(),
    date: String(n.date || '').trim(),
    excerpt: String(n.excerpt || '').trim(),
    body: richOrPlain(n.body),
    image: String(n.image || '').trim()
  })).filter(n => n.title);
  assignIds(news, 'title');
  const newsCats = uniq([].concat(c.newsCats || [], news.map(n => n.cat)));

  let jobs = (Array.isArray(c.jobs) ? c.jobs : []).map(j => ({
    id: String(j.id || ''),
    title: String(j.title || '').trim(),
    place: String(j.place || '').trim(),
    qty: Number(j.qty) || 1,
    salary: String(j.salary || '').trim(),
    deadline: String(j.deadline || '').trim(),
    duties: lines(j.duties),
    requirements: lines(j.requirements),
    benefits: lines(j.benefits)
  })).filter(j => j.title);
  assignIds(jobs, 'title');

  const team = (Array.isArray(c.team) ? c.team : []).map(t => ({
    name: String(t.name || '').trim(),
    role: String(t.role || '').trim(),
    image: String(t.image || '').trim()
  })).filter(t => t.name);

  const faq = (Array.isArray(c.faq) ? c.faq : []).map(f => ({
    k: Array.isArray(f.k) ? f.k.map(s => String(s).trim()).filter(Boolean) : lines(String(f.k || '').split(',').join('\n')),
    a: String(f.a || '').trim()
  })).filter(f => f.a && f.k.length);

  const aboutIn = c.about || {};
  const about = {
    title: String(aboutIn.title || 'Về Khang Thịnh Land'),
    lead: String(aboutIn.lead || ''),
    historyTitle: String(aboutIn.historyTitle || ''),
    history: (Array.isArray(aboutIn.history) ? aboutIn.history : []).map(h => ({
      year: String((h && h.year) || '').trim(),
      text: String((h && h.text) || '').trim()
    })).filter(h => h.year || h.text),
    image: String(aboutIn.image || '').trim(),
    vision: String(aboutIn.vision || ''),
    mission: String(aboutIn.mission || ''),
    values: String(aboutIn.values || ''),
    heroImage: String(aboutIn.heroImage || '')
      .trim() || (settings.heroes.about && settings.heroes.about.image) || ''
  };
  if (about.heroImage) settings.heroes.about.image = settings.heroes.about.image || about.heroImage;

  return { settings, statuses, areas, types, newsCats, projects, news, jobs, team, faq, about };
}

function writeAtomic(file, text) {
  const tmp = file + '.tmp';
  fs.writeFileSync(tmp, text);
  try { if (fs.existsSync(file)) fs.unlinkSync(file); } catch (e) { /* rename sẽ ghi đè nếu xóa không được */ }
  fs.renameSync(tmp, file);
}

function writeDataJs(c) {
  const status = {};
  c.statuses.forEach(s => { status[s.id] = s.label; });
  const body = [
    '/* Sinh bởi admin Node (server.js). Sửa nội dung tại /admin */',
    'const U = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;',
    'const STATUS = ' + JSON.stringify(status, null, 1) + ';',
    'const PROJECTS = ' + JSON.stringify(c.projects, null, 1) + ';',
    'const AREAS = ' + JSON.stringify(c.areas, null, 1) + ';',
    'const TYPES = ' + JSON.stringify(c.types, null, 1) + ';',
    'const NEWS = ' + JSON.stringify(c.news, null, 1) + ';',
    'const JOBS = ' + JSON.stringify(c.jobs, null, 1) + ';',
    'const TEAM = ' + JSON.stringify(c.team, null, 1) + ';',
    'const FAQ = ' + JSON.stringify(c.faq, null, 1) + ';',
    'const SITE = ' + JSON.stringify(c.settings, null, 1) + ';',
    'const ABOUT = ' + JSON.stringify(c.about, null, 1) + ';',
    'window.SITE = SITE;',
    'window.ABOUT = ABOUT;',
    'if (window.AI_CONFIG) { window.AI_CONFIG.hotline = SITE.hotline; window.AI_CONFIG.zalo = SITE.zalo; }',
    ''
  ].join('\n');
  writeAtomic(path.join(ROOT, 'js', 'data.js'), body);
}

function saveContent(c) {
  fs.mkdirSync(DATA, { recursive: true });
  if (fs.existsSync(CONTENT)) fs.copyFileSync(CONTENT, path.join(DATA, 'content.backup.json'));
  writeAtomic(CONTENT, JSON.stringify(c, null, 2));
  writeDataJs(c);
}

function loadLegacy() {
  const code = fs.readFileSync(path.join(ROOT, 'js', 'data.js'), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(code + `
    this.__d = {
      STATUS: STATUS,
      PROJECTS: PROJECTS,
      NEWS: NEWS,
      JOBS: JOBS,
      TEAM: TEAM.map(function (t) { return { name: t.name, role: t.role, image: t.image || (t.img ? U(t.img, 500) : '') }; }),
      FAQ: FAQ,
      AREAS: AREAS,
      TYPES: TYPES
    };
  `, sandbox, { filename: 'data.js' });
  return sandbox.__d;
}

function seedFromLegacy() {
  const d = loadLegacy();
  const duties = [
    'Tư vấn, chăm sóc khách hàng quan tâm dự án do công ty phân phối',
    'Sử dụng hệ thống CRM & công cụ AI nội bộ để quản lý khách hàng',
    'Phối hợp marketing tổ chức sự kiện mở bán'
  ];
  const requirements = [
    'Tốt nghiệp Cao đẳng trở lên, ưu tiên kinh nghiệm BĐS',
    'Kỹ năng giao tiếp, đàm phán tốt; chủ động, cầu tiến'
  ];
  const benefits = [
    'Hoa hồng hấp dẫn, thưởng nóng theo giao dịch',
    'Đào tạo bài bản, lộ trình thăng tiến rõ ràng',
    'BHXH đầy đủ, du lịch hằng năm'
  ];
  const content = normalize({
    statuses: Object.entries(d.STATUS || {}).map(([id, label]) => ({ id, label })),
    areas: d.AREAS || [],
    types: d.TYPES || [],
    newsCats: uniq((d.NEWS || []).map(n => n.cat)),
    projects: d.PROJECTS || [],
    news: (d.NEWS || []).map(n => ({
      id: n.id,
      cat: n.cat,
      title: n.title,
      date: n.date,
      excerpt: n.excerpt || '',
      image: n.image || '',
      body: n.body || [
        n.excerpt || '',
        'Diễn biến chính',
        'Đây là nội dung bài viết. Sửa toàn bộ phần này trong trang quản trị.',
        'Góc nhìn chuyên gia',
        'Người mua để ở nên cân nhắc khả năng tài chính, kế hoạch trả nợ và tiến độ bàn giao; nhà đầu tư nên đánh giá lợi suất cho thuê và tiềm năng hạ tầng khu vực.'
      ].filter(Boolean).join('\n\n')
    })),
    jobs: (d.JOBS || []).map(j => ({
      id: j.id,
      title: j.title,
      place: j.place,
      qty: j.qty,
      salary: j.salary,
      deadline: j.deadline,
      duties: j.duties && j.duties.length ? j.duties : duties,
      requirements: j.requirements && j.requirements.length ? j.requirements : requirements,
      benefits: j.benefits && j.benefits.length ? j.benefits : benefits
    })),
    team: d.TEAM || [],
    faq: d.FAQ || [],
    about: {
      title: 'Về Khang Thịnh Land',
      lead: 'Nhà phân phối bất động sản chuyên nghiệp, ứng dụng công nghệ & AI vào mọi điểm chạm khách hàng.',
      historyTitle: 'Hơn một thập kỷ kiến tạo giá trị',
      history: [
        { year: '2014', text: 'Thành lập tại TP.HCM với 20 chuyên viên.' },
        { year: '2017', text: 'Trở thành đại lý F1 của nhiều chủ đầu tư lớn.' },
        { year: '2020', text: 'Mở chi nhánh Hà Nội, Đà Nẵng; vượt 10.000 khách hàng.' },
        { year: '2024', text: 'Ra mắt nền tảng CRM & dữ liệu khách hàng.' },
        { year: '2026', text: 'Ứng dụng AI thực chiến: trợ lý chat, tư vấn tìm nhà, phân tích đầu tư.' }
      ],
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=75',
      vision: 'Trở thành nhà phân phối BĐS ứng dụng công nghệ hàng đầu Việt Nam đến 2030.',
      mission: 'Giúp mỗi khách hàng ra quyết định an cư & đầu tư đúng đắn, minh bạch, dựa trên dữ liệu.',
      values: 'Chính trực · Chuyên nghiệp · Tận tâm · Đổi mới.'
    }
  });
  return content;
}

function loadContent() {
  fs.mkdirSync(DATA, { recursive: true });
  fs.mkdirSync(UPLOADS, { recursive: true });
  if (!fs.existsSync(CONTENT)) {
    const legacy = path.join(DATA, 'data.legacy.js');
    if (!fs.existsSync(legacy) && fs.existsSync(path.join(ROOT, 'js', 'data.js'))) {
      fs.copyFileSync(path.join(ROOT, 'js', 'data.js'), legacy);
    }
    const content = seedFromLegacy();
    saveContent(content);
    return content;
  }
  const content = normalize(JSON.parse(fs.readFileSync(CONTENT, 'utf8')));
  writeDataJs(content);
  return content;
}

function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 32).toString('hex');
}

function ensureAuth() {
  fs.mkdirSync(DATA, { recursive: true });
  if (fs.existsSync(AUTH)) return { created: false };
  const salt = crypto.randomBytes(16).toString('hex');
  const auth = { username: 'admin', salt, passwordHash: hashPassword('admin123', salt) };
  fs.writeFileSync(AUTH, JSON.stringify(auth, null, 2));
  return { created: true };
}

function loadAuth() {
  return JSON.parse(fs.readFileSync(AUTH, 'utf8'));
}

function checkPassword(password, auth) {
  const hash = crypto.scryptSync(String(password || ''), auth.salt, 32);
  const saved = Buffer.from(auth.passwordHash, 'hex');
  return saved.length === hash.length && crypto.timingSafeEqual(saved, hash);
}

function readCookies(req) {
  const out = {};
  String(req.headers.cookie || '').split(';').forEach(part => {
    const i = part.indexOf('=');
    if (i < 1) return;
    try { out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim()); } catch (e) { /* bỏ cookie hỏng */ }
  });
  return out;
}

function getSession(req) {
  const token = readCookies(req).kt_admin;
  if (!token) return null;
  const s = sessions.get(token);
  if (!s) return null;
  if (s.exp < Date.now()) { sessions.delete(token); return null; }
  return s;
}

function setCookie(res, token) {
  const value = token
    ? 'kt_admin=' + token + '; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800'
    : 'kt_admin=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0';
  res.setHeader('Set-Cookie', value);
}

function send(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    let done = false;
    req.on('data', chunk => {
      if (done) return;
      size += chunk.length;
      if (size > limit) {
        done = true;
        const err = new Error('Dữ liệu quá lớn');
        err.status = 413;
        reject(err);
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => { if (!done) { done = true; resolve(Buffer.concat(chunks)); } });
    req.on('error', err => { if (!done) { done = true; reject(err); } });
  });
}

async function readJson(req, limit) {
  const buf = await readBody(req, limit || 6e6);
  if (!buf.length) return {};
  try { return JSON.parse(buf.toString('utf8')); }
  catch (e) {
    const err = new Error('JSON không hợp lệ');
    err.status = 400;
    throw err;
  }
}

function parseMultipart(buf, boundary) {
  const parts = [];
  const open = Buffer.from('--' + boundary);
  const sep = Buffer.from('\r\n--' + boundary);
  let i = buf.indexOf(open);
  if (i < 0) return parts;
  i += open.length;
  while (i < buf.length) {
    if (buf[i] === 45 && buf[i + 1] === 45) break;
    if (buf[i] === 13 && buf[i + 1] === 10) i += 2;
    const headerEnd = buf.indexOf('\r\n\r\n', i);
    if (headerEnd < 0) break;
    const raw = buf.toString('utf8', i, headerEnd);
    const dataStart = headerEnd + 4;
    const next = buf.indexOf(sep, dataStart);
    if (next < 0) break;
    const name = /name="([^"]*)"/.exec(raw);
    const file = /filename="([^"]*)"/.exec(raw);
    parts.push({
      name: name ? name[1] : '',
      filename: file ? file[1] : '',
      data: buf.subarray(dataStart, next)
    });
    i = next + sep.length;
  }
  return parts;
}

function readLeads() {
  if (!fs.existsSync(LEADS)) return [];
  try { return JSON.parse(fs.readFileSync(LEADS, 'utf8')); }
  catch (e) { return []; }
}

function clip(v, n) { return String(v || '').slice(0, n); }

function leadMeta(source, body) {
  const src = String(source || '');
  const tail = src.includes(':') ? src.slice(src.lastIndexOf(':') + 1) : '';
  const projects = (content && content.projects) || [];
  const jobs = (content && content.jobs) || [];
  let projectId = clip(body && body.projectId, 80);
  if (!projects.some(p => p.id === projectId)) projectId = '';
  if (!projectId && projects.some(p => p.id === tail)) projectId = tail;
  const project = projects.find(p => p.id === projectId);
  const job = src.startsWith('ung-tuyen:') ? jobs.find(j => j.id === tail) : null;
  const hold = /^giu-cho-can-([^:]+)/.exec(src);
  let action = 'Gửi form';
  if (src.startsWith('bao-gia')) action = 'Nhận báo giá';
  else if (src.startsWith('dat-lich')) action = 'Đặt lịch xem nhà';
  else if (src.startsWith('giu-cho')) action = 'Giữ chỗ';
  else if (src.startsWith('nhan-mat-bang')) action = 'Nhận mặt bằng';
  else if (src.startsWith('tai-')) action = 'Tải tài liệu';
  else if (src.startsWith('lien-he')) action = 'Liên hệ';
  else if (src === 'hero' || src === 'cta-home') action = 'Đăng ký trang chủ';
  else if (src.startsWith('tin-tuc')) action = 'Nhận tin & bảng giá';
  else if (src.startsWith('quiz')) action = 'Quiz tìm nhà';
  else if (src.startsWith('chatbot')) action = 'Chat AI';
  else if (src.startsWith('ung-tuyen')) action = 'Ứng tuyển';
  return {
    projectId: project ? project.id : '',
    projectName: project ? project.name : clip(body && body.projectName, 160),
    projectArea: project ? project.area : '',
    projectType: project ? project.type : '',
    action,
    unit: hold ? hold[1] : clip(body && body.unit, 80),
    jobId: job ? job.id : '',
    jobTitle: job ? job.title : ''
  };
}

function presentLead(lead) {
  const meta = leadMeta(lead.source, lead);
  return Object.assign({}, lead, meta, {
    projectName: meta.projectName || lead.projectName || '',
    jobTitle: meta.jobTitle || lead.jobTitle || ''
  });
}

let content = null;

async function handleApi(req, res, pathname, url) {
  if (req.method === 'POST' && pathname === '/api/login') {
    const body = await readJson(req, 1e5);
    const auth = loadAuth();
    const username = String(body.username || '');
    if (username !== auth.username || !checkPassword(body.password, auth)) {
      return send(res, 401, { error: 'Sai tài khoản hoặc mật khẩu' });
    }
    const token = crypto.randomBytes(24).toString('hex');
    sessions.set(token, { exp: Date.now() + 7 * 864e5 });
    setCookie(res, token);
    return send(res, 200, { ok: true, username: auth.username });
  }

  if (req.method === 'POST' && pathname === '/api/logout') {
    const token = readCookies(req).kt_admin;
    if (token) sessions.delete(token);
    setCookie(res, '');
    return send(res, 200, { ok: true });
  }

  if (req.method === 'GET' && pathname === '/api/me') {
    if (!getSession(req)) return send(res, 401, { error: 'Chưa đăng nhập' });
    return send(res, 200, { ok: true, username: loadAuth().username });
  }

  if (req.method === 'POST' && pathname === '/api/leads') {
    const body = await readJson(req, 1e5);
    const leads = readLeads();
    const source = clip(body.source, 160);
    const meta = leadMeta(source, body);
    leads.push({
      id: crypto.randomBytes(8).toString('hex'),
      time: new Date().toISOString(),
      name: clip(body.name, 120),
      phone: clip(body.phone, 40),
      email: clip(body.email, 160),
      need: clip(body.need, 160),
      msg: clip(body.msg || body.note, 2000),
      note: clip(body.note, 2000),
      cv: clip(body.cv, 400),
      visitDate: clip(body.visitDate || body.date, 40),
      visitTime: clip(body.visitTime, 80),
      source,
      page: clip(body.page, 300),
      projectId: meta.projectId,
      projectName: meta.projectName,
      unit: meta.unit,
      jobId: meta.jobId,
      jobTitle: clip(body.jobTitle, 160) || meta.jobTitle
    });
    writeAtomic(LEADS, JSON.stringify(leads.slice(-500), null, 2));
    return send(res, 200, { ok: true });
  }

  if (!getSession(req)) return send(res, 401, { error: 'Chưa đăng nhập' });

  if (req.method === 'GET' && pathname === '/api/content') return send(res, 200, { content });

  if (req.method === 'PUT' && pathname === '/api/content') {
    const body = await readJson(req, 8e6);
    if (!body || typeof body !== 'object' || Array.isArray(body)) return send(res, 400, { error: 'Dữ liệu không hợp lệ' });
    content = normalize(body);
    saveContent(content);
    return send(res, 200, { ok: true, content });
  }

  if (req.method === 'POST' && pathname === '/api/upload') {
    const ct = req.headers['content-type'] || '';
    const found = /boundary=(?:"([^"]+)"|([^;]+))/i.exec(ct);
    if (!found) return send(res, 400, { error: 'Thiếu file' });
    const buf = await readBody(req, 9e6);
    const parts = parseMultipart(buf, (found[1] || found[2] || '').trim());
    const file = parts.find(p => p.filename);
    if (!file || !file.data.length) return send(res, 400, { error: 'Thiếu file ảnh' });
    let ext = path.extname(file.filename).toLowerCase();
    if (ext === '.jpeg') ext = '.jpg';
    const ok = ['.jpg', '.png', '.webp', '.gif', '.svg', '.avif'];
    if (!ok.includes(ext)) return send(res, 400, { error: 'Chỉ nhận ảnh jpg, png, webp, gif, svg, avif' });
    const name = Date.now().toString(36) + '-' + crypto.randomBytes(4).toString('hex') + ext;
    fs.mkdirSync(UPLOADS, { recursive: true });
    fs.writeFileSync(path.join(UPLOADS, name), file.data);
    return send(res, 200, { ok: true, name, url: '/uploads/' + name });
  }

  if (req.method === 'GET' && pathname === '/api/media') {
    fs.mkdirSync(UPLOADS, { recursive: true });
    const files = fs.readdirSync(UPLOADS).filter(n => fs.statSync(path.join(UPLOADS, n)).isFile()).map(name => {
      const st = fs.statSync(path.join(UPLOADS, name));
      return { name, url: '/uploads/' + name, size: st.size, time: st.mtimeMs };
    }).sort((a, b) => b.time - a.time);
    return send(res, 200, { files });
  }

  if (req.method === 'DELETE' && pathname === '/api/media') {
    const name = path.basename(url.searchParams.get('name') || '');
    if (!name) return send(res, 400, { error: 'Thiếu tên file' });
    const file = path.join(UPLOADS, name);
    if (!file.startsWith(UPLOADS)) return send(res, 400, { error: 'Sai đường dẫn' });
    if (!fs.existsSync(file)) return send(res, 404, { error: 'Không thấy file' });
    fs.unlinkSync(file);
    return send(res, 200, { ok: true });
  }

  if (req.method === 'GET' && pathname === '/api/leads') {
    return send(res, 200, { leads: readLeads().slice().reverse().map(presentLead) });
  }

  if (req.method === 'DELETE' && pathname === '/api/leads') {
    const id = url.searchParams.get('id');
    if (!id) writeAtomic(LEADS, '[]');
    else writeAtomic(LEADS, JSON.stringify(readLeads().filter(l => l.id !== id), null, 2));
    return send(res, 200, { ok: true });
  }

  if (req.method === 'POST' && pathname === '/api/password') {
    const body = await readJson(req, 1e5);
    const auth = loadAuth();
    if (!checkPassword(body.current, auth)) return send(res, 400, { error: 'Mật khẩu hiện tại không đúng' });
    const next = String(body.next || '');
    if (next.length < 6) return send(res, 400, { error: 'Mật khẩu mới tối thiểu 6 ký tự' });
    auth.passwordHash = hashPassword(next, auth.salt);
    fs.writeFileSync(AUTH, JSON.stringify({ username: auth.username, salt: auth.salt, passwordHash: auth.passwordHash }, null, 2));
    return send(res, 200, { ok: true });
  }

  send(res, 404, { error: 'Không có API này' });
}

function serveStatic(req, res, pathname) {
  if (pathname === '/admin') {
    res.writeHead(302, { Location: '/admin/' });
    res.end();
    return;
  }
  let rel = pathname;
  if (rel.endsWith('/')) rel += 'index.html';
  if (rel === '/data' || rel.startsWith('/data/')) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }
  const file = path.normalize(path.join(ROOT, rel));
  const rootOk = file === ROOT || file.startsWith(ROOT + path.sep);
  if (!rootOk) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    const notFound = path.join(ROOT, '404.html');
    if (!pathname.startsWith('/admin') && fs.existsSync(notFound)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(notFound).pipe(res);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }
  const ext = path.extname(file).toLowerCase();
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
    'X-Content-Type-Options': 'nosniff'
  });
  if (req.method === 'HEAD') { res.end(); return; }
  fs.createReadStream(file).pipe(res);
}

const server = http.createServer((req, res) => {
  let pathname = '/';
  let url;
  try {
    url = new URL(req.url, 'http://127.0.0.1');
    pathname = decodeURIComponent(url.pathname);
  } catch (e) {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }
  const run = pathname.startsWith('/api/') ? handleApi(req, res, pathname, url) : Promise.resolve(serveStatic(req, res, pathname));
  Promise.resolve(run).catch(err => {
    if (res.headersSent || req.destroyed) return;
    const code = err.status || 500;
    if (code === 500) console.error(err);
    send(res, code, { error: code === 500 ? 'Lỗi server' : err.message });
  });
});

const fresh = ensureAuth();
content = loadContent();
server.on('error', err => {
  if (err.code === 'EADDRINUSE') console.error('Cổng ' + PORT + ' đang được dùng. Chạy lại với cổng khác, ví dụ: set PORT=8090&& node server.js');
  else console.error(err);
  process.exit(1);
});
function lanAddresses() {
  const ips = [];
  const nets = os.networkInterfaces();
  Object.keys(nets).forEach(name => {
    (nets[name] || []).forEach(net => {
      if ((net.family === 'IPv4' || net.family === 4) && !net.internal) ips.push(net.address);
    });
  });
  return ips;
}

server.listen(PORT, '0.0.0.0', () => {
  console.log('Website:  http://127.0.0.1:' + PORT);
  console.log('Quản trị: http://127.0.0.1:' + PORT + '/admin/');
  lanAddresses().forEach(ip => {
    console.log('Cùng mạng: http://' + ip + ':' + PORT);
    console.log('Quản trị:  http://' + ip + ':' + PORT + '/admin/');
  });
  if (fresh.created) console.log('Đăng nhập lần đầu: admin / admin123');
});
