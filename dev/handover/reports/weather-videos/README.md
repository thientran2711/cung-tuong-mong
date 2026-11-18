# Weather / season effect videos (review/weather-fx-one-r1 @ 5a6ea9748)
Recorded 755x1000 (Fold portrait), 8 s, H.264, 0.2-0.7 MB each, on a software-GL box (frame rate and rain visibility are WORSE than on a real device). Room stage = Ngọc Thanh các (home), day unless noted.
Every effect is a Magnific-painted sprite set on the one jfx canvas (#kfxcv); nothing is code-drawn (only a plain rectangle mask clips weather to the stage).
| file | what | painted sprite set (kit §68, dev/build/jfxkit.js KFK_SP) |
|---|---|---|
| weather-spring-petals | spring, weather "hoa đào bay" merged with the season layer (ONE petal effect, full screen) | petal-peach, petal-plum |
| weather-rain | spring drizzle (stage-clipped) + season petals | streak (rain), petal-peach/plum |
| weather-storm | summer storm (stage-clipped) + lotus season | streak, petal-lotus |
| weather-snow | winter snow merged with season (full screen) | snow, petal-plum |
| weather-wind-leaves | autumn wind merged with season (full screen) | leaf, osmanthus |
| weather-mist | spring mist (stage) + season petals | smoke, petal-peach/plum |
| weather-fireflies-night | night "trời quang" fireflies (stage) + lanterns/stars + season | orb, spark |
| weather-summer-lotus-season | summer, season layer only | petal-lotus |
Not recorded: frost (snow sprites, sparser), snowh (same as snow, denser), snowp (snow + plum), festival gold petals (petal-gold, painted).
Caveat: rain is pale and sparse in these clips; judge it on a real GPU.
