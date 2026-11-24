PRIORITY #1 CHECK ('mgskin|mg-skin|tsduho|tsden'): OD 23/11 ~23:05Z (read) | main: kg82SkinSrc/kitBoardBg reused, no img/mg/{tat,ne,nghe,tsduho,tsden}-* before | review/* none | claims: batch 2 G only | reuse: KIT MG-SKIN LIVE 2a80712b.
# F-MGSKIN-G — kinds duho, den, tat, ne, kinh, may, nghe (24/11)
START_CTX ~5 % of the window; finished well under +25 %. Magnific folder ba4aecfe… not visible: results are in Personal. Model gpt-2-6 only, 1k, 4:3 or 3:4, each skin an EDIT of the default picture passed as reference. Every picture looked at (side by side with the default, 3 passes). 20 generations, no redo.
Method for "looked at": downloaded each result, compared to the default in a contact sheet (layout, play area, objects in place, no faces/text, floors matte, not oversaturated). The in-frame Fold/iPad renders were NOT run (no local build with the CDN skins registered); the first real skinned screen from THIN P1 must still be shot full screen on both devices (as kit-mgskin NIT 1).
## Board map (what each kind draws)
- tat → img/kit/mg-tat-bg.webp (painted hall; empty centre floor) — SKINNED
- ne → img/kit/mg-ne-bg.webp (painted hall; empty centre floor) — SKINNED
- nghe → img/kit/mg-nghe-bg.webp (desk, ear screen, lake terrace; blank sheet kept) — SKINNED
- duho → NOT a mg board: jts.js maps duho to the existing EVENT painting img/ev-le-ha.webp via TS_IMG["tsduho-bg"] and its own kg82Img override (bypasses the skin resolver). Skinned as the resolver would name it: img/mg/tsduho-<id>.webp (3:4, 768x1024, same as the default). Dragon boats / festival items removed from the skin so the water stays an open play area.
- den → same: img/ev-le-thu-2.webp via TS_IMG["tsden-bg"] → img/mg/tsden-<id>.webp (3:4). Lanterns, paper boats, bridge, hall kept in place.
- kinh (Chép kinh, jwkg engine) → no painted board: kg82Pic finds no img/kit/mg-kinh-bg.webp on the CDN → no picture column; engine draws no image. SKIPPED (nothing to skin; Law 9, no new board layout).
- may (May áo, jwkg engine) → kg82Pic returns "" (listed as no-board kind); engine draws no image. SKIPPED.
- Sprites: none skinned. tat-hand / tat-ruler / tat-zone-* / ne-zone-green carry game meaning; hat-lotus (duho) is the pluck target; doden-lantern (den) is the steered object; nothing decorative follows the season.
## WIRING NOTE for MAIN / THIN P1 (needs a code change, not art)
duho and den boards are loaded by the kg82Img override in dev/build/jts.js line ~64 (TS_IMG[n] returns the event picture before the skin resolver runs). To show these two skins, that override must ask the resolver first: when a skin is open use kg82SkinSrc("tsduho-bg"|"tsden-bg") (resolver maps -bg → img/mg/tsduho-<id>.webp / tsden-<id>.webp, falling back to the default if not on the CDN). Until then duho/den simply keep the default picture (no hole). tat / ne / nghe work through the normal resolver with no code change.
## FOR MAIN MGSKIN tat keys
kind=tat skins: xuan(dao, name «Xuân điện»), ha(ngoc, «Hạ đình»), thu(kim, «Thu các»), dong(mac, «Đông điện») | boards: img/mg/tat-xuan.webp img/mg/tat-ha.webp img/mg/tat-thu.webp img/mg/tat-dong.webp | sprites: none | sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/f-mgskin/tat-sheet.jpg | gens: 4 (aFzzU3wfSh xuan, xSoo2p5jfW ha, yiQQDCtPW9 thu, 9ZqqdFbNYZ dong)
## FOR MAIN MGSKIN ne keys
kind=ne skins: xuan(dao, «Xuân sảnh»), ha(ngoc, «Hạ sảnh»), thu(kim, «Thu sảnh»), dong(mac, «Đông sảnh») | boards: img/mg/ne-xuan.webp img/mg/ne-ha.webp img/mg/ne-thu.webp img/mg/ne-dong.webp | sprites: none | sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/f-mgskin/ne-sheet.jpg | gens: 4 (IfRRsxWtvE xuan, gOhhWnlSXO ha, u5ccyyYQLD thu, CqYYJyjEEy dong)
## FOR MAIN MGSKIN nghe keys
kind=nghe skins: xuan(dao, «Xuân hiên»), ha(ngoc, «Hạ hiên»), thu(kim, «Thu hiên»), dong(mac, «Đông hiên») | boards: img/mg/nghe-xuan.webp img/mg/nghe-ha.webp img/mg/nghe-thu.webp img/mg/nghe-dong.webp | sprites: none | sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/f-mgskin/nghe-sheet.jpg | gens: 4 (gOhhWVJSXO xuan, 3zkkIaXREY ha, 1lXXZWRr4r thu, xSooATQjfW dong)
## FOR MAIN MGSKIN duho keys (board key "tsduho", see WIRING NOTE)
kind=duho skins: xuan(dao, «Xuân hồ»), ha(ngoc, «Hạ trì»), thu(kim, «Thu hồ»), dong(mac, «Đông hồ») | boards: img/mg/tsduho-xuan.webp img/mg/tsduho-ha.webp img/mg/tsduho-thu.webp img/mg/tsduho-dong.webp | sprites: none | sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/f-mgskin/duho-sheet.jpg | gens: 4 (lJmmYBIgv9 xuan, N2bbBFH6D9 ha, cpUUQg90eP thu, Bh66x62oQR dong)
## FOR MAIN MGSKIN den keys (board key "tsden", see WIRING NOTE)
kind=den skins: xuan(dao, «Xuân đăng»), ha(ngoc, «Hạ đăng»), thu(kim, «Thu đăng»), dong(mac, «Đông đăng») | boards: img/mg/tsden-xuan.webp img/mg/tsden-ha.webp img/mg/tsden-thu.webp img/mg/tsden-dong.webp | sprites: none | sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/f-mgskin/den-sheet.jpg | gens: 4 (nVllCg2YQD xuan, s7ttnvsl8e ha, 0ewwFP3TfW thu, Td77HNaVNR dong)
## kinh / may
kinh: no painted board — skipped (no skins). may: no painted board — skipped (no skins). Register no skin for them.
## Notes
Sizes: boards 107–244 KB (≤ ~250 KB), 1024x768 (tat/ne/nghe) and 768x1024 (tsduho/tsden), same as the defaults. 20 files uploaded to img/mg/ + 5 sheets to img/_review/f-mgskin/ (wipe with the verdict: python3 dev/site/cdn_sync.py --wipe-review f-mgskin). Nothing in git. Caveat: the 4 skins of tat/ne have a flat matte floor (owner OD "no glossy floors"), so they read slightly plainer than the default's shiny floor — intended.
