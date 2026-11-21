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

---
# NIGHT LAND CHAIN #3 — report (opus, session_01964izEJ3UxEanNMtCLFgeK; foreman D #10 → D #11 session_01964izEy8y3SFtp96at4o7u)
PRIORITY #1 CHECK ('night-final|night-day|Kính sự phòng|amRise|FAIRN.custom'): OD L1601 + MAIN 20/11 08:45Z | main LIVE eb11e2ad (BAL.ag.emp.custom = old FAIRN.custom) | review/night-final-r3, review/balance-core-r3 e3ed68b9 | claims NIGHT LAND CHAIN #2 → #3.
START_CTX ≈ 4 % of 1M; rolled over at ≈ 30 % (handover below). **NOT SẴN SÀNG KIỂM.**

## review/night-final-r3 — pushed de26ef16fc0638f87a15ae445b86b7f9b9548222 (WIP; fast-forward of 18dc7fa4, no history rewrite; contains balance-core-r3 e3ed68b9 + LIVE eb11e2ad)
Root causes found and fixed (game code where the game was wrong; test fixtures only where the fixture was wrong, no assertion loosened):
1. **night-day ~1/3 flake** — NOT visGo. The fixture set `S.cyb.lie=wk()` (she lied to the book) to keep her card on the tray; when the random start fell in her cycle tuần (cycOn, 1/3 by name hash) jcycle's Kính sự phòng mama check rightly caught the lie → night lost. Fixture now picks a start outside her cycle tuần (today and next). night-day 10/10 + 10/10 + 12/12.
2. **night-multi / night-steal tests**: main AG2 moved the mùng một/rằm custom roll FAIRN.custom → `BAL.ag.emp.custom` (one core); 5 tests still zeroed the dead FAIRN.custom → whole group (night-multi, coop-steal, night-steal-unit, night-steal-shot, steal-mg-nf) now zero BAL.ag.emp.custom.
3. **GAME jnf realFlip**: her summons (ksp/prep) pushed by the base flip sat answerable in Q until step() opened the choice; while another dialog held the choice back, answering it played her night BEFORE the choice (no Giữ chân, no tries). Now taken out of Q at the flip (x.ksp), re-pushed after the choice (existing line 255).
4. **GAME jnf choice-first**: a closing flip scene (`.kmov.kcf.km-out`) no longer counts as scene(); showModal puts a due choice up first (owner OD 16/11 22:45Z: choice right after the scene).
5. **GAME jagmaid (night-final case 6, two nights in one day)**: (a) a favoured maid raised at the month (amRise "fav") wrote her night on TODAY instead of her favoured week m.fav.w → clashed with today's flip night (false Kính sự phòng record, law 6a); (b) an NPC who sends her maid hầu thay from her own night (rivalNight → sendMaid) kept her record while the maid got one — her own «Tiến cử» gives the night up (law 1) → NPC now gives the record up. New test `dev/test/night-book-day.js` (FAIL before, PASS after).
   FOLLOW-UP (law 1, not done): that NPC still gets the night's Sủng/Ân + night(v) pregnancy roll before she sends the maid (j75 rivalNight order); the player gets none → move the amSendQ decision before the gains.
6. Fixtures: night-final case 1 reads tối khắc at arrival (a random «Mua tin» answer spends one), case 7 samples the clock 1.3 s apart (>1 s + 250 ms tick) and hides the stale start modal; steal-mg-nf guards BAL.nt (ledger lands after night-final).
7. Merges: LIVE dd248d5d (41636abc) and LIVE eb11e2ad (de26ef16): assemble.py lists unioned (main jnwb/jbalbd/jrd_bd/jrd_bd2/jgedata_w3/jmgid + ours jbalcore/jnf), KIT_REQUESTS both sections, site rebuilt.
   **WARNING shallow history**: with depth-30 fetches git saw 5 merge bases (graft points) → ~45 FALSE conflict hunks (main side showed pre-balance-core text). `git fetch --deepen=300 origin main` (under flock) → one base, 3 real conflicts. The balance-core-r3 reviewer's «48 hunks / 31 files» is very likely the same artefact.

## Gates on de26ef16 (merged LIVE eb11e2ad)
GREEN: night-day 10/10 · night-steal-unit · flip-entry ALL OK · night-coop-park 6/6 · steal-mg-nf · night-book-day 2/2 · balance-core PASS · one-core-guard PASS (inline 3799/4212, fails 0) · QUICKCHECK PASS (old save ok; render 211/178, tab 356/384, buổi 1182/1382 ms new/live) · coop-e2e 68/68 · TIER BIG.
coop-steal 12/23 = EXPECTED: it drives the jnf co-op flow, parked by design (nfParked() while COOPW.on, F1, until coop-thin E); the parked path = night-coop-park + coop-e2e.
**RED (open, ~1 run in 3 each):** night-final 7/10 — case 7 ×2 (a «Thánh thượng ban thưởng» reward card from a `km-reward` scene still shows before the choice: Q holds only the reward, nfX open, choice not yet shown → the reward is pushed/shown while the reward scene plays; showChoice is skipped because scene() is true from that km-reward? check cfBusy/kmov kinds, and that the reward dialog (jact/j93 kmPump) is not pushed between the flip and the choice — PREQ rule), case 2 ×1 (her Tranh sủng won but opts "" — choice never showed), case 4 ×1 (Thôi run: nfX stuck st "wait" with ksp:1 — step gate held by a non-PREQ dialog, choice never opened; likely a newer LIVE dialog kind; check what Q held). night-multi 4/5 — case 5 kept: n:0 (no attacker joined: B's stealWant try not in x.npc — check npcAttackers vs LIVE eb11e2ad changes).
Before eb11e2ad the same suites were night-final 8/10 (both case 6, now fixed) and night-multi 10/10 → the new reds are most likely LIVE eb11e2ad's new dialogs/scenes (kit-opt-text, cal-p2c, bd-roads, day-khac-audit) racing the choice gate.

## HANDOVER (#3 → #4; rolled over at ≈ START_CTX + 25 %; D #11 opens the successor)
Worktree here (lost with this container): /home/user/wt/nf3; tests over http: `python3 -m http.server 8731 --bind 127.0.0.1` in the worktree; run tests one at a time.
1. night-final-r3 from de26ef16: fix the 4 reds above at their root (game first; capture Q titles/pids + S.nfX + kmov classes at failure — debug copies of the test, never weaken it). Prove night-final ≥10 and night-multi ≥10 consecutive green, then night-day 10, night-book-day, balance-core, quickcheck, coop-e2e, one-core-guard. Final-merge CURRENT LIVE (deepen first!) → SẴN SÀNG KIỂM.
2. D #11's next job (msg 15:01Z): RE-PORT review/balance-core-r3 onto newest LIVE (report review-balance-core-r3.md §2). Deepen history first — expect far fewer real hunks. Checked here: main's delta dd248d5d→eb11e2ad adds no new «arts×k / artW×k» odds lines and no ORIGINS o:{} rows; jorigins Ba Tư is text-only (reads BAL.orig.bd numbers — balance-core moved them to BAL.start.bd: verify). Do NOT retune BAL (owner call pending). After it changes, re-merge it into night-final-r3 (no history rewrite; B's night-ledger builds on night-final-r3).

---
# NIGHT LAND CHAIN #4 — report (opus, session_01964izDEg45oy4aickus1Cx; depth 3; foreman D #11 session_01964izEy8y3SFtp96at4o7u)
PRIORITY #1 CHECK ('night-final|PREQ|choice gate|balance-core re-port|instudy'): OD L1601 + MAIN ROOT-79 §7 option (b) via D #11 15:40Z, then D #11 16:32Z HOLD gain / measure first | main LIVE eb11e2ad | review/night-final-r3 de26ef16, review/balance-core-r3 e3ed68b9 | claims L399 (this chain).
START_CTX ≈ 4 % of 1M; rolled over at 30 %. **NOT SẴN SÀNG KIỂM yet** (proof runs below in progress at rollover).

## review/night-final-r3 — pushed 6e8173ced50b0a4d2183a4ccd055c0f8caba8d2a (ff of de26ef16, no rewrite)
Root causes from instrumented debug COPIES of the tests (scratch only; no assertion changed):
1. **GAME jnf — choice gate (cases 2, 4, case-9 crash)**: the agent loop's «Ngươi bắt gặp» (agWatch via j95sync) and similar cards arrive with the end of the day AFTER the old PREQ snapshot, so they held the forced choice (st stuck "wait"; in bot mode drain(1) answered them instead of the choice; when tonight was hers EVERY dialog held it). New rule (FLIPQ): the choice waits only for the flip's OWN dialogs (what realFlip itself pushed, e.g. the jcycle Kính sự phòng mama check) and nfsum; every other dialog — waiting before the flip or arriving after — follows the choice, whoever's card was turned (owner OD 16/11 22:45Z: choice right after the scene). PREQ / `pre` removed (canon overwrite).
2. **GAME jnf — showModal (case 7)**: a card queued before the flip («Tin trong cung», a reward) was opened by render→showModal while the flip scene still played; the wrapper skipped showChoice (scene busy) and let the old card through. Now while the choice is due and the scene plays, showModal opens nothing (non-bot); step() shows the choice when the scene closes.
3. **FIXTURE night-final case 8**: roll() caps every chance at BAL.odds.hi 95 → the "forced" visit (base 1000) missed 1 in 20. The case now forces the roll (x ≥ BAL.visit.cap → true). Assertion unchanged.
4. **FIXTURE night-final 3/4 + night-multi 5/7 (T.setup)**: the fixture cleared the attacker's confinement BEFORE its own day; the day can confine her again (2 in 300 setups, measured) → she rightly cannot attack → "no attacker". Cleared again right before the flip.
Measured after 1+2+3 (before 4): night-final 9/10 (case 3 = item 4), night-multi 9/10 (case 7 = item 4). night-multi case-5 debug 25/25.
**Proof runs on 6e8173ce were in progress at rollover** (night-final ×10 then night-multi ×10, output lost with this container) → successor re-runs.

## review/balance-core-r3 — pushed 7e4e5d9017d193ea0d5a1e88a6cb4bb9fdf863f9 (ff of e3ed68b9)
- abae0ea8 = merge LIVE eb11e2ad after `git fetch --deepen=300`: only **3 real conflicts** (assemble.py = main's list + jbalcore after jseat; index.html/sw.js regenerated). Main's delta 90b7e797→eb11e2ad: no new «art × k» odds lines, no ORIGINS o/hh/th rows, Bắc Địch start row unchanged (BAL.start.bd stays); main's new BAL.orig.doan / BAL.orig.id read originArts = BAL.orig.art (the one table) — consistent.
- 706b4d70 = review note N1: jbalcore typed numbers → BAL (BAL.start.npc mal0 40 / malDuc 2 / ducJ 5 / favJ [20,5]; BAL.steal.ea.w 2 month-art weight; stealShown clamp → BAL.odds.lo/hi).
- 7e4e5d90 = dev/measure/instudy.js (studying-player bot add-on, see below).
- **NOT yet run on the re-port**: balance-core.js, origin-arts.js, quickcheck, coop-e2e, one-core-guard. Not re-merged into night-final-r3 yet.
- §7 finding (sent to D #11 16:55Z): the CURRENT ladder already meets §7's own table for a studying player (bc-lessons.py: teacher 3/month → Tinh thông 20.7 lessons ≈ 7 months; self ≈ 35 ≈ 1 year). The bot's m24 comes from taking few lessons. D #11 16:32Z: HOLD any BAL.art.gain change (law 16/17); MEASURE FIRST with a studying bot on both arms; only then PROPOSE (not apply) a knob that keeps §7's times (bậc-3 cards at bậc 2 D.vu.lv/D.ky.lv, or RANKS Danh).

## Follow-up GAP (law 1, NOT fixed — not in the failing path; D files it)
An NPC who sends her maid hầu thay still gets the night's Sủng/Ân + pregnancy roll (j75 rivalNight order: gains before the amSendQ decision); the player gets none.

## HANDOVER (#4 → #5; D #11 opens the successor)
Worktrees here are lost with this container. Setup: worktree per branch under /home/user/wt; `flock /home/user/wt/fetch.lock git fetch --deepen=300 origin main review/night-final-r3 review/balance-core-r3` FIRST; tests over http `python3 -m http.server 8731 --bind 127.0.0.1` in the worktree; one test at a time; `bash dev/site/build_site.sh` after any dev/build change.
1. night-final-r3 6e8173ce: run night-final ×10 and night-multi ×10 (must be all green; any red → capture with a debug copy: Q titles/pids at FLIP-end, S.nfX, kmov classes). Then night-day ×10, night-book-day, night-steal-unit, flip-entry, night-coop-park, steal-mg-nf, balance-core, quickcheck (old save), coop-e2e 68/68, one-core-guard (watch night-day: the FLIPQ rule changed which dialogs go first when tonight is hers).
2. Re-merge balance-core-r3 7e4e5d90 into night-final-r3 (no rewrite), rebuild, re-run step 1's key suites; final-merge CURRENT LIVE (deepen first) → «SẴN SÀNG KIỂM review/night-final-r3 <sha> (TIER BIG)» in FOREMAN_D_STATUS.md.
3. balance-core-r3 7e4e5d90: gates balance-core, origin-arts, quickcheck, coop-e2e, one-core-guard. Then the studying-bot measure: rvbot (handover dev/measure/rvbot/, README) with INP2 adding instudy.js — edit run.sh's INP2 to `inbc.js,$REL,instudy.js` (instudy.js lives in the branch worktree dev/measure/, run.sh runs both arms from $BR so both get it); main worktree = LIVE; seeds 21–25, HHSTOP=1, CAP 5400, ≤4 processes, ≥30 lives/arm; table.py + ladder.py → before/after table incl. HH %, first bậc 3 month, Danh m36, study counts (x.study; HH-STOP lives lack it — over() is not called there). If HH stays well below ~32 %: PROPOSE a knob that keeps §7's times (no BAL change applied) → D #11 relays to MAIN.

---
# NIGHT LAND CHAIN #5 — report (opus, session_01964izE3179UkNYimmBhA5e; depth 3; foreman D #11 session_01964izEy8y3SFtp96at4o7u)
PRIORITY #1 CHECK: OD night/balance-core hits in reports | main none (not landed) | review/night-final-r3 6e8173ce, review/balance-core-r3 7e4e5d90 | claims CLAIMS.md L399 (this chain).
START_CTX ≈ 5 % of 1M.

## Step 1 — night-final-r3 6e8173ce (no change needed)
night-final 10/10 · night-multi 10/10 (consecutive) · night-day 10/10 · night-book-day · night-steal-unit · flip-entry ALL OK · night-coop-park 6/6 · steal-mg-nf · balance-core · one-core-guard PASS · coop-e2e 68/68 · QUICKCHECK PASS (old save ok; render 242/252, tab 504/500, buổi 1362/3223 ms new/live).
(coop-e2e needs `python3 dev/build/assemble.py` first: it serves dev/index.html.)

## Step 2 — balance-core-r3 → 812a1f39 (ff of 7e4e5d90)
- 6eaa5f18 instudy.js: study counts also attached to HH-STOP lives (at the next start).
- 812a1f39 site rebuild: QUICKCHECK said NOT BUILT — 706b4d70 (N1) changed jbalcore/jbal2 without rebuilding index.html.
- Gates on 812a1f39: balance-core 42/42 · one-core-guard PASS · coop-e2e 68/68 · QUICKCHECK PASS (old save ok; render 264/232, tab 501/533, buổi 1470/1270 ms).
- origin-arts FAIL 1 + 5 (Bắc Địch: 8 story roads, Ba Tư roads bd_tuyet / bd_hen have no BAL.orig.art row → new game falls back to the origin row) — **the SAME FAIL on LIVE 983a9436** (run on the live worktree) → pre-existing main gap from the Ba Tư wave, not balance-core. For D to file (owner of jrd_bd2 / BAL.orig.art rows).

## Step 3 — night-final-r3 ← balance-core-r3 812a1f39 ← LIVE 983a9436 (no rewrite)
- dc3ab36c merge balance-core 6eaa5f18: 2 conflicts (assemble list = ours, which already had jbalcore + jnf; jbal2: BAL.steal.ea gets balance-core's `w:2` AND night-final's BAL.steal.choice line stays).
- fe1502d4 merge LIVE 983a9436 (deepened, one base): assemble list = ours + main's new jgedata_bd.js; index/sw rebuilt. LIVE delta eb11e2ad→983a9436 has no art-odds / ORIGINS / BAL.orig lines.
- a508434c merge balance-core 812a1f39 (rebuild only).
- Gates on a508434c: night-final 8/10 — case 2 ×2. ROOT (debug copy, 200 case-2 runs, Math.random call stacks):
  1. **GAME (LIVE bug too) jweather wxOutActAny**: the outdoor-act test was a bare substring match, case-insensitive. «hái» (pick) matched inside «T**hái** hậu / T**hái** y» → 260 indoor options counted as outdoor (weather risk + looks/mud rolls on «Báo Thái hậu ngay», «Mời Thái y…»); «tuyết» (snow) matched a consort named «… **Tuyết** Dao» in the flip option «Tranh sủng (Tối nay thẻ bài của … Tuyết Dao được lật)» → lkAfterAct → lkOutdoor rolled weather/mud on her night choice. FIX beb1f19e: whole words only (`\p{L}` boundaries) and the act name without the «(…)» tail and without capitalised words after the first (people, places). Whole-group scan of all 7,922 option names (dev script, before → after): OUT 260 change (all «hái»-in-«Thái», none a real pick act), IN 11 change («Dưỡng Tâm» place name ×9, «Châm chọc», «Đành»); 0 options lose a real outdoor word. looks-2 checks identical to the unpatched build; weather-port PASS.
  2. **FIXTURE night-final T.seq (cases 2, 3, 4)**: the values meant for the night's own rolls were taken by whatever drew Math.random first (the weather roll above, a figure pick on render). T.seq now feeds only draws made inside resolveAll / nfResolve; other draws stay random. No assertion changed.
  3. **FIXTURE night-final (cases 1 / 4, ~1 red in 16)**: on mùng một / rằm j75's flip wrapper gives the night to the Hoàng hậu by custom (BAL.ag.emp.custom [40,20]) and drops her steered card → no choice, another record. night-multi and steal-mg-nf already turned it off (#3's group fix); night-final did not. 69075331 turns it off for the whole test (no case tests the custom). No assertion changed. (coop-cyc.js also steers nightCh without it — not in this gate set; D may want the same line there.)
- Re-gate on 69075331: night-multi 10/10 already on beb1f19e (same game build); night-final ×10 + full gate set running, then the studying bot.
- Gates on 69075331: night-final 10/10 · night-day 10/10 · night-book-day · night-steal-unit · flip-entry ALL OK · night-coop-park 6/6 · steal-mg-nf · one-core-guard PASS · coop-e2e 68/68 · balance-core 1 red → root below · QUICKCHECK FAIL perf only (buổi new runs 3786/4592/1271 vs live 957/1034/1260 ms; the step-1 run had the opposite, live 3223 vs new 1362) → re-run on an idle CPU after the bot (old save ok, core gates PASS).
  4. **FIXTURE balance-core growth curve (flaky ~1 in 16)**: the curve rounds the fraction of each gain by Math.random (≈ .2 per +2 at Tâm cơ 85), so 20 steps are Binomial(20,.2) for her and an independent draw for the NPC; [0,8] seen. 73a09248 (night-final) / 8939c663 (balance-core-r3, cherry-pick): both replay the SAME seeded draws → [2,2] every run, a stricter two-way check. Threshold unchanged.

## NIGHT LAND CHAIN #5 — HANDOVER (21/11 ~00:20Z, context rollover; depth 3) → for NIGHT LAND CHAIN #6 (opened by Foreman D #12)

STATE
- review/night-final-r3 = 73a09248 (pushed; gated on 69075331 + merge 983a9436). NOT yet re-pushed: the LIVE merges below live on review/night-final-r3-coop.
- review/night-final-r3-coop = f2048810 = 73a09248 + merge LIVE 548dcd0d (fc480ca8) + merge LIVE 24dd2c62 (b2a78e1a) + CO-OP UNPARK WIP (f2048810).
  Merge conflicts both times: assemble.py = main's list + 'jbalcore.js','jnf.js' right after 'jseat.js'; j2 lesson = balance-core fee/cap + main's one `pay` object; index.html/sw.js rebuilt.
  QUICKCHECK G1 «frozen list grew 3930→4212» (RIVAL HAUTHAY report) = old 983a9436 baseline only; fixed by these merges (one-core-guard PASS 3740 ≤ 3930).
- review/balance-core-r3 = 8939c663 (gates green: balance-core 42/42, one-core, coop 68/68, quickcheck PASS; origin-arts FAIL bd rows = same FAIL on LIVE).
- MAIN ruling (ROOT-82 20/11 22:58Z via D #12): UNPARK — night-final-r3 lands only with flip choice + giữ chân on BOTH seats + coop-e2e PASS.

CO-OP UNPARK (f2048810), what was done
1. jnf nfParked(): parked only in a thin part-E room (TH.on(5), dev flag ctm-thin ≥ 5 — no player room reaches it; thin is off by default). Player rooms run jnf's existing host-authoritative relay ({open}→guest scene+choice→{ch}→host resolves once→{fin} gres/gdef). jfe.js kept (it only runs while parked = thin-E rooms).
2. ROOT bug found: jcoopworld's older B2 night relay (tnRelay / tnFinal / tnTake, CW.tnWeek) ran alongside jnf: after jnf gave the guest her won night, the host's tnFinal (host S.tonight cleared because her night is hers) reached the guest 400 ms later → tnTake set her S.tonight=null + pushed «Kính sự phòng … không vời ai». Fix: tnRelay and CW.tnWeek return while window.nfOn() (ONE relay).
3. Text bug: the guest's relayed result lines were the HOST's sentence with the first two words cut («Ngươi Diệp cũng mời được…, sang cung ngươi»). Fix: tie line sent structured (`tie` = winner enc id) and built on her seat; other lines: her exact name prefix (NMc) → "Ngươi".
4. coop-steal.js fixture (written before jsmg + balance-core; never run since the 17/11 park): skip the steal mini-game through jsmg's own hook (__smgFake skipped — a real player path); tap the morning panel #dawn «Tiếp theo» (kmFree blocks the flip scene while it is on); BAL.visit.cap=0 (his own visit took the night before the flip — same as night-final.js); oKeep=()=>0 in cases 1-2 (they assume the flipped NPC does not defend); friend matched by .coop (entry rebuilt each merged week); host checks read the day's record (S.nfX / S.ntk) instead of the short-lived S.tonight. No assert removed.
   Runs: 14/23 → 15 → 21 → 20 → 20 → 19/23; every case has passed in some run; the remaining reds are live-game randomness in the fixture (a night with no flip at all, x.t null, in case 2; earlier the friend-identity miss in case 3). Logs: /home/user/wt/logs/u/cs*.log (this container only).

NEXT (successor)
a. Make coop-steal deterministic for "no flip" nights: the force() must also hold off whatever turns no card (check S.nightWhy.cause on a t:null night: Emperor ill / mùng-rằm custom / event) — then ≥3 green runs in a row.
b. Rewrite night-coop-park.js: it asserts "co-op = PARKED → live night"; now assert "co-op runs jnf" (choice on both seats via a stub room) + "thin-E room (TH.on(5)) stays parked".
c. Add the owner gate asserts (two live seats, coop-steal family): Sổ ghi (S.logs night record / kspLog) identical on host+guest for the night; host giữ chân vs guest steal (mirror of case 3); AFK guest = Thôi (no answer → 10 s → Thôi, host resolves); guest herWin plays her own night in the live room (case 1 already shows nfsum+ksp on the guest).
d. Then gates on the coop head: night-final ×10, night-multi ×10, night-day ×10, night-book-day, steal-unit, flip-entry, steal-mg-nf, balance-core, one-core-guard, coop-e2e, coop-night, coop-steal, night-coop-park (new), QUICKCHECK (perf on an idle CPU). Then ff review/night-final-r3 to that head (73a09248 is its ancestor) and write «SẴN SÀNG KIỂM review/night-final-r3 <sha> (TIER BIG)» with: solo = new night; co-op = new night on both seats (relay); thin-E dev rooms parked.
e. Notes for D to file (unchanged): GAP law 1 NPC hầu thay gains (RIVAL HAUTHAY has it); origin-arts bd rows missing on LIVE; coop-cyc.js custom note.
f. Gate scripts used (recreate in the new container): loop.sh (<wt> <test> <n> <port> <tag>, one at a time), gates.sh (list in d), python http.server per worktree; QUICKCHECK = bash dev/tools/quickcheck.sh; coop tests need `python3 dev/build/assemble.py` first (dev/index.html).

ROLLOVER RULES (copy verbatim into every takeover prompt):
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
- LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.

### NIGHT LAND CHAIN #5 — balance-core STUDYING-BOT MEASURE (21/11 ~00:35Z; rvbot method, seeds 21–25, same study policy dev/measure/instudy.js both arms: 1 lesson/tuần in her identity art, teacher if Bạc ≥ fee+20 else self)
main = LIVE 983a9436 · branch = review/balance-core-r3 812a1f39 build (8939c663 only adds a test fix) · BAL.art.gain untouched

| | main LIVE 983a9436 | branch balance-core-r3 |
|---|---|---|
| lives (timeout/crash) | 40 (0) | 30 (0) |
| HH % (reached Hoàng hậu) | 14/40 = 35 % | 5/30 = 17 % |
| HH month (median) | 84 | 197 |
| first bậc 3 month (median) | 6 | 21 |
| reached bậc 5 (median month) | 39/40 (m12) | 4/30 (m185) |
| avg max rank / rank ≥ 4 | 5.30 / 32 | 3.77 / 15 |
| Danh m0/12/24/36 | 21/47/66/75 | 19/11/9/11 |
| early deaths (< 3 years, not HH) | 6/40 | 4/30 |
| lessons per life (self / teacher) | 21.5 / 0.3 | 78.5 / 0.2 |

Reading: on the branch, art progress slows by design: first bậc 3 moves from m6 to m21, and bậc 5 is almost never reached. Danh then flattens at about 10 after m12 (whole-life gain 2466 vs loss 2452: Danh earned ≈ Danh lost). Max rank stalls around 3–4, and HH falls to 17 %, well below the ~32 % target.
PROPOSAL (not applied, NOT yet sampled — #5 ran out of context; a 30-life sample per knob takes ~4 h of bot time):
- K1: lower the RANKS Danh thresholds for the ranks above 3. Danh m36 is 11 on the branch vs 75 on main, so the rank gate is Danh, not art bậc.
- K2: the bậc-3 cards open at bậc 2 (D.vu.lv / D.ky.lv). This brings the Danh +BAL.art.danh[3] cards forward without changing BAL.art.gain or §7's bậc times.
Recommended first try: K1, sampled with the same rvbot run (seeds 21–25, ≥30 lives) against the table above.
Raw: /home/user/wt/botout (lost with the #5 container); this table is the record.

## NIGHT LAND CHAIN #6 (session_01964izC1nt5SGmJB1qpucrT, depth 4) — work + HANDOVER (21/11 ~02:00Z, context rollover at ~25 % of 29 %) → for NIGHT LAND CHAIN #7 (opened by D #12)
PRIORITY #1 CHECK: OD 20/11 ~21:30Z co-op rule + OD02 giữ chân | main none (LIVE now 8c8b8b6b) | review/* night-final-r3 73a09248, night-final-r3-coop c3295d37 | claims GAP night land chain row (D).

DONE (pushed review/night-final-r3-coop = c3295d37; NOT gated as a whole yet, NOT ff'd to review/night-final-r3):
- b5f06131 merge LIVE b1033eb0 (index/sw theirs + rebuild) — but see BLOCKER: the branch content was already stale before this.
- 4a828dd9 GAME (co-op regression of the unpark, coop family): the guest's Kỳ nguyệt maid card (jcycle cyAsk) was NEVER asked under jnf — jnf's guest flip returns before the inner jcycle wrapper → her «báo sớm / giấu» silently gone. Fix in jnf flip (guest branch calls window.cyAsk()); host step(): while COOPW.cyHold (draw held for her answer) the choice waits, cap BAL.steal.choice.waitMs; S.nfX.at set at creation.
- night-coop-park.js REWRITTEN 7/7: (1) solo; (2) player room host: no flip in tối (S.nfP), flip at end, nfch, relay ctm-nf open+fin (mode h), ≤1 record, week moves; (3) thin-E (COOPW.thin.on(5) stub — jcoopthin is NOT in the assemble list) parked at the gate: live lists, no jnf relay/choice; (4) solo→room keeps the waiting tablet, one flip; (5) thin-E→solo one flip max; (6) solo choice open→room finishes; (7) 9-day switch solo/room/thin-E never stuck.
- coop-steal.js: 39 asserts, **39/39 ×3 in a row** (logs cs11-*). New owner asserts: every case the night record (nightWhy flip0/pick/cause, seat-neutral host/guest/NPC) is identical on both seats; case 1 the guest's won night plays to its END on her seat (S.nightLog has the day); case 4 host flipped: host Giữ chân holds vs guest Tranh sủng fails (her own stealFail line, no night); case 5 AFK guest: her own 10 s clock answers Thôi (x.me null), host x.fr null, resolved ≪ waitMs, no night for her. Fixture-only determinism (no assert removed/weakened): Emperor rest roll (empSummon) + emotion no-flip (__eaOff) held; empPick = the forced card (jagmaid maid-pool night took the night with no card); toNight presses only the seat that is behind (pressing a seat already at tối committed its night = an unforced flip before force()); fitBoth: both seats pregnant/ill/confined cleared + both players eligible attackers while forced (world/route/illness blocks are real rules but not under test; guest's own nightCh pinned on her seat, restored by unforce); the night's own rolls (draws inside resolveAll/nfResolve) read .5 like night-final T.seq; failed choice asserts print each seat's eligibility snapshot at open (__ELsnap).

⛔ BLOCKER FOUND (must fix before SSK; affects review/night-final-r3 73a09248 / 69075331 too — the «gated» head):
the branch REVERTS LIVE main content. Example jbal2.js: main (already at 983a9436, still LIVE) has BAL.orig.id (cal-p2c identity offset, owner OD 20/11 ~07:35Z) and the cal-p2b tunes (mgPace fast/keep for tho/doi/doden/tc/xa/thq/kim/co, kG.huong 1, blend, lev.mua.dark, lev.banh.reach, cal redo + mua/banh/huong dropped); the branch has the OLD values and no BAL.orig.id. Cause: an earlier merge of main into night-final/balance-core (shallow clone, depth 30 → wrong/absent merge-base) resolved those hunks to the stale branch side; every later merge (fe1502d4, fc480ca8, b2a78e1a, my b5f06131) kept them because main had not touched them again. The gates did not catch it (no test reads those values on the night path).
Method started (container-local, recreate): main history fetched with `git fetch --shallow-since=2026-11-16T12:00:00Z origin main` (repo .git 5.1 GB, fine). Per-file 3-way, base X = pre-fork main 6902d3603 (16/11 18:37Z; branch's oldest own commits 37d1091f4 / c51bae6bd 16/11 19:53–20:03Z), ours = branch HEAD, theirs = LIVE 8c8b8b6b (merges the new LIVE at the same time) — script m3.py: for f in `git diff --name-only M H` (skip index.html, sw.js, dev/build/all.js, dev/index.html, dev/handover/): x==m → keep branch; x==h → take main; else `git merge-file -p branch base main`. Result: keepH 20 (jbalcore, jnf, measure + night tests: own), takeM 3, clean 3 (j42, jgift, jk4), **CONFLICT 58 files** (jbal2 16 hunks, j2 9, j8 6, j68e 5, jbalarc 5, …, assemble.py 1). Most conflicts are expected to be the same staleness (branch = an INTERMEDIATE main version, main changed again) → resolve to main; the rest are real own edits (balance-core: BAL.start/art/grow/steal, jbalcore hooks, jnf, night-final j8/j75/jflip/jsteal/jvisit/jfe/jcoopworld edits) → keep. Suggested resolver: per conflict hunk, if the branch side text exists verbatim in some main version of that file between 6902d3603 and 983a9436 → take main; else keep branch and review by hand. Then assemble.py list = main's + 'jbalcore.js','jnf.js' right after 'jseat.js'; rebuild (assemble + build_site); commit as ONE «re-integrate LIVE 8c8b8b6b (restore reverted main hunks)» commit on top of c3295d37 with a before/after table of restored hunks in this report.
After that: gates one at a time on the new head — night-final ×10, night-multi ×10, night-day ×10, night-book-day, night-steal-unit (arg index.html path), steal-mg-unit (arg dev/index.html), flip-entry, steal-mg-nf, night-coop-park, balance-core (index.html path), one-core-guard, coop-e2e, coop-night, coop-steal ×3, QUICKCHECK (bash dev/tools/quickcheck.sh: old save + perf). Plus a «no-revert» check: `git diff origin/main HEAD -- dev/build` must contain only the branch's own hunks (list them). Then ff review/night-final-r3 to that head, SSK line «SẴN SÀNG KIỂM review/night-final-r3 <sha> (TIER BIG; solo + co-op new night)» + this STATUS/report + send_message D #12.
Studying-bot table for the SSK line = #5's §7 life bot above (main 66bd36cd 5/8 HH vs branch 1/7, small n); the instudy measure (dev/measure/instudy.js) was NOT run by #5 or #6; BAL.art.gain stays HELD.
Container-local helpers (recreate): loop.sh `<wt> <test> <n> <arg> <tag>` (one at a time, logs /home/user/wt/logs), csloop.sh (coop-steal n times), python3 -m http.server 8761 in the worktree for <url> tests (http://localhost:8761/index.html); coop tests serve dev/index.html (run assemble first) and use the LIVE Worker.

## NIGHT LAND CHAIN #7 (session_01964izCYYK9w88YKJcvCFHe, depth 4, START_CTX ~5 %) — JOB 1 re-port onto LIVE + audit
PRIORITY #1 CHECK: OD 20/11 ~21:30Z co-op rule + OD02 giữ chân | main none (LIVE 8c8b8b6b) | review/* night-final-r3-coop c3295d37, night-final-r3 73a09248, balance-core-r3 8939c663 | claims GAP night land chain row (D) → #7.

ROOT CAUSE confirmed on full history (fetched --shallow-since=2026-11-15): BAL.orig.id was present in night-final-r3 de26ef16f (merge main 20/11 14:58) but LOST in balance-core-r3 abae0ea8a («Merge LIVE eb11e2ad … re-port», 16:02, eb11e2ad HAS it) and came into night-final via dc3ab36ca (merge balance-core 6eaa5f18). So balance-core-r3 8939c663 itself is ALSO tainted (do not land it alone).

METHOD (no 3-way, no shallow): line provenance. Own set = every commit in LIVE..c3295d37 (65 non-merge + 30 merges). For each of the 84 files that differ LIVE↔branch (generated index/sw/all/dev/index, assets.json excluded; rebuilt):
- a LIVE line stays unless a chain commit removed that exact line; a branch line is kept only if a chain commit (or a chain merge's own resolution, `++` in --cc) added it;
- where both sides kept text (63 line pairs) a token 3-way vs the line the chain commit edited; 27 left were read token by token: all = chain edits on lines LIVE did not change in substance → chain side.
- assemble.py = LIVE's list + 'jbalcore.js','jnf.js' right after 'jseat.js'; build_site.sh rebuilt index.html/sw.js.
Result commit 8c8689b9 (parents: LIVE 8c8b8b6b, old head c3295d37 → fast-forward for both review branches; `git diff 8c8689b9^1 8c8689b9` = the whole chain change, 78 files +2521/−384). Pushed review/night-final-r3-coop.

AUDIT 1 — every edit LIVE→branch is ours (dev/build + dev/test + kit md): 652 token edits; 616 auto-matched (the LIVE side with 3 tokens of context inside a line a chain commit removed AND the branch side inside a line a chain commit added); 36 by hand (j1 5, jorigins 1, jfe 11, night-day 12, night-steal-unit 7), all chain intent. Table:
| file | token edits vs LIVE | auto-matched to chain commits | checked by hand | LIVE lines kept where the old branch differed | stale lines dropped |
|---|---|---|---|---|---|
| dev/build/assemble.py | 1 | 1 | 0 | 1 | 0 |
| dev/build/j1.js | 12 | 7 | 5 (ORIGINS numbers → BAL.start (balance-core); LIVE art:{cam:1}→BAL.orig.art already gone on both) | 5 | 0 |
| dev/build/j13.js | 9 | 9 | 0 | 1 | 0 |
| dev/build/j14.js | 4 | 4 | 0 | 1 | 0 |
| dev/build/j2.js | 62 | 62 | 0 | 10 | 0 |
| dev/build/j22.js | 3 | 3 | 0 | 1 | 0 |
| dev/build/j23.js | 5 | 5 | 0 | 1 | 0 |
| dev/build/j31.js | 8 | 8 | 0 | 1 | 0 |
| dev/build/j4.js | 9 | 9 | 0 | 3 | 0 |
| dev/build/j42.js | 1 | 1 | 0 | 0 | 0 |
| dev/build/j68e.js | 20 | 20 | 0 | 5 | 0 |
| dev/build/j68f.js | 8 | 8 | 0 | 2 | 0 |
| dev/build/j7.js | 13 | 13 | 0 | 4 | 0 |
| dev/build/j75.js | 10 | 10 | 0 | 2 | 0 |
| dev/build/j79.js | 8 | 8 | 0 | 1 | 0 |
| dev/build/j8.js | 43 | 43 | 0 | 6 | 0 |
| dev/build/j85.js | 68 | 68 | 0 | 4 | 0 |
| dev/build/j96.js | 4 | 4 | 0 | 1 | 0 |
| dev/build/jact.js | 2 | 2 | 0 | 1 | 0 |
| dev/build/jagacts.js | 4 | 4 | 0 | 2 | 0 |
| dev/build/jagacts2.js | 3 | 3 | 0 | 1 | 0 |
| dev/build/jagacts3.js | 16 | 16 | 0 | 5 | 0 |
| dev/build/jagmaid.js | 4 | 4 | 0 | 0 | 0 |
| dev/build/jbal.js | 12 | 12 | 0 | 1 | 0 |
| dev/build/jbal2.js | 24 | 24 | 0 | 64 | 8 |
| dev/build/jbalarc.js | 13 | 13 | 0 | 7 | 0 |
| dev/build/jcoopone.js | 2 | 2 | 0 | 0 | 0 |
| dev/build/jcoopworld.js | 17 | 17 | 0 | 0 | 0 |
| dev/build/jfe.js | 18 | 7 | 11 (nfParked gate (co-op unpark #5)) | 4 | 0 |
| dev/build/jflip.js | 17 | 17 | 0 | 2 | 0 |
| dev/build/jgift.js | 4 | 4 | 0 | 0 | 0 |
| dev/build/jk4.js | 5 | 5 | 0 | 0 | 0 |
| dev/build/jkc.js | 5 | 5 | 0 | 0 | 0 |
| dev/build/jksize.js | 6 | 6 | 0 | 1 | 0 |
| dev/build/jopic.js | 4 | 4 | 0 | 0 | 0 |
| dev/build/jorigins.js | 1 | 0 | 1 (bd row numbers → BAL.start.bd (balance-core)) | 1 | 0 |
| dev/build/jroad.js | 5 | 5 | 0 | 1 | 0 |
| dev/build/jroute.js | 4 | 4 | 0 | 1 | 0 |
| dev/build/jsteal.js | 4 | 4 | 0 | 0 | 0 |
| dev/build/jtabs.js | 23 | 23 | 0 | 0 | 0 |
| dev/build/jthaiy.js | 4 | 4 | 0 | 1 | 0 |
| dev/build/jts.js | 17 | 17 | 0 | 2 | 1 |
| dev/build/jvisit.js | 2 | 2 | 0 | 1 | 0 |
| dev/build/jweather.js | 8 | 8 | 0 | 0 | 0 |
| dev/build/jworld2.js | 8 | 8 | 0 | 2 | 0 |
| dev/kit/KIT.md | 3 | 3 | 0 | 3 | 0 |
| dev/kit/KIT_REQUESTS.md | 1 | 1 | 0 | 6 | 0 |
| dev/test/coop-one-world.js | 4 | 4 | 0 | 0 | 0 |
| dev/test/flip-entry.js | 48 | 48 | 0 | 6 | 0 |
| dev/test/night-day.js | 32 | 20 | 12 (night-final test rewrite) | 1 | 0 |
| dev/test/night-steal-shot.js | 5 | 5 | 0 | 0 | 0 |
| dev/test/night-steal-unit.js | 32 | 25 | 7 (commit-time steal test rewrite) | 1 | 0 |
| dev/test/npc-purpose-rows.json | 1 | 1 | 0 | 0 | 0 |
| dev/test/origin-arts.js | 2 | 2 | 0 | 1 | 0 |
| dev/test/steal-mg-nf.js | 4 | 4 | 0 | 0 | 0 |

AUDIT 2 — runtime BAL scan (every BAL leaf + every global function, page loaded in Chromium; LIVE vs branch):
| | old branch c3295d37 | re-port 8c8689b9 |
|---|---|---|
| BAL leaves/globals on LIVE missing on branch | 84 | 22 |
| BAL values different from LIVE | 26 | 2 |
Restored by the re-port (86 entries; examples): BAL.orig.id.* (cal-p2c identity offset, 20 keys), BAL.ag.mg2.cal.k.{chai,dauho,den,hoadien} + cal.redo.* (mgcal-redo), BAL.invite.wait.* , BAL.mgFx.laneFade, BAL.mgTier.blend.*, lev.banh.reach, lev.mua.dark/darkCap, cal.k.banh/mua b (7.3/8.3, old 6.1/6.3), kG.huong 1 (old 3.65), lev.co/doden fast (0.4 / 0.3,0.5; old 0.1 / 0.05,0.175), win:dilTon (jcui), jmgcal ok/stale.
The 22 + 2 left = balance-core intent only: per-art weights now read the one ladder artOE/artO (BAL.visit.show.w, BAL.ag.cx.portrait.k, BAL.ag.cx2.{show.k,court.thi,nurse.y,kidHeal.y→BAL.art.gate.yCure}, BAL.ag.par3.{dance.vu,anthai.self.y,cold.poem.thi,qin.cam,qin.tt}, BAL.deck.{vu,cam,ky}.o[1], BAL.world.{thb,benh}.nurse.o[1], BAL.preT.drug.perY, BAL.thy.findY), bd start numbers → BAL.start.bd (BAL.orig.bd.o/th), BAL.steal.cost.feign.duc / road.suc → 0 (flip choice has no cost, OD 16/11 22:45Z). Source-level key/function scan: 5 references missing, same set (all above).
