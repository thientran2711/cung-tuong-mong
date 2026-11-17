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

## ROUND 2 — NOT STARTED: reviewer rollover handover (17/11 ~18:25Z)
Foreman D #10 asked for round 2 on review/day-khac-audit @ 9e7ddc144893672076b30dffc5a80056ebecac68 (= r1 319df260 + fixes + origin/main 03a776e4).
This reviewer is at 29.6 % of the window (START_CTX 3 % + 25 % = 28 % trigger) → rollover; nothing of round 2 was run. The COORDINATOR opens the successor reviewer.
Successor: write your verdict under this heading ("§ ROUND 2") and send PASS/FAIL to Foreman D #10. What to do, from my round 1 tools:
- Merge NEWEST origin/main into review/day-khac-audit-r1 (fast-forward / merge 9e7ddc14 first); generated conflicts = `git checkout --theirs index.html sw.js && bash dev/site/build_site.sh`.
- The 3 FAIL items to re-check: (1) jgift courtMeet "Đến <nơi> gặp ngài" / "Sang Đức Thọ cung thỉnh an" open on spill at chiều AND sáng with 1 khắc left (emp at tn, r2, r3, r5, vuon, tyv, cnh), closed-on-arrival places still red with reason, and EVERY other reader of accState(k).why (j41 accDis, j77 j77Card/j77Tap, jgift:230, jkitpage:142); (2) j76 dayFit has no typed 4 and time-spill-guard ALLOW no longer whitelists it; (3) j77 accAskLine/accSneakLine name the arrival buổi on spill.
- Own fresh scan (owner is tired of this rule): grep the 308 built modules (list from dev/build/assemble.py) for `BAL.time.khac-used`, `used+N<=|>`, `4-used`, `J95.KH` compares, `!can(...)?"…"`, "kịp", "buổi này", "của buổi"; then a runtime probe at chiều/1 left, tối/1 left, sáng/1 left: courtMeet("emp") for every place, courtMeet("th"), j77Tap(k) for every place (read Q[0]), and every tab rendered collecting disabled-button texts with khắc/kịp/buổi. Round 1 found the court miss only this way (the guard did not).
- Typed-4 display notes left from round 1 (not FAIL): jk3.js:96 khắc dots, j95 roster rows `[0,1,2,3]`.
- PERF: quickcheck buổiMs is noise (±25 %). Use a seeded deterministic A/B: two `D.serveRoot` servers (live worktree + branch), ipadAir, CPU ×4, `addInitScript` seeding Math.random, new life (`__forceOrigin='thd'`), 8 × click #next with a synchronous modal drain, 6 interleaved pairs; check the modal count is equal for both builds (proof it is the same life). Round 1: live 3796 / branch 3660 ms.
- coop-e2e AFTER the 03a776e4 merge, branch and live (`python3 dev/build/assemble.py && node dev/test/coop-e2e.js <out>` in each worktree); round 1 both 63/63.
- Shots: Fold + iPad, wait ~7 s for the CDN map art (at 1.8 s the map is blank on BOTH builds — not a bug). Shots to scratch only, never git/CDN.
- C-AG list: ag-all-2 was at 0ea08935 in round 1; re-check the head and the added rows jagday.js:221/278, jagent.js:186.

## § ROUND 2 — successor reviewer session_01964izEHVzU6h14EnvhUm8C (17/11 ~19:30Z)
PRIORITY #1 CHECK ('j76left|dayFit|accSpillOk|day-khắc'): OD L852, L886, L1473 + OD tail '(17/11 ~16:45Z real' | main j76.js (j76left :17, dayFit :43) | review/day-khac-audit 9e7ddc14 (round 2 target), review/day-khac-audit-r1 319df260 (r1 FAIL 3) | claims day-khac rows (D)

START_CTX ≈ 12 % of the window (estimate; tool-heavy session prompt). Read in full: START_CORE, START_WORKER, START_REVIEWER, topic/time-calendar, the brief, this file (r1 + handover), worker report § ROUND 2, OD L852/L886/L1473 + the 16:45Z tail.
Reviewed review/day-khac-audit @ 9e7ddc14 (already held origin/main 03a776e4). origin/main moved to **c114ab9e** (origin-bd + coop-b1-regress) during the review → merged into review/day-khac-audit-r1: only sw.js/index.html conflicted (theirs + build_site.sh); no time-core file touched by that merge. **review/day-khac-audit-r1 @ 46900ee2bd46fc3b15c773c1bb2231e83de3a124**, FF from live main. No code change by the reviewer.

### The 3 r1 FAIL items — re-checked
1. **Court walks on spill — FIXED (whole accState.why family).** j77 accState now returns `spill` for a walk that only spills; every reader checked: jgift courtMeet emp/th (accSpillOk → open, tap → walkGo = goTo or the spill walk), j41 accSpot/list (accSpillOk), j77Tap/j77Card ("Đi (đến nơi vào buổi sau)"), jgift:232 askWhy (dayFit), jkitpage:142 (skips spill places), accAsk → j77In (walkSpillGo when it spills). My runtime probe (below): at sáng and chiều with 1 left, "Đến <nơi> gặp ngài" is open for tn/r2/r3/r5 (+ vuon/tyv/cnh at sáng) with chip "✓ 2 khắc (sang buổi tối/trưa)"; red only when closed on arrival, with the reason (vuon/tyv "đến nơi đã sang buổi tối — đóng cửa tối", cnh "— đêm chỉ cung nhân ra vào", kn at sáng "— cung Hoàng hậu: ngoài giờ thỉnh an phải được mời"). Live shows the 9 + 18 spill-greyed court buttons; branch 0.
2. **dayFit typed 4 — FIXED.** j76.js:43 `used+n<=BAL.time.khac||j76spills(n)`; guard ALLOW holds only j76 khongkip:3 (sáng-only thỉnh an / a.b cards); guard row 13 changes BAL.time.khac at runtime and dayFit follows.
3. **Ask/sneak/lead words — FIXED.** j77When(n): "buổi này" when it fits, " (đến nơi vào <buổi>)" when it spills (j76arrive). Probe: "Lẻn vào … thành: vào được (đến nơi vào buổi tối)", "Xin bái kiến … được vào (đến nơi vào buổi trưa)"; ask result card/log say the same.

### Own fresh scan (static, 312 built modules from assemble.py)
grep `used±N <=/</>/>= 4|BAL.time.khac`, `4-used`, `BAL.time.khac-used`, `J95.KH`, `kịp`, `buổi này`: every hit classified —
- time gates: j1 can (base, wrapped by j76:52 day can), j9 walkOk/walkWhy (walk fits THIS buổi = the plain-walk test; every spill path goes through walkSpill/walkLate), j15 whyTime (wrapped j76:68–69 → day words), j72:176 (after day can()), j76 core (j76need/dayFit/j76spills/j76arrive), j77 j77WalkWhy/j77When/j77Tap:86 (last-walk card), j77:157–160 accEtqCard (spill option offered, dayFit for greet), j77:210 lead (dayFit), jclose:21 greet (dayFit), jmen:182 / jtsb:34 (spill via j76spills) — all day-based.
- labels only (not gates): j9:86, j27:69, j42/jkc/jkc2 header, jk3:96 dots, jplace:18 "Còn N khắc", j63/j79/jclose kaTimeNeeds `left` (chip = j76need).
- jmen:111 menNtCard `left>=1` for a 1-khắc ask: can only be 0 when the buổi is spent/carried = same as can(1) → true.
- j76:83 "không kịp xong trong buổi sáng" = thỉnh an Hoàng hậu / Thái hậu, sáng-only by nature (OD L852 (b)) — justified.
- J95.KH loops (j95, j95c, jagent, jgreet) = NPC record rows → C-AG (below).
Nothing left for this branch.

### Runtime probe (my own, not the guard): sáng / chiều / tối with 1 khắc left
Every tab (act, go map+list, staff, inv, rv, court, rel, fac, kid, art, story, home) rendered, every disabled button collected; courtMeet('emp') with the Emperor at EVERY place + courtMeet('th'); j77Tap(k) for every place (also through the kpm palace sub-map, __kpmGo — r2/r3/r5 open the palace sub-map first; tapping in → "Đi (đến nơi vào buổi sau)" at 1 left, "Bái kiến … rồi vào 3 khắc" at 2 left = spills); visit/see buttons of 12 consorts.
- branch: no button is greyed by a spill. Remaining time reds: tối "hết khắc trong ngày (cần N, còn 1)" (day words, correct); sáng "không kịp xong trong buổi sáng" only on the 2 thỉnh an cards (justified); "Buổi sáng/tối (đang …)" = buổi-tied cards; "chỉ họp buổi tối hạ tuần"; court "đã tối" (night). Person "Đến cung nàng thăm" open at chiều 1 left (2–3 khắc).
- live 03a776e4: 18+18 "Sang Đức Thọ cung thỉnh an" + 10 "Đến … gặp ngài" greyed by "đi 2 khắc, đến nơi đã sang buổi …", + 2 "không kịp xong trong buổi tối".
- time-spill-guard: branch **PASS** (static + 77 runtime); live **FAIL 50** — matches the worker's claim.

### Gates (9e7ddc14, then re-run on the merge 46900ee2)
- quickcheck.sh on 9e7ddc14: **PASS** · core gates PASS (one-core-guard 0 fails, rules-one-source, kit-conform, coop one-world) · time-spill guard PASS · old save from live loads + plays a buổi · perf median of 3: render 191/200, tab 297/279, buổi 921/973 ms.
- quickcheck.sh on 46900ee2: **PASS** · core gates PASS (one-core 0) · time-spill guard PASS · old save loads · render 152/155, tab 279/277, buổi 676/794 ms; my probe re-run on the merge: 0 buttons greyed by a spill
- PERF seeded deterministic A/B (my script: seeded RNG, consort life __forceOrigin='thd', iPad 1180x820, CPU ×4, 8 × nextBuoi() with a synchronous modal drain, same 543 modals both builds, 8 interleaved pairs): **median live 4546 / branch 4533 ms (−0.3 %)**. No regression.
- coop-e2e: branch 9e7ddc14 63/63, live 03a776e4 63/63; merged 46900ee2: 63/63. No co-op code touched.
- Shots (scratch only, never git/CDN; deleted): Fold 755x1000@2 + iPad 1180x820@2, buổi chiều 1 left. iPad Dư đồ list: Đức Thọ cung plain "2 khắc", Ngự hoa viên + Thái y viện grey "đến nơi đã sang buổi tối — đóng cửa tối", Cần Chính / Dưỡng Hòa / Càn Ninh with ask/sneak "3 khắc"; no overlap, nothing cut, no horizontal overflow, 0 page errors. Court card (DOM read, both sizes): "Đến Khải Tường cung gặp ngài · Cần ✓ 2 khắc (sang buổi tối) · đến Khải Tường cung vào buổi tối, gặp ngài nếu ngài còn ngự ở đó" enabled.
  FOR MAIN (not this branch, same on live): in my harness the Fold Dư đồ MAP view stayed blank after 7 s on BOTH builds (29 spots in the DOM, art 18/37 loaded), and the Fold map title "Ngọc Thanh các · 2 bóng" sits under the −/+ zoom buttons on both builds — worth a kit-layout look by the map owner.

### C-AG list (review/ag-all-2, NOT edited)
Head is now **7220585** (lines moved: jagday 221→223, 278→280; jagent 186→193). Those first-buổi loops still stop at J95.KH, but the spilled part is now checked AND painted at the next buổi by agSpill (jagday.js:370–373: same day, very next buổi only; clash with tryst/meet/not-free/bound → no spill) → r1's added rows are covered by design. Still for C-AG: drop the unbuilt dumps (all40*.js, all41–43.js, all_asm*.js) from dev/build.

### Notes (not FAIL, outside this rule)
- j77 accEtqCard spill option text still starts with the odds word "Chắc chắn" (j77:157/159/160) — belongs to the OD 17/11 ~17:00Z "no Chắc chắn" odds audit, not day-khắc.
- jk3:96 / j95 `[0,1,2,3]` row shapes and accLeadCost() typed 15 (one-core cleanup, r1/worker notes).
- quickcheck buổiMs remains noise (seeded A/B is the measure).

PASS 46900ee2bd46fc3b15c773c1bb2231e83de3a124
