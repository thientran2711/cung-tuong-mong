# batch-0032 — hourly go-live batch (builder report)

Builder session_01UV1Szgb3UbRCJaMcocuGrF (opus). Coordinator main s27 (session_01UV1Szh248gDvHSAH88RvJm). START_CTX ≈ 3 % (get_session read 0; own estimate). Finished at about 20 %, so no rollover was needed.

**FINAL SHA: `f5220eaa5`** on `review/batch-0032` (base origin/main 744b80e7). Main pushes; the builder did not touch main.

## In (7)
| branch | PASS head | merge notes |
|---|---|---|
| review/kit-size-r7 (incl. minigame-frame-r1 + diemtrang-fx) | 7a8e1fd9 | assemble list union (+ jksize.js), jseat.js then jcoopone.js kept LAST |
| review/kit-size-8-r1 | 61c3283d | union (nothing new) |
| review/opt-greyed-2 | 42936b3f | jgrey.js: main's §84 BAL demo sample + the branch's need[] sample |
| review/time-spill-seed | a6a61b2e | clean (test only) |
| review/diemtrang-score | 8098201f | jtoil.js, 3 hunks: (1) friend's real look `toilFriendRec(p)||toilNpc(p)` + branch `toilMk(rec)`, main dress line kept; (2) main's palace-voice pools (TOIL_SAY/BAND/TRAIT, kLine) kept + branch TOIL_SLIP/toilSlipSay added, and the slip/diêm line is checked first in toilSay; (3) main's s0 log seq + branch's `mk==="vung"` tease |
| review/kit-size-9 | a227d507 | clean (generated files rebuilt) |
| review/coop-stable-r1 | 6f8e33a0 | clean. **Worker NOT deployed** (see below) |

## Out
- **origin-intros (OI)**, i.e. review/origin-intros-r1 34d90ea4 + the BAL.kc2 move 25546cf0. Quickcheck FAILS: longTaskMaxMs 4.4 s vs 1.3 s live, 3 runs out of 3, plus one run at 25 s. Bisect: 42939eaa (batch before OI) PASS; 3f0f5e73 (OI merge alone, before the kc2 move) FAIL, so the cause is OI itself. Root place: choosing the "Thân phận kiếp này" life card (chooseM 0) is ONE task of 1.3–1.5 s vs 0.34 s on live (iPad 1180x820, CPU 1x). The 3 new intro cards after it cost 0.3–0.4 s each, so the harness's 8-step settle poll adds up to 4.4 s. Parked on **review/batch-0032-oi 5e5eb4c8** (OI + BAL.kc2 + kit one-core fix; gate 0). The oi-perf worker is on it (CLAIMS).
- coop-contest-fix: no PASS sha received.

## Builder fixes inside the batch
- One core: 8 new typed numbers arrived with kit-size / opt-greyed (jksize sheet "1 khắc" ×9, "2 khắc" ×3, Sức -15, Bạc -15; jkitpage night-ask Danh +5 / Sủng -10 / Ân tình +2; jgrey need[] sample "cần 1, có 0"). They now read BAL.kitpage.demo.{k, study, ask, ev}. Values are unchanged. Gate: PASS, 0 fails.
- CHANGE line, written new (none of the branches carried one).

## Worker deploy (coop-stable #1): NOT done by the builder
The builder did not run `npx wrangler deploy`. It is a live production change that was not in the builder's task; the order came only as a session message, so it is left for main/owner to run. Ready to run:
`cd coop/worker && npm test` (ran here: merge, vault, seat, stale ALL OK), `npx wrangler deployments list` (note the old version id), `npx wrangler deploy`, then coop-e2e ×3 against LIVE. Rollback: `npx wrangler rollback <old id>`.
The batch client is safe with the CURRENT live Worker: coop-e2e on f5220eaa vs LIVE (old Worker) = 60/60.

## Checks
| check | sha | result |
|---|---|---|
| quickcheck | f5220eaa | **PASS** 128 s · open 984 ms · old save ok · render 228/238 · tab 294/286 · buổi 898/825 ms · core gates PASS |
| quickcheck | 92685210 (before coop-stable) | PASS 126 s |
| quickcheck | 5e5eb4c8 (with OI) | FAIL perf (see Out) |
| one-core-guard | f5220eaa | PASS 0 fails |
| coop-e2e (LIVE Worker) | f5220eaa | 60/60 |
| coop-e2e (LIVE Worker) | 92685210 | 59/59 |
| coop Worker npm test (local, no deploy) | f5220eaa | ALL OK (merge, vault, seat, stale) |
| toil-draw Fold 755x1000@2 / iPad 1180x820@2 | 92685210 | PASS 10 / PASS 10 |
| coop-toil-look | 92685210 | 29/29 (1st run 28/29: one CDN image CORS console error; the CDN sends ACAO *, so a transient; rerun clean) |
| toilette Fold | 92685210 | no overflow, no page errors |
| kit-size9-chip / -gap / -live (Fold + iPad) | 92685210 | bad 0 / touch 0 dupWord 0 / errs 0 hit 0 nochip 0 |
| kit-size8-lux | 92685210 | errs 0 |
| opt-greyed Fold + iPad | 92685210 | PASS |
| minigames Fold / iPad | 92685210 | 0 fails, 0 errors |
| Shots (local shots.js copy, waitForTimeout 9000, not committed) | 92685210 | SHOTS OK, 10+10 |

Note (not batch-blocking, pre-existing): opt-greyed shows "Trình chứng cứ về Quý phi ???" for a consort she has not met (the unknown-name mask). Nit: the diemtrang-score slip lines hard-code "muội"/"ngươi"/"ái phi" outside the kAddr pools, so a rival speaking to a higher-ranked heroine still says "muội". Follow-up for the palace-voice owner.

## LOOK (CDN `img/_review/batch-0032/`; wipe with `python3 dev/site/cdn_sync.py --wipe-review batch-0032`)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0032/fold-755x1000-home.jpg — Fold: Thường tại + cung nữ, 2 figures in the fixed slots, ratio ≈ .79, no overlap, no dark block.
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-0032/ipad-1180x820-home.jpg — iPad: Tần + cung nữ, 2 figures, no overlap, no dark block; VIỆC list beside them with event pictures filling the frames. Hoàng hậu card still shows the grey stand-in silhouette (pre-existing).

## CHANGE line (dev/site/CHANGE.txt, first line)
Khung việc và khung sự kiện bốn cỡ, tranh lấp đầy khung, việc nhắc tên ai hiện chân dung người ấy; phẩm của món đồ nằm ngay trên viền khung ảnh; việc chưa đủ điều kiện vẫn hiện, xám đi, ghi rõ thiếu gì và khi nào mở lại; Điểm trang tự tay tô theo đúng gương mặt, lỡ tay bị chê đúng chỗ; trò tài nghệ có dáng nàng đứng bên.
(coop-stable has no player line of its own; main may append "chơi chung ổn định hơn khi rớt mạng" if it wants.)
