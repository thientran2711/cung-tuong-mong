# review-sg-card — FAIL (round 1)

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (foreman brief) · re-grepped origin/main + review/* for sgTxt / sgStat: only review/sg-card · rules read: START_CORE + START_WORKER + START_REVIEWER, reports sg-card.md + rv-kit-opt-kem.md
Reviewer: opus (BIG), session_01964izEETgRxuNCdo5Vn7U2, Foreman D #15. Branch reviewed: review/sg-card @ 03efb828 (base kit-opt-kem-rv e09fd19a).
Merged with LIVE: review/sg-card-rv @ 7786935c = 03efb828 + origin/main e391b85f (index.html/sw.js conflict → took LIVE, rebuilt). Pushed, NOT land ready.

## What holds (verified)
- sg-card-scan.js on 03efb828 and on the merged 7786935c: PASS (SG family 0, 65 options, unit cases pass). The walk does read the RENDERED
  card (dilLine → kitParse rows) against the real apply(c.fx)+c.go(). 104/253 dialogs built; undrawn-with-Sủng list = the 11 + cyrep, kcco (new from
  LIVE). Re-checked by hand: coldvisit, wdframe, wdnt, j97x, rtKid, htban, tsbPetGift/Hunt, vuoan, kcco: her card Sủng applied by apply() (sg) ✓;
  rtBm / rtNgNpc «<Tên> Sủng» NPC raw (v.sung+=) and left raw ✓; cyrep «mừng hụt Sủng -3», «bị soát ra Sủng -6» applied by apply ✓ (seen rescaled live).
- Idempotent / no double scale: sgTxt skips NBSP-marked numbers; fmt/fx6/wkGainTxt use sgStat; no other `Sủng ${…sg(…)}` template in dev/build.
  No x-text Sủng of hers is applied raw (only raw S.sung writers: j3 monthly thơ, jagmaid amAdd, jkc2 carry — none has a card number).
- NBSP marker: 750 option renders, no trait vs nồng nàn / lạnh lùng (number-blind): identical rows, labels, kitOptModel items and hint signs.
  Bot play (3 lives × 10 tuần, nồng nàn): 0 NBSP in ser() saves, 0 in S.logs. It can only reach a save inside a pending result card's HTML
  (serQ, e.g. empTeaCard) = harmless valid char. Co-op: coop-e2e 94/94 on the merged build; number is sg() of S.emp.traits of the one world.
- NPC «nàng / nàng ta / hắn / <Tên> Sủng», «nàng mất», «của nàng» stay raw (unit cases + j17 frame, j78 trinhth, jroute rtBm checked).
- LIVE-revert audit (origin/main..7786935c): only the topic's lines change (j1, j63, j68, j83, jaudit, jk2b, 2 tests, index/sw); nothing of LIVE reverted.
- Law 4 one core: one rewrite (j1 sgTxt) read by kitParse, kitOptModel, jaudit §15 ✓. Two-way: NPC Sủng applied raw both ways, unchanged ✓.
- Fold 755x1000@2 + iPad 1180x820@2: 0 page errors, no horizontal overflow; act card «Giả bệnh» draws Sủng +4 (BAL 3, nồng nàn) with no visible
  marker. Option-dialog shots of fixed cards: the dialogs I opened (minister, adStroll, trungcuu) hide the number behind kitHideOut, so no number
  to show → shots of 2–3 fixed cards with a visible number are owed on re-review.
- Not run (verdict already FAIL): quickcheck on 7786935c — run on re-review.

## FAIL — fix list for the worker (same family: her Sủng SHOWN ≠ APPLIED; law 4 + law 11 whole family)
1. RANGES half-scaled on cards (new, caused by sgTxt scaling only the number right after «Sủng»):
   - jgift.js:206 kmEmpLine «Xin hầu cờ / Xin đánh đàn hầu ngài»: «thành: Sủng +2 đến +4». nồng nàn → card «+3 đến +4», real 3..5;
     lạnh lùng → «+1 đến +4», real 1..3 (probe). Also the 2 / 4 are typed (2+min(2,…) in kmEmpAct) → from BAL.
   - jts.js:309 tsSummonMe «Vâng chỉ, sang …»: «Sủng +${g3.sung}..+${g7.sung}». nồng nàn → «+3..+4», real 3..5; lạnh lùng «+1..+4», real 1..3.
   → every «Sủng +A đến/../– +B» range: both ends through sg (best: build the range with sgStat on both ends), and add range cases to the
     scan's unit list + a static check that no «Sủng ±N đến|..|– ±M» reaches kitParse half-scaled.
2. RESULT / LOG lines of hers print the raw literal after apply() scaled it — the same shown≠applied family, and the branch now makes the
   contradiction VISIBLE side by side. Proof (nồng nàn): empTeaCard result card «Sủng +3» (now sg) but log «Sủng +2», applied +3.
   Sites seen (not exhaustive — scan them all): j24:104 log; j8:343 «Thị tẩm. Sủng +${g}» (every night!); j25:55; j8:91; j8:489; j71:370/397;
   j92:340/389 (Q h result cards); j92:414; j97:281; jact:168 (both branches); jgift:213/214/223/224 (kmEmpAct txt «Sủng +${g}», «Sủng +1»);
   jpet:95; jroute:125/358; jdh2:94; jexam:148; jts onDone «Sủng ${balSg(…)}»; j4 month events (:20,:22,:40,:52,:55,:82); j8:167/262/361/386.
   → route every her-Sủng result/log number through the same core (sgStat of the applied v, or print the measured delta b → S.sung as j75:75
     does — never sg() a measured delta), extend sg-card-scan with a result/log pass (shown on the result/log == S.sung delta, per trait),
     before/after table.
3. j7.js:32 guardrumour «Xin Hoàng thượng tra xét»: go applies typed sung:2 on thành and danh:-6 on hỏng, neither on the card (your own scan
   row 56 OTH). Her Sủng applied but not shown = shown≠applied + typed numbers (law 4) → move both into BAL.eff.j7 and onto the card.

## For the foreman (not this family / not blocking — list only)
- Static rule texts with her Sủng typed (law 4 one core, VANPHONG): j85 arts tier lines «Sủng +12 khi thành», «Sủng +15», «Sủng +5»;
  j23 / j1 «mỗi tháng thơ … Sủng +1/+2» (j3:113 applies it RAW, no sg — if that text ever goes through kitParse it would now be wrong);
  j83:182 «dâng Hoàng thượng Sủng +5» (unscaled, would be scaled if kitParse'd); pet «Sủng +N mỗi đêm» (applied via apply → sg; drawn sg'd only
  where kitParse reads it).
- jts.js:309 range written «+2..+4» on the card: «..» is code wording (owner 15/11, j19 comment) → VANPHONG.
- j75.js:32 / j77 use a local `sg` signer that shadows the trait sg() name — fine today, fragile.

Shots: scratch only (/home/user/wt/sgrv-scratch), nothing in git, no CDN folder made.
VERDICT: FAIL — items 1–3 to worker session_01964izDpmefTHJeFavzFYEQ; re-review on the fix (scan + quickcheck + coop-e2e + Fold/iPad shots).

# review-sg-card — round 3: PASS (sg-card + kit-opt-sg, one land)

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims SG-CARD r3 session_01964izEfJv1yRsyJaCGF1fH | main 0 | review/* review/sg-card, review/kit-opt-sg (merged in, joptsg dropped) | archive 0
Reviewed: review/sg-card @ e73cdf8f (r3). LIVE had moved to 419079d7 → merged it on review/sg-card-rv = **625b7601** (conflict j97.js:280:
kept LIVE's kitEndNext("rare") + the branch's sgStat log line; index.html/sw.js rebuilt). Ancestor of origin/main 419079d7: yes.

Round-1 fix list:
1. Ranges: both ends drawn as applied — kmEmpLine nồng nàn «Sủng +3 đến +5» (real 3..5), lạnh lùng «+1 đến +3» (real 1..3); a «+a..+b» range card
   nồng nàn «+3..+5» (real 3..5). sgTxt range form + sgRange; a second pass changes nothing. ✓
2. Result / log: empTeaCard nồng nàn log «Sủng +3» = card +3 = applied +3; j8:343 «Thị tẩm. ${sgStat(g)}». No her-Sủng log/txt literal left raw
   in dev/build (only measured «b → S.sung» / level texts remain, correct). Scan DIR pass (printed vs applied per trait) all equal. ✓
3. j7:32 guardrumour: BAL.eff.j7.sungGuardOk / danhGuardFail on the card and in apply. ✓
kit-opt-sg merge: joptsg.js gone (not in assemble.py / index.html, optSgTxt undefined); ONE rewrite = j1 sgTxt. Probe: dilLine «Sủng +4 / -8» →
+5 / −10 once; kitParse(dilLine(c)) again → still +5 / −10; sgTxt twice = once; «Lý Tần Sủng +4 · nàng Sủng -3» raw. No double path. ✓
Extra (r3): typed card Sủng → BAL (j34 sabotage, j25, j30, j53, j8/j17 frame); rule texts as BAL tokens (sgRule; thơ monthly applied raw →
sgFix = marked, never rescaled ✓). rules-one-source.js:58 edit checked: still reads nightGain from BAL, now expects sg(·) as nightFx applies
(identity with no trait) — not weakened ✓.

Gates on 625b7601:
- sg-card-scan: PASS — SG family 0, unit all pass, DIR (result/log) all equal, static CARD 57 · VALUE 24 · NPC 7 · OK 23 (TYPED/RANGE 0);
  105/254 dialogs drawn; undrawn-with-Sủng: coldvisit, rtBm, rtKid, tsbPetHunt, vuoan, kcco (all re-checked by hand in r1: apply/NPC raw).
- NBSP marker: 756 option renders (none / nồng nàn / lạnh lùng), number-blind: rows, labels, hint model and hint signs identical (only trait odds /
  notes differ). Saves/logs: no marker in r1 bot play; logs now carry it only through sgStat (invisible, valid char).
- quickcheck: PASS 572 s (render 266/312, tab 484/591, buổi 1597/1825 ms; old save ok; core gates PASS).
- coop-e2e: 94/94. Co-op: one rule over S.emp.traits of the one world, nothing new synced.
- LIVE-revert audit origin/main..625b7601: 54 files, every hunk a topic line (no LIVE line lost).
- Shots (scratch only): iPad 1180x820@2 Hành sự «Giả bệnh» draws «Sủng +4» (BAL 3, nồng nàn) cleanly, no visible marker; Fold 755x1000@2 home,
  0 page errors / 0 overflow on both; worker's r3 shots (Vu oan −8→−10, Ly gián −4→−5, hầu cờ +3 đến +5, NPC raw) consistent with my probes.
Laws: 4 one core (one rewrite, BAL numbers) ✓ · 11 whole family (cards + ranges + results/logs + rule texts, scan + table) ✓ · 1 two-way (NPC raw
both ways) ✓ · 7 wording ✓ · 9/12 no new UI part, two devices ✓.
For the foreman (not blocking, unchanged from r1): «+a..+b» code-style range wording on the tsSummon card (VANPHONG) if still drawn with «..».

VERDICT r3: PASS → LAND READY review/sg-card-rv 625b7601b2dbc0d3b0858627f0c0eb972a51466e (merged on LIVE 419079d7), coop-e2e PASS
(one land for sg-card + kit-opt-sg).
