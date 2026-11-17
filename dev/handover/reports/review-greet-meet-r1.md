PRIORITY #1 CHECK ('greet|chào hỏi|xưng danh|AG-MEET|approaches\('): OD 4 (17/11 05:12Z rule chosen 05:28Z, 05:25Z AG-MEET) | ledger D47 LIVE ('???' left in the person column is the kit 32.7 line, not D47) | claims GREET-MEET worker PQEB only | main 15 (j61/j24/j42/j22 sites) | review/* review/greet-meet 8862c3d6 (this job) → review/greet-meet-r1

# REVIEW greet-meet r1 (opus BIG) — **PASS 65dcf52f**

Reviewer: session_011xDdVR96B2JxbaT3UMSFAk for Foreman C ROOT-5. START_CTX ≈ 3 % (estimate), end ≈ 25 %.
Branch **review/greet-meet-r1** = review/greet-meet 8862c3d6 (already on origin/main 7e264081, no rebase needed) + 1 reviewer fix commit → **65dcf52f** (fast-forward of origin/main: checked).
Read: START_CORE / START_WORKER / START_REVIEWER, brief greet-meet.md, OD lines 1560/1561 (17/11 05:12Z / 05:25Z) in full, FOREMAN_C_STATUS orders 920/921, worker report, research note, KIT.md §32.7 (person event card "Có người đến"), jwhyn SHOW-WHY markup, VANPHONG.

## Checks
| check | result |
|---|---|
| Owner rule: lower names herself | OK — grGive "low": the higher one always learns (table test + my UI probe) |
| one-seat / public titles known at once | OK — BAL.seatCap[r]===1 (Hoàng hậu, Hoàng quý phi) + Hoàng thượng / Thái hậu; probe: "Hoàng hậu … là ngôi chỉ một người giữ, cả cung đều biết" |
| non-unique higher by trait | OK — BAL.net.n.greetName {Kiêu ngạo 0, Lạnh lùng 0, _ 1} via nv(); probe Quý phi proud → face only, warm → name |
| equals unless proud / cold | OK (both sides, each by her own nết) |
| WHY in the result line | OK — `<span class="past kwl">Vì sao: …</span>` (the live jwhyn read-out markup); the nết is named only when trKnown |
| two-way | OK — NPC↔NPC (gmTick), NPC→her (AG-MEET card, SOC face deeds, runAct ally/gift), her→NPC: same greetName |
| ONE function, every greeting site | OK — scan `grep -n "greetName(" dev/build/*.js`: j61 greet tap, j61 thỉnh an herald, SOC run, runAct, twDo thHH/thTH, j42 srvTalk wrap, j22/talkOpts man wrap, AG-MEET. j24 approaches() reused (same Q card + apHostOpts shared), no second system. jmen "min" (officials) "Chào hỏi đúng lễ" is not wrapped: officials' names are never hidden (no k61 step), so nothing to learn — not a site. |
| AG-MEET | OK — each buổi each consort present with others decides stay / approach on her own ONE deed (agUse), needs × nết; strangers base (random) weight, known by thiện cảm / oán; she can be picked (cap BAL.greet.meet.max); same person-dialog options with BAL.talk numbers mirrored (she judges); her replies = her own topicOpts entries (same formulas) or, when she is the higher one and was greeted, Xưng danh đáp lễ / Khẽ gật đầu (her choice); not every buổi / not everyone (bot). |
| ONE CORE | OK after fix (below); one-core-guard + net-inline-scan in core gates PASS |
| Kit-first | OK — "Có người đến" = KIT §32.7 person event card (registered), result box = existing popMsg box; no new CSS / frame |
| VANPHONG | OK — cổ trang, no %, "Vì sao" lines carry no digits / "???" (greet_check §3) |
| old save | OK — QUICKCHECK old save from LIVE build loads + plays a buổi; greet_check §7 (no S.gmeet) |
| co-op | OK — host only (agOn), guest gmOn false; state only (S.gmeet). coop-e2e **62/62** on 8862c3d6 and again on 65dcf52f |
| perf | gmTick p95 1.1 ms, max 2.5 ms (budget BAL.ag.perf.p95 8 ms) |

## Tests (run by me)
| test | 8862c3d6 | 65dcf52f |
|---|---|---|
| QUICKCHECK | PASS (render 223/233, buổi 810/1058 ms new/live) | PASS (run 3; run 2 failed on a 25–27 s long task that hit the LIVE build too = box noise) |
| coop-e2e | 62/62 | 62/62 |
| greet_check | 13/13 | 13/13 |
| agent / agemp / agmaid | 16/16 · 20/20 · 23/23 | 16/16 · 20/20 · 23/23 |
Note: the worker's tests need the page argument (`node dev/test/greet_check.js index.html`).

## Bot measure (mine, 160 buổi × 2 lives each, AG-MEET on vs off)
approaches ≈ 2.9 / buổi (all places); other agent deeds 2.2 / buổi on vs 2.7 off (≈ −18 %, the deed now goes to meeting); avg NPC Sủng / ranks within noise; 0 page errors. Sane. Knob if the foreman wants fewer: BAL.greet.meet.stay.

## Shots (Fold 755x1000, iPad 1180x820; scratch only, looked at, deleted)
Greeting result lines lower / higher-proud / higher-warm / equal-cold / Hoàng hậu: the result box shows the fact + "Vì sao", no overflow. "Có người đến" card (a lower stranger greets her): kit person card, figure left, 2 reply options (Xưng danh đáp lễ / Khẽ gật đầu), no overflow, 0 page errors. Worker's CDN folder img/_review/greet-meet wiped (9 objects).

## Reviewer fix (65dcf52f)
1. ONE CORE: grRank typed offsets (tq +5, mama +4, kid +3, her own mama +5) → BAL.greet.rank.tq / mama / kid; her mama rank now equals an NPC mama's (was 5 vs 4: two numbers for one rank).
2. No typed weights in AG-MEET: greet weight `×3` dropped (it is the only option when not met), `Math.max(.01,…)` → BAL.mind.pickMin.
3. gmPickT: an approacher who knows her weighs her bonds (thiện cảm / oán) even when she does not yet know the approacher's name (was: random weight).
4. Chào hỏi preview: when she is the higher one it now also says "tên ngươi: tùy tính nết ngươi có xưng danh đáp lễ hay không" (the line could end "ngươi chỉ khẽ gật đầu" without the preview saying so).

## Notes for the foreman (not blocking)
- Only consorts approach (owner said "16 người" at Ngự hoa viên: maids / eunuchs / men present do not approach yet). Worker Open 2. Owner call if wanted.
- k61Week weekly roll(35) NPC name learning and runAct `a===S → npcLearn(t,S)` (any deed she does on a consort tells that consort her name) are left as they were: not greetings.
- When she greets as the higher / equal one, her OWN nết decides her name (owner rule applied two-way); when greeted at a place she chooses with options. Kept; preview now says it.

PASS 65dcf52f
