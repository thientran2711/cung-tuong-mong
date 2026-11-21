# review-law4-typed — round 1: PASS (TIER BIG) · 21/11 ~15:55Z · depth 8 · START_CTX ~4 %

PRIORITY #1 CHECK: OD law 4 (OD:L1267) | main jaudit:111, j34:14/21/32, j17:87–92, j8:91/113/139–146 | review/* review/law4-typed 0dc39acd (carries unreviewed review/sg-card e73cdf8f), review/sg-card-rv 625b7601 (reviewed, LAND READY) | claims LAW4-TYPED worker session_01964izCwvjqdYUVNhVGcPT6

Reviewed: review/law4-typed @ 0dc39acdfbe9d6eae0c771d12f183ed53042df92 (whole diff 707e7027..0dc39acd + its sg-card merge).
Built **review/law4-typed-rv = 0bd71d29cfbb733b28b03dee946d36d21245df4c**:
law4-typed 0dc39acd + merge review/sg-card-rv 625b7601 (the REVIEWED sg-card; conflicts index.html/sw.js only, rebuilt) + merge origin/main 468835a7
(conflicts index.html/sw.js only, rebuilt with dev/site/build_site.sh) + 1 reviewer fix commit. Ancestors: origin/main 468835a7 yes, 625b7601 yes.
It carries exactly the reviewed sg-card: every line sg-card-rv added since 419079d7 is in the branch, except 6 lines law4-typed rewrote on purpose
(j17 AOUT, j34 myBetween, j8 deathSentence, jbaleff j8 row, 2 sg-card-scan.js lines). Lands AFTER sg-card-rv 625b7601, or instead of it (it carries it).

## Applied values — before / after (balance drift: NONE)
| site | before (typed) | after (BAL key) | value |
|---|---|---|---|
| j8 deathSentence mercy turn | S.turn<12 | BAL.eff.j8.mercyTurn | 12 = 12 |
| j8 deathSentence confine | 3 | mercyConfine | 3 = 3 |
| j8 A spy win Tâm cơ | +2 | spyTam | 2 = 2 |
| j8 A ksab Đức cost (card c + ap) | -3 | ksabCost (getter) | -3 = -3 |
| j8 A ksab win Tâm cơ | +2 | ksabTam | 2 = 2 |
| j8 A ksab caught Danh | -10 | ksabFailDanh | -10 = -10 |
| j8 A pond Đức cost (card c + ap) | -15 | pondCost (getter) | -15 = -15 |
| j8 A pond caught Danh | -10 | pondFailDanh | -10 = -10 |
| j34 tScore practice weight | ×1.5 | prW | 1.5 = 1.5 |
| j34 sabotage cut | sab count ×2 | cut += sabCut (old saves: sab×sabCut) | 2 = 2 |
| j34 fScore backer point (won + Hậu/Thái hậu/nhà mẹ đẻ) | 2 | backerPt | 2 = 2 |
| j34 crW trọng tài / hiếu thảo / đa nghi | 1.5 / 1.5 / .6 | wTrong / wHieu / wDanghi | same |
| j34 NPC practice | +1 | meGo | 1 = 1 |
Unchanged: Danh/Sủng death mercy (keys already), Tài -15 (talF already applied), practice cost Sức -10, lobby Bạc -30, odds 55 / sabotage odds / 50.
Text changes only: «+1,5» now balDec(meGo×prW) = «1,5» (same); round-1 card «+ luyện tập N» now prints points (N×1,5), it printed the count — now shown == applied.
Who wins / what she pays: same numbers in every formula → same contest results and costs as the cards say (law 2/3 unchanged).

## Reviewer fixes (commit 0bd71d29)
1. j34 ctBackerAdd (old-save edge, real drift): a save loaded mid-contest with a won backer name but no c.bp → a second backer wrote c.bp[k]=2 while
   fScore then used bp (2) instead of 2 names (4) → Thế lực 2 short. Now seeds c.bp[k] from the names already won (names×backerPt) before adding.
   Probe: old save 1 name + 1 new → 4 (2 names); new contest 2 adds → 4; other keys untouched (still fall back to names×backerPt).
2. j14:34 lãnh cung «Gửi thư tố» card (main's cold-faction df7639bb, landed after sg-card's base) printed her Sủng raw `Sủng ${balSg(F.sell.sung)}`
   while sellOut applies it through apply() (trait-scaled) → the reviewed sg-card static gate flagged CHECK 1 on the merge. Now `${sgOf(p,F.sell.sung)}`
   (hers via sgStat, an NPC raw). Static pass back to 0.

## Laws
4 one core: every number on the touched lines reads BAL; card and rule read the same key ✓ (core gate g1-bind PASS).
2/3 equal value / gain-and-loss: no option value moved (table) ✓. 1 two-way: NPC practice (meGo), NPC lobby (ctBackerAdd), sabotage, A spy/ksab/pond
are the same functions for her and NPCs ✓. 7 wording: odds words unchanged, «×1,5» / «+1,5» are point numbers in comma decimal (balDec) ✓.
11 whole family: contest line + the 3 AOUT/A pairs + death text done; follow-ups below are outside this order, not printed. 9/12: no UI part changed.

## Gates on 0bd71d29 (my clone)
- law4-typed.js: 0 typed · sg-card-scan --static-only: PASS (CARD 57 · VALUE 24 · NPC 7 · OK 23)
- sg-card-scan full (disk-served): PASS — static law4 0, SG family 0, DIR all equal, 110/254 dialogs built (other-not-family 10: listed by design, not this family)
- quickcheck: PASS 249 s (render 232/214, tab 524/564, buổi 1792/1280 ms; old save ok) · CORE GATES PASS (one-core-guard incl. g1-bind · rules-one-source · kit-conform · coop-one-world · hooks 7)
- coop-e2e both seats (host Fold + guest iPad, live Worker): 124/124 PASS
- LIVE-revert audit: 61 files main changed since 419079d7, 1614 added lines → 0 missing on the branch.

## Follow-ups (not blocking; for a later whole-family pass)
- typed but not printed: j8 kframe win ap(t,{danh:-10}) + tamco:2, frame/catswap/kpoison/kframe Đức costs (-5/-10/-20/-15 in c + ap), pond drown roll(45),
  punish confine 3/1/2; j34 tScore g×1.6, mini×1.5, R(4)×1.2, Sức<40 -2, fScore phe min(4,1+n/2), dScore 6/3.
- sg-card-scan «other (≠ even with no trait) 10» — list with the TABLE flag in the next sg pass.

VERDICT: PASS → LAND READY review/law4-typed-rv 0bd71d29cfbb733b28b03dee946d36d21245df4c (after sg-card-rv 625b7601, or carries it) · coop-e2e PASS both seats (124/124)
