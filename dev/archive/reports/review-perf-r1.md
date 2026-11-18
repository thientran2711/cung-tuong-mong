# review/perf-r1 (D15 review, Foreman C) — reviewer report
PASS d2221602f32c24270fe5d50b36ac78be3775edf6
(branch review/perf-r1 = review/perf ef6bc7d5 merged onto origin/main 399483e3 + reviewer fixes; generated files rebuilt with build_site.sh; descends from origin/main 399483e3)

## Risks checked (numbers measured, Chromium + dev/test/lib/device.js profiles, HOST mode, SW on, cold profile)
1. First minutes lazy? FOUND + FIXED. dev/measure/firsthour.js rerolled away the cung nữ servant life (`cnv`) and random lives skipped origins, so
   first-hour.txt had no cung nữ room (phong-cung-nu-*), no cn/dtq/thd/tt origin art and none of the art added on main since eba64ead4. A 1-week fold
   life showed 100 lazy files (5.8 MB) incl. her first room, act and kit pictures. Fix: firsthour.js plays one life per origin (window.__forceOrigin,
   ORIGINS incl. cnv); re-recorded fold+ipadAir x 9 origins x 3 weeks: 933 -> 1,552 files, core 31.7 -> 43.2 MB.
   After (Data-saver = no background, strictest path), dev/test/lazy-offline.js: fold 2 lives x 2 weeks: 0 broken pictures, 0 page errors, 23 non-figure
   lazy files (week-2 act-*-h variants, fetched on use); iphone14 2x2: 0 broken, 1 non-figure lazy; final merge fold 1x2: 0 broken, 1 (kit/bg-mama).
   Figure/portrait sets of other people stay on-use by design (owner 15/11 22:35Z "load on demand"). Placeholders (KIT §59) do not depend on the cache.
2. Offline after first use: OK. Offline + reload: title up from cache; every file seen online served offline: fold 854/854, iphone14 769/769,
   final 788/788; revisiting the saved life's tabs + 10 places offline: 0 broken. Never-seen lazy art cannot show offline (by design).
3. Returning install update: OK. dev/test/upgrade-sw.js: main bad941b4 build (old SW 39bd21dd, 7,969 keys, old core 897 MB, pictures stubbed)
   -> this build: new SW in control, iframe on the new build, one shell cache whose index is the new build, 7,969/7,969 still-valid keys kept
   (no wipe), core left 0, offline reload on the new build in 1.3 s, 0 page errors.
4. ?krot=1 iframe answer: FOUND + FIXED. sw.tpl.js stored the NETWORK index even when the host had been given the SAVED copy (line > 4 s), so the
   iframe could run a newer build than its host. Reproduced with upgrade-sw.js --slow phase 4 on the D15 worker: iframe eeeeeeeeeeee vs host
   fb02421fadfa. Now HOSTR = the exact response the top-level host navigation was given (network or saved copy); same test passes.
   Residual: two tabs opened within the same 30 s could swap answers (same build in practice); a SW restart drops HOSTR (normal path).
5. navigator.connection missing (iOS Safari): OK. iphone14Land with connection undefined: no errors, background set runs (132 files in 12 s).
   saveData=true: background skipped, shown pictures cache on use. Note: iOS cannot detect cellular, so the background set always runs there.
6. perf.js (20 Mbit, 60 ms, CPU 4x; with the larger core): fold 55.2 MB / title 34.2 s / playable 8.9 s / heap 40.2 / long>200 45 / warm 3.9 MB;
   iphone14 55.3 / 33.8 s / 9.6 s / 39.9 / 46 / 4.0; ipadAir 55.3 / 34.8 s / 12.5 s / 40.1 / 44 / 3.9. (D15 claimed 43.3 MB / 29.6 s with the old,
   incomplete list: consistent, +11.5 MB core.) The budget caught it: firstLoadMB 55.2 > 50 -> exit 1 on all 3 devices. Ceiling raised to 62 with the
   reason in perf-budget.json (_r1). Coordinator may instead choose the smaller list (revert first-hour.txt) if 43 MB matters more than coverage.
7. first-hour.txt regenerable + documented: yes (firsthour.js header, assets.py comment, PROGRESS_perf.md); added dev/test/README.md section with the
   exact command and WHEN to re-run (any branch adding art every new life sees in its first weeks).

## Reviewer changes on review/perf-r1
dev/measure/firsthour.js (every origin), dev/site/first-hour.txt (re-recorded), dev/site/sw.tpl.js (HOSTR fix), new dev/test/lazy-offline.js +
dev/test/upgrade-sw.js, dev/test/perf-budget.json (firstLoadMB 62), dev/test/README.md, dev/PROGRESS_perf.md. No game UI / kit change.
Loading screen checked at fold 755x1000 (kit panel, "10 / 43 MB", note "Tranh nhân vật (121 MB)"): fine.

## Follow-ups (not blocking)
- Wording (VANPHONG owner): loading note "Từ lần sau vào cung ngay, không cần mạng" is now only true for art already seen.
- index.html fetched 3x on a first visit (~6 MB of the 55): KIT REQUEST K16 (rot.js) already filed.
- CDN pictures over budget (img-budget.py: 793 centre art > 250 KB, 12,908 sprites > 40 KB): art pipeline.
