/* Khang Thịnh Land – layout chung + render từng trang theo <body data-page> */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const qs = k => new URLSearchParams(location.search).get(k);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function site() {
  const cfg = window.AI_CONFIG || {};
  const s = Object.assign({
    siteName: 'Khang Thịnh Land',
    company: 'CÔNG TY CP KHANG THỊNH LAND',
    hotline: cfg.hotline || '0900 000 000',
    email: 'info@khangthinhland.com',
    address: 'Tầng 10, Tòa nhà Khang Thịnh, TP. Thủ Đức, TP.HCM',
    hours: '8:00 – 20:00, T2 – CN',
    zalo: cfg.zalo || '#',
    mapQuery: 'Thu Duc, Ho Chi Minh',
    stats: []
  }, window.SITE || {});
  s.hotlineTel = String(s.hotline || '').replace(/\D/g, '');
  return s;
}
const NAV = [['index.html', 'Trang chủ'], ['gioi-thieu.html', 'Giới thiệu'], ['du-an.html', 'Dự án', [
  ...Object.entries(STATUS).map(([id, label]) => ['du-an.html?status=' + encodeURIComponent(id), label]),
  ...TYPES.map(t => ['du-an.html?type=' + encodeURIComponent(t), t])
]],
 ['tu-van-ai.html', 'AI thực chiến', [['tu-van-ai.html', 'AI tư vấn tìm nhà'], ['cong-cu-tai-chinh.html', 'Công cụ tài chính'], ['so-sanh.html', 'So sánh dự án'], ['#chat', 'Chat với trợ lý AI']]], ['tin-tuc.html', 'Tin tức'], ['tuyen-dung.html', 'Tuyển dụng'], ['lien-he.html', 'Liên hệ']];
const LOGO = `<a href="index.html" class="logo"><svg viewBox="0 0 40 40" width="38" height="38"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#E8C877"/><stop offset="1" stop-color="#B8892F"/></linearGradient></defs><path d="M20 3 36 13v24H4V13z" fill="none" stroke="url(#g)" stroke-width="2.5"/><path d="M13 30V17h3v5l5-5h4l-6 6 6 7h-4l-5-6v6z" fill="url(#g)"/></svg><span>Khang Thịnh<b>LAND</b></span></a>`;
function card(p) {
  return `<article class="pcard reveal"><a href="du-an-chi-tiet.html?id=${p.id}" class="pimg"><img loading="lazy" src="${p.thumb}" alt="${p.name}"><span class="badge s-${p.status}">${STATUS[p.status]}</span>${p.hot ? '<span class="hot">HOT</span>' : ''}</a>
  <div class="pbody"><small>${p.type} · ${p.area}</small><h3><a href="du-an-chi-tiet.html?id=${p.id}">${p.name}</a></h3><p>${p.desc}</p>
  <div class="pmeta"><span>${p.beds && p.beds.length ? p.beds.join('–') + ' PN' : 'Nền đất'}</span><span>Bàn giao: ${p.handover}</span></div>
  <div class="pfoot"><strong>${fmtTy(p.priceFrom)} – ${fmtTy(p.priceTo)}</strong><label class="cmp"><input type="checkbox" data-cmp="${p.id}"> So sánh</label></div></div></article>`;
}
function layout() {
  const s = site();
  const page = document.body.dataset.page, cur = location.pathname.split('/').pop() || 'index.html';
  const nav = NAV.map(([h, t, sub]) => `<li class="${sub ? 'has-sub' : ''}"><a href="${h}" class="${cur === h.split('?')[0] ? 'active' : ''}" ${h === '#chat' ? 'data-open-chat' : ''}>${esc(t)}${sub ? ' <i>▾</i>' : ''}</a>${sub ? `<ul class="sub">${sub.map(([sh, st]) => `<li><a href="${sh}" ${sh === '#chat' ? 'data-open-chat' : ''}>${esc(st)}</a></li>`).join('')}</ul>` : ''}</li>`).join('');
  document.body.insertAdjacentHTML('afterbegin', `<div class="topbar"><div class="container"><span>📍 ${esc(s.address)}</span><span><a href="tel:${esc(s.hotlineTel)}">☎ ${esc(s.hotline)}</a> · <a href="mailto:${esc(s.email)}">${esc(s.email)}</a></span></div></div>
  <header class="header"><div class="container nav-wrap">${LOGO}<nav><ul class="menu">${nav}</ul></nav>
  <div class="nav-act"><button class="icon-btn" id="themeBtn" aria-label="Đổi giao diện sáng/tối">◐</button><a href="lien-he.html" class="btn btn-gold sm hide-m">Nhận tư vấn</a><button class="icon-btn burger" aria-label="Menu">☰</button></div></div></header>`);
  const footer = `<footer class="footer"><div class="container fgrid"><div>${LOGO}<p>Nhà phân phối bất động sản chuyên nghiệp – minh bạch pháp lý, tư vấn bằng dữ liệu & AI.</p><div class="social"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="YouTube">▶</a><a href="${esc(s.zalo)}" aria-label="Zalo">Z</a></div></div>
  <div><h4>Dự án</h4>${Object.entries(STATUS).map(([id, label]) => `<a href="du-an.html?status=${encodeURIComponent(id)}">${esc(label)}</a>`).join('')}</div>
  <div><h4>AI thực chiến</h4><a href="tu-van-ai.html">AI tư vấn tìm nhà</a><a href="cong-cu-tai-chinh.html">Tính vay & ROI</a><a href="so-sanh.html">So sánh dự án</a></div>
  <div><h4>Liên hệ</h4><a href="tel:${esc(s.hotlineTel)}">Hotline: ${esc(s.hotline)}</a><a href="mailto:${esc(s.email)}">${esc(s.email)}</a><a href="tuyen-dung.html">Tuyển dụng</a><a href="lien-he.html">Văn phòng</a><a href="admin/">Quản trị</a></div></div>
  <div class="container copy">© 2026 ${esc(s.siteName)} · <a href="admin/">Quản trị</a></div></footer>
  <div class="float-cta"><a href="tel:${esc(s.hotlineTel)}" class="fc call" aria-label="Gọi hotline">☎</a><a href="${esc(s.zalo)}" class="fc zalo" target="_blank" rel="noopener" aria-label="Zalo">Zalo</a></div>
  <div class="cmp-bar" id="cmpBar"><span></span><a class="btn btn-gold sm" href="so-sanh.html">So sánh ngay</a><button class="icon-btn" id="cmpClear" aria-label="Xóa">✕</button></div>`;
  document.body.insertAdjacentHTML('beforeend', footer);
  $('.burger').onclick = () => document.body.classList.toggle('menu-open');
  const th = localStorage.getItem('kt_theme'); if (th) document.documentElement.dataset.theme = th;
  $('#themeBtn').onclick = () => { const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = t; localStorage.setItem('kt_theme', t); };
  addEventListener('scroll', () => $('.header').classList.toggle('scrolled', scrollY > 30), { passive: true });
}
/* So sánh: lưu danh sách id */
const Cmp = { get: () => JSON.parse(localStorage.getItem('kt_cmp') || '[]'), set(v) { localStorage.setItem('kt_cmp', JSON.stringify(v)); this.ui(); },
  ui() { const v = this.get(), bar = $('#cmpBar'); if (!bar) return; bar.classList.toggle('show', v.length > 0 && document.body.dataset.page !== 'compare');
    bar.querySelector('span').textContent = `Đã chọn ${v.length}/3 dự án để so sánh`; $$('[data-cmp]').forEach(c => c.checked = v.includes(c.dataset.cmp)); } };
document.addEventListener('change', e => { const id = e.target.dataset && e.target.dataset.cmp; if (!id) return; let v = Cmp.get();
  if (e.target.checked) { if (v.length >= 3) { e.target.checked = false; return toast('Chỉ so sánh tối đa 3 dự án'); } v.push(id); } else v = v.filter(x => x !== id); Cmp.set(v); });
function toast(t) { const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 2800); }
function reveal() { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08 }); $$('.reveal:not(.in)').forEach(el => io.observe(el)); }
/* Form lead chung: <form data-lead="nguồn"> */
function bindLeadForms() {
  $$('form[data-lead]').forEach(f => f.onsubmit = e => { e.preventDefault(); const d = Object.fromEntries(new FormData(f));
    if (!PHONE_RE.test(d.phone || '')) return toast('Vui lòng nhập số điện thoại hợp lệ');
    saveLead({ ...d, source: f.dataset.lead }); const s = site(); f.innerHTML = `<div class="ok">✅ Cảm ơn ${(d.name || 'bạn').replace(/</g, '')}! Chuyên viên sẽ liên hệ trong 15 phút. Hoặc nhắn ngay <a href="${esc(s.zalo)}" target="_blank" rel="noopener">Zalo</a> / gọi <a href="tel:${esc(s.hotlineTel)}">${esc(s.hotline)}</a>.</div>`; });
}
function smartSearch(form) {
  form.onsubmit = e => { e.preventDefault(); const q = form.querySelector('input').value.trim(); location.href = 'du-an.html?q=' + encodeURIComponent(q); };
}
function leadForm(src, btn = 'Nhận báo giá', choices) {
  const locked = typeof projectFromSource === 'function' ? projectFromSource(src) : null;
  let projectHtml = '';
  if (Array.isArray(choices) && choices.length) {
    projectHtml = `<select name="projectId" required aria-label="Dự án">${choices.map(id => { const p = projectById(id); return p ? `<option value="${esc(p.id)}"${locked && locked.id === p.id ? ' selected' : ''}>${esc(p.name)} · ${esc(p.area)}</option>` : ''; }).join('')}</select>`;
  } else if (locked) {
    projectHtml = `<input type="hidden" name="projectId" value="${esc(locked.id)}"><small class="lead-proj">Dự án: <b>${esc(locked.name)}</b> · ${esc(locked.type)} ${esc(locked.area)}</small>`;
  } else if (typeof PROJECTS !== 'undefined') {
    projectHtml = `<select name="projectId" aria-label="Dự án quan tâm"><option value="">Dự án quan tâm (nếu có)</option>${PROJECTS.map(p => `<option value="${esc(p.id)}">${esc(p.name)} · ${esc(p.area)}</option>`).join('')}</select>`;
  }
  return `<form class="lead" data-lead="${esc(src)}"><input name="name" placeholder="Họ và tên" required><input name="phone" placeholder="Số điện thoại" required inputmode="tel">${projectHtml}<select name="need"><option>Nhận bảng giá</option><option>Tư vấn vay</option><option>Đặt lịch tham quan</option></select><button class="btn btn-gold">${btn}</button><small>Bảo mật thông tin · Không mất phí tư vấn</small></form>`;
}

const Pages = {
  home() {
    const s = site();
    if (s.stats && s.stats.length) $$('.stats .counter').forEach((c, i) => { if (!s.stats[i]) return; c.dataset.n = s.stats[i].n; const lab = c.parentElement.querySelector('small'); if (lab && s.stats[i].label) lab.textContent = s.stats[i].label; });
    const hh = $('#homeHotline'); if (hh) { hh.href = 'tel:' + s.hotlineTel; hh.textContent = s.hotline; }
    const hot = PROJECTS.filter(p => p.hot);
    $('#hotGrid').innerHTML = hot.slice(0, 6).map(card).join('');
    $('#newsGrid').innerHTML = NEWS.slice(0, 3).map(newsCard).join('');
    $('#areaGrid').innerHTML = AREAS.map((a, i) => { const ps = PROJECTS.filter(p => p.area === a); return `<a class="area reveal" href="du-an.html?area=${encodeURIComponent(a)}"><img loading="lazy" src="${ps[0].thumb}" alt="${a}"><span><b>${a}</b>${ps.length} dự án</span></a>`; }).join('');
    smartSearch($('#heroSearch')); $$('.hint').forEach(h => h.onclick = () => { $('#heroSearch input').value = h.textContent; $('#heroSearch').requestSubmit(); });
    $$('.counter').forEach(c => { const n = +c.dataset.n; let i = 0; const t = setInterval(() => { i += Math.ceil(n / 40); if (i >= n) { i = n; clearInterval(t); } c.textContent = i.toLocaleString('vi-VN'); }, 30); });
  },
  projects() {
    const tabBox = $('.tabs'); if (tabBox) tabBox.innerHTML = `<button data-s="">Tất cả</button>` + Object.entries(STATUS).map(([id, label]) => `<button data-s="${esc(id)}">${esc(label)}</button>`).join('');
    const sel = (id, opts) => $(id).innerHTML += opts.map(([v, t]) => `<option value="${esc(v)}">${esc(t)}</option>`).join('');
    sel('#fArea', AREAS.map(a => [a, a])); sel('#fType', TYPES.map(a => [a, a])); sel('#fStatus', Object.entries(STATUS));
    const st = { area: qs('area') || '', type: qs('type') || '', status: qs('status') || '', price: '', beds: '', sort: 'hot' };
    const q = qs('q'); if (q) { $('#nlq').value = q; Object.assign(st, applyNL(q)); }
    function applyNL(q) { const f = parseQuery(q); $('#nlInfo').innerHTML = Object.keys(f).length ? `🤖 AI hiểu: <b>${describeFilters(f)}</b>` : '🤖 Chưa nhận diện được tiêu chí, hãy thử “căn hộ 2PN dưới 3 tỷ ở Thủ Đức”'; st.nl = f;
      return { area: f.area || '', type: f.type || '', status: f.status || '', beds: f.beds ? String(f.beds) : '' }; }
    function render() {
      ['area', 'type', 'status', 'price', 'beds', 'sort'].forEach(k => $('#f' + k[0].toUpperCase() + k.slice(1)).value = st[k]);
      const [mn, mx] = st.price ? st.price.split('-').map(Number) : [st.nl && st.nl.min, st.nl && st.nl.max];
      let list = filterProjects({ area: st.area, type: st.type, status: st.status, beds: +st.beds || 0, min: mn, max: mx });
      const so = { hot: (a, b) => b.hot - a.hot, asc: (a, b) => a.priceFrom - b.priceFrom, desc: (a, b) => b.priceFrom - a.priceFrom, yield: (a, b) => b.yield - a.yield }; list.sort(so[st.sort]);
      $('#count').textContent = list.length; $('#grid').innerHTML = list.map(card).join('') || '<div class="empty">Không có dự án phù hợp. <a href="#" data-open-chat>Hỏi trợ lý AI</a> hoặc <a href="du-an.html">xóa bộ lọc</a>.</div>';
      $$('.tabs button').forEach(b => b.classList.toggle('active', b.dataset.s === st.status)); Cmp.ui(); reveal();
      $$('#grid [data-open-chat]').forEach(b => b.onclick = e => { e.preventDefault(); Chat.toggle(true); });
    }
    $$('.filters select').forEach(s => s.onchange = () => { st[s.id.slice(1).toLowerCase()] = s.value; st.nl = null; $('#nlInfo').textContent = ''; render(); });
    $$('.tabs button').forEach(b => b.onclick = () => { st.status = b.dataset.s; render(); });
    $('#nlForm').onsubmit = e => { e.preventDefault(); Object.assign(st, applyNL($('#nlq').value)); history.replaceState(null, '', '?q=' + encodeURIComponent($('#nlq').value)); render(); };
    $('#reset').onclick = () => { Object.assign(st, { area: '', type: '', status: '', price: '', beds: '', nl: null }); $('#nlq').value = ''; $('#nlInfo').textContent = ''; history.replaceState(null, '', 'du-an.html'); render(); };
    render();
  },
  detail() {
    const p = PROJECTS.find(x => x.id === qs('id')) || PROJECTS[0]; document.title = p.name + ' – Khang Thịnh Land';
    $('#dHero').style.backgroundImage = `linear-gradient(180deg,rgba(11,31,58,.25),rgba(11,31,58,.92)),url(${p.image})`;
    $('#dHead').innerHTML = `<div class="crumbs"><a href="index.html">Trang chủ</a> / <a href="du-an.html">Dự án</a> / ${p.name}</div><span class="badge s-${p.status}">${STATUS[p.status]}</span><h1>${p.name}</h1><p>${p.desc}</p>
     <div class="kpis"><div><small>Giá từ</small><b>${fmtTy(p.priceFrom)}</b></div><div><small>Loại hình</small><b>${p.type}</b></div><div><small>Khu vực</small><b>${p.area}</b></div><div><small>Bàn giao</small><b>${p.handover}</b></div></div>`;
    const units = p.beds.length ? p.beds.map((b, i) => { const area = 45 + b * 22, pr = p.priceFrom + (p.priceTo - p.priceFrom) * (i / Math.max(1, p.beds.length - 1)); return [`${p.type === 'Căn hộ' || p.type === 'Condotel' ? b + 'PN' : 'Mẫu ' + String.fromCharCode(65 + i)}`, area + ' m²', fmtTy(pr), Math.round(pr * 1000 / area) + ' tr/m²']; })
      : [['Nền A', '80 m²', fmtTy(p.priceFrom), Math.round(p.priceFrom * 1000 / 80) + ' tr/m²'], ['Nền B', '100 m²', fmtTy((p.priceFrom + p.priceTo) / 2), Math.round((p.priceFrom + p.priceTo) / 2 * 10) + ' tr/m²'], ['Nền góc', '120 m²', fmtTy(p.priceTo), Math.round(p.priceTo * 1000 / 120) + ' tr/m²']];
    const prog = p.status === 'da-ban-giao' ? 100 : p.status === 'dang-mo-ban' ? 55 : 15;
    $('#dBody').innerHTML = `
     <section id="tong-quan" class="dsec reveal"><h2>Tổng quan dự án</h2><table class="spec"><tr><td>Tên dự án</td><td>${p.name}</td></tr><tr><td>Chủ đầu tư</td><td>${p.dev}</td></tr><tr><td>Vị trí</td><td>${p.area}</td></tr><tr><td>Quy mô</td><td>${p.scale}</td></tr><tr><td>Loại hình</td><td>${p.type}</td></tr><tr><td>Pháp lý</td><td>Sổ hồng lâu dài / đủ điều kiện mở bán (mẫu)</td></tr><tr><td>Bàn giao</td><td>${p.handover}</td></tr></table></section>
     <section id="vi-tri" class="dsec reveal"><h2>Vị trí & kết nối</h2><div class="map"><iframe title="Bản đồ" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(p.area + ', Việt Nam')}&z=11&output=embed"></iframe></div><ul class="ticks"><li>5 phút đến trung tâm hành chính khu vực</li><li>10 phút đến trường quốc tế, bệnh viện</li><li>15–20 phút đến sân bay / ga Metro gần nhất</li></ul></section>
     <section id="tien-ich" class="dsec reveal"><h2>Tiện ích nội khu</h2><div class="amen">${['🏊 Hồ bơi tràn bờ', '🌳 Công viên 1ha', '🏋️ Gym & Yoga', '🧒 Khu vui chơi trẻ em', '🛒 Trung tâm thương mại', '🏫 Trường mầm non', '🔒 An ninh 24/7', '⚡ Trạm sạc xe điện'].map(a => `<span>${a}</span>`).join('')}</div></section>
     <section id="mat-bang" class="dsec reveal"><h2>Mặt bằng điển hình</h2><div class="plans">${units.map((u, i) => `<div class="plan"><svg viewBox="0 0 120 80"><rect x="4" y="4" width="112" height="72" rx="3" fill="none" stroke="currentColor"/><line x1="${40 + i * 10}" y1="4" x2="${40 + i * 10}" y2="76" stroke="currentColor"/><line x1="4" y1="44" x2="${40 + i * 10}" y2="44" stroke="currentColor"/><text x="70" y="44" font-size="9" fill="currentColor">${u[0]}</text></svg><b>${u[0]}</b><small>${u[1]}</small></div>`).join('')}</div></section>
     <section id="bang-gia" class="dsec reveal"><h2>Bảng giá tham khảo</h2><table class="tbl"><thead><tr><th>Sản phẩm</th><th>Diện tích</th><th>Giá từ</th><th>Đơn giá</th></tr></thead><tbody>${units.map(u => `<tr>${u.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table><small class="muted">* Giá mẫu, chưa gồm VAT & phí bảo trì. Liên hệ để nhận bảng giá chính thức.</small></section>
     <section id="chinh-sach" class="dsec reveal"><h2>Chính sách bán hàng</h2><div class="pol"><div><b>30%</b><span>Thanh toán đến khi nhận nhà</span></div><div><b>70%</b><span>Ngân hàng hỗ trợ vay</span></div><div><b>0%</b><span>Lãi suất 18 tháng</span></div><div><b>9%</b><span>Chiết khấu thanh toán sớm</span></div></div></section>
     <section id="tien-do" class="dsec reveal"><h2>Tiến độ xây dựng</h2><div class="progress"><i style="width:${prog}%"></i></div><p class="muted">Hoàn thành ước tính ${prog}% · cập nhật 10/2026</p><ol class="timeline">${['Khởi công', 'Hoàn thiện móng', 'Cất nóc', 'Hoàn thiện', 'Bàn giao'].map((t, i) => `<li class="${i * 25 <= prog ? 'done' : ''}">${t}</li>`).join('')}</ol></section>
     <section id="thu-vien" class="dsec reveal"><h2>Thư viện ảnh</h2><div class="gallery">${p.gallery.map((g, i) => `<img loading="lazy" src="${g}" alt="${p.name} ảnh ${i + 1}" data-i="${i}">`).join('')}</div></section>
     <section class="dsec reveal"><h2>Dự án tương tự</h2><div class="grid3">${rankProjects({ area: p.area, type: p.type, max: p.priceTo }, 4).filter(x => x.p.id !== p.id).slice(0, 3).map(x => card(x.p)).join('')}</div></section>`;
    $('#dSide').innerHTML = `<div class="glass-card"><h3>Nhận báo giá & chính sách</h3><p class="muted">Bảng giá ${p.name} mới nhất gửi qua Zalo trong 5 phút.</p>${leadForm('bao-gia:' + p.id)}<div class="cta2"><a class="btn btn-outline" href="tel:0900000000">☎ 0900 000 000</a><a class="btn btn-zalo" href="${AI_CONFIG.zalo}" target="_blank" rel="noopener">Zalo</a></div>
     <label class="cmp block"><input type="checkbox" data-cmp="${p.id}"> Thêm vào so sánh</label><a class="btn btn-ghost w" href="cong-cu-tai-chinh.html?price=${p.priceFrom}&yield=${p.yield}">🧮 Tính vay cho dự án này</a></div>`;
    const lb = $('#lightbox'); $$('.gallery img').forEach(im => im.onclick = () => { lb.querySelector('img').src = im.src; lb.classList.add('open'); }); lb.onclick = () => lb.classList.remove('open');
    $$('.dnav a').forEach(a => a.onclick = e => { e.preventDefault(); const t = $(a.getAttribute('href')); scrollTo({ top: t.offsetTop - 130, behavior: 'smooth' }); });
  },
  news() { const cats = ['Tất cả', ...new Set(NEWS.map(n => n.cat))], c = qs('cat') || 'Tất cả';
    $('#cats').innerHTML = cats.map(x => `<a class="${x === c ? 'active' : ''}" href="tin-tuc.html${x === 'Tất cả' ? '' : '?cat=' + encodeURIComponent(x)}">${x}</a>`).join('');
    $('#newsGrid').innerHTML = NEWS.filter(n => c === 'Tất cả' || n.cat === c).map(newsCard).join(''); },
  newsDetail() { const n = NEWS.find(x => x.id === qs('id')) || NEWS[0]; document.title = n.title + ' – Khang Thịnh Land';
    const body = (n.body || '').trim()
      ? esc(n.body).split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')
      : `<p>${esc(n.excerpt || '')}</p>`;
    $('#art').innerHTML = `<div class="crumbs"><a href="index.html">Trang chủ</a> / <a href="tin-tuc.html">Tin tức</a> / ${esc(n.cat)}</div><h1>${esc(n.title)}</h1><p class="muted">${esc(n.date)} · ${esc(n.cat)}</p><img class="cover" src="${esc(n.image)}" alt="">
    <div class="ai-sum"><b>✦ AI tóm tắt</b><ul><li>${esc(n.excerpt || '')}</li></ul></div>${body}`;
    $('#related').innerHTML = NEWS.filter(x => x.id !== n.id).slice(0, 3).map(n => `<a class="rel" href="tin-tuc-chi-tiet.html?id=${n.id}"><img src="${n.image}" alt=""><span>${n.title}</span></a>`).join(''); },
  jobs() { $('#jobs').innerHTML = JOBS.map(j => `<a class="job reveal" href="tuyen-dung-chi-tiet.html?id=${j.id}"><div><h3>${j.title}</h3><small>📍 ${j.place} · 👥 ${j.qty} người · ⏳ Hạn ${j.deadline}</small></div><b>${j.salary}</b><span class="btn btn-outline sm">Xem & ứng tuyển</span></a>`).join(''); },
  jobDetail() { const j = JOBS.find(x => x.id === qs('id')) || JOBS[0]; document.title = j.title + ' – Tuyển dụng Khang Thịnh Land';
    const ul = (arr, fallback) => `<ul class="ticks">${((arr && arr.length) ? arr : fallback).map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
    $('#job').innerHTML = `<div class="crumbs"><a href="index.html">Trang chủ</a> / <a href="tuyen-dung.html">Tuyển dụng</a> / ${esc(j.title)}</div><h1>${esc(j.title)}</h1><div class="kpis light"><div><small>Nơi làm việc</small><b>${esc(j.place)}</b></div><div><small>Số lượng</small><b>${esc(j.qty)}</b></div><div><small>Thu nhập</small><b>${esc(j.salary)}</b></div><div><small>Hạn nộp</small><b>${esc(j.deadline)}</b></div></div>
    <h2>Mô tả công việc</h2>${ul(j.duties, ['Tư vấn, chăm sóc khách hàng quan tâm dự án do công ty phân phối', 'Sử dụng hệ thống CRM & công cụ AI nội bộ để quản lý khách hàng', 'Phối hợp marketing tổ chức sự kiện mở bán'])}<h2>Yêu cầu</h2>${ul(j.requirements, ['Tốt nghiệp Cao đẳng trở lên, ưu tiên kinh nghiệm BĐS', 'Kỹ năng giao tiếp, đàm phán tốt; chủ động, cầu tiến'])}<h2>Quyền lợi</h2>${ul(j.benefits, ['Hoa hồng hấp dẫn, thưởng nóng theo giao dịch', 'Đào tạo bài bản, lộ trình thăng tiến rõ ràng', 'BHXH đầy đủ, du lịch hằng năm'])}`;
    $('#apply').innerHTML = `<h3>Ứng tuyển nhanh</h3><form class="lead" data-lead="ung-tuyen:${esc(j.id)}"><input type="hidden" name="jobTitle" value="${esc(j.title)}"><input name="name" placeholder="Họ và tên" required><input name="phone" placeholder="Số điện thoại" required><input name="email" type="email" placeholder="Email"><input name="cv" placeholder="Link CV (Google Drive, LinkedIn...)"><button class="btn btn-gold">Gửi hồ sơ</button></form>`; },
  about() {
    const A = window.ABOUT;
    if (A) {
      const h1 = $('.phero h1'); if (h1 && A.title) h1.textContent = A.title;
      const set = (id, val) => { const el = document.getElementById(id); if (el && val) el.textContent = val; };
      set('aboutLead', A.lead); set('aboutHistoryTitle', A.historyTitle); set('aboutVision', A.vision); set('aboutMission', A.mission); set('aboutValues', A.values);
      const tl = document.getElementById('aboutHistory');
      if (tl && A.history && A.history.length) tl.innerHTML = A.history.map(h => `<div><b>${esc(h.year)}</b> – ${esc(h.text)}</div>`).join('');
      const img = document.getElementById('aboutImage'); if (img && A.image) img.src = A.image;
    }
    $('#team').innerHTML = TEAM.map(t => `<div class="person reveal"><img loading="lazy" src="${esc(t.image || (t.img ? U(t.img, 500) : ''))}" alt="${esc(t.name)}"><b>${esc(t.name)}</b><small>${esc(t.role)}</small></div>`).join('');
    $('#devs').innerHTML = [...new Set(PROJECTS.map(p => p.dev))].filter(Boolean).map(d => `<span>${esc(d)}</span>`).join('');
  },
  quiz() {
    const steps = [['purpose', 'Bạn mua bất động sản để làm gì?', [['o', '🏡 Để ở'], ['dau-tu', '📈 Đầu tư / cho thuê']]], ['budget', 'Ngân sách dự kiến của bạn?', [['0-2', 'Dưới 2 tỷ'], ['2-4', '2 – 4 tỷ'], ['4-8', '4 – 8 tỷ'], ['8-15', '8 – 15 tỷ'], ['15-50', 'Trên 15 tỷ']]],
      ['area', 'Khu vực bạn quan tâm?', [['', 'Không giới hạn'], ...AREAS.map(a => [a, a])]], ['beds', 'Số phòng ngủ mong muốn?', [['1', '1 PN / Studio'], ['2', '2 PN'], ['3', '3 PN'], ['4', '4+ PN'], ['0', 'Không quan trọng']]]];
    const ans = {}; let i = 0; const box = $('#quiz');
    function show() {
      if (i >= steps.length) return result(); const [k, q, opts] = steps[i];
      box.innerHTML = `<div class="qprog"><i style="width:${i / steps.length * 100}%"></i></div><small>Câu ${i + 1}/${steps.length}</small><h2>${q}</h2><div class="qopts">${opts.map(([v, t]) => `<button data-v="${v}">${t}</button>`).join('')}</div>${i ? '<button class="back">← Quay lại</button>' : ''}`;
      $$('.qopts button', box).forEach(b => b.onclick = () => { ans[k] = b.dataset.v; i++; show(); }); const bk = $('.back', box); if (bk) bk.onclick = () => { i--; show(); };
    }
    function result() {
      const [mn, mx] = ans.budget.split('-').map(Number), f = { purpose: ans.purpose, min: mn, max: mx, area: ans.area || undefined, beds: +ans.beds || undefined };
      const r = rankProjects(f, 4);
      box.innerHTML = `<div class="qprog"><i style="width:100%"></i></div><h2>✦ AI đề xuất cho bạn</h2><p class="muted">Tiêu chí: ${describeFilters(f)}</p><div class="results">${r.map(({ p, score }, k) => `<div class="rcard reveal in"><div class="ring" style="--v:${score}"><b>${score}%</b><small>phù hợp</small></div><img src="${p.thumb}" alt=""><div><small>#${k + 1} · ${p.type} · ${p.area}</small><h3>${p.name}</h3><p>${fmtTy(p.priceFrom)} – ${fmtTy(p.priceTo)} · ${STATUS[p.status]}</p><p class="why">${why(p, f)}</p><a class="btn btn-gold sm" href="du-an-chi-tiet.html?id=${p.id}">Xem dự án</a> <label class="cmp"><input type="checkbox" data-cmp="${p.id}"> So sánh</label></div></div>`).join('')}</div>
      <div class="glass-card mt"><h3>Nhận báo cáo chi tiết qua Zalo</h3>${leadForm('quiz-ai', 'Gửi cho tôi', r.map(x => x.p.id))}</div><button class="btn btn-ghost mt" id="redo">↻ Làm lại</button>`;
      $('#redo').onclick = () => { i = 0; show(); }; bindLeadForms(); Cmp.ui();
    }
    function why(p, f) { const w = []; if (f.max && p.priceFrom <= f.max && p.priceTo >= (f.min || 0)) w.push('✓ Vừa ngân sách'); if (f.area && p.area === f.area) w.push('✓ Đúng khu vực'); if (f.beds && p.beds.includes(f.beds)) w.push(`✓ Có căn ${f.beds}PN`); if (f.purpose === 'dau-tu' && p.yield) w.push(`✓ Lợi suất thuê ~${p.yield}%/năm`); if (f.purpose === 'o' && p.status === 'da-ban-giao') w.push('✓ Ở ngay'); return w.join(' · ') || 'Lựa chọn thay thế gần nhất'; }
    show();
  },
  finance() {
    const pr = +qs('price') || 3, y = +qs('yield') || 5; $('#lPrice').value = pr; $('#rPrice').value = pr; $('#rRent').value = Math.round(pr * 1000 * y / 100 / 12);
    const vnd = v => Math.round(v).toLocaleString('vi-VN') + ' đ';
    function loan() { const P = +$('#lPrice').value * 1e9, ratio = +$('#lRatio').value / 100, r = +$('#lRate').value / 100 / 12, n = +$('#lYears').value * 12, L = P * ratio;
      $('#lRatioV').textContent = $('#lRatio').value + '%'; const pmt = r ? L * r / (1 - Math.pow(1 + r, -n)) : L / n, first = L / n + L * r;
      $('#lOut').innerHTML = `<div><small>Số tiền vay</small><b>${vnd(L)}</b></div><div><small>Vốn tự có</small><b>${vnd(P - L)}</b></div><div class="big"><small>Trả góp đều hàng tháng</small><b>${vnd(pmt)}</b></div><div><small>Tháng đầu (dư nợ giảm dần)</small><b>${vnd(first)}</b></div><div><small>Tổng lãi (trả đều)</small><b>${vnd(pmt * n - L)}</b></div><div><small>Thu nhập tối thiểu đề xuất</small><b>${vnd(pmt / .5)}/tháng</b></div>`;
      const yrs = +$('#lYears').value, pts = []; let bal = L; for (let k = 0; k <= yrs; k++) { pts.push(bal); for (let m = 0; m < 12; m++) bal = Math.max(0, bal - (pmt - bal * r)); }
      $('#lChart').innerHTML = `<svg viewBox="0 0 300 100" preserveAspectRatio="none"><polyline fill="none" stroke="#C9A24B" stroke-width="2" points="${pts.map((v, k) => `${k / yrs * 300},${100 - v / L * 95}`).join(' ')}"/></svg><small>Dư nợ giảm dần theo năm</small>`; }
    function roi() { const P = +$('#rPrice').value * 1e9, rent = +$('#rRent').value * 1e6, occ = +$('#rOcc').value / 100, cost = +$('#rCost').value / 100, g = +$('#rGrowth').value / 100, yrs = +$('#rYears').value;
      const net = rent * 12 * occ * (1 - cost), gross = rent * 12 / P * 100, netY = net / P * 100, fv = P * Math.pow(1 + g, yrs), total = (fv - P + net * yrs) / P * 100;
      $('#rOut').innerHTML = `<div><small>Lợi suất gộp</small><b>${gross.toFixed(2)}%/năm</b></div><div><small>Lợi suất ròng</small><b>${netY.toFixed(2)}%/năm</b></div><div><small>Thu nhập thuê ròng/năm</small><b>${vnd(net)}</b></div><div><small>Giá trị ước tính sau ${yrs} năm</small><b>${vnd(fv)}</b></div><div class="big"><small>Tổng ROI ${yrs} năm</small><b>${total.toFixed(1)}%</b></div><div><small>Đánh giá AI</small><b>${netY >= 5 ? '🟢 Dòng tiền tốt' : netY >= 3.5 ? '🟡 Trung bình' : '🔴 Thấp – dựa vào tăng giá'}</b></div>`; }
    $$('#loanF input, #loanF select').forEach(e => e.oninput = loan); $$('#roiF input').forEach(e => e.oninput = roi); loan(); roi();
  },
  compare() {
    const pick = $('#cmpPick'); pick.innerHTML = PROJECTS.map(p => `<label class="chip"><input type="checkbox" data-cmp="${p.id}"> ${p.name}</label>`).join('');
    const rows = [['Ảnh', p => `<img src="${p.thumb}" alt="">`], ['Loại hình', p => p.type], ['Khu vực', p => p.area], ['Giá', p => `${fmtTy(p.priceFrom)} – ${fmtTy(p.priceTo)}`], ['Phòng ngủ', p => p.beds.join(', ') || '—'], ['Trạng thái', p => STATUS[p.status]], ['Chủ đầu tư', p => p.dev], ['Quy mô', p => p.scale], ['Bàn giao', p => p.handover], ['Lợi suất thuê', p => p.yield ? p.yield + '%' : '—', 'yield'], ['Tăng giá kỳ vọng', p => p.growth + '%/năm', 'growth'], ['Điểm đầu tư AI', p => Math.round((p.yield + p.growth) * 6) + '/100', 'score']];
    function render() { const ps = Cmp.get().map(id => PROJECTS.find(p => p.id === id)).filter(Boolean);
      if (ps.length < 2) { $('#cmpTable').innerHTML = '<div class="empty">Chọn ít nhất 2 dự án (tối đa 3) để so sánh.</div>'; return; }
      const best = { yield: Math.max(...ps.map(p => p.yield)), growth: Math.max(...ps.map(p => p.growth)), score: Math.max(...ps.map(p => p.yield + p.growth)) };
      $('#cmpTable').innerHTML = `<div class="tscroll"><table class="tbl cmpt"><thead><tr><th></th>${ps.map(p => `<th><a href="du-an-chi-tiet.html?id=${p.id}">${p.name}</a></th>`).join('')}</tr></thead><tbody>${rows.map(([l, fn, k]) => `<tr><td>${l}</td>${ps.map(p => `<td class="${k && (k === 'score' ? p.yield + p.growth : p[k]) === best[k] ? 'best' : ''}">${fn(p)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <div class="ai-sum mt"><b>✦ Nhận định AI</b><p>${verdict(ps)}</p></div>`; }
    function verdict(ps) { const y = [...ps].sort((a, b) => b.yield - a.yield)[0], c = [...ps].sort((a, b) => a.priceFrom - b.priceFrom)[0], g = [...ps].sort((a, b) => b.growth - a.growth)[0];
      return `Dòng tiền cho thuê tốt nhất: <b>${y.name}</b> (${y.yield}%). Vốn vào thấp nhất: <b>${c.name}</b> (từ ${fmtTy(c.priceFrom)}). Tiềm năng tăng giá cao nhất: <b>${g.name}</b>. Mua để ở ưu tiên dự án đã/ sắp bàn giao; đầu tư dài hạn ưu tiên tăng giá.`; }
    document.addEventListener('change', e => { if (e.target.dataset.cmp) setTimeout(render); }); Cmp.ui(); render();
  },
  contact() {
    const s = site();
    const lead = $('#contactLead'); if (lead) lead.textContent = 'Hotline ' + s.hotline + ' – phản hồi trong 15 phút giờ hành chính.';
    const company = $('#contactCompany'); if (company) company.textContent = s.company;
    const facts = $('#contactFacts'); if (facts) facts.innerHTML = `<li>Trụ sở: ${esc(s.address)}</li><li>Hotline: <a href="tel:${esc(s.hotlineTel)}">${esc(s.hotline)}</a></li><li>Email: <a href="mailto:${esc(s.email)}">${esc(s.email)}</a></li><li>Giờ làm việc: ${esc(s.hours)}</li>`;
    const ctas = $('#contactCtas'); if (ctas) ctas.innerHTML = `<a class="btn btn-gold" href="tel:${esc(s.hotlineTel)}">☎ Gọi ngay</a><a class="btn btn-zalo" href="${esc(s.zalo)}" target="_blank" rel="noopener">Nhắn Zalo</a>`;
    const map = $('#contactMap'); if (map) map.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(s.mapQuery || s.address) + '&z=12&output=embed';
  }
};
function newsCard(n) { return `<article class="ncard reveal"><a href="tin-tuc-chi-tiet.html?id=${n.id}"><img loading="lazy" src="${n.image}" alt=""></a><div><small>${n.cat} · ${n.date}</small><h3><a href="tin-tuc-chi-tiet.html?id=${n.id}">${n.title}</a></h3><p>${n.excerpt}</p></div></article>`; }
document.addEventListener('DOMContentLoaded', () => {
  layout(); const pg = document.body.dataset.page; if (Pages[pg]) Pages[pg]();
  $$('[data-leadform]').forEach(el => el.innerHTML = leadForm(el.dataset.leadform)); bindLeadForms(); Chat.init(); Cmp.ui(); reveal();
});
