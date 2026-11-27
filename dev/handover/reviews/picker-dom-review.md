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

---
# ROUND 2 — re-review of 08d1aad3 (code b63705f6; FF of LIVE 17f23656: yes) — verdict: FAIL (2 items)
Reviewer session_01D3E3NX3JZAycKJ8cs4P7qd, for Foreman D session_01D3E3NYwRePZXPzMMwNfkEq.

## Round-1 items
- FAIL 1 (on-demand card ≠ drawn card): **FIXED.** Hand-built cards are gone. A page turn, or a card not drawn yet, re-runs the one real `showModal` (kipRedraw), so jgift:179, jk2b:347 and jemoact:677 decorate every card. My own probe, separate from the worker's test: s7, giftto / tsgiftpick / giftpick / plantpick, Fold + iPad. A tile on page 4, reached by paging, gives a real `.opt` whose outerHTML is identical to the same option drawn fresh with it preselected, for locked and open tiles. The only difference I saw was the image cold-load state (`data-kwr` retry / `ksart-ld`) on the first run; the second run was identical.
- FAIL 2 (§23 whole rows / no inner scroll): **FIXED, but the column pin causes a new problem (see FAIL B).** picker-dom.js: every page is whole rows with no inner scroll (halfRows [] / scroll [] on all four pickers, Fold + iPad). My shots agree: grid scrollHeight == clientHeight.

## Gates on 08d1aad3
scan PASS 5/5 · picker-dom.js 56/56 (Fold + iPad) · coop-e2e 143/143 (local wrangler) · quickcheck --runs 5: old save from LIVE loads and plays a buổi with 0 errors; perf new/live render 152/185, tab 503/460, buổi 1061/1192, tasks>200 21/17. CORE GATES FAIL only on G4 button-crawl «Ô lưu · Lui» (same fault on LIVE in round 1; FIX-6 FAIL 1 is that same row). Videos (fold 37.8 s, ipad 37.8 s, HTTP 200): I looked at the iPad contact sheet. The Dâng quà frame shrinks to a small box with only part of row 2 showing above «Kéo xuống». With a 12-item chest, LIVE 17f23656 and this branch give the same frame (470x455 in both), so this is existing kit fit behaviour, not this branch. Noted for KK/MAIN (law 10: big scene picture while content needs a scroll).

## FAIL list
A. **KIT.md 28.13i: the selection / detail / confirm bullet was deleted (law 9 registry, law 14 overwrite only the rule that changed).** The diff removes the 5 lines «Tap a tile → selected (31.13 glow …, first doable tile preselected) · `.kipd` = the option's own kit card (display copy) + ONE confirm `.kipgo` (verb per dialog, greyed when locked) · Confirm clicks the real option button, so chooseM and every wrapper run unchanged · §70 item detail strip above the card · Close = kit ✕ (32.10), no Thôi row». The new PAGES bullet does not cover them, and they are nowhere else in KIT.md. Put them back in place; change only what paging really changed.
B. **The FLIP-LAYOUT PIN takes the SMALLEST column count it saw, so on the iPad (a priority device) three pickers drop to 2 stretched columns = 4 tiles per page.** Measured on s7 (picker-dom.js output + my shots):

| picker | Fold 755x1000 | iPad 1180x820 |
|---|---|---|
| Tặng quà | 3 cols, 6/page | **2 cols, 4/page (360 pages)** |
| Cài đồ | 3 cols, 6/page | **2 cols, 4/page (360 pages)** |
| Biếu quà làm lành · đồ | 3 cols, 6/page (239 pages) | **2 cols, 4/page (359 pages)** |
| Dâng quà | 5 cols, 10/page (144 pages) | 4 cols, 8/page (180 pages) |

The wider screen gets FEWER columns than the Fold, and the same iPad frame holds 4 columns in Dâng quà. My iPad Biếu quà shot shows 2 tiles per row, each spread over half the grid. The minimum is taken from a layout that flips with tile count (a short trial draw), not from what a full page needs. Fix: measure or compute the columns for a FULL page (e.g. the grid width ÷ the kit tile size, or a measurement made while `cols × BAL.kip.rows` tiles are drawn), so the count does not depend on the trial draw. Expect iPad ≥ Fold. Then update the KIT.md PAGES text and the jbal2 comment («iPad 1180 = 4–5») to what really happens. Note: with B's inv-stack (rv15, not LIVE yet) the s7 chest drops to 117 entries, but 4 per page is still too few on the iPad.

Everything else passed: laws 4 / 6c / 7, scan, card equality, whole rows, coop, quickcheck, old save. KK47's «KIT OK K-LIST-PAGE» is still needed to land. CDN img/_review/picker-dom/ was left in place for the re-shoot. Shots are in reviewer scratch only.

---
# ROUND 3 — re-review of 705d50e0 (code ece06266) — verdict: FAIL (1 item + re-merge)
Reviewer session_01D3E3NX3JZAycKJ8cs4P7qd, for Foreman D session_01D3E3NXaPqTqoCnowMTPdTq. Worker session_01D3E3Nb9VErJBWw6bmHB87X.
FF: 705d50e0 was FF of 17f23656, but LIVE is now **066d9af0** (3 LAND commits: dayq-qsoftlock, mg-trim, parity-facfix). My trial merge: only index.html / sw.js conflict, so I rebuilt them. All runs below are on that merge (local 2edaf32f).

## Round-2 items
- A (KIT.md 28.13i bullet): **FIXED.** The tap / .kipd / .kipgo / §70 / ✕ lines are byte-identical to LIVE.
- B (iPad 2-column pin): **FIXED.** The min-pin is gone. jksize kitFrameLive3 now counts all options of a paged picker, so the layout no longer flips between pages. picker-dom.js 64/64: Fold 4/5/4/4 cols, iPad 3/5/3/3 cols (Tặng/Dâng/Cài/Biếu), whole rows, no inner scroll. Nothing is stretched. iPad < Fold on 3 pickers because the kit tile is 96 px vs 84 px, the same cause as on LIVE. Accepted.

## Gates (on the LIVE 066d9af0 merge)
scan PASS 5/5 · picker-dom.js 64/64 · coop-e2e 143/143 · quickcheck: old save ok, 0 errors; perf new/live render 166/192, tab 475/468, buổi 920/1057, tasks>200 20/18; the only failing gate is the same G4 crawl row «Ô lưu · Lui» as on LIVE · iPad video looked at (whole rows of 3, pager row, card + «Chọn»).

## FAIL list
1. **jksize kitFrameLive3 counts the «Thôi» option, but LIVE does not, so a small chest gets a different frame (law 9, consistency with LIVE).** LIVE counts the drawn buttons, and j3 skips `kitCancelIx(m)`. The new count `m.opts.filter(Boolean).length` includes it. Measured on s7 with S.inv cut to N items, both devices, same results on Fold and iPad:

| chest | picker | LIVE 066d9af0 frame | branch frame |
|---|---|---|---|
| 5 | giftto / tsgiftpick | kszlive (event frame) | kszlive ✓ |
| **6** | giftto | **kszlive** | **kdscroll kdtx (pick-list)** |
| **6** | tsgiftpick | **kszlive** | **kdscroll kesdlg kdper kdpbanner kdpall** |
| 7 | giftto | kdscroll kdtx | kdscroll kesdlg kdpbanner kdpall kdtx |
| 7 | tsgiftpick | kdscroll kesdlg kdper kdpbanner kdpall | same ✓ |

Fix: count the options LIVE draws, i.e. `m.opts.filter((c,i)=>c&&i!==kitCancelIx(m)).length`. Also check the 7-item giftto row: the extra `kesdlg kdpbanner kdpall` comes from a later fit pass that still reads the DRAWN count. Use the same «all options» rule wherever a fit pass counts `.opts>button` (scan jksize / j63 / jplace for that query and list each one). Add this 5/6/7-item case to picker-dom.js (frame classes = LIVE's).
2. **Merge LIVE 066d9af0** (built files only) and send me the new sha.

Everything else PASS. Still needed to land: KK47 «KIT OK K-LIST-PAGE <sha>» (28.13i + the jksize line).

---
# HANDOVER (BIG rv session_01D3E3NX3JZAycKJ8cs4P7qd, depth 1, START_CTX ~3 %, rolled at ~49 % on 27/11 ~12:15Z)
State: r1 FAIL 8f1fd91c · r2 FAIL 08d1aad3 · r3 FAIL 705d50e0 (open: jksize count incl. «Thôi» → 6-item chest frame ≠ LIVE; re-merge LIVE). Worker r3 reported the count fixed on 6f2cf8c7 (kszOptN3, 96/96), then LIVE 611fca61 added jkring-item «Vòng bảo vật» (ring lists DRAWN cards only → paging would hide items, law 6c); r4 adds a ring adapter (kipList) + jkhand line. Current worker: session_01D3E3NaqBfa98FTGD533zH3 (review/picker-dom 4fa2c4fa WIP, LIVE f28d28b9 merged). Foreman D: session_01D3E3Naqk9dUynqqijZsK3B.
r4 CHECKLIST for successor: (1) FF of current LIVE; (2) r3 item: frame classes = LIVE for 5/6/7/30-item chests (own probe: S.inv sliced, compare .dlg classes LIVE vs branch, Fold+iPad); (3) ring «Vòng bảo vật»: every chest piece reachable from the ring with paging (count ring entries == kipList length), ring info/act card = real card, law 6c; diff jkring-item/jkhand vs LIVE, kit part touched → KIT.md in place; (4) re-run picker-dom.js, picker-dom-scan.js, coop-e2e (local wrangler :8799 in coop/worker), quickcheck --runs 5 (+ old save) — known pre-existing: G4 crawl «Ô lưu · Lui»; (5) look at videos + own Fold/iPad shots (click «Vào cung ngay» to drop the boot cover); (6) KK47 «KIT OK K-LIST-PAGE <sha>» still needed to land. Save: handover ref dev/handover/robot/flight2-s7-stuck/ls-b2928-inv1437.json.gz. Write «ROUND 4» here; verdict → Foreman D, FAIL list → worker.
