# dudo-lock-r1 — review of review/dudo-lock @ 2cd2eb918 (on main 2934bede, no merge needed)

Reviewer session: session_01UV1SzifEntpsUEBQt52nco. Reports to MAIN s22 (session_01UV1SzjhT28XQmRt2EHNffg). START_CTX ~3 %, ended well below the ceiling, no rollover.

## VERDICT: PASS 2cd2eb918  (review/dudo-lock-r1 = same commit; it is a descendant of current origin/main 2934bede, fast-forwardable)

## Checks
1. Build reproducible: `bash dev/site/build_site.sh` on the branch gives zero git diff (committed index.html / sw.js match).
2. Diff read (j9 walkBlock/walkLate/walkGo, j41 accSpot + list tiles, j21 seeBtn/goSee/visitBtn/visitPal, j22 manCard, j6 data-go, walkSpillTick closed-place card, KIT.md 34.1d rewritten in place): one go-there rule, no private variant, lock mark only when accessOf fails / cấm túc / lãnh cung. Real locks keep their reason (tap card).
3. `GRID=1 node dev/test/dudo-lock.js dev/index.html` on iPad 1180x820 AND Fold 755x1000: "GRID OK: lock mark = rule lock everywhere", page errors 0; SPILL: every far-but-open place reached next buổi (or bái kiến / reason card) for tt, muoi, dtq, nc, cn, old save (world30-met) x 4 buổi x 4 khắc.
   Same test on main (index of origin/main): 30 LOCK-BUT-OPEN in life tt alone (9 at b0 1-khắc-left etc.), then crashes at the SPILL step (no walkLate) — confirms the bug and the fix.
4. Screens (iPad, 1 khắc left, tt): far places show plain label + red "đi 2 khắc"; only A ca sở / Dưỡng Hòa điện / Cần Chính điện wear the lock. Tap on Đức Thọ cung (far, open) → kit card "Đường đi 2 khắc · còn 1" with "Đi (đến nơi vào buổi sau)" / Thôi.
5. Person-card buttons (own script, iPad): visitBtn for a far rival palace is enabled with "đến nơi buổi sau"; visitPal → walkSpillGo → arrives at her palace in buổi 1 with used=1, no errors. A real-rule place (Càn Ninh outside thỉnh an) stays disabled with the rule reason (correct). data-go goes through walkGo.
6. `dudo-tap.js`: iPad real taps, USED=3 TAPK=tn → card with spill. Note the default TAPK (vuon,tyv,r4) is COVERED / off-view in the iPad frame, so the default run taps nothing (test limitation, not a game bug; suggest default TAPK=tn,cnh,tgk). Fold run: map img did not load in my runs either (see observation).
7. Co-op: `coop-e2e.js` branch run 1: 58/59 (FAIL "ipad: friend starts as Người lạ", k61St=2 — random-world knowledge state, nothing to do with goTo); branch rerun 59/59; main 59/59. Flake, not caused by this branch. goTo is identical in co-op; walk spill stays off in co-op (unchanged), so walkBlock falls back to walkWhy exactly as before.
8. Perf: no new work in render path (accState called once per place as before); worker measured 2.1 ms mapHTML; not re-measured.

## Observation (1): Fold map <img> never loads
Reproduced on MAIN (dudo-tap.js fold tt, main build): mapimg src="" currentSrc empty, naturalWidth 0, `.mapw` 2307x0 px (labels pile at top). Also seen on the branch. So it is NOT caused by this branch; iPad loads fine (nw 1792). Emulation-only so far; worth one check on the owner's real Fold. Suggested kit fix: give `.mapimg` explicit width/height (or aspect-ratio on `.mapw`) and a src retry on load error.

## Minor notes (not FAIL)
- After a visitPal spill she lands at the palace in the next buổi; the "is she home" step of visitPal is not replayed (arrival screen shows who is there). Acceptable.
- Rule-locked place on the list view shows the reason chip (unchanged).
