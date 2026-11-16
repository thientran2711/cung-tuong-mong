# review/weather-fx-one-r1 — PASS (after 2 small fixes)
Branch review/weather-fx-one-r1 = review/weather-fx-one f6141594 + origin/main a96b34642 (index.html/sw.js/assets.json conflicts = generated, rebuilt with dev/site/build_site.sh) + fixes below.
## Checks
- ONE particle layer: all weather/season/deco sprites are children of the single jfx Pixi canvas #kfxcv (weather clipped by a plain white rectangle mask, not art). j11's Pixi app now only draws the room backdrop copy; no code-drawn texture, mkPart, PCOL or pxBurst particles remain (pxBurst = shim to painted kfPx; all 6 feedback kinds run, 0 errors).
- Painted sprites only: kinds seen petal-peach/plum/lotus, leaf, osmanthus, snow, streak, smoke, orb, spark, petal-gold (all KFK painted sets).
- Budget: one capped layer (KF_WX cap x phone x height x adaptive q + KFK_CAP); max 67 live sprites (storm night, incl. 18 lamp/star deco); hidden tab stops the ticker + ambient timer; Gọn (OPT.fxon=false) -> 0 particles, canvas display none at all 5 sizes; Gọn off -> returns (<=2.5 s watchdog).
- Double petals scan (season x 12 weather kinds x day/night, 1180x820, q reset to 1, 96 combos): every combination reachable in game (WX table per season) has ONE effect per kind. Spring+petal, autumn+leaf/wind, winter+snow/snowh/frost/snowp merge into a single full-screen "se" layer (no "wx" sprites). Combos with two different falling things (e.g. spring rain = petals + rain, winter wind = snow + leaf) are not reachable (WX lists are per season). Unreachable forced combos (summer+petal, autumn+petal) show lotus/leaf season + peach weather: not a duplicate of the same effect, not in game.
- Page errors: 0 at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390; no horizontal overflow; weather-port.js PASS.
- Shots looked at: spring petals day 1180, summer storm night 755 / 1180 / 844, winter snow night 1180, autumn wind 755, winter snowh in Đức Thọ cung 1180, rain crops at 1180 and 844. Night keeps colour (alpha x.82, no grey).
## Fixes made on -r1
1. Festival ambient was lost: j33's pxKind festival particles (gold at newyear/giaothua/nguyentieu, fireflies at thattich/trungthu, outdoors; added recently by place-colour r1) had no consumer after j11 stopped spawning. Re-added as painted: KF_WX.gold (petal-gold) and the existing "fly" (orb), override of the weather as before. Verified newyear -> gold@wx, trungthu/thattich -> orb@wx.
2. Rain on short stages (844x390, stage 421x193): streaks were stage-sized and few. Rain density floor .75 (was .4 area scale) and streak length follows stage height (min x.7).
## Caveats (for the coordinator)
- Rain is visible but pale on bright paintings; at 844x390 it is still sparse in my software-GL runs (timer/fps starved, q drops to .3-.7). Re-check on a real GPU; tune KF_WX.drizzle/storm a0/tint if the owner finds it weak.
- j93.js still has a dead mkPart/PCOL patch (guarded by typeof, harmless); j11 pxKind is now only used as a scene key.
- Season layer is full screen on every screen (z 9450, pointer-events none, sparse): petals pass over cards/text. This is the owner's rule (OD 16/11 "season = whole screen").
- Indoor rooms show weather in the stage (owner rule "weather = in the room/place stage").
