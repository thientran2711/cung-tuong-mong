# thancan — CUNG NỮ THÂN CẬN (worker opus, session_01N1tNP6BaLDPk6fvMeWW8hf; START_CTX ~8 %)
PRIORITY #1 CHECK: OD 4 (L2051 owner design verbatim, L1211, L1783, L1901) | ledger 0 | claims: art THANCAN at Foreman C (keys not named yet, FOREMAN_C_STATUS L578) | main 15 (j95s q.close, j68g «Thăng làm người thân cận», j67 story text) | review/* 0 — REUSED q.close (j95s) and the j68g event; no second system.
Branch **review/thancan** = **6a9a01c0** (from LIVE 983a9436; main unchanged at report time).

## What
- `dev/build/jtc.js` (new, last module before the co-op thin parts): master.thc = sid of a staff maid or `m:<name>` (her personal maid). **No thân cận at the start of a life** (start wrapper; newRival marks new masters).
  ONE function `thcSet(master, maid|null)` for her and every NPC master (two-way). Stale pointer (maid sold / dead / gone / out of rung range) reads as none and is cleared.
- Person card (j15, kit `pbtn` act card, own group «Thân cận») on her personal maid and every maid of hers: «Chọn làm cung nữ thân cận» (greyed with the reason: chỉ cung nữ tam đẳng đến nhất đẳng / chưa đủ tin (lòng cần BAL.loy.trust) / cần N bạc) and, on the chosen one, «Thôi làm cung nữ thân cận». Eunuchs: no button.
- Gain–loss (law 3, numbers `BAL.thc` in jbal2.js, law 4): choose = her lòng +10 | Bạc -30 (uniform sewn) + every other maid of the house lòng -3 (envy); dismiss = others lòng +2 | the dismissed lòng -15. Trust bar = BAL.loy.trust (70). Rungs = BAL.thc.rk [1,3] (tam/nhị/nhất đẳng, owner's words).
- q.close REUSED: j95s `j95sClose` = the chosen thân cận (was: personal maid always). So she serves ×closeServe, follows first, «cung nữ thân cận … không rảnh» — now about the chosen one. Same for Thái hậu's household. Player entourage picker preselects the chosen one. Record labels (j95): «Cung nữ thân cận của …» vs «Cung nữ thân tín của …»; card / stage title via kitMaidTitle → «Cung nữ thân cận tam đẳng».
- NPC masters (law 1, 6b): monthly world pass `thcNpcAll` (monthTick, host only via worldOn): every living consort, Hoàng hậu, Thái hậu with none picks her most loyal trusted maid at BAL.thc.npc.p (25 in 100) a month; lets one go under lòng BAL.thc.npc.drop (45). Same thcSet, same costs.
- j68g event «Thăng làm người thân cận»: a maid who meets the bar now really becomes her thân cận through thcSet.
- LOOK slot (kit figure, j88 f88Best wrapper): a thân cận wears the record of her identity whose `tier` = her look key; not painted → her usual maid dress (never empty); uniform records never stand in for an ordinary maid dress.
  **Proposed art keys for Foreman C (THANCAN batch):** `maid-thancan-<master>-t<tier>` with master = `th` (Thái hậu, t9) · `hh` (Hoàng hậu, t8) · `p<palace slot>` (the chủ vị's palace of her house: p0…p7) ; tier = master rank + 1 (t1…t8; same cut, embroidery richer with tier). Stored as a FIGURES-servants.json record of the maid identity with `"tier":"maid-thancan-p3-t5"` (same shape as t1..t8 records). Keys can be renamed in ONE place (thcLookKey) if C names them differently.
- Co-op: guest tap = intent `thcPick` (jcoopthinf F.reg, level 6) run on the host; one world, both seats read the same master.thc.
- Old saves: a master without `thcV` keeps her personal maid as thân cận (she was the close maid before) — deser wrapper; new consorts are never migrated.
- Name clash found + avoided: `BAL.tc` / `k.tc` = children's tâm cơ (j53) → everything here is `thc`.

## Tests (all on 6a9a01c0 or its build)
| test | result |
|---|---|
| dev/test/thancan.test.js (T1 none at start · T2 card button + tap + costs + record close + label · T3 refusals · T4 replace/dismiss · T5 stale · T6 NPC 10/10 consorts + Thái hậu pick, low lòng let go · T7 look slot worn only while thân cận · T8 old save) | PASS 3 lives |
| live-servants.test.js (T2/T3 now set the personal maid as thân cận first — semantic change by owner rule) | PASS |
| quickcheck.sh (build, coregates incl. one-core-guard, old save from LIVE, perf) | PASS (render 207/178 ms, tab 377/443, buổi 1128/998, tasks>200ms 18/22) |
| one-core-guard | PASS |
| undef-scan | PASS |
| role-parity.test (2 exemptions added: NPC side = monthly thcNpcAll, same thcSet) | ALL PASS |
| coop-e2e ×2 | 68/68 ok ×2 |
| outside/coop-home | 51/51 ok |
| old-save load | PASS (quickcheck + T8) |

## LOOK shots (CDN, Fold 755x1000@2 + iPad 1180x820@2, looked)
https://ctm-img.victoria-tntt.workers.dev/img/_review/thancan/card-choose-755x1000.webp · card-choose-1180x820.webp · card-chosen-755x1000.webp · card-chosen-1180x820.webp
(script: dev/test/thancan-shots.js). Choose = kit act card Tốn Bạc -30 / Được nàng ta +10 / Kèm cung nữ khác -3; chosen = title «Cung nữ thân cận tam đẳng» on card + stage, «Thôi làm…» card. Note: the kit parser shows servant lòng as «thiện cảm» on cards (existing kit behaviour).

## Scan (law 11) — `sh dev/test/thancan-scan.sh [ref]`
| place | before (main) | after |
|---|---|---|
| j95s houses close (consorts / her) | kind mm = close always | chosen thân cận (j95sClose) |
| j95s Thái hậu household | close:false | chosen thân cận |
| j95s player picker preselect + role text | personal maid | chosen thân cận |
| j95 record labels | «Cung nữ thân tín của» / «Cung nữ của» | «…thân cận của» for the chosen one |
| kitMaidTitle (card / stage) | «Cung nữ thân tín …» | «Cung nữ thân cận …» while chosen |
| j68g «Thăng làm người thân cận» | loyalty only | real thcSet when eligible |
| j95.js legacy rows (BAL.slv.on=0 only) | mm follows | unchanged (off switch for measuring) |
| j67 / jnrask story text «người thân cận» | NPC / Emperor's people, prose | unchanged (not this system) |

## Open / for Foreman B
- Art: empty slot until C paints; send C the key proposal above (C asked in FOREMAN_C_STATUS L578).
- KIT: no new kit part (pbtn act card + pcard group). KIT.md not edited (kit keeper's file); if the keeper wants the look-key rule written in KIT figure section, one line: "thân cận look key maid-thancan-<master>-t<tier>, jtc thcLookKey".
