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

## RV ROUND 2 FAIL 08d1aad3 → fix in progress (27/11 ~03:50Z) — HANDOVER (worker rolled: ctx 45 % > START_CTX 4 % + 25 %)
Review «ROUND 2» @cb8e4fad (handover branch dev/handover/reviews/picker-dom-review.md): (A) KIT.md 28.13i lost the «Tap a tile → selected … kipd card … kipgo … confirm clicks the real option … §70 strip … ✕» bullet; (B) the flip-layout pin took the SMALLEST settled count → iPad 2 stretched columns.
DONE on this branch (commit below, NOT yet gated):
- (A) bullet restored byte-identical to LIVE; only the Grid bullet's «max height … scrolls» phrase changed (paging) + the PAGES bullet (rewritten in place).
- (B) ROOT CAUSE found: jksize kitFrameLive3 picks the layout by the NUMBER OF DRAWN option buttons (≥ KIT_SIZE.v3.live.maxOpts 7 → pick-list page layout kdper, else the wide live event frame kszf). LIVE draws every card → always kdper; paging drew fewer → the layout flipped per page. FIX: kitFrameLive3 counts ALL options of a paged picker (m.kipOnly) → one layout on every page, as LIVE. The pin hack is gone (kept only as a safety stop after 4 corrections). Columns are read only after the grid's size stays still BAL.kip.settle (150 ms, ResizeObserver debounce, resolved px tracks). The pager buttons moved to ONE row under the grid (.kippg: ‹ «trang N/M» ›, §23 .kpkpg/.kpkpn classes) so the grid keeps LIVE's full width.
- Probe (pd-out/osc2.js, s7 save, settled): Fold Tặng quà 3 / Dâng quà 5 / Cài đồ 4 / Biếu quà 4 columns; iPad 3 / 5 / 3 / 3. iPad < Fold in Cài đồ / Biếu quà is geometry: same 376 px box, kit tile --kshsz 84 px on Fold (kv1) vs 96 px on iPad → 4 vs 3 (LIVE: 3 / 3 in a 353 px scrolling box). Instead of «iPad ≥ Fold» the test checks «the page uses every column the kit tile size allows in the box» and prints a per-device column report — tell the rv why.
- KIT.md PAGES bullet, jbal2 comment (BAL.kip = {rows:2, settle:150}), KIT_REQUESTS K-LIST-PAGE entry updated to match.
TODO for the successor (worktree /home/user/wt/picker-dom, sparse; save /home/user/wt/s7.json; scratch tools /home/user/wt/pd-out/{osc2.js,video.js,prof.js}):
1. Result of `node dev/test/picker-dom.js --save /home/user/wt/s7.json --vp 755x1000,1180x820` (was running into /home/user/wt/pd-out/t10.log); fix any FAIL. 2. Merge newest LIVE (built files: `git checkout --theirs index.html sw.js`, assemble, `bash dev/site/build_site.sh`, `git checkout origin/main -- assets.json`). 3. Gates on the final sha: picker-dom-scan, picker-dom.js Fold+iPad, coop-e2e (`cd coop/worker && npx wrangler dev --local --port 8799`, then `node dev/test/coop-e2e.js <out> http://127.0.0.1:8799`). 4. Videos: `node /home/user/wt/pd-out/video.js /home/user/wt/picker-dom <outdir>`, trim ~9 s after <outdir>/<dev>.start with ffmpeg, copy to img/_review/picker-dom/picker-dom-{fold,ipad}.mp4, `python3 dev/site/cdn_sync.py img/_review/picker-dom`, curl 206. 5. SẴN SÀNG KIỂM to BIG rv session_01D3E3NX3JZAycKJ8cs4P7qd + Foreman D session_01D3E3NYwRePZXPzMMwNfkEq. 6. Kit keeper «KIT OK K-LIST-PAGE <sha>» still needed (now also covers the one-line jksize kitFrameLive3 change).

## RV ROUND 2 fix — verified (worker r3 session_01D3E3Nb9VErJBWw6bmHB87X, depth 2, START_CTX ~3 %)
PRIORITY #1 CHECK: OD play-stopper picker-dom (MAIN 164) | main LIVE 17f23656 (already merged into this branch; no newer LIVE) | review/picker-dom ece06266 | claims: Foreman D PICKER-DOM row (Foreman D now session_01D3E3NXaPqTqoCnowMTPdTq); rv session_01D3E3NX3JZAycKJ8cs4P7qd.
Code = ece06266 unchanged (no FAIL found, nothing to fix). Rebuild (assemble.py) gives byte-identical index.html.

### FAIL B — columns per FULL page, per device, vs LIVE (s7 save, settled; probe /home/user/wt/pd-out/cols.js, same code on both builds)
LIVE = one scrolling grid: «whole» = tiles fully visible without scrolling. Branch = one page (cols × BAL.kip.rows 2), grid never scrolls.
| picker | Fold LIVE cols / whole | Fold branch cols / per page | iPad LIVE cols / whole | iPad branch cols / per page |
|---|---|---|---|---|
| Tặng quà | 3 / 6 | 3–4 / 6–8 | 3 / 6 | 3 / 6 |
| Dâng quà | 5 / 10 | 5 / 10 | 5 / 10 | 5 / 10 |
| Cài đồ | 3 / 6 | 4 / 8 | 3 / 6 | 3 / 6 |
| Biếu quà · đồ | 4 / 8 | 4 / 8 | 3 / 6 | 3 / 6 |
No picker loses a tile per page against LIVE on either device; no stretched columns (round-2 FAIL B: iPad 2 cols / 4 per page is gone). iPad never has fewer columns than LIVE. Where iPad < Fold (Tặng / Cài / Biếu: 3 vs 4) LIVE has the same or the same cause: same 376 px box, kit tile --kshsz 84 px on Fold (kv1) vs 96 px on iPad (KIT 28.13i tile size, not this branch). Fold Tặng quà reads 3 or 4 depending on the dialog's first fit (both whole rows, test «every column the tile allows» passes).

### Gates on ece06266 (code) — report commit adds no code
- picker-dom.js Fold 755x1000 + iPad 1180x820: **PASS 64/64** (every page whole rows, no inner grid scroll, every tile reached once, locked + open card = full draw, confirm, DOM per picker < 2,000; column report above).
- picker-dom-scan: **PASS** 5/5 family members (giftpick, plantpick, giftto, tsgiftpick paged; tsgift fixed roads).
- coop-e2e (local wrangler :8799): **143/143**.
- quickcheck --runs 5 vs LIVE 17f23656: **PASS** · open 2.8 s · old save from LIVE loads and plays a buổi, 0 errors · perf median new/live: render 252/214, tab 633/573, buổi 1235/1882, tasks>200 30/33 (noise level, both ways).
- Videos (s7 save: Biếu quà làm lành grid › › → choose → ‹ ‹ → confirm → Dâng quà › › › → choose → Tặng quà › › → choose), curl 206:
  https://ctm-img.victoria-tntt.workers.dev/img/_review/picker-dom/picker-dom-fold.mp4 (754x1000, 62 s) ·
  https://ctm-img.victoria-tntt.workers.dev/img/_review/picker-dom/picker-dom-ipad.mp4 (1180x820, 72 s). Looked at contact sheets + full frames.
- Seen in the videos, NOT this branch (kit dialog fit, same frame on LIVE; rv round 2 already noted it): the dialog with a big scene picture keeps the option box short, so row 2 of the page (and the pager / card / confirm) sits under «Kéo xuống» in the dialog's own scroller (Fold Biếu quà, iPad Biếu quà + Dâng quà). The grid itself has whole rows; the outer kit frame cuts it. Law 10 («a big scene picture only when the content fits without scrolling») → for KK47 / MAIN, kit frame part, not 28.13i.
- Kit law 9: still needs kit keeper «KIT OK K-LIST-PAGE <sha>» (28.13i paging + the one-line jksize kitFrameLive3 count).
