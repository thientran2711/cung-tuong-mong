# picker-dom — ITEM-PICKER DOM / PILE-UP (PLAY-STOPPER, MAIN 164 order ~21:36Z 26/11)

Worker session_01D3E3Na4LuR5WU2hdNmAMrS (opus, depth 1, START_CTX ~4 %) for Foreman D session_01D3E3Na4WaA2w77G38gsY8w. Branch review/picker-dom (FF from LIVE 03a8c17c).

PRIORITY #1 CHECK: OD 3 ('Biếu quà làm lành' / inv-stack) | ledger 2 | main 03a8c17c: jgpick.js (KIT 28.13i), jts.js PEND.tsgiftpick, j63.js:173 F10 m3 (normaliser only, not the card count) | review/* inv-stack-rv 1ffddd68 + save-fix-stack-rv15 273c64c3 (jstack invAdd, K-LIST-PAGE named as follow-up) | KIT_REQUESTS «26/11 K-LIST-PAGE» (Foreman B, open, nobody built it) | claims: picker-dom = this worker; kit = KK47 session_01Rc5AsHmtzuWMnb27oL1LC5.

## Correction to the order
lc25-os 504d2e6a does NOT carry B's inv-stack fix (no `invAdd` / `jstack.js` on origin/main or review/lc25-os). It is in review/save-fix-stack-rv15 273c64c3 (FF on LIVE 03a8c17c, not LIVE yet). Step (1) was therefore measured as LIVE vs rv15 vs rv15+this fix on the same save (F's robot save s7, year 18, S.inv 1,437 entries — the same family and scale as s14 b1570 / s2f; a fresh b~1560 robot life was not rerun).

## Root cause (the ~20k-node screen)
KIT 28.13i item pick grid (jgpick). The dialog base (j3 showModal) built a FULL act card `.opts>.opt` for EVERY chest entry offered (~26 nodes each after kaNorm1 / kpOptArt), jgpick hid them (`.opts.kiphas>.opt{display:none}`) and added one tile per entry on top. A long life with an unstacked chest (monthly stipend pieces, from:'noivu') → 36k–63k nodes per picker; «Dâng quà» took 232 s to open on iPad. inv-stack (rv15) folds the chest (1,437 → 117 offers) but each picker still drew 2.0k–3.5k nodes (B's own K-LIST-PAGE note).

## Fix (one kit part, the whole family)
- j3: `optBtnHTML(c,i)` = the one option-button markup (unchanged output); `m.kipOnly` (non-enumerable, never saved) → an item pick dialog draws only the CHOSEN item's option card.
- jgpick: `kipCard` builds another tile's card when it is chosen (same `optBtnHTML` + `kitFix` → kaNorm1, so the display copy and the confirm click are the real option); `kipPage` shows `BAL.kip.page` (=24, jbal2) tiles at a time with the existing §23 kit pager (`.kpkwrap` ‹ › `.kpkpg`, `.kpkpn` «trang N/M», kitPicker's classes — no new part, no count); page of the chosen tile opens first; doable-first order unchanged.
- B's inv-stack twin-tile rule (one tile ×N, kitItem qty) is carried VERBATIM in `kipList`, guarded by `typeof invCan` (no-op until jstack lands) → rv15 and this branch merge in either order (tested: merge onto 273c64c3, jgpick = this branch's file).
- KIT.md 28.13i: PAGES bullet written in place (law 14). Kit page sample §28.13i shows the pager.
- No mechanic, no word, no number changed (law 4: page size in BAL).

## Before / after (F's s7 save, #modal DOM nodes; iPad 1180x820, Fold 755x1000 within ±10)
| picker | LIVE 03a8c17c | rv15 (inv-stack) | LIVE + picker-dom | rv15 + picker-dom |
|---|---|---|---|---|
| Tặng quà (Hậu cung, giftpick) | 36,188 | 2,050 | 231 | 230 |
| Dâng quà (giftto) | 40,224 (232 s to open) | 2,313 | 314 (0.8 s) | 317 |
| Cài đồ vào rương (plantpick) | 63,471 | 3,512 | 237 | 239 |
| Biếu quà làm lành · đồ (tsgiftpick it) | 39,162 | 2,225 | 366 | 368 |
| Biếu quà làm lành · cả hai (old save) | 39,271 | 2,333 | 366 | 368 |
| Biếu quà làm lành · tác phẩm | 193 | 193 | 144 | 143 |
| Tư trang bag (kitInvGrid, grouped) | 405 | 405 | 403 | 403 |

## Family scan (law 11) — `node dev/test/picker-dom-scan.js [ref]`
| picker | file | origin/main | review/picker-dom |
|---|---|---|---|
| giftpick | j8.js | FAIL (every entry, one hidden card each) | ok (paged, chosen card only) |
| plantpick | j8.js | FAIL | ok |
| giftto | jgift.js | FAIL | ok |
| tsgiftpick | jts.js | FAIL | ok |
| tsgift | jts.js | ok (fixed 3 roads) | ok |
Other chest-sized lists checked: Tư trang bag + dress chest (kitInvGrid, grouped by kind: 30–34 tiles), sell shop (kitShopSellList grouped by kind), works / recipe grids (jwkr / jrcp, bounded by the recipe list) — not proportional to the chest, unchanged.

## Tests
- `node dev/test/picker-dom.js [--root wt] [--save s7.json] [--vp …]`: DOM < 2,000 per picker; pages reach every tile once; on-demand card = drawn card; confirm gives exactly one piece (stack-aware) or she refuses it. LIVE+fix 16/16 (iPad), rv15+fix 32/32 (Fold+iPad). LIVE: FAIL 5/8 (the table above).
- opt-render.js 1180x820 LIVE vs branch: no B (act-picker) fail on either; non-chosen picker cards show as not drawn (by design); A/C differences are the test's random events (165 vs 182, different events each run).
- gift-pick.js: finds no grid on LIVE either (stale test, not a regression).
- coop-e2e: see «Gates» below.

## Pile-up (law 6c)
362 → 794 offers over a life = the unstacked monthly stipend entries (flight2-s7 review: alnen0 518, aldau0 154 …) = B's inv-stack root cause (rv15: s7 1,437 → 117 real pieces + stacks, every total equal after reload). Not double-fixed here. No piece is created or lost by this branch (confirm = the real option).

## Not this bug (seen while measuring)
- On s7 every Tặng quà / Cài đồ tile is locked: jptime finds no free servant to send («không còn ai rảnh để sai (người hầu đang đi việc)») — a real rule, its reason on each tile (F's 15:30Z «every confirm disabled» line, routed to MAIN 160).
- Fold: the confirm button sits below the scrolling box («Kéo xuống») — same on LIVE (F's 15:30Z kipgo note).

## Gates
- coop-e2e (local worker, wrangler dev --local :8799) on 1466caa7 (code sha; later commits = this report only): **143/143 passed**.
- picker-dom.js: LIVE+fix 16/16 · rv15+fix 32/32 · scan PASS 5/5 (origin/main FAIL 4).
- Videos (F's s7 save; Biếu quà làm lành 3 roads → «Đồ trong rương» grid → › › → choose a tile (card on demand) → ‹ ‹ → confirm → gift moment + result → Dâng quà › › › → choose), curl 206:
  https://ctm-img.victoria-tntt.workers.dev/img/_review/picker-dom/picker-dom-fold.mp4 (755x1000@2) ·
  https://ctm-img.victoria-tntt.workers.dev/img/_review/picker-dom/picker-dom-ipad.mp4 (1180x820@2). Wipe on verdict: `python3 dev/site/cdn_sync.py --wipe-review picker-dom`.
- Kit law 9: this changes kit part 28.13i → lands only with kit keeper KK47's sign-off (KIT REQUEST K-LIST-PAGE); KK47 / MAIN 164 were not reachable from this account (send_message «not found»), relayed through Foreman D.
- Merge with review/save-fix-stack-rv15: jgpick conflict resolves to this branch's file (B's twin-tile rule is inside kipList); index.html / sw.js rebuild.

## Handover (if a successor is needed)
Worktree /home/user/wt/picker-dom (sparse). Save /home/user/wt/s7.json (from handover ref, see picker-dom.js). Remaining: KK47 sign-off, BIG review, land after or with rv15.

## RV FAIL 8f1fd91c → fix (27/11, sha b63705f6, FF from LIVE 17f23656)
Review dev/handover/reviews/picker-dom-review.md @e57bf999 (BIG rv session_01D3E3NX3JZAycKJ8cs4P7qd), 2 items, both fixed for the whole family:
1. On-demand card ≠ drawn card (post-showModal decorators jgift:179 giftto lock/.kgiftno/chip, jk2b:347 hideOut, jemoact:677 eaLockWhy skipped). FIX: no hand-built card at all. The dialog draws the cards of the page in view + the chosen one (`m.kipOnly`); a page turn, or a choice whose card is not drawn, runs the ONE real `showModal` again (`kipRedraw`, scroll kept), so every decorator dresses every card. Test: per picker (giftpick, giftto, plantpick, tsgiftpick) a locked and an open tile reached by page turns → card = the full draw of LIVE's path (grid off, same dialog): classes, disabled, data-* (except data-kapic, the jk4/jopic picture-FIT mark set only on a visible card), text, item chip — all ok (or «none on this save»).
2. §23 whole rows / no inner scroll. FIX: page = `BAL.kip.rows` (2) × the columns the grid shows once the dialog has settled (ResizeObserver; resolved px tracks; per dialog kind + width); FLIP-LAYOUT PIN for dialogs whose layout flips with the tile count (pinned to the smaller count, tiles stretch); grid has no max-height/scroll in paged mode. jbal2 comment + KIT.md bullet rewritten in place; KIT_REQUESTS K-LIST-PAGE entry → awaiting kit keeper «KIT OK K-LIST-PAGE <sha>».
Also: j3 drew every dialog calling kitCancelIx(m) once PER OPTION (O(n²): 320 ms of a 410 ms draw on s7) → once per draw (page turn 410 → 70 ms).
Gates on b63705f6: picker-dom-scan PASS 5/5 (main FAIL 4) · picker-dom.js PASS 56/56 (Fold 755x1000 + iPad 1180x820: every page whole rows / no inner scroll, every tile reached, card equality, confirm, DOM per picker 129–695 nodes) · coop-e2e 143/143.
Videos (206, new): img/_review/picker-dom/picker-dom-fold.mp4 · picker-dom-ipad.mp4. Seen in them: on Fold the dialog frame changes size between draws (kitDlgFit re-fits each draw; kit behaviour, not this branch's code) — flagged for the reviewer.
