
## Re-check of conflict re-merge — review/mg-intro-2-land 278c461b (rv: mg-intro-2-rv da3aa72d2f8f72167d25025ad6c7cc08476154f1 = + newest LIVE ee02e8c0)
PRIORITY #1 CHECK: read earlier mg-intro-2 report (rv3 847a5934 PASS); diffed 847a5934..278c461b on j82.js; grep'd startContest/playArt hunks.
- j82.js hunks resolved correctly, both sides kept: startContest intro keeps ev event picture + kgBangRows rows AND main's onGo(rows) before kg82Play; playArt keeps kgBangRows(o.rows) AND EG (o.eng) kgReady, onGo(), quick.raw. No conflict markers.
- Merged newest LIVE ee02e8c0 (only index/sw conflicts -> theirs + rebuild). mg-intro-2.js Fold+iPad ALL OK. mg-ui-rest 38/39: the one FAIL («pet bath: Sẵn sàng starts the game») is identical on LIVE ee02e8c0 (pre-existing, not from this branch).
- quickcheck: core gates PASS; perf noise on first run (longTaskMaxMs under parallel load), second run PASS perf; G4 50-coop-one-world flaked once under quickcheck load, 8/8 PASS standalone on both LIVE and branch (load race, same family as 80-dialog-fixed).
- Shots Fold+iPad: event picture on top, 3 «!» (Luật chơi / Phần của ta / Đối thủ), no rules-demo picture, short rows, Sẵn sàng + Hướng dẫn + quick option, no %.
- VERDICT: PASS.
