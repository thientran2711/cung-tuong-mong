# REVIEW night-balance-bundle (BIG, co-op + balance)

- Reviewer session_01964izF4zCJPJBUmUsHpksK, depth 8 (limit 8 — cannot open sessions; at rollover the handover goes here + to Foreman D). START_CTX ≈ 13 % (get_session 130k/1M at 18:15Z); rollover at 38 %, ceiling 60 %. Coordinator: Foreman D #17 session_01964izBrTYM1xdxezCgqLER (opened by D #16).
PRIORITY #1 CHECK: OD night-final 22:50Z/23:05Z + MAIN 91 «b» (night-final lands ONLY with the balance re-tune) + D #16 k4 ruling 12:40Z | main 9c5b6de3 | review/night-balance-bundle fe634e0f, review/coop-cyhold-rv 3e65dbe7, review/bundle-nfstall (not on origin yet) | claims BALANCE BUNDLE session_01964izFMEzgM3McEsBDo8ng.

## VERDICT (interim, 21/11 19:50Z): NOT LAND READY — 2 co-op blockers open (not mine to fix; worker + GRwYL14Z)
1. jsmg steal mini-game intro ✕ «Quay lại» stall (found by REVIEW coop-cyhold GRwYL14Z): kg82Back (j82.js:440) only finishes an unplayed game through KG82.backPre; herGame (jsmg.js:56) never sets it → onDone never fires, the seat's night choice and the co-op room wait forever (likely solo too). Fix on review/bundle-nfstall (preBack = the game's own «Thôi, không chơi»), to be cherry-picked.
2. jnf late fin (worker, coop-night run 2 case 1): host's day moves on before its choice ends → no fin for the guest. Worker fix 2180b429 (local, testing coop-night ×3).
Verdict will be written on the head that holds both fixes. Still to run there: jsmg/jnf diff against laws 1–4 (✕ = same outcome as skip, no number, two-way), coop-nf-stall ×3, a solo ✕-tap probe, the 10-week 2-seat drive + a ✕-tap case, coop-e2e both seats, sg-card-scan, quickcheck if the build changes beyond jsmg/jnf; worker's gate log as base (coop-night ×3 incl. case 12, coop-steal, coop-cyhold ×3, night-final).

## Findings so far (all fixed by the worker)
- FAIL #1 (5181eecc, regression / law 6): j42.js:9 ORIGINS «cnv» had lost `o:{},hh:0,th:0` (balance-core dd417699). Probe: LIVE th 0 / hh −5, bundle undefined → NaN after apply. Fixed 04b10468 (LIVE line restored).
- NIT #2 (law 4): dead BAL.odb.j42.rlGo (and rlFail) beside BAL.rk.riseKill / abortDieSrv. Deleted 04b10468.
- FAIL #3 (b8fe99ba, law 4 shown == applied, LIVE sg-card rule): jnf.js Giữ chân card + 2 logs printed her Sủng raw (applied via apply→sg, trait-scaled). sg-card-scan FAIL on bundle, PASS on LIVE. Fixed fe634e0f (sgStat ×3). My hint on jbalcore ARTFX text found a real merge bug: LIVE sg getters silently dropped the re-tune's Danh text (Đánh cờ / Kinh hồng vũ / bậc Danh showed LIVE numbers) → getter wrapped in fe634e0f.

## Checks PASS on fe634e0f (reviewer's own runs, own container)
- Static: one-core-guard (408 modules, inline 3701 ≤ 3737) · one-core-bind 1319/0 · one-core-text 0 · text-rule 0 · time-spill PASS.
- Runtime BAL scan LIVE 9c5b6de3 vs fe634e0f-line (b8fe99ba): leaves 61279/61384, missing 2 (the dead keys), changed 20 = exactly the k4 set; NO Hoàng hậu gate key changed (outQ, hhThNoSon/Hiếu, RANKS HH Danh = LIVE).
- Merge resolutions: assemble list = LIVE's + jbalcore,jnf after jseat (nothing dropped) · jcoopone (empArtMonth mute guest, eaLearn ONLY_ME) · jentry cal-p2c N1 · jkc Danh clamps + BAL.art.score · jksize kszLive3Ok · j42 → BAL.rk · the 7 jemo-bal conflicts (j2 j8 j34 j54 j79 jbaleff jevb) keep both sides (LIVE sgStat/sgRange/sgOf + bundle BAL.rk / steal.m / j8.hit).
- coop-e2e 124/124 both seats · quickcheck --runs 5 PASS (render 268/279, tab 543/470, buổi 1679/1688, tasks>200 21/22; a 3-run longTaskMax 3849 was noise) · sg-card-scan PASS (CARD 57 = LIVE) · 10-week 2-seat drive (Fold host + iPad guest, coop-night clear() incl. [data-km-close]) 19/19, same week + date every week — it never taps ✕, so it does NOT clear blocker 1.

## Balance (law 5 / owner view) — noise, not a blocker; owner should see it
k4 10 lives HH 7/10 = 70 % vs current LIVE 94cbe0cd 5/12 = 42 % → Fisher p = 0.23; among lives that reached 3 y 7/10 vs 5/9 → p = 0.65. Most of the gap is survivorship (LIVE 3 early deaths, k4 0). Danh m36 84 vs 71 = the intended §7 re-tune. Neither LIVE nor k4 sits in the old 28–40 % HH band (set on old LIVE 8c8b8b6b, 36 %). The HH gate is exactly LIVE's (D #16 k4 ruling).
