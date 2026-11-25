# DELEGATE-NOMG — report (worker session_01V1ZZH3fnPTQoZv6e7HPqN9, for MAIN 132)

PRIORITY #1 CHECK ('nghe ngóng|giao việc.*mini|sai cung nữ|delegat|servant.*mini|người hầu.*chơi'): OD 14 | ledger 3 | claims 7 | main 15 | review/* 0 | archive 0 — reused: BAL.ptime.kinds (the "send another person" family), jstagehere ACT_REMOTE, jwhy spyO/spyRoll/spyFactors (the sent agent's ability), the kit focus react line. Nothing new built.

Owner rule (OD 25/11 ~04:12Z, verbatim): "Khi nào mà tôi là người tự làm thì mới có thể làm mini game cho tôi. Còn cái này là người ta làm mà tại sao lại là mini game của tôi?" — canon overwrite of OD:L192/L195 for delegated acts.

## Root cause
The Dư đồ focus view (jdfv dfTap, owner OD 21/11 "every action is a mini-game") played an on-figure game (+ «LUẬT CHƠI» intro) for EVERY act not of class D, incl. acts her maid / servants do: «Nghe ngóng chung» (class A via the odds cap 95) → engine "ear" (GIỮ). Her play moved the servant's odds.

## Fix (branch review/delegate-nomg, on LIVE origin/main 49f17d4d, FF)
1. jdf.js: ONE classifier `dfDlg(a)` = option carries a parallel-time send kind (`pk`, BAL.ptime.kinds) OR is in ACT_REMOTE OR its name is in the send family (`^Sai …`, `Nghe ngóng chung`, `Truyền/Mời thái y…`, `Nhờ thái giám`, `Cài tai mắt/người hầu`) → `dfCls` returns class **E** (delegated).
2. jdfv.js dfTap: class E runs like D: no rules card, no game layer, plain odds (intro/«Sẵn sàng» handler untouched — SANSANG-MUSIC-FIX told by send_message).
3. Outcome by the DOER (law 4): «Nghe ngóng chung» (maid pop-up jwhy, servant pop-up jhouse, Hành sự card jact, parallel-time order + landing jptime) now runs `spyListen(doer)` = `aRoll(spyRoll(S,null,doer))` — the existing dò la agent factors (her eyes/tâm cơ/tài, «phải sai đi», the doer's thiện cảm, nết, bậc; BAL.spy*). Card shows `spyO(S,null,doer)` as the ladder word (law 7), e.g. «Có cơ» / «Vững». Miss = "«tên» đi nghe ngóng một vòng, chưa nghe được chuyện gì đáng bẩm." (khắc spent, nothing else lost; gain-only on success — law 3 OK). Before: o:100 (always sure, 5 % soft fail at cap).
4. jdfv dfLast: a run act with no result toast shows its own short line on the figure (kit react bubble): «Thúy Lũ đi nghe ngóng, về khắc 3.» (before: nothing shown). The return result goes the existing parallel-time report / log path (short-result card unchanged, shared path).

## Whole-family audit (dev/test/delegate-nomg-audit.js, live game, every place + her maid + every servant)
Outside the focus view (static read):
| opener / family | doer | verdict |
|---|---|---|
| jsgame scheme games (Dò la→Nghe ngóng, Tung tin đồn→Truyền lời, Mua chuộc→Mặc cả, 12 Thời cơ acts, Nghe lén) | she chooses: «Tự ra tay» (game) / «Giao cho người làm» (no game) | compliant; runtime-checked: Giao road 0 openers |
| j82 contests / playArt (arts, works j83, tứ đức jtd, exam, entry, jts, jkc), jsmg Tranh sủng, jslap/jlooks dodge, jpetcare, jshelf watering | herself | keep game |
| Hành sự maid cards (jact) «Sai cung nữ đi dò la» / «Nghe ngóng chung» | maid | never had a game; now doer odds |
| 16 parallel-time send kinds (ask bribe buy clothes gift giftin harm invite listen mktspy plant scout shop spy summon vlbuy) | the one sent | none opens a game; all covered by `pk` |

Focus-view acts (before → after):
| kind | act | engine | self / delegated | BEFORE class · game | AFTER class · game |
|---|---|---|---|---|---|
| maid | Nghe ngóng chung | ear | **DELEGATED** | A · GAME | E · no game |
| maid | Sai đi dò la | ear | **DELEGATED** | D · no game | D · no game |
| serv | Nghe ngóng chung | ear | **DELEGATED** | A · GAME | E · no game |
| serv | Sai đi dò la | ear | **DELEGATED** | D · no game | D · no game |
| chest | Cài đồ vào rương nàng | words | self | D · no game | D · no game |
| chest | Lấy trộm son phấn | drag | self | A · GAME | A · GAME |
| chest | Lục rương tìm chứng cứ | words | self | A · GAME | A · GAME |
| elder | Biếu | words | self | C · GAME | C · GAME |
| elder | Hỏi chuyện | words | self | C · GAME | C · GAME |
| fallen | Hỏi chuyện cũ | ear | self | A · GAME | A · GAME |
| hh | Chia sẻ bí mật | ear | self | (not on stage this run) | C · GAME |
| hh | Chào hỏi | bow | self | (not on stage this run) | C · GAME |
| hh | Cùng chơi | words | self | (not on stage this run) | D · no game |
| hh | Hắt nước | swipe | self | (not on stage this run) | B · GAME |
| hh | Hắt trà | swipe | self | (not on stage this run) | B · GAME |
| hh | Hỏi han sức khỏe | words | self | (not on stage this run) | C · GAME |
| hh | Khiêu khích | stare | self | (not on stage this run) | C · GAME |
| hh | Quạt mực | swipe | self | (not on stage this run) | B · GAME |
| hh | Thách đấu | words | self | (not on stage this run) | D · no game |
| hh | Thỉnh an | bow | self | (not on stage this run) | C · GAME |
| hh | Xin Hoàng hậu che chở | words | self | (not on stage this run) | C · GAME |
| hh | Xin son phấn | drag | self | (not on stage this run) | C · GAME |
| ksp | Hầu chuyện, xem lén sổ nguyệt sự | words | self | A · GAME | A · GAME |
| ksp | Hỏi sở thích Hoàng thượng | ear | self | A · GAME | A · GAME |
| ksp | Xem sổ nguyệt sự | words | self | A · GAME | A · GAME |
| ksp | Xem sổ thị tẩm | words | self | C · GAME | C · GAME |
| ksp | Đút lót lật thẻ | drag | self | C · GAME | C · GAME |
| maid | Giao việc phòng bị | words | self | D · no game | D · no game |
| maid | Trò chuyện với cung nữ | words | self | C · GAME | C · GAME |
| man | Chào hỏi | bow | self | C · GAME | C · GAME |
| man | Chào hỏi đúng lễ | bow | self | C · GAME | C · GAME |
| man | Liếc mắt đưa tình | words | self | C · GAME | C · GAME |
| peddler | Để ta xem | words | self | C · GAME | C · GAME |
| rival | Bàn tán về Lưu Như Sương | ear | self | C · GAME | (not on stage this run) |
| rival | Bàn tán về Quách Tố Nga | ear | self | (not on stage this run) | C · GAME |
| rival | Bàn tán về Thượng Quan Sương Hoa | ear | self | (not on stage this run) | C · GAME |
| rival | Bàn tán về Tiết Hoán Khê | ear | self | C · GAME | (not on stage this run) |
| rival | Bàn tán về Tạ Ngọc Thù | ear | self | (not on stage this run) | C · GAME |
| rival | Bàn tán về Uông Thư Dao | ear | self | C · GAME | (not on stage this run) |
| rival | Chia sẻ bí mật | ear | self | C · GAME | C · GAME |
| rival | Chào hỏi | bow | self | C · GAME | C · GAME |
| rival | Cùng chơi | words | self | D · no game | D · no game |
| rival | Cùng cung | words | self | C · GAME | C · GAME |
| rival | Cảnh báo nàng | ear | self | C · GAME | C · GAME |
| rival | Dò la | words | self | D · no game | C · GAME |
| rival | Ghé chơi | words | self | A · GAME | C · GAME |
| rival | Giúp đỡ nàng | words | self | A · GAME | C · GAME |
| rival | Hạ nhục | stare | self | C · GAME | C · GAME |
| rival | Hạ độc | words | self | D · no game | C · GAME |
| rival | Hắt nước | swipe | self | B · GAME | B · GAME |
| rival | Hắt trà | swipe | self | B · GAME | B · GAME |
| rival | Hặc ăn mặc sai phẩm | stare | self | A · GAME | C · GAME |
| rival | Hỏi han sức khỏe | words | self | A · GAME | A · GAME |
| rival | Khen tài nghệ nàng | words | self | A · GAME | C · GAME |
| rival | Khiêu khích | stare | self | A · GAME | C · GAME |
| rival | Mượn son phấn | drag | self | C · GAME | C · GAME |
| rival | Nghe lén câu chuyện | words | self | C · GAME | C · GAME |
| rival | Ngáng chân | swipe | self | A · GAME | C · GAME |
| rival | Nhờ giúp đỡ | words | self | C · GAME | C · GAME |
| rival | Nương theo | words | self | A · GAME | C · GAME |
| rival | Quạt mực | swipe | self | B · GAME | B · GAME |
| rival | Rỉ tai chuyện trong cung | ear | self | A · GAME | C · GAME |
| rival | Thách đấu | words | self | D · no game | D · no game |
| rival | Thử lòng | words | self | A · GAME | C · GAME |
| rival | Tung tin đồn | words | self | D · no game | C · GAME |
| rival | Tát | swipe | self | B · GAME | B · GAME |
| rival | Tặng quà | drag | self | D · no game | D · no game |
| rival | Tố xa xỉ | stare | self | A · GAME | C · GAME |
| rival | Vu oan | words | self | D · no game | C · GAME |
| serv | Giao việc phòng bị | words | self | D · no game | D · no game |
| serv | Hỏi chuyện | words | self | D · no game | D · no game |
| serv | Phạt vô cớ | words | self | D · no game | D · no game |
| serv | Thưởng vô cớ | words | self | D · no game | D · no game |
| serv | Tiến cử | words | self | D · no game | D · no game |
| serv | Tâm sự | words | self | A · GAME | A · GAME |
| serv | Xem người | words | self | D · no game | D · no game |
| serv | Đổi người | words | self | D · no game | D · no game |
| th | Kể tội một phi tần | ear | self | C · GAME | C · GAME |
| th | Thỉnh an, chép kinh | bow | self | A · GAME | A · GAME |
| th | Xin Thái hậu đỡ lời | words | self | C · GAME | C · GAME |
| th | Xin son phấn | drag | self | C · GAME | C · GAME |
| ty | Bài thuốc dễ thụ thai | drag | self | C · GAME | C · GAME |
| ty | Chào hỏi | bow | self | C · GAME | C · GAME |
| ty | Mời làm thái y tâm phúc | words | self | C · GAME | C · GAME |
| ty | Xin bắt mạch | words | self | C · GAME | C · GAME |

Only 2 delegated acts opened a game (maid + servant «Nghe ngóng chung»); after: 0. «Sai đi dò la» / «Giao việc phòng bị» are own-flow pickers (D), no game.

## Tests
- dev/test/delegate-nomg.js: PASS — static scan (every ptSend kind ∈ BAL.ptime; dfCls E; dfTap E branch; spyNews only via spyListen) · runtime opener spy (kg82Open, playArt, startContest, sgPlay, dfGame, slapGame, focus intro/play) over 15 delegated runs (pop-up, focus tap at every place, scheme «Giao cho người làm» ×3) → 0 calls · REAL TAP «Nghe ngóng chung» Fold 755x1000 + iPad 1180x820: no «LUẬT CHƠI», no game, order given, react line shown, return logged, no page errors · doer loyalty 20→95 moves odds 58→73.
- dev/test/delegate-nomg-audit.js: delegated-with-game 2 → 0.
- quickcheck HEAD: PASS (core gates incl. coop-one-world, time-spill guard, old save, perf ≈ live).
- coop-e2e 142/142 both orders (default + COOP_SWAP=1).
- duodo-focus-data PASS, duodo-focus-games PASS, duodo-focus-view: 4 FAIL (5a–5d NPC-encounter scene) — IDENTICAL on untouched origin/main 49f17d4d (pre-existing, not this branch).
- Shots (LOOKED): https://ctm-img.victoria-tntt.workers.dev/img/_review/delegate-nomg/ fold-1-fan / fold-2-after-tap / fold-3-back / ipad-1-fan / ipad-2-after-tap / ipad-3-back (.png).

## r2 — scheme «Giao cho người làm» rolls the DOER's odds (MAIN 133 ruling on OD 25/11 ~04:12Z; was the open item)
- j9: `ACTSEND` + `actSent()` + shared `sendPen(sv,k)`: when she GIVES the act to someone (even standing with the target) the act is a SENT act in actCtx / runAct: the one sent (bestSent, the same pick runAct makes) does it with his own sendPen (j29 sentPen: thiện cảm, nết, bậc; BAL.net.k), earns merit, and if caught confesses — the same road as any act she sends a servant on (law 1/6).
- jsgame: «Giao cho người làm» (the choice and the skip button inside the game's rules card) runs `J.runDlg` = fzRun(doer odds, sent act). Nghe lén / Mua chuộc: the job odds minus the doer's sendPen. The option reads «giao cho <tên> · <odds word> · …».
- Before → after (sample, rival not together): Dò la her 63 → giao: disloyal doer 52 / loyal 69; Tung tin đồn 49 → 43/52; Vu oan 10 → 5/13. Before: «Giao» always rolled HER odds.
- Tests r2 (sha 1785c176 + report): delegate-nomg.js PASS incl. (5) doer loyalty moves the Giao odds, the run's ctx pen = the doer's sendPen, card names the doer · quickcheck PASS · coop-e2e 142/142 both orders · shown-odds-spend 52/52 · schemegames PASS · schemesave ok · duodo-focus-data/games PASS. Pre-existing, identical on untouched main: shown-odds.test 87/90 (plant-here ×3), schemewire crashes (stale locator), duodo-focus-view 5a–5d.

## Merges onto LIVE main (FF)
- 4da55ce8 (flight-modal-deadlock) and 0756a05b (sansang-music-fix): built files only (index.html/sw.js), rebuilt. Re-run on the merges: delegate-nomg PASS ×3, quickcheck PASS (incl. new hook 85 dead-card), coop-e2e 142/142 both orders.
- sansang-music-fix.js under file:// shows the same FAILs on untouched 0756a05b (music not back; «Sẵn sàng» covered at one size, varies per run) = env/flaky, not this branch. My jdfv lines (dfTap E branch, dfLast) do not touch the intro handler.
