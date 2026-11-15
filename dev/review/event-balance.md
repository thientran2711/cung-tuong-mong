# Event-choice balance audit (owner 15/11 15:10Z) — 3 bots

KIT §28.6 points here. Method: `dev/measure/evbot.js` — three players play every ACT the same sensible way (dev/measure/inpage4.js);
they differ ONLY on EVENT choices (pushDil / pushFront / mkP items: j67 chapters, j68 events, j72 offers, j70 dilemmas, kit choice panels):
- **hint**: reads only what the player sees — the "Gợi ý" line, the risk tag (an toàn / có rủi ro / liều) and the Tốn row (never the hidden numbers);
- **rand**: any affordable option; **same**: always the first affordable option.
Same seeds per mode (seeded Math.random + crypto), 300 game iterations per step. Lives that were still running at the end are not counted.
Owner goal: no option right in every context; the hint reader clearly beats random; always-the-same loses.

## What this branch changed for that goal

- Context, not a fixed answer (jevb §1): rolled event options take the odds of THIS moment — the person's hidden taste for that answer (drawn once per life), their mood, how much they like her, the Emperor's mood on his scenes; sure options scale the relation change by the same taste. The best answer moves between lives and days (dev/test/event-context.js: the same answer to the same consort ranges −12…+12 across 12 lives).
- Hints that tell options apart (jevb §5, data only): at the vague level many dialogs gave several options the same words. Now colliding options get the lowest clearer wording that differs, then their own chance in words, their gain size, their odds number (`od`). dev/review/hint-dedup.md: over the game's own dialogs, dialogs with duplicate hints 88 → 36, duplicate options 189 → 78; every one left is a true tie (same odds, same outcome).
- Bots run on current main (inpage4: j82 mini-games, refused places, no-op cards, long lives).

## Limits of this measurement

- One life takes 8–16 game years ≈ 10 minutes of one page; the shared machine (4 CPU, 16 GB, other workers' art jobs) kills pages when 4+ run at once. So the final table has 3–6 lives per bot: it shows the direction, it does not prove it.
- A firm verdict needs ≥30 lives per bot: `EVPAR=3 node dev/measure/evbot.js <page> 45 hint,rand,same 1 12` (≈ 3–4 h on a quiet machine), then `python3 dev/review/evbal_report.py run=<out.json>`.
- Acts are played the same sensible way by all three bots, so differences come only from event choices; acts still decide most of a life (thousands of acts vs ~300–500 event choices a life).

## Final: build e27a5f5 (context odds + hints that tell options apart), 3 seeds × 45 steps, one page per mode

steps per page: 45 · pages: 9 · page errors: 0

| bot | lives | avg max rank | reached Phi (5+) % | reached Hoàng hậu (7+) % | died % | life < 3 yrs % | ended below best rank % | punishments / life | years / life |
|---|---|---|---|---|---|---|---|---|---|
| đọc gợi ý (hint) | 3 | 4.33 | 66.7 | 0.0 | 33.3 | 0.0 | 33.3 | 0.0 | 11.44 |
| chọn bừa (rand) | 4 | 3.75 | 25.0 | 0.0 | 25.0 | 0.0 | 75.0 | 0.0 | 12.16 |
| luôn ô đầu (same) | 6 | 3.67 | 33.3 | 0.0 | 66.7 | 50.0 | 100.0 | 0.0 | 6.9 |

- đọc gợi ý (hint) endings: Thành Thái phi ×2; Trúng độc, không qua khỏi ×1
- chọn bừa (rand) endings: Thành Thái phi ×3; Khó sinh, băng huyết mà chết ×1
- luôn ô đầu (same) endings: Trúng độc, không qua khỏi ×3; Thành Thái phi ×2; Năm 13, Hoàng thượng niên hiệu Gia Thịnh băng hà ×1

## Before the hint de-dup (build 9b1b06d), one page at a time

steps per page: 45 · pages: 5 · page errors: 0

| bot | lives | avg max rank | reached Phi (5+) % | reached Hoàng hậu (7+) % | died % | life < 3 yrs % | ended below best rank % | punishments / life | years / life |
|---|---|---|---|---|---|---|---|---|---|
| đọc gợi ý (hint) | 3 | 4.0 | 33.3 | 0.0 | 33.3 | 33.3 | 100.0 | 0.0 | 9.89 |
| chọn bừa (rand) | 2 | 5.5 | 50.0 | 50.0 | 0.0 | 0.0 | 100.0 | 0.0 | 13.12 |
| luôn ô đầu (same) | 1 | 6.0 | 100.0 | 0.0 | 100.0 | 0.0 | 100.0 | 0.0 | 10.83 |

- đọc gợi ý (hint) endings: Thành Thái phi ×2; Trúng độc, không qua khỏi ×1
- chọn bừa (rand) endings: Thành Thái phi ×2
- luôn ô đầu (same) endings: Khó sinh, băng huyết mà chết ×1

## Earlier pilot runs (builds 73f8e58–9b1b06d, many pages crashed for lack of memory)

steps per page: 70 · pages: 3 · page errors: 0

| bot | lives | avg max rank | reached Phi (5+) % | reached Hoàng hậu (7+) % | died % | life < 3 yrs % | ended below best rank % | punishments / life | years / life |
|---|---|---|---|---|---|---|---|---|---|
| đọc gợi ý (hint) | 3 | 3.67 | 0.0 | 0.0 | 66.7 | 0.0 | 66.7 | 0.0 | 7.19 |
| chọn bừa (rand) | 1 | 4.0 | 0.0 | 0.0 | 0.0 | 0.0 | 100.0 | 0.0 | 13.75 |
| luôn ô đầu (same) | 2 | 5.0 | 100.0 | 0.0 | 100.0 | 0.0 | 50.0 | 0.0 | 10.0 |

- đọc gợi ý (hint) endings: Khó sinh, băng huyết mà chết ×1; Trúng độc, không qua khỏi ×1; Thành Thái phi ×1
- chọn bừa (rand) endings: Thành Thái phi ×1
- luôn ô đầu (same) endings: Năm 14, Hoàng thượng niên hiệu Hưng Long băng hà ×1; Khó sinh, băng huyết mà chết ×1

## All runs pooled (different builds — indicative only)

| bot | lives | avg max rank | reached Phi (5+) % | reached Hoàng hậu (7+) % | died % | life < 3 yrs % | ended below best rank % | years / life |
|---|---|---|---|---|---|---|---|---|
| đọc gợi ý (hint) | 9 | 4.0 | 33.3 | 0.0 | 44.4 | 11.1 | 66.7 | 9.51 |
| chọn bừa (rand) | 7 | 4.29 | 28.6 | 14.3 | 14.3 | 0.0 | 85.7 | 12.67 |
| luôn ô đầu (same) | 9 | 4.22 | 55.6 | 0.0 | 77.8 | 33.3 | 88.9 | 8.03 |

## Verdict (first run: Final: build e27a5f5 (context odds + hints that tell options apart), 3 seeds × 45 steps, one page per mode)

- hint vs rand: avg max rank 4.33 vs 3.75, died 33.3% vs 25.0%, Hoàng hậu 0.0% vs 0.0% → NOT clearly ahead.
- always-the-same: avg max rank 3.67, died 66.7% → loses.
- sample: 3 lives in the smallest group — too small for a firm verdict (≥30 lives per bot wanted).

