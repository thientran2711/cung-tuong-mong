# Rerun cnv_mat — R4 seat report

Setup: origin=cnv road=cnv_mat, Fold 755x1000, real taps on review/robot-realtap, no cap, no bot exit. Branch with data: review/rerun-cnv-cnv_mat, dir dev/handover/robot/rerun-cnv-cnv_mat/ (moments, json, log per life; shots are not in git). Player reviews: dev/handover/robot/review/<life>-review.md.

Rerun list said 20 lives; only 16 are solo cnv_mat lives in the audit JSON (reported to D, accepted). 4 lives were VOID under D's exit ruling (bot-chosen ending with an open sibling) and replayed on new seeds with the bfa73a6e exit rule: 16 valid lives of 16.

| life | end | valid | age | buổi | taps | stuck | dead | harness sha at start | moments |
|---|---|---|---|---|---|---|---|---|---|
| rr-mat-cautious-2 | Được ban hôn | VOID (bot chose «Được ban hôn» (menu ending)) | 25 | 734 | 4057 | 6 | 0 | 4523381f (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-cautious-2-moments.md |
| rr-mat-cautious-2b | Xuất cung | VALID | 30 | 1417 | 4134 | 0 | 0 | b718aadf (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-cautious-2b-moments.md |
| rr-mat-cautious-4 | Xuất cung | VALID | 30 | 1563 | 2529 | 17 | 2 | 4523381f (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-cautious-4-moments.md |
| rr-mat-cautious-5 | Xuất cung | VALID | 30 | 1565 | 38 | 24 | 1 | 4523381f (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-cautious-5-moments.md |
| rr-mat-rebel-1 | Hồng nhan bạc mệnh | VALID | 25 | 811 | 3416 | 7 | 3 | 4523381f (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-rebel-1-moments.md |
| rr-mat-rebel-2 | Xuất cung | VALID | 30 | 1565 | 1518 | 13 | 0 | 64cd9fcf (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-rebel-2-moments.md |
| rr-mat-rebel-5 | Xuất cung | VALID | 30 | 1708 | 2304 | 6 | 0 | 1920b956 (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-rebel-5-moments.md |
| rr-mat-scholar-2 | Hồng nhan bạc mệnh | VOID (bot chose «Mách lẻo» with Giúp/Từ chối open) | 19 | 96 | 611 | 0 | 0 | 1ebdf14b (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-scholar-2-moments.md |
| rr-mat-scholar-2b | Hồng nhan bạc mệnh | VALID | 27 | 1069 | 4729 | 0 | 0 | 5a12184b (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-scholar-2b-moments.md |
| rr-mat-scholar-3 | Làm thiếp nhà phú hộ | VOID (bot chose «Nhận lời làm thiếp» with «Xin cha từ chối» open) | 18 | 104 | 499 | 0 | 0 | 1ebdf14b (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-scholar-3-moments.md |
| rr-mat-scholar-3b | Xuất cung | VALID | 30 | 1707 | 529 | 0 | 0 | b718aadf (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-scholar-3b-moments.md |
| rr-mat-scholar-4 | Hồng nhan bạc mệnh | VALID | 25 | 1081 | 2982 | 0 | 0 | 1ebdf14b (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-scholar-4-moments.md |
| rr-mat-scholar-5 | Xuất cung | VALID | 30 | 1562 | 1753 | 0 | 0 | e8b42e4b (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-scholar-5-moments.md |
| rr-mat-skilled-1 | Xuất cung | VALID | 30 | 1706 | 3213 | 0 | 0 | e8b42e4b (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-skilled-1-moments.md |
| rr-mat-skilled-2 | Làm thiếp nhà phú hộ | VOID (same d_moi card as scholar-3) | 18 | 54 | 277 | 0 | 0 | e8b42e4b (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-skilled-2-moments.md |
| rr-mat-skilled-2b | Xuất cung | VALID | 30 | 1706 | 4423 | 0 | 0 | 5a12184b (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-skilled-2b-moments.md |
| rr-mat-skilled-3 | Xuất cung | VALID | 30 | 1706 | 3834 | 0 | 0 | e8b42e4b (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-skilled-3-moments.md |
| rr-mat-skilled-5 | Hồng nhan bạc mệnh | VALID | 24 | 888 | 2353 | 0 | 0 | 7c68346b (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-skilled-5-moments.md |
| rr-mat-speed-1 | Hồng nhan bạc mệnh | VALID | 20 | 325 | 174 | 0 | 0 | 7c68346b (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-speed-1-moments.md |
| rr-mat-speed-3 | Hồng nhan bạc mệnh | VALID | 26 | 1237 | 2724 | 0 | 0 | b718aadf (resumes merged newer, see HARNESS-SHA.txt) | review/rerun-cnv-cnv_mat:dev/handover/robot/rerun-cnv-cnv_mat/rr-mat-speed-3-moments.md |

## Valid lives only (16): endings

- Xuất cung: 10
- Hồng nhan bạc mệnh: 6

Of the valid lives, the Xuất cung tuổi 30 ones are forced by age (j42.js:303). The Hồng nhan bạc mệnh ones are game-rolled deaths (spyFind roll j42.js:295, illness, accident jmort ACC, emperor death + Thái hậu) — none is a bot menu exit. Rates (ending share, mean buổi) must be taken from the valid rows only; the VOID rows are listed for audit and are excluded.

## Stuck and play-stoppers

- Every stuck round (15 min with no clock step) is in <life>.json `unstick`; layers were «Tin báo» (no dedupe, copies pile up, each ✕ pops one — known to F #6), #kmrew reward chest (closed by tapping the chest — harness gap filed for F) and calendar dialogs. All were cleared by the unstick ladder; none froze the game.
- No new play-stopper (softlock, JS error, save/load, popup over end card) was found in this road; none was sent to the fast lane. No hang files from the F10 watchdog (driver2.sh from 07:14Z).

## Notes

- Reviews are log/moments-based (scope notes inside); areas not read are marked not rated.
- cautious-5 shows taps 38 only because the life was resumed from checkpoints; counts in the table are per final run segment plus resume totals as the harness reports them.
