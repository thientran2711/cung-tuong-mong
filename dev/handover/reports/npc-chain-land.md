# npc-chain-land — LANDER report (session_01UV1Szi7UbTAbk3W9QSD6h7, successor of mood reviewer SzhYFat)

PRIORITY #1 CHECK: OD n/a (landing task, no new feature) | main c7375c0c merged | review/* review/npc-chain-land (this), review/ag-all-2-r2 (merged at 521a4ac3) | claims C-AG #7 SzgaEMtM9 (foreman), main s38 SzjyZ9i1
START_CTX ≈ 3 % (get_session read 0; own estimate). Rollover line = 28 %, ceiling 60 %.

## RESULT: PASS 7f96f559 (review/npc-chain-land; origin/main c7375c0c is its ancestor → fast-forward)

Built from dde6a641 (feelings-18-r1 + mood-mem-r2 + kit-figure-mood r6 + ag-all-2-r2 521a4ac3 + main 4c8568f5) plus:
1. 620465fd — merge origin/main 99f3978d (display-shelf r3, clean) + site rebuilt.
2. a090dd3e — **G4 coop-one-world ROOT FIX** (see below).
3. a21354fe — site rebuilt.
4. 7f96f559 — merge origin/main c7375c0c (dudo-blank r1; source clean, only index.html/sw.js conflicted → rebuilt).

### (b) G1 one-core-bind j25:11 / j78:127
On the merged source the gate is clean: `one-core-bind.js` 1196 prints, **0 mismatches**; `BAL.eff.j9.evRun` / `BAL.eff.j2.evRun` / `BAL.eff.j2.run` no longer appear in any dev/build file (the ag-all-2 merge changed those lines). quickcheck G1 (guard, text, bind, text-rule) PASS. No code change was needed.

### G4 coop-one-world FAIL → root cause + fix (whole family)
- Symptom (quickcheck run 1, under CPU load): "guest week changes the world". DBG: `.R[#8].evm` {} → undefined; another run: `S.fdead` / `S.dnames` (a eunuch retired) written by the guest's week. Main passed 3/3 under the same load (6 busy loops), the branch failed 1 in 3. Each part branch (521a4ac3, 68178e5d, 43fbf2e7) passed unloaded → load-dependent timing.
- Root: ag-all-2's lazy agent queue `jagday.js agLzGo/agLzRun` draws NPC deeds in `setTimeout` chunks. A chunk queued for one world ran on another world (co-op seat swap in the one-page probe; equally a load / new life in play), and outside the one-world guard. Its only guard was the week+buổi key, which the other world also matches.
- Fix (a090dd3e): `agLzNew` stores `w:S`; `agLzRun` drops the queue when `Q.w!==S || !agDOn()` (agDOn is false on a guest seat). The family check found the other new setTimeout callbacks in the delta: `agSyncNow` (view sync, no world write) and `adHapNow` (already gated on S, writes only S.adHap of the live world). Neither needs a change.
- After the fix: 5/5 PASS under the same load (seeds 7, 7, 3, 7, 5).
- **ag-all-2 r2 must carry this fix too.** Its reviewer SzibgyT is inactive, so the message did not go through. The delta after 521a4ac3 (fix2 commits up to 0a627b59) is NOT merged here because no PASS sha came.

### Gates on the final head 7f96f559 (unless noted)
| gate | result |
|---|---|
| quickcheck --runs 5 --cpu 4 | PASS (G1–G5 core gates PASS, time-spill PASS, old save from live loads + plays a buổi, perf median new/live render 164/179, tab 306/329, buổi 885/864, tasks>200 13/13) |
| coop-e2e (a21354fe) | **63/63**. The first run gave 61/65: the host got stuck on the "Tuyển chọn: Môn thi" mini-game card at buổi 2:2. That is the known flake of this suite (earlier reports: 51/59, 57/60), and the rerun was clean. |
| feelings18 | 34/34 |
| mood-mem | 16/16 |
| moodknow-step0 | 19/19 |
| ag-moodknow | 33/33 |
| one-core-guard | PASS |
| emotion-acts / emotion-acts-2 (a21354fe) | PASS / PASS. Earlier runs while the box was loaded gave FAIL 1 and one crash in the test's own fresh() (S undefined), both random. |
| coop-one-world 7 + 3 | PASS (inside quickcheck) |
| dudo-blank (main's new test) Fold + iPad | PASS |
| fig-seal 755x1000@2 + 1180x820@2 | 0 page errors. Every known figure has a seal, inside the frame, not on the face, beside the head (room / event / place / pop). The Fold room showed a maid as a grey silhouette ("Người lạ") with no seal, as the rule says. On iPad a maid with art (Ngọc Lan) has her seal. |
| "Đang:" line (Fold + iPad) | The Emperor's tap card (emoBox) shows ĐANG "Khóc suốt đêm" and CẢM XÚC "Đau khổ (nặng)" in the kit frame, with the seal beside his head. |

Shots are in scratch only (/home/user/wt/shots), none in git.

### Open
- ag-all-2 r2 delta (fix2 + perf, 177d1e0d..0a627b59) is not merged; that reviewer is inactive. Whoever lands it: merge on top of 7f96f559 and keep a090dd3e.
