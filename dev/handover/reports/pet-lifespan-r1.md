# pet-lifespan review r1 (sonnet, BIG tier) — for MAIN s21

**PASS 0e8e3684** (review/pet-lifespan-r1 = origin/main 12f52db7 + review/pet-lifespan fe766e6a; ancestor of main; generated index.html/sw.js/assets.json rebuilt with build_site.sh after resolving assemble.py/index/sw conflicts). Fast-forwardable; not pushed to main.

## Scope vs OD 18:15Z / 18:50Z
Già stage, per-species lifespan from BAL.pet.life (groups thu/chim/ca/hac/linh/than), fate + hard ceiling careMax, care adds a little, farewell kit notice + keepsake, Ngự tứ mortal (rescuer 1 -> -1, nothing given back), NPC pets same rule (OD:L1386), no punishment (Thái hậu unchanged on old age: 0/all runs). All numbers are BAL keys; text prints no typed numbers (ages are computed).

## Checks
- Bot on real game (RUNS=12, 30-yr kiếp, good/ordinary care + NPC): careCeilingBroken 0, thaiHauChangedOnOldAgeDeath 0, nobody died below dice.lo, keepsakes 97 (her) / 90 (NPC). Per species: cats/rabbit 12 y, birds ~15, fish ~18, crane/spirit ~25 (many alive at 30), divine 25+ and mostly alive. Sane. Care effect is small (max +1/+2/+3 y), within noise at n=12 — matches "a little".
- Old save (main-build save, pets without P.at): loads, both get a lifespan (15 y / 10 y), none dies in 6 weeks.
- Co-op: guest keeps NPC pet, host removes it. Divine: shield gone, no compensation.
- No page errors; no overflow/ellipsis/broken images at Fold 755x1000@2 and iPad 1180x820@2 (Già card, Già care, "đã già" card, farewell card). Farewell + old card = kit notice frame (big frame OK, rare event).
- Perf: petWeek 0.006 vs 0.001 ms (22 pets) — negligible.
- Only existing code touched: 2 caption spots in jpetcare + assemble list.

## Minor notes (not FAIL)
1. Behind the farewell card the pets list still shows the dead pet until the card closes (render is deferred 60 ms); cosmetic.
2. Farewell text says "ta" (pronoun swap) while the log line says "ngươi" — existing game-wide pronoun behaviour, not from this branch.
3. KIT REQUEST from worker still open (Già pictures, keepsake painting) — art, not blocking.

## Separate finding: care-screen picture overlap — ON MAIN: YES
On current origin/main 12f52db7 (no lifespan code), "Chăm hạc đỉnh hồng" shows the act-card picture (tea cup, pink frame) over the four bars (No/Sạch/Vui/Tình cảm) at the top and clipping the first row ("Ghi chú"). Reproduced at 755x1000@2 and 1180x820@2. Shots: review/pet-lifespan-r1 -> dev/review/pet-lifespan/r1-main-care-755.jpg, r1-main-care-1180.jpg. Not caused by pet-lifespan. Route to the act-pics / pet-care owner (whole group: every pbtn/act-card picture inside a kit dialog).
