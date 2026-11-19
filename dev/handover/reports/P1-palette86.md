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
- DONE 234e4d5: foreman/owner Lượt 767: s51–s61 roots SOFT (all OKLCH L >= .66, no deep/dark/madder/sapphire/yellow
  names, no twins; s55 secondary = soft jade green). seasons.py TONE secondary floor .66 + SEC_DEEPER_MAX .10 (pair_tone_ok)
  for EVERY pair. → "P1 NEW11 SOFT 234e4d5" sent to foreman and F1.
- NOT YET RUN with the final rules: the full season solve. (Two earlier runs were stopped by rule changes.)

## HANDOVER (P1 rolled over on context, ~26 % of window) — successor: do exactly this
1. Read this file, dev/handover/briefs/palette86-L763.md, and the docstrings of dev/art/palettes3/seasons.py (v2 rules,
   owner Lượt 769), palette86.py, check_unique.py. Owner/foreman updates after the brief (all already coded):
   Lượt 769 one tone for all 4 seasons (Thu/Đông = colour families, not depth); Lượt 770 root CODES may change (pictures
   never redrawn; drawn colours kept as root_drawn / root_old), gate = 0 FAIL with NO exemptions (the ROOT-ROOT exemption in
   check_unique.py must be REMOVED: delete the `pa.get('root') and pb.get('root')` branch so those count as FAIL);
   Lượt 767 roots/pairs soft (L >= .66). s51–s61 roots are FIXED now (F1 draws with them) — never change them.
   s46/s49/s50 start from F1's Lượt 770 codes (root_old = drawn).
2. Run: `P86_CACHE=<scratch>/p86v3.json python3 dev/art/palettes3/palette86.py solve 1 > <scratch>/solve.log 2>&1` in the
   background (pair filtering ~3 min per season the first time, cached after; then greedy + min-conflict search, prints
   "iter N conflicted M"). It writes palettes_season.json (86 ids, root_drawn on changed roots),
   palettes_season_nonconsort.json (Kho / Công chúa / nc1–nc3, unchanged), s_root_colours.json (s-ids: code + root_drawn +
   root_season), palette86_changes.json (non-root changes of existing people + root code / season changes).
   Input is the frozen copy dev/art/palettes3/palettes_season_L761.json, so the solve can be re-run any time.
   If conflicts stay > 0: look at which constraint (add a debug print in conf()); known tight spots = ROOT-ROOT clashes
   (roots get same-name variants, cost 25 + 100·dE) and the check_seasons pair-reuse rule (a name pair at most twice over
   all seasons, >= 10 rows apart). Widen root variants (dl ±.05, dh ±15) or the pool variants before touching rules.
3. Gates: `python3 dev/art/palettes3/check_unique.py` → 0 FAIL; `python3 dev/art/palettes3/check_seasons.py` → 0 FAIL.
4. Sheets (Vietnamese labels, <= 2400 px): `python3 dev/art/palettes3/make_season_sheets_by_season.py --v86` →
   dev/handover/review-sheets/palettes-season/v86/season_{xuan,ha,thu,dong}.jpg;
   `python3 dev/art/palettes3/make_season_old_new.py v86 dev/art/palettes3/palettes_season_L761.json` → v86/changes_old_new.jpg;
   `python3 dev/art/palettes3/make_season_old_new.py roots dev/art/palettes3/palettes_season_L761.json` →
   v86/roots_drawn_vs_new.jpg. LOOK at each at full size (Thu/Đông must look as fresh as Xuân/Hạ).
5. Fill this report: counts (86; root seasons), duplicates before (check_unique on the L761 file restricted to consorts:
   264 FAIL among the 36 then present, under the old rules) → after 0; every changed non-root pair and every root code
   change (from palette86_changes.json); a 4-season tone table (mean OKLCH L / C and HSL L / S, main + sec); root seasons
   that moved; tails of both gates; commit hash. Commit (fetch --depth=30 + rebase + push, retry 4x) and send
   "P1 DONE <hash> sheets <paths>" to Foreman C ROOT-57 session_01PEhRbuFkLEFvsv8jdPo9vC.

## Notes for the foreman
- At session start the branch had been force-updated; the clone's stale local commit 6c15bcd ("MMX4: m13 dropped …") was NOT
  pushed; it exists only as local branch keep/clone-6c15bcd in this container.
- s_root_colours.json for s07–s45: main/main_hex/sec/sec_hex = current root CODE; root_drawn = the colours of the drawn prompt
  (when they differ). s46/s49/s50: F1's Lượt 770 codes are the starting point, their pre-770 drawn colours = root_old.
