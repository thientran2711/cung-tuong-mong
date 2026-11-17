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
- **MAIN s36 LOOK items** (same shots main e503c53e vs batch): (1) Fold rail blank square = load timing (fresh run: batch real icon); (2) iPad act-card brown boxes = SAME ON MAIN (art load timing); (3) 412x1058 header text under the TRẦN NỮ seal = SAME ON MAIN; (4) flower sprite over 'Ngọc Thanh các' = SAME ON MAIN → fix-worker list.
- **NEW + FIXED**: kit-ico-rank root class `.krl` (rank list frame: border + radius) = the j63 act-card row LABEL class → every Cần/Tốn/Được/Mất label got a rounded box. Root renamed `.krlist` (jkrank, rank-e2e, KIT §87). Computed-style probe: label border 0px again. Scan of every class jkrank/jrank define vs old code: no other collision.
- Final d4a850ce (main c114ab9e): quickcheck --runs 5 PASS (core gates PASS, buổi 647 vs 741, tab 301 vs 250), coop-e2e 63/63.

## LANDED
- main = **d4a850ce** (s32a, pushed by MAIN s36; rollback c114ab9e). Rank Worker Action 'Deploy rank Worker (Bảng vinh danh)' run 44154870834 = success on d4a850ce. Pages deploy success.
- review/batch-s32a 579e8976 (= d4a850ce + kit-figure-mood-r2 + kit-fx-register-r1, gates PASS) was not pushed to main; the next batch can start from it.
- CDN review folders batch-s31b-r2 and batch-s32a wiped.

## HANDOVER (builder s32a → successor; context rollover)
Next batch **s36a** (MAIN s36 orders 19:05-19:15Z), on main d4a850ce or newer:
kit-figure-mood-r2 1d4e9796, kit-fx-register-r1 d665e39f, kit-rank-name-land 330c8bde, kit-display-room-r1 c6d84567, mirror-center-r2 0f0954fb (+ kit-thanh-bai/option-rows if its PASS arrives). NOT toil-looks5 (jtoil.js clash with mirror-center).
Shortcut: review/batch-s32a 579e8976 already = main d4a850ce + kit-figure-mood-r2 + kit-fx-register-r1 (assemble: jfigseal.js, jemoseal.js after jrbatch; CHANGE line has 'con dấu tâm trạng…'). Merge origin/main into it, then the other three.
Gates: quickcheck --runs 5, coop-e2e (alone), fig-seal.js <WxH@2> <out> dev/index.html, avatar-idcard.js <url> <WxH@2> <out>, rank-e2e, Fold/iPad shots (dev/tools/shots.js) → BATCH READY <sha> to MAIN s36 session_01UV1Szkkf3DbSpQipr7PJTy (it pushes).
Then STEP 3 of the brief: balance chain baff0824 → 52d5092d → 37018e74 as batch s32b (re-run the life bot at landing, report early deaths).
Recipe tips learned: main moves every ~20 min — re-merge right before BATCH READY; generated files (index.html, sw.js, assets.json) = ours then ONE rebuild; CHANGE.txt = batch line on top + main's lines; one-core-baseline.json = ours then `node dev/test/one-core-guard.js --update` (must not exceed live); assemble.py conflicts = ours + insert main's new module after the same neighbour; URL tests need a local `python3 -m http.server` + NO_PROXY=127.0.0.1; update-notes.js crashes on main too (test issue).
Re-land notes: tuanluc-sync (perf: buổi ×2) and learn-scene-fix-2 (coop rebirth 'B reborn' FAIL with the batch) were removed by `git revert -m 1` inside batch history that is now on main → to land them, merge a NEW head of each (or revert the revert). pcard-facts-2 ab50f1c5 needs a rebase on main (76 box only for compact act cards; person dialogs keep kitOptFill).
Fix-worker list (same on main): Fold rail icon blank on load, iPad act-card art loads late (brown boxes), 412x1058 header text under the TRẦN NỮ seal, flower sprite over the room label.

## BATCH s36a (builder session_01UV1SzhpLx156n52Xk9v9WR, successor of s32a) — READY 4c8568f5
PRIORITY #1 CHECK ('batch s36a'): OD 0 | claims 1 (s36a row) | main 579e8976 -> 60b0e3bf | review/* = the 6 PASS heads below.
Branch review/batch-s36a 4c8568f5 = main 60b0e3bf + kit-rank-name-land 330c8bde, kit-display-room-r1 c6d84567, mirror-center-r2 0f0954fb, ui-fixes-1-r6 8ff43bbd, kit-figure-mood-r4-r5 01e6275c, kit-thanh-bai-r4c b588cdf2. Main moved 4x during the build (03f97e15, c0a52168, 60b0e3bf); each move re-merged.
Hand-merges: KIT §87 clash (rank list vs display room) -> display room = §89 (KIT.md, KIT_NUMBERS, jdisp KIT_SAMPLES id, display-room.js header); §88 = thanh-bai. assemble tail: jemoseal, jemocause, jshelf, jlooks, jdisp. jdisp real() now also needs BAL.shelf.ui (kept 0): with jshelf live the room's rail icon would otherwise have appeared untested (jdisp calls luxPiece, jshelf has none -> luxVal fallback). Flip BAL.shelf.ui=1 opens both entries together. KIT_REQUESTS rows all kept. CHANGE line on top.
Gates on 4c8568f5: quickcheck --runs 5 PASS (render 172/153, tab 309/303, buổi 802/832) · coop-e2e 63/63 · rank-e2e ALL OK (needs a FRESH local-server; a reused one fails on old lives) · display-room 4/4 · mirror-center bad 0 Fold+iPad · ui-fixes-1 fold/ipadAir OK · thanh-bai-scan counts = r2 · one-core PASS · shots Fold+iPad OK.
fig-seal real CDN Fold: event/pop seals OK; room + Dư đồ 0 seals, SAME on plain main and on kit-figure-mood alone — the test scenes have no NPC standing on stage (looked), so room/place seals are unproven, not broken by the batch. Follow-up: fig-seal scene with an NPC in her room / a place.
LOOK (CDN img/_review/batch-s36a/, wipe after verdict): 755x1000-1-home, 1180x820-1-home, seal-room/place/event-755x1000, disp-fold-drawer, mc-755x1000-c09-t2.
NEXT: STEP 3 = batch s32b (balance chain baff0824 -> 52d5092d -> 37018e74) on main after s37 pushes s36a.

## s36a LANDED + HANDOVER (builder s36a session_01UV1SzhpLx156n52Xk9v9WR → successor; context rollover 17/11 ~21:05Z)
- s36a LIVE: main 60b0e3bf → **4c8568f5** (pushed by MAIN s37; rollback 60b0e3bf). CDN img/_review/batch-s36a wiped.
- NEXT = batch **s32b** on main 4c8568f5, ordered by s37 (20:59Z): balance chain balance-core-r2 baff0824 → night-final-r2 52d5092d → night-ledger-r1 37018e74 (37018e74 CONTAINS 52d5092d but NOT baff0824; merge-base with main = 968e6209 cycle-roll-r1) + **display-shelf-r3rv 41418cd8** (NOT display-shelf-r3 ae10b963). Keep BAL.shelf.ui=0; check the jdisp gate (`real()` in dev/build/jdisp.js needs BAL.shelf.ui) still holds with shelfView groups[i].items.
- Tried: `git merge origin/review/balance-core-r2` on 4c8568f5 = 27 code files conflict (baff0824 is from 17/11 02:04Z; main's one-core BAL work since): conflict hunks j67 6, j2 5, j68e 5, j85 4, jorigins 4, j7 3, j1/j68f/j75/j8/jact 2, j13/j14/j20/j22/j23/j31/j4/j79/jbal/jbal2/jkc/jsgame/jstory/jtabs 1, + assemble/generated. Aborted, nothing pushed. Recipe: keep MAIN's one-core form (BAL constants / text that prints the constant) and re-apply the branch's NUMBER/rule changes INTO main's BAL keys, word by word (as done for tuanluc-sync in s32a); then 52d5092d/37018e74 on top; then display-shelf-r3rv (likely clean, FF from 60b0e3bf). Suggest: consider asking the balance owner (Foreman D) for a rebase of the chain on main instead — it is a numbers branch and 60+ hunks is a real re-do.
- Gates (as s36a): build_site.sh + one-core-guard (must not exceed live baseline), quickcheck --runs 5, coop-e2e (alone), rank-e2e (FRESH `node rank/worker/test/local-server.mjs 8791` each run — a reused server fails on old lives), display-room 4/4, shelf-check (C-AG's test), fig-seal, shots.js Fold+iPad LOOK; balance: re-run the life bot at landing and report early deaths (<3 y) vs main (CLAIMS L540: r2b early-death gap condition).
- Tips: URL tests need `python3 -m http.server 8736 --bind 127.0.0.1` in the worktree + NO_PROXY=127.0.0.1; thanh-bai-scan.js takes a FILE path (index.html), not a URL; fig-seal room/place scenes have no NPC on stage (0 seals on main too) — prove room/place seals with a new scene if asked; build_site.sh can fail once on the CDN index fetch (JSONDecodeError) — re-run; the handover branch is busy: re-apply on a fresh fetch + cherry-pick, never rebase over shallow history.
- Worktree /home/user/wt/b36a (branch review/batch-s32b = main 4c8568f5, clean). Shots scratch /home/user/wt/b36a-shots.
