# charge-followups — ONE BIG REVIEW (opus, session_01D3E3NYHtvnZpVmMEJ5xy5z, depth 4, START_CTX ~6 %)

PRIORITY #1 CHECK ('tịch thu|bồi bạc|Mua chuộc|Trình Hoàng hậu'): OD 1 | ledger 0 | claims 2 (D1+D4 row = worker session_01D3E3NZG2LWTwaYMqBjHCPL) | main 15 | review/* 0 | archive 0 (from the order; reused jil / jagstaff / jcharge as the worker did — no second system).

## VERDICT
- **BIG PASS review/charge-followups-rv 2a2538b3** (= d1981654 + one small fix, finding F1). d1981654 alone: FAIL only on F1.
- **D4 MERGE DELTA PASS acd6932d**.

## Findings
| # | kind | finding | status |
|---|---|---|---|
| F1 | law 6c / real economy (fixed) | `chUhPay` paid each victim `BAL.charge.uhPay` whatever the guilty one held: her Bạc floors at 0 in `apply` (victims got 20 each while she paid less = bạc made from nothing); an NPC went below 0. | FIXED on -rv 2a2538b3: she pays `min(uhPay, bạc held)` per victim in deed order; victims get exactly what was paid; the row names each amount («bồi 20 lượng bạc cho A, 10 lượng bạc cho B»). 2 new checks in charge-followups.js (NPC and her short of bạc). |
| O1 | open (worker flagged) | Player-as-servant life (S.srv.spyFor) is not dismissed by an NPC's proven Mua chuộc. | Foreman D / sếp decision; not a blocker. |
| O2 | pre-existing, outside step 3 | A successful «Trình Hoàng hậu» still applies the generic `punish(t,…,1)`, not `chPunish` of the proven charge; odds now read `chReady` (first ready charge in order), like Tố giác. | Route to D4 owner if the punishment should follow the charge. |
| O3 | test tooling | charge-taps.js `*-her-notice.png` is captured at a moment another dialog is on top (Fold: Chứng cứ panel; iPad: «Có người bán tin»); the notice rows are proven by the SUMMARY text, and the worker's fold-notice.png / ipad-notice.png show them. | Cosmetic for the test; no game fault. |
| O4 | pre-existing art load | In the worker's Fold video the «Sai cung nữ đi dò la» dialog shows her grey silhouette placeholder in several frames (iPad shows the art). Not touched by this diff. | Note only. |

## Law check (laws the diff touches)
- Law 1 two-way: chPunish extras run the same for her and every NPC (tests both directions: NPC→NPC, her guilty, her the victim, her servant bought). PASS.
- Law 2/3: no new choice added. n/a.
- Law 4 one core: `BAL.charge.uhPay`, `mcFire`, `trinh{base,affD,per}`; texts print the constant/amount. Typed numbers left in touched lines (`roll(10)`, `-40`, `:5`) are pre-existing. PASS.
- Law 6a/6b: deed records the real servant (`d.s`) and palace (`d.o`); dismissal through jagstaff `asOut("expel")`. PASS.
- Law 6c REAL OBJECTS: one road `ilSeize`/`vpSeize` on jil, no second system. Roads I ran myself beyond the worker's probe (forced «thành», then census): chPunish vp with a Vượt phẩm WD outfit (tram+y) → her and NPC: both pieces at nvp, net 0; wdAccuse WD over-outfit S→NPC / NPC→S: nvp, net 0; wdAccuse with veil (mc80) + over-rank jewellery (jdress dropJ) S→NPC: 4/4 pieces nvp, net 0. jveil veil confiscation and j92 WD slots are routed by the `ilGuard("wdAccuse")` wrapper (jveil wraps before jil); jdress dropJ / jshelf shelfVpAccuse use ilFilter "conf"; rivalsMonth Hoàng hậu conf and agent hh:conf (hhAct) call ilSeize inside the guard (`ilAt` stops a double entry). seize-scan: seize_unrouted 0. PASS.
- Law 7 wording: «Bồi thường», «Người hầu bị mua», «… nhận bạc mua chuộc, bị đuổi khỏi cung», «bồi N lượng bạc cho …» — cổ trang, no %. PASS.
- Law 9 kit: rows go through kit `punRows` (notice panel); no new CSS/frame. Screens checked (worker fold-notice.png, ipad-notice.png; my contact sheets of both videos, 3×). PASS.
- Law 11 whole family: seize-scan covers every «tịch thu / thu hồi / sung công / bị thu lại» site (50); other «× total pieces» odds listed by the worker as evidence uses (not by-charge accusations). PASS.

## D4 MERGE DELTA (1e0b8ccb → acd6932d)
- Files not touched by D1/D4 are byte-identical to LIVE 6b5d3d05 (j23 j5 j83 j85 jbal jbalcore jkc jkc2 jrcp jtabs jtd jtds, balance-core/pace, paid-tiers).
- 3-way files carry LIVE's change exactly: j3 forgetAt gate, j42 srvRise forgetSafe, jbal2 forgetGrace + balance-pace gain/les.
- j14 restore keeps D1 cold-stay (coldPend wait) + one-rank pardon AND calls forgetSafe(S) on the real release (the deferred release reruns restore → forgetSafe then); one `forgetSafe` definition. jagacts pardon: coldStayOk gate kept, catch fallback adds forgetSafe(S). promo-root.js serves the stay before restore. PASS.

## Tests (my sparse worktree, bash dev/site/build_site.sh)
| test | d1981654 | 2a2538b3 |
|---|---|---|
| coop-e2e.js (live Worker) | 143/143 | 143/143 |
| coop-famops-unit.js | 58/58 | — (jcharge only) |
| charge-followups.js | ALL PASS | ALL PASS (+2 short-of-bạc checks) |
| seize-ledger.js | 11/11 | 11/11 |
| seize-scan.py | unrouted 0 | unrouted 0 |
| charge-smoke.js | PASS, 0 errors | PASS |
| charge-scan.py | all 0 | all 0 |
| punish-scan.py | npc_zero 0 | — |
| punish-reason.js 755x1000 / 1180x820 | ALL PASS / ALL PASS | — (rows unchanged) |
| cold-faction.js | 20/20 | — |
| promo-root.js | PASS | — |
| charge-taps.js Fold / iPad | PASS, 0 errors, «BỒI THƯỜNG bồi 20 lượng bạc cho …» | PASS, same row |
| extra probe (WD outfit / veil / jewellery roads) | all nvp, net 0 | — |
Videos fold-755x1000.webm + ipad-1180x820.webm + fold-notice.png + ipad-notice.png looked at 3× (contact sheets): accusation by real taps, kit notice rows, no cut text, no overflow.
CDN review folder img/_review/charge-followups NOT wiped: the wipe command was refused by this session's permission guard; the coordinator wipes it (python3 dev/site/cdn_sync.py --wipe-review charge-followups). Scratch shots deleted.

## DELTA REVIEW (d) — f9fa2cef → 0b36b274 (dev/build + dev/test only)
Reviewer: session_01D3E3Na2v51UwPKzkqtqpLq (opus), depth 4, START_CTX ~3 %.
PRIORITY #1 CHECK: OD 0 | main jtruth DEEDW typed table (parked by the D4 DELTA reviewer) | review/charge-followups-rv f9fa2cef BIG PASS | claims D1+D4 worker session_01D3E3NZG2LWTwaYMqBjHCPL.
**VERDICT: DELTA PASS review/charge-followups-rv 0b36b274** (no fixes needed; this commit adds only this section).

Equality (scripted on the built page, Playwright, `deedW` / `DEEDW` / `BAL.charge` at runtime):
| check | result |
|---|---|
| `Object.keys(BAL.charge.actW)` == old typed DEEDW key set (35 keys) | equal; `DEEDW === BAL.charge.actW` (alias) |
| every old DEEDW value vs `deedW(k)` and `DEEDW[k]` | 35/35 equal |
| every old call-site literal vs `deedW(kind)` (flirt, sbribe×5, sthreat, cyfake, cylie, cyforge, mlframe, mlbeat, mlhframe, mangift, tryst×3, pm, il, vp, xx, plot×3, old, illbuy, caught) | all equal (1 / 2 as before) |
| key overlap actW ∩ w (would shadow) | none |
| `BAL.charge.deed` kinds in neither actW nor w | story, mlpoison, ls — weights are passed at the call (`n`, `BAL.mline.poisonW`, `BAL.preT.lsW`), never typed; a falsy weight falls back to `w.plot`=1 = old `||1`. Nit only. |
| default when a caller omits w: old `DEEDW[k]||1`, new `deedW(k)` | differs only for tryst/pm/caught/old (1→2); grep: no call site omits w for those kinds (runAct passes DEEDW[k], mlCaught/story/ls pass their own) → no behaviour change |

Law 4 / whole family: `grep` over dev/build/j*.js for typed weights at deedAdd/deedOnce/cyDeed/mlCaught, `{k:…,w:N}` deed literals, `d.w=N`, `.dw+=N` → 0 hits. charge-scan.py deed_literal_w 24 (f9fa2cef) → 0 (0b36b274); other families at 0b36b274 all 0 (total_need 2 / miss_lie 5 at f9fa2cef were fixed earlier in the branch, not by this delta).
j8.js:98 «Hoàng thượng nhân từ»: `p.out=true` before `p.coldR=coldRankIn(p)`. coldRankIn → punFromToday → punTwice (punWk) / rkOf (rank/queen): none reads p.out → identical value. npc-purpose-scan at f9fa2cef: `FAIL j8.js:89 done-text not found`; at 0b36b274: PASS (419 rows).

Tests (own sparse worktree, `bash dev/site/build_site.sh` rc 0; rebuild differs from the committed index.html only in the build-info line):
| test | result |
|---|---|
| coop-e2e.js (co-op first) | run 1: 142/143 (FAIL after rejoin: `S.fidUsed.78` A=undefined B="maid:m13", maid-face id, unrelated to deed weights); run 2: **143/143 PASS**, 0 page errors fold/ipad/solo. Flaky item noted for the coop-host-lag family owner. |
| charge-scan.py / with ref f9fa2cef | all 0 / deed_literal_w 24 |
| charge-smoke.js | PASS, 0 page errors |
| charge-followups.js | ALL PASS, 0 page errors |
| npc-purpose-scan.js | PASS (419 rows) |
| punish-reason.js 755 1000 | ALL PASS, 0 page errors |
No UI change in the delta → no screenshots taken.
