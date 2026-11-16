# PROGRESS · review/balance-after-truth-r1 (reviewer, opus) — review of review/balance-after-truth @14fdce0c
Base: origin/main bad941b4 (re-run build), then merged up to origin/main c4b0c58f (main moved during the run: 41 game files; numbers below are for bad941b4; BAD scan re-run on c4b0c58f: no leak) + merge of review/balance-after-truth (no conflicts). Measures only: no BAL, no game code changed.

## 1. Harness check
- Plays the real build: `python3 dev/build/assemble.py` on bad941b4 gives a byte-identical dev/index.html, and that file is inside root
  index.html (run_par loads root/index.html). jbal.js + jbal2.js are in the assemble list (BAL.ex.bar [22,27,31], seeMaxP 70 present).
- No test-only shortcut that changes odds: the bot files (inpage6, inx, inpz, inty, inpromo, inbirth) never write S.* stats, BAL or
  Math.random. They only wrap functions to count things. The stubs (fixTitles/k3OptCols/kitOptIsLong) are layout only. inbirth wraps
  `roll` only to read the first roll of birthP, which is the death roll (j8 birthP; jpet takes the same first roll when a sacred pet guards
  her), and birthRisk has no RNG.
- Seeds: run_par seeds Math.random per page (mulberry32, seed0+k·101+att·7001), so pages are independent. Lives on one page run one after
  another on the same stream. Phúc duyên carries over between lives in localStorage, but the origin is forced (__forceOrigin), so it
  changes nothing.
- CIs: anpass.py uses the Wilson 95 % interval, computed correctly. TIMEOUT/CRASH lives are dropped (0 of them in every arm).
- Bot bias: the sensible bot scores the odds the game shows, with Đức penalties, and filters fatal harm acts (BAD regex).
  **DEFECT found and fixed here:** on main after eba64ead, jact.js (act-dedupe) renames the place harm "Đẩy nàng xuống hồ sen" to the
  ACT name "Đẩy xuống hồ sen". BAD no longer matched it, so on bad941b4 the bot pushed rivals into the pond about 22 times a life and was
  caught (1012 "xô ngã phi tần" punishments in 45 lives): HH 0/45, a harness artefact. Fix: inpage6 BAD adds "Đẩy xuống hồ sen".
  Whole-group scan of every harm ACT name against BAD: only pushp leaked. The other harms the bot may use (Vu oan, Tố giác, …) are
  unchanged from the worker's runs.
  Raw data of the broken run: dev/measure/pass/data/at_R1_main_bad941b4_pushpleak.json.

## 2. Re-run: 45 lives on origin/main bad941b4 (seed 913, 3 pages, fixed bot) → dev/measure/pass/data/at_R1_main_bad941b4.json
`bash dev/measure/pass/mkinp.sh $PWD/dev/tmp/sensall.js; cd dev/measure; node run_par.js root/index.html sens 45 <out> ../tmp/sensall.js 3 913`

| metric | worker (main eba64ead4, n=90) | re-run (main bad941b4, n=45) | target |
|---|---|---|---|
| Hoàng hậu | 34 % (25–45) | 20 % (9/45; 11–34) | ~32 % |
| early death | 38 % (28–48) | 33 % (15/45; 21–48) | 40–45 % |
| childbirth death / birth | 5 % (4/88), shown 10.5 | 17 % (9/52; 9–30), shown 12.2 | 8–12 % |
| Emperor died first | 28 % (25/90) | 47 % (21/45) | — |
| HH median tuần | 285 | 295 (n=9) | ~188 |
| frames aimed / landed per life | 58.6 / 4.8 | 68.9 / 6.7 | — |
| demotions+confinements / life | ~33 | 44.7 | — |

- main has 138 commits since eba64ead (reign-road jreign.js, act-dedupe jact.js, log-sync, …). Emperor-first ends rose 28 % → 47 %
  (Fisher p≈0.035). HH fell 34 % → 20 % (p≈0.11, not significant at n=45). Early death is inside its CI.
- Childbirth: in all 52 births the death roll equals the shown risk and a hit means death (hits 9 = deaths 9, no pet rescues), so the
  mechanism is exact. 9 deaths against 6.3 expected: P(≥9) = 0.18, chance. Pooled over the three main arms: 13/140 = 9 % (6–15), on target.
  The worker's B arm (0/53, P = 0.003) ran with an older counter set (no inbirth, no pet counter): "chance" is plausible but not proven.

## 3. Branch scope
`git diff --stat eba64ead origin/review/balance-after-truth`: only dev/measure/** and dev/PROGRESS_balance-after-truth.md. No BAL, no j*.js.

## 4. Follow-ups (numbers stay; owner OK needed for any change)
- Re-measure after review/mortality lands: SUPPORTED, but use 90 lives on the post-reign main.
- seeMaxP 70 → 65 (more deaths): NOT supported now. On the latest main, HH is already at the low edge (20 %), and lives that miss HH end
  by the Emperor dying first, not by too few deaths. More poison deaths would push HH further below 32 %.
- Look first at the Emperor-first rate after reign-road (47 % of lives).
- Pace / ex.bar (review/balance-pass, not merged): SUPPORTED that pace is too slow (295 tuần). With HH now at 20 %, the ex.bar[2] 28 → 30
  overshoot guard must be re-checked on the post-reign main. It may not be needed.
