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

Arms: live = origin/main b2a9d349 build (started before main moved; main's later commits are UI), shards 0–2, 10–11, 20–21 (SEED 1000+shard). Final branch arm bfE on 83134b1d, shards 20–23 (paired seeds). Diagnostic arms bfA/bfB/bfC/bfD (earlier builds) kept for the family tables.
NPC Sủng (poison-road finding): on this branch NPC Sủng does NOT saturate — bfD m12/24/36/60 mean 25/20/18/21, share ≥ 95 = 0.01–0.02, share ≤ 20 = 0.58–0.70. HER Sủng is 98–100 from m12 in both live and branch (the bot's own Sủng saturates).
FINDINGS at live3 (main 12a1e4be, 112 lives) vs bfG (531ae10a, 75 lives), paired seeds 1020–1023:
- Poison deaths 2.87 vs 1.11 /100 y, early < 3 y 20 % vs 11 %. The poison trace (inpz.js) shows a hit takes 35+R(30) Sức and kills only when her Sức ≤ that. Hits per 100 y are 10.6 live vs 8.2 branch, and deaths per hit 25 % vs 12 %. Her Sức at rank 3–5 averages 49–51 live vs 54–55 branch, with live holding 27 % of tuần at Sức 30–49 vs 6 % on the branch. Why: the 10-night ledger plays her summoned nights inside tối, so unused khắc per buổi is 0.14 live vs 0.58 branch (rank 3), meaning fewer Sức-costing cards. Model: lo 45 → ~2.0 poison deaths /100 y on bfG's hits (live 2.6–2.9); lo 50 would match but hits NPCs much harder. Fix e4444421 (lo 45), measured in arm bfH.
- Kids /y 0.073 vs 0.039 (her conceptions 0.239 vs 0.146 /y) while NPC conceptions per life-year are 1.63 vs 3.13. Her share of the ledger's 10 nights a tuần is high: her Sủng is 98–100 and NPC mean Sủng is 15–25. BAL.nt.concF is two-way, so lowering it would push NPC births further under live; NOT changed. The lever is the night choice (jagemp empPick / jledger nightCh), and jag* is under the C-AG freeze → OWNER FLAG.
(final tables follow when the arms finish)
