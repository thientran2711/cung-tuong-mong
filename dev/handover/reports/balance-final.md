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
- 18:25Z: npc-chain-land LIVE (main d3ea24e8, freeze lifted). The first AG arms were stopped at 3–4 lives (both builds now old). Merged d3ea24e8 → **review/balance-final 284d10cc** (pushed). Token-level 3-way merge: assemble list, j24, jagacts3 clean; j8 stealWin = main's ghenUp(t, amount, reason, a) carrying our per-mode amount (M.ghen==null ? BAL.steal.ghen : M.ghen); rivalNight keeps night-final case 6. Word-diff check: every change from both sides is present. Static guards on 284d10cc: one-core-guard / bind / text / text-rule / time-spill PASS.
- 18:27Z: paired arms restarted: ncL = live d3ea24e8, ncB = 284d10cc, shards 20–21, 60 lives each (120 per arm). Then the browser gates, then SẴN SÀNG KIỂM. Note: shown-odds-r2 is being landed on main by land-m; if it lands first, I merge it before the final gates (odds display only, no re-run of the arms).
