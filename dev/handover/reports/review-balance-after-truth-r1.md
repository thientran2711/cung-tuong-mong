PASS 614138eb3eabd947efde7d9c5d9c23818b1e6e0f
# review/balance-after-truth-r1 (reviewer, opus). Branch review/balance-after-truth-r1 = worker 14fdce0c + one reviewer bot fix, merged onto origin/main c4b0c58f. Measures only (dev/measure/**, PROGRESS). No BAL and no game code changed.
PASS = the harness is sound and safe to land as tools + numbers on record. The worker's numbers hold for main eba64ead4 but are OUT OF DATE for the current main (see table).

| metric | worker (main eba64ead4, n=90) | my re-run on main bad941b4 (n=45, seed 913) | target | verdict |
|---|---|---|---|---|
| Hoàng hậu | 34 % (25–45) | 20 % (9/45; 11–34) | ~32 % | low edge (CI just holds 32); p≈0.11 vs worker |
| early death | 38 % (28–48) | 33 % (15/45; 21–48) | 40–45 % | in CI, low |
| childbirth death / birth | 5 % (4/88), shown 10.5 | 17 % (9/52; 9–30), shown 12.2 | 8–12 % | mechanism exact (hits 9 = deaths 9, no pet saves); P(≥9)=0.18 chance; pooled 3 main arms 13/140 = 9 % (6–15) ✔ |
| Emperor died first | 28 % | 47 % (21/45) | — | NEW: up, Fisher p≈0.035 (reign-road and others landed after eba64ead) |
| HH median tuần | 285 | 295 | ~188 | too slow ✘ (both) |
| frames aimed / landed per life | 58.6 / 4.8 | 68.9 / 6.7 | — | evidence-truth works |

Checks:
1. Harness sound: the bot plays the real assembled build (assemble.py output byte-identical, incl. jbal.js + jbal2.js). No stat, BAL or RNG writes; seeds independent per page; Wilson CI correct; 0 timeouts/crashes.
2. DEFECT fixed by reviewer (dev/measure/inpage6.js): on the current main, jact.js renames "Đẩy nàng xuống hồ sen" to the ACT name "Đẩy xuống hồ sen". The bot's BAD filter missed it, so the bot pushed rivals into the pond about 22×/life and got 0/45 HH (data kept: at_R1_main_bad941b4_pushpleak.json). After adding the name to BAD and scanning every harm ACT name, nothing else leaks (re-scanned on c4b0c58f).
3. Childbirth: shown risk = the first roll in birthP, and every hit is a death. The worker's B arm (0/53, P=0.003) ran with an older counter set, so "chance" is plausible but not proven. My arm and B2 confirm the mechanism.
4. Branch scope OK: only dev/measure/** + PROGRESS vs base.
5. Follow-ups: re-measure after review/mortality = YES, with 90 lives on the post-reign main. seeMaxP 70→65 = NOT supported now (HH is already 20 %; the missing early deaths are replaced by Emperor-first ends, and more poison would push HH lower). First look at the Emperor-first rate (47 %). ex.bar (review/balance-pass) = the slow pace is confirmed. The ex.bar[2] 28→30 overshoot guard must be re-measured on the current main; it may not be needed since HH is now 20 %.
Note: main moved to c4b0c58f (41 game files) during my run. The numbers are for bad941b4.
Details: dev/PROGRESS_review-balance-after-truth-r1.md on the branch.
