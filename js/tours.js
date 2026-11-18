/* Phòng tham quan dùng chung cho video tour và tour 360° */
function tourEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function tourProject() {
  const id = new URLSearchParams(location.search).get('id');
  const list = typeof PROJECTS !== 'undefined' ? PROJECTS : [];
  return list.find(p => p.id === id) || null;
}

function tourRooms(p) {
  const sets = {
    'Căn hộ': ['Phối cảnh', 'Phòng khách', 'Bếp', 'Phòng ngủ', 'Ban công', 'Tiện ích'],
    'Biệt thự': ['Cổng vào', 'Sân vườn', 'Phòng khách', 'Bếp', 'Phòng ngủ', 'Hồ bơi'],
    'Nhà phố': ['Mặt tiền', 'Phòng khách', 'Bếp', 'Lầu', 'Sân thượng', 'Khu phố'],
    'Condotel': ['Sảnh', 'Phòng khách', 'Phòng ngủ', 'Ban công', 'Hồ bơi', 'Bãi biển'],
    'Đất nền': ['Tổng thể', 'Đường nội khu', 'Công viên', 'Cổng chào', 'Nhà mẫu', 'Tiện ích']
  };
  const names = sets[p.type] || sets['Căn hộ'];
  const imgs = (p.gallery && p.gallery.length ? p.gallery : [p.image]).filter(Boolean);
  return imgs.map((src, i) => ({
    src: src.replace(/w=\d+/, 'w=1800'),
    name: names[i] || ('Góc nhìn ' + (i + 1))
  }));
}

function tourBack(p) {
  return 'du-an-chi-tiet.html?id=' + encodeURIComponent(p.id);
}

/* Logo & favicon từ Cài đặt admin, dùng cho tour.html / video.html (không load main.js) */
function applyTourBrand(topEl) {
  const s = window.SITE || {};
  const iconSrc = s.favicon || s.logo || s.logoFooter;
  if (iconSrc) {
    let ic = document.querySelector('link[rel~="icon"]');
    if (!ic) { ic = document.createElement('link'); ic.rel = 'icon'; document.head.appendChild(ic); }
    ic.href = iconSrc;
  }
  if (!topEl || topEl.querySelector('.tlogo')) return;
  const h = Math.min(36, Math.max(22, Number(s.logoHeight) || 32));
  const src = s.logoFooter || s.logo;
  const name = s.logoName == null ? 'Khang Thịnh' : String(s.logoName);
  const sub = s.logoSub == null ? 'LAND' : String(s.logoSub);
  const text = s.logoText !== false && (name || sub) ? '<span>' + tourEsc(name) + (sub ? '<b>' + tourEsc(sub) + '</b>' : '') + '</span>' : '';
  const svg = '<svg viewBox="0 0 40 40" width="' + h + '" height="' + h + '"><defs><linearGradient id="tg" x1="0" x2="1"><stop stop-color="#E8C877"/><stop offset="1" stop-color="#B8892F"/></linearGradient></defs><path d="M20 3 36 13v24H4V13z" fill="none" stroke="url(#tg)" stroke-width="2.5"/><path d="M13 30V17h3v5l5-5h4l-6 6 6 7h-4l-5-6v6z" fill="url(#tg)"/></svg>';
  const mark = src ? '<img src="' + tourEsc(src) + '" alt="' + tourEsc(s.siteName || 'Logo') + '" style="height:' + h + 'px">' : svg;
  const a = document.createElement('a');
  a.href = 'index.html';
  a.className = 'tlogo';
  a.setAttribute('aria-label', s.siteName || 'Khang Thịnh Land');
  a.innerHTML = mark + text;
  const back = topEl.querySelector('a');
  if (back && back.nextSibling) topEl.insertBefore(a, back.nextSibling);
  else if (back) back.after(a);
  else topEl.appendChild(a);
}
