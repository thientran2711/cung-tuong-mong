# pl-courtyards report (Dư đồ level-2 courtyards from Phượng Lệnh, grade "nhat")

Source: phuong-lenh-art @ a9becbe, places/palace/nhat/x/L2/<dir>/<state>.webp -> 1792 px webp q80 -> CDN img/pl2/nhat-<dir>-<state>.webp (same host as existing pl2 files, uploaded with dev/site/cdn_sync.py). Hotspots: img/pl2/hotspots.json (also inlined in dev/build/jpm.js).

## 1. Inventory (every Dư đồ place in our game)
| Our place | PL nhat dir | States in PL | Imported before | Imported now |
|---|---|---|---|---|
| Palaces by chủ vị rank: Tần (3) | cac | 28 | 28 | 28 |
| Phi (4) | phi-cung | 28 | 28 | 28 |
| Quý phi (5) | quy-cung | 28 | 28 | 28 |
| Hoàng quý phi (6) | vinh-hoa | 28 | 28 | 28 |
| Hoàng hậu / Càn Ninh (7) | can-ninh | 28 | 28 | 28 |
| Empty palace | spare-cung | 17 | 17 | 17 |
| Ngọc Thanh các (home) | cac | 28 | 28 | 28 |
| Dưỡng Hòa điện (dtd) | duong-hoa | 28 | 28 | 28 |
| Đức Thọ cung (tn) | duc-tho | 28 | 28 | 28 |
| Trường Môn viện / Lãnh cung (lc) | truong-mon | 17 | 17 | 17 |
| Ngự hoa viên (vuon) | garden | 27 | 27 | 27 |
| Kính sự phòng (ksp) | noi-thi | 17 | 17 | 17 |
| **Cần Chính điện (thu)** | can-chinh | 24 | 0 | **24 (new)** |
| **Nội vụ phủ (nvp)** | noi-vu | 17 | 0 | **17 (new)** |
| Thái y viện (tyv) | none in the palace tree | - | - | no courtyard (keeps the plain Dư đồ picture) |

Verified against the CDN index: all 11 earlier dirs were already complete (every PL state present). Added 41 files (14.4 MB). All 315 pl2 URLs return 200/206.
"Đông cung": not a Dư đồ place in our game (only the word for the crown-prince seat), nothing to import.
New places get one tap area (Cần Chính điện / Nội vụ phủ), like the other single-hall places (garden, noi-thi...); the palaces keep Chính điện / Đông / Tây.
Code: jpm.js KPM_DATA.places gets thu + nvp; kpmArt now also uses the same festival state as the Dư đồ map (f.files), so Đoan ngọ and Trùng cửu use the noon picture for sáng and chiều like the map does.

## 2. Festival calendar (festToday / FEST) -> PL keys
Game keys: newyear, nguyentieu, thanhminh, doanngo, phoenix, thattich, trungthu, trungcuu, dongchi, giaothua, vulan, vantho, lapbat, thanhtho.
| Game festival | PL key | PL has it for |
|---|---|---|
| newyear | newyear x4 buổi | cac, can-chinh, can-ninh, duc-tho, duong-hoa, garden, phi-cung, quy-cung, vinh-hoa (4 buổi); noi-thi, spare-cung, truong-mon, noi-vu (trua only) |
| nguyentieu (toi) | nguyentieu_toi | cac, can-chinh, can-ninh, duc-tho, duong-hoa, garden, phi/quy/vinh-hoa |
| thanhminh | thanhminh_sang | can-chinh only (of our places) |
| doanngo | doanngo_trua (used for sáng, trưa, chiều) | cac, can-chinh, can-ninh, duc-tho, duong-hoa, phi/quy/vinh-hoa |
| thattich (toi) | thattich_toi | cac, can-ninh, duc-tho, duong-hoa, garden, phi/quy/vinh-hoa |
| trungthu | trungthu x4 | cac, can-ninh, duc-tho, duong-hoa, garden, phi/quy/vinh-hoa |
| trungcuu | trungcuu_trua | garden only |
| giaothua (toi) | giaothua_toi | cac, can-chinh, can-ninh, duc-tho, duong-hoa, phi/quy/vinh-hoa |
| phoenix, dongchi | phoenix_sang / dongchi_sang exist only for cam-ve, dien-vo, thuong-tu / phung-tien: none of our places | |

## 3. NO PL picture (fall back to the season x buổi picture, never painted)
- Festivals with no PL key at all: vulan (Vu Lan), vantho (Vạn thọ), lapbat (Lạp bát), thanhtho (Thánh thọ), phoenix (Hội Phượng), dongchi (Đông chí) - every place, every buổi.
- Per place the festival buổi PL lacks: see the table in section 2; e.g. thanhminh everywhere except Cần Chính; trungcuu everywhere except the garden; nguyentieu/thattich/giaothua for garden/ksp/lc/nvp where absent; newyear sáng/chiều/tối for noi-thi, spare-cung, truong-mon, noi-vu (only trưa exists).
- Mourning days (quốc tang, S.wdTang, 3 months after Thái hậu / Hoàng hậu dies): no mourning courtyard exists in PL; the courtyard stays the normal season x buổi picture. Report only, nothing painted.
- Matrix output (every place x 12 months x 3 tuần x 4 buổi, 0 bad URLs, 0 missing-state picks) is printed by dev/test/pl-courtyards.js.

## 4. Tests
- node dev/test/pl-courtyards.js <url> 755x1000@2 <out> fold full   and   ... 1180x820@2 <out> ipad : matrix (0 bad), 186 distinct URLs all load, 14 sample states (festival / season / buổi / fallback) load with naturalWidth 1792, no page errors, no horizontal overflow.
- dev/test/palace-oldsave.js (old main build -> this build, same origin): old save loads, Dư đồ -> detail opens, no errors.
- Shots sheet: dev/shots/pl-courtyards-can-chinh-all-states.jpg (Cần Chính điện, all 24 states).
