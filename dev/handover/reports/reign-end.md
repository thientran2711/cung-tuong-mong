# REIGN-END — the Emperor's reign ends by game state (review/reign-end)

PRIORITY #1 CHECK: OD 'nhường ngôi|phế|lật đổ|reign' 42 hits (ruling row 26/11 ~21:20Z «Làm theo khuyên nghị hoàng thượng trên đi», read verbatim; + 21:30Z «Đời tôi chỉ kết thúc khi hoàng thượng đưa ra quyết định, hoặc đời ổng kết thế nào hoặc tôi quyết định thôi» + 21:40Z «Giữ bệnh, độc, ám sát») | main: j3 emperorDies / mortEmpDue (jmort), j99succ (succession three roads, «Nhường ngôi … Thái thượng hoàng» c_abd of HER reign), jreign (rg.p throne grip, sides), j55 (five court houses, pow, Quốc sự biên cương / kho lúa), j51 kvOrder (crown prince) | review/pace-speed (BAL.mort.life.dice.emp {70,18,30–95}, read only) | claims none. All REUSED: no new succession / fate / house / heir code.

Branch `review/reign-end` from review/pace-speed bc3cb096. Worker REIGN-END for MAIN 163 → 164.

## What it does (dev/build/jreignend.js, numbers BAL.re in jbal2.js)

One monthly pass, answered through j3's existing `mortEmpDue()`; when an event fires the EXISTING `emperorDies()` flow runs unchanged
(heir → j99succ three roads when her son / she as đích mẫu; her fate by rank / children — Thái phi, xuất gia, xuất cung …). Only the words change.

| event | driven by (game state) | NPC goals (law 6b) | her two-way card (law 1, roads of equal weight laws 2/3) |
|---|---|---|---|
| NHƯỜNG NGÔI | pressure 0..100 / month: crown prince grown (≥ 10, more each year), Thái hậu alive presses (×1.5 if he is Hiếu thảo), the court's petitions (more when Quốc sự is bad), his illness (×2 the lifespan omen), age over 45, reign over 10 y, heir's house strong; × his temper (Chăm chính clings, Đa tình / Mê sắc let go) × throne grip (jreign rg.p). Card at 55, abdicates at 100. No son → a hoàng đệ (slow) | Thái hậu, court houses | «Dâng sớ xin Hoàng thượng giữ ngôi» (tốn Danh, được Sủng, pressure −25) · «Cùng triều thần xin lập tân quân» (tốn Sủng, được Danh + Thái hậu, pressure +20) · «Giữ mình» (được Đức) |
| PHẾ | per court house: evidence of misrule gathers (biên cương / kho lúa < 40, black mood, illness) × the house's drive; opens when power ≥ 60, its best consort's Sủng ≥ 45, evidence ≥ 4 and it has a prince to raise; tông thất votes after 3 months (odds) — win: deposed, their prince raised; lose: house −25 power, its women −Sủng | each house: greed (corrupt head), head skill, a prince of its blood | «Mật tấu với Hoàng thượng» (house becomes enemy, được Sủng, odds −15, −2 evidence) · «Ngầm tiếp tay» (tốn Bạc, house backs her, odds +15; if it fails she loses Sủng/Danh) · «Giữ mình» |
| LẬT ĐỔ | per house: power ≥ 65 and power − grip ≥ 15 → plots; rumour at month 2 (card if she has eyes / luck / it is her father's house), strikes at month 3 (odds; Đại tướng quân +army) — win: overthrown, their prince (else the heir, else a thân vương) reigns; lose: crushed (power −35, its women −Sủng and punished, throne grip +8) | same | «Mật báo cấm quân» · «Ngầm mở đường» · «Giữ mình» (same weights) |

Her father's house is a house like the others: its case can be HER road to put her son on the throne, or hers to stop. Her ordinary court acts
(j55 can chính, gifts, leaks) already move the house powers the cases read. Natural death = PACE-SPEED's rare curve (unchanged); plots /
accidents (jmort) unchanged; her illness / poison / assassination unchanged. Co-op: off (the Emperor's end stays muted in co-op, jmort rule).

End words: «băng hà, thọ N tuổi» → «nhường ngôi, lui về làm Thái thượng hoàng, năm ấy N tuổi» / «bị nhà X cùng tông thất phế truất, giam lỏng ở Tây uyển …» /
«bị nhà X dấy binh lật đổ, phải rời ngai vàng …»; «Di chiếu truyền ngôi» → «Chiếu nhường ngôi truyền cho» / «Triều thần tôn lập»; tuẫn táng off (he lives);
j99succ card title «Tiên đế băng hà» → «Hoàng thượng nhường ngôi» / «Hoàng thượng bị phế» / «Binh biến đổi ngôi», its picture → approved court / plot art (no new art).

Owner 21:30Z/21:40Z (via MAIN 163): her age-40 «Tuổi xuân qua đi» end REMOVED (only source dev/build/j3.js:168; no other copy in git; no test used it).
Old saves: no forced end; S.re is made on the first month.

## Tests

`node dev/test/reignend.js dev/index.html 755x1000` → **PASS**: 3 cards build (3 roads, every road shows tốn/được, no %); each road moves the case as it says
(block −, help +, stand aside gain-only); each end fires through the real month → emperorDies, words carry the cause, never «băng hà», no tuẫn táng;
her-son-heir j99succ card shows the cause title + words; natural death keeps «băng hà»; co-op off; old save (no S.re) loads + runs a month; 0 page errors.

## Month-loop measure (dev/measure/reignend-sim.js; she kept alive, cards unanswered = stand aside; a palace son 3 %/month)

Tuning: first cut → abdication clustered at 19–20 y (clockwork) → added his temper + court petition waves; phế votes failed too often → base 60.
Final numbers, 42 lives (3 seed sets):

| lives | reign years mean | p10 | p50 | p90 | in 8–20 y | causes |
|---|---|---|---|---|---|---|
| 42 | 13.3 | 7 | 15 | 18 | 83 % | nhường ngôi 30 · phế 4 · lật đổ 4 · tai nạn 2 · ám sát 1 · băng hà tự nhiên 1 |

ROBOT_TABLE

## Stills (CDN img/_review/reign-end/, Fold 755x1000 + iPad 1180x820 @2, looked at)

card-abd / card-phe / card-coup (her three-road card each), end-abd / end-phe / end-coup (her end screen after each), succ-abd (j99succ card after an abdication,
her son heir) — `-fold.webp` / `-ipad.webp`. Note: the stills set the reign 12 years in without aging her, so the end screen reads «13 năm · 18 tuổi» (shot setup only).

## Tóm tắt cho sếp

TOM_TAT
