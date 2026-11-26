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

## 2. REVIEW (opus BIG, session_01D3E3Naxk5ytaK9o5afgRus) — PASS ef459c0a
START_CTX ~4 % · depth 8 (limit). PRIORITY #1 CHECK: worker's line verified (git grep main: no other lifeTopRank/rankStage; review/*: none on best rank).
LIVE moved f573dc94 → 53319e6f during review (ob-oan / kit-gloss-lower stack): no source overlap; `git merge-tree` conflicts only in built files (CHANGE.txt, index.html, sw.js) → land by STACK with rebuild, no rework.

| check | result |
|---|---|
| build (assemble + build_site) | same index.html, only CTM_BI differs |
| end-maxrank.js on branch | ALL PASS |
| end-maxrank.js on LIVE f573dc94 | FAIL static 0/9 sites on the core (runtime part times out on LIVE — no lifeTopRank; worker's BEFORE table + before shots stand) |
| selx-days.js | ALL PASS |
| one-core-guard / -text / -bind | PASS / PASS / PASS (0 mismatches of 1602) |
| coop-e2e (own run) | 143/143 — worker's 135/142 flakes not reproduced; not branch-caused |
| quickcheck | QUICKCHECK PASS (open, old save, perf 227/243 · 612/578 · 1325/1227); CORE GATES FAIL only the known LIVE G4 80-dialog-fixed + 90-button-crawl «Ô lưu · Lui» |
| shots Fold + iPad, before/after, ban hoa + maid + video | looked at: ban hoa «Tú nữ» plate + row + «Con cái: không»; maid plate = current post, row = best post held; no overflow; art blanks are sandbox-only, same before/after |
| law 4 one core | PASS — j3 record, j32 card + lifeSave + tracker, jkiep abandon line, jrank rkTrack/rkSummary all read j32 rankStage/lifeTopRank; words from RANKS / SRK.maid |
| law 11 whole family (own git grep maxRank / «Phẩm cao nhất» / RANKS[max]) | PASS — remaining maxRank uses: jge promo (writer), jkiep kpNow (life-done rule, not a print); jkrank/jrank columns print server mr (now from the core). Current-rank prints (RANKS[S.rank]) are a different family, out of scope |
| law 7 wording | PASS — Tú nữ, Chưa vào cung, Tiểu thư (= jkc rkName home word), maid posts from SRK |
| law 9 kit | PASS — kitRows / kit plate untouched, no new UI |
| co-op / offline / board | PASS — never-entered lives not sent (worker refuses them anyway), no failing request; rankStage reads the seat's own S |
| old saves | PASS — LIVE ckpt loads, card right; a save made during the days with ceiling maxRank is repaired at the edict (once, S.rkIn) |

NON-BLOCKING notes: (1) an OLD save already PAST the edict whose LIVE tracker stored the ceiling in maxRank keeps that ceiling as «Phẩm cao nhất» (given() only fires on the edict/entry calls; cannot be told apart from a real later demotion) — rare, accept. (2) kszRankName now calls pMe() per own plate; perf numbers show no cost. (3) Board rows for never-entered lives = Foreman D decision (server deploy), as the worker says.
VERDICT: PASS ef459c0a — no BLOCKING items.

ADDENDUM (same reviewer): Foreman D ruled 26/11 ~19:40Z (message reached me after the verdict) that never-entered lives MUST still be sent to Bảng xếp hạng with their true rank («Chưa vào cung» / «Tú nữ»), sorted lowest. ef459c0a drops them → this PASS covers ef459c0a only and is NOT land-ready; the next worker sha (ruling + 53319e6f merge) gets a delta review here before LAND READY.

## Delta r2 — Foreman D ruling (Bảng xếp hạng) · review/end-maxrank @ dd61c8a4 (FF from LIVE 53319e6f)
RV (Naxk) PASS on ef459c0a. Foreman D then ruled (law 16): never-entered lives are NOT dropped from the board; they go with their TRUE standing, sorted lowest.
- rank/worker/src/score.js: RULES.preN {home «Chưa vào cung», tunu «Tú nữ»}; check accepts L.pre only with no rank / post; phamName → preN word; score 0 (the lowest palace life scores ≥ 10 → always below). board.js stores pre. jrank sends pre and drops 'r' trail items for a pre life. j32 lifeTopRank reads the words from BAL.rank.preN (one core with the board).
- Tests: score.test.mjs 34 ok (+8 pre cases), board.test ALL OK; end-maxrank.js ALL PASS (ban hoa → board «Tú nữ · 0», home → «Chưa vào cung · 0», check null).
- quickcheck dd61c8a4 PASS (known LIVE G4 80 + 90 faults only); coop-e2e run 1 143/143.
- **Deploy needed**: the LIVE Worker ctm-rank must be redeployed (rank/worker, wrangler deploy) before the server accepts pre lives; until then it refuses only those lives («Bảng … không nhận kiếp này»). Not deployed by the worker.
- Known, not changed: the board keeps its 5 servant steps (srkTier), so a maid's board word («Đại cung nữ») is the tier name while the end card prints the 6-rung post («Cung nữ nhất đẳng») — pre-existing maid-ladder-6 design.

## 3. DELTA REVIEW (opus BIG, session_01D3E3Naxk5ytaK9o5afgRus) — FAIL dd61c8a4
Delta = b564c05d (Foreman D board ruling: never-entered lives sent with their true standing, sorted lowest) + rebuild on LIVE 53319e6f (FF ok).
| check | result |
|---|---|
| ruling: lives sent, true word, lowest | OK — jrank sends pre=home/tunu (no 'r' trail), score.js preN words = BAL.rank.preN (one core with lifeTopRank), check accepts pre / refuses pre+rank / unknown pre, score 0 < lowest palace life; score.test.mjs ALL OK |
| BLOCKING 1 — law 11, same family (board row of that life) | jrank.js rkRole(ph): «Chưa vào cung» / «Tú nữ» are in neither consortN nor servantN → falls to `{role:"maid",rank:1}` → rkFace __kr → kitDecor draws the CUNG NỮ metal/colour on the board face of a tiểu thư at home or a ban-hoa tú nữ. Fix: rkRole returns a non-maid role for BAL.rank.preN words (e.g. role "other"/"consort" with rank null, as jselxsc figRoles does for a tú nữ), + a test row in end-maxrank.js. |
| BLOCKING 2 — law 3/7 readable rule (same family) | «Cách tính» (rkRulesSpec, «Phẩm cao nhất từng đạt») lists consort and maid points only; a never-entered life shows Công danh 0 with no line saying why. Add one kit note/tile from BAL.rank.preN: «Chưa vào cung / Tú nữ: 0 — không tính Công danh» (wording per VANPHONG, words read from preN, no typed number other than BAL). |
| deploy note (non-blocking) | until rank/worker is deployed, LIVE server refuses these lives («no standing») → end card says «Bảng vàng không nhận kiếp này». Deploy the worker with or before the LAND. |
Everything from §2 still holds for the unchanged code. Re-review = delta only (rkRole + Cách tính + end-maxrank.js).
VERDICT: FAIL dd61c8a4 — BLOCKING 1, 2.
