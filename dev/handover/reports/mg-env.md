PRIORITY #1 CHECK: OD 20/11 ~06:55Z (owner bug via ROOT-73) | main j92.js:441 kg92Groom env.zw | review/* none | claims mg-env row only
# mg-env report — branch review/mg-env, sha 4f3b78f (built; includes rebuilt index.html/sw.js)
START_CTX ~5 % (est.), finished well under rollover.

**Bug:** Thử tay «Chải chuốt» drew no green «Đúng phẩm» zone: `kg92Groom` read `env.zw`, only `wdGroomUI` passed it; generic `kg82Play` did not, so lo/hi = NaN.
**Fix (dev/build/j92.js, one line):** `w = env.zw != null ? env.zw : wdGroomW(live S or {})` — same ONE core as the real round (WD.groom*), no typed number.

## Scan (whole group, all KG82_ENG engines)
| engine | env fields read | passed by kg82Play? | default added |
|---|---|---|---|
| groom (kg92Groom) | zw | NO (only wdGroomUI) | wdGroomW(S or {}) |
| sgame (jsgame) | v | NO | none needed: sgThr(undefined) already defaults (loyal 50) |
| jroute play | tut | optional flag | none (falsy = real round) |
| all other engines | kind, lv, hud, end | YES | — |
Scan = `grep -o "env\.[a-zA-Z_]*" dev/build/j*.js` over every engine file.

## Tests
- NEW dev/test/mg-env.js: every KG82 kind via kg82Play: no NaN canvas arg, painted; Chải chuốt green zone width = wdGroomW (with and without S). **FAIL before fix (476 NaN, zone 0px) → ALL OK after.**
- mg-ready-guide PASS 9/9; ag-mgcal ALL OK; `dev/tools/quickcheck.sh` PASS at 4f3b78f (211 s, core gates PASS, old save loads, perf new/live render 241/243 ms, buổi 1228/1099 ms).
- Shots (LOOKED, green zone visible, no overlap): /home/user/wt/mg-env-chai-755x1000.png (Fold) and mg-env-chai-1180x820.png (iPad), session-local, NOT on CDN / not in git.

Not touched: tap highlight / touch fx (mg-visual), in-play text (mg-noword-a/b). No kit part added.
