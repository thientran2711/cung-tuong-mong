# PROGRESS — review/perf (D15: download size + perf test)
Base origin/main eba64ead4 + merge origin/review/ua-test-r1 (device profiles). Owner rule: PERFORMANCE BUDGET (OD 15/11 22:35Z). No game-UI change.

## Findings (fold profile, host mode, SW on, cold cache, 20 Mbit/s 60 ms, wire bytes gzip, `dev/test/perf.js`)
The loading system (review/loading) made a NEW player download every "core" file before the title. core was ~80 MB when written; the CDN grew to
26,348 pictures / 1.98 GB and assets.py's `core` rule (= everything that is not fig-/por-/ev-/st-/map-fest-) became **7,934 files, 890 MB**, then
1,042 MB more of figures in the background. The owner's "129 MB" was an earlier point on that curve.
The service worker's own precache (PRE list in sw.js) is small: index.html, manifest, assets.json, audio/*.json + 24 CDN img/*.json manifests = ~3 MB.
Real play needs far less: 3 random lives x 3 weeks (fold / ipadAir / iphone14 landscape, every tab + a walk each buổi) requested 933 distinct files / 60 MB.

| metric (fold) | BEFORE | AFTER |
|---|---|---|
| first load before the title (wire) | **911.9 MB** (8,171 files) | **43.3 MB** (752 files) |
| of which images / audio / html / json / font | 897.7 / 5.4 / 5.6 / 2.8 / 0.3 | 33.2 / 1.7 / 5.6 / 3.0 / 0.3 |
| of which sources: CDN pictures / own site | 899.5 / 12.4 | 34.7 / 9.1 |
| time to title (20 Mbit, 4x CPU) | 746 s | 29.6 s |
| background download in the 30 s after the title | 22.7 MB (planned 1,042 MB) | 27.5 MB (planned 120.7 MB, capped) |
| bytes cached on device after the run | 940 MB | 72 MB (+ whatever is seen later) |
| warm visit (reload, SW on) | 5.64 MB, 9.5 s | 3.76 MB, ~7 s |
| time to first playable turn | 15.9 s | 7.9 s |
| JS heap after 10 buổi | 36.7 MB | 38.3 MB |
| long tasks >200 ms in 10 buổi (4x CPU, shared box) | 65 (max 2.7 s) | 51 (max 1.3 s) |
Other devices after: iphone14 43.5 MB / 29.3 s title / heap 38.0 / 39 long tasks; ipadAir 43.5 MB / 29.7 s / 38.4 / 50.
(Before numbers for iphone14/ipadAir were not re-run: the plan is identical, 890 MB core, only the throttle differs.)
Long tasks are mostly the synthetic bot's render storms (a click every 60 ms) under 4x CPU; the budget is a regression guard, not a smoothness claim.

## What changed
- `dev/site/assets.py`: new groups. `core` (blocks entry) = `dev/site/first-hour.txt` (recorded) + ALWAYS (title backdrops, frames, icons, sfx, bgm-day), but
  identity-specific art (other people's fig-/por- sets, ev-/st-/map-fest-) leaves the blocking set (her, the Emperor's and the Thái hậu's sets stay).
  `fig` = background, in the existing role order, capped at `CTM_BG_MB` (120 MB); `lazy` = never fetched ahead (1,786 MB, 24,869 files); `fx` as before.
  Result: core 531 files 31.7 MB, background 815 files 120.7 MB, lazy 24,869 files 1,786 MB.
- `dev/build/jload.js`: skips `lazy` like `fx` (also in `refresh`, which wrongly re-queued fx files); background set is skipped on Data-saver, `connection.type==="cellular"` and 2g/3g lines
  (the pictures the game shows still cache on use via sw.js). No wording / layout change.
- `dev/site/sw.tpl.js`: no change to cache logic needed: it already caches any file listed in assets.json under its content key on first use, so lazy files work offline once seen and a new
  build only re-keys changed files. NEW: the design-canvas iframe (`?krot=1`) is answered with the very response the host page was just given (one 1.9 MB download instead of two on every
  controlled start, always the same build as its host). Comment block updated. Version bump is automatic (V = hash of index.html + shell files; assets.json changed -> new sw.js), old installs
  update through the normal swreg.js flow; the long-lived `ctm-assets` cache is never wiped, so a returning player keeps what she has and the smaller core just finds it present.
- `dev/measure/firsthour.js` records first-hour.txt (union with the old list; re-run when new first-hour art lands). `dev/measure/img-budget.py` lists pictures over budget.
- `dev/test/perf.js` + `dev/test/perf-budget.json` (see below).

## Not done / follow-ups (KIT REQUEST: none)
1. First visit still fetches index.html 3x (1.9 MB gzip each = 5.6 MB of the 43.3): the host page, the rot.js iframe (`?khost=1&krot=1`, a different URL so the HTTP cache cannot answer it)
   and the SW install precache of `index.html` (`cache:'reload'`). Proposal for the kit keeper: rot.js loads the iframe from the SAME URL as the host (frame flag in the hash/`window.name`, not the
   query) so the HTTP cache serves it, and swreg.js hands the shell its index from the HTTP cache. Would take the first load to ~37 MB. (SW already dedupes the iframe on controlled starts.)
2. Pictures over budget on the CDN (`python3 dev/measure/img-budget.py`): centre art 793 files over 250 KB (98 MB excess); sprites 12,908 files over 40 KB (591 MB excess; the fig/por sets average
   65 KB); img/fx fine (0 over). Re-encoding is the art pipeline's job (CDN files, not git); not touched here. Biggest: img/pl2/nhat-garden-* place art ~570-600 KB each.
3. Duplicate content on the CDN: 9 groups, 2 MB (map-sang = map-ha-sang etc.): not worth a code path.
4. First-hour list is from random lives; a different origin shows a few more pictures on demand (they cache on first sight). The title says "Chỉ thỉnh một lần… không cần mạng" — with lazy art offline
   covers what she has seen (wording is VANPHONG's; flag to the wording owner if it should say so).
5. Long tasks / frame time: only counted; no game-code optimisation done here.

## perf.js
`node dev/test/perf.js [--devices fold,iphone14,ipadAir] [--out file.json] [--budget file] [--turns 10] [--mbit 20] [--cpu 4] [--timeout 900] [--no-warm] [--base url]`
Needs the built root (run `bash dev/site/build_site.sh` first), Playwright + the CDN reachable (uses HTTPS_PROXY). Serves the root with a GitHub-Pages-like server (gzip, ETag, max-age=600).
Per device: cold first-load bytes by type/source until the title is usable, the 30 s after, time to title, time to first playable turn, JS heap after N buổi (gc), long tasks >200 ms, warm visit.
Prints one JSON line per device plus a table; exit 1 when any metric exceeds `dev/test/perf-budget.json`. ~3 min per device (cold load dominates). One Chromium at a time.

## review/perf-r1 (reviewer, on origin/main bad941b4)
- Merged review/perf onto main (only generated files conflicted; rebuilt with build_site.sh).
- first-hour.txt missed whole roads: dev/measure/firsthour.js rerolled away the cung nữ servant life (`cnv`) and random lives skipped origins
  (no `cn`/`dtq`/`thd`/`tt` room art). In a 1-week fold life on the merged build 100 files (5.8 MB) the first week showed were `lazy`, incl. her own
  first room (phong-cung-nu-*), act pictures and kit pictures. Fix: firsthour.js now plays ONE life per origin (window.__forceOrigin, ORIGINS incl.
  cnv); re-recorded on fold + ipadAir x 9 origins x 3 weeks (union): 933 -> 1,552 files; core 531 files 31.7 MB -> 632 files 43.2 MB.
  After: fold 2 lives x 2 weeks, Data-saver: 23 non-figure lazy files (act-*-h variants of week 2), iphone14: 1.
- sw.tpl.js: the krot iframe answer took the NETWORK response even when the host had been given the SAVED copy (slow line > 4 s), so the iframe
  could run a newer build than its host (reproduced: dev/test/upgrade-sw.js --slow phase 4 FAILS on the D15 worker, iframe eeee… vs host fb02…).
  Now HOSTR is exactly the response the top-level host navigation was given. Test passes.
- New tests: dev/test/lazy-offline.js (fresh install + offline), dev/test/upgrade-sw.js (old main SW + caches -> this build). See dev/test/README.md.
- perf-budget.json firstLoadMB 50 -> 62 (bigger core, measured 55.2 MB).
