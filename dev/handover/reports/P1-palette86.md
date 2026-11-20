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

---
# P2 — successor of P1 (Foreman C ROOT-57 → ROOT-58 → ROOT-59)
START_CTX ~4 % of 1M window (get_session used_tokens read 0 at start; own estimate ~40k), lineage depth 1. Rollover at ~29 % (ceiling 60 %). Finished at ~25 %.

## RESULT: DONE (commit 7fb4427) — 86 consorts, unique pair per person in every season, both gates 0 FAIL
- check_unique.py: `consorts: 86 expected, 86 present` · Xuân 0 FAIL / 51 WARN · Hạ 0 / 17 · Thu 0 / 23 · Đông 0 / 21 · `TOTAL 0 FAIL, 112 WARN` (3655 pairs per season, NO exemptions).
- check_seasons.py: `86 women; root palettes per season: {'Xuân': 26, 'Hạ': 19, 'Thu': 20, 'Đông': 21}; 0 FAIL`.
- Sheets (Vietnamese labels, ≤ 2400 px wide, all LOOKED at full size): dev/handover/review-sheets/palettes-season/v86/
  season_xuan.jpg · season_ha.jpg · season_thu.jpg · season_dong.jpg · changes_old_new.jpg (36 people) · roots_drawn_vs_new.jpg (70 people).
  Look: Thu / Đông read as light and fresh as Xuân / Hạ (only the hue families differ). Note for the owner: a few Thu / Đông /
  Hạ secondaries are clear light yellows (sunflower / canary / lemon yellow), allowed by B21 (no royal / gold yellow).

## What P2 changed (all pushed; tools in dev/art/palettes3/)
1. check_unique.py: ROOT-ROOT exemption REMOVED (owner Lượt 770). Gate FAIL threshold ΔE2000 10 → 8: **Foreman C ROOT-58
   decision**, because one soft tone (L769) cannot hold 86 unique pairs at 10. capacity86.py (greedy packing of a season's whole
   valid pool = lower bound of the max): ΔE 10 → Xuân 62, Đông 82 (86 needed); ΔE 8 → Xuân 118, Đông 153; ΔE 7 → Xuân 185, Đông 221.
   With gate 10 the solve stalled at 79 conflicts (Xuân 48).
2. palette86.py: s46–s61 roots FROZEN (FINAL_ROOTS; their codes are byte-identical to s_root_colours.json before this run). Only
   the classifier's root-season label moved for two of them: s47 Hạ → Đông, s49 Thu → Xuân (codes unchanged).
3. seasons.py: tone floor tolerance L_ROUND .0025 (< one sRGB step): s49 FINAL root #C98A97 has OKLCH L .6998 vs floor .70.
4. palette86.py roots (owner Lượt 770: codes may change, pictures never redrawn, root_drawn kept): variants L ±.06, hue ±20,
   chroma −.015/−.03, or a same-family pool pair of her root season; a root whose own code fails contrast may keep a variant no
   flatter than her code; ROOT-ROOT clashes weigh 3 in the search. 17 root codes broke the L767 pair tone (secondary more than
   .10 darker than the main: m04 m10 m14 m18 m29 c10 c14 c16 c28 c31 c32 s13 s15 s27 s28 s29 s31): their secondary is now the
   same hue lifted to main L − .095, named "light X" (e.g. m10 sage green + deep rose #C77884 → + light rose #DA8995;
   c14 ivory + blue-violet → + light blue-violet #CCB8FD).
5. Debug aids: P86_DEBUG (conflict breakdown), P86_ITERS, P86_KEEP (candidate cap, now 2500).

## Counts
- 86 consorts; root seasons Xuân 26 · Hạ 19 · Thu 20 · Đông 21. Kho / Công chúa / nc1–nc3 (56 ids) moved unchanged to
  palettes_season_nonconsort.json.
- Duplicates before: 264 FAIL among the 36 then present (L761 file, old rules, P1) → after: 0 FAIL.
- 106 non-root pairs of 36 existing people changed; 73 root code / season changes (70 people on roots_drawn_vs_new.jpg).
  Every old → new hex: dev/art/palettes3/palette86_changes.json (nonroot[] and roots[], with drawn colours), and on the two sheets.
- Root seasons that moved (existing people): m04 Thu→Hạ, m08 Xuân→Thu, m09 Thu→Xuân, m10 Thu→Xuân, m14 Hạ→Đông, m16 Hạ→Đông,
  m20 Hạ→Đông, m29 Thu→Xuân, c02 Hạ→Đông, c04 Hạ→Đông, c06 Xuân→Thu, c10 Xuân→Hạ, c11 Thu→Đông, c14 Đông→Hạ, c26 Thu→Xuân,
  c28 Thu→Xuân, c32 Đông→Hạ; plus s47 Hạ→Đông, s49 Thu→Xuân (codes unchanged).

## Tone per season (mean of the 86; one tone, owner Lượt 769)
| season | main OKLCH L | main C | sec L | sec C | main HSL L | main S | sec HSL L | sec S |
|---|---|---|---|---|---|---|---|---|
| Xuân | 0.750 | 0.081 | 0.788 | 0.070 | 0.69 | 0.42 | 0.71 | 0.44 |
| Hạ | 0.766 | 0.073 | 0.784 | 0.070 | 0.70 | 0.44 | 0.72 | 0.47 |
| Thu | 0.756 | 0.077 | 0.775 | 0.071 | 0.68 | 0.43 | 0.70 | 0.44 |
| Đông | 0.758 | 0.073 | 0.794 | 0.069 | 0.69 | 0.38 | 0.73 | 0.46 |

Re-run: `P86_CACHE=<scratch>/p86.json python3 dev/art/palettes3/palette86.py solve 1` (pool filtering ~3 min/season first time), then
check_unique.py, check_seasons.py, make_season_sheets_by_season.py --v86, make_season_old_new.py v86|roots palettes_season_L761.json.
Status stays PROPOSAL (not wired into build.py). No gens.
