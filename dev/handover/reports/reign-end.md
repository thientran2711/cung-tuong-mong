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

## Robot table — real play (dev/measure/reignend.js = pacespeed.js harness + «re»; seeds 0–5, 6 lives per arm, 264-month cap)

LIVE = origin/main 03a8c17c (old Emperor curve adult 45/15, age-40 end present) vs BRANCH = review/reign-end (on pace-speed). Summary: `python3 dev/measure/reignend-sum.py LIVE=… BRANCH=…`.
Real hours: one bot action = one tap; calibrated as pacespeed-sum.py (LIVE = 30 real min per game year → 1.34 s per tap, same rate for both arms).
At PACE-SPEED's own estimate (~12 real min per game year) the hours scale ×0.4: BRANCH ≈ 2.6 h mean / 3.3 h max per life.

calibration: LIVE = 30 real min per game year → 1.34 s per tap

| arm | lives | reign years mean / p10 / p90 (reign ended) | all lives incl. censored mean | end causes | real h per life (mean / max) | months played (mean) |
|---|---|---|---|---|---|---|
| LIVE | 6 | 9.7 / 6 / 12 (n=3) | 12.3 | natural 3, cap 2, her 1 | 6.3 / 9.6 | 151 |
| BRANCH | 6 | 14.3 / 11 / 17 (n=6) | 14.3 | abd 5, coup 1 | 6.6 / 8.2 | 177 |

Per life:

| arm | seed | origin | end | cause | reign years | Emperor age | her ending | reign-end cards seen | real h |
|---|---|---|---|---|---|---|---|---|---|
| LIVE | s1 | ch | ended | her | 9 | 34 | Đại kết cục · Đức Thọ đời sau · Đại kết cục: Đức Thọ đời sau | {} | 4.5 |
| LIVE | s0 | cn | ended | natural | 11 | 33 | Hồng nhan bạc mệnh · Năm 12, Hoàng thượng niên hiệu Khang Địn | {} | 5.6 |
| LIVE | s3 | ch | ended | natural | 12 | 33 | Mẫu hậu Hoàng thái hậu · Thành Thái hậu (đích mẫu) | {} | 6.3 |
| LIVE | s4 | dtq | ended | natural | 6 | 31 | Thái phi · Thành Thái phi | {} | 2.9 |
| LIVE | s2 | tt | cap | cap | 17 | 37 | – ·  | {} | 8.8 |
| LIVE | s5 | dtq | cap | cap | 19 | 41 | – ·  | {} | 9.6 |
| BRANCH | s1 | ch | ended | coup | 15 | 40 | Hoàng thái hậu · Hoàng thái hậu | {"abd": 1, "coup": 1} | 6.7 |
| BRANCH | s0 | cn | ended | abd | 17 | 39 | Mẫu hậu Hoàng thái hậu · Mẫu hậu Hoàng thái hậu | {"abd": 1} | 8.2 |
| BRANCH | s3 | ch | ended | abd | 11 | 32 | Mẫu hậu Hoàng thái hậu · Mẫu hậu Hoàng thái hậu | {"abd": 1} | 4.9 |
| BRANCH | s2 | tt | ended | abd | 15 | 35 | Mẫu hậu Hoàng thái hậu · Mẫu hậu Hoàng thái hậu | {"abd": 1} | 7.2 |
| BRANCH | s4 | nc | ended | abd | 14 | 37 | Thái phi · Thái phi theo con ra phủ | {"abd": 1} | 6.3 |
| BRANCH | s5 | thd | ended | abd | 14 | 37 | Mẫu hậu Hoàng thái hậu · Mẫu hậu Hoàng thái hậu | {"coup": 3, "abd": 1} | 6.5 |

Reading: BRANCH — every life ends with the REIGN (no cap, no early natural death): nhường ngôi 5, lật đổ 1; reign 11–17 y (mean 14.3), never a fixed number;
her outcome follows from it (Mẫu hậu Hoàng thái hậu ×4, Hoàng thái hậu after the coup, Thái phi theo con ra phủ). LIVE — the Emperor dies of the old curve at
6–12 y or the life runs to the cap. Phế was not drawn in these 6 robot lives (seen 4× in the 42 month-loop lives); natural death / accident / assassination seen in the
month loop. 0 page errors in all 12 lives. Same seeds, same harness.

## Stills (CDN img/_review/reign-end/, Fold 755x1000 + iPad 1180x820 @2, looked at)

card-abd / card-phe / card-coup (her three-road card each), end-abd / end-phe / end-coup (her end screen after each), succ-abd (j99succ card after an abdication,
her son heir) — `-fold.webp` / `-ipad.webp`. Note: the stills set the reign 12 years in without aging her, so the end screen reads «13 năm · 18 tuổi» (shot setup only).

## Tóm tắt cho sếp

- Hoàng thượng giờ hiếm khi băng hà vì tuổi; triều đại kết thúc theo thế cục: **nhường ngôi** cho Thái tử (già, bệnh, Thái hậu + triều thần ép), **bị phế** (một nhà quyền thần đủ thế lực, có phi tần được sủng và đủ chứng cứ), **bị lật đổ** (một nhà thế lực vượt ngai vàng dấy binh).
- Mỗi lần có biến, nàng nhận một thẻ 3 đường ngang giá: ngăn · giúp · đứng ngoài. Nhà của cha nàng cũng có thể là kẻ mưu phế lập — đường để đưa con nàng lên ngôi.
- Đã bỏ kết cục «Tuổi xuân qua đi» năm 40 tuổi; bệnh, độc, ám sát giữ nguyên.
- Robot chơi thật 6 đời: triều dài 11–17 năm (trung bình 14), mọi đời đều kết bằng biến cố triều; mô phỏng 42 đời: trung bình 13 năm, 83 % nằm trong 8–20 năm, đủ cả nhường ngôi / phế / lật đổ / băng hà.
- Một đời chơi ≈ 2,5–3,5 giờ thật (theo nhịp PACE-SPEED).
~X% xong / ~Y% chơi được: do MAIN điền.

## r1 — RV-163D FAIL F1–F3 fixed (65cb489a + this commit)

- F1 law 1: NPC consorts with a stake take the SAME three roads at the same moment (case opens / abdication petition), through ONE function `road(p,k,c,s)`
  for her and NPCs: same costs (her cost via the card fx, an NPC pays inside road), same gains, same case moves (pressure ±, odds ±, evidence, plot delay),
  failed-case price for EVERY helper (f.hp list). Goals (`npcPick`): the heir's mother helps the abdication; a mother whose son is not the heir blocks it;
  the plotting house's women help its phế / coup; the mother of the heir it would push aside blocks it; ≤ BAL.re.npc.max (3) per case; a Nặng road only
  if she can pay. Each NPC road is logged and told as one «Hậu cung chia phe / dậy sóng» news card.
- F2 law 2 (OD 27/11 ~00:46Z tiers): roads now read Nhẹ «Giữ mình» (tốn không → Đức) · Vừa block (tốn Danh 4 → Sủng 4; the house's enmity shown as Mất) ·
  Vừa help on abdication (tốn Sủng 4 → Thái hậu 4, one gain) / Nặng help on phế–lật đổ (tốn Bạc 60 → Danh 8 + the house backs her; Mất if it fails).
  Numbers BAL.re.her.t1/t2/t3.
- F3 law 4: omenX, gripMid, skMid, loseMine → BAL.re.
- Test (dev/test/reignend.js) adds: tier checks (Nhẹ costs nothing; Vừa cost = gain; help cost and result rise together), NPC help moves the odds exactly
  like hers and pays the same Bạc, NPC block moves the abdication pressure like hers, NPCs act when a case opens; forced ends deterministic.
  **PASS 755x1000 + 1180x820**; one-core-guard **PASS** (fails 0).
- Month loop after r1 (NPC roads now push cases too), 28 lives: seed set 5 mean 10.9 / p10 7 / p90 15 (abd 6 · phế 3 · lật đổ 5); seed set 6 mean 12.9 /
  p10 8 / p90 17 (abd 8 · phế 2 · lật đổ 1 · natural 2 · accident 1) → combined mean ≈ 11.9, phế and lật đổ more common than before (NPC houses now help their
  own cases). Robot table above is r0 (before NPC roads).
- Stills re-shot (new road order) → CDN img/_review/reign-end/. INFO for the kit keeper (not this branch): on iPad the coup card's small «who» avatar
  overlaps the first text line under a short head-art band (kit act-card layout).

## r2 — RV-163D r1 FAIL (1 item, law 2 «a bạc road always has a road of matching tier») fixed

phế / lật đổ cards now have FOUR roads: Nhẹ «Giữ mình» · Vừa «Mật tấu / Mật báo» · Nặng «Ngầm tiếp tay / mở đường bằng bạc» (Bạc 60) · Nặng
«Đứng ra làm chứng / Đích thân đưa tin» (Sủng 8 = BAL.re.her.t3.stat) — the two Nặng roads give the SAME result (Danh 8 + the house backs her,
odds +15, the price of a failed case). npcRoads: an NPC without the Bạc takes the stat road. Test adds: the stat road is tier 3, no Bạc, same gain
as the Bạc road; an NPC with 0 Bạc helps through it. PASS 755x1000 + 1180x820; one-core-guard PASS. Abdication card unchanged (no Bạc road).
