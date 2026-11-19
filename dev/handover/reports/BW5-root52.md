# BW5 — ROOT-52 jobs (triều option B, E11 item wiring, re-sample Lượt 607)
depth 5 · START_CTX ≈ 4 % (get_session used_tokens read 0; own estimate) · coordinator ROOT-52 session_01PEhRbwJ53CiD7ZimiAMPdm

## (1) Triều phục option B (Lượt 595/598), text only, no gens
- `dev/art/owner-copy/trieu/r26/build_r26.py` → t1–t5 = r24 (owner kept, Lượt 574) word for word + option-B hexes: t1 #EAE3D0 (collar/sash + hà bí + cuff), t2 #7FB394, t3 #7E9CCB, t4 rose-pink → "jade-teal" #5FA8A6 (words from build.py TRIEU[4]), t5 #A88BCB; court red #99443F/#893A37 unchanged; + D9 sentence (S34) before "No text, no labels."
- `build_r26_hi.py` (ROOT-52 GO (a)) → t6 = r21, t7/t8 = r18 word for word + t6 kingfisher blue #4F86A8 (TRIEU[6] words), t7 honey-amber #E3A25B (TRIEU[7] words), t8 hà bí #A8201E → #C65A4C (#EFBD69 already); + only the missing gate sentences verbatim: t6 S31; t7/t8 S17 (after the hốt sentence, as in r24) + S28 (before Pose); all S34.
- Gate: `check_store.py --scope trieuN` STORE CHECK PASS ×8 (WARN S01 only).
- Flags: t6 hà bí keeps "(clearly brighter and more saturated than the brick-crimson robe)" (written for red); r24 H11 "(vivid, bright, saturated …)" kept next to softer hexes (ROOT-52: leave).

## (2) E11 items (IT1 lists) wired
- IT1 (438794d) added 25-item lists + *_AGE dicts + item_age.AGE5, but no builder read them. `t8-prompt-B/build.py age_item()` now: t1–t6 L3F/L3F_AGE, t7 ITEMS7/_AGE, t8 ITEMS/_AGE, nude NUDE_LIST/_AGE, thaihau TH_ITEMS/TH_AGE → `LIST[AGE_DICT[AGE][(n-1)%5]]` (item + its own hand key); AGE5 tiers (lanh, ngheo, tm0–tm4, mama, kc, nc) → AGE5 kind; others (bd) unchanged; `--olditem` = old picks.
- Gates: build_all --check --age a18/a26/a36/a51/a65 0 FAIL ×5; check_store --self 0 problems; item_age.check_age5() [].
- Flags: non-adjacent ranks can share an item KIND at one age (m13 a26 t5 + t7 hand mirror; a18 t5 + t8 scroll) vs E6; cold/ty --nostyle crash (old).

## (3) Re-sample Lượt 607 (consorts)
- Sheet: `dev/handover/review-sheets/resample-607/resample607_m13a36_m33a18.jpg` (same scale ×0.42, feet on one baseline per row). Prompts: `resample-607/prompts/`. 8 gens, 0 redo, 1080 credits; ledger kind SAMPLE-607.
- gens: m13 a36 t2 lJtM9A8gv9 · t5 cpSK8RT0eP · t7 eIPsEBjdqL · t8 lJtM39cgv9; m33 a18 t2 Xm9gH28Bfo · t5 4RFtTPr9Aa · t7 w4adY3a7EI · t8 u5Wi7PZQLD. Refs: KC cut (m13 VX7IB7sMMU, m33 nVseTaFYQD) + TdwDfOyVNR at t7/t8. All came back transparent RGBA (no remove_bg).
- Notes (no fault redone): m33 t7 asked "clear 3/4 to the right" → came out near-frontal; m13 t5 and m33 t5 got the SAME angle + grace line from the builder (slight right turn, chin lifted) — E1 says same rank across people should not share an angle; m33 t2/t5 hair flower lavender = robe colour (F3); m13 t7 gold basket close to the royal yellow parts; both people have lilac / lavender-blue mains, so the colour reads similar across the two rows (faces clearly different).

## HANDOVER line
BW5 done: (1)(2)(3) pushed. Open for ROOT-52: the flags above. Context ≈ 20 %.
