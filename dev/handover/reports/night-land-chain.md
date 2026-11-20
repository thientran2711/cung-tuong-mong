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
5. WARNING (seen at rollover): LIVE moved to 90d57324 (mg-fair-ratio) which adds **BAL.orig.art** in jbal.js — a second origin-art table beside BAL.start.<origin>.art (law 4 one core / law 14 canon overwrite). At the next final-merge make ONE table (keep BAL.start as the start table, point mg-fair-ratio's readers at it, or the reverse) — never both.

---
# NIGHT LAND CHAIN #2 — report (opus integrator, session_01964izC3zpsctqeKJjgaCCZ; foreman D #10 session_01964izDrx83qqXTF9t1BYy7)
PRIORITY #1 CHECK ('balance-core|night-final|Giữ chân|môn ưa'): OD L1601 | main no balance-core; main BAL.orig.art (mg-fair-ratio) | review/balance-core-r3, review/night-final-r3 (#1) | claims D #9/#10 JOB 1.

## (a) review/balance-core-r3 — e3ed68b927010a6e828702d38ef501010fc27a4f — SẴN SÀNG KIỂM (with the §7 bot warning below)
- Final-merged LIVE 66bd36cd then 90b7e797 (j1/j2/jorigins conflicts; j2 lesson: main's kgDefer charge-on-ready kept with the one ladder artPts/artFee).
- **ONE start-art table (law 4/14)**: BAL.orig.art (jbal.js, origin × story road, in bậc; owner OD 20/11 ~02:05Z, newer and finer) is now the ONLY start-art table.
  BAL.start rows carry no art/vir any more (stats/Bạc/Danh/Sủng/th/hh only). jbalcore: origArtRow/origArtPts (bậc → the one ladder's floor points
  BAL.art.tier, she starts AT that bậc, no progress) used by origSet (NPC: road unknown → the origin's own row; rank bonus N.art to her 2 best) and
  origArtSet (j2 start, after STORY init rolled her road; replaces main's raw S.arts assign so points + bậc stay on the one ladder). NPC-only origin
  `quan` got its own row in BAL.orig.art (origin-arts test 1 accepts NPC-only keys of BAL.start.npcW).
- G4 npc-purpose: row j85 npcStudy fingerprint follows the one-core move (40 → BAL.start.npc.study; still LIVE-OFF).
- Tests: balance-core.js 42/42 (test reads BAL.orig.art) · origin-arts 8/8 · one-core-guard PASS · **QUICKCHECK PASS + core gates PASS** (open 1622 ms, old save ok,
  perf new/live render 236/217, tab 554/584, buổi 1509/1363) · coop-e2e 68/68 · TIER BIG.
- **§7 life bot (re-run; sens bot inpage6+inbc, HHSTOP, seeds 11/12, 55 min cap, 4 processes): main 8 lives, branch 7 lives** (small n — memory allows one 4-process batch/hour):
  | | main 66bd36cd | branch |
  |---|---|---|
  | reached HH (HH-STOP) | 5/8 | 1/7 |
  | avg max rank / rank ≥ 4 | 6.12 / 7 | 3.57 / 4 |
  | died < 3 years | 0/8 | 1/7 (birth) |
  | mean life (y) | 12.2 | 11.8 |
  | month 0/12/24/36: Danh | 11/4/59/95 | 19/10/15/16 |
  | Tài | 43/68/75/88 | 25/32/36/38 |
  | Sắc | 52/59/61/66 (100 at m60) | 68/69/69/66 |
  | art max bậc | 2/3/4/5 | 2/2/2/3 |
  Early deaths no longer exceed main → BAL.grow.mul NOT tuned (brief rule). **WARNING for reviewer/foreman:** current main's bot now climbs (Danh 59→95 via its arts by
  month 24–36, HH 5/8); with balance-core's slower ladder/curve the same bot stays at Danh ~15, Tài ~38, art bậc 3, HH 1/7. That is the approved §7 direction (slower
  climb) but the gap is large; whether HH ~14 % vs owner target ~32 % (OD:L20) is acceptable is an owner/main call — needs a bigger run (≥ 40 lives/side ≈ 3 h) before go-live.
  Raw: /home/user/wt/out/life-{br,main}-{11,12}.json (container-local).

## (b) review/night-final-r3 — 18dc7fa4 — NOT READY (WIP pushed; branch stable, no history rewrite; B's night-ledger may build on it)
- Merged balance-core-r3 e3ed68b9 (+ LIVE 90b7e797), site rebuilt.
- case 8 (no empnight): main AG-ALL-2 turns the daily visRoll off while the agent loop runs (his visits come from his evening plan, before the flip) →
  test turns agDOn off for that case (the daily-roll path it checks). PASS.
- case 7: (1) jnf showChoice Q.push → **Q.unshift** (choice to the front); (2) the step() gate («flip done, other dialogs first») kept the choice behind ANY queued dialog
  (new-game card, person met, rumour). Now dialogs that were waiting BEFORE the flip (WeakSet PREQ, taken when st "wait" is set) are exempt **only while tonight is not hers**;
  (3) test polls for the FIRST dialog after the scene (main's scene close fade ~1 s) and samples the clock 1 s apart. night-final **10/10**.
- night-steal-unit 29/29 · flip-entry ALL OK · night-coop-park 6/6 · night-multi PASS (case 6 flaked 1 in 6 runs; same rate with/without the gate change).
- **OPEN — night-day.js**: the old gate passes 5/5; every gate variant fails ~1 in 3 runs, in steal/road/ksp/morning cases: after «Kính sự phòng báo tin» a «Kính sự phòng»
  dialog shows and her won night is lost (nights 0). I also marked the day's commit done in those cases (S.nfC/S.nfX done — a won try only comes out of the choice) — still
  ~1/3 in «morning». Suspect: main's AG-ALL-2 Emperor visit (jvisit visGo for an NPC sets S.tonight=p while her nfResolve night is still in dialogs; its log line is the
  «Kính sự phòng» notice) — check Q[0].pid + S.tonight on failure (titles only record m.t). If it is visGo, it is a real bug (visOk/visGo must not take a night already won
  by her pending dialogs) → fix in jvisit/jnf, not the test. Then night-coop-park, coop-steal (LIVE Worker), quickcheck, final-merge LIVE → SẴN SÀNG KIỂM.
- OD02 / OD03: verified present (oKeep / BAL.steal.keep + «Giữ chân Hoàng thượng» option; empArtMonth / BAL.steal.ea; balance-core.js month-art checks PASS). Nothing to build.

## HANDOVER (#2 → #3; rolled over near the context ceiling)
Worktrees here (lost with this container): /home/user/wt/bc, /home/user/wt/nf; tests over http need `python3 -m http.server 8731 --bind 127.0.0.1` in the nf worktree.
1. balance-core-r3 e3ed68b9 is SẴN SÀNG KIỂM; if LIVE moves before review, final-merge again (watch j2 lesson/addArt and any new start-art source — keep BAL.orig.art the one table).
2. night-final-r3: finish the night-day «morning» flake (above), then the gates. Keep the PREQ rule or replace it, but night-final case 7 (owner: choice right after the scene) must stay green.
3. Bigger life-bot run if main/foreman want the HH gap measured (one 4-process batch per hour; memory OOM-kills a test browser when run beside it).
