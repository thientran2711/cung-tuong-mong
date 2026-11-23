# outing-art2 (4 outing backdrops: paint + wire) — art worker session_01N1tNP5CZ6eTeh9HJEmPV1i, Foreman B

PRIORITY #1 CHECK ('nam-giao|tao-mo|thu-san|du-ho|outing-'): OD 0 | ledger 0 | claims 8 (row 'ART outing-art2' = B, me) | main 15 (jevban.js KIT_OUTING, LIVE e6894660) | review/* outing-art, outing-art-r1 (landed) | archive 0. CDN index checked before painting: no key of the 4 existed (only chua-ho-quoc, ngu-uyen-ngoai).

Branch **review/outing-art2 @ 78324353** (off origin/main e6894660). Diff: dev/build/jevban.js (table only), dev/test/outing-art.js, generated index.html/sw.js/assets.json. No BAL / save / co-op / time change.

## Art (Magnific gpt-2-6, folder ba4aecfe, style ref cplQijT0eP, 2k, no people)
Painted 4:3 (land) and 3:4 (port) per outing, resized with Lanczos to 1024x768 / 768x1024, WebP q82 (227–255 KB, same sizes as C's pair 200–222 KB). All 8 LOOKED at 1024 px: Chinese/Vietnamese court architecture, no Japanese elements, no people (tomb: stone statues only). Rejected tries: none (first gen of each accepted).
| key | CDN paths (HTTP 200, in _index) | gen ids (land / port) | scene |
|---|---|---|---|
| nam-giao | img/outing-nam-giao-{land,port}.webp | P3FpzkA42C / DoybElOpcl | 3-tier white marble altar, blue-gold ceremonial tent, bronze tripods, dragon banners, frost/snow, Forbidden-City-like roofs far |
| thu-san | img/outing-thu-san-{land,port}.webp | 6A5BclSiJO / CqY7sAjEEy | autumn grass field, archery target, dragon pennants, horse fence, viewing pavilion, red maples, tethered horses far |
| du-ho | img/outing-du-ho-{land,port}.webp | 8a3jFMSIrU / lJmnRmCgv9 | lotus lake, dragon-prow imperial boat + racing boat at jetty, zigzag bridge, pavilion, mugwort, zongzi baskets |
| tao-mo | img/outing-tao-mo-{land,port}.webp | jU8APkzLD0 / MBOqCNdDCm | spirit way with stone officials/animals, stone gate, tomb shrine + mound, offerings + incense, drizzle |
Prompt skeleton: "Empty establishing landscape painting, no people, ancient Vietnamese-Chinese imperial court style (not Japanese): <scene>. Soft detailed watercolor-gouache illustration, bright airy palette, same style as the reference." (port: "vertical"). Uploaded with `python3 dev/site/cdn_sync.py img/outing-*` (8 files, 2.0 MB); nothing in git.

## Wiring (same mechanism, jevban.js KIT_OUTING; picture = `-land` on every device per r1)
{nam-giao: title /^(Lễ tế |Tế )?(đàn )?Nam Giao$/ or body /đàn Nam Giao/}, {thu-san: title /^Thu săn$/ or body /^Thu săn ở bãi săn hoàng gia/}, {du-ho: title /^Du hồ/ or body /^Tết Đoan ngọ, thuyền rồng đua/}, {tao-mo: title /^(Xin )?(về )?tảo mộ/ or body /(về|ra|đi) tảo mộ/}; labels (band caption): Đàn Nam Giao / Bãi săn hoàng gia / Thái Dịch trì / Hoàng lăng. assets.json rebuilt by build_site.sh.

## Place table (where each plays; own painting still wins, kitOutingKey unchanged)
| outing | dialog | before | now |
|---|---|---|---|
| Nam Giao | j7 `dongchi` event ("Đông chí, Hoàng thượng ra đàn Nam Giao tế trời", pushed by jact2 at the festival place, no headArt) | room picture | outing-nam-giao |
| du hồ / Đoan ngọ | j7 `doanngo` event ("Tết Đoan ngọ, thuyền rồng đua trên Thái Dịch trì", jact2 place, no headArt) | room picture | outing-du-ho |
| thu săn | j53 "Thu săn ở bãi săn hoàng gia" text (hoàng tử contest) | room picture | outing-thu-san |
| tảo mộ | **LATENT**: no dialog without its own art says "tảo mộ" as an outing. Thanh minh light act (FESTEV, "Xin về tảo mộ tổ tiên") and j71 festival dialog carry headArt ev-fest-thanhminh-b (own painting, people) → untouched; j72 th_thanhminh is a craft task (not an outing) | — | key + files ready, fires when a plain tomb dialog exists |
| Festival dialogs with headArt (dongchi/doanngo/thanhminh/phoenix j31/j71, banners with people) | unchanged | festival banner | unchanged |
| du hồ summons (jts tsPanel, art ev-le-ha) / Hội Phượng "Xin thử một mũi tên" | own art | | unchanged |
DECISION for Foreman B: tảo mộ (and thu săn as HER outing) have no own-art-free dialog; if the owner wants the establishing backdrop on the Thanh minh / Hội Phượng acts, the festival headArt would have to yield to the outing key (one-line change in kitOutingKey) — not done (own painting wins rule).

## Tests
- `node dev/test/outing-art.js` extended (6 keys; 9 new title/body cases incl. 3 negatives; dongchi/doanngo via real mkEv+pushDil; san/taomo synthetic dialogs; land src on every device): ALL OK (Fold + iPad, 0 page errors). First run caught 2 own negatives matching (title regex too loose) → tightened.
- quickcheck (bash dev/tools/quickcheck.sh): PASS · open 1857 ms · old save loads+plays a buổi · core gates PASS · perf new/live render 217/298, buổi 1690/3637 ms.
- coop-e2e (live Worker) ×1: 141/141.

## Shots (Fold 755x1000@2 + iPad 1180x820@2, LOOKED 3x: contact sheets + full-size Fold Đoan ngọ)
CDN img/_review/outing-art2/{fold,ipadAir}-{dongchi,doanngo,san,taomo}.jpg (wipe after verdict: `python3 dev/site/cdn_sync.py --wipe-review outing-art2`). Notes: dongchi/thu săn/tảo mộ show the wide band (altar, field, spirit way readable); Đoan ngọ dialog with option cards uses the tall picture column → land file shows as a centre crop of the lake + dragon boat + bridge (readable, same kit layout as every ev banner).

## Cost
8 gens × 135 = 1 080 credits.

## REVIEW r1 (sonnet SMALL art+wiring reviewer, 11/23/2026)
PRIORITY #1 CHECK ('outing-'): OD 0 | claims 'ART outing-art2' + 'REVIEW outing-art2' = B | main jevban KIT_OUTING (LIVE e6894660) | review/outing-art2 78324353 | archive 0.
Verdict: **PASS** @ 783243530ede3a04c412ff2dfdf817df1ead1d7d (no fixes needed; branch is already on newest origin/main e6894660, so no r1 branch).
- SMALL confirmed: diff vs origin/main = jevban.js (table only, +9/-2), dev/test/outing-art.js, generated index.html/sw.js/assets.json. No BAL/save/co-op/time/progression.
- ART, all 8 LOOKED at full size (1024x768 / 768x1024): Vietnamese/Chinese court architecture, no Japanese elements, no people/faces, no text/watermark/artefacts. Same palette/light/brushwork/size as chùa Hộ Quốc / Ngự uyển ngoại pair. Nam Giao = 3-tier white-marble altar + blue-gold tent, snow; thu săn = autumn field, target, pennants, pavilion; du hồ = lotus lake, dragon boats, pavilion, bridge, zongzi; tảo mộ = spirit way, stone officials/animals, gate, mound, offerings, drizzle (stone statues only). All fit their place. (Not repainted; C's chùa has two tiny monk figures — pre-existing, not this branch.)
- TẢO MỘ: verified true. Only tảo mộ outing paths: j31 FESTEV thanhminh ("Xin về tảo mộ tổ tiên") and jact2 AS_LIGHT festival act — both carry headArt ev-fest-thanhminh-b (jact2:51, j71:426 sets headArt on every festival dialog), j72 th_thanhminh is a craft task, jopic = kit demo text. headArt wins in kitOutingKey → festival banner KEPT (law 16). **tao-mo key stays LATENT** (used only if a plain tảo mộ outing dialog appears). FOR MAIN: unused-picture rule — MAIN decides keep or delete img/outing-tao-mo-{land,port}.webp (and the key).
- KIT FIRST: no private part; reuses kitEvArt band slot, always -land (r1 rule of outing-art). Co-op: both seats get the same picture (land on every device); coop-e2e ×1 = 141/141.
- Tests: node dev/test/outing-art.js ALL OK (Fold + iPad, 6 keys, positives + negatives, real dongchi/doanngo dialogs, 0 page errors; first attempt timed out in openDirect while another job loaded the box, rerun alone OK). quickcheck: open 2016 ms, old save loads+plays a buổi, core gates PASS; only FAIL = perf buổiMs 3322 vs live 1298 — noise (live itself swings 1197–1839 across runs; worker's run read 1690/3637 the other way; diff is a regex table, zero render-path change).
- Shots Fold 755x1000@2 + iPad 1180x820@2 of dongchi / doanngo / san / taomo LOOKED 3×: band shows altar / field / spirit way readable; Đoan ngọ dialog with option cards uses the tall column → centre crop of lake + dragon boat + bridge, readable (same kit layout as every ev banner). CDN img/_review/outing-art2/ wiped (8 objects).
