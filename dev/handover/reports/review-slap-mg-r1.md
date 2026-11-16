FAIL

# review-slap-mg-r1 — review/slap-mg @3c4f1c81b (KIT §79)
Merged onto origin/main bad941b4 on review/slap-mg-r1 (8d266d3192e131da6918f8bb215d49e335fc8cbc; conflicts in assemble/jbal2/jface/KIT resolved, KIT renumbered §79, site rebuilt). Reviewer fixes there: BAL.slap.dodgeOdds / missRel (typed 50 and -5 in jslap), old-save tier = nhẹ everywhere.

## Passed
- Face marks use the shared KIT_FACEFX registry (`tat` entry, cheekBox + kitFxVars, one face-fx stylesheet): no private overlay. Swell art img/fx-slap-swell.png is on the CDN.
- dev/test/slap-mg.js @755x1000: no page errors, no overflow; costs per tier, dodge flow, NPC tier weights OK; co-op sends only state (tier rides on the res message); wording has no % and uses the odds ladder.

## FAIL — numbered list for the worker
1. Painted sprites only: the whole game (bar, needle, zones, pops) is drawn in canvas code (`KG82_SPR.tat=[]`). Needs Magnific gpt-2-6 sprites (ruler/bar, hand, zones) via the kit sprite path.
2. Minigame frame rule (OD:L999): the intro/result has no left painted picture (`kg82Open` called without `pic`). Add a painted picture of the act (img/kit/mg-*.webp path).
3. Difficulty (OD:L1255/L1266, "mức vừa", Tuyệt phẩm 20–30 % for skilled play): no tiers by skill level or occasion; BAL.bar widths are fixed. Nothing measures the skilled rate. The test's "skilled" mode uses KG82.peek (perfect timing), so it proves nothing. Add tiers + a realistic-human bot (reaction jitter) and report the nặng rate; random tap gave 2/32 nặng.
4. Easy rules: no first-time demo and no hint (e.g. glow of the zone after idle) in the slap/dodge game.
5. dev/test/slap-mg.js mark check is invalid: the strip renders an unmet "Người lạ" silhouette, layers=0 for every tier incl. nặng. Fix the test (known face, kitKnown, assert kslap s1/s2/s3 + kswell) and attach a 3-tier screenshot. I could not confirm the marks on screen (my own re-try landed on the reincarnation screen); only code-read.
6. ONE CORE leftovers: `(t.sung||0)>=60` in act tat (jface), raw thresholds 9/5/10/6/2 and the 750 ms end delay in jslap should be BAL.slap.
7. Settings 'Hiệu ứng: Đầy đủ / Gọn': jslap does not consult OPT.fxon (pops/needle animation); decide Gọn behaviour (static zones, no pops) and test it.
8. Not run (tooling blocked part of the session): screens at 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844; panel-size.js; facefx-scan.js; coop-e2e. Rerun on r2.
