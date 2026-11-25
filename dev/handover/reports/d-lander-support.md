# d-lander-support — worker L1 (session_01D3E3NZwPBzoXUgaTJ8BPLX) for Foreman D, orders from MAIN 137/138

PRIORITY #1 CHECK: OD 25/11 ~08:05Z (temper build) | main 9f72524b | review/temper-outburst 6b85187e (BIG PASS, reports/review-temper-outburst.md; branch now dc1eb6cb = +G4 measure), review/robot10-nc-fix-4-rv 5f23c140, LC14 stack review/lc14-savegrowth-on-cnv 19c0a3b0 → … → review/lc14-sansang-on-palace afb92cef | claims none (Foreman D seat L1).

## 1. temper-outburst pair picture (FOR MAIN 137/138) — DONE
- Built 6b85187e (assemble.py + build_site.sh, local only, not committed), ran dev/test/temper-outburst.js real taps at Fold 755x1000@2 + iPad 1180x820@2:
  hot / timid / jfeel / npc / cap / old all ok, 0 errors, 3 taps, 0 dead → PASS (twice: art blocked as in the test, and with art loaded).
- Picture shots: a scratch copy of the test with images NOT blocked and a wait until every dialog picture is loaded (first try caught «Đang thỉnh tranh…» placeholders).
- ONE image, 2 rows: row 1 = hot (Fold | iPad), row 2 = timid (Fold | iPad), full screens. Looked 3×: kit event frame (VIỆC header, seal, figure, Tốn/Được/Mất rows,
  kit «Kéo xuống» scroll on the hot list), no cut text, no overflow; timid set has no Đập đồ / Đánh / Phạm thượng.
- **URL: https://ctm-img.victoria-tntt.workers.dev/img/_review/temper-outburst/pair.jpg** (HTTP 200, md5 = local d213264d…). Verdict giver wipes: `python3 dev/site/cdn_sync.py --wipe-review temper-outburst`.
- **FINDING (law 3, not fixed — not in my order):** dev/build/jemoact.js eaOptX picks «giải tỏa tâm trạng» (gain) vs «lòng vui lắng xuống» (loss) from the raw
  `S.mood.v` (`up=!(S.mood&&S.mood.v>0)`), while the bar she sees and the real effect use `moodBar(S)` (feelings). My first iPad hot run: raw S.mood.v > 0, bar −82 →
  every row showed «ĐƯỢC chẳng được gì / MẤT lòng vui lắng xuống» although the tap really vented +15 (−82 → −67). A cost-only row on screen = law 3; display ≠ effect.
  Fix suggestion: read the same value the vent uses (moodBar(S) / the feelings bar) in eaOptX. The uploaded pair is from a run where both agree (giải tỏa shown).

## 2. review/robot10-nc-fix-4-rv2 (FOR MAIN 138 LAND READY) — DONE
- **Base note:** 19c0a3b0 itself still has `whyTime(2)`; `whyTime(BAL.btn.empAct.k)` arrives with the next stack step lc14-dfu-on-savegrowth c1cd57e2. So the
  conflict MAIN described only exists on top of the stack line. Merged 5f23c140 onto that line's top **review/lc14-sansang-on-palace afb92cef**
  (= 19c0a3b0 → dfu c1cd57e2 → law1gifts 469b7c01 → palace 1330ff35 → sansang afb92cef; nc-fix-4's planned slot is after palace).
  Result is an FF of afb92cef AND of 19c0a3b0. (If LC14 wants it on 19c0a3b0 alone: that merge is clean in code, but it would not hold the BAL form.)
- Conflict j15.js rvGroups «Quyền Hoàng hậu»: kept the stack's `whyTime(BAL.btn.empAct.k)` (law 4) + nc-fix-4's change «bớt ${payCutTxt()}» (was typed «3 phần 10»).
  jecon / jstip / j20 / test merged clean. index.html / sw.js rebuilt. No «3 phần 10» typed in dev/build (only the comment in jecon).
- **sha f4611bff09b44952a40c979007e73a94fbe74dad**
- Gates: r10-stip-noqueen 6/6 (save .out/oldsave.json — the robot save named earlier is not on this box); bongloc-options 14/14 (one 13/14 «every option runs»
  while 4 suites shared the CPU; rerun alone 14/14, base afb92cef also 14/14); one-core guard / bind / khac / text PASS; stipend-oldsave (file://) ok, errs [];
  **quickcheck (alone) PASS** · 231 s · old save ok · core gates PASS · perf new/live render 275/247, tab 697/582, buổi 1540/1250 ms.
- Real taps Fold 755x1000@2 + iPad 1180x820@2 (scratch script, touchscreen taps hit-tested): Hậu cung → Phi tần → a consort face → «Quyền Hoàng hậu» tab →
  «Khất bổng lộc»: row reads «bớt 3 phần 10» = payCutTxt() from BAL.payCut; tap sets cutPay 0 → 1 (by Hoàng hậu); no horizontal overflow; 0 page errors. Both ok.
