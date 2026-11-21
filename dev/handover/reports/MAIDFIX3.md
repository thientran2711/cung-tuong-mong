# MAIDFIX3 — JOB 10 (owner L1836): 2 persons x every maid rank, production prompts (0 gens)
depth 1 · START_CTX ≈ 4 % (est.)

## 2 persons (why)
- **m18** (ref s7IPw0Ll8e) — the maid the owner already approved at every rank (test17/test18 bases are her): powder blue #A7BAD2 + deep rose #CA7281, slim oval face.
- **m09** (ref gOm4HrsSXO, DUYỆT L285) — a clearly different person: heart-shaped cat-eye face, rose pink #D5909C + teal #499597 (contrast OK in m_colours_proposed.json). Face line = KC_REFS verbatim.

## Files (dev/art/maid7/prod/, each + .keep; builder dev/art/maid7/make8_prod.py)
Per person (m18_*, m09_*), suffix `_L1836.txt`: tam, nhi, nhat, tam_thancan, nhi_thancan, nhat_thancan, thosu, chuongsu, mama_a36, mama_a51 = 10 x 2 = **20 files**.
- m18 tam/nhi/nhat + thân cận = byte-identical copies of the approved test17/test18 files (A47).
- m09 = same files, ONLY face line + main/secondary colour tokens swapped (thân cận = the swapped pair, as approved).
- thosu (base test3_tm0), chuongsu (base gpt/chuongsu_gpt_v5, ChatGPT attach header removed) = ported: matte silk crepe fabric sentence (B29), CLEAN COLOUR EDGES, FABRIC (same for every palace maid), front bow in the opposite colour (K30/L1734); thosu cloth "cotton-silk" -> "matte silk crepe"; chuongsu "silk brocade" -> "matte silk crepe ... tone-on-tone woven pattern". Nothing else touched.
- mama = build.py `<pid> v0 --state mama --age a36|a51 --nostyle --twocol auto --noflower` (snapshot in prod/base/) + CLEAN COLOUR EDGES + front bow only; fabric stays the mama-scope rule (no crepe).
- Held item / hair / pose / angle unchanged from each base (A47). Ref image to pass: m18 s7IPw0Ll8e, m09 gOm4HrsSXO.

## Gates
keep_check --sidecar PASS x20; check_store PASS x20 (--scope maid --age a18; chuongsu a26; mama --scope mama a36 / a51). Max length 9 974 (m18 nhat), 9 877 (m09). No outfit word cut; allow lines are port/person-swap only (A38).

## Cost @135 (2k medium, JOB K settings)
20 x 135 = **2 700**. Without ma ma a51 (a36 only): 18 x 135 = **2 430**. Per person 1 350 (1 215).

## Open
- ma ma: builder (D16) wording used, not the ChatGPT mama_gpt_v6 (those FAIL the mama gate: E1/C5/S19/S36/X19). Say if a65 is also wanted (+270).
- thô sử/chưởng sự bases were last drawn at earlier rounds; owner verdict on them not found in repo.

## AUDIT L1840 (before any drawing)
Full per-file word-diff (every removed → added hunk, new file vs its approved base): `dev/handover/reports/MAIDFIX3_audit_worddiff.md` (script dev/art/maid7/audit8_prod.py).
Runs: keep_check --all 582 sidecars PASS; check_store PASS on all 8 approved bases (maid scope) and all 20 new files; keep_check unallowed drops = 0 on all 20.
Classes of change (all intended, none an unintended drop):
1. m18 tam/nhi/nhat + 3 thân cận: 0 hunks (byte-identical to bases).
2. m09 same 6: only face line (m09 store face words verbatim; this drops m18's "Sparkling eyes / head slightly tilted / never a stretched grin" and "rosebud mouth" — the m09 expression replaces them; master block still carries "eyes fully open", "never a grin") + colour names/hex (powder blue→rose pink, deep rose→teal, "sleeves blue"→"sleeves rose pink").
3. thô sử / chưởng sự (both persons): M06 sentence → B29 crepe, "cotton-silk"/"silk brocade" → crepe, + CLEAN EDGES, FABRIC-same-for-all, front-bow; chưởng sự ChatGPT attach header removed; m09 adds colour/face swap.
4. **FIX found by this audit — ma ma a51**: first version came from build.py, which is a DIFFERENT look from the approved drawn ma ma (gpt/mama_gpt_v6_a51: square/stand-collar vest + abacus + 3/4-right + coral/teal) and dropped ~30 phrases of it. Rebuilt: m18_/m09_mama_a51 = mama_gpt_v6_a51 with ONLY: ChatGPT header, CAPTION and transparent-background sentences removed (ChatGPT-only; X19 bans them), angle → store angle ANG14[11] (same 3/4-RIGHT, gate E1 rejects the old wording), + gate sentences C5 / S36 STYLE LOCK / S19 feet (G23), face + colours swapped to the person (m05 coral red/teal → person). All garment/hair/item words kept. keep PASS (allow lines: gate form vs person swap), check_store mama a51 PASS.
5. **OPEN — ma ma a36**: approved a36 look (test5_mama: single closed jade dress) FAILS the mama gate (S32 hai tà, S36), so m18_/m09_mama_a36 are the build.py wording, NOT the approved look. Recommend NOT drawing a36 until the foreman decides (gate vs look conflict); a51 is the approved look. a65 (mama_gpt_v6_a65) can be built the same way on request.
Cost: 20 files x 135 = 2 700; drawable now without a36: 18 x 135 = 2 430.
6. m09 vs m18 same rank (9 pairs): every differing hunk is a face-line or colour-name/hex token; 0 unexplained hunks. thô sử base test3_tm0 = the prompt_file of the drawn round-3 picture hu2cFrpvqL in gen_ledger (verified). ma ma a51 base mama_gpt_v6_a51 has no ledger row (ChatGPT-drawn); a36 build.py wording is the builder recipe (see 5).
All DROPPED = none; all removed/changed phrases are ALLOWED (port / person swap / ChatGPT-only removal) and listed as allow lines in each .keep.

## HANDOVER (MAIDFIX3, depth 1) — JOB 10 DONE, nothing pending
Foreman C #24 decision: draw the 18 files (VE3/VE4/VE5); ma ma a36 + a65 NOT drawn now (a51 covers ma ma). Files in dev/art/maid7/prod/, builder make8_prod.py, audit audit8_prod.py. Refs: m18 s7IPw0Ll8e, m09 gOm4HrsSXO. 0 gens by this worker. If reopened: build a65 via mama_v6(); a36 gate/look conflict still open.

## L1869 COLOUR-ROLE FIX (owner L1869 angry; K19/K24/K26/K28) — files *_L1869 (script make9_fix.py)
Rule: MAIN = cung nữ uniform powder blue #A7BAD2 always; SECONDARY = the person's OWN main (m09 rose pink #D5909C; m18 own main ≈ blue → K26 own secondary deep rose #CA7281); thân cận = flip; chưởng sự main tím cà; ma ma MAIN = xanh lam ngọc bích (jade blue-green), deeper at a51, SECONDARY = her own colour.
WRONG (my fault: I gave m09 rose pink as MAIN and teal as secondary = her palette from m_colours_proposed, not the K19 roles): all 9 m09 files (tam, nhi, nhat, 3 thân cận, thô sử, chưởng sự, ma ma a51) → m09_*_L1869 (face kept; deep-rose/teal slot → rose pink #D5909C; main back to uniform blue; ma ma main jade).
WRONG too: m18_mama_a51 (main was powder blue = uniform, not jade; v6 "her own colour" wording) → m18_mama_a51_L1869 (MAIN jade blue-green #4E8FA3, SECONDARY deep rose).
RIGHT (unchanged, still L1836): m18 tam, nhi, nhat, 3 thân cận, thô sử, chưởng sự (blue/deep rose, tím cà/deep rose).
All 10 *_L1869: keep_check PASS, check_store PASS (maid a18/a26, mama a51). Colour tokens + the ma ma "own colour" sentence only (A47). I did not look at the drawn sheet PNGs (not needed for the token fix).

## G59 (owner L1874/L1876): NO túi thơm — sachet clause deleted from all 15 L1836 + 10 L1869 prod .txt files (nothing else changed, A47); allow lines added in each .keep. The 2 undrawn ma ma a36 files per person were removed. NOTE make8_prod.py / make9_fix.py still regenerate the old sachet text — re-apply the deletion if re-run.

## L1895 — 4 more persons (script make10_persons.py), files prod/<pid>_<rank>_L1895.txt (+ .keep), 9 ranks each = 36 + m09_mama_a51_L1895 (fix: my L1869 m09 ma ma had "pink becomes rose pink-plum" from a token-replace bug; use L1895)
| person | face (DUYỆT/OK) | ref id | own main | SECONDARY slot |
|---|---|---|---|---|
| m10 | LONG oval (L291 ok) | O6ERgEUynm | sage green #ABCDA2 | sage green |
| m11 | small ROUND baby face (L285 DUYỆT) | Syh9qs6Ub8 | sky blue #85BBD6 ≈ uniform → K26 | coral rose #CF8377 (own secondary) |
| m12 | SQUARE-ROUND, dimples (L289 ok) | xSB7FTWjfW | warm sand apricot #DEBF9C | warm sand apricot |
| m13 | slim V-shaped, phoenix eyes (mass v3) | VX7IB7sMMU | lilac #C3A1CE | lilac |
Ranks: tam, nhi, nhat, tam/nhi/nhat_thancan, thosu, chuongsu, mama_a51. MAIN uniform blue #A7BAD2, thân cận flip, chưởng sự tím cà, ma ma jade #4E8FA3. Source = m18 L1836 files (no sachet G59, no pendant G57, bow at the front) with face line + secondary tokens only. Gates: keep_check PASS, check_store PASS x37.
m18 redraw candidates (judged from the PROMPTS; pictures not opened): every m18 prompt that carried a túi thơm = tam, nhi, nhat, tam/nhi/nhat_thancan, chuongsu (7, now sachet-free in the L1836 files at commit of this section) + m18_mama_a51_L1869 (wrong colour + sachet). m18 thô sử never had one → keep.

## L1905 POSE FIX (owner: all maids same stance; hands covered the waist)
54 files prod/<pid>_<rank>_L1905.txt (+.keep) = 6 persons x 9 ranks; supersede every L1836/L1869/L1895 file (those are now OLD). Script make11_poses.py; table prod/POSE_TABLE_L1905.tsv.
Changed (pose slot only): (1) ANGLE sentence = ANG14 entry idx=(3*rank+5*person)%14 → 9 ranks of one person all different, same rank differs across persons (E1); (2) "the item held below the chin" removed; "Her hands and body" sentence rewritten per rank (item raised or held to the SIDE, never in front of the waist) + "Hands and item stay clear of the front waist: nothing covers the sash, the bow or the centre front." (3) nhất files were over 10 000: A38 boilerplate trim only, listed as allow lines (the "hands interact naturally… never looking down" sentence shortened; the duplicated "FABRIC (same for every palace maid)" line removed where still over — crepe sentence stays in the master block).
| rank | hands (item) | ANG14 idx m09 / m10 / m11 / m12 / m13 / m18 |
|---|---|---|
| thosu | carried low in one hand at the side, other hand holds skirt | 0 / 5 / 10 / 1 / 6 / 11 |
| tam | raised in both hands at chest height | 3 / 8 / 13 / 4 / 9 / 0 |
| tam_thancan | on one open palm at shoulder height, other hand lifts sleeve | 6 / 11 / 2 / 0 / 12 / 3 |
| nhi | one hand out to the side at hip height | 9 / 0 / 5 / 10 / 1 / 6 |
| nhi_thancan | raised in one hand beside shoulder/cheek | 12 / 3 / 8 / 13 / 4 / 9 |
| nhat | fingertips of a raised hand beside shoulder, other lifts sleeve | 1 / 6 / 11 / 2 / 0 / 12 |
| nhat_thancan | hanging low at the side, other hand at collar | 4 / 9 / 0 / 5 / 10 / 1 |
| chuongsu | keys hang from one hand at hip height, other hand behind back | 2 / 12 / 3 / 8 / 13 / 4 |
| mama_a51 | abacus raised in both hands at chest height | 10 / 1 / 6 / 11 / 2 / 5 |
Gates: keep_check PASS x54, check_store PASS x54 (E1 angles valid).

## OWNER L1919 — FINDINGS + HANDOVER (MAIDFIX3, depth 6; START_CTX ≈ 4 %, now ≈ 31 % of 1M > roll line 29 % → coordinator #26 opens the successor)
### 1. Why m11 looks like a baby/chibi (cause, plain words)
The m11 prompts carry the store face words VERBATIM: "a small ROUND **baby face** with full soft cheeks and a **tiny** rounded chin, very **LARGE** round eyes with big irises, short soft brows, a small button nose, a **tiny** rosebud mouth. Expression: shy and sweet, cheeks blushing". Those are child words (baby / tiny / very large eyes), and the identity ref Syh9qs6Ub8 is that same baby-faced picture. So the model draws a child's head on every rank. At ma ma 51 the face line says "baby face" while the age line (placed after it) says "slightly fuller mature face, fine lines": the two fight, and the ref wins → child face (the crooked face = the same conflict). Chưởng sự looked adult because her age line ("about 28 … poised adult") is stronger and her outfit is mature. NOT in the prompts: any "adult / never chibi / never big head" guard next to the face line (only the generic master "never a tiny head").
FIX PLAN (do after the owner picks the new face; m11 files are L1905 → new L19xx): replace the face line by adult words (soft rounded oval face with gently full cheeks, a softly rounded chin, large bright almond eyes in adult proportion, softly arched brows, a small straight nose, a small mouth), drop "baby / tiny / button / very LARGE", add right after it "an adult young woman of about 20, adult face and body proportions, never a baby face, never chibi, never a big head on a small body" (ma ma: "a real 51-year-old woman, mature face"). Also needs a NEW ref picture (the baby-face ref Syh9qs6Ub8 must not be used) → wait for the owner's face list. m09 no redraw.
### 2. Items: owner is right, NOT enforced
All persons hold the SAME item at the same rank (m09..m13, m18 identical): thô sử sewing basket · tam comb box · nhị letter · nhất handkerchief · chưởng sự keys · ma ma abacus; each thân cận copies its grade's item (tam_thancan = tam's comb box, etc.). So within one person tam = tam thân cận, nhị = nhị thân cận, nhất = nhất thân cận (same item), and across persons the same rank = same item (E11/E12 violated). The pose table only varied the hand/angle. The builder (t8-prompt-B/build.py age_item + item_age.py AGE5 lists tm0..tm4/mama, 5 items per age, pick LIST[(n-1)%5]) already has per-person per-rank items; my make8/make9/make10 scripts bypassed it and copied the one approved item. No check_store gate for 'same person, two ranks, same item' exists yet (E6 only covers consorts t1–t8).
FIX PLAN: per person n, item per rank from the builder: thosu tm0 a18 · tam tm1 a18 · nhi tm2 a18 · nhat tm3 a18 · chuongsu tm3 a26 · mama_a51 mama a51 · nhat_thancan tm4 a18 · tam_thancan tm1 a26 · nhi_thancan tm2 a26 (extract the item from `python3 dev/art/t8-prompt-B/build.py <pid> v0 --state tmK --age aNN --nostyle`, text between "she holds " and " in a contrasting colour"); skip broom/cup/fruit; dedupe by item KIND within the person (E6-style kind regexes in build.py _E6_KINDS) and re-pick from the next list if two ranks share a kind; hand sentences in make11_poses.py are item-agnostic ("the item"), so only the "she holds …" phrase changes. Then GATE: add to check_store.py a mode `--maid-items <dir> <tag>` that groups prod/<pid>_*_<tag>.txt by person, extracts the item, and FAILs when two ranks of one person share an item text or kind (and when two persons share an item at the same rank). Typo to fix on the way: "a her mistress's comb box" (existing approved wording) → "her mistress's comb box".
### 3. Captions: VE6/VE7/VE10/VE11 told (no face SHAPE words, face GROUP only). Tell VE12+ too.
### State
Nothing in progress in my session; no gens by me. Gens: VE10 m12 / VE11 m10+m18x8 were released at 08:43Z with L1905 files (poses fixed, items still same) — #26 said no gens until further notice. Latest files: prod/*_L1905 (54). Scripts: make8_prod, make9_fix, make10_persons, make11_poses (chain: m18 L1836 → persons → poses). Open lineage lines (copied verbatim for the successor prompt):
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
LINEAGE (owner 17/11; threshold overwritten by owner 18/11): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8). As a worker: write the handover in your report file and tell your coordinator; the COORDINATOR opens the successor.
