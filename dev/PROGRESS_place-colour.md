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

## Known / not code
- Tân Giả khố and Lãnh cung share the lãnh cung painting (sc "lc"); the cung nữ room uses her room painting (tam-cung). Art gap, not a
  filter: a laundry painting and a maid-room painting would need Magnific art (coordinator decision).
- Paintings themselves: trưa/chiều are warmer (b* +5…+10 over sáng) — that is the approved graded art, not a filter.
