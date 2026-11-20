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
