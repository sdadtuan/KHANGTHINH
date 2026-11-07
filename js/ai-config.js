/* CẤU HÌNH AI – mặc định chạy chế độ "local" (luật + dữ liệu mẫu, không cần API key).
   Để dùng LLM thật: đặt provider:'openai-compatible', điền endpoint + model.
   KHUYẾN NGHỊ: không để apiKey trên frontend – trỏ endpoint tới proxy backend của bạn (vd /api/chat) giữ key ở server. */
window.AI_CONFIG = {
  provider: 'local',                 // 'local' | 'openai-compatible'
  endpoint: 'https://your-proxy.example.com/v1/chat/completions',
  apiKey: '',                        // để trống nếu proxy tự gắn key
  model: 'your-model-name',
  temperature: 0.4,
  systemPrompt: 'Bạn là trợ lý tư vấn bất động sản của Khang Thịnh Land. Trả lời ngắn gọn bằng tiếng Việt, lịch sự, chỉ dựa trên dữ liệu dự án được cung cấp; luôn mời khách để lại tên và SĐT.',
  leadWebhook: '',                   // URL nhận lead (Google Apps Script, CRM...). Trống = lưu localStorage
  hotline: '0900 000 000',
  zalo: 'https://zalo.me/0900000000'
};
