PRIORITY #1 CHECK: grepped OWNER_DECISIONS, HANDOVER, D-temper-robot-0725 (COMMON + SEATS R1–R4), robot-audit-E; fetched origin/review/robot-realtap, origin/review/renderer-mem. Reused E's real-tap harness (dev/test/robot-rt.js, realtap.js) and F10's watchdog (renderer-mem-lib.js). Nothing rebuilt.

# R1 report — rerun of E's solo cnv_ban lives (real taps, no cap, no bot exit)
Seat R1 under Foreman D. Branch review/rerun-cnv-ban @65bb8e80 (results + reviews). LIVE game build 5e013076. Harness base review/robot-realtap + bfa73a6e (kc2End exits) + F10 hooks (RT_MEM / RT_LIGHT / RT_HANGKILL).

## Result: 15 of 16 lives finished VALID, 1 UNFINISHED (hang)
Every valid life ended by death or by the forced age-30 «Xuất cung tuổi 30». exitPick is null on all; at every age-25 exit card the bot took «Xin ở lại» (sibling option existed, so no exit road was ever taken by the bot).

| life | persona | end | age | buổi | taps | valid | moments / review |
|---|---|---|---|---|---|---|---|
| cautious-2 | cautious | Xuất cung tuổi 30 | 30 | 1693 | 2609 | yes | dev/handover/robot/review/cnv-cnv_ban-cautious-2-{moments,review}.md |
| cautious-3 | cautious | Xuất cung tuổi 30 | 30 | 1420 | 1816 | yes | …-cautious-3-… |
| cautious-5 | cautious | Hồng nhan bạc mệnh (Thái hậu) | 24 | 850 | 5607 | yes | …-cautious-5-… |
| random-1 | random | Hồng nhan bạc mệnh | 26 | 987 | 204 | yes | …-random-1-… |
| random-4 | random | Xuất cung tuổi 30 | 30 | 1419 | 101 | yes | …-random-4-… |
| random-5 | random | Xuất cung tuổi 30 | 30 | 1562 | 5825 | yes | …-random-5-… |
| rebel-1 | rebel | Xuất cung tuổi 30 | 30 | 1706 | 672 | yes | …-rebel-1-… |
| rebel-4 | rebel | Xuất cung tuổi 30 | 30 | 1418 | 3295 | yes | …-rebel-4-… |
| speed-2 | speed | Hồng nhan bạc mệnh (lao phổi) | 31 | 1863 | 259 | yes | …-speed-2-… |
| speed-4 | speed | Hồng nhan bạc mệnh (lao phổi) | 36 | 2588 | 377 | yes | …-speed-4-… |
| lazy-5 | lazy | Xuất cung tuổi 30 | 30 | 1706 | 1322 | yes | …-lazy-5-… |
| lover-1 | lover | Hồng nhan bạc mệnh (bệnh) | 22 | 541 | 964 | yes | …-lover-1-… |
| scholar-2 | scholar | Hồng nhan bạc mệnh (sai đánh chết) | 27 | 1409 | 709 | yes | …-scholar-2-… |
| skilled-4 | skilled | Hồng nhan bạc mệnh (bệnh) | 25 | 1026 | 2198 | yes | …-skilled-4-… |
| skilled-5 | skilled | Xuất cung tuổi 30 | 30 | 1702 | 2256 | yes | …-skilled-5-… |
| speed-3 | speed | UNFINISHED: page crashed at buổi 2819, năm 20 | — | 2819 | — | NO | …-speed-3-… |

Persona → bot mapping (my choice): random→rand, cautious→cautious, rebel and speed→bold, skilled, lover, scholar, lazy→sens. Results, logs, per-life JSON: dev/handover/robot/rerun-cnv-cnv_ban/ (on review/rerun-cnv-ban).

## Harness sha per life
Each result JSON records my worktree HEAD at the last (re)start, so lives that spanned 2 h job restarts mix shas: cautious-2/3/5 4523381f; random-1/4 93812531; random-5, rebel-1/4 90a5b0f5; speed-2 a4e1eca8; lazy-5, speed-3, speed-4 8f20a330; lover-1, scholar-2 8ee776d9; skilled-4, skilled-5 e9803260. All real taps, 0 JS clicks. Only the watchdog and kc2End rules differ between these shas; lives on older shas could not take a kc2End exit road, but none needed one.

## speed-3: UNFINISHED (hang), kept as the LIVE late-game hang case for F10 renderer-mem
- Reached năm 20, buổi 2819, then «Page crashed» (exit 3). Driver resumed it 8 times in total; late game gave ~+40 buổi per 3 h.
- Evidence on review/rerun-cnv-ban: cnv-cnv_ban-speed-3.hang.json (F10 watchdog stacks + RSS), lategame-speed-3.ckpt.json (buổi 2493), crash-speed-3-b2819.ckpt.json (buổi 2819, last state before the crash), lategame-speed-4.ckpt.json (buổi 2277). F10 fix is on review/renderer-mem @008662ef (card normaliser re-running kaNorm → kpOptArt/kitOptUnify over huge option lists). I did not replay on 008662ef: 4 cores for 3 parallel lives.
- Note: speed-4 (buổi 365, renderer 7217 MB) and speed-2 (buổi 1301, 7594 MB) froze once each; both recovered after resume, so the freeze is not deterministic.

## Bugs found (families, with shots in the per-life dirs; shots are not in git)
1. «Tin báo» queue stacks 2–6 copies, one 127-line dialog, ✕ pops one at a time and looks dead. Main source of 15-min stuck events (cautious-2: 15, cautious-3: 21, cautious-5: 10, random-1: 9, random-4: 7, random-5: 4).
2. «Lui» has no effect after 3 real taps: «Tin báo», «Tâm trạng …», «Danh hiệu», «Tin chờ người sai đi», «Tin trong cung buổi này» (speed-2), «Nhờ thái giám tìm thú nuôi» (speed-3).
3. Pet-shop buttons «Xem Mèo mướp / Chó nhỏ lông xù / Chim họa mi / Thỏ ngọc / …» covered by b.kidn / span.kitb in #mb (cautious-5, speed-3).
4. Zero-size buttons on the Tích Cần viện page («Hoàng tử Vĩnh Tôn», «Người trước», a merged label of menu cards) (random-1/4/5).
5. «Nguy hiểm chung: 54» covered by #rtoast.karesult (speed-2).
6. #kmrew screen with an empty title, 15-min stuck (cautious-3, cautious-5).
7. Title screen did not reopen the life within 5 min (random-4, prestart-stuck-1.png).
8. Label «kfxon j59sz» shown as a button caption at buổi 16 (lover-1): internal id, not a word (VANPHONG).
9. Rank mismatch: end card «Phẩm cao nhất: Đáp ứng» vs HUD/harness rank 0 (lazy-5). Needs a check by D.
10. Illness deaths with Sức 100/100 shown behind the end title (skilled-4 «Liễu yếu gặp sương», lover-1, speed-2/4 lao phổi): no warning stage I could trace in the log. Suggest a sickness warning step.
11. End card «(khả năng: rất thấp)» prints an odds word (cautious-5): VANPHONG allows the ladder words only.
12. JS `f.rk.split is not a function` ×2 (cautious-5).
13. Renderer freeze 7–8 GB (speed-2 buổi 1301, speed-4 buổi 365) and the late-game hang (speed-3): F10 family.

## Open questions for D
- Forced age-30 end: 9 lives ended by «Xuất cung tuổi 30», but speed-2 died at 31, speed-4 at 36 and speed-3 reached năm 20 (age ~37+), so the gate does not always fire. Which rule holds it back (rank, lãnh cung, sickness)? I did not find it in the code.
- Scope: the RERUN LIST says 19 lives, only 16 are solo cnv_ban; U15, U16 and U21 are co-op and stay with E.
- Caveat on reviews: the runner is autonomous. Reviews come from harness logs, trace, dead/stuck rows and the shots I opened (end.png, a few looks), not from watching live. Lives on the older harness (cautious-2/3, random-1/4/5, rebel-1/4) wrote no moment rows, so their reviews are thinner and score only what the log supports (n/a otherwise). Only lazy-5, scholar-2, skilled-4/5 and speed-2/4 have full moment files.

~100% xong / ~0% chơi được (cnv_ban rerun: 15/16 valid, 1 unfinished by design)
