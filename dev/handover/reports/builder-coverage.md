# builder-coverage — W107 (Foreman C ROOT-36), FIGURE_GATE rule 0(g)

PRIORITY #1 CHECK: OD rule 0(g) f0ac2bd (owner verbatim in FIGURE_GATE) | main: no coverage script (figwork prompt sources only) | review/* none | claims: N5c session_01PEhRbuZQUopcF5bN8FixL2 (build.py items/ty/cold/maid/--log/frontal), W106 session_01PEhRbwNBbs4bvbf46x7uDf (Tần⇄Phi) — build.py NOT touched by W107.

## Step 1 (done)
- `python3 dev/art/coverage.py` -> dev/art/BUILDER_COVERAGE.md (runs build.py / emperor-B for EVERY person × group × tier × age, ~1.5 min). Re-run after every build.py change; update the CMD templates in coverage.py when a mode lands (ty/cold/tm modes are auto-detected by source tokens; m01–m52 need DATA rows).
- Result on 84343b0 build.py: **0 green, 513 red cells.**

## RED (grouped)
1. Every built cell (consorts c01–c32 t1–t8, Thái hậu, Nữ đế, kc, ngheo): BG (K3 line only in --trieu), FRONT (PRE "3/4 or frontal view" + hand sentences "three-quarters"; only --bdq is frontal; Nữ đế pose says "frontal or a slight three-quarter turn"), POSE= (spec5pose picks by (person, tier) only -> same pose at every age), ITEM/ITEM= (build.py does not call item_age.pick_item; t7/t8 fixed item per person, low ranks 3f per rank not per age), REFS (no refs emitter; N5c --log pending), ROYAL3 missing on t6/t7/t8 (only nude + trieu≥6 have it).
2. RUN: m01–m52 have no DATA/ORIG1/LOWNAME rows -> every maid-face tier crashes (`KeyError: 'm01'`): 52 of the 84 women cannot be built at all. Emperor a65 `KeyError: 'a65'` (no AGE_TXT a65).
3. NOCMD (no mode): cung nữ tm0–tm4, trung y ty1–ty8, lãnh cung — for all 84 women; foreign princesses pre-entry, t2–t5, t7, t8, Thái hậu, Nữ đế, ty, cold (and ONE generic face per country, not 3+3; --spec5pose crashes for nc/bd: SPEC5_IDS has no nc/bd); NPC Thái hậu h1–h3, mama k01–k08 (owner: = older cung nữ), Phế phi Lý, ALL men except the Emperor (eunuch u01–30 ×4 ranks, officials, physicians, thị vệ, vương gia, nhạc/họa sư, sứ thần, công tử/quý tử/huynh/BD prince, tm96 lover pre/up), steward/tutor, children kid-f/p (ages 4–51), player looks (legacy).
4. Emperor (emperor-B): BG, FRONT, POSE (no spec5), ITEM (fixed per emperor, no table), REFS, no a65.
5. Triều phục (--trieu 1–8): FRONT, no spec5 (formal no-item pose by design), REFS; not A0-approved.

## Old prompt sources found (for step 2, after GO; not yet matched cell by cell)
- dev/figwork/jobs.json (687 old prompts: consort S/N c##-t#, eunuch u01–30, maid ×26, men ×5, mama ×4, official ×3, emperor, physician, look lãnh cung tlc)
- dev/figwork/spec.py (EMP_AGE, TH NPC Thái hậu, OFF officials, MT/MC/MA maids, MM mama, ET/EC/EA eunuchs), spec2–spec5.py (spec5 = consort ladder + POSES)
- origin/main dev/figwork/maid/, maidB/, maidC/ (mjobs.py, lad3.py, age1114/), kids/kspec.py + kjobs.json, congtu/spec.py, artcomplete/ct_spec.py + kc_prompt.txt
## Status: WAITING for ROOT-36 GO (step 2 = copy old approved prompts into the red cells, cite file:line; no-source cells listed for the owner).
