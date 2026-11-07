# Khang Thịnh Land – website tĩnh (khangthinhland.com)

HTML + `css/style.css` + `js/` – không cần build. Mở `index.html` hoặc chạy `python3 -m http.server` rồi vào http://localhost:8000.

## So sánh với dongtayland.vn (chỉ tham khảo cấu trúc thông tin)
**dongtayland.vn có:** menu Trang chủ · Về chúng tôi · Dự án (BĐS Việt Nam / BĐS Úc) · Tin tức (tin công ty, tin dự án, tin cộng đồng) · Tuyển dụng · Liên hệ · Cổ đông; trang chủ giới thiệu tầm nhìn – sứ mệnh – giá trị cốt lõi, công ty thành viên, lĩnh vực, giải thưởng; trang dự án nhóm theo chủ đầu tư + mục "dự án hot"; tuyển dụng dạng danh sách vị trí; hotline/Zalo nổi.
**Không sao chép** văn bản, logo, hình ảnh, thương hiệu – toàn bộ nội dung là mới và dữ liệu dự án là giả lập.

**Khang Thịnh Land nâng cấp:**
- Giao diện navy + gold, hero glassmorphism, hiệu ứng cuộn, chế độ sáng/tối, responsive đầy đủ.
- Dự án lọc thật theo khu vực / loại hình / trạng thái (đang mở bán, sắp mở bán, đã bàn giao) / giá / số PN, sắp xếp.
- Tìm kiếm ngôn ngữ tự nhiên ("căn hộ 2PN dưới 3 tỷ ở Thủ Đức" → bộ lọc).
- Trang chi tiết dự án đủ mục: tổng quan, vị trí, tiện ích, mặt bằng, bảng giá, chính sách, tiến độ, thư viện ảnh (lightbox), form nhận báo giá, dự án tương tự.
- AI thực chiến: chatbot mọi trang (FAQ, gợi ý dự án, thu lead, chip trả lời nhanh), quiz tư vấn tìm nhà (% phù hợp), công cụ vay & ROI, so sánh 2–3 dự án kèm nhận định, AI tóm tắt tin tức.
- CTA hotline/Zalo nổi, form lead lưu `localStorage` (`kt_leads`) và gửi webhook nếu cấu hình.

## Cấu trúc
| Trang | File |
|---|---|
| Trang chủ | index.html |
| Giới thiệu (lịch sử, tầm nhìn, lãnh đạo, đối tác CĐT) | gioi-thieu.html |
| Dự án + bộ lọc | du-an.html (`?area=`, `?type=`, `?status=`, `?q=`) |
| Chi tiết dự án | du-an-chi-tiet.html?id=... |
| Tin tức / chi tiết | tin-tuc.html, tin-tuc-chi-tiet.html?id=... |
| Tuyển dụng / chi tiết | tuyen-dung.html, tuyen-dung-chi-tiet.html?id=... |
| Liên hệ, 404 | lien-he.html, 404.html |
| AI tư vấn, Tài chính, So sánh | tu-van-ai.html, cong-cu-tai-chinh.html, so-sanh.html |

JS: `ai-config.js` (cấu hình AI) · `data.js` (dữ liệu mẫu: dự án, tin, việc làm, FAQ) · `ai.js` (phân tích câu, chấm điểm, chatbot, lead) · `main.js` (header/footer, render trang).

## Gắn LLM thật
Sửa `js/ai-config.js`:
```js
provider: 'openai-compatible',
endpoint: 'https://api.cua-ban.com/v1/chat/completions', // khuyến nghị: proxy backend
apiKey: '',            // KHÔNG nên để key thật ở frontend – để proxy gắn key
model: 'ten-model',
leadWebhook: 'https://script.google.com/...'           // nhận lead
```
Chatbot sẽ gửi system prompt + danh sách dự án làm ngữ cảnh; lỗi API tự động quay về chế độ local. Bước thu lead (tên, SĐT) luôn chạy local.

## Thay dữ liệu
Sửa `js/data.js` (PROJECTS/NEWS/JOBS/TEAM/FAQ). Hotline/Zalo: tìm `0900 000 000` / `0900000000` và `AI_CONFIG.zalo`.

## Giới hạn
Dữ liệu, tên dự án, CĐT, lãnh đạo, địa chỉ là **mẫu**. "AI" mặc định là luật + chấm điểm trên dữ liệu mẫu, không phải LLM. Lead chỉ lưu localStorage nếu chưa có webhook. Ảnh từ Unsplash (hotlink). Bản đồ dùng Google Maps embed.
