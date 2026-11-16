# stage-pets report (worker, 11/16/2026)

Branch: review/stage-pets @ fdaba9cae (base origin/main fb3677401). Pushed, not merged. SẴN SÀNG KIỂM.

## What it does
- Every person on a room / place stage (her + NPCs, max 3 people as before) shows their ONE "theo hầu" pet (`p.pets[p.petOn]`) in ONE fixed spot: on the person's right, feet on the person's floor line, in front (pet visible left edge = person visible right edge − 0.5 × pet width). Stranger (kitKnown false) = no pet. No outdoor-only rule.
- New kit part `KIT_PET` (jkit.js) registered in KIT.md §33.8 + kit page sample §33.8. Size class per species, visible pet height / woman body height H: S .18, M .26, L .34 (× growth scale Non .62 / Thiếu niên .8 / grown 1). Classes: S meomuop hoami tho cavang meo sao uyenuong cachep vet lyngu ngoctho; M cho sutu linhmieu camke cuuvi phuong; L hac thienma bachloc kylan thanhlong. Final classes = Foreman C's table: change only `KIT_PET.cls`.
- Layout: the slot rule counts the pet (art/2 + pet×0.5 + widest art/2 ≤ slot spacing); everyone scales down together as before, else one person fewer per page.
- Art: `img/pet-stage/pet-<key>.webp` is NOT on the CDN yet (404) → PLACEHOLDER = existing transparent pet picture of the pet's growth stage, tagged `data-ph="1"`. When C uploads, it switches by itself (no code change). Negative probe cached per species (1 request per species).
- Co-op: reads the friend entry's `pets/petOn` (no new packet). On main the friend entry does not carry them yet; they arrive with review/coop-pets (not merged) → friend's pet shows after that merge.
- Not covered: event-dialog stages (kitStageFig/kitEventStage) — only room/place stages (j59), as the owner asked.

## Numbers (dev/test/stage-pets.js, real alpha masks; all 16 cases PASS: face 0 %, no pet over neighbour/side column, feet on floor line)
Occlusion = % of the person's visible pixels covered by the pet. Face band = head top→22 % of body; torso = core columns, 25–75 % of body.
| size | case (her + rivals) | pet class | worst total | worst torso | face |
|---|---|---|---|---|---|
| 1180x820 | 1 person S / M / L | S,M,L | .8 / 6.7 / 8.2 % | 0 / .1 / 4.2 % | 0 |
| 1180x820 | 2 people S+L, L+L | | 3.1 / 3.6 % | 1.9 % | 0 |
| 1180x820 | 3 people (page of 2) SML / LLL / MMM | | 4.6 / 8.9 / 7.1 % | 4.7 % | 0 |
| 755x1000 | 1 person S / M / L | | .9 / 7.3 / 9.1 % | 0 / .1 / 4.6 % | 0 |
| 755x1000 | 2 people SL, LL | | 3.1 / 3.9 % | 2.0 % | 0 |
| 755x1000 | 3 people SML / LLL / MMM | | 4.4 / 9.7 / 7.6 % | 5.0 % | 0 |
Large pets only cover the lower skirt/hem (class L top reaches ~64 % down the body), never the face; worst torso overlap 5 %. First try (L .44 H, 15 % overlap) was rejected: the pet needed so much width that people fell to 1 per page.

COST (be honest): the pet takes room, so people shrink when 2+ people stand there (body height px, no pets → with pets):
- 1180x820: 2 people 258 → 198–203 (−22 %); 3 people (2 per page) 230 → 176–183 (−21 %). 1 person: unchanged 492.
- 755x1000: 2 people 340 → 260–267 (−23 %); 3 people 311 → 239–247 (−22 %). 1 person: unchanged 542.
The number per page does not drop (2 per page as before, so "3 people" is still 2 + "+1" page chip on both devices: the stage is only ~374 px free beside the right plaque column). Option if she wants bigger people: let pets overlap the neighbour (rejected for now: covers someone else's hem) or use less overlap.

## Tests
- stage-pets.js 1180x820@2 + 755x1000@2: 8 cases each (+ no-pet baselines) pass, 0 page errors.
- kit-conform 755x1000: CONFORMS 57 / MISSING 14 (main: 55 / 15) — no regression. tab-pairs 1180x820: 56 pairs, 0 mismatches, 0 errors.
- Old save: no save field added/changed (reads existing `pets/petOn`), so old saves load as before; not separately re-run. game-feel.js not run (needs its own main/new overlay servers; time).
- play-perf.js: harness hangs in this container even on main-vs-main (not a regression signal). Own measure dev/test/stage-pets-perf.js, 4x CPU throttle, median j59lay: no pets 4.1 ms, 3 pets 4.5 ms (p90 7.7 / 6.5). Static images; idle bob only under Hiệu ứng Đầy đủ, off for reduced motion.
- Bytes: placeholder = existing 256 px pet webps (≈13–33 KB each, only the pets shown). C's art size not known yet.

## Shots (@2): dev/handover/reports/stage-pets-shots/ (n1L, n2SL, n3SML, n3LLL × 1180x820 and 755x1000). Also in review/stage-pets nothing (shots dir excluded).

## Open for coordinator
1. Foreman C's final S/M/L table → update `KIT_PET.cls`; re-run stage-pets.js after real art (silhouettes differ from placeholder).
2. Merge order with review/coop-pets (friend pet).
3. Rebuilt site files (index.html, sw.js, assets.json) are in the commit; rebuild after merging other branches.

## Handover (worker context)
START_CTX ≈ 10 %; ended ≈ 35 %. Nothing pending except the items above.
