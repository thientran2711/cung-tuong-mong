# review-opt-card-short (reviewer for MAIN ROOT-61, order via C-AG #18) — verdict on 04f09798: FAIL (re-review on the newer sha)
PRIORITY #1 CHECK: OD 18/11 ~21:20Z/~21:35Z/22:05Z | review/opt-card-short = -b = 04f09798 | main 0 | claims opt-card worker session_01Rc5AsMxWaub8yKfYn3AbWS.
Judged: origin/review/opt-card-short @ 04f09798 vs LIVE origin/main bb8e8ec9 (ls-remote at verdict time: both unchanged; no newer worker sha yet). FF: `git merge-base --is-ancestor origin/main 04f09798` = OK.
## Findings
1. FAIL (owner OD 21:20Z: real event text in the buttons): the scan samples `many` (dev/test/opt-card-scan.js:26, dev/test/stage-fig-size.js:45) use the placeholder «Cách thứ N để đối đáp cho phải lẽ» + invented hint; `short`/`choice` also use invented options («Vâng/Thôi/Lui/Chờ», «Tiếp», «Từ chối khéo rồi lui về cung»). Report #9 claims "real event text in every sample" — false for these three; the shots therefore do not show real options. Worker already told by MAIN to replace them with real PEND events.
2. Law 3 (gain-and-loss) cannot be judged on the shots: with invented options (fx only `suc:-i`, no gain) every `many` card is cost-only by construction, so the «không» in Được is a sample artifact, not proof of a game fault. Re-check on real PEND events after the worker's fix: list every real option whose Được = «không» (game fault, to file separately).
3. quickcheck 04f09798: core gates PASS, time-spill PASS, open 1517 ms, old save OK; FAIL perf `longTaskMaxMs 3069 vs live 1906 (limit 3050)` (3 runs new 3298/1766/3069, live 1906/1896/3419) = noise-level, 19 ps over the limit, same tasks>200ms 19/18. Re-run on the new sha; not blamed on the diff.
4. Not seen / to verify on the new sha: «Kéo xuống» cue on Fold mat2/many (report says SCROLLBIG 0 and all cards visible; I did not look at the images in this pass because the samples are placeholders — judge only with real events); Fold 755x1000 + iPad 1180x820 looked 3x with real options.
## Law check (touched laws)
10 (frame -> layout -> one size per tier, tall frames only grow by content): B chosen, report scan TIERCHK bad 0, consistent with the 22:05Z rule. 9/11: kit-conform gate PASS. 2/3: not provable with placeholders (see 2). 7: no new player text from the branch itself.
## Verdict
FAIL on 04f09798 (finding 1). Needs: new sha with real PEND-event samples in every case; then re-review (quickcheck + look Fold/iPad + law 3 list). LAND READY will be given for the newer sha only.
~100% review done on this sha / the game is not affected (test samples only).

---
# (older review kept below)
# Review opt-card-short @ ad86bcc0 (small reviewer, MAIN ROOT-54)
PRIORITY #1 CHECK: OD L1877 + 18/11 ~09:30Z/~16:05Z/~16:10Z/~16:15Z read verbatim | main: old option cards | review/opt-card-short ad86bcc0 (only branch) | claims opt-card-short #4/#5.
Merge: origin/main 94d11623 is already an ancestor of ad86bcc0 (merge = no-op, nothing to push; built files unchanged, fresh build identical).
Tests (worktree of ad86bcc0): `bash dev/tools/quickcheck.sh` PASS (core gates, time-spill, open 1624 ms, old save loads + plays a buoi, perf ok).
Scan `node dev/test/opt-card-scan.js` 12 cases x Fold 755x1000@2 + iPad 1180x820@2: page errors 0; SCROLLBIG 0 in all 24; TIERCHK bad 0 in all 24 (Fold 1M/1L, iPad 1M, many+child = 2S two columns); OVERFLOW 0; "!" column aligned (knbang x == kobang x: Fold 639/593, iPad 1000/850/805); every card shows exactly Tốn + Được.
LOOKED (mat2, dress, many, choice, child; Fold + iPad): picture strip only when options would scroll, all cards visible, no name over figure, one "!" colour, no cut text. Fold mat2/dress empty band under options = XL tall frame by 16:05Z rule (accepted by worker, owner may judge). fullbody-frame-s4 Fold "Thân phận kiếp này" screen out of scope.
Laws: 7 (no %), 9 KIT FIRST (KIT_OPT/kszEvLaw10 in kit), 10 (frame>layout>one size per tier, picture drops/shrinks), 11 whole group scanned, 12 both devices: no violation found.
PASS LAND READY ad86bcc09ebfced487991a51ee3caef65f138b81 (FF from 94d11623)

## SUPERSEDED / STOPPED (owner FAIL, OD 18/11 ~21:20Z)
The PASS above is withdrawn: owner failed ad86bcc0 (figure must fill the column, name tag at top, card titles centred, real event text). My checks did not cover those four points. Partial notes still valid for the re-review: quickcheck + scan columns (SCROLLBIG/TIERCHK/OVERFLOW/BANG) were clean on ad86bcc0; re-run on the new sha and add look-checks for the four owner points. origin/main 94d11623 was already merged.

VOID: owner FAIL 21:20Z (+~21:35Z crowned Hoàng hậu standard). ad86bcc0 must not land; await re-review sha from ROOT-55.
