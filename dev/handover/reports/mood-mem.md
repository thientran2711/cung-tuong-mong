# MOOD-MEM — step 0 (finish MOODKNOW) + memory 2 layers (b) + 'Chạnh lòng' (g)
PRIORITY #1 CHECK ('ghenUp|v\.ghen|moodBar|jemoact gate|jmem memory wake'): OD L1675, L1678 (b)(g), L1689 (17/11 ~18:33Z (1)), L1690 (~18:38Z) | ledger 0 | claims C-AG #5 (this worker; FEELINGS-18 session_01UV1SzmJYgJQJkt1RUTV1wK builds on step 0) | main jmem memories, jemoact gates, j1 ghenAll | review/* review/ag-moodknow-r1 a2a1f6b5 (base: p.mk causes, mkSync, BAL.mood2, moodCauseKnown). Reused all of it; no second system.
Worker session_01UV1SzgwGeesPrLKFMeBNdz (opus). Foreman C-AG #5 session_01UV1SzkwHkU5MoXKRsprFyU. START_CTX ≈ 6 % (estimate; context_usage reads 0). Branch review/mood-mem, base review/ag-moodknow-r1 @ a2a1f6b5.

## STEP 0 (own sha) — what changed
### (A) ghenUp — ONE way to raise the jealousy SCORE (owner s35 Lượt 41)
- j1.js `ghenUp(v,n,why,by)`: v.ghen += n (clamped 0–100) and, for the real rise, jmoodknow `ghenFeel` adds a short CHẠNH LÒNG feeling cause: true why,
  aimed at `by` (default her), timer BAL.mood2.dur.e.ghenUp (10 khắc), strength rise × BAL.mood2.ghen.k clamped [min, max]; NPC feelings host-only (mckWorld).
  `ghenAll(n,why)` / `p3GhenAll(p,n,why)` go through it; 25 ghenAll calls now pass their true why (rankUp → "ngươi được tấn phong", preg, son, contest…).
- Lowering stays a plain write; the feeling ending never writes the score (test).
- Scan (dev/measure/ghen-raise-scan.py, exit 1 if a direct raise is left): BEFORE direct RAISE 31 sites in 20 modules (+ ghenAll/p3GhenAll bodies) →
  AFTER 0 direct raises, 30 calls via ghenUp. (Reviewer count "43 in 24" included lowers / sets: 14 LOWER, 4 SET/copy, 1 reset — unchanged, listed below.)
| before (direct raise) | after |
|---|---|
| j1 ghenAll · j2 ×2 (Khiêu khích) · j7 ×3 (mật báo, dằn mặt, mách) · j8 ×2 (stealWin, nhan sắc) · j24 (Nhịn) · j28 ×2 (NPC provoke, flaunt) · j34 (tranh vị) · j42 (srvRise) · j75 ×2 (Kinh hồng vũ, độc sủng) · jtwoway ×3 (báo thai, khiêu khích, khoe quà) · jinv (xa xỉ) · jthaiy (lộ thai) · jpet (thú quý) · jgift (dạo vườn) · jtoil ×3 (điểm trang ×2, đáp lời) · jne (đáp lời) · jts (keo kiệt) · jvisit ×2 (mất đêm thẻ bài) · jagacts3 p3GhenAll | each = ghenUp(target, same n, true why, the one who caused it) |
Runtime probe (setter on every consort's ghen, stack check) over 4 bot days: every raise went through ghenUp, 0 direct.
### (B) MOOD BAR = signed sum + jemoact gates (OD 17/11 ~18:33Z (1))
- jmoodknow `mkBarOne(m)` = m.d + BAL.mood.emo[k] × m.s; mkSync sums it into her bar S.mood.v; `moodBar(p)` gives the same signed bar for ANY person (NPCs
  on demand, not stored). BAL.mood.emo + khoc −.4, hon −.2. jmood's old feeling→bar push is off under the Sims model (no double count; old-save 'e:' log entries skipped in mkMigrate).
- jemoact (whole family, one rule her + NPC): eaSealG (dominant feeling → act group), eaBarOk(p,g,L) (vui bar ≥ L, others ≤ −L).
| gate | before | after |
|---|---|---|
| her cards / outburst / extreme (eaMine) | bar band + flavour (low band defaulted to 'buồn' even with no bad feeling; vui seal + low bar → buồn acts) | bar band AND matching dominant seal; low bar + vui seal → no act |
| her timid lock (eaLockWhy) | band ≤ −2 | band ≤ −2 AND a bad dominant feeling |
| her hot lock | gian + bar ≤ −out.v | unchanged (already both) |
| NPC extreme (eaExtNpc) | feeling strength ≥ 80 | moodBar ≤ −bar.ext (vui ≥) + matching seal |
| NPC outburst (eaNpcWeek) | strength ≥ 70 | moodBar past BAL.ea.npc.bar.out on the feeling's side |
| NPC act | strength ≥ 40 | moodBar past bar.act |
| jemo motive gates, Emperor quở (jemoact punish), jroute mood line | feeling strength | unchanged: not emotion acts / outbursts (decision / words) |
- NPC lines BAL.ea.npc.bar {act 11, out 25, ext 28} (NPC bars carry no act/need pushes, so they run smaller than hers; set to keep the old rates).
  dev/measure/ea-npc-rate.js, 8 days × 3 runs, per tuần: base act .58 / out .17 / ext .047 → after .63 / .13 / .073. (Her lines unchanged.)
### (D) 'Chạnh lòng' (OD ~18:38Z): jemo.js `const EMO_GHEN="Chạnh lòng"`; EMO.ghen = EMO_GHEN (feeling key stays 'ghen'); jemoact eaMeOut word reads it; score words "Ghen" untouched.

## Tests (step 0)
- NEW dev/test/moodknow-step0.test.js 17/17: ghenUp score + cause (why, aimed, BAL timer); name; ghenAll all consorts; a routed site; NPC-caused aims at the NPC; end never lowers score; lowering keeps feeling; her bar = signed sum; NPC moodBar; 5 her gate cases; NPC gate; runtime probe 0 direct raises; no page errors.
- ag-moodknow 33/33 ×3 (one earlier 1-FAIL run, not reproduced), emotion-acts PASS, emotion-acts-2 only 'hoitimid' FAIL = same on base, emotion-acts-lines 0 broken, mood-bar PASS, ag-toil2 16/16.
- Tests updated to the new rule (they set S.mood.v by hand, which the signed sum now recomputes): emotion-acts 'vui' / 'lock', emotion-acts-2 'plock' build the state through causes.
- Untouched score writes (scan): 
  j1.js:145 | SET | unchanged (not a raise);  j2.js:16 | SET0 | unchanged (not a raise);  j2.js:141 | LOWER | unchanged (not a raise);  j8.js:109 | LOWER | unchanged (not a raise);  j8.js:443 | LOWER | unchanged (not a raise);  j20.js:17 | LOWER | unchanged (not a raise);  jtwoway.js:52 | LOWER | unchanged (not a raise);  j70.js:496 | LOWER | unchanged (not a raise);  jbal2.js:329 | SET | unchanged (not a raise);  jroute.js:261 | LOWER | unchanged (not a raise);  jcoopworld.js:135 | SET | unchanged (not a raise);  jtsb.js:167 | LOWER | unchanged (not a raise);  jtsb.js:168 | LOWER | unchanged (not a raise);  jtoil.js:250 | LOWER | unchanged (not a raise);  jts.js:127 | LOWER | unchanged (not a raise);  jts.js:141 | LOWER | unchanged (not a raise);  jts.js:187 | LOWER | unchanged (not a raise);  jts.js:188 | LOWER | unchanged (not a raise);  jcoopask.js:87 | SET | unchanged (not a raise);

## HANDOVER (rollover: context ≈ 35 % > START_CTX 6 % + 25 %) — for the successor
Step 0 = 8e2ac171 on review/mood-mem (sent to C-AG #5 + FEELINGS-18). Still running at handover: ag-know, ag-truth, coop-one-world 7+3, QUICKCHECK --cpu 4 not run on 8e2ac171 → run them first.
STEP (b) memory 2 layers — DRAFT EXISTS, tested 16/16 on the OLD base: branch review/mood-mem-wip @ b7f201a (built on da4a6e8, before step 0). Port it onto review/mood-mem:
1. From b7f201a take: the MOOD-MEM section appended at the END of dev/build/jmoodknow.js (MW, mwLoc/mwHome/mwPlaceOf, mwWhy, mwFeel, mwWake, mwTick, wrappers on render/endTurn);
   the jmem.js memAdd line (m.pl stamp via mwPlaceOf); BAL.memWake in jbal2.js (put it AFTER the step-0 block); dev/test/mood-mem.test.js; VANPHONG.md memory-wake line.
2. DROP from the draft (step 0 replaced them): mwGhen / mwGhenFeel / MW.gh / the ghen part of the render wrapper; BAL.memWake.ghen; BAL.mood2.dur.e.ghenUp line (exists);
   the jemo.js / jemoact.js EMO_GHEN edits (exist); test section 7 (ghen) of mood-mem.test.js (moodknow-step0.test.js covers it). Do NOT touch the EMO table / acts (FEELINGS-18 owns them).
3. Design (owner OD L1678 (b)): a jmem memory (holder → about) wakes ONE layer-1 cause on the holder via mkAdd/mkSync (class "sec", t = remembered person, kd "m:<about>:<deed>:<x>")
   on MEET (pair apart at the last khắc look, together now; her S.place, NPCs whereOf = per-khắc roster, servants = master's household), PLACE (holder arrives at m.pl,
   never its own dwelling), ANNIVERSARY (same tuần a later year, weight ≥ ann or lifelong, once via m.ww). Strength/khắc from weight (BAL.memWake.s/dur, lifelong ×2),
   feeling by deed (BAL.memWake.kind), cap 4 wakes/month/person (p.mwc), per-memory pause 6 tuần (m.ww). NPC wakes host-only (mckWorld). First look after load = baseline.
   Tests need a whereOf pin (the roster moves people): see __T.where in the draft test. Note FEELINGS-18 may rename feeling keys (ghen→chanh etc.): mwFeel uses vui/gian/so/dau/buon — re-check against their EMO table.
4. Tap-list ORDER is kit work (kit-figure-mood r3) — MOOD-MEM only supplies cause rows (mkCauses: kind, strength, khắc left, known).
5. Then: tests (mood-mem, moodknow-step0, ag-moodknow, ag-know, ag-truth, memories.js, mem-upgrade (3–5 random FAILs same as base), mem-coop, one-core-guard, coop-one-world 7+3, QUICKCHECK --cpu 4), site build, push, report, send_message C-AG #5 'SẴN SÀNG KIỂM <sha>'.
ROLLOVER (verbatim): Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

## MOOD-MEM #2 (session_01UV1Szigr35QvLkVSd2Vb9L, opus) — successor; START_CTX ≈ 12 % (estimate)
PRIORITY #1 CHECK ('ghenUp|v\.ghen'): OD 0 | ledger 0 | claims 2 | main 15 | review/* 0 (this job = review/mood-mem + review/mood-mem-wip); by hand: draft b7f201a reused, step 0 ghenUp/ghenFeel reused, jmem memAdd/memHolders/memPairs reused, mkAdd/mkSync reused. No second system.

### Step-0 checks on 8e2ac171 (sent to C-AG #5 + step-0 reviewer)
| check | result |
|---|---|
| ag-know | 23/23 PASS |
| ag-truth | 10/10 PASS |
| coop-one-world seed 3 | PASS |
| coop-one-world seed 7 | 1 FAIL (S.wwin ×8 merged≠host) under parallel CPU load; 2/2 PASS alone; base a2a1f6b5 2/2 PASS → load-flaky jworld path |
| QUICKCHECK --cpu 4 | FAIL only G1 one-core-bind: 6 mismatches (j25:11, j78:127) — SAME on base a2a1f6b5, origin/main d4a850ce = 0 → pre-existing, fixed on main; needs a main merge. Rest PASS (open, old save, time-spill, perf) |

### Step (b) — memory 2 layers (34624061)
Ported from review/mood-mem-wip b7f201a: the MOOD-MEM section at the end of jmoodknow.js (MW, mwLoc/mwHome/mwPlaceOf, mwWhy, mwFeel, mwWake, mwTick, render/endTurn wrappers), the jmem memAdd m.pl stamp, BAL.memWake in jbal2.js (after the step-0 block), dev/test/mood-mem.test.js, VANPHONG line (name now marked approved, OD ~18:38Z).
DROPPED as the handover says: mwGhen / mwGhenFeel / MW.gh / ghen part of the render wrapper, BAL.memWake.ghen, the BAL.mood2.dur.e.ghenUp line (step 0 has it), EMO_GHEN edits (step 0 has them), test section 7 (ghen).
Changed: mwFeel falls back to the good/bad kind when its deed feeling key is not in EMO (FEELINGS-18 may drop 'dau' → buon heavy per OD ~19:10Z); BAL.memWake.kind still names so/dau/buon/gian/vui — FEELINGS-18 told.

### Ghen family — her own score v.pg (3718d030) (LUẬT SỬA CẢ NHÓM)
Dropping the draft watcher left HER jealousy score toward a consort (v.pg, "Ngươi ghen N") with no Chạnh lòng feeling; step 0 only routes v.ghen. New j1 `pgUp(v,n,why)` = one way to raise v.pg; the real rise adds her short feeling via ghenFeel(S,d,why,v) (aimed at that consort). Typed +6 → BAL.mood2.ghen.pgNight. Scan `python3 dev/measure/ghen-raise-scan.py --pg` (exit 1 on a direct raise):
| before (direct v.pg raise) | after |
|---|---|
| j8.js:345 rivalNight `v.pg=cl(v.pg+6,0,100)` | pgUp(v,BAL.mood2.ghen.pgNight,"<name> được thị tẩm") |
| j75.js:140 night `v.pg=cl(v.pg+6,0,100)` | same |
Untouched (not raises): j2:147 SET0 (Trút giận), j8:443 LOWER, j20:26 SET0, jagacts2:92 SET0. v.ghen scan unchanged: 0 direct raises, 30 via ghenUp.

### Tests on f62a2931 (site build)
| test | result |
|---|---|
| mood-mem.test.js | 16/16 (meet, weight→strength/khắc, place, own dwelling never, anniversary once, light memory no, monthly cap, per-memory pause, NPC parity, moodCauseKnown secret/known, old save, pgUp score+feeling, feeling end keeps v.pg, rivalNight via pgUp, bot turns, no page errors) |
| moodknow-step0 | 17/17 · ag-moodknow 33/33 · ag-know 23/23 · ag-truth 10/10 |
| memories.js / mem-coop.js | PASS / PASS |
| mem-upgrade.js (5 runs each) | mine 1–5 random FAILs/run, base 8e2ac171 1–6/run, same family (fade_*, behav_*, cause_soc_help every run on both); cause_servant + cause_log_api once in 5 (they read the jmem cause store czHomes, which MOOD-MEM never writes) |
| coop-one-world 7 + 3 | PASS + PASS (R.mem/R.mk guest-raw rows same as base) |
| QUICKCHECK --cpu 4 | FAIL only G1 one-core-bind (same pre-existing 6 as base; main = 0); one-core-guard PASS, one-core-text PASS, kit 102/3 as base, coop gate PASS, open 1317 ms, old save ok, perf new/live render 144/153, tab 255/288, buổi 830/781 |
KIT FIRST: no UI part added (wake causes are rows for mkCauses; tap-list order = kit-figure-mood r3). Co-op: NPC wakes host-only (mwWorld/mckWorld).
OPEN for the foreman: the branch base (ag-moodknow-r1) predates main's one-core-bind fix → merge origin/main before go-live.
