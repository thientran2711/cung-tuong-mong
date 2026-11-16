PASS d5ca28a8a8f803ed4f4302c3b4bfb34a83853bb0

# review art-complete r2 (orphan audit #29: A12 eunuch picker + art-complete part 2)
Branch review/art-complete-r2 = origin/review/art-complete @79d5d5b2 merged onto origin/main 0ee35a63 (descends from main; conflicts only in generated index.html/assets.json/sw.js, taken from main and rebuilt with dev/site/build_site.sh).
Code delta since r1 (e3fc5f61) = dev/build/jartc.js +15 lines (parts 3 and 4) and nothing else in code: no UI, no numbers, no new strings, so KIT / BAL / VANPHONG are not touched.

## Checked
1. Eunuch picker (jartc part 3, f88Best override). Probed all 30 eunuch identities u01-u30 x rank {0,1,2,3,undefined,7,-1} x age {15..70} x fig/por (3780 picks): 0 throws, 0 null, 0 empty path; rank always the asked tier (null tier = r1, out-of-range clamped 0..3, missing rk = r1 so old saves behave as before); age band follows figDist (a18/a26/a36/a51, switch at ~43.5). Manifest FIGURES-servants.json: 360 eunuch records = 30 ids x r0..r3 x 4 ages, none missing.
2. Grown kids (part 4). kidBandOf: 0-6 to 4, 7-11 to 9, 12-16 to 14, 17-25 to 20, 26-35 to 26, 36-50 to 36, 51+ to 51; KIDBANDS/KIDH extended (adults full height). p01-p04 and f01-f04 resolve to a26/a36/a51 (e.g. p01 age 28/40/60 gives a26/a36/a51); the other 40 ids keep their band-20 face for life (nearest drawn band), no empty figure. kidFig does not break when KIDIX is empty (returns null as before).
3. CDN: all 1152 eunuch/kid file+por URLs in the two manifests answer 200 (range probe); the 168 new ones (u26-u30, p/f01-04 grown) are 23-130 KB, no zero-byte files.
4. Pictures (sample of 10 looked at: u26 r0, u28 r2, u30 r3, u12 r3, p01 a26, p02 a36, f01 a20, f03 a51 + 2 portraits): same painterly style as the anchor, adult faces, rich robes, men in blue/green/red (no pink/purple), natural fair skin, NO rosy layer added. Rank readable by richness (r0 plain, r3 dragon/jade).
5. Tests (Playwright, proxy-wrapped harness): npc-art-audit 70/70 person tokens have a figure, 0 errors; fig-fill man+mix at 755x1000 and 1180x820: chip above head, feet on floor, painted 0.73-0.91 of column, 0 errors (shots looked at: Tiểu Lý Tử eunuch dialog, kit chips/frames only); missing_pics.js: events 9/327, acts 0/115, option cards 6 on placeholder, 0 page errors (see follow-ups).

## Follow-ups (not painted here)
- u10 / u20 / u30 colour TODO still open (art-complete PROGRESS); the three look-alike colour groups should be re-checked once the rank art is final.
- act-pics2: 237/380 done, 143 keys left (from thu-cu-lot); resume at the owner's morning. Placeholder events 9/327 listed in dev/art/MISSING_PICS.md after the next missing_pics run.
- main's review/skin-norosy will change all figures; the new u26-u30 + grown kids should be included in its sweep (they were generated without a rosy layer, so they may need nothing).
- Grown-kid art exists for only 8 of 48 identities (p01-p04, f01-f04); a26/a36/a51 for the rest is a later batch.
- Tests not run: full figure soak and stage-fig-size (unchanged code paths; only jartc.js changed).
