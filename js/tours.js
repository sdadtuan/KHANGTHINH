/* Phòng tham quan dùng chung cho video tour và tour 360° */
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
