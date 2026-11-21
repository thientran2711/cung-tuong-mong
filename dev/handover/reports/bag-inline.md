# bag-inline report (worker session_01Rc5AsJTtZMnTMg6ibPv5H7, MAIN CHÍNH 85) — branch review/bag-inline

PRIORITY #1 CHECK: OD 21/11 ~02:45Z (mark #21) + ~02:50Z (mark #23) | main: kitItemDetail «kidet-strip» KIT §70.3 existed (beside a grid), no under-grid strip, no chip column | review/* none | claims: this row only.

## Mark #21 — inline item strip (no pop-up)
KIT: extended the EXISTING §70.3 strip family with §70.6 (`dev/build/jkinl.js`, KIT.md §70.6, kit sample §70.6). MAIN approved option (1) 21/11 ~02:35Z; the kit keeper
(session_01Rc5AsMtjP4KTgBZVjENGLs) and the small reviewer check the kit part.
- Tư trang › Túi đồ: tap a tile → strip UNDER the grid: small square picture LEFT, name/kind/rows/act buttons in the middle, the chips (Sắc +N · Xa xỉ N · ✓ Đã biết: Đúng phẩm) as ONE vertical box on the RIGHT. No pop-up, no ✕. Tap another tile = strip swaps in place, selected tile wears the gold ring. Empty state «Chạm một món để xem.» (chips stay).
- ONE code path for the whole group: the pick's own `kitModal({kind:"info"})` is captured into the strip, so every opener wrapped round `kinvOpen` (jecon works, jrcp recipe books, jshelf, jmark Dấu ấn, jwdinv wardrobe garments/fabrics) fills it with no change of its own.
- Selection is remembered per grid and re-captured on every render: Đeo → Tháo, sell → strip goes empty and the grid grows back. «Bên mình» slots (kitEquipSlots, same panel) use the same strip.

### Group table (every item surface that opened an info pop-up)
| surface | before | after |
|---|---|---|
| Tư trang › Túi đồ tiles (kinvOpen) | kit info pop-up + ✕ | INLINE strip (kitInvGrid inline:true) |
| works / tác phẩm (jecon econWkOpen) | pop-up | INLINE (captured through kinvOpen) |
| recipe books (jrcp), shelf items (jshelf), Dấu ấn (jmark), wardrobe garments (jwdinv wdOpen/wdFabOpen) | pop-ups via kinvOpen wrappers | INLINE (same capture) |
| Bên mình slots (keqPick: veil / dress / item / empty slot) | pop-up | INLINE (kinlPickSlot). Empty-slot chooser still lists items; tapping one of those opens the kit item card with its ONE act (act pop-up stays) |
| dress picker (jtoil), Hội phối đồ (jts), veil picker (jveil), gift picker (jgpick) | already select + `kidet-strip` beside the grid (§70.3) | unchanged (already inline, no pop-up) |
| shelf drawer (jdisp kitItemCard with the ONE act Trưng bày / Cất xuống), other people's worn slot (jgift kitItemCard) | floating card | STAYS: the card is an ACT (place / take down) or a one-off look at another person's piece; not a grid-of-mine info pop-up. Flag to MAIN if the owner wants these inline too |
| shop picture card, reward boxes, event item tags | card | STAYS (not an item grid) |
| pets (jpet), kids, people | not item grids | out of scope |
| confirm sell / pick recipient / choose person | act pop-ups | STAY |

## Mark #23 — Việc act pictures
Cause: no ACTS.json entry for the six cards + the Việc pane was not a `kpanec`, so `kitActCompactOn` never added a picture. Fix (no CDN manifest push): code-side `KIT_ACT_ALIAS` in `jopic.js` + `kpanec` on the Việc pane (`jinv.js`).
| card | picture (existing, on CDN) |
|---|---|
| Nhờ thái giám mua đồ | act-mua-hang |
| Soát đồ | act-kiem-tra-ruong-h |
| Sai cung nữ thân tín mua lén ngoài cung | act-len-mua-ngoai-cung-h |
| Hối lộ người ở Thái y viện | act-mua-chuoc |
| Xin đồng minh | act-ket-minh |
| Chợ đen ở cửa Thần Vũ | act-buon-ban-len (stand-in) → ART REQUEST in FOREMAN_C_STATUS |
Scan (Fold 755x1000, fresh save, every bottom tab + Tư trang sub-panes): `button.ka` without picture = 0 (Hành sự 28, Hậu cung 5, Tài nghệ 13, Việc 6 checked; other tabs held no act cards in that state).

## Evidence
Shots (scratch, not in git): /home/user/wt/bag-inline-shots/bag-after-{755x1000,1180x820}-*.jpg, viec-755x1000.jpg. Looked at: Fold grid+strip, second tap swap, slot strip, sell (strip empties, grid regrows), iPad strip.
Known: iPad 1180x820 — the strip with 3 act cards makes the panel scroll a little (long item text + 3 acts); strip keeps the grid ≥ 2 rows. A «Bên mình» slot strip also scrolls (worn item + chooser inside).

## Tests (final)
Branch review/bag-inline @ a8ef23ce (base LIVE a88b14f0, merged; assemble = main's list + jkinl.js; index.html/sw.js rebuilt).
- quickcheck a8ef23ce: PASS (204 s, open 1651 ms, old save ok, core gates PASS; perf render 263/204 ms, tab 551/440 ms, buổi 1276/1117 ms vs live)
- coop-e2e (COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc): 92/92 passed
- Fold bag flow after the merge: tap, second tap, slot tap, sell → no page errors.
Not run: dev/test/item-info.js / item-info-scan.js (the bag pop-up site is now a strip; reviewer may adapt), iPad act-pictures shot.

## bag-inline-2 (rv follow-ups) — status 21/11 ~03:50Z, branch review/bag-inline-2 @ 5b9d81a8 (base LIVE db6ae2a0)
DONE: F3 — act buttons leave the narrow info column and take the FULL strip width under the picture/info/chips row (2–3 per row; `.kinlacts`, jkinl.js). iPad worst case (Nước bào hoa, long note + 3 acts) now scrolls ~146 px (was ~199); the long «Ghi chú» note in the narrow info column is what is left. F4 — strip picture 120 px (was 88; rv metric 120x130 at Fold and iPad). `dev/test/bag-inline.js` PASS, no page errors. Not yet run on this sha: quickcheck, coop-e2e.
TODO (handover to the next worker; rollover by context): F1 — dress picker (jtoil kitDressPicker), Hội phối đồ (jts 406), veil picker (jveil 181), gift picker (jgpick 37, jksize kszItemDetail 229) still use `kitItemDetail(…,{cls:"kidet-strip"})` BESIDE the grid: switch to the §70.6 strip (picture left, info, chip column right; reuse `kinlStrip`/`kinlPick`, grid option `inline:true` or a small helper that takes a spec). F2 — pet tiles (jpet 255/261) and others' worn slots (jdress 143, jk2b 840, jgift kitItemCard) → inline, no popups; use the capture trick (KINL.cap diverts `kitModal({kind:"info"})`; a `kitItemCard` call needs the same diversion or a spec builder). Tests: extend dev/test/bag-inline.js per grid; Fold 755x1000 + iPad 1180x820; then quickcheck + coop-e2e (tt/nc); merge newest LIVE (take main's index/sw, rebuild).
## bag-inline-3 (F1 + F2) — READY 21/11 ~04:55Z, review/bag-inline-2 @ 626ca232 (merged LIVE 60dd62c3)
PRIORITY #1 CHECK: OD 21/11 mark #21 + #23 | main kinlStrip (jkinl) | review/bag-inline-2 5b9d81a8 | claims JTtZ rolled over.
F1 DONE: new kit helper `kinlDetail(ref,{key,sum,acts,facts})` (jkinl.js, KIT §70.6 updated) = same strip for self-selecting pickers. Switched: dress chest (jtoil, chips in the strip), Hội phối đồ (jts), veil (jveil), gift picker (jgpick, under its grid). jksize 229 left: static kit-size sample sheet, not a picker.
F2 DONE: others' worn slots (`kinlWear`, one function for jk2b/jdress/jgift; strip right under the slot row, stacked in the narrow portrait column, second tap folds); pet: `petPick` info pop-up was DEAD code (never wired; side pet tile opens the Thú cưng sub-tab) → removed; Đa Bảo Các drawer tile → strip under the drawer grid (`kdrShow`), no floating card; pick tiles inside a Bên mình slot strip swap the strip (`kinlPickInline`).
EXTRA FIX (found while looking): j82 "no text in play" pass turned the Hội phối đồ picture tiles into ● (also on main) → pass skips buttons that wrap a .kitem.
NOT changed: maid person card wear cells (who="" → nothing opens, no pop-up, pre-existing); veil block `.kwd` lives in a hidden legacy pane of the new Tư trang (pre-existing, picker code path tested by forcing the pane visible).
Scan (law 11): `node dev/test/bag-inline-scan.js` table of every remaining pop-up site + reason; new site fails.
Tests: bag-inline.js PASS; bag-inline-pickers.js PASS (Fold 755x1000 + iPad 1180x820, 26+ checks each, no page errors); bag-inline-scan PASS; quickcheck 626ca232 PASS on rerun (first run FAIL only buổi perf 4259 vs live 1218, noise; d074ed59 also PASS); coop-e2e tt/nc 92/92. Shots (scratch, looked): toil, ts, veil, gift, wear, drawer, real person card, both devices.
