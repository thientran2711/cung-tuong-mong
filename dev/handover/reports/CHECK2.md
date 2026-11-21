# CHECK2 — prompt re-checker for Foreman C #17 (successor of CHECK1)
STATUS: depth 8 (limit 8), START_CTX ~3 %; roll over at ~28 %, ceiling 60 %. At depth 8 I can't open children, so my successor = the coordinator's (or a ROOT from MAIN). 0 gens, 0 credits.

## Job 1 — DESIGN22 be1ec9e (owner L1656), diff-only vs 8a9caf947 — PASS (03:58Z)
- Only these changed in thu_comoi: t4 COMOIk, t5 COMOIj (+ .keep files, make_design22_L1653.py). t6–t8 are unchanged.
- t4 COMOIk (9993 ch): ", never over the edge, cuff or hem bands" → ", never over the bands" (the band list sits just before it, so the meaning holds). " Everyone beautiful at every age." restored; its allow line removed from the .keep.
- t5 COMOIj (10000 ch): "a broad gold flowered brocade girdle" → "a blush flowered brocade girdle". Blush is already Phi's own secondary colour in the prompt (inner top, neck band, front edges). No gold/yellow word on the girdle any more. The same G52 shortening, and "Everyone beautiful" restored.
- Gates: check_store --scope tp4/tp5 --age a22 PASS. keep_check --sidecar PASS for both (A38).
- Store mode s62 v0 --low N --season thu:
  - t4: only Outfit [0.7] (the accepted FAIL).
  - t5: Outfit [0.73] + "PLUS ONE extra small layer…" [0.89]. The 0.89 is new, caused by the owner-asked girdle edit inside that sentence (it is covered by the .keep allow line), so I accept it. The old "Everyone beautiful" [0.4] FAIL is gone.
- Checklist: G52 present in both. No vase. "none at the ears" present. One flower ("never two") present. G45 "never covered" present. Jade ngọc bội present. NO bow on t5 (G44). Capelet text is untouched.
- Note: t6 COMOIl / t7 v8k / t8 v10i use a "yellow flowered brocade sash" (the rank-yellow list). The owner's L1656 "girdle soft palette not gold t5–t8" may also mean those. That is the Foreman's/owner's call, as DESIGN22 already flagged.

## Job 2 — MAIDFIX1 2c75a81 maids (owner L1653/L1656, K29) — PASS (04:05Z)
- tam test3_tm1_g43 (6698 ch): vs the gen'd prompt test3_tm1 (Tdw9BE8VNR), only G43: "jade or tassel pendant" → "embroidered silk fragrant sachet (túi thơm) hanging from it".
- nhị test7_nhi_L1656 (6484 ch): base test5_nhi_g43 (= dt4ZloSXSL prompt test5_nhi + the G43 sachet only). One clause added: the pink jacket is the only layer, the sash wraps around it, nothing below the sash, no long robe. 0 drops.
- nhất test6_nhat_L1653 (7757 ch): base test5_nhat_g43 (= ov6GUhR829 prompt test5_nhat + the G43 sachet). Added: a back tà of the SAME length as the front panels (just past the knee), the same cloth/border/embroidery. Embroidery "panel" → "front and back tà"; the colour line + "and its back tà". 2 allowed drops.
- keep_check --sidecar PASS ×3 (A38). check_store --scope mama --age a18: nhất PASS. tam/nhị FAIL S01+S32 only = identical to their bases (test3_tm1, test5_nhi_g43), accepted by the Foreman. No "jade pendant" left.
- Old settings (ledger): gpt-2-6 1024x2304 2k seed 7172, ref s7IPw0Ll8e, 135 cr. Drafts = the same at low 1k, 55 cr (K29).
- Sent GEN1 the draft job directly; copied the Foreman.

## Job 3 — DESIGN22 c609040 G51 correction (owner L1657, ART_RULES G51 L1664) — PASS with 2 notes (04:20Z)
Word diffs vs the previous PASS texts. For each tier the sash words are back to the original, plus the one held-in clause where it was missing:
- t4 COMOIk→COMOIl (9994 ch): "a flowered brocade" → "an embroidered silk" sash.
- t5 COMOIj→COMOIk (9996): "blush flowered" → "broad gold" girdle (= the original words, per L1657 "đừng có đổi"; this undoes the L1656 blush).
- t6 COMOIl→COMOIm (9971): drop "flowered brocade"; + "the sash tied over the outer robe holds it in at the waist;". A38 cut "her own colour stays clearly the main robe colour,".
- t7 v8k→v8l (9994): drop "flowered brocade"; + the same clause. A38 "robe with slippers visible" → "robe" ("only slipper toe tips peeking under the hem" stays).
- t8 v10i→v10j (10000): drop "flowered brocade"; "Pose: weight on one leg," restored.
- t3 dapung4 v10: unchanged; it already has "WRAP robe HELD IN by the sash" and no brocade. No "flowered brocade" is left in t4–t8.
Gates:
- check_store tpN a22 PASS ×5. The t6/t7 OUT1 WARN was already on the old texts.
- keep --sidecar PASS ×5.
- Store-mode FAILs are the same as before, except t6 NEW [0.56] "her own colour stays clearly the main robe colour, much less yellow…". The cut half is covered by the COLOUR RULE ("robe, skirt, sleeves, cape and train are all clearly ice blue"), and "much less yellow…" stays, so I accept it.
NOTES for the Foreman:
- (1) The t5 Phi girdle is gold again. L1657 says keep the original form; L1656 said the gold girdle is ugly. The newer owner word wins, but this is worth showing her on the OLD|NEW sheet.
- (2) The t6 colour-clause cut is the only meaningful trim (A38 allow line present).
No GEN1 release sent (not asked for job 3).
- 04:12Z update: the Foreman ruled t5 COMOIk FAIL (owner: the gold girdle is not OK); a new t5 will come from DESIGN22.
- Released to GEN1: t3 dapung4 v10, t4 COMOIl, t6 COMOIm, t7 v8l, t8 v10j = 5 × 55 = 275 cr. Re-checked: no conflict markers, all ≤ 10 000 ch, t3 tp3 PASS + keep PASS.

## Job 3b — DESIGN22 8dc7098 t5 COMOIl (owner L1668: Phi wants the ORIGINAL first girdle) — PASS (04:16Z)
- The only diff vs COMOIk: "a broad gold brocade girdle" → "an embroidered silk sash" (tied flat at the CENTRE front, NO bow). I verified the words against the original source, rank8-s62/s62_t4.txt ("an embroidered silk sash with hanging jade belt pendants"). There is no gold/yellow girdle word left.
- The held-in clause is still there. 9993 ch, no conflict markers.
- check_store tp5 a22 PASS. keep --sidecar PASS (allow line owner L1668).
- Store mode: Outfit [0.73] + "PLUS ONE" [0.85]. That sentence holds the girdle words and was changed by the owner, so this is accepted.
- Released to GEN1: t5 draft, 55 cr, joining the job 3 set (now 6 × 55 = 330 cr, as the Foreman first ordered).
