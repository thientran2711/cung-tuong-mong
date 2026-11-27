# BIG review — review/kg82-phase (D-KG82PHASE) — VERDICT: PASS · LAND READY 05723cea

Reviewer session_01D3E3NZVGK5WWUexX1awNrS (depth 3, START_CTX ~0 %), opened by Foreman D session_01D3E3NXaPqTqoCnowMTPdTq (now session_01D3E3NagaVYs8K14c2bMUy1). 27/11.

PRIORITY #1 CHECK: OD MAIN 170 ORDER 03:35Z (★ play-stopper, kg82 boards never leave «play») + F ROOT #2 03:40Z | main: KG82.phase="result" was set by 8 callers; jexam exRun after(), jmgcal after() and jroute done() did not set it | review/robot-realtap f65d019b rt-board-phase-scan.js (copied in unchanged) | claims D-KG82PHASE worker session_01D3E3NbPoxv5vvUzrwTQ1rU.

## Sha reviewed
- Worker head ec25b1e7, then 2602d629 (Foreman D 05:26Z: test-only, adds the skip ≤ BAL.skip.cap section). Game fix = 0f61ea5f (one line in dev/build/j82.js).
- LIVE moved from 0b43ee55 to 4cd3f974 while the work was open. I merged LIVE into review/kg82-phase-rv: only the built files conflicted (index.html, sw.js). I took them from LIVE and rebuilt them with dev/site/build_site.sh. Then I merged 2602d629 (test only).
- **LAND sha = 05723cea on review/kg82-phase-rv.** origin/main 4cd3f974 is its ancestor, so main can fast-forward to it. The source diff against main is j82.js (1 line) plus 3 test files. The assets.json rebuild adds 26 CDN entries, the same as the worker's own build. The lander resets assets.json to LIVE as usual.

## The fix
kg82ShowRes is the one shared result path. It now sets KG82.phase="result" and KG82.peek=()=>null, and it stops and clears KG82.run before it draws the result. No caller can forget the end state now.

## Checks
1. **Whole family (law 11).** I read every kg82ShowRes caller: j82 ×2, j92, jentry, jexam ×2, jmgcal ×2, jroute, jslap, jtd, jtoil, jts, jsgame. That is 15 paths, and 0 stay at «play» (static scan; origin/main lists 10). Runtime table, Fold and iPad, 13 caller screens: all reach «result» with the run stopped. On LIVE, 4 screens stay at «play»: jroute «Đã hiểu», jexam «Môn kế tiếp» and «Xem kết quả», jmgcal «Hồi kế tiếp».
   - Next round / back to board: «Môn kế tiếp» and «Hồi kế tiếp» go through kg82Open and kg82Play, which set «» and then «play» again. The run that was stopped is the old one. env.end already nulls KG82.run for kg82Play boards, so the new stop only acts on the custom runs (jroute play(), j92 groom). Those stop functions can safely run twice (dead flag / cancelAnimationFrame). In the 10-board loop every result reached «result» and the next board ran.
   - Retry, ✕ and quit: kg82Back/kg82GiveUp only change on «play» or «result». A result screen now takes the result branch. mg-back «Thử tay ✕ between rounds» FAILS on LIVE and PASSES on the fix.
   - Wrappers: j90 podium (`pend` is only set in startContest, which already set «result»), jsfx result sound (no phase read), and the j82:750 sign pass (now skipped on every result screen, so buttons keep their words). jtoil toilFinish and jhd: the run is already stopped before showRes.
   - Co-op: jpma has no kg82ShowRes. Its live board ends through env.end/onFin, which this change does not touch. coop-e2e 143/143.
   - jroute «nghiệm máu» drop reveal (jroute:451) does not use kg82ShowRes and is not a played board, so it is out of scope.
2. **No false «result» during play.** Every kg82ShowRes call is reached from an end callback, a skip, or a give-up (code read). Nothing calls it while a board is running. Tutor rounds use env.end and restore phase through `keep` (j82:633). mg-ready-guide on the fix: PASS 9/9.
3. **Law 4 and law «quick/skip never beats own play» (OD 18/11 ~05:55Z).** No numbers changed (the diff touches no value). Test column: card mark = header chip = the value the rules use on every scored caller, Fold and iPad. On Fold, «Môn 2» showed «1/10 3/10 3/10»: the jmgid identity row g→r and then r, and r is the value used, as designed. Skip table: every skip/quick result ≤ BAL.skip.cap 5, both devices. ADD-ON «Thêu 10/10»: the worker found it is the stale-«play» family (a live HUD chip read while the board was stuck), not a wrong score. My runs agree: the card always equals the value used.
4. **Gates on 05723cea** (served over http with pixi-8.5.2 loaded):
   - kg82-phase.js: Fold 755x1000 PASS 7/7, iPad 1180x820 PASS 7/7. LIVE 4cd3f974: FAIL on both devices (the fault).
   - mg-back.js (Fold, run alone): fix 11/12, LIVE 10/12. The one remaining FAIL «startContest rules ✕ onTop:false» has the identical line on LIVE, so it was there before this change.
   - mg-ready-guide: fix PASS 9/9 (run alone). In a parallel run, fix and LIVE each failed one different flaky row. The LIVE run alone hung, and I stopped it.
   - coop-e2e (run alone): 143/143.
   - quickcheck 05723cea vs live 4cd3f974: **QUICKCHECK PASS** · CORE GATES PASS (the «Ô lưu · Lui» G4 row did not fail in this run) · time-spill PASS · open 2180 ms, 0 errors · old save ok (loads and plays a buổi) · perf new/live render 228/211, tab 546/572, buổi 1266/1209.
   - Heap over 10 boards: 63.1→63.5 MB (Fold) and 63.1→63.7 MB (iPad), flat. No page errors.
5. **Videos:** all 4 return curl 206. I looked at the frames. LIVE Fold and iPad end on «Môn kế tiếp» with the label `KG82.phase = play`. The fix shows the same screen, and the label changes to `result · run off` within about 1 s (the label only lags behind). Nit for the test only: the exam rules screen in the videos reads «KHẢO HẠCH TẤN PHONG UNDEFINED». The test calls exRun(exPlan(S)) without P.rk, which exStart sets. This is a harness artifact, not the game; the real exStart path sets rk.
6. **FF from LIVE:** done (see above). LIVE was still 4cd3f974 at the verdict.

## Laws touched
Law 4 one core: pass (no number changed; the card prints the used value). Law 7 wording: no player text changed. Law 9 kit: no UI change. Law 11 whole group: pass (one shared place, scan 15/15). Law 12 two devices: pass (Fold and iPad). Law 13 PRIORITY #1 line: present in the brief and the report.

## Notes for MAIN / Foreman F (not blocking)
- The ambient KFX pixi ticker keeps running under a mini-game frame, because kitStageCovered does not count #kg82. Whether to pause it is a kit/perf decision for MAIN and the kit keeper.
- The renderer freeze (660–977 MB in Mt._tick) does not reproduce on the game side. F should re-run the s7b exam seat on this sha. Any growth that remains is a harness/long-session item.
- «BOARD hat 170 moves 0/10» is not this family: the harness taps outside the notes (worker item 4).

Videos stay on the CDN under img/_review/kg82-phase/ until the lander confirms. The worker uploaded them; they are not wiped here, so the lander can view them.
