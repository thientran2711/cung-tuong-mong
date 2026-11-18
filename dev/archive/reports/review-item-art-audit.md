SAMPLE READY dev/art/item-art-audit/SAMPLE_SHEET.png (branch review/item-art-audit; top row iPad 1180x820 @2, bottom row Fold 755x1000 @2, real kitRevealHTML)

# review-item-art-audit (item art audit, Foreman C s17)

## PRIORITY RULE #1 (reuse)
git grep of origin/review/item-art(-r2..r5), item512-art(-r1), item-big, kit-keeper-2, item-events: 
- item-art-r2..r5 (on CDN `img/hi/`): 121 files of 1024 masters = 44 poems-as-works + tp kinds + 8 pets (not all items). Reused as the "hi" column below.
- item512-art-r1 (PASS f9d10956): 22 base items already had item512; 8 marks at mark512. Reused, nothing redone.
- item-big: scan script only (29 big kitItem calls); kitItemBigSrc on main only maps `img/item-*` -> `img/item512/item-*`.
- item-events (KIT §64): every event/quest item named in dev/review/item-events-table.md maps to an IT key (23 of 23 checked; the only non-IT entries are Bạc = silver, and generic "món của ngươi / món quà người khác tặng" = the real entry, whatever it is).

## Method / scripts (all in git, rerunnable)
1. `dev/test/item-art-audit-enum.js` (Playwright, real game): every key of IT (incl. veils, recipe books, story items), WD_ITEMS, handmade works (15 kinds x 4 tiers), pets (22 x 4 stages), marks (8), veil pictures -> the picture the reveal would use (kitItemInfo src512, else src).
2. `dev/test/item-art-audit-static.py`: keys referenced in code (inv.push, gi:, item:, invHas…) unknown to IT/WD_ITEMS -> 4 hits (court, rel, rv, story) = false positives (not item keys). `dev/measure/item-art-audit-static.json`.
3. `dev/test/item-art-audit.py`: per picture on the CDN (`img/_index.json`): exists, RGBA + transparent corners, pixel size, content size, Laplacian variance, detail above the 256 band. Full rows: `dev/measure/item-art-audit.json` (418 rows).
4. `dev/test/item-art-audit-reveal.js`: real reveal at iPad/Fold @2. Measured: reveal image box = 260 css px = 520 device px at both sizes (kitItem xl = min(260px, 36dvh); 36dvh >= 295 on both), source 512 -> ratio 1.02 (sharp). A 256 source is shown 2.03x (soft).

## Counts (418 rows)
| set | rows | picture exists | big (512) exists | alpha OK | verdict at reveal |
|---|---|---|---|---|---|
| IT (items, fabrics, story/event items, recipe books) | 174 | 174 | 174 | 174 | sharp (512 native; I looked at the 8 lowest-detail ones at 520 px: bangle, dancer scroll, flower paper, powder, cat, rabbit, dog, torn score: all clean) |
| WORK (15 kinds x 4 tiers) | 60 | 44 | 44 | 44 | 44 sharp; **16 MISSING** |
| PET (22 pets x 4 stages) | 88 | 88 | 88 | 88 | sharp |
| MARK (8 ranks) | 8 | 8 | 8 | 8 | sharp (non-square, object-fit contain) |
| WD (46 garments / hairpins, all IT keys) | 46 | 46 | **0 (256 only)** | 46 | **SOFT: 256 shown at 520 = 2.03x** (kitItemInfo gives src512 = src for WD_ITEMS) |
| VEIL (37 IT veil keys) | 37 | shared `img/veil-t1..t5.png` / veil-silk-*.png (480x445) | - | overlay masks | not item pictures (face overlays); owner question open: draw a veil item picture? |
| VEILPIC | 5 | 5 | - | - | see above |

### MISSING (neither 256 nor 512 on the CDN): 16
tp-kimchi-b1, tp-kimchi-b2, tp-kimchi-b3, tp-kimchi-b4, tp-phanson-b1, tp-phanson-b2, tp-phanson-b3, tp-phanson-b4, tp-thuchuc-b1, tp-thuchuc-b2, tp-thuchuc-b3, tp-thuchuc-b4, tp-phucthien-b1, tp-phucthien-b2, tp-phucthien-b3, tp-phucthien-b4
(the four newest handmade kinds kim chỉ, phấn son, thuchuc, phúc thiện have no pictures at all at any tier; their recipe books wkb_/wkp_ exist.)

### SOFT: 46 WD items, 256 px only
tramngoc (Trâm ngọc bích); boodieu (Bộ diêu vàng); tramphuong (Trâm phượng cửu vĩ); tram_dao (Trâm gỗ đào); tram_dong (Trâm đồng mai hoa); tram_hoalua (Trâm hoa lụa); tram_ngoclan (Trâm bạc ngọc lan); thoa_diep (Thoa bạc song điệp); tram_hong (Trâm thạch anh hồng); hoadien_bac (Hoa điền bạc khảm lưu ly); thoa_vang (Thoa vàng hồ điệp); tram_phithuy (Trâm phỉ thúy hải đường); dientu_thuy (Điền tử điểm thúy); bd_phuong (Bộ diêu kim phượng ngậm châu); tram_maudon (Trâm hồng ngọc mẫu đơn); diemthuy_cuu (Điểm thúy cửu điệp); kimthoa_phuong (Kim thoa song phượng); phuongquan (Phượng quan bán giá); nt_nhuy (Trâm ngọc như ý ngự tứ); nt_haiduong (Bộ diêu «Hải đường xuân thụy» ngự tứ); nt_dongchau (Trâm đông châu ngự tứ); y_cungnu (Áo vải xanh cung nhân); y_luamoc (Áo lụa mộc hồng nhạt); y_chuongsu (Áo gấm lam chưởng sự cô cô); y_nuquan (Áo lụa chàm nữ quan); y_mama (Áo gấm xanh rêu ma ma); y_hoanho (Áo lụa thêu hoa nhỏ); y_saxanh (Váy sa xanh ngọc); y_maimai (Áo gấm hoa mai); y_vanthuy (Áo lụa Hàng Châu vân thủy); y_lan (Áo the thêu lan); y_tramnep (Váy lụa bách điệp); y_haiduong (Áo gấm thêu hải đường); y_chimen (Áo choàng lụa thêu chim én); y_maudon (Áo gấm Tô Châu thêu mẫu đơn); y_hac (Cát phục tím thêu hạc); y_kimtuyen (Cát phục đỏ thêu kim tuyến); y_vancam (Áo gấm vân cẩm); y_trieutim (Triều phục tím chạm phượng); y_bachdieu (Áo gấm thêu bách điểu); y_minhhoang (Triều phục minh hoàng thêu phượng); y_phuongbao (Phượng bào đỏ thắm); nt_longchon (Áo lông chồn ngự tứ); nt_bachhoa (Cát phục «Bách hoa» ngự tứ); nt_hocuu (Hồ cừu trắng ngự tứ); y_tang (Áo tang vải trắng)

### Other findings
- Recipe books: `wkp_*` (bản chép tay) = ONE picture for 45 keys; `wkb_*` = one picture per kind shared by tiers s2/s3/s4. Drawn and sharp, but not distinct (candidate list, not blocking).
- No 1024 master exists for any IT/WD/PET item (`img/hi` has only 121 works/pets files). 512 is enough for the reveal (1.02x); 1024 is only needed if the reveal is made bigger than 260 css px.
- Title items (sắc phong book, seal, ấn): **PENDING, no item exists in code (no IT key)**. Sample drawn (below). Title-logic worker owns the logic; needs IT keys + ITEM_ART_G entry.
- Quest rewards / gifts / event-only items: all resolve to IT keys already counted; no code path found that hands out a key with no table entry.
- Reveal falls back to 256 when src512 is absent; kitItemBigSrc fallback fine.

## SAMPLE (step 2) — 4 pictures, gpt-2-6, Magnific folder ba4aecfe…, transparent, STYLE_ANCHOR-style (painterly guofeng near-3D), looked at each
| sample | for | generate id | remove-bg id | credits |
|---|---|---|---|---|
| tassel + knot | tp-kimchi (missing 4) | rgerQHextc | jUXj5JhLD0 | 40+3 |
| rouge box | tp-phanson (missing 4) | MBwMGVkDCm | huRhBKLvqL | 40+3 |
| women's calligraphy book + jade seal | tp-phucthien (missing 4) | O6fOsMaynm | 4Ru4w0y9Aa | 40+3 |
| sắc phong yellow dragon book + seal | title item (pending) | TdSTAk2VNR | 1lp1HiLr4r | 40+3 |
Total 172 credits. CDN (new names, no live picture touched): `img/item512/item-sample-<kimchi|phanson|phucthien|sacphong>.webp` (512) and `img/hi/item-sample-*.webp` (1024 master). The real reveal at both sizes: dev/art/item-art-audit/SAMPLE_SHEET.png (all four sharp, clean cut-outs). Not drawn: WD upscale sample (see plan).

## Plan after owner OK (not started)
1. 16 missing works: 4 kinds x 4 tiers, each tier different (crude -> fine), 1024 master + 512 + 256 under `img/item-tp-<kind>-b<n>.webp`, item512, hi (these keys have NO picture now, so live names are allowed). ~16 x 43 = ~690 credits.
2. 46 WD items: Magnific upscale (or redraw like item-art r4) 256 -> 1024/512 into `img/wd512/wd-<key>.webp`; needs a one-line code change (kitItemInfo WD branch src512) = KIT/coordinator item. Use -sample suffix first, owner looks, then replace. ~46 x 43 = ~2000 credits.
3. Title items once the title worker gives keys (sắc phong book + seal, maybe a separate seal).
4. Optional: distinct pictures per tier for wkb/wkp.

Branch review/item-art-audit pushed (scripts + measure json + sheet; no images in git).
