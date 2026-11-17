PRIORITY #1 CHECK ('khắc còn lại|day-khắc|time-spill|j76left'): OD 3 (L852, L886, L1473) + OD tail '(17/11 ~16:45Z real' | main time-spill j76 (j76left j76.js:17) | review/day-khac-audit (this), review/ag-all-2 (C-AG, not yours) | claims DAY-KHẮC AUDIT row (D, worker session_01964izGNNjem7GHhQv3q6B5)

# REVIEW day-khac-audit r1 — reviewer session_01964izE2ap49KwCk9DAQtjP

START_CTX ≈ 3 % of the window (estimate; get_session read 0). Read in full: START_CORE, START_WORKER, START_REVIEWER, topic/time-calendar, topic/wording;
OD L852, L886, L1473 and the OD tail "(17/11 ~16:45Z real, s34 chat) OWNER RESTATES the day-khắc rule" verbatim.
Reviewed review/day-khac-audit @ 4408ef0a91ccb7776b3e83a78c7c5e0b4719b641, merged onto NEWEST origin/main e9bbc4d6 → **review/day-khac-audit-r1 @ 319df260a8f25be23c8abb9bcbef42c028e38319**
(only index.html / sw.js conflicted, site rebuilt; FF from live main). No code change by the reviewer.

## What is right
- j76left(b,u) is a clean generalisation of the one day function; j76need / whyTime at buổi tối now say "hết khắc trong ngày"; jrest, jtut, j9 header, j72/jthaiy/jgift reasons, jkc2 / j95c one-core fixes are correct.
- Dư đồ map + list: open places whose walk spills are plain (Đức Thọ cung, Cảnh Phúc, Khải Tường, Hàm An at chiều 1 left); places closed on arrival (Ngự hoa viên, Thái y viện, Dãy nhà cung nhân at tối) stay grey with the reason in words. Tap → kit card "Đi (đến nơi vào buổi sau)". Seen in my own shots (below) and in my runtime probe.
- Behaviour (my probe, seeded): her 2-khắc act at chiều with 1 left = allowed, "✓ 2 khắc (sang buổi tối)", spills; at tối with 1 left = "✗ hết khắc trong ngày (cần 2, còn 1)" on every tab (act, staff, inv, court). Thỉnh an (sáng-only) at sáng 1 left = "không kịp xong trong buổi sáng" — tied to its buổi by nature (OD L852 (b)), OK.
- time-spill-guard: branch PASS (static + 52 runtime); live main FAIL (9 runtime: dudo/list tn r2 r3 r5 + rest card; + 2 static) — claim confirmed.

## FAIL items (worker r2)
1. **Court panel walks still greyed by a spill (missed family member).** jgift.js:159–164 `courtMeet`: "Đến <nơi> gặp ngài" (Hoàng thượng card) and "Sang Đức Thọ cung thỉnh an" (Thái hậu card) take `st.why` from j77 accState, which is non-empty for a walk that only SPILLS (`walk:1`), so the button is DISABLED with the spill sentence as its reason. Probe, 1 khắc left:
   - chiều: emp at tn / r2 / r3 / r5 → disabled "đi 2 khắc, đến nơi đã sang buổi tối"; "Sang Đức Thọ cung thỉnh an" → disabled, same words.
   - sáng: also vuon / tyv / cnh → disabled "đi 2 khắc, đến nơi đã sang buổi trưa" although walkSpill(k).ok = true.
   The worker table lists jgift:160–166 as "rewritten by the j76 pbtn wrapper" — that covers only the "hết khắc" strings, not `st.why`. Fix the WHOLE family: every reader of accState(k).why must treat `st.walk && walkSpill(k).ok` as open (the same test as accSpillOk), click goes through goTo (j76 spill travel). If the Thái hậu walk is meant as thỉnh an (sáng-only), say THAT in words instead of a spill sentence. Scan all accState / walkWhy / j77WalkWhy readers; add a guard row (courtMeet emp/th at chiều + sáng 1 left).
2. **One core in the core itself:** j76.js:43 `dayFit(n){…used+n<=4||j76spills(n)}` — a typed 4 in the one "is there time" gate (time-spill-guard ALLOW still whitelists j76 used4). Use BAL.time.khac (as can() does) and drop the ALLOW entry. Brief: "no typed 4/khắc counts".
3. **Wording of the spill acts (VANPHONG, true words):** j77.js:42 accAskLine "thành: được vào buổi này" and j77.js:48 accSneakLine "thành: vào được buổi này" — at 1 khắc left these cost 3 khắc and arrive the NEXT buổi (probe: Đông cung / Càn Ninh "Xin bái kiến · tốn: 3 khắc · thành: được vào buổi này"). Say the arrival buổi (j76arrive) when it spills.

Notes (not FAIL): guard check 9 "NPC parity" only compares j76left with itself (no NPC code on main to test — fine, but it proves nothing; the real NPC check belongs in C-AG's tests). jk3.js:96 khắc dots `[0,1,2,3]` and j95 roster rows `[0,1,2,3]` are typed 4s (display / roster shape, not time-left gates) → one-core cleanup later.

## C-AG list (review/ag-all-2 — NOT edited)
Worker list made on 41b98bf; the branch is now at **0ea08935**; I re-checked on 0ea0893 (line numbers unchanged). Rows 354–355, 268, 292/301–304, 339, knWin 49–51 confirmed. Missing — add:
- jagday.js:221 and :278 — the "slots free?" loops stop at `Math.min(kh+kc, J95.KH)`: the spilled khắc in the next buổi are never checked for a clash (tryst/meet/bound) → check the next buổi's row for the p.sp part.
- jagent.js:186 — the record paint `q<=agK1(p)&&q<J95.KH` clips the deed to this buổi; the spilled part must be painted in the next buổi's row (same clock as agSpill / j76carry).
Also (housekeeping, FOR C-AG): ag-all-2 carries unbuilt dumps dev/build/all40.js, all40no.js, all41–43.js, all_asm*.js holding old `used+c<=4` code — not built, but they pollute every grep of the family.

## Gates on 319df260
- quickcheck.sh: **PASS** (core gates PASS = one-core-guard 0, rules-one-source, kit-conform, coop one-world; time-spill guard PASS; old save from live loads and plays a buổi; open 1832 ms).
- PERF (brief item 3): interleaved runs, same machine:
  - quickcheck.js patched with a seeded Math.random, 6 pairs live/branch: buổi live [718, 940, 782, 892, 1382, 1132] vs branch [1566, 1064, 1027, 1054, 1255, 1389] → median 916 / 1160 (+27 %); render 185/185, tab 328/322.
  - the plain quickcheck.sh run (3 pairs): buổi 1113 live / 860 branch (−23 %).
  - deterministic A/B (seeded life, same 8 buổi, same modal count both builds, CPU ×4, 6 pairs): buổi-path CPU median **live 3796 ms / branch 3660 ms (−4 %)**; Dư đồ render 205 / 219 ms (noisy, 184–241).
  → no real buổi regression; the quickcheck buổi metric swings ±25 % with no code change. **FOR MAIN:** quickcheck buổiMs is driven by an unseeded life + fixed sleeps per modal (300/200/40 ms), so it measures how many event cards the random life draws, not code speed; other D reviews' +12 %/+34 % are likely the same noise. Seed the life (and count modals) in quickcheck.js before using buổiMs against +5 %.
- coop-e2e: branch 63/63 ok, live 63/63 ok → no worse.
- Shots (scratch only, not committed, not uploaded; deleted): Fold 755x1000@2 + iPad 1180x820@2, buổi chiều 1 left, map art loaded from CDN (7 s wait; at 1.8 s the art is still blank on both builds). Looked at: map labels readable, no overlap with the side cards, no horizontal overflow, 0 page errors; list view: Đức Thọ cung plain, Ngự hoa viên / Thái y viện grey with "đến nơi đã sang buổi tối — đóng cửa tối"; header line in day words.

FAIL 3 @319df260a8f25be23c8abb9bcbef42c028e38319 + list: (1) court panel walks greyed on spill (jgift courtMeet, whole accState.why reader family + guard row); (2) dayFit typed 4 (j76.js:43); (3) ask/sneak "vào buổi này" while it spills (j77.js:42/48). C-AG list: add jagday.js:221/278, jagent.js:186.
