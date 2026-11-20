# DESIGN16 — _cloak9: embroidery restored on Đông t7 HQP / t8 HH (owner L1536 via Foreman C #12)
depth 3 · START_CTX ≈ 3 % (get_session read 0; own estimate) · NO gens · worker of Foreman C #12 (session_01D3E3NaKhsRgpffMmENngac).

## Job
The owner said of the _cloak7 t7/t8 pictures: "the embroidered clothes are stripped down to minimal". _cloak7 (DESIGN13) had cut the robe embroidery down to a border band. _cloak9 = _cloak7 with ONLY two things changed:
1. The embroidery sentence goes back to the store / rule text (_cloak6 = store: I1, I3, G8). t8 HH: large phoenixes on the chest, shoulders and wide sleeves, "richly", plus its rank clause (s62 "finer and richer than any other rank" / m02 "far denser than any other rank"). t7 HQP: the store sentence (phoenixes on the chest and along the borders) + "mid-size" so the HQP phoenixes are smaller than the HH's "large" ones (I1: nobody outshines the rank above). "The phoenix is the main embroidered motif" (t8) and the INNER LAYER EMBROIDERED line (m02) were never cut; they stay.
2. FABRIC per B28 (L1534: Quý phi–HH = the same light gấm in all seasons; HH winter cloak light gấm too): "soft light silk, not brocade," → "light gold-woven gauze over thin supple Song brocade," = the current Hán t7/t8 store wording (seasons4/s62_t7_HAN_BAC.txt, s62_t8_HAN_BAC.txt), word for word.
KEPT byte-identical from _cloak7: "a slim cloak hanging close, never bell-wide," (the bell fix), the smaller collars/fringes (t7 ONE small single-tier collar + tiny pearl edge; t8 "finer than the Hoàng quý phi's" + tiny pearl fringe), fur Lông 2, crown, face, pose, colours. G33 (phoenix plumage palette) is still waiting for the owner, so "kingfisher-blue" stays as in the store.

## Files (dev/art/dong_hientai/, each + .keep with base = the _cloak7 file)
| file | chars (_cloak7 → _cloak9) |
|---|---|
| s62_t7_DONG_HIENTAI_cloak9.txt | 9999 → 9988 |
| m02_t7_DONG_HIENTAI_cloak9.txt | 9951 → 9940 |
| s62_t8_DONG_HIENTAI_cloak9.txt | 9999 → 9986 |
| m02_t8_DONG_HIENTAI_cloak9.txt | 9916 → 9897 |
(keep_check counts; all ≤ 10 000.)

## Word diff _cloak7 → _cloak9 (the ONLY changes)
- s62_t7: "outer" → ""; "plain except small" → "embroidered with mid-size"; "in a border band, ONE small phoenix roundel" → ""; "back, no big motifs," → "chest and along the borders,"; "soft" → ""; "silk, not" → "gold-woven gauze over thin supple Song"
- s62_t8: "outer" → ""; "" → "richly"; "ONLY in a border band along its edges" → "on the chest, shoulders"; "cuffs" → "wide sleeves"; "small" → "large"; "thread, the rest plain, ONE small phoenix roundel on the back, no big motifs," → "thread (finer and richer than any other rank),"; "soft" → ""; "silk, not" → "gold-woven gauze over thin supple Song"
- m02_t7: "outer" → ""; "plain except small" → "embroidered with mid-size"; "in a border band, ONE small phoenix roundel" → ""; "back, no big motifs," → "chest and along the borders,"; "soft" → ""; "silk, not" → "gold-woven gauze over thin supple Song"
- m02_t8: "outer" → ""; "" → "richly"; "ONLY in a border band along its edges" → "on the chest, shoulders"; "cuffs" → "wide sleeves"; "small" → "large"; "thread, the rest plain, ONE small phoenix roundel on the back, no big motifs," → "thread (far denser than any other rank),"; "soft" → ""; "silk, not" → "gold-woven gauze over thin supple Song"

## Proof
- keep_check --sidecar ×4 PASS (5 allowed drops each, all the _cloak7 border-band / "soft light silk" words) · keep_check --all: 193 sidecars PASS.
- check_store (args `<p> v0 --tN`): the output for _cloak9 is identical to _cloak7 for all 4 (same FAIL set: s62/m02 t7 5, t8 6 store sentences, all from before; no new FAIL, no LEN).
- "a slim cloak hanging close, never bell-wide," present once in each of the 4.

## Open
- Not tested; the owner decides on a gen (A20/A21).
- Risk to watch: the large all-over HH phoenixes were one cause of "thô" in L1498 (DESIGN13). This time the slim fall + light gấm + small collar stay, so a bell/heavy look should not come back from the shape, but the owner should judge the density.

## Handover
Job done; nothing left open for a successor. ROLLOVER/LINEAGE lines: see START_ART_WORKER.md §6 (unchanged).
