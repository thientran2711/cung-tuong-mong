PRIORITY #1 CHECK: OD — none on «Phẩm cao nhất» correctness (OD:L1250: origin rank = only the CEILING, got by passing the selection) | main dev/build/j32.js:39 (end card row), j42.js:459 (servant regex rewrite), jrank.js:40 (board mr), jkiep.js:34, j3.js:185 | review/* none | claims D-ENDRANK row (Foreman D, 26/11 17:08Z). START_CTX ~4 % · depth 8.

# D-ENDRANK — «Phẩm cao nhất» = the rank she ACTUALLY held (whole family)
Branch **review/end-maxrank @ ef459c0a**, FF from LIVE **f573dc94** (rebased once: LIVE moved b881686f → f573dc94 during the work; built files rebuilt, CHANGE line set).

## Root causes
1. **Ban hoa (a)**: a new tú nữ life starts with S.rank = the origin ceiling (provisional until the edict). The end card read Math.max(S.rank,S.maxRank) → «Phẩm cao nhất: Quý nhân»; the name plate over her name read RANKS[S.rank] too (jselxsc's «Tú nữ» word only ran while selxDaysOn(), which is false once S.dead). The monthly maxRank tracker also recorded the ceiling during the days, so a kept girl who was placed LOWER kept the ceiling as «best».
2. **Maid (b)**: j42's over() wrapper rewrote the row with a regex for the pre-kit markup «<span>Phẩm cao nhất</span><b>…</b>»; kit rows (.kr/.krl/.krv) never matched → the core's RANKS[0] «Đáp ứng» stayed. (Sổ luân hồi got the maid word via a separate store rewrite, so the card and the log disagreed.)
3. **Home (same family)**: a kc / kc2 prelude ending (never entered) printed «Đáp ứng» (kcInit S.rank=0) and was sent to the board with the trail's origin rank.
4. **Name plate (same family)**: jksize kszRankName(S) read RANKS[S.rank] for her own plate in every kit dialog → «Đáp ứng» over a maid / a girl at home.

## Fix — ONE CORE (j32.js)
rankStage(s) = home | tunu | srv | rank; rankHeld(s); **lifeTopRank(s)** → {r, n}: home «Chưa vào cung» · tú nữ (selection not settled / ban hoa) «Tú nữ» · never-risen maid = highest maid post held (max S.srv.rk, board trail S.rk.sr; Ma ma; Tân Giả khố) · else RANKS[max(rank,maxRank,queen)].
Every site reads it: j32 end-card row + lifeSave (cung-luanhoi), j3 record (cung-kiep), jkiep abandoned-life line, jrank rkTrack/rkSummary (mr), j32 maxRank tracker (only while rankHeld). j42 regex rewrite removed. jend: when she is first GIVEN a rank (selxEdict / selxSelDo kept / kcEnter / kc2Enter) maxRank + board trail restart from it (once per life; repairs old saves made during the days). jselxsc «Tú nữ» predicate = selxDaysOn() || rankStage tunu, + pMe rw; jksize kszRankName(S) = pMe().rw; jend pMe at home → «Tiểu thư». «Con cái: không» when she never held a rank and has no child (was j42's rule).
Board: a life that never entered (home / ban hoa) is **not sent** — the worker refuses mr<0&&sr<0 («no standing», rank/worker score.js); before it was sent with the origin ceiling. **Decision for Foreman D**: if those lives should be on the board, the worker needs a «no standing» row (out of scope, server deploy).

## Age-30 forced end (speed-2/3/4) — by design, no change
Saves on review/rerun-cnv-ban@65bb8e80: crash-speed-3-b2819 / lategame-speed-3 / lategame-speed-4 / frozen-speed-4-b361 all have **S.srv.risen=1** (risen by age 21; «Thánh chỉ» card in moments year 3 / year 6). speed-2 (no ckpt): HUD shows «Sủng» (maids show «Chủ tin»), thị tẩm rows, consort palace → risen. The age-30 exit only applies to isSrv() (never risen). lazy-5 (Xuất cung tuổi 30, HUD rank 0) never rose → was bug (b).

## Scan (law 11) — dev/test/end-maxrank.js (static + 19 runtime lives)
Static: 7/7 best-rank sites read the core (before 0/9 incl. j42 regex, jkiep RANKS[max]).
BEFORE (LIVE b881686f):
| case | origin (ceiling) | stage | end-card «Phẩm cao nhất» | portrait caption | Con cái | Sổ luân hồi r | cung-kiep r | sent to board (mr) | expected |
|---|---|---|---|---|---|---|---|---|---|
| ban hoa | tt (Quý nhân) | (no core) | Quý nhân | Quý nhân | 0 hoàng tử, 0 công chúa | Quý nhân | Quý nhân | yes (2) | Tú nữ |
| ban hoa | dtq (Thường tại) | (no core) | Thường tại | Thường tại | 0 hoàng tử, 0 công chúa | Thường tại | Thường tại | yes (1) | Tú nữ |
| ban hoa | muoi (Đáp ứng) | (no core) | Đáp ứng | Đáp ứng | 0 hoàng tử, 0 công chúa | Đáp ứng | Đáp ứng | yes (0) | Tú nữ |
| ban hoa | td (Đáp ứng) | (no core) | Đáp ứng | Đáp ứng | 0 hoàng tử, 0 công chúa | Đáp ứng | Đáp ứng | yes (0) | Tú nữ |
| ban hoa | ch (Quý nhân) | (no core) | Quý nhân | Quý nhân | 0 hoàng tử, 0 công chúa | Quý nhân | Quý nhân | yes (2) | Tú nữ |
| ban hoa | thd (Đáp ứng) | (no core) | Đáp ứng | Đáp ứng | 0 hoàng tử, 0 công chúa | Đáp ứng | Đáp ứng | yes (0) | Tú nữ |
| kept → edict | tt (Quý nhân) | (no core) | Tần | Tần | 0 hoàng tử, 0 công chúa | Tần | Tần | yes (3) | Tần |
| kept → edict | dtq (Thường tại) | (no core) | Quý nhân | Quý nhân | 0 hoàng tử, 0 công chúa | Quý nhân | Quý nhân | yes (2) | Quý nhân |
| kept → edict | muoi (Đáp ứng) | (no core) | Thường tại | Thường tại | 0 hoàng tử, 0 công chúa | Thường tại | Thường tại | yes (1) | Thường tại |
| kept, old save maxRank=Quý phi | tt | (no core) | Quý phi | Tần | 0 hoàng tử, 0 công chúa | Quý phi | Tần | yes (5) | Tần |
| home (never entered) | tt | (no core) | Đáp ứng | Đáp ứng | 0 hoàng tử, 0 công chúa | Đáp ứng | Đáp ứng | yes (2) | Chưa vào cung |
| home (never entered) | dtq | (no core) | Đáp ứng | Đáp ứng | 0 hoàng tử, 0 công chúa | Đáp ứng | Đáp ứng | yes (1) | Chưa vào cung |
| home (never entered) | muoi | (no core) | Đáp ứng | Đáp ứng | 0 hoàng tử, 0 công chúa | Đáp ứng | Đáp ứng | yes (0) | Chưa vào cung |
| maid never rose (rung 3 then 1) | cnv | (no core) | Đáp ứng | Đáp ứng | 0 hoàng tử, 0 công chúa | Cung nữ tam đẳng | Cung nữ tam đẳng | yes (-1) | Cung nữ nhất đẳng |
| maid in Tân Giả khố | cnv | (no core) | Đáp ứng | Đáp ứng | 0 hoàng tử, 0 công chúa | Cung nữ Tân Giả khố | Cung nữ Tân Giả khố | yes (-1) | Cung nữ Tân Giả khố |
| maid risen → Đáp ứng | cnv | (no core) | Đáp ứng | Đáp ứng | 0 hoàng tử, 0 công chúa | Đáp ứng | Đáp ứng | yes (0) | Đáp ứng |
| consort Phi → demoted Quý nhân | dtq | (no core) | Phi | Quý nhân | 0 hoàng tử, 0 công chúa | Phi | Quý nhân | yes (4) | Phi |
| Hoàng hậu | muoi | (no core) | Hoàng hậu | Hoàng hậu | 0 hoàng tử, 0 công chúa | Hoàng hậu | Hoàng hậu | yes (7) | Hoàng hậu |
| old save LIVE ckpt (risen maid) | cnv | (no core) | Đáp ứng | Đáp ứng | 0 hoàng tử, 0 công chúa | Đáp ứng | Đáp ứng | yes (0) | Đáp ứng |
ok   runtime: 19 lives ran without error

AFTER (ef459c0a, same on db8c8a01):
| case | origin (ceiling) | stage | end-card «Phẩm cao nhất» | portrait caption | Con cái | Sổ luân hồi r | cung-kiep r | sent to board (mr) | expected |
|---|---|---|---|---|---|---|---|---|---|
| ban hoa | tt (Quý nhân) | tunu | Tú nữ | Tú nữ | không | Tú nữ | Tú nữ | no | Tú nữ |
| ban hoa | dtq (Thường tại) | tunu | Tú nữ | Tú nữ | không | Tú nữ | Tú nữ | no | Tú nữ |
| ban hoa | muoi (Đáp ứng) | tunu | Tú nữ | Tú nữ | không | Tú nữ | Tú nữ | no | Tú nữ |
| ban hoa | td (Đáp ứng) | tunu | Tú nữ | Tú nữ | không | Tú nữ | Tú nữ | no | Tú nữ |
| ban hoa | ch (Quý nhân) | tunu | Tú nữ | Tú nữ | không | Tú nữ | Tú nữ | no | Tú nữ |
| ban hoa | thd (Đáp ứng) | tunu | Tú nữ | Tú nữ | không | Tú nữ | Tú nữ | no | Tú nữ |
| kept → edict | tt (Quý nhân) | rank | Tần | Tần | 0 hoàng tử, 0 công chúa | Tần | Tần | yes (3) | Tần |
| kept → edict | dtq (Thường tại) | rank | Quý nhân | Quý nhân | 0 hoàng tử, 0 công chúa | Quý nhân | Quý nhân | yes (2) | Quý nhân |
| kept → edict | muoi (Đáp ứng) | rank | Thường tại | Thường tại | 0 hoàng tử, 0 công chúa | Thường tại | Thường tại | yes (1) | Thường tại |
| kept, old save maxRank=Quý phi | tt | rank | Tần | Tần | 0 hoàng tử, 0 công chúa | Tần | Tần | yes (3) | Tần |
| home (never entered) | tt | home | Chưa vào cung | Tiểu thư | không | Chưa vào cung | Chưa vào cung | no | Chưa vào cung |
| home (never entered) | dtq | home | Chưa vào cung | Tiểu thư | không | Chưa vào cung | Chưa vào cung | no | Chưa vào cung |
| home (never entered) | muoi | home | Chưa vào cung | Tiểu thư | không | Chưa vào cung | Chưa vào cung | no | Chưa vào cung |
| maid never rose (rung 3 then 1) | cnv | srv | Cung nữ nhất đẳng | Cung nữ tam đẳng | không | Cung nữ nhất đẳng | Cung nữ nhất đẳng | yes (-1) | Cung nữ nhất đẳng |
| maid in Tân Giả khố | cnv | srv | Cung nữ Tân Giả khố | Cung nữ Tân Giả khố | không | Cung nữ Tân Giả khố | Cung nữ Tân Giả khố | yes (-1) | Cung nữ Tân Giả khố |
| maid risen → Đáp ứng | cnv | rank | Đáp ứng | Đáp ứng | 0 hoàng tử, 0 công chúa | Đáp ứng | Đáp ứng | yes (0) | Đáp ứng |
| consort Phi → demoted Quý nhân | dtq | rank | Phi | Quý nhân | 0 hoàng tử, 0 công chúa | Phi | Phi | yes (4) | Phi |
| Hoàng hậu | muoi | rank | Hoàng hậu | Hoàng hậu | 0 hoàng tử, 0 công chúa | Hoàng hậu | Hoàng hậu | yes (7) | Hoàng hậu |
| old save LIVE ckpt (risen maid) | cnv | rank | Đáp ứng | Đáp ứng | 0 hoàng tử, 0 công chúa | Đáp ứng | Đáp ứng | yes (0) | Đáp ứng |
ok   runtime: 19 lives ran without error
(name-plate column after the plate fix: home «Tiểu thư», maid = current post, e.g. «Cung nữ tam đẳng»; test asserts no non-rank life shows a consort rank over her name.)

## Tests
- end-maxrank.js: ALL PASS (before: 7 FAIL). Old save = LIVE ckpt crash-speed-3-b2819 (risen maid) loads, card «Đáp ứng».
- quickcheck ef459c0a: QUICKCHECK PASS (open, old save, perf new/live render 220/251, tab 513/649, buổi 1205/1343); CORE GATES FAIL G4 80-dialog-fixed (kit-dialog-2 «no empty Tốn / Được cell») + G4 90-button-crawl («Ô lưu · Lui») — **identical on LIVE b881686f** (ran both gates on the LIVE build: same FAIL lines) → pre-existing, not this branch.
- coop-e2e (own runs on ef459c0a): run 1 135/143 (Thái hậu face / fidUsed.77 lag family), run 2 142/143 (week 2 fold advanced), run 3 **143/143**; LIVE f573dc94 143/143 once. Different rows each run → flaky co-op lag family; this branch touches no co-op/face code (pMe has no side effect).
- coop-ending-screens.js: new both-seat «Phẩm cao nhất» check added; the test itself dies on LIVE too (guest S undefined at «both seats in the room») — pre-existing, could not run the check.
- selx-days.js ALL PASS.

## Shots / video (CDN img/_review/end-maxrank/, looked at)
Fold 755x1000 + iPad 1180x820 @2, before/after, ban hoa (tt) + never-risen maid (cnv): https://ctm-img.victoria-tntt.workers.dev/img/_review/end-maxrank/{before,after}-{banhoa,maid}-{fold,ipad}-{top,rows}.png · video https://ctm-img.victoria-tntt.workers.dev/img/_review/end-maxrank/after-fold-video.webm.
Before: «Quý nhân» over the name + row «Quý nhân» (ban hoa); maid «Đáp ứng» + «0 hoàng tử, 0 công chúa». After: «Tú nữ» / «Tú nữ» / «không»; maid plate «Cung nữ tam đẳng» (current), row «Cung nữ nhất đẳng» (best held), «không». Art frames show broken/empty pictures in the sandbox (CDN art not served by the test route; «Đang thỉnh tranh…» text) — same before and after.

Kit parts only (kitRows / kitNameRank untouched); words per VANPHONG (Tú nữ, Chưa vào cung, Tiểu thư, maid ranks from SRK); no number typed.
SẴN SÀNG KIỂM review/end-maxrank ef459c0a
