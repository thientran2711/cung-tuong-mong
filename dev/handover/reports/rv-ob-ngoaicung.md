# RV-OB-NGOAICUNG — big review of review/ob-ngoaicung (reviewer opus, session_01V1ZZH4VCvU57UnzmmawTdn)

PRIORITY #1 CHECK: review of an existing branch (review/ob-ngoaicung dc43a3b9, code 1773d3eb) — nothing rebuilt. OD rows 25/11 ~22:45Z–23:10Z (k2 k3 k5 k9 k10) + OD:L2108 read; START_CORE/WORKER/REVIEWER read.

## VERDICT: FAIL (1 blocking item + 1 same-family wording item). Final merge DONE and pushed: review/ob-ngoaicung = 1facbb84 (= dc43a3b9 + merge of LIVE origin/main 02f564ae; fast-forward of main).

### Final merge (1facbb84)
- Conflicts: built files (index.html / sw.js / assets.json) → regenerated with `bash dev/site/build_site.sh`; one code conflict dev/build/jnotice.js:
  LIVE's tinbao-words kitSayLine (one sentence rule + same-text dedupe) KEPT, and this branch's place gate (placeNoteOk call at the top of kitNotice) and own mark
  (kitKnow `own: window.__kcActing>0`, kitKnowFlush `own`) KEPT — both sides combined, kitKnow text goes through kitSayLine as on LIVE.
- The worker must build further fixes ON 1facbb84 (pull it first).

## FAIL list (for OB-NGOAICUNG-2)
1. **BLOCKING — placeEvOk drops every dialog whose speaker is HER OWN figure (pMe) at home.** pMe() (j3.js:15) gives her a consort rk (c0, rw «Đáp ứng»),
   so `placeEvOk` (jroad8) sees rk /^c\d/ and returns false for any home dialog without a pid «kc…». Proof (merged build, tt «Ở nhà chờ tuyển tú»):
   `placeEvOk({t:'Tiền truyện',who:pMe()})` → false; the 3 «Tiền truyện · Con gái Tể tướng 1/3–3/3» cards (jentry entIntro, who:pMe(), no pid) are on LIVE
   02f564ae's queue right after «Nhận thân phận», and the branch goes straight to Khuê phòng without them. The worker's 4 ngc3 videos also have no Tiền truyện.
   Family (law 11): `git grep "who:pMe()" dev/build` = ~80 calls in 30 modules (jentry, joi, jkiep, jtds, jrcp, j92, jface, jge, jlost, jveil, jtruth …);
   every one without a kc pid is silently lost at home. Fix at the ONE gate: her own figure is never a palace person (e.g. `w.w` contains "me" / w built by pMe
   → true), plus add to scan.js a «dropped» list (every dialog placeEvOk removes at home, title + speaker) and check it holds ONLY palace speakers.
2. **Same wording family as k2 (OD 25/11 ~22:45Z):** at home her own figure tag in dialogs reads a palace rank — LIVE shows «Đáp ứng · Mạnh Lưu Ly (ta)» on the
   Tiền truyện card of a tiểu thư who has not entered the palace (pMe().rw). Once item 1 lets these dialogs show, pMe().rw at home must come from the place
   word table (ROAD8_LAB, e.g. «Tiểu thư» / «Thôn nữ» / «Công chúa» — the stage figure tag already says «Tiểu thư»); add pMe().rw to the strict scan surfaces.

## Checks that PASS (merged build 1facbb84)
- Tab rename revert (OD:L2108): the 8 bottom tabs read Hành sự · Dư đồ · Hậu cung · Giao tình · Hoàng tự · Tư trang · Tài nghệ · Mệnh truyện on all 5 home roads; tabsRenamed 0.
- Home head-count words: tt/td «1 Người hầu · 3 Trưởng bối», cnv «3 Gia đình» (no maid: thôn nữ has no personal maid ✓), nc/bd «1 Người hầu · 3 Vương tộc».
- Family scan `scan.js --play=600`, 5 roads: td cnv bd PASS first run; tt / nc began in the palace (isKc false, harness start flake the worker also saw) →
  rerun tt,nc: PASS. acts 0 · asks 0 · cards 0 · page errors 0 on all 5.
- Side by side LIVE vs branch, tt home, 6 buổi with «Nghỉ ngơi» each buổi: LIVE shows «Tần Tần Thanh Nhã xưng danh với ta», «Thái hậu thiện cảm +28»,
  «Một vị Quý nhân sai người sang ghé chơi cung ta» and a result card full of palace ghen rows; branch shows none of them (k3/k9/k10 family fixed).
- k5 acts: Thái y Diệp Cảnh Hoài kept as thanh mai (MAIN 151 ruling) — not re-litigated.
- coop-e2e alone: 143/143 passed.
- quickcheck alone (LC20 review/qc-daylife 66e07c03 quickcheck.js, not committed here): perf ✓ median of 3 new/live render 268/276 ms, tab 578/616, buổi 1544/2660,
  tasks>200ms 32/41 (day vs day), open 2395 ms ✓. **old save FAIL «frame.waitForFunction: Timeout 30000ms» is PRE-EXISTING**: LIVE 02f564ae vs LIVE 02f564ae
  (same qc-daylife script, --runs 1) fails the same step the same way. → for MAIN/LC20: the old-save step of quickcheck is broken on LIVE itself.

## MAIN's two LOOK questions
- **Khuê phòng flat light-grey stage from buổi chiều on (ngc3-tt-life-ipad ~1:04 onward)**: NOT caused by this branch. The branch touches no stage-background
  code (only jgrey kitTamFit, which moves the «tạm» chip class). Not reproduced on LIVE 02f564ae nor on the merged build in my runs (iPad 1180x820, 4 and 6 buổi
  with Nghỉ ngơi, plus a 20-buổi real-tap run): the painted room stays every buổi on both. In my merged-build video the grey stage shows only for a moment while
  the room picture loads. The worker's cnv iPad video shows the same (Nhà tranh painted first, flat after). → kit family for KK37
  (session_01V1ZZH16x8rVajpgG2KwrB5): while / when the stage room picture is not loaded the stage is a flat grey box with no «tạm» stand-in.
- **«Nghỉ ngơi: thành — ta không được gì, cũng không mất gì» while the card says Sức +25**: PRE-EXISTING (LIVE same): it happens when Sức is already 100/100,
  so the gain is clamped to 0. The result line is honest; the real issue is the card (law 3, gain-and-loss) offers rest at full Sức with a gain it cannot give
  → separate item for MAIN (card should be greyed «Sức đã đầy» or show the real gain), not this branch.

## Not done by me
- No game code changed (only the merge). Shots / videos are in scratch only (none in git, none on the CDN review folder).

## REVIEW r2 (reviewer session_01V1ZZH29E5itz7L8m4cLTq5) — target review/ob-ngoaicung c33ff595 (code 09358068)
PRIORITY #1 CHECK: review of an existing branch — nothing rebuilt; START_CORE/WORKER/REVIEWER + rv r1 FAIL + worker report (RV FAIL answers) read.

### VERDICT: FAIL (1 item, = r1 item 2 not fixed on screen)
Merge onto LIVE 6b5d3d05 DONE: **237db87f** (pushed to review/ob-ngoaicung, fast-forward of c33ff595; main is its ancestor). Conflicts: dev/build/jrcp.js +
dev/build/jtds.js (teacher lines) → this branch's place words (rcpFeeW / placeW("t_vir") / rcpConsTeach) KEPT together with LIVE's gain words
(crsGainW("teacher"|"self",…) instead of «+2..3» / «+1..2»); index.html / sw.js / assets.json regenerated (build_site.sh). Worker: build on 237db87f.

1. **BLOCKING — her dialog tag at home still reads a palace rank (r1 item 2 / k2 family).** pMe().rw is now «Tiểu thư / Thôn nữ / Công chúa», but the
   dialog figure tag is NOT drawn from pMe().rw: jksize.js:127 `kszRankName(p)` returns `RANKS[S.rank].n` when p===S (and kszFigHtml → kitTitleTag3 /
   kitNameRank draw it). Real taps on the merged build, home road, right after «Nhận thân phận»:
   - Fold 755x1000 tt: «Tiền truyện · Con gái Tể tướng 1/3», «2/3» and «Khuê các» show **«Đáp ứng · <her name> (ta)»**; only «3/3» shows «Tiểu thư».
   - iPad 1180x820 cnv: «Tiền truyện 1/3, 2/3», «Thôn quê» → «Đáp ứng … (ta)» (3/3 «Thôn nữ»).
   - iPad 1180x820 nc: «Tiền truyện 1/3, 2/3», «Công chúa Cao Ly» → «Đáp ứng … (ta)» (3/3 «Công chúa»).
   Fix at ONE source (law 11): her own rank word for every drawn tag (kszRankName p===S and the other `RANKS[S.rank].n` prints that can reach a home
   screen — 40 such prints in 30 modules: `git grep -n "RANKS\[S.rank\].n" dev/build`) must read the home station while road8()==="kc".
   The scan missed it because its meTag surface reads pMe().rw (data), not the drawn tag: add a strict surface that reads the DRAWN `.knr-r` of every
   home dialog whose figure is hers (and the stage tags) and FAILs on any RANKS name.
   Note (same family, kit question for MAIN / kit keeper, law 9 — not blocking here): her framed portrait in these home dialogs uses the consort rank-0
   kit frame / crest / bg (pcp rk-c0: frame-consort-0, crest-consort-0, bg-consort-0) because pMe().rk = c0 at home.

### Checks that PASS (merged 237db87f)
- r1 item 1 FIXED: the 3 «Tiền truyện» cards + «Khuê các / Thôn quê / Công chúa Cao Ly» show at home on tt, cnv, nc (real taps, Fold + iPad).
- Family scan `scan.js --play=600`, 5 roads tt td cnv nc bd: SCAN PASS first run — meTag Tiểu thư/Tiểu thư/Thôn nữ/Công chúa/Công chúa; head-count
  tt/td «1 Người hầu · 3 Trưởng bối», cnv «3 Gia đình», nc/bd «1 Người hầu · 3 Vương tộc»; dropped 4/2/31/1/20, droppedBad 0 (no own-figure dialog
  dropped); worldcare shown 0; acts 0 · asks 0 · cards 0 · tabsRenamed 0 · page errors 0. (Thin: tt/td/nc runs reached only turn 4/2/1.)
- quickcheck (LIVE dev/tools/quickcheck.js, qc-daylife) merged vs LIVE 6b5d3d05: **QUICKCHECK PASS** — open 2376 ms, old save ok, perf median new/live
  render 252/239, tab 593/535, buổi 1286/1957, tasks>200ms 34/40.
- Real-tap screens Fold 755x1000 + iPad 1180x820 (home stage, Tiền truyện, home intro dialog): kit dialog frame, no horizontal scroll, no page errors,
  VANPHONG wording OK except item 1.
- Not run: coop-e2e (verdict already FAIL; run it on the next sha together with the full gates).

## REVIEW r3 (reviewer session_01V1ZZH29E5itz7L8m4cLTq5) — target review/ob-ngoaicung 6f3cdd5b (code 6e726d81, OB-NGOAICUNG-3b)
PRIORITY #1 CHECK: review of an existing branch — nothing rebuilt; r2 FAIL + worker §r3 read.

### VERDICT: FAIL (1 item — result-card family, law 6 + 11). r2 item FIXED.
Merge onto LIVE 3af7896e DONE: **ca368b86** (pushed to review/ob-ngoaicung, FF of 6f3cdd5b; only index.html / sw.js conflicted → regenerated). Build on it.

1. **BLOCKING — a palace consort's «thiện cảm» change still reaches her HOME result card (cards family, worker item 8).**
   - Real play: scan.js --play=600, bd: «Trong cung cố quốc vừa qua» row «Hoàng quý phi Kiều Lang Hoa: thiện cảm −5» (strict «cards», 1 of 3 bd runs).
   - Deterministic repro, every home road (tt «Trong phủ vừa qua», cnv «Ở nhà vừa qua», nc/bd «Trong cung cố quốc vừa qua»): at home,
     `b=rsnap(); relAdd(topConsort,S,-5); relAdd(S,topConsort,-5); resultShow("Trong cung vừa qua",b)` → Mất: «Hoàng hậu <name>: thiện cảm −10».
     The same with only `v.ghen+=8` → no card (ghen is hidden correctly).
   - Cause (for the builder to confirm): the row is NOT from before.rel (jroad8's resultShow wrapper resets that) — it comes from the per-act relation
     change list fed by relAdd (jwhyn WHY_STAT aff «thiện cảm với ta» / j63 rows), which the home gate does not filter. Fix at the one gate: at home
     no palace person's (consort / emperor / Thái hậu / palace servant) relation row on any result card, except the person her own act names
     (same rule as before.rel); and make the scan's «cards» check fire a forced relAdd on a palace consort each run (not only random play).

### Checks that PASS (merged ca368b86)
- **r2 item FIXED (her drawn tag at home):** real taps — Fold 755x1000 tt: Tiền truyện 1/3, 2/3, Khuê các = «Tiểu thư … (ta)»; iPad 1180x820 cnv:
  «Thôn nữ … (ta)»; iPad nc: «Công chúa … (ta)» incl. «Công chúa Cao Ly». No RANKS name in any drawn tag of hers at home, no hscroll, 0 page errors.
  Entering the palace (kcEnter at home): «Nhập cung» card and her tag read «Đáp ứng» (palace side unchanged).
- Law-11 grep: no `RANKS[S.rank].n` left outside meRankN (only comments). 4 sites still print her current rank as `RANKS[Math.min(S.rank,…)].n`
  (j67.js:98 + jst14.js:42 «Được tấn phong một bậc (nay …)» milestone, jrd_dtq.js:179 lệ cung dâng thư, jrd_tt.js:689 MATME) — palace-only
  lines today, same word as meRankN in the palace; NIT: route them through meRankN for one source.
- Family scan 5 roads × 600 steps (merged): tt, cnv, nc PASS; td and bd PASS on rerun (several runs began in the palace = the known start flake,
  isKc false); drawnTag / meRank / headcount / dropped bad 0 / worldcare 0 / acts 0 / asks 0 / errors 0; «cards» FAIL once (item 1).
- coop-e2e on ca368b86: **143/143 passed**.
- quickcheck not re-run by me this round (worker: PASS on 6f3cdd5b); run it on the next sha vs LIVE.
- Kit / VANPHONG on the looked screens (home stage + kit dialogs, Fold + iPad): OK.

## REVIEW r4 (reviewer session_01V1ZZH29E5itz7L8m4cLTq5) — target review/ob-ngoaicung 65348819 (OB-NGOAICUNG-3b)
PRIORITY #1 CHECK: review of an existing branch — nothing rebuilt; r3 FAIL + worker §r4 read.

### VERDICT: FAIL — perf gate only (quickcheck «buổi» on the merged result). Every function check PASSES.
LIVE moved to aa37de21 during the review → merged: **ca386345** (pushed to review/ob-ngoaicung, FF; only built files conflicted → regenerated).
NOTE: `review/ob-ngoaicung-r2` (= 65348819) was pushed by me too early (before LIVE moved) and the remote refused its deletion — it is NOT a PASS;
do not land it (MAIN: delete it).

1. **BLOCKING — quickcheck perf «buổi» fails on the merged ca386345, 3 of 4 runs** (LIVE dev/tools/quickcheck.js vs LIVE aa37de21):
   run A FAIL buổi 5510/1575 (new runs 5510 · 1156 · 6362), run B FAIL tab 566/554-limit (buổi 1555/1327, borderline), run C FAIL buổi 3502/1377
   (new 5366 · 1382 · 1637). Control: **LIVE aa37de21 vs itself PASS** (buổi 1385/1312). Over all my runs this round and r2, the branch's new-build
   runs have a ~5.4–6.4 s buổi in ~5 of 15 runs; LIVE ~1 of 15 (one 4433). On the older base 3af7896e it passed narrowly (buổi 2898/1479).
   → Builder: find the slow buổi (quickcheck --runs 5 + a Chrome trace of the slowest nextBuoi). Suspects, all palace-side costs this branch adds
   to every buổi: placeSift / placeEvOk on showModal, placeNoteSweep on render, the jaudit «time passed» card path, the jroad8 resultShow +
   whyText wrappers, pMe / meRankN calling road8() (isKc + isSrv) at each of ~80 who:pMe() sites. Then 3 clean quickcheck runs in a row.

### Checks that PASS
- r3 item FIXED (result-card family): deterministic repro on the 5 home roads (tt td cnv nc bd), merged build: palace consort thiện cảm both ways,
  a low consort, oán, Hoàng hậu stat hh, Thái hậu stat th → **no card**; reverse (law 11 both ways): «Gửi quà vào cung cho <Hoàng hậu>» still shows
  «Hoàng hậu …: thiện cảm +N». In the palace (after kcEnter) every row still shows (palace side unchanged).
- Family scan 600 steps × 5 roads on ca386345: **SCAN PASS first run** (forceCard, drawnTag, meRank, cards 0, acts 0, asks 0, dropped bad 0, errors 0).
- Real taps Fold 755x1000 tt + iPad 1180x820 bd, 6–8 buổi each: tag «Tiểu thư / Công chúa … (ta)», no palace name in any dialog, 0 page errors.
- coop-e2e on 65348819: 143/143.
- Nit done (4 RANKS[Math.min(S.rank,…)].n → meRankN).

### PRE-EXISTING (identical on LIVE aa37de21 / 3af7896e, real taps) — for MAIN, not this branch
- Tuần lục at home (tt + bd seen): an emperor page «Hoàng thượng → ta · Sủng … Hoàng thượng nhạt lòng với ta. Sủng −8» and the opening line
  «Kiếp này ta ở nhà chờ tuyển tú … Danh 33 → 8 (bị chê trách), Sủng 8 → 0 (Hoàng thượng phật ý), Bạc 210 → 80 (tốn bạc)» — palace person /
  palace start values on her home week book (same k3/k10 family, new surface).
- Tuần lục on Fold 755x1000: the book sits shifted left — left edge cut («háng ba…», figure clipped), right half dark.
- In the palace an oán-only change opens an empty «Trong cung vừa qua» result card (rows []).

## HANDOVER (reviewer session_01V1ZZH29E5itz7L8m4cLTq5, rollover: context 36 % ≥ START ~5 % + 25 %) — for the r5 reviewer
- Next: r5 from OB-NGOAICUNG-3b (session_01V1ZZH1sqdbSzbtN5g1iE4v): perf root cause (3 clean quickcheck runs) + the home Tuần lục emperor page
  (pre-existing a, MAIN 159 added it to this branch). (b) Fold Tuần lục layout and (c) empty oán-only card went to kit keeper KK43, not this branch.
- How I tested (re-create in scratch, outside the repo): serve the merged worktree `python3 -m http.server <port>`; LIVE = the main checkout.
  1. Merge the branch onto LIVE first (only index.html / sw.js / assets.json usually conflict → `git checkout --theirs` + `bash dev/site/build_site.sh`).
  2. `node dev/test/ob-ngoaicung/scan.js <url> out.json --play=600` (5 roads; a road with isKc false began in the palace = start flake → rerun
     `--origins=<road>`).
  3. Result-card repro per road (tt td cnv nc bd): new life → «Ở nhà chờ tuyển tú» → Nhận thân phận; then rsnap → relAdd(topConsort,S,-5) both ways /
     oán / S.hh / S.th → resultShow("Trong cung vừa qua",b) must give NO card; «Gửi quà vào cung cho <Hoàng hậu>» title must keep her row;
     after kcEnter(0) (palace) every row must show.
  4. Real taps Fold 755x1000 (hasTouch) + iPad 1180x820: Tiền truyện + home intro tags «Tiểu thư/Thôn nữ/Công chúa … (ta)», 6–8 «Sang buổi»,
     page through the Tuần lục book (buttons ‹ › «Vào ngày mới»; it is a fixed layer, offsetParent is null) and look for palace names.
  5. `node dev/tools/quickcheck.js <merged root> <LIVE index.html> --out <scratch>` ×3, plus LIVE vs LIVE as the control. coop-e2e:
     `node dev/test/coop-e2e.js <scratch>`.
- Remote branch review/ob-ngoaicung-r2 (=65348819) is NOT a PASS (deletion refused by the remote); LC22 told not to land it.

## REVIEW r5 (reviewer RV-OB-NGOAICUNG-3 session_01V1ZZH1CncuHjsCRna8YJJf) — target review/ob-ngoaicung 8aaac5ac (OB-NGOAICUNG-3b)
PRIORITY #1 CHECK: review of an existing branch — nothing rebuilt; r4 FAIL + builder §r5 read; MAIN 160 perf ruling (interleaved L/B ×3, branch median longTaskMax ≤ LIVE ×1.25) applied.

### VERDICT: PASS — **LAND SLOT fe8b928f** (review/ob-ngoaicung-r6; descendant of LIVE f573dc94, fast-forward). Do NOT land review/ob-ngoaicung-r2.
LIVE moved twice during the review (aa37de21 → b881686f → f573dc94); fe8b928f = 8aaac5ac + reviewer fix 6d385d6e + merge b881686f (ea1c8d10) + merge f573dc94.

Reviewer commits on review/ob-ngoaicung-r6:
1. 6d385d6e small fix (law 6 + 11): r5's kcInit wrapper kept only «Xin xăm» and so DROPPED her own new-life cost line «Đã đổi thân phận N lần (−X Phúc duyên)»
   (nlAccept writes it just before kcInit) on every home road — LIVE keeps it. Filter is now /Xin xăm|Đã đổi thân phận/. Repro (S.nlRe=2 then Nhận, home road):
   before: line gone; after: kept, no Sủng line. Same commit: scan.js forceCard clears kaLastResult + #rtoast before its forced resultShow — it read the
   PREVIOUS real card (her own «Gửi bức thêu tự tay làm cho Mã Lạc Anh», name in the title, kept by design) as a fail (false positive on tt, 1 of 2 runs).
2. fe8b928f merge f573dc94: real source conflicts j14 restore / j30 demote / j4 (cha bị xử trảm) / j8 fall — LIVE's charge-trinh-punish code kept whole,
   only her own rank word RANKS[S.rank].n → meRankN() inside them (the branch's r4 nit; identical in the palace). Built files regenerated.

### PERF (MAIN 160 rule; quickcheck LIVE tool, iPad CPU-slowed; numbers = run median of 3)
- Gate on fe8b928f vs LIVE f573dc94, order L,B,L,B,L,B — all 6 QUICKCHECK PASS:
  longTaskMax L 2312 · B 1960 · L 2181 · B 3704 · L 1791 · B 2444 → medians B 2444 / L 2181 (limit ×1.25 = 2726) **PASS**;
  buổi L 1133 · B 1359 · L 1167 · B 1107 · L 1325 · B 1270 → medians B 1270 / L 1167. No new error / stall (quickcheck fails [] every run).
- Earlier gate on 8aaac5ac vs LIVE aa37de21, same order: longTaskMax L 2542 · B 2118 · L 1874 · B 1980 · L 1816 · B 1863 → B 1980 / L 1874 PASS; buổi medians B 1260 / L 1511.
- Controls LIVE aa37de21 vs itself: run 1 FAIL (longTaskMax 3344/1917, one LIVE buổi 4426 ms), run 2 PASS — single 3–4 s spikes happen on LIVE code too (noise).

### FUNCTION (all on fe8b928f unless said)
- scan.js 600 steps × 5 roads: every road that began at home = strict-fails none incl. new favourLog (tt td cnv nc bd); the bd/cnv start flake (road began
  in the palace, isKc false) rerun. LIVE b881686f bd: SCAN FAIL (favourLog «Nghỉ ngơi: Thái hậu → ta: thiện cảm …») — the check bites.
- Real taps Fold 755x1000 tt + iPad 1180x820 bd (touch taps on Sang buổi / Nhận / Tiếp / Vào ngày mới, 18–23 taps, 2 Tuần lục books each, kitBook pages
  captured): pages = Tuần lục · Tổng lược · Tuần này đến đây là hết only — NO emperor page, no «Sủng −8»; start line «… Danh 33 → 8, Bạc 210 → 80» with NO
  «Sủng 8 → 0», no «Chương 1». LIVE tt same run: «Sủng 8 → 0 (Hoàng thượng phật ý)», «Hoàng hậu → ta: thiện cảm -10 → -13», «Chương 1: Sơ nhập cung môn»,
  palace moves, 3 person pages. 0 page errors.
- Result cards (r4 family kept): forced palace drift at home → no card; own act «Gửi quà vào cung cho <Hoàng hậu>» row shows (both roads); after kcEnter(0)
  the palace card shows the consort row and a Sủng change writes «Sủng 19 → 24 (Hoàng thượng để mắt)» in the Sổ ghi.
- coop-e2e 143/143; act-merge-j5-kcscan ALL OK; LIVE ctp tests on the merge: charge-trinh-punish ALL PASS, punish-reason ALL PASS, promo-root PASS,
  cold-faction ALL PASS 20.
- Laws: 1 two-way (her gift row shows), 4 one core (filters only, no number typed), 6 real (her cost line kept; palace favour not on a life she lacks),
  11 whole family (lsSync + kcInit = ONE place each, all 5 roads). No UI / kit / wording change.

### MAIN 160 wider question (favour where she has no palace life)
Code + runtime: the only playable life without a palace is the home road (road8()==="kc", 5 roads) — covered. Lãnh cung (S.out from j14 cold()) is still a
palace consort (favour real); the servant road (isSrv) is a palace life; «xuất cung / về quê / ẩn cư» exist only as ending text (j32 etc.), not a playable
road. Nothing else to fix. «Lối riêng» unlock line is dropped at home too — correct, the «Lối riêng» group never shows on a home Hành sự tab (scan tab-act).
