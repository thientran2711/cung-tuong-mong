START_CTX: ~5% (get_session used_tokens=0 → own estimate ~50k of 1M window); lineage depth 1; rollover at ~30% (ceiling 60%)
# SL1 — sleeves to the floor (Lượt 773/774)
PRIORITY #1 CHECK: OD/ledger: Lượt 773/774 brief only | builders with the t7/t8 rank-law sleeve sentence: store-all/build_all.py sleeve()/laws(), nude-B/mk.py HHS (copied from HH t8), Thái hậu = build_all thaihau() (inherits the HH t8 law block) | review/*: none | claims: MG1 (master block, same builders; done 0d5e5e1)

## STOPPED by ROOT-57 (owner Lượt 777: no Nữ đế / Thái hậu redraw; keep only the builder sentence)
GENS: 0 · CREDITS: 0 (no gen was started).

## Builder change (only the owner's point, A17)
Sentence (new, right after "SLEEVE LENGTH (rank law): … until they touch the floor."):
"Even while her hands are raised to hold her item at chest height, each wide sleeve still hangs straight down from her forearm and its hem lies on the floor beside her feet; the sleeve hem is NEVER at knee or shin height."

| builder path | before | after |
|---|---|---|
| store-all/build_all.py laws() t7 HQP / t8 HH (all people, all ages) | floor sentence only | floor sentence + new sentence (SLEEVE_FLOOR_HOLD) |
| build_all.py t1–t6 (knees/ankles laws) | — | unchanged (sentence is only for the floor law) |
| build_all.py thaihau (per-consort Thái hậu, copies HH t8 law block) | floor only | + new sentence (inherits) |
| nude-B/mk.py Nữ đế (HHS copied verbatim from HH t8, asserted) | floor only | + new sentence, verbatim assert vs HH t8 |
| build_npc.py thaihau-h1..h3, emperor-B, men | no floor sentence | unchanged (no rank-law sleeve sentence there) |
Checked: build_all m05/m29 t7+t8 → 1×; thaihau m05 a36 → 1×; mk.py m29 → 1× (prompt files NOT rewritten: reverted, they belong to the current pictures).

## Not done (by the stop order) / notes for the foreman
- No check_store APPROVED entry yet (brief step 1b): ready to add as S10-companion scope "tp7-8 pr7-8 nude" if wanted — not added because ROOT-57 said builder only.
- t7/t8 gen_ledger lines made before this change will differ from the builder by this one sentence in `build.py --verify` (legacy check only knows the master block); run --verify with `since` or extend _legacy_master if that matters.
- Pre-existing (not mine): `build_all.py m05 thaihau --age a36` gate FAILS on MASTER M01–M05 (master block not in the build_all thaihau path) — same with and without this change.
- Brief step 4 (mk.py option D crash / option B S35) not started (stop order).
- If m05 is ever redrawn: the current builder angle for m05 a36/a51/a65 differs from the pictures (BW6 re-plan): a36 picture FRONTAL vs builder 3/4 LEFT; a51 picture 3/4 LEFT vs builder slight LEFT; a65 picture FRONTAL vs builder slight LEFT. m29 prompts differ only by the master block + the new sentence.


## ROUND 2 — ROOT-57 23:11Z order (no gens): gate entry, mk.py option B/D, Thái hậu master block
GENS: 0 · CREDITS: 0.
1. check_store APPROVED **S37** (the new sentence), scope tp7-8 pr7-8 nude (= S10 places + Nữ đế; Thái hậu is checked at tp8). Proof dev/art/approved/proof/m05_t8_a18_SL1.txt (build_all m05 8). `--self` 0 problems; APPROVED_SENTENCES.md regenerated. m10 t7/t8 a51 store check PASS.
2. nude-B/mk.py (prompts only):
   - option D (m04/m16/m28) crash: mk.py asserted the option-A lưu words; option D has its own approved lưu (NUDE_OPT['D'].tas "only five bead tassels …"). Now the person's own lưu clause is kept verbatim from her build.
   - option B (m10/m22) S35 FAIL at a51/a65: build.py swaps black → deep midnight-navy at a51/a65 (old N4 1c elder rule), so the COLOUR RULE's second-colour clause and the outfit "mixed with" word changed (B23: Nữ đế never darkens). mk.py now copies the WHOLE a36 COLOUR RULE (incl. second-colour clause) + the a36 "golden yellow silk mixed with <sec>," into a51/a65. The S35 gate text had option A's wine-crimson hard-coded → now a {second} slot (mk.py still asserts a51/a65 = a36 verbatim).
   - Proof of no side effects: mk.py output for m05/m29 (options A/C) byte-identical before/after these two fixes.
   - check_store --scope nude: PASS 25/25 for m04 m10 m16 m22 m28 (all 5 ages; new prompt files committed, no gens) and m05/m29 builder output.
   - m05/m29 committed prompt files left as they were (they are the prompts of the current pictures).
3. build_all thaihau: master_common.apply(F) as the last step (MG1 block, like every other path). Thái hậu gate now PASS for m01 m04 m10 m13 m29 m40 × a36/a51/a65 (was FAIL M01–M05).
Pre-existing, not touched: check_store has TWO entries with id S35 (Nữ đế COLOUR RULE and K15 cung nữ hair flowers) — someone should renumber one.
