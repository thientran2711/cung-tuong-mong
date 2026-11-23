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
- quickcheck: see last line below.

## FOR D (owner decides numbers; NOT changed)
1. jpetcare.js:33 Non-stage text «Sức +1 mỗi tuần» (BAL.eff.jpetcare.babySuc 1) but code applies max(babySuc, pet suc) → long lý vảy vàng gives 2.
2. j20.js:29 «được ban hiệu … ${chanceW(30)}»: jdh2 says the old 30 roll is gone (granted at once when she qualifies) → the odds word may be wrong.
3. j71.js:394 «hạng nhì hoặc ba: Danh +1 và quà nhỏ»: fxFin7 gives +1 only when she played the minigame; no «quà nhỏ» is given anywhere.
4. jkitpage.js:159 (kit demo) «Danh +2» vs fx {danh:1}.
5. «Học với Thái hậu … Thái hậu +3» (j23:31, j85:194): text + lessonMode th:3 both typed; «Thái hậu» is not in the stat-word family → next family (relation words).
6. Robot case «Thay hết nước, đồ ăn» (j68f:115): text is built from the card's own data; «Sức +6» not reproducible statically → repro save needed. Law 3 part FIXED (above).
7. j8:517 Ân xá fallback apply({duc:2}) still typed (live path reads BAL.ag.hh.pardonDuc); j24 apHost duc:2 typed in the rule table (text prints the table) — next family.
Not in this family, still typed (for a later job): durations «trong 3 tháng» (dress until+3), «2 tháng» (agiao fert), relation words «Thái hậu +N / thiện cảm +N» outside BAL.eff, J71.cost / ORD70.theodoi.bac module constants (text and rule share them, not BAL).
