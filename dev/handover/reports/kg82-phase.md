# D-KG82PHASE: report (worker session_01D3E3NbPoxv5vvUzrwTQ1rU, depth 3, START_CTX ~4 %, now ~14 %)

PRIORITY #1 CHECK: OD MAIN 170 ORDER 03:35Z + F ROOT #2 02:55Z/03:12Z/03:40Z (FOREMAN_F_STATUS) | main: KG82.phase="result" set in j82/j92/jentry/jsgame/jslap/jtd/jts, not in jexam exRun after(), jmgcal after(), jroute done() | review/*: robot-realtap f65d019b dev/test/rt-board-phase-scan.js (copied in unchanged) | claims: D-KG82PHASE (this session).

**SẴN SÀNG KIỂM: review/kg82-phase @ 2602d629** (base origin/main 0b43ee55 = LIVE 17f23656 + mg-trim; the fix is commit 0f61ea5f; ec25b1e7 + 2602d629 only add test columns: law-4 shown = used, skip ≤ cap).

## Fix (one place, law 11)
`dev/build/j82.js` kg82ShowRes: the shared result path now sets `KG82.phase="result"`, sets `KG82.peek=()=>null`, and stops and clears `KG82.run` before it draws any result or next-round screen. No caller can forget it any more. Callers that already set «result» themselves are unchanged (it's harmless to set it twice). The j90 podium and jsfx wrappers run around it and still see «result».
Root build (index.html / sw.js / assets.json) is rebuilt with dev/site/build_site.sh, so quickcheck sees the sha's own build.

## Family table (runtime, every caller of the shared game frame; pixi-8.5.2 really loaded; `node dev/test/kg82-phase.js <url> <WxH>`)
Board ends the engine's own way (KG82.cur.end; jroute through its own done via quit). Values are read on the result / next-round screen.

| caller · screen | LIVE 17f23656 KG82.phase | fix KG82.phase | KG82.run (fix) | card mark = rules value (fix) |
|---|---|---|---|---|
| j82 startContest (hội thi) | result | result | stopped | yes |
| j82 playArt (học / tác phẩm) | result | result | stopped | yes |
| jentry tuyển chọn | result | result | stopped | yes |
| jslap Tát | result | result | stopped | yes |
| jtd Tu đức | result | result | stopped | yes |
| jts Hoàng thượng triệu | result | result | stopped | yes |
| jsgame mưu kế | result | result | stopped | yes |
| **jroute Nghiệm thân «Đã hiểu»** | **play** | result | stopped | (no /10 mark: 0/2 chip) |
| j92 Chải chuốt | result | result | stopped | (3/3 chip) |
| **jexam Môn 1 «Môn kế tiếp»** | **play** | result | stopped | yes (7 = 7) |
| **jexam Môn 2 «Xem kết quả»** | **play** | result | stopped | yes |
| jexam final «Đã hiểu» | "" (kg82Open reset) | result | stopped | Các môn = raws |
| **jmgcal Thử tay «Hồi kế tiếp»** | **play** | result | stopped | yes |

LIVE Fold 755x1000: FAIL 1/5 (4 paths stay «play»). LIVE iPad 1180x820: same 4. Fix Fold: PASS 6/6, fix iPad: PASS 6/6.
Static scan `node dev/test/kg82-phase-scan.js <ref>`: fix = 15 result paths, 0 left at «play» (kg82ShowRes sets it). On origin/main the static heuristic lists 10, but it over-reports callers that set «result» earlier in the function, so the runtime table above is the authoritative one. jtoil is not reachable from the test; it is covered by the shared path.
Side effect fixed: mg-back «2 Thử tay … between rounds» FAILS on main and PASSES on the fix (✕ on «Hồi kế tiếp» now takes the result branch).

## Pixi ticker / memory (brief item 3)
- Heap over 10 boards (CDP, after GC): LIVE 62.3→62.9 MB, fix 62.5→63.3 MB (Fold) and 63.2→63.7 MB (iPad). It stays flat. DOM nodes +~300 on both, the same.
- 2 min idle on the exam «Môn kế tiếp» screen (LIVE stuck «play» vs fix «result»): heap moves in a GC sawtooth and stays at ~67 MB on both. No game-side growth.
- rAF on an idle result screen: ~70–140 callbacks/s on both builds. The stack is pixi `Mt._tick` (KFX ambient weather/fx app, ~60/s) plus kfsSched and the MutationObserver kick. This is the same rate as with NO game open (baseline measured), so it is the ambient fx ticker, not the board. The board's own loop is stopped in every path (KG82.run off). The stage PX ticker idles itself (pxTick stops after 3 still frames). kitStageCovered does not count the #kg82 frame, so the ambient KFX ticker keeps running under a mini-game. Pausing it there is possible, but it would also stop result fx (podium sparkle), and it is a kit/perf decision, so it is NOT done here. Suggestion for MAIN / kit keeper only.

## Harness vs game split (with F BIG #16 / HARNESS FIXER #16)
- GAME cause (fixed here): KG82.phase stayed «play» on 4 result screens (jexam ×2, jmgcal, jroute). The harness read «play» and kept driving a finished board («BOARD theu 0 moves still in play 366 s» on s7b exam Môn 2/2 Thêu 9/10).
- HARNESS side (FIXER #16 f65d019b, already done): mgOver() leaves the loop on a hidden/covered board with a way on, and the stuck ladder counts game progress only. With this fix both are just extra safety.
- Renderer freeze 660–977 MB in Mt._tick: NOT reproduced game-side. In a clean page with pixi loaded, the stuck screen, 10 boards, and 2 min idle show no growth. The Mt._tick frames are the ambient fx ticker that runs on every screen. So the growth must come from the long harness session: minutes of taps on a stale board (each tap spawns fx), and/or a very long life (b2417). F should re-run s7b's exam case on this sha. If it still grows with the phase now right, it is a harness/long-session item, not this family.

## Item 4: «BOARD hat 170 moves 0/10» (LIVE Fold): NOT this family
That board ended (it has a mark). The rhythm engine (j82 kg82Rhythm) has N=20 notes, and each tap that hits no note costs 0.3 credit. 170 taps for 20 notes means ~150 stray taps × 0.3 → 0/10. That is harness tap spam (it taps beyond the notes / off-window). The hit window is WIN = (220 + lv·14)·mgTol ms (≥ ±220 ms) and «Tuyệt» is ±100·mgTol. It is NOT ±90 ms. → harness item for F (peek-driven taps should only tap a live note in its window).

## ADD-ON (Foreman D 04:57Z/05:02Z: E-S3 R2-skilled-2 iPad, exam «Môn 2/2 · Thêu» card «10/10 · Xuất sắc» while the log says «BOARD theu 0 moves still in play (367 s)»)
Verdict: the same family as JOB 1 (stale «play»), NOT a wrong score.
- **A 0-move board does not score 10.** On LIVE, Thêu / Kim / Đàn / Hát boards left untouched run to their own end and the card says «0/10 · Vụng» (raw 0 = card = rules), every one (iPad, idle test). The engine (j82 kg82Pattern) only scores taps: pts += 2·right/shown per round, 5 rounds.
- **10/10 is what a perfect peek-driven play earns.** KG82.peek gives the next correct cell, so the «skilled» bot that taps every peek scores 2 × 5 = 10 → «10/10 · Xuất sắc». That is a real result. The harness's «0 moves … still in play (367 s)» counts only its loop AFTER the board had ended: on LIVE, jexam left KG82.phase at «play» on the «Xem kết quả» card, so the harness kept polling a finished board where nothing was tappable (0 moves), and the 367 s / Mt._tick 1.1 GB is that loop (as in s7b). With this fix the card has phase «result» and the harness leaves at once.
- **Shown = used (law 4), whole family:** the test column «card mark / header chip / value the rules use» matches on every kg82ShowRes caller, Fold + iPad.
- **Quick / skip never beats her own play (OD 18/11 ~05:55Z), whole family:** each caller's skip button → card mark ≤ BAL.skip.cap 5. Contest 5/10, playArt 5/10, jentry 5/10, jexam 5/10. jts, jsgame, jroute, jtd and j92 roll the word odds (no /10 mark). Thử tay has no skip. PASS 7/7 (iPad). MAIN's older «Bỏ qua = 10/10» (flight-M4, build 4da55ce8) was fixed by m-fix-1 BAL.skip.cap and is confirmed capped on every path.
- Readings to tell apart in shots: the identity row «g/10 → r/10» (r is used, by design); the live chip starts at 10/10 during play (mgLive).

## Gates
- touched/mg tests: kg82-phase.js PASS 6/6 Fold + iPad (fix), 7/7 iPad with the skip section; LIVE FAIL (the fault). mg-back.js: fix 11/12, main 10/12. The remaining fail «startContest rules ✕ onTop:false» is the same on main, so it predates this change (not this family).
- coop-e2e (run alone): 143/143 passed.
- quickcheck: «QUICKCHECK PASS · open 1893 ms · old save ok (loads + plays a buổi, 0 errors) · perf new/live render 177/161, tab 497/498, buổi 918/1071». CORE GATES FAIL G4 90-button-crawl «Ô lưu · Lui close button did not close its layer». The same row FAILS on origin/main (qc on main: identical line), so it predates this change.
- videos (exam Môn 1 → board → «Môn kế tiếp», test label shows KG82.phase), CDN curl 206:
  https://ctm-img.victoria-tntt.workers.dev/img/_review/kg82-phase/live-fold.webm · fix-fold.webm · live-ipad.webm · fix-ipad.webm
  (LIVE ends on «Môn kế tiếp» with phase = play; fix shows the same screen with phase = result. Frames checked.)

## Handover (if a successor is needed)
Worktree /home/user/wt/kg82 (review/kg82-phase), outputs /home/user/wt/kg82-out. Only the ADD-ON evidence is open: when D sends the seat/shot, compare it with the law-4 column of dev/test/kg82-phase.js.
