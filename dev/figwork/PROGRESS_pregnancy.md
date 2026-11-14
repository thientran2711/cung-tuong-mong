# Pregnancy + nun art (review/pregnancy-art) — STATUS 11/14

## STOPPED by coordinator before any generation (owner: save credits until the game is playable)
- NOTHING generated, nothing uploaded, no credits spent. No pilot images exist.
- Branch review/pregnancy-art = origin/review/consort-art @ 5881f44a + this file only.

## Plan (approved by owner 01:15Z, on hold)
- Same face/outfit/age, only the belly shows; hand on belly / supporting pose, calm standing, no flying sleeves.
- 2 stages: p6 (~6 months, gentle bump), p9 (~8-9 months, clearly round). Months <=3 = normal figure.
- Ages a18/a26/a36 only (no a51). Method: one gpt-2-6 edit (2:1 4k) of the identity's current tier LINEUP
  (FIGURES magnificUrl gen) per stage, "keep everything identical, only the four women are N months pregnant";
  a51 figure of the result discarded. Then images_remove_background -> sheetproc -> fapick if cutcheck>=4 -> cutcheck.
  No por needed (portraits stay normal).
- Files: img/fig-consort-cXX-tN-aYY-p6.webp / -p9.webp; FIGURES.json records with "preg": 6|9 (same id/tier/age as base).
- Code: figure picker chooses the -p6 (months 4-7) / -p9 (8+) variant when it exists, fallback normal; NPC consorts too;
  hidden pregnancy (concealed) -> normal figure. Pregnancy logic lives in dev/build (grep mangThai/preg: j3, j9, j31, j42, j79, j87).
- Pilot first: c05 + c18 at t2, both stages -> one hi-res sheet per consort (normal | p6 | p9), owner approval before bulk.
- Nun (xuất gia ending): one identity, grey nun robe, shaved head/simple cap, 4 ages, fig+por, FIGURES-others.json.

## Credit estimate (based on logged rates: gpt-2-6 4k edit ~270, bg cut ~3)
- Pilot: 4 edits (2 consorts x 2 stages) ~= 1.1k.
- Consorts t1-t4 (priority): 32 x 4 x 2 = 256 edits ~= 70k; all t1-t8: 512 edits ~= 140k.
- Part C maids m01-m52 t1-t8: 832 edits ~= 227k (t1-t4 only: 416 ~= 114k).
- Nun: 1 new lineup + bg ~= 0.3-0.6k (more if redos).
- Full scope total ~= 370k credits. (simulate_cost/account_balance not run: stopped before the generation phase.)

## Remaining (exact): everything above, starting with the pilot, once the coordinator lifts the stop.
