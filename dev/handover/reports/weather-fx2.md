# review/weather-fx2 — weather fx round 2 (owner 16/11 12:08Z)
Everything is in the ONE weather kit part (dev/build/jfx.js KF_WX / kfSeCfg / kfBolt; KIT.md §68.6; kit sample §68 row "weather <kind>").
START_CTX ~8 % (estimate); no rollover needed.
## Root causes + fixes (whole group)
| # | owner note | cause | fix |
|---|---|---|---|
| 1 | storm flash half frame | p1.html had two `.stage::after` rules; the flash one inherited `height:45%` | both dead rules deleted; lightning = kfBolt(): white wash over the WHOLE stage rect, above figures/art, 2 strobes + fade (j11 calls it with the thunder sound; Gọn = none) |
| 2 | snow thin/pale | merged into season layer at cap x.55, scale x.7; pale-blue art on light paint | merge x.85/x.9, caps 64/100/60/18, flakes x1.5-2.5, blue tint; not a blizzard |
| 3 | wind invisible | merged into season (sparse), leaves spawned at top edge, ~7 alive | wind not merged; leaves from the left across full height 5-9 px/frame, spin, gust 2.2, + brown-grey wind streak lines; cap 96, 6 spawns/tick |
| 4 | spring yellow | festival gold petals (Tet) override the peach; season art had plum/osmanthus | spring = peach only (pink tint); Tet/Nguyên tiêu use peach, gold only Giao thừa |
| 5 | summer = spring | lotus petals (pink) | summer season layer = golden sun motes + slanted light shafts + sun glow (painted streak/orb/ember/glowburst), no petals |
| 6 | fireflies invisible | tiny additive orb, invisible on light art | halo (normal blend, lime) + bright core, 2 sprites, blink, 36 cap |
Rain unchanged. No new art, no new bytes. Perf: same caps x phone x height x adaptive q, KFK_CAP, Gọn/reduced motion = 0 particles (game-feel off switch 0).
## Not done / open
- Heat shimmer and DRAGONFLIES need a painted atlas (kit request: "dragonfly" 9x64px, Magnific gpt-2-6). Coordinator was not reachable by send_message (session id not found).
- Software-GL box: q drops to .7 on snow/rain; videos are worse than a real device.
## Tests
weather-port 755x1000@2 + 1180x820@2 PASS (0 page errors); game-feel: 0 errs, overflowX false, off switch 0 parts, old save + offline OK; kit-conform 755x1000 / 1180x820: 84 conform, 15-16 MISSING (dialog kinds unrelated to weather; not compared with main), 0 floats; dedicated boot-flash not run (every test above boots the game at both sizes with 0 page errors).
## Videos (dev/handover/reports/weather-videos-v2/, 755x1000, ~15 s, first ~5 s = game start cover)
weather-{spring-petals,rain,storm,snow,wind-leaves,mist,fireflies-night,summer-lotus-season}-755x1000.mp4. I looked at a late frame of each (storm frame caught mid-flash, whole frame washed).
