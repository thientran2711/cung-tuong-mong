# coop-ptime-reds — LIVE co-op reds since parallel time (worker report)

Worker session_01N1tNP4mYCDDrFNfWP327T3 (opus) · depth 7 · START_CTX ≈ 3 % of 1M (rollover ≈ 28 %, ceiling 60 %); ended ≈ 22 %.
PRIORITY #1 CHECK ('sv is not defined' / 'ptime coop'): OD 0 | ledger 0 | claims 0 (row coop-ptime-reds = this session) | main 0 | review/* 0 | archive 0 — reds found by hostnull #2 (reports/coop-thin-hostnull.md '## Done'); reused: jptime PT/ptSend/ptTick, jcoopthinf F.reg intents + CX ctx, jrcv rcvAsk, the existing suites.

Branch **review/coop-ptime-reds** from LIVE origin/main 2bda29a1. Tests on a local `wrangler dev` of coop/worker (Worker as on LIVE), http://127.0.0.1:8787.
Baseline before parallel time = 9aad0c66 (first parent of 1a4df595).

## Step 0 — every red row on LIVE 2bda29a1 and the decision
| suite / row | LIVE | cause | A/B | proof |
|---|---|---|---|---|
| page error `sv is not defined` (runAct, j29 DIRTY wrapper) | f1 page errors | `const sv` block-scoped in the dirty-act `if`, used in the «qua loa» line → ReferenceError, act LOST. Solo too: any DIRTY act whose ordered servant answers half (stf2Ord). | **A** | solo probe, stf2Ord forced 'half': LIVE 17/17 DIRTY acts throw `sv is not defined`; fixed 17/17 «qua loa» line, 0 page errors |
| f1 F1 takeaway / steal | FAIL | the same ReferenceError (her act on the host) | A (same fix) | f1 F1 53/53 after |
| f1 F2 gift both ways | FAIL | jptime pushDil(giftin) delayed a co-op PLAYER's gift 2 khắc on the receiver's clock; parallel-time's own design says a player seat is NOT delayed (reports/parallel-time.md §16 line "Co-op giftin from a player … is NOT delayed") — guard `RV(f.id)===f` let the co-op entry through | **A** | probe: giftin task in the receiver's S.away due +2, item gone from the giver; after `!f.coop` the card comes at once, F2 green |
| f3 X1 / X2 gifts between the two | FAIL (base 38/38) | jptime PEND.giftpick wrapper turned her gift to the co-op friend into the servant road (item taken, no ASK) → his answer skipped (law 1); the ONE path for gifts between players = the ASK act | **A** | X1/X2 green after `v.coop` → ASK as before |
| coop-thin-d crash at the giftin card | crash | same two gift faults | A | d runs to the end |
| (hidden by the crash) d «Kết giao» guest→host: his Thân sơ row unchanged | FAIL | jrcv rcvAsk rolled the co-op FRIEND as an NPC receiver after he had tapped «Nhận» on his own card (came back «nhận lễ rồi đem chuyện đi kể») — receiver-choice, law 1 | **A** | after: his «Nhận» = the yes option, row green |
| f2 P5 invite from the guest | FAIL | (1) test: the scout row before sent her runner away → the invite button is locked (no free runner), nothing runs; (2) under parallel time the invite is an order (BAL.ptime row o khắc) + task, the answer lands at due — the old `S.invite` check is the off-switch road | **B** | probe below: order khắc +1, task `invite` in her S.away, no S.invite; lands at due once |
| (found by the P5 probe) the guest's due tasks landed ON HER PHONE | — | her «Đợi tin» / spend → ptTick ran the runner on her phone: the guest's answer roll, NPC answer (jrcv), S.where / roster writes made on her phone, then lost under the host's view (host PTIME.stat.back 0, her phone 1) | **A** | before: her phone back=1, host back=0; after: her phone 0, host +1, result in her view (P5b) |
| f1 doAct real tap | (green on LIVE by chance) | with a free servant and not together, «Dò la» is a SENT deed under parallel time (solo the same): no intent now, lands at due | **B** | new row: task harm:spy on her phone, nothing sent, lands once on the host in her context at due, no host card |
| f3 G1 (swap, 1 of 3 runs) | FAIL | receiver choice (jrcv rcvGiftIn, landed after parallel time): the consort may send the gift back → the piece stays in her bag (still ONE place, law 6c) | **B** | row stages «take» on the host for the row only; base (no jrcv) always took |
| f4 T1 «ran once» | FAIL after my first fix | my ptTickHer intent counted in F.stat.run | (mine) | ptTickHer counted apart (F.stat.ptRun); f4 19/19, swap 18/18 |
| d kit sameDom ×6 (d1/d2/d3b/d4/d5/d6) | FAIL | data-kfsp / data-kav counters differ between the two renders | pre-existing | SAME 6 on base 9aad0c66 (before parallel time) — not this job |
| e-net, cyc, p2, timer, night «A has a room» | FAIL on a local Worker | test launch had no Chromium private-network flags (coop-e2e / coop-thin-e have them) | test plumbing | same on base; flags added (no effect on the live Worker) |

## Fixes (game code) — Foreman D: jptime / jrcv edits are listed here
1. **j29** runAct DIRTY wrapper: `sv` hoisted (`let oc=null,sv=null`), the qua-loa line guards `a===S&&sv`.
2. **jcloth** (same family, found by the scan): lkcloth `ent.html` used `h0.apply(this,arguments)` inside a top-level arrow → `h0(p,file,z)`.
3. **jptime** pushDil(giftin): `!f.coop` — a co-op friend's gift is not delayed (design §16).
4. **jptime** PEND.giftpick: `v.coop` → the ASK act as before.
5. **jptime** NPC two-way gates, whole family: ptNpcSent `!a.coop`, ptMaidOut `!v.coop`, NPC illBuy `p.coop` passes through, ptNpcWire `v.coop` passes through (a player seat's sends ride HER S.away).
6. **jcoopthinf** (thin plumbing, level 6): `ptTickHer` = the ONE road for the guest's landings: an intent run on the host in her context with HER clock (ctx `used`, back `used`). Her phone never lands (ptTick on the guest = ask only when something is due, and only at her own tap moment); the ask goes AFTER the tap (setTimeout) so her act's own intent keeps the one pending slot (first try sent it in the same tick: doAct's runAct came back «busy» = lost tap — caught by f1 and fixed); 1 s re-ask while another intent is pending; on the host her landings never run inside another of her intents (they would use the host's clock). ptTickHer runs are counted in F.stat.ptRun, not F.stat.run. What lands when is unchanged (due khắc of HER clock); only WHERE it runs moved to the host.
7. **jrcv** rcvAsk: the co-op friend inside her accepted offer (COOPW.inv: he tapped «Nhận» on his own thInv card) = the yes option, never a roll.

## Tests changed (B, each with a probe row)
- coop-thin-f2 P5: free runner per row (her S.away cleared through the host store), invite = order khắc + task, no S.invite; scout khắc from BAL.ptime; **new P5b**: her invite lands at due ONCE on the host in her context (host back +1, her phone +0), «Đợi tin» on her phone brings it, the answer line reaches her phone.
- coop-thin-f1 doAct: the sent deed (pt road) = task, nothing sent, lands once on the host at due (via «Đợi tin», or her own khắc spend when the due khắc is not today), no card on the host; the immediate road keeps the old row.
- coop-thin-f3 G1: receiver «take» staged for the row only.
- launch flags for a local Worker: coop-thin-e-net, coop-cyc, coop-p2, coop-timer, coop-night.
- new **dev/test/undef-scan.js** (law 11 scan): ESLint no-undef over all.js, names set on window / under typeof / in try dropped.

### Scan table (undef-scan, all.js)
| | names undefined | unguarded real | notes |
|---|---|---|---|
| LIVE 2bda29a1 | 245 raw → 9 after the window/typeof filter | **2**: `sv` (j29), `arguments` (jcloth) | rest guarded (PIXI on demand, PLACES/J59BB/KIT_EXPR/kitTabStick in try or window-guard, PCOL/mkPart behind typeof return) |
| this branch | 243 raw → 3 known | **0** | PASS |

### Solo play of the deferred acts (Fold 755x1000, this branch): gift (servant) sent → lands at due 1, invite sent → lands 1, bribe / bribel sent deeds land 1, the 17 DIRTY acts' qua-loa road OK; **0 page errors**. LIVE: the 17 qua-loa rows throw `sv is not defined`.

## Gates (final build be1b357c, local wrangler dev)
| test | result |
|---|---|
| coop-thin-a L1 / b L4 / c L4 | 24/24 · 136/136 · 16/16 |
| coop-thin-e L5 (+swap) / e-net L6 | 33/33 · 33/33 · 20/20 |
| coop-thin-f1 L6 (+swap) | 23/23 · 22/22 |
| coop-thin-f2 L7 (+swap) | 26/26 · 26/26 |
| coop-thin-f3 L8 (+swap) | 37/37 · 38/38 (swap once X1 «no giftin after thInv» 1 of 4 runs, not reproduced in 3 reruns) |
| coop-thin-f4 L9 (+swap) | 19/19 · 18/18 |
| coop-thin-d L4 (+swap) | 46/52 · 46/52 — the 6 kit sameDom rows = base 9aad0c66 (pre-existing, not parallel time) |
| coop-cyc THIN=9 (+swap) | 73/73 · 73/73 |
| coop-e2e (+swap) / p2 / timer / night | 68/68 · 68/68 · 45/45 · 43/43 · 99/99 |
| coop-one-world seeds 1–10 | 10/10 PASS |
| ptime.test / ptime2.test | ALL OK · ALL OK |
| role-parity.test | ALL PASS |
| one-core-guard / text / text-rule / bind | PASS ×4 |
| undef-scan | PASS |
| quickcheck (old save) | PASS · open 1579 ms · old save ok · perf new/live render 229/260, buổi 1127/1623 |

## FOR B / D (report only, not decided here)
- receiver-choice family with the co-op friend as RECEIVER and no ASK card (law 1): rcvAsk kinds facFound / facJoin / facInvite / invite (jagacts3, rcvInviteGo) / rougeBorrow / call / mediate / blockf … aimed at the co-op friend are still rolled for him (only the accepted thInv offers are fixed). Needs a co-op card road (D's jrcv + B's thin D cards) — design, not a fault fix → FOR MAIN if a rule call is needed.
- the co-op thInv card has 2 answers (Nhận / Từ chối); receiver-choice's ally has 4 (Nhận / nửa lễ / trả lễ / mách) — owner rule OD ~21:15Z says every receiver gets the same 4: FOR MAIN (not decided).
- order of events on the guest: her due task now lands right after her tap's own intent (solo: inside the same spend, before the act). Same khắc, same effects; only the order of the two log lines can differ.

## Done — review/coop-ptime-reds @ be1b357c (pushed; = LIVE 2bda29a1 + fixes; index.html / sw.js / assets.json rebuilt by build_site.sh)
Commits: b2fe6908 (faults + f1/f2 tests), be1b357c (tick stat, f3 G1, launch flags, undef-scan). Shots: none (no UI change). Worktrees removed after push.

## REVIEW r1 — PASS review/coop-ptime-reds-r1 @ b3979a21 (opus BIG, session_01N1tNP5SHLVhU9jjuhFnqjA, 11/19/2026)
PRIORITY #1 CHECK: grep OWNER_DECISIONS / HANDOVER_1115_PM / PROGRESS for ptTickHer, kitNotice, F.pend busy, rcvAsk coop → no ruling against; git grep origin/main + origin/review/*: j29 sv fix also on review/runact-sv-fix 868c682c (reused verbatim, not re-made); UICAP / TH.uiPlay / kitNotice / ptOpenTin / errOpen / rcvOpen / ptOrdOpen reused (no new kit part, no new number). CLAIMS row 308 read; Foreman B = ROOT-7 (FOREMAN_B_STATUS).

Branch = be1b357c + 3 reviewer commits + merge of main 80c52782 (npc-purpose G1 #15 + manifest-floor; only index/sw/assets conflicted, rebuilt by build_site.sh). j29.js = byte-identical to 868c682c's hunk (git merge-tree with origin/review/runact-sv-fix: j29 merges clean, only the generated assets.json / index.html / sw.js conflict → rebuild).

### Checks
- (a) faults real + probe + family: undef-scan LIVE 2bda29a1 FAIL 2 (j29 `sv`, jcloth `arguments`) → branch PASS (244 names). Solo probe: LIVE «sv is not defined» ×4 on the «qua loa» runAct lines → branch 0. jptime `.coop` guards (pushDil giftin, PEND.giftpick, ptNpcWire, ptNpcSent, ptMaidOut, illBuy) are the whole family of the co-op-rival rows; jrcv rcvAsk coop → O[0] (= yes, checked for RCVK.ally). OK.
- (b) solo parallel time unchanged: the `.coop` guards are false in solo (no co-op rival); ptTickHer runs only `on()&&!host()`; ptime2 ALL OK; ptime row 5 «invite» FAILS on LIVE 2bda29a1 too (2/2 runs, random rival) = pre-existing, not this branch. No typed number (one-core ×4 PASS; the 1000 ms tick is timing only).
- (c) two-way: gifts / invites to the co-op friend go through the ASK road (rcvAsk coop branch + thInv), NPC↔seat gates guarded both ways (ptNpcWire / ptNpcSent). Leftovers below.
- (d) ptTickHer: lands once (host lands only still-due tasks, DONE dedupe by intent id → resend answered from DONE), her ctx + her `used` (never the host's clock), khắc counted once (nested ptTick in her ctx suppressed unless PTIN), reconnect/resend safe (F2 net-loss path unchanged). 4G: f2 LAG=85 CPU=4 26/26 (one run had P10/P10c red: her view after the reconnect came late under lag → P10c inherited it; rerun 26/26; P10 is not touched by this branch).
- (e) items: f3 G1/G5 gift + take staged both ways, no item lost / doubled (f3 37/37, swap 37/37); e2e 68/68 ×2.
- (f) solo deferred acts: 0 page errors on the branch (LIVE: «sv is not defined» ×4).

### Faults found by the review and fixed (commits b53fe12f, faec381d)
| # | fault | probe | before (be1b357c) | after (b3979a21) |
|---|---|---|---|---|
| R1 | her pt notices («X đã đi … về khắc …», «X đã về: có tin báo», order / rcv / errand) raised by her run on the HOST showed on the host's screen, never on hers (pt:back new with ptTickHer; pt:go already on LIVE) | zz-probe-notice (two clients, local Worker) | host: pt:go + pt:back · guest: none | host: none · guest: pt:back (+pt:go at send) · ptTickHer answered ~400 ms |
| R2 | her tap while the auto ptTickHer intent was pending was refused «busy» = tap lost in silence (f4 swap D1 red: busy 2, sent 0) | zz-probe-held (PTIME.wait then goTo 20 ms later) | busy 1, run 0, place home | held 1, goTo sent once after the tick answer, run +1, place vuon |
| R3 | f3 swap G5: receiver choice may send the piece back (R.kept) — G1 was staged, G5 not (law 11 family) | f3 swap | 37 ok + 1 FAIL | 37/37 |
Fix R1: "kitNotice" in UICAP (jcoopthin) + noteGo() remaps the notice's go-button to her own opener (pt:ord → ptOrdOpen, pt: → ptOpenTin, errand: → errOpen, rcv: → rcvOpen; none → no button). Fix R2: F.next (one held tap behind ptTickHer only; any other pending = busy as before), sent from answered() / give-up; dropped with the «not done» words on a stale room/buổi (dropP). Tests: f2 P5b asserts her notices on her phone only; f4 D1 accepts sent+held = 1; f3 G5 staged like G1.

### Gates (faec381d; merged b3979a21 re-ran one-core ×4, undef-scan, both probes, quickcheck)
| gate | result |
|---|---|
| coop-thin a / b / c | 24/24 · 136/136 · 17/17 |
| d / d swap | 46/52 · 46/52 (the 6 pre-existing kit sameDom rows) |
| e / e swap / e-net | 33/33 · 33/33 · 20/20 |
| f1 / f1 swap | 22/22 · 22/22 |
| f2 / f2 swap / f2 4G (LAG 85, CPU 4) | 27/27 · 26/26 · 26/26 (rerun; first run 25+2 P10/P10c lag flake, see d) |
| f3 / f3 swap | 37/37 · 37/37 |
| f4 / f4 swap | 18/18 · 19/19 |
| coop-cyc / swap | 73/73 · 73/73 |
| coop-e2e / swap | 68/68 · 68/68 |
| p2 / timer / night | 46/46 · 43/43 · 99/99 |
| coop-one-world seeds 1–10 | 10/10 PASS |
| role-parity.test | ALL PASS |
| ptime / ptime2 | row 5 invite FAIL (same on LIVE 2/2 = pre-existing) · ALL OK |
| one-core ×4 / undef-scan | PASS ×4 · PASS |
| Worker npm test | thin ALL OK |
| quickcheck b3979a21 (old save) | PASS · open 1493 ms · old save ok · perf new/live render 195/211, buổi 1256/1916 |

### Leftovers FOR B / D / MAIN (not a FAIL)
- (worker's, confirmed) other rcvAsk kinds aimed at the co-op friend still rolled for him (facFound / facJoin / facInvite / invite / rougeBorrow / call / mediate / blockf); thInv 2 answers vs receiver-choice 4; guest log-line order.
- notices raised in HER ctx outside a tapRun (E-step, life, world frames) are no longer shown on the host but are not shown on her phone either (jrcv rcvPend re-raise covers rcv only) — needs a pending-notice relay like rcvPend.
- each due event's auto ptTickHer briefly (~400 ms local, ~1 s on 4G) turns her act buttons off; a tap in that window is now held, not lost, but the lock is visible.
- ptime.test row 5 «invite» fails on LIVE 2bda29a1 (random rival; where ≠ home) → FOR D: fix the test's rival pick or the invite landing.
- f2 P10 (answer lost) can go red under LAG 85: her post-reconnect view arrives after the 500 ms + sync window; P10c then inherits her stale place → widen the wait or add an `until` on her place.
Shots: none (no layout change). CDN img/_review/coop-ptime-reds/: nothing made.
