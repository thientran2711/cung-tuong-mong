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
