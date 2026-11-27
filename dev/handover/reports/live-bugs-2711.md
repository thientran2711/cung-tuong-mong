# live-bugs-2711 — D-LIVEBUGS3 (MAIN 170 ORDER 03:35Z items 2–4)

Worker session_01D3E3NaQmER5L5YvwZtcRwY (opus, depth 3, START_CTX ~3 %) for FOREMAN D session_01D3E3NXaPqTqoCnowMTPdTq. Branch **review/live-bugs-2711** (from LIVE 0b43ee55 = 17f23656 + mg-trim).

PRIORITY #1 CHECK: OD MAIN 170 ORDER 03:35Z items 2–4 + F ROOT #2 03:06Z/03:12Z; F older lines on the same family (gift picker 13:03Z/13:37Z/15:30Z/18:27Z/21:34Z 26/11, «c is not defined» FOR MAIN 168 00:45Z, «Ban hoa at b1» 161/166/01:33Z) | main: undef-scan.js exists (reused) | review/picker-dom ece06266 (pager/DOM — NOT touched: jgpick.js unchanged), review/selx-fair-lr5 c72de843 (cut line; reused for (c) ruling) | claims D-LIVEBUGS3.

## (b) «sx is not defined» — FIXED (whole family)
Root: kitRiskOpt risk lambdas `()=>(x?rp():0)` / `()=>BAL…+x.af/…` read a family member (`sx`, `ly`, `to`, `c`, `d`) that is declared only INSIDE the option's go closure → ReferenceError when the card draws its odds. Same family as F «kcCard c is not defined» (FOR MAIN 168).
Fix: those lambdas read the member at call time via `kcR(role)` (jkc.js tudg/tranhmoi/gianhan×2, jkc2.js d_thue/n_benh/n_le + tranh muội «Tâu với phụ thân»).
Scan (law 11): `python3 dev/build/assemble.py && node dev/test/undef-scan.js` (ESLint no-undef over the assembled game).
| | names flagged (unguarded) |
|---|---|
| LIVE 0b43ee55 | 5: to, c (×2 sites), d (×2), ly, sx (×2) → FAIL |
| fc6d0ad3 | 0 → PASS (330 names checked; only known PIXI/PCOL/mkPart) |

## (a) Gift picker «326 items, every confirm disabled» — FIXED (whole item-pick family)
Root (data, not pager): the item pick dialogs listed EVERY chest entry and greyed the ones she can never pick there, so a long life shows hundreds of dead tiles (the jgpick tile does not grey `tsDis`/`need` entries either, so they look pickable):
- «Biếu quà làm lành» (PEND.tsgiftpick): every piece, also those not worth BAL.tsGift.bac to her (stipend pieces from:'noivu' sell at BAL.stip.resell → never enough).
- «Tặng quà» by hand / «Cài đồ vào rương» (jptime giftpick/plantpick wrappers): when no servant can be sent (bestSent null: none / not trusted BAL.tinLv.send / all out), EVERY tile locked → nothing can be given (= s2f «none of 686 givable», s14 «every confirm disabled»).
- «Dâng quà» Thái hậu (giftto): pieces she cannot offer listed locked.
Fix: only what she can give there is a tile; one kit text line (`<p class="past">`) says how many are left and why (giftRestNote/giftWhyTop in jgift.js; ptNoSentWhy in jptime.js gives the TRUE reason: none / not trusted / out on errands). No rule, number or wording of options changed; jgpick (picker-dom) untouched.
Scan: `node dev/test/gift-dead-scan.js <save.json> [root]` (new), F/handover save fixture y14-ncBtuc-010 (1357 chest entries):
| picker | LIVE 0b43ee55 tiles / can pick / DEAD | fc6d0ad3 tiles / can pick / DEAD |
|---|---|---|
| Tặng quà (giftpick, to the most hostile) | 1357 / 0 / 1357 | 0 / 0 / 0 (reason line) |
| Dâng quà Hoàng thượng | 1357 / 1357 / 0 | 1357 / 1357 / 0 |
| Dâng quà Thái hậu | 1357 / 1250 / 107 | 1250 / 1250 / 0 |
| Cài đồ vào rương (plantpick) | 1357 / 0 / 1357 | 0 / 0 / 0 (reason line) |
| Biếu quà làm lành · đồ | 1250 / 207 / 1043 | 207 / 207 / 0 |
| Biếu quà làm lành · tác phẩm | 107 / 3 / 104 | 3 / 3 / 0 |
| Biếu quà làm lành · cả hai (old save) | 1357 / 210 / 1147 | 210 / 210 / 0 |
Still big lists (207 / 1357 genuine tiles) = unstacked chest → picker-dom pager + B inv-stack (not this branch).
QUESTION for D/MAIN (law 16, not changed): «Tặng quà» by hand never falls back to her maid when no servant can be sent (ptRunner does for other errands). Rank-0 lives with no trusted servant can never gift by hand. Allow the maid as carrier?

## (c) 2nd «Ban hoa at b1» (s16b) — SAME family as the known board-quit ticket; ruled outcome, NOT a game odds fault
Trace (robot/flight2-s16b-moments.md): days road → Thái hậu đối đáp → Hoàng thượng card → «Pha một chén trà dâng lên» → board huong **2/10 moves, raw 0.00** → «Quay lại» → hành xử card → contest → «Bị ban hoa». The mini-game mark weighs ½ of the selection (OD:L2304 «her result = her own play»); raw 0 = bottom → out; ban hoa ends the life (OD:L2301). Not the «Cúi đầu chờ xét / Rất vững» case of FOR MAIN 161 (no-board option). Cause = harness board-idle quit (F job 8 / D-KG82PHASE «kg82 never leaves play»), same as E-S1/E-S8 «BOARD 2 moves → Quay lại → ban hoa». Per FOREMAN E ruling 26/11 13:23Z («ending right after an unclear/short board = NOT counted») s16b should be **INVALID**, not VALID 33914859. Odds word: selxOddsP is the chance at her own level (entSkipRaw) on the same contest code — consistent (law 7); a quit board is not her level.

## Gates (fc6d0ad3)
- undef-scan PASS · gift-dead-scan PASS (0 dead) · d19-gift: my check PASS; 2 PRE-EXISTING fails identical on LIVE: item road «Được: bớt oán 5» but oán unchanged (law 7 mismatch candidate, stat-pace oanAdd/spG — not this branch) + one random flake (Fold card overflow / NPC piece refused) · scenes3 exit 0 · gift-pick-scan ok.
- quickcheck run 1: old save ok; G4 «Ô lưu · Lui» = known LIVE fail; perf longTaskMaxMs 2893 vs 1501 (one long task) → rerun --runs 5: QUICKCHECK PASS · old save ok · perf median of 5 new/live render 214/213, tab 514/596, buổi 1329/1169 ms, tasks>200ms 27/28; only the known LIVE G4 «Ô lưu · Lui» core-gate fail.
- coop-e2e (alone): run 1 142/143 (week 2 fold advanced = known co-op week flake), run 2 143/143.
- Shots Fold + iPad before/after (y14 save): CDN img/_review/live-bugs-2711/ (before-*/after-* × bieuqua-it / tangqua / dangqua-th). Looked at.

## SẴN SÀNG KIỂM: review/live-bugs-2711 fc6d0ad3
Worktree removed after push. Rollover not needed (ctx well under START_CTX+25 %).
