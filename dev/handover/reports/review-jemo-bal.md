# review-jemo-bal — round 1: PASS (TIER BIG) · 21/11 ~17:25Z · reviewer session_01964izEsZMc4E6wZ26mTyck (depth 8, START_CTX ~4 %)

PRIORITY #1 CHECK: OD law 4 (OD:L1267) + MAIN 92 | main jemo.js / jemoact.js / jevb.js, j8 A frame/catswap/kpoison/kframe/pond, j17 AOUT kframe, j34 tScore/dScore/fScore | review/* review/jemo-bal df5dbf30 (base = review/law4-typed-rv 0bd71d29 + main 270c6251) | claims JEMO-BAL session_01964izDeHsFp85JHdyFPDPs (stopped, rollover)

Reviewed: review/jemo-bal @ df5dbf30fcd1cf61f1ed3edd3d698faa9b66761d (commits 7b93bc45, a00e679e merge, ab3f6c13, dc83334c, df5dbf30).
Built **review/jemo-bal-rv = a646c789d5127a681e082a7f41dd0caddbc8a553** = jemo-bal + merge origin/main e193228f (LIVE, sg-card landed;
conflicts index.html/sw.js only, rebuilt with dev/site/build_site.sh). No reviewer code fixes needed.
Carries law4-typed-rv 0bd71d29 (not yet on main) → this one land also lands law4-typed (or land law4-typed-rv first; both fine).

## No applied value change (independent proofs, not the worker's)
1. Token-level pairing of every typed number the diff removed with the expression that replaced it (LCS per changed line, 4 commits), each
   expression evaluated in the loaded build (aliases resolved): **158 pairs → 158 equal** (156 automatic + 2 by hand where my resolver took the
   wrong local alias: emoBrake `B.grudge` = BAL.eff.jemo.brake.grudge 60 / grudgeF .5 / ducDef 50; jemoact `F.n` = BAL.ea.fx.tiec.n 2 — the old loop `n<2`).
   By file: jemo 61 · jemoact 43 · jevb 23 · j8 18 · j34 18.
2. Moved tables at runtime, origin/main e193228f vs branch (after jfeel / jmoodknow load-time edits): EMO_EV 37 · EMO_TR 21 · EMO_DECAY 19 · EMO_DK 6 ·
   EMO_NIGHT 19 · EMO_BRAKE 7 · EA_N 14 · EA_REACT 71 keys → **0 diffs**.
3. (A seeded bot A/B was tried: not deterministic on main vs main itself — timers — so not used as evidence.)
Before / after for the card-visible values (all equal): j8 kframe cost Đức -15 → kframeCost -15 · kframe win mother Danh -10 → kframeDanh -10 ·
actor Tâm cơ +2 → kframeTam 2 · jemoact extK ×2 → BAL.ea.extK 2 · halves /2 → BAL.ea.half 2 · j34 tScore/dScore/fScore constants → BAL.eff.j34 (same).

## Text changes (shown == applied)
- j17 AOUT kframe now prints «nàng Danh -10; Tâm cơ +2» = what A kframe applies (ap(t,{danh:kframeDanh}), ap(a,{tamco:kframeTam})) — was unprinted.
- dc83334c jbancung «Xin cung» loss and df5dbf30 jemoact eaN: her Sủng now via sgStat. Text only; checked the apply side: jbancung applies
  `apply({sung:-(fail.sung+sungStep*up)})` and eaN's targets go through ap(S,…) → apply() (j8:18), both trait-scaled → card now prints the applied amount.
- jfeel / jmoodknow still edit the EMO_* copies at load with typed numbers (pre-existing); no text outside jemo prints BAL.eff.jemo tables,
  so no shown≠applied today — note for a later one-core pass.

## Laws
4 one core ✓ (law4-typed static 0, core gate one-core-guard + g1-bind PASS, frozen list 3737 → 3592) · 2/3 ✓ (no value moved) · 1 two-way ✓
(same functions for her and NPCs; NPC amounts stay raw by design) · 7 ✓ (no odds wording changed) · 9/12 no UI part changed.

## Gates on a646c789 (my clone)
- law4-typed.js 0 · sg-card-scan --static-only PASS · sg-card-scan full PASS (SG family 0, static CARD 57 · VALUE 24 · NPC 7 · OK 23)
- quickcheck PASS 221 s (render 275/250, tab 450/361, buổi 1517/1718 ms, old save ok) · CORE GATES PASS (one-core-guard · rules-one-source · kit-conform · coop-one-world · hooks 7)
- coop-e2e both seats (host Fold + guest iPad, live Worker): 124/124 PASS
- LIVE-revert audit vs base 270c6251: branch's 621 added lines all present; main's 620 added lines present except 10 = sg-card lines that
  law4-typed / jemo-bal rewrote on purpose (j17 AOUT, j34 myBetween, j8 death / frame ×2, jbaleff j8 row, 2 sg-card-scan lines, 2 jemoact `ext`
  lines — checked: sg-card's sgStat kept, only `2` → BAL.ea.extK and `/2` → BAL.ea.half).

VERDICT: PASS → LAND READY review/jemo-bal-rv a646c789d5127a681e082a7f41dd0caddbc8a553 (on main e193228f; carries law4-typed-rv 0bd71d29) · coop-e2e PASS both seats (124/124)
