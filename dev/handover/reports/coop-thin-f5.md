# coop-thin F5 — her mini-game SCORE ends as intents (on the F1 wrapper TH.F.reg) — STEP 0 (report first)

PRIORITY #1 CHECK ('petcGain|shelfPlantGain|aaPayMG|playArt|onDone|tsGame|tdFinish|wkFinishLesson|lessonMode|rcpMaster|wkPractice|TH.F.reg'): OD 17/11 thin guest (L1487/L1489/L1493/L1494) read verbatim, 0 new | ledger 0 | main 950508fc: no F5 | review/*: review/coop-thin-f4 ac66808f (base; F4 report lists these ends as F5), no review/coop-thin-f5 | claims: CLAIMS row 'coop-thin F5' (this worker).

Worker session_01N1tNP3xrJgrfek8aioQFv2 (opus), coordinator FOREMAN B ROOT-5 session_01N1tNP5mhtJhZ3qE6WZHmFk. depth 6 (get_session lineage.depth). START_CTX ≈ 3 % of 1M (used_tokens reads 0; estimate) → rollover at ≈ 28 %, ceiling 60 %.
Branch review/coop-thin-f5 STACKED on origin/review/coop-thin-f4 ac66808f. Worktree /home/user/wt/f5 (sparse). Level **10** (`TH.CAP` 9 → 10).

## 0a. Every mini-game end the guest runs today (base ac66808f, level 9: all LOCAL on her phone) and which part moves it
Split rule (F4 step 0, rows 5 / 8 / 13 / 17 tsGame): an engine that receives a mini-game SCORE from her tap chain = F5; the generic deck runner act(i), event / quest card families, contests and world events = F6 / D.
| # | game (her tap) | game → end (score callback) | file:line | part |
|---|---|---|---|---|
| 1 | pet care Cho ăn / Tắm / Chơi | petcFeed / petcBath / petcPlay → `petcGain(kind, score 0..1)` | jpetcare.js:96, :105, :118, :126 | **F5** (the khắc of the game start stays her clock, F1–F4) |
| 2 | shelf plant water game | shelfWaterGame → done(sum/rounds) → `shelfPlantGain(score 0..1)` | jshelf.js:378, :385 | **F5** |
| 3 | Tài nghệ lessons Tự học / Học với thầy / Học với Thái hậu (+ the work picker, the teacher picker) | lessonMode j23:18 (+ wkAsk j83:147, rcpTchAsk jrcp:250) → resumeMG j23:23 → openMG → j83:134 playArt → onDone(raw,{skipped,ok}) → cb(pts) (j23: addArt + log + teacher stories) + wkFinishLesson j83:131 | j23 / j83 / jrcp | **F5** |
| 4 | Tự học, làm tác phẩm (bậc 5) | wkPractice j83:153 → playArt → onDone → wkFinishLesson | j83.js:153-156 | **F5** |
| 5 | Học lối mới với thầy | rcpMaster jrcp:261 → playArt → onDone → wkFinishLesson ("học với thầy") | jrcp.js:261-265 | **F5** |
| 6 | the deferred cost of 3–5 | jaudit aaDefer (put back at the start) → `aaPayMG(score)` from the playArt / openMG wrappers | jaudit.js:296, :316, :321, :323 (+ jlogsync:128) | **F5** (paid on the host, once) |
| 7 | Tứ đức lesson with a game | tdPlay jtd:240 → kg82Play → result → `tdFinish(k,mode,raw,skipped)` (cost inside) | jtd.js:240, :254 (+ jtds:111) | **F5** |
| 8 | Hoàng thượng triệu đàn / cờ / du hồ (her card) | tsSummonMe jts:286 → tsGame jts:97 → onDone closure (Sủng, Ân tình, hộ giá) | jts.js:289-293 | **F5** = the end (the card comes from her week end tsSummonWeek jts:278 = G) |
| 9 | Thả đèn hoa đăng (3 wishes) | tsDenWish jts:310 → tsGame → onDone closure per wish | jts.js:314-320 | **F5** = the end (the card comes from the deck card Thả đèn = F6) |
| 10 | "Để trời định" / "Học nhanh" / "Bỏ qua" of games 3–9 | kitQuickRoll / roll(odds) ON HER PHONE (j82:402, jtd:253, jts:97 skipRes) | | **F5** (the roll moves to the host) |
| 11 | person-card game "Giao cho người làm" | jsgame → SG.mod → runAct / doAct | jsgame.js:244, :302 | F1 already (SG.mod rides in F1's ctx); overhear / bribeServ = F6 |
| 12 | contest round (Tranh ghế) | j34 openMG → done(g) | j34.js:38 | D / world event |
| 13 | exam, entry selection, Thử tay calibration | jexam kg82, jentry kg82, jmgcal kg82 | jexam:207, jentry:54, jmgcal:42 | F6 / B (jentry = her life start) |
| 14 | slap / dodge, nghiệm thân | jslap kg82, jroute kg82 | jslap:80, jroute:412 | D (dialog reactions) |
| 15 | Phúc tuyển / tuyển tú (kc), steal game, veil craft, make-up / dress games, phối đồ theo đề | jkc:512, jkc2:343, jsmg:63, jveil:146, jmkt:162 / jtoil:316 / j92:472, jts:392 | | F6 (not in the F4 split rows) |

## 0b. How each registers on TH.F.reg (level 10) + where the cost is paid
`reg10` = F4's reg9 at level 10 + a host `pre` step (runs inside the same tapRun, before the engine: the deferred cost and the host's own rolls).
- The closures that ended games 3–5 / 8–9 are moved into NAMED engines with plain arguments (solo identical, same body): `artLessonGain(m,g)` (j23 cb), `wkLessonEnd(k,m,raw,x,cb)` (j83 ×2, wkPractice, rcpMaster: one end; S.mg carries `how` / `qx` for Học lối mới, which also makes its reload-resume say "học với thầy"), `tsSummonEnd(k,res,b)`, `tsDenEnd(i,res,b)` (values recomputed at the end, same buổi), `tsSkipRes(odds,risk)` (ONE skip rule for tsGame). Registered: petcGain, shelfPlantGain, tdFinish, wkLessonEnd, tsSummonEnd, tsDenEnd.
- Score check on the host (BAL.mgSc: unit [0,1], raw [0,10]; law 4): a score outside the range, a kind / art / virtue / mode not in its table → the intent is refused (nothing applied).
- Skip: her phone never rolls. Her tap on the game's quick button closes the game and sends the end with `skipped` only; the host rolls (kitQuickRoll / tsSkipRes) in her context.
- Deferred cost (aaPayMG): her phone never pays (the call is held, its score kept); the cost (window.__aaPend / S.mg.cost) rides in the intent's ctx; the host pays it in her context ONCE (pre step, before the gain, as solo), then the engine; jaudit's own "one result card after the game" is captured (TH.UICAP + aaShowLast) and shows on HER phone. Rejected end = nothing paid, nothing gained.
- Her screens on the host: petcDraw / petcClose / shelfPlantDraw / petcGrowShow already captured (F4). Result cards: cardLater (F1) or aaShowLast (above).
Old guest path at L10: unreachable for these ends (one switch, TH.on(10)); deleted for good when L10 is the default (part H).

## 0c. Tap-to-screen time before
L9 today: the end is local on her phone (one render). Measured as the L9 column of coop-thin-f5.js in Done.

## Done — SẴN SÀNG KIỂM 6f77ed49 (review/coop-thin-f5, pushed; stacked on review/coop-thin-f4 ac66808f; F4/F3/F2 -r1 fixes and main NOT merged yet — waiting for Foreman B)
Commits: 71d6fb0a (F5 code), 938e2e96 (tests, quiet-scan roots, generated files), 6f77ed49 (coop-cyc local-Worker flags).
Touched vs ac66808f: dev/build/jcoopthinf.js (F5 block: reg10, ctx CX10 = CX9 + "aa" (her held score + cost) + "tds", the host `pre` step in the shared run, cardLater okHint(dr)), jcoopthin.js (CAP 9 → 10), j23.js (artLessonGain), j83.js (wkLessonEnd; wkPractice / the j83 openMG wrapper call it), jrcp.js (rcpMaster calls it; S.mg.how / qx), jts.js (tsSkipRes, tsSummonEnd, tsDenEnd, tsDenCtx), jaudit.js (aaCardTo / aaShowLast hooks: solo unchanged), jbal2.js (BAL.mgSc), coop/worker/src/index.js (THINMAX 9 → 10); dev/test/coop-thin-f5.js (new), coop-thin-trip.js (F5 bucket), coop-thin-quiet-scan.js (roots), coop-cyc.js (local URL); index.html / sw.js (build_site.sh).
Every solo refactor = the same body moved into a named function (one-core ×4 PASS, quickcheck PASS, solo rows identical in the twin check).
**FOR B / MAIN: the live Worker must be deployed with THINMAX 10 before level 10 can be switched on (all tests here ran on a local `wrangler dev` of this branch's Worker; levels ≤ 9 ran on the live Worker).**

### Moved paths (level 10; below 10 + solo unchanged)
| end | engine (her end → `do f`, the host runs it in her context) | L9 (before) | L10 |
|---|---|---|---|
| pet care games | petcGain(kind, score) | her phone | P1 max / P2 zero same as solo; P3 over-max, P4 bad kind refused |
| shelf plant water game | shelfPlantGain(score) | her phone | G1 / G2 same as solo; G3 over-max refused |
| Tài nghệ lessons (Tự học, Học với thầy + both pickers) | wkLessonEnd → artLessonGain + wkFinishLesson; aaPayMG on the host (pre) | her phone (cost paid there) | L1 max / L2 zero / L5 teacher same as solo, cost once, ONE result card on her phone; L3 over-max refused (no cost, no gain, lesson closed); L4 Học nhanh rolled on the host |
| Tự học, làm tác phẩm (bậc 5) / Học lối mới | wkLessonEnd (pa) | her phone | W1 work made in ONE place; W2 quick: no work, cost once; M1 (when a new sub-style is left) |
| Tứ đức lessons with a game | tdFinish | her phone | T1 same as solo; T2 «Để trời định» rolled on the host; T3 over-max refused |
| the summons (đàn / cờ / du hồ) | tsSummonEnd | her phone | S1 same as solo; S2 Bỏ qua rolled on the host; S3 over-max refused |
| the lantern | tsDenEnd | her phone | N1 same as solo |
Quick buttons: her phone never rolls (kitQuickRoll / tsSkipRes return null while her quick tap runs); the game's own quick path runs and its rows close at once; the host rolls. Every quick row is checked with her phone forced to the OTHER outcome.
F4 bug found and fixed (whole family): ctx "shpc" copied her plant key onto a throw-away object, so the host ran her plant care with HIS SHPC.g = nothing happened (F4's shelfPlantQuick too; its G1 checked only "ran"). Now the key itself travels.
Quiet scan: its roots missed every reg8 / reg9 / reg10 registration (F3–F5); fixed. 41 quiet reads, 32 reachable (unchanged); no new quiet-gated emitter reached first from an F5 end (lessons' jtq14 note "art" cards: TH.tapRun runs with quiet off → her Q → part D).

### Tripwire (guest writes outside fromCanon during the F5 end table, TRIP=1, local Worker)
| | L9 (before) | L10 | L10 swap |
|---|---|---|---|
| F5 ends | **1501** (log S.logs, wdOf, petcGain S.pets, aaPayMG S.mg, apply S.suc …) | **0** | **0** |
| "?" / F1 / D / D·patch | 612 / 726 / 1323 / 122 | 663 / 742 / 727 / 1793 | 653 / 732 / 620 / 1532 |
D = her start pickers (chooseM, local by the split); D·patch = designed (the host's answers).

### Latency (end tap → answer on her phone, n = 22)
| profile | median | min–max |
|---|---|---|
| L9 before (local) | 2 ms | 0–214 |
| L10 no throttle / swap | 522 / 252 ms | 220–763 / 95–549 |
| L10 4G (LAG 85 + host CPU ×4) | **1605 ms** | 644–2783 |
The end shows pending at once (D1: a second end ignored, one intent); lessons are the slowest rows (the host runs the cost, the gain and the work).

### Tests
| test | result |
|---|---|
| coop-thin-f5 L10 / swap / 4G / L9 (old road) | 28/28 / 28/28 / 27/27 / 26/26 |
| coop-thin-f4 L9 / swap · f3 L8 · f2 L7 · f1 L6 | 17/17 / 17/17 · 37/37 · 25/25 · 22/22 (first run 21/22: laydo staging, the known flaky row; rerun green) |
| coop-thin-a L1 / b L4 / c L4 / d L4 / e L5 | 24/24 / 136/136 / 16/16 / 47/53 (= main: 6 kit sameDom) / 33/33 |
| coop-cyc THIN=10 (local Worker) | 66/66 (mixed part skipped: no .tmp/old.html) |
| coop-e2e / COOP_SWAP=1 | 68/68 / 68/68 |
| coop-one-world seeds 1–10 | 10 × PASS |
| one-core guard / text / text-rule / bind · Worker npm test | PASS ×4 · thin ALL OK |
| quick scan (coop-thin-quiet-scan) | see above |
| quickcheck | PASS (old save ok; render 189/178, tab 408/296, buổi 1081/879 ms new/live; one earlier run beside a suite FAILED only on tab 417 vs 290) |
LOOK (scratch, deleted, nothing uploaded): guest iPad 1180x820@2 after L1 and host Fold 755x1000@2: the host shows only his own screen (no card / game of hers); her screen is covered by the test's staged rank edict (staging, as F4).
Laws: 3 cost paid once on the host or not at all (refused end); 4 every range from BAL.mgSc, no typed number; 5 the same game and parameters on her phone; 6c the work made in ONE place (W1 / L1: her bag on both phones, none on the host); 7/9–12 no new word, no UI part changed.
Known limits: the deferred cost amount and her start choices come from her phone (the start = pickers on her phone, by the F4 split); a refused end clears her lesson (no cost, no gain). Not F5 (step 0 rows 11–15): contests, exam, entry, Thử tay, slap, nghiệm thân, kc / steal / veil / make-up games = F6 / D / B.

## Merge round (B ROOT-5 09:28Z) — SẴN SÀNG KIỂM e6ad9a29
= 6f77ed49 + merge origin/review/coop-thin-f4-r1 d9b32074 (F2 7627f79c → F3 8dc849c2 → F4 + main 62055a31). Conflicts: jcoopthinf CX9 (kept ONE shelf ctx fix = the F4 reviewer's R1, which also fixes PETC {i,game}; mine dropped), coop-thin-quiet-scan roots (theirs + `reg\d+` so reg10 counts), index.html / sw.js (rebuilt).
Gates after the merge: coop-thin-f5 L10 28/28 · swap 28/28 · 4G 27/27 · TRIP F5 0 / 0 · coop-thin-f4 L9 18/18 · one-core ×4 PASS · quiet scan 32 reachable (F5 roots in) · quickcheck PASS (old save ok; render 210/228, tab 420/333, buổi 2120/970 ms new/live — buổi runs 2193/1361/2120 vs live 917/981/970: noisy box, gate passed).
4G question (same local wrangler, LAG 85 + host CPU ×4): F4 rows 1008 ms median vs F5 1736 ms → the extra is F5 itself, not the local Worker: refused F5 ends (no engine run, tiny patch) answer in 520–710 ms; applied ends 1480–1850 ms = the host runs the whole end at CPU ×4 (cost + gain + the work made, log lines, item ledger) and her patch is larger (her new work, log). Not the score payload (a few numbers).
