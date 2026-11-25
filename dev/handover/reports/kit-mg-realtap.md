# kit-mg-realtap — KIT review (KK26 KIT READY review/kit-mg-realtap 45c9a58b)
PRIORITY #1 CHECK ('kit-mg-realtap|tntile'): OD 0 | ledger 0 | claims 8 | main 0 | review/* 2 | archive 0

## REVIEW r1 (sonnet kit reviewer, 11/25/2026 ~06:00Z) — KIT FAIL (one test line)
Branch = LIVE 0756a05b + 3 files (KIT.md §92.4 + REAL-TAP TEST RULE, dev/test/kit-mg-intro.js, index.html stamp only). No game code changed; index.html differs from LIVE only in the CTM_BI build stamp.
Command: `node dev/test/kit-mg-intro.js file://<tree>/index.html <out>` (head's test file, run against each tree's index.html; Fold 755x1000 + iPad 1180x820).

| run | 4da55ce8 (old) | LIVE 0756a05b | head 45c9a58b |
|---|---|---|---|
| as committed | FAIL / FAIL | Fold ok / iPad FAIL | Fold FAIL / iPad ok |
| as committed, 3 more LIVE runs (diag) | | FAIL, ok, FAIL (Fold) — hit = `DIV.kne kne-beat` in `#dawn.kne-day.on`, or `IMG.kmbox-o` | |
| + veil guard (CSS `#dawn,.kmbox,.kne{display:none!important}` before the tap) ×2 | FAIL / FAIL (hit = `.kfoc-play`, the real bug; once `#kmrew`) | ok / ok, ok / ok | ok / ok, ok / ok |

FAIL rows:
1. **Flaky on LIVE and on head (law: tests non-vacuous AND deterministic).** The tap at the «Sẵn sàng» centre is intercepted by a random veil (day-start banner `#dawn .kne-beat`, `.kmbox` picture box) that re-appears after the setup hides it once. The same index.html passes one device and fails the other on different runs. So the test cannot be trusted as a PASS gate on LIVE. FIX (1 line): before `elementFromPoint` / the tap, clear the veils (`#dawn`, `.kmbox`, `.kne`, modal) — e.g. addStyleTag `#dawn,.kmbox,.kne{display:none!important}` or the branch's veil.js helper (not on this branch). With the guard: LIVE 4/4 ok, head 4/4 ok, 4da55ce8 4/4 FAIL on `.kfoc-play` swallowing the tap = non-vacuous.
2. Not blocking: `dev/test/lib/veil.js` named in the older kit briefs is absent from this branch; the guard above is enough.

OK parts: KIT §92.4 STACKING note correct (intro z 5 > play z 4, matches c70cfd17); REAL-TAP TEST RULE text matches OD 25/11 ~05:10Z; the test uses a real touchscreen tap + elementFromPoint (no JS click) and fails on old for the right reason (hit = `.kfoc-play`). Not yet run: quickcheck alone (do on r2 after the fix).
Verdict: KIT FAIL review/kit-mg-realtap 45c9a58b → KK26 adds the veil guard, posts r2; reviewer re-checks the same table + quickcheck.

## REVIEW r2 (sonnet kit reviewer, 11/25/2026 ~08:00Z) — review/kit-mg-realtap a4d0325416e7814681720e3fc889bbd8bfe86fdf — KIT OK
Re-check of r1 FAIL row 1 (flaky veil). Head test kit-mg-intro.js (a4d03254) run against each tree's index.html, 3 runs × Fold 755x1000 + iPad 1180x820:
| tree | result |
|---|---|
| 4da55ce8 (old) | 6/6 FAIL «real tap hits DIV.kfoc-play in game» (non-vacuous, right reason) |
| LIVE 9f72524b (newest) | 6/6 ok |
| head a4d03254 (bare) | 6/6 ok |
| head merged onto newest LIVE 9f72524b (ecc7d1ed, index.html/sw.js rebuilt) | 4/4 ok |
Veil guard now hides #dawn,#modal,.kroul,.kmbox,.kne,kmrew; failure text names the blocker. Diff vs main = KIT.md §92.4 stacking + REAL-TAP TEST RULE, kit-mg-intro.js, index.html build stamp only. quickcheck alone on merged head ecc7d1ed: QUICKCHECK PASS 226 s (render 263/260, tab 551/620, buổi 2646/1571, old save ok).
VERDICT: KIT OK a4d0325416e7814681720e3fc889bbd8bfe86fdf review/kit-mg-realtap. Lander: only a build-stamp conflict in index.html/sw.js → rebuild.
