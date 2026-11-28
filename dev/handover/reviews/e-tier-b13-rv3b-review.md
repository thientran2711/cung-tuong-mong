# E-TIER-B13-RV3B — BIG review of review/e-tier-b13 batch 3b (delta 31f91836..e3c1f982) — **FAIL** (5 fixes)
depth 4 · START_CTX ≈ 3 % (used_tokens read 0; own estimate) · reviewer E-TIER-B13-RV3B session_01DgYSWpnmuF9tYPent3ayoL for FOREMAN E C12
PRIORITY #1 CHECK ('tier.prep|Hầu chuyện|Ghi tên dâng|night1|vnight|j71x|rivalNight'): OD 27/11 ~00:46Z law 2 + FOREMAN E C11 rulings 28/11 10:25Z / 11:48Z | main LIVE 8a1a71de (old 5-way prep j75, 4-topic night1, 3× «Ghi tên dâng») | review/* e-tier-b13 e3c1f982 (scope), e-tier-b13-rv3-m 48a33cb7 (batch 3 merge, RV3) | claims E-TIER-B13c done, no other reviewer on 3b.
KIT CHECK: reuses the kit event frame / VIỆC card hand + kit option cards (kitRiskOpt odds word, Tốn/Được rows); no UI part added or changed (dev/kit/KIT_CHECKLIST.md). kit-std-scan on the merge: total 6 (X06 4 · X08 2) = the batch-3b report's figure, baseline file 28.

## Merge (step 0) — review/e-tier-b13-rv3b-m **3806760f** = LIVE 8a1a71de merged into e3c1f982
- Conflicts: index.html + sw.js (built-only, rebuilt with dev/site/build_site.sh), assets.json = LIVE (identical after the build).
- ONE SOURCE conflict: dev/test/emotion-acts-2.js — LIVE's STALE-TESTS-7 (MOODKNOW: mood set through the causes; punish months from punishMonths) vs the branch's one-tap «Hầu chuyện» checks. Resolved: pillow = LIVE setup + branch check; plock = branch check (same setup); punish + oldsave = LIVE. With it emotion-acts-2 on the merge fails only «kinds», which LIVE fails too.
- `git merge-tree` of 3806760f onto review/e-tier-b13-rv3-m 48a33cb7 = index.html + sw.js only (built files) → the lander can stack both.
- After quickcheck's rebuild the only index.html difference is the build line window.CTM_BI (built ✓).

## Gates (merge 3806760f unless said; A/B = same script on LIVE 8a1a71de)
| check | result |
|---|---|
| tier-b13-b3b (worker gate) | ALL PASS on e3c1f982 and on the merge |
| MUTANT A: jewellery +jb only on NHẸ | gate FAILS ✓ |
| MUTANT C: Điểm trang reads TP.bac[2] | gate FAILS ✓ |
| MUTANT B: BAL.tier.prep.bac = [0,15,5] (ladder no longer rising) | gate **PASSES** ✗ → fix 5 |
| j71x best-art probe (odds forced per art, 6 cases) | the chosen art is the best one every time; tutor shows only when it lifts the word ✓ (the gate's own j71x cases all read odds 5/5/5, so they never exercised the pick) |
| one-core-guard / -text / -bind / -text-rule / -khac | PASS (merge); guard/text/bind/text-rule PASS on e3c1f982 |
| time-spill | PASS (merge and e3c1f982) |
| quickcheck step 2 (old save from LIVE, perf) | **PASS** · open 2329 ms · old save ok · render 233/259 · tab 558/487 · buổi 1353/3598 ms |
| old save with a PENDING card (own probe: LIVE save → new build) | prep (LIVE 5 ways) → 4 ways, every way taps → night1 ✓; night1 + vnight (4 topics) → ONE «Hầu chuyện», tap → night2, log names the topic ✓; j71x: the pending card is not restored after deser on LIVE→LIVE either (same probe) → not branch-born; 0 page errors |
| G2 rules-one-source / G3 kit-conform / G4 hooks | PASS: webkit-syntax/boot, odds-cap, coop-one-world, mk-layer, manifest, npc-purpose, dialog-fixed, dead-card, look-dedupe, next-dead, noise-hygiene |
| q-softlock A/B ×2 | merge PASS · FAIL(2) ; LIVE PASS · FAIL(4) — same «view parked by a tab change» case, LIVE fails more → shared flake, not branch-born |
| press-keep A/B | under gate load the merge failed 1–2 different spots per run (iPad «Tuyển chọn» kveil; Fold option card 1/2); alone ×2: merge PASS PASS, LIVE PASS PASS, e3c1f982 PASS PASS → load flake |
| button-crawl | under gate load: 600 s cap, crawler crashed (page closed, 0 dead) — same as the worker saw; **alone: PASS** (82 taps, 0 faults, 0 dead) |
| emotion-acts-2 (Fold) | 31f91836: kinds/pillow/plock/oldsave FAIL · e3c1f982: kinds/pillow/punish/oldsave FAIL · LIVE: kinds/plock FAIL · **merge: kinds only** (= LIVE). The worker's «pre-existing» claim holds: the old-base fails are the stale tests LIVE fixed (STALE-TESTS-7), now in the merge |
| law 12 shots Fold 755×1000 + iPad 1180×820 (outside git, looked 3×) | night prep 4 cards (Để mộc · Điểm trang Bạc 5 · Tập trước Cầm Sức 5 · Tắm Bạc 15; body line «Trang sức ta đang đeo thêm được ưa +3 ở mọi cách»); «Hầu chuyện» one card (Rất vững · Tốn không · Thành đêm vui, Sủng +); j71x «Ghi tên dâng hát» + «Dâng hát, bỏ bạc mời thầy kèm trước» (Hiểm, Bạc 30) + «Không dự». No horizontal overflow, no page scroll, 0 page errors; the Fold card hand is narrower than LIVE's (4 cards vs 5) |

## Law scan (real text on the cards)
- Law 2 C46 «Hầu chuyện»: ONE way = the topic with the best grade od after every night1 wrapper (jemoact mood band moves od; locked Rót rượu never picked) ✓; the log names it («Hầu chuyện: Rót rượu, nũng nịu.») and the card's ! line says «hợp ý ngài nhất: …» ✓.
- Law 2 C48: Không dự · Ghi tên dâng <best art> · + mời thầy kèm (bạc, only when it lifts the word) ✓.
- Law 2 C45: bạc 0/5/15 and q 1/2/3 rise together ✓ — BUT the VỪA Sức road does not match VỪA → fix 1.
- Law 3: jewellery +jb on every tier (mutant A proves the gate holds it) ✓; no cost-only way (Để mộc gives Sức) ✓.
- Law 1: NPC ladder misses the VỪA rung → fix 2. NPC with no worn piece → jb 0: ACCEPTABLE as the worker's TICKET (law 6c world-data gap: the code path is symmetric, wearBonus(v) reads her own chest; filling NPC wardrobes is content, not this branch).
- Law 4: BAL.tier.prep is the only new key ✓; but the +jb formula is now typed in two places and the NPC road types 40 / 30 → fix 3.
- Law 7: no %, odds via word() / BAL.odds.cut ✓; cổ trang words ✓.
- Law 14: the old night-talk topics are gone from the card ✓; the old prep design is still in source → fix 4.

## FAIL — fix list (new commits on review/e-tier-b13, then re-merge LIVE)
1. **Law 2 — «Tập trước <art>» is not a VỪA road.** j75.js PEND.prep: thành = được ưa +(1+lv) (q 2+lv), lv = her best art level (≥1, up to 5). From lv 2 a success out-gives NẶNG «Tắm» (+2) for only Sức 5 (probe: lv 2 → +3, the gate's own run shows q 4 > Tắm 3; at lv 5 → +6). The ruling names it «the Sức road of VỪA», so its result must sit on the VỪA rung: thành = được ưa +(TP.q[1]−1) (= Điểm trang), hỏng = NHẸ (TP.q[0]−1), cost TP.suc; odds stay. Update the x line, the log and the NPC road (rivalNight) the same way, and add it to the gate (thành result == VỪA result for any lv).
2. **Law 1 — NPC rivalNight has no VỪA rung.** j75.js:155: an NPC either pays TP.bac[2] (NẶNG) or takes the Sức road or nothing; with bạc between TP.bac[1] and TP.bac[2] she cannot take Điểm trang (probe: NPC with 10 bạc → Sức road). Add the VỪA rung (TP.bac[1] → TP.q[1]) between NẶNG and the Sức road, and give NHẸ the same Sức gain as hers (BAL.eff.j75.sucFx) when she takes nothing. Gate: an NPC at each bạc band lands on the same rung as her card.
3. **Law 4 — one number, one place.** The jewellery bonus `jb = js>0 ? max(2, 1+round(js/3)) : 0` is typed in PEND.prep AND copied into rivalNight; make one helper (e.g. `prepJb(p)`) reading new BAL.tier.prep keys for 2 / 1 / 3, used by both. rivalNight's Sức road also types `40` (= BAL.odb.j75.odOP, which her card reads) and `30` (Sức floor): read BAL (odOP + a new BAL.tier.prep key for the floor).
4. **Law 14 — the old prep design is still there.** j8.js:389–393 holds the old 4-way PEND.prep (Tắm bạc −10, Điểm trang, Tập trước suc −5, Để mộc), dead at runtime (j75 overwrites PEND.prep) but a second version in source with typed numbers. Delete it (keep nothing that reads it; grep first).
5. **Gate gap.** tier-b13-b3b compares the card to BAL.tier.prep, so a BAL ladder that no longer rises (mutant B: bac [0,15,5]) still PASSES. Add: bac and q strictly rising NHẸ < VỪA < NẶNG; Tập trước cost == TP.suc and its thành == the VỪA result (fix 1); NPC rungs (fix 2). Also make the j71x cases really move the odds per art (today all read 5/5/5).

## Not failed (notes)
- C53 vlget KEEP agreed (different costs/results).
- The «Hầu chuyện» card row shows «Sủng +» without the number (kit card row compaction; the full x line has «Sủng +6, Ân tình +9»): the same kit row as every one-way VIỆC card on LIVE — not this branch.
- After the fixes: re-merge LIVE, rerun tier-b13-b3b + mutants A/B/C, quickcheck, emotion-acts-2, law 12 shots of the prep card.
