PASS 7d4638380a80b60d07c3c260207906fbd69b4637

Branch review/seatcap-r1 (ancestor: origin/main 0ee35a63; first PASS 57af6ff3 on e9c6021d, re-merged when main moved: scan unchanged, 2-life sim 0 over). Reviewer session_01DgYSWoAxb67pTNnGiGEUTw. START_CTX ≈ 4 % of 1M; end ≈ 10 %, no rollover needed.

# REVIEW review/seatcap-r1 (reviewer opus, game rules/numbers, for Foreman D)
Result: PASS. Base: review/seatcap @48e5a9c7 merged onto origin/main e9c6021d (only conflicts: assemble.py file list + built index.html/sw.js;
resolved = main's list + jseat.js last, site rebuilt with dev/site/build_site.sh). No code change by the reviewer; added dev/test/seatcap-scan.py.

## Whole-family scan (LUẬT SỬA CẢ NHÓM): dev/test/seatcap-scan.py = every rank write in dev/build/j*.js (71 hits) on the merged tree
| road | where | goes through the seat rule? |
|---|---|---|
| promotion (her + NPC monthly, exam pass) | j8 promoteP ← j3 promote, j8 rivalsMonth, jexam exDone | yes: promoReqP has the j30 seat-free row (contest bypass __seatPick only after seatHas) |
| seat contest / single candidate | j34 contestOpen/contestEnd | yes: seatHas first, full → seatComp |
| grace exam / son direct rank | jexam exGraceUp / exDirectUp via promoReward | yes (promo-skip-r1, on main) |
| Hoàng hậu by decree / outsider queen | j8:409-410, j34:53, jbal:43 | only when the seat is empty (queenP() null) |
| demotion, punish, fall, father executed, story drops, reign purge | j30 demote, j8 punish/fall, j4, j67, jreign | yes: seatDown |
| out of lãnh cung | j14 restore, j72 letter | yes: seatDown, Hoàng hậu only if seat empty; NPC pardons → rank 0 (no cap) |
| entry exam ceiling | jkc kcEnter (≤2) | yes: seatDown |
| death / vacancy | holders() = consorts() (alive, not out) | seat frees itself |
| co-op guest / friend | jcoopworld:77/100/118 | guest net off (host decides); friend never pushed out (see note) |
| new life / roster / debug | j2 start (BAL.ps.harem), j99succ succDebug | seatSettle on start; debug only |
New main modules since 18fb8252 (jmort, jroute, jcycle, jorigins, jeitem…) write no rank: 0 hits.
ONE CORE: BAL.seatCap === SEATCAP (same object), no second literal.

## Tests re-run by the reviewer (built root index.html; dev/index.html alone does not boot, use the site file)
| test | result |
|---|---|
| seatcap-sim idle, 21 lives × 120 months (lives 0-20, all 9 origins) | max holders 3:5 4:4 5:2 6:1 7:1 · 0 over-cap months · tracer hits only one-statement artefacts (seatPut queen flag, j14 pardon out→rank0) |
| seatcap-oldsave (save from origin/main build, rank 6 ×3, 5 ×4) | settled on load 6→1, 5→2, she kept her rank, 4 NPCs moved with Bạc +700 + phong hiệu, 24 months 0 over, 0 errors |
| coop-e2e (live Worker) | run 1: 59/60 (FAIL "fold #next enabled … Chờ hảo hữu" timing right after rebirth; next check "week after rebirth advances" ok) · run 2: 59/59 → flake, not this branch |
| 6 viewports 755x1000@2, 1000x755, 1180x820@2, 1366x1024, 844x390, 390x844 | 0 page errors, no horizontal overflow; branch has no UI/kit change |
| VANPHONG | new texts ("ghế … đã đủ người, lui về …", "thắng, nhưng ghế … đã có người ngồi trước") cổ trang, no %, no numbers typed |
Active smart bot not re-run (worker: 2 lives / 281 months 0 over; ~29 min/life).

## Notes (non-blocking)
1. Co-op: a friend Hoàng hậu enters as rank ≤6 (jcoopworld:77); if she and the friend both sit at a cap-1 rank the net cannot move either (only NPCs move). Already passed to the coop-b1b5-p2 worker as a co-op rule question.
2. j8 son-birth fallback `rank++` (j8:321) runs only if promoReward is missing (it never is).
