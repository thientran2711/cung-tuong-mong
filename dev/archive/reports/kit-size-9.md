# kit-size #9 (sonnet kit keeper) — grade chip ON the item frame edge, every kitItem caller

START_CTX ≈ 5 % (estimate). Branch review/kit-size-9 from review/kit-size-8-r1 61c3283d. Owner: s26 "1" (OD ~23:18Z).
READY: code ad1a3399, build fd91dd72 (quickcheck run on fd91dd72).

## What changed (ONE change in kitItem + kit CSS, no per-screen variant)
- `kitItem` (jk2b) draws `kitGradeChip(g,{size:"fr",name:o.gname})` (`kitItemGrade`) INSIDE `.kitb`, centred ON the bottom edge of the frame (half in, half out). `.kitg` grade line is gone (element, rule and every `.kitg{display:none}` workaround: jinv, jitd, jksize x2, jkrev, jpet hack).
- New chip size "fr" in kitGradeChip (jkrev §54.1): container units of the frame, font max(9.2cqw,7px): 7 px at wear/bag slot (43-58), 7 at M 72, 9.6 at L 104, 13.8 at XL 150; widest word ≤ 85 % of a 58 px slot.
- Corner plan: chip bottom centre · Xa xỉ box top-right (unchanged) · Ngự seal top-left (old bottom-left detour removed) · "đã tẩm" top-right, or left under the seal row when Xa xỉ shows · ×N lifted above the chip · "Đang mặc" band lifted above the chip. `.kitb` overflow visible; named tiles get margin-bottom for the hanging half; wear/pet column slots 6 px (caption stayed hidden under the chip in the first shot, fixed).
- Duplicate grade chips removed: item detail + item card (jitd: chip beside the name), reveal card (jkrev: now kind line `.krevs` under the name), Hoàng thượng ban row (jne), pet tier replace hack (jpet; `gname` instead), reward shelf tile passes the grade word (Bạc for silver, j93).
- Sample builders use the real kitItem (kszItemTile, kszItem3: no sample-only chip, no transform copy). KIT.md §84 #9 + canon-overwritten lines (1195, 1223, 1264, 3407, 3960, 4011). Kit page §54.1 now shows chip sizes + frames at slot/M/L/XL.
- kit-conform.js:83 `accEtqCard(pl,function(){})` (reviewer nit).

## Whole-family scan (before → after)
| item | before (61c3283d) | after |
|---|---|---|
| kitItem call sites (22 files, 59) | grade word under named tiles only (sm/md/lg named), NOTHING on bag/wear slots, frameless lg/xl: word under | chip on the frame edge at every size, every caller (non-empty) |
| `.kitg` references in j*.js | 9 (1 element, 1 rule, 7 hides/hacks) | 0 |
| standalone grade chip next to a picture | 4 (jitd x2, jkrev reveal, jne) | 0 (j93 reward LIST rows keep their text chip: no picture there) |
| live scan (bag, wear pick, card; Fold + iPad) | — | non-empty frames without chip 0; chip outside frame 0; chip hit by Xa xỉ / seal / qty / band / mark 0 |
| kit-size9-chip.js 60 frames (slot/md/lg/xl × 5 grades × plain, lux+qty, worn+mark+lux) | — | bad 0 |
No pictorial BEFORE sheet: the base build I tried to serve for it started a different save and did not open the bag; the "before" is the code facts above. After sheets were looked at one by one: chip1-3 (60 frames), bag 755/1180, wear pick 755, card 755/1180, reveal, items3 sheet.

## Tests
- kit-size9-chip 60/60 clean; kit-size9-live Fold + iPad errs 0; kit-size8-lux unchanged (.227 / .026); kit-conform 755 + 1180: MIXED 0, CONFORMS 102/100, MISSING 3 (contest, cold-palace = stale as before; place:etq random pick, no dialog when the picked place has no etiquette: test data, not a frame).
- coop-e2e 59/60 first run (known flake "#next enabled"), rerun 59/59. quickcheck PASS 159 s (old save ok; perf new/live render 285/316 ms).
Not re-run: kit-size5, kit-size7-pics (no frame/picture-layout code touched).

## Known / open
- kitReward / kitGain full-screen reveal tile (sm, 52) chip is 7 px; the reveal card XL chip is large (13.8 px) by the 9.2 % rule.
- The item detail rows still carry PHẨM (a row, not the picture line); remove only if the owner wants.
- ART/none. No new text, no BAL numbers.

## r1 fix (reviewer FAIL 23:58Z) — READY: code 526e1bc8, build 0295fa45
1. jgpick kipTile + sample: grade word `.kshp` dropped, grid rows 4 → 3 (jgpick .kshc.kshpick.kipc). Family scan (grade word next to a kitItem): only jgpick found in tiles; ALSO three pop-up header subs printed "kind · grade" beside the picture chip (jecon:116, jrcp:198, jwdinv:103) → kind only. jitev:94 / jk2b:787 = tooltips, kept.
2. Chip/name gap: `.kshc>.kshpic{margin-bottom:8px}` (jinv, gift / shop / pet / recipe tiles), named tiles margin-bottom +3 px (jk2b), wear/pet column +3 px (jinv). New scan dev/test/kit-size9-gap.js (kit page, Fold + iPad): text starting inside the 3 px band under any chip = 0 (one hit is the sample overlay over the real bag, a false positive); duplicate grade word in a tile = 0. Gift tile + recipe tile looked at (Fold).
3. Tests: kit-size9-chip 60/60, live bag/wear Fold+iPad clean, kit-conform 755/1180 MIXED 0 (CONFORMS 101/100, MISSING 2 stale), quickcheck PASS 170 s (first run FAIL perf renderMs 303 vs 201 live, limit 301 = noise, rerun 310/339 PASS).
Note for owner/main: recipe tiles (jwkr/jrcp, grade:0) now show a "Thường" chip because they use kitItem; they are recipes, not graded items. Say if they should hide it (needs a kitItem flag, not a per-screen CSS).

## r2 (s27 decision 00:12Z: a recipe is not a graded item) — READY: code 844a3949, build a227d507
kitItem draws the chip only when `o.grade != null` (jk2b); real items of grade 0 keep "Thường". Callers passing no real grade: only the recipe tiles jwkr:84 + jrcp:210 (literal grade:0 removed); the other `grade:0`-ish callers (jinv:349, jwdinv:126 `a?a.grade:0`, pet kitten) are real items. KIT.md §84 #9 states the rule. Scan kit-size9-gap.js now lists frames without chip: kit page = the 2 recipe tiles only, bag/wear 0; kit-size9-chip 61/61 (incl. a no-grade frame at 4 sizes). kit-conform 755/1180 MIXED 0 (CONFORMS 101/101, MISSING 2), quickcheck PASS 190 s.
