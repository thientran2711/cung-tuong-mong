# PROGRESS review/place-colour (scene colour of EVERY place — LUẬT SỬA CẢ NHÓM)

Owner 15/11: scene-light fixed only her room (Ngọc Thanh các) — check every place. Coordinator add-on: a lãnh cung save showed her old room.

## Done
- Scan `dev/test/place-colour.js` + `dev/test/place-colour.py`: every place (her room, Cần Chính, Dưỡng Hòa, Đức Thọ, Càn Ninh, Ngự hoa
  viên, Thái y viện, Kính sự phòng, Lãnh cung, Tân Giả khố, consort palaces tier rp0–rp3) × 4 seasons × 4 buổi × the season's 4 weathers
  (= 960 stage states) + Dư đồ map 4×4 + 14 festival maps × 4 buổi. Records the computed filter chain on the picture (CSS `.scimg` and
  Pixi `.pxc`), `.light` / `::after` / frost layers, figure filters, a grey probe figure's rendered colour; measures mean L*/a*/b* as seen vs
  as painted (all scene layers off); flags; contact sheets per place; before/after table (`compare.md`).
- Fix (jsl.js, KIT §56.2): ONE scene grade `--kscf` used by both backdrops. Before, on WebGL devices (Pixi draws the backdrop and hides
  `.scimg`) every `.scimg` filter was invisible, so phones and no-WebGL screens differed. Old p1/j25 stacked sepia/brightness/saturate rules
  are overridden for every picture (not only graded ones). Dry snow/frost: no blue-grey wash on graded paintings (lãnh cung keeps it).
- Fix (jsl.js, KIT §56.4): life-state place — lãnh cung always shows Lãnh cung (reload after a new day showed Ngọc Thanh các), a maid in
  Tân Giả khố always shows Tân Giả khố. Test `dev/test/life-place.js`.

## How to run
- Build `python3 dev/build/assemble.py`; copy dev/index.html to `.ahcache/after.html` (git-ignored via info/exclude).
- `node dev/test/place-colour.js .ahcache/after.html .ahcache/aft 1180x820 0/2 "" nopx` and `1/2` in parallel (~10–20 min on a busy box),
  then `python3 dev/test/place-colour.py .ahcache/aft .ahcache/bef`.
- Pixi path (slow in headless, ~1–2 min/state): drop `nopx`, pick states with `PCSTATES=xuan-2-1,ha-3-2`.
- `node dev/test/life-place.js .ahcache/after.html 755x1000`.

## Results (1180x820, 968 stage states + 16 map + 56 festival-map states, 0 page errors)
- Flags before → after: cool weather wash 96 → 0; grey cold wash (chroma −3.5 on warm chiều halls in rain) 31 → 0; brightness jump > 8 L*
  34 → 0; figure tinted 0 → 0 (grey probe = 128/128/128 in every state; 2 "before" hits were the probe removed by a stage re-render);
  sepia / stacked filters 0 → 0 on the CSS path; Pixi path: before NO grade at all, after the same --kscf (pxf = filter).
  Left: "night looks like day" 6 (Càn Ninh night L* 52–53, Ngự hoa viên winter-snow night 53) = the paintings (lamp-lit gold screen /
  snow), no filter — art decision.
- dev/review/place-colour/: SUMMARY.md (place × buổi × weather class before/after), compare-all-states.md, flags-*.txt,
  sheet-<place>.jpg (before above, after below), sheet-festival-maps.jpg, onetone-sheet.jpg + onetone-report.txt.
- Life-state place: dev/test/life-place.js ALL OK at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 (before: 4 BAD — lãnh cung reload /
  home → Ngọc Thanh các; Tân Giả khố in session / reload → maid room).

## ONE-TONE PAINTINGS (needs coordinator decision — art, not code)
- `dev/art/scene-onetone.py <img cache> <out>` measures all 160 graded paintings: 9 trưa paintings are nearly one-tone (cast ≥ .95,
  colour spread 2.4–7.2 vs 8.5–12.3 for their sáng sibling): tam-cung-dem (Ngọc Thanh các) xuan/ha/thu/dong-trua, tu-ninh-cung (Đức Thọ)
  ×4 trưa, phi-tan-cung-ha-trua. This is the "her room at trưa all brown" the owner saw — it is IN the picture, no code filter left.
  The script writes a proposed Lab re-grade (colour spread restored, cast halfway to the sáng sibling, L* untouched) + sheet; NOT uploaded.
  To ship: re-run the script (input = the 160 CDN paintings, e.g. the scan cache .ahcache/img), look at every output, copy to img/,
  `python3 dev/site/cdn_sync.py img/<files>`.

## Known / not code
- Tân Giả khố and Lãnh cung share the lãnh cung painting (sc "lc"); the cung nữ room uses her room painting (tam-cung). Art gap, not a
  filter: a laundry painting and a maid-room painting would need Magnific art (coordinator decision).
- Paintings themselves: trưa/chiều are warmer (b* +5…+10 over sáng) — that is the approved graded art, not a filter.
