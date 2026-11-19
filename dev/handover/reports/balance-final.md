PRIORITY #1 CHECK ('balance-2|balance-chain|Danh wall'): OD 0 | ledger 0 | claims 8 | main 13 | review/* 5 | archive 49

# BALANCE FINAL (balance-chain + balance-2 in one branch) — worker report (D ROOT, opus, session_01964izCP81mLjwwymWk5t2Q)
Brief dev/handover/briefs/DROOT-balance-final.md. START_CTX ≈ 3 % of 1M (get_session reads 0; estimate) → rollover at 28 %, ceiling 60 %.
Branch **review/balance-final** (pushed WIP). STATUS: WIP — measuring.

## § FIX ROUND 3 — what the branch holds (WIP)
| step | commit | what |
|---|---|---|
| base | ce3f5611 | review/balance-chain SẴN SÀNG KIỂM sha (the brief's base; NOT f9a37b7e, which reverted residence-seats-r1) |
| balance-2 r1 back | a35cf722, 34d3f5ed | the chain's step 1 (d8a3a76f) had REVERTED balance-2 r1's own code (HH gate hhThNoSon 70 / hiếu 62 / outQ 30 / HH Danh 70, ctxTaste 18 / ctxCap 30, lễ nghĩa double charge fix, map robbery risk, clamps, BAL.rk card chances). "Chain + balance-2 in ONE branch" → revert of that revert; j8 PEND.prep keeps main's shelf-set worn-only Sắc; main's newer j8 night card line typed 40 → BAL.rk.vpTake (same family) |
| balance-2 r2 C1–C3 | merge 0cefa0f8 | clean: odO_3 42 / odO_7 40 / odP_2 40 / odP_5 46, deck o[0] 48/48/53, cam/ky lv 2, vu lv 3, Múa loss = BAL.tw.g.vu[2], jbalcore ARTFX/ARTS.u deck lines |
| residence-seats-r2 | merge 668fbb1c | supersedes the folded r1; scan: every line rs-r2 adds (19 files) present unchanged, 0 missing |
| night-final case 6 | 7867ce0f | FOUND: an NPC's «Tiến cử … hầu thay» (jagmaid AG3 amSendQ) was decided AFTER her night: she kept the night record + gains + conception roll AND the risen maid got a record (forced probe: 2 records in one tuần). Now decided before the night, as the player's PEND.ksp (the maid takes the night). Probe after: 1 record. |
| Y thuật care family | 7df8bb4b | careY(p) = artO(y) + BAL.art.care (6) once Y ≥ BAL.mort.life.careYt; careYt 2→1 read by every typed Y≥2 care gate (birth risk + text, poison spotting j8 oSee + line, j70 wound, jface ×2, jrash, j67); gate.yCure 3→2 (an thai / chữa con / «Tự bốc thuốc» card, was typed 3); ARTFX/ARTS.u texts follow |
| newest main | ecd5e4dd | merge origin/main 36e574fa (jbal entryToastMs line; assemble list) |
| balance-2 r1, really | 09714b08 … f4a5a01f + jrd_cn | the chain had also LOST (in merges, not only d8a3a76f) r1's HH gate (hhThNoSon 70 / hiếu 62 / outQ 30 / RANKS HH Danh 70), ctxTaste 18 / ctxCap 30, lễ nghĩa double-charge fix + dutyDanh, map robbery risk, clamps → cherry-picked 839f30b3 8a0c34b1 7732102a c361b330 cf39f284 (each conflict onto main's one-core keys: BAL.eff.jecon.econDoDuty, kapO_3, G[0]); dd2114df already in |
| art Danh milestone | 83134b1d | BAL.art.danh {3:3,5:6} → {2:3,4:6} (her + NPCs); texts follow. bfD (20 lives): Danh blocked 17–24 % of promotion months vs live 7–8 % |
| newest main ×2 | 80ca39b6, 531ae10a | merge origin/main b3d2ccc7 (residence-seats r2 live) and 12a1e4be (poison road r2); j8 + assemble token-merged |
| poison-hit family | e4444421 | j8 rival poison + j42 typed `35+R(30)` / `strong?120` → ONE key BAL.eff.j8.hit {lo:45,r:30,strong:120}, her and NPCs; lo 35→45 (see FINDINGS) |
| newest main (C-AG LIVE) | b2440df2 | merge origin/main 5e6490b4 (ag-all-2-land LIVE e18697fe + shop-panel). Main's AG card tables kept; ours re-applied inside them: art odds via the one ladder (P3C.dance, cx2O court/nurse, cx.portrait her + NPC ×2, qinCard, j14 poem, tsDenOdds, findO→careY); the per-card multipliers that duplicated the ladder are gone (par3.dance.vu, par3.qin.cam/tt, cx.portrait.k, cx2.court.thi, cx2.nurse.y, jbal find.findY); artOE item boost only for her own bag; Múa loss par3.dance.l = BAL.tw.g.vu[2]; cx2.kidHeal.y = BAL.art.gate.yCure; BAL.rk.discover/nurseGift/kneel removed (main's keys hold the same values). Static guards PASS; in-page smoke OK |

Arms: live = origin/main b2a9d349 build (started before main moved; main's later commits are UI), shards 0–2, 10–11, 20–21 (SEED 1000+shard). Final branch arm bfE on 83134b1d, shards 20–23 (paired seeds). Diagnostic arms bfA/bfB/bfC/bfD (earlier builds) kept for the family tables.
NPC Sủng (poison-road finding): on this branch NPC Sủng does NOT saturate — bfD m12/24/36/60 mean 25/20/18/21, share ≥ 95 = 0.01–0.02, share ≤ 20 = 0.58–0.70. HER Sủng is 98–100 from m12 in both live and branch (the bot's own Sủng saturates).
FINDINGS at live3 (main 12a1e4be, 112 lives) vs bfG (531ae10a, 75 lives), paired seeds 1020–1023:
- Poison deaths 2.87 vs 1.11 /100 y, early < 3 y 20 % vs 11 %. The poison trace (inpz.js) shows a hit takes 35+R(30) Sức and kills only when her Sức ≤ that. Hits per 100 y are 10.6 live vs 8.2 branch, and deaths per hit 25 % vs 12 %. Her Sức at rank 3–5 averages 49–51 live vs 54–55 branch, with live holding 27 % of tuần at Sức 30–49 vs 6 % on the branch. Why: the 10-night ledger plays her summoned nights inside tối, so unused khắc per buổi is 0.14 live vs 0.58 branch (rank 3), meaning fewer Sức-costing cards. Model: lo 45 → ~2.0 poison deaths /100 y on bfG's hits (live 2.6–2.9); lo 50 would match but hits NPCs much harder. Fix e4444421 (lo 45), measured in arm bfH.
- Kids /y 0.073 vs 0.039 (her conceptions 0.239 vs 0.146 /y) while NPC conceptions per life-year are 1.63 vs 3.13. Her share of the ledger's 10 nights a tuần is high: her Sủng is 98–100 and NPC mean Sủng is 15–25. BAL.nt.concF is two-way, so lowering it would push NPC births further under live; NOT changed. The lever is the night choice (jagemp empPick / jledger nightCh), and jag* is under the C-AG freeze → OWNER FLAG.
PRE-AG paired tables (live3 = main 12a1e4be, 139 lives; bfH = e4444421, 111 lives; seeds 1020–1023, Vừa, 8 y):

| arm | lives | HH | ended < 3 y | Phi, median | Quý phi, median | Danh m12/24/36 | deaths /100 y (poison/birth/illness/other) | early deaths (poison) | kids /y |
|---|---|---|---|---|---|---|---|---|---|
| live3 | 139 | 17 % | 18 % | 83 %, m25.5 | 70 %, m45 | 73/80/85.5 | 4.17 (2.62/0.12/0.72/0.72) | 20 (15) | 0.036 |
| bfG (before hit fix) | 75 | 35 % | 11 % | 85 %, m24 | 81 %, m39 | 75/82.5/88 | 3.10 (1.11/0.44/0.89/0.66) | 8 (5) | 0.073 |
| bfH (hit lo 45) | 111 | 30 % | 16 % | 82 %, m27 | 74 %, m39 | 83/82/90 | 3.98 (1.91/0.32/1.12/0.64) | 11 (9) | 0.064 |

HH per origin (HH/lives) live3 → bfH: tt 5/14→3/11 · dtq 2/15→3/11 · muoi 1/14→3/11 · cn 3/14→7/11 · nc 2/15→5/12 · bd 1/14→1/12 · td 1/13→3/12 · ch 5/14→4/11 · thd 2/13→4/10 · cnv 1/13→0/10.
NPC Sủng is not saturated on either arm. Her Sủng is 98–100 on both. NPC mean m12/24/36/60 is 32/23/18/19 live vs 24/18/15/17 bfH.

## HANDOVER (rollover; worker session_01964izCP81mLjwwymWk5t2Q, 18/11 ~18:30Z)
State: review/balance-final = **b2440df2** (pushed, FFs from origin/main 5e6490b4). The pre-AG tables above are the ones that count for the balance decisions. They must be RE-MEASURED on the AG build because AG changes NPC behaviour. Successor steps:
1. Wait for npc-chain-land LIVE (D #2 freeze), then `git fetch --depth=30` main (under flock) and merge it into review/balance-final. Conflicts in very long JS lines: use a token-level 3-way merge (git merge-file over word tokens). Keep main's AG card tables and re-apply ours inside them (see the b2440df2 row). Rebuild: `python3 dev/build/assemble.py && bash dev/site/build_site.sh`.
2. Paired arms on the FINAL sha vs live main, same seeds, ≥ 120 lives per arm. Use `SEED=1000+shard OUT=<dir> YRSTOP=8 INPX=inb2r2.js,inbf.js bash dev/measure/runbal2.sh <abs game.html> <shard> <lives> sens`, at most 4 browsers in total (OOM killed 2 shards at 6). Tables: `python3 dev/measure/anbf.py live=<dir> br=<dir> [--orig] [--fates]`. The poison trace is in x.ix.pz (inpz.js).
3. Targets to check: HH ≥ live − 3 (pre-AG +13), deaths and early deaths ≈ live (pre-AG ✓ with hit lo 45; if still low, BAL.eff.j8.hit.lo can go up to ~50), Phi/QP ≈ live, Danh m24 ≈ live.
4. Gates on the final sha: one-core-guard (+bind/text/text-rule, time-spill), balance-core, ledger, night-multi, night-final ×5, night-steal-unit, night-coop-park, coop-night, coop-e2e (vs live), quickcheck --runs 5 (old save), Fold 755x1000@2 + iPad 1180x820@2 shots (scratch, not committed).
5. Finish this report: SẴN SÀNG KIỂM <sha> + touched-file list (`git diff --stat origin/main...HEAD -- dev/build`), FOREMAN_D_STATUS line, send_message to Foreman D #2.

OWNER FLAGS (for the final report):
- Kids /y about 1.8× live (her conceptions 1.5× live, NPC conceptions per life-year 0.5× live). Her Sủng 98–100 wins a large share of the ledger's 10 nights a tuần. BAL.nt.concF is two-way and would push NPC births further under live, so it is unchanged. The lever is the night choice (jagemp empPick / jledger nightCh): an owner/design call.
- Seats: seat vacancy blocks 10–29 % of promotion months on the branch vs 0–10 % live pre-seats (BAL.seat unchanged per brief).
- Laws (START_CORE 18 laws): this round only moves numbers into BAL and merges one-ladder art odds (law 4). It adds or changes no choice, cost or trial, so laws 2, 3 and 5 are untouched.

## BALANCE-FINAL #2 (session_01964izFstyuseJzaqthXyhP, from 18/11 ~17:55Z)
START_CTX ≈ 5 % of 1M (get_session reads 0, so this is an estimate) → rollover at 30 %, ceiling 60 %. Depth 3.
- 17:55Z: AG paired arms started: agL = live 5e6490b4, agB = branch b2440df2; shards 20–21 (SEED 1020/1021), 60 lives each = 120 per arm, 4 browsers, YRSTOP=8, INPX=inb2r2.js,inbf.js (branch's dev/measure scripts for both arms). About 3 min per life, so roughly 3 h.
- Waiting for npc-chain-land LIVE (narrowed freeze; jbal.js frozen). Main is not pushed.
- 18:10Z: my commit ef354e4 on this docs branch wrongly deleted the whole tree (a no-checkout worktree with an empty index); the next commit restores d5bc618's tree exactly + this section.
- ~18:10Z: npc-chain-land LIVE (main d3ea24e8, freeze lifted). The first AG arms were stopped at 3–4 lives (both builds now old). Merged d3ea24e8 → **review/balance-final 284d10cc** (pushed). Token-level 3-way merge: assemble list, j24, jagacts3 clean; j8 stealWin = main's ghenUp(t, amount, reason, a) carrying our per-mode amount (M.ghen==null ? BAL.steal.ghen : M.ghen); rivalNight keeps night-final case 6. Word-diff check: every change from both sides is present. Static guards on 284d10cc: one-core-guard / bind / text / text-rule / time-spill PASS.
- ~18:12Z: paired arms restarted: ncL = live d3ea24e8, ncB = 284d10cc, shards 20–21, 60 lives each (120 per arm). Then the browser gates, then SẴN SÀNG KIỂM. Note: shown-odds-r2 is being landed on main by land-m; if it lands first, I merge it before the final gates (odds display only, no re-run of the arms).
- 18:13Z: ncB shard 21 crashed within its first minute. inpage6.js's catch read S.origin while S was undefined, which hid the real error. A debug copy of the harness (/home/user/wt/dbg, catch guarded + error stack recorded as a 'dbg' field) re-ran seed 1021 for 3 lives (ch, thd, cnv) with NO crash, so it did not reproduce. 18:25Z: ncB 21 restarted for 60 lives on the debug harness; any crash there is recorded as a CRASH life with its stack. The other 3 shards use the normal harness; the catch only matters on a crash. Pace ≈ 4 min per life, so the arms finish ≈ 22:30Z.
- 18:48Z: LIVE main = 94d11623 (shown-odds-r2 + monthly-ration-r6; jration.js is a new economy module). The nc arms were stopped at 6–9 lives per shard with 0 crashes in 30 lives. Merged 94d11623 → **review/balance-final 16b3c8c8** (pushed): token merge clean (assemble list, j24, j8, night-steal-unit); word-diff check keeps both sides; no reads of the BAL keys this branch removed. Static guards PASS (one-core-guard 349 modules 0 fails, bind 1243/0, text, text-rule, time-spill).
- 18:50Z: FINAL arms started: rL = live 94d11623, rB = 16b3c8c8, shards 20–21, 60 lives each (120 per arm). Both arms use the guarded harness copy (/home/user/wt/dbg: the inpage6 catch is guarded, the stack is recorded). ETA ≈ 22:50Z.
- ~20:50Z: the browsers leaked memory (~3 GB each after 2 h). I stopped them after 58 live + 46 branch lives (results are saved per life) and re-ran the rest as short shards (22–27, 13 lives each, a fresh browser per shard, same seeds on both arms).
- 21:40Z: loss probe (dev harness inpl.js, 10 branch lives). Real pregnancy endings without a birth: 7 monthly miscarriage rolls (pregMonthP), 3 weather events (wxHit), 2 trips (trip), against 7 births. The probe also logged 134 false hits from nightCh's pregUnk wrapper, which clears S.preg for one call and restores it in `finally`. The miscarriage settings (BAL.pgRisk, BAL.mort.birth.misX .62) are identical on live and the branch.
- 22:55Z–00:00Z: merged live main 53544bd8 → 7ebdb6c7, 1130a49e → d80645ec, 9a1d6922 → **778537e7** (all pushed). Conflicts: the assemble list (main's jgedata_w1, jmapz and jagacts4 added; 352 modules, no duplicates) and j42 srvRise. For srvRise I kept main's single riseCore promotion rule and apply the branch's balance-2 fault 9 Danh carry-over (BAL.danhG.srvRise) just before it. Static guards pass.

### FINAL ARMS (AG build): live 94d11623 vs branch 16b3c8c8, seeds 1020–1027, YRSTOP 8, 0 crashes
| arm | lives | HH | ended before HH/cap | ended < 3 y | Phi, median month | QP, median month | HH median month | Danh m12/24/36 |
|---|---|---|---|---|---|---|---|---|
| live | 136 | 53 (39 %) | 20 % | 9 % | 92 %, m27 | 86 %, m39 | m67 | 91/99.5/100 |
| br | 124 | 50 (40 %) | 24 % | 8 % | 91 %, m24 | 82 %, m42 | m60.5 | 92/96/99 |

| arm | life-years | deaths /100 y (poison / birth / illness / other) | early < 3 y deaths (poison) | kids /y | her births /y | her losses /y | loss share | NPC Sủng m12/24/36/60 |
|---|---|---|---|---|---|---|---|---|
| live | 828 | 2.29 (0.12/0.48/0.85/0.85) | 6 (1) | 0.074 | 0.064 | 0.039 | 0.38 | 46/39/39/31 |
| br | 724 | 2.63 (0.00/1.11/0.41/1.11) | 7 (0) | 0.108 | 0.095 | 0.079 | 0.45 | 38/33/29/25 |

Targets: HH 40 % vs 39 % (target ≥ live − 3: ✓). Deaths 2.63 vs 2.29 and early deaths 7 vs 6 (≈ live ✓; poison 0). Phi 91 vs 92 % ✓. QP 82 vs 86 % (−4, ≈). Danh m24 96 vs 99.5 (−3.5, ≈).
- HH drop seen at 104 lives (47 % vs 37 %) was small-n: it closed to 39 vs 40 % at 136/124 lives on the same seeds. The pre-AG gap (+13) is gone because the AG build already raised live HH from 17 % to 39 %.
- Birth deaths 1.11 vs 0.48 /100 y = 8 vs 4 deaths. This follows from 1.5× her births. The per-birth risk is unchanged.
- Measurement caveat: "her nights /y" and "conceive %/night" (inbf.js) are NOT comparable between the arms. inbf wraps night(), which the live AG path rarely calls for her (0.7 nights/y counted live). Conceptions, births and losses are counted from S.preg/kids and ARE comparable.
- Confirmation arms on the merged sha (cL = live 9a1d6922 vs cB = 778537e7, shards 20–23 × 13 lives) started 00:00Z.
- 00:17Z: a container restart killed the confirmation arms. They were restarted on shards 21, 23, 24 and 25; the partial lives of shards 20 and 22 are kept. Interim at 59 vs 48 lives (01:50Z): HH 46 vs 50 %, ended < 3 y 8 vs 4 %, Phi 95 vs 92 %, QP 88 vs 79 %, Danh m24 99 vs 97. This matches the final arms.
- 01:00Z–01:55Z: merged live main bb8e8ec9 → **02171abd** (jnroadhp added to the assemble list), then 96188526 (jstagehere and jnotice added, 355 modules; jbal line 1 keeps main's noticeMax and entryToastMs note and the branch's outQ 30). Static guards are running.
- STATE / ETA (01:55Z): confirmation arms end ≈ 02:45Z, then browser gates on the final sha, then SẴN SÀNG KIỂM ≈ 03:45Z.

### PRIORITY #1 CHECK: main never pushed, no PR, no owner contact, shots only in scratch.
### STATE 19/11 ~03:45Z — review/balance-final = **0281bbf7** (pushed). NOT YET SẴN SÀNG KIỂM: night-final / night-multi still flaky (see below)
Merges since 16b3c8c8: 53544bd8, 1130a49e, 9a1d6922 (j42 srvRise = main's riseCore + branch's BAL.danhG.srvRise Danh carry-over applied before it), bb8e8ec9, 96188526 (jbal line 1: main's noticeMax/entryToastMs note + the branch's outQ 30), 1cf5e8bb (current live main). assemble.py = 356 modules, no duplicates.
Test-only commits: ffc07bd1 (balance-core Tai mắt under window.__tmOff because jagknow's mat getter drops a plain set; night-final: every rival marked met so no jtsb card; non-night Q cleared before case 7; case 8 runs with BAL.ag.day.on and custom nights off, because AG switches visRoll off), 0281bbf7 (rules-one-source: the no-son need reads BAL.hhThNoSon / hhThNoSonHieu instead of the old tn + 30; quickcheck's core gate G2 failed before this).

Confirmation arms (778537e7 vs live 9a1d6922, seeds 1020–1025, 62/61 lives): HH 44 vs 44 %, ended < 3 y 8 vs 10 %, ended before HH/cap 16 vs 25 %, Phi 95 vs 89 %, QP 89 vs 75 %, deaths 1.88 vs 2.38 /100 y, kids/y 0.083 vs 0.107, Danh m24 98 vs 97. Pooled with the final arms: QP 87 vs 80 % (−7) and ended before HH/cap 19 vs 25 %. Both are FLAGGED for the reviewer; HH, deaths and Danh hold.

Gates on 0281bbf7 (run one at a time on an idle box; under 4-browser load the night tests flake much more):
| gate | result |
|---|---|
| one-core-guard / bind / text / text-rule, time-spill | PASS |
| quickcheck --runs 5 (old save, perf vs live, core gates) | PASS (render 241/222 ms, tab 447/474, buổi 1043/1506, tasks > 200 ms 20/22) |
| balance-core | PASS |
| ledger | ALL PASS |
| night-steal-unit | PASS |
| night-coop-park | ALL OK 6/6 |
| coop-night | 105/105 |
| coop-e2e | 63/63 branch, 63/63 live 1cf5e8bb |
| Fold 755x1000@2, iPad 1180x820@2 shots | origin screen renders, 0 page errors (scratch only) |
| night-multi | 6/7 pass over the last runs; failures: case 6 (the defender saw the attacker's cards) and case 5 (kept → keepNoSteal, kg null) |
| **night-final ×5** | **1/5 PASS**; fails: case 8 ×2, cases 1+7, one crash in case 9 (`findIndex` of undefined, night-final.js:83). Pre-merge 16b3c8c8 was 0/3 (case 8 every run). Across ~20 idle runs the failing case varies (1, 2, 4, 7, 8, 9). Common symptom: the flip choice (Q pid nfch) never reaches her, or arrives late, so opts is "" or choice is false. |

### HANDOVER (worker rollover at ~27 % context; the coordinator opens the successor)
Successor steps:
1. Fix the night-final / night-multi flakes on review/balance-final (branch-only tests: dev/test/night-final.js, night-multi.js). Hypotheses tried:
   - AG day off for all cases: does NOT fix it.
   - Custom-off + clearing ill/confined in T.fresh: made it WORSE (3/8, new case-8 visQ0 failures), so it was reverted.
   - What helped: no jtsb card, clearing the Q before case 7, case-8 AG/custom off.
   Next suspects: the ledger night choice (jledger) or the AG emperor plan picking the night outside nightCh steering (T.only steers nightCh only), and the sum/visit queue order when AG is on. Run one at a time on an idle box: `node dev/test/night-final.js file://<abs index.html>`.
2. Final-merge current origin/main (it moves every ~30 min; usually only the assemble list + generated files conflict: take main's list + the branch-only jbalcore/jledger/jnf, then `git checkout --theirs index.html sw.js assets.json` and rebuild).
3. Re-run the gates (table above) on the final sha, then write SẴN SÀNG KIỂM <sha> + `git diff --stat origin/main...HEAD -- dev/build` (57 files, +967/−220 at 0281bbf7), the FOREMAN_D_STATUS line, and send_message to Foreman D.
OWNER FLAGS for the final report: kids/y ≈ 1.45× live (0.108 vs 0.074; her births 1.5×, so birth deaths 8 vs 4); seat vacancy blocks promotions (BAL.seat unchanged per brief); QP −7 pooled; NPC Sủng lower on the branch (m12 38 vs 46).
Worktrees on this box (lost on a new session): /home/user/wt/mg2 = 0281bbf7, /home/user/wt/live2 = 1cf5e8bb, arms data in /home/user/wt/arms (rL/rB final, cL/cB confirmation).

## BALANCE-FINAL #3 (session_01964izCNP7knjuDvDqSjZMv, opus, from 19/11 ~03:45Z)
START_CTX ≈ 4 % of 1M (get_session reads 0, so this is an estimate) → rollover at 29 %, ceiling 60 %. Depth 6.
PRIORITY #1 CHECK ('balance final'): OD 0 | ledger 0 | claims 0 (this job) | main 0 | review/balance-final 0281bbf7 = this branch.
- 03:50Z: worktree /home/user/wt/bf3 = 0281bbf7. Step 1: night-final / night-multi flakes.
- 05:05Z: **night flakes fixed** → 4c2f9683 (pushed). Found with a case-repeat harness (each night-final case / night-multi sequence run 20–46×). Causes and fixes:

| # | cause (seen as) | fix | kind |
|---|---|---|---|
| 1 | jmoodknow's "Tin trong cung" news runs after EVERY endTurn, also jnf's held one at the flip: the choice stayed "wait" behind it, so her summons (ksp) was answered first and the defence/attack choice never came (nf 2/4/7, nm 5/6) | jnf step: a kind:"news" card never holds the choice back; showChoice puts nfch at the queue FRONT (no dialog may cover the flip choice, night-final #4) | game (jnf) |
| 2 | another dialog queued at the flip (a visitor «Có người tìm đến») goes first by design, but the flip's own summons sat IN FRONT of it and was answered before the choice → her night played without the choice (nm 5) | jnf pullKsp: while other dialogs go first, ksp/prep leave the queue and come back after the choice (x.ksp), as openChoice already does | game (jnf) |
| 3 | kmReset drops queued card-flip scenes whose done() never runs → cfBusy() stuck true → in bot mode the choice never shows (nf 8 after nf 7) | jflip: kmOnReset → CFN = 0; tests: T.fresh calls kmReset | game (jflip) + test |
| 4 | the forced flip went to nobody / someone else: AG3 maid pool (jagmaid empPick, `k:"maid"`), jemoact mood noFlip, jmind mindPick slip (random candidate) (nf 2/8, nm 6) | T.only also sets BAL.ag.maid.ch.cap 0, window.__eaOff, BAL.mind.slip 0 (night-multi) while the flip is forced, restored after | test |
| 5 | a dialog queued by nextBuoi as tối ends held the commit back, so T.flipTo's steering was undone before the real flip (nf 2/7) | T.flipTo answers it and ends tối again, still steered; T.toChoice / T.pass answer the dialogs that go first before the choice | test |
| 6 | case 8: his forced visit (chance 100) still missed: roll() caps at BAL.odds.hi; world events / his illness also block it | case 8 lifts odds.hi to 100, world off, emp.ill null for the case (it tests ORDER, not odds) | test |
| 7 | T.fresh sometimes gave < 2 rivals on the tray (crash `findIndex`/`.id` of undefined) | T.fresh re-rolls the life until ≥ 3 rivals can serve | test |
| 8 | case 1 read khắc after the bot answered an evening dialog that costs a khắc; case 2's seeded win roll was drawn by another call first | k0 read as tối starts; seq of 4 wins | test |
Tried and dropped: AG day loop off for all cases (the flip then often picks nobody — as #2 found).
Result on 4c2f9683, idle box: **night-final 8/8, night-multi 8/8** (+ harness: 46 nf cases, 20 nm sequences clean).
- 05:20Z: merged origin/main fd6118c (maid-ladder-6, art-wiring-1119) → **242f7f3e** (pushed): assemble list = main's + jbalcore/jledger/jnf (357 modules); j2 S init = ours (origSet BAL.start) + main's lad6; index/sw rebuilt. Static guards PASS (one-core-guard / bind / text / text-rule, time-spill). Browser gates running.
