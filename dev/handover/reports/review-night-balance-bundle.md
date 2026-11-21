# REVIEW night-balance-bundle (BIG, co-op + balance)

- Reviewer session_01964izF4zCJPJBUmUsHpksK, depth 8 (limit 8 — cannot open sessions; at rollover the handover goes here + to Foreman D). START_CTX ≈ 13 % (get_session 130k/1M at 18:15Z); rollover at 38 %, ceiling 60 %. Coordinator: Foreman D #17 session_01964izBrTYM1xdxezCgqLER (opened by D #16).
PRIORITY #1 CHECK: OD night-final 22:50Z/23:05Z + MAIN 91 «b» (night-final lands ONLY with the balance re-tune) + D #16 k4 ruling 12:40Z | main 9c5b6de3 | review/night-balance-bundle fe634e0f, review/coop-cyhold-rv 3e65dbe7, review/bundle-nfstall (not on origin yet) | claims BALANCE BUNDLE session_01964izFMEzgM3McEsBDo8ng.

## VERDICT (interim, 21/11 22:55Z): NOT LAND READY — intermittent co-op night stall (jnf night word) on the newest-LIVE merge
- Coordinator now Foreman D #18 session_01964izDrtu4TnfRYa28CGH9.
- Worker SSK FINAL efea09a8 (= fe634e0f + jnf late fin 2180b429 + coop-cyhold test clear(); jsmg ✕ withdrawn = no bug). Late-fin diff read OK (laws 1/4/6; host answers a past day from S.nfH, guest re-asks every BAL.steal.choice.ms; no new number; S.nfH optional).
- Reviewer merges of LIVE on review/night-balance-bundle-rv: 65de5fea (+e804edfc: assemble union; jbaleff j8 = bundle hit + LIVE maidStealBac; jksize = LIVE §56.20 + bundle kszLive3Ok) → 9ec21158 (+efea09a8, +04afaeb7 build-only) → **64758330 (+ea112384 mg-craft, assemble union)**; LIVE is ancestor; revert audit: changed files vs LIVE = the bundle's own.
- Gates: c6ffc4c3 coop-night 111/111 ×2, coop-e2e 124/124, 10-week drive 19/19 · 65de5fea coop-e2e 124/124, coop-night 111/111, drive 19/19, sg-card PASS, quickcheck ×5 PASS · 9ec21158 coop-e2e 124/124, quickcheck ×5 PASS · 64758330 balance-core PASS, quickcheck ×5 PASS, guards PASS, **coop-e2e 117/142, 124/124, 124/124 (worker 124/125, 124/124, 124/124) and coop-night 109/111 (case 4)**.
- FAIL (to worker FMEzgM3M): a seat is held for good at tối by the jnf night word, ~1 in 3 runs. Dumps: worker — guest k 2:3 nfX {d:2,st:open,role:null,nk:true}, host already at 2:0 with no nf state; mine — host held at 1:3 with Q:1, sent 0, guest «Chờ hảo hữu…»; coop-night case 4 — the AFK guest's night never ran within clock + BAL.steal.choice.waitMs. LIVE ea112384 alone 124/124; mg-craft not involved (its endTurn wrappers load before jnf). Earlier rv heads passed every single run made, too few to call them clean.
- On the fix: coop-e2e ×3 + coop-night ×2 on the rv head → LAND READY + sha to od03 rv CZEjJkV3 + D #18.

## Findings so far (all fixed by the worker)
- FAIL #1 (5181eecc, regression / law 6): j42.js:9 ORIGINS «cnv» had lost `o:{},hh:0,th:0` (balance-core dd417699). Probe: LIVE th 0 / hh −5, bundle undefined → NaN after apply. Fixed 04b10468 (LIVE line restored).
- NIT #2 (law 4): dead BAL.odb.j42.rlGo (and rlFail) beside BAL.rk.riseKill / abortDieSrv. Deleted 04b10468.
- FAIL #3 (b8fe99ba, law 4 shown == applied, LIVE sg-card rule): jnf.js Giữ chân card + 2 logs printed her Sủng raw (applied via apply→sg, trait-scaled). sg-card-scan FAIL on bundle, PASS on LIVE. Fixed fe634e0f (sgStat ×3). My hint on jbalcore ARTFX text found a real merge bug: LIVE sg getters silently dropped the re-tune's Danh text (Đánh cờ / Kinh hồng vũ / bậc Danh showed LIVE numbers) → getter wrapped in fe634e0f.

## Checks PASS on fe634e0f (reviewer's own runs, own container)
- Static: one-core-guard (408 modules, inline 3701 ≤ 3737) · one-core-bind 1319/0 · one-core-text 0 · text-rule 0 · time-spill PASS.
- Runtime BAL scan LIVE 9c5b6de3 vs fe634e0f-line (b8fe99ba): leaves 61279/61384, missing 2 (the dead keys), changed 20 = exactly the k4 set; NO Hoàng hậu gate key changed (outQ, hhThNoSon/Hiếu, RANKS HH Danh = LIVE).
- Merge resolutions: assemble list = LIVE's + jbalcore,jnf after jseat (nothing dropped) · jcoopone (empArtMonth mute guest, eaLearn ONLY_ME) · jentry cal-p2c N1 · jkc Danh clamps + BAL.art.score · jksize kszLive3Ok · j42 → BAL.rk · the 7 jemo-bal conflicts (j2 j8 j34 j54 j79 jbaleff jevb) keep both sides (LIVE sgStat/sgRange/sgOf + bundle BAL.rk / steal.m / j8.hit).
- coop-e2e 124/124 both seats · quickcheck --runs 5 PASS (render 268/279, tab 543/470, buổi 1679/1688, tasks>200 21/22; a 3-run longTaskMax 3849 was noise) · sg-card-scan PASS (CARD 57 = LIVE) · 10-week 2-seat drive (Fold host + iPad guest, coop-night clear() incl. [data-km-close]) 19/19, same week + date every week.

## Balance (law 5 / owner view) — noise, not a blocker; owner should see it
k4 10 lives HH 7/10 = 70 % vs current LIVE 94cbe0cd 5/12 = 42 % → Fisher p = 0.23; among lives that reached 3 y 7/10 vs 5/9 → p = 0.65. Most of the gap is survivorship (LIVE 3 early deaths, k4 0). Danh m36 84 vs 71 = the intended §7 re-tune. Neither LIVE nor k4 sits in the old 28–40 % HH band (set on old LIVE 8c8b8b6b, 36 %). The HH gate is exactly LIVE's (D #16 k4 ruling).
