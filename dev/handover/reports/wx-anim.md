# wx-anim (WX-ANIM worker, owner OD L1678 (h)(i)) — SẴN SÀNG KIỂM
Branch review/wx-anim from origin/main 03a776e4. Foreman C-AG #5 (session_01UV1SzkwHkU5MoXKRsprFyU).
PRIORITY #1 CHECK: OD L1665 (3) + L1678 (h)(i); main weather-khac r1 (jfx KF_WX, jwxk BAL.wx.day.fxLv, KIT §56.2); PROGRESS_review_weather-fx-one (one jfx Pixi layer, painted sprites only). Reused: KF_WX rows + wxkFxId + BAL.wx.day. No new CSS look, no new sprite.

## 1. AUDIT (before) — every state of j12 WX + WX_KH × level (jfx weather layer "wx", stage-clipped: nền tranh + room; the season layer "se" is full-screen incl. Dư đồ)
Kind (kd) | states | before: nhẹ / vừa / nặng | verdict
- rain | mưa phùn, mưa rào, mưa thu | drizzle / rain2 / rainh | OK
- storm | giông tố | storm / storm / storm (bolt always) | MISSING levels
- snow | tuyết nhẹ, tuyết dày | snow / snow / snowh | MISSING (nhẹ = vừa)
- wind | gió heo may, gió lớn, gió bấc | wind1 / wind / wind3 | OK
- fog | sương sớm, sương mù | mist1 / mist / mist3 (cap 3/4/7, a .16/.22/.32) | levels too close, barely visible
- frost | sương giá | frost ×3 (cap 26) | MISSING levels
- heat | nắng gắt | none (summer rays + motes of the season layer only, same at every level) | MISSING
- cloud | trời âm u | none (light wash only; invisible on a buổi painting, KIT §56.2) | MISSING
- petal | hoa đào bay | petal ×3 (cap 14) | MISSING levels
- leaf | lá phong rơi | leaf ×3 (cap 10) | MISSING levels
- snowp | mai nở trong tuyết | snowp ×3 (cap 84) | MISSING levels
- calm | trời quang, ve kêu, nắng vàng, đom đóm/trăng rằm (day) | none (night: fireflies) | by design, always nhẹ
Surfaces: nền tranh + room = the one jfx canvas (weather layer) — every surface shares it; Dư đồ gets the season layer only.

## 2. FILL (all in jfx KF_WX + jwxk BAL.wx.day; same painted sprites: streak, leaf, petal, smoke, orb, ember, glowburst)
After (rows nhẹ / vừa / nặng; cap, a0) — measured live particle count on Fold, nhẹ→nặng:
- storm: storm1 / storm2 / storm (34 / 56 / 80); lightning rate by level BAL.wx.day.bolt [0,.25,.6,1]; nặng unchanged
- snow: snow1 (46) / snow (150) / snowh (190): 30 → 89 parts
- frost: frost1 (10) / frost (26) / frost3 (60): 8 → 32
- heat: heat1 / heat / heat3 = warm glare patches (glowburst, ember) cap 2/4/8, a .1/.17/.3 + the summer rays/motes scale with level (BAL.wx.day.heatSe [.6,1,1.5]); none at night: 14 → 33
- cloud: cloud1 / cloud / cloud3 = grey smoke banks cap 3/8/16, a .7/.9/1.0, tint darker with level: 7 → 13; nặng visibly greys the painting
- fog: mist1 / mist / mist3 cap 3/6/12, a .3/.5/.85 (was 3/4/7): 5 → 12
- petal: petal1 / petal / petal3 (6 / 14 / 34); leaf: leaf1 / leaf / leaf3 (4 / 10 / 26); snowp: snowp1 / snowp / snowp3 (30 / 84 / 130)
- wiring: jwxk fxLvK (by state kind petal / leaf / snowp) + fxLv for storm / heat / cloud / frost; wxkFxId reads both; the kfWxCfg wrapper also builds a row when the base config is null (heat, cloud), heat not at night; j11 thunder uses BAL.wx.day.bolt by level.
- Test: dev/test/wx-khac2.js §10 now checks EVERY kind × 3 levels: 3 different row ids and cap×a0 non-decreasing nhẹ ≤ vừa < nặng. Result: §1-§10 all OK, 0 page errors.

## 3. (i) NO second weather icon — checked, NO CHANGE NEEDED
DOM probe (.kmwx visible, Fold 755x1000 + iPad 1180x820, rain/storm/snow/frost/wind/fog/heat/petal/leaf/snowp/cloud, nhẹ + nặng): exactly ONE weather icon every time, in the top bar (kstv k3l2), never inside #stage. The only other weather pictures are the popup header (on tap) and the dawn card sun (.dsky, decoration of the day-start card, not a weather icon).

## 4. Shots / perf
Shots (headless software GL, scratch only, not in git): Fold 755x1000 + iPad 1180x820, every kind at nhẹ and nặng (Luân hồi intro closed first). Looked at: heat, cloud, fog, snow, rain pairs. Clear pairs: heat (clean → warm glare), cloud (light → grey banks), rain/snow (sparse → heavy). Fog is still FAINT: the "smoke" atlas is a chimney puff, so on a bright painting fog nhẹ vs nặng reads weakly → ART REQUEST in dev/kit/KIT_REQUESTS.md (fx-fogbank, optional fx-heatglare). Software GL under-draws sprites: confirm fog/cloud on a real device.
Perf (Fold 755x1000, CPU x4, software GL, 4 s rAF fps, branch / main at nhẹ→nặng; very noisy, ±5 fps run to run on this box): storm 5.3→8.0 / 4.5→6.8 · petal 17.5→17.5 / 15.8→15.8 · snowp 14.8→16.5 / 13.5→13.0 · cloud 14.5→11.8 (then 35.5→18.3 after trimming cloud3 16→11) / main 14.8→15.8 (no fx) · heat 11.8→7.8 (then 6.3→15.5 after trimming heat3 8→4, heatSe 1.5→1.2) / main 15.0→14.8 (season layer only). After the trim the heavy (nặng) rows are at or above main; no systematic frame drop, but a real-device check of heat/cloud is advised.
QUICKCHECK --cpu 4: see perf above (4x CPU throttle, 4 s rAF, same state on both builds).

## 5. Open for Foreman
- Foreman C: paint fx-fogbank (+ fx-heatglare) then swap `k:` in KF_WX mist*/cloud*/heat*.
- KIT §56.2: wash on a buổi painting stays off; the level of cloud/fog now shows through sprites instead.
