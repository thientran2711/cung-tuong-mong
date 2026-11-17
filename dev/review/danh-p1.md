# danh-p1 — P1 applied, reproducible bot runner, Tài-nghệ bot (review/danh-p1)

Owner ruling 16/11 12:55Z (dev/handover/FOREMAN_D.md "(12:55Z s16) … ANSWERS"): P1 APPROVED (charity bạc 20→35, Danh 1→5 + shared
Hành sự door); P2 build the Tài-nghệ bot first, NO BAL.ex.bar change; P3 NO. Base = review/danh-balance-r1 @9a1133f0 + origin/main b85cdb1e.

## 1. P1 (code)
- `BAL.charity` (jbal2.js, the only place with the numbers): {khac 1, bac 20→35, duc 3, danh 1→5}. Every text prints BAL (j85 + jtabs
  Tài nghệ card, Đức panel row, Hành sự card) → no typed copy (ONE CORE).
- Shared door (PRIORITY RULE #1, reuse): act-dedupe's Hành sự card path for acts with a second home (jact.js, like the maid cards:
  `ad:1` + `adRun`). New `adCharityCard()` is dealt in Hành sự; it runs `charityFx()` — the SAME effect body as the Tài nghệ button (j85
  `charity()` now = guards + `charityFx()` + spend). ONE lock: `S.charM === S.turn` (once a month) + `S.bac < BAL.charity.bac`
  (`charityLocked()`), read by both doors. Not dealt for servants (cung nữ mode) or in lãnh cung (`S.out`), as before.
- Card = kit act card (Cần / Tốn / Được from c/w; no new part). Grey reasons: "Tháng này đã làm", "Thiếu bạc (cần 35)".
  Picture: CDN img/ACTS.json already maps "Phát bạc cứu giúp cung nhân nghèo" → act-phat-bac-cuu-giup. No KIT REQUEST.
- Gain/loss (OD:L582): Bạc −35 (≈ a month's stipend at Đáp ứng) + 1 khắc → Danh +5, Đức +3, once a month. Non-bạc roads to Danh
  in Hành sự stay: Múa trong yến tiệc (Sức, risky ±Danh, jealousy), Thỉnh an Thái hậu.

## 2. Reproducible runner (dev/measure/run_rep.js + vclock.js)
Cause of run_par.js drift: ~100 game timers (setTimeout/setInterval/rAF) and Date.now/performance.now run on wall-clock time between bot
calls and draw from the same seeded Math.random. Fix: vclock.js (init script) puts every timer, Date and performance.now on a virtual clock
that the bot advances 5 ms per step (inpage6.js), seeds crypto.getRandomValues, re-seeds the stream at start(); run_rep.js gives each page
its own life quota (not a race to T), serves every non-local request from one disk cache, writes pages in fixed order. Same CLI as run_par.
Proof: (a) two concurrent runs, seed 501, 2 pages × 2 lives: byte-identical (md5 6997b84a3f93 both); (b) full arm before_hs_501
(16 lives, cap 144) re-run later: see §5.

## 3. P1 measured (3 seeds × 16 lives per arm, cap 144 tuần, HHSTOP; before = f8ebd5e7 build, after = a058c5f8)
hs = Hành sự only; mix = full sensible bot. Mean ± 95 % CI; Wilson for %. Data dev/measure/pass/data/danh-p1/*.json.
| | hs before | hs P1 | mix before | mix P1 |
|---|---|---|---|---|
| Danh at tuần 48 | 29.8 ± 8.2 | 62.0 ± 9.0 | 16.0 ± 5.7 | 25.2 ± 7.7 |
| Danh at tuần 144 | 38.8 ± 10.0 | 71.9 ± 8.8 | 19.5 ± 8.0 | 38.7 ± 10.1 |
| Danh at the end of the life | 39.0 ± 9.7 | 66.7 ± 9.6 | 17.4 ± 6.5 | 39.3 ± 9.2 |
| tuần held back by the Danh row | 51 % | 12 % | 72 % | 47 % |
| tuần held back by the Sủng row | 20 % | 32 % | 4 % | 5 % |
| charity uses per life | 0 | 30.7 ± 2.6 | 0 | 31.9 ± 2.8 |
| Danh from the charity card per life | — | +135 (seed 501) | — | — |
| max rank | 3.1 ± 0.4 | 3.1 ± 0.4 | 2.4 ± 0.3 | 2.9 ± 0.3 |
| rank at tuần 144 | 1.9 ± 0.5 | 1.8 ± 0.5 | 1.6 ± 0.4 | 1.5 ± 0.5 |
| Hoàng hậu within 144 tuần | 0 % (0–7) | 0 % (0–7) | 0 % (0–7) | 0 % (0–7) |
| died / ended early | 6 % | 6 % | 12 % | 6 % |
Per seed (Danh tuần 144 / Danh-row hold): hs before 31.9/60 %, 53.5/48 %, 31.0/47 % → P1 66.7/9 %, 58.7/18 %, 84.8/8 %;
mix before 30.1/69 %, 9.9/75 %, 13.7/72 % → P1 40.1/50 %, 34.1/48 %, 41.9/44 %. All 3 seeds same direction on both arms.
Read: P1 restores Danh (net about +33 at tuần 144 for hs, +19 for mix; the old "+55" was arithmetic; the bot uses it ~31 times a life,
≈ every month) and the Danh row stops being the main block for a Hành-sự player (51 → 12 %). It does NOT restore rank: the exam holds her (§4).
Note: today's "before" is lower than the danh-balance report's "after" (Danh tuần 144 hs 38.8 vs 69.9, hold 51 vs 33 %): main moved
69 commits since bad941b4 (mortality, night-end, promo-skip …) — the comparison here is like-for-like on the same main.

## 4. P2 — Tài-nghệ bot (dev/measure/intn.js), REPORT ONLY, BAL.ex.bar unchanged
The bot studies the exam plan for her NEXT rank (jexam: EX_VIR[tier] Tứ đức pair; tier 0 Thêu/Nấu, tier 1 best Cầm kỳ thi họa; tier 2
Đức), through the real Tài nghệ buttons (ktArtSkills with jtds/jrcp wrappers; work picker → material → minigame "Để trời định").
Same harness for control (intn loaded, options off) → only the Tài nghệ use differs. All arms P1 build, 48 lives each.
| | hs, no Tài nghệ | hs + Tài nghệ | mix, no Tài nghệ | mix + Tài nghệ |
|---|---|---|---|---|
| her exams passed / sat | 57 % (217/382; 52–62) | 100 % (294/294; 99–100) | 50 % (175/349; 45–55) | 100 % (294/294; 99–100) |
| mean score / bar | 24.3 / 22.7 | 57.6 / 21.9 | 24.0 / 23.5 | 55.4 / 22.3 |
| Tứ đức part / art-Đức part | 0 / 0.0 | 16.4 / 7.7 | 0 / 0.2 | 15.6 / 7.3 |
| play part (rounds) | 24.3 | 33.5 | 23.8 | 32.4 |
| max rank | 3.1 ± 0.4 | 4.5 ± 0.4 | 2.9 ± 0.3 | 4.3 ± 0.4 |
| rank at tuần 144 | 1.8 ± 0.5 | 3.7 ± 0.7 | 1.5 ± 0.5 | 3.5 ± 0.6 |
| Danh at tuần 144 | 71.9 ± 8.8 | 94.5 ± 4.1 | 38.7 ± 10.1 | 87.0 ± 5.7 |
| Hoàng hậu within 144 tuần | 0 % | 4 % (1–14) | 0 % | 0 % |
| Tài nghệ study taps per life | 0 | ~370 | 0 | ~320 |
Findings: (1) cause 2 of danh-balance is now PROVEN: without Tài nghệ the Tứ đức + art parts of the score are 0 and she passes about half
the exams; with Tài nghệ she passes every exam. (2) A studying player clears the bar by a wide margin (score ≈ 2.5 × bar), so lowering
BAL.ex.bar (the old P2 idea [22,27,31] → [22,25,28]) is NOT supported: it would only help a player who never opens Tài nghệ. If anything
the bar is easy for a studying player; no change made (owner ruling). (3) The open question is discoverability (a Hành-sự-only player does
not know the exam scores Tứ đức/arts), not the number — a design/text item for the foreman, not a BAL change.
Caveat: "study taps" counts bot taps (some open a picker that ends without progress); the bot's minigame is "Để trời định" (average), so a
skilled player scores higher still.

## 5. Tests (one at a time)
- dev/test/danh-p1.js (17 checks: BAL numbers, one card in Hành sự, card costs = BAL, door 1 effect, Tài nghệ greyed after it, next month
  open, door 2 effect, Hành sự greyed "Tháng này đã làm", second try no-op, short of bạc reason + no effect, old save without S.charM,
  Đức panel row, kit card rendered, no %, servant mode no card, 0 page errors): PASS at 755x1000 and 1180x820 (3 repeats each).
- dev/test/act-dedupe-w1.js 755x1000: PASS (before and P1 builds). dev/test/act-dedupe-vp.js (5 priority viewports + 390x844): PASS.
- dev/test/succession.js: PASS.
- Full-arm replay (before_hs_501, 16 lives, cap 144, re-run 1 h later while other load ran): byte-identical (md5 dee71e8a7bf5 both).
P3: unchanged (owner NO).
