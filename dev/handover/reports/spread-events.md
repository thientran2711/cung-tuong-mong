# review/spread-events (D13 spread events across buổi, Foreman B) — worker report
Branch **review/spread-events** @ **44c7f0741723e32cbd83abc538fb01c38533dc9d**.
**Base: built ON TOP of origin/review/schedules3 @ 9b1d82fa** (D29 ledger, Foreman C; uses its API, nothing re-invented). Does NOT contain
current origin/main (399483e3) — **based on schedules3, waits for it**; when schedules3 lands on main, merge main again (expected clean:
new file jspread.js, one line in assemble.py, one BAL line in jbal2.js, rebuilt site files).
Details: dev/PROGRESS_spread-events.md (on the branch).

## What it does (dev/build/jspread.js; wraps nextBuoi / showModal / save / render / deser / start only)
- World cards (arriving with the turn of buổi / tuần) are planned as one batch: fitting buổi by title/pid (sáng thỉnh bình an mạch,
  stipend, edicts, festival invites/rites · trưa visits, servants, quests, warnings · chiều rewards, rumours, tai mắt, gifts, contests ·
  tối banquets, plots, evening visit), cap `BAL.spread.cap` 2 per buổi, the rest carried to the next free buổi, oldest first.
- Never lost / never skipped forever: shown after `maxWait` 4 buổi even if full; warnings, plots, festival (fixed-day) cards stay in their tuần.
- Saved: waiting data cards in `S.sp13.q` (reload restores them); code cards wait ≤ `codeWait` 2 buổi and hold the autosave meanwhile
  (jqsave rule; in play only the month-start sáng).
- D29: actors placed when the card is SHOWN (j95b/j95c); before release the consort is checked in the ledger (gone ⇒ void → log line).
- j68 optional cards keep j68's own pacing (counted in the cap). Off in co-op rooms and with `window.__spreadOff`.

## Before / after (dev/measure/spread_hist.js, 64 bot lives, 36 tuần each, all origins; world cards shown per buổi)
| bots | buổi | before mean | before buổi with 3+ | after mean | after buổi with 3+ |
|---|---|---|---|---|---|
| sens (16 / 16 lives) | sáng | 3.36 | 57.6 % | 1.26 | 9.0 % |
| | trưa | 0.44 | 0.0 % | 1.40 | 0.0 % |
| | chiều | 0.58 | 1.7 % | 1.26 | 4.5 % |
| | tối | 0.54 | 1.6 % | 0.98 | 0.0 % |
| rand (16 / 16 lives) | sáng | 2.36 | 39.7 % | 0.98 | 2.8 % |
| | trưa | 0.38 | 0.0 % | 0.97 | 0.0 % |
| | chiều | 0.52 | 0.7 % | 0.77 | 0.5 % |
| | tối | 0.45 | 2.0 % | 0.66 | 0.0 % |
Busiest 5 % of buổi: 8 → 3 cards (sens), 6 → 2 (rand). Cards per tuần unchanged (4.92 → 4.91 sens). Lost 0 → 0, past limit 0,
page errors 0. Full histograms (0/1/2/3/4/5+) in the PROGRESS file.

## Tests
| test | result |
|---|---|
| spread-e2e A: 12 buổi each at 755x1000@2, 1000x755@2, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@3 (real render) | PASS, 0 page errors, no overflow, cap held |
| spread-e2e B: origin/main save → this build, 12 buổi (755x1000, 1180x820) | PASS |
| spread-e2e C: save with waiting cards → reload → same cards wait and are shown | PASS |
| roster_audit sens 6 lives (D29 + D13) | 5 519 checks, all 0 |
| coop-e2e (live Worker) | 59/59 |
| site rebuilt (index.html, sw.js, assets.json) | done |

## KIT REQUEST
None (no UI, no player-visible text).

## Owner / coordinator questions
1. D13 is off in co-op (like the D29 ledger). Turn it on when the ledger joins the co-op world (D21)?
2. j68's older rule still drops some optional cards (cooldown / its hold of 4 full: 613→621 sens, unchanged by D13). Recommend: keep the
   cooldown, send "hold full" drops to the D13 queue so no optional card is ever lost. Decide?
3. Festival days still show 3–5 cards across sáng–trưa (fixed-day cards). Higher cap for festival days, or fine?

SẴN SÀNG KIỂM 44c7f0741723e32cbd83abc538fb01c38533dc9d (based on schedules3, waits for it)
