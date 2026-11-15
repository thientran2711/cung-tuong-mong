# Soát nốt ruồi toàn bộ tranh người (origin/main @ 614b00ec5)

Luật: dev/OWNER_DECISIONS.md, dòng 7 ("No facial moles on anyone"). Đây chỉ là bản soát: không sửa, không vẽ ảnh nào.

## Phạm vi và cách làm
- Đã soát **5169 chân dung `img/por-*.webp`**: 5156 tệp có tên trong FIGURES.json, FIGURES-servants.json, FIGURES-kids.json và FIGURES-others.json, cộng 13 tệp por cũ không còn trong manifest (official-1..4, physician-a30/a55, thaihau-1..3, player-look1..4-t3-a18).
  Gồm: phi tần (32 người × t1–t8, tm0–tm4, tcold × 4 tuổi), cung nữ (52 × 14 bậc × 4 tuổi), ma ma, thái giám, Hoàng thượng, Thái hậu, quan, thái y, nam nhân, hoàng tử/công chúa và người chơi.
- Bước 1, nhìn bằng mắt: cắt vùng mặt từng por (x 115–270, y 140–320), ghép thành 65 tờ lưới, mỗi tờ 80 mặt cỡ ~155×180, và xem hết cả 65 tờ.
- Bước 2, dò tự động: tìm chấm tối nhỏ (2–40 px) tương phản cao so với nền da quanh nó, có vành da sạch. Loại vùng mắt, mũi và miệng, loại hoa điền ở giữa trán của phi tần t1–t8, loại môi/cằm và đường quai hàm. Tiêm nốt ruồi giả vào ảnh thật thì bộ dò bắt được khoảng 66%. Các chấm nghi vấn còn lại được xem ở cỡ cận ×3 (khoảng 800 ô).
- Bước 3, xem kỹ: mỗi người nghi vấn được xem cả nhóm 4 tuổi ở cỡ ×2, rồi xem từng ca ở cỡ ×3 có lưới toạ độ.
- fig-*: đã đối chiếu mẫu fig-consort-c17-t3-a26 và fig-consort-c23-t2-a26. Nốt ruồi có y hệt trên fig, vì por được cắt từ fig bằng porcrop. Vì vậy **mỗi por trong danh sách dưới kéo theo fig cùng tên** (`img/fig-<tên>.webp`) cũng phải sửa.

Toạ độ ghi theo pixel của por (384×506). "Trái/phải" là trái/phải **của ảnh**, không phải của nhân vật.

## Kết quả: 40 ảnh có nốt ruồi rõ, 9 ảnh có chấm mờ

### Phi tần: 27 ảnh rõ
| Tệp (img/por-… và img/fig-…) | Vị trí trên mặt | toạ độ por |
|---|---|---|
| consort-c01-tm0-a18, -a26, -a36 | má trái, ngay dưới đuôi mắt | ~149,223 |
| consort-c04-tm0-a18, -a26 | trán, giữa hai lông mày | 196,173 |
| consort-c07-tm0-a18 | trán (chấm nhạt) | 187,173 |
| consort-c07-tm2-a18 | trán, 2 chấm | 190,172 và 200,175 |
| consort-c08-tm2-a18 | trán, cùng một chấm nhỏ ở má trái | 194,181 và 156,249 |
| consort-c08-tm2-a26 | trán, cùng má trái | 198,181 và 156,249 |
| consort-c08-tm2-a36 | má trái, gần khoé miệng | 160,246 |
| consort-c08-tm3-a26 | trán, sát chân tóc | 195,163 |
| consort-c08-tm4-a36 | má trái, gần khoé miệng | 160,248 |
| consort-c08-tcold-a18 | trán (nhạt) | 192,181 |
| consort-c09-t2-a26, -a36 | má trái dưới mắt, 2–3 chấm | 154–158,225 |
| consort-c09-t5-a18, -a26 | má trái dưới mắt | 145,217 |
| consort-c17-t2-a26 | má trái dưới mắt | 156,222 |
| consort-c17-t3-a18, -a26 | má trái dưới mắt (đậm) | 144–154,216–225 |
| consort-c17-tm2-a18, -a26, -a36 | má trái dưới mắt (nhỏ) | 152,223 |
| consort-c23-t2-a26 | má trái (đậm) | 154,235 |
| consort-c23-t8-a51 | má trái dưới mắt | 150,218 |
| consort-c23-tm4-a51 | má trái, cùng một chấm nhỏ trên trán | 148,226 và 189,180 |
| consort-c28-t2-a26 | má trái dưới mắt (đậm) | 154,219 |

### Cung nữ: 9 ảnh rõ
| Tệp | Vị trí | toạ độ por |
|---|---|---|
| maid-m26-t1-a26 | má trái | 154,232 |
| maid-m26-t3-a18 | má trái dưới mắt | 151,219 |
| maid-m39-tm3-a26 | má trái | 159,230 |
| maid-m39-tm4-a18 | trán, giữa hai lông mày | 189,178 |
| maid-m52-t1-a26, -a36, -a51 | má phải, cạnh tai (đốm nâu) | ~228–232,231–240 |
| maid-m52-t2-a51 | má phải, cạnh tai | 231,238 |

### Hoàng tử/công chúa: 3 ảnh rõ
| Tệp | Vị trí | toạ độ por |
|---|---|---|
| kid-f09-a14 | trán | 190,169 |
| kid-f09-a20 | trán | 189,174 |
| kid-p14-a9 | trán, trên lông mày trái | 185,182 |

### Thái hậu: 1 ảnh
- thaihau-h3-a51: chấm nhỏ ở trán, giữa hai lông mày, khoảng 188,172.

### Chấm mờ, nên làm mịn cùng lô sửa (ở cỡ thường gần như không thấy): 9 ảnh
- maid-m52-t2-a26, -a36: má phải cạnh tai, cùng chỗ với m52-t1.
- maid-m26-tm2-a36: má trái (153,231). maid-m39-tm4-a26: trán (189,178).
- kid-f11-a14 (trán 189,165), kid-f12-a20 (trán), kid-f24-a4 (trán 186,168).
- thaihau-h1-a51: trán (~188,170).
- consort-c24-tm0…tm4 và tcold, tuổi a36/a51: chấm rất nhạt ở má trái (162,253), gần như nếp da. Ghi lại để biết, không bắt buộc sửa.

### Nhóm sạch (không còn nốt ruồi)
Hoàng thượng, ma ma (k01–k08), thái giám (u01–u30, kể cả u22 đã sửa), quan (o1–o6 và official-1..4), thái y, nam nhân (hoạ sư, nhạc sư, sứ thần, thái y, thị vệ, vương gia), người chơi (look1–4).
Phi tần sạch: c02 c03 c05 c06 c10–c16 c18–c22 c25–c27 c29–c32, cùng các bậc khác của những người nêu trên.
Cung nữ sạch: mọi người trừ m26, m39, m52.
Các ca cũ đã sửa xong nay sạch: c15-t3 (cả 4 tuổi), c17-tm0-a51, c28-tm3-a26, c28-tm2-a51, c07-tm4-a18, m13-tm0/tm4-a51, m39-tm0-a51, m52-tm2/tm4-a51.

## Lỗi khác thấy khi soát (không phải nốt ruồi)
- `img/por-kid-p14-a4.webp` bị cắt hỏng: chỉ thấy một con mắt phóng to (porcrop nhận nhầm khuôn mặt). Cần cắt lại.

## Ảnh cận mẫu (dev/shots/mole-audit/)
- consort-1.jpg: c17-t3-a26, c23-t2-a26, c28-t2-a26, c09-t2-a36 (khoanh xanh).
- consort-2.jpg: c01-tm0-a18, c08-tm2-a18, c04-tm0-a18, c23-t8-a51.
- maid-kid.jpg: m26-t1-a26, m39-tm3-a26, m52-t1-a51, kid-f09-a14, kid-p14-a9.
- fig-consort-c17-t3-a26.jpg, fig-consort-c23-t2-a26.jpg: cho thấy fig cũng mang đúng nốt ruồi đó.

## Gợi ý cho lô sửa
Phần lớn là chấm đơn nhỏ trên nền da sạch, nên tẩy cục bộ trên fig 900px (dev/figwork/moles.py fix / fixspots.py) rồi cắt lại por bằng porcrop.py là đủ. Ba ca đậm (c17-t3, c23-t2, c28-t2) nên kiểm lại sau khi tẩy.
