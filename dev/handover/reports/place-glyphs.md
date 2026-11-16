# place-glyphs — SẴN SÀNG KIỂM 4ddddde3 (review/place-glyphs, includes origin/main ba07c65e). Glyphs owner-approved; Nội vụ phủ scene NOT wired (owner approves art first).
Branch review/place-glyphs (commit pushed; code only). Session session_01UV1SzmEsuu42GCFecC9HGf. No new generation after the pause order.

## Audit: places without a glyph (before)
Had glyph: nvp(bac) tyv(y-thuat) vuon(hoa = brush+blossom, not a garden) thu/dtd(sung) tn(duc) kn(danh).
Missing: ksp, lc, home + every consort palace r<N>, cnh, tgk, ttp, acs, dc  (+ a real garden glyph for vuon per D56).

## Done (9 glyphs, gpt-2-6, folder ba4aecfe, 3 old icons as refs, transparent bg, 1k, 2 candidates each, ALL 18 looked at on contact sheets; picked one each)
place-ksp (3 jade tablets) · place-lc (closed gate + bare plum) · place-cung (palace pavilion roof; used for home and every r<N>) · place-vuon (moon-gate garden) ·
place-cnh (servants' house + folded silk) · place-tgk (wash tub) · place-ttp (books, scroll, inkstone) · place-acs (toy horse, bow) · place-dc (crown prince's crown).
128 px webp, trimmed to bbox. Uploaded to the CDN: img/place-<key>.webp. Sheet: dev/handover/reports/place-glyphs-sheet.png (large + 14 px preview row).
Code (review/place-glyphs): dev/build/jact.js KIT_PLACE_IC + kitPlaceIcon (r<N> fallback -> place-cung); KIT.md §78 updated. No code-drawn art.

## Nội vụ phủ scene (D56) — PARTIAL, not wired
Base (spring-morning) = Magnific creation lJ8bS37gv9 (looked at; the other candidate eIOnX8odqL also good). 15 season x buổi edits (residence_prompts.txt wording) were ALREADY queued before the pause (65 credits each):
xuan-trua YML60jaWeC · xuan-chieu xSdQsBMjfW · xuan-toi YML60SQWeC · ha-sang u5n8HVRQLD · ha-trua Bh4cI2xoQR · ha-chieu vQZeCTua47 · ha-toi lJ8bUFcgv9 · thu-sang 1lpEjC4r4r ·
thu-trua TdSZDZzVNR · thu-chieu yiCLNZfPW9 · thu-toi rgeusJOxtc · dong-sang 3zb7ATbREY · dong-trua UPmkOZCwny · dong-chieu tCiMakYmZJ · dong-toi O6fj902ynm.
Not yet looked at, downloaded, or uploaded. Wiring still to do: SCN_HAVE/SCIMG "plx-nvp" -> noi-vu-phu (nvp currently borrows sc "ksp" in jact.js l.84), KIT_FLOOR/KIT_FANCHOR.

## NOT done
Tests, Playwright shots of Dư đồ (1180x820@2, 755x1000@2, 844x390), looking at the glyphs in game at 14 px. Other D56 icons (palace roof/garden done; Kính sự phòng tablets, Lãnh cung done) — none left except the scene.
## Credits
Glyphs 18 x 40 = 720; scene base 2 x 65 + 15 x 65 = 1105; stray estimate call 65. Total ~1890.
## Next (owner's morning)
Owner reviews the sheet (samples). If approved: mass production/wiring goes to Foreman C per main s10.

## Update (coordinator s11 order, after owner approved the 9 glyphs)
- Merged origin/main ba07c65e, rebuilt with build_site.sh, committed index.html + sw.js. SHA 4ddddde3.
- node dev/test/act-dedupe-vp.js at 1180x820, 755x1000, 844x390 (also run at @2 for shots): all ok, FAIL 0, no page errors, no clipping/h-scroll; map icons 19 (was 7), list icons 23.
  Looked at @2 shots of map/list: new glyphs read at 14 px (Kính sự phòng, Dãy nhà cung nhân, Tân Giả khố, A ca sở, Đông cung, Thượng thư phòng, Trường Môn viện, consort palaces, Ngọc Thanh các). Dãy nhà cung nhân (cnh) is the busiest at 14 px but still recognisable.
  Labels with no icon on the map are the unoccupied rival-slot names (Vĩnh Thọ, Dực Khôn, Trữ Tú, Hàm Phúc, Thái Cực điện, Vĩnh Hòa, Thừa Minh, Diên Huy): not places the player can enter (no data-go); unchanged.
- Nội vụ phủ scene: 15 paid edits downloaded and looked at (all 16 incl. base on one sheet). All consistent (same room/camera, correct season + buổi, no people, no text). Nothing redone. Observation for the owner: the floor is fairly glossy/reflective (owner rule OD:L86 "no glossy floors") — her call. NOT wired.
  Sheet (1560x1040, base + 15): CDN https://ctm-img.victoria-tntt.workers.dev/img/nvp-scene-contact-sheet.png ; also dev/handover/reports/place-glyphs-nvp-scene-sheet.png.
  Full-size scene PNGs are only in the Magnific folder (ids above); not uploaded to the CDN as game files yet (waiting for approval).

## v2 SAMPLE (owner: "vẽ lại biểu tượng nơi chốn ... không giống phong cách game"), 3 of 9, NOT wired, live files untouched
Rules read: START_CORE/WORKER/ART + art-items-pets + art-frames-kit located and grepped for icon/style/seal/sample rules (not every line of the 53 KB read), plus STYLE_ANCHOR.
What "game style" is (looked at item icons item-chenthuoc/cocngoc/bangda/dan-co/bo-dieu, kit icons ico-map/ico-room, act-an-thai, the Dư đồ map painting):
- Muted, dusty palette: pale celadon/jade, aged ivory, weathered wood, brick/maroon red (never pure saturated red), old pale gold.
- Soft natural light, near-3D painterly surface detail (patina, wood grain, glaze), no hard cartoon highlights; map = ink line + watercolour.
- Gold is only a THIN edge line / small corner touches; decoration is restrained (one peony motif on a surface, not covering everything).
- My v1 glyphs were the opposite: saturated red+gold, thick gold bevels, ornament on every surface, glossy cartoon look.
Sample sheet: dev/handover/reports/place-glyphs-v2-sample.png (old | new | game reference, large + 14/28 px). New = ksp (jade tablets), lc (cold-palace gate; alpha cleaned in code from a hazy cut-out, no regeneration), tgk (wash tub).
Prompts: gpt-2-6, 1k, 1:1, transparent, refs = 3 game item pictures (chenthuoc, cocngoc, bangda), 1 candidate each. Credits: 3 x 40 = 120.
Verdict: new ones sit with the game items (palette, light, detail). At 14 px the pale tablets (ksp) are less punchy than v1 but still read as tablets; flag if she wants stronger contrast.
Next if approved: redo the other 6 (cung, vuon, cnh, ttp, acs, dc) the same way (mass production -> Foreman C), then replace img/place-*.webp on the CDN.
