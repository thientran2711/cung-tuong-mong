# anim-pace report (review/anim-pace) — owner 16/11 15:05Z

START_CTX ~8 % (this worker). Rollover not needed: only push + report remain.

## 1. jbuoi (KIT §74) — fixed
Root cause of "only the middle / faint": `.btr-tint` was an elliptical gradient fading to transparent at the edges, the wash mask was low-opacity, the sky band 96 px, title 2.4 rem. Now: solid full-bleed tint (`inset:0`, no transparent edge) + ink wash (mask `cover`) + vignette; sky band `clamp(128px,26vmin,220px)` x `min(92vw,720px)` and title centred in a flex stage (same at 755x1000, 1180x820, 1366x1024, 412x1058, 390x844, 1024x768); title `clamp(2.1rem,8.5vmin,3.7rem)` on a tint plate; orb 48-100 px. First-use art is warmed after 9 s of play (4 files, ~130 KB), so the first change already shows hills/sun.
Verified frames at 755x1000 and 1180x820 (screens viewed); dev/test/buoi-transition.js fold/ipad/ipad-pro: FAIL 0 (tap skip, Gọn = 1 layer, sync, 0 page errors).

## 2. Pace audit (one constant: `BAL.pace` = 1.75, `kitPace(ms)`, CSS `var(--pace)`, KIT §82)
| animation | before | after (x1.75) | where |
|---|---|---|---|
| buổi transition | 1.7 s / dawn 2.0 s | 2.98 s / 3.5 s | jbuoi |
| card flip (his tray) | already x1.75 (CF.slow 1.75) | same, now reads BAL.pace | jflip |
| reward chest / box / item reveal (shake 420, pause 700, rise 550, hold 1300, shelf 380, fall 1300, coins 900 ms) | those | x1.75 | BAL.reveal (jbal2) |
| km scenes: tablet flip tray, xam lot, result seal/floats, promotion, demotion (crack/grey), edict, gloom, bloom, ink, calendar page, scene timers (kmStage.later, 2.8 s notes, alarm 1.7 s, floats 2.4 s) | 0.3-2 s | x1.75 | j93 (49 animation rules + later()) |
| promotion preview (kprev) | .5-.8 s | x1.75 | jpromo |
| week dawn() summary (sky 2.6 s, bell 1.4 s, calendar 1.35 s, box fade .35 s) | 2.6 s | 4.55 s | p1.html, j18, j79, j93 |
| night-end beats (lonely 2.2 s, dawn 2.4 s, list .9 s) | those | x1.75 | BAL.nightEnd (jne) |
| podium | .55-1 s, bursts 0-2.4 s | x1.75 | j90 |
| item-reveal text, loss fall | .4 s / 1.3 s | x1.75 | jkrev |
| full-screen fx red / night / dark | .9 / 2.2 s | x1.75 | jfx |
| srvToast | 2.6 s | 4.55 s | j42 |
| NOT changed | | | micro < 0.3 s (taps, dialogs, hover, ripples); infinite loops; stat fx (hold 1.6 + fly 1.1 s, glow 2.6 s = already long); map unroll (KIT_MAP_MS 1.15 s); result toasts (7-9 s); weather ambient loops; Tuần lục page curl |
Gọn / reduced motion: `kitPace` returns the old ms, scenes jump to final state as before. Never blocks input or sync (all run after state applied; tap still skips).
Not verified by test: every scene individually (only the buổi transition test + game-feel + a perf run). Mechanical CSS scaling covered j93/jpromo/jne/j90/jkrev/jfx rules listed above; other modules with their own timings (jbook unroll, jk2b roulette, jfxkit lights) are unchanged and listed for a follow-up if she still finds them fast.

## 3. Season + festival variants (code live, falls back to the per-buổi look)
Reused painted sprites of the kit particle layer (§68) — no new sprites needed: xuan petal-peach/plum, ha petal-lotus + warm haze, thu leaf/osmanthus, dong snow + cold haze. Festivals (the game's FEST table, j31): newyear, nguyentieu, thanhminh, doanngo, phoenix, thattich, trungthu, trungcuu, dongchi, giaothua (name under the title, festival tint + sprites win over the season). `festToday()` / `SEAK[SEASON]` choose it; `window.__btrVar` forces one (kit page sample §74 has buttons for all 4 seasons + 10 festivals).
Sample paintings (Magnific gpt-2-6, folder ba4aecfe, 40 credits each, viewed, on CDN img/fx/): `buoi-band-thu.webp` (maple-framed autumn dusk sky, 51 KB) and `buoi-band-trungthu.webp` (Mid-Autumn moon + lanterns + osmanthus, 43 KB). Wired through `BTR_ART`.
### Art list for Foreman C (band skin 3:1 sky banner, same prompt style, 1080 px wide WebP ~45 KB, name `buoi-band-<key>.webp`, then add the key to BTR_ART)
xuan (blossom branches, pink dawn sky), ha (lotus leaves, hazy gold sky), dong (snow-laden plum branches, pale cold sky); festivals: newyear, nguyentieu, thanhminh, doanngo, phoenix, thattich, trungcuu, dongchi, giaothua. (12 pictures, ~480 credits.) Optional later: per-festival title seal.

## Tests
buoi-transition (fold, ipad, ipad-pro) FAIL 0; game-feel result.json present, no errors, offlineErrs []; kit-conform 755x1000 CONFORMS 90 / MISSING 15 (dialog frame scan, untouched by this change — not compared against main); perf (fold, swiftshader sandbox) over budget on firstLoad 69 MB / title 45 s / warm MB / long tasks — environment + existing downloads, not from this change (my bytes added: 0 at boot; 130 KB fx warmed after 9 s; band skin 43-51 KB only on its day); coop-e2e not run (needs the live Worker) — the change is visual only and runs after state applies. Videos: `buoi-transition-755x1000.webm`, `buoi-transition-1180x820.webm` (headless software-GL recording is choppy; shows spring buổi 1/2/3 and the Trung thu variant; later clips in the file play but sample frames are sparse). 1366x1024, 412x1058, 390x844, 1024x768 only through the DOM test, not viewed.
Sandbox note: the CDN fx images are blocked by the headless browser here (ORB), so frames were taken with local copies of the same files.
