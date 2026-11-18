/* Trang chi tiết dự án v2 – cao cấp. Dữ liệu từ data.js qua ?id= */
Pages.detail2 = function () {
  const p = PROJECTS.find(x => x.id === qs('id')) || PROJECTS[0];
  p.gallery = (Array.isArray(p.gallery) ? p.gallery : []).filter(Boolean);
  if (!p.gallery.length && p.image) p.gallery = [p.image];
  if (!p.gallery.length) p.gallery = [''];
  const gAt = i => p.gallery[((i % p.gallery.length) + p.gallery.length) % p.gallery.length];
  const tel = (window.SITE && SITE.hotlineTel) || String((window.AI_CONFIG && AI_CONFIG.hotline) || '').replace(/\D/g, '') || '0900000000';
  const telShow = (window.SITE && SITE.hotline) || (window.AI_CONFIG && AI_CONFIG.hotline) || tel;
  const zalo = (window.SITE && SITE.zalo) || (window.AI_CONFIG && AI_CONFIG.zalo) || '#';
  const ST = p.status, url = location.origin + location.pathname + '?id=' + p.id;
  document.title = `${p.name} – ${p.type} ${p.area} | Giá từ ${fmtTy(p.priceFrom)} | Khang Thịnh Land`;
  const meta = (n, c, prop) => { let m = document.querySelector(`meta[${prop ? 'property' : 'name'}="${n}"]`); if (!m) { m = document.createElement('meta'); m.setAttribute(prop ? 'property' : 'name', n); document.head.appendChild(m); } m.content = c; };
  meta('description', `${p.name}: ${p.desc} Giá ${fmtTy(p.priceFrom)}–${fmtTy(p.priceTo)}. Nhận bảng giá, chính sách mới nhất từ Khang Thịnh Land.`);
  meta('og:title', document.title, 1); meta('og:image', p.image, 1); meta('og:type', 'website', 1); meta('og:url', url, 1);
  const ld = document.createElement('script'); ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'Residence', name: p.name, description: p.desc, image: p.gallery, address: { '@type': 'PostalAddress', addressLocality: p.area, addressCountry: 'VN' } },
    { '@type': 'Product', name: p.name, image: p.image, brand: p.dev, offers: { '@type': 'AggregateOffer', priceCurrency: 'VND', lowPrice: p.priceFrom * 1e9, highPrice: p.priceTo * 1e9, availability: ST === 'sap-mo-ban' ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock', seller: { '@type': 'RealEstateAgent', name: 'Khang Thịnh Land', telephone: '+84' + String(tel).replace(/^0/, '') } } },
    { '@type': 'BreadcrumbList', itemListElement: [['Trang chủ', 'index.html'], ['Dự án', 'du-an.html'], [p.name, url]].map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: u })) }] });
  document.head.appendChild(ld);

  /* ---------- dữ liệu sinh từ project ---------- */
  const isLand = !p.beds.length, isApt = ['Căn hộ', 'Condotel'].includes(p.type);
  const splitAm = t => { const m = String(t).match(/^(\p{Extended_Pictographic}\uFE0F?)\s+(.+)$/u); return m ? [m[1], m[2]] : ['✦', String(t)]; };
  const genPlans = (isLand ? [0, 1, 2] : p.beds).map((b, i, a) => {
    const t = a.length > 1 ? i / (a.length - 1) : 0, area = isLand ? 80 + i * 20 : (isApt ? 38 + b * 24 : 90 + b * 35);
    return { key: 'u' + i, name: isLand ? ['Nền tiêu chuẩn', 'Nền rộng', 'Nền góc'][i] : isApt ? (b === 1 ? '1PN / Studio' : b + ' phòng ngủ') : `${p.type} ${b}PN`, beds: b, baths: isLand ? 0 : Math.max(1, b - (b > 2 ? 1 : 0)), area, price: p.priceFrom + (p.priceTo - p.priceFrom) * t * .85, img: gAt(i + 2) };
  });
  const unitTypes = (Array.isArray(p.floorplans) && p.floorplans.length) ? p.floorplans.map((u, i) => ({ key: 'u' + i, name: u.name, beds: +u.beds || 0, baths: +u.baths || 0, area: +u.area || 0, price: +u.price || 0, img: u.image || gAt(i + 2) })) : genPlans;
  const DIRS = ['Đông Nam', 'Tây Bắc', 'Đông Bắc', 'Tây Nam', 'Nam', 'Bắc'];
  let units;
  if (Array.isArray(p.priceList) && p.priceList.length) {
    units = p.priceList.map(u => ({ code: u.code, type: u.type, beds: 0, floor: +u.floor || 0, dir: u.dir, area: +u.area || 0, price: +u.price || 0, sold: !!u.sold }));
  } else {
    units = []; let seed = p.id.length * 7;
    const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    for (let k = 0; k < 18; k++) { const u = unitTypes[k % unitTypes.length], fl = isApt ? 3 + Math.floor(rnd() * 35) : 1 + Math.floor(rnd() * 3), dir = DIRS[Math.floor(rnd() * 6)];
      const price = u.price * (1 + (isApt ? fl * .004 : 0) + (dir.includes('Nam') ? .03 : 0) + rnd() * .05);
      units.push({ code: (isApt ? 'A' + String(fl).padStart(2, '0') + '.' + String(1 + Math.floor(rnd() * 12)).padStart(2, '0') : (isLand ? 'L' : 'V') + (k + 1)), type: u.name, beds: u.beds, floor: fl, dir, area: u.area + Math.round(rnd() * 8), price, sold: rnd() < .25 }); }
  }
  const prog = (p.progress === 0 || p.progress) ? +p.progress : (ST === 'da-ban-giao' ? 100 : ST === 'dang-mo-ban' ? 58 : 12);
  const conn = (Array.isArray(p.connections) && p.connections.length) ? p.connections.map(c => [c.icon || '📍', c.name, +c.minutes || 0]) : [['🚇', 'Ga Metro / trục giao thông chính', 5], ['🏫', 'Trường quốc tế', 7], ['🏥', 'Bệnh viện đa khoa', 10], ['🛍️', 'Trung tâm thương mại', 8], ['🏢', 'Trung tâm hành chính', 15], ['✈️', 'Sân bay', 30]];
  const amDefault = [['🏊', 'Hồ bơi tràn bờ'], ['🌳', 'Công viên trung tâm'], ['🏋️', 'Gym & Yoga'], ['🧒', 'Khu vui chơi trẻ em'], ['🍽️', 'Nhà hàng – Café'], ['🧖', 'Spa & Sauna'], ['🎾', 'Sân tennis'], ['🔒', 'An ninh 3 lớp 24/7'], ['⚡', 'Trạm sạc xe điện'], ['🐶', 'Pet park'], ['📚', 'Thư viện – Co-working'], ['🛗', 'Sảnh đón 5 sao']];
  const amIn = (Array.isArray(p.amenities) && p.amenities.length) ? p.amenities.map(splitAm) : amDefault;
  const amOutDefault = [['🏫', 'Trường học các cấp'], ['🏥', 'Bệnh viện quốc tế'], ['🛒', 'Siêu thị – TTTM'], ['🌊', 'Công viên ven sông'], ['🏛️', 'Trung tâm hành chính'], ['🚌', 'Bến xe buýt – Metro'], ['⛳', 'Sân golf'], ['🏦', 'Ngân hàng']];
  const amOut = (Array.isArray(p.amenitiesOut) && p.amenitiesOut.length) ? p.amenitiesOut.map(splitAm) : amOutDefault;
  const pay = (Array.isArray(p.payments) && p.payments.length) ? p.payments.map(x => [x.step, x.amount]) : [['Ký thỏa thuận đặt cọc', '10%'], ['Ký HĐMB (30 ngày)', '20%'], ['Đợt 3–6 (3 tháng/đợt)', '5%/đợt'], ['Nhận bàn giao', '25%'], ['Nhận sổ hồng', '5%']];
  const policies = (Array.isArray(p.policies) && p.policies.length) ? p.policies.map(x => [x.value, x.text]) : [['30%', 'Thanh toán đến khi nhận nhà'], ['70%', 'Ngân hàng hỗ trợ vay'], ['0%', 'Lãi suất trong 18 tháng'], ['9%', 'Chiết khấu thanh toán sớm']];
  const promo = p.promo != null ? p.promo : 'Tặng gói nội thất 150 triệu và miễn 2 năm phí quản lý cho 20 khách đầu tiên.';
  const build = (Array.isArray(p.milestones) && p.milestones.length) ? p.milestones.map(m => [m.title, m.when, !!m.done, m.image]) : [['Khởi công', 'Q1/2025', 1], ['Hoàn thiện móng & hầm', 'Q3/2025', 1], ['Thi công phần thân', 'Q2/2026', prog >= 50], ['Cất nóc', 'Q4/2026', prog >= 70], ['Hoàn thiện & bàn giao', p.handover, prog >= 100]];
  const docs = [['Brochure dự án', 'PDF · 12 MB'], ['Bảng giá chi tiết', 'PDF · 1,2 MB'], ['Chính sách bán hàng', 'PDF · 0,8 MB'], ['Mặt bằng tổng thể & tầng điển hình', 'PDF · 6 MB'], ['Hồ sơ pháp lý tóm tắt', 'PDF · 2 MB'], ['Mẫu hợp đồng mua bán', 'DOCX · 0,4 MB']];
  const faqs = (Array.isArray(p.faqs) && p.faqs.length) ? p.faqs.map(f => [f.q, f.a]) : [['Pháp lý dự án hiện tại thế nào?', `${p.legal || (p.name + ' đã có quy hoạch 1/500, giấy phép xây dựng và bảo lãnh ngân hàng.')} Khang Thịnh Land gửi bản tóm tắt pháp lý khi khách yêu cầu.`],
    ['Ngân hàng hỗ trợ vay bao nhiêu?', 'Tối đa 70% giá trị sản phẩm, thời hạn đến 25 năm, ân hạn nợ gốc 12–24 tháng và hỗ trợ lãi suất 0% trong 18 tháng.'],
    ['Khi nào bàn giao? Bàn giao tiêu chuẩn gì?', `Dự kiến bàn giao ${p.handover}, hoàn thiện cơ bản nội thất liền tường, thiết bị vệ sinh và bếp cao cấp.`],
    ['Người nước ngoài có được mua không?', 'Người nước ngoài được sở hữu căn hộ trong hạn mức pháp luật cho phép (tối đa 30% số căn của tòa, thời hạn 50 năm, có thể gia hạn).'],
    ['Phí quản lý bao nhiêu?', p.type === 'Đất nền' ? 'Đất nền không phát sinh phí quản lý căn hộ. Phí bảo trì hạ tầng khu dân cư được thông báo theo quy chế ban quản lý.' : 'Phí quản lý dự kiến 12.000 – 18.000 đ/m²/tháng, tùy loại hình và khối tiện ích.'],
    ['Có cam kết cho thuê không?', p.yield ? `Lợi suất cho thuê tham khảo khu vực ~${p.yield}%/năm. Liên hệ để nhận phương án cho thuê chi tiết.` : 'Đất nền chủ yếu đầu tư tăng giá; chuyên viên sẽ tư vấn phương án khai thác.']];
  const galPrefer = ['Phối cảnh', 'Tiện ích', 'Nhà mẫu', 'Thực tế'];
  const galCats = {};
  const savedCats = Array.isArray(p.galleryCats) ? p.galleryCats : [];
  if (savedCats.some(c => String(c || '').trim())) {
    p.gallery.forEach((_, i) => { const c = String(savedCats[i] || '').trim() || 'Thư viện'; (galCats[c] = galCats[c] || []).push(i); });
  } else galPrefer.forEach((name, idx) => { const ix = []; for (let i = idx; i < p.gallery.length; i += galPrefer.length) ix.push(i); if (!ix.length) ix.push(0); galCats[name] = ix; });
  const galOrder = Object.keys(galCats).sort((a, b) => { const ia = galPrefer.indexOf(a), ib = galPrefer.indexOf(b); if (ia < 0 && ib < 0) return a.localeCompare(b, 'vi'); if (ia < 0) return 1; if (ib < 0) return -1; return ia - ib; });
  const overview = p.overview || `${p.desc} Dự án được quy hoạch đồng bộ, hướng tới cộng đồng cư dân văn minh với hệ tiện ích chuẩn resort và kết nối thuận tiện tới các trục giao thông huyết mạch.`;
  const highlights = (Array.isArray(p.highlights) && p.highlights.length) ? p.highlights.map(h => [h.title, h.text]) : [['Tầm nhìn', 'Đa hướng, thoáng vĩnh viễn'], ['Kết nối', '5 phút đến trục chính'], ['Thiết kế', 'Kiến trúc xanh, đạt chuẩn EDGE'], ['Lợi suất', p.yield ? `~${p.yield}%/năm` : 'Tăng giá ~' + p.growth + '%/năm']];
  const loanRatio = p.loanRatio != null ? p.loanRatio : 70, loanYears = p.loanYears || 20, loanRate = p.loanRate != null ? p.loanRate : 9.5;
  const fav = () => JSON.parse(localStorage.getItem('kt_fav') || '[]');
  const ic = (d) => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const I = { heart: ic('<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>'), share: ic('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>'), dl: ic('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>'), cal: ic('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'), scale: ic('<path d="M12 3v18M5 7h14M5 7l-3 7a4 4 0 0 0 6 0zM19 7l-3 7a4 4 0 0 0 6 0z"/>'), play: '<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>' };

  /* ---------- HERO ---------- */
  $('#xHero').innerHTML = `<div class="xh-bg" style="background-image:url(${p.image})"></div><div class="xh-shade"></div>
  <div class="container xh-in"><div class="crumbs"><a href="index.html">Trang chủ</a> / <a href="du-an.html">Dự án</a> / <a href="du-an.html?area=${encodeURIComponent(p.area)}">${p.area}</a> / ${p.name}</div>
   <div class="xh-tags"><span class="badge s-${ST}">${STATUS[ST]}</span>${p.hot ? '<span class="xtag hotx">🔥 Bán chạy</span>' : ''}<span class="xtag">${p.type}</span><span class="xtag">📍 ${p.area}</span></div>
   <h1>${p.name}</h1><p class="xh-desc pre-line">${esc(p.desc || "")}</p>
   <div class="xh-price"><small>Giá bán tham khảo</small><b>${fmtTy(p.priceFrom)} – ${fmtTy(p.priceTo)}</b><span>≈ ${Math.round(p.priceFrom * 1000 / unitTypes[0].area)} triệu/m²</span></div>
   <div class="xh-stats">${[['Chủ đầu tư', p.dev], ['Quy mô', p.scale], ['Loại căn', isLand ? 'Đất nền 80–120m²' : p.beds.join(' · ') + ' PN'], ['Bàn giao', p.handover]].map(([a, b]) => `<div><small>${a}</small><b>${b}</b></div>`).join('')}</div>
   <div class="xh-cta"><button class="btn btn-gold" data-modal="Nhận báo giá">Nhận báo giá</button><button class="btn btn-glass" data-modal="Đặt lịch tham quan">${I.cal} Đặt lịch tham quan</button><button class="btn btn-glass" data-modal="Tải brochure">${I.dl} Tải brochure</button></div></div>
  <div class="xh-actions"><button class="xa" id="favBtn" aria-label="Lưu yêu thích">${I.heart}</button><button class="xa" id="shareBtn" aria-label="Chia sẻ">${I.share}</button><label class="xa" aria-label="So sánh" title="Thêm vào so sánh"><input type="checkbox" data-cmp="${p.id}" hidden>${I.scale}</label><button class="xa xa-txt" data-goto="thu-vien">🖼 ${p.gallery.length} ảnh</button></div>
  <button class="xh-scroll" data-goto="tong-quan" aria-label="Cuộn xuống">⌄</button>`;

  /* ---------- NAV ---------- */
  const secs = [['tong-quan', 'Tổng quan'], ['vi-tri', 'Vị trí'], ['tien-ich', 'Tiện ích'], ['mat-bang', 'Mặt bằng'], ['bang-gia', 'Bảng giá'], ['chinh-sach', 'Chính sách'], ['tien-do', 'Tiến độ'], ['thu-vien', 'Thư viện'], ['tai-chinh', 'Tính vay'], ['hoi-dap', 'Hỏi đáp']];
  $('#xNav').innerHTML = `<div class="container xn-in">${secs.map(([i, t]) => `<a href="#${i}" data-goto="${i}">${t}</a>`).join('')}<span class="xn-ink"></span></div>`;

  /* ---------- BODY ---------- */
  const sec = (id, eb, h, body, cls = '') => `<section id="${id}" class="xs reveal ${cls}"><div class="xs-h"><span class="eyebrow">${eb}</span><h2>${h}</h2></div>${body}</section>`;
  const spec = [['🏢', 'Chủ đầu tư', p.dev], ['📐', 'Quy mô', p.scale], ['🌿', 'Mật độ xây dựng', p.density || (isLand ? '55%' : '28%')], ['📜', 'Pháp lý', p.legal || 'QH 1/500 · GPXD · Bảo lãnh NH'], ['🔑', 'Bàn giao', p.handover], ['🏷️', 'Hình thức sở hữu', p.ownership || (p.type === 'Condotel' ? '50 năm' : 'Lâu dài (người Việt)')], ['🏘️', 'Loại hình', p.type], ['🏗️', 'Tổng thầu', p.contractor || 'Tổng thầu xây dựng hạng A'], ['📍', 'Vị trí', p.area]];
  $('#xMain').innerHTML =
  sec('tong-quan', 'Tổng quan', `Tổng quan ${p.name}`, `<p class="lead-p pre-line">${esc(overview)}</p>
   <div class="spec-grid">${spec.map(([i, a, b]) => `<div><span>${i}</span><small>${a}</small><b>${b}</b></div>`).join('')}</div>
   <div class="hl">${highlights.map(([a, b]) => `<div><b>${a}</b><span>${b}</span></div>`).join('')}</div>`) +
  sec('vi-tri', 'Vị trí', 'Vị trí & kết nối vùng', `<div class="loc"><div class="map"><iframe title="Bản đồ ${p.name}" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(p.address || (p.area + ', Việt Nam'))}&z=12&output=embed"></iframe></div>
   <ul class="conn">${conn.map(([i, t, m]) => `<li><span>${i}</span><div><b>${t}</b><i style="--w:${Math.min(100, m * 3)}%"></i></div><em>${m} phút</em></li>`).join('')}</ul></div>`) +
  sec('tien-ich', 'Tiện ích', 'Hệ tiện ích đặc quyền', `<div class="xtabs" data-tabs="am"><button class="on" data-t="in">Nội khu (${amIn.length})</button><button data-t="out">Ngoại khu (${amOut.length})</button></div>
   <div class="am-grid" data-pane="am:in">${amIn.map(([i, t]) => `<div><span>${i}</span>${t}</div>`).join('')}</div><div class="am-grid" data-pane="am:out" hidden>${amOut.map(([i, t]) => `<div><span>${i}</span>${t}</div>`).join('')}</div>`) +
  sec('mat-bang', 'Mặt bằng', 'Mặt bằng & loại căn', `<div class="xtabs" data-tabs="fp">${unitTypes.map((u, i) => `<button class="${i ? '' : 'on'}" data-t="${u.key}">${u.name}</button>`).join('')}</div>
   ${unitTypes.map((u, i) => `<div class="fp" data-pane="fp:${u.key}" ${i ? 'hidden' : ''}><div class="fp-img"><svg viewBox="0 0 300 200" class="fp-svg"><rect x="10" y="10" width="280" height="180" rx="4"/><line x1="${110 + i * 15}" y1="10" x2="${110 + i * 15}" y2="190"/><line x1="10" y1="110" x2="${110 + i * 15}" y2="110"/><line x1="${110 + i * 15}" y1="90" x2="290" y2="90"/><text x="30" y="65">${isLand ? 'Lô đất' : 'Phòng ngủ'}</text><text x="30" y="155">${isLand ? '' : 'WC · Bếp'}</text><text x="${170 + i * 10}" y="55">${isLand ? '' : 'Phòng khách'}</text><text x="${170 + i * 10}" y="150">${isLand ? 'Mặt tiền' : 'Ban công'}</text></svg><img loading="lazy" src="${u.img}" alt="Nội thất ${u.name}"></div>
   <div class="fp-info"><h3>${u.name}</h3><dl><dt>Diện tích</dt><dd>${u.area} m²</dd><dt>Phòng ngủ</dt><dd>${u.beds ? u.beds : '—'}</dd><dt>WC</dt><dd>${u.baths ? u.baths : '—'}</dd><dt>Giá từ</dt><dd class="gold">${fmtTy(u.price)}</dd><dt>Đơn giá</dt><dd>~${u.area ? Math.round(u.price * 1000 / u.area) : '—'} tr/m²</dd></dl><button class="btn btn-gold w" data-modal="Nhận mặt bằng ${u.name}">Nhận mặt bằng chi tiết</button></div></div>`).join('')}`) +
  sec('bang-gia', 'Bảng giá', 'Bảng giá chi tiết', `<div class="pf"><select id="pfBeds" aria-label="Lọc phòng ngủ"><option value="">${isLand ? 'Mọi loại nền' : 'Mọi loại PN'}</option>${unitTypes.map(u => `<option value="${u.name}">${u.name}</option>`).join('')}</select>
   <select id="pfFloor" aria-label="Lọc tầng"><option value="">${isApt ? 'Mọi tầng' : 'Mọi vị trí'}</option>${isApt ? '<option value="0-10">Tầng thấp (≤10)</option><option value="11-25">Tầng trung (11–25)</option><option value="26-99">Tầng cao (>25)</option>' : '<option value="1-1">Khu A</option><option value="2-3">Khu B–C</option>'}</select>
   <select id="pfDir" aria-label="Lọc hướng"><option value="">Mọi hướng</option>${DIRS.map(d => `<option>${d}</option>`).join('')}</select><label class="pf-chk"><input type="checkbox" id="pfAvail"> Chỉ căn còn trống</label></div>
   <div class="tscroll"><table class="tbl ptbl"><thead><tr>${[['code', 'Mã căn'], ['type', 'Loại'], ['floor', isApt ? 'Tầng' : 'Khu'], ['dir', 'Hướng'], ['area', 'DT (m²)'], ['price', 'Giá (VNĐ)'], ['', 'Trạng thái']].map(([k, t]) => `<th ${k ? `data-sort="${k}" tabindex="0"` : ''}>${t}${k ? ' <i>↕</i>' : ''}</th>`).join('')}</tr></thead><tbody id="ptBody"></tbody></table></div><p class="muted sm">* Giá tham khảo đã gồm VAT, chưa gồm 2% phí bảo trì. <span id="ptCount"></span></p>`) +
  sec('chinh-sach', 'Chính sách', 'Chính sách bán hàng & tiến độ thanh toán', `<div class="pol">${policies.map(([a, b]) => `<div><b>${a}</b><span>${b}</span></div>`).join('')}</div>
   <ol class="paytl">${pay.map(([a, b], i) => `<li><span>${i + 1}</span><div><b>${a}</b><em>${b}</em></div></li>`).join('')}</ol>${promo ? `<div class="note pre-line">${esc(String(promo).startsWith('🎁') ? promo : '🎁 ' + promo)}</div>` : ''}`) +
  sec('tien-do', 'Tiến độ', 'Tiến độ xây dựng', `<div class="pg-head"><b>${prog}%</b><div class="progress"><i style="width:${prog}%"></i></div><small>Cập nhật ${p.progressAt || '10/2026'}</small></div>
   <div class="btl">${build.map(([t, d, done, img], i) => `<div class="${done ? 'done' : ''}"><img loading="lazy" src="${img || gAt(i + 3)}" alt="${t}"><small>${d}</small><b>${t}</b><em>${done ? '✓ Hoàn thành' : 'Sắp tới'}</em></div>`).join('')}</div>`) +
  sec('thu-vien', 'Thư viện', 'Hình ảnh, video & tour 360°', `<div class="xtabs" id="galTabs">${['Tất cả', ...galOrder].map((c, i) => `<button class="${i ? '' : 'on'}" data-c="${c}">${c}</button>`).join('')}</div><div class="xgal" id="xGal"></div>
   <div class="media2"><div class="vid" role="button" tabindex="0" aria-label="Phát video tour" style="background-image:url(${gAt(1)})"><span>${I.play}</span><b>Video tour dự án</b><small>${p.video ? 'Bấm để xem video tour' : 'Video tour cập nhật khi chủ đầu tư bàn giao bản dựng'}</small></div>
   <div class="vid v360" role="button" tabindex="0" aria-label="Mở tour 360" style="background-image:url(${gAt(4)})"><span>360°</span><b>Tham quan nhà mẫu 360°</b><small>${p.tour ? 'Bấm để mở tour 360°' : 'Tour 360° mở khi nhà mẫu hoàn thiện'}</small></div></div>`) +
  sec('tai-chinh', 'Tài chính', 'Tính khoản vay cho dự án', `<div class="lc"><div class="lc-f"><label>Giá căn (tỷ) <output id="lcPv"></output></label><input type="range" id="lcP" min="${p.priceFrom}" max="${Math.max(p.priceTo, p.priceFrom)}" step="0.1" value="${p.priceFrom}">
   <label>Tỷ lệ vay <output id="lcRv"></output></label><input type="range" id="lcR" min="0" max="${Math.max(70, loanRatio)}" step="5" value="${loanRatio}"><label>Thời hạn <output id="lcYv"></output></label><input type="range" id="lcY" min="5" max="${Math.max(25, loanYears)}" step="1" value="${loanYears}"><label>Lãi suất <output id="lcIv"></output></label><input type="range" id="lcI" min="6" max="14" step="0.1" value="${loanRate}"></div>
   <div class="lc-o"><div class="donut" id="lcD"></div><div id="lcOut"></div><a class="btn btn-ghost w" href="cong-cu-tai-chinh.html?price=${p.priceFrom}&yield=${p.yield}">Phân tích ROI đầy đủ →</a></div></div>`) +
  sec('hoi-ai', 'AI thực chiến', '✦ Hỏi AI về dự án này', `<div class="aibox"><p>Trợ lý AI trả lời tức thì về giá, pháp lý, vay vốn, so sánh với dự án tương tự. Chọn một câu hỏi gợi ý hoặc tự đặt câu hỏi:</p>
   <div class="aiq">${[`Giá ${p.name} bao nhiêu?`, `${p.type} ${p.area} dưới ${Math.ceil(p.priceFrom + 1)} tỷ`, 'Pháp lý dự án thế nào?', 'Hỗ trợ vay ngân hàng ra sao?', 'Gặp chuyên viên'].map(q => `<button>${q}</button>`).join('')}</div>
   <form class="aiform"><input placeholder="Hỏi bất kỳ điều gì về ${p.name}..." aria-label="Câu hỏi cho AI"><button class="btn btn-gold">Hỏi AI</button></form></div>`, 'dark') +
  sec('hoi-dap', 'FAQ', 'Câu hỏi thường gặp', `<div class="acc">${faqs.map(([q, a], i) => `<details ${i ? '' : 'open'}><summary>${esc(q)}</summary><p class="pre-line">${esc(a)}</p></details>`).join('')}</div>`) +
  sec('tai-lieu', 'Tài liệu', 'Tài liệu dự án', `<div class="docs">${docs.map(([t, s]) => `<button data-modal="Tải ${t}"><span>${I.dl}</span><div><b>${t}</b><small>${s}</small></div><em>Tải về</em></button>`).join('')}</div>`) +
  sec('tuong-tu', 'Gợi ý', 'Dự án tương tự', `<div class="car-wrap"><button class="car-b prev" aria-label="Trước">‹</button><div class="car" id="car">${rankProjects({ area: p.area, type: p.type, max: p.priceTo * 1.3 }, 8).filter(x => x.p.id !== p.id).map(x => card(x.p)).join('')}</div><button class="car-b next" aria-label="Sau">›</button></div>`);

  /* ---------- SIDEBAR / AGENT ---------- */
  $('#xSide').innerHTML = `<div class="agent"><div class="ag-top"><img src="${U('photo-1573496359142-b8d87734a5a2', 200)}" alt="Chuyên viên"><div><b>Chuyên viên dự án</b><small>Phụ trách ${p.name}</small><span class="dot"></span> <small>Đang trực tuyến</small></div></div>
   <div class="ag-price"><small>Giá từ</small><b>${fmtTy(p.priceFrom)}</b><span class="badge s-${ST}">${STATUS[ST]}</span></div>
   <div class="ag-tabs xtabs" data-tabs="ag"><button class="on" data-t="q">Nhận báo giá</button><button data-t="v">Đặt lịch xem</button></div>
   <div data-pane="ag:q">${leadForm('bao-gia:' + p.id, 'Nhận báo giá ngay')}</div>
   <div data-pane="ag:v" hidden><form class="lead" data-lead="dat-lich:${p.id}"><input type="hidden" name="projectId" value="${esc(p.id)}"><small class="lead-proj">Dự án: <b>${esc(p.name)}</b></small><input name="name" placeholder="Họ và tên" required><input name="phone" placeholder="Số điện thoại" required inputmode="tel"><input name="date" type="date" aria-label="Ngày tham quan"><select name="time" aria-label="Khung giờ"><option>Sáng (9:00–11:30)</option><option>Chiều (14:00–17:00)</option></select><button class="btn btn-gold">Đặt lịch tham quan</button></form></div>
   <div class="cta2"><a class="btn btn-outline" href="tel:${tel}">☎ ${telShow}</a><a class="btn btn-zalo" href="${zalo}" target="_blank" rel="noopener">Zalo</a></div><p class="ag-note">🔥 ${12 + p.id.length} người đang xem dự án này</p></div>`;
  document.body.insertAdjacentHTML('beforeend', `<div class="mbar"><div><small>Giá từ</small><b>${fmtTy(p.priceFrom)}</b></div><a href="tel:${tel}" class="mb-ic" aria-label="Gọi">☎</a><a href="${zalo}" class="mb-ic z" target="_blank" rel="noopener" aria-label="Zalo">Zalo</a><button class="btn btn-gold sm" data-modal="Nhận báo giá">Nhận báo giá</button></div>
   <div class="xmodal" id="xModal" aria-hidden="true"><div class="xm-box" role="dialog" aria-modal="true"><button class="xm-x" aria-label="Đóng">✕</button><h3 id="xmT"></h3><p class="muted">${p.name} · Chuyên viên phản hồi trong 5 phút.</p><div id="xmF"></div></div></div>
   <div class="xlb" id="xLb" aria-hidden="true"><button class="lb-x" aria-label="Đóng">✕</button><button class="lb-n prev" aria-label="Ảnh trước">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-n next" aria-label="Ảnh sau">›</button></div>`);
  document.body.classList.add('has-mbar');

  /* ---------- tương tác ---------- */
  // Tabs chung
  $$('[data-tabs]').forEach(t => t.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const g = t.dataset.tabs;
    $$('button', t).forEach(x => x.classList.toggle('on', x === b)); $$(`[data-pane^="${g}:"]`).forEach(pn => pn.hidden = pn.dataset.pane !== g + ':' + b.dataset.t); }));
  // Scroll tới mục
  const navH = () => $('.header').offsetHeight + $('#xNav').offsetHeight + 8;
  document.addEventListener('click', e => { const g = e.target.closest('[data-goto]'); if (!g) return; e.preventDefault(); const t = document.getElementById(g.dataset.goto); scrollTo({ top: t.getBoundingClientRect().top + scrollY - navH(), behavior: 'smooth' }); });
  // Scrollspy
  const links = $$('#xNav a'), ink = $('.xn-ink');
  const spy = () => { let cur = secs[0][0]; secs.forEach(([id]) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top - navH() < 60) cur = id; });
    links.forEach(a => { const on = a.dataset.goto === cur; if (on && !a.classList.contains('on')) { a.parentElement.scrollTo({ left: a.offsetLeft - 40, behavior: 'smooth' }); } a.classList.toggle('on', on); if (on) { ink.style.width = a.offsetWidth + 'px'; ink.style.transform = `translateX(${a.offsetLeft}px)`; } });
    $('#xNav').classList.toggle('stuck', $('#xNav').getBoundingClientRect().top <= $('.header').offsetHeight + 1);
    document.body.classList.toggle('mbar-on', scrollY > innerHeight * .6); };
  addEventListener('scroll', spy, { passive: true }); addEventListener('resize', spy); spy();
  // Hero parallax
  const bg = $('.xh-bg'); addEventListener('scroll', () => { if (scrollY < innerHeight) bg.style.transform = `translateY(${scrollY * .3}px) scale(1.08)`; }, { passive: true });
  // Modal
  const modal = $('#xModal');
  const openM = t => { $('#xmT').textContent = t; $('#xmF').innerHTML = leadForm(norm(t).replace(/\s+/g, '-') + ':' + p.id, t.startsWith('Tải') ? 'Nhận tài liệu qua Zalo' : t); bindLeadForms(); modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); setTimeout(() => $('#xmF input').focus(), 100); };
  const closeM = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); };
  document.addEventListener('click', e => { const b = e.target.closest('[data-modal]'); if (b) { e.preventDefault(); openM(b.dataset.modal); } });
  modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('.xm-x')) closeM(); });
  // Yêu thích & chia sẻ
  const fb = $('#favBtn'), syncFav = () => fb.classList.toggle('on', fav().includes(p.id)); syncFav();
  fb.onclick = () => { const f = fav(), on = f.includes(p.id); localStorage.setItem('kt_fav', JSON.stringify(on ? f.filter(x => x !== p.id) : [...f, p.id])); syncFav(); toast(on ? 'Đã bỏ khỏi yêu thích' : '❤ Đã lưu vào yêu thích'); };
  $('#shareBtn').onclick = async () => { if (navigator.share) { try { await navigator.share({ title: p.name, url }); } catch (e) {} return; }
    toast('Chia sẻ: '); const t = $('.toast:last-of-type'); if (t) t.innerHTML = `Chia sẻ: <a target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}">Facebook</a> · <a target="_blank" rel="noopener" href="https://zalo.me/share?url=${encodeURIComponent(url)}">Zalo</a> · <a href="#" id="cpy">Sao chép link</a>`;
    const c = $('#cpy'); if (c) c.onclick = e => { e.preventDefault(); navigator.clipboard && navigator.clipboard.writeText(url); toast('Đã sao chép liên kết'); }; };
  // Bảng giá
  const ps = { k: 'price', d: 1 };
  function renderPT() { const b = $('#pfBeds').value, fl = $('#pfFloor').value, dir = $('#pfDir').value, av = $('#pfAvail').checked, [a, z] = fl ? fl.split('-').map(Number) : [0, 999];
    const list = units.filter(u => (!b || u.type === b) && u.floor >= a && u.floor <= z && (!dir || u.dir === dir) && (!av || !u.sold)).sort((x, y) => (x[ps.k] > y[ps.k] ? 1 : -1) * ps.d);
    $('#ptBody').innerHTML = list.map(u => `<tr class="${u.sold ? 'sold' : ''}"><td><b>${u.code}</b></td><td>${u.type}</td><td>${isApt ? u.floor : 'Khu ' + 'ABC'[u.floor - 1]}</td><td>${u.dir}</td><td>${u.area}</td><td class="gold">${Math.round(u.price * 1e3).toLocaleString('vi-VN')} tr</td><td>${u.sold ? '<span class="st sold">Đã bán</span>' : `<button class="st av" data-modal="Giữ chỗ căn ${u.code}">Giữ chỗ</button>`}</td></tr>`).join('') || '<tr><td colspan="7" class="muted" style="text-align:center">Không có căn phù hợp</td></tr>';
    $('#ptCount').textContent = `Hiển thị ${list.length}/${units.length} căn · ${units.filter(u => !u.sold).length} căn còn trống.`;
    $$('.ptbl th[data-sort]').forEach(th => th.classList.toggle('on', th.dataset.sort === ps.k)); }
  $$('.pf select, #pfAvail').forEach(s => s.onchange = renderPT);
  $$('.ptbl th[data-sort]').forEach(th => { const go = () => { ps.d = ps.k === th.dataset.sort ? -ps.d : 1; ps.k = th.dataset.sort; renderPT(); }; th.onclick = go; th.onkeydown = e => e.key === 'Enter' && go(); }); renderPT();
  // Gallery + lightbox
  const allImgs = Object.entries(galCats).flatMap(([c, ix]) => ix.map(i => ({ c, src: p.gallery[i] })));
  let shown = allImgs, li = 0;
  const renderGal = c => { shown = c === 'Tất cả' ? allImgs : allImgs.filter(x => x.c === c); $('#xGal').innerHTML = shown.map((x, i) => `<button class="gi" data-i="${i}" aria-label="Xem ảnh ${i + 1}"><img loading="lazy" src="${x.src}" alt="${p.name} – ${x.c}"><span>${x.c}</span></button>`).join(''); };
  $('#galTabs').onclick = e => { const b = e.target.closest('button'); if (!b) return; $$('#galTabs button').forEach(x => x.classList.toggle('on', x === b)); renderGal(b.dataset.c); }; renderGal('Tất cả');
  const lb = $('#xLb'), show = i => { li = (i + shown.length) % shown.length; $('img', lb).src = shown[li].src.replace('w=900', 'w=1600'); $('figcaption', lb).textContent = `${shown[li].c} · ${li + 1}/${shown.length}`; };
  const openLb = i => { show(i); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }, closeLb = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
  $('#xGal').onclick = e => { const g = e.target.closest('.gi'); if (g) openLb(+g.dataset.i); };
  lb.onclick = e => { if (e.target.closest('.prev')) show(li - 1); else if (e.target.closest('.next')) show(li + 1); else if (!e.target.closest('img')) closeLb(); };
  addEventListener('keydown', e => { if (e.key === 'Escape') { closeLb(); closeM(); } if (!lb.classList.contains('open')) return; if (e.key === 'ArrowLeft') show(li - 1); if (e.key === 'ArrowRight') show(li + 1); });
  let sx = 0; lb.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true }); lb.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) show(li + (dx < 0 ? 1 : -1)); });
  $$('.vid').forEach(v => v.onclick = () => {
    const link = v.classList.contains('v360') ? p.tour : p.video;
    if (!link) { toast(v.classList.contains('v360') ? 'Chưa có link tour 360°. Thêm trong trang quản trị.' : 'Chưa có link video. Thêm trong trang quản trị.'); return; }
    if (/^https?:\/\//i.test(link)) window.open(link, '_blank', 'noopener');
    else location.href = link;
  });
  // Vay
  const vnd = v => Math.round(v).toLocaleString('vi-VN') + ' đ';
  function loan() { const P = +$('#lcP').value * 1e9, R = +$('#lcR').value / 100, Y = +$('#lcY').value, r = +$('#lcI').value / 1200, n = Y * 12, L = P * R, pmt = L ? (r ? L * r / (1 - Math.pow(1 + r, -n)) : L / n) : 0, interest = pmt * n - L;
    $('#lcPv').textContent = fmtTy(P / 1e9); $('#lcRv').textContent = R * 100 + '%'; $('#lcYv').textContent = Y + ' năm'; $('#lcIv').textContent = $('#lcI').value + '%/năm';
    const own = P - L, tot = own + L + interest, a1 = own / tot * 100, a2 = a1 + L / tot * 100;
    $('#lcD').style.background = `conic-gradient(#C9A24B 0 ${a1}%, #1E3A66 ${a1}% ${a2}%, #8FA3C2 ${a2}% 100%)`; $('#lcD').innerHTML = `<div><small>Trả hàng tháng</small><b>${vnd(pmt)}</b></div>`;
    $('#lcOut').innerHTML = `<ul class="lg"><li><i style="background:#C9A24B"></i>Vốn tự có <b>${vnd(own)}</b></li><li><i style="background:#1E3A66"></i>Khoản vay <b>${vnd(L)}</b></li><li><i style="background:#8FA3C2"></i>Tổng lãi <b>${vnd(interest)}</b></li><li>Thu nhập đề xuất <b>≥ ${vnd(pmt * 2)}/tháng</b></li></ul>`; }
  $$('.lc input').forEach(i => i.oninput = loan); loan();
  // AI box
  const ask = q => { Chat.toggle(true); setTimeout(() => Chat.user(q), 250); };
  $$('.aiq button').forEach(b => b.onclick = () => ask(b.textContent));
  $('.aiform').onsubmit = e => { e.preventDefault(); const v = $('.aiform input').value.trim(); if (v) { ask(v.includes(p.name) ? v : v + ' ' + p.name); $('.aiform input').value = ''; } };
  // Carousel
  const car = $('#car'); $('.car-b.prev').onclick = () => car.scrollBy({ left: -car.clientWidth * .8, behavior: 'smooth' }); $('.car-b.next').onclick = () => car.scrollBy({ left: car.clientWidth * .8, behavior: 'smooth' });
  bindLeadForms(); Cmp.ui();
};
