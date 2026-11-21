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
