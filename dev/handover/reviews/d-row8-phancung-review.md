# BIG REVIEW — review/d-row8-phancung 7b97ff97 → PASS 934f8b06 (review/d-row8-phancung-rv)
PRIORITY #1 CHECK: brief dev/handover/briefs/d-row8-phancung-rv.md (claims D-ROW8-PHANCUNG, worker session_01964izFnFeMdZcSVq3NPGAx) | main a96564ad = lr-rules-r2 (row 8 core pcHostPick/pcWhy/jpdist already there) | review/* none other on it | reuse: pcHostPick/pcParts/pcWhy (jpromob), aff/oan (j9), BAL.promoR.pc, palFix spread (jpal).
KIT CHECK: reuses the existing Phân cung kit T1 panel (Q modal + kitRows «VÌ SAO» row); no new part, no CSS. kit-std-scan REPORT_ONLY (Fold+iPad): X06 12 · X08 4 · others 0 — IDENTICAL on base a96564ad (court tab «Mong manh»/«Tùy duyên» bare words + «Trong cung: Chương 1…» ellipsis) → pre-existing, not this branch. Checklist dev/kit/KIT_CHECKLIST.md: no line touched.
Reviewer: BIG rv for Foreman D ROOT · START_CTX ~8 %.

## What the branch does (3 commits on a96564ad)
1. jpromob `pcMut(p,h)` = ((aff h→p + aff p→h) − (oán h→p + oán p→h)) / 2 / BAL.promoR.pc.span.c, clamped [−1,1]; 0 for self. Added to pcParts as `C = BAL.promoR.pc.wC × pcMut` (wC .5 < royals' 1 → royals still lead). Same pcHostPick for her and NPCs.
2. pcWhy line when the liking really pulled (pcMut ≥ B.why and C > 0).
3. jpal palFix spread step: the empty chủ vị the newest girl moves to = pcHostPick(y, E) instead of `pick(E)` (random fallback kept).

## Laws touched
- 1 TWO-WAY: pcMut is symmetric (both directions of aff and oán) and the same rule for her and NPCs (test «NPC parity»). OK.
- 3 GAIN-AND-LOSS: no choice added. n/a.
- 4 ONE CORE: wC .5 and span.c 40 in BAL.promoR.pc; test «wC 0 → no pull». OK.
- 6 REAL PEOPLE: host is a real living chủ vị; no save field added (test «old save»). OK.
- 7 WORDING: no %, no number in the line. FOUND + FIXED (see below).
- 9 KIT: existing panel row only. OK. 11 WHOLE FAMILY: both placement paths (edict pcHostPick + palFix spread) use the one rule. OK.

## Fix made on review/d-row8-phancung-rv (934f8b06)
- Worker's line `${hn} quý ${nm}, xin cho … về ở chung` reached the panel (first-person rewrite) as «một vị Quý phi **thiện cảm**, xin cho ta về ở chung» — broken phrase. Now `${hn} có thiện cảm với ${nm}, xin cho ${ngươi|nàng} về ở chung` → panel «Tần Niên Thanh Ca có thiện cảm với ta, xin cho ta về ở chung» (VANPHONG term «thiện cảm»). Tests d-row8-phancung.js / d-row8-shots.js regex follow. index.html rebuilt.

## Gates (re-run by me; 7b97ff97 then 934f8b06)
| gate | result |
|---|---|
| d-row8-phancung Fold 755x1000 / iPad 1180x820 | 8/8 · 8/8 (both shas) |
| promo-build | PASS, errors none |
| kit-promo-hook Fold / iPad | PASS, errors none |
| coop-house-clash | PASS |
| help-housemate.test | ALL PASS |
| palace-distance | FAIL 2/27 (her / NPC far-visit Danh +6 vs near +2) — SAME 2 on bare a96564ad → pre-existing, not this branch |
| undef-scan | PASS (372 names) |
| quickcheck (new 7b97ff97 vs live a96564ad) | PASS · open 2369 ms · old save ok · render 355/388 ms, tab 587/641, buổi 2085/2181, tasks>200 43/43 |
| build | build_site.sh reproduces committed index.html byte-identical; sw.js/assets NOT rebuilt (ctm-img.victoria-tntt.workers.dev blocked by this box's proxy) → lander rebuilds |
| live palFix spread probe (my own, 6 lives) | 0 page errors; every empty chủ vị gets one girl; spread intact |
| shots Fold + iPad (mine, offline CDN) | Phân cung panel: «VÌ SAO» row shows the liking line, wraps clean, 0 overflow, 0 errors; looked at both |
| coop-e2e | not run (soft; needs the co-op worker host) |

Trial merge: onto review/lr-rules caa95310 → clean (caa95310 is already an ancestor: fast-forward); onto origin/main a96564ad → clean (ancestor; FF).

## Nits (no block)
- d-row8-phancung «spread» check only calls pcHostPick, never palFix; with < 3 hosts it passes silently (bad:""). Worker's d-row8-shots.js gives blank frames (its overlay sweep removes the stage); my shots used a direct-page probe.

VERDICT: PASS 934f8b06 (review/d-row8-phancung-rv; origin/main a96564ad is its ancestor). Lander: rebuild sw.js/assets with CDN access.
