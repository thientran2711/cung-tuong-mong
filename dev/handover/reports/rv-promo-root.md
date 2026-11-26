# rv-promo-root — PASS 8169d9da

PRIORITY #1 CHECK: OD grep «bỏ quên|forget|grace|ân hạn» = 0 rulings on «Bị bỏ quên» (only unrelated text hits); OD 25/11 ~23:52Z WHOLE BALANCE PASS (realistic road to Hoàng hậu in ONE life) is the nearest ruling | main 5e013076 j3.js:158 (forget line, no grace), j14.js:8 restore | review/* review/promo-root (this), review/balance-pace (stacked on 1623b417) | claims: worker PROMO-ROOT session_01V1ZZGzXMYdRFgHB23g5qvC; no other reviewer.

Reviewer: RV-PROMO-ROOT (BIG review, game rule change), for MAIN CHÍNH 148. Read: START_CORE (18 laws) + START_WORKER + START_REVIEWER, reports/promo-root.md, diff 5e013076..8169d9da.

**PASS sha 8169d9da** (parent 1623b417 → parent 5e013076 = origin/main right now: fast-forward). No merge or fix by me.

## 1. Root claim — reproduced on LIVE 5e013076
Same deterministic test (dev/test/promo-root.js, real monthTick) run on the LIVE build:
| check | LIVE 5e013076 | branch 8169d9da |
|---|---|---|
| đại xá in monthTick → still free after the month | BAD (re-sent same month) | ok |
| restore() → free for the grace months | 0 free | 6/6 |
| after the grace, Sủng 0 + Danh 0 at rank 0 → forgotten | ok | ok |
| newcomer free in her first months | 0 free | 6/6 |
| newcomer after the grace → forgotten | ok | ok |
| page errors | 0 | 0 |
Code read confirms it: j3 monthTick runs coldMonth (releases) BEFORE the forget line, and restore() leaves rank 0 with Sủng/Danh as in lãnh cung → the same monthTick sends her back. Root is real.

## 2. Fix correctness
- One exit: every lãnh cung release goes through j14 restore() (grep: all `S.out=0` writes = restore, kc/kc2 palace entry, jagacts:71 exception fallback only). restore sets `S.forgetAt=S.turn+1+forgetGrace`.
- Timing (S.turn = months, ++ at the top of monthTick): release in a buổi at turn T → ticks T+1…T+6 safe, T+7 may fire; release inside a monthTick at T → same tick + T+1…T+6 safe. Newcomer: first tick turn 1 → forgetAt 7 → 6 months. Same 6 months on every road.
- Palace entry from other lives: servant (srvEndTurn) and khuê phòng (kcMonth) lives never call monthTick, so forgetAt is first set on the first palace month → a girl raised to Đáp ứng / entering from home also gets the grace. Good.
- Law 4: the only balance number (6) is BAL.danhG.forgetGrace beside forget; the `+1` is the month offset, not a balance number. Test reads BAL.
- Old saves: ser()/deser() save S whole → forgetAt persists; an old save without it gets one grace (set on its first month). quickcheck «old save» from LIVE loads + plays a buổi, 0 errors.
- Co-op: forgetAt lives in each seat's own S; nothing shared; coop-e2e 143/143.
- Build: dev/site/build_site.sh on 8169d9da reproduces index.html/sw.js/assets.json (only the CTM_BI build line differs).

## 3. Laws
| law | result |
|---|---|
| 1 two-way | **FLAG for owner (not a FAIL):** «Bị bỏ quên» stays player-only — NPC consorts with Sủng 0 / Danh ≤ 5 are never sent to lãnh cung by it (grep: no NPC twin). Pre-existing, not made worse. Worker options D1 (leave) / D2 (same line + same grace for NPCs). Owner decides (law 16). |
| 2 equal-value / 3 gain-and-loss | no choice added or changed — n/a |
| 4 one core | PASS (BAL.danhG.forgetGrace) |
| 5 harder as she climbs | not touched (rule only at rank ≤ 1) |
| 6 real world | not touched; the rule still fires after the grace (test 4/5) |
| 7 / VANPHONG | PASS: no new player-visible word (only code comments) |
| 9–12 UI / kit | n/a: no UI |
| 11 whole family | PASS: fixed at restore() (the one exit of all release roads) + the one forget line |
| 16 working rule | FLAG: the newcomer 6-month grace changes WHEN the rule can fire (it was month 1). The release-undo part is a plain bug. MAIN should tell the owner in one line (fits her 25/11 ~23:52Z «realistic road in ONE life» order). |

## 4. Gates (run by me, this box)
| gate | 8169d9da | LIVE 5e013076 | verdict |
|---|---|---|---|
| dev/test/promo-root.js | PASS 6/6 | 3 BAD | fixed |
| coop-e2e (alone) | 143/143 | — | PASS |
| promo-exam (755x1000) | 16/17 | 16/17, same FAIL row («result frame: rounds, Tứ đức, tài nghệ, bar, verdict») | = LIVE |
| promo-rules (755x1000) | 15/16 | 15/16, same FAIL row (NPC servants exam pass 60 / fail 0) | = LIVE |
| promo-skip | 10 ok / 3 FAIL | same 3 rows | = LIVE |
| quickcheck core gates | only G4 FAIL «Ô lưu → Lui close button did not close its layer» (fold) | **same G4 FAIL** (button-crawl --fast on LIVE via local http, run by me) | pre-existing |
| quickcheck time-spill / open / old save | PASS / 1948 ms 0 err / ok | — | PASS |
| quickcheck perf median 3 | FAIL buổi 3899/2076 | — | noise, see below |
| quickcheck perf median 11 | FAIL buổi 3816/1730 (render 253/252, tab 573/557, tasks 26/26) | — | noise, see below |
**Perf note:** buổi time is bimodal on BOTH builds (11 runs, sorted: new 1397…1796 ×3, 3003…4825 ×8; live 1403…1925 ×8, 4654…6287 ×3) — which mode depends on the random life. Probe (12 fresh lives, the perf flow): monthTick and restore are called **0 times** in the timed first buổi, so the changed code cannot be on the timed path. Not this fix. (Worker's own median of 11 passed 1871/1989.) Suggest Foreman/tools: seed the perf lives so both builds time the same life.

## 5. Nits (non-blocking)
- jagacts.js:71 pardon fallback `catch(e){S.out=false;S.confined=0}` frees her without restore() → no forgetAt (only when restore throws). Could set it there too.
- Report side findings stand on their own (srvMerit crash for a consort, harness OFFER_RE «phong» false positives, «Công lao 11/10») → MAIN to file.

## 6. BALANCE-PACE (not reviewed)
review/balance-pace head is now **0790fe46** (brief said 5a2e507d; 0790fe46 is one commit on top). It is stacked on **1623b417** (the code commit), not on 8169d9da; 8169d9da only adds dev/handover/reports/promo-root.md, which balance-pace does not touch → `git merge-tree 8169d9da origin/review/balance-pace` clean. Both 5a2e507d and 0790fe46 keep forgetGrace / forgetAt (jbal2 1, j3 3, j14 1, index.html built with it).

~96% xong / ~90% chơi được
