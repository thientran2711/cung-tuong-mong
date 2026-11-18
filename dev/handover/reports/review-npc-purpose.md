# REVIEW — NPC-PURPOSE (BIG reviewer, PHASE A code review)
PRIORITY #1 CHECK: OD 0 new (owner ruling 18/11 ~04:08Z) | ledger 0 | claims 8 | main 0 | review/* 3 (npc-purpose + -g2 + -g3, all merged into review/npc-purpose) | archive 0. Reused: jagwhy helper, npc-purpose-scan, quickcheck perf gate; reviewer bot is scratch only (not in git).
Handover line: START_CTX ≈ 5 % of the window (own estimate). Reviewer session_01UV1SziEkemejE3R3kypQJT. Foreman C-AG #10, integrator G1 #4.
Subject: review/npc-purpose @b723a1e. Base for every diff/measure = review/ag-all-2-land 47568e9 + live main 9bbd78b merged locally (3b5f5d1c, generated files rebuilt), i.e. the same tree minus npc-purpose.

## VERDICT PHASE A: FAIL (9 blocking items below). Infrastructure is good (one helper, BAL one-core, scan, perf, old save); the fault family is RATES: many kinds are dead or 3-10x off because of score scales, cooldown placement and per-actor cooldowns. The owner's rule says events need a reason; it does not say they may vanish.

## Gates run (b723a1e)
| check | result |
|---|---|
| npc-purpose-scan --strict (412 rows) | PASS (G1 done 108/out 8 · G2 done 182/live-off 17/out 1 · G2-last done 7/out 3 · G3 done 43/live-off 14/out 29) |
| one-core-guard | PASS |
| (2) one helper | PASS with notes: no 2nd chooser; S.npw the only cooldown store. Notes: jagknow knSellCands calls npwCdOk directly (drop it); g2aW/g2bB/g2dW tiny BAL accessors duplicate npwB (fold). |
| (3) G2 one-core-guard path fix | CORRECT. Injected tests: same-path dup `Object.assign(BAL.ag.why.cd,{apFriend})` ×2 → caught by new AND old guard. Old guard on head = 18 fails, all false (cd.X vs why.X, verified lines 1292-1295/1374-1375). It hides nothing the old one caught. Pre-existing gaps (both guards miss): a key inside a nested literal (`BAL.ag.why={cd:{k}}` + `Object.assign(BAL.ag.why.cd,{k})`) and a deep direct set (`BAL.ag.why.story.wait.suitor=` twice). NOTE, not blocking; worth closing since npwCdN reads cd.<kind> before <kind>.cd (a kind with both = one value silently ignored). |
| (5) old save | PASS (quickcheck old-save step: live build → sổ 3 → new build loads + plays, 0 errors). S.npw / at_* / dilW / callW / bullyBy all lazy. |
| (7) perf, quickcheck --runs 5, same box, base vs head | render 207/203 ms (+2 %), tab 378/367 (+3 %), buổi 1116/1151 (−3 %), long tasks 15/16 → PASS (< +10 %) |
| (6) 200-tuần bot, 5 seeds × 200 tuần each build (buổi by buổi via nextBuoi, cards closed by seeded random pick) | 0 page errors either build; totals: cards 2685 → 2733, log lines 14091 → 15675 (+11 %). Kinds off by > 3x: table below |

### (6) Before/after (5 × 200 tuần, base → head; names stripped from log keys)
| event (source) | base | head | |
|---|---|---|---|
| "X ghé chơi" drop-in visit (jshelf g3call) | 52 | 4 | NPW g3call fire 0 / 17977 asks — DEAD |
| "Chủ thưởng" card / "quở mắng" (j42 srvMoodEvent) | 11 / 15 | 1 / 0 | ~10x rarer |
| "Bạc lạ" bribe card (j42 srvBribeOffer) | 3 | 35 | ~10x more |
| "môi tím tái" poisoning sign (jface/j7) | 21 | 2 | ~10x rarer |
| "Lập công" (j68/j71/jdh2) | 7 | 55 | ~8x more |
| NPC mood lines "đắc ý / ưu uất / khóc suốt / vui vẻ / sang cung / khoe khoang" (jemo/jemoact/j95 mood) | 61/40/22/23/43/28 | 233/126/96/99/168/89 | 3-4x more (log spam risk) |
| "gửi thư" letters home / "bị cấm túc" | 15 / 7 | 56 / 28 | ~4x more |
| festival-night lines (Nguyên tiêu / Thất tịch / Trung thu) | 158 | 96 | −40 % |
Kinds that never or almost never fired on head (fire/asks over 1000 tuần): g3call 0/17977, affair 0/343, menGrudge 0/278, j70Guard 0/141, cmTt 0/31, q72Collect 0/25, ktFav 0/3, srvWatch 2/55, f7Gamble 2/6.

## FAIL list (integrator G1 #4; fix each as a FAMILY, then re-run the rate table)
1. **jshelf.js:268 g3call dead**: s = agNeedsC(v).ally (0..1) vs g3.call.min 25 and why.min 20. Scale need ×100 (and set min on that scale). Same scale check for every kind built on agNeeds.
2. **Score dead zones (family)**: jagwhy1.js:22 tryst s = 30+rove−fear = 18 < min 20 for any Kín đáo pair who does not rove → never meet; jagwhy1.js:26 seek s = 15+(sắc−60) < 20 when sắc < 65 → admirer never comes; affair 0/343 (s needs Sủng ≈ < 10 with normal Đức). Base s on real longing (m.tinh, loneliness) and make sure the normal case clears BAL.ag.why.min. Audit ALL kinds: add a test that every registered kind fires at least once in an N-tuần rigged/bot run or carries a written reason it is rare.
3. **j4.js:65 + jagwhy1.js:176 story clock never resets**: st["at_"+key] set once; after the wait the step fires every month (e.g. "dad" burns the archive monthly, ~8x the old 12 %/tháng). Reset the clock on fire.
4. **npcTell without knowledge (family)**: j4.js:39 (cn letters: any rival with hostility ≥ 40 "knows" → story ends at once), j8.js:473 raid, j92.js:393 lost gift, j75.js:154/178 ("Tai mắt kể" from an unnamed consort). `from` must be people who really hold the fact (witness / evidence holder / knower chain), plus a cd; name the teller. Also npcTell to S.thO / S.emp (jshelf ~330, jvisit:108, jroute:262): aff(w,{}) = 0 so the "thân với" path is dead — use w.th / favour for the Thái hậu.
5. **jagacts3.js:304 p3MaidMonth impossible**: needs p3Tryst(v) from agRec() which is null in the monthly tick (S.turn++ already done) and holds one buổi only. Record who saw the tryst when it is applied (j95secApply) and read that. Remove unread BAL.ag.par3.cnv.aff.see.
6. **Per-actor cooldown on many-target events (family)**: jpet petHh (one Hoàng hậu, cd 12 tuần, was 2.5 %/consort/month → ≥10x rarer), pkTrac cd 6 next; j4 thd provoke shares meHarm cd with the weekly cards. Key per target or cd 0 with the old success odds.
7. **Cooldown stamped before the opportunity/success roll + tuần vs month units (family)**: jkc.js:281 kcVh (12-tuần cd stamped on a failed roll(4): ~77 %/yr → ~11 %), kcMeet; monthly callers with cd 4/6/8/12 tuần (svSteal/svSpy/svTalk/svMarket/svLeave, cmSpy/cmLeak/cmConf/cmTh, illSeek, petMan, rcpTh/rcpGift/rcpGos, thyBribe, fxSrvHarm/fxRivSrv, cyForge, dhTake/loTake, emoKid); menGrudge cd 3 should be 9 (old = every 3 months); famGift cdOf 0 on a weekly monopoly() → gift every tuần (give cd ≈ 4). Roll the chance first, stamp only on a real deed; monthly kinds use multiples of 3.
8. **Distribution shifts measured above**: j42 srvCard (mood/order now ~10x rarer, bribe ~10x more — the rival's grudge always outscores the mistress's mood), jface poisoning ~10x rarer, Lập công ~8x more, NPC mood/letter/confinement lines 3-4x more. Fix or justify each in the report with the old rate vs new rate.
9. **Out rows rejected**: j51:71 roll(wait?5:15) is a bare "whether" with typed numbers → npcWhy with state score + BAL; j95:226 marked done but the bare j95dice(25) "whether" roll for the thái y remains (gate by need / BAL). j51:63 conditional: PARKING_LOT #7 exists, but KV.deb is a local constant (move to BAL).

## SHOULD-FIX (same pass)
- jagday.js:151 agReplanB: R.touch 40 (percent) added to a 0..1 need → touched NPCs always re-plan; R.need now unused. jagday:118: 2nd goal almost always when needs are close (measure plan length).
- jmind.js:175 slip returns one option; j70.js:159 / j40.js:50 filters then get an empty list (plot skipped ~12 % of times). Keep the near-best list.
- j95.js:155 j95moodF: every non-"vui" feeling counts as sad (sign map in BAL). j96.js:113: S.emp as best watcher nulls v — put S.emp in `not`. jroute.js:107 rtFinder uses S.place (player usually home) → interception near impossible; use the road/gate spot.
- jmen.js:99 letter: npcWhy stamps 12 tuần even when no bribable guard exists — check the guard first. j22.js:25 flirt witness pool includes S.emp (pass pool: liveRivals(true)). jagwhy1.js:83 svSell compares the servant's score not the rival's motive. j7.js:23 poisongift victim = fixed "likes the player most" sort, not the plotter's goal. j21.js:79 callMe text always friendly even for apTaunt (print cm.why). npwPick can return null in jmen:31 likeV (all effSac 0) → swallowed throw.
- jlost loMonth: loCauseOf charges the thief before checking the owner has an item. jdh2 lostTick: `break` moved out of the success branch (only the first item ever at risk). jkc.js:170 kcHab / jkc2: near-best filter wipes minor habits (place cards die).
- One-core: typed numbers — jmen.js:57 (60/30/40/1), jmen.js:263 (100/60/20), jagwhy1.js:192, jagwhy1:23 (25/50), jagwhy1:91, j71:150, jagwhyg2a srvCard/srvBuy (25/40/60), g2bAmb regex (reuse ambT), jagwhyg2 loTake, j51:66 (30/10/85), jkc:369 roll(40). Unread keys to remove: BAL.ag.day.two, BAL.shelf.visit.dayP, BAL.route.bmRoll, BAL.visit.tea.p, BAL.lux.npcCalm/npcCalmProud, LO.rivP/srvP/keepP (keepWear: keep as loWear success roll or remove), BAL.ag.par3.cnv.aff.see.
- VANPHONG: j24 gift line keeps "xét nghiệm" (banned modern word, hunk rewritten); j22:45 "lại sẵn lòng oán nàng" → "vốn mang oán với nàng". Stale comments: jgift:232 (BAL.empDay.p), jagday:22/141, jagacts3:292.
- Missed rows (add to rows json): j75.js:188 roll(30) Empress admonition (agDOn off only), j22.js:21 roll(30)/roll(50) guard-letter fallout, j95.js:148-149/170/209 (plot spot/khắc, intent slot random).
- Tests: g1..g1g / npc-why test identity and reasons but no rates. Add a rate gate (every kind fires, and per-kind old-vs-new rate within a stated band, from a seeded bot run) so items 1-8 cannot come back.

## NOTES
- BAL.ag.why.on = 0 is a kill switch (callers go quiet), not a rollback to the old path; fine if documented.
- Cooldowns are per actor: with N motivated consorts a kind runs N/cd times; comments claiming "≈ old rate" only hold for one actor — the rate gate covers it.
- Accepted out rows: G1 all 8; G2 all 4 (j54:124 envoy key could move out of BAL.ag.why); G3 26 of 29 (see item 9).
- Reviewer bot (scratch, not committed): evbot.js = nextBuoi loop, seeded Math.random, counts card titles, log heads, NPW.stat.

## NEXT
Integrator fixes 1-9 (+ should-fix), re-runs the 5×200-tuần rate table vs base and puts it in §INTEGRATION; then sends the new head. PHASE B (after C-AG "LIVE <sha>"): full re-gate as briefed.

## PHASE A RE-CHECK on 421465a1 (G1 #5; base = review/ag-all-2-land 7301df77) — FAIL (narrow: rate family, untracked events)
Reviewer re-ran everything itself on the same box: npc-purpose-scan --strict PASS (419 rows); quickcheck --runs 5 paired vs 7301df77: render 255/233 ms (+9 %, close to the line), tab 514/491 (+5 %), buổi 1258/1683 (−25 %), old save ok → PASS; 12 seeds × 200 tuần bot (same evbot.js) base vs head, 0 page errors.
Fixed and verified in code: 1 g3call (×call.k scale; "ghé chơi" no longer off band), 2 tryst base 35 (Kín đáo pair clears min) / seek, 3 story clock reset via the new `on` hook, 4 npcTell knowers (npwIn/npwMat, cn3 from [mo] only, npwRegard for Emperor/Thái hậu), 5 p3MaidSaw, 6 petHh cd 0, 7 npcWhy(kind,ctx,done) = roll before stamp (kcVh) + menGrudge cd 9, 8 srvCard (per-actor cd, no longer off band), 9 heirName / tyCall converted, KV.deb → BAL.ag.why.g3.deb. Helper additions (npwOnFire, lim, done, npwRegard/npwIn/npwMat) are inside jagwhy = still ONE helper. Rare-kind list with reasons (rates json) accepted (affair, menGrudge, j70Guard, q72Collect, ktFav …).
STILL FAILING (criterion 6, ≥ ~10x, base+head ≥ 8, 12 seeds — none of these is in the gate's hand-picked `track` list):
| event (source) | base | head |
|---|---|---|
| card "Tin đồn" (j68 FAM6 rumor family) | 16 | 0 |
| card "Tìm thấy đồ thất lạc" (jlost:86 found again) | 11 | 0 |
| log "Cung Chính ti soát …" (jlost:112-116 search) | 14 | 0 |
| card "Đồ thất lạc" (jlost losses) | 67 | 172 (2.5x, with no find/search after it) |
| log "… Hoàng hậu nhờ …" (j71) | 21 | 0 |
| log "… oán chưa dứt …" (jmem/jpcf) | 16 | 0 |
| card "Nhận lỗi" (j92) | 1 | 20 |
| card "Long thể bất an" (jworld2 crisis 'benh' / j13) | 0 | 13 |
| log "… giận …" NPC anger lines | 7 | 61 |
FIX: (R1) explain or fix each row above (the lost-item chain looks broken: losses 2.5x, finds and searches 0). (R2) the rate gate must judge EVERY card title and every name-stripped log head with base+head ≥ minN (as cmp.js does), not only a hand-picked track list; rows outside the band need a written reason in the rates json like `rare`. Then send the new head; PHASE B follows on live 55db864a.

## HANDOVER (BIG reviewer session_01UV1SziEkemejE3R3kypQJT → successor; 18/11 ~14:40Z)
Context 34 % (START_CTX ≈ 5 % + 25 % reached) → roll over; the coordinator C-AG #13 (session_01UV1Szgvw457GueTtE27whc) opens the successor.
State: PHASE A FAIL on b723a1e (9 blocking) → all 9 verified fixed on 421465a1 → re-check FAIL (narrow, untracked ~10x shifts, table above). Since then G1 #6 found my evbot NOT deterministic (j52 nlSeed / j67 rnd67 use crypto.getRandomValues; load timers eat Math.random draws) — my rate tables carry noise. G1 #6 built dev/test/npc-purpose-rates.js (seeds crypto, fixes Date.now/performance.now, reseeds before the first life; judges EVERY card title + name-stripped log head). Integrator now G1 #7 session_01UV1Szm5ZanhFs7Ye4GwSCZ; it sends SẴN SÀNG KIỂM <sha>.
Who: foreman C-AG #13 session_01UV1Szgvw457GueTtE27whc; MAIN ROOT-52 session_01UV1SzhR4VChxDLw6hymSvQ. PASS/FAIL → both. Live main last told: 55db864a (check origin/main).
Successor to-do on G1 #7's head: (1) base = review/ag-all-2-land (or live main if ag-all-2 is LIVE) = the tree minus npc-purpose; (2) run npc-purpose-rates.js on base AND head yourself, twice (rerun must give 0 diffs), and check the rows of the re-check table (jlost found/ti soát/losses, j68 Tin đồn, j71 Hoàng hậu nhờ, jmem/jpcf oán chưa dứt, j92 Nhận lỗi, jworld2 Long thể bất an, NPC giận) are in band or carry a written reason; (3) spot-check that the gate really judges every key (not a track list); (4) quickcheck --runs 5 paired vs base (render was +9 %, watch it; FAIL > +10 %); (5) then PHASE B as briefed (scan --strict, npc-why + g1..g1g, quickcheck ×2, coop-e2e ×3 under 2 busy loops, G4, ag suites, long suite, old save, perf vs live) → "PASS <sha>" (FF-able onto live main) or FAIL list.
Reviewer worktrees (this container only): /home/user/wt/rnp-head, rnp-base, rnp-ho (handover). Scratch bot: evbot.js/cmp.js (text in the G1 #4 message; superseded by npc-purpose-rates.js).

## RE-CHECK 2 on caa2902a (G1 #6 head; no "SẴN SÀNG KIỂM" from G1 #7 seen yet; successor reviewer session_01964izEUgw5hZTBxuEguL4K, 18/11 ~15:20Z) — FAIL (narrow)
Base = review/ag-all-2-land 7301df77 (= the merge base inside caa2902a, i.e. the tree minus npc-purpose). ag-all-2-land is now 45c6dbea (ag2-perf merged) and is NOT in caa2902a, so the next head must merge it and the base becomes 45c6dbea.
Green on caa2902a: npc-purpose-scan --strict PASS (419 rows), one-core-guard PASS, npc-why + npc-purpose-logic + g1..g1g all PASS (97 checks), rates check 1 (all 165 kinds fire or are rare with a reason), 0 page errors.
Determinism (reviewer's to-do (2)): HEAD is deterministic: 2 runs of 12 seeds × 200 tuần give 0 differing keys. BASE 7301df77 is NOT: 3 base runs (one of them alone on the box) differ in 508-916 keys (abs 1043-2151 counts; lives per seed change). So the committed `baseAll` is one noisy sample. Every row below was checked against all 3 base samples; the base spread is ±4, so these shifts are real, not noise.
Gate result on caa2902a: **FAIL, run with --base AND with the committed base** (so G1 #6 left its own gate red):
| row | base (3 samples) | head | note |
|---|---|---|---|
| track 'khoe khoang' (jemoact) | 84 | 256 | 3.26x, band 0.4–2.5 |
| c:Tin đồn (j68 rumor family) | 30/26/29 | 5 | re-check row R1 still ~6x low (the e68Pick pickAll fix was not enough) |
| l:"Ân oán chưa dứt · Bí mật nắm được" (jmem HK_KIND secret) | 26/24/20 | 0 | re-check row 'oán chưa dứt' still 0 |
| c:Kẻ hầu ăn bớt (jeitem:88) | 25/22/24 | 2 | ~12x low |
| c:Đại phóng cung nhân (jworld2 crisis) | 20/20/20 | 3 | ~7x low |
| l:Thái hậu "cười khẽ" (j92 wd:under) | 40/41/36 | 9 | wardrobe remarks family: wdRemark pickAll moved remarks from the Thái hậu to consorts ... |
| l:"<X> nhìn <outfit> của …" (j92 wd:over, keys thủy của / xanh ngọc của / thêu hoa nhỏ của / thêu hải đường của …) | ~25 | ~160 (all 'nhìn…của' heads 261 → 522) | ... ~5x more consort remarks |
| l:"cho người soát phòng trước" + l:soát (j92:332 wdSearch) | 13 | 64 | ~5x more searches |
| l:"được Hoàng thượng ban Lư pháp lam bốn chân" (jshelf:122 gift) | 11/10/12 | 0 | Emperor gift line gone |
| l:"vì oán" (jface:145 slap) | 0 | 36 | REWORD, not a shift: all slap lines 185 → 191; add a json why (like the visit/gift rewords) |
Rows from the 1st re-check that are now IN band: lost chain (Đồ thất lạc 73-77 → 74, Tìm thấy 14-15 → 9, Cung Chính ti soát back), Nhận lỗi 4-5 → 7, NPC giận 37-39 → 48, Long thể bất an 4-6 → 0 (below minN). j71 'Hoàng hậu nhờ' not seen as a head with ≥ 8 either side.
Gate spot-check (to-do (3)): yes, check 4 judges every card title and every name-stripped log head with base+head ≥ 8 (700 rows), not a track list. Two blind spots, NOTE only: (a) 89-92 "one-seed" rows (≥ 60 % of the larger side from one life) are skipped. Fine for noise, but a row that one seed carries in base and is 0 in head is never judged. Suggest judging a one-seed row when the other side is 0 and the big side ≥ 2 × zeroN. (b) With a non-deterministic base, `--write-base` freezes a random sample; the base should be the sum/median of ≥ 2 base runs, or find the base-only randomness (head is clean, so head carries a fix the base lacks, or base has a timer/`new Date()` path).
Minor code NOTE: jlost loCauseOf picks cause "mis" by matching the text `o.why==="cất nhầm chỗ"` because npwAsk drops `mis:1`; pass a flag through npwAsk instead (text edits would silently turn misplacing into theft).
FIX for G1 #7: R1 the 9 shifted rows above (Tin đồn, Ân oán chưa dứt, Kẻ hầu ăn bớt, Đại phóng cung nhân, the wardrobe remark/search family = wdRemark pickAll balance, Lư pháp lam gift) fixed or given a written why with old vs new rate; 'vì oán' gets a reword why; 'khoe khoang' in band or explained. R2 merge ag-all-2-land 45c6dbea; re-write the base from ≥ 2 base runs (or make base deterministic). Then send "SẴN SÀNG KIỂM <sha>"; the reviewer re-runs rates ×2 + quickcheck ×5 + PHASE B.
Not run yet (they wait for the real head): quickcheck --runs 5 perf, PHASE B.

### 18 LAWS check (MAIN ROOT-52 order 16:12Z; reviewer read START_CORE ★ block + START_REVIEWER) — laws this review touches, status on caa2902a/c402a630
- L4 ONE CORE: one-core-guard PASS; typed-number should-fix list from PHASE A stays a must for the next head (rates json `why`/`rare` are text, fine).
- L6(b) REAL PEOPLE / goals: this is the npc-purpose subject; every actor comes from npcWhy with s ≥ BAL.ag.why.min, `pickAll`/`each` keep that floor → OK. The rate gate guards "events need a reason but must not vanish".
- L6(c) REAL OBJECTS: jlost endings (mat / nvp / expire) go through ilGone into the item ledger, same code as base → traceable, OK; the next head's "jlost ways + dearest piece" change is re-checked on that sha.
- L11 FIX THE WHOLE GROUP: the gate judges EVERY card title + log head (not a track list) → OK; the open rows in RE-CHECK 2 are each a group (wardrobe remark/search family, rumor family) and must be fixed as a group.
- L14 CANON OVERWRITE / L16: npcWhy changes no owner rule; BAL.ag.why.on = 0 is a kill switch (noted).
- L1/L2/L3/L5/L7/L9/L10/L12: not touched by this branch's logic (no new choices / UI); PHASE B quickcheck + kit-conform cover the UI side.
Base for the next head: ag-all-2-land is LIVE → base = live main e18697fe (the head must contain it).

## RE-CHECK 3 on f647c881 (G1 #8 "SẴN SÀNG KIỂM f647c881"; base ag-all-2-land 45c6dbea; reviewer session_01964izEUgw5hZTBxuEguL4K, 18/11 ~18:05Z) — FAIL (narrow: 1 rate row + gate stability + 1 stale reason)
PRIORITY #1 CHECK: report + FOREMAN_D_STATUS + reports/npc-purpose.md §G1 #8 read; reused npc-purpose-rates.js, quickcheck.sh; no other branch on this subject.
Reviewer ran itself:
| check | result |
|---|---|
| npc-purpose-rates ×2, 12 seeds × 200 tuần, --base 45c6dbea (RATES_BRUNS 2) | run 1 **FAIL** (1 row), run 2 PASS. Head deterministic: dumps of the 2 runs give 0 differing keys; the flip comes from the base side |
| quickcheck --runs 5, CTM_LIVE_REF=45c6dbea | PASS: render 236/237 ms, tab 451/448, buổi 987/1483, tasks>200 20/17; old save ok; CORE GATES (one-core-guard, rules-one-source, kit-conform, hooks 6) + time-spill PASS |
| earlier on this sha's code: scan --strict, npc-why + g1..g1g | PASS (G1 #8's list; the reviewer re-ran these on caa2902a; f647 changes only fixtures there) |
Fixed and verified since RE-CHECK 2: all 9 shifted rows are in band or kept with a reason; 'khoe khoang' 1.70; lost chain in band; jlost 'mis' goes through an npwAsk flag (my note); jmen MEN_ROVE/FANCY/BRIBE through BAL.net.old, and every user reads the lists (jmen likeV/rove/bribe/seek, jagwhy1 affair/tryst/manPoem): Law 11 OK. The 'cười khẽ' reason (NPCs now fix outfits below their rank, with probe numbers) is accepted.
STILL FAILING:
1. **c:/l: 'Hỏa hoạn lớn' 9-10 → 31 (3.2x)**, spread over 10 of 12 seeds (4,4,6,2,0,2,1,0,2,4,4,2), so it is not a one-seed row. Root: jtsb.js tsbFireW `else if(p!==S&&npcWhy("fireHeed",{p}))` replaced base `roll(60)`. jagwhy1.js:159 fireHeed s = eyes×bul.fire.eye(6) + Đức×bul.fire.duc(.3) only clears ag.why.min 20 with eyes ≥ 1 (Đức 50 → 15), so it fires 17 of 132 asks (13 %) against the old 60 %. NPCs ignore the candle warning, jtsb fires rise and spread into the world 'hoa' event. A dead zone of the PHASE A item 2 family. FIX: base s on the warning she really got (a heeding base that clears min for a normal consort, plus eyes/Đức/nết) so the normal case is about the old 60 %. Audit every kind that replaced a flat `roll(N)` "whether" with npcWhy and no `done` roll: compare fire/asks with the old N, the same table as the rare list.
2. **The gate is not stable on one sha**: run 1 FAIL and run 2 PASS with identical head counts, because the 2-run base mean moves (Hỏa hoạn base 9 vs 10). A gate whose verdict flips on a rerun cannot be a gate. FIX: either more base runs (RATES_BRUNS ≥ 4) or keep rows within ~15 % of a band edge from flipping (judge against the min/max of the base runs: out only when out against every base run). Show 2 reruns with the same verdict.
3. **Stale reason, why 'l:chưa dứt · nắm được' (20 → 0)**: it says the notes fell because affairs are rare, but on this head affairs ROSE (track 'tư thông' 2 → 6 after the jmen fix) and base wrote 20 notes from about 2 affairs, so the notes come mostly from the 'không khớp đêm' pregnancy path (taimat / jmem noteAdd). Find why that path writes 0 now (taimat fires? noteAdd reached?), then fix it or write a true reason with numbers.
18 LAWS: L4 one core PASS (core gates); L6b each actor has a reason (npcWhy, s ≥ min) OK; L6c lost-item endings go to the ledger OK; L11 group fixes OK (jmen) but item 1 needs the whole "flat roll → npcWhy" group audited; UI laws: kit-conform PASS, no UI in this branch.
Base note: live main is now e18697fe (+ shop-panel 5e6490b4 on top); f647c881 does not contain it. G1 #8 waits for C-AG "LIVE <sha>". The FINAL head must contain live main, and the rates/quickcheck re-run goes against that base.
NEXT: G1 #8 fixes 1-3 and sends a new SẴN SÀNG KIỂM; the reviewer re-runs rates ×2 (same verdict both times) + quickcheck ×5. PHASE B after C-AG "LIVE <sha>".

## RE-CHECK 4 on 0a6e877a (G1 #9 SẴN SÀNG KIỂM; base 45c6dbea; reviewer session_01964izEUgw5hZTBxuEguL4K, 18/11 ~21:00Z) — PHASE A PASS (rates), perf to re-measure in PHASE B
- npc-purpose-rates ×2 (12 × 200, --base 45c6dbea, RATES_BRUNS 3): PASS / PASS, same verdict; head counts identical (0 differing keys); 0 rows hidden by the "out against every base run" rule (noise count 0); 6 rows out and kept with a reason. Hỏa hoạn lớn and 'chưa dứt' now in band.
- Code: fireHeed / birthPlot / raid / wdDress keep base's old odds as BAL done rolls (bul.fire.heed 60, j8.birthP 15, j8.raidGo 20, wd.dressGo 30); taimat watcher falls back to her maid / servant; BAL.ha.steal.no 1.6; loTake.care 25. All values in BAL (L4). Gate: out only against every base run; road-news family per road kind (rolled at NPC creation, accepted).
- quickcheck --runs 5 vs 45c6dbea: PASS. render 236/224 ms (+5 %), tab 360/355, **buổi 1272/1119 ms (+14 %)**, tasks>200 15/15, old save ok, core gates PASS. Buổi swings a lot from run to run (RE-CHECK 3: 987/1483 = −33 % on almost the same code), so PHASE B re-measures perf ×2 against live before the verdict.
- NOTE (clean-up, not blocking): the gate prints stale json `why` entries no row needs any more (l:cung ngươi thăm hỏi (muốn, l:sang tặng ngươi, l:ngươi, l:thư về nhà kể khổ, l:soát, …). Drop them so a reason can't later cover a new shift.
NEXT: PHASE B on G1 #10's merged head (add7b105 = 0a6e877a + live fa411d6f) once it posts SẴN SÀNG KIỂM.
