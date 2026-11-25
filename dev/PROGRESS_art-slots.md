# PROGRESS art-slots (worker ART-SLOTS, child of MAIN 147) — review/art-slots

PRIORITY #1 CHECK: 'Cổng cung' OD 0 | claims 0 | main 15 (j93 kitEntryGate §81.1, joi oiGate, jcui sample, KIT.md §81.1, test kit-entry-gate.js) | review/* 0; 'vẽ bằng code' OD 5 | claims 1 | main 0. Reused: kitEntryGate + kmStage + kit-entry-gate test; no new part.

Owner bug OD 25/11 ~23:15Z (k11-ipad-entry-gate-code-drawn.jpg): the entry gate showed a code-drawn stand-in (dark box, glow blob, red bars).
Root causes: (1) the 6 gate slots were never painted; (2) kegPic AND kg82Pic compared the full CDN url with the «img/…» keys of KIT_CDNHAVE → a painted
file was NEVER found in the built game (the gate could only ever show the stand-in; the mini-game prop picture was always dropped).

## Whole family (LUẬT SỬA CẢ NHÓM) — every slot whose missing file showed a code / gradient stand-in (scan: node dev/test/art-slots.js, reads the live game)
| family | where | slots | before (on CDN) | after |
|---|---|---|---|---|
| entry | j93 kitEntryGate (scene + leaves) | 4 → 10 (per-kind leaves) | 0 | 10 |
| mg-board | j82 kg82Pic / kg82Bg (contest + lesson rooms) | 37 | 36 (mg-hoadien-bg missing) | 37 |
| mg-sprite | j82 KG82_SPR / jslap preload | 93 | 93 | 93 |
| mg-craft | jcraft crArt (CR_SLOTS) | 15 | 12 (ve-motif-hac, kim-cut-dia, theu-needle drawn in code) | 15 |
| mg-figbg | j82 KG82_MGBG figure-column backdrop (j79 kitGameFig) | 39 → 37 | 35 (duho, den missing; kinh, may → now use their board ve) | 37 |
| ph59 | jph KIT_PH (§59 painted placeholders) | 4 | 4 | 4 |
| lookup | kegPic / kg82Pic find their painted file | 36 | 0 (url/key mismatch) | 36 |
PASS: all 232 reachable art slots are on the CDN. kit-entry-gate.js PASS 134/134.

## Painted (Magnific gpt-2-6, folder ba4aecfe; every image looked at) — ids in /home/user/wt/art-slots-work/gens.txt (copied below)
- entry-gate-bg-consort (mEAPv8ehJQ, upscaled P3Hm6oR42C) · bride (rgo0j1Kxtc / 79EoPdzJAL) · maid (vQz9Cfta47 / aFnNu4OfSh) · corridor (lJhpU72gv9 / 3z1EACCREY); ref = CDN img/_review/c3-evbg/selx-gate.webp (approved scene, OD:L86 edit rule)
- entry-gate-door-l/-r (rgo0smoxtc, r = mirror) · entry-gate-door-side-l/-r (s7mDSJsl8e, r = mirror)
- mg-ve-motif-hac (u50R5OMQLD) · mg-kim-cut-dia (ksXWsZK16B) · mg-theu-needle (rgo0gnRxtc) · mg-hoadien-bg (Ebc3b6AuuO) · mgbg-duho (tC2yCy9mZJ) · mgbg-den (O6QI6twynm)
- Spend: 24 gens × 80 + 4 upscales × 72 = 2,208 credits.

## Code
- j93: kitEntryGate painted-only (no .kmeg-glow, no .kmeg-dp leaves), leaves placed in the measured doorway (KEG.gate), scene + leaves push together (.kmeg-scn),
  stage waits for the scene picture (skip on error/4 s), kegDoors(kind); kegPic url fix.
- j82: kg82Pic url fix; KG82_MGBG maps kinh/may to the ve board backdrop. jcraft: CR_SLOTS (all 15 craft sprite names) = CR_HAVE.
- dev/test/art-slots.js (new), dev/test/kit-entry-gate.js waits for the painted scene. KIT.md §81.1 rewritten in place.
- Remaining by design: the craft/board drawing code still runs ONLY if a painted file fails to load at play time (a game cannot be skipped mid-play); with every slot on the CDN it never shows.
