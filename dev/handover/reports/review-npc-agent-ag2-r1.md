PRIORITY #1 CHECK ('npc-agent'): OD 5 | ledger 0 | claims 8 | main 1 | review/* 4 — review/npc-agent-ag2 cc1649a4 (worker session_011xDdVRNkhkw9vZBGkZ1mDK, Foreman C) on AG1 review/npc-agent-r1-fix2 2756d2d2 (PASS; NOT on origin/main yet → AG1 rides in this branch). Emperor-agent code exists nowhere else; the 10-night ledger is out of scope (review/night-ledger).

# Review r1 — review/npc-agent-ag2 (AG2: the Emperor is an agent)

Reviewer: opus (BIG tier), session_011xDdVPQSbLtuVm6zoyJHBN. START_CTX ≈ 4 % (own estimate), end ≈ 25 %. No rollover.
Read: START_CORE, START_WORKER, START_REVIEWER, topic/people-life.md, topic/coop.md, OD 16/11 17:15Z / 18:10Z / 18:40Z / 19:00Z / 19:05Z (verbatim), worker report npc-agent-ag2.md, design npc-agent.md §1a / §3.2 / §5.
Branch: **review/npc-agent-ag2-r1 @9a5ff46d** = cc1649a4 + merge of origin/main 6c4f21c3 (conflicts only in generated assets.json / index.html / sw.js → main's, rebuilt) + 2 fix commits. origin/main is an ancestor (fast-forward ok).

## Verdict
**PASS review/npc-agent-ag2-r1 9a5ff46d** (with the reviewer fixes below; AG1 2756d2d2 goes to main with it).

## Checks
| # | check | result |
|---|---|---|
| 1 | owner numbers / ONE CORE | BAL.ag.emp.summon [90, 65] = OD 18:10Z "90 %, 65 % when busy with court / ill"; busy = Emperor ill, Chăm chính sự, court crisis (j55 tdCrisis; its extra roll 30 now runs only with the loop off). Custom [40,20] moved from FAIRN to BAL.ag.emp.custom; pillow deed BAL.tw.g.pillow; seat BAL.ag.emp.seat. one-core-guard PASS (inline 6644 ≤ 6691), onecore-pick TOTAL 0. Option text prints the BAL numbers. OK |
| 2 | his choice = mindPick × memory; co-op deterministic | flip → empSummon + empPick (mindPick over nightCh × empMemF); host only (agOn; guest never decides, result synced). Shown weights = used weights: hooked mindPick over 40 flips, 0 differences. coop-night **105/105**, coop-e2e **62/62**. **FIXED (fault A below)** the co-op friend's memory. |
| 3 | words + kit | nightWhy words cổ trang, no %, odds by ladder word (chanceLvl). No new kit part: reason shown in the existing kmres result chip of the flip scene (KIT §67). **FIXED (faults B, C below).** |
| 4 | LUẬT SỬA CẢ NHÓM (old dice of rows 1, 2, 4, 5, 25 + two-way 24) | grep: j8 flip roll 90/65 → empSummon; j8 weighted pick → empPick; j55 roll 30 gated by empOn; j75 FAIRN.custom → empCustom; j8 seat roll 12 + plain pick → empSeat / empSeatPick; j75 rivalNight rel<−20 + roll 20 → pillowNpc. All old paths only behind BAL.ag.on = 0. Remaining (not these rows, noted below): jemoact flip wrapper (his own drink-alone / sleepless act), j95 empWk.busy. OK |
| 5 | old saves | S.emp.met lazy; quickcheck old save from live 6c4f21c3 loads and plays a buổi; agemp_check case 7 (no S.emp.met, 30 tuần, 0 throws). OK |
| 6 | balance | my bot sample (run_par sens, 13 lives, 191.5 years, seed 3, 4 pages, 0 page errors, inpage6 + inag + intrace + innight + a pillow counter): her nights 3.45 / yr, **her share 12.7 %** (worker 15.0 % at n = 24, base 11.3 %); he rests 21 % of flips; custom kept 268 · broken 453 · stolen 836; remembered-deed picks 899 / 6599 (14 %); NPC pillow deeds 3.3 / yr, aimed at her 1.07 / yr, hit her 0.53 / yr (≈ Sủng −5 / yr); she reached Hoàng hậu 7 / 13. Sane vs owner rules (she gains nights by DOING deeds near him, OD 17:15Z; harm on her small). OK |
| 7 | build / tests / shots / perf | build_site.sh ok; agemp_check ALL 20 PASS ×6 (after the test fixes), agent_check 16/16, QUICKCHECK PASS (core gates PASS, old save ok, perf new/live render 101/264, tab 554/472, buổi 1773/1420 ms, tasks>200ms 19/18 — run while the bot was busy on the same box; buổi within noise). Shots (scratch, not in git): Fold 755x1000 + iPad 1180x820, flip scene "he rests" and "he remembers her dance": reason line readable in the result chip, no overflow, 0 page errors. |

## Faults found and fixed on review/npc-agent-ag2-r1 (commits e61fb0fd, 9a5ff46d)
A. **Co-op friend memory was dead (two-way / co-op rule OD:L594, OD:L96).** The guest's own deeds never counted: on the guest `empMet` returned at once (`empOn()` is false on a guest), and `emp` is a WORLD key, so `myBlob` never sends it — `buildFriend` read `s.emp.met.me`, which a real P.S never holds. Host's deeds weighed her card up to ×1.45, the friend's never. The worker's case 9 passed only because it fed a full S. Fix: a guest's own deed goes to her personal key `S.empMe` (jagemp `empGuestSelf`), `buildFriend` reads `s.empMe` (old path kept). Test case 9 now runs the real path (seat "b" → empMet → myBlob → buildFriend → host weight 1.15).
B. **His reason reached no screen.** `nightWhy().text` (with empWhyTxt) is read only by jflip `resHTML`, which used it only for the custom case: "he rests / he remembers / he breaks the lệ" were never shown (worker: "Shots: none"). Fix: resHTML puts `empWhyTxt(S.nightWhy)` in the same kmres `<small>` line (no-pick chip, her own night, the picked consort). Shot-checked at Fold + iPad.
C. **VANPHONG line 59** ("bất kỳ 'thiện cảm' nào cũng phải nói của ai với ai"): night2 option "thiện cảm -5" → "nàng quý ngươi -5" (relAdd is mutual, same wording as j2 Khiêu khích).
D. agemp_check flaked 2 of 5 runs (each a different case): court not running in that life, another flip wrapper ending the flip before any roll, weight read after the flip moved nightCh. Test-only fixes; 6 / 6 green after.

## Notes (not blocking; for Foreman C)
1. jemoact flip wrapper (his own act: drinks alone / sleepless, `E.eaQ`) still cancels a night by `roll(eaQx)`; it is his emotion act (agent-driven), but those nights show no reason line (S.empWhy not set). Fold into empBusy / empWhy in review/night-ledger or AG3.
2. coop-thin (dev flag, level 0 today): in TH.withSeat the world `emp.met` is shared, so the guest's deed run on the host would land in the host's "me" slot. When thin goes live, register `S.empMe` / the "me" slot as her personal part.
3. j95 `empWk.busy` is still apart from the summon busy rule (worker's note) — keep apart unless the owner says otherwise.
4. Breaking the lệ costs him nothing with Thái hậu yet (npc-agent §6 owner question 2, open).

Shots: scratch only (/home/user/wt/rv-ag2-shots), not uploaded, deleted with the worktree.

## r2 (Foreman C ROOT-3: main moved to 9fdc1199 = trait-pool r1)
**PASS r2 05ebe3da (FF of main 9fdc1199)** — branch review/npc-agent-ag2-r2 = 9a5ff46d + merge of origin/main 9fdc1199.
- Conflicts kept BOTH: assemble.py (main's jnet.js after jtrong.js + our jmind / jagent / jagemp); j75 npcEffort (AG1 deck table + trait-pool's EFF words "Nóng nảy / Ân cần / Khiêm nhường" read by `tv(EFF,v)`); jlost (mindPickBy + `netIs(s,"timid")`); jtin (mindPickBy + `nq(s,"sharp",15)`); generated files main's, rebuilt.
- LUẬT SỬA CẢ NHÓM after the merge: jmind.js (npc-mind, not on main before) still read 27 removed nết words (NET_POOL, STR_TR, the witness weights) → migrated with dev/tools/netmig.py words (jmind only). net-scan old rows now equal main's (removed-word 10 = jbal2 9 + j1 1, P_TR 2). NOTE for the trait-pool owner: `netmig.py` is NOT idempotent on main's files — a second run rewrites j1 (Emperor ETRAITS labels "Đa nghi"→"Kín đáo", "Hiếu thảo"→"Vì gia tộc", the rename comment) and breaks j28 / j72 (`tv(return,v)` syntax error); those three were left as main has them.
- Tests on 05ebe3da: agemp_check 20/20, agent_check 16/16, trait-pool 20/20 (vs base 6c4f21c3), trait-rename-oldsave 9/9, one-core-guard PASS, onecore-pick 0, coop-night 105/105, coop-e2e 62/62, QUICKCHECK PASS (old save ok; perf median of 5 new/live: render 306/352, tab 433/491, buổi 1198/1230 ms, tasks>200ms 16/18). Fold 755x1000 + iPad 1180x820 smoke: flip scene "he rests" / "he remembers her dance" reason line shown, no overflow, 6 tuần played, 0 throws, 0 page errors.
