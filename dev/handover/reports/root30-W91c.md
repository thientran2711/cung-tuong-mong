# root30-W91c (painter W91c, successor of W91b) - JOB A elder c04 DONE
PRIORITY #1 CHECK: reused W91b report + brief root30-mass (UPDATE 21:12Z/21:20Z) + frozen builder dev/art/t8-prompt-B (golden c06 OK, test_low_all OK 2304 builds). No new method.
Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/c04_elder_sheet.jpg (row a51 / row a65: live a51 t8 | t7 v0-2 | t8 v0-2). 12 files c04_a51d_t{7,8}_v<k>.png + c04_a65_t{7,8}_v<k>.png on CDN (md5 verified).
| cell | gens | note |
|---|---|---|
| a51 t8 v0-2 | W91b | PASS |
| a51 t7 v0 | 3 | gens 1-2 had forehead dot/flower mark -> regen same prompt; final clean |
| a51 t7 v1 | 2 | W91b retry clean |
| a51 t7 v2 | 2 | first had red forehead mark; regen clean |
| a65 t8 v0 | 3 | forehead mark x2 -> regen (Foreman C order); final clean |
| a65 t8 v1 | 3 | 2 dots; final clean |
| a65 t8 v2 | 2 | dot -> regen (Foreman C order); final clean |
| a65 t7 v0 | 1 | PASS |
| a65 t7 v1 | 2 | first had dot; regen clean |
| a65 t7 v2 | 1 | very faint spot, accepted |
Total c04 gens = 26. All 12 forehead-checked clean (a65 t7 v2 very faint spot accepted). Foreman C ordered regen of a65 t8 v0/v2 at 21:25Z; done.
Looks: a51 dark dowager tones, silver streaks visible; a65 much silver (not white), deeper antique gold; no black/brown; phoenix clear; closed lips.
NEXT (HOLD, no new gens until GO): c05 (a51d2 v0 files exist -> copy; ref If3hxHCtvE), c06-c08, then c01-c03 a51.
~X% xong: JOB A elder c04 = 1/8 sheets done (~12%) / ~5% chơi được (nothing live).

## Headdress per person (ROOT-31 order, owner 21:36Z)
Answer: CONFIRMED. build.py (frozen builder): t8 headdress = one fixed sentence in build() (L222, "a FULL tall imperial nine-phoenix crown ... large central gold phoenix ... pearl tassels") + t7 in build_t7() (L251); generic hairpin line L227/L255 -> every consort got the same crown text, only colour words differed.
Fix: `--head` flag + HEAD table (build.py ~L206, per-person text from her OWN live a18 headdress; keys cNN-t8 / cNN-t7, only c04-t8 and c25-t8 filled so far) replaces the crown slot in the final string; default output unchanged (golden c06 OK, test_low_all OK 2304 builds).
Sample (c04 a51 t8 v0, c04 a65 t8 v0, c25 a51 t8 v0; 2 c04 samples regenerated once for hoa dien; 5 gens total): sheet https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/head_sample_sheet.jpg  crops https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/head_sample_crops.jpg  (c04: a18 live | a51 old | a51 new | a65 old | a65 new; c25: a18 live | a51 old live | a51 new). New heads follow each person's own a18 design (c04 phoenix + blossom sprigs + peonies + sapphire; c25 triple phoenix + ruby). Files c04_a51d_t8_v0_head.png, c04_a65_t8_v0_head.png, c25_a51d_t8_v0_head.png.
To roll out: add a HEAD text per consort (31 more, from each live a18) then re-run with `--head`; ask owner first.
