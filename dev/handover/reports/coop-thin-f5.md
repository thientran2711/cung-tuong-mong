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
