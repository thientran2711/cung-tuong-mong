# Brief — REVIEW fix-hadoc-loop (Foreman D child; opus BIG — schemes / khắc time cost)
PRIORITY #1 CHECK ('Hạ độc|ha_doc|hadoc'): OD 4 | ledger 0 | claims worker Cj26a6VP | main 15 | review/* review/fix-hadoc-loop
Read handover branch dev/rules/START_CORE.md (THE 18 LAWS) + START_WORKER.md + START_REVIEWER.md; brief briefs/D-softlock-hadoc.md (item 2); report dev/handover/reports/fix-hadoc-loop.md.
Target review/fix-hadoc-loop 5ecfce53b3ce6aff5d15f417afc2e256a8ca9800 (merged LIVE 72521d62). Push fixes/merges only to review/fix-hadoc-loop-rv.
Robot repro (LIVE): nc / nc_su / bot speed, seed 1086252990; buổi sáng tháng 3 năm 1: Mưu kế → «Bày mưu» on a rival → «Ra tay ngay: hạ độc» → dilemma «Hạ độc» → «Làm như thường» → loops with no khắc spent.
Root cause per worker: two doAct interceptors ping-pong (j70 «Bày mưu» and jtamco road card «Hạ độc»), each skipping only on its own one-call flag. Fix: j70Wants(v,k) reads the road she picked (ECON_HER); order Bày mưu → Ra tay ngay → road card → act.
Check:
1. Reproduce the loop on LIVE and confirm gone on the branch; every choice of the road card and of Bày mưu still works once and spends its khắc (law 3: time is the cost), no act runs twice, no act lost.
2. Whole family (law 11): worker scanned act interceptors only (3; jact picker safe). Judge whether events/dilemmas that can re-fire in the same buổi past their own cooldown are the same family — run a quick scan; if you find a real re-fire loop, FAIL with the list (do not grow the branch yourself).
3. Law 1 two-way: NPC schemes using the same road cards unaffected (poison-road, econ-tamco, econ-tamco-scan).
4. Gates: hadoc-loop.js, poison-road, econ-tamco*, quickcheck, one-core-guard, old save load. Pre-existing on LIVE (confirm): night-steal-oldsave.js stale, schemewire.js crash.
5. Final-merge newest LIVE (now 948c80a5) before verdict.
Verdict in the report: 'REVIEW PASS — LAND READY review/fix-hadoc-loop-rv <full sha>' or FAIL list to worker Cj26a6VP (session_01964izCj26a6VP5u2Sr3qT5); send_message Foreman D session_01964izGQbgvTAnQ9pJktncj.
Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
