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

## UPDATE 00:50Z 27/11 — ROLLOVER HANDOVER (kit-stage-r4 head 0e62389f; successor opened by MAIN 168)
Done since the first report:
- review/result-sieve-r2 575917ae = RV-165 PASS, on main a22cf45d: result card empty band (jk2b kevres 9-row span), «Vì sao» sieve (jwhyn whySieve), j84 «thiện cảm thiện cảm» rule. Tests result-sieve-card.js, why-words.js live on main.
- kit-stage-r4: ed63dd29 close-only cards; 0e62389f RV-164 note (a): dead kitResFold helpers / KIT §7.4a / kit-page sample → the ONE sieve (kit_dupes OK, kit-hand PASS). KK50 KIT OK on 41594be5.
- j75 vs jwhyn whyRows: NOT a bug (j75's is IIFE-local) — no change.
OPEN (in order):
1. Owner ruling «Ok bỏ lật, làm theo Game of Dice» → NO FLIP anywhere (dev/handover/reports/god-research.md on the handover branch: front info; tap = enlarge + ONE «Chọn» 280x64; tap outside / ✕ = back). kit-stage-r4 still carries tap-2 flip → must NOT go to review until flip-free (MAIN 167).
2. Waiting for KK51 (session_01Rc5AsJN1bdRYgV8aBNXsdX) KIT READY of the NO-FLIP kitHand. Its review/kit-hand-mount 682e7433 (§101.13 kitHand.mount, ff on ed63dd29) still flips — told KK51 + MAIN 168. When the no-flip kit lands: merge main (a22cf45d+) + the kit branch into kit-stage-r4, remove flip family-wide (KIT §101.10 text, kit-hand flip asserts, kit-stage-r5-video .khflip taps, KIT_HAND.flip), rerun kit-hand / kit-stage / thoi-live-scan / kit_dupes / result-sieve-card, record mp4 Fold 755x1000 + iPad 1180x820 (deal → tap → enlarge → Chọn → result) on CDN img/_review/kit-stage-r7/ (old flip videos there are obsolete) → LOOK READY to MAIN 168 (sếp asked for the Bàn bài video) → KIT OK (KK) → RV-165 (session_01Rc5AsLoAzF54ipTvF4Hhdn).
3. Asked MAIN 168: who wires KK51's 8 outside-#modal rows (SELSCENE, kpsc pair, Hành sự deck, Khuê các decks, Tài nghệ, empty-tab act, jactj4 doors, jflip row) and who owns kitScene.refit (I never filed it).
Merge caution (root cause of the R6 regression): when merging LIVE, assemble.py must keep the union of module lists (jkpick, jkpcard, jkhand, jkstage, jkmapban + LIVE's) — check `grep -c "const KIT_HAND=" index.html` = 1 after every rebuild. LIVE jevc daily cap: tests firing c2a twice need S.evc=null; EVCW.length=0 (already in 11 tests).
MAIN 168 DECISIONS (00:47Z 27/11): no-flip kitHand = KK52 JOB 1 (KK51 rolled). The 8 outside-#modal rows (SELSCENE kbare answers, kpsc identity pair .nlopts, Hành sự act deck, Khuê các decks + Việc groups, Tài nghệ .kpanec, empty-tab act, jactj4 doors, jflip row) = KIT-STAGE-R8 applies them with kitHand.mount as part of the no-flip family apply (law 11), after KK52 KIT READY. kitScene.refit = DROPPED. MAIN 168 opens R8 when KK52's no-flip KIT READY lands.
