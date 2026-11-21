# huong-cue-2-r2 report (sonnet fixer for Foreman B ROOT-5, 21/11)
PRIORITY #1 CHECK: OD 1998 (words rule) | brief main83-huong-cue-2.md + main83-mg-5s-clear.md | review/huong-cue-2-rv 06c76fff (PASS, failed to land on LIVE 8b2e344d: conflict jnwp.js + mg-noword-b.js) | claims: mg-5s-clear landed; nothing else on doi/tho.

Branch review/huong-cue-2-r2 @ 77935d60 = 06c76fff + merge origin/main 666def0c. index.html/sw.js/assets.json taken from main then rebuilt (assemble.py + build_site.sh).

## Conflict resolution (both intents kept)
| spot | mg-5s-clear (LIVE) | huong-cue-2 | result |
|---|---|---|---|
| doi judge | okT/msT («Vì sao» row), NWB.POP | verdict words | okT/msT kept + huong-cue-2 verdict words («Đối chỉnh!», «Đối được a/b nét»). mg-5s-clear did NOT remove pop words here (NWB.POP was older no-word work; BAL.mgFx.popMax=30 allows verdicts); the ✗ pop on a wrong drop stays NWB.POP.bad |
| doi labels | «Nét mẫu» / «Nét đối» + state-driven guide line (kg82Guide) | «VẾ RA» / «VẾ ĐỐI» | mg-5s-clear's labels and guide line kept; «VẾ RA/VẾ ĐỐI» DROPPED (same job, would show twice) |
| doi extras | – | «KHAY NÉT BÚT», wrong-drop tip «Chưa đối: …», hint tip «Nét sáng: hình lật gương» | kept (tip line sits under the tray, not on the pop) |
| tho | – | verdict + hint tip | kept (no clash) |
| mg-noword-b.js | GUIDE whitelist per kind | – | main's whitelist taken; test passes without new entries (all huong-cue-2 words are short guiding words) |
Truly irreconcilable clash: none.

## Tests (index.html rebuilt)
mg-noword-b ALL OK (0 FAIL); mg-noword-a ok; mg-noword-kit PASS 31 kinds; mg-allkinds 7/7; mgcal-redo 12/12; kit-guide PASS 11; quickcheck PASS (open 1770 ms, old save ok, core gates PASS); coop-e2e COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc 92/92.
Shots Fold 755x1000 + iPad 1180x820 (doi idle + hint, tho hint) looked 3x: one guide line on top, «Nét mẫu»/«Nét đối» once, «KHAY NÉT BÚT» under tray, hint tip readable, no overflow, no page errors. Shots not in git.
