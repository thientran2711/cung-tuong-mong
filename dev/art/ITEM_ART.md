# TRANH VẬT PHẨM (ngoài trang phục)

Luật sếp (OWNER_DECISIONS #44): mọi vật phẩm đều có tranh vẽ (gpt-2-6), kể cả tác phẩm tự tay làm khi học, tự luyện; mỗi bậc vẽ khác nhau (bậc thấp vụng, đơn sơ → bậc cao tinh xảo, quý giá). Khung + nền màu theo phẩm cấp do kit (`kitItem`) vẽ; ở đây chỉ có ảnh trong suốt và phẩm cấp.
Trang phục (trâm cài, y phục: `WD_ITEMS`, `img/wd-*.webp`, j92) do thợ khác làm, không nằm trong bảng này.

## Tệp
- `img/item-<khóa>.webp` 256x256, nền trong suốt; `img/item512/item-<khóa>.webp` 512x512.
- Tác phẩm: `img/item-tp-<kiểu>-b<bậc>.webp`, bậc 1..4 = Thường / Khá / Tinh xảo / Tuyệt phẩm (j83 `WTIER`; `wk.ti` = bậc − 1).
- Dữ liệu JS: `dev/build/j98.js` → `itemArt(key, tier)` trả `{key, src, src512, grade, gradeName}`; nhận khóa IT, `("theu", 3)`, `"tp-theu"` hoặc nguyên mục rương `{k:"tp", wk:{kind, ti}}`. j98 cũng trỏ `ITIMG` (biểu tượng nhỏ cũ `iic`) sang ảnh mới.
- Phẩm cấp (grade): 0 Thường · 1 Tinh phẩm · 2 Trân phẩm · 3 Tuyệt phẩm · 4 Ngự tứ (cùng thang `WD_GRADE` j92).
- Phong cách: guofeng bán tả thực, gần 3D, ánh sáng mềm, cùng lối vẽ biểu tượng trâm cài `img/wd-*` (style ref: wd-tram-maudon). Không có người, không tay.

## 1. Vật phẩm định sẵn (j8 `IT` 26 món + j67 3 món + j70 Ngọc dung cao) — 30 món, + 1 vật chứng
(ITEMS.md ghi 33 món; đếm lại trong mã chỉ có 30 khóa IT, không kể `tp`.)
| Khóa | Tên | Nhóm | Phẩm cấp | Tranh |
|---|---|---|---|---|
| tramngoc | Trâm ngọc bích | Trang sức (IT) | Thường | trâm bạc đầu hoa ngọc bích |
| boodieu | Bộ diêu vàng | Trang sức | Trân phẩm | bộ diêu vàng đầu phượng, chuỗi ngọc trai rủ |
| tramphuong | Trâm phượng cửu vĩ | Trang sức | Tuyệt phẩm | trâm phượng chín đuôi, hồng ngọc, lam phỉ thúy |
| vongngoc | Vòng ngọc Hòa Điền | Trang sức | Tinh phẩm | vòng ngọc trắng mỡ cừu |
| vongvang | Vòng vàng chạm phượng | Trang sức | Trân phẩm | vòng vàng chạm phượng |
| sonphan | Son phấn Dương Châu | Son phấn | Thường | hộp son sứ phấn thái mở nắp |
| luahang | Lụa Hàng Châu | Vải vóc | Thường | cây lụa hồng nhạt |
| gamto | Gấm Tô Châu | Vải vóc | Trân phẩm | cây gấm đỏ hoa mẫu đơn vàng |
| gamvang | Gấm minh hoàng | Vải vóc | Tuyệt phẩm | cây gấm vàng long phượng |
| nhansam | Nhân sâm trăm năm | Thuốc bổ | Tinh phẩm | củ sâm trong hộp gấm |
| yensao | Yến sào | Thuốc bổ | Tinh phẩm | tổ yến trên đĩa men ngọc |
| agiao | A giao | Thuốc bổ | Tinh phẩm | khối a giao trên giấy đỏ |
| giaidoc | Thuốc giải độc | Thuốc | Tinh phẩm | bình ngọc trắng + đĩa thuốc viên |
| thuocanthai | Thuốc an thai | Thuốc | Thường | thang thuốc gói giấy + ấm sắc |
| ngocdungcao | Ngọc dung cao | Thuốc (j70, Mệnh truyện trân phẩm) | Tuyệt phẩm | hũ ngọc cao trắng ngà + thìa ngọc |
| huongtram | Hương trầm | Hương liệu | Thường | lư đồng, khói hương, mảnh trầm |
| tuithom | Túi thơm thêu | Hương liệu | Thường | túi thơm gấm đỏ, tua |
| xahuong | Xạ hương | Hương liệu (cấm) | Tinh phẩm | túi xạ trong hộp sơn mài đen |
| hacdinh | Hạc đỉnh hồng | Độc dược | Trân phẩm | lọ sứ đỏ son vẽ hạc, nút sáp đen |
| botngua | Bột ngứa | Độc dược | Thường | gói giấy rơi bột vàng |
| docngam | Độc ngấm dần | Độc dược (jpoison) | Tinh phẩm | lọ sứ men ngọc nút sáp, dây chàm, gói bột xám |
| phanhuy | Phấn hủy nhan | Độc dược (jpoison) | Tinh phẩm | hộp phấn men hồng mở nắp, phấn ánh tím, bông phấn |
| meduoc | Mê dược | Độc dược (jpoison) | Thường | gói giấy đỏ nâu buộc dây, bột trắng, chén rượu sứ |
| kimbac | Kim bạc thử độc | Tạp vật (jpoison) | Thường | kim bạc dài trong hộp gấm đỏ lót lụa |
| tranhco | Tranh cổ | Lễ vật | Trân phẩm | trục tranh sơn thủy cổ |
| nghien | Nghiên mực Đoan Khê | Lễ vật | Tinh phẩm | nghiên chạm rồng, thỏi mực, bút |
| dancoc | Đàn cổ Tiêu Vĩ | Lễ vật | Trân phẩm | đàn cổ cầm sơn mài, đuôi cháy sém |
| demgam | Đệm gấm | Lễ vật | Thường | đệm gấm thêu mẫu đơn, tua góc |
| vangbac | Rương vàng bạc châu báu | Mệnh truyện (family) | Trân phẩm | rương sơn son đầy nén vàng bạc, ngọc |
| ngocboi | Ngọc bội ngự ban | Kỷ vật | **Ngự tứ** | ngọc bội rồng, dây tua vàng minh hoàng |
| bienvang | Biển vàng tạ ơn | Mệnh truyện (family) | Trân phẩm | biển gỗ thếp vàng, nơ lụa đỏ |
| bienngu | Biển ngự bút «Trung hiếu lưỡng toàn» | Mệnh truyện (family) | **Ngự tứ** | biển sơn đen viền rồng vàng, khăn đỏ |
| thunha | Thư nhà | Thư từ | Thường | phong thư buộc dây, hoa khô |
| chungcu | Tập chứng cứ | Thư từ | Thường | xấp giấy tờ, sổ, dấu điểm chỉ đỏ |
| hinhnhan | Hình nhân bùa ngải (vật chứng giá họa j7/j8/j42/j70, chưa là món IT) | Vật chứng | Thường | hình nhân vải cắm kim, bùa vàng |

## 2. Tác phẩm tự tay (j83 `IT.tp`, `WK`) — 11 kiểu × 4 bậc = 44 tranh
Phẩm cấp = bậc: b1 Thường · b2 Tinh phẩm · b3 Trân phẩm · b4 Tuyệt phẩm.
| Kiểu | Tên | b1 (Thường, vụng) | b2 (Khá) | b3 (Tinh xảo) | b4 (Tuyệt phẩm) |
|---|---|---|---|---|---|
| theu | Khăn thêu | khăn vải thô, vài mũi hoa vụng | khăn lụa thêu đôi uyên ương nhỏ | khăn lụa Hàng Châu thêu mẫu đơn kim tuyến trên khung tròn | tranh thêu hai mặt mẫu đơn + uyên ương, bình phong gỗ hồng mộc khảm ngọc |
| tranh | Bức tranh | giấy thô, cành mai vẽ vụng | trục giấy Tuyên vẽ lan | trục sơn thủy xanh lục, viền gấm, trục ngọc | quyển tranh song hạc tùng trên lụa, nhiều ấn son, hộp sơn mài |
| bhoa | Bình hoa | hũ đất vài bông dại | bình men ngọc cúc vàng | bình hoa lam mai + lan, đế gỗ | bình ngọc trắng chạm, mẫu đơn + mộc lan, đế sơn son thếp vàng |
| tho | Bức thư pháp | giấy thô, chữ vụng, vết mực | giấy hoa tiên, chữ ngay ngắn, một ấn | trục giấy nhũ vàng, hai ấn son | thơ trên lụa viền vàng, nhiều ấn son, khung gỗ đàn hương đỏ |
| kinh | Quyển kinh chép tay | tập giấy thường khâu dây | tập kinh bìa chàm | kinh gấp giấy nhũ vàng, bìa gấm | quyển kinh chữ vàng trên giấy chàm, tranh sen vàng, hộp đàn hương |
| khuc | Khúc đàn tự phổ | tờ giấy nhàu, giản tự phổ viết vụng, gạch xóa | tập phổ khâu chỉ, cuộn dây tơ | tập phổ giấy nhũ vàng bìa gấm, nhạn đàn ngọc | phổ trên lụa có ấn son đặt trên cây cổ cầm |
| the | Thế cờ tàn | giấy vẽ bàn cờ, quân khoanh mực | bàn cờ gỗ mộc | bàn cờ gỗ chân thấp, hộp quân gỗ | bàn cờ ngọc bích kẻ vàng, quân ngọc trắng + hắc diện |
| mua | Điệu múa | giấy vẽ bước chân + quạt giấy | tập bước múa + quạt lụa hồng | tập bìa lụa + đôi quạt vẽ + dải lụa | trục lụa bước múa, quạt lông vũ nan vàng, dải lụa ngũ sắc |
| ao | Áo múa tự may | áo vải mộc gấp, đường may lệch | áo lụa nhạt gấp, viền thêu | áo the nhiều lớp tay áo, viền mây | Nghê thường vũ y lụa óng, kim tuyến, ngọc trai, trên giá gỗ chạm |
| mon | Món | bát đất canh rau | bát sứ canh gà táo đỏ, sâm | thố men ngọc yến chưng, khay sơn | thố phấn thái viền vàng, yến + sâm, khay sơn son, thìa vàng, đĩa nhỏ |
| huong | Túi hương | túi vải mộc buộc dây | túi lụa thêu hoa, tua đỏ | túi gấm hình hồ lô, kim tuyến, hạt ngọc | quả cầu hương bạc mạ vàng chạm thủng, lam phỉ thúy, ngọc trai + hộp ngọc trầm |

## Ghi chú
- 22 ảnh cũ (128x128, tên cũ `item-a-giao.webp`…) vẫn để nguyên trong img/ cho bản cũ; mã mới dùng ảnh theo khóa IT (j98 trỏ `ITIMG[k]=k`). Vẽ lại hết để cùng phong cách, cùng cỡ 256/512 (ảnh cũ chỉ 128, `chungcu` đang mượn ảnh hình nhân, 11 món mượn ảnh món khác).
- Khi thêm món IT mới: thêm khóa + phẩm cấp vào `ITEM_ART_G` (j98) và bảng trên, vẽ cùng quy trình (dev/art/PROGRESS_items.md).

## 3. Stipend / gift goods (review/econ-stipend, 15/11) — 16 items, one 4x4 gpt-2-6 sheet (Magnific XmP3moABfo, bg lJ8aJscgv9, style ref If67SFwtvE)
| Key | Name | Grade |
|---|---|---|
| vaibong | Vải bông | Thường |
| vaitho | Vải thô (hàng kém) | Thường |
| tragoi | Trà Long Tĩnh | Thường |
| trahop | Trà Quân Sơn ngân châm | Tinh phẩm |
| tramoc | Trà mốc (hàng kém) | Thường |
| thanbac | Than bạc sương | Thường |
| thanden | Than đen (hàng kém) | Thường |
| banhtrai | Hộp điểm tâm | Thường |
| ruoucuc | Rượu hoa cúc | Thường |
| aolong | Áo lông chồn tiến cống | Trân phẩm |
| cocngoc | Bộ cờ ngọc | Trân phẩm |
| guong | Gương Tây dương | Tinh phẩm |
| thamba | Thảm Ba Tư | Trân phẩm |
| cungbac | Cung bạc chạm rồng | Tinh phẩm |
| traicay | Giỏ trái cây tiến cống | Thường |
| lanquy | Chậu lan quý | Tinh phẩm |
Cut: connected components assigned to cells by centroid, 88 % fill, 512 + 256 webp, checked on cream and red. On the CDN (cdn_sync).

## 4. Story items in events (review/item-events, 15/11, KIT §64) — gpt-2-6 sheets TdS42S9VNR (4x2) + N2Fr48P6D9 (1x2), style ref If67SFwtvE, Magnific bg removal, cut 88 %
| Key | Name | Grade |
|---|---|---|
| thu | Bức thư | Thường |
| matthu | Mật thư | Tinh phẩm |
| giaymat | Mảnh giấy nhắn | Thường |
| tinvat | Tín vật | Tinh phẩm |
| khantay | Khăn tay lụa | Thường |
| chenthuoc | Chén thuốc | Thường |
| batcanh | Bát canh | Thường |
| lenhbai | Lệnh bài | Tinh phẩm |
| sachchep | Tập sách chép tay | Thường |
| canhhoa | Cành hoa ép | Thường |
(hinhnhan already had its picture; it is now an IT item too.) On the CDN (cdn_sync), checked on cream and red.

## 5. Girlhood chest (review/outside-r2-r1, OWNER #8 15/11 20:05Z) — gpt-2-6 single icons, style ref If67SFwtvE, Magnific bg removal, cut 88 %
| Key | Name | Slot | Grade |
|---|---|---|---|
| ngocboikc | Ngọc bội khuê các (white jade lotus disc, pink cord + tassel) | Đeo eo | Thường |
| vongbackc | Vòng bạc hoa mai (pair of plain silver bangles, plum blossoms) | Đeo tay | Thường |
Defined in dev/build/jkc.js (IT + ITEM_ART_G). On the CDN (cdn_sync), checked on cream and red. With Trâm ngọc bích, a Thường garment and Túi thơm thêu they fill her slots at the start of the home road; the set stays inside a Đáp ứng's luxury allowance.

## 6. Summer ice (review/econ-items, 16/11) — gpt-2-6 (Magnific w4hkDcy7EI, EbzB4JRuuO; style ref If67SFwtvE), Magnific bg removal, cut 88 %
| Key | Name | Grade |
|---|---|---|
| bangda | Băng đá (block of ice in a lacquered ice basin) | Thường |
| bangvun | Băng vụn (hàng kém: melting shards in a clay basin) | Thường |
256 + 512 webp on the CDN (cdn_sync), checked on cream and red. (jkc's ngocboikc / vongbackc, §5 above, are reused by the palace-road girlhood chest.)
