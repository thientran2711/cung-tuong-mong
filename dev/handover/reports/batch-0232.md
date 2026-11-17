# batch-0232 — go-live batch (builder report)

Builder session_01UV1SzkcNCwgZaSP59sonVH (opus). Coordinators: main s28 (session_01UV1SzkNSYyuEkCJ3Bv1Evj), then s29 (session_01UV1SzjZSZnpbhRqnkyzg7p). START_CTX ≈ 6 % (own estimate; get_session reads 0). Now about 22 %, below START + 25 %.

**FINAL SHA: `bad6d59f9`** on `review/batch-0232` (base = live main 7abaf07ac). Main pushes; the builder did not touch main.

## In (merge order)
| branch | PASS head | merge notes |
|---|---|---|
| review/road-b2-fix-r2 (carries road-onecore + B1 + FX ALIGN alias scan fix) | fba2b5de | clean (FIRST) |
| review/road-b3-fix2-r1 | b837b0d1 | assemble list union (jrd_nc/td/ch then jrd_thd/cnv/jend14); jbalroad both sides kept (36 dup keys = fx+rare pairs, as on each branch); road-option-scan kept B2 (brief); ROAD_MAP both; road-saves takes argv origins or env ROADS |
| review/emotion-acts-3-r1 | 2118d118 | assemble union (jemoact before jseat/jcoopone, those stay LAST) |
| review/diff-remeasure-r1 (r1, not -live: -live conflicts in 6 files) | ebe9ab2d | jbal: main's line kept + BAL.hhTh 55→60 (the only value change); inpage6: both modal hooks |
| review/tut-followups-r1 | 92cce50b | j67: tut-followups story67Wrap kept, `wrap67` kept as an alias (jroad.js calls it at load end, jorigins calls story67Wrap). jroute auto-merged (anDuc + ckL lines both present) |
| review/it-key-guard | 02561fca | LAST of the first list; jweather kept diff-remeasure's gear-wear code. **Family fix on code merged in this batch** (it-key-scan found 8 new unguarded reads: jweather ×5, jrd_cn ×2, jroad ×1): `IT[k].p` → `itm(k).p`, same value for real keys; scan 0 |
| CLAUDE.md GATE ZERO line (main s28, docs only) | — | under the H1 |
| review/fig-feet-crop-2-r1 (main s28 add) | d431dc3d | clean in game code |
| review/scenes-3-r1 (main s29 add, LAST) | 92b6c60f | assemble union (jdemo, jlevel) |

Not in: night-final solo (no PASS sha reached the builder). fig-rank-match-r2-r1 2558a2f1 = NEXT batch (s29).

## Checks on bad6d59f (final)
| check | result |
|---|---|
| quickcheck --runs 5 | **PASS** 225 s · open 1314 ms · old save ok · render 236/238 · tab 290/330 · buổi median 920/815 (mean 829/834) · core gates PASS |
| one-core-guard | PASS 0 fails (inside core gates) |
| coop-e2e vs LIVE Worker | 60/60 |
| it-key-guard.js | PASS (0 thrown, 0 page errors) · it-key-scan 0 |
| oldsave-r1.js (old solo save from live, 755/1180/1366) | 16/16 |
| fig-feet-fam.js 755x1000 + 1180x820 | OK 62 cases, 0 px cut |
| tag-rank-scan.js | OK 49 tags |
| scenes3.js (Fold + iPad) | exit 0, errs [] |
| road-saves (on 0af9fede; later commits do not touch roads) | main save (dtq) PASS; mid-road PASS for all 10 origins tt, dtq, muoi, cn, nc, bd, td, ch, thd, cnv; page errors 0. The «phase-1 frame (td)» case FAILS by design: td now has a full road and so has every origin, so the test has no not-full origin left. Test follow-up (B): drop or retarget that case |

Perf note: the buổi median is noisy on this box (live alone ranged 815–1070 ms median across 5 runs today). Runs on the batch: 1307/967 (one run had a 40 s task), 967/852, 802/827, 920/815. Bisect: road merge 953/1070, + emotion 854/941. Means are level with live; no item is slower.

## LOOK (CDN `img/_review/batch-0232/`; wipe: `python3 dev/site/cdn_sync.py --wipe-review batch-0232`)
- fold-755x1000-home.jpg / ipad-1180x820-home.jpg — her room, 2 figures in the fixed slots, ratio ≈ .79, feet shown, no overlap.
- fold-755x1000-road.jpg / ipad-1180x820-road.jpg — new road choice (thd, Chương 5 «Lời thơ vượt tường cung»), kit option cards, maid figure whole.
- fold-755x1000-ksp.jpg / ipad-1180x820-ksp.jpg — VIỆC Kính sự phòng timed dialog: tag «Thái giám / name», feet shown, «Còn 30 giây» under the question.
Findings (not batch-blocking, for owners):
1. iPad home: the player «Lâm Hải Đường» shares the given name «Hải Đường» with her maid; the header shows «Lâm» then «Cung nữ thân tín Hải Đường», and the stage tag reads «Lâm Cung nữ thân tín…» (cut). Looks like name linking replacing the shared given name inside her own name, plus name generation allowing the clash. Not reproduced quickly; needs the name/link owner.
2. Option chips read «có rủi ro» / «an toàn» / «liều»; «an toàn» and «có rủi ro» are not on the VANPHONG odds ladder (seen before as a kit nit).

## CHANGE line (dev/site/CHANGE.txt, first line)
Thêm các nẻo đời mới cho nhiều xuất thân, nay có cả Con gái thầy đồ nghèo và Cung nữ tuyển vào cung, cùng các kết cục mới: mỗi chương là một lựa chọn có được có mất; tâm trạng nay có lúc bộc phát, vui, giận, buồn đều thành việc làm, cả nàng lẫn người trong cung; độ khó Vừa: ngưỡng lên Hoàng hậu nâng nhẹ cho đúng mức vừa; xuất thân Bá đạo nay cũng có ba chương nhập môn với việc phải tự tay làm; sửa lỗi văng game khi trong rương có món đồ đã mất; hình người trong mọi khung không còn mất chân, trên đầu ghi phẩm/chức rồi tên, không ghi tên nơi làm việc; bị giáng phẩm có cảnh Nội vụ phủ đến thu đồ; học thành tài ghi rõ lối mới mở; biếu quà làm lành được bằng món tự tay làm.
(The foreman's road-b3 line said «Thế gia và Con nhà võ»; the game's names for thd/cnv are «Con gái thầy đồ nghèo» / «Cung nữ tuyển vào cung», used here.)
