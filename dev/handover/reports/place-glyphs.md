PALETTE GUIDE v3 READY (2026-11-16 07:54Z) - supersedes v2: the TARGET IS THE KÍNH SỰ PHÒNG 16-set (owner circled it 16/11 07:42Z), see section 'NVP v4' below. Foreman C: use v3 numbers and tone_match.py with prefix kinh-su-phong.

PALETTE GUIDE v2 READY (2026-11-16 07:27Z)

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

## PALETTE GUIDE for sáng / trưa / chiều / tối (from the APPROVED 16-sets; use for NVP v2 and the 38 festival pictures)
Measured on 8 approved sets x 4 seasons (canh-phuc-cung, kinh-su-phong, thai-y-vien, lanh-cung, tam-cung-dem, phi-tan-cung, khon-ninh-cung, ngu-hoa-vien), 32 images per buổi. HSV on a 256x170 downscale; "warm" = mean(R-B) 0-255; "vivid" = % of pixels with S>0.6 and V>0.6; contrast = std of luma.
| buổi | mean sat | mean value | warm | contrast | vivid px |
| sáng  | 0.28 | 0.66 | 39 | 42 | 2.6 % |
| trưa  | 0.32 | 0.72 | 50 | 44 | 3.3 % |
| chiều | 0.44 | 0.63 | 68 | 40 | 4.6 % |
| tối   | 0.40 | 0.44 | 29 | 35 | 1.5 % |
How each buổi is treated (looked at all 4 buổi of 4 approved sets):
- sáng: pale, slightly cool, fresh light; low saturation; soft lattice shadows; lanterns unlit; sky pale blue/white.
- trưa: brightest and most neutral (near-white light), short soft shadows, same low saturation; NOT warmer than sáng by much.
- chiều: one gentle amber wash over the whole room (warm 68, the only warm-tilted buổi), long soft light shafts through the lattice as patches on the floor, sky pale peach; reds stay dusty brick; lanterns unlit; no orange hot spots (vivid px <= ~5 %).
- tối: whole room dark and dusky blue-grey (value ~0.44, about 60 % of trưa), deep navy window with a moon, lanterns lit as SMALL warm glows with limited light pools on furniture; no blown-out orange; the warm light is local, the ambient stays cool.
- Floor: the approved sets have polished/glossy floors (Cảnh Phúc marble, Kính sự phòng wood). The owner's later rule (OD:L86 + 16/11 Nội vụ phủ ruling) is MATTE painted floor for new pictures: do not copy the approved gloss; soft painted texture, light patches as flat painted shapes, no mirror reflections.
- What made my v1 NVP set "AI" (measured vs approved): chiều vivid px 23 % vs 4.6 %, warm 85 vs 68, sat 0.51 vs 0.44; tối value 0.58 vs 0.44, vivid 18.6 % vs 1.5 %, warm 63 vs 29 (blown-out orange lantern light, hot floor).
Prompt wording that worked (gpt-2-6, 2k, 3:2, edit of the matte base + for chiều/tối a second reference = approved same-buổi scene, "colour and light reference only"):
  base edit: "...floor becomes a MATTE hand-painted floor ... NO reflections, NO gloss ...; lower overall saturation by about 25 percent ... dusty and calm like the second reference".
  chiều: "a gentle warm amber wash over the room like the second reference, soft long light shafts through the lattice as soft painted patches on the matte floor, colours stay muted and dusty, NO hot orange, NO glow, lanterns unlit."
  tối: "the whole room is dark and dusky blue-grey (about half the daytime brightness), deep navy moonlit window with a soft moon, lanterns lit as small soft warm glows with gentle warm light pools, a few small candle flames, NO blown-out orange light, NO strong glare, colours muted and cool."
  sáng/trưa: "pale, soft, slightly cool fresh light, low saturation" / "bright soft neutral-white light, short soft shadows, low saturation".

## NVP v2 set (redone, NOT wired) — SẴN SÀNG XEM
Base = matte edit of the v1 spring-morning (creation xSdQHxgjfW) + 15 edits. 16 x 65 = 1,040 credits. All 16 tiles looked at on the sheet, side by side with the approved Kính sự phòng same season + buổi.
Sheet (1560 wide): CDN https://ctm-img.victoria-tntt.workers.dev/img/nvp-scene-v2-vs-approved-sheet.jpg (also reports/place-glyphs-nvp-v2-vs-approved.jpg). Top row of each pair = approved, bottom = new.
Measured NEW vs approved (mean of 4 seasons): sáng sat .28/.28 val .63/.66 warm 43/39; trưa sat .29/.32 val .66/.72 warm 47/50; chiều sat .41/.44 val .60/.63 warm 63/68; tối sat .27/.40 val .31/.44 warm 13/29; vivid px 0.2-0.3 % everywhere (approved 1.5-4.6 %).
Honest findings: (1) sáng/trưa/chiều colour matches the approved sets closely; floors are matte. (2) The new set is FLATTER: contrast ~30 vs ~41 approved (and 21 vs 35 at tối). (3) tối is darker and cooler than approved (val .31 vs .44) and the lanterns give less warm glow than approved; it reads gloomy rather than cosy. (4) Floor colour is a mauve-grey, less rich than the approved warm wood/marble. Suggested if she wants closer: one more pass on the 4 tối tiles only (about 260 credits) asking for brighter lantern pools, or a light grade in code; her call. Not redone without asking.
Mapping (season-buổi -> Magnific creation): xuan-sang xSdQHxgjfW, xuan-trua eIOnTtCdqL, xuan-chieu huRpoqEvqL, xuan-toi lJ8br64gv9, ha-sang ksDCHZV16B, ha-trua w4h1spE7EI, ha-chieu KLMfFWakqp, ha-toi LwBHkdIswO, thu-sang jUXF1gYLD0, thu-trua eIOnMtadqL, thu-chieu xSdQk77jfW, thu-toi ksDCb7i16B, dong-sang fHAXhxhCDY, dong-trua SytKsA4Ub8, dong-chieu JNaxUchOq4, dong-toi lJ8bjnZgv9. (v1 set ids stay in this file above; superseded.)
Credits total this session so far: ~1,890 (glyph v1 + v1 scene) + 120 (glyph v2 samples) + 1,040 (NVP v2) = ~3,050.

## NVP v3 (owner-via-s12 order: redo 4 tối + lift contrast) — SẴN SÀNG XEM, NOT wired
- 4 tối tiles repainted (xuan/ha/thu/dong, edits of the matte base with the approved Kính sự phòng tối as colour+light reference): 4 x 65 = 260 cr. New creations: xuan-toi 79vxyMfJAL, ha-toi vQZdCyMa47, thu-toi gOIKwXJSXO, dong-toi gOIKw8PSXO. (The 12 sáng/trưa/chiều tiles are unchanged from v2.)
- Tone pass on ALL 16 (code, no repaint): dev/art/tone_match.py (luma-only contrast curve about each picture's mean, mean luma moved to the approved value of that buổi, mean saturation pulled back to the approved value). Doing the contrast stretch on RGB instead made chiều vivid again (vivid px 16 %, warm 84): do NOT use plain RGB contrast.
- Measured v3 (mean of 4 seasons) vs approved: sáng sat .28/.28 val .66/.66 contrast 40.5/41.6 warm 44/39 vivid .1/2.6 | trưa .32/.32 .72/.72 41.3/43.5 55/50 .4/3.3 | chiều .44/.44 .64/.63 39.5/40.4 70/68 .7/4.6 | tối .40/.40 .45/.44 33.8/34.6 37/29 2.3/1.5 (new / approved).
- Looked at all 16 tiles vs the approved row: tối now has visible warm lantern pools and candle glow on a dusky blue room; chiều amber wash matches; floors stay matte (mauve-grey). Remaining difference: floor colour is greyer than the approved warm wood (owner asked matte, so kept).
- Sheet (1560 wide, approved row over new row): https://ctm-img.victoria-tntt.workers.dev/img/nvp-scene-v3-vs-approved-sheet.jpg (also reports/place-glyphs-nvp-v3-vs-approved.jpg). Supersedes the v2 sheet.
- Credits: +260 (4 tối) -> NVP v2+v3 = 1,300; session total ~3,310.
- Final tone-passed PNGs exist only in this worker's scratchpad (not uploaded as game files, since nothing is wired); regenerate with tone_match.py from the Magnific creations listed above, or ask me to upload when the owner approves.

## NOTE FOR FOREMAN C (38 festival pictures): use THIS corrected guide
1. Use the PALETTE GUIDE table above (approved targets) and the prompt wording above, but the corrected tối wording is the v3 one: "calm NIGHT with the same balance of light as the second reference: the room is mid-dark, a dusky blue ambient but clearly visible (not near-black, about 60 percent of the daytime brightness), deep navy moonlit window with a soft moon; every lantern lit and glowing a clearly visible warm amber, with soft warm light pools on ..., a few candle flames; strong gentle contrast between warm lit areas and cool blue shadows; colours still muted, NO blown-out orange, NO glare." (v2 wording gave value .31, too dark and flat.)
2. Always edit from an approved-style base and pass the approved same-buổi scene as a "colour and light reference only".
3. Finish every picture with dev/art/tone_match.py (target contrast ~41 day / ~35 night, value .66/.72/.63/.44 for sáng/trưa/chiều/tối). Check with the same measures (sat, value, contrast, warm, vivid px) and a side-by-side against an approved row before reporting.
4. Floors: matte painted (owner rule); the approved sets themselves are glossy, do not copy that.

## NVP v4 (owner verdict on v2: "màu nhạt nhòa quá", target = the circled Kính sự phòng rows) — SẴN SÀNG XEM, NOT wired
Owner's markup (dev/handover/refs/owner-nvp2-markup.jpg): she circled the approved KSP rows and kept them as the target; the new NVP rows (v2) were washed out. v1 was too vivid, v2/v3 too flat: v4 aims exactly at KSP.
Route: (1) matte+deep-colour base = edit of the v1 spring-morning base (lJ8bS37gv9) with KSP xuan-sang as colour reference only (creation 6AHwfCliJO); (2) 15 edits of that base, each with the KSP tile of the SAME season+buổi as colour reference ("take the colour depth, warmth, contrast, light and lantern glow from the SECOND reference ... do not copy its room"); (3) tone pass with dev/art/tone_match.py targets measured on KSP only (contrast/luma, saturation, warmth).
Credits: 16 x 65 = 1,040 (under 1,200). Session total ~4,350.
Measured on the 4 seasons per buổi, new (after tone pass) vs KSP: sáng sat .34/.35 val .58/.59 contrast 44.0/44.3 warm 45/43 vivid .3/2.1 | trưa .39/.39 .64/.65 44.7/45.2 58/57 .8/1.8 | chiều .51/.51 .56/.56 43.3/43.5 69/69 4.6/2.0 | tối .46/.48 .37/.40 34.4/34.6 40/38 .9/1.0. Before the tone pass the raw edits were redder/more saturated than KSP (sat +.1, vivid px 10-17 % vs 2 %).
Looked at all 16 tiles against the KSP row of the same season+buổi (sheet): crimson carpet and pillars, warm brown wood, amber chiều wash with lattice light shafts, tối = dusky blue room with warm lantern pools: the depth/warmth/contrast/glow read as the same family as the circled rows.
Floor: warm deep-brown wood with a MATTE painted finish (owner wants no gloss on the new pictures); KSP's own floor is polished, so the floor is the one deliberate difference.
Sheet (1560 wide, KSP row over the new row, same season+buổi): https://ctm-img.victoria-tntt.workers.dev/img/nvp-scene-v4-vs-ksp-sheet.jpg (also reports/place-glyphs-nvp-v4-vs-ksp.jpg).
Mapping (season-buổi -> Magnific creation; raw edits before the tone pass): xuan-sang 6AHwfCliJO, xuan-trua bxTaYhL5Y2, xuan-chieu aF2XiBMfSh, xuan-toi CqGoRv8EEy, ha-sang eIOYwBUdqL, ha-trua lJ85XO3gv9, ha-chieu XmPcJC4Bfo, ha-toi 1lpuV9yr4r, thu-sang 8aNVPLCIrU, thu-trua s7obdLnl8e, thu-chieu UPm1I4ywny, thu-toi Bh40yQroQR, dong-sang mE3p6LQhJQ, dong-trua s7obXTHl8e, dong-chieu JNajh8ROq4, dong-toi XmPcONIBfo. v2/v3 sets are superseded.
Final tone-passed PNGs are only in this worker's scratchpad (nothing wired yet); upload as game files after the owner approves.

## PODIUM BACKDROP SAMPLE (Vinh danh; owner asked why it looks bad) — SẴN SÀNG XEM, NOT wired
1) Model of the live podium-bg2 (found in Magnific history, folder ba4aecfe): the portrait podium-bg2-p came from text-to-image, model gpt-2-6 (GPT 2.6, variant sunburst), 3:4, 2k, 768x1024, 65 cr each, 2026-11-14 16:05Z: creations KLMcAREkqp (seed 34201) and rgeVnAmxtc (seed 860624); which of the two shipped is not recorded. Prompt: "re-composition of the reference painting as a stage backdrop... cream, rose and gold palette, red silk drapes, gold lanterns, faint rose phoenix... no sun rays, no halo". The landscape podium-bg2 was not in the history search (4,272 items); presumably the same prompt at 16:9, not confirmed. So the model was right (gpt-2-6) but it was a fresh text-to-image, NOT an edit of an approved hall.
   Why it looks bad (measured, 256x170, same measures as the guide): live podium-bg2 value .83 (KSP .59), warm 110 (KSP 43), vivid pixels 44 % (KSP 2 %), contrast 39; i.e. a blown-out cream-gold glow with polished mirror-like marble floor and light shafts, cream/gold monochrome with no value structure.
2) New sample: gpt-2-6 EDIT of the approved Dưỡng Hòa điện hall (img/duong-tam-dien-xuan-sang, CDN) with KSP xuan-sang as colour reference only: throne/dais/screen/incense burners/cranes removed, open floor in the centre + lower half, matte painted floor, same dragon pillars, painted ceiling, lanterns. Landscape 16:9 2k: creation 3zbJx06REY. Portrait 3:4 2k (edit of the landscape result): creation WDs3JwscXe. Credits 2 x 65 = 130.
   Self-checked both at 1024 px: no people, no text, no halo/rays, floor matte, centre/lower half open for figures; the back wall is a plain crimson panel (good contrast for figures in light robes, less for crimson robes).
3) Measures (raw vs KSP sáng): landscape raw sat .46 val .60 contrast 34.7 warm 67 vivid 12 %; portrait raw sat .48 val .59 contrast 25.2 warm 73 vivid 12 %. Tone-matching to KSP (tone_match.py) pulls sat to .34 and warmth to 45 but turns the red floor grey-mauve, i.e. KSP's statistics suit rooms with much white/wood, NOT this red-dominant hall. RECOMMEND the RAW pictures (optionally only a contrast lift, no saturation pull). Both shown on the sheet.
Sheet (1560 wide: old | new raw | new + tone, landscape row, then portrait row): https://ctm-img.victoria-tntt.workers.dev/img/podium-bg3-sample-sheet.jpg (also reports/podium-bg3-sample.jpg).
Not uploaded as game files, nothing wired (KIT_BD.podium in jbd.js still points to podium-bg2); on approval: download both creations, save as img/kit/podium-bg3.webp / podium-bg3-p.webp, point KIT_BD.podium at them.
Session credits total ~4,480.

## NVP v4 finals are on the CDN + branch review/nvp-v4 (manifest only)
Repo law (CLAUDE.md, dev/art/CDN.md): images live on the CDN, never in git, so instead of pushing PNGs: 16 tone-passed + 16 raw edits (3072x2048 webp q90, 53.8 MB) uploaded to https://ctm-img.victoria-tntt.workers.dev/img/nvp-v4-<season>-<buoi>.webp and img/nvp-v4-raw-<season>-<buoi>.webp. Branch review/nvp-v4 (from origin/main) holds only dev/art/NVP_V4.md: URLs, creation ids, md5s and the wiring steps. Not wired.
