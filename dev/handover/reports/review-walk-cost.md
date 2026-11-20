# REVIEW walk-cost (BIG, time rules) — reviewer for FOREMAN D #9/#10

PRIORITY #1 CHECK ('goTo|walk|khắc đi'): OD L1976 (+L205/L290/L852/L1417/L1896/L1907) | main j2.js:127 goTo("home") free | review/walk-cost 85be2440 (+ round 2 b9da8074) | claims D #9 walk-cost RUNNING.

Reviewed: review/walk-cost @ 85be2440d4bc4d40c9c8e96768864a7ec1bdac77. Round 2 (b9da8074, pushed during the review) only changes ptime.test checks 4/11 + merges main dbddaed2 (j79/j82 from mg-noword-kit) — no change to the walk code, so every item below holds for b9da8074 too.

## VERDICT: FAIL (85be2440 and b9da8074)

1. **Walk-spill dead end on the palace-room road home (regression).** j41.js:34 `accState`: `if(k!=="home"&&!walkOk(tc))` skips home, so `j77Tap("home")` (the palace-zoom room tap, jpm.js:96 `kpmEnter` → her own phối điện / palace room) calls `j77Go` → j2 `goTo("home")` silently refuses (`!walkOk`) → card «… ĐƯỜNG ĐI 2 khắc · CÒN 1 khắc … Không vào được lúc này: .» (empty reason, no «Đi (đến nơi vào buổi sau)»). Repro: at Ngự hoa viên, used = BAL.time.khac−1, home 2 khắc away, tap her room in the palace view. This is THE road home for phối điện residents (their Dư đồ home spot is the chủ vị palace → zoom → room). Breaks L852/L1417 (walk-spill, no dead end). Free on main, so new with this branch. Fix: drop the `k!=="home"` guard (walkWhy/st.walk like every place) and add this road to walk-cost.test check 3 (not only `walkGo("home")`).
2. **Shown ≠ charged: «Thôi, lui về cung»** (jagent.js:267) now pays `travel(place,home)` via walkGo but its line prints no «tốn: N khắc» (its siblings «Nghe lén», join print `tốn: ${kh} khắc`). Law 4 / L1907 (shown cost = charged cost). Print the real walk (walkGo spill included).
3. **Shown ≠ charged for phối điện residents (most early ranks).** Her home spot on Dư đồ is the chủ vị palace; its visible label prints `j77Tc + bái kiến` = «3 khắc · bái kiến» (walk 2 + greeting 1) while going to her own room charges 2 (measured: label «Cảnh Phúc 6 bóng · 3 khắc · bái kiến», room tap charged 2). Only the hover title (not seen on Fold/iPad touch) says «đi 2 khắc · bái kiến … (+1 khắc)». The room cards in the palace view print no walk cost at all. Law 4/7 + law 11 (every printed walk cost on the road home). Fix in the kit label (j77/j27 for the resident's own palace: «2 khắc» walk home, bái kiến shown as its own +1) and the room card line.
4. **Whole group (law 11), pre-existing but in the walk-cost family:** jface.js:160 «đi chậm» (`travel`+1 while punished) is dead — jclose.js:184 reassigns `travel` after it (assemble order jface 152 < jclose 198); probe: S.pen active → travel unchanged. The chip says «đi chậm» but no walk costs more (shown ≠ charged). When fixed, note jwalk's NPC pass calls the same `travel()`: her penalty would lengthen NPC rows; the penalty must be per person (p.pen), law 1.
5. **Merge with review/invite-host-away-rv 69e06387 (LAND READY):** sources merge clean (only index.html/sw.js conflict → rebuild). But merged, `invite-host-away.test` **B FAILS** («she comes home at the next khắc, the guest stayed → they meet» {t3:3, atHome:false}): the test walks home with `goTo("home")` assuming the walk is free (comment line 33); now it costs 2 and at khắc 3 of 4 goTo refuses. Whichever branch lands second must update test B (walk home = travel(place,home), via walkGo/spill or a near place so she arrives the next khắc as in OD L1976). Merged run: invite-host-away 8/9, walk-cost ALL OK, ptime2 ALL OK, ptime only check 11 (known debt).
6. **NPC deed→deed jumps (the 8 of 27):** acceptable as a follow-up for the jagday owner (needs jagday to reserve the walk between two kept rows; jwalk must not move deed khắc) — NOT a fail by itself, but it must be filed as a GAP_LIST/claims row (law 1 + 6b), not only in the worker report.

## What is right
- j2 goTo("home") = travel(place,home) (out = back, 3 places), j9 walkSpill/walkGo accept home (spill to next buổi, test 3), forced moves free (`__walkFree`: jstagehere escort, jty robbery), act-at-home unchanged (L1907).
- Maid: srvGoTo("home") charges travel(place, mistress palace) = the walk out; mistress spot shows the same (probe: vuon 2/2/2, tyv 2/2/2).
- Co-op: friend's goTo is an intent run on the host (jcoopthinf F2), same goTo → parity; coop-e2e 68/68.
- One core: BAL.walk {near, far, npc}; jkc typed `spend(1)` → BAL.walk.near; j15 typed «1-2 khắc» gone (scan: no typed walk «N khắc» left in dev/build; remaining typed «tốn: 1 khắc» are act costs in jlost/jopic/jaudit — not walks, pre-existing law-4 debt).
- NPC roster jwalk.js (BAL.walk.npc): bare far jumps on 3/21 vs off 52/53 in my run; no jwalk errors.
- ptime check 5 pin of `rcvInviteGo` is a real fix (the guest's own receiver choice, not the timing under test; same idiom as the existing `a.o=100` pin). 12 serial runs (6 main build + 6 branch, same test): check 5 never failed. Under heavy parallel CPU load I saw one check 4 and one check 5 failure (now<due by 1) — load-sensitive timing; round 2's check-4 retry covers 4; watch 5.

## Gates (85be2440, built locally, index.html = committed build except the build line)
walk-cost.test ALL OK · ptime ALL OK (5 more runs: check 11 flake only, known debt) · ptime2 ALL OK · ag-walk 10/10 · time-spill-guard PASS (46 runtime checks) · coop-e2e 68/68 · QUICKCHECK PASS (old save from live ok, core gates PASS, perf new/live render 216/217 ms, buổi 1258/1079 ms).
Shots (scratch only, not in git): Fold 755x1000 + iPad 1180x820 Dư đồ with her at Ngự hoa viên — home spot labels «2 khắc» (owner of palace) and «3 khắc · bái kiến» (resident, item 3); palace view room cards with no cost; no overflow, no page errors.

## For the worker (round 3)
Fix 1–4, update/plan test B for item 5 (coordinate with invite-host-away landing order), file item 6, final-merge current origin/main (dbddaed2 or later), re-run the gates, SẴN SÀNG KIỂM.

## Perf re-measure on round 2 b9da8074 (asked by D #9: buổi 1537 vs 1033 ms in one run)
`quickcheck.sh --runs 5` on b9da8074 vs live: QUICKCHECK PASS · median of 5 new/live: render 259/259 ms, tab 561/566 ms, **buổi 1382/1501 ms**, tasks>200ms 23/23, old save ok, core gates PASS. Earlier 3-run on 85be2440: buổi 1258/1079. Box noise is about ±20 %; no real perf drop from jwalk (it runs per khắc on rows from the current khắc on). Not a FAIL item. Verdict unchanged: FAIL (items 1–6) for b9da8074.

## ROUND 3 — WALK-COST #2 e84b3051 → VERDICT: PASS ffd22ea65efbfccb947ab9d558743e63e847cd80 (review/walk-cost-rv, FF of current origin/main 26f3bfa9)
PRIORITY #1 CHECK ('goTo|walk|khắc đi|travel'): OD L1976/L852/L1417/L1907 | main: no travel wrappers left besides the two r3 removed (jclose copy, jface wrapper) | review/walk-cost e84b3051, review/invite-host-away-rv (LANDED 713d96dc) | claims D #10 walk-cost.

Item by item (re-checked independently, own probes + tests 7–10):
1. FIXED. j41 accState + j77 state check home too → palace-room road home with 1 khắc left spills (probe 4 lives: buổi 0→1, __walkSpill {rest:1,k:"home"}, no «Không vào được» card).
2. FIXED. «Thôi, lui về cung» prints «tốn: N khắc đi đường» = travel(place,home) that walkGo charges; if the road is blocked it says so (walkBlock words).
3. FIXED. One source accWalkTxt/accWalkCost (j77): her home spot = the walk home only (probe: label «… 2 khắc» = travel 2 = charged 2 in 4 lives); palace-view hall rows (jpm, kit row kpm-rs) print «tốn: N khắc[ · bái kiến]» from the same source; the greeting appears only when accEtq applies (same function the charge uses).
4. FIXED, two-way. «đi chậm» moved into j9 travel(a,b,p) via walkSlow(p) + BAL.walk.pen (law 4); jclose wholesale copy removed (it was identical to j9's base, no weather term lost); no other travel wrapper existed on main (git grep). Probe: base 1; her penalty → her walk 2, NPC 1; NPC penalty → NPC 2, her 1. NPC callers pass the walker (jwalk walkWho, jagday d) or null (jagknow bearer road, jmen map distance).
5. FIXED. invite-host-away.test B now = OD L1976 as told: out one NEAR walk from home, walks home paying travel (asserts th === BAL.walk.near and t3 = t2 + th), guest stayed → meet. Check A's `t2>=3` became `t2>t1` + landed + wait + at home (the khắc-3 number came from the old 2-khắc vuon walk; the "arrives while she is away and waits" intent holds). Noise removal: random cards on the way take a no-khắc answer, jty dress card skipped via __tyGo, confinement cleared in the reset — test plumbing, the asserted behaviour is unchanged. 9/9.
6. FILED. FOLLOW-UP GAP (jagday deed→deed walk) in FOREMAN_D_STATUS; MAIN: GO after walk-cost lands.

Perf (D #9 ask): in-page A/B on the same build, 3× BAL.walk.npc on vs off, 12 buổi each: buổi median on 246/304/252 ms vs off 304/295/166 ms; the whole jwalk pass costs 2–4 ms per 12 buổi (~80 calls). Quickcheck buổi new/live over 4 runs: 1258/1079, 1382/1501, 1438/1254, 1084/1559 — box noise, no drop from this branch.

Gates on review/walk-cost-rv (merged LIVE ca642f9c → 15bf9c77 → 8d385f2f → 713d96dc (invite-host-away landed) → 26f3bfa9 tooling-only):
walk-cost.test ALL OK (tests 1–10) · invite-host-away 9/9 · ptime ALL OK · ptime2 ALL OK · ag-walk 10/10 · time-spill-guard PASS · coop-e2e 68/68 (one earlier run 66/68: Thái hậu pool picture between seats, image timing; re-run branch 68/68 and main 68/68) · paid-tiers 0 errors · difficulty ALL OK · kit-modal-spin PASS · mg-noword-kit PASS · QUICKCHECK PASS (old save from live ok, core gates PASS, own build) on 5189a18c; ffd22ea6 adds only main's tooling files (no game code, index.html unchanged).
Shots (scratch, not in git): Fold 755x1000 + iPad 1180x820 — Dư đồ home spot «2 khắc», palace-view rows «tốn: 2 khắc» (her room) / «tốn: 3 khắc · bái kiến» (chủ vị hall) / «tốn: 2 khắc» (chủ vị not owed a greeting); no overflow, no cut text, no page errors; rows are the kit kpm-row/kpm-rs (no private CSS).
Laws: 1 two-way (NPC/co-op/maid same rule), 4 one core (BAL.walk.near/far/npc/pen, one price source accWalkTxt), 6b NPC walks, 7 no %, 11 whole group (every walk price printer: map spot, j9 grid, kpm rows, j15, j72, jagent), L1907 act-at-home stays one cost.
Pre-existing, not this branch: «Thường tại ???» name mask in kỳ ngộ texts.
