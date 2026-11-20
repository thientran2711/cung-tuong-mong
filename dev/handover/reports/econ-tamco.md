# econ-tamco — ECONOMY §5 Tâm cơ cost + paid safety (GAP OR21, FOREMAN D #9 JOB 4)

PRIORITY #1 CHECK ('Tâm cơ|tamco|thuê người'): OD 21 (L325 "low ranks have silver-free paths (khắc, Tâm cơ, favours)") | ledger 1 (#146 header only) | main: ECONOMY.md:58 «Chưa làm»; jecon.js §5 (schemeRk/selfMinus/spyk/bribel/blockf), "thuê người" only as flavour text in j70 | review/* 0 | claims none.

Branch: review/econ-tamco @ e4727333a849eb8571ad6b3830e2ac74415893cd (from origin/main f482b35-era LIVE 30e8714e).

## What was built (dev/build/jtamco.js, after jecon.js)
Every priced scheme (ACT[k].__c0, 13 acts: spy poison bribe block musk catswap lygian slowpoison xinhh huydung giahoa rash laydo) now has 3 roads:
| road | cost | gain |
|---|---|---|
| Làm như thường | jecon §5 price (as before) | shown odds (as before) |
| Hao tâm cơ, tự mình sắp đặt | Tâm cơ −tc (the stat really drops → later schemes lose odds) | odds +BAL.road.up (12) |
| Thuê người làm thay | bạc −hire on top of the price | odds +BAL.road.up (12) |
- Law 2 (equal value): tc = max(tcMin, round(price × share / rate)), hire = tc × rate. ONE rate, BAL.road.rate = 10 bạc per Tâm cơ (the arc table's rate: {bac:-30} ⇔ {tamco:3}). Both roads give the same odds.
- Law 3: every road has a cost and a gain. Law 4: all numbers in BAL.road {rate 10, share .5, tcMin 1, up 12, npcP 50, npcKeep 30, npcTcMin 25}.
- Law 1: NPCs pick a road inside the act itself (econRoadNpc: spare silver ≥ price+hire+npcKeep → hire; Tâm cơ ≥ tc+npcTcMin → plot it herself; each at npcP), with the same costs and the same +up (aOdd wrapper, NPC-only; her rolls use the frozen shown odds).
- Her choice: doAct (j8) of a priced scheme opens the kit dilemma card PEND.roadpick (same card as «Cài đồ vào rương»; ✕ closes). The odds shown on each option = the odds rolled (fzRun).
- Law 11 one-core fix found on the way: jwhy.js ACT.spy.f charged a flat 15 bạc while the card printed the jecon §5 price (e.g. 20 against a higher rank). It now charges actBac("spy"). The test scans all 13 priced acts: printed price = charged price (0 mismatches).

## Tests
- dev/test/econ-tamco.test.js (Fold 755x1000@2 + iPad 1180x820@2): PASS. Covers equal value for every scheme × rival, the card (4 options, no %, in view, no overflow), each road charges what it prints and rolls the odds it prints, NPC roads (e.g. 150 NPC acts: tc 40 / hire 24 / plain 86), the price scan, and no page errors.
- quickcheck.sh e4727333: see the line at the end of FOREMAN_D_STATUS (it was still running when this report was written).
- NOT run yet: the bot measure for early death / HH share with roads on (ECONOMY §5 says re-measure when tuning). Needed before landing: `OUT=dir bash dev/measure/run5e.sh` before/after.

## ⛔ KIT REQUEST (blocks a clean card; law 9, not hacked)
The kit option card's «Tốn» row does not show a Tâm cơ cost. Neither fx {tamco:-n} nor a labelled x line "tốn: Tâm cơ -n" reaches it; the row prints "không". This is the same open request as FOREMAN_B_STATUS:376 (road-b2, 18:57Z: "option-card «Tốn» row hides costs in tamco/duc/danh/sung"). Also needed: the «Làm như thường» road should print the scheme price in Tốn, but that price is paid by the act (bribe/block pay on success), not by fx. The engine charges correctly; only the card hides it. Kit keeper: let the Tốn row take a cost that is not paid by fx (e.g. option field `ton:{tamco:-4}` / `ton:{bac:-86}`). Once that exists, jtamco.js PEND.roadpick swaps `x:"tốn: …"` for it (2 lines).
Screenshots are in /home/user/wt/econ-tamco-shots/roadpick-*.jpg (not in git).

## Not covered (follow-ups)
- Co-op guest: the road card is on doAct only, so a thin guest's act goes as an intent and runs the plain road.
- Person-card mini-game (jsgame «tự mặc cả hay giao cho người làm») and the j70 plot chains keep their own roads. The plain road runs there.

## Handover
Rollover point reached. Next: (1) the kit keeper does the Tốn-row request, (2) wire it into PEND.roadpick, (3) run the bot re-measure (death / HH) with BAL.road, (4) final-merge current origin/main, rebuild, tier.js, gates, then SẴN SÀNG KIỂM. Worktree /home/user/wt/econ-tamco (sparse), server on port 8931.

## ECON TAMCO #2 (session_01964izCzXkfovcY4kd6X4Mk) — 20/11
PRIORITY #1 CHECK ('Tâm cơ|tamco|thuê người'): ECONOMY.md §5 | main none | review/econ-tamco e4727333 (#1, continued, law 13) | claims D #9 GAP OR21.
Branch review/econ-tamco @ 6b705fb3a6a08cdc0c47fe2e02997802a65ba182 (final-merged origin/main 26f3bfa9).
- BUG FIXED (one-core G1): jtamco.js wrote `BAL.road={...}`. That WIPED the origin-roads table BAL.road (jbalroad.js: first/last/finTier/cap/hp…). Knobs renamed to **BAL.tcroad** {rate 10, share .5, tcMin 1, up 12, npcP 50, npcKeep 30, npcTcMin 25}. After the fix: roadhp-unit PASS, roadhp-scan PASS, G1 PASS.
- Merges: origin/main 716be762, then 26f3bfa9. assemble.py conflict: took main's list (adds jnwb.js) and kept jtamco.js after jecon.js. index.html/sw.js rebuilt.
- Tests on 6b705fb3: econ-tamco.test.js PASS (Fold 755x1000@2 + iPad 1180x820@2; equal value for every scheme × rival; printed price = charged price, 0 mismatches; NPC roads e.g. 135 acts: tc 33 / hire 22 / plain 80). quickcheck: PASS 185 s, core gates PASS, old save ok. The first run failed on perf noise (tab 531 vs limit 505); the earlier runs read 459 and 408. rules-one-source / difficulty: OK. tier.js: TIER BIG (jwhy.js, jtamco.js, assemble.py).
- paid-tiers.js lists 81–90 crafting rows («Vẽ tranh thủy mặc … bán thêm < trả thêm»). These are craft materials, outside this change, and the count moves between runs: pre-existing, not touched.

### Bot re-measure (run5e.sh, 5 shards × 8, 9-origin rotation, HHSTOP; anx.py)
| build | n | HH | early death | survived w/o HH | childbirth deaths | accusations on her /life (landed) | cold palace /life |
|---|---|---|---|---|---|---|---|
| before = LIVE main 716be762 | 33 (shard 2 crashed OOM after 1 life) | 36 % (12) | 36 % (12) | 27 % | 5 | 2.5 (2.3) | 5.1 |
| after = econ-tamco 86f8a62a | 40 | 45 % (18) | 38 % (15) | 18 % | 9 | 2.5 (2.0) | 3.6 |
Both changes are inside the noise at this n (one SE ≈ 8 points). The extra deaths are childbirth (9 vs 5), not schemes. NPC scheme acts on her are the same (blockf 7.2→6.0 tried; bribe/block land 0.2/0.2 → —/0.4). No BAL.tcroad tuning was needed (ECONOMY §5: tune only if the measure moves). Raw files: /home/user/wt/tamco-bal (not in git).

### ⛔ KIT-BLOCKED (law 9, not hacked)
Still open: the kit option card's «Tốn» row cannot show a Tâm cơ cost, or the scheme price on «Làm như thường», when fx does not pay it (same request as FOREMAN_B_STATUS ~L376 road-b2). For now the card prints it in the x line ("tốn: Tâm cơ -n"). Once the kit keeper adds an option field (e.g. `ton:{tamco:-n}` / `ton:{bac:-pr}`), PEND.roadpick in jtamco.js swaps the x text for it (2 lines).
Follow-ups (unchanged): co-op thin guest runs the plain road; jsgame person-card and j70 plot chains keep their own roads.

SẴN SÀNG KIỂM 6b705fb3a6a08cdc0c47fe2e02997802a65ba182 (KIT-BLOCKED: Tốn row Tâm cơ)

### Re-merge (LIVE moved to 4e8cbaeb during the report)
review/econ-tamco @ c45265d6c97a95b814365cd527df85a9f731d9f1 = 6b705fb3 + origin/main 4e8cbaeb (index/sw rebuilt). econ-tamco PASS, quickcheck PASS 205 s (core gates PASS, old save ok). This sha replaces 6b705fb3.

SẴN SÀNG KIỂM c45265d6c97a95b814365cd527df85a9f731d9f1 (KIT-BLOCKED: Tốn row Tâm cơ)
