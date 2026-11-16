PASS 64b40270f66d561a57f79d31ac72acbbdcd535e3
# Review — review/mem-upgrade @06e4179e → review/mem-upgrade-r1 (reviewer session_01DgYSWot4sNs4TrG8fUm2of, opus, for Foreman D)
 Branch head 64b40270 = d8b5ad5a (code + site) + this report as dev/PROGRESS_review-mem-upgrade-r1.md.
Base: origin/main 73c06812 (latest at 16/11 ~14:50Z) + review/mem-upgrade, clean merge, 3 small reviewer fixes, site rebuilt. d8b5ad5a has origin/main as ancestor (fast-forward ready).
START_CTX ≈ 3 % of 1M (own estimate; get_session reads 0); finished well below the rollover line.
Owner words checked line by line: OD 16/11 13:25Z (A) and 13:40Z ONE LEDGER (feelings/conflicts part). Q2 (Emperor/Thái hậu acting on memories) not in scope per Foreman D 14:15Z — not counted.

## Owner line → branch
| owner words | result |
|---|---|
| "có người thì ký ức phai nhanh, có người thì ký ức phai lâu" | OK — BAL.mem.fadeT per nết (good/bad separately) × fixed per-person spread; measured 12-month rumour left 0 (Hiền lành) … 13 (Hiểm độc+Thẳng thắn); same nết still differ |
| "có những cái sự kiện là sẽ nhớ cả đời" | OK — m.L lifelong (BAL.mem.life deeds, weight ≥ lifeMin, event swing ≥ lifeRel), no fade, own cap; poison remembered 70 after 24 months (main: 25) |
| "ảnh hưởng tới cái cách hành xử của một nhân vật đối với một nhân vật" | OK — danger, revenge in kind, everyday dealings, servants' loyalty. Bot before/after on current main: M3 rumour share .165/.165 → .215/.353; M4 helps to her after a pardon 102 → 406; M6 harm band at Oán 70 pardoned 2 → 0; M2 band month 24 1 → 2 |
| "every action (scolding, quarrel) must have a recorded REASON … hidden from her" | OK for the 10 wired families (runAct all schemes, giveTo, empAct, talk, q72End, event swings, SOC everyday acts, punish, servAct, bribe/threatServ); 0 records without a reason; hidden (console causeLog only) |
| jmem extended, no second memory system | OK — same jmem store/API, only jmem.js + BAL |
| numbers in BAL (OD:L1267) | OK after fix 3 |

## Reviewer fixes (on review/mem-upgrade-r1)
1. OLD SAVES: records migrated from an old save were not marked lifelong, so an old "poison" memory kept fading (old-save test: 70 → 68.8 in 3 months). memMig now sets m.L on old records whose deed/weight is lifelong (after: 70 → 70).
2. SAVE BOUND over 30 years: dead consorts stay in `rivals`, and each kept her own memories (16 pairs × 8) + 24 causes forever. Now memFade drops a dead consort's .mem and keeps only the newest BAL.hook.czDeadMax (8) causes on her (evidence of what was done to her). Stress (60 random deeds a month, +2 consorts a year, 30 years, 70 consorts): memory+cause part of the save 30y = 317 KB, growing ~6 KB/year only with the number of dead consorts (before fix: save +586 KB and rising faster). Natural play is far lower (bot: ~3 memories / 5 causes per short run). Per-holder caps all hold.
3. ONE CORE: hard-coded jealousy divisor `/3` in causeWhy → BAL.hook.czGhenDiv.

## Tests (merged build)
- dev/test/mem-upgrade.js 755x1000@2, 1180x820@2 ALL OK; 1000x755@1, 1366x1024@2, 844x390@2, 390x844@2 ALL OK (no overflow, no page errors). Shots looked at: "Kỷ niệm" rows use the existing kitRows only ("khắc cốt ghi tâm", lifelong quote tails), no new CSS/component → KIT OK.
- dev/test/memories.js ALL OK; dev/test/mem-coop.js ALL OK (host authority, same memories/causes both sides, same fade).
- Old save (main 73c06812 build → this build, with NPC memories + Emperor memory + hook): all moved onto their holders, round-trip OK, no errors.
- coop-e2e (live Worker) 59/59. coop-world: crashes at the same step ("reading 'name'" in view) on CURRENT main 73c06812 too → pre-existing, not counted (the worker saw 3 FAIL + whereOf crash on e9c6021d; main changed since, still broken the same way on both).
- dev/measure/mem-behaviour.js main vs branch: numbers above, no page errors.
- Wording: new deed phrases are cổ trang, no %, no odds words (VANPHONG OK).

## Follow-ups (not blocking; for Foreman D)
- Cause families not wired yet (worker's list, confirmed): Thái hậu scoldings and the cung-nữ road mistress scolding (PEND cnvScold) only get a cause when the event's relation swing ≥ relMin, and the event-swing hook skips Thái hậu / the Emperor (needs id); deathSentence; the Emperor's rewards / nights. The forced-emotion-events worker (OD 13:25Z (B)) and the item-ledger worker should call causeAdd — worth wiring the existing scold events in the same pass.
- Q4 more lifelong events (child born/lost, first night, rescue), Q5 co-op friend's own memories write-back — as Foreman D decided.
- Q2 (Emperor / Thái hậu acting on memories) waits on the owner.

## Handover
Done; nothing to resume. Worktrees removed.
