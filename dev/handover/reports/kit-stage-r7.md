# KIT-STAGE-R7 report (MAIN 165) — merge-regression root cause + close-only cards + LOOK
PRIORITY #1 CHECK: OD 26/11 22:07Z + 22:43Z | main 4cfcda61 | review/kit-stage-r4 | claims KIT-STAGE-R6 → R7.

## (1) Merge regression (41594be5)
- Root cause: the LIVE 4cfcda61 merge (29f3d247) took dev/build/assemble.py from LIVE → the build list lost jkpick, jkpcard, jkhand, jkstage, jkmapban → no kitHand/kitStage/kitPick in index.html → c2a showed a plain list. Fixed: union list (LIVE jnsieve/jbalsp/jstatpace/jevc/jverdict + the 5).
- Other «taken from LIVE» files checked line by line: j63 loss = kitResFold (intended drop, KK48/KK49), jksize/KIT.md one line each superseded by LIVE.
- LIVE jevc daily big-event cap holds a 2nd «Phụ tuyến» card the same game day (correct rule): every test that fires c2a / synthetic frames starts a clean day (S.evc=null, EVCW empty), 11 test files.
## (2) Close-only cards (ed63dd29)
- jts thả đèn «Thôi, không thả nữa» → kit «Thôi» (✕). jtsb Điềm lạ / Đèn nến «Bỏ qua» → kit «Thôi», risk line moved into the story. jsmg quick «Thôi, không chơi» (= lose) removed via new kit option playArt({quick:false}) (KIT §13.6); kg82 ✕ gives up.
- Data rows named exactly «Thôi» with no effect (thoi-scan.py 67) are the kit close (j3 kitCancelIx never draws them; ✕ runs them) — not visible.
- Live probe of direct paths (tsDangerPanel, tsDenWish, tdsTchAsk, DOOR.card, tsbFireW, tshelp, herGame): ✕ only.
## Tests (0f9f4407)
kit-hand PASS 116/0 · kit-stage PASS 31/0 · thoi-live-scan 171 probed / 0 close cards · mg-skip-audit = 2 old rows (j5, jtd) unchanged. kit-res-fold.js deleted.
## (3) LOOK media: CDN img/_review/kit-stage-r7/ {fold,ipad}-banbai.mp4, {fold,ipad}-result.mp4, {fold,ipad}-banbai-{01 deal,02 enlarge,03 flip,06 2nd card back}.png
## HANDOVER
Open: MAIN look → KK49 KIT OK → RV-164. Test: node dev/test/kit-hand.js index.html <out>; kit-stage.js; thoi-live-scan.js; ONLY=banbai,result node dev/test/kit-stage-r5-video.js index.html <out>.
