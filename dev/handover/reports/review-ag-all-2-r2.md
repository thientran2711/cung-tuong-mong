PRIORITY #1 CHECK ('review ag-all-2 r2|ag-all-2'): OD 10 (L1587 L1588 L1592 L1616 L1617 + 17/11 ~15:25Z … ~18:05Z read verbatim) | ledger 0 | claims 8 | main 0 | review/* review/ag-all-2 (6badc4d4)

# REVIEW ag-all-2 r2 — BIG (opus) — review/ag-all-2 6badc4d4

Reviewer: session_01UV1SzibgyTxRDxLdJ5yW6t. Foreman: C-AG #5 session_01UV1SzkwHkU5MoXKRsprFyU. START_CTX ≈ 5 % (1M window); rollover line ≈ 30 %.
Reviewer branch: review/ag-all-2-r2 (pushed). Method: helpers (merge, A = checks 1/2/3/6e/10, B = 4/5/7/9/13/14, C = 6/6b/6c/6d/12, fix helper) + reviewer checks 8/11 and G4 flake.

## STATUS — VERDICT: PASS 1f8aaf303 (reviewer #2 session_01UV1SziCw1gnLVkS7bUSAPM, 18/11 ~00:40Z; depth 3; START_CTX ≈ 3 % of 1M)
PRIORITY #1 CHECK ('ag-all-2|agDayEnsure|ag-walk|ag-rd'): OD 10 | ledger 0 | claims 8 | main 0 | review/* review/ag-all-2-r2 (0a627b592), review/npc-chain-land (lander).
Head review/ag-all-2-r2 = 1f8aaf303 (pushed), FF-able onto live main eb3675a6. Chain since 0a627b592: a2d3f00 ag-rd fixture → 142f88b2d merge main eb3675a6 (coop-thin-c, dudo-blank, kit-display-room r2; only assets.json / index.html / sw.js conflicted, main's taken) → a84f55429 site rebuilt → 1f8aaf303 ag-walk fixture. No game code changed by reviewer #2.
The 2 reds of the handover were NOT a merge fault: on a clean build of 0a627b592 ag-all.test = ALL 21 PASS (1 run alone; 6 runs ×3 parallel and CPU×6 throttle: only the timing check 'day draw p95' red under load) and the same on 9ac2d505. Predecessor built g4 with assemble errors hidden (>/dev/null) and its ag-all reds (draws 0 from day 9, old save not planned, ngự giá 0) were never reproduced (≈ 17 runs, old + new, plus a 20-life death probe: 0 deaths). ag-walk 3 reds = a real FIXTURE flake on BOTH 9ac2d505 and the head: the 'eye' timing rows relied on the seeded sight roll knHit, which misses on some starts (row all '-').
Fixture fixes (tests only; each made stricter or isolated, none weakened; family scan: only ag-rd reads AGD.stat.rd / rdN, only ag-walk.run used the unforced knHit):
| test | flake (before) | cause | fix | after |
|---|---|---|---|---|
| ag-walk 1/3 | old 1/4, head 1/3 under load | seeded knHit miss → no sighting | knHit forced in run() as the carry part already does | 6/6 (3 old + 3 head) + suite |
| ag-rd FAR k3 | ~1/3 | global AGD.stat.rd / rdN counted other consorts | rd / hr = A's own agHeard | — |
| ag-rd FAR k3/k4 | ~1/10 | a queued popup (Hoàng thượng dạo vườn) made goTo a no-op | Q cleared before she walks in; throw if not in the garden | — |
| ag-rd FAR k4 | ~1/20 | mode 'go' forces every servant to tell → per-khắc cap BAL.ag.kh2.rd.cap (6) delayed A | cap lifted for the run, restored | — |
| ag-rd B7 | ~1/15 | fixture took her own 'call' deed off the list but left its painted rows | rows cleared with it | 29/30, then suite green |
Residual: ag-rd FAR k3 'A hears one khắc early' ≈ 1 in 35 runs, same rate on 9ac2d505 (old 1/20) — not caught in 76 instrumented runs; pre-existing, not a merge regression → follow-up ticket (instrument agTell due / mp for A).
GATES on the merged head (a84f55429 build; 1f8aaf303 differs only in dev/test/ag-walk.test.js): QUICKCHECK --runs 5 PASS (core gates incl. one-core guard + rules-one-source + kit-conform, old save from live loads and plays, perf new/live render 184/160 tab 354/310 buổi 877/823 ms, tasks>200 13/13); coop-e2e 63/63 ×2 (one 60/63 while 2 suites ran beside it, green alone twice); coop-thin-c L3 16/16; coop-one-world PASS; ag-all ALL 21 PASS; ag-walk 10/10; long suite all green: ag-all-b, ag-all-c, ag-betray 20, ag-carry 9, ag-dayk, ag-kh2, ag-know 25, ag-mg2 26, ag-mgcal, ag-mgh, ag-par3, ag-paywin 9, ag-rd, ag-sell 19, ag-soft 19, ag-stf2 23, ag-taimat 25, ag-taimat2 16, ag-toil2 16, ag-truth 10, ag-wx 6, agemp 20, agent_check 16, agmaid 23, greet 13, world_check2 43, wx-khac2.
Load note: ag-all 'day draw p95' and ag-all-c 'agent slice p95' go red only with 3 browsers in parallel (timing checks); green alone. Perf call of reviewer #1 (CPU×4, accepted, no budget raise) stands.

## FIX2 (9ac2d5052) — causes
ag-all-b: staff slices (B5) need __agAll in the 40-week evaluate (fixture). ag-all-c: REAL — haOpts weekly cache ignored a grudge that arrived later → grudge version in the cache key (jagharm). ag-all ngự giá: real rate 1–5 per 14 days (his mood .25) → fixture boosts desire ×4 to test the mechanism (as tea); Empress checks set regard directly (slow-to-warm trait shrank affAdd). ag-know G2: passer-by tells ~15 % by design → run until 6 happenings. ag-betray: home maid bargains back 40 % (jcmaid, own log line) → expected refund; price text and rule read one key nv(s,"bribeCost"). ag-toil2: the check counted a later meeting pass → reads her answer's own gain. Perf: jagtoil memoised read-only lookups + skips met pairs; agDecideDay reuses its own draw.

## Merge (93a86899c) — resolution rules
Branch structure kept (shared functions, eyes(S), agent hooks) + main's keying on top (BAL.odb / BAL.eff / BAL.bacFee …). Branch BAL.ag duplicates of main's new keys unified onto main's keys (getters where NPC code reads tables generically). j1 origins: main's on:/land: kept, mat start values dropped (owner ~16:50Z: no automatic Tai mắt). Main's (S.mat||0) odds terms → eyes(S). one-core baseline = main's (3843), never grown. Judgment calls: p3HireRole counts room with main's hhHas(); jact Đánh đàn fail sign fixed (+1 → −1 Sủng); j7 thái giám volunteer keeps the earned-Tai-mắt event.

## Findings → fixes (reviewer fixes on review/ag-all-2-r2)
| # | check | finding | fix |
|---|---|---|---|
| A1 | 2 | dead old cx2:maidSpy runner jagacts2 (overridden) | deleted |
| A2 | 3 | ag-know flaky 2/3 (random setup); scheme-lie check regex only | deterministic setup + behavioural lie check |
| A3 | 6e | NPC mirrors soft-fail at cap, her runOpt fails hard = NPC-only rule | her runOpt gets the same agSoft soft fail (OD ~17:35Z); o>=100 no roll kept |
| A4 | 10 | REVIEWER CALL: j70 'Mua lời khai' + 'Trả bạc cho các ma ma già' (+ 'Mua chuộc thầy dạy', 'Tung tin qua thái giám') buy a person's word and can fail = bribe → JOIN the bạc-on-success family (OD ~17:10Z (1)); 'tho'/'do' = materials/wages, exempt | econPayWin route |
| A5 | 10 | whole family: 8 more pay-then-roll bribes (j10 plantServ, j42 Dúi bạc, j22 Kính sự phòng, jkc, j68f, j68g, jeitem, jtsb) | bạc only on success |
| B1 | 4 | agRdTick one khắc early (lost the maid's 'see' khắc) | owner timeline k2 sees / k3 hears+walks / k4 visible |
| B2 | 4 | present NPCs react in the SAME khắc | reaction = deed at k+1 |
| B3 | 7 | agHeard dropped news that fits the DAY but not the buổi | kept via day gate |
| B4 | 14 | spill runs after the new buổi's planners on slow devices (double booking) | agSpillAll first |
| B5 | 13 | ag-all 'day draw p95' over BAL.ag.perf.p95 3/3 (branch's own budget) | slice agDayDraw |
| B6 | 13 | ag-mg2 'an NPC can fail' flake (N 300 at ~99 %) | test robust |
| C1 | 6 | typed 'chứng cứ … +1' j4, j55; jagacts3 regex | one helper |
| C2 | 6 | her Tai mắt list showed loyalty to their own master | loyalty to her as she knows it |
| C3 | 6b | old-save migration made loyal servants her spies | willingness floor |
| C4 | 6c | j8 ag2Ch clamp 100; tsDenOdds unclamped | BAL.odds |
| C5 | 6c | threatServ / j70 accomplice: no soft fail, no both-ways cost | added |
| C6 | 6c | REVIEWER CALL: non-greedy low-lòng servants offered to sell | only greedy (or chữ trọng offended) |
| C8 | 6b | raw .mat odds in jpet/j70/… | eyes() |
| J1 | 8 | judge threshold "cần 2 chứng cứ" typed in text + 3 rules | ONE key BAL.ag.ev.judge |
| W1 | 11 | merge integration: agent day plan overwrote jwxk storm leave; jweather hit NPCs by pre-plan place | storm stay/leave = NPC's own plan choice; hits on final place |

## Checks OK (evidence in helper reports)
1 r1 faults fixed (srvRiskOf, BAL.srvGrant, caughtOdds family, th.items, tests, comment, weight pass). 2 parity table: 11 rows spot-checked SAME; no NPC-only registry key. 3 no lies (ag-truth 10/10). 5 minigame hands (mgNpcRaw only path; per-NPC hidden hand; owner-only ?hieuchuan=1 'Thử tay tài nghệ' 30 kinds × 5 rounds → BAL.ag.mg2.cal.k for all; ag-mgh 10/10). 6d virtues (btTerms trait ± lòng ± chữ trọng ± mood, jmind record). 9 TIN BÁO walk (agWalk = travel; ag-walk 10/10, ag-carry 9/9). 11 weather: no place closed/greyed anywhere after the merge (accessOf, jgift kmStorm overridden by jwxk, jag* read no access weather). 12 frozen list: branch added NO entry (5093 at base and tip); main shrank to 3843; merged head uses main's 3843 and passes.
PERF CPU×4 (2 alt × 20 buổi): buổi med/p95 new 1898/6429 vs live 1773/9348 ms → does not hurt play.
QUICKCHECK G4 seed 3 (foreman's flake note): 6/6 PASS on the merged head 644ffec0 (main's S.wwMe fix is in it).
