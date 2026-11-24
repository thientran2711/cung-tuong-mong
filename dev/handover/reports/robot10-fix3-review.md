# E81r — robot10-e-fix-3 **r3 f0a5f92c** — verdict: **FAIL f0a5f92c (1 item)**
Merge with LIVE: review/robot10-e-fix-3-r **183fb7e9** = f0a5f92c + origin/main 178cac37 (4593b922, index.html/sw.js rebuilt) + 1 reviewer test fix. Carries over everything checked on r2 below (r1 faults gone, old-save no-loss 11 724 → 11 724 usable / 6 440 → 6 440 lasting, save-size, allotment, ration = LIVE, role-parity ×2).
## Remaining item
1. **Law 1 — r2 item 2 is NOT addressed in r3.** S.il.stock re-issue is still NPC-only (jstip stipGoods `p!==S`), and a re-issued bottle can be part-used (stock keys aldau*.2/.4), so an NPC's monthly oil can hold fewer lượt than hers. One rule for all: her issue also draws from the stock (host-side, fullest first), or the stock re-issues only full bottles (part bottles leave another traceable way).
## r3 delta — PASS
- r2 item 1 (silent save writers) FIXED: one saveBlocked() in j6 used by j6 save, jcloud writeSlot (LS.set false → told), jcoopworld snapSave (refused local write told, seatPush now always runs), jcoopthine guest copy. My grep agrees with r10e-savewrite-scan: save writers 5 · silent 0 (all other setItem keys are settings / caches / co-op timers).
- r10e-saveblocked: on f0a5f92c AND on the merge it FAILED «the notice is on screen» here 3/3 — the loaded year-14 life opens a «Bộ sưu tập» dialog and the kit holds the chip in the bell (red dot, kitNoticeList has saveBlocked) while a dialog is up; after closing it the chip shows (looked, Fold 755x1000: «Không ghi được sổ (chỗ cất trong máy bị chặn hoặc đã đầy).» in the HUD bar). Reviewer fix 183fb7e9: the test closes that dialog before looking → ALL OK.
- quickcheck on the merge: PASS (core gates PASS, old save ok; perf new/live render 204/185, tab 420/358, buổi 1269/1274).
- coop-e2e: not re-run on the merge — LIVE 178cac37 itself fails at week 0 (see r2 note); FIXER #3's 142/142 ×2 is on its base.

---
# E81r — BIG REVIEW robot10-e-fix-3 **r2 434a4a30** — verdict: **FAIL 434a4a30 (2 items)** (r1 faults 1+2 are gone)
PRIORITY #1 CHECK ('ilUsedUp saveBlocked save size ilStock'): OD 0 | ledger 0 | claims FIXER #3 only | main 0 | review/* only review/robot10-e-fix-3 | archive 0.
Merge with LIVE: review/robot10-e-fix-3-r **a9dbd78b** = 434a4a30 + origin/main 178cac37 (index.html/sw.js rebuilt; replaces the r1 merge 75ef5d60). Reviewer E81r session_01DgYSWnaebLfT2YjJ9ZWjc8.

## r2 verdict items
1. **Silent save writers still there (r1 item 3, not in r2).** jcoopworld.js snapSave (co-op world snapshot «ctm-coop-wk»; a refused setItem also skips seatPush), jcoopthine.js:203 (guest's own life copy ELS()), jcloud.js writeSlot (LS.set false ignored). Each must show the same kit notice CTM_WAIT.saveBlocked (id "saveBlocked", once), and snapSave must still seatPush when the local write fails. Foreman E sent this to FIXER #3.
2. **Law 1 (one rule for her and NPCs): re-issue from the counted stock is NPC-only.** jstip stipGoods takes a candle / oil from S.il.stock only when `p!==S`; she always gets new pieces. And a re-issued bottle can be part-used (stock keys aldau*.2 / .4 exist — in save 010 the moved stock holds 246 bottles with 2 lượt and 680 with 4), so an NPC's monthly bottle can hold fewer lượt than hers (law C: same count by rank). Pick ONE rule for everyone and say which: (a) her issue draws from the stock too (host-side, same fullest-first rule), or (b) the stock re-issues only full bottles / tops a part bottle up to BAL.allot.oil.uses, with part bottles leaving another traceable way. No new BAL number unless it sits in BAL.

## r1 faults — checked gone
- No piece with uses left is marked used up: the two trims (jstip:104, jallot:110) now call ilStock (counted stock), ilUsedUp only at true spends (alNpcSpend / toilette oil / lxSpend / lxNpcSpend at u≤0, alLight candle, lxGive whole rest). My own grep of every splice of al*/lx* in jallot / jration / jstip / jil / jrcv agrees with the fixer's 10-site scan (0 unmarked).
- Old-save move (ilOldMove): spent → S.il.used[owner], uses left → S.il.stock, her pieces with uses left and son phấn boxes with lượt keep their records, logged in S.il.conv. «net» records are counted spent (e0 has no lượt; every unguarded splice is a spend site) — accepted.

## Gates (a9dbd78b unless noted)
| gate | result |
|---|---|
| old-save no-loss, MY script (save 010, load → census/week/census) | usable al/lx pieces (held by anyone + store records + counted stock) **11 724 → 11 724, 0 item mismatches**; lasting pieces 6 440 → 6 440 over 82 owners (only 2 store→NPC returns by the normal weekly resale); 4 386 spent records → S.il.used; 10 354 → S.il.stock; S.il.conv [[482, 4386, 10354]]; box 15 923 → 1 180; save 4 346 314 → 2 772 347 chars, written to localStorage, reloaded (stock + conv kept), 0 page errors |
| r10e-save-size, save 010, +1 game year | LIVE 178cac37: 4 339 545 → 4 641 521 (+302 k/yr), used-up records in store 14 740 → 15 532 (exit 1) · r2: → slim load → 2 940 347 at year 15, store 1 270 records, used-up in store 0 (exit 0) |
| fresh life (NEW=1, 3 years) | 70 172 → 1 183 808 chars at year 4; store 225 records, 0 used-up in it (the remaining growth = fixer §7 families, MAIN's call) |
| quickcheck | PASS (core gates PASS, old save ok; perf new/live render 192/169, tab 354/408, buổi 1086/1254 ms) |
| monthly-allotment | ALL PASS 38/38, = LIVE |
| monthly-ration | same 3 FAIL on LIVE 178cac37 and on r2 («mirror rows = owned colours», «mirror note + rush», dice «borrowGot») → pre-existing, confirmed |
| role-parity ×2 | ALL PASS ×2 |
| coop-e2e (Fold host; COOP_SWAP iPad host) | r2 merge: 134–137/162 and 29/41 — stuck at week 0 with 8 new-life dialogs in Q (Tiền truyện 1/4…4/4, kc2Sel, Nhập cung, Mệnh truyện, Hảo hữu vào cung). **LIVE 178cac37 fails the same way** (same FAIL rows, Q 8) → a LIVE regression on main since fd85907a, not fix-3 (FIXER #3 had 142/142 ×2 on base fd85907a). Reported to Foreman E. |
| saveBlocked notice (j6 unchanged since r1) | Fold 755x1000@2 + iPad 1180x820@2 looked in the r1 round: kit notice chip, readable, not cut |
| law 4 / 9 / 7 | no BAL number typed, no kit part, no new player words |

---
# E81r — BIG REVIEW robot10-e-fix-3 e1ee6041 — verdict: **FAIL e1ee6041 (3 items)**
PRIORITY #1 CHECK ('ilUsedUp saveBlocked save size'): OD 0 | ledger 0 | claims 0 (FIXER #2 session_01DgYSWmqVHbtQnrFEo7E9r6 only) | main 0 | review/* only review/robot10-e-fix-3 | archive 0. Owner rows read verbatim: OD 18/11 ~16:20Z (law 6, real objects «không được tự nhiên biến mất, không thể tìm thấy»); no OD row on «monthly allotment» / «ration» wording beyond that.
Reviewer: E81r session_01DgYSWnaebLfT2YjJ9ZWjc8 (opus). Merge with LIVE: review/robot10-e-fix-3-r **75ef5d60** = e1ee6041 + origin/main ac4790f0 (only index.html/sw.js conflicted → rebuilt). Not land-ready (FAIL).

## Verdict items (for the fixer)
1. **Law 6c — usable pieces are marked «used up» by the surplus trims.** ilUsedUp is set on pieces that are NOT spent: jstip NPC surplus trim (jstip.js:104, every `al*` beyond npcKeep×3 — whole, never-lit candles and hair-oil bottles with lượt left) and jallot alStaffGive keep trim (jallot.js:110, staff oil bottles — staff never spend oil — and lx boxes with lượt left). Evidence (nc-B-tuc save 010, year 14): the store's «kho» al pieces, which all came through these trims on LIVE, are **8 210 whole candles** and **2 144 oil bottles with lượt left** (u=6: 1 218 · u=4: 680 · u=2: 246; only 533 are u=0). On fix-3 these now vanish every month instead of being stored. The brief's rule: ilUsedUp only when the piece is truly spent to zero. Fix direction (check OD before choosing, law 16/17): a piece leaves as «used up» only through a real spend (oil u→0, a candle burnt by alLight); the NPC/staff surplus must either be really spent by a two-way rule with a BAL number (law 1 + 4: e.g. NPC evening candle burn like hers, staff oil use) or go back to the Nội vụ phủ store as real stock that Nội vụ phủ issues FROM before making new pieces (the store then stays bounded — the size goal still holds). The 4 truly-spent sites are correct (alNpcSpend u≤0, her/NPC toilette oil u≤0, alLight candle, lxSpend / lxNpcSpend u≤0, lxGive whole-rest → copy g carries the uses).
2. **Old-save cleanup takes out usable pieces.** ilUsedStock (jil.js:28) returns true for EVERY `al*` piece in the store with why kho/net, whatever its lượt (the `!(e.u>0)` test is only applied to lx). Measured on save 010 (load → ilCensus/ilWeek/ilCensus): removed 2 144 oil bottles with lượt left + 8 210 whole candles (kho) + 72 netted candles (her 50, NPC 22). Brief: «old-save cleanup only takes out pieces that are really used up (a box with uses left stays)». Keep usable pieces (handle them by item 1's store route); remove only oil/lx with u≤0.
3. **Silent save writers left (brief: «j6 save() no longer fails silently anywhere»).** Game-state writes that still swallow a refused setItem: jcoopworld.js:1143 snapSave (co-op world snapshot «ctm-coop-wk»; when setItem throws, seatPush is ALSO skipped — the seat copy stops too), jcoopthine.js:203 (guest life copy ELS()), jcloud.js:56 writeSlot (cloud copy into a slot; LS.set returns false, ignored). All three must raise the same kit notice CTM_WAIT.saveBlocked (and snapSave must still seatPush). The other ~45 setItem sites are prefs/UI memory (tab, filters, tutorial, counters) — fine silent. j16 «Ghi vào ô» already shows saveBlocked.

## What PASSES (keep)
- j6 save() catch → kitNotice({id:"saveBlocked",line:CTM_WAIT.saveBlocked,sticky}) — kit notice, existing words «Không ghi được sổ (chỗ cất trong máy bị chặn hoặc đã đầy).» (VANPHONG ok, no %, no number), dedupes by id (one chip). Shots (quota forced, year-14 save loaded) Fold 755x1000@2 + iPad 1180x820@2: LOOKED — chip in the kit notice bar, readable, not cut, no overflow. (Minor: kitNotice pushes NT.log on every refused save — in-memory only.)
- No BAL number typed (law 4); no UI/kit part added (law 9); NPC and her spend sites follow one rule (law 1) for the truly-spent cases.
- ilUsedUp + IL_USED cleared per census: correct; S.il.at is unsaved so a reload is clean.

## Gates (on 75ef5d60 unless noted)
| gate | result |
|---|---|
| r10e-save-size.js, save 010, 1 game year | LIVE ac4790f0: 4 339 545 → 4 634 636 chars (+295 k/yr), box 15 923 → 17 042, used-up in store 14 740 → 15 689 (exit 1) · branch: 4 339 545 → 2 973 631, box → 920, used-up → 0 (exit 0). The drop is mostly items 1–2 (usable pieces deleted). |
| old-save load (save 010) | loads, no page error, cleaned save 2 768 436 chars written to localStorage and reloaded OK (year 14). Per owner before→after: her lasting 723→723, oil+ 140→140, candles 391→391, lx+ 109→109; NPC lasting 4 743→4 750 (store returns); staff unchanged; store kho: candles 8 210→0, oil+ 2 144→0, oil0 533→0, lx0 3 648→0 → see item 2. No lasting (non-al/lx) piece lost for anyone. |
| quickcheck | PASS (core gates PASS, old save ok; perf new/live render 202/177, tab 348/365, buổi 2093/1055 — tests ran in parallel, noisy) |
| monthly-allotment | ALL PASS (38/38), same as LIVE |
| monthly-ration | the 2 FAIL «mirror rows = owned colours», «mirror note + rush» are ALSO on LIVE ac4790f0 (pre-existing, confirmed). Branch runs also showed once each «goods» / «borrowGot» — dice items (unseeded test), not repeatable across 3 runs |
| item-ledger.js | crashes at the same step on LIVE and branch («Cannot set properties of undefined (setting 'ret')») — pre-existing stale test, confirmed |
| role-parity ×2 | ALL PASS ×2 (exit 0, 0 page errors) |
| coop-e2e ×2 both seats | NOT run: the verdict is decided by items 1–3 (design); run on the next round after the fix (jil/store are shared world) |
Shots: scratch only (/home/user/wt/r81x/nb-fold.png, nb-ipad.png), nothing uploaded to CDN, deleted with the worktree.
