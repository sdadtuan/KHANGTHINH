/* AI thực chiến – bộ phân tích ngôn ngữ tự nhiên, gợi ý dự án, chatbot, lead */
const fmtTy = v => (v >= 1 ? (+v.toFixed(2)).toLocaleString('vi-VN') + ' tỷ' : Math.round(v * 1000) + ' triệu');
const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');

/* "căn hộ 2PN dưới 3 tỷ ở Thủ Đức" -> {type, beds, max, min, area, status, purpose} */
function parseQuery(q) {
  const s = norm(q), f = {};
  const typeMap = { 'can ho|chung cu|apartment': 'Căn hộ', 'nha pho|lien ke|shophouse|townhouse': 'Nhà phố', 'biet thu|villa': 'Biệt thự', 'dat nen|dat ': 'Đất nền', 'condotel|nghi duong': 'Condotel' };
  for (const k in typeMap) if (new RegExp(k).test(s + ' ')) { f.type = typeMap[k]; break; }
  const areaAlias = { 'thu duc|quan 2|q2|q9': 'Thủ Đức', 'quan 7|q7|phu my hung': 'Quận 7', 'binh duong': 'Bình Dương', 'dong nai|nhon trach': 'Đồng Nai', 'long an': 'Long An', 'nha trang|khanh hoa|cam ranh': 'Nha Trang', 'da nang': 'Đà Nẵng', 'ha noi|ho tay': 'Hà Nội' };
  for (const k in areaAlias) if (new RegExp(k).test(s)) { f.area = areaAlias[k]; break; }
  const b = s.match(/(\d)\s*(pn|phong ngu|phong)/); if (b) f.beds = +b[1];
  if (/studio/.test(s)) f.beds = 1;
  const num = '(\\d+(?:[.,]\\d+)?)\\s*(ty|trieu|tr)';
  const toTy = (n, u) => parseFloat(n.replace(',', '.')) / (u === 'ty' ? 1 : 1000);
  let m;
  if ((m = s.match(new RegExp('(?:tu\\s*)?' + num.replace('\\s*(ty|trieu|tr)', '') + '\\s*(?:ty)?\\s*(?:-|den|toi)\\s*' + num)))) { f.min = toTy(m[1], m[3]); f.max = toTy(m[2], m[3]); }
  else if ((m = s.match(new RegExp('(?:duoi|toi da|khong qua|<|max|tam|khoang|co)\\s*' + num)))) { f.max = toTy(m[1], m[2]) * (/tam|khoang/.test(m[0]) ? 1.15 : 1); }
  else if ((m = s.match(new RegExp('(?:tren|tu|>|it nhat)\\s*' + num)))) f.min = toTy(m[1], m[2]);
  else if ((m = s.match(new RegExp(num)))) f.max = toTy(m[1], m[2]) * 1.1;
  if (/sap mo ban|sap ra mat/.test(s)) f.status = 'sap-mo-ban'; else if (/ban giao|o ngay|co so/.test(s)) f.status = 'da-ban-giao'; else if (/dang mo ban|dang ban/.test(s)) f.status = 'dang-mo-ban';
  if (/dau tu|cho thue|sinh loi|loi nhuan/.test(s)) f.purpose = 'dau-tu'; else if (/de o|o that|gia dinh/.test(s)) f.purpose = 'o';
  return f;
}
function filterProjects(f) {
  return PROJECTS.filter(p => (!f.type || p.type === f.type) && (!f.area || p.area === f.area) && (!f.status || p.status === f.status)
    && (!f.beds || !p.beds.length || p.beds.includes(f.beds)) && (!f.max || p.priceFrom <= f.max) && (!f.min || p.priceTo >= f.min));
}
/* Chấm điểm phù hợp 0–100 */
function scoreProject(p, f) {
  let s = 0, w = 0;
  const add = (weight, val) => { w += weight; s += weight * val; };
  if (f.max || f.min) { const max = f.max || 999, min = f.min || 0; add(35, p.priceFrom <= max && p.priceTo >= min ? 1 : p.priceFrom <= max * 1.2 ? .5 : 0); }
  if (f.area) add(25, p.area === f.area ? 1 : 0.15);
  if (f.type) add(20, p.type === f.type ? 1 : 0.1);
  if (f.beds) add(10, !p.beds.length ? .3 : p.beds.includes(f.beds) ? 1 : Math.abs(p.beds[0] - f.beds) <= 1 ? .5 : 0);
  if (f.purpose) add(10, f.purpose === 'dau-tu' ? Math.min(1, (p.yield + p.growth) / 15) : (p.status === 'da-ban-giao' ? 1 : p.type === 'Condotel' ? .2 : .75));
  return w ? Math.round(s / w * 100) : 60;
}
function rankProjects(f, n = 3) { return PROJECTS.map(p => ({ p, score: scoreProject(p, f) })).sort((a, b) => b.score - a.score).slice(0, n); }
function describeFilters(f) {
  const t = []; if (f.type) t.push(f.type); if (f.beds) t.push(f.beds + ' phòng ngủ'); if (f.area) t.push('tại ' + f.area);
  if (f.min && f.max) t.push(`${fmtTy(f.min)}–${fmtTy(f.max)}`); else if (f.max) t.push('≤ ' + fmtTy(f.max)); else if (f.min) t.push('≥ ' + fmtTy(f.min));
  if (f.status) t.push(STATUS[f.status]); if (f.purpose) t.push(f.purpose === 'dau-tu' ? 'đầu tư' : 'để ở'); return t.join(', ');
}
/* Lưu lead: localStorage + webhook (nếu có) */
function projectById(id) {
  return (typeof PROJECTS !== 'undefined' ? PROJECTS : []).find(p => p.id === id) || null;
}
function projectFromSource(src) {
  const tail = String(src || '').split(':').pop();
  return projectById(tail);
}
function saveLead(lead) {
  if (lead.time && !/^\d{4}-\d{2}-\d{2}T/.test(lead.time)) lead.visitTime = lead.time;
  if (lead.date) lead.visitDate = lead.date;
  const fromPage = /du-an-chi-tiet\.html/i.test(location.pathname) ? (new URLSearchParams(location.search).get('id') || '') : '';
  const known = projectById(lead.projectId) || projectFromSource(lead.source) || projectById(fromPage);
  if (known) { lead.projectId = known.id; lead.projectName = known.name; }
  lead.time = new Date().toISOString();
  lead.page = location.pathname + location.search;
  const all = JSON.parse(localStorage.getItem('kt_leads') || '[]'); all.push(lead); localStorage.setItem('kt_leads', JSON.stringify(all));
  fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) }).catch(() => {});
  if (AI_CONFIG.leadWebhook) fetch(AI_CONFIG.leadWebhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) }).catch(() => {});
}
const PHONE_RE = /(0|\+84)(\d[\s.]?){8,10}/;

/* Gọi LLM thật nếu được cấu hình; lỗi -> fallback local */
async function llmReply(history, userMsg) {
  const ctx = PROJECTS.map(p => `${p.name} | ${p.type} | ${p.area} | ${fmtTy(p.priceFrom)}-${fmtTy(p.priceTo)} | ${STATUS[p.status]} | PN: ${p.beds.join(',') || '-'}`).join('\n');
  const res = await fetch(AI_CONFIG.endpoint, { method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, AI_CONFIG.apiKey ? { Authorization: 'Bearer ' + AI_CONFIG.apiKey } : {}),
    body: JSON.stringify({ model: AI_CONFIG.model, temperature: AI_CONFIG.temperature, messages: [{ role: 'system', content: AI_CONFIG.systemPrompt + '\nDữ liệu dự án:\n' + ctx }, ...history, { role: 'user', content: userMsg }] }) });
  const j = await res.json(); return j.choices[0].message.content.replace(/\n/g, '<br>');
}

const Chat = {
  history: [], lead: JSON.parse(localStorage.getItem('kt_chat_lead') || '{}'), step: null,
  init() {
    const el = document.createElement('div'); el.className = 'chat';
    el.innerHTML = `<button class="chat-fab" aria-label="Mở trợ lý AI"><span class="pulse"></span>✦<b>AI</b></button>
    <div class="chat-box" role="dialog" aria-label="Trợ lý AI Khang Thịnh">
      <div class="chat-head"><div class="ava">KT</div><div><strong>Trợ lý AI Khang Thịnh</strong><small><i class="dot"></i> Trực tuyến 24/7</small></div><button class="chat-x" aria-label="Đóng">✕</button></div>
      <div class="chat-body"></div><div class="chat-chips"></div>
      <form class="chat-input"><input placeholder="VD: căn hộ 2PN dưới 3 tỷ ở Thủ Đức" aria-label="Tin nhắn"><button aria-label="Gửi">➤</button></form>
      <div class="chat-cta"><a href="tel:${String(AI_CONFIG.hotline || '').replace(/\D/g, '')}">📞 ${AI_CONFIG.hotline || 'Hotline'}</a><a href="${AI_CONFIG.zalo}" target="_blank" rel="noopener">💬 Zalo</a></div></div>`;
    document.body.appendChild(el); this.el = el; this.body = el.querySelector('.chat-body');
    el.querySelector('.chat-fab').onclick = () => this.toggle(true); el.querySelector('.chat-x').onclick = () => this.toggle(false);
    el.querySelector('form').onsubmit = e => { e.preventDefault(); const i = e.target.querySelector('input'); if (i.value.trim()) this.user(i.value.trim()); i.value = ''; };
    this.bot(`Xin chào${this.lead.name ? ' ' + this.lead.name : ''}! 👋 Tôi là trợ lý AI của <b>Khang Thịnh Land</b>. Hãy cho tôi biết ngân sách, khu vực, loại hình bạn quan tâm — tôi sẽ gợi ý dự án phù hợp ngay.`, ['Căn hộ dưới 3 tỷ', 'Đầu tư cho thuê', 'Nhà phố Thủ Đức', 'Hỗ trợ vay', 'Gặp chuyên viên']);
    document.querySelectorAll('[data-open-chat]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); this.toggle(true); }));
  },
  toggle(o) { this.el.classList.toggle('open', o); if (o) setTimeout(() => this.el.querySelector('input').focus(), 200); },
  chips(list = []) { const c = this.el.querySelector('.chat-chips'); c.innerHTML = ''; list.forEach(t => { const b = document.createElement('button'); b.textContent = t; b.onclick = () => this.user(t); c.appendChild(b); }); },
  add(html, who) { const d = document.createElement('div'); d.className = 'msg ' + who; d.innerHTML = html; this.body.appendChild(d); this.body.scrollTop = this.body.scrollHeight; return d; },
  bot(html, chips) { const t = this.add('<span class="typing"><i></i><i></i><i></i></span>', 'bot'); setTimeout(() => { t.innerHTML = html; this.chips(chips); this.body.scrollTop = this.body.scrollHeight; }, 550); this.history.push({ role: 'assistant', content: html.replace(/<[^>]+>/g, '') }); },
  async user(text) {
    this.add(text.replace(/</g, '&lt;'), 'user'); this.chips();
    if (AI_CONFIG.provider !== 'local' && !this.step) {
      try { const r = await llmReply(this.history, text); this.history.push({ role: 'user', content: text }); return this.bot(r, ['Gặp chuyên viên']); } catch (e) { console.warn('LLM lỗi, dùng local', e); }
    }
    this.history.push({ role: 'user', content: text }); this.local(text);
  },
  local(text) {
    const s = norm(text);
    // Thu thập lead theo bước
    if (this.step === 'name') { this.lead.name = text.trim(); this.step = 'phone'; return this.bot(`Cảm ơn <b>${this.lead.name.replace(/</g, '')}</b>! Cho tôi xin số điện thoại để chuyên viên gửi bảng giá & chính sách mới nhất nhé.`); }
    const ph = text.match(PHONE_RE);
    if (this.step === 'phone' || ph) {
      if (!ph) return this.bot('Số điện thoại chưa hợp lệ, bạn kiểm tra lại giúp tôi (VD: 0901 234 567).');
      this.lead.phone = ph[0].replace(/\D/g, ''); this.step = null; localStorage.setItem('kt_chat_lead', JSON.stringify(this.lead));
      saveLead({ ...this.lead, source: 'chatbot', projectId: this.projectId || '', note: this.history.filter(h => h.role === 'user').map(h => h.content).join(' | ') });
      return this.bot(`✅ Đã ghi nhận! Chuyên viên Khang Thịnh Land sẽ gọi lại cho <b>${this.lead.name || 'bạn'}</b> qua số <b>${this.lead.phone}</b> trong 15 phút (giờ hành chính).`, ['Xem dự án hot', 'Tính khoản vay']);
    }
    if (/lam quiz/.test(s)) { location.href='tu-van-ai.html'; return; }
    if (/nhan bang gia|gap chuyen vien|tu van vien|goi lai|bao gia|lien he|de lai/.test(s)) { this.step = this.lead.name ? 'phone' : 'name'; return this.bot(this.lead.name ? 'Bạn cho tôi xin số điện thoại nhé?' : 'Rất sẵn lòng! Bạn cho tôi xin <b>họ tên</b> nhé?'); }
    if (/^(xin chao|chao|hello|hi)\b/.test(s)) return this.bot('Chào bạn! Bạn đang tìm nhà để ở hay đầu tư?', ['Mua để ở', 'Đầu tư cho thuê']);
    if (/tinh khoan vay|tinh vay/.test(s)) return this.bot('Mở <a href="cong-cu-tai-chinh.html">Công cụ tài chính</a> để tính trả góp hàng tháng và ROI cho thuê nhé.');
    if (/so sanh/.test(s)) return this.bot('Bạn có thể so sánh 2–3 dự án cạnh nhau tại <a href="so-sanh.html">trang So sánh</a>.');
    if (/hot|noi bat/.test(s)) return this.recommend({ status: 'dang-mo-ban' }, 'Các dự án đang mở bán nổi bật:');
    const f = parseQuery(text);
    if (/dau tu cho thue/.test(s)) f.purpose = 'dau-tu';
    if (Object.keys(f).length) return this.recommend(f);
    const faq = FAQ.find(q => q.k.some(k => s.includes(norm(k))));
    if (faq) return this.bot(faq.a, ['Gặp chuyên viên', 'Căn hộ dưới 3 tỷ']);
    const proj = PROJECTS.find(p => s.includes(norm(p.name)) || s.includes(norm(p.name.split(' ')[0])));
    if (proj) { this.projectId = proj.id; return this.bot(`<b>${proj.name}</b> – ${proj.type} tại ${proj.area}, giá ${fmtTy(proj.priceFrom)}–${fmtTy(proj.priceTo)}, ${STATUS[proj.status]}. ${proj.desc} <a href="du-an-chi-tiet.html?id=${proj.id}">Xem chi tiết →</a>`, ['Nhận bảng giá', 'Hỗ trợ vay']); }
    this.bot('Tôi chưa hiểu rõ ý bạn 🤔. Bạn thử mô tả: <i>loại hình + số phòng ngủ + ngân sách + khu vực</i>, ví dụ “căn hộ 2PN dưới 3 tỷ ở Thủ Đức”. Hoặc để lại SĐT để chuyên viên gọi lại.', ['Gặp chuyên viên', 'Làm quiz tìm nhà']);
    if (/quiz/.test(s)) location.href = 'tu-van-ai.html';
  },
  recommend(f, title) {
    const exact = filterProjects(f), list = (exact.length ? exact.map(p => ({ p, score: scoreProject(p, f) })).sort((a, b) => b.score - a.score) : rankProjects(f)).slice(0, 3);
    if (list[0]) this.projectId = list[0].p.id;
    const head = title || (exact.length ? `Tôi hiểu bạn cần: <b>${describeFilters(f)}</b>. Có ${exact.length} dự án phù hợp:` : `Chưa có dự án khớp hoàn toàn <b>${describeFilters(f)}</b>, đây là lựa chọn gần nhất:`);
    const cards = list.map(({ p, score }) => `<a class="mini" href="du-an-chi-tiet.html?id=${p.id}"><img src="${p.thumb}" alt=""><span><b>${p.name}</b><small>${p.type} · ${p.area}</small><small>${fmtTy(p.priceFrom)} – ${fmtTy(p.priceTo)}</small></span><em>${score}%</em></a>`).join('');
    this.bot(head + cards + 'Bạn muốn nhận bảng giá chi tiết không?', ['Nhận bảng giá', 'So sánh dự án', 'Tính khoản vay']);
  }
};
