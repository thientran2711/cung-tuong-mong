# tainghe-overview (FLIGHT-TAINGHE, owner flight bug #1, OD 24/11 ~18:05Z)
PRIORITY #1 CHECK: OD 24/11 ~18:05Z item (1) + OD 21/11 ~02:52Z (act cards one size) | main: dev/build/jtabs.js ktArtHTML/ktWorksHTML (old long list) | review/*: none | claims: none.

Branch review/tainghe-overview @ 624d39ea (from origin/main 502c48c9). Only dev/build/jtabs.js + rebuilt index.html/sw.js.

## What changed
- Every Tài nghệ sub-tab (Tứ đức, Cầm kỳ thi họa, Vũ · Y · Nữ công, Tác phẩm) opens on an OVERVIEW: ONE equal tile per môn, 2 columns on Fold and iPad (grid-auto-rows:1fr = equal size). Tile = the kit skill card (kitSkillCard) without acts: picture, «Nhập môn»/bậc label, name, bậc dots «Bậc n/5», Tiến bộ bar + n/100, «Bậc n+1 mở · …» line (+ desc on wide tiles; on the narrow iPad tile the picture stacks over the text and the one-line desc is hidden so 4 tiles fit without scrolling).
- Tap a tile (or Enter/Space) → kitModal («BÁO» notice) with that môn's kit card (picture, info repeated) and its act cards (Tự học / Học với thầy / Các lối… / Học với Thái hậu / Tự học, làm tác phẩm) — same pbtn kit act cards, same Tốn/Được/Ghi chú/Cần. The modal's side picture is hidden; the môn picture is the card's own.
- Pressing an act in the pop-up starts it (data-learn / vlearn / wk / charity handlers untouched) and closes the pop-up. Disabled acts keep it open.
- Tác phẩm: one tile per art that makes works (kinds as chips, phẩm +n).
- Family: all 4 sub-tabs use the same ktTnTile/ktTnPop; no other screen lists «môn + its acts» this way (j85 v85Table is the old levels table, unchanged).

## Evidence (shots looked at, scratch /home/user/wt/tn-shots, not in git)
Fold 755x1000@2 + iPad 1180x820@2, before/after of Tứ đức / Cầm kỳ / Vũ·Y·Nữ công / Tác phẩm + pop-up: after-755-*.png, after-1180-*.png, before-*.png.
| tab | tiles | acts listed on tab |
| duc | 4 | 0 (before 4 cards + 12 acts) |
| cktt | 4 | 0 |
| nc | 4 | 0 |
| wk | 8 | 0 |
Tests: act-grid-scan 755/1180 all PASS (art scene now 0 acts on the tab; pop-up not scanned yet); maid-8tabs 62/66 — the 4 FAILs are IDENTICAL on origin/main index.html (maid-acts-a, pre-existing, not from this change); no page errors; learn from pop-up calls lessonMode('vu','self') and closes the pop-up (checked by script).

## Open / for KK21 (kit)
- Tile modifier lives in jtabs.js (`.ktn-tile`, `.ktn-grid`, container query) because the job is urgent; KK21 should fold it into j79 kitSkillCard as `o.tile` (KIT.md §21) — behaviour is the spec.
- Pre-existing, not touched: in the pop-up the act cards still have uneven heights/gap (OD 21/11 #24 act-card one size) — fix belongs to the act-card kit.
- Not done: act-grid-scan could add a pop-up scene; old-save not separately tested (no save format touched).

LAND READY (SMALL = UI) · ~ phần Tài nghệ 90% xong / chơi được.
