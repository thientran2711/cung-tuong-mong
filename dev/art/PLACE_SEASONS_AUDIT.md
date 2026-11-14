# Kiểm kê tranh nơi chốn: 4 mùa × 4 buổi (review/place-seasons, gốc origin/review/page-curl fea7d050)

Cách kiểm: grep mã dev/build/j*.js (SCIMG j6/j21, SCN_VAR j94, KIT_BD jbd, mapImg j26/j31, placeOf j42) + liệt kê img/ của nhánh gốc,
origin/main, origin/review/places, origin/review/residence-art, và toàn bộ lịch sử git (`git log --all -- '*ngu-phong*' …`).
Mùa: xuan/ha/thu/dong. Buổi: sang/trua/chieu/toi. Lưới 16 = img/<tên>-<mùa>-<buổi>.webp.

## Sân khấu nơi chốn (SCIMG → j94 SCN_VAR): đủ 16/16, không vẽ lại
| Mã sc | Nơi trong game | Ảnh | Có |
|---|---|---|---|
| vuon | Ngự hoa viên | ngu-hoa-vien | 16/16 |
| thu | Ngự thư phòng | ngu-thu-phong | 16/16 |
| dtd | Dưỡng Tâm điện / Dưỡng Hòa điện | duong-tam-dien | 16/16 |
| tn | Từ Ninh / Đức Thọ cung (Thái hậu) | tu-ninh-cung | 16/16 |
| kn | Khôn Ninh / Càn Ninh cung (Hoàng hậu) | khon-ninh-cung | 16/16 |
| rv | cung các phi tần khác | phi-tan-cung | 16/16 |
| tyv | Thái y viện | thai-y-vien | 16/16 |
| ksp | Kính sự phòng | kinh-su-phong | 16/16 |
| lc | Lãnh cung | lanh-cung | 16/16 |
| home | Ngọc Thanh các (tẩm cung người chơi, j27 HOMEN) **và** "Phòng cung nữ" (j42, người chơi xuất thân cung nữ, cùng sc:"home") | tam-cung-dem | 16/16 |

Ô nơi chốn trên bản đồ (j9 tile) đọc SCIMG đã qua j94, nên cũng theo mùa/buổi.

## Dư đồ (bản đồ, j26 mapImg = img/map-<mùa>-<buổi>.webp)
| | sáng | trưa | chiều | tối |
|---|---|---|---|---|
| xuân | có | **THIẾU → đã vẽ** | có | có |
| hạ | có | **THIẾU → đã vẽ** | có | có |
| thu | có | **THIẾU → đã vẽ** | có | có |
| đông | có | **THIẾU → đã vẽ** | có | có |
Bản dự phòng không mùa map-sang/chieu/toi (= bản Hạ); thêm map-trua (= map-ha-trua) cho đủ.
Mã: j26 BUK chỉ có 3 buổi → khi game có 4 buổi (jtime4 chèn "Buổi trưa"), j94 chèn "trua" vào BUK (không chèn trùng); ngày hội không có tranh trưa lấy tranh hội buổi sáng/chiều.

## Không thuộc phạm vi / không có trên nhánh gốc
- map-fest-*: tranh ngày hội một lần, bỏ qua theo lệnh.
- KIT_BD night (tam-cung-dem-p / tam-cung-dem): phông hộp thoại đêm thị tẩm, luôn là đêm; một cặp dọc/ngang của kit (jbd). Không phải sân khấu nơi chốn; nếu muốn theo mùa phải qua chủ kit.
- **Ngự phòng (img/ngu-phong-<mùa>)**: KHÔNG có trên page-curl, main, review/places, review/residence-art, cũng không có trong lịch sử git. Không có gì để bổ sung trên nhánh này; nếu có ở nhánh khác chưa đẩy thì cần đường dẫn.
- Dãy nhà cung nhân (day-nha-cung-nhan): chỉ ở review/places (chưa duyệt) → không đụng.
- Tranh dinh thự mới (review/residence-art): không đụng.
- Nền minigame (img/kit/mg-*-bg, -bg-hoc), phông xuất thân/đầu thai/bục vinh danh: không phải nơi chốn.

## Kết quả
Thiếu duy nhất: Dư đồ buổi trưa × 4 mùa = 4 ảnh. Đã vẽ 4 (gpt-2-6 EDIT từ bản SÁNG cùng mùa), 160 tín dụng.
