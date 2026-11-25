# kit-scene-fade — review (SCENEFADE seat)

## REVIEW r1 — 11/25/2026
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 8 | main 0 (kitScene.close guard absent) | review/* kit-scene-fade only | archive 0.
Branch review/kit-scene-fade 14e66f43d2fbe2774ec9ee2bb2b37b8bad0beadc (base 24883e24; 1 code line in dev/build/jkitsel.js + KIT §93.9 + test kit-scene-fade.js + rebuilt index.html/sw.js).
Verdict: **PASS** (KIT OK r1).

1. Test non-vacuous: `node dev/test/kit-scene-fade.js file://<worktree>/index.html <out>` (Fold 755x1000 + iPad 1180x820)
   - origin/main 502c48c9: `755 {"mid":true,"after":false,...}` / `1180 {...after:false}` → «old fade stripped kscn-on from the NEW scene» ×2, FAIL.
   - head 14e66f43: `after:true, layers:1, done:1, end:false` both devices → KIT-SCENE-FADE PASS.
   - head merged onto newest origin/main (502c48c9; conflicts only in built files, rebuilt): PASS.
   - head merged with review/sideline-dlg-2 (F4 watchdog user; conflicts only index.html/sw.js, rebuilt; both guards present in built file): PASS.
2. Built files: index.html on the branch contains the fix; a fresh `build_site.sh` differs only in the build stamp line (CTM_BI) + assets.json (build-derived), sw.js identical. OK.
3. Law 11, kitScene users: grep on main = only kitScene.open in jkitsel.js (kitsel sample, line ~128) plus the dlgs watchdog on sideline-dlg-2 (jdlgs.js drop()). `open()` calls close(true) first: cur is null → kscn-on removed then re-added by the new scene — unchanged behaviour. close(false) fade end: only removes kscn-on when no scene is current — the whole group (all close paths share `off`).
4. kit-selscene.js (the other kitScene test), Fold + iPad: main 18 ok + 2 FAIL («pair layout A»); head 19 ok + fails on the same case with varying fields (between/onTop/boxIn) — a random #modal (e.g. «Kính sự phòng báo tin») covers the layer in the shot (veil.js rule: no tap/shot under a random modal). Flaky on main too (KIT §93.9 note), NOT caused by this change; solo / tags / bare cases ok on both.
5. dlgs-play.js on head+sideline-dlg-2 merged (DLGS_STEP=60, fold+ipadAir): ALL PASS 1862 checks, 0 FAIL (scene plays before card, never twice).
6. quickcheck ALONE on the sideline-dlg-2 merge: QUICKCHECK PASS · 237 s · open 2257 ms · old save ok · perf new/live render 322/295, tab 533/529, buổi 1666/1649, tasks>200ms 23/26 · core gates PASS.
7. Shots: kitsel-pair-fold / -ipad looked (iPad clean; Fold has the random modal noted in 4). No UI change in this branch (fade callback only).
Not run: bare-head quickcheck separately (one-line callback guard; the merged run covers it).
