
## Re-check of conflict re-merge — review/mg-intro-2-land 278c461b (rv: mg-intro-2-rv da3aa72d2f8f72167d25025ad6c7cc08476154f1 = + newest LIVE ee02e8c0)
PRIORITY #1 CHECK: read earlier mg-intro-2 report (rv3 847a5934 PASS); diffed 847a5934..278c461b on j82.js; grep'd startContest/playArt hunks.
- j82.js hunks resolved correctly, both sides kept: startContest intro keeps ev event picture + kgBangRows rows AND main's onGo(rows) before kg82Play; playArt keeps kgBangRows(o.rows) AND EG (o.eng) kgReady, onGo(), quick.raw. No conflict markers.
- Merged newest LIVE ee02e8c0 (only index/sw conflicts -> theirs + rebuild). mg-intro-2.js Fold+iPad ALL OK. mg-ui-rest 38/39: the one FAIL («pet bath: Sẵn sàng starts the game») is identical on LIVE ee02e8c0 (pre-existing, not from this branch).
- quickcheck: core gates PASS; perf noise on first run (longTaskMaxMs under parallel load), second run PASS perf; G4 50-coop-one-world flaked once under quickcheck load, 8/8 PASS standalone on both LIVE and branch (load race, same family as 80-dialog-fixed).
- Shots Fold+iPad: event picture on top, 3 «!» (Luật chơi / Phần của ta / Đối thủ), no rules-demo picture, short rows, Sẵn sàng + Hướng dẫn + quick option, no %.
- VERDICT: PASS.

## REVIEW kit r2 (25/11, sonnet reviewer SEAT 2b, Foreman B) — review/kit-mg-intro-r2 25ca281d3ce9a802ff58e1f2a99198777897ff19
PRIORITY #1 CHECK ('kfoc-intro|kitFocus.intro'): OD 0 | main 0 | review/* kit-mg-intro e716092a (r1), minigame-fix(-2) = future users | claims KK25.
Laws: 9 (card = kit .kpst + kg82Rows + kg82Btn, no private frame), 10/12 (Fold + iPad), 11, 3-4 n/a, 7 (words «Luật chơi · …», «Sẵn sàng», «Bỏ qua · kết quả thường» as KIT).
- main 502c48c9 is an ancestor; built files fresh (build line only differs).
- node dev/test/kit-mg-intro.js <url> <out>: r2 head Fold + iPad ok (card inside the layer, not clipped, one-line title, go inside card, skip visible + not overlapped, fx layer hidden, go fires + card removed, class cleared); with args 755x1000,1180x820,412x1058,390x844 all ok; MAIN = FAIL («F.intro is not a function», both devices); previous round e716092a with the r2 test = FAIL «.kfoc-intro declares z-index twice» (source scan non-vacuous); r2 = z-index:3 once. No args: crashes on missing url (required).
- Law 11 (every mini-game intro): the only code path that gets the card is F.intro, and on this branch its only callers are the test and the kit sample (dfIntro/DF_RULE in minigame-fix is the later user; no private intro here). The one global effect is html.kfoc-playing hiding #kfxcv/.kfx-fl/.kfxk/.kfrip while F.play is up: the on-figure games (jdfv/jdfg dfPlay) call none of those layers (grep), class cleared in endPlay AND destroy (grep: no other path removes the focus root), .kfxk-catch (separate class) untouched. kit-focus.js (touches jfocus): main PASS, r2 PASS, merged PASS.
- Shots (Fold + iPad, looked 3×): card centred over the figure, opaque, above the figure, skip button «Bỏ qua» visible below and on top, nothing under/over the wrong layer.
- Merged onto NEWEST main 345eb929: source merges clean, built sw.js conflicts only (rebuild regenerates); rebuilt → kit-mg-intro ok Fold + iPad, kit-focus PASS.
- Quickcheck: run once for this seat on SEAT 2a (a6ca9994, PASS above); this branch touches only jfocus + KIT + test, kit-focus + kit-mg-intro cover it.
VERDICT: KIT OK 25ca281d3ce9a802ff58e1f2a99198777897ff19 review/kit-mg-intro-r2
