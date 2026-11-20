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
