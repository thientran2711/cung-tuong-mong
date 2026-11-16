# PROGRESS review/placeholder-pics2 (D46, art worker)
Base: origin/main 2afdafc39. Rule: LUẬT ƯU TIÊN SỐ 1 first, regenerate the list, draw only what is still missing.

## Re-scan of CURRENT main + CDN manifests (dev/tools/missing_pics.js, dev/tools/pic_usage.js)
| | before (main) | after |
|---|---|---|
| events on placeholder (missing_pics) | 1 / 307 (e68:flowerBloom) | 0 / 307 |
| acts on placeholder (missing_pics, 3 random lives) | 0 / 98 (old MISSING_PICS.md listed 18/96) | 0 / 96-98 |
| dialogs with a fallback id (pic_usage) | 1 (e68flowerBloom) | 0 |
| option cards on the act placeholder (new row in the tool) | 68 seen | 62-68 (not this slice, see below) |

## Done
- e68 flowerBloom ("Thời tiết"): evArtCat could not resolve pid "e68flowerBloom", so it fell to ph-event-light. New own banner
  img/ev-e68-flowerbloom.webp (640x480, 137 KB; nine peonies, night-blooming flower, chrysanthemums, plum in bud; no people).
  Magnific gpt-2-6, folder ba4aecfe-..., style ref cplQijT0eP, picked s7oFJaMl8e (alt P3EjR5542C unused). On the CDN.
  Wired in dev/build/jevban.js KIT_DLGMAP "e68:flowerBloom" (same mechanism as e68:lotusSeason). Site rebuilt.
- dev/tools/missing_pics.js now also lists option cards (kind "opt") on the act placeholder; dev/art/MISSING_PICS.md regenerated.

## Skipped (already covered / not this slice)
- The 18 acts of the old list: all have their own ACTS.json key + file on CDN now (review/act-pics2, merged). Nothing drawn.
- Events: review/ev-art-fit covers meaning rules for the other event/dialog fallbacks (Hung tin, sớ, Xét phẩm...). Not touched.
- Bổng lộc LUẬT rule picture: main already has img/info-bong-loc.webp (silver ingots + ledger), INFO.json lists it; the rule pop-up
  (blCard via kitInfoArt) shows it, no placeholder. All 30 KIT_INFO keys have files. The owner's brown placeholder was the old state.
- Đoan ngọ: invitation banner img/ev-j71f-doanngo.webp (dragon boats), name label above the figure, nothing over heads. OK at 1180x820.
- OPTION CARDS (kind "opt", 62-68 per life): many are person names (Phi ???, Quý nhân X: portrait case) and meaning-group choices
  without a picture (review/opt-pics owns that, KIT §6.2). Reported to the coordinator as a possible new item, not drawn here.

## Smoke
e68Test('flowerBloom') dialog at 755x1000 and 1180x820: shows ev-e68-flowerbloom.webp, no page errors, no horizontal overflow.
