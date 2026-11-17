PRIORITY #1 CHECK ('review ag-all-2 r2|ag-all-2'): OD 10 (L1587 L1588 L1592 L1616 L1617 + 17/11 ~15:25Z … ~18:05Z read verbatim) | ledger 0 | claims 8 | main 0 | review/* review/ag-all-2 (6badc4d4)

# REVIEW ag-all-2 r2 — BIG (opus) — review/ag-all-2 6badc4d4

Reviewer: session_01UV1SzibgyTxRDxLdJ5yW6t. Foreman: C-AG #5 session_01UV1SzkwHkU5MoXKRsprFyU. START_CTX ≈ 5 % (1M window); rollover line ≈ 30 %.
Reviewer branch: review/ag-all-2-r2 (pushed). Method: helpers (merge, A = checks 1/2/3/6e/10, B = 4/5/7/9/13/14, C = 6/6b/6c/6d/12, fix helper) + reviewer checks 8/11 and G4 flake.

## STATUS — ROLLOVER HANDOVER (reviewer at its context line ≈ 30 %, 17/11 ~22:35Z) — VERDICT NOT YET GIVEN
Head: review/ag-all-2-r2 = 0a627b592 (pushed; FF of origin/main 99f3978d). Chain: 6badc4d4 → merge main e503c53e (93a86899c/644ffec09) → fix commits (A1–A5, B1–B7, C1–C8, M1, W1) → merge main c0a52168 → 521a4ac33 judge key → fix2 (bfba3fac3 … 9ac2d5052) → merge main 99f3978d (8903760e4) → site 0a627b592.
On 0a627b592: QUICKCHECK PASS (core gates, old save, open 0 errors; ×1 buổi 1156/883 ms loaded box); coop-e2e 63/63; coop-one-world seeds 3 + 7 PASS; ag-all-b, ag-all-c, ag-know 25/25, ag-betray 20/20, ag-toil2 16/16, ag-sell 19/19, ag-paywin 9/9, ag-par3, ag-wx 6/6, agent_check 16/16, ag-kh2 PASS.
RED on 0a627b592 (logs /home/user/wt/s3-*.log on the box; all were GREEN on 9ac2d5052 per fix2 report, so suspect the 99f3978d merge — new modules jemocause/jshelf/jdisp or kit-thanh-bai j19 — or test fixture vs main's new start):
  - ag-all.test 7 FAIL: 'day plan drawn once per day' [1,1,1,1,1,1,1,1,0,0]; 'hybrid day … consorts:false'; 'old monthly study dice off …' {on:14,off:2}; 'old save without a day plan loads and plans' planned:false; Ngự giá / NPC night / tea drop-by all 0.
  - ag-walk 3 FAIL: FAR news never known ['-','-','-','-'] (1, 3 far=3, 3 relay off).
NEXT (successor): (1) run ag-all.test + ag-walk on 9ac2d5052 vs 0a627b592 in one worktree to confirm the merge cause; look for a throw/early return in a placeWhere / nextBuoi wrapper added by main 99f3978d (jshelf, jdisp, jemocause) that stops agDayEnsure (jagday.js placeWhere wrapper) — agdErr logs; fix as reviewer fix. (2) rerun the whole list (/home/user/wt/suite.txt list + ag-kh2 ag-stf2 ag-toil2 agemp agmaid greet wx-khac2 world_check2), QUICKCHECK, coop-e2e. (3) perf CPU×4 with /home/user/wt/scratch-B/perf2.js (ROOT=/home/user/wt/r2, OLD = origin/main index.html into scratch-B/main2-index.html). (4) PASS sha → foreman C-AG #7 session_01UV1SzgaEMtM9LvcYPr6tdR + lander session_01UV1Szi7UbTAbk3W9QSD6h7 (it already merged 521a4ac3 + main; it takes the delta) + main s38 session_01UV1SzjyZ9i1PBVPwsxig6F.
REVIEWER CALL on perf (made): fix2 brought CPU×4 buổi median to 1605 vs live 1593 ms (p95 7178 vs 7517) — does not hurt play. In-page agent slice p95 8.6/8.5/7.1 vs BAL.ag.perf.p95 8 at ×4 (the budget is checked at ×1 in ag-all.test, green there 6.8–7.8): the rest is single deeds (workshop wkMake→dhSync, staff deed runs, cx3:work) that slicing cannot split → accepted, note for a later perf ticket; budget not raised.
Helper reports on the box: /home/user/wt/merge-report.md, rv-A.md, rv-B.md, rv-C.md, fix-report.md, fix2-report.md. Box note: stray helper scratch /perf (dir), /toil.txt, /c1.js at filesystem root — the safety check refused rm; harmless.

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
