SẴN SÀNG KIỂM dd0b618fa2a7f5e6150cabbe5d3486dde829265a

# slap-mg-r2 — worker report (fixes for review-slap-mg-r1 items 1–8, KIT §79)
Branch: review/slap-mg-r2 @ dd0b618fa2a7f5e6150cabbe5d3486dde829265a. Details + tables: dev/PROGRESS_review-slap-mg-r2.md on the branch.
START_CTX ~3 % of the window (1M); finished at ~20 %, no rollover needed.

## Base / merge order
origin/review/slap-mg-r1 8d266d31 + origin/main 399483e3 + **origin/review/mg-balance 96736fff** (slap uses its `mgTier`). Ship mg-balance first or together.

## Done (items 3–8)
- 3 Tiers: `mgTier("tat",{occ:"tat"})` (stakes by her rank) / `mgTier("ne",{occ:"ne",rank:attacker})`, skill = Vũ (`KG82_F.tat/ne`). Zones are time windows by ease (BAL.slap.bar/dodge). Skilled-human bot (anticipation, N(0,40 ms) timing error) at matching level: **nặng 24 %**, vừa 58 %, nhẹ 18 % (n=200); casual 12 %; random 4 %. Khó end 15 %, Dễ end 49 %. Dodge 53 % at matching level; card odds by tier [75,55,35].
- 4 First-time demo (j91 k91DemoCard, once per kind) + idle glow round the zone (k91Glow) + hint line.
- 5 Test rewritten: met face (k61Meet), asserts kslap s1/s2/s3 + kswell only on nặng + images loaded; 3-tier screenshot looked at.
- 6 ONE CORE: hoangMin, raw, endMs, wkX, scold, def fallback, dodgeOdds[] → BAL.slap.
- 7 Gọn (kfStill): no pops, still result line, still glow outline.
- 8 Run: slap-mg.js 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@3 all checks pass, no errors/overflow; 390x844 rotate prompt; panel-size.js exit 0; facefx-scan.js all true; coop-e2e 59/59.
- Whole family: `kg82Pic` gives no picture slot for any kind not painted on the CDN (le, tc, xa, thq, tat, ne showed a broken image ~2 s before), listed in CTM_MISSING_PICS.

## ART NEEDED (items 1–2; this account has no Magnific) — files drop in, no code change
1. img/kit/mg-tat-bg.webp 1200×900 ≤250 KB — slap scene (board + LEFT intro picture): palace hall, a consort raising an open hand toward a lesser consort; calm faces, game palette.
2. img/kit/mg-ne-bg.webp 1200×900 ≤250 KB — same hall, a consort turning aside / stepping back from a raised hand.
3. img/kit/mg-tat-ruler.webp 1600×120 transparent ≤40 KB — long lacquered wooden ruler, plain middle, carved ends.
4. img/kit/mg-tat-hand.webp 160×220 transparent ≤40 KB — slender lady's hand, palm forward, fingers down (fingertips at bottom edge = needle tip), jade bangle.
5. img/kit/mg-tat-zone-red.webp, mg-tat-zone-amber.webp, mg-ne-zone-green.webp 400×80 transparent ≤20 KB each — soft painted silk strips (red / amber gold / jade green), stretched by code.
Also missing (family scan): mg-le-bg, mg-tc-bg, mg-xa-bg, mg-thq-bg.

## For Foreman B (mg-balance)
Added BAL.mgTier.occ.tat/ne + MGT_OCCN names (from jslap); mg-bots.js: anticipation path (`peek().at`), bot "casual", KG82.noDemo while measuring.

## KIT REQUEST / owner questions
None.
