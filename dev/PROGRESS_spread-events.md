# PROGRESS: review/spread-events — D13 spread events across buổi

Owner rule: dev/OWNER_DECISIONS.md "15/11 ~23:20Z — Timer pauses only for minigames; spread events across buổi" (events piled up in the
morning; each event a fitting buổi; per-buổi cap, the rest queued to later buổi; stipend / rewards not all on the same morning; measure a
popups-per-buổi histogram before/after with bots). Queue: dev/handover/SESSION8_QUEUE.md §D D13 (depends on D29).

**Base:** built ON TOP of `origin/review/schedules3` @ 9b1d82fa (D29 one location ledger, not yet on main). Waits for schedules3; when
schedules3 lands on main, merge main again (no conflict expected: new file jspread.js + one line in assemble.py + one BAL line in jbal2.js).

## What was there before (LUẬT ƯU TIÊN SỐ 1 check)
- `git grep` origin/main + every origin/review/*: no D13 / per-buổi cap anywhere. Existing partial spreading kept as is:
  j68 `evGate`/`evRelease` (OPTIONAL j68-type cards only: 1 per buổi, 2 per day, held in memory, may be dropped as a log line by its
  anti-repeat rule). It never touched stipend, notices, festival cards, quest cards, j70 warnings — those all landed at sáng.
- Measured before (bots, table below): sáng 3.3–3.5 world cards on average, 61 % of mornings had 3 or more, up to 14 in one morning.

## What was built (dev/build/jspread.js, loaded just before jkpc; wraps nextBuoi, showModal, save, render, deser, start only)
1. **World card** = a card that enters Q while the game moves to a new buổi / tuần (nextBuoi, endTurn inside it). Cards from her own acts
   are never moved. During the buổi change nothing is shown; the whole batch (endTurn, news, j70, j68 …) is planned at once, then shown.
2. **Fitting buổi** (table `SP13SLOT`, by title / pid): sáng = thỉnh bình an mạch, stipend, edicts (tấn phong, ban cung, xét phẩm), dress
   theme, festival invites / rites, omens; trưa = visits, servants, gossip, Thái hậu summons, quests, warnings, festival games / bets;
   chiều = rewards (ban thưởng, khen), rumours, tai mắt reports, gifts, stipend cuts, festival contests; tối = banquets, plots (Mưu hại),
   the Emperor's evening visit, fires, night things. No match = now if there is room.
3. **Cap**: at most `BAL.spread.cap` (2) world cards shown per buổi; the rest wait for the next buổi with room (carry-over), oldest first.
4. **Never lost, never skipped forever**: a card waits at most `BAL.spread.maxWait` (4) buổi, then it is shown even in a full buổi
   ("forced"). Same-tuần cards (warnings, plots, omens, tai mắt, festival cards = fixed day) never pass the end of their tuần.
5. **Never moved**: the buổi's own news card ("Tin trong cung …"), ending / new-life / tutorial cards, cards j68 already held.
6. **Save**: waiting data cards (pid cards, notices, data-only choices — same rule as jqsave) live in `S.sp13.q` and come back on load.
   A card whose options run code cannot be written down: it waits at most `BAL.spread.codeWait` (1) buổi, is released first, and while it
   waits the autosave is held (jqsave rule), so a reload lands before it, never after a lost card. Same life still in memory (co-op rejoin,
   save round trip) keeps its waiting cards. Checked in play: the save is held only at the month-start sáng (stipend choice card waiting),
   1 buổi in 12 at 755x1000; every other buổi saves normally.
   codeWait measured 1 vs 2 (sens bots, 16 lives each): 1 left a pile at trưa (12.8 % of trưa with 3+ cards, forced code cards) and more j68
   drops (704 vs 613 before); 2 = trưa 0 %, j68 drops back to 621. Chosen 2 (cost: a reload in that window replays up to 2 buổi).
6b. **Optional cards stay with j68**: cards j68 calls optional (`evOptional`: visits, j68 events, merit, rewards…) keep j68's own pacing
   (one at a time, 1 per buổi, 2 per day, held at day start). Moving them too made j68 hold/drop many more. D13 counts them in the cap
   (also when j68 releases a held one later).
7. **D29 ledger (schedules3 API, not re-invented)**: people in a card are placed when it is SHOWN (j95b `j95bPresent` records actors /
   places at that khắc, j95c drops clashing sentences), so a moved card is placed at the buổi it really appears. Before a waiting card is
   shown, its consort is checked in the ledger (`S.roster.P`, `j95on`): no longer alive / no longer in the record ⇒ card void (text goes to
   the log as a line; `SP13.stat.void`).
8. **Off**: co-op room (one shared world state; the ledger is also off there), `window.__spreadOff` (measuring "before").
9. Numbers: `BAL.spread={cap:2,maxWait:4,codeWait:2}` (jbal2.js, ONE CORE). No player-visible text, no UI, no kit part.

## Histogram (dev/measure/spread_hist.js, real bot play inpage6 + inbal, all 9 origins, 36 tuần per life, n = 32 lives each side)
World cards SHOWN per buổi (a card = one popup the player sees; "world" = arrived with the turn of buổi / tuần, not from her own act).
Before = same build with `window.__spreadOff=1` (OFF=1). After = this branch (BAL.spread cap 2, maxWait 4, codeWait 2).
Re-run: `OFF=1 node dev/measure/spread_hist.js sens 16 off.json 0 36` / `node dev/measure/spread_hist.js sens 16 on.json 0 36` (rand: shard 4).

**sens bots** — before: 16 lives / 577 tuần · after: 16 lives / 576 tuần
| buổi | before mean | before hist 0/1/2/3/4/5+ | before ≥3 | after mean | after hist 0/1/2/3/4/5+ | after ≥3 |
|---|---|---|---|---|---|---|
| sáng | 3.36 | 32 / 79 / 136 / 108 / 64 / 163 | 57.6 % | 1.26 | 40 / 434 / 59 / 32 / 16 / 5 | 9.0 % |
| trưa | 0.44 | 323 / 255 / 0 / 0 / 0 / 0 | 0.0 % | 1.40 | 98 / 154 / 331 / 0 / 0 / 0 | 0.0 % |
| chiều | 0.58 | 283 / 267 / 18 / 8 / 2 / 0 | 1.7 % | 1.26 | 142 / 175 / 234 / 19 / 7 / 0 | 4.5 % |
| tối | 0.54 | 299 / 253 / 16 / 9 / 0 / 0 | 1.6 % | 0.98 | 186 / 214 / 176 / 0 / 0 / 0 | 0.0 % |
| per tuần | 4.92 | | | 4.91 | | |

**rand bots** — before: 16 lives / 399 tuần · after: 16 lives / 385 tuần
| buổi | before mean | before hist 0/1/2/3/4/5+ | before ≥3 | after mean | after hist 0/1/2/3/4/5+ | after ≥3 |
|---|---|---|---|---|---|---|
| sáng | 2.36 | 68 / 78 / 102 / 59 / 49 / 55 | 39.7 % | 0.98 | 78 / 269 / 41 / 8 / 1 / 2 | 2.8 % |
| trưa | 0.38 | 252 / 154 / 0 / 0 / 0 / 0 | 0.0 % | 0.97 | 141 / 123 / 129 / 0 / 0 / 0 | 0.0 % |
| chiều | 0.52 | 207 / 189 / 6 / 3 / 0 / 0 | 0.7 % | 0.77 | 172 / 139 / 77 / 2 / 0 / 0 | 0.5 % |
| tối | 0.45 | 238 / 149 / 4 / 8 / 0 / 0 | 2.0 % | 0.66 | 199 / 117 / 69 / 0 / 0 / 0 | 0.0 % |
| per tuần | 3.71 | | | 3.38 | | |

| check (sens / rand) | before | after |
|---|---|---|
| world cards in the busiest 5 % of buổi (p95) | 8 / 6 | 3 / 2 |
| cards lost (entered the queue, never shown, not waiting) | 0 / 0 | 0 / 0 |
| cards that waited past their limit (D13) | — | 0 / 0 |
| D13 moved · carried past its slot · forced over the cap · void | — | 1448·696·217·0 / 499·184·47·0 |
| j68 optional cards dropped by j68's own rule (anti-repeat cooldown / hold full; pre-existing, logged as a line) | 613 / 276 | 621 / 294 |
| warnings merged (j70) or dropped as no longer true (j95b motive gate) | 81 / 38 | 169 / 39 |
| page errors | 0 / 0 | 0 / 0 |
What is left at 3+ in a morning: festival-day cards (fixed day, several per festival) and code cards forced at their limit.

## Tests (build 4971593, site rebuilt)
| test | result |
|---|---|
| dev/test/spread-e2e.js A: new life, 12 buổi (month start incl.), real render, 755x1000@2, 1000x755@2, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@3 | PASS: ≤ cap per buổi (or forced), every wait within its limit, modal open whenever Q has a card, 0 page errors, no horizontal overflow |
| spread-e2e B: save made on origin/main cdad7109 (no jspread, no j95) → loads on this build at 755x1000 and 1180x820, plays 12 buổi | PASS, 0 page errors |
| spread-e2e C: save while data cards wait → reload page → same cards wait (titles + due) → all shown later | PASS (2/2 and 1/1 in two runs) |
| dev/measure/spread_hist.js bots 64 lives (table above) | lost 0, past-limit 0, page errors 0 |
| dev/test/roster_audit.js sens 6 lives (D29 ledger with D13 on) | 5 519 checks, every check (a)–(r) 0, page errors 0 |
| dev/test/coop-e2e.js (live Worker, Fold host + iPad guest, 3 weeks, leave/rejoin, death, solo + old save) | 59/59 ok (D13 is off in a co-op room) |
| autosave hold in play (.m script, 24 buổi at 755x1000) | held only at the month-start sáng, saves resume next buổi |

## KIT REQUEST
None (no UI).

## Owner / coordinator questions
1. Co-op: D13 is OFF in a co-op room (like the D29 ledger: S.sp13 is not in the co-op world keys; both players would plan cards apart).
   Turn it on there once the ledger is in the co-op world (follow-up with D21 co-op B1–B5)?
2. j68 still drops some OPTIONAL cards by its own older rule (same template within 5 tuần, or its hold of 4 is full); a dropped
   info card becomes a Nhật ký line, a dropped choice card is gone. Numbers unchanged by D13 (613→621 / 276→294 in 32 lives). Should those
   go into the D13 queue instead (no optional card ever dropped), or is the j68 anti-repeat wanted? (Recommend: keep the cooldown drop,
   send "hold full" drops to the D13 queue.)
3. Festival days still show 3–5 cards in the morning-to-noon (fixed-day cards: invite, rite, games, contest, banquet). They are spread
   inside the day by slot; fine, or should a festival day get a higher cap?

## Review r1 (independent reviewer, review/spread-events-r1)
Merged onto origin/main 9ddb3f6c together with review/schedules3-r2 4ea772f3 (the current D29 fix pass; schedules3-r1 was FAIL).
Reviewer fixes in dev/build/jspread.js:
- SP13DAY was declared but never used, and `end` was never set: warnings / plots / aftermath / tells / festival-day cards could be carried
  into the next tuần (bots, sens 8 lives: 8 of 67 such cards shown one tuần late, e.g. "Sau vụ mưu hại b36->40", "Mưu hại b48->52").
  Now such a card gets end = the last buổi of its tuần (due never later; forced at that buổi). After: 0 of 83 (sens 8), 0 (rand 8).
  Festival-day titles (" · Lời mời", " · Lễ", " · Thi ", "Tết/Tiết/Lễ/Hội …") are in SP13DAY too.
- Fallback numbers (||2, ||4, :2) removed: the cap / maxWait / codeWait read BAL.spread only (OD:L1267 one core).

## Fix pass r2 (review/spread-events-r2, after reviewer FAIL r1)
Start: review/spread-events-r1 af64214f (reviewer fixes a + b kept). Merged origin/main **ee5d33de** (assemble: main's list + jk95 after jk2b,
j95/j95b/j95c/jqsave/jspread before jkpc; new main modules after jspread: jact2/jeitem wrap endTurn only, run inside nextBuoi → planned; no new
Q-length gate). schedules3: review/schedules3-r3 (ec649e19) = r2 4ea772f3 + an older main merge, no new code → nothing to rebase on.

### FAIL 1 — the whole family of queue-length gates (LUẬT SỬA CẢ NHÓM)
Scan (`grep -nE 'Q\.length *[<>]=? *[0-9]' dev/build/j*.js`, absolute gates in code that runs inside a buổi change):
| module | gate | fixed by |
|---|---|---|
| j70 show70 | Q>2 (not urgent) | root fix below |
| j68 e68Tick | Q>2 | root fix |
| j72 q72Tick | Q>3 | root fix |
| jpet petMonth | Q>2 | root fix |
| jkc kcWeek | Q>2 | root fix (kcEndTurn; the gate sees the same queue ON/OFF) |
| jthaiy routine | Q<3 | root fix |
| j71 merit (endTurn) | Q<=5 | root fix |
| jreign q72Tick wrap | Q<=1 | root fix |
| j3 dilemma | Q===qStart (relative) | not affected (counts cards added in this endTurn) |
Cause: without D13 the first showModal of the change already sifts the queue (j68 evGate holds/drops the extra optional cards, j95b drops false
warnings), and from then on the modal is open, so callers skip or re-call showModal. D13 blocked that showModal, so every gate saw the unsifted pile.
Root fix (dev/build/jspread.js + one parameter in j68): a blocked showModal during the change runs `sp13Pre()` = `evGate(1)` (dry: holds/drops
as at a real show, marks nothing shown) + `j95bPurgeWarn(0)`, and from the first card `SP13.vo` makes the modal READ as open to game code
(instance getter on #modal.hidden, JS only: no DOM change, nothing painted; cleared when the outermost nextBuoi returns), so the sifting runs at
the same calls as without D13. Every gate (present and future) now sees the same queue as without D13; D13 only paces afterwards.
Measure tools: spread_hist.js counts cards per generator, the Q length at each gate, and the reviewer's count (show70 called with a pending
seen/warn plot and stopped by its Q gate); it now reads the REAL modal state (realHid). kcbot.js counts kcWeek cards (OFF=1).

### Per-generator table (cards created per 100 tuần; sens bots, merged build, shards 3+2+5 = 24 lives, 864 tuần each side; "before" = r1 build, shards 2+5, 576 tuần)
| generator | OFF | ON before fix (r1) | ON after fix (r2) |
|---|---|---|---|
| j68 e68Tick | 13.1 (113) | 2.3 (13) | 13.0 (112) |
| j70 show70 (all j70 beats) | 15.9 (137) | 8.2 (47) | 19.0 (164) |
| j70 "seen" (Mưu hại: she learns a plot targets her) | 5.9 (51) | 1.4 (8) | 8.1 (70) |
| j70 aftermath / serv | 8.3 / 1.5 | 6.6 / 0.2 | 8.7 / 2.0 |
| j71 merit | 4.6 (40) | 6.6 (38) | 5.6 (48) |
| jpet petMonth | 1.0 (9) | 2.1 (12) | 1.9 (16) |
| jthaiy routine | 22.5 (194) | 23.3 (134) | 22.9 (198) |
| j3 dilemma | 13.5 (117) | 12.2 (70) | 13.4 (116) |
Gate inputs (share of gate calls that pass): e68Tick Q<=2 OFF 66 % / before 12 % / after 67 %; show70 Q<=2 41 % / 7 % / 47 %; petMonth 13 % / 10 % / 13 %.
Reviewer's count (s2+s5): show70 with a pending seen/warn plot stopped by the Q gate: OFF 50 of 202 (25 %), before 95 of 249 (38 %), after 56 of 234 (24 %).
Pre-merge runs (base b85cdb1e, 3 sens runs + q72 on, 846–864 tuần each): e68Tick 71 / 24 / 104, show70 136 / 63 / 121, seen 57 / 7 / 37,
q72Tick 40 / 18 / 46 (gate Q<=3: 62 % / 35 % / 64 %), jreign 13 / 1 / 12. rand (shard 4, ~190 tuần): show70 29 / 5 / 29, e68 23 / 2 / 11.
Counts after the gate also depend on evBusy / rolls / plots (trajectory); they move both ways between runs (seen: 57→37 before merge, 51→70
after) — within noise. The gate inputs match.
kcWeek (kcbot sens, 18 home-road lives each): OFF 471 cards / 1233 weeks (38.2 per 100), ON 427 / 1227 (34.8). Within noise.

### FAIL 2 — tables on the merged build (ee5d33de + r2)
World cards shown per buổi, mean / buổi with 3+ (sáng · trưa · chiều · tối):
| run | lives/tuần | sáng · trưa · chiều · tối | lost | late | early | page err |
|---|---|---|---|---|---|---|
| sens s3 OFF | 8/288 | 3.09 / 56.7 % · 0.44 / 0 · 0.52 / 0 · 0.47 / 0 | 0 | 0 | 0 | 0 |
| sens s3 ON r2 | 8/288 | 1.53 / 0.7 % · 1.01 / 0 · 0.96 / 0.7 % · 0.87 / 4.9 % | 0 | 0 | 0 | 0 |
| sens s2 OFF / r1 / r2 | 8/288 | sáng 3.19/54.5 % → 1.05/3.7 % → 1.60/1.0 %; tối 0.51/1.0 % → 1.10/13.5 % → 1.03/8.3 % | 0 | 0 | 0 | 0 |
| sens s5 OFF / r1 / r2 | 8/288 | sáng 3.20/58.2 % → 1.06/4.4 % → 1.62/0 %; tối 0.52/0.3 % → 1.14/12.8 % → 0.90/4.5 % | 0 | 0 | 0 | 0 |
| rand s4 OFF / r2 | 8/117 · 8/245 | sáng 1.54/19.2 % → 1.10/0 %; tối 0.20/0 → 0.60/2.4 % | 0 / 210* | 0 | 0 | 0 |
*rand "lost" = cards of lives that ended TIMEOUT: the bot is stuck on main's "Dò la: Nghe ngóng" minigame overlay (state dump: `ov` = that
minigame's intro, Q holds released cards). Not D13 (reviewer saw the same on main with D13 off); harness/bot issue for main.
sáng mean rises vs r1 (1.05 → 1.6) because the generators make their normal number of cards again; buổi with 3+ stay ≤ 1 %.
**tối 3+ (reviewer's 6–10.7 %)**: r1 12.8–13.5 % → r2 4.5–8.3 % (OFF 0–1 %). Of the sampled tối 3+ buổi (64): 54 are festival days (fixed-day
must cards "· Lời mời / · Thi / · Lễ", never dropped), the rest carry a morning card that waited the whole day (Kỳ nguyệt sự, Thỉnh bình an mạch)
or a warning/plot kept in its tuần (fix a). = open question 3 (festival-day cap), owner/coordinator call.
Other tests on the merged build: roster_audit sens 6 shard 0: 6 277 checks, (a)–(r) all 0, page err 0 (pre-merge also rand 6 shard 4: 2 249, all 0).
spread-e2e (file:// base; A 755x1000@2, 1000x755@2, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@3; B origin/main ee5d33de save → this build at
755x1000 + 1180x820; C waiting cards survive reload 1/1): PASS, 0 page errors, no overflow. coop-e2e (live Worker): 59/59 (pre-merge: 59/60 with
one 20 s friend-wait timeout, re-run 59/59). 390x844 shows the rotate prompt. Site rebuilt (index.html, sw.js, assets.json).
KIT REQUEST: none (no UI, no player-visible text).

## Review r3 (reviewer, 11/16/2026) — review/spread-events-r3
Merged onto origin/main 5682ce6f (assemble: main's list + jk95 after jk2b, j95/j95b/j95c/jqsave/jspread before jkpc). Reviewer fixes:
- j61 evGate wrapper skips k61Shown when evGate(1) is a dry sift (a face-reveal / meeting fired for cards D13 then moved to a later buổi: 4 per 108 tuần).
- jspread nextBuoi wrapper repaints when a card painted mid-change (j95b after() → inner showModal while the modal reads open) is moved by planning (painted mid-change ~4 per 290 tuần; displaced 0 measured; guard only).
Full report: dev/handover/reports/review-spread-events-r3.md (docs branch).
