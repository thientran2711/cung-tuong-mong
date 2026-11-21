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
