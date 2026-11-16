# Child identities (art + j73) — 11/14/2026, branch review/kids-art

DONE: 24 princes (p01–p24) + 24 princesses (f01–f24), each one lineup of 4 ages (~4 / ~9 / ~14 / ~20)
-> img/fig-kid-{p|f}NN-a{4,9,14,20}.webp (+ por-kid-*.webp), manifest img/FIGURES-kids.json (192 records:
role prince/princess, identity pNN/fNN, ageBand 4/9/14/20, magnificUrl, bg).
Pool size: measured with the sensible bot (dev/measure/inpage5.js), a game ends with 1–19 children in total
(max ~10 per sex) -> 24 per sex is ~2.4x.

## Code: dev/build/j73.js (appended last in assemble.py)
- Loads img/FIGURES-kids.json on its own (j39's 3-file loader untouched), re-read every 5 min.
- k.kid = one identity per child for life (S.kidUsed keeps every identity handed out; never reused in a game;
  only if all are taken it reuses one held by dead children only; else old face).
- Band by age: 0–6 -> 4, 7–11 -> 9, 12–16 -> 14, 17+ -> 20 (nearest drawn band if one is missing).
- kidFace0 wrapped: portrait = por-kid file once preloaded (all 4 bands preloaded), old face-*.webp until then / if missing.
- Place screens: children stand full-body (img.kidfig), height scaled by band.
- Old saves: children without k.kid get one on the first render after the manifest loads; nothing else changes
  (tested: ages, fv unchanged). NL_FK gets "kid" so the new-life identity card keeps the children's identities.

## Pipeline (dev/figwork/kids/)
- kspec.py -> kjobs.json (prompts; OVR = per-identity prop fixes). kv.py <ids> = variable parts.
- GPT 2.6, 2:1, 4k, high, ONE style ref (consort-01/05/12/18 rotated), Magnific folder ba4aecfe-...
- kgen.txt = gen ids; kbg.txt = "jid gen bg url"; `python3 kproc.py kbg.txt` downloads, splits, writes img + manifest.
- ksheet.py out.jpg ids... = contact sheet. propchk.py copied from art3 (toddlers flag NECK by design: ~4 heads).
- Sheets: scratchpad/sheets/kids_princes.jpg, kids_princesses.jpg (+ kids_test_*.png screenshots).
