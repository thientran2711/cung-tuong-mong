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
