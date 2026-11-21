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

## ECON TAMCO #2 — round 2 after KIT READY (21/11)
PRIORITY #1 CHECK ('Tâm cơ|tamco|thuê người'): ECONOMY.md §5 | main: kit-ton-row LIVE e4fd4dcf (KIT §13.16) | review/econ-tamco (this branch, law 13) | claims D #12.
Branch review/econ-tamco @ 60703f26d71bf8f9f1d11a75e0ca9d4af843944c (final-merged LIVE 8c8b8b6b). TIER BIG (8 files).
- KIT Tốn row (law 9): PEND.roadpick uses the kit `ton` field only (no private text): «Làm như thường» = Bạc −price · «Hao tâm cơ» = Tâm cơ −tc · Bạc −price · «Thuê người» = Bạc −(price + hire) (one figure; the hire is now paid in the road, not via fx). KIT_REQUESTS kit-ton-row row → DONE.
- CO-OP (owner CO-OP LAND GATE) — gap #1 left is fixed: her road rides with the act as ECON_HER. Direct act: the runAct intent carries it (jcoopthinf F1 runAct ctx "econ"); the host pays it in her context and rolls the odds she saw (fzRun). Sent deed (parallel time): ptSend tags the deed, ptLand pays it when it lands (host, her context, ptTickHer). Nothing is paid on the guest phone.
- Law 3 fix found on the way (law 11): an act whose own gate stops it after the price was taken (j95c giá họa motive gate) → the jecon §5 extra price and the NPC road are refunded (econVeto). Was: NPC paid for a frame that never happened.
- Tests: econ-tamco.test.js PASS Fold 755x1000@2 + iPad 1180x820@2 (rendered Tốn rows, price = charge, hire/Tâm cơ charged once, sent deed carries + pays at landing, NPC roads, price scan 0). econ-tamco-coop.js (new, live worker): PASS 18/18 on 904046ad, 17/17 on 60703f26d71bf8f9f1d11a75e0ca9d4af843944c (the two-way step was skipped that run: no priced scheme on the friend at that moment) — both seats see the kit card; guest Tâm cơ / hire paid once by the host in her context with her shown odds, 0 on her phone; two-way on the friend; host's own road. kit-ton-row.js PASS 12. coop-e2e 68/68. quickcheck PASS 191 s (core gates PASS, old save ok).
- Shots (not in git): /home/user/wt/econ-tamco-shots/roadpick-755x1000.jpg + roadpick-1180x820.jpg (the 3 roads with their kit Tốn rows).

SẴN SÀNG KIỂM review/econ-tamco 60703f26d71bf8f9f1d11a75e0ca9d4af843944c (TIER BIG)

## ECON TAMCO #2 — review F1 round (21/11) + HANDOVER (rollover reached)
Reviewer F1 (reports/review-econ-tamco.md «RE-CHECK 21/11»): ECON_WIN schemes (bribe/block/xinhh/thathu) pay the price ONLY on success; the card put the price in Tốn (= paid either way).
Done on review/econ-tamco @ bce5629534743e1216f72615603e9b76a8003788 (WIP, NOT ready, LIVE 64d2e094 not merged yet):
- jecon.js: `ECON_WIN_FAIL="không mất bạc"` = the ONE failure wording; j17 actLine uses it (was typed).
- jtamco.js PEND.roadpick: for ECON_WIN k: Tốn keeps only what is paid either way (tc road: Tâm cơ; hire road: Bạc −hire; plain: nothing); the price goes on «thành» (`wT`), and each road gets «hỏng: …» (`wH`: plain/tc «không mất bạc», hire «chỉ mất tiền thuê, không mất bạc giá mưu kế»).
- econ-tamco.test.js: §3c forced fail/success per road for an ECON_WIN scheme. NB bribe's outcome is the maid's own choice (rcvMaidBribe, receiver choice), not the frozen roll, so each run must be one of the two honest outcomes (road only / road + price): it PASSES (charges match). Card checks are win-aware; a rendered check waits for the modal.
OPEN (the only thing left):
1. The rendered card: the kit word-map (j63 kaRows / kitParse) turns my «thành: …, thành mới trả N bạc» into «có thêm bạc» (it reads it as a GAIN) — WRONG. With `fmt({bac:-N})` inside «( … )» the part was dropped entirely. Shots: /home/user/wt/econ-tamco-shots/roadpick-*.jpg. Options: (a) find a kit grammar that prints a price paid on success (check KIT.md §13.16 / j63 for a «trả khi thành» or «thành: Bạc −N» form: try «thành: … · Bạc -N» as its own part so kaRows puts it in the Được/Thành row as a cost) — test quickly with one page eval of `dilLine(o)` + the rendered `.kb`; (b) if the kit has no form → KIT REQUEST to MAIN's kit keeper («option field for a price paid only on success», like `ton` but shown on the THÀNH row), mark «KIT-BLOCKED» and tell D. Law 9: do not hack the kit.
2. The plain road shows «Tốn: không» (kit default for a cost-free option in an open card; it was the same on c45265d6 and passed review; KIT 28.6 drop is for hidden-outcome cards). Mention it to the reviewer; a kit question, not ours.
3. Then: final-merge LIVE 64d2e094 (index.html/sw.js: take theirs, assemble.py keeps jtamco.js after jecon.js, build_site.sh), run econ-tamco.test.js (server: node dev/test/sw-serve.js 8931 <wt>), econ-tamco-coop.js (live worker), quickcheck, tier → «SẴN SÀNG KIỂM» to reviewer session_01964izCjh2dKcmvL4sSYKMG + D #13 session_01964izC63Mgk7VPcriQTwU7.
Worktree: /home/user/wt/econ-tamco (sparse). Everything else in the reviewer's re-check PASSED.

## ECON TAMCO #3 — F1 done (21/11)
depth 5 · START_CTX ~3 % (get_session read 0; estimate).
PRIORITY #1 CHECK ('ECON_WIN|thành:.*Bạc -|act:1|khideout'): OD 0 | ledger 0 | claims D #13 | main: KIT §88 «a cost written under "thành:" of a roll act (e.g. Bạc paid only when the bribe lands) is THÀNH Mất, not Tốn», §28.6 data flag `act`, §6.2b option card; j10/j15/j77/jeitem already write «thành: …, Bạc -N» | review/* only this branch.
Branch review/econ-tamco @ d07e20bbab87eb892b8ac5b6b24e0984f17e3a01 (TIER BIG, 9 files; on LIVE 56ff0db0).
- The kit form EXISTS (KIT §88), so no hack and no blocking request: the road card writes «thành: …, Bạc -N» (was «thành mới trả N bạc», which the word-map read as a gain).
- The road card was a hidden-outcome card (PEND item → kitHideOut, words only, so the price was dropped). It is the scheme act's OWN picker, so the queued item gets the KIT §28.6 data flag `act:1` (set in jtamco where doAct pushes it; pushDil does not carry it) → the open card, like Hành sự. Card now (shots looked at, Fold + iPad): plain «Tốn: không · Được: … · Bạc -N (red)»; Tâm cơ road «Tốn: Tâm cơ -n · Được: … · Bạc -N»; hire road «Tốn: Bạc -hire · Được: … · Bạc -N». The BẠI line («không mất bạc» / «chỉ mất tiền thuê, không mất bạc giá mưu kế») sits behind «!» (KIT §6.2b: a rolled card's Bại stays folded).
- Charges = card on every road, forced fail and success (test §3c): plain 0 / −N; tc −tc / −tc −N; hire −hire / −hire (bribe success outcome is the maid's own choice, as noted in #2).
- Non-blocking KIT REQUEST (KIT_REQUESTS.md 21/11 econ-tamco): a visible word for «paid only on success» on the option card (today the red «Bạc -N» sits in the «Được» row with no word). No jtamco change is needed when it lands.
- Merges: LIVE 64d2e094, a88b14f0, 32c0e33b (kit-ton-row-2), 56ff0db0 (assemble.py: main's list + jtamco.js after jecon.js; index/sw rebuilt). Revert audit `git diff 56ff0db0..HEAD`: 11 files; the 7 removed lines are this branch's own edits (assemble list, j17 actLine, jcoopthinf ctx, jecon ×2, jwhy spy, KIT_REQUESTS kit-ton-row row) — no LIVE hunk reverted.
- Gates on d07e20bbab87eb892b8ac5b6b24e0984f17e3a01: econ-tamco.test.js PASS Fold 755x1000@2 + iPad 1180x820@2 (now checks the VISIBLE rows: the price is a red item of the shown row and not in Tốn; «không mất bạc» in the BẠI fold) · econ-tamco-coop PASS 17 (2 players, both seats; on a88b14f0/32c0e33b PASS 18 with the two-way step) · solo = econ-tamco.test · coop-e2e 92/92 (one run on 32c0e33b had 90/92: Thái hậu picture empty on the guest seat, not econ code; the next run 92/92) · kit-ton-row PASS 14 · roadhp-unit PASS (one FAIL under 4 parallel browsers; PASS ×3 alone) · quickcheck PASS 197 s, core gates PASS, old save ok · roadhp-scan FAIL 10 is pre-existing on LIVE (bd_* «Nhờ», not ours).
- Shots (not in git): /home/user/wt/econ-tamco-shots/roadpick-755x1000.jpg + roadpick-1180x820.jpg.

SẴN SÀNG KIỂM review/econ-tamco d07e20bbab87eb892b8ac5b6b24e0984f17e3a01 (TIER BIG) — non-blocking KIT REQUEST open (visible «paid only on success» word)
