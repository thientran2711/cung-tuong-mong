# Review odds-meter-back r2 — PASS LAND READY f43a2ba6
PRIORITY #1 CHECK: OD 19/11 ~01:48Z + law 3 | main c12a5878 (already an ancestor of the branch: NO further merge needed, FF-able) | review/odds-meter-back f43a2ba6 | claims worker (stopped).
Verdict: **PASS LAND READY f43a2ba6** (branch head = merge of newest origin/main c12a5878 into 42bda6a9; build line of index.html differs only by CTM_BI stamp, quickcheck "built" gate passed).

Laws touched, checked: 3 (gain-and-loss display) PASS · 4 (one core) PASS · 7 (odds words) PASS · 9/11 (kit first, whole group) PASS · 12 (two devices) PASS.
1. kitRisk/.krisk: `git grep` in dev/build = only 2 comments saying retired; KIT.md only the "RETIRED" line. Re-ran `odds-meter-back.js` Fold: 135/135 cards have the 7-segment meter, krisk 0, step≠odds 0, certain→«Nắm chắc» 98, page errors 0; iPad 155/155, krisk 0, 0, 111, 0 → PASS.
2. Law 3: re-ran `opt-loss-ton.js` myself. Fold 348 cards / 124 certain loss / «Tốn: không» with a loss **0** / 313 worded gain / «Được: không» with a gain **0**; iPad 316 / 106 / **0** / 282 / **0** → PASS. Hand spot-check (DOM rows of 5+ cards): td1 «Bạc -25» and «Sức -6» in Tốn; td1 «mất một chứng cứ» in Tốn (kdup0), Được «chẳng được gì»; tt3 «bị lạt lẽo, đại nghĩa diệt thân…» in Tốn (red) + Được «thêm thể diện, được tiếng hiền» at «Nắm chắc»; night1/tt3 rolled cards: Khó / Khá chắc / Năm ăn năm thua / Rất chắc words with gain in Được.
3. The 4 kit causes are in kit parts (j65 dedupeBtns skips .kdup/.kdup0, jopic kitOptFinal certain-loss + exact-empty-hint, jk2b kitHideOut re-run) — no per-place code. PASS.
4. PEND.plantsv + plantServ both read ONE `plantOdds` (j10:73), numbers from BAL (law 4) PASS.
5. KIT.md §6.2 / §25 / §28.6 / §47 / §53 + KIT_NUMBERS overwritten in place PASS.
6. Shots Fold 755x1000@2 + iPad 1180x820@2 of td1 / night1 / tt3 LOOKED (meter on every card, no risk chip, no overflow; certain-loss card = tt3 «Mật tấu Hoàng thượng» Nắm chắc + red Tốn; roll = «Theo cha mưu đại sự» Khó; gain = night1 cards). Montage on CDN: img/_review/odds-meter-back/montage-fold.jpg + montage-ipad.jpg (delete after owner sees: `python3 dev/site/cdn_sync.py --wipe-review odds-meter-back`; worker's shots are in the same folder).
   Fold td1 shot of mine caught the life-select overlay (my harness, not the game); td1 on iPad shows it fine.
   quickcheck on f43a2ba6: PASS · open 1360 ms · old save ok · perf new/live render 202/183, tab 397/351, buổi 1122/906 ms, tasks>200ms 18/17 · core gates PASS.

Non-blocking, NOT this brief (for MAIN): cards with no cost still print the filler row «Tốn: không» (e.g. night1/tt3 roll cards) and the Được row repeats the "hỏng thì …" failure text; this is the pre-existing opt-card-short `kfill` the worker already flagged (owner 13:25Z «never Tốn: không», KIT §42.6). Also the worker's open question (unknown chance drawn as an empty meter + «Khó lường», off the 7-rung ladder) still needs MAIN/owner OK; I did not see it in the scans.

## raw-id
Verdict: **raw-id: test-only.** The «VIỆC night1 / tt3» chip text is the `title` arg of `pushDil(d,title)` (all.js:637 = j3.js:26 → `pushModal({t:title…})`). My shot script called `pushDil(mkP(id),id)` with the PEND id as title (copied from the worker's scan harness). Real call sites pass a named title: night1 → `pushFront(mkP("night1",…),"Đêm thị tẩm")` (j75.js:106, j8.js:307); tt3 → `setDil` = `pushDil(d,"Tuyến truyện")` (j4.js:4,14); others e.g. j42.js:191 "Hoàng thượng hỏi tên". Evidence is from code, not a real-play Fold/iPad run (not played through by hand). The fallback when no title is given is «Việc khó xử», never an id.
## Khó lường ruling
Not ruled for the empty meter in OD/VANPHONG. KIT.md:899 (origin/main) says «Khó lường» is gone; KIT.md:1100 only mentions it as an odds label in the retired risk-chip text. The empty-meter «Khó lường» is the worker's own wording (off the 7-rung ladder) → needs owner OK.
