# PROGRESS review/place-art (ART fixes for review/place-colour; coordinator-approved, owner rule: wrong art needs no asking)

Branch review/place-art from origin/review/place-colour. Images live on the CDN (img/ is git-ignored): every file below is UPLOADED
(`python3 dev/site/cdn_sync.py --check` = same). Nothing is local-only.

## (a) One-tone brown trưa paintings — DONE, on CDN (same names, overwritten)
9: tam-cung-dem-{xuan,ha,thu,dong}-trua (Ngọc Thanh các), tu-ninh-cung-{xuan,ha,thu,dong}-trua (Đức Thọ), phi-tan-cung-ha-trua.
dev/art/scene-onetone.py regrade v2 = per-channel Lab colour transfer from the sáng sibling (mean + 0.9×std of a*/b*, +1.5 b* noon warmth,
L* untouched). v1 (halfway) still looked pink-brown. Re-measured: 0 one-tone trưa flagged (spread now 5.6–11.0, cast .83–.94).
Sheet: dev/review/place-art/onetone-regrade-sheet.jpg (sáng | before | after). Looked at every one, also full-res crops: no artifacts.

## (b) Night looks like day — DONE, on CDN
The 6 flagged states are 4 paintings (kn = khon-ninh-cung "Càn Ninh": xuan/ha/dong-toi; vuon = ngu-hoa-vien-dong-toi); khon-ninh-cung-thu-toi
regraded too (stage L 50.6, one step from the flag, same hall) = 5 paintings. New dev/art/scene-night.py: L*·s with lamp/moon highlights
protected (smoothstep 88–98), vignette −18 %, cool shadows (b* −5, chroma −12 % by darkness). Mean L* kn 42–43.4 → 31; vuon-dong 48.2 → 38.
Lamps still glow. Sheet: dev/review/place-art/night-regrade-sheet.jpg.
Run: `python3 dev/art/scene-night.py <src dir> <out> khon-ninh-cung-xuan-toi:31 ... ngu-hoa-vien-dong-toi:38` (originals = CDN history only).

## (c) New paintings — DONE, on CDN
- tan-gia-kho-<mùa>-<buổi>.webp ×16 + tan-gia-kho.webp (Tân Giả khố: clean humble laundry courtyard: well, washtubs, drying poles).
- phong-cung-nu-<mùa>-<buổi>.webp ×16 + phong-cung-nu.webp (modest shared maid room: platform bed with 4 quilts, wardrobe, dressing table).
- Magnific gpt-2-6, folder ba4aecfe-…; base = text-to-image with image refs tam-cung-dem-xuan-sang + lanh-cung-xuan-sang (STYLE_ANCHOR scene
  rule: existing room paintings are the style standard); base used as xuan-sang; 15 seasonal/buổi EDITS of the base each (same pipeline as
  PROGRESS_seasons). 1344x752 → 1280x720 webp q80. Ids: dev/review/place-art/magnific-ids.txt. Credits: 35 gens × 40 = 1,400
  (2×2 base candidates, 30 edits, 1 redo of phong-cung-nu-xuan-trua — v1 kept as fallback, not used).
- Looked at every image: composition/floor held in all 32; trưa not one-tone (scene-onetone: 0 flagged); toi L* 25–39.
- Sheets: dev/review/place-art/sheet-tan-gia-kho.jpg, sheet-phong-cung-nu.jpg.

## Data wiring (SẴN SÀNG KIỂM)
- dev/test/life-place.js expectations updated (maid room → phong-cung-nu-*, Tân Giả khố → tan-gia-kho-*): ALL OK, 0 page errors at 755x1000, 1000x755 (others: see report).
- dev/build/j42.js placeOf: tgk sc "lc" → "tgk"; maid "home" (isSrv) sc "home" → "maid".
- dev/build/j94.js: SCIMG.tgk="tan-gia-kho", SCIMG.maid="phong-cung-nu" (j94 sceneImg picks <name>-<mùa>-<buổi>); KIT_FLOOR .55/.6 and
  KIT_FANCHOR {x:.5,feet:.9} for both (jk2b merges window.* presets); SCN_VAR regenerated (12 scenes × 16) by dev/art/gen_scene_seasons.py
  (needs ALL scene images local: `python3 dev/site/cdn_sync.py --pull 'img/<scene>-*'` first, else it drops scenes!).
- dev/build/jsl.js grade(): comment only (tgk now graded like other graded paintings; lãnh cung keeps "none").
- kitLifePlace (jsl §56.4) unchanged: it sets S.place lc/tgk; the picture follows placeOf(S.place).sc.
- Side effects to check: j11 dust particles + j33 festival decor list ["vuon","lc","home"] no longer include tgk/maid (minor);
  j9 map tile for "home" still hard-codes tam-cung-dem.
## Next
- Build (python3 dev/build/assemble.py) and run dev/test/life-place.js + a maid save at 755x1000/1180x820 to see the new pictures;
  optionally re-run dev/test/place-colour.js (expect "night looks like day" 6 → 0).
