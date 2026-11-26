# typed-stat-bal — law 4 typed «stat ±N» family (Foreman D, order MAIN 110 20:33Z 23/11)
PRIORITY #1 CHECK ('scan-typed-stat|typed stat'): OD 0 | ledger 0 | claims 1 (this job, D 20:50Z) | main 0 | review/* review/j51-heir-danh-rv (scan-typed-stat-text.py, taken) | archive 0. Reused: j1 sgRule/sgRuleArr/sgRuleObj tokens, jbal balSg/balAb, BAL.eff.* (jbaleff), one-core-text guard.

Branch review/typed-stat-bal, base LIVE origin/main 225c5c08, merged LIVE 72521d62 (= 948c80a5 + odds-ladder-words). Worker session_01964izBsY2xJwtJ9Zr9pzuF (opus) + 3 in-session helpers (groups A/B/C, separate worktrees, merged here).

## What
Every player text that TYPED «stat ±N» while its rule code typed the same number now prints ONE BAL value, and the rule reads that value. No applied value changed.
- Text in code: `${balSg(BAL…)}`; text in static tables (load before BAL): `{n:path}` token + sgRuleArr/sgRuleObj getter (j1; getter now has a setter so later modules can still overwrite a text; sgRuleObj skips getter texts so nothing reads BAL before jbal loads).
- Rule tables that load before BAL (j8 IT, j85 VIRB/ARTB85) are linked from BAL after it loads (BAL.itFx, BAL.virB, BAL.artB).
- Guard: NEW dev/test/typed-stat-text.js (acorn: string + template text only, no comments; ALLOW list with reasons) and dev/test/one-core-text.js now FAILS on any typed «stat ±N» (core gate G1) → the family cannot come back.
- Proof: dev/measure/typed-stat-same.js (+ typed-stat-same.d/a,b,c): loads new build and LIVE, dumps every touched table / rule result / text.

## Before / after (typed-stat-text, strings only; the old .py line scan said 353 incl. comments)
| group | files | before | after |
|---|---|---|---|
| items (worker) | j8, jinv | 32 | 0 |
| A arts | j85 94, j23 18, j83 9 | 121 | 0 |
| B events | j55, j71, jmen 12 · j78 11 · j92 10 · j72 7 · jaudit 5 · j4, j15, j42 4 · j7, j53, j54, j75, j99succ 2 · j3, j9, j20, j22, j24, j30, j51, j67, j70, j79 1 | 101 | 0 (+1 allowed) |
| C misc | jpet 13 · jkitpage 10 · jtsb 9 · jtabs 8 · jrcp 7 · jstip 6 · jpetcare, jts, jtoil 4 · jecon, jstatfx 3 · jface, jkc 2 · jkinl, jlost, jopic, jtruth 1 | 80 | 0 (+6 allowed) |
| **total** | | **334** | **0 typed, 11 allowed** |

ALLOWED (justified, in the guard): j75:103 night-gain RATE note («mỗi +1: Ân tình +1 …», a per-step unit of the nightGain formula, not an amount) · jkinl:95, jkitpage:63/64/159, jstatfx:66 ×3 kit sample page demos (fx:{} — no rule applies them; printing a real rule key there fails one-core-bind, a demo is not that option). MAIN 110 nit «jkitpage:64 Danh +10» = this ALLOW (kit keeper's demo).

## New BAL keys (all commented at their definition)
- jbal.js: BAL.itFx (j8 item w/use/dr, wear ngocboi/tuithom, veil).
- jbal2.js GROUP A block: BAL.virB, BAL.artB, BAL.ducF{mid,odds,shield,danger,betray}, BAL.eff.j85 (thi/hoa season Danh, theu Bạc, nau Sức/Ân, hạnh Đức, ducTf, ducStaff, caughtDanh), BAL.eff.j23.camSucMonth, BAL.eff.j83 (ill buy Danh/Đức).
- jbaleff.js GROUP B block: eff.j55, j71, j30, j78 (incl. tieuhuy {aff,oan,cap}), j92, jmen, j42.ord, j4.danhWin, j54.tinh, j7.comet/cane, j9.ducPushPond, j99succ costs/Danh.
- jbalarc.js GROUP C block: eff.jface.penQuy, eff.jpet, eff.jpetcare, eff.jrcp, eff.jts, eff.jtsb, eff.jtoil, BAL.petFx, BAL.itFx extras (jkc/jstip pieces), BAL.artLes (lesson Sức).
- Many existing keys reused (BAL.eff.j8.*, art.stUp/danh, td.selfSuc/mSuc, house.*, kid.heirDanh, ag.hh.pardonDuc, …).

## BAL.rl (one-core-bind)
one-core-bind binds a BAL.eff key to the option that shows it. 23 amounts are applied AWAY from the card that shows them (monthly ticks, deferred night / contest results, pet table, Đức help panel, AOUT previews of a later rule): they moved BAL.eff → BAL.rl (jbalarc.js end, same values, comment per module): j85 hanhDucMonth/ducTf/ducStaff · j83 ducIllBuy · j42 sucSrvMeet, ord · j71 danhCRun7/_2, danhBrbTick7, danhFxFin7 · j8 hit, ducGo, danhGo_2 · j92 danhWdFrameResolve/_2 (bind called it a SWAP; checked j92:336/338/345 — the printed keys are right) · jinv danhTop · jmen danhTop_2 · jpet danhPetMonthOf/_2, sucAsthma, followN · jstip sacUse · jface penQuy. Every reader (incl. local aliases, j85 v85Month) reads BAL.rl.

## Same values (typed-stat-same vs LIVE 225c5c08)
503 rule tables, **0 rule diffs** (final build 2942f0b1: 0 rule / 5 text diffs; earlier 3 runs; one run showed A.v85Month all-empty on the NEW side = the probe's seeded character was dead at that moment, v85Month returns early; the 2 other runs 0 diffs). Text diffs, all explained:
- IT.aolong / IT.vaibong: jwdinv picks the dress name with Math.random → differs on every load (same on LIVE vs LIVE).
- A.ARTFX / v85Table cam·ky·vu: LIVE showed the «mở …» card line twice (bậc 2 and bậc 3); now once (the setter added to sgRuleArr keeps jbalcore's rewrite).
- A.artTab: teacher fee is random per load (Bạc -3/-4), same on LIVE vs LIVE.
- C.kitPgEvOpts (kit sample page): the demo now prints the real j8/j4 option values (Danh +3→+5, Sủng -4→-3, Danh +10→+5).

## Law 3 fix (MAIN 111 21:33Z ruling, numbers ours) — the ONE intended value change
| card | before | after |
|---|---|---|
| j68f:115 poisonedFish «Thay hết nước, đồ ăn» | c {Bạc -10, Sức -2} · w {Sức +2} → Sức cancels, pure cost | c {Bạc -10} · w {Sức +2} (BAL.eff.j68f.fishSwapBac / fishSwapSuc) |
Family scan NEW dev/test/c6-cancel-scan.js (every c6 card: cost and win of the same stat that cancel or do not beat the cost): whole game 1 → 0; run in core gate G1 (coregates.sh).

## Gates
- typed-stat-text 0 typed (7 allowed) · one-core-text PASS · one-core-text-rule PASS · law4-typed 0 · one-core-guard PASS (inline numbers 3521 → 3134, baseline 3592, 0 fails, no key set twice).
- typed-stat-same vs LIVE 72521d62: 503 rule tables, 0 rule diffs, 4 text diffs (the «mở …» double line, explained above).
- c6-cancel-scan 0 · one-core-bind PASS.
- QUICKCHECK PASS · 225 s · open 1718 ms · old save ok · perf (median of 3, new/live): render 276/235 ms, tab 476/425 ms, buổi 1129/1068 ms, tasks>200ms 20/22 · core gates PASS.

## FOR D (owner decides numbers; NOT changed)
1. jpetcare.js:33 Non-stage text «Sức +1 mỗi tuần» (BAL.eff.jpetcare.babySuc 1) but code applies max(babySuc, pet suc) → long lý vảy vàng gives 2.
2. j20.js:29 «được ban hiệu … ${chanceW(30)}»: jdh2 says the old 30 roll is gone (granted at once when she qualifies) → the odds word may be wrong.
3. j71.js:394 «hạng nhì hoặc ba: Danh +1 và quà nhỏ»: fxFin7 gives +1 only when she played the minigame; no «quà nhỏ» is given anywhere.
4. jkitpage.js:159 (kit demo) «Danh +2» vs fx {danh:1}.
5. «Học với Thái hậu … Thái hậu +3» (j23:31, j85:194): text + lessonMode th:3 both typed; «Thái hậu» is not in the stat-word family → next family (relation words).
6. Robot case «Thay hết nước, đồ ăn» (j68f:115): text is built from the card's own data; «Sức +6» not reproducible statically → repro save needed. Law 3 part FIXED (above).
7. j8:517 Ân xá fallback apply({duc:2}) still typed (live path reads BAL.ag.hh.pardonDuc); j24 apHost duc:2 typed in the rule table (text prints the table) — next family.
Not in this family, still typed (for a later job): durations «trong 3 tháng» (dress until+3), «2 tháng» (agiao fert), relation words «Thái hậu +N / thiện cảm +N» outside BAL.eff, J71.cost / ORD70.theodoi.bac module constants (text and rule share them, not BAL).

---
# REVIEW (reviewer session_01964izEPKE9ZyzururowDAA, opus, brief D-typed-stat-review.md) — branch review/typed-stat-bal-rv
PRIORITY #1 CHECK ('scan-typed-stat|typed stat'): OD 0 | ledger 0 | claims rv EPKE9Zyz (this) | main 0 | review/* review/typed-stat-bal (target 37264f7d) | reused: typed-stat-same, typed-stat-text, c6-cancel-scan, quickcheck, coop-e2e, dlg harness pattern (dev/test/dlg-clip.js).
Base: 37264f7d (already holds LIVE 72521d62 = newest origin/main at verdict time; no final merge needed, LIVE unchanged).

## Laws touched
- Law 4 ONE CORE: PASS after reviewer fix (below). Law 3 GAIN-AND-LOSS: PASS (poisonedFish). Law 11 WHOLE GROUP: FAIL as delivered (stat words «Ân tình» / «Tâm cơ» missing from the scan) → fixed here. Law 9 KIT: no new UI part. Law 7 wording: no % / no new odds words. Law 12 devices: shots at Fold 755x1000@2 + iPad 1180x820@2.

## 1. Same values
- typed-stat-same vs LIVE 72521d62, 4 runs: 503 rule tables, 0 rule diffs in 3 runs; 1 run showed A.v85Month new-side all-empty = the known probe flake (v85Month returns early when the probe's seeded character is dead, j85:148 `if(!S||S.dead)return`), not a value change. Text diffs only random dress names (IT.vaibong/aolong), random teacher fee (artTab), the «mở …» double line now once (A.ARTFX / v85Table cam·ky·vu), random illAsk «Mua tin» extra line.
- 31 random moved numbers read both sides (old literal ↔ new BAL key value, BAL loaded): 29 equal; tw.g.ky.1 = 1 (lives in BAL.tw, equal; node loader just lacked it, in-browser [3,1]); **art.danh.5 = 8 vs old j23 text «Danh +6»**: the LIVE text lied — j2 addArt applies BAL.art.danh[5] = 8 at bậc 5 → now the Kỳ/Thi/Họa tier-5 text prints 8 (text correction, rule unchanged; not in the worker's text-diff list because typed-stat-same does not dump the j23 table).
- Every {n:/sg:/sgRaw:} token in the build (109) resolves to a number in the page; 0 token leaks in IT/ARTB/ARTFX/VIRB/pet/… tables.
- No BAL key clash: one-core-guard «no key set twice» PASS (841 keys).

## 2. Guards
- typed-stat-text.js runs inside one-core-text (G1) and FAILS on an injected «Danh +4, Sức −2» (tested); c6-cancel-scan in coregates G1 FAILS on the old fish card (tested). one-core-text / -bind / -text-rule / -guard / law4-typed / c6 all PASS.
- 11 ALLOW: all kit sample page demos (jkinl, jkitpage ×6, jstatfx ×3) + j75 night-gain rate note — justified. Nit: ALLOW regexes match the whole string, so another typed amount added to the SAME string would pass; acceptable for demo strings.
- **FOUND (law 11)**: the guard's stat word list lacked the player's own stats «Ân tình» (S.an) and «Tâm cơ» / «Tai mắt» → 7 more typed «stat ±N» texts whose rules typed the same number. **Fixed by reviewer (commit 63312219), same values**:
  | site | before | after |
  |---|---|---|
  | j8:354 «Xin tha cho cung nữ bị phạt» | «Ân tình +1» / S.an+1 | BAL.eff.j8.anGoMaid (1) both sides |
  | j8:357 «Im lặng, tựa vai ngài» | «Ân tình +2» / S.an+2 | BAL.eff.j8.anLean (2) |
  | j31:20 «Thức đón giao thừa bên ngài» | «Ân tình +2» / +2 | BAL.eff.j31.anGo_4 (2) |
  | jts:328 summon hộ giá | «Ân tình +3» / +3 | BAL.eff.jts.anOnDone (3) |
  | jaudit:87 AOUT.spy (card target) | «Tâm cơ +2» | BAL.eff.j8.spyTam (2, the key j17 base preview already prints) |
  | jecon:192/176 «tự đi nghe ngóng» | «Tâm cơ +1» / ap tamco:1 | BAL.rl.jecon.spykTam (1) both sides |
  | jpet:26 uyên ương | «Ân tình +2» typed beside anN:2 | «Ân tình {anN}» getter prints the table's own anN (same pattern as {sungN}) |
  Guard STAT now includes Ân tình / Tâm cơ / Tai mắt → typed-stat-text 0 typed (12 allowed). Not done (next family, as the worker listed): NPC relation words «ghen +N / thiện cảm +N / oán +N» (j2:167, j7:192, j24:17, jts:273, jpet:194, jaudit:92/175) and j67:1142 «Thi +1 bậc».

## 3. Law 3
poisonedFish «Thay hết nước, đồ ăn»: c {Bạc BAL.eff.j68f.fishSwapBac −10} · w {Sức BAL.eff.j68f.fishSwapSuc +2}. In play jbac fair-price lowers the bạc to −5 and raises the win (2 → 6); runtime check ranks 0/3/6: shown «Sức +6» == applied +6, fx {bac:−5}. Gain + cost, no cancel. PASS.

## 4. Saves / co-op / perf / shots
- QUICKCHECK PASS on 63312219 (core gates PASS incl. rules-one-source + kit-conform, time-spill PASS, old save loads + plays a buổi, 0 page errors). Perf: see verdict line.
- coop-e2e: 141/141 passed.
- Shots (scratch, not in git) Fold 755x1000@2 + iPad 1180x820@2, 3 changed cards: (a) poisonedFish dialog — «TỐN Bạc −5 · ĐƯỢC dưỡng sức»; (b) Kỳ rule table (art tokens) — «Tài +2, Tâm cơ +1 … Danh +8»; (c) Yến sào item card — «Sức +15 · Sắc +1». No {…} token leak, no «undefined/NaN», no horizontal overflow, 0 page errors.
- PRE-EXISTING (same on LIVE 72521d62, not this branch): Fold 755 rule-table tier rows (v85Table «Năm bậc») — the left label «Bậc N · … · NN phần» overlaps the right value text. → kit keeper / MAIN (law 9/10).

## Robot rows (Foreman D 22:26Z ask)
- «Thay hết nước, đồ ăn | Sức +6» vs fx suc −2: FALSE POSITIVE — the shown +6 is the (fair-price-raised) win and is what applies; −2 was LIVE's Sức cost (now removed, law 3). The robot compared a sure option's win text (no «thành:» marker, c6 prints wins bare when there is no roll) with the cost fx.
- «Đặt cược … thắng: Bạc +50/+60» vs fx bac −20: FALSE POSITIVE — fx −20 is the stake, «thắng:» win = BAL.eff.j31.bacGo / BAL.eff.j7.bacGo applied on the roll. Robot should treat «thắng:» like «thành:».
- «Bạc −6» vs fx −35 / −17: FALSE POSITIVE — «đi kiệu hết Bạc −6» is the weather-risk note; BAL.wx.kieuBac is charged separately after the outing (jweather wxAfter), the fx is the option's own price.
- Perf (clean re-run, median of 3, new/live): render 220/272 ms, tab 409/360, buổi 1211/2702, tasks>200ms 19/24, playable 5616/5723 ms — on par (first run under load showed playable 7.5 s, noise).

## VERDICT
REVIEW PASS — LAND READY review/typed-stat-bal-rv (sha in the message to Foreman D; = this commit). Includes reviewer fix 63312219 (Ân tình / Tâm cơ family, same values). LIVE 72521d62 is an ancestor. Shots kept in scratch only (none in git / CDN).
For D/MAIN: (1) pre-existing Fold rule-table tier-row overlap (kit); (2) next law-4 family: NPC relation words «ghen / thiện cảm / oán +N», j67 «Thi +1 bậc»; (3) robot10 number check: treat «thắng:» as a win marker, bare sure-win texts, and the weather «đi kiệu hết Bạc −N» note.
