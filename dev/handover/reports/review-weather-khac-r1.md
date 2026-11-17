PRIORITY #1 CHECK ('weather-khac|currentWeather|wxDay'): OD 0 for the API names; OD 17/11 ~16:20Z (g), ~16:00Z (one clock), ~16:40Z (rain natural + nhẹ/vừa/nặng), ~16:45Z (day khắc), ~17:00Z + ~17:35Z (odds cap 95/5, soft fail), ~17:40Z (3) (EVERY weather kind per khắc) read verbatim | ledger 0 | claims 6 | main 0 | review/* 1 (review/weather-khac = branch under review).

# review/weather-khac — BIG reviewer r1 (opus), base e1d540cf

START_CTX ~5 % of the window.

VERDICT: **HOLD — base reviewed, PASS withheld until the WEATHER-KHAC-2 delta is re-checked on top** (C-AG #3 order 17:18Z after owner OD 17/11 ~17:40Z (3): rain-only scope is not enough). The base itself would PASS with my two fixes below; nothing in it has to be undone.

Reviewer branch: `review/weather-khac-r1` = e1d540cf rebased onto origin/main e9bbc4d6 (only conflicts: generated index.html / sw.js → main's copy, site rebuilt) + 2 reviewer fixes. Tip **11948a5f** (fast-forward of origin/main e9bbc4d6 at push time).

## Checked — OK
- ONE weather system: j12 WX (+ in-season WX_KH, wxStates), jclose WX_BUOI words, jweather rules, jfx layer, j11 backdrop key — reused; no second system. S.wx stays the current state, so every old reader follows the khắc.
- wxDay rolled at the tuần roll (rollWx wrapper, seeded like jmcal), states only from the season's list (test §1: 720 days, no snow outside Đông, no heat in Đông); moves only when her khắc moves, never back (high-water mark).
- Khắc read through the ONE day-time function (j76left + S.j76carry); spilled act sees the next khắc's weather (§2b).
- Rain natural by season: Hạ 42 % wet khắc (mùa mưa), Xuân 38 % mostly nhẹ (mưa phùn — fits the northern drizzle spring), Thu 16 %, Đông 53 % snow (same weight as the old WX list, 2 of 4 Đông states are snow). Sane for the game's palace setting. lv nhẹ/vừa/nặng exposed in currentWeather(k).lv/lvN for Foreman B.
- Reader family (wxSev/wxKind/jmood/j70/jworld/jworld2/jsfx/jfx/lightTick) all read the state `b`; scan table in the worker report checked against `git grep 'S.wx|wet()|harsh()'`.
- Co-op: wxDay in W_KEYS + HOST_ONLY; guest never rolls (wxkDay returns null for the guest without a host day).
- Old save: day built lazily from S.wx, no line (§4); QUICKCHECK old live save loads and plays a buổi.
- ONE-CORE: all numbers in BAL.wx.day; one-core-guard PASS.
- Odds cap (OD ~17:00Z / ~17:35Z): weather-khac adds NO player-facing odds and no sure act; its internal chances (stay .5–.88, burst .01–.06) are world dice, not outcomes of her acts. The pre-existing jweather wxRisk (cold/slip) is unchanged — no sure-act site touched. Nothing for Foreman D's soft-fail list from this branch.
- VANPHONG: every log line form seen in a 360-day walk is cổ trang, no numbers ("Trời bỗng đổ mưa rào.", "Mây kéo đến, trời âm u.", "Mưa đã tạnh, đêm u ám.", "Bên ngoài, hoa đào bay dưới trăng." …). Lines go through log() (kit result row).
- Kit: no private UI; chip icons reuse painted mo-wx-suongsom / mo-wx-muaphun; KIT_REQUESTS mo-wx-amu + mo-wx-muarao filed (not a FAIL).

## Fixed by the reviewer (on review/weather-khac-r1, commit 11948a5f)
1. **Co-op guest saw the HOST's khắc.** `currentWeather()`/`wxkSync` used `max(S.wxDay.at, her khắc)`; wxDay.at is the host's mark (host-only world key), so a guest at khắc 1 got the host's khắc-12 weather (probe: herK 1 → currentWeather().kh 12, "mưa rào" while she is in the "nắng gắt" part). Against OD:L1641 (each player's own clock). Fix: `wxkM(D)` — host keeps at/sk on S.wxDay as before; the guest keeps her own marks in `S.wxkG` (personal key). Test §5b.
2. **S.storms inflated.** wxMood now runs at every change into giông tố; Hạ: 0.25 storm first-states/day + 0.34 extra storm entries/day → S.storms (month count read by illness base ×1.5, kid hp roll, rival suc roll) ≈ 2.4× higher: an unreviewed balance shift. Fix: a second storm on the SAME day adds no count (S.storms = storm days); mood effect unchanged. Test §6.

## Tests (r1 tip 11948a5f)
- wx-khac.js 755x1000@2: §1–§6 ALL OK, 0 page errors (season table as in the worker report; 2.70 changes/day, 0.30 downpours/day).
- wx-gear ALL OK · weather-port PASS.
- QUICKCHECK --cpu 4: PASS · core gates PASS (one-core-guard, rules-one-source, kit-conform, coop-one-world) · TIME-SPILL GUARD PASS · open 1778 ms · old save ok · perf median new/live: render 171/195, tab 353/313, buổi 938/863 ms, tasks>200ms 13/12 (live's own runs spread buổi 739–1083 ms → noise, not a regression).
- Screens Fold 755x1000 + iPad 1180x820, Ngự hoa viên, nắng gắt → sudden mưa rào: 0 errors, no horizontal overflow, HUD chip changes to "mưa rào". Shots kept in scratch only (not in git, not on CDN).

## Must be in the delta (WEATHER-KHAC-2) before PASS
A. Owner OD 17/11 ~17:40Z (3): EVERY WX kind per khắc with its own nhẹ/vừa/nặng and world/look effects (fog lowers being seen, storm closes Ngự hoa viên + walk, frost lowers cầm/thêu ease, wind = messy clothes / dust) — all numbers in BAL, odds clamped by BAL.odds.lo/hi.
B. **Intensity must SHOW.** Screens: a "mưa rào" nặng (lv 3) downpour in the garden shows only a few faint drizzle streaks (kfWxCfg = drizzle for every rain level) over the sunny painting, wash at 1/4 on a buổi painting — the owner's "mưa ào tới" is not visible. Map currentWeather().lv to the EXISTING jfx configs (nhẹ = drizzle, vừa = denser drizzle, nặng = the storm rain sprites without thunder; same for snow nhẹ/dày and wind) and a stronger wet wash for nặng. Existing sprites only (no code-drawn art).
C. Keep my two fixes (guest marks S.wxkG; storm day count) — rebase the delta onto review/weather-khac-r1 or re-apply; keep tests §5b/§6.
D. Extend wx-khac §1 to print every kind's share and lv mix per season, and §3-style checks for each new effect.

Re-check plan: on the delta sha → rebase onto origin/main, rerun wx-khac / cb-wx / wx-gear / weather-port / QUICKCHECK --cpu 4 / coop one-world, Fold + iPad shots of a rain, a storm, fog and wind change.

## Handover
Waiting for the WEATHER-KHAC-2 sha (worker session_01UV1SzhyGUZ4FTxi1y3XNvr). Worktree /home/user/wt/wxr1 (branch review/weather-khac-r1), scratch /home/user/wt/wxr1-scr (probe.js, shots.js). ~22 % context.
