# MAIDP3 — owner L1518 maid ChatGPT prompts (successor of MAIDP2; depth 2; START_CTX ~3 %)
Coordinator: Foreman C #11 session_01D3E3NbE9HePpcjX4M7PhSe. **0 gens** (prompt editing only).

## Done (builder dev/art/maid7/make7_gpt.py, new jobs `nhi thancan4 nhat4`; every swap asserted once)
- (a)+(b)+(c) NEW `gpt/nhi_gpt.txt` (base test5_nhi.txt, 7 424 ch). Master style block was ALREADY byte-identical to tam/nhất (checked by sentence diff) — the drift was in the per-rank outfit/colour sentences. Changes: HDR_M18 header (= tam); ruqun → tam's verbatim "the long inner robe and skirt in powder blue like #A7BAD2"; jacket → tam's fabric words verbatim "made of the SAME fine silk brocade with a soft sheen … (never a plainer or duller cloth); so the main and the secondary colour are both clearly visible"; colour line → tam's verbatim "her main colour powder blue on the inner robe and skirt, her secondary colour deep rose clearly visible on the outer jacket" (only "short outer top"→"outer jacket"); "layered" dropped + ONE-sleeve-layer clause (NHI_ONE_SLEEVE); crossed collar clause (NHI_CROSSED); k27 small-flower clause; fixcap('Cung nữ nhị đẳng'). Kept: nhị embroidery, sash+jade, double-loop buns + silver/pearl pins, 2 hand-span sleeves, letter.
- (d) `gpt/thancan_gpt_v4.txt` (base v3, 9 396 ch): stand-collar block → TC_SQUARE_COLLAR (square opening, inner crossed collar shows inside, edges meet below, one knot button); colour-placement end "thin edge of the inner robe's collar … at the vest's collar" → "inner robe's crossed collar showing inside the square collar opening is deep rose". Soft-shoulder text kept.
- (e) `gpt/nhat_gpt_v4.txt` (base v3, 9 168 ch): + NHAT_TA_NGAN (ONE shorter centre front panel, gold-edged, ~half length, on top of the two long tà, two layers clearly visible); colour placement "+ the short top front panel are deep rose". Nothing lost (word diff LOST = {}).
- (f) chưởng sự: no change.

## ⚠ Open point for the foreman/owner
Neither test5_nhi.txt nor tamdang_gpt.txt contains ANY collar words. So "copy tam's collar words" and "take nhị's square collar words" were impossible literally; both collars are written from the sheet pictures (tam aFGdKgifSh crossed y-collar; nhị gOm5NnCSXO square opening). Also "one sleeve layer" read as: jacket half-sleeve = one tier only (nhị pic had two stacked tiers).

## Gates
keep_check --sidecar: nhi PASS, thancan_v4 PASS, nhat_v4 PASS; --all 179 PASS. check_store --scope mama: thancan_v4 PASS, nhat_v4 PASS, nhi FAIL S32 (ma ma hai tà — scope mismatch, same as tamdang; informational).
Word diff LOST: nhi {layered, ruqun, bijia, #CA7281, whole, sleeves ×1 each — all from the replaced colour sentence / "layered"}; thancan_v4 only the old stand-collar words; nhat_v4 none.

## Answer for owner "unified prompt?"
Yes now: tam/nhị/nhất/thân cận/chưởng sự/ma ma v4 share one master style+fabric block word for word; nhị and tam also share the same jacket-fabric and colour sentences. Only the garments, collar and colour placement differ per rank.
