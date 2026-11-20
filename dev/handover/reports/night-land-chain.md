# NIGHT LAND CHAIN #1 — report (opus integrator, session_01964izFUQc1YiGuMjw5qYC7; foreman FOREMAN D #9 session_01964izESYCbbRTQ3P4Xy9Qp)

PRIORITY #1 CHECK ('balance-core|night-final|Giữ chân|môn ưa'): OD L1601 | main no balance-core | review/balance-core-r2 baff0824 PASS, review/night-final-r2 52d5092d PASS | claims none open.
Brief: dev/handover/briefs/D9-gap-jobs.md «JOB 1». Landing order kept: balance-core-r3 → night-final-r3 (night-ledger untouched).

## (a) review/balance-core-r3 — 0684a7e6 (merge b3b3ff5b of LIVE main 30e8714e onto baff0824)
Main had moved ~2800 commits since 17/11: 27 files conflicted. Main's side kept in every hunk, then balance-core re-applied on main's newer code:
- **Origins**: every start number from BAL.start (ORIGINS + ORIGIN_BR.bd carry no o/hh/th/art; j2 start = `origSet`; td thu via `o.x`; BAL.orig.bd start → BAL.start.bd).
  Tai mắt is no longer a start number (main AG-ALL-2f2: `mat` = her real spy list, read-only accessor) → `mat` dropped from BAL.start and origSet.
- **One ladder**: `rungDown` reads BAL.odds.cut (main's word ladder, the same one oddsLv / stealRungUp read); BAL.lad dropped (canon overwrite, no second ladder).
- **Whole-group art-odds sweep (law 11)**: every odds site that read «art level × a per-site factor» now reads the ONE course bonus `artO` / `artOE`
  (j2 j4 j7 j8 j13 j14 j22 j31 j68e j68f j75 j96 jagacts jagacts3 jroute jts jthaiy jvisit jkc + rdOdds `["a",art]` terms in jbalarc, 9 entries).
  The retired per-site factors were removed from BAL (deck o[1], ag.cx2 show.k / court.thi / nurse.y, ag.cx.portrait.k, par3 dance.vu / qin.cam,tt / poem.thi,
  preT.drug.perY, thaiy findY, world thb/benh nurse o[1], visit.show.w). Level-only uses (j71 contest aw7, j82 kg82Aw mini-game level) left on artW2 on purpose.
- **Gates**: Y cure / an thai → one key BAL.art.gate.yCure (j2 kidHeal, jagacts2, jagacts3 anthai, jact; BAL.ag.cx2.kidHeal.y and par3.anthai.self.y removed); thơ truyền ra ngoài → BAL.art.gate.thiFame (j4).
- j8: oSteal = stealBase (BAL.steal.m), stealWin win/hh/rel/ghen per mode (main's ghenUp kept), stealFail; NPC lessons via addArtP. j85: virtue/art bonus on course points (main's BAL.cut tiers kept), addArtP via crsPush, npcStudy = BAL.start.npc.study × main's net factor, best-art focus, artFee. Top label «Đã tinh thông» → artNm(5) (j23 j79 j85); jtabs progress on points.
- **jgrey one-core fault** (GAP OD05): gone on current main — one-core-guard PASS (inline 3801 vs baseline 4212, fails 0).
- Tests on the r3 build: `dev/test/balance-core.js` 41/41 PASS, 0 page errors (test updated: oddsLv / BAL.odds.cut, real spies via tmPlace); `dev/test/balance-night.js` 705 states, 0 errors (feign/road/thôi 37/37/26 %).
- **NOT yet done for SẴN SÀNG KIỂM**: §7 life bot (see Handover), quickcheck.sh + coregates G2–G5, coop-e2e, old save. No SẴN SÀNG KIỂM line written.

## (b) review/night-final-r3 — f8ca2710 (merge of balance-core-r3 into night-final-r2 52d5092d)
14 conflicts; balance-core-r3/main side kept, night-final re-applied: assemble jnf.js after jbalcore.js; BAL.steal.choice {ms 10000, waitMs 90000}; jflip o.still / o.seal / pending text (main's empWhyTxt suffix kept); jksize kszLive3Ok; jopic 'tạm' chip; KIT.md §32.8a; KIT_REQUESTS night-final rows; night-steal-unit palace start. Site rebuilt, one-core-guard PASS.
Tests (served over http, `python3 -m http.server` in the worktree): night-steal-unit 29/29 PASS · night-multi pass · flip-entry 28 ok / ALL OK · night-day ok · **night-final 8/10: FAIL case 7 and case 8** (below).
- case 7 «scene first, then the choice; 10 s countdown»: 700 ms after the flip scene the modal shows a person dialog from main's newer encounters («Thường tại … vội vã tiến lại, cúi chào ta … Ta đã biết: đó là …», j65 person-dialog-restore), not the nfch choice; the choice shows a moment later and times out to Thôi correctly (txt2 «Còn 1 giây», st done). Cause: jnf showChoice does `Q.push` → the choice queues behind whatever is open. Fix to decide: put the forced 10-second choice first (`Q.splice(0,0,…)` / show over the person dialog) — owner OD 16/11 22:45Z wants the choice right after the scene.
- case 8 «his visit rolls after the choice»: order is right (visit:wait inside the flip, visit:done after), but no `empnight` card is drained → main's jvisit changed what visRoll produces (check BAL.visit / jvisit on main; maybe the test's knobs base/cap no longer force a visit).
- (c) OD02 / OD03: ALREADY BUILT in balance-core + night-final (law 13 — not rebuilt): «Giữ chân Hoàng thượng» = oKeep / keepNoSteal / keepRobbed (BAL.steal.keep) + the flip-choice option in jnf; Tranh sủng vs Chặn ngự giá trade-off = BAL.steal.m (feign safe/small, road bold/big, measured r2); Emperor's month art = empArtMonth / eaLearn / eaTell / stealShown (BAL.steal.ea, BAL.steal.art fav/dis), NPCs the same (law 1). GAP rows OD02/OD03 «missing» were only true for main. Nothing more to build unless the reviewer finds a hole.

## HANDOVER (rolled over at ≈ START_CTX + 25 %; the foreman opens the successor)
Worktrees: /home/user/wt/nlc (review/balance-core-r3, pushed 0684a7e6), /home/user/wt/nf3 (review/night-final-r3, pushed f8ca2710). Scratch /home/user/wt/nlc-out.
1. balance-core-r3 — §7 life bot: 4 runs were started (sens bot, `SEED=11/12 HHSTOP=1 INP=inpage6.js INP2=inbc.js node dev/measure/runb.js sens 12 /home/user/wt/nlc-out/life-{br,main}-{11,12}.json`, GAME = r3 index.html vs `_main.html` = origin/main index.html). Slow: ~1 life / 15 min per process with 4 in parallel. Collect the JSONs (or rerun), table branch vs main like report balance-core.md §11.4 (died < 3 years, ranks, Sắc/Tài/Tâm cơ/Đức/Sủng by month). Early-death check: r2 was 7/41 vs main 2/42. Tune BAL.grow.mul (Tâm cơ) only if early deaths still exceed main.
2. balance-core-r3: final-merge CURRENT origin/main, `bash dev/site/build_site.sh`, `node dev/tools/tier.js`, `bash dev/tools/quickcheck.sh` (coregates G1–G5), coop-e2e, old save → «SẴN SÀNG KIỂM <sha> balance-core-r3» in FOREMAN_D_STATUS.md.
3. night-final-r3: fix night-final cases 7 + 8 (above), merge the final balance-core-r3, rebuild, gates, night tests (night-final, night-multi, night-steal-unit, flip-entry, night-day, night-coop-park, coop-steal) → separate «SẴN SÀNG KIỂM» (lands AFTER balance-core).
4. Review notes for the reviewer: the art-odds sweep changes magnitudes on purpose (one ladder 0/4/8/13/18/24 instead of bậc × site factor); BAL knobs listed in (a) were removed, not left dead.
