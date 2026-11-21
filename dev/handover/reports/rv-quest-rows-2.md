# REVIEW quest-rows-2 re-merge (sonnet rv, MAIN 91) — PASS
PRIORITY #1 CHECK ('quest-rows'): OD #66 FINAL (OD 21/11 05:10Z) + #74 (05:13Z) CANCELLED at 05:15Z | main 0 | review/* quest-rows-rv 05e1cf15 PASS, quest-rows-2 2fc4a277 | claims row quest-rows-2 (MAIN 90 worker) + this rv row.
START_CTX ~5 %.
Merge: review/quest-rows-2 2fc4a277 + NEWEST origin/main d6f23858 (re-merged after main moved; quickcheck PASS 223 s, chips-scan 0 on final) -> review/quest-rows-2-rv 6aac0a54 (only index.html/sw.js conflicted: taken from main, rebuilt assemble.py + build_site.sh, 0 markers). origin/main is an ancestor of 6aac0a54 (FF possible).
jk2b.js line-by-line: vs LIVE main = ADDITIONS ONLY (o.tags span in kitSceneArt return, .ksart-tags/.ksart-tag CSS, kitArtTags + showModal wrap + MutationObserver); LIVE kitMarkHtml seal, kemo CSS, kit-act-grid/kit-rankunit rules untouched. vs 05e1cf15 = kitEvArt line now passes mark/markAlt (LIVE seal), o.mark uses kitMarkHtml, LIVE CSS present, o.tags + tag CSS + kitArtTags kept. No lost behaviour either side.
#66: quest-chips-scan fold 55 / ipadAir 53 offers, 0 chips, 0 errors; two tags on picture top-left (type + «Hạn N tuần»), steps as kit label|value «Bước n | …» rows, cổ trang words. #74 void, so phone keeps event picture. No older OD rule broken.
Gates: quickcheck PASS (core gates, time-spill, open 1943 ms, old save loads, 0 errors); dialog-dup-scan 53/0 bad; dialog-stack-scan 10 pairs 0 bad; coop-e2e 92/92; mood-seal-ev 24 cases OK (one cold-start lean 937 ms on first iPad case, rerun 900 ms OK = timing flake, seal code is LIVE's).
Shots Fold 755x1000 + iPad 1180x820: 4 quest dialogs each + person dialogs with LIVE seals (Long nhan đại nộ, Thái hậu quở trách), looked 3x: tags top-left, seal top-right, no overflow, no chips. Pictures blank in tests (images blocked). Shots outside git.
Note (not this branch): person-figure dialogs still show ma ma as left figure (dialog-person's job, OD 05:24Z).
VERDICT: PASS 6aac0a54, LAND READY (FF of main d6f23858).
Re-merged 3x as main moved (final main d6f23858); full gates on 32c63abc merge, final re-merge re-ran quest-chips-scan ipadAir 56/0, dialog-stack 0 bad.
