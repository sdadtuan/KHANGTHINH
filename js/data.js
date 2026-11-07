/* Sinh bởi admin Node (server.js). Sửa nội dung tại /admin */
const U = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;
const STATUS = {
 "dang-mo-ban": "Đang mở bán",
 "sap-mo-ban": "Sắp mở bán",
 "da-ban-giao": "Đã bàn giao"
};
const PROJECTS = [
 {
  "id": "aurora-riverside",
  "name": "Aurora Riverside",
  "area": "Thủ Đức",
  "type": "Căn hộ",
  "status": "dang-mo-ban",
  "priceFrom": 2.6,
  "priceTo": 5.8,
  "beds": [
   1,
   2,
   3
  ],
  "dev": "An Phú Gia Group",
  "scale": "3 tháp · 1.250 căn · 2,8 ha",
  "handover": "Q4/2027",
  "yield": 5.2,
  "growth": 8,
  "hot": true,
  "desc": "Căn hộ ven sông thiết kế xanh, kết nối Metro số 1 và cao tốc Long Thành.",
  "legal": "Đã có quy hoạch 1/500, giấy phép xây dựng, bảo lãnh ngân hàng và văn bản đủ điều kiện mở bán.",
  "address": "Mặt tiền đường Võ Nguyên Giáp, phường Thạnh Mỹ Lợi, TP. Thủ Đức, TP.HCM",
  "video": "video.html?id=aurora-riverside",
  "tour": "tour.html?id=aurora-riverside",
  "amenities": [
   "🏊 Hồ bơi tràn bờ",
   "🌳 Công viên trung tâm",
   "🏋️ Gym và Yoga",
   "🧒 Khu vui chơi trẻ em",
   "🍽️ Nhà hàng và café",
   "🧖 Spa và sauna",
   "🔒 An ninh 3 lớp 24/7",
   "⚡ Trạm sạc xe điện",
   "📚 Thư viện và co-working",
   "🛗 Sảnh đón tiêu chuẩn khách sạn"
  ],
  "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=75",
  "thumb": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=75",
  "gallery": [
   "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=75"
  ],
  "overview": "Căn hộ ven sông thiết kế xanh, kết nối Metro số 1 và cao tốc Long Thành. Dự án được quy hoạch đồng bộ, hướng tới cộng đồng cư dân văn minh với hệ tiện ích chuẩn resort và kết nối thuận tiện tới các trục giao thông huyết mạch.",
  "density": "28%",
  "ownership": "Lâu dài (người Việt)",
  "contractor": "Tổng thầu xây dựng hạng A",
  "highlights": [
   {
    "title": "Tầm nhìn",
    "text": "Đa hướng, thoáng vĩnh viễn"
   },
   {
    "title": "Kết nối",
    "text": "5 phút đến trục chính"
   },
   {
    "title": "Thiết kế",
    "text": "Kiến trúc xanh, đạt chuẩn EDGE"
   },
   {
    "title": "Lợi suất",
    "text": "~5.2%/năm"
   }
  ],
  "connections": [
   {
    "icon": "🚇",
    "name": "Ga Metro / trục giao thông chính",
    "minutes": 5
   },
   {
    "icon": "🏫",
    "name": "Trường quốc tế",
    "minutes": 7
   },
   {
    "icon": "🏥",
    "name": "Bệnh viện đa khoa",
    "minutes": 10
   },
   {
    "icon": "🛍️",
    "name": "Trung tâm thương mại",
    "minutes": 8
   },
   {
    "icon": "🏢",
    "name": "Trung tâm hành chính Thủ Đức",
    "minutes": 15
   },
   {
    "icon": "✈️",
    "name": "Sân bay",
    "minutes": 30
   }
  ],
  "amenitiesOut": [
   "🏫 Trường học các cấp",
   "🏥 Bệnh viện quốc tế",
   "🛒 Siêu thị – TTTM",
   "🌊 Công viên ven sông",
   "🏛️ Trung tâm hành chính",
   "🚌 Bến xe buýt – Metro",
   "⛳ Sân golf",
   "🏦 Ngân hàng"
  ],
  "floorplans": [
   {
    "name": "1PN / Studio",
    "beds": 1,
    "area": 62,
    "baths": 1,
    "price": 2.6,
    "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=75"
   },
   {
    "name": "2 phòng ngủ",
    "beds": 2,
    "area": 86,
    "baths": 2,
    "price": 3.96,
    "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=75"
   },
   {
    "name": "3 phòng ngủ",
    "beds": 3,
    "area": 110,
    "baths": 2,
    "price": 5.32,
    "image": "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "priceList": [
   {
    "code": "A26.10",
    "type": "1PN / Studio",
    "floor": 26,
    "dir": "Tây Bắc",
    "area": 68,
    "price": 2.95,
    "sold": true
   },
   {
    "code": "A25.07",
    "type": "2 phòng ngủ",
    "floor": 25,
    "dir": "Đông Bắc",
    "area": 90,
    "price": 4.54,
    "sold": false
   },
   {
    "code": "A34.03",
    "type": "3 phòng ngủ",
    "floor": 34,
    "dir": "Nam",
    "area": 112,
    "price": 6.46,
    "sold": true
   },
   {
    "code": "A32.03",
    "type": "1PN / Studio",
    "floor": 32,
    "dir": "Tây Nam",
    "area": 62,
    "price": 3.03,
    "sold": false
   },
   {
    "code": "A29.11",
    "type": "2 phòng ngủ",
    "floor": 29,
    "dir": "Tây Bắc",
    "area": 90,
    "price": 4.56,
    "sold": true
   },
   {
    "code": "A03.07",
    "type": "3 phòng ngủ",
    "floor": 3,
    "dir": "Đông Nam",
    "area": 116,
    "price": 5.57,
    "sold": true
   },
   {
    "code": "A35.07",
    "type": "1PN / Studio",
    "floor": 35,
    "dir": "Tây Nam",
    "area": 64,
    "price": 3.11,
    "sold": false
   },
   {
    "code": "A31.03",
    "type": "2 phòng ngủ",
    "floor": 31,
    "dir": "Bắc",
    "area": 88,
    "price": 4.54,
    "sold": false
   },
   {
    "code": "A04.10",
    "type": "3 phòng ngủ",
    "floor": 4,
    "dir": "Tây Nam",
    "area": 112,
    "price": 5.59,
    "sold": true
   },
   {
    "code": "A35.10",
    "type": "1PN / Studio",
    "floor": 35,
    "dir": "Tây Nam",
    "area": 65,
    "price": 3.16,
    "sold": true
   },
   {
    "code": "A30.05",
    "type": "2 phòng ngủ",
    "floor": 30,
    "dir": "Tây Nam",
    "area": 86,
    "price": 4.57,
    "sold": false
   },
   {
    "code": "A37.01",
    "type": "3 phòng ngủ",
    "floor": 37,
    "dir": "Bắc",
    "area": 115,
    "price": 6.12,
    "sold": false
   },
   {
    "code": "A32.12",
    "type": "1PN / Studio",
    "floor": 32,
    "dir": "Tây Nam",
    "area": 65,
    "price": 3.03,
    "sold": true
   },
   {
    "code": "A27.07",
    "type": "2 phòng ngủ",
    "floor": 27,
    "dir": "Tây Bắc",
    "area": 91,
    "price": 4.51,
    "sold": false
   },
   {
    "code": "A32.02",
    "type": "3 phòng ngủ",
    "floor": 32,
    "dir": "Đông Nam",
    "area": 117,
    "price": 6.4,
    "sold": false
   },
   {
    "code": "A26.01",
    "type": "1PN / Studio",
    "floor": 26,
    "dir": "Đông Bắc",
    "area": 64,
    "price": 2.91,
    "sold": false
   },
   {
    "code": "A20.07",
    "type": "2 phòng ngủ",
    "floor": 20,
    "dir": "Nam",
    "area": 88,
    "price": 4.41,
    "sold": true
   },
   {
    "code": "A25.02",
    "type": "3 phòng ngủ",
    "floor": 25,
    "dir": "Tây Bắc",
    "area": 110,
    "price": 6.03,
    "sold": false
   }
  ],
  "policies": [
   {
    "value": "30%",
    "text": "Thanh toán đến khi nhận nhà"
   },
   {
    "value": "70%",
    "text": "Ngân hàng hỗ trợ vay"
   },
   {
    "value": "0%",
    "text": "Lãi suất trong 18 tháng"
   },
   {
    "value": "9%",
    "text": "Chiết khấu thanh toán sớm"
   }
  ],
  "payments": [
   {
    "step": "Ký thỏa thuận đặt cọc",
    "amount": "10%"
   },
   {
    "step": "Ký HĐMB (30 ngày)",
    "amount": "20%"
   },
   {
    "step": "Đợt 3–6 (3 tháng/đợt)",
    "amount": "5%/đợt"
   },
   {
    "step": "Nhận bàn giao",
    "amount": "25%"
   },
   {
    "step": "Nhận sổ hồng",
    "amount": "5%"
   }
  ],
  "promo": "Tặng gói nội thất 150 triệu và miễn 2 năm phí quản lý cho 20 khách đầu tiên.",
  "progress": 58,
  "progressAt": "10/2026",
  "milestones": [
   {
    "title": "Khởi công",
    "when": "Q1/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện móng & hầm",
    "when": "Q3/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Thi công phần thân",
    "when": "Q2/2026",
    "done": true,
    "image": "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Cất nóc",
    "when": "Q4/2026",
    "done": false,
    "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện & bàn giao",
    "when": "Q4/2027",
    "done": false,
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "galleryCats": [
   "Phối cảnh",
   "Tiện ích",
   "Nhà mẫu",
   "Thực tế",
   "Phối cảnh",
   "Tiện ích"
  ],
  "loanRatio": 70,
  "loanYears": 20,
  "loanRate": 9.5,
  "faqs": [
   {
    "q": "Pháp lý dự án hiện tại thế nào?",
    "a": "Đã có quy hoạch 1/500, giấy phép xây dựng, bảo lãnh ngân hàng và văn bản đủ điều kiện mở bán. Khang Thịnh Land gửi bản tóm tắt pháp lý khi khách yêu cầu."
   },
   {
    "q": "Ngân hàng hỗ trợ vay bao nhiêu?",
    "a": "Tối đa 70% giá trị sản phẩm, thời hạn đến 25 năm, ân hạn nợ gốc 12–24 tháng và hỗ trợ lãi suất 0% trong 18 tháng."
   },
   {
    "q": "Khi nào bàn giao? Bàn giao tiêu chuẩn gì?",
    "a": "Dự kiến bàn giao Q4/2027, hoàn thiện cơ bản nội thất liền tường, thiết bị vệ sinh và bếp cao cấp."
   },
   {
    "q": "Người nước ngoài có được mua không?",
    "a": "Người nước ngoài được sở hữu căn hộ trong hạn mức pháp luật cho phép (tối đa 30% số căn của tòa, thời hạn 50 năm, có thể gia hạn)."
   },
   {
    "q": "Phí quản lý bao nhiêu?",
    "a": "Phí quản lý dự kiến 12.000 – 18.000 đ/m²/tháng, tùy loại hình và khối tiện ích."
   },
   {
    "q": "Có cam kết cho thuê không?",
    "a": "Lợi suất cho thuê tham khảo khu vực ~5.2%/năm. Liên hệ để nhận phương án cho thuê chi tiết."
   }
  ]
 },
 {
  "id": "skyline-garden",
  "name": "Skyline Garden",
  "area": "Quận 7",
  "type": "Căn hộ",
  "status": "dang-mo-ban",
  "priceFrom": 3.9,
  "priceTo": 9.5,
  "beds": [
   2,
   3
  ],
  "dev": "Nam Việt Capital",
  "scale": "2 tháp · 860 căn · 1,6 ha",
  "handover": "Q2/2027",
  "yield": 4.8,
  "growth": 7,
  "hot": true,
  "desc": "Căn hộ cao cấp cạnh trung tâm tài chính phía Nam, tầm nhìn sông và công viên.",
  "legal": "Đã có quy hoạch 1/500, giấy phép xây dựng, bảo lãnh ngân hàng và đủ điều kiện mở bán.",
  "address": "Đường Nguyễn Lương Bằng, phường Tân Phú, Quận 7, TP.HCM",
  "video": "video.html?id=skyline-garden",
  "tour": "tour.html?id=skyline-garden",
  "amenities": [
   "🏊 Hồ bơi tràn bờ",
   "🌳 Công viên trung tâm",
   "🏋️ Gym và Yoga",
   "🧒 Khu vui chơi trẻ em",
   "🍽️ Nhà hàng và café",
   "🧖 Spa và sauna",
   "🔒 An ninh 3 lớp 24/7",
   "⚡ Trạm sạc xe điện",
   "📚 Thư viện và co-working",
   "🛗 Sảnh đón tiêu chuẩn khách sạn"
  ],
  "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=75",
  "thumb": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=75",
  "gallery": [
   "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=75"
  ],
  "overview": "Căn hộ cao cấp cạnh trung tâm tài chính phía Nam, tầm nhìn sông và công viên. Dự án được quy hoạch đồng bộ, hướng tới cộng đồng cư dân văn minh với hệ tiện ích chuẩn resort và kết nối thuận tiện tới các trục giao thông huyết mạch.",
  "density": "28%",
  "ownership": "Lâu dài (người Việt)",
  "contractor": "Tổng thầu xây dựng hạng A",
  "highlights": [
   {
    "title": "Tầm nhìn",
    "text": "Đa hướng, thoáng vĩnh viễn"
   },
   {
    "title": "Kết nối",
    "text": "5 phút đến trục chính"
   },
   {
    "title": "Thiết kế",
    "text": "Kiến trúc xanh, đạt chuẩn EDGE"
   },
   {
    "title": "Lợi suất",
    "text": "~4.8%/năm"
   }
  ],
  "connections": [
   {
    "icon": "🚇",
    "name": "Ga Metro / trục giao thông chính",
    "minutes": 5
   },
   {
    "icon": "🏫",
    "name": "Trường quốc tế",
    "minutes": 7
   },
   {
    "icon": "🏥",
    "name": "Bệnh viện đa khoa",
    "minutes": 10
   },
   {
    "icon": "🛍️",
    "name": "Trung tâm thương mại",
    "minutes": 8
   },
   {
    "icon": "🏢",
    "name": "Trung tâm hành chính Quận 7",
    "minutes": 15
   },
   {
    "icon": "✈️",
    "name": "Sân bay",
    "minutes": 30
   }
  ],
  "amenitiesOut": [
   "🏫 Trường học các cấp",
   "🏥 Bệnh viện quốc tế",
   "🛒 Siêu thị – TTTM",
   "🌊 Công viên ven sông",
   "🏛️ Trung tâm hành chính",
   "🚌 Bến xe buýt – Metro",
   "⛳ Sân golf",
   "🏦 Ngân hàng"
  ],
  "floorplans": [
   {
    "name": "2 phòng ngủ",
    "beds": 2,
    "area": 86,
    "baths": 2,
    "price": 3.9,
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=75"
   },
   {
    "name": "3 phòng ngủ",
    "beds": 3,
    "area": 110,
    "baths": 2,
    "price": 8.66,
    "image": "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "priceList": [
   {
    "code": "A07.10",
    "type": "2 phòng ngủ",
    "floor": 7,
    "dir": "Tây Nam",
    "area": 90,
    "price": 4.23,
    "sold": false
   },
   {
    "code": "A10.10",
    "type": "3 phòng ngủ",
    "floor": 10,
    "dir": "Đông Bắc",
    "area": 113,
    "price": 9.3,
    "sold": true
   },
   {
    "code": "A33.12",
    "type": "2 phòng ngủ",
    "floor": 33,
    "dir": "Đông Nam",
    "area": 94,
    "price": 4.57,
    "sold": true
   },
   {
    "code": "A17.09",
    "type": "3 phòng ngủ",
    "floor": 17,
    "dir": "Đông Bắc",
    "area": 116,
    "price": 9.4,
    "sold": false
   },
   {
    "code": "A08.04",
    "type": "2 phòng ngủ",
    "floor": 8,
    "dir": "Đông Bắc",
    "area": 93,
    "price": 4.12,
    "sold": true
   },
   {
    "code": "A18.01",
    "type": "3 phòng ngủ",
    "floor": 18,
    "dir": "Tây Nam",
    "area": 116,
    "price": 9.96,
    "sold": true
   },
   {
    "code": "A24.06",
    "type": "2 phòng ngủ",
    "floor": 24,
    "dir": "Đông Nam",
    "area": 92,
    "price": 4.41,
    "sold": false
   },
   {
    "code": "A37.09",
    "type": "3 phòng ngủ",
    "floor": 37,
    "dir": "Đông Bắc",
    "area": 112,
    "price": 10.03,
    "sold": true
   },
   {
    "code": "A35.02",
    "type": "2 phòng ngủ",
    "floor": 35,
    "dir": "Nam",
    "area": 90,
    "price": 4.69,
    "sold": true
   },
   {
    "code": "A28.02",
    "type": "3 phòng ngủ",
    "floor": 28,
    "dir": "Tây Nam",
    "area": 116,
    "price": 10.22,
    "sold": true
   },
   {
    "code": "A29.01",
    "type": "2 phòng ngủ",
    "floor": 29,
    "dir": "Tây Bắc",
    "area": 90,
    "price": 4.52,
    "sold": true
   },
   {
    "code": "A14.02",
    "type": "3 phòng ngủ",
    "floor": 14,
    "dir": "Bắc",
    "area": 110,
    "price": 9.26,
    "sold": false
   },
   {
    "code": "A29.09",
    "type": "2 phòng ngủ",
    "floor": 29,
    "dir": "Đông Nam",
    "area": 91,
    "price": 4.54,
    "sold": true
   },
   {
    "code": "A18.04",
    "type": "3 phòng ngủ",
    "floor": 18,
    "dir": "Đông Nam",
    "area": 116,
    "price": 9.72,
    "sold": false
   },
   {
    "code": "A25.12",
    "type": "2 phòng ngủ",
    "floor": 25,
    "dir": "Đông Nam",
    "area": 91,
    "price": 4.56,
    "sold": false
   },
   {
    "code": "A28.04",
    "type": "3 phòng ngủ",
    "floor": 28,
    "dir": "Tây Nam",
    "area": 114,
    "price": 10.26,
    "sold": false
   },
   {
    "code": "A03.06",
    "type": "2 phòng ngủ",
    "floor": 3,
    "dir": "Nam",
    "area": 93,
    "price": 4.24,
    "sold": false
   },
   {
    "code": "A33.10",
    "type": "3 phòng ngủ",
    "floor": 33,
    "dir": "Đông Nam",
    "area": 110,
    "price": 10.17,
    "sold": false
   }
  ],
  "policies": [
   {
    "value": "30%",
    "text": "Thanh toán đến khi nhận nhà"
   },
   {
    "value": "70%",
    "text": "Ngân hàng hỗ trợ vay"
   },
   {
    "value": "0%",
    "text": "Lãi suất trong 18 tháng"
   },
   {
    "value": "9%",
    "text": "Chiết khấu thanh toán sớm"
   }
  ],
  "payments": [
   {
    "step": "Ký thỏa thuận đặt cọc",
    "amount": "10%"
   },
   {
    "step": "Ký HĐMB (30 ngày)",
    "amount": "20%"
   },
   {
    "step": "Đợt 3–6 (3 tháng/đợt)",
    "amount": "5%/đợt"
   },
   {
    "step": "Nhận bàn giao",
    "amount": "25%"
   },
   {
    "step": "Nhận sổ hồng",
    "amount": "5%"
   }
  ],
  "promo": "Tặng gói nội thất 150 triệu và miễn 2 năm phí quản lý cho 20 khách đầu tiên.",
  "progress": 58,
  "progressAt": "10/2026",
  "milestones": [
   {
    "title": "Khởi công",
    "when": "Q1/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện móng & hầm",
    "when": "Q3/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Thi công phần thân",
    "when": "Q2/2026",
    "done": true,
    "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Cất nóc",
    "when": "Q4/2026",
    "done": false,
    "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện & bàn giao",
    "when": "Q2/2027",
    "done": false,
    "image": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "galleryCats": [
   "Phối cảnh",
   "Tiện ích",
   "Nhà mẫu",
   "Thực tế",
   "Phối cảnh",
   "Tiện ích"
  ],
  "loanRatio": 70,
  "loanYears": 20,
  "loanRate": 9.5,
  "faqs": [
   {
    "q": "Pháp lý dự án hiện tại thế nào?",
    "a": "Đã có quy hoạch 1/500, giấy phép xây dựng, bảo lãnh ngân hàng và đủ điều kiện mở bán. Khang Thịnh Land gửi bản tóm tắt pháp lý khi khách yêu cầu."
   },
   {
    "q": "Ngân hàng hỗ trợ vay bao nhiêu?",
    "a": "Tối đa 70% giá trị sản phẩm, thời hạn đến 25 năm, ân hạn nợ gốc 12–24 tháng và hỗ trợ lãi suất 0% trong 18 tháng."
   },
   {
    "q": "Khi nào bàn giao? Bàn giao tiêu chuẩn gì?",
    "a": "Dự kiến bàn giao Q2/2027, hoàn thiện cơ bản nội thất liền tường, thiết bị vệ sinh và bếp cao cấp."
   },
   {
    "q": "Người nước ngoài có được mua không?",
    "a": "Người nước ngoài được sở hữu căn hộ trong hạn mức pháp luật cho phép (tối đa 30% số căn của tòa, thời hạn 50 năm, có thể gia hạn)."
   },
   {
    "q": "Phí quản lý bao nhiêu?",
    "a": "Phí quản lý dự kiến 12.000 – 18.000 đ/m²/tháng, tùy loại hình và khối tiện ích."
   },
   {
    "q": "Có cam kết cho thuê không?",
    "a": "Lợi suất cho thuê tham khảo khu vực ~4.8%/năm. Liên hệ để nhận phương án cho thuê chi tiết."
   }
  ]
 },
 {
  "id": "lotus-villas",
  "name": "Lotus Villas",
  "area": "Đồng Nai",
  "type": "Biệt thự",
  "status": "sap-mo-ban",
  "priceFrom": 12,
  "priceTo": 28,
  "beds": [
   4,
   5
  ],
  "dev": "Hưng Thịnh Phát",
  "scale": "180 căn · 12 ha",
  "handover": "Q3/2028",
  "yield": 3.5,
  "growth": 10,
  "hot": false,
  "desc": "Biệt thự sinh thái compound, đảo xanh khép kín, bến du thuyền riêng.",
  "legal": "Đã có quy hoạch 1/500 và giấy phép xây dựng. Hồ sơ đủ điều kiện mở bán đang hoàn tất, dự kiến công bố cùng đợt booking.",
  "address": "Đường ven sông Đồng Nai, xã Long Tân, huyện Nhơn Trạch, Đồng Nai",
  "video": "video.html?id=lotus-villas",
  "tour": "tour.html?id=lotus-villas",
  "amenities": [
   "🏊 Hồ bơi riêng từng căn",
   "🌳 Công viên và đảo xanh",
   "🚤 Bến thuyền nội khu",
   "🔒 An ninh compound 24/7",
   "🎾 Sân tennis",
   "🧒 Khu vui chơi trẻ em",
   "🍽️ Câu lạc bộ cư dân",
   "🚗 Hầm xe và lối dạo bộ"
  ],
  "image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=75",
  "thumb": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=75",
  "gallery": [
   "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=75"
  ],
  "overview": "Biệt thự sinh thái compound, đảo xanh khép kín, bến du thuyền riêng. Dự án được quy hoạch đồng bộ, hướng tới cộng đồng cư dân văn minh với hệ tiện ích chuẩn resort và kết nối thuận tiện tới các trục giao thông huyết mạch.",
  "density": "28%",
  "ownership": "Lâu dài (người Việt)",
  "contractor": "Tổng thầu xây dựng hạng A",
  "highlights": [
   {
    "title": "Tầm nhìn",
    "text": "Đa hướng, thoáng vĩnh viễn"
   },
   {
    "title": "Kết nối",
    "text": "5 phút đến trục chính"
   },
   {
    "title": "Thiết kế",
    "text": "Kiến trúc xanh, đạt chuẩn EDGE"
   },
   {
    "title": "Lợi suất",
    "text": "~3.5%/năm"
   }
  ],
  "connections": [
   {
    "icon": "🚇",
    "name": "Ga Metro / trục giao thông chính",
    "minutes": 5
   },
   {
    "icon": "🏫",
    "name": "Trường quốc tế",
    "minutes": 7
   },
   {
    "icon": "🏥",
    "name": "Bệnh viện đa khoa",
    "minutes": 10
   },
   {
    "icon": "🛍️",
    "name": "Trung tâm thương mại",
    "minutes": 8
   },
   {
    "icon": "🏢",
    "name": "Trung tâm hành chính Đồng Nai",
    "minutes": 15
   },
   {
    "icon": "✈️",
    "name": "Sân bay",
    "minutes": 30
   }
  ],
  "amenitiesOut": [
   "🏫 Trường học các cấp",
   "🏥 Bệnh viện quốc tế",
   "🛒 Siêu thị – TTTM",
   "🌊 Công viên ven sông",
   "🏛️ Trung tâm hành chính",
   "🚌 Bến xe buýt – Metro",
   "⛳ Sân golf",
   "🏦 Ngân hàng"
  ],
  "floorplans": [
   {
    "name": "Biệt thự 4PN",
    "beds": 4,
    "area": 230,
    "baths": 3,
    "price": 12,
    "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=75"
   },
   {
    "name": "Biệt thự 5PN",
    "beds": 5,
    "area": 265,
    "baths": 4,
    "price": 25.6,
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "priceList": [
   {
    "code": "V1",
    "type": "Biệt thự 4PN",
    "floor": 2,
    "dir": "Bắc",
    "area": 236,
    "price": 12.22,
    "sold": false
   },
   {
    "code": "V2",
    "type": "Biệt thự 5PN",
    "floor": 2,
    "dir": "Nam",
    "area": 269,
    "price": 26.71,
    "sold": true
   },
   {
    "code": "V3",
    "type": "Biệt thự 4PN",
    "floor": 1,
    "dir": "Bắc",
    "area": 235,
    "price": 12.51,
    "sold": false
   },
   {
    "code": "V4",
    "type": "Biệt thự 5PN",
    "floor": 3,
    "dir": "Nam",
    "area": 273,
    "price": 26.51,
    "sold": true
   },
   {
    "code": "V5",
    "type": "Biệt thự 4PN",
    "floor": 2,
    "dir": "Đông Nam",
    "area": 231,
    "price": 12.58,
    "sold": false
   },
   {
    "code": "V6",
    "type": "Biệt thự 5PN",
    "floor": 2,
    "dir": "Tây Bắc",
    "area": 267,
    "price": 26.42,
    "sold": false
   },
   {
    "code": "V7",
    "type": "Biệt thự 4PN",
    "floor": 3,
    "dir": "Bắc",
    "area": 235,
    "price": 12.5,
    "sold": false
   },
   {
    "code": "V8",
    "type": "Biệt thự 5PN",
    "floor": 1,
    "dir": "Tây Bắc",
    "area": 270,
    "price": 26.22,
    "sold": false
   },
   {
    "code": "V9",
    "type": "Biệt thự 4PN",
    "floor": 1,
    "dir": "Nam",
    "area": 236,
    "price": 12.46,
    "sold": false
   },
   {
    "code": "V10",
    "type": "Biệt thự 5PN",
    "floor": 1,
    "dir": "Tây Bắc",
    "area": 271,
    "price": 26.44,
    "sold": true
   },
   {
    "code": "V11",
    "type": "Biệt thự 4PN",
    "floor": 1,
    "dir": "Đông Bắc",
    "area": 231,
    "price": 12.43,
    "sold": false
   },
   {
    "code": "V12",
    "type": "Biệt thự 5PN",
    "floor": 2,
    "dir": "Tây Nam",
    "area": 267,
    "price": 26.99,
    "sold": false
   },
   {
    "code": "V13",
    "type": "Biệt thự 4PN",
    "floor": 3,
    "dir": "Bắc",
    "area": 235,
    "price": 12.38,
    "sold": true
   },
   {
    "code": "V14",
    "type": "Biệt thự 5PN",
    "floor": 3,
    "dir": "Tây Nam",
    "area": 269,
    "price": 26.54,
    "sold": true
   },
   {
    "code": "V15",
    "type": "Biệt thự 4PN",
    "floor": 2,
    "dir": "Bắc",
    "area": 236,
    "price": 12.42,
    "sold": false
   },
   {
    "code": "V16",
    "type": "Biệt thự 5PN",
    "floor": 2,
    "dir": "Đông Nam",
    "area": 266,
    "price": 27.47,
    "sold": false
   },
   {
    "code": "V17",
    "type": "Biệt thự 4PN",
    "floor": 1,
    "dir": "Bắc",
    "area": 230,
    "price": 12.5,
    "sold": false
   },
   {
    "code": "V18",
    "type": "Biệt thự 5PN",
    "floor": 1,
    "dir": "Nam",
    "area": 267,
    "price": 27.48,
    "sold": false
   }
  ],
  "policies": [
   {
    "value": "30%",
    "text": "Thanh toán đến khi nhận nhà"
   },
   {
    "value": "70%",
    "text": "Ngân hàng hỗ trợ vay"
   },
   {
    "value": "0%",
    "text": "Lãi suất trong 18 tháng"
   },
   {
    "value": "9%",
    "text": "Chiết khấu thanh toán sớm"
   }
  ],
  "payments": [
   {
    "step": "Ký thỏa thuận đặt cọc",
    "amount": "10%"
   },
   {
    "step": "Ký HĐMB (30 ngày)",
    "amount": "20%"
   },
   {
    "step": "Đợt 3–6 (3 tháng/đợt)",
    "amount": "5%/đợt"
   },
   {
    "step": "Nhận bàn giao",
    "amount": "25%"
   },
   {
    "step": "Nhận sổ hồng",
    "amount": "5%"
   }
  ],
  "promo": "Tặng gói nội thất 150 triệu và miễn 2 năm phí quản lý cho 20 khách đầu tiên.",
  "progress": 12,
  "progressAt": "10/2026",
  "milestones": [
   {
    "title": "Khởi công",
    "when": "Q1/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện móng & hầm",
    "when": "Q3/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Thi công phần thân",
    "when": "Q2/2026",
    "done": false,
    "image": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Cất nóc",
    "when": "Q4/2026",
    "done": false,
    "image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện & bàn giao",
    "when": "Q3/2028",
    "done": false,
    "image": "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "galleryCats": [
   "Phối cảnh",
   "Tiện ích",
   "Nhà mẫu",
   "Thực tế",
   "Phối cảnh",
   "Tiện ích"
  ],
  "loanRatio": 70,
  "loanYears": 20,
  "loanRate": 9.5,
  "faqs": [
   {
    "q": "Pháp lý dự án hiện tại thế nào?",
    "a": "Đã có quy hoạch 1/500 và giấy phép xây dựng. Hồ sơ đủ điều kiện mở bán đang hoàn tất, dự kiến công bố cùng đợt booking. Khang Thịnh Land gửi bản tóm tắt pháp lý khi khách yêu cầu."
   },
   {
    "q": "Ngân hàng hỗ trợ vay bao nhiêu?",
    "a": "Tối đa 70% giá trị sản phẩm, thời hạn đến 25 năm, ân hạn nợ gốc 12–24 tháng và hỗ trợ lãi suất 0% trong 18 tháng."
   },
   {
    "q": "Khi nào bàn giao? Bàn giao tiêu chuẩn gì?",
    "a": "Dự kiến bàn giao Q3/2028, hoàn thiện cơ bản nội thất liền tường, thiết bị vệ sinh và bếp cao cấp."
   },
   {
    "q": "Người nước ngoài có được mua không?",
    "a": "Người nước ngoài được sở hữu căn hộ trong hạn mức pháp luật cho phép (tối đa 30% số căn của tòa, thời hạn 50 năm, có thể gia hạn)."
   },
   {
    "q": "Phí quản lý bao nhiêu?",
    "a": "Phí quản lý dự kiến 12.000 – 18.000 đ/m²/tháng, tùy loại hình và khối tiện ích."
   },
   {
    "q": "Có cam kết cho thuê không?",
    "a": "Lợi suất cho thuê tham khảo khu vực ~3.5%/năm. Liên hệ để nhận phương án cho thuê chi tiết."
   }
  ]
 },
 {
  "id": "metro-square",
  "name": "Metro Square",
  "area": "Thủ Đức",
  "type": "Nhà phố",
  "status": "dang-mo-ban",
  "priceFrom": 8.5,
  "priceTo": 15,
  "beds": [
   3,
   4
  ],
  "dev": "An Phú Gia Group",
  "scale": "240 căn · 5 ha",
  "handover": "Q1/2027",
  "yield": 4.5,
  "growth": 9,
  "hot": true,
  "desc": "Nhà phố thương mại mặt tiền đại lộ, vừa ở vừa kinh doanh.",
  "legal": "Đã có quy hoạch 1/500, giấy phép xây dựng, bảo lãnh ngân hàng và đủ điều kiện mở bán. Nhà phố được cấp sổ hồng lâu dài.",
  "address": "Đại lộ Võ Văn Ngân, phường Linh Chiểu, TP. Thủ Đức, TP.HCM",
  "video": "video.html?id=metro-square",
  "tour": "tour.html?id=metro-square",
  "amenities": [
   "🏪 Tầng trệt kinh doanh",
   "🌳 Công viên nội khu",
   "🏫 Trường học liên cấp gần kề",
   "🛒 Chợ và shophouse",
   "🔒 An ninh 24/7",
   "🚗 Lối xe riêng từng căn",
   "🧒 Sân chơi trẻ em",
   "💡 Hạ tầng điện nước âm"
  ],
  "image": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=75",
  "thumb": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=75",
  "gallery": [
   "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=75"
  ],
  "overview": "Nhà phố thương mại mặt tiền đại lộ, vừa ở vừa kinh doanh. Dự án được quy hoạch đồng bộ, hướng tới cộng đồng cư dân văn minh với hệ tiện ích chuẩn resort và kết nối thuận tiện tới các trục giao thông huyết mạch.",
  "density": "28%",
  "ownership": "Lâu dài (người Việt)",
  "contractor": "Tổng thầu xây dựng hạng A",
  "highlights": [
   {
    "title": "Tầm nhìn",
    "text": "Đa hướng, thoáng vĩnh viễn"
   },
   {
    "title": "Kết nối",
    "text": "5 phút đến trục chính"
   },
   {
    "title": "Thiết kế",
    "text": "Kiến trúc xanh, đạt chuẩn EDGE"
   },
   {
    "title": "Lợi suất",
    "text": "~4.5%/năm"
   }
  ],
  "connections": [
   {
    "icon": "🚇",
    "name": "Ga Metro / trục giao thông chính",
    "minutes": 5
   },
   {
    "icon": "🏫",
    "name": "Trường quốc tế",
    "minutes": 7
   },
   {
    "icon": "🏥",
    "name": "Bệnh viện đa khoa",
    "minutes": 10
   },
   {
    "icon": "🛍️",
    "name": "Trung tâm thương mại",
    "minutes": 8
   },
   {
    "icon": "🏢",
    "name": "Trung tâm hành chính Thủ Đức",
    "minutes": 15
   },
   {
    "icon": "✈️",
    "name": "Sân bay",
    "minutes": 30
   }
  ],
  "amenitiesOut": [
   "🏫 Trường học các cấp",
   "🏥 Bệnh viện quốc tế",
   "🛒 Siêu thị – TTTM",
   "🌊 Công viên ven sông",
   "🏛️ Trung tâm hành chính",
   "🚌 Bến xe buýt – Metro",
   "⛳ Sân golf",
   "🏦 Ngân hàng"
  ],
  "floorplans": [
   {
    "name": "Nhà phố 3PN",
    "beds": 3,
    "area": 195,
    "baths": 2,
    "price": 8.5,
    "image": "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=900&q=75"
   },
   {
    "name": "Nhà phố 4PN",
    "beds": 4,
    "area": 230,
    "baths": 3,
    "price": 14.02,
    "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "priceList": [
   {
    "code": "V1",
    "type": "Nhà phố 3PN",
    "floor": 2,
    "dir": "Bắc",
    "area": 201,
    "price": 8.66,
    "sold": false
   },
   {
    "code": "V2",
    "type": "Nhà phố 4PN",
    "floor": 2,
    "dir": "Nam",
    "area": 234,
    "price": 14.63,
    "sold": true
   },
   {
    "code": "V3",
    "type": "Nhà phố 3PN",
    "floor": 1,
    "dir": "Bắc",
    "area": 200,
    "price": 8.86,
    "sold": false
   },
   {
    "code": "V4",
    "type": "Nhà phố 4PN",
    "floor": 3,
    "dir": "Nam",
    "area": 238,
    "price": 14.52,
    "sold": true
   },
   {
    "code": "V5",
    "type": "Nhà phố 3PN",
    "floor": 2,
    "dir": "Đông Nam",
    "area": 196,
    "price": 8.91,
    "sold": false
   },
   {
    "code": "V6",
    "type": "Nhà phố 4PN",
    "floor": 2,
    "dir": "Tây Bắc",
    "area": 232,
    "price": 14.47,
    "sold": false
   },
   {
    "code": "V7",
    "type": "Nhà phố 3PN",
    "floor": 3,
    "dir": "Bắc",
    "area": 200,
    "price": 8.86,
    "sold": false
   },
   {
    "code": "V8",
    "type": "Nhà phố 4PN",
    "floor": 1,
    "dir": "Tây Bắc",
    "area": 235,
    "price": 14.36,
    "sold": false
   },
   {
    "code": "V9",
    "type": "Nhà phố 3PN",
    "floor": 1,
    "dir": "Nam",
    "area": 201,
    "price": 8.82,
    "sold": false
   },
   {
    "code": "V10",
    "type": "Nhà phố 4PN",
    "floor": 1,
    "dir": "Tây Bắc",
    "area": 236,
    "price": 14.48,
    "sold": true
   },
   {
    "code": "V11",
    "type": "Nhà phố 3PN",
    "floor": 1,
    "dir": "Đông Bắc",
    "area": 196,
    "price": 8.8,
    "sold": false
   },
   {
    "code": "V12",
    "type": "Nhà phố 4PN",
    "floor": 2,
    "dir": "Tây Nam",
    "area": 232,
    "price": 14.78,
    "sold": false
   },
   {
    "code": "V13",
    "type": "Nhà phố 3PN",
    "floor": 3,
    "dir": "Bắc",
    "area": 200,
    "price": 8.77,
    "sold": true
   },
   {
    "code": "V14",
    "type": "Nhà phố 4PN",
    "floor": 3,
    "dir": "Tây Nam",
    "area": 234,
    "price": 14.54,
    "sold": true
   },
   {
    "code": "V15",
    "type": "Nhà phố 3PN",
    "floor": 2,
    "dir": "Bắc",
    "area": 201,
    "price": 8.79,
    "sold": false
   },
   {
    "code": "V16",
    "type": "Nhà phố 4PN",
    "floor": 2,
    "dir": "Đông Nam",
    "area": 231,
    "price": 15.05,
    "sold": false
   },
   {
    "code": "V17",
    "type": "Nhà phố 3PN",
    "floor": 1,
    "dir": "Bắc",
    "area": 195,
    "price": 8.85,
    "sold": false
   },
   {
    "code": "V18",
    "type": "Nhà phố 4PN",
    "floor": 1,
    "dir": "Nam",
    "area": 232,
    "price": 15.05,
    "sold": false
   }
  ],
  "policies": [
   {
    "value": "30%",
    "text": "Thanh toán đến khi nhận nhà"
   },
   {
    "value": "70%",
    "text": "Ngân hàng hỗ trợ vay"
   },
   {
    "value": "0%",
    "text": "Lãi suất trong 18 tháng"
   },
   {
    "value": "9%",
    "text": "Chiết khấu thanh toán sớm"
   }
  ],
  "payments": [
   {
    "step": "Ký thỏa thuận đặt cọc",
    "amount": "10%"
   },
   {
    "step": "Ký HĐMB (30 ngày)",
    "amount": "20%"
   },
   {
    "step": "Đợt 3–6 (3 tháng/đợt)",
    "amount": "5%/đợt"
   },
   {
    "step": "Nhận bàn giao",
    "amount": "25%"
   },
   {
    "step": "Nhận sổ hồng",
    "amount": "5%"
   }
  ],
  "promo": "Tặng gói nội thất 150 triệu và miễn 2 năm phí quản lý cho 20 khách đầu tiên.",
  "progress": 58,
  "progressAt": "10/2026",
  "milestones": [
   {
    "title": "Khởi công",
    "when": "Q1/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện móng & hầm",
    "when": "Q3/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Thi công phần thân",
    "when": "Q2/2026",
    "done": true,
    "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Cất nóc",
    "when": "Q4/2026",
    "done": false,
    "image": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện & bàn giao",
    "when": "Q1/2027",
    "done": false,
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "galleryCats": [
   "Phối cảnh",
   "Tiện ích",
   "Nhà mẫu",
   "Thực tế",
   "Phối cảnh",
   "Tiện ích"
  ],
  "loanRatio": 70,
  "loanYears": 20,
  "loanRate": 9.5,
  "faqs": [
   {
    "q": "Pháp lý dự án hiện tại thế nào?",
    "a": "Đã có quy hoạch 1/500, giấy phép xây dựng, bảo lãnh ngân hàng và đủ điều kiện mở bán. Nhà phố được cấp sổ hồng lâu dài. Khang Thịnh Land gửi bản tóm tắt pháp lý khi khách yêu cầu."
   },
   {
    "q": "Ngân hàng hỗ trợ vay bao nhiêu?",
    "a": "Tối đa 70% giá trị sản phẩm, thời hạn đến 25 năm, ân hạn nợ gốc 12–24 tháng và hỗ trợ lãi suất 0% trong 18 tháng."
   },
   {
    "q": "Khi nào bàn giao? Bàn giao tiêu chuẩn gì?",
    "a": "Dự kiến bàn giao Q1/2027, hoàn thiện cơ bản nội thất liền tường, thiết bị vệ sinh và bếp cao cấp."
   },
   {
    "q": "Người nước ngoài có được mua không?",
    "a": "Người nước ngoài được sở hữu căn hộ trong hạn mức pháp luật cho phép (tối đa 30% số căn của tòa, thời hạn 50 năm, có thể gia hạn)."
   },
   {
    "q": "Phí quản lý bao nhiêu?",
    "a": "Phí quản lý dự kiến 12.000 – 18.000 đ/m²/tháng, tùy loại hình và khối tiện ích."
   },
   {
    "q": "Có cam kết cho thuê không?",
    "a": "Lợi suất cho thuê tham khảo khu vực ~4.5%/năm. Liên hệ để nhận phương án cho thuê chi tiết."
   }
  ]
 },
 {
  "id": "binh-an-central",
  "name": "Bình An Central",
  "area": "Bình Dương",
  "type": "Căn hộ",
  "status": "dang-mo-ban",
  "priceFrom": 1.6,
  "priceTo": 3.2,
  "beds": [
   1,
   2
  ],
  "dev": "Đông Nam Bộ Invest",
  "scale": "4 tháp · 2.000 căn · 3,5 ha",
  "handover": "Q4/2026",
  "yield": 6.1,
  "growth": 7,
  "hot": false,
  "desc": "Căn hộ giá tốt gần KCN và Làng đại học, nhu cầu thuê cao.",
  "legal": "Đã có quy hoạch 1/500, giấy phép xây dựng, bảo lãnh ngân hàng và đủ điều kiện mở bán.",
  "address": "Đường Mỹ Phước Tân Vạn, phường Bình Hòa, TP. Thuận An, Bình Dương",
  "video": "video.html?id=binh-an-central",
  "tour": "tour.html?id=binh-an-central",
  "amenities": [
   "🏊 Hồ bơi tràn bờ",
   "🌳 Công viên trung tâm",
   "🏋️ Gym và Yoga",
   "🧒 Khu vui chơi trẻ em",
   "🍽️ Nhà hàng và café",
   "🧖 Spa và sauna",
   "🔒 An ninh 3 lớp 24/7",
   "⚡ Trạm sạc xe điện",
   "📚 Thư viện và co-working",
   "🛗 Sảnh đón tiêu chuẩn khách sạn"
  ],
  "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=75",
  "thumb": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=75",
  "gallery": [
   "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=75"
  ],
  "overview": "Căn hộ giá tốt gần KCN và Làng đại học, nhu cầu thuê cao. Dự án được quy hoạch đồng bộ, hướng tới cộng đồng cư dân văn minh với hệ tiện ích chuẩn resort và kết nối thuận tiện tới các trục giao thông huyết mạch.",
  "density": "28%",
  "ownership": "Lâu dài (người Việt)",
  "contractor": "Tổng thầu xây dựng hạng A",
  "highlights": [
   {
    "title": "Tầm nhìn",
    "text": "Đa hướng, thoáng vĩnh viễn"
   },
   {
    "title": "Kết nối",
    "text": "5 phút đến trục chính"
   },
   {
    "title": "Thiết kế",
    "text": "Kiến trúc xanh, đạt chuẩn EDGE"
   },
   {
    "title": "Lợi suất",
    "text": "~6.1%/năm"
   }
  ],
  "connections": [
   {
    "icon": "🚇",
    "name": "Ga Metro / trục giao thông chính",
    "minutes": 5
   },
   {
    "icon": "🏫",
    "name": "Trường quốc tế",
    "minutes": 7
   },
   {
    "icon": "🏥",
    "name": "Bệnh viện đa khoa",
    "minutes": 10
   },
   {
    "icon": "🛍️",
    "name": "Trung tâm thương mại",
    "minutes": 8
   },
   {
    "icon": "🏢",
    "name": "Trung tâm hành chính Bình Dương",
    "minutes": 15
   },
   {
    "icon": "✈️",
    "name": "Sân bay",
    "minutes": 30
   }
  ],
  "amenitiesOut": [
   "🏫 Trường học các cấp",
   "🏥 Bệnh viện quốc tế",
   "🛒 Siêu thị – TTTM",
   "🌊 Công viên ven sông",
   "🏛️ Trung tâm hành chính",
   "🚌 Bến xe buýt – Metro",
   "⛳ Sân golf",
   "🏦 Ngân hàng"
  ],
  "floorplans": [
   {
    "name": "1PN / Studio",
    "beds": 1,
    "area": 62,
    "baths": 1,
    "price": 1.6,
    "image": "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=900&q=75"
   },
   {
    "name": "2 phòng ngủ",
    "beds": 2,
    "area": 86,
    "baths": 2,
    "price": 2.96,
    "image": "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "priceList": [
   {
    "code": "A16.04",
    "type": "1PN / Studio",
    "floor": 16,
    "dir": "Đông Bắc",
    "area": 63,
    "price": 1.71,
    "sold": false
   },
   {
    "code": "A35.08",
    "type": "2 phòng ngủ",
    "floor": 35,
    "dir": "Đông Bắc",
    "area": 90,
    "price": 3.42,
    "sold": false
   },
   {
    "code": "A34.01",
    "type": "1PN / Studio",
    "floor": 34,
    "dir": "Bắc",
    "area": 63,
    "price": 1.82,
    "sold": true
   },
   {
    "code": "A24.12",
    "type": "2 phòng ngủ",
    "floor": 24,
    "dir": "Đông Bắc",
    "area": 89,
    "price": 3.35,
    "sold": false
   },
   {
    "code": "A19.07",
    "type": "1PN / Studio",
    "floor": 19,
    "dir": "Tây Bắc",
    "area": 67,
    "price": 1.77,
    "sold": false
   },
   {
    "code": "A28.04",
    "type": "2 phòng ngủ",
    "floor": 28,
    "dir": "Nam",
    "area": 88,
    "price": 3.38,
    "sold": true
   },
   {
    "code": "A29.06",
    "type": "1PN / Studio",
    "floor": 29,
    "dir": "Đông Bắc",
    "area": 66,
    "price": 1.81,
    "sold": true
   },
   {
    "code": "A34.06",
    "type": "2 phòng ngủ",
    "floor": 34,
    "dir": "Tây Bắc",
    "area": 92,
    "price": 3.48,
    "sold": false
   },
   {
    "code": "A19.06",
    "type": "1PN / Studio",
    "floor": 19,
    "dir": "Tây Nam",
    "area": 65,
    "price": 1.84,
    "sold": true
   },
   {
    "code": "A32.12",
    "type": "2 phòng ngủ",
    "floor": 32,
    "dir": "Đông Nam",
    "area": 90,
    "price": 3.55,
    "sold": false
   },
   {
    "code": "A12.03",
    "type": "1PN / Studio",
    "floor": 12,
    "dir": "Bắc",
    "area": 68,
    "price": 1.75,
    "sold": true
   },
   {
    "code": "A08.07",
    "type": "2 phòng ngủ",
    "floor": 8,
    "dir": "Đông Bắc",
    "area": 88,
    "price": 3.15,
    "sold": false
   },
   {
    "code": "A31.05",
    "type": "1PN / Studio",
    "floor": 31,
    "dir": "Bắc",
    "area": 66,
    "price": 1.82,
    "sold": true
   },
   {
    "code": "A22.11",
    "type": "2 phòng ngủ",
    "floor": 22,
    "dir": "Tây Nam",
    "area": 92,
    "price": 3.31,
    "sold": false
   },
   {
    "code": "A29.07",
    "type": "1PN / Studio",
    "floor": 29,
    "dir": "Đông Nam",
    "area": 64,
    "price": 1.86,
    "sold": false
   },
   {
    "code": "A27.08",
    "type": "2 phòng ngủ",
    "floor": 27,
    "dir": "Tây Nam",
    "area": 89,
    "price": 3.45,
    "sold": false
   },
   {
    "code": "A29.06",
    "type": "1PN / Studio",
    "floor": 29,
    "dir": "Tây Bắc",
    "area": 66,
    "price": 1.86,
    "sold": false
   },
   {
    "code": "A11.06",
    "type": "2 phòng ngủ",
    "floor": 11,
    "dir": "Nam",
    "area": 86,
    "price": 3.32,
    "sold": false
   }
  ],
  "policies": [
   {
    "value": "30%",
    "text": "Thanh toán đến khi nhận nhà"
   },
   {
    "value": "70%",
    "text": "Ngân hàng hỗ trợ vay"
   },
   {
    "value": "0%",
    "text": "Lãi suất trong 18 tháng"
   },
   {
    "value": "9%",
    "text": "Chiết khấu thanh toán sớm"
   }
  ],
  "payments": [
   {
    "step": "Ký thỏa thuận đặt cọc",
    "amount": "10%"
   },
   {
    "step": "Ký HĐMB (30 ngày)",
    "amount": "20%"
   },
   {
    "step": "Đợt 3–6 (3 tháng/đợt)",
    "amount": "5%/đợt"
   },
   {
    "step": "Nhận bàn giao",
    "amount": "25%"
   },
   {
    "step": "Nhận sổ hồng",
    "amount": "5%"
   }
  ],
  "promo": "Tặng gói nội thất 150 triệu và miễn 2 năm phí quản lý cho 20 khách đầu tiên.",
  "progress": 58,
  "progressAt": "10/2026",
  "milestones": [
   {
    "title": "Khởi công",
    "when": "Q1/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện móng & hầm",
    "when": "Q3/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Thi công phần thân",
    "when": "Q2/2026",
    "done": true,
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Cất nóc",
    "when": "Q4/2026",
    "done": false,
    "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện & bàn giao",
    "when": "Q4/2026",
    "done": false,
    "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "galleryCats": [
   "Phối cảnh",
   "Tiện ích",
   "Nhà mẫu",
   "Thực tế",
   "Phối cảnh",
   "Tiện ích"
  ],
  "loanRatio": 70,
  "loanYears": 20,
  "loanRate": 9.5,
  "faqs": [
   {
    "q": "Pháp lý dự án hiện tại thế nào?",
    "a": "Đã có quy hoạch 1/500, giấy phép xây dựng, bảo lãnh ngân hàng và đủ điều kiện mở bán. Khang Thịnh Land gửi bản tóm tắt pháp lý khi khách yêu cầu."
   },
   {
    "q": "Ngân hàng hỗ trợ vay bao nhiêu?",
    "a": "Tối đa 70% giá trị sản phẩm, thời hạn đến 25 năm, ân hạn nợ gốc 12–24 tháng và hỗ trợ lãi suất 0% trong 18 tháng."
   },
   {
    "q": "Khi nào bàn giao? Bàn giao tiêu chuẩn gì?",
    "a": "Dự kiến bàn giao Q4/2026, hoàn thiện cơ bản nội thất liền tường, thiết bị vệ sinh và bếp cao cấp."
   },
   {
    "q": "Người nước ngoài có được mua không?",
    "a": "Người nước ngoài được sở hữu căn hộ trong hạn mức pháp luật cho phép (tối đa 30% số căn của tòa, thời hạn 50 năm, có thể gia hạn)."
   },
   {
    "q": "Phí quản lý bao nhiêu?",
    "a": "Phí quản lý dự kiến 12.000 – 18.000 đ/m²/tháng, tùy loại hình và khối tiện ích."
   },
   {
    "q": "Có cam kết cho thuê không?",
    "a": "Lợi suất cho thuê tham khảo khu vực ~6.1%/năm. Liên hệ để nhận phương án cho thuê chi tiết."
   }
  ]
 },
 {
  "id": "ocean-pearl",
  "name": "Ocean Pearl Residences",
  "area": "Nha Trang",
  "type": "Condotel",
  "status": "sap-mo-ban",
  "priceFrom": 2.2,
  "priceTo": 6.5,
  "beds": [
   1,
   2
  ],
  "dev": "Biển Xanh Holdings",
  "scale": "1 tháp 42 tầng · 900 căn",
  "handover": "Q2/2028",
  "yield": 7.5,
  "growth": 6,
  "hot": true,
  "desc": "Căn hộ nghỉ dưỡng mặt biển, cam kết vận hành bởi đơn vị quốc tế.",
  "legal": "Đã có quy hoạch 1/500 và giấy phép xây dựng. Sản phẩm condotel sở hữu 50 năm. Điều kiện mở bán công bố khi nhận booking.",
  "address": "Đường Trần Phú, phường Lộc Thọ, Nha Trang, Khánh Hòa",
  "video": "video.html?id=ocean-pearl",
  "tour": "tour.html?id=ocean-pearl",
  "amenities": [
   "🏖️ Lối ra biển riêng",
   "🏊 Hồ bơi vô cực",
   "🍽️ Nhà hàng view biển",
   "🧖 Spa",
   "🔒 Lễ tân và an ninh 24/7",
   "🚐 Đưa đón sân bay",
   "🏋️ Gym",
   "🛎️ Vận hành cho thuê"
  ],
  "image": "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=75",
  "thumb": "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=75",
  "gallery": [
   "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=900&q=75"
  ],
  "overview": "Căn hộ nghỉ dưỡng mặt biển, cam kết vận hành bởi đơn vị quốc tế. Dự án được quy hoạch đồng bộ, hướng tới cộng đồng cư dân văn minh với hệ tiện ích chuẩn resort và kết nối thuận tiện tới các trục giao thông huyết mạch.",
  "density": "28%",
  "ownership": "50 năm",
  "contractor": "Tổng thầu xây dựng hạng A",
  "highlights": [
   {
    "title": "Tầm nhìn",
    "text": "Đa hướng, thoáng vĩnh viễn"
   },
   {
    "title": "Kết nối",
    "text": "5 phút đến trục chính"
   },
   {
    "title": "Thiết kế",
    "text": "Kiến trúc xanh, đạt chuẩn EDGE"
   },
   {
    "title": "Lợi suất",
    "text": "~7.5%/năm"
   }
  ],
  "connections": [
   {
    "icon": "🚇",
    "name": "Ga Metro / trục giao thông chính",
    "minutes": 5
   },
   {
    "icon": "🏫",
    "name": "Trường quốc tế",
    "minutes": 7
   },
   {
    "icon": "🏥",
    "name": "Bệnh viện đa khoa",
    "minutes": 10
   },
   {
    "icon": "🛍️",
    "name": "Trung tâm thương mại",
    "minutes": 8
   },
   {
    "icon": "🏢",
    "name": "Trung tâm hành chính Nha Trang",
    "minutes": 15
   },
   {
    "icon": "✈️",
    "name": "Sân bay",
    "minutes": 30
   }
  ],
  "amenitiesOut": [
   "🏫 Trường học các cấp",
   "🏥 Bệnh viện quốc tế",
   "🛒 Siêu thị – TTTM",
   "🌊 Công viên ven sông",
   "🏛️ Trung tâm hành chính",
   "🚌 Bến xe buýt – Metro",
   "⛳ Sân golf",
   "🏦 Ngân hàng"
  ],
  "floorplans": [
   {
    "name": "1PN / Studio",
    "beds": 1,
    "area": 62,
    "baths": 1,
    "price": 2.2,
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=75"
   },
   {
    "name": "2 phòng ngủ",
    "beds": 2,
    "area": 86,
    "baths": 2,
    "price": 5.86,
    "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "priceList": [
   {
    "code": "A12.04",
    "type": "1PN / Studio",
    "floor": 12,
    "dir": "Đông Nam",
    "area": 67,
    "price": 2.46,
    "sold": false
   },
   {
    "code": "A06.02",
    "type": "2 phòng ngủ",
    "floor": 6,
    "dir": "Tây Bắc",
    "area": 87,
    "price": 6.24,
    "sold": false
   },
   {
    "code": "A31.07",
    "type": "1PN / Studio",
    "floor": 31,
    "dir": "Nam",
    "area": 68,
    "price": 2.59,
    "sold": true
   },
   {
    "code": "A29.10",
    "type": "2 phòng ngủ",
    "floor": 29,
    "dir": "Tây Bắc",
    "area": 91,
    "price": 6.58,
    "sold": true
   },
   {
    "code": "A10.04",
    "type": "1PN / Studio",
    "floor": 10,
    "dir": "Tây Nam",
    "area": 66,
    "price": 2.37,
    "sold": false
   },
   {
    "code": "A22.05",
    "type": "2 phòng ngủ",
    "floor": 22,
    "dir": "Tây Nam",
    "area": 88,
    "price": 6.78,
    "sold": true
   },
   {
    "code": "A07.04",
    "type": "1PN / Studio",
    "floor": 7,
    "dir": "Tây Bắc",
    "area": 67,
    "price": 2.31,
    "sold": true
   },
   {
    "code": "A11.06",
    "type": "2 phòng ngủ",
    "floor": 11,
    "dir": "Bắc",
    "area": 91,
    "price": 6.23,
    "sold": false
   },
   {
    "code": "A11.02",
    "type": "1PN / Studio",
    "floor": 11,
    "dir": "Đông Nam",
    "area": 69,
    "price": 2.47,
    "sold": true
   },
   {
    "code": "A18.08",
    "type": "2 phòng ngủ",
    "floor": 18,
    "dir": "Đông Nam",
    "area": 90,
    "price": 6.63,
    "sold": false
   },
   {
    "code": "A09.06",
    "type": "1PN / Studio",
    "floor": 9,
    "dir": "Tây Bắc",
    "area": 69,
    "price": 2.34,
    "sold": false
   },
   {
    "code": "A31.09",
    "type": "2 phòng ngủ",
    "floor": 31,
    "dir": "Nam",
    "area": 88,
    "price": 6.8,
    "sold": false
   },
   {
    "code": "A25.12",
    "type": "1PN / Studio",
    "floor": 25,
    "dir": "Bắc",
    "area": 64,
    "price": 2.5,
    "sold": false
   },
   {
    "code": "A04.05",
    "type": "2 phòng ngủ",
    "floor": 4,
    "dir": "Đông Bắc",
    "area": 93,
    "price": 6.13,
    "sold": false
   },
   {
    "code": "A13.04",
    "type": "1PN / Studio",
    "floor": 13,
    "dir": "Tây Bắc",
    "area": 67,
    "price": 2.33,
    "sold": false
   },
   {
    "code": "A30.02",
    "type": "2 phòng ngủ",
    "floor": 30,
    "dir": "Nam",
    "area": 93,
    "price": 6.95,
    "sold": false
   },
   {
    "code": "A31.03",
    "type": "1PN / Studio",
    "floor": 31,
    "dir": "Đông Bắc",
    "area": 69,
    "price": 2.54,
    "sold": false
   },
   {
    "code": "A28.10",
    "type": "2 phòng ngủ",
    "floor": 28,
    "dir": "Tây Nam",
    "area": 94,
    "price": 6.73,
    "sold": false
   }
  ],
  "policies": [
   {
    "value": "30%",
    "text": "Thanh toán đến khi nhận nhà"
   },
   {
    "value": "70%",
    "text": "Ngân hàng hỗ trợ vay"
   },
   {
    "value": "0%",
    "text": "Lãi suất trong 18 tháng"
   },
   {
    "value": "9%",
    "text": "Chiết khấu thanh toán sớm"
   }
  ],
  "payments": [
   {
    "step": "Ký thỏa thuận đặt cọc",
    "amount": "10%"
   },
   {
    "step": "Ký HĐMB (30 ngày)",
    "amount": "20%"
   },
   {
    "step": "Đợt 3–6 (3 tháng/đợt)",
    "amount": "5%/đợt"
   },
   {
    "step": "Nhận bàn giao",
    "amount": "25%"
   },
   {
    "step": "Nhận sổ hồng",
    "amount": "5%"
   }
  ],
  "promo": "Tặng gói nội thất 150 triệu và miễn 2 năm phí quản lý cho 20 khách đầu tiên.",
  "progress": 12,
  "progressAt": "10/2026",
  "milestones": [
   {
    "title": "Khởi công",
    "when": "Q1/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện móng & hầm",
    "when": "Q3/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Thi công phần thân",
    "when": "Q2/2026",
    "done": false,
    "image": "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Cất nóc",
    "when": "Q4/2026",
    "done": false,
    "image": "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện & bàn giao",
    "when": "Q2/2028",
    "done": false,
    "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "galleryCats": [
   "Phối cảnh",
   "Tiện ích",
   "Nhà mẫu",
   "Thực tế",
   "Phối cảnh",
   "Tiện ích"
  ],
  "loanRatio": 70,
  "loanYears": 20,
  "loanRate": 9.5,
  "faqs": [
   {
    "q": "Pháp lý dự án hiện tại thế nào?",
    "a": "Đã có quy hoạch 1/500 và giấy phép xây dựng. Sản phẩm condotel sở hữu 50 năm. Điều kiện mở bán công bố khi nhận booking. Khang Thịnh Land gửi bản tóm tắt pháp lý khi khách yêu cầu."
   },
   {
    "q": "Ngân hàng hỗ trợ vay bao nhiêu?",
    "a": "Tối đa 70% giá trị sản phẩm, thời hạn đến 25 năm, ân hạn nợ gốc 12–24 tháng và hỗ trợ lãi suất 0% trong 18 tháng."
   },
   {
    "q": "Khi nào bàn giao? Bàn giao tiêu chuẩn gì?",
    "a": "Dự kiến bàn giao Q2/2028, hoàn thiện cơ bản nội thất liền tường, thiết bị vệ sinh và bếp cao cấp."
   },
   {
    "q": "Người nước ngoài có được mua không?",
    "a": "Người nước ngoài được sở hữu căn hộ trong hạn mức pháp luật cho phép (tối đa 30% số căn của tòa, thời hạn 50 năm, có thể gia hạn)."
   },
   {
    "q": "Phí quản lý bao nhiêu?",
    "a": "Phí quản lý dự kiến 12.000 – 18.000 đ/m²/tháng, tùy loại hình và khối tiện ích."
   },
   {
    "q": "Có cam kết cho thuê không?",
    "a": "Lợi suất cho thuê tham khảo khu vực ~7.5%/năm. Liên hệ để nhận phương án cho thuê chi tiết."
   }
  ]
 },
 {
  "id": "green-valley",
  "name": "Green Valley Land",
  "area": "Long An",
  "type": "Đất nền",
  "status": "dang-mo-ban",
  "priceFrom": 1.2,
  "priceTo": 2.8,
  "beds": [],
  "dev": "Mekong Land",
  "scale": "620 nền · 25 ha",
  "handover": "Sổ riêng từng nền",
  "yield": 0,
  "growth": 12,
  "hot": false,
  "desc": "Đất nền sổ đỏ, hạ tầng hoàn thiện, giáp vành đai 4.",
  "legal": "Đất ở đã có sổ đỏ riêng từng nền, hạ tầng kỹ thuật nghiệm thu. Không hình thành căn hộ, không thuộc diện bảo lãnh nhà ở hình thành trong tương lai.",
  "address": "Quốc lộ 1, xã Bến Lức, huyện Bến Lức, Long An, giáp vành đai 4",
  "video": "video.html?id=green-valley",
  "tour": "tour.html?id=green-valley",
  "amenities": [
   "🛣️ Đường nội bộ trải nhựa",
   "💡 Điện chiếu sáng",
   "🚰 Nước máy từng nền",
   "🌳 Cây xanh dải phân cách",
   "🔒 Cổng và bảo vệ",
   "🏪 Khu thương mại dịch vụ",
   "🚌 Điểm dừng xe buýt",
   "📐 Mỗi nền có mốc giới"
  ],
  "image": "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=75",
  "thumb": "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=600&q=75",
  "gallery": [
   "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=75"
  ],
  "overview": "Đất nền sổ đỏ, hạ tầng hoàn thiện, giáp vành đai 4. Dự án được quy hoạch đồng bộ, hướng tới cộng đồng cư dân văn minh với hệ tiện ích chuẩn resort và kết nối thuận tiện tới các trục giao thông huyết mạch.",
  "density": "55%",
  "ownership": "Lâu dài (người Việt)",
  "contractor": "Tổng thầu xây dựng hạng A",
  "highlights": [
   {
    "title": "Tầm nhìn",
    "text": "Đa hướng, thoáng vĩnh viễn"
   },
   {
    "title": "Kết nối",
    "text": "5 phút đến trục chính"
   },
   {
    "title": "Thiết kế",
    "text": "Kiến trúc xanh, đạt chuẩn EDGE"
   },
   {
    "title": "Lợi suất",
    "text": "Tăng giá ~12%/năm"
   }
  ],
  "connections": [
   {
    "icon": "🚇",
    "name": "Ga Metro / trục giao thông chính",
    "minutes": 5
   },
   {
    "icon": "🏫",
    "name": "Trường quốc tế",
    "minutes": 7
   },
   {
    "icon": "🏥",
    "name": "Bệnh viện đa khoa",
    "minutes": 10
   },
   {
    "icon": "🛍️",
    "name": "Trung tâm thương mại",
    "minutes": 8
   },
   {
    "icon": "🏢",
    "name": "Trung tâm hành chính Long An",
    "minutes": 15
   },
   {
    "icon": "✈️",
    "name": "Sân bay",
    "minutes": 30
   }
  ],
  "amenitiesOut": [
   "🏫 Trường học các cấp",
   "🏥 Bệnh viện quốc tế",
   "🛒 Siêu thị – TTTM",
   "🌊 Công viên ven sông",
   "🏛️ Trung tâm hành chính",
   "🚌 Bến xe buýt – Metro",
   "⛳ Sân golf",
   "🏦 Ngân hàng"
  ],
  "floorplans": [
   {
    "name": "Nền tiêu chuẩn",
    "beds": 0,
    "area": 80,
    "baths": 0,
    "price": 1.2,
    "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=75"
   },
   {
    "name": "Nền rộng",
    "beds": 1,
    "area": 100,
    "baths": 0,
    "price": 1.88,
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=75"
   },
   {
    "name": "Nền góc",
    "beds": 2,
    "area": 120,
    "baths": 0,
    "price": 2.56,
    "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "priceList": [
   {
    "code": "L1",
    "type": "Nền tiêu chuẩn",
    "floor": 2,
    "dir": "Bắc",
    "area": 86,
    "price": 1.22,
    "sold": false
   },
   {
    "code": "L2",
    "type": "Nền rộng",
    "floor": 2,
    "dir": "Nam",
    "area": 104,
    "price": 1.96,
    "sold": true
   },
   {
    "code": "L3",
    "type": "Nền góc",
    "floor": 1,
    "dir": "Bắc",
    "area": 125,
    "price": 2.67,
    "sold": false
   },
   {
    "code": "L4",
    "type": "Nền tiêu chuẩn",
    "floor": 3,
    "dir": "Nam",
    "area": 88,
    "price": 1.24,
    "sold": true
   },
   {
    "code": "L5",
    "type": "Nền rộng",
    "floor": 2,
    "dir": "Đông Nam",
    "area": 101,
    "price": 1.97,
    "sold": false
   },
   {
    "code": "L6",
    "type": "Nền góc",
    "floor": 2,
    "dir": "Tây Bắc",
    "area": 122,
    "price": 2.64,
    "sold": false
   },
   {
    "code": "L7",
    "type": "Nền tiêu chuẩn",
    "floor": 3,
    "dir": "Bắc",
    "area": 85,
    "price": 1.25,
    "sold": false
   },
   {
    "code": "L8",
    "type": "Nền rộng",
    "floor": 1,
    "dir": "Tây Bắc",
    "area": 105,
    "price": 1.93,
    "sold": false
   },
   {
    "code": "L9",
    "type": "Nền góc",
    "floor": 1,
    "dir": "Nam",
    "area": 126,
    "price": 2.66,
    "sold": false
   },
   {
    "code": "L10",
    "type": "Nền tiêu chuẩn",
    "floor": 1,
    "dir": "Tây Bắc",
    "area": 86,
    "price": 1.24,
    "sold": true
   },
   {
    "code": "L11",
    "type": "Nền rộng",
    "floor": 1,
    "dir": "Đông Bắc",
    "area": 101,
    "price": 1.95,
    "sold": false
   },
   {
    "code": "L12",
    "type": "Nền góc",
    "floor": 2,
    "dir": "Tây Nam",
    "area": 122,
    "price": 2.7,
    "sold": false
   },
   {
    "code": "L13",
    "type": "Nền tiêu chuẩn",
    "floor": 3,
    "dir": "Bắc",
    "area": 85,
    "price": 1.24,
    "sold": true
   },
   {
    "code": "L14",
    "type": "Nền rộng",
    "floor": 3,
    "dir": "Tây Nam",
    "area": 104,
    "price": 1.95,
    "sold": true
   },
   {
    "code": "L15",
    "type": "Nền góc",
    "floor": 2,
    "dir": "Bắc",
    "area": 126,
    "price": 2.65,
    "sold": false
   },
   {
    "code": "L16",
    "type": "Nền tiêu chuẩn",
    "floor": 2,
    "dir": "Đông Nam",
    "area": 81,
    "price": 1.29,
    "sold": false
   },
   {
    "code": "L17",
    "type": "Nền rộng",
    "floor": 1,
    "dir": "Bắc",
    "area": 100,
    "price": 1.96,
    "sold": false
   },
   {
    "code": "L18",
    "type": "Nền góc",
    "floor": 1,
    "dir": "Nam",
    "area": 122,
    "price": 2.75,
    "sold": false
   }
  ],
  "policies": [
   {
    "value": "30%",
    "text": "Thanh toán đến khi nhận nhà"
   },
   {
    "value": "70%",
    "text": "Ngân hàng hỗ trợ vay"
   },
   {
    "value": "0%",
    "text": "Lãi suất trong 18 tháng"
   },
   {
    "value": "9%",
    "text": "Chiết khấu thanh toán sớm"
   }
  ],
  "payments": [
   {
    "step": "Ký thỏa thuận đặt cọc",
    "amount": "10%"
   },
   {
    "step": "Ký HĐMB (30 ngày)",
    "amount": "20%"
   },
   {
    "step": "Đợt 3–6 (3 tháng/đợt)",
    "amount": "5%/đợt"
   },
   {
    "step": "Nhận bàn giao",
    "amount": "25%"
   },
   {
    "step": "Nhận sổ hồng",
    "amount": "5%"
   }
  ],
  "promo": "Tặng gói nội thất 150 triệu và miễn 2 năm phí quản lý cho 20 khách đầu tiên.",
  "progress": 58,
  "progressAt": "10/2026",
  "milestones": [
   {
    "title": "Khởi công",
    "when": "Q1/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện móng & hầm",
    "when": "Q3/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Thi công phần thân",
    "when": "Q2/2026",
    "done": true,
    "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Cất nóc",
    "when": "Q4/2026",
    "done": false,
    "image": "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện & bàn giao",
    "when": "Sổ riêng từng nền",
    "done": false,
    "image": "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "galleryCats": [
   "Phối cảnh",
   "Tiện ích",
   "Nhà mẫu",
   "Thực tế",
   "Phối cảnh",
   "Tiện ích"
  ],
  "loanRatio": 70,
  "loanYears": 20,
  "loanRate": 9.5,
  "faqs": [
   {
    "q": "Pháp lý dự án hiện tại thế nào?",
    "a": "Đất ở đã có sổ đỏ riêng từng nền, hạ tầng kỹ thuật nghiệm thu. Không hình thành căn hộ, không thuộc diện bảo lãnh nhà ở hình thành trong tương lai. Khang Thịnh Land gửi bản tóm tắt pháp lý khi khách yêu cầu."
   },
   {
    "q": "Ngân hàng hỗ trợ vay bao nhiêu?",
    "a": "Tối đa 70% giá trị sản phẩm, thời hạn đến 25 năm, ân hạn nợ gốc 12–24 tháng và hỗ trợ lãi suất 0% trong 18 tháng."
   },
   {
    "q": "Khi nào bàn giao? Bàn giao tiêu chuẩn gì?",
    "a": "Dự kiến bàn giao Sổ riêng từng nền, hoàn thiện cơ bản nội thất liền tường, thiết bị vệ sinh và bếp cao cấp."
   },
   {
    "q": "Người nước ngoài có được mua không?",
    "a": "Người nước ngoài được sở hữu căn hộ trong hạn mức pháp luật cho phép (tối đa 30% số căn của tòa, thời hạn 50 năm, có thể gia hạn)."
   },
   {
    "q": "Phí quản lý bao nhiêu?",
    "a": "Đất nền không phát sinh phí quản lý căn hộ. Phí bảo trì hạ tầng khu dân cư được thông báo theo quy chế ban quản lý."
   },
   {
    "q": "Có cam kết cho thuê không?",
    "a": "Đất nền chủ yếu đầu tư tăng giá; chuyên viên sẽ tư vấn phương án khai thác."
   }
  ]
 },
 {
  "id": "han-river-tower",
  "name": "Hàn River Tower",
  "area": "Đà Nẵng",
  "type": "Căn hộ",
  "status": "da-ban-giao",
  "priceFrom": 2.9,
  "priceTo": 7.2,
  "beds": [
   1,
   2,
   3
  ],
  "dev": "Miền Trung Development",
  "scale": "1 tháp · 520 căn",
  "handover": "Đã bàn giao 2025",
  "yield": 5.8,
  "growth": 6,
  "hot": false,
  "desc": "Căn hộ view sông Hàn và cầu Rồng, đã có sổ hồng.",
  "legal": "Đã bàn giao và cấp sổ hồng cho cư dân. Pháp lý hoàn công, đủ điều kiện chuyển nhượng.",
  "address": "Đường Bạch Đằng, phường Hải Châu, quận Hải Châu, Đà Nẵng",
  "video": "video.html?id=han-river-tower",
  "tour": "tour.html?id=han-river-tower",
  "amenities": [
   "🏊 Hồ bơi tràn bờ",
   "🌳 Công viên trung tâm",
   "🏋️ Gym và Yoga",
   "🧒 Khu vui chơi trẻ em",
   "🍽️ Nhà hàng và café",
   "🧖 Spa và sauna",
   "🔒 An ninh 3 lớp 24/7",
   "⚡ Trạm sạc xe điện",
   "📚 Thư viện và co-working",
   "🛗 Sảnh đón tiêu chuẩn khách sạn"
  ],
  "image": "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=75",
  "thumb": "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=600&q=75",
  "gallery": [
   "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=75"
  ],
  "overview": "Căn hộ view sông Hàn và cầu Rồng, đã có sổ hồng. Dự án được quy hoạch đồng bộ, hướng tới cộng đồng cư dân văn minh với hệ tiện ích chuẩn resort và kết nối thuận tiện tới các trục giao thông huyết mạch.",
  "density": "28%",
  "ownership": "Lâu dài (người Việt)",
  "contractor": "Tổng thầu xây dựng hạng A",
  "highlights": [
   {
    "title": "Tầm nhìn",
    "text": "Đa hướng, thoáng vĩnh viễn"
   },
   {
    "title": "Kết nối",
    "text": "5 phút đến trục chính"
   },
   {
    "title": "Thiết kế",
    "text": "Kiến trúc xanh, đạt chuẩn EDGE"
   },
   {
    "title": "Lợi suất",
    "text": "~5.8%/năm"
   }
  ],
  "connections": [
   {
    "icon": "🚇",
    "name": "Ga Metro / trục giao thông chính",
    "minutes": 5
   },
   {
    "icon": "🏫",
    "name": "Trường quốc tế",
    "minutes": 7
   },
   {
    "icon": "🏥",
    "name": "Bệnh viện đa khoa",
    "minutes": 10
   },
   {
    "icon": "🛍️",
    "name": "Trung tâm thương mại",
    "minutes": 8
   },
   {
    "icon": "🏢",
    "name": "Trung tâm hành chính Đà Nẵng",
    "minutes": 15
   },
   {
    "icon": "✈️",
    "name": "Sân bay",
    "minutes": 30
   }
  ],
  "amenitiesOut": [
   "🏫 Trường học các cấp",
   "🏥 Bệnh viện quốc tế",
   "🛒 Siêu thị – TTTM",
   "🌊 Công viên ven sông",
   "🏛️ Trung tâm hành chính",
   "🚌 Bến xe buýt – Metro",
   "⛳ Sân golf",
   "🏦 Ngân hàng"
  ],
  "floorplans": [
   {
    "name": "1PN / Studio",
    "beds": 1,
    "area": 62,
    "baths": 1,
    "price": 2.9,
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=75"
   },
   {
    "name": "2 phòng ngủ",
    "beds": 2,
    "area": 86,
    "baths": 2,
    "price": 4.73,
    "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=75"
   },
   {
    "name": "3 phòng ngủ",
    "beds": 3,
    "area": 110,
    "baths": 2,
    "price": 6.56,
    "image": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "priceList": [
   {
    "code": "A16.04",
    "type": "1PN / Studio",
    "floor": 16,
    "dir": "Đông Bắc",
    "area": 63,
    "price": 3.1,
    "sold": false
   },
   {
    "code": "A35.08",
    "type": "2 phòng ngủ",
    "floor": 35,
    "dir": "Đông Bắc",
    "area": 90,
    "price": 5.46,
    "sold": false
   },
   {
    "code": "A34.01",
    "type": "3 phòng ngủ",
    "floor": 34,
    "dir": "Bắc",
    "area": 111,
    "price": 7.48,
    "sold": true
   },
   {
    "code": "A24.12",
    "type": "1PN / Studio",
    "floor": 24,
    "dir": "Đông Bắc",
    "area": 65,
    "price": 3.29,
    "sold": false
   },
   {
    "code": "A19.07",
    "type": "2 phòng ngủ",
    "floor": 19,
    "dir": "Tây Bắc",
    "area": 91,
    "price": 5.23,
    "sold": false
   },
   {
    "code": "A28.04",
    "type": "3 phòng ngủ",
    "floor": 28,
    "dir": "Nam",
    "area": 112,
    "price": 7.5,
    "sold": true
   },
   {
    "code": "A29.06",
    "type": "1PN / Studio",
    "floor": 29,
    "dir": "Đông Bắc",
    "area": 66,
    "price": 3.28,
    "sold": true
   },
   {
    "code": "A34.06",
    "type": "2 phòng ngủ",
    "floor": 34,
    "dir": "Tây Bắc",
    "area": 92,
    "price": 5.57,
    "sold": false
   },
   {
    "code": "A19.06",
    "type": "3 phòng ngủ",
    "floor": 19,
    "dir": "Tây Nam",
    "area": 113,
    "price": 7.54,
    "sold": true
   },
   {
    "code": "A32.12",
    "type": "1PN / Studio",
    "floor": 32,
    "dir": "Đông Nam",
    "area": 66,
    "price": 3.48,
    "sold": false
   },
   {
    "code": "A12.03",
    "type": "2 phòng ngủ",
    "floor": 12,
    "dir": "Bắc",
    "area": 92,
    "price": 5.18,
    "sold": true
   },
   {
    "code": "A08.07",
    "type": "3 phòng ngủ",
    "floor": 8,
    "dir": "Đông Bắc",
    "area": 112,
    "price": 6.98,
    "sold": false
   },
   {
    "code": "A31.05",
    "type": "1PN / Studio",
    "floor": 31,
    "dir": "Bắc",
    "area": 66,
    "price": 3.29,
    "sold": true
   },
   {
    "code": "A22.11",
    "type": "2 phòng ngủ",
    "floor": 22,
    "dir": "Tây Nam",
    "area": 92,
    "price": 5.29,
    "sold": false
   },
   {
    "code": "A29.07",
    "type": "3 phòng ngủ",
    "floor": 29,
    "dir": "Đông Nam",
    "area": 112,
    "price": 7.63,
    "sold": false
   },
   {
    "code": "A27.08",
    "type": "1PN / Studio",
    "floor": 27,
    "dir": "Tây Nam",
    "area": 65,
    "price": 3.38,
    "sold": false
   },
   {
    "code": "A29.06",
    "type": "2 phòng ngủ",
    "floor": 29,
    "dir": "Tây Bắc",
    "area": 90,
    "price": 5.51,
    "sold": false
   },
   {
    "code": "A11.06",
    "type": "3 phòng ngủ",
    "floor": 11,
    "dir": "Nam",
    "area": 110,
    "price": 7.36,
    "sold": false
   }
  ],
  "policies": [
   {
    "value": "30%",
    "text": "Thanh toán đến khi nhận nhà"
   },
   {
    "value": "70%",
    "text": "Ngân hàng hỗ trợ vay"
   },
   {
    "value": "0%",
    "text": "Lãi suất trong 18 tháng"
   },
   {
    "value": "9%",
    "text": "Chiết khấu thanh toán sớm"
   }
  ],
  "payments": [
   {
    "step": "Ký thỏa thuận đặt cọc",
    "amount": "10%"
   },
   {
    "step": "Ký HĐMB (30 ngày)",
    "amount": "20%"
   },
   {
    "step": "Đợt 3–6 (3 tháng/đợt)",
    "amount": "5%/đợt"
   },
   {
    "step": "Nhận bàn giao",
    "amount": "25%"
   },
   {
    "step": "Nhận sổ hồng",
    "amount": "5%"
   }
  ],
  "promo": "Tặng gói nội thất 150 triệu và miễn 2 năm phí quản lý cho 20 khách đầu tiên.",
  "progress": 100,
  "progressAt": "10/2026",
  "milestones": [
   {
    "title": "Khởi công",
    "when": "Q1/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện móng & hầm",
    "when": "Q3/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Thi công phần thân",
    "when": "Q2/2026",
    "done": true,
    "image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Cất nóc",
    "when": "Q4/2026",
    "done": true,
    "image": "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện & bàn giao",
    "when": "Đã bàn giao 2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "galleryCats": [
   "Phối cảnh",
   "Tiện ích",
   "Nhà mẫu",
   "Thực tế",
   "Phối cảnh",
   "Tiện ích"
  ],
  "loanRatio": 70,
  "loanYears": 20,
  "loanRate": 9.5,
  "faqs": [
   {
    "q": "Pháp lý dự án hiện tại thế nào?",
    "a": "Đã bàn giao và cấp sổ hồng cho cư dân. Pháp lý hoàn công, đủ điều kiện chuyển nhượng. Khang Thịnh Land gửi bản tóm tắt pháp lý khi khách yêu cầu."
   },
   {
    "q": "Ngân hàng hỗ trợ vay bao nhiêu?",
    "a": "Tối đa 70% giá trị sản phẩm, thời hạn đến 25 năm, ân hạn nợ gốc 12–24 tháng và hỗ trợ lãi suất 0% trong 18 tháng."
   },
   {
    "q": "Khi nào bàn giao? Bàn giao tiêu chuẩn gì?",
    "a": "Dự kiến bàn giao Đã bàn giao 2025, hoàn thiện cơ bản nội thất liền tường, thiết bị vệ sinh và bếp cao cấp."
   },
   {
    "q": "Người nước ngoài có được mua không?",
    "a": "Người nước ngoài được sở hữu căn hộ trong hạn mức pháp luật cho phép (tối đa 30% số căn của tòa, thời hạn 50 năm, có thể gia hạn)."
   },
   {
    "q": "Phí quản lý bao nhiêu?",
    "a": "Phí quản lý dự kiến 12.000 – 18.000 đ/m²/tháng, tùy loại hình và khối tiện ích."
   },
   {
    "q": "Có cam kết cho thuê không?",
    "a": "Lợi suất cho thuê tham khảo khu vực ~5.8%/năm. Liên hệ để nhận phương án cho thuê chi tiết."
   }
  ]
 },
 {
  "id": "westlake-signature",
  "name": "Westlake Signature",
  "area": "Hà Nội",
  "type": "Căn hộ",
  "status": "sap-mo-ban",
  "priceFrom": 6.5,
  "priceTo": 18,
  "beds": [
   2,
   3,
   4
  ],
  "dev": "Thăng Long Prime",
  "scale": "2 tháp · 640 căn",
  "handover": "Q4/2028",
  "yield": 4.2,
  "growth": 8,
  "hot": true,
  "desc": "Căn hộ hạng sang ven hồ Tây, tiện ích chuẩn khách sạn 5 sao.",
  "legal": "Đã có quy hoạch 1/500 và giấy phép xây dựng. Đủ điều kiện mở bán được công bố trước ngày nhận booking.",
  "address": "Đường Xuân Diệu, phường Quảng An, quận Tây Hồ, Hà Nội",
  "video": "video.html?id=westlake-signature",
  "tour": "tour.html?id=westlake-signature",
  "amenities": [
   "🏊 Hồ bơi tràn bờ",
   "🌳 Công viên trung tâm",
   "🏋️ Gym và Yoga",
   "🧒 Khu vui chơi trẻ em",
   "🍽️ Nhà hàng và café",
   "🧖 Spa và sauna",
   "🔒 An ninh 3 lớp 24/7",
   "⚡ Trạm sạc xe điện",
   "📚 Thư viện và co-working",
   "🛗 Sảnh đón tiêu chuẩn khách sạn"
  ],
  "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=75",
  "thumb": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=75",
  "gallery": [
   "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=75"
  ],
  "overview": "Căn hộ hạng sang ven hồ Tây, tiện ích chuẩn khách sạn 5 sao. Dự án được quy hoạch đồng bộ, hướng tới cộng đồng cư dân văn minh với hệ tiện ích chuẩn resort và kết nối thuận tiện tới các trục giao thông huyết mạch.",
  "density": "28%",
  "ownership": "Lâu dài (người Việt)",
  "contractor": "Tổng thầu xây dựng hạng A",
  "highlights": [
   {
    "title": "Tầm nhìn",
    "text": "Đa hướng, thoáng vĩnh viễn"
   },
   {
    "title": "Kết nối",
    "text": "5 phút đến trục chính"
   },
   {
    "title": "Thiết kế",
    "text": "Kiến trúc xanh, đạt chuẩn EDGE"
   },
   {
    "title": "Lợi suất",
    "text": "~4.2%/năm"
   }
  ],
  "connections": [
   {
    "icon": "🚇",
    "name": "Ga Metro / trục giao thông chính",
    "minutes": 5
   },
   {
    "icon": "🏫",
    "name": "Trường quốc tế",
    "minutes": 7
   },
   {
    "icon": "🏥",
    "name": "Bệnh viện đa khoa",
    "minutes": 10
   },
   {
    "icon": "🛍️",
    "name": "Trung tâm thương mại",
    "minutes": 8
   },
   {
    "icon": "🏢",
    "name": "Trung tâm hành chính Hà Nội",
    "minutes": 15
   },
   {
    "icon": "✈️",
    "name": "Sân bay",
    "minutes": 30
   }
  ],
  "amenitiesOut": [
   "🏫 Trường học các cấp",
   "🏥 Bệnh viện quốc tế",
   "🛒 Siêu thị – TTTM",
   "🌊 Công viên ven sông",
   "🏛️ Trung tâm hành chính",
   "🚌 Bến xe buýt – Metro",
   "⛳ Sân golf",
   "🏦 Ngân hàng"
  ],
  "floorplans": [
   {
    "name": "2 phòng ngủ",
    "beds": 2,
    "area": 86,
    "baths": 2,
    "price": 6.5,
    "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=75"
   },
   {
    "name": "3 phòng ngủ",
    "beds": 3,
    "area": 110,
    "baths": 2,
    "price": 11.39,
    "image": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=75"
   },
   {
    "name": "4 phòng ngủ",
    "beds": 4,
    "area": 134,
    "baths": 3,
    "price": 16.27,
    "image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "priceList": [
   {
    "code": "A11.10",
    "type": "2 phòng ngủ",
    "floor": 11,
    "dir": "Đông Nam",
    "area": 86,
    "price": 7.24,
    "sold": true
   },
   {
    "code": "A04.04",
    "type": "3 phòng ngủ",
    "floor": 4,
    "dir": "Đông Bắc",
    "area": 116,
    "price": 11.67,
    "sold": false
   },
   {
    "code": "A35.06",
    "type": "4 phòng ngủ",
    "floor": 35,
    "dir": "Tây Bắc",
    "area": 137,
    "price": 19.18,
    "sold": true
   },
   {
    "code": "A12.10",
    "type": "2 phòng ngủ",
    "floor": 12,
    "dir": "Tây Nam",
    "area": 89,
    "price": 7.31,
    "sold": false
   },
   {
    "code": "A16.07",
    "type": "3 phòng ngủ",
    "floor": 16,
    "dir": "Đông Nam",
    "area": 111,
    "price": 13.01,
    "sold": false
   },
   {
    "code": "A24.01",
    "type": "4 phòng ngủ",
    "floor": 24,
    "dir": "Nam",
    "area": 140,
    "price": 18.49,
    "sold": true
   },
   {
    "code": "A11.08",
    "type": "2 phòng ngủ",
    "floor": 11,
    "dir": "Tây Bắc",
    "area": 91,
    "price": 7.11,
    "sold": false
   },
   {
    "code": "A26.09",
    "type": "3 phòng ngủ",
    "floor": 26,
    "dir": "Tây Nam",
    "area": 113,
    "price": 13.3,
    "sold": true
   },
   {
    "code": "A09.07",
    "type": "4 phòng ngủ",
    "floor": 9,
    "dir": "Tây Bắc",
    "area": 141,
    "price": 17.3,
    "sold": false
   },
   {
    "code": "A07.06",
    "type": "2 phòng ngủ",
    "floor": 7,
    "dir": "Tây Nam",
    "area": 93,
    "price": 7.2,
    "sold": false
   },
   {
    "code": "A32.10",
    "type": "3 phòng ngủ",
    "floor": 32,
    "dir": "Đông Nam",
    "area": 114,
    "price": 13.35,
    "sold": false
   },
   {
    "code": "A26.11",
    "type": "4 phòng ngủ",
    "floor": 26,
    "dir": "Nam",
    "area": 135,
    "price": 19.11,
    "sold": false
   },
   {
    "code": "A35.02",
    "type": "2 phòng ngủ",
    "floor": 35,
    "dir": "Đông Nam",
    "area": 94,
    "price": 7.89,
    "sold": false
   },
   {
    "code": "A36.10",
    "type": "3 phòng ngủ",
    "floor": 36,
    "dir": "Đông Bắc",
    "area": 115,
    "price": 13.5,
    "sold": false
   },
   {
    "code": "A05.03",
    "type": "4 phòng ngủ",
    "floor": 5,
    "dir": "Đông Nam",
    "area": 135,
    "price": 17.89,
    "sold": false
   },
   {
    "code": "A25.09",
    "type": "2 phòng ngủ",
    "floor": 25,
    "dir": "Tây Bắc",
    "area": 86,
    "price": 7.38,
    "sold": false
   },
   {
    "code": "A36.09",
    "type": "3 phòng ngủ",
    "floor": 36,
    "dir": "Tây Nam",
    "area": 115,
    "price": 13.53,
    "sold": false
   },
   {
    "code": "A16.06",
    "type": "4 phòng ngủ",
    "floor": 16,
    "dir": "Tây Bắc",
    "area": 135,
    "price": 17.38,
    "sold": true
   }
  ],
  "policies": [
   {
    "value": "30%",
    "text": "Thanh toán đến khi nhận nhà"
   },
   {
    "value": "70%",
    "text": "Ngân hàng hỗ trợ vay"
   },
   {
    "value": "0%",
    "text": "Lãi suất trong 18 tháng"
   },
   {
    "value": "9%",
    "text": "Chiết khấu thanh toán sớm"
   }
  ],
  "payments": [
   {
    "step": "Ký thỏa thuận đặt cọc",
    "amount": "10%"
   },
   {
    "step": "Ký HĐMB (30 ngày)",
    "amount": "20%"
   },
   {
    "step": "Đợt 3–6 (3 tháng/đợt)",
    "amount": "5%/đợt"
   },
   {
    "step": "Nhận bàn giao",
    "amount": "25%"
   },
   {
    "step": "Nhận sổ hồng",
    "amount": "5%"
   }
  ],
  "promo": "Tặng gói nội thất 150 triệu và miễn 2 năm phí quản lý cho 20 khách đầu tiên.",
  "progress": 12,
  "progressAt": "10/2026",
  "milestones": [
   {
    "title": "Khởi công",
    "when": "Q1/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện móng & hầm",
    "when": "Q3/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Thi công phần thân",
    "when": "Q2/2026",
    "done": false,
    "image": "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Cất nóc",
    "when": "Q4/2026",
    "done": false,
    "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện & bàn giao",
    "when": "Q4/2028",
    "done": false,
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "galleryCats": [
   "Phối cảnh",
   "Tiện ích",
   "Nhà mẫu",
   "Thực tế",
   "Phối cảnh",
   "Tiện ích"
  ],
  "loanRatio": 70,
  "loanYears": 20,
  "loanRate": 9.5,
  "faqs": [
   {
    "q": "Pháp lý dự án hiện tại thế nào?",
    "a": "Đã có quy hoạch 1/500 và giấy phép xây dựng. Đủ điều kiện mở bán được công bố trước ngày nhận booking. Khang Thịnh Land gửi bản tóm tắt pháp lý khi khách yêu cầu."
   },
   {
    "q": "Ngân hàng hỗ trợ vay bao nhiêu?",
    "a": "Tối đa 70% giá trị sản phẩm, thời hạn đến 25 năm, ân hạn nợ gốc 12–24 tháng và hỗ trợ lãi suất 0% trong 18 tháng."
   },
   {
    "q": "Khi nào bàn giao? Bàn giao tiêu chuẩn gì?",
    "a": "Dự kiến bàn giao Q4/2028, hoàn thiện cơ bản nội thất liền tường, thiết bị vệ sinh và bếp cao cấp."
   },
   {
    "q": "Người nước ngoài có được mua không?",
    "a": "Người nước ngoài được sở hữu căn hộ trong hạn mức pháp luật cho phép (tối đa 30% số căn của tòa, thời hạn 50 năm, có thể gia hạn)."
   },
   {
    "q": "Phí quản lý bao nhiêu?",
    "a": "Phí quản lý dự kiến 12.000 – 18.000 đ/m²/tháng, tùy loại hình và khối tiện ích."
   },
   {
    "q": "Có cam kết cho thuê không?",
    "a": "Lợi suất cho thuê tham khảo khu vực ~4.2%/năm. Liên hệ để nhận phương án cho thuê chi tiết."
   }
  ]
 },
 {
  "id": "sunrise-townhouse",
  "name": "Sunrise Townhouse",
  "area": "Bình Dương",
  "type": "Nhà phố",
  "status": "da-ban-giao",
  "priceFrom": 4.2,
  "priceTo": 7.5,
  "beds": [
   3,
   4
  ],
  "dev": "Đông Nam Bộ Invest",
  "scale": "320 căn · 8 ha",
  "handover": "Đã bàn giao 2024",
  "yield": 4.9,
  "growth": 8,
  "hot": false,
  "desc": "Nhà phố liền kề cộng đồng hiện hữu, trường học và chợ nội khu.",
  "legal": "Đã bàn giao năm 2024, sổ hồng từng căn. Cộng đồng đã vào ở, giao dịch thứ cấp.",
  "address": "Đại lộ Bình Dương, phường Hòa Phú, TP. Thủ Dầu Một, Bình Dương",
  "video": "video.html?id=sunrise-townhouse",
  "tour": "tour.html?id=sunrise-townhouse",
  "amenities": [
   "🏪 Tầng trệt kinh doanh",
   "🌳 Công viên nội khu",
   "🏫 Trường học liên cấp gần kề",
   "🛒 Chợ và shophouse",
   "🔒 An ninh 24/7",
   "🚗 Lối xe riêng từng căn",
   "🧒 Sân chơi trẻ em",
   "💡 Hạ tầng điện nước âm"
  ],
  "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=75",
  "thumb": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=75",
  "gallery": [
   "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=75"
  ],
  "overview": "Nhà phố liền kề cộng đồng hiện hữu, trường học và chợ nội khu. Dự án được quy hoạch đồng bộ, hướng tới cộng đồng cư dân văn minh với hệ tiện ích chuẩn resort và kết nối thuận tiện tới các trục giao thông huyết mạch.",
  "density": "28%",
  "ownership": "Lâu dài (người Việt)",
  "contractor": "Tổng thầu xây dựng hạng A",
  "highlights": [
   {
    "title": "Tầm nhìn",
    "text": "Đa hướng, thoáng vĩnh viễn"
   },
   {
    "title": "Kết nối",
    "text": "5 phút đến trục chính"
   },
   {
    "title": "Thiết kế",
    "text": "Kiến trúc xanh, đạt chuẩn EDGE"
   },
   {
    "title": "Lợi suất",
    "text": "~4.9%/năm"
   }
  ],
  "connections": [
   {
    "icon": "🚇",
    "name": "Ga Metro / trục giao thông chính",
    "minutes": 5
   },
   {
    "icon": "🏫",
    "name": "Trường quốc tế",
    "minutes": 7
   },
   {
    "icon": "🏥",
    "name": "Bệnh viện đa khoa",
    "minutes": 10
   },
   {
    "icon": "🛍️",
    "name": "Trung tâm thương mại",
    "minutes": 8
   },
   {
    "icon": "🏢",
    "name": "Trung tâm hành chính Bình Dương",
    "minutes": 15
   },
   {
    "icon": "✈️",
    "name": "Sân bay",
    "minutes": 30
   }
  ],
  "amenitiesOut": [
   "🏫 Trường học các cấp",
   "🏥 Bệnh viện quốc tế",
   "🛒 Siêu thị – TTTM",
   "🌊 Công viên ven sông",
   "🏛️ Trung tâm hành chính",
   "🚌 Bến xe buýt – Metro",
   "⛳ Sân golf",
   "🏦 Ngân hàng"
  ],
  "floorplans": [
   {
    "name": "Nhà phố 3PN",
    "beds": 3,
    "area": 195,
    "baths": 2,
    "price": 4.2,
    "image": "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=75"
   },
   {
    "name": "Nhà phố 4PN",
    "beds": 4,
    "area": 230,
    "baths": 3,
    "price": 7.01,
    "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "priceList": [
   {
    "code": "V1",
    "type": "Nhà phố 3PN",
    "floor": 3,
    "dir": "Tây Bắc",
    "area": 198,
    "price": 4.25,
    "sold": false
   },
   {
    "code": "V2",
    "type": "Nhà phố 4PN",
    "floor": 2,
    "dir": "Đông Bắc",
    "area": 234,
    "price": 7.16,
    "sold": false
   },
   {
    "code": "V3",
    "type": "Nhà phố 3PN",
    "floor": 2,
    "dir": "Tây Nam",
    "area": 199,
    "price": 4.52,
    "sold": false
   },
   {
    "code": "V4",
    "type": "Nhà phố 4PN",
    "floor": 2,
    "dir": "Tây Bắc",
    "area": 231,
    "price": 7.04,
    "sold": false
   },
   {
    "code": "V5",
    "type": "Nhà phố 3PN",
    "floor": 2,
    "dir": "Tây Nam",
    "area": 200,
    "price": 4.48,
    "sold": true
   },
   {
    "code": "V6",
    "type": "Nhà phố 4PN",
    "floor": 1,
    "dir": "Bắc",
    "area": 232,
    "price": 7.08,
    "sold": false
   },
   {
    "code": "V7",
    "type": "Nhà phố 3PN",
    "floor": 1,
    "dir": "Đông Bắc",
    "area": 201,
    "price": 4.23,
    "sold": true
   },
   {
    "code": "V8",
    "type": "Nhà phố 4PN",
    "floor": 1,
    "dir": "Đông Nam",
    "area": 236,
    "price": 7.54,
    "sold": false
   },
   {
    "code": "V9",
    "type": "Nhà phố 3PN",
    "floor": 3,
    "dir": "Tây Nam",
    "area": 201,
    "price": 4.48,
    "sold": true
   },
   {
    "code": "V10",
    "type": "Nhà phố 4PN",
    "floor": 3,
    "dir": "Nam",
    "area": 235,
    "price": 7.39,
    "sold": false
   },
   {
    "code": "V11",
    "type": "Nhà phố 3PN",
    "floor": 1,
    "dir": "Tây Bắc",
    "area": 195,
    "price": 4.21,
    "sold": true
   },
   {
    "code": "V12",
    "type": "Nhà phố 4PN",
    "floor": 1,
    "dir": "Bắc",
    "area": 231,
    "price": 7.22,
    "sold": false
   },
   {
    "code": "V13",
    "type": "Nhà phố 3PN",
    "floor": 1,
    "dir": "Tây Bắc",
    "area": 200,
    "price": 4.24,
    "sold": true
   },
   {
    "code": "V14",
    "type": "Nhà phố 4PN",
    "floor": 2,
    "dir": "Nam",
    "area": 233,
    "price": 7.32,
    "sold": false
   },
   {
    "code": "V15",
    "type": "Nhà phố 3PN",
    "floor": 3,
    "dir": "Bắc",
    "area": 198,
    "price": 4.39,
    "sold": false
   },
   {
    "code": "V16",
    "type": "Nhà phố 4PN",
    "floor": 2,
    "dir": "Đông Nam",
    "area": 237,
    "price": 7.33,
    "sold": false
   },
   {
    "code": "V17",
    "type": "Nhà phố 3PN",
    "floor": 1,
    "dir": "Đông Nam",
    "area": 196,
    "price": 4.45,
    "sold": false
   },
   {
    "code": "V18",
    "type": "Nhà phố 4PN",
    "floor": 1,
    "dir": "Đông Bắc",
    "area": 234,
    "price": 7.24,
    "sold": false
   }
  ],
  "policies": [
   {
    "value": "30%",
    "text": "Thanh toán đến khi nhận nhà"
   },
   {
    "value": "70%",
    "text": "Ngân hàng hỗ trợ vay"
   },
   {
    "value": "0%",
    "text": "Lãi suất trong 18 tháng"
   },
   {
    "value": "9%",
    "text": "Chiết khấu thanh toán sớm"
   }
  ],
  "payments": [
   {
    "step": "Ký thỏa thuận đặt cọc",
    "amount": "10%"
   },
   {
    "step": "Ký HĐMB (30 ngày)",
    "amount": "20%"
   },
   {
    "step": "Đợt 3–6 (3 tháng/đợt)",
    "amount": "5%/đợt"
   },
   {
    "step": "Nhận bàn giao",
    "amount": "25%"
   },
   {
    "step": "Nhận sổ hồng",
    "amount": "5%"
   }
  ],
  "promo": "Tặng gói nội thất 150 triệu và miễn 2 năm phí quản lý cho 20 khách đầu tiên.",
  "progress": 100,
  "progressAt": "10/2026",
  "milestones": [
   {
    "title": "Khởi công",
    "when": "Q1/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện móng & hầm",
    "when": "Q3/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Thi công phần thân",
    "when": "Q2/2026",
    "done": true,
    "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Cất nóc",
    "when": "Q4/2026",
    "done": true,
    "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện & bàn giao",
    "when": "Đã bàn giao 2024",
    "done": true,
    "image": "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "galleryCats": [
   "Phối cảnh",
   "Tiện ích",
   "Nhà mẫu",
   "Thực tế",
   "Phối cảnh",
   "Tiện ích"
  ],
  "loanRatio": 70,
  "loanYears": 20,
  "loanRate": 9.5,
  "faqs": [
   {
    "q": "Pháp lý dự án hiện tại thế nào?",
    "a": "Đã bàn giao năm 2024, sổ hồng từng căn. Cộng đồng đã vào ở, giao dịch thứ cấp. Khang Thịnh Land gửi bản tóm tắt pháp lý khi khách yêu cầu."
   },
   {
    "q": "Ngân hàng hỗ trợ vay bao nhiêu?",
    "a": "Tối đa 70% giá trị sản phẩm, thời hạn đến 25 năm, ân hạn nợ gốc 12–24 tháng và hỗ trợ lãi suất 0% trong 18 tháng."
   },
   {
    "q": "Khi nào bàn giao? Bàn giao tiêu chuẩn gì?",
    "a": "Dự kiến bàn giao Đã bàn giao 2024, hoàn thiện cơ bản nội thất liền tường, thiết bị vệ sinh và bếp cao cấp."
   },
   {
    "q": "Người nước ngoài có được mua không?",
    "a": "Người nước ngoài được sở hữu căn hộ trong hạn mức pháp luật cho phép (tối đa 30% số căn của tòa, thời hạn 50 năm, có thể gia hạn)."
   },
   {
    "q": "Phí quản lý bao nhiêu?",
    "a": "Phí quản lý dự kiến 12.000 – 18.000 đ/m²/tháng, tùy loại hình và khối tiện ích."
   },
   {
    "q": "Có cam kết cho thuê không?",
    "a": "Lợi suất cho thuê tham khảo khu vực ~4.9%/năm. Liên hệ để nhận phương án cho thuê chi tiết."
   }
  ]
 },
 {
  "id": "saigon-pearl-studio",
  "name": "Riva Studio",
  "area": "Quận 7",
  "type": "Căn hộ",
  "status": "da-ban-giao",
  "priceFrom": 1.9,
  "priceTo": 2.9,
  "beds": [
   1
  ],
  "dev": "Nam Việt Capital",
  "scale": "1 tháp · 480 căn",
  "handover": "Đã bàn giao 2025",
  "yield": 6.4,
  "growth": 5,
  "hot": false,
  "desc": "Studio & 1PN cho thuê, đã vận hành, dòng tiền ổn định.",
  "legal": "Đã bàn giao năm 2025 và cấp sổ hồng. Tòa nhà đang vận hành, phù hợp mua để cho thuê.",
  "address": "Đường Nguyễn Đức Cảnh, phường Tân Phong, Quận 7, TP.HCM",
  "video": "video.html?id=saigon-pearl-studio",
  "tour": "tour.html?id=saigon-pearl-studio",
  "amenities": [
   "🏊 Hồ bơi tràn bờ",
   "🌳 Công viên trung tâm",
   "🏋️ Gym và Yoga",
   "🧒 Khu vui chơi trẻ em",
   "🍽️ Nhà hàng và café",
   "🧖 Spa và sauna",
   "🔒 An ninh 3 lớp 24/7",
   "⚡ Trạm sạc xe điện",
   "📚 Thư viện và co-working",
   "🛗 Sảnh đón tiêu chuẩn khách sạn"
  ],
  "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=75",
  "thumb": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=75",
  "gallery": [
   "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=75"
  ],
  "overview": "Studio & 1PN cho thuê, đã vận hành, dòng tiền ổn định. Dự án được quy hoạch đồng bộ, hướng tới cộng đồng cư dân văn minh với hệ tiện ích chuẩn resort và kết nối thuận tiện tới các trục giao thông huyết mạch.",
  "density": "28%",
  "ownership": "Lâu dài (người Việt)",
  "contractor": "Tổng thầu xây dựng hạng A",
  "highlights": [
   {
    "title": "Tầm nhìn",
    "text": "Đa hướng, thoáng vĩnh viễn"
   },
   {
    "title": "Kết nối",
    "text": "5 phút đến trục chính"
   },
   {
    "title": "Thiết kế",
    "text": "Kiến trúc xanh, đạt chuẩn EDGE"
   },
   {
    "title": "Lợi suất",
    "text": "~6.4%/năm"
   }
  ],
  "connections": [
   {
    "icon": "🚇",
    "name": "Ga Metro / trục giao thông chính",
    "minutes": 5
   },
   {
    "icon": "🏫",
    "name": "Trường quốc tế",
    "minutes": 7
   },
   {
    "icon": "🏥",
    "name": "Bệnh viện đa khoa",
    "minutes": 10
   },
   {
    "icon": "🛍️",
    "name": "Trung tâm thương mại",
    "minutes": 8
   },
   {
    "icon": "🏢",
    "name": "Trung tâm hành chính Quận 7",
    "minutes": 15
   },
   {
    "icon": "✈️",
    "name": "Sân bay",
    "minutes": 30
   }
  ],
  "amenitiesOut": [
   "🏫 Trường học các cấp",
   "🏥 Bệnh viện quốc tế",
   "🛒 Siêu thị – TTTM",
   "🌊 Công viên ven sông",
   "🏛️ Trung tâm hành chính",
   "🚌 Bến xe buýt – Metro",
   "⛳ Sân golf",
   "🏦 Ngân hàng"
  ],
  "floorplans": [
   {
    "name": "1PN / Studio",
    "beds": 1,
    "area": 62,
    "baths": 1,
    "price": 1.9,
    "image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "priceList": [
   {
    "code": "A20.05",
    "type": "1PN / Studio",
    "floor": 20,
    "dir": "Bắc",
    "area": 67,
    "price": 2.09,
    "sold": false
   },
   {
    "code": "A28.02",
    "type": "1PN / Studio",
    "floor": 28,
    "dir": "Tây Nam",
    "area": 69,
    "price": 2.25,
    "sold": false
   },
   {
    "code": "A36.08",
    "type": "1PN / Studio",
    "floor": 36,
    "dir": "Đông Nam",
    "area": 66,
    "price": 2.3,
    "sold": true
   },
   {
    "code": "A20.01",
    "type": "1PN / Studio",
    "floor": 20,
    "dir": "Nam",
    "area": 63,
    "price": 2.14,
    "sold": false
   },
   {
    "code": "A27.11",
    "type": "1PN / Studio",
    "floor": 27,
    "dir": "Bắc",
    "area": 69,
    "price": 2.11,
    "sold": false
   },
   {
    "code": "A34.04",
    "type": "1PN / Studio",
    "floor": 34,
    "dir": "Đông Nam",
    "area": 64,
    "price": 2.24,
    "sold": true
   },
   {
    "code": "A17.09",
    "type": "1PN / Studio",
    "floor": 17,
    "dir": "Đông Bắc",
    "area": 65,
    "price": 2.05,
    "sold": true
   },
   {
    "code": "A23.06",
    "type": "1PN / Studio",
    "floor": 23,
    "dir": "Đông Bắc",
    "area": 69,
    "price": 2.1,
    "sold": true
   },
   {
    "code": "A28.11",
    "type": "1PN / Studio",
    "floor": 28,
    "dir": "Tây Bắc",
    "area": 68,
    "price": 2.19,
    "sold": false
   },
   {
    "code": "A10.04",
    "type": "1PN / Studio",
    "floor": 10,
    "dir": "Đông Nam",
    "area": 67,
    "price": 2.04,
    "sold": false
   },
   {
    "code": "A15.12",
    "type": "1PN / Studio",
    "floor": 15,
    "dir": "Nam",
    "area": 68,
    "price": 2.11,
    "sold": false
   },
   {
    "code": "A20.05",
    "type": "1PN / Studio",
    "floor": 20,
    "dir": "Đông Nam",
    "area": 65,
    "price": 2.13,
    "sold": false
   },
   {
    "code": "A36.09",
    "type": "1PN / Studio",
    "floor": 36,
    "dir": "Nam",
    "area": 69,
    "price": 2.3,
    "sold": false
   },
   {
    "code": "A05.06",
    "type": "1PN / Studio",
    "floor": 5,
    "dir": "Bắc",
    "area": 66,
    "price": 1.98,
    "sold": false
   },
   {
    "code": "A09.10",
    "type": "1PN / Studio",
    "floor": 9,
    "dir": "Bắc",
    "area": 68,
    "price": 2.02,
    "sold": false
   },
   {
    "code": "A24.02",
    "type": "1PN / Studio",
    "floor": 24,
    "dir": "Tây Bắc",
    "area": 69,
    "price": 2.12,
    "sold": false
   },
   {
    "code": "A27.10",
    "type": "1PN / Studio",
    "floor": 27,
    "dir": "Đông Nam",
    "area": 64,
    "price": 2.2,
    "sold": false
   },
   {
    "code": "A30.02",
    "type": "1PN / Studio",
    "floor": 30,
    "dir": "Nam",
    "area": 63,
    "price": 2.26,
    "sold": true
   }
  ],
  "policies": [
   {
    "value": "30%",
    "text": "Thanh toán đến khi nhận nhà"
   },
   {
    "value": "70%",
    "text": "Ngân hàng hỗ trợ vay"
   },
   {
    "value": "0%",
    "text": "Lãi suất trong 18 tháng"
   },
   {
    "value": "9%",
    "text": "Chiết khấu thanh toán sớm"
   }
  ],
  "payments": [
   {
    "step": "Ký thỏa thuận đặt cọc",
    "amount": "10%"
   },
   {
    "step": "Ký HĐMB (30 ngày)",
    "amount": "20%"
   },
   {
    "step": "Đợt 3–6 (3 tháng/đợt)",
    "amount": "5%/đợt"
   },
   {
    "step": "Nhận bàn giao",
    "amount": "25%"
   },
   {
    "step": "Nhận sổ hồng",
    "amount": "5%"
   }
  ],
  "promo": "Tặng gói nội thất 150 triệu và miễn 2 năm phí quản lý cho 20 khách đầu tiên.",
  "progress": 100,
  "progressAt": "10/2026",
  "milestones": [
   {
    "title": "Khởi công",
    "when": "Q1/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện móng & hầm",
    "when": "Q3/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Thi công phần thân",
    "when": "Q2/2026",
    "done": true,
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Cất nóc",
    "when": "Q4/2026",
    "done": true,
    "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện & bàn giao",
    "when": "Đã bàn giao 2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "galleryCats": [
   "Phối cảnh",
   "Tiện ích",
   "Nhà mẫu",
   "Thực tế",
   "Phối cảnh",
   "Tiện ích"
  ],
  "loanRatio": 70,
  "loanYears": 20,
  "loanRate": 9.5,
  "faqs": [
   {
    "q": "Pháp lý dự án hiện tại thế nào?",
    "a": "Đã bàn giao năm 2025 và cấp sổ hồng. Tòa nhà đang vận hành, phù hợp mua để cho thuê. Khang Thịnh Land gửi bản tóm tắt pháp lý khi khách yêu cầu."
   },
   {
    "q": "Ngân hàng hỗ trợ vay bao nhiêu?",
    "a": "Tối đa 70% giá trị sản phẩm, thời hạn đến 25 năm, ân hạn nợ gốc 12–24 tháng và hỗ trợ lãi suất 0% trong 18 tháng."
   },
   {
    "q": "Khi nào bàn giao? Bàn giao tiêu chuẩn gì?",
    "a": "Dự kiến bàn giao Đã bàn giao 2025, hoàn thiện cơ bản nội thất liền tường, thiết bị vệ sinh và bếp cao cấp."
   },
   {
    "q": "Người nước ngoài có được mua không?",
    "a": "Người nước ngoài được sở hữu căn hộ trong hạn mức pháp luật cho phép (tối đa 30% số căn của tòa, thời hạn 50 năm, có thể gia hạn)."
   },
   {
    "q": "Phí quản lý bao nhiêu?",
    "a": "Phí quản lý dự kiến 12.000 – 18.000 đ/m²/tháng, tùy loại hình và khối tiện ích."
   },
   {
    "q": "Có cam kết cho thuê không?",
    "a": "Lợi suất cho thuê tham khảo khu vực ~6.4%/năm. Liên hệ để nhận phương án cho thuê chi tiết."
   }
  ]
 },
 {
  "id": "cam-ranh-villas",
  "name": "Coral Bay Villas",
  "area": "Nha Trang",
  "type": "Biệt thự",
  "status": "dang-mo-ban",
  "priceFrom": 15,
  "priceTo": 35,
  "beds": [
   3,
   4,
   5
  ],
  "dev": "Biển Xanh Holdings",
  "scale": "96 căn · 9 ha",
  "handover": "Q1/2028",
  "yield": 6,
  "growth": 7,
  "hot": false,
  "desc": "Biệt thự biển hồ bơi riêng, chương trình cho thuê lại.",
  "legal": "Đã có quy hoạch 1/500, giấy phép xây dựng và bảo lãnh ngân hàng. Đủ điều kiện mở bán, sở hữu lâu dài với người Việt Nam.",
  "address": "Đường bờ biển Bãi Dài, xã Cam Hải Đông, huyện Cam Lâm, Khánh Hòa",
  "video": "video.html?id=cam-ranh-villas",
  "tour": "tour.html?id=cam-ranh-villas",
  "amenities": [
   "🏊 Hồ bơi riêng từng căn",
   "🌳 Công viên và đảo xanh",
   "🚤 Bến thuyền nội khu",
   "🔒 An ninh compound 24/7",
   "🎾 Sân tennis",
   "🧒 Khu vui chơi trẻ em",
   "🍽️ Câu lạc bộ cư dân",
   "🚗 Hầm xe và lối dạo bộ"
  ],
  "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=75",
  "thumb": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=75",
  "gallery": [
   "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=900&q=75",
   "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=75"
  ],
  "overview": "Biệt thự biển hồ bơi riêng, chương trình cho thuê lại. Dự án được quy hoạch đồng bộ, hướng tới cộng đồng cư dân văn minh với hệ tiện ích chuẩn resort và kết nối thuận tiện tới các trục giao thông huyết mạch.",
  "density": "28%",
  "ownership": "Lâu dài (người Việt)",
  "contractor": "Tổng thầu xây dựng hạng A",
  "highlights": [
   {
    "title": "Tầm nhìn",
    "text": "Đa hướng, thoáng vĩnh viễn"
   },
   {
    "title": "Kết nối",
    "text": "5 phút đến trục chính"
   },
   {
    "title": "Thiết kế",
    "text": "Kiến trúc xanh, đạt chuẩn EDGE"
   },
   {
    "title": "Lợi suất",
    "text": "~6%/năm"
   }
  ],
  "connections": [
   {
    "icon": "🚇",
    "name": "Ga Metro / trục giao thông chính",
    "minutes": 5
   },
   {
    "icon": "🏫",
    "name": "Trường quốc tế",
    "minutes": 7
   },
   {
    "icon": "🏥",
    "name": "Bệnh viện đa khoa",
    "minutes": 10
   },
   {
    "icon": "🛍️",
    "name": "Trung tâm thương mại",
    "minutes": 8
   },
   {
    "icon": "🏢",
    "name": "Trung tâm hành chính Nha Trang",
    "minutes": 15
   },
   {
    "icon": "✈️",
    "name": "Sân bay",
    "minutes": 30
   }
  ],
  "amenitiesOut": [
   "🏫 Trường học các cấp",
   "🏥 Bệnh viện quốc tế",
   "🛒 Siêu thị – TTTM",
   "🌊 Công viên ven sông",
   "🏛️ Trung tâm hành chính",
   "🚌 Bến xe buýt – Metro",
   "⛳ Sân golf",
   "🏦 Ngân hàng"
  ],
  "floorplans": [
   {
    "name": "Biệt thự 3PN",
    "beds": 3,
    "area": 195,
    "baths": 2,
    "price": 15,
    "image": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=75"
   },
   {
    "name": "Biệt thự 4PN",
    "beds": 4,
    "area": 230,
    "baths": 3,
    "price": 23.5,
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=75"
   },
   {
    "name": "Biệt thự 5PN",
    "beds": 5,
    "area": 265,
    "baths": 4,
    "price": 32,
    "image": "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "priceList": [
   {
    "code": "V1",
    "type": "Biệt thự 3PN",
    "floor": 2,
    "dir": "Đông Bắc",
    "area": 198,
    "price": 15.06,
    "sold": true
   },
   {
    "code": "V2",
    "type": "Biệt thự 4PN",
    "floor": 3,
    "dir": "Bắc",
    "area": 232,
    "price": 23.93,
    "sold": false
   },
   {
    "code": "V3",
    "type": "Biệt thự 5PN",
    "floor": 2,
    "dir": "Tây Bắc",
    "area": 272,
    "price": 33.43,
    "sold": true
   },
   {
    "code": "V4",
    "type": "Biệt thự 3PN",
    "floor": 1,
    "dir": "Đông Nam",
    "area": 200,
    "price": 15.52,
    "sold": false
   },
   {
    "code": "V5",
    "type": "Biệt thự 4PN",
    "floor": 3,
    "dir": "Bắc",
    "area": 234,
    "price": 23.95,
    "sold": false
   },
   {
    "code": "V6",
    "type": "Biệt thự 5PN",
    "floor": 1,
    "dir": "Tây Nam",
    "area": 270,
    "price": 33.89,
    "sold": false
   },
   {
    "code": "V7",
    "type": "Biệt thự 3PN",
    "floor": 3,
    "dir": "Nam",
    "area": 198,
    "price": 15.47,
    "sold": false
   },
   {
    "code": "V8",
    "type": "Biệt thự 4PN",
    "floor": 1,
    "dir": "Nam",
    "area": 233,
    "price": 24.61,
    "sold": false
   },
   {
    "code": "V9",
    "type": "Biệt thự 5PN",
    "floor": 2,
    "dir": "Đông Nam",
    "area": 266,
    "price": 34.42,
    "sold": false
   },
   {
    "code": "V10",
    "type": "Biệt thự 3PN",
    "floor": 2,
    "dir": "Nam",
    "area": 199,
    "price": 16.16,
    "sold": false
   },
   {
    "code": "V11",
    "type": "Biệt thự 4PN",
    "floor": 3,
    "dir": "Đông Bắc",
    "area": 230,
    "price": 23.88,
    "sold": false
   },
   {
    "code": "V12",
    "type": "Biệt thự 5PN",
    "floor": 1,
    "dir": "Nam",
    "area": 269,
    "price": 34.49,
    "sold": false
   },
   {
    "code": "V13",
    "type": "Biệt thự 3PN",
    "floor": 1,
    "dir": "Bắc",
    "area": 197,
    "price": 15.72,
    "sold": false
   },
   {
    "code": "V14",
    "type": "Biệt thự 4PN",
    "floor": 1,
    "dir": "Đông Nam",
    "area": 235,
    "price": 24.7,
    "sold": false
   },
   {
    "code": "V15",
    "type": "Biệt thự 5PN",
    "floor": 1,
    "dir": "Bắc",
    "area": 272,
    "price": 33.29,
    "sold": true
   },
   {
    "code": "V16",
    "type": "Biệt thự 3PN",
    "floor": 2,
    "dir": "Tây Nam",
    "area": 199,
    "price": 15.55,
    "sold": false
   },
   {
    "code": "V17",
    "type": "Biệt thự 4PN",
    "floor": 1,
    "dir": "Bắc",
    "area": 232,
    "price": 24.32,
    "sold": false
   },
   {
    "code": "V18",
    "type": "Biệt thự 5PN",
    "floor": 1,
    "dir": "Đông Bắc",
    "area": 267,
    "price": 32.87,
    "sold": false
   }
  ],
  "policies": [
   {
    "value": "30%",
    "text": "Thanh toán đến khi nhận nhà"
   },
   {
    "value": "70%",
    "text": "Ngân hàng hỗ trợ vay"
   },
   {
    "value": "0%",
    "text": "Lãi suất trong 18 tháng"
   },
   {
    "value": "9%",
    "text": "Chiết khấu thanh toán sớm"
   }
  ],
  "payments": [
   {
    "step": "Ký thỏa thuận đặt cọc",
    "amount": "10%"
   },
   {
    "step": "Ký HĐMB (30 ngày)",
    "amount": "20%"
   },
   {
    "step": "Đợt 3–6 (3 tháng/đợt)",
    "amount": "5%/đợt"
   },
   {
    "step": "Nhận bàn giao",
    "amount": "25%"
   },
   {
    "step": "Nhận sổ hồng",
    "amount": "5%"
   }
  ],
  "promo": "Tặng gói nội thất 150 triệu và miễn 2 năm phí quản lý cho 20 khách đầu tiên.",
  "progress": 58,
  "progressAt": "10/2026",
  "milestones": [
   {
    "title": "Khởi công",
    "when": "Q1/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện móng & hầm",
    "when": "Q3/2025",
    "done": true,
    "image": "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Thi công phần thân",
    "when": "Q2/2026",
    "done": true,
    "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Cất nóc",
    "when": "Q4/2026",
    "done": false,
    "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=75"
   },
   {
    "title": "Hoàn thiện & bàn giao",
    "when": "Q1/2028",
    "done": false,
    "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=75"
   }
  ],
  "galleryCats": [
   "Phối cảnh",
   "Tiện ích",
   "Nhà mẫu",
   "Thực tế",
   "Phối cảnh",
   "Tiện ích"
  ],
  "loanRatio": 70,
  "loanYears": 20,
  "loanRate": 9.5,
  "faqs": [
   {
    "q": "Pháp lý dự án hiện tại thế nào?",
    "a": "Đã có quy hoạch 1/500, giấy phép xây dựng và bảo lãnh ngân hàng. Đủ điều kiện mở bán, sở hữu lâu dài với người Việt Nam. Khang Thịnh Land gửi bản tóm tắt pháp lý khi khách yêu cầu."
   },
   {
    "q": "Ngân hàng hỗ trợ vay bao nhiêu?",
    "a": "Tối đa 70% giá trị sản phẩm, thời hạn đến 25 năm, ân hạn nợ gốc 12–24 tháng và hỗ trợ lãi suất 0% trong 18 tháng."
   },
   {
    "q": "Khi nào bàn giao? Bàn giao tiêu chuẩn gì?",
    "a": "Dự kiến bàn giao Q1/2028, hoàn thiện cơ bản nội thất liền tường, thiết bị vệ sinh và bếp cao cấp."
   },
   {
    "q": "Người nước ngoài có được mua không?",
    "a": "Người nước ngoài được sở hữu căn hộ trong hạn mức pháp luật cho phép (tối đa 30% số căn của tòa, thời hạn 50 năm, có thể gia hạn)."
   },
   {
    "q": "Phí quản lý bao nhiêu?",
    "a": "Phí quản lý dự kiến 12.000 – 18.000 đ/m²/tháng, tùy loại hình và khối tiện ích."
   },
   {
    "q": "Có cam kết cho thuê không?",
    "a": "Lợi suất cho thuê tham khảo khu vực ~6%/năm. Liên hệ để nhận phương án cho thuê chi tiết."
   }
  ]
 }
];
const AREAS = [
 "Thủ Đức",
 "Quận 7",
 "Đồng Nai",
 "Bình Dương",
 "Nha Trang",
 "Long An",
 "Đà Nẵng",
 "Hà Nội"
];
const TYPES = [
 "Căn hộ",
 "Biệt thự",
 "Nhà phố",
 "Condotel",
 "Đất nền"
];
const NEWS = [
 {
  "id": "thi-truong-q3",
  "cat": "Thị trường",
  "title": "Thị trường căn hộ phía Đông: nguồn cung mới và xu hướng giá",
  "date": "28/10/2026",
  "excerpt": "Nguồn cung căn hộ phía Đông TP.HCM tăng trở lại, giá sơ cấp đi ngang và thanh khoản tập trung ở sản phẩm dưới 4 tỷ.",
  "body": "Thị trường căn hộ phía Đông, lấy trục TP. Thủ Đức làm tâm, ghi nhận nguồn cung mới quay lại sau hai quý trầm lắng. Phần lớn giỏ hàng là căn 1–2 phòng ngủ, mức giá từ 2,6 đến 4 tỷ, đúng túi tiền người mua để ở và nhà đầu tư cho thuê.\n\nGiá sơ cấp gần như đi ngang so với đầu năm. Chủ đầu tư giữ mặt bằng giá niêm yết, đổi lại giãn tiến độ thanh toán và chiết khấu thanh toán sớm. Giao dịch thứ cấp chỉ nhích ở các dự án đã có sổ hoặc sát ga Metro số 1.\n\nDiễn biến chính\n\nNguồn cung mới tập trung ven sông và dọc cao tốc Long Thành. Tỷ lệ hấp thụ tốt hơn ở căn hộ bàn giao trước 2028, pháp lý đã đủ điều kiện mở bán. Phân khúc trên 8 tỷ vẫn chậm.\n\nGóc nhìn Khang Thịnh Land\n\nNgười mua để ở nên ưu tiên dự án đã có bảo lãnh ngân hàng, cách ga Metro hoặc trục chính dưới 15 phút. Nhà đầu tư cho thuê nhìn lợi suất thực sau phí quản lý, không chỉ nhìn giá mở bán. Trong rổ phân phối hiện tại, Aurora Riverside và Metro Square là hai tên đang được hỏi nhiều nhất ở phía Đông.",
  "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=75"
 },
 {
  "id": "lai-suat-2026",
  "cat": "Tài chính",
  "title": "Lãi suất vay mua nhà cuối năm: người mua cần lưu ý gì?",
  "date": "22/10/2026",
  "excerpt": "Lãi suất vay mua nhà cuối năm giữ quanh 8–10%/năm sau ưu đãi. Người mua cần tính khoản trả gốc khi hết ân hạn.",
  "body": "Các ngân hàng liên kết với dự án đang chào gói vay 70% giá trị, ân hạn nợ gốc 12–24 tháng và lãi suất ưu đãi khoảng 0–8%/năm trong 12–18 tháng đầu. Sau ưu đãi, lãi suất thả nổi thường neo quanh 9,5–11%/năm.\n\nĐiểm dễ bỏ sót là tháng đầu tiên phải trả cả gốc lẫn lãi. Một căn 3 tỷ, vay 70% trong 20 năm, khoản trả góp đều vào khoảng 20–24 triệu đồng/tháng khi hết ưu đãi. Thu nhập hộ gia đình nên gấp đôi khoản này để còn dư địa sinh hoạt.\n\nDiễn biến chính\n\nRoom tín dụng nhà ở vẫn mở với người mua nhà đầu tiên, có thu nhập chuyển khoản ổn định. Hồ sơ tự doanh và thu nhập tiền mặt bị thẩm định chặt hơn quý trước.\n\nGóc nhìn Khang Thịnh Land\n\nHãy chạy thử số trên công cụ tính vay trước khi giữ chỗ. Chọn dự án có ngân hàng bảo lãnh và đã ký liên kết vay, để không phải chờ duyệt lại từ đầu. Nếu dòng tiền mỏng, ưu tiên căn đã bàn giao như Riva Studio hoặc Hàn River Tower thay vì giãn tiến độ dài.",
  "image": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=75"
 },
 {
  "id": "mo-ban-aurora",
  "cat": "Tin dự án",
  "title": "Aurora Riverside công bố chính sách thanh toán giãn",
  "date": "15/10/2026",
  "excerpt": "Aurora Riverside công bố thanh toán 30% đến khi nhận nhà, ngân hàng hỗ trợ 70% và chiết khấu đến 9% khi thanh toán sớm.",
  "body": "An Phú Gia Group cùng Khang Thịnh Land công bố chính sách bán hàng đợt này của Aurora Riverside, căn hộ ven sông tại TP. Thủ Đức.\n\nKhách thanh toán 30% theo tiến độ đến khi nhận nhà, phần còn lại được ngân hàng cho vay tối đa 70%, ân hạn nợ gốc và hỗ trợ lãi suất 0% trong 18 tháng. Thanh toán sớm được chiết khấu đến 9% trên giá niêm yết. Hai mươi khách đầu tiên qua Khang Thịnh Land nhận thêm gói nội thất 150 triệu và miễn 2 năm phí quản lý.\n\nDiễn biến chính\n\nGiỏ hàng mở bán gồm căn 1, 2 và 3 phòng ngủ, giá từ 2,6 đến 5,8 tỷ. Pháp lý đã có quy hoạch 1/500, giấy phép xây dựng, bảo lãnh ngân hàng và văn bản đủ điều kiện mở bán. Bàn giao dự kiến quý 4/2027.\n\nGóc nhìn Khang Thịnh Land\n\nĐây là chính sách hợp người mua cần giãn dòng tiền, không hợp người muốn vào ở trong năm nay. Nên giữ chỗ căn hướng sông trước, vì nhóm này hết sớm hơn bảng giá. Chuyên viên gửi bảng giá căn và lịch thanh toán chi tiết qua Zalo sau khi có họ tên và số điện thoại.",
  "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=75"
 },
 {
  "id": "ai-bat-dong-san",
  "cat": "Tin Khang Thịnh",
  "title": "Khang Thịnh Land ứng dụng AI vào tư vấn khách hàng",
  "date": "08/10/2026",
  "excerpt": "Khang Thịnh Land đưa trợ lý chat, quiz tìm nhà và công cụ vay vào website để khách tự lọc dự án trước khi gặp chuyên viên.",
  "body": "Từ tháng 10/2026, website Khang Thịnh Land chạy bộ công cụ tư vấn ngay trên trình duyệt: chat hỏi bằng tiếng Việt, quiz 4 câu chấm độ phù hợp, tính khoản vay và so sánh tối đa 3 dự án.\n\nTrợ lý chỉ trả lời trên dữ liệu dự án đang phân phối: giá, khu vực, số phòng, trạng thái mở bán và lợi suất cho thuê. Khi câu hỏi vượt dữ liệu, hệ thống chuyển sang để lại số điện thoại cho chuyên viên.\n\nDiễn biến chính\n\nĐội ngũ kinh doanh dùng cùng một bảng dữ liệu với website, nên báo giá trên chat và báo giá tại sàn không lệch nhau. Lead từ form, chat và trang dự án đổ về một danh sách để gọi lại trong giờ hành chính.\n\nGóc nhìn Khang Thịnh Land\n\nAI giúp khách loại phương án không vừa túi tiền trước buổi gặp. Quyết định đặt cọc vẫn do người mua và chuyên viên đối chiếu pháp lý, không giao cho phần mềm. Khách có thể thử câu “căn hộ 2 phòng ngủ dưới 3 tỷ ở Thủ Đức” ngay trên trang chủ.",
  "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=75"
 },
 {
  "id": "phap-ly-so-hong",
  "cat": "Pháp lý",
  "title": "5 bước kiểm tra pháp lý trước khi đặt cọc",
  "date": "01/10/2026",
  "excerpt": "Năm việc cần xem trước khi đặt cọc: quy hoạch, giấy phép xây dựng, bảo lãnh, điều kiện mở bán và hợp đồng mua bán.",
  "body": "Đặt cọc là lúc tiền đã ra khỏi tài khoản, nên hồ sơ pháp lý phải đọc trước, không phải sau. Khang Thịnh Land thẩm định năm nhóm giấy tờ với mọi dự án đưa vào giỏ phân phối.\n\nMột, quy hoạch 1/500 còn hiệu lực và đúng chức năng đất ở hoặc thương mại dịch vụ đúng loại sản phẩm. Hai, giấy phép xây dựng đúng tên chủ đầu tư và đúng số tầng, số căn. Ba, bảo lãnh ngân hàng nghĩa vụ bàn giao nếu là nhà ở hình thành trong tương lai. Bốn, văn bản của cơ quan có thẩm quyền xác nhận đủ điều kiện mở bán. Năm, mẫu hợp đồng mua bán nêu rõ tiến độ thanh toán, tiêu chuẩn bàn giao và thời điểm nộp hồ sơ sổ.\n\nDiễn biến chính\n\nĐất nền thì kiểm tra sổ đỏ từng nền, không chỉ giấy góp vốn. Condotel thì đọc thời hạn sở hữu, thường là 50 năm. Căn đã bàn giao thì đối chiếu sổ hồng với hiện trạng căn và phí quản lý còn nợ.\n\nGóc nhìn Khang Thịnh Land\n\nKhông đặt cọc qua cá nhân, không chuyển khoản khi chưa có phiếu giữ chỗ mang tên công ty. Bản tóm tắt pháp lý từng dự án được gửi khi khách yêu cầu, trước khi ký thỏa thuận đặt cọc.",
  "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=75"
 },
 {
  "id": "cong-dong",
  "cat": "Cộng đồng",
  "title": "Hành trình thiện nguyện \"Mái ấm Khang Thịnh\" 2026",
  "date": "20/09/2026",
  "excerpt": "Chương trình Mái ấm Khang Thịnh 2026 sửa nhà và tặng học bổng cho hộ gia đình tại Thủ Đức, Bình Dương và Đà Nẵng.",
  "body": "Tháng 9/2026, Khang Thịnh Land khép lại hành trình thiện nguyện Mái ấm Khang Thịnh. Chuyên viên, khách hàng và đối tác cùng góp công sửa ba căn nhà xuống cấp và trao học bổng cho học sinh tại Thủ Đức, Thuận An và Hải Châu.\n\nKinh phí lấy từ quỹ phúc lợi và phần đóng góp tự nguyện của giao dịch trong quý 3, không trừ vào chiết khấu bán hàng của khách. Danh sách hộ nhận hỗ trợ do hội chữ thập đỏ địa phương giới thiệu.\n\nDiễn biến chính\n\nMỗi căn được thay mái, hệ thống điện và nước sinh hoạt. Học bổng chi một năm học phí và bộ sách. Buổi bàn giao có mặt chính quyền phường để ghi nhận hiện vật.\n\nGóc nhìn Khang Thịnh Land\n\nHoạt động này nằm trong lịch thường niên, không gắn điều kiện mua nhà. Khách và đối tác muốn tham gia đợt tới đăng ký qua hotline hoặc email info@khangthinhland.com.",
  "image": "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=900&q=75"
 }
];
const JOBS = [
 {
  "id": "chuyen-vien-kinh-doanh",
  "title": "Chuyên viên Kinh doanh BĐS",
  "place": "TP.HCM",
  "qty": 20,
  "salary": "10–15 triệu + hoa hồng",
  "deadline": "30/12/2026",
  "duties": [
   "Tư vấn khách mua ở và khách đầu tư theo đúng bảng giá chủ đầu tư",
   "Dẫn khách xem nhà mẫu, gửi bảng giá và theo dõi giữ chỗ trên CRM",
   "Phối hợp tổ chức sự kiện mở bán tại sàn TP.HCM"
  ],
  "requirements": [
   "Tốt nghiệp cao đẳng trở lên, ưu tiên người đã bán bất động sản hoặc bảo hiểm",
   "Giao tiếp rõ, chịu được chỉ tiêu và đi thị trường",
   "Dùng được điện thoại, Zalo và phần mềm CRM"
  ],
  "benefits": [
   "Lương cứng 10–15 triệu cộng hoa hồng theo giao dịch",
   "Đào tạo sản phẩm, pháp lý và kỹ năng chốt trong 30 ngày đầu",
   "BHXH, thưởng nóng và xét nâng chức chuyên viên cao cấp"
  ]
 },
 {
  "id": "truong-phong-kinh-doanh",
  "title": "Trưởng phòng Kinh doanh",
  "place": "TP.HCM",
  "qty": 3,
  "salary": "25–40 triệu + thưởng",
  "deadline": "30/12/2026",
  "duties": [
   "Quản lý đội ngũ 15–25 chuyên viên, giao chỉ tiêu tuần và tháng",
   "Phụ trách một hoặc hai dự án trọng điểm, làm việc trực tiếp với chủ đầu tư",
   "Duyệt giỏ hàng, kiểm soát giá bán và chất lượng tư vấn"
  ],
  "requirements": [
   "Ít nhất 3 năm bán bất động sản, trong đó 1 năm dẫn đội nhóm",
   "Đọc được hợp đồng, tiến độ thanh toán và báo cáo doanh số",
   "Tốt nghiệp đại học, ưu tiên quản trị hoặc kinh tế"
  ],
  "benefits": [
   "Thu nhập 25–40 triệu cộng thưởng phòng khi đạt chỉ tiêu",
   "Phụ cấp điện thoại, đi lại và hoa hồng quản lý",
   "Lộ trình phó giám đốc sàn sau 18–24 tháng"
  ]
 },
 {
  "id": "chuyen-vien-marketing",
  "title": "Chuyên viên Digital Marketing",
  "place": "TP.HCM",
  "qty": 2,
  "salary": "15–22 triệu",
  "deadline": "15/12/2026",
  "duties": [
   "Chạy quảng cáo, viết bài và chăm landing page cho từng dự án",
   "Cắt lead từ website, Facebook, Zalo về CRM và đo giá mỗi liên hệ",
   "Phối hợp sàn làm tài liệu mở bán, video và thư viện ảnh"
  ],
  "requirements": [
   "1–2 năm digital marketing, biết chạy quảng cáo và đọc chỉ số",
   "Viết tiếng Việt rõ, có portfolio bài hoặc chiến dịch",
   "Tốt nghiệp cao đẳng trở lên, chuyên ngành marketing hoặc truyền thông"
  ],
  "benefits": [
   "Lương 15–22 triệu, xét lương hai lần mỗi năm",
   "Ngân sách học công cụ quảng cáo và phân tích",
   "BHXH, du lịch năm và thưởng chiến dịch mở bán"
  ]
 },
 {
  "id": "cskh",
  "title": "Chuyên viên Chăm sóc khách hàng",
  "place": "Hà Nội",
  "qty": 4,
  "salary": "10–14 triệu",
  "deadline": "15/12/2026",
  "duties": [
   "Gọi lại khách đã để lại số trong 15 phút giờ hành chính",
   "Theo dõi lịch thanh toán, nhắc hồ sơ vay và lịch bàn giao",
   "Tiếp nhận phản ánh sau bán và chuyển đúng bộ phận xử lý"
  ],
  "requirements": [
   "Giọng nói rõ, kiên nhẫn, quen làm việc theo kịch bản",
   "Ưu tiên người đã làm tổng đài, chăm sóc khách hàng hoặc hành chính sàn",
   "Sẵn sàng ca xoay tại văn phòng Hà Nội"
  ],
  "benefits": [
   "Lương 10–14 triệu, thưởng chuyên cần và thưởng hài lòng khách hàng",
   "Đào tạo sản phẩm bất động sản để trả lời đúng, không tư vấn sai giá",
   "BHXH đầy đủ và xét chuyển chuyên viên kinh doanh nếu đủ chỉ tiêu"
  ]
 },
 {
  "id": "giam-doc-san",
  "title": "Giám đốc Sàn giao dịch",
  "place": "Đà Nẵng",
  "qty": 1,
  "salary": "Thỏa thuận",
  "deadline": "31/12/2026",
  "duties": [
   "Chịu trách nhiệm doanh số, chi phí và chất lượng dịch vụ sàn Đà Nẵng",
   "Tuyển dụng, đào tạo trưởng nhóm và giữ quan hệ chủ đầu tư miền Trung",
   "Báo cáo ban giám đốc mỗi tuần về giỏ hàng, tồn và lead"
  ],
  "requirements": [
   "Từng điều hành sàn hoặc khối kinh doanh từ 30 người",
   "Có quan hệ dự án miền Trung là lợi thế",
   "Tốt nghiệp đại học, chấp nhận thu nhập thỏa thuận theo lợi nhuận sàn"
  ],
  "benefits": [
   "Thu nhập thỏa thuận, gồm lương, thưởng lợi nhuận và hoa hồng quản lý",
   "Quyền đề xuất giỏ hàng và nhân sự chủ chốt",
   "Xe công tác, BHXH và gói phúc lợi cấp giám đốc"
  ]
 }
];
const TEAM = [
 {
  "name": "Nguyễn Minh Khang",
  "role": "Chủ tịch HĐQT",
  "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=75"
 },
 {
  "name": "Trần Thu Hà",
  "role": "Tổng Giám đốc",
  "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=75"
 },
 {
  "name": "Lê Quốc Huy",
  "role": "Giám đốc Kinh doanh",
  "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=75"
 },
 {
  "name": "Phạm Ngọc Lan",
  "role": "Giám đốc Marketing",
  "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=75"
 }
];
const FAQ = [
 {
  "k": [
   "pháp lý",
   "sổ",
   "sổ hồng",
   "giấy tờ"
  ],
  "a": "Tất cả dự án Khang Thịnh Land phân phối đều được thẩm định pháp lý (giấy phép xây dựng, bảo lãnh ngân hàng, đủ điều kiện mở bán). Bạn có thể yêu cầu bộ hồ sơ pháp lý chi tiết từng dự án."
 },
 {
  "k": [
   "vay",
   "ngân hàng",
   "lãi suất",
   "trả góp"
  ],
  "a": "Hầu hết dự án hỗ trợ vay tới 70% giá trị, ân hạn nợ gốc 12–24 tháng. Bạn có thể thử <a href=\"cong-cu-tai-chinh.html\">Công cụ tính vay & ROI</a>."
 },
 {
  "k": [
   "phí",
   "hoa hồng",
   "mất phí"
  ],
  "a": "Khách mua nhà KHÔNG mất phí tư vấn. Giá bán đúng bảng giá chủ đầu tư, kèm ưu đãi riêng của Khang Thịnh Land."
 },
 {
  "k": [
   "địa chỉ",
   "văn phòng",
   "ở đâu"
  ],
  "a": "Văn phòng: Tầng 10, Tòa nhà Khang Thịnh, TP. Thủ Đức, TP.HCM. Hotline 0900 000 000. Giờ làm việc 8:00–20:00, từ thứ Hai đến Chủ nhật."
 },
 {
  "k": [
   "tuyển dụng",
   "việc làm",
   "ứng tuyển"
  ],
  "a": "Chúng tôi đang tuyển nhiều vị trí, xem tại <a href=\"tuyen-dung.html\">trang Tuyển dụng</a>."
 },
 {
  "k": [
   "đặt cọc",
   "giữ chỗ",
   "booking"
  ],
  "a": "Bạn có thể giữ chỗ (booking) hoàn tiền 100% nếu không chọn được căn. Để lại tên và SĐT, chuyên viên sẽ gửi quy trình chi tiết."
 }
];
const SITE = {
 "siteName": "Khang Thịnh Land",
 "company": "CÔNG TY CP KHANG THỊNH LAND",
 "hotline": "0900 000 000",
 "email": "info@khangthinhland.com",
 "address": "Tầng 10, Tòa nhà Khang Thịnh, TP. Thủ Đức, TP.HCM",
 "hours": "8:00 – 20:00, T2 – CN",
 "zalo": "https://zalo.me/0900000000",
 "mapQuery": "Thu Duc, Ho Chi Minh",
 "stats": [
  {
   "n": 12,
   "label": "Năm kinh nghiệm"
  },
  {
   "n": 45,
   "label": "Dự án phân phối"
  },
  {
   "n": 18500,
   "label": "Khách hàng"
  },
  {
   "n": 1200,
   "label": "Chuyên viên"
  }
 ],
 "hotlineTel": "0900000000"
};
const ABOUT = {
 "title": "Về Khang Thịnh Land",
 "lead": "Nhà phân phối bất động sản chuyên nghiệp, ứng dụng công nghệ & AI vào mọi điểm chạm khách hàng.",
 "historyTitle": "Hơn một thập kỷ kiến tạo giá trị",
 "history": [
  {
   "year": "2014",
   "text": "Thành lập tại TP.HCM với 20 chuyên viên."
  },
  {
   "year": "2017",
   "text": "Trở thành đại lý F1 của nhiều chủ đầu tư lớn."
  },
  {
   "year": "2020",
   "text": "Mở chi nhánh Hà Nội, Đà Nẵng; vượt 10.000 khách hàng."
  },
  {
   "year": "2024",
   "text": "Ra mắt nền tảng CRM & dữ liệu khách hàng."
  },
  {
   "year": "2026",
   "text": "Ứng dụng AI thực chiến: trợ lý chat, tư vấn tìm nhà, phân tích đầu tư."
  }
 ],
 "image": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=75",
 "vision": "Trở thành nhà phân phối BĐS ứng dụng công nghệ hàng đầu Việt Nam đến 2030.",
 "mission": "Giúp mỗi khách hàng ra quyết định an cư & đầu tư đúng đắn, minh bạch, dựa trên dữ liệu.",
 "values": "Chính trực · Chuyên nghiệp · Tận tâm · Đổi mới."
};
window.SITE = SITE;
window.ABOUT = ABOUT;
if (window.AI_CONFIG) { window.AI_CONFIG.hotline = SITE.hotline; window.AI_CONFIG.zalo = SITE.zalo; }
