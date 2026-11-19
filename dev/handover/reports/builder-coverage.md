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

## Step 2 progress (GO from ROOT-36, owner verbatim relayed 19/11)
- b99b134 t4 Tần: TAN_CAPE_PEARLS = capelet + Phi G yoke sliced verbatim from PHI_VAR["G"] + sparser qualifier; guard: only --low 4 outputs differ.
- b838d6b coverage.py follows N5c's item_age API; after N5c 793227c: FRONT + ITEM green on all built consort cells. Remaining on built cells: BG (N5c), REFS (N5c --log), POSE= (pose same at every age), ROYAL3 (t6–t8).
- Split proposed to N5c (no reply yet): N5c = K3/--log/ty/cold/tm/mama/items/frontal; W107 = spec5 pose per age, ROYAL3 t6–t8, emperor-B, FP gaps. N5c also edited emperor-B in 793227c → W107 waits for the reply before editing.

## Old-source map for the remaining RED (rule 6) — for ROOT-36 / owner
| gap | old source | verdict |
|---|---|---|
| m01–m52 DATA (palette + face words) | origin/main dev/figwork/maidC/mjobs.py:22 (PAL m27–m52), :31 (PAL m01–m26), MOT list; maidB/mjobs.py | palette words = copyable; ORIG1 hex (measured from her live t1 figure) has no prompt source = a measurement step; LOWNAME/MOTIF_LOW/V2/LOWV1/LOWV2/T7V2/HEAD/SPEC5_IDS per person = no source → owner/ROOT-36 decide |
| ROYAL3 on t6–t8 | build.py own sentence (nude/trieu≥6) " Image 3 is only a colour reference for the royal yellow …" | copy verbatim (A0 REFERENCES: t6+ = 3 images) |
| spec5 pose per age | build.py SPEC5_POSES (6 poses per trait, copied from dev/figwork/spec5.py:46) | logic only (age offset into the same list), no new words |
| Emperor a65 age text | none (dev/figwork/spec.py:46 EMP_AGE has a18–a51 only) | NO SOURCE → owner |
| Emperor / men pose (spec5) + item table | spec5 POSES are women's; no men item rows in item_age.py | NO SOURCE → owner |
| Emperor K3 line | build.py line says "around her" | copy needs her→him → ROOT-36 OK? |
| NPC Thái hậu h1–h3 | dev/figwork/spec.py:52-55 (TH ages 50/58/65, THC robes) | old pre-gate style prompt; copyable as identity words only |
| Eunuchs / officials / physicians / mama / maids (old) | dev/figwork/jobs.json (S-eunuch-u##, S-official-#, S-physician-#, S-mama-#, S-maid-#), spec.py:56-95 (OFF, MT/MC/MA, MM, ET/EC/EA) | old prompts exist; a men builder = new file built from them |
| Công tử / quý tử older bands | origin/main dev/figwork/congtu/spec.py, artcomplete/ct_spec.py | copyable |
| Children | origin/main dev/figwork/kids/kspec.py + kjobs.json | copyable |
| Foreign princesses per person, t2–t5/t7/t8/TH/Nữ đế | build.py PDATA = one face per country; samples on review/foreign-princess-samples | no per-person old prompt on this branch → owner |

## HANDOVER (W107 rollover, context ceiling)
Done: c051869/4a0d065/b838d6b coverage.py + matrix · b99b134 t4 Tần yoke · 8e348e3 ROYAL3 on t6/t7/t8 (guard: only l6/t7/t8 outputs changed; --bdq untouched).
SPLIT (ROOT-36 01:11Z): N5c = K3 line, FRONT, spec5 age offset, pick_item, refs/--log/--verify, ty/cold, tm0–tm4, m01–m52 DATA rows (ORIG1 measured from live fig-maid-mNN-t1-a18, PAL/MOT from main dev/figwork/maidC/mjobs.py:22,:31 — ROOT-36 rule). SUCCESSOR owns: foreign princesses (all states, 3+3 faces), NPC Thái hậu h1–h3, mama, Phế phi Lý, all men, steward/tutor, children, emperor-B (a65 HELD for owner; BG her→him OK'd by ROOT-36; FRONT already done by N5c 793227c — ask N5c whether they still edit emperor-B; asked, no reply yet).
ROOT-36 decisions: men/kids/NPC-TH = NEW builder file(s) made ONLY from the mapped old prompts (table above, cite file:line), same --log/--verify hooks as build.py (coordinate N5c). HELD for owner: Emperor a65 text, men pose+item, FP per-person sources.
Found bug (not W107's): `build.py c06 v0 --head --nude2 A` → AssertionError 't8 item not in pose' since N5c pick_item (nude2 expects the old ITEMS t8 item) — told N5c.
Method: pull under flock before each edit; snapshot (/home/user/wt/w107-tmp/snap.sh pattern: 5 people × tiers/states × a18/a51 × v0/v1) before/after, only intended files may differ; `python3 dev/art/coverage.py` after each block; keep __pycache__ out of commits (git checkout the tracked .pyc).
