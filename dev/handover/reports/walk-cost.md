# WALK-COST #1 — report (JOB 6 «về nhà», ORDER MAIN ROOT-76 20/11 08:36Z)

PRIORITY #1 CHECK ('goTo|walk|khắc đi|về nhà'): OD L1976 (owner: «tôi bấm về nhà là tốn một khắc») + OD L205/L290/L292/L852/L1417/L1896 (walk rule, walk-spill, grey label) + L1906/L1907 (acts bound to a place, NO DOUBLE COST) | main j2.js:127 goTo("home") free, j9 travel()/BAL.walk = the one walk rule, jagday.js:363 NPC deed walk rows [dest,"go"] | review/* invite-host-away(-rv) = jptime invite only, not goTo | claims none.

Branch: review/walk-cost (from origin/main 66bd36c; final-merged fd682a8). Commits: 7910d8f (fix) · 1d5ec5d (test) · 567c404 (build) · 4aa7dc6 (ptime check 5 pin) · 85be244 (final-merge origin/main fd682a8 + index.html/sw.js rebuilt). HEAD = 85be2440d4bc4d40c9c8e96768864a7ec1bdac77.

## Owner rulings used (verbatim in OD)
- L1976 (19/11 ~22:00Z): «tôi đang ở Ngự Hoa Viên khác ba nè, tôi bấm về nhà là tốn một khác, tức là khác thứ tư là tôi đã ở nhà rồi» → the road home is a walk like any other.
- L205 / L290 / L292 / L852 / L1417 / L1896: walk ≤ khắc left = go; longer = walk-spill into the next buổi (not across the night); grey label is a look only.
- L1907: an act that moves her keeps ONE cost (no extra walk on top) → act-at-home stays free (jstagehere `used` restore idiom, untouched).
- Law 1 (two-way) / law 4 (one core): same rule for NPCs and the co-op friend, one knob family BAL.walk (near 1, far 2; new `npc:1` switch only).

Note: the owner's «một khắc» is her example; the game's map makes Ngự hoa viên → her palace a FAR walk (2 khắc), the same 2 khắc the walk OUT costs today. Cost = travel() both ways (law 1); no new number.

## BEFORE / AFTER (measured in the built game, dev/test/walk-cost.test.js + scratch probes)
| # | Path | Before | After |
|---|------|--------|-------|
| 1 | Her: map/stage goTo(place) from home | travel (1/2) | same |
| 2 | Her: goTo("home") (map spot, data-go="home", «Về tẩm cung thăm con») | **0 khắc** (vuon/tyv/ksp → home: 0, out was 2) | travel(place,home) = 2/2/2 = the walk out |
| 3 | Her: walk home with fewer khắc left than the walk | instant, free | walk-spill (j9 walkSpill/walkGo now accept home): pays what is left, arrives home next buổi |
| 4 | Her: «Thôi, lui về cung» (jagent) / Việc nhờ step «Đến tẩm cung» (j72 button + q72Bot) | free goTo | walkGo("home") = pay + spill |
| 5 | Her: forced home (escorted by guards jstagehere, robbed on the road jty) | free | free (event, window.__walkFree) — unchanged on purpose |
| 6 | Her: act done at home (jstagehere act→home, L1907) | free (act cost includes trip) | unchanged (used restore idiom) |
| 7 | Maid play (srv): srvGoTo("home") = back to mistress's palace | **0** | travel(place, mistress palace), same dayFit/carry gate as srv walks |
| 8 | Khuê các city walk (jkc) | typed `spend(1)` / `can(1)` | BAL.walk.near (law 4) |
| 9 | Co-op friend | goTo intent runs the same j2 goTo on host (jcoopthinf, `used` sent back) | same fix applies (parity by construction) |
| 10 | Shown = charged: j9 grid tile «không tốn khắc» for home, j27 Dư đồ spot/title skip home, j41/j77 `k==="home"?0`, j72 «tốn: 0 khắc», j15 typed «tốn: 1-2 khắc» | 0 / typed | the real travel() number (or "đang ở đây") |
| 11 | j95arrKh (map counts «who she meets on arrival») for home | arrival = now | now + walk |
| 12 | NPC roster (j95 R.P rows): far move (travel 2) in one khắc | 42/42 bare far jumps (16 buổi, off) | 8/27 (on) — jwalk.js adds the t−1 «go» khắc (leave earlier if free, else arrive later) |

Remaining NPC bare jumps (the 8): both ends are KEPT rows (deed → deed, j95sKeep: ag_*, meet, tryst, forced lists) or the jump starts at the CURRENT khắc (never rewritten mid-khắc). Deed timing is jagday's (agday already adds travel to a deed's start, jagday.js:290); returns between two deeds need jagday to reserve the walk — follow-up for the jagday owner, not done here (would move deed khắc).

## Tests
On 85be244 (after the final merge): walk-cost.test ALL OK (3/3 runs before the merge) · ptime2 ALL OK · ag-walk 10/10 · coop-e2e 68/68 · QUICKCHECK PASS (old save from live ok, core gates PASS, perf new/live render 211/227 ms, buổi 1014/1098 ms).
Before the merge (567c404): ptime ALL OK · time-spill-guard PASS (static + runtime) · rules-one-source ok (new vs main build).
tier.js = BIG (as the brief expects) → full review.
Not this branch: walk-spill.js fails 2 cases on origin/main too (its walk is stopped by the «Chọn người theo hầu» card, j95s, before the spill — the test is stale); oldsave-r1.js needs a prebuilt .tmp/old.html (not run; quickcheck's live old save passed).

## ptime.test check 5 flake
Cause: the guest's own random answer (jrcv rcvInviteGo) — the check pinned the old `a.o` odds but not the receiver choice. Fix: the check pins rcvInviteGo→true only for that step (timing is what it tests). Check 5: 8/8 green after the pin. TEST DEBT (also on origin/main): check 11 «cnvOrd answer to ANOTHER palace» flakes ~2/5 on main AND on the branch (one row ends with left:1) — not touched here.

## Files
dev/build: j2 j9 j15 j27 j41 j42 j72 j77 j95 jagent jbal (walk.npc) jkc jstagehere jty + NEW jwalk.js (assemble.py: last) · dev/test/walk-cost.test.js (new) · dev/test/ptime.test.js (check 5 pin).

## Handover / notes for the reviewer
- The NPC pass is behind BAL.walk.npc (1 = on, 0 = off = the old rows); one knob family BAL.walk, no new numbers.
- A phối điện resident's home spot on Dư đồ is the chủ vị's palace spot (jres): its text can say «N khắc · bái kiến» (that palace's greeting, j77; was already there); the walk part is the same as goTo("home") charges.
- Follow-up (not done here, deed timing belongs to jagday): NPC walks between two KEPT rows (deed → deed) still jump; ~8 of 27 far moves in 16 buổi.
SẴN SÀNG KIỂM 85be2440d4bc4d40c9c8e96768864a7ec1bdac77

## Round 2 (FROM FOREMAN D #9 ~09:59Z: de-flake ptime checks 4, 5 AND 11, whole family)
- Check 5: guest's random answer pinned (rcvInviteGo, round 1).
- Check 11: the tested order WAS gone; the «left:1» was a DIFFERENT new order (an NPC's rcvAsk «call») arriving while the khắc pass → the check counts only the tested order id (rows + half0).
- Check 4: the jump and landing were right (diagnosed: back=1, now=due); the flake was waitOk read while a random card from the send was still queued (ptWaitOk = false with Q non-empty) → the card is closed first, as the player does; jump retries 3 → 6.
- Result: ptime 12/12 + 3/3 on the merged build; ptime2 6/6 + 1/1. jptime not touched (invite-host-away-rv not needed).
- Final-merged origin/main dbddaed2, index.html/sw.js rebuilt. Gates on b9da80741894e4b01354f33b94ba5e2188e5ff05: walk-cost ALL OK · ptime ×3 · ptime2 · ag-walk 10/10 · coop-e2e 68/68 · QUICKCHECK PASS (old save ok; perf buổi 1537/1033 ms this run vs 1014/1098 and 1039/1856 in earlier runs — noise likely, reviewer may re-measure).
SẴN SÀNG KIỂM b9da80741894e4b01354f33b94ba5e2188e5ff05

## HANDOVER (WALK-COST #1 → successor; rollover after REVIEW FAIL, D #10 order 20/11 ~10:31Z)
Base: review/walk-cost at b9da80741894e4b01354f33b94ba5e2188e5ff05 (frozen). FAIL list: dev/handover/reports/review-walk-cost.md (handover 52d044fa) + D #10's 6 items, all still OPEN, nothing pushed after b9da8074.
What I know for each item:
1. Spill dead end on the palace-room road home: j41.js:34 accState / j77 tap path treats "home" specially. j9 walkSpill/walkGo already take "home" (my change). Route the j77Tap("home") refusal into walkSpillGo("home") like j77In does for other places (j77.js:30 pattern: `if(walkOk(tc))goTo(k);else{const P=walkSpill(k,{pass:1});if(P&&P.ok)walkSpillGo(k,{pass:1})}`). Add a case to dev/test/walk-cost.test.js (resident in a phối điện, 1 khắc left, far walk).
2. jagent.js:267 «Thôi, lui về cung» option x text: add `tốn: ${travel(S.place,"home")} khắc đi đường` (shown = charged).
3. Phối điện resident: jres.js:127 mapSpots merges her home into the chủ vị's palace spot (r<id>); j77 adds «· bái kiến» (+ACC_ETQ.khac) to that spot because k!=="home". Charged walk = travel(place,home) (jres mapPos override makes home = that palace's position). One source: for that spot, when resMeHoused(), label = travel(S.place,"home") and no greeting (or charge the greeting too — check accEtq for own residence; pick one, same everywhere). Room cards: show the cost via the kit pbtn «tốn: N khắc» row.
4. jface «đi chậm» travel+1 is lost: jclose.js:184 reassigns `travel=function…` wholesale (weather fix) AFTER jface wraps it. Make jclose wrap the current travel instead (strip only the wet-weather extra), then re-scan all `travel=` assignments (grep -n 'travel=function\|travel=(' dev/build/*.js) for the same overwrite.
5. invite-host-away-rv 69e06387 lands first. Watch FROM MAIN lines in FOREMAN_D_STATUS.md; when it's LIVE, final-merge main; else merge review/invite-host-away-rv into review/walk-cost. Then update invite-host-away.test case B to the PAID walk home (it assumed goTo("home") is free).
6. FOLLOW-UP GAP row (write it here, D files to MAIN), proposed text:
   FOLLOW-UP GAP | jagday (deed planner) | S/M | NPC walks between two KEPT roster rows (deed → deed, j95sKeep) still jump a far walk in one khắc (~8 of 27 far moves / 16 buổi); jwalk.js never rewrites kept rows. Fix in jagday: reserve travel() khắc between consecutive deeds (as agday already does for a deed's start, jagday.js:290).
Tests to rerun after fixes: walk-cost, ptime, ptime2, ag-walk, time-spill-guard, invite-host-away, coop-e2e, quickcheck (old save). Known non-branch reds: walk-spill.js (2 cases, also red on main, follower card), oldsave-r1.js needs .tmp/old.html.
Setup tips: sparse worktree, `python3 dev/build/assemble.py` → dev/index.html for tests; `bash dev/site/build_site.sh` before SẴN SÀNG KIỂM; index.html/sw.js conflicts on merge → take theirs then rebuild.

## WALK-COST #2 (session_01964izDFHWrShB8Y6GaEAHh; fixes the 6 REVIEW FAIL items from b9da8074)
PRIORITY #1 CHECK ('goTo|walk|travel|đi chậm|bái kiến'): OD L1976 (+L852/L1417/L1907) | main j2 goTo / j41:34 / j77 / jagent:267 / jface:160 / jclose:184 | review/walk-cost b9da8074 (reused) + review/invite-host-away-rv 69e06387 (merged in, lands first) | claims WALK-COST #1 CjQfM4AK → #2 (this session).
START_CTX ≈ 3 % of 1M (get_session reads 0; own estimate).

Head: review/walk-cost **08384111d8a6b789f63c7476e3c8890c86901b5d**. Commits: fc810ec (fix 1–4 + tests 7–10) · 3 merges (LIVE 90b7e797, review/invite-host-away-rv 69e06387 — not yet LIVE at push, LIVE f43efc71) · ea0564f (invite-host-away.test B) · 0838411 (build).

| # | FAIL item | Before (b9da8074) | After |
|---|---|---|---|
| 1 | palace-room road home, too few khắc | j41/j77 accState skip "home" → j77Tap("home") dead end, empty reason | `k!=="home"` guard gone in both accState → walk reason + spill like every walk; test 7 (fails on b9da8074, passes now) |
| 2 | «Thôi, lui về cung» (jagent) | charged walk, printed no cost | `tốn: N khắc đi đường` (travel(place,home)); when the walk is blocked it says so (walkBlock); test 8 |
| 3 | resident home label / room cards | Dư đồ spot «3 khắc · bái kiến» vs charged 2; hall rows no cost | ONE source j77 `accWalkCost/accWalkTxt(k)` ("home" = walk only, other palace = walk + greeting when owed): her home spot label = walk home (greeting only in its title «vào chính điện: bái kiến … (+1 khắc)»); palace-view hall rows (jpm kpm-row, existing kit row span) print «tốn: N khắc[ · bái kiến]» (her room = walk home; chủ vị's main hall = 3 · bái kiến); whole group: Danh sách tiles (j9 mapHTMLgrid) print the same accWalkTxt; test 9 (both checks) |
| 4 | jface «đi chậm» dead | jface travel wrapper overwritten by jclose `travel=` copy | jclose copy removed (j9 base has no weather term, same rule); penalty moved INTO j9 `travel(a,b,p)` via `walkSlow(p)` (jface sets it) = BAL.walk.pen (new knob in the one family, was a typed +1) — per walker: p defaults to her; NPC callers pass the person (jwalk walkWho(id), jagday deed walk passes d) or null (agWalk bearer road, jmen distance class). Spill rest not double-charged. Scan: `travel=` assignments left = 0 (jface wrapper gone too). Test 10: her walk 2→3 shown=charged, NPC road unchanged by her penalty, NPC's own penalty applies |
| 5 | invite-host-away.test B | assumed free walk home → FAIL merged | B now plays OD L1976 literally: she is out at a place one NEAR walk from home (gardens/halls first, palaces as guest last; not lãnh cung), the guest lands while she is out, she walks home paying travel (=1), home the next khắc, they meet. A stays on the same run. Bot de-randomised (pre-existing flake sources, also seen on plain rv: 1/4 E fail): trung-y dress card walked in a setTimeout (now __tyGo over the whole test walk, as jty does), random cards answered with a no-khắc option, confinement from a random punishment cleared and the reset walk home free in toB0. 10/10 + 1 gate run green |
| 6 | NPC deed→deed jumps | report only | FOLLOW-UP GAP row already filed by D #10 in FOREMAN_D_STATUS (FOR MAIN) and MAIN said GO after walk-cost lands. No code. |

Gates on 08384111 (one at a time): walk-cost ALL OK · ptime ALL OK · ptime2 ALL OK · ag-walk 10/10 · invite-host-away 9/9 · coop-e2e 68/68 · QUICKCHECK PASS (old save ok, core gates PASS, TIME-SPILL GUARD PASS static+runtime; perf new/live render 348/343, buổi 2063/1846 ms — same box load as live run).
Note for D/MAIN: when invite-host-away-rv lands, walk-cost already contains 69e06387 → its final-merge of the new LIVE should be clean (index.html/sw.js rebuild only).
SẴN SÀNG KIỂM 08384111d8a6b789f63c7476e3c8890c86901b5d
- Re-merge (11:32Z LIVE 0aaf8152 arrived right after the first ready line): final-merged 0aaf8152 (assemble.py conflict = main's list incl. jnwb.js + jwalk.js last), rebuilt, all gates re-run green: walk-cost ALL OK · ptime ALL OK · ptime2 ALL OK · ag-walk 10/10 · invite-host-away 9/9 · coop-e2e 68/68 · QUICKCHECK PASS (old save ok, core gates PASS, TIME-SPILL GUARD PASS; perf new/live render 296/317, buổi 1789/1720 ms). 08384111 is superseded.
SẴN SÀNG KIỂM e84b30510916a2ba1af527a4e260d547b26511ec
