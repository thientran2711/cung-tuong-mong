START_CTX ~4 % of 1M window (get_session used_tokens read 0 at start; own estimate ~40k), lineage depth 1. Rollover at ~29 % (ceiling 60 %).

# P1 — season palette for the 86 consort faces (owner Lượt 763 + 769 + 770) — worker P1, Foreman C ROOT-57

PRIORITY #1 CHECK: palettes_season.json (approved Lượt 758, + s46–s50 Lượt 761) and dev/art/palettes3/* (seasons.py,
gen_seasons.py, check_seasons.py, tone_unify.py, xuan_pink.py, ha_warm.py, make_season_sheets_by_season.py,
make_season_old_new.py) reused; no uniqueness gate existed → new check_unique.py. make_lanhlung_L761.py showed how s46–s50
roots were wired (s_root_colours.json → gen_palettes3.load_p1), reused for s07–s61.

## STATUS (updated as work proceeds)
- DONE 56c196c: check_unique.py gate; s07–s45 roots = colours of the approved drawn prompt (FACE_MAP_L703 prompt_file);
  s51–s61 first roots; s51–s61 added to OWNER_GROUPS_L686.json. → "P1 NEW16 READY 56c196c" sent.
- DONE 8543fc9: owner Lượt 769 (one tone for all seasons) → seasons.py v2 (see its docstring: one tone box, season =
  colour-family score, depth rule removed); check_seasons.py accepts changed root codes (root_drawn) and FAILs roots outside
  the tone; s51–s61 roots re-picked inside the tone (old pick kept as root_prev_L763). → "P1 NEW11 READY 8543fc9" sent.
- RUNNING: `P86_CACHE=<scratch>/p86v2_static.json python3 dev/art/palettes3/palette86.py solve 1` (min-conflict search over
  all 86 x 4; roots are variables too: lifted code + small same-name variants, so ROOT-ROOT clashes get fixed by moving one
  side's code). Writes palettes_season.json, palettes_season_nonconsort.json, s_root_colours.json (root_drawn kept),
  palette86_changes.json.
- TODO after solve: check_unique.py → 0 FAIL; check_seasons.py → 0 FAIL;
  `python3 dev/art/palettes3/make_season_sheets_by_season.py --v86`;
  `python3 dev/art/palettes3/make_season_old_new.py v86 dev/art/palettes3/palettes_season_L761.json`;
  `python3 dev/art/palettes3/make_season_old_new.py roots dev/art/palettes3/palettes_season_L761.json`;
  look at every sheet; fill the sections below; commit; send "P1 DONE <hash> <sheet paths>" to session_01PEhRbuFkLEFvsv8jdPo9vC.

## Notes for the foreman
- At session start the branch had been force-updated; the clone's stale local commit 6c15bcd ("MMX4: m13 dropped …") was NOT
  pushed; it exists only as local branch keep/clone-6c15bcd in this container.
- s_root_colours.json for s07–s45: main/main_hex/sec/sec_hex = current root CODE; root_drawn = the colours of the drawn prompt
  (when they differ). s46/s49/s50: F1's Lượt 770 codes are the starting point, their pre-770 drawn colours = root_old.
