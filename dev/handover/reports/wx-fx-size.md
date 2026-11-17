PRIORITY #1 CHECK: OD 15 (weather rules incl. OD:L1302–1303) | ledger 0 | claims 0 | main 15 (jfx.js KF_WX/kfSp/kfPx, jfxkit.js kfkSp/kitFxBurst, j93 kitBloom) | review/* 0.

# wx-fx-size (owner bug 17/11: "Hoa đào bay á, cái hình hoa to quá")
Branch review/wx-fx-size (base origin/main 7abaf07a). Commits: 0f2c448d6, 5581edb3b, 7754f10f3 (final, built).
CLAIMS row (coordinator to add on the docs branch): wx-fx-size | worker | jfx.js kfSp/kfkSp/KF_WX, jfxkit.js, j93 kitBloom | SẴN SÀNG KIỂM 7754f10f3

## Root cause
1. Size was absolute: the sprite was 22 px x scale 1.5-2.3 (x0.9 when merged) = ~36-45 px per petal on every screen, same for leaf/wind streak (up to 694 px) and bursts.
2. When the weather was the same kind as the season (spring + hoa đào bay) the code merged both into the SEASON layer, which is FULL SCREEN and not clipped: petals flew over the top bar, stats and chips.
3. Celebration petals (favour/promote/peach) spawned over the whole screen width from the top edge.

## Fix (whole family, shared FX level)
- `kfUnit()` (stage size: sqrt(stage area)/640, clamp .5-1.15) applied in `kfkSp` to every falling kind (petal-*, osmanthus, leaf, snow, ash, paper): weather, season and every `kitFxBurst` share it. `kitFxBurst` petal kinds default scale .65.
- KF_WX retuned (petal sc .5-.8, cap 14, slower; leaf, wind (streak length too), snow, frost, snowp, gold, season petals). kitBloom petal width 26 px -> 15 px x kfUnit.
- Weather + season + light rays (lay wx/se/se2) all clipped to the stage rectangle (also the merged petal layer). `kfFall` (petals/peach/goldpetals bursts) is born at the stage top inside the clip. Radial bursts (flowers, kitBloom) stay free, same small size.
- Weather and falling celebration petals are hidden while over a stage chip or the place name (`KF_INFO`: .k3c .k3p .krailb #sc-t), rects refreshed every 1.5 s.
- KIT.md §68.0 documents the rule. Test: `node dev/test/wx-fx-size.js <url> <out> <WxH@dpr,...> shots`.

## Before / after, median on-screen particle px (max in brackets), Fold 755x1000@2
| kind | before | after |
|---|---|---|
| petal (hoa đào) | 36 (43) | 15 (18) |
| leaf | 40 (43) | 17 (17) |
| wind leaf / streak max | 41 / 694 | 23 / 246 |
| snow | 20 (38) | 18 (40) |
| gold (festival petals) | 19 (22) | 18 (19) |
| favour burst | 25 (27) | 18 (19) |
| rain / storm / mist / fly | unchanged (streak/glow, not petals) | same |
iPad 1180x820 petal 34 -> 13, leaf 39 -> 16, burst 22 -> 14. 1366x1024: petal 37 -> 15. 412x1058: 37 -> 13. 390x844@3: 37 -> 11. Petal count 14-22 -> 6-10.
Particles centred over the top bar (before: petal 3, 5, 6 at Fold / iPad / iPad Pro): 0 after. Remaining "outStage"/"overHud" counts for snow/fly/mist are sprites in the 90 px spawn margin, invisible because of the stage mask.
Burst favour outside stage: 14/15 before, 0-2 after (margin only).

## Tests
- quickcheck 7754f10f3 PASS: open 1124 ms, old save ok, core gates PASS, perf median of 5 new/live: render 288/323 ms, tab 349/351, buổi 980/1161 (an earlier run showed buổi 1033/956 = +8% and 1000/927 with kfOverInfo refreshing every 400 ms; changed to 1.5 s; reruns are noise-level, render within +2% in all runs).
- wx-fx-size.js at 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3: no page errors. Looked at shots: hoa đào bay (Fold + iPad) petals are small, inside the stage, none over the top bar / chips; snow (Fold) fine, small blue flakes, no regression.
- Not re-run: full co-op suites (no co-op code touched).

## Handover / rollover
START_CTX was low (~10%); finished well under +25%. Nothing pending; no successor needed.
