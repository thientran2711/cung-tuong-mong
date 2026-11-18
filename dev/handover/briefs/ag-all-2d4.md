PRIORITY #1 CHECK ('tin báo timing informer walk'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 (topic hits by hand: OD L1668 (3) TIN BÁO timing; OD ~17:10Z bạc only on success; review/ag-all-2 tip b13b9316 = 2f3 DONE on 2d3 f57e23a2; claims C-AG AG-ALL-2)
# AG-ALL-2 2d4 — ASSEMBLER (opus), successor of 2d3 session_01UV1SzgjE6WMgMZkj9XHTzF
Read: dev/rules/START_CORE.md + START_WORKER.md in full (handover branch claude/cung-tuong-mong-handover-hj0h8w); dev/handover/reports/ag-all.md §24 (2d3 handover, in full) + §21.9 (2f3) + §23.2 (calibration); dev/OWNER_DECISIONS.md L1668 verbatim.
Branch: review/ag-all-2, tip b13b9316 (2f3 is built on 2d3's f57e23a2 → no merge needed; verify). Foreman: C-AG #4 session_01UV1SzkyZBYRFoSWBF8fg27. Disk: sparse worktree under /home/user/wt (2d3's /home/user/wt/ag2 + ag2base may be reused), fetch --depth=30 under flock /home/user/wt/fetch.lock.
DO (in order):
1. TIN BÁO TIMING (owner OD L1668 (3), verbatim: "theo đường đi thật, gần thì khắc 2, xa thì khắc 3 trở đi" → option 1): a TIN BÁO reaches her only after the informer's REAL Dư đồ walk from where they saw it to her (near → next khắc, far → k+2 or later). Use the existing path/walk-time function of Dư đồ (j76/jagday walk rows; grep, reuse — no second distance table) and the per-khắc chain (agTell/agRdDeliver). Ended-item carry (knCarryIn) obeys the same walk. Test: near vs far informer table, one row per khắc.
2. Re-scan 2f3's new roll sites → agTry/agSoft (grep 'roll(' in jag*/jkh/jworld/jact not via agTry/agCap/agOdd); tmAsk → agTry.
3. BẠC ONLY ON SUCCESS whole family (owner ~17:10Z): j70 'Mua người trong cung nàng' takes bạc before the answer → same rule as Mua chuộc / Cài tai mắt (her + NPC). Scan every pay-then-roll act; table before/after.
4. Root-cause the Empress 'Ban thưởng' / F5 flake (4/9 on branch vs 0/3 on base); fix at the root, not the test.
5. python3 dev/build/assemble.py; long suite: every ag-* + agent_check + ag-all-b + ag-all-c + ag-mgcal + sh dev/test/mgcal-apply.test.sh + one-core bind/text/guard; any red → compare against a base build (previous tip); bash dev/site/build_site.sh; bash dev/tools/quickcheck.sh --cpu 4; check ?hieuchuan=1 opens the calibration row.
6. Report §25 in reports/ag-all.md (handover branch), then send_message C-AG #4: 'SẴN SÀNG KIỂM <sha>'.
NOT yours: THÀNH/BẠI card showing ACT costs = kit part → write a KIT REQUEST line in dev/kit/KIT_REQUESTS.md only. NPC o:100 sure acts wait for Foreman D's game-wide rule.
Laws: KIT FIRST, ONE CORE (every number from BAL), fix the whole group, VANPHONG wording, no push to main, no PR.
Roll over at START_CTX + 25 % (ceiling 60 %): handover in report §25, tell C-AG #4 (the foreman opens the successor).
