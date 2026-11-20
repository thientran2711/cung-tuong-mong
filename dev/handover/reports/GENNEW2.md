# GENNEW2 — one more new person in the CURRENT HQP t7 + HH t8 outfit (owner Lượt 1420) — for Foreman C #9 (+ #8)
depth 8 (limit). START_CTX ~3 % (get_session read 0 → own estimate); ended ~10 %. No rollover needed.

**m02 t7/t8 GENNEW1 pictures (review-sheets/newperson_L1402/) = KEPT as m02's final t7/t8 (owner L1420), never redraw.**

## Person
**m28** (Đoan trang — m02 was Dịu dàng; main coral pink #D9998C + indigo blue #4E5D97 — m02 was moss green). Face ref 9ZHzA2JNYZ (KC_REFS m09_ok=yes). Not s62/m02, not a c-id (A33), not in the 19 t7 đông list. Builder t7 normal 9 418 chars, t8 8 772.
- First tried s20 (Kiêu kỳ, teal): DROPPED, not gened — t8 v5 = 10 192 chars; even the B26 allowed cuts left 10 062 + S18 FAIL. Files not committed.
- Picked m28 because its t8 builder is the shortest of the non-Dịu-dàng consorts, so the v5 changes fit with NO trims (S18 kept clean).

## Prompts (A39: her builder cell + only the new parts)
- t7 HQP `dev/art/thu_comoi/m28_t7_THU_nn.txt` (+ .keep), 9 585 chars = `build_all.py m28 7` + the 3 changes of m02_t7_THU_builder_nn vs m02_t7_THU_builder: + A42 cleavage line, + collar fringe "clearly longer than the Quý phi's", − "a layered pearl-and-gold necklace," (A41). Word diff = exactly those 3.
- t8 HH `dev/art/thu_comoi/m28_t8_THU_COMOI_v5.txt` (+ .keep), 9 973 chars = `build_all.py m28 8` + the design changes of m02_t8_THU_COMOI_v5 vs m02_t8_THU_builder: LAYERED NECKLINE (inner top = her main colour coral pink, as m02 v5 used her main), A42 line, mantle dropped, 2-tier scalloped cloud collar (HQP size, a little richer, LONGEST fringe, open front), "mantle," out of the colour rule, HOÀNG HẬU LUXURY line (no necklace). The 4 m02-v5 length trims (smile clause, romantic-lead clause, head-turn dup, "Everyone beautiful") were NOT needed → not made. LOST words = only the mantle sentence, the old wide cloud-collar sentence, "mantle,".
- keep_check --sidecar: t7 PASS (1 allowed drop), t8 PASS (3 allowed drops).
- check_store `--scope tp7/tp8 --age a18 --refs 9ZHzA2JNYZ,TdwDfOyVNR`: t7 builder PASS, t7 _nn FAIL S14 only (known: approved S14 still has the necklace; B26FAB4 updates S14) → proceeded per brief. t8 builder PASS, t8 v5 PASS.
- Note: m02_t8_THU_COMOI_v5.txt itself FAILs S18 (its smile-clause trim) — not used for m28, but it will fail the gate if m02 v5 is ever gened.

## Gens (B9: gpt-2-6 1024x2304 seed 7172, no transparentBackground; refs m28 face + royal-yellow TdwDfOyVNR)
simulate_cost 135 each → **270 cr** (balance before 3 049 845). One try each. Ledger 2 lines.
- t7 HQP: Magnific CqnX5s3EEy → review-sheets/newperson2_L1420/m28_t7.jpg
- t8 HH v5: Magnific xSBuw8YjfW → review-sheets/newperson2_L1420/m28_t8.jpg
- side-by-side: review-sheets/newperson2_L1420/m28_t7_t8_sheet.jpg

## Look notes (both opened full size)
- t7 HQP: coral outer robe open at front, indigo inner top with square neckline + yellow pearl band, soft cleavage hint (A42) reads. Flat cloud-collar cape with pearl-gold drop fringe, open at front. Yellow wide borders + sash, 3 colours OK. Face calm, eyes open, lips closed, no teeth, forehead clean. Jade vase with peonies held in one hand, slippers show. Robe looks a bit sheer/gauzy like m02. ISSUE: two pearl loops hang across the chest just under the neckline = reads like a NECKLACE (this is the builder's "strands of pearls across the chest" — the open owner question L1419, not removed here). Crown side tassels hang beside the ears (earring-like at small size).
- t8 HH: yellow dominant with large phoenixes, coral inner top + front panels, indigo skirt/linings = 3 colours OK. NO mantle. 2-tier scalloped cloud collar, flat, with long pearl-and-gold fringe clearly longer than t7; open front, neck free; NO necklace visible. Square neckline, cleavage hint very subtle. Tall phoenix crown, grander than t7; pearl strands fall to shoulder level beside the ears (earring-like risk). White-jade flask with gold phoenix stopper held at the chest; the other hand rests on the sleeve. Same face as t7, lips closed. Frontal.
- No redraw asked/done.

## Commit
see git log (GENNEW2).
