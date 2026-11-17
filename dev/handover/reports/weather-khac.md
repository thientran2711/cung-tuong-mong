# weather-khac — report (worker weather-khac, opus; foreman C-AG #2)

PRIORITY #1 CHECK ('weather thoitiet thời tiết khắc wxDay'): OD 1643 item (g) (weather part) + OD:L1641/L1642 (one shared clock) | main j12.js:1-14 (WX by season, rollWx per tuần), jclose.js:40-70 (WX_BUOI words per buổi, wxSync), jweather.js (outdoor risk, storm clr per buổi), jmcal.js:83-88 (seeded forecast), jfx.js:188 (weather layer), j11.js:114-118 (backdrop key) | review/* weather, weather-fx*, weather-port*, wx-fx-size* = art / fx / outdoor-risk work, no per-khắc timeline anywhere; ag-all-2 = per-khắc NPC chain, no weather | claims none. → REUSED j12 WX + jclose WX_BUOI + jfx sprites + jweather rules; no second weather system.

START_CTX ~6 % of 1M (rollover at 31 %, ceiling 60 %); finished at ~20 %.

Branch `review/weather-khac` (from origin/main e8b1906f), commits 51703402 + ff51fd1c (C-AG #3 order: owner OD:L1654 rain natural + intensity) + aab0263f (owner OD 17/11 ~16:45Z: khắc read through the ONE day-time function) + e1d540cf (one-core guard: two weight rows changed). READY sha = e1d540cf.

## What it does
- Day = the 4 buổi × BAL.time.khac (4) = 16 khắc. At the tuần roll (rollWx, still seeded by jmcal so the calendar forecast holds) the WHOLE day is rolled khắc by khắc: `S.wxDay = {d: wkKey(), s:[16 state names], u:[khắc that came as a sudden downpour], at, sk}`.
- States = the season's list only: `wxStates(sea) = WX[sea] + WX_KH[sea]` (j12). WX_KH = in-season day states the owner described ("âm u", rain at evening, "mưa ào"): Xuân trời âm u / mưa rào; Hạ trời âm u / mưa rào; Thu trời âm u / mưa thu; Đông trời âm u. They are never drawn as the tuần's first weather (forecast unchanged). No snow outside Đông, no heat in Đông (test §1, 720 days).
- Moves: `BAL.wx.day` (jwxk.js, same place as BAL.wx in jweather): stay .88 per khắc (stayOf: giông tố .5, mưa rào .82, mưa thu .82, tuyết dày .7, trời âm u .7), next-state weights by buổi [sáng, trưa, chiều, tối] per season (Hạ: nắng gắt → âm u in trưa/chiều → mưa rào / giông tố toward tối), burst = sudden downpour per dry khắc (Xuân .03, Hạ .06, Thu .02, Đông .01 tuyết nhẹ). Rain is NOT made rare (owner OD:L1654): Hạ = mùa mưa.
- Rain INTENSITY (owner OD:L1654 nhẹ / vừa / nặng): per khắc for wet states, bands `BAL.wx.day.lv` [nhẹ, vừa, nặng]: mưa phùn 8/2/0, mưa rào 2/5/3, mưa thu 4/5/1, giông tố 0/2/8, tuyết nhẹ 7/3/0, tuyết dày 0/3/7; a sudden downpour = nặng; same state keeps its level with lvKeep .75. In `currentWeather(k).lv` (0 dry, 1 nhẹ, 2 vừa, 3 nặng) + `.lvN` words, and `S.wx.lv` (no log line for a level change).

Measured (wx-khac §1, 12 months × 60 days, 16 khắc/day; 2.70 changes / day, 0.30 downpours / day, Hạ nắng gắt → âm u → mưa 25/44 days):

| season | wet khắc | nhẹ | vừa | nặng |
|---|---|---|---|---|
| Xuân | 38 / 100 | 670 | 256 | 171 |
| Hạ (mùa mưa) | 42 / 100 | 161 | 363 | 687 |
| Thu | 16 / 100 | 142 | 174 | 140 |
| Đông (snow) | 53 / 100 | 910 | 381 | 234 |
- Her khắc of the DAY is read through the ONE day-time function on main (j76 ONE DAY-TIME GATE): `wxkNow() = day − j76left()` (+ `S.j76carry` when an act spilled into the next buổi → that act sees the spilled khắc's weather; test §2b: chiều used 3, a 2-khắc act → carry 1 → khắc 9 = tối's first+1, weather of that khắc). No private per-buổi count.
- `S.wx` stays the CURRENT state `{n: buổi words (jclose WX_BUOI), b: state, k, f}`; it moves only when HER khắc moves (spend wrapper + jclose wxSync in nextBuoi/render), and never back (high-water `at`; a refund keeps the weather). NPCs read the same S.wx (one shared clock). Only a NEW khắc moves it (`sk`), so a direct S.wx write (tests, events) holds until the next khắc.
- Change shows: jfx weather layer (polls S.wx every 250 ms → drizzle/storm/snow… existing sprites only), j11 backdrop key (S.wx.k), jsfx sound on words change, HUD chip (j93 kitWxChip), lightTick wash (new: trời âm u = dim grey wash, no particles; summer sun motes + light rays are off while wet or overcast — they showed in summer rain before). One cổ trang log line per turn: "Trời bỗng đổ mưa rào." (downpour) / "Mây kéo đến, trời âm u." / "Trời đổ mưa rào." / "Mưa đã tạnh, trời quang." / "Giông tố đã tạnh, chỉ còn mưa rào." / "Tuyết ngừng rơi, …" / "Bên ngoài, …". Written with `log()` (the result log row) — no private UI. Hoàng thượng's mood rule (j12 `wxMood`, split out of rollWx — one rule) also runs when the day turns into a state (host only).
- jweather's own storm-clear (S.wx.clr → mưa phùn per buổi) is replaced by the day (clr deleted at roll); `wxClrName()` now reads the buổi the storm stops from the day.
- Old saves: no wxDay → built lazily from the existing S.wx (khắc so far = that weather, no line) (test §4).
- Co-op: `wxDay` added to jcoopworld W_KEYS + HOST_ONLY; the host rolls (worldOn()), the guest never rolls and shows the host's day at her own khắc (test §5).

## API (for Foreman B looks-2: makeup smudge by rain / umbrella)
- `currentWeather(k)` → `{n, b, k, f, kh, lv, lvN}` (lv 0 dry · 1 nhẹ · 2 vừa · 3 nặng → map to smudge nhẹ / vừa / nặng); k = khắc of the day 0..15 (default = now). `wet()` / `harsh()` = the current khắc.
- `wxDayAny(f)` → some khắc of today has flag f (1 wet, 2 heat, 3 storm, 4 heavy snow).
- `wxkHook(fn)` → `fn(from, to, {k, burst})` on every change (host and guest). UMBRELLA HOOK POINT: on a change into a wet state (`[1,3,4].includes(to.f)`) for her (and any NPC whose `S.where[id]` is outdoors, see jweather `wxOutdoor` / `S.place==="vuon"`), check gear with jweather `wxHasGear(p,"cold")` (dù / áo tơi) and `BAL.wx.help` (servant holds the umbrella) → no umbrella = smudge, umbrella = only a chance. Smudge itself NOT built (Foreman B).

## Readers of the weather (git grep 'S.wx|wet()|harsh()') — all follow the khắc now
| reader | reads | change |
|---|---|---|
| j12 wet/harsh/wxName, lightTick | S.wx.f / k | follow S.wx; + overcast wash |
| j3 nightRg (sleep regen), j80 sleepRegen, j76 sleep | harsh() | follow (tối khắc) |
| j9 placeWhere garden odds, travel | wet() | follow (buổi start) |
| j8 contest noise | wet() | follow |
| j68 e68Ctx/e68Fill {W}, j68h sickServant/kidSick | S.wx, wet/harsh | follow |
| j95 garden walk/back "trời đổ mưa" | wet() | follow |
| jweather wxSev / wxKind / outdoor risk / NPC garden | S.wx.f, n | FIXED: read the state `b` (buổi words "trời giá lạnh" missed sương giá) |
| jmood weather mood | x.n in BAL.mood nice | FIXED: state `b` ("hoa đào bay dưới trăng" missed) |
| j70 slippery steps | /mưa|bão|tuyết/ on n | FIXED: state `b` + giông (giông tố never matched "bão") |
| jworld lightning fire, đông snow (hoa) | S.wx.f===3, /tuyết/ n | FIXED: wxDayAny(3) (storm in any khắc of the day), state `b` |
| jworld2 cold-snap run (snowL) | S.wx.f===4 per tuần | FIXED: wxDayAny(4) |
| jgift kmStorm (walk lock) | S.wx.f | follow |
| jtsb fire base | S.wx.k | follow |
| jsfx ksfxWx / change sound | n / k | + day states, state `b` fallback |
| j11 pxKind / backdrop key, thunder | S.wx.k | follow (cloud → no particles) |
| jfx kfWxCfg (weather layer), kfSeCfg (summer sun) | S.wx.k / n | follow; FIXED: no summer sun/rays while wet or overcast |
| j93 kitWxChip / kitWxEffects, jclose override | S.wx.n / b | follow (popup describes the current state) |
| j6 HUD date, j18/j79 dawn card, j87 book, jne dawn | S.wx.n | follow |
| jk3, jkh (pregnancy harsh walk) | S.wx / harsh | follow |
| jmcal forecast | rollWx seed | unchanged (forecast = khắc 0 of the day) |
| jcoopworld W_KEYS | wx | + wxDay (host only) |

## Tests
- NEW dev/test/wx-khac.js (755x1000@2): §1 season never off 720 days OK + every wet khắc has lv 1..3, every dry khắc lv 0 + the per-season table above · §2 monotone per khắc + §2b spill into next buổi + refund never back + API + save/load OK · §3 downpour in Ngự hoa viên: next khắc S.wx = mưa rào, wet, jfx weather layer null → drizzle, pxKind dust → rain, rain wash, chip "mưa rào", exactly one line "Trời bỗng đổ mưa rào.", hook fired OK · §4 old save OK · §5 guest OK · 0 page errors. ALL OK.
- dev/test/cb-wx.fn.js (scan weather × buổi words): updated to hold the scanned state for the whole day and to scan WX_KH too: 92 rows, badAfter 0, no flag/base lost.
- wx-gear.js ALL OK · weather-port.js PASS.
- QUICKCHECK e1d540cf (--cpu 4): PASS · core gates PASS (one-core-guard, rules-one-source, kit-conform) · time-spill guard PASS · open 1828 ms · old save ok · perf median new/live: render 199/168 ms, tab 318/306, buổi 935/848, tasks>200ms 13/13 (within run noise: the run before on aab0263f gave render 178/232, buổi 917/914; the weather adds one O(1) lookup per render/spend).

## Open / kit request
- KIT_REQUESTS 17/11 weather-khac: icons mo-wx-amu + mo-wx-muarao (Foreman C); until then the nearest painted icons are reused (suongsom / muaphun).
- Not done here (by design): makeup smudge, umbrella effect on looks (Foreman B).

## Handover
Done; nothing open on this branch. Context at finish ~25 % (START_CTX ~6 %).

---
# weather-khac-2 — delta (worker WEATHER-KHAC-2, opus; foreman C-AG #3; owner OD 17/11 ~17:40Z (3), angry: "tại sao bạn chỉ làm có mỗi trời mưa?")

PRIORITY #1 CHECK ('hoa đào bay|sương sớm|gió heo may|wxStates'): OD 1654 (16:40Z rain levels) + 1664 (cap 95/floor 5) + 1665 (3) | ledger 0 | claims 1 (weather-khac) | main j12 WX per season, jclose WX_BUOI, jweather, jfx | review/weather-khac e1d540cf (S.wxDay, wxStates, currentWeather) → BUILT ON IT, no second system. Also reused: j8 oSee (witness roll), j77 accessOf (place gate), j9 placeWhere / j95 j95view (NPC places), jmgt mgTier (board ease), j93 kitWxEffects (kit weather popup), log().

START_CTX ~5 % of the window; finished ~22 %.

Branch review/weather-khac: e1d540cf → d6d59a69 (the work) → c3c67f1b (one-core guard: one Đông weight row changed). READY sha = **c3c67f1b**.

## 1. Every WX kind vs e1d540cf (per khắc)
| season | kind (state) | e1d540cf: moves per khắc | e1d540cf: level | now (c3c67f1b) |
|---|---|---|---|---|
| Xuân | hoa đào bay | yes | no | yes · petal level |
| Xuân | mưa phùn | yes | yes (rain) | yes · rain level |
| Xuân | sương sớm | yes | no | yes · fog level, thickest mornings; fog effect while its words say "sương" |
| Xuân | trời quang | yes | no | yes · calm (always nhẹ) |
| Xuân | trời âm u / mưa rào (day states) | yes | rain only | yes · cloud / rain level |
| Xuân | gió lớn | — (did not exist) | — | NEW day state · wind level, gusts |
| Hạ | nắng gắt | yes | no | yes · heat level, peaks trưa |
| Hạ | ve kêu râm ran | yes | no | yes · calm |
| Hạ | giông tố | yes | yes | yes · storm level + storm world effect |
| Hạ | đom đóm | yes | no | yes · calm |
| Hạ | trời âm u / mưa rào | yes | rain only | yes |
| Hạ | gió lớn | — | — | NEW · wind (before storms: âm u → gió lớn → giông / mưa) |
| Thu | lá phong rơi | yes | no | yes · leaf level |
| Thu | nắng vàng / trăng rằm | yes | no | yes · calm |
| Thu | gió heo may | yes | no | yes · wind level, gusts |
| Thu | trời âm u / mưa thu | yes | rain only | yes |
| Thu | sương mù | — | — | NEW day state · fog (mornings) |
| Đông | tuyết nhẹ / tuyết dày | yes | yes (snow) | yes · snow level |
| Đông | sương giá | yes | no | yes · frost level, hardest at dawn + frost world effect |
| Đông | mai nở trong tuyết | yes | no | yes · petal level |
| Đông | trời âm u | yes | no | yes · cloud level |
| Đông | sương mù, gió bấc | — | — | NEW day states · fog / wind |
So: e1d540cf already moved every state per khắc, but only rain/snow/storm had a level and there was no wind gust / fog morning / frost dawn shape and no world effects.

## 2. What is new
- Level for EVERY kind per khắc (1 nhẹ · 2 vừa · 3 nặng): `BAL.wx.day.lv` (weights per state), kind map `BAL.wx.day.kd` (rain · storm · snow · wind · fog · frost · heat · petal · leaf · cloud · calm), day flow `BAL.wx.day.lvB` by buổi (heat peaks at noon, fog thickest in the morning, frost hardest at dawn), gusts `BAL.wx.day.lvKeepOf` (wind rarely keeps its level). Calm states always nhẹ. Sudden downpour still nặng. Same ONE day-time function (j76 via wxkNow), same seeded host-only roll, guest never rolls.
- New in-season day states (j12 WX_KH; never the tuần's first weather, forecast unchanged): gió lớn (Xuân, Hạ), gió bấc (Đông), sương mù (Thu, Đông); buổi words in jclose WX_BUOI (night "đêm gió lớn" / "đêm sương mù"), sounds in jsfx SFXWXN, sprites = existing jfx wind / mist. Icons reuse gioheomay / suongsom (add to KIT_REQUESTS: mo-wx-giolon, mo-wx-suongmu — Foreman C).
- Natural flow by season (BAL.wx.day.next): Hạ nắng gắt → âm u / gió lớn → mưa rào / giông tố; Xuân trời quang → gió lớn → âm u → mưa phùn; Thu lá phong / trăng rằm → sương mù at dawn → nắng vàng; Đông tuyết → gió bấc / sương giá at dawn → sương mù → trời âm u.
- Change lines: "Trời nổi gió lớn." / "Sương mù giăng kín lối." (+ existing rain / storm / snow lines).
- Odds: the transition/level rolls are world rolls (not player odds); the one player odd touched (fog on oSee) is held to BAL.odds.lo..hi.

## 3. API (additive; old fields unchanged)
`currentWeather(k)` → `{n, b, k, f, kh, lv, lvN, kd, kl, klN}`: lv/lvN = wet intensity (0 dry, unchanged); **kd** = kind; **kl/klN** = level of that kind (every state). `S.wx` also carries `kd`, `kl`.
`wxkHook(fn)` → `fn(from, to, {k, burst, lvOnly})`: fires on every state change (as before) AND on a level-only change in the same state (`lvOnly:true`, no log line). New helpers: `wxkFx(name)` (0 or level of fog / frost; 1 for storm), `wxkShut(place)`, `wxkCold(kind)`.

## 4. World effects (numbers BAL.wx.fx; existing rules only)
| weather | rule touched (existing) | effect | shown |
|---|---|---|---|
| fog (sương sớm while "sương", sương mù), kl 1/2/3 | j8 `oSee` = the target's chance to see a scheme (caught() roll + every preview: j17 caughtW, j63 kaCaughtTxt) | −8 / −15 / −25, held to BAL.odds.lo..hi | log clause "Người ngoài khó trông rõ việc trong cung." + kit popup row (g) |
| storm (giông tố, f 3) | j77 `accessOf` (wrapped so it wins over festival/invite passes); NPC places j9 `placeWhere` + j95 `j95view` + at the turn | Ngự hoa viên closed for everyone, no sneak / ask; Hoàng thượng → thư phòng, Thái hậu → Thọ Ninh, consorts → own palace | map grey reason "giông tố, đóng cửa"; log clause "Ngự hoa viên đóng cửa tránh giông."; kit popup row (r) |
| frost (sương giá), kl 1/2/3 | jmgt `mgTier` ease (the one board-difficulty input) for đàn + thêu | ease −0.5 / −1 / −1.5 (floor easeMin) | intro row "Độ khó … · trời giá, tay cóng"; log clause "Giá rét, tay cóng khó đàn khó thêu."; kit popup row (r) |
NOT built: storm adds walking khắc — conflicts with the owner's standing rule 15/11 06:40Z ("KHÔNG thêm khắc đi đường (đã có Sức hồi chậm, không phạt 2 lần)", jclose §7, which removed exactly that). Foreman: if the owner now wants it, she must overrule 06:40Z; it is one wrapper on `travel` + a BAL number.

## 5. Hook for Foreman B (LOOKS — not built here)
On `wxkHook((from,to,{k,burst,lvOnly})=>…)` read `to.kd` + `to.kl` (or `currentWeather()` any time):
wind kl → messy clothes / hair (gió lớn nặng = xốc xếch); wind or heat kl ≥ 2 outdoors → dust on face; heat kl → sweat; snow kl → snow on the hem; rain/storm lv → smudge (OD:L1654 nhẹ / vừa / nặng); frost kl → red cold cheeks; fog → damp hair. Outdoors check + umbrella: jweather `wxOutdoor`, `S.place==="vuon"`, `wxHasGear(p,"cold")`, `BAL.wx.help`.

## Tests (c3c67f1b, 755x1000@2)
- NEW dev/test/wx-khac2.js: §1 kinds · §2 levels · §3 flow · §4 monotone + lvOnly hook · §5 old save · §6 co-op guest · §7 fog · §8 storm · §9 frost — ALL OK, 0 page errors.
- dev/test/wx-khac.js (spill, monotone, garden downpour, old save, guest) ALL OK · cb-wx scan 112 rows badAfter 0, no flag/base lost · wx-gear ALL OK · weather-port PASS · time-spill guard PASS.
- QUICKCHECK --cpu 4 PASS · core gates PASS (one-core-guard after c3c67f1b) · open 1587 ms · old save ok · render 156/299 ms, tab 265/303, buổi 790/934 (new/live).

Kind mix per season (% of khắc, 720 days):
| season | rain | storm | snow | wind | fog | frost | heat | petal | leaf | cloud | calm |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Xuân | 36 | 0 | 0 | 4 | 7 | 0 | 0 | 17 | 0 | 10 | 25 |
| Hạ | 32 | 8 | 0 | 3 | 0 | 0 | 15 | 0 | 0 | 15 | 27 |
| Thu | 16 | 0 | 0 | 18 | 2 | 0 | 0 | 0 | 23 | 10 | 31 |
| Đông | 0 | 0 | 49 | 5 | 1 | 17 | 0 | 20 | 0 | 8 | 0 |

Level mix + day flow (avg level sáng / trưa / chiều / tối):
| kind | nhẹ | vừa | nặng | flow | keeps level next khắc |
|---|---|---|---|---|---|
| rain | 913 | 826 | 690 | 1.76 / 1.91 / 1.96 / 1.92 | .86 |
| storm | 0 | 55 | 171 | 2.81 / 2.62 / 2.70 / 2.80 | .75 |
| snow | 823 | 372 | 223 | 1.72 / 1.56 / 1.61 / 1.44 | .89 |
| wind | 182 | 464 | 227 | 1.93 / 2.11 / 2.07 / 2.07 | .56 (gusts) |
| fog | 69 | 88 | 127 | 2.70 / 1.19 / 1.00 / 1.88 | .88 |
| frost | 102 | 184 | 206 | 2.72 / 2.17 / 1.47 / 1.96 | .90 |
| heat | 135 | 115 | 188 | 1.50 / 2.98 / 2.43 / 1.00 | .93 |

## Open
- Owner conflict: storm walking khắc (above).
- Fog is rare in Thu/Đông (2 % / 1 % of khắc) because khắc 0 is the tuần's forecast weather; raise BAL.wx.day.next weights if the owner wants more fog.
- KIT_REQUESTS: icons mo-wx-giolon, mo-wx-suongmu (Foreman C).

## Handover
Done; nothing open on this branch. Context at finish ~22 %.
