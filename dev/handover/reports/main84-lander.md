# MAIN84 LANDER (B stale train) — report
PRIORITY #1 CHECK (B stale LAND READY train): OD go-live rule OD:L220/L1370 + co-op land gate 20/11 ~21:30Z | main none (not landed at start; LIVE e4fd4dcf) | review/* the five B land branches (all reviewer PASS) | claims none for re-landing.
Session: session_01Rc5AsHzig7NUCeaPzmEwPf (opus). START_CTX ~5 %. Coordinators seen: MAIN 84 → 85 → 86 → 87 → 88 (session_01Rc5AsL9RckY86bdwv8NheC).
Routine agreed with MAIN 86/88: lander sends LAND READY on its gated sha; MAIN self-merges newer LIVE (index/sw only) + go-live gate.

## Gate notes (read before re-gating)
- role-parity.test needs ~12.2–12.5 GB of the 15 GB box (scan leaks ~4 MB/render; B fix worker session_01N1tNP2WuK5mpdfoK3vLBAr). Run it ALONE; in parallel with other browser tests it dies «Target crashed» (OOM). LIVE 5a8c30af alone: ALL PASS peak 12.5 GB 661 s.
- thancan.test needs the html arg: `node dev/test/thancan.test.js index.html`.
- wear-slots.js needs `node dev/test/sw-serve.js <port> .` running.
- coop-bot-x.js exists only on coop-week-stall; full 12-week runs exit 1 on LIVE too (friend position / NPC places mismatch = pre-existing).
- Scripts used: scratchpad gates.sh / gates2.sh / rpmem.sh (quickcheck → coop-e2e + own tests in parallel → role-parity alone with peak memory).

## Per branch
1. thancan (PASS 6ed639e7) → review/main84-land-thancan 01b344c4 = + LIVE e4fd4dcf. Conflicts: index/sw only. Gates: quickcheck PASS, coop-e2e 68/68, coop-thancan L9 9/9 host-first + 9/9 swap, role-parity ALL PASS, thancan.test PASS. LANDED by MAIN 84 inside train 2 → LIVE 64d2e094.
2. coop-name-clash (91216b96) → review/main84-land-coop-name-clash a88b14f0 (= + thancan 01b344c4 + LIVE 64d2e094). Real conflict: dev/build/assemble.py module list → kept name-clash jname.js/jnamefix.js + thancan jtc.js (after jky.js). Gates: quickcheck PASS, coop-e2e 92/92, COOP_NC_FORCE 94/94 Fold host + 94/94 iPad host, role-parity ALL PASS, thancan.test PASS. LANDED a88b14f0 (FF).
3. wear-slots (23f1e651) → review/main84-land-wear-slots 31114358 = B re-merge 5b3300b6 (jbal2 both blocks kept, checked) + a88b14f0 + LIVE 32c0e33b + 56ff0db0. Conflicts index/sw only. Gates on 31114358: quickcheck PASS, coop-e2e 92/92, wear-slots-coop host-first + swap PASS, wear-slots.js Fold+iPad PASS, role-parity ALL PASS alone (12.3 GB). LAND READY → MAIN 87, relayed to MAIN 88 (in its chain).
4. coop-week-stall (ccd41e45) → review/main84-land-coop-week-stall abcd23bf = + 31114358. Conflicts index/sw only. Gates: quickcheck PASS (buổi 1664/1092 one run, under load), coop-e2e 92/92, coop-thin-e-net L6 20/20 ×2 seats, role-parity ALL PASS alone (12.2 GB). coop-bot-x THIN=9 12 wk: branch 12/12 in 3/5 (stuck wk6 once alone: both «Chờ hảo hữu…», err snapresync/seatresync, A open «Theo ma ma» kmtake; wk1 once under load); LIVE 6e07f837 12/12 in 2/4 (stuck wk0 ×2 under load). → not worse. LAND READY → MAIN 88. Residual for B: the wk6 stall.
5. coop-guest-agent (a00be4e5) → review/main84-land-coop-guest-agent f7e54803 = + abcd23bf. Conflicts index/sw only. Gates: running (quickcheck, coop-e2e, coop-guest-agent.js, coop-thin-e L9 both seats, role-parity alone).
Added by MAIN 86/88 (same routine, after 5): MG11 34353783 (assemble.py + index/sw vs LIVE 6e07f837) → perf-ci 524443c5 (index only) → ge-npc 9f031dcd (index/sw) → kc-fail-effects a1498983 (assemble.py + jinv.js REAL + index/sw).
