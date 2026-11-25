START_CTX: ~12% of window (estimate; roll at ~37%, ceiling 60%).
PRIORITY #1 CHECK ('hương nang|ban hoa|banhoa'): OD 20 | main: only text in jkc/jkc3/joi (no bg art) | review/*: review/selection-scene holds the slot | claims 8 | none duplicates the painting.

# C3-EVBG report — PILOT (own backgrounds for BAN HƯƠNG NANG + BAN HOA)

## Slot found (KIT FIRST, no private part)
review/selection-scene `dev/build/jselxsc.js`: `SELX_ART` placeholder table, keys `huong` (hương nang, kept) and `banhoa` (sent home), shown via `kitScene.open({bg:selxArt(k)})` (KIT §93.1, bg = cover). Comment says: Foreman C paints the keys, then only this table changes. Today both point to img/ev-tuyen-tu.webp. Names wanted: selx-huongnang, selx-banhoa. Nothing missing in the kit, no KIT REQUEST needed. (The table is not on main yet; wiring waits for that branch to land. Not wired by me.)

## Pilot pictures (background only, no figures; 4:3, cover-crops for Fold portrait and iPad)
| key | file (CDN review) | model / creation | credits |
|---|---|---|---|
| huong | img/_review/c3-evbg/selx-huongnang.webp | Magnific gpt-2-6, jUITdS6LD0 | 80 |
| banhoa | img/_review/c3-evbg/selx-banhoa.webp | Magnific gpt-2-6, jUITdw3LD0 | 80 |
Style ref: img/ev-tuyen-tu.webp (the existing selection picture). Crops preview: img/_review/c3-evbg/crops.jpg (Fold 3:4 + iPad square layer, each picture). Base URL https://ctm-img.victoria-tntt.workers.dev/ — add ?v=1.
Looked at both myself: huong = great hall + white steps, red table with sachet on tray centre foreground; banhoa = open red palace gate, path leading out, pink flower on small tray lower right. Pink Chinese palace, no people, no Japanese elements.
Notes for Foreman: (1) sheer gauze drape on the left pillar in both (L30 «no curtain» is about windows; say if it must go and I redo). (2) huong: the table sits where her figure stands, the figure will cover it; banhoa: flower tray lower right is cut by the Fold portrait crop. (3) 1024x768 source (gpt-2-6 4:3 at 1k).
Total spent so far: 160 credits.

## Next (no credits): family scan of MAJOR events without an own background → table + estimate, coming in the next message.

# FAMILY SCAN — MAJOR events without their own background (no credits spent)
Method: static grep (SELX_ART table, evArtCat/KMUS_CAT categories, CDN img/_index.json) + I LOOKED at a contact sheet of the 24 main event pictures (all 768x1024 or 1024x768). Limit: the exact event→picture map needs a built page (dev/tools/missing_pics.js; its 16/11 output lists 0 events on placeholders, so every dialog has *an* illustration — the question here is only «scenic background her figure can stand on» vs «object close-up / figures baked in»).
| group | picture today | verdict |
|---|---|---|
| selection lane: gate, rooms, tiensanh, so-dong, so-tay, so-bac, yard, hall, call | SELX_ART placeholders (ev-nhap-cung / ev-tuyen-tu / ev-te-le / ph-event-light) | NEED 9 own backgrounds (SELX_ART_TODO) |
| tấn phong / sắc phong | ev-tan-phong = scroll + hairpin on a tray (object only) | NEED a conferral-hall background |
| lập hậu / sách phong (đại điển) | none separate (reuses thinh-an / trieu-chinh) | NEED a phoenix-hall coronation background |
| hòa thân (hoa-than) | procession with figures baked in | NEED (gate departure, no figures) |
| thắng trận (thang-tran) | horse rider baked in | NEED (victory gate, no figures) |
| đại xá, quốc tang, tang lễ, tiên đế băng hà, hình phạt, lãnh cung, tế lễ, yến tiệc, triều chính, sinh nở, nhập cung | scenic, no focal figure | OK (reuse) |
| 15 festivals (+ -b variants), 8 end-bg-* | scenic | OK |
| thinh-an (kneeling crowd), nguy-gia, tien-de-bang-ha | figures baked in | not «major own bg» by the owner's list; park unless Foreman C says otherwise |
## Estimate (gpt-2-6, 4:3 1k = 80 credits each, measured on the pilot)
- A. selection lane 9 × 80 = 720
- B. tấn phong, lập hậu, hòa thân, thắng trận 4 × 80 = 320
- Total 13 pictures = 1040 credits; +30% for rejected redos ≈ 1350. Already spent 160 (pilot).
Waiting for Foreman C's go / list change before painting.
