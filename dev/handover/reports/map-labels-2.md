# map-labels-2 — A ca sở label on the Dư đồ (owner bug 16/11, OD:L1417 (1))

Branch review/map-labels-2 (off origin/main b7c5d787). Only data changed: `dev/build/jplx.js` `PLX.acs` box + anchor. Lock logic untouched.

## Root cause
`acs` (A ca sở) hotspot box was x .30 y .235 w .115 h .215, i.e. it sat ON TOP of the four green-roof west courts (Vĩnh Thọ, Dực Khôn, Trữ Tú, Hàm Phúc, boxes of jpal.js). Its label centre (.357,.341) floated between them; four neighbouring labels + one lock label in one block. No painted building was "A ca sở" there.

## History check (OD:L1327) — where the princes' quarters were
A ca sở (阿哥所) = the princes' residences inside the Forbidden City. They were on the EAST side, never among the western six palaces:
- Càn Đông ngũ sở (乾東五所, "five compounds east of Qian"): north-east corner, beyond the Eastern Six Palaces; princes' quarters in the Qing.
- Nam tam sở (南三所, "south three compounds"): east, south of the Càn Đông compounds, beside Văn Hoa điện / the Thái tử's Đông cung area; Qing princes and the heir lived/studied here.
- Càn Tây ngũ sở (乾西五所): the north-west counterpart, used by young princes in the Kangxi–Qianlong era, but it was a separate cluster at the NW corner, not the western six palaces.
Our map: the NE walled court (two small golden pavilions, x≈.74–.84, y≈.10–.23) is the "north-east corner beyond the east palaces" → A ca sở. The Thượng thư phòng (SE) and Đông cung (E) are already on the east side, so the princes' group (A ca sở · Thượng thư phòng · Đông cung) is now one coherent east-side cluster.
Sources: general knowledge of 故宮 layout (Palace Museum guides; Wikipedia 阿哥所 / 乾東五所 / 南三所). Not re-fetched in this session (no web check) — flagged for the coordinator if a citation is wanted.

## Fix
`PLX.acs.box` {x:.30,y:.235,w:.115,h:.215} → {x:.742,y:.098,w:.095,h:.125}; `anchor` {.355,.33} → {.79,.16}. `pos` (walk cost) unchanged ([2,3]).

## Whole-group audit (every Dư đồ label vs the painted building, 29 spots)
All other labels already sat on their building; only A ca sở was wrong. The upper-east yellow hall (y .24–.31, between Hàm An… and Đông cung) stays unlabelled (no place in the game uses it).

| Label | Hotspot box x,y,w,h | Label centre x,y | Lock | Painted building under the label |
|---|---|---|---|---|
| Ngự hoa viên | 0.435, 0.095, 0.13, 0.11 | 0.5, 0.137 |  | garden pavilion + pond (N centre) |
| Càn Ninh cung | 0.44, 0.21, 0.12, 0.16 | 0.5, 0.277 |  | upper walled court, main hall (N centre) |
| Dưỡng Hòa điện | 0.44, 0.38, 0.125, 0.205 | 0.502, 0.471 | yes | large yellow-roof hall (centre) |
| Cần Chính điện | 0.4, 0.61, 0.205, 0.18 | 0.502, 0.687 | yes | great hall on the terrace (S centre) |
| Đức Thọ cung | 0.12, 0.19, 0.145, 0.26 | 0.192, 0.307 |  | ? |
| Thái y viện | 0.665, 0.615, 0.135, 0.17 | 0.732, 0.687 |  | herb-bed court (SE of Cần Chính) |
| Kính sự phòng | 0.57, 0.855, 0.185, 0.08 | 0.662, 0.882 |  | three small courts (S) |
| Trường Môn viện | 0.692, 0.095, 0.045, 0.105 | 0.714, 0.146 |  | long grey hall (NE, next to the east palaces) |
| Ngọc Thanh các | 0.29, 0.45, 0.065, 0.13 | 0.322, 0.502 |  | green-roof court (W, lower) |
| Dãy nhà cung nhân | 0.085, 0.645, 0.11, 0.155 | 0.14, 0.709 |  | long grey halls court (SW) |
| Tân Giả khố | 0.097, 0.466, 0.13, 0.1 | 0.162, 0.503 |  | laundry yard with tubs and horses (W) |
| Thượng thư phòng | 0.825, 0.635, 0.07, 0.09 | 0.86, 0.679 | yes | green-roof hall (SE) |
| A ca sở | 0.742, 0.098, 0.095, 0.125 | 0.789, 0.159 | yes | NE walled court with two small golden pavilions (MOVED from the middle of the four west courts) |
| Đông cung | 0.795, 0.425, 0.075, 0.185 | 0.832, 0.516 | yes | yellow hall with pink trees (E) |
| Nội vụ phủ | 0.085, 0.575, 0.13, 0.075 | 0.15, 0.601 |  | grey storehouse buildings (W) |
| Cảnh Phúc | 0.645, 0.448, 0.077, 0.142 | 0.683, 0.507 |  | east palace court |
| Khải Tường | 0.645, 0.322, 0.067, 0.123 | 0.678, 0.382 |  | east palace court |
| Chung Tú | 0.645, 0.208, 0.06, 0.11 | 0.675, 0.262 |  | east palace court |
| Hàm An | 0.645, 0.098, 0.043, 0.105 | 0.666, 0.149 |  | east palace court |
| Thừa Minh | 0.572, 0.322, 0.068, 0.123 | 0.606, 0.382 |  | east palace court |
| Diên Huy | 0.575, 0.448, 0.066, 0.142 | 0.608, 0.518 |  | east palace court |
| Vĩnh Hòa | 0.572, 0.208, 0.068, 0.11 | 0.606, 0.262 |  | east palace court |
| Trường Xuân | 0.572, 0.098, 0.068, 0.105 | 0.606, 0.149 |  | east palace court |
| Vĩnh Thọ | 0.303, 0.222, 0.058, 0.105 | 0.332, 0.273 |  | NW green-roof court |
| Dực Khôn | 0.368, 0.222, 0.058, 0.105 | 0.397, 0.273 |  | NW green-roof court |
| Trữ Tú | 0.303, 0.338, 0.058, 0.105 | 0.332, 0.389 |  | W green-roof court |
| Hàm Phúc | 0.368, 0.338, 0.058, 0.105 | 0.397, 0.389 |  | W green-roof court |
| Thái Cực điện | 0.368, 0.455, 0.058, 0.105 | 0.397, 0.506 |  | green-roof court (W, lower) |
| Ngoại triều | 0.445, 0.805, 0.11, 0.12 | 0.5, 0.864 |  | front hall at the gate (S) |

## Tests (dev/test/map-labels-2.js + stitch.py)
- Shots: dev/review/map-labels-2/755x1000-map.jpg, 1180x820-map.jpg (whole map), *-acs-card.jpg (tap on the locked A ca sở → option card: "Không vào được lúc này: chỉ Tần trở lên hoặc mẹ của hoàng tử", Đường đi 1 khắc).
- Old save: a save made with origin/main loads in the new build (deser ok) at both sizes.
- Page errors: 0 at both sizes.
- Note: one early run showed a transient label "Thái giám ???" on the Vĩnh Thọ spot (first render of a fresh game); 3 later runs showed "Vĩnh Thọ". Not reproduced; flagged, not touched.
