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
