# BIG REVIEW — review/srv-rank 0211c65d (D-SRV-RANK) — 26/11 ~13:30Z

PRIORITY #1 CHECK ('srv.rk|maid rank|spOutgrown|srvCap'): OD 5 | ledger 1 | claims 8 | main 15 | review/* 0 | archive 0 — main j42.js:288-289 srvMonth cap gate (srvMax / exSrvGate), j14 srkMax (OD:L1149), jpromsv spGoTo/spAsk (AG-ALL-2 G6); no other branch owns the fix.

Reviewer: opus big reviewer (session_01D3E3NZdAKYGauFt2CWWGEV). Code diff 1dcb373e..d45adb93 -- dev/build; 0211c65d = d45adb93 + merge LIVE aa37de21 (FF from origin/main aa37de21: yes).

## VERDICT: FAIL (1 blocking finding; 3 non-blocking)

## Runs (reviewer, own build of 0211c65d via bash dev/site/build_site.sh, served file://)
| check | result |
|---|---|
| node dev/test/srv-rank.js branch (with LIVE old save) | 15/15 PASS |
| node dev/test/srv-rank.js LIVE | 10/13 (FAIL: spOutgrown, ask OPEN for trusted outgrown maid, NPC parity) = the bug, as reported |
| node dev/test/ag-stf2.js branch | ALL 23 PASS (12 tuần consort: leave let/demote/keep 167/145/88) |
| one-core-guard (OC_BUILD=dev/build) | PASS, fails 0, inline 3100 ≤ baseline 3592 |
| reviewer probe: household table (2 consort lives, 7 + 24 months, every buổi: hhHas ≤ capOf for every consort) | 0 overflows |
| reviewer probe: co-op friend proxy as top palace | **spUpTo returns the friend proxy** (finding 1) |
| 4 videos (frames looked at) | LIVE: card greyed «Chủ tin dưới 60 mới dám xin», tap nothing, both devices. Branch: card open → KẾT QUẢ «… cho ta đi. Ta về hầu Hoàng hậu …» → iPad next month «Khảo hạch Nội vụ phủ». OK |

## Laws
- ROOT: right. At the cap (srkMax, OD:L1149) mp clamps to need (j42:290), «Xin chủ tiến cử» locks at the cap, the only own road was locked for Chủ tin ≥ leaveLoyal. Other exits checked: no master → srvTalk empty (no ask, srvMax = nhất đẳng, not this bug); Tân Giả khố pauses Công lao only while lau > 0; exSrvGate only gates rk < cap; ma ma age is late by design. Complete.
- 1 two-way: OK — one spOutgrown for the maid player (j42 srvTalk) and every NPC servant (jagstf2 asOpts «leave»); the player consort's own servants reach her card spLeaveCard with the swap line.
- 2/3: OK — the ask: gain = higher house, loss = demote risk / cooldown; the three answers keep their gain+loss lines; only weights move (letW/demW in BAL).
- 4: OK — BAL.srvCap {open,u,letW,demW}; lock text prints BAL.sp.leaveLoyal; guard PASS.
- 5: untouched ((rk+1)×BAL.srvMp per rung; exam gate after the move).
- 6b: OK for NPC houses — swap keeps both houses inside BAL.promo.cap (code: +1/−1 each side; probe 0 overflows); the swapped servant is a real staff member, spSwapOf skips coop. **Broken for co-op, finding 1.**
- 7: OK — «… hoặc đủ công lao ở bậc cao nhất cung này cho phép», «X bên ấy sang hầu ngươi thay» (wording nit in finding 2).
- 9: OK — no new UI; one more kem line in the existing tsOpt.
- 11: scan dev/measure/srv-rank-scan.js covers her / NPC maid / NPC eunuch × 4 states; it misses the destination family (finding 1).
- Old saves: no new saved field (S.srv.lvCd, s.lvCd pre-exist); OLD SAVE rows PASS.
- Co-op: NPC asks run in the agent loop (asOpts, `!s.coop`), the friend maid is skipped; **destination not guarded (finding 1)**.

## Findings
1. **BLOCKING — co-op: the outgrown destination can be the co-op partner's proxy entry.** dev/build/jpromsv.js spUpTo (new, line 60): `liveRivals(true).filter(v=>v!==o&&!v.out&&…)` has no `!v.coop`. The friend entry (jcoopworld buildFriend: `{id:<pid>,coop:true,rank,staff:[]}`) sits in `rivals` during the day (pullFriend only around endTurn). spUpTo sorts by rank, so when the partner is the highest consort (e.g. she is Hoàng hậu — the co-op goal) every outgrown maid's destination IS the partner. Reviewer probe (branch build, NPC queen demoted, friend {coop:true, queen, rank 7}): `spUpTo(o,s)` → "Bạn", `spOutgrown` true. Failure scenario: co-op room, partner = Hoàng hậu, host or guest is a trusted maid at her cap → the new open «Xin chủ cho đi hầu cung khác» → master «Cho đi» → `srvReassign(…, friendProxy)` → S.srv.mid = partner pid → jcoopthinb.js:101 mistressOk() is false (mistress must be `!m.coop && id<900`) → jcoopthinb.js:110 `S.srv=null; srvInit()` = her whole servant life (rung, Công lao) is wiped; for an NPC servant spMove pushes her into the proxy's staff[] (never synced, npcW drops coop) = a real person vanishes (law 6b). LIVE has the same hole in spGoTo (jpromsv.js:45) but only for a low-trust maid; the branch opens it for every trusted maid and makes it the FIRST pick.
   FIX (law 11, the destination family, one filter): add `!v.coop` to spUpTo AND spGoTo (jpromsv.js:45) AND srvReassign's pool `L` (j42.js:309); check j14.js:74 sale dice `consorts().find(…)` the same way (runs in the world month, add the guard anyway). Add a gate row to dev/test/srv-rank.js: a coop friend proxy as the top palace is never returned by spUpTo/spGoTo/srvReassign.
2. Non-blocking — lock text claims a met condition. j42.js:181 (lock of the card at :180): a trusted maid at her cap with full Công lao but NO palace above with a higher cap (spUpTo null, e.g. master rank 4–6 and nobody at rank ≥ 7) sees «Chủ tin dưới 60 mới dám xin, hoặc đủ công lao ở bậc cao nhất cung này cho phép» while she meets the second half. Suggest: when og-conditions hold but spUpTo is null → «Chưa cung nào cao hơn cần người».
3. Non-blocking — «(bên X còn chỗ)» (j42.js:180) is printed for the maid player's spUpTo destination even when X's maid seats are full (she is no seat of the table, correct by rule, but the words say room). Suggest «bên X cần người» or drop «còn chỗ» for her.
4. Non-blocking — spAsk fallback with the agent loop off (jpromsv.js:75) still uses spGoTo, so with BAL.ag.on = 0 an NPC servant never goes UP and never asks when outgrown (spMonth asks only on pride + low loyalty) while the maid player can (law 1 in the loop-off mode). Use `spOutgrown(o,s)?spUpTo(o,s):spGoTo(o,s)` there (and the swap) for parity.

## For the worker
Fix 1 (+ gate row), optionally 2–4; rebuild; re-run srv-rank.js (branch 16/16 incl. co-op row), ag-stf2, one-core guard, coop-e2e + quickcheck; one short re-review (small: the filter + test row).

## DELTA RE-REVIEW 0211c65d..8559fea2 (26/11 ~13:45Z) — VERDICT: PASS 8559fea2
PRIORITY #1 CHECK: same as above (no new topic; delta only).
8559fea2 is FF from LIVE origin/main aa37de21 (checked). Delta = dev/build j14/j42/jagwhyg2a/jpromsv + test row + rebuild.
| finding | fix | check |
|---|---|---|
| 1 BLOCKING co-op destination | `!v.coop` in spUpTo, spGoTo (jpromsv), srvReassign pool (j42:309), j14:74 sale-dice buyer, srvBuy buyers (jagwhyg2a) — whole destination family | reviewer probe (friend proxy = top palace, 2 consort lives 23–24 months): spUpTo now returns an NPC palace («Chung Nghê Thường», «Tào Liên Y»), never the proxy; household table 0 overflows; gate row CO-OP PASS |
| 2 lock text | «Chưa có cung nào cao hơn nhận người bậc ngươi» when at cap + full Công lao and still locked (= no higher palace) | read: shown only when og is false at the cap with full Công lao; cổ trang OK |
| 3 «còn chỗ» | outgrown ask reads «(sang hầu X, cung cao hơn cho ngươi lên bậc)» | OK |
| 4 loop-off parity | spAsk loop-off path: og ? spUpTo + swap : spGoTo | OK (same swap guard as «Cho đi») |
Runs (reviewer build of 8559fea2): srv-rank.js 16/16 PASS · ag-stf2 ALL 23 PASS · one-core guard PASS (inline 3100 ≤ 3592).
Worker's coop-e2e + quickcheck on 8559fea2 were still rerunning when this was written (0211c65d: coop-e2e 143/143; quickcheck only LIVE-identical rows): coordinator FFs main only once those land green in reports/srv-rank.md.
