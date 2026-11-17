PRIORITY #1 CHECK ('AG-ALL|jagday|agReg|mindPick'): OD 2 (L1587, L1588; + L1592, 13:55Z, 14:20Z, 14:30Z read verbatim) | ledger 0 | claims 8 | main 15 | review/* review/ag-all, review/ag-all-c

# REVIEW ag-all r1 — BIG (opus) — review/ag-all 8f7bdd329

Reviewer: session_01UV1SzjBGppSaBv9NaJqrr3. Foreman: C-AG session_01UV1Szh1sUAVP6FUuqZgkYs. START_CTX ≈ 5 % (estimate).
Base: origin/main 25bfd7cf is already an ancestor of 8f7bdd329 (fast-forward possible, no rebase needed). Nothing pushed by the reviewer.

## VERDICT: FAIL (core design sound; fix list below)

## What was run (all on 8f7bdd329)
| check | result |
|---|---|
| QUICKCHECK | PASS · core gates (one-core-guard, rules-one-source, kit-conform) PASS · time-spill PASS · open 1639 ms · old save from live loads + plays · perf median new/live: render 202/204, tab 328/344, buổi 1074/1097 ms |
| PERF, CPU ×4 (Fold/iPad-class), 2 alternating runs × 20 buổi per build | buổi live med 1145 / p95 2369 ms · new med 1113 / p95 1985 ms → no measurable regression (the worker's +17 % at ×1 is noise); in-page day draw p95 within BAL.ag.perf.p95 (ag-all.test) → within budget, does not hurt play |
| ag-all.test 20 days | 12/12 PASS (but see fix 3: its per-group histogram is mislabelled) |
| ag-all-b 30 tuần | PASS |
| ag-all-c 200 buổi | 1 FAIL: "quiet and busy buổi both occur" → '!' = 0 in all 200 buổi. Cause found: the run started as a cung nữ (start() gives a servant start ~1 in 10; adSrv() hides the Dư đồ '!' by design). Test flake, not a game bug (fix 3) |
| agent_check / agemp / agmaid / greet | 16/16 · 20/20 · 23/23 · 13/13 (greet rank table flaky on servant start = same on live main; not made worse) |
| coop-e2e | 63/63 PASS (host-only holds: guests never plan) |
| own bot, 3 × 200 buổi new + 1 × 200 live (consort starts) | '!' per buổi new {0: 38 %, 1: 44 %, 2: 17 %, 3: 1 %} vs live {0: 21 %, 1: 66 %, 2: 13 %}: quiet and busy buổi both occur, no floor/cap, no world-event '!' (AD_HAP_FIX = festival + cold palace only). NPC harm acts (runAct by NPCs) new 25–30 vs live 36 per 200 buổi; deaths 0 / 0; an NPC Hoàng hậu holds the seat in all runs → no runaway |
| own bot 240 buổi, Empress/Thái hậu acts new vs live | both near zero on BOTH builds (same gates as the old rolls) — not a regression |

## Law checks
- Same act list / same functions (scan): consort cx:* run the j2 cards' BAL.ag.cx entries (player cards read the same); hhAct is ONE function for empAct and the NPC Empress; harm:* run runAct/mindRun and every key is on RVGRP (ag-all-c); staff run SRVA (player maid cards read it). PASS for what exists.
- needs × traits × tâm cơ × goals (mindPick), HYBRID day (intent + per-buổi pick fed by the last buổi), placeWhere follows the plan (≥ 85 % follow), worldPlanW read once (jagstaff's own planner runs only when the day plan is off): PASS.
- Flat rolls removed: verified against code for every before→after line in report §12, §14.1, §15 (guards `agDOn()` / `asOn()` / `haOn()`); remaining rolls are listed in §8/§15. PASS as listed.
- Kit-first: no new UI part. VANPHONG: new player lines are cổ trang, no %, no "Chắc chắn". PASS. Old save: PASS. Co-op host-only: PASS.

## FAIL — exact fix list (worker A + helpers, same branch)
1. OWNER LAW 13:55Z / L1588 NOT MET — acts still missing (owner: "nếu như bất kỳ một cái nhóm nào thiếu thì tự bổ sung vô luôn"; no more slices). Report §15 lists them as "next job"; they belong in THIS job:
   - Emperor: Ngự giá lâm cung to NPC consorts too (jvisit visRoll roll(visCh) → his plan choice), tea drop-by (j24:32 roll 50), bestow / ân thưởng by regard (the §4 bestow rolls), stroll is done.
   - Consort NO rows: Hầu thuốc Hoàng thượng, Nhờ giúp đỡ, Trút giận, Emperor talk (Tâng bốc / Nói thật lòng / Phô tài / Xin ân điển / Bàn chuyện triều chính), Hỏi sở thích Hoàng thượng / Xem sổ thị tẩm, Bài thuốc dễ thụ thai / Mời thái y tâm phúc / Xin thuốc cho con, Lục rương tìm chứng cứ, Đưa con thỉnh an, Chữa bệnh cho con, toilette as her choice (toilNpc), emotion cards (jemoact roll 25 → choice).
   - Staff: j10 servMonth consort bribeServ roll(10) / plantServ roll(2) (→ harm options bribe / plant), jcmaid cmMonthNpc / cmGuard, jeitem eitPilfer, jpromsv spMonth leaveCh, j95.js:147 errand j95dice(80).
   Each as an agReg option calling the player's own act function; update the gap counts in report §COUNTS (before/after).
2. ONE CORE — copied formulas (scan rule "no copied formula"):
   - jagstaff.js:101 asRisk copies j42.js:430 srvRisk's place table {vuon:28,thu:34,tyv:20,tn:40,home:18} + friend/tamco terms → one shared function (or BAL table) used by both.
   - jagstaff.js:164 Ban gả trigger copies j42.js:472 (`loyal>=55`, `roll(2+(bond?3:0))`) → read one BAL entry used by both; also asMonth `s.loyal-5`, asNeeds `(srk+1)*5`, asPeers `+40`, AS_DO nvp `+5` / ask `af:2`, asSt default `loyal 45` → BAL.ag.staff.
   - jagharm.js:53 haOdds copies the caught chance `cl(oSee(t,ps)-4*(facN(a)-1),5,95)` of j8.js:79 caught() → extract one function in j8 and call it from caught(), jagharm, jpoison:52, j63:253, j83:174 (whole family).
   - BAL.ag.th.items duplicates the list still typed in j8 TH gift (guarded path) → j8 reads BAL.ag.th.items.
3. TESTS (the brief's "histogram per group" must be true):
   - ag-all.test.js grpOf maps staff ids "s<sid>" to consort/hh (RV(+id.slice(1))) → staff deeds land in the consort and hh rows; add maid / srv groups from agGrp.
   - ag-all.test.js check 3 passes any key matching /^(c|harm|maid|srv):/ without mapping it → map harm:* to RVGRP (as ag-all-c), maid:/srv:* to SRVA keys, c:* to its deck card.
   - ag-all-c.js (and ag-all.test) must force a consort start (start() until !isSrv()), else the '!' check fails ~1 run in 10.
4. Doc: jagharm.js header (line ~24) still says AD_HAP_FIX holds "the world-events window" — void by owner OD 14:30Z (no world-event '!'); fix the comment so the world-events builder is not misled.

## Notes (not blocking)
- '!' variety: on new, the people-happenings are festival / Emperor's walk / generic "Có chuyện" witness; quarrel, gossip and favour '!' did not appear in 600 bot buổi (live: ~45 % of buổi, from the now-banned candidate dice). Real NPC provoke / humil / gossip deeds are rare on both builds (AG1 weights). Worth a weight pass (needs × traits, no dice) so NPC↔NPC quarrels and deeds aimed at her show on the map — owner wants NPCs "sống nhất có thể".
- Empress and Thái hậu acts fire ~0 times per 60 days on both builds (gates hh ≤ −40 / ≥ 50, th ≥ 60). Same as live; consider gate review with the weight pass.
- Report §14A minor (staff home deeds planned at palaceOf(master) while j95 lists them at p.home): harmless, left as noted.

## Rollover lines (verbatim, for any takeover prompt)
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
