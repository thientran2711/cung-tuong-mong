# review/weather-fx3-r1 — verdict PASS ab12d6fc (round 2, perf pass 5b715ad3)
Supersedes the earlier PASS f92ee954 (perf criterion arrived after it). Head contains origin/main 1aa0edb2.
Perf (dev/test/perf-fx.js, FX-on frame time, 4x CPU throttle, software GL; live main = same weather, same box): median / p95 ms
- snow iPad: 17 / 100 (main 100 / 133); snow Fold: 33 / 183 (main 167 / 183)
- fly iPad: 33 / 83 (main 83 / 100); fly Fold: 33 / 133 (main 117 / 150)
- rain iPad: 50 -> 33 / 117 after my fix drizzle cap 38->20 (main 117 / 150); rain Fold 33 / 183
- storm iPad: 67 / 133-150 (main 133 / 150); cap 80->44 gave no gain, so cap kept at 80 (look kept)
Median <=33 ms met everywhere except storm (67 ms, half of main). 33 ms = 2 frames at the 30 fps ambient cap; p95 <= main everywhere. FX layer already resolution 1; twin sprites kept (the approved look; the perf pass already removed the main cost).
Other: fest-fx.js ALL PASS (0 page errors); quickcheck PASS (old save ok, buoi 936/852 ms); look unchanged; earlier shots checked (halo fix 02d5c249 stays).
Open (non-blocking): storm > 33 ms median; real-GPU numbers not measurable here.
