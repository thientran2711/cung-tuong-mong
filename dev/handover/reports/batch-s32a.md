# batch-s32a — builder report (session_01UV1SzgWoEmnjTTEv7UgBNP, opus; opened by MAIN s33, now reporting to MAIN s35)

PRIORITY #1 CHECK ('batch s31b|s32a'): OD go-live L1370 | main e9bbc4d6 -> b5d109fe | review/* = PASS heads in CLAIMS (rows 786-854) | claims: builder s32a only.

## STEP 1 — s31b LANDED
main FF 086f1d60 -> **e9bbc4d6** (review/batch-s31b-r2). s31b 17e6c4b4 re-merged 3x as main moved (7e0250ec -> e8b1906f world-events-2 -> 086f1d60 one-core-jkc).
Hand-merge: j2.js goTo dtd — stage-caption `cap` lines + main's `BAL.m95.dtdSung`. CHANGE.txt: both lines kept.
Gates: final e9bbc4d6 quickcheck --runs 5 PASS (core gates PASS, old save ok); e8b1906f-merge: quickcheck 7 PASS, coop-e2e 63/63, oldsave-r1 16/16.
coop-one-world seed 7 'S.wwin merge differs' on 7e0250ec = pre-existing on live main (bisect by D: world-events r1; fixed by e8b1906f).
LOOK: https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s31b-r2/755x1000-1-home.jpg · .../1180x820-1-home.jpg · .../1180x820-8-tab-art.jpg
learn-scene-fix stays HELD (learn-scene-fix-2 under review).

## STEP 2 — batch s32a
Branch review/batch-s32a (see sha at the bottom), base = main b5d109fe.
| branch | head | merge note |
|---|---|---|
| kc2val-home-r1 | 1845a0ed | clean (generated only) |
| cycle-roll-r1 | 968e6209 | clean |
| ch14-goals-r1 | a9131bfe | jrcp.js hand-merge: branch logic (her allergy, BAL.rcp.alEv) + main's BAL.eff.jrcp constants; new evA(S,f,1) -> BAL.eff.jrcp.evRcpAllergy (ONE CORE) |
| map-portrait-r2 | 68979111 | clean |
| hapmark-size | 37f43fb2 | clean |
| person-leftcol-r1 | e06e38a1 | clean |
| pcard-facts-r1 | d5f1abb2 | clean (pcard-facts-2 ab50f1c5 NOT in, see below) |
| tuanluc-sync-r1 | 4156a49d | j24/j28/jmen/jtwoway: main's one-core BAL text + branch edits re-applied word by word (dKnown wk()+1 x4, jmen 'báo với … rằng' x4); assemble + jlogbao.js last |
| kit-ico-rank-r2-r1 | aaa1bec1 | assemble + score.js/jkrank/jrank; KIT.md §33.40 + §87 both kept; one-core baseline refreshed |
| narrow-t3-r1 | 07747a9b | jksize showModal wrapper: branch's 'always reset' + main's d2 re-lay check (both) |
| morechip-sil-r2 | 88955b8a | clean |
| loading-words-2-r1 | 64e30304 (contains d4318833) | KIT.md §KWAIT added |
| toil-looks2-r5 | — | NOT in (no ?v=9 OK; toil-looks5 now runs) |

CHANGE line (top): Dư đồ dựng dọc gọn hơn, dấu ! sáng và to hơn; thẻ người nêu thẳng điều đã biết…; Tuần lục chỉ còn lời kể…; Bảng vàng giữ đúng tranh từng kiếp; trên màn hẹp thẻ chọn xếp dưới hình; nút +N vẽ ba người rõ ràng; lời chờ đều viết theo lối cổ; kỳ nguyệt sự mỗi tháng dài ngắn khác nhau.

### Gates (43f6d581 = same 12 on main e9bbc4d6)
| check | result |
|---|---|
| quickcheck --runs 7 | open/old save/time-spill PASS; perf inside gate but buổi 1277 vs 910 ms, tab 359 vs 285 (tuanluc jlogbao/jlogsync suspected, not measured); **G1 FAIL** 4957 -> 4960 (below) |
| coop-e2e (live Worker) | 63/63 |
| oldsave-r1 | 16/16 |
| cycle-roll · her-allergy · map-place-mask · map-portrait · map-frame-kit · pcard-fill · pcard-facts · podium | PASS |
| tuanluc-nochips | PASS (24 books, 337 pages, 0 chips) · tuanluc-sync 6 lives, 0 errors, 0 missing cards |
| morechip-scan | OK (first run FAIL 1 = iphone14 'kn' icon not loaded yet; re-run OK) |
| update-notes.js | crashes at '[data-tgo="cont"]' — same on the loading-words branch head (test, not batch) |

### OPEN (MAIN decides)
1. G1: rank/worker/src/score.js (rank rulebook = BAL.rank) counted as 3 new inline numbers. A = guard skips score.js; B = coordinator grows the list.
2. pcard-facts-2 ab50f1c5 (one 76x76 act box, 6.2b off) is not built on opt-pic-same-r2 + narrow-t3 (kitOptFill tall 3:4 + kitOptGroup): KIT 6.2b text conflicts and jk4 would run both rules -> left OUT; rebase it on main after s32a lands.

### LOOK (host mode; wipe: python3 dev/site/cdn_sync.py --wipe-review batch-s32a)
- Dư đồ portrait Fold: https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s32a/755x1000-map-portrait.jpg (people row above, Ân sủng/Nguy hiểm row below, map fills) · Fold cover https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s32a/412x1058-map-portrait.jpg
- home Fold https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s32a/755x1000-1-home.jpg · iPad https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s32a/1180x820-1-home.jpg
- Giao tình iPad (place header 'name [3-figure icon] N', +1 chip bottom corner): https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-s32a/1180x820-5-tab-rel.jpg
Looked at all. shots.js map shot loads before the map picture (grey), same on live main.

### After FF
kit-ico-rank: the FF deploys the rank Worker — check the GitHub Action run.

## UPDATE (MAIN s35 rulings 17:41Z) — final batch
- **G1 A done**: dev/test/one-core-guard.js skips EXACTLY `../../rank/worker/src/score.js` (comment: rank rulebook = source of BAL.rank, OD:L1267) + RANK_CHECK: score.js must bind `BAL.rank=CTM_RANK.RULES` and no other module may set BAL.rank (negative-tested both: FAIL lines appear). Twin check: BAL.rank IS the RULES object (score.js:68), so no BAL value duplicates its danh/duc weights. Baseline = live 3843.
- **pcard-facts-2 ab50f1c5 OUT** (pcard-facts d5f1abb2 stays). Its reviewer was session_01UV1SzhQ2iUk4UXLNwCnsgN (archived); worker id unknown to me.
- **learn-scene-fix-2-r1 f8ac2f08 IN** (assemble: jorder.js last).
- **PERF / tuanluc-sync OUT**: quickcheck --runs 7 on the same box: full batch buổi 1319 vs 678 ms live (+95 %); batch minus tuanluc-sync 654 vs 738 (−11 %) → tuanluc-sync causes it; taken out by `git revert -m 1` of its merge (3ef538c8). NOTE for re-landing: git now sees tuanluc-sync as merged-then-reverted; to land it later, merge a NEW head of it on top (or revert the revert) — a plain re-merge of 4156a49d adds nothing. Tab median stays +20-24 % (282 vs 228) without tuanluc (inside the gate, not bisected).
- Main merged up to d5ea786d (one-core-jkc-2): j68h hand-merge = main's BAL.odb text.
- CHANGE line: the Tuần lục clause removed.
- **learn-scene-fix-2 OUT again**: with it in the batch coop-e2e FAILS 'B reborn as a new person in the same world' (B stays dead, same name) 2/2 runs (62/64, 63/64); batch minus it 63/63; plain main 63/63. Alone on main it passed (reviewer x3) → an interaction with a batch branch (suspect kit-ico-rank 'co-op end card goes straight to rebirth' vs jorder's showModal hold). Reverted (merge 88fbd768). Re-check it on main after s32a lands; same re-land note as tuanluc (new head or revert-the-revert).
- Main merged up to e503c53e (weather-khac + others; assemble: jwxk.js after jweather).
- Final gates: see the BATCH READY message (quickcheck --runs 5 + coop-e2e on the final sha). Earlier on 5d610db3 (main d5ea786d): quickcheck PASS, buổi 753 vs 878 live, tab 248 vs 208.
