PRIORITY #1 CHECK: OD ~15:25Z (7) | main kboot/swreg/jnotes | review/* loading-words-r1 d4318833, loading-words-2 8816f08ee | claims worker session_01UV1SzkaNQaeHGcLrqFrzzQ

# Review loading-words-2 -> PASS loading-words-2-r1 64e303045
Branch review/loading-words-2-r1 @ 64e303045 = 8816f08ee + origin/main 7e0250ec (only index.html/sw.js conflicted, site rebuilt) + 1 reviewer fix. Ancestor of current origin/main: yes.

## Checks
1. Boot fail card (Fold 755x1000@2, iPad 1180x820@2, looked at): visible text all Vietnamese (title, body, Mở lại, Quét lối cũ rồi mở lại, Chi tiết); no English word visible. Raw line appears only after tapping "Chi tiết" (small monospace line "bản game dừng giữa chừng (game script did not finish)") - for bug reports, per brief; the tail of that line is English, owner may want it Vietnamese-only (non-blocking).
2. Lookbehind: built index.html and sw.js - no lookbehind literal; every lookbehind string goes through kRx/R (3 allow-listed string-only lines: KRX_LB probe, j84 B prefix, jaudit KREL_RE). lookbehind-scan 38 via kRx/R, 0 BAD; webkit-syntax 306 modules, parse-level hits 0; webkit-boot native / old-safari / broken PASS (VP.fix same on 10 samples); old-safari boot at Fold and iPad: 0 page errors, boot done.
   Spot test (kRx emulation forced, native vs emu on the changed patterns): 4 of 5 same. 1 DIFF found: j95b sentence split "(?<=[.!?…]..)\s+|\s*;\s*" - lookbehind sits at pattern start so the emulation applied it to the ";" branch too, and ";" no longer split on old Safari. FIXED by reviewer: split(/\s*;\s*/).flatMap(split(kRx lookbehind \s+)); verified identical to the original on a sample. 
3. update-notes.js 755x1000 ALL OK; quickcheck --runs 3: build/old save/perf PASS (open 1439 ms, render 172/177, tab 229/266, buổi 863/770), BUT core gate G4 50-coop-one-world FAIL seed 7 "merge differs from the host" (seed 3 PASS). Same FAIL on plain origin/main 7e0250ec (built, seed 7) -> pre-existing, not from this branch; main should look at it (staff-root-fix / trait-rename merges are the likely cause).
Shots: scratch only (not uploaded to CDN, nothing to wipe).
