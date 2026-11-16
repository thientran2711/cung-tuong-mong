# PROGRESS review/succession-port (D32 succession choice — re-port of review/succession2)
Spec: OWNER_DECISIONS OD:L88 (player CHOOSES Hoàng thái hậu / Nhiếp chính / Nữ đế, each with conditions + epilogue),
OD:L106 (choice card shows full outcomes + odds like an act; epilogue chapter choices stay costs-only),
OD:L131 (Tiên đế băng hà picture APPROVED, review/succession2 816d0976). Design: dev/SUCCESSION_PLAN.md (unchanged from succession2).

## What was ported (from origin/review/succession2 816d09764, base e9e2248fb, 12 commits, never merged)
- dev/build/j99succ.js (module), placed after j98 in assemble.py (inside jcoopworld's emperorDies wrapper, so co-op keeps its rule).
- dev/SUCCESSION_PLAN.md, dev/test/succession.js (rewritten for the current boot + 5 viewports).
- Picture img/ev-tien-de-bang-ha.webp: the approved 816d0976 version (officials left, harem in white right, hair fix) was NOT on the CDN.
  Re-encoded from the branch file at display size (1920x1074 695 KB → 1280x716 q78 213 KB, under the 250 KB centre-art budget),
  looked at, uploaded with cdn_sync. No new art generated.

## Adapted to current main (main moved ~1000 commits)
| old (succession2) | now |
|---|---|
| private wide band `succBand` (.ksuccart) built from kitSceneArt | kit 31.16 `headArt` (jk3) → kit 32.2 kitEventStage band; private band deleted |
| epilogue chapters: placeholder picture (SUCC_ART empty) | 9 chapters reuse approved CDN event art: a1 ev-tan-phong, a2 ev-trieu-chinh, a3 ev-am-muu, b1 ev-trieu-chinh-2, b2 ev-canh-phong, b3 ev-trieu-chinh, c1 ev-dai-xa, c2 ev-thang-tran, c3 ev-fest-nguyentieu-b |
| Sổ luân hồi line = private `<p class="past succbk">` + injected style | `<h3>Kết cục kế vị</h3>` + rows67/kitRows (same as j97 Kết hiếm); style injection deleted |
| chapter options x:"" → current kit hint said "không được mất gì" (false) | `succWords`: the hidden meters in words, no numbers (mẹ con thêm gần / quyền lỏng tay / lòng người theo ngươi / thêm kẻ dòm ngó…) → kit Gợi ý row; numbers stay hidden (OD:L106) |
| foe of chapter a3 could be a consort whose name she does not know → "Quý phi ???" | succEnemy keeps only kitKnownName(v) consorts, else the plain "họ / các Thái phi" text |
| over(h,t,fate) — end card said "Chết vì" for living endings (old open item) | over(...,alive): succEnd passes `!die`; group fix below |
| card / chapter text "Vương gia ???" when she never learned his name | `succMN`: his title alone ("Vương gia") unless k61Named |
| no co-op guard | emperorDies wrapper passes through when COOPW.on |
| path c: kit deadly-choice confirm (KIT_DEADLY, "ban chết") now asks "Vẫn chọn" | kept (kit behaviour); test answers it |

## LUẬT SỬA CẢ NHÓM — end card "Chết vì" on living endings (scan: `python3 dev/test/over-alive-scan.py`)
j32 over(h,t,fate,alive) prints "Chết vì" unless the 4th arg is true or the fate wording matches its alive list.
| | before | after |
|---|---|---|
| over() wrappers dropping the 4th arg | 1 (j42:441 Thành thân) | 0 |
| living endings whose card said "Chết vì" | 17 (j24:51 Vương gia che chở; j3:115,127,128,130,131,133 Lãnh cung tuổi xuân / Thái phi ×3 / Hoàng thái hậu / Mẫu hậu HTH; j14:19 điên trong lãnh cung; j42:209,279,282,379,381,433,437 ma ma / xuất giá / xuất cung / bị đuổi ×2 / ban hôn / vương phủ; j96:98 giả chết rời cung; j97:273 về cố quốc làm nữ vương) | 0 (each passes alive=true) |
| succession endings | n/a | 10 living → "Kết cục", 2 deaths (Nữ đế bị phế, Mưu nghịch bất thành) → "Chết vì" |
True deaths unchanged (j3:141 die(), j30:27 tư thông ban chết).

## Tests (node dev/test/succession.js <url> <out> <sizes…>; one Chromium at a time per run)
Per size: choice card for a/b/c/none (header picture loaded, Cần/Tốn/Được/Mất/Kèm rows, unmet → disabled with ✗ reasons, odds ladder word),
each path played to its end (end card label checked), save+reload mid-epilogue (b, chapter 2 kept), forced failures (b → path a;
c → Mưu nghịch bất thành), old save without S.succ loads and a turn passes, Sổ luân hồi has "Kết cục kế vị".
FAIL on page errors, horizontal overflow, text outside the screen, '%', '…'.
RESULTS (build e4ac5785b887 / bcc033bec69f): PASS at 755x1000, 1000x755, 844x390, 1180x820, 1366x1024 — 0 page errors, 0 overflow, 0 cut text,
no '%' / '…'; header picture loads on every choice card; living endings say "Kết cục"; reload mid-epilogue keeps p=b ch=2; b failure → path a,
c failure → Mưu nghịch bất thành (ban chết); old save loads, a turn passes; Sổ luân hồi line present. 390x844 shows the rotate prompt
("Xoay ngang điện thoại để chơi"). Path c rerun after the name fix: PASS.

## Open
- New art for the epilogue (SUCCESSION_PLAN §7 items 2–13) was never approved; chapters reuse existing approved event art. If the owner wants
  dedicated pictures, they are st-* style gpt-2-6 (EVENT_ART.md rule).
