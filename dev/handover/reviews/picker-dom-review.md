# picker-dom — BIG REVIEW (opus) — verdict: FAIL (2 items)

Reviewer session_01D3E3NX3JZAycKJ8cs4P7qd, depth 1, START_CTX ~3 % (get_session read 0; own estimate), for Foreman D session_01D3E3Na4WaA2w77G38gsY8w.
Worker session_01D3E3Na4LuR5WU2hdNmAMrS. Ordered on 303611f2; final verdict is on **8f1fd91c** (= 303611f2 + merge of LIVE 4cfcda61; FF of LIVE: yes).
Its tree equals my own local trial merge of 303611f2 onto 4cfcda61 (fc410a6f) except the build line in index.html, so every run below holds for 8f1fd91c.

PRIORITY #1 CHECK: OD 3 ('Biếu quà làm lành' / inv-stack) | main 4cfcda61 jgpick.js KIT 28.13i, j79.js:1443-1453 kitPicker §23 pager (.kpkwrap/.kpkpg/.kpkpn «trang N/M»), jts.js PEND.tsgiftpick | review/* save-fix-stack-rv15 273c64c3 (B inv-stack, twin-tile rule) | KIT_REQUESTS K-LIST-PAGE (KK47 session_01Rc5AsHmtzuWMnb27oL1LC5; sign-off still pending) | claims PICKER-DOM worker session_01D3E3Na4LuR5WU2hdNmAMrS.

## What passes
| check | result |
|---|---|
| FF of LIVE | 303611f2 was NOT (LIVE moved 03a8c17c → 4cfcda61); 8f1fd91c IS. Trial merge: only index.html / sw.js conflicted, so I rebuilt them with build_site.sh |
| law 4 (one core) | page size = `BAL.kip.page` (jbal2); no number typed in jgpick. **But** the jbal2 comment «4 rows of 6 on Fold and iPad» is wrong: I measured 2 columns on Fold and 5 on iPad (see FAIL 2) |
| law 6c (real objects) | picker-dom.js deep: every page turn reaches every entry exactly once (1437/1437 and 1432/1432, 60 pages); confirm gives exactly 1 piece (stack-aware invTotals); nothing is created or lost. `kipOnly` is non-enumerable, so it is never saved |
| law 9: family scan | the only `ik:` option builders are j8 giftpick/plantpick, jgift giftto and jts tsgiftpick. All of them go through jgpick (kipOn). picker-dom-scan PASS 5/5 (LIVE FAIL 4). No picker-local variant. KIT.md 28.13i PAGES bullet is written in place, and the kit sample shows the pager |
| pager look | reuses the §23 classes and the format «trang N/M» exactly as written in j79 kitPicker; no count; cổ trang OK (law 7: no %, no number of items) |
| DOM (F's s7 save, Fold + iPad) | Tặng quà 225/228 · Dâng quà 313/314 · Cài đồ 234/237 · Biếu quà đồ 366 · tác phẩm 143 · cả hai 366 · Tư trang 411/403. picker-dom.js PASS 32/32 on the merge with LIVE |
| merge with save-fix-stack-rv15 273c64c3 | textual conflict in jgpick.js (+ built files). Resolved by taking picker-dom's file: rv15's twin-tile rule is inside kipList word for word; rv15's `dup.remove()` is no longer needed because twin cards are never drawn. picker-dom.js PASS 32/32 on that merge (117 entries). Note: rv15 vs the new LIVE 4cfcda61 also conflicts in assemble.py and jts.js. That is B's restack, not this branch |
| coop-e2e (local wrangler :8799, on the merge with 4cfcda61) | 143/143 |
| quickcheck --runs 5 + old save | old save from LIVE loads and plays a buổi, 0 errors; perf medians new/live: render 169/174, tab 356/448, buổi 894/859, tasks>200 17/18. CORE GATES FAIL G4 80-dialog-fixed («kit-dialog-2 a» empty Tốn/Được cell) and button crawl «Ô lưu · Lui». **Both fail the same way on LIVE 4cfcda61** (I ran a separate quickcheck there): they were already there before this branch, not caused by it |
| videos | fold 754x1000 44.8 s, ipad 1180x820 40.8 s, HTTP 200; looked at a contact sheet of each: pager, page turns, on-demand card, confirm, gift moment, Dâng quà |

## FAIL list (for the worker)
1. **On-demand card ≠ drawn card (order check 4; law 9).** `kipCard` builds the card with `optBtnHTML` + `kitFix` only. Decorators that run AFTER `showModal` (wrappers over `.opts>.opt`) never reach a card built on demand. Proof on s7, Dâng quà, last tile: the drawn real `.opt` text is «Thường Nến mỡ dê …»; the same option built on demand is «Nến mỡ dê …». The cause is jgift.js:179 (the giftto hook): it adds the item chip AND `o.lock → disabled + .kgiftno`. `kipDetail` clones `src` classes, so a locked Dâng quà tile chosen on demand shows its card at full opacity, while the drawn one has `.kgiftno` (opacity .62). The other post-showModal decorators of the same kind are jk2b.js:347 hideOut and jemoact.js:677 eaLockWhy; they are not hit by these 4 pickers today, but they would be skipped the same way. picker-dom.js did not catch this, because it compares only the copy's innerHTML with data-* removed, not the card's classes or `disabled`. Fix the whole group: one way to decorate a dialog option that runs for both drawn and on-demand cards (e.g. move the jgift giftto per-option decoration into the kitFix path, as jtsb tsbNeedMark already does, or have kipCard call the same post-draw step). Then extend picker-dom.js to compare the real `.opt` outerHTML (class list + disabled) for a LOCKED tile and an unlocked one, in every picker of the family.
2. **The pager does not follow §23 (law 9/10).** KIT §23 says: «whole rows only in pages (‹ ›, "trang 2/4") … no inner scroll, no half row». 28.13i pages 24 tiles but keeps the inner scroller. Measured on 8f1fd91c, s7 save: Fold 755x1000 = 2 columns, 12 rows per page, box 375 px / content 2144 px, 4 whole tiles visible, «Kéo xuống» cue, a half row cut at the bottom (my own Fold shot of Biếu quà page 2/60 shows it); iPad 1180x820 = 5 columns, box 375 / content 893, 10 whole tiles visible. So one «page» is 3–6 screens of scrolling, and pages hold 2 or 5 columns, not the «4 rows of 6» the BAL comment says. Fix: a page = whole rows that fit the box, like kitPicker's per-page fit (BAL holds the row count, e.g. `BAL.kip.rows`; columns come from the measured grid), no inner scroll. Or KK47 rules in KIT.md that 28.13i may keep its scroller; in that case the KIT.md 28.13i text and the jbal2 comment must say what really happens. Either way it needs KK47's «KIT OK K-LIST-PAGE <sha>», which is still missing.

## Not this branch (noted)
- s7: every Tặng quà / Cài đồ tile is locked by jptime («không còn ai rảnh để sai»). This is a real rule and was routed to MAIN 160.
- Fold: the confirm button sits below the box behind «Kéo xuống», the same as on LIVE. FAIL 2's fix (no inner scroll) should bring it closer.
- G4 80-dialog-fixed and the button crawl «Ô lưu · Lui» fail on LIVE 4cfcda61 as well.

CDN folder img/_review/picker-dom/ left as is (the worker re-shoots after the fix). Shots: reviewer scratch only, none in git.
