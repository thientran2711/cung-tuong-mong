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

## Job 6 — DESIGN22 e1b1774 sash = Set A rank8-s62 (owner L1673) — t3 + t8 PASS; t4 + t5 HOLD (G44) (04:30Z)
Word diffs vs the last texts, checked against Set A dev/art/rank8-s62/s62_tN.txt. No conflict markers; all ≤ 10 000; held-in clause ×1 in each.
- t3 v10→v11 (9993): "wide soft blush silk girdle" → "wide stiff blush brocade girdle". Set A = "wide stiff mint mist brocade girdle"; the colour follows the palette swap (DESIGN22's open question to the owner). tp3 PASS, keep PASS. Store G15 [0] = the same as v10 (pre-existing). PASS.
- t8 v10j→v10k (9994): "yellow sash" dropped from the colour list; Set A "a jade-and-gold belt with long tassels and jade pendants" restored.
  - A38 trims: "floor-length" (the S19 tail covers it), "(t7/t8)", "Pose: weight on one leg," (covered by "weight resting on one leg" and "weight resting on her RIGHT foot").
  - The held-in clause still says "HELD IN by the sash", although the outfit list no longer names a sash. Minor.
  - tp8 PASS, keep PASS. PASS.
- t4 COMOIl→COMOIm (9936) / t5 COMOIl→COMOIm (9927): Set A "an embroidered silk sash with hanging jade belt pendants and tassels" (t5 uses the old Tần original, per L1668). DESIGN22 also removed "tied flat at the CENTRE front, NO bow".
  - Now neither prompt has any bow words. G44 (bow only centred or none for t1–t6, owner after L1611) has no guard left.
  - Gates PASS, but I HOLD these two for the Foreman: re-add ", NO bow" (G44, a standing owner rule), or accept as Set A?
- Released to GEN1: t3 v11 + t8 v10k = 2 × 55 = 110 cr. t4/t5 wait for the Foreman.
- 04:20Z CHANGE (Foreman 04:17Z, crossed my release): NO GEN1 release for job 6+7 until the owner picks the quality (55 cr 1k / 135 cr 2k). I sent GEN1 a STOP/CANCEL for t3 v11 + t8 v10k. Job 6+7 results go to the Foreman only.
- Foreman 04:19Z: answer (a). Re-add ", NO bow" on t4/t5 (G44), and t8's held-in clause must name the belt. I told DESIGN22 to put both into job 7. From now on NOTHING is released to GEN1; PASS reports go to the Foreman only.

## Job 7 — DESIGN22 12ecb65 palette (owner L1674, G50 PAL3: olive #9FB577 + pale pink-violet) — colour-only PASS; t4/t5/t8 fixes pending (04:25Z)
- Files: t1 v11, t2 v11, t3 v12 (dapung4); t4/t5/t6 COMOIn, t7 v8m, t8 v10l (thu_comoi).
- The word diff vs each job-6 text holds ONLY plum→olive, blush→lilac (t1 "pale lilac"), #DF9ED9→#9FB577 and "deeper light plum"→"deeper olive". I filtered out all colour tokens and nothing else is left in any of the 8 files.
- No "plum" left except "plumage"; no "blush" left except "blushed cheeks"; no #DF9ED9. The yellow hexes (t6 #F2BC61, t7/t8 #EFBD69) are unchanged.
- No conflict markers; all ≤ 10 000 (max 9999, t3).
- tpN a22 PASS ×8; keep --sidecar PASS ×8.
- Note: the pale pink-violet is given by the word "lilac" only (no #FBE8F8 hex); the old blush had no hex either.
- Still to come: the G44 ", NO bow" on t4/t5 and the t8 belt wording. I'll recheck those lines when DESIGN22 pushes.

## Job 7b — DESIGN22 fa97fb2 (G44 + t8 belt) — PASS (04:28Z). FINAL thu s62 set, held for the owner's quality pick
- t4 COMOIn→COMOIo (9948) / t5 COMOIn→COMOIo (9939): only "NO bow," added after "hanging jade belt pendants and tassels".
- t8 v10l→v10m (9996): the 3 "sash" words in the WRAP held-in clause → "belt" ("HELD IN by the belt … under the belt … above and below the belt"). Nothing else changed.
- No markers; tpN a22 PASS ×3; keep PASS ×3.
- CURRENT SET (all PASS): t1 dapung4 v11, t2 v11, t3 v12, t4 COMOIo, t5 COMOIo, t6 COMOIn, t7 v8m, t8 v10m. Nothing released to GEN1 (the owner picks 55 cr 1k / 135 cr 2k first).
- 04:23Z: Foreman C #17 rolled over → I now report to #18 session_01D3E3NbPQeExFnFGqi5RR2S. Order unchanged: release nothing to GEN1.
- 04:23Z GEN1: the job 6 release was never received → 0 cr. Job 3b t5 COMOIl drawn once = Cqn8j8HEEy (55 cr), reported to #17 (now superseded by t5 COMOIo).

## Job 8 — MAIDFIX1 r3 b31b625 maids (owner L1685, Foreman #18) — PASS ×3 (04:35Z), reported to #18 only
- tam test8_tam_L1685 (6782; base test3_tm1_g43): one added clause, "the sash, its bow AND both long hanging ties all the SAME powder blue, never white". 0 cut.
- nhị test8_nhi_L1685 (6623; base test7_nhi_L1656): the jacket now continues below the sash to mid-thigh, longer than tam, one continuous piece ("never a separate second layer below the sash, no front panels, no vạt"). 3 allow lines, all owner L1685. This reverses the L1656 "ends at the waist" by the owner's newer order.
- nhất test8_nhat_L1685 (7883; base test6_nhat_L1653): the sachet cord is tied onto the waist sash at the side of the hip, never dangling at the centre. 2 allow lines.
- keep --sidecar PASS ×3. check_store mama a18: nhất PASS; tam/nhị S01+S32 = same as their bases. No markers.
- FOUND: keep_check --all FAILs on dev/art/thu_comoi/s62_t4_THU_COMOIk.txt and s62_t5_THU_COMOIj.txt (old texts, the .keep bases of COMOIl/COMOIk). They are "glued" again: the text is in there 3× (29 713 B).
  - Unrelated commits glued them again: 61e890b (CLAIMS) and caca8f3 (rv-chiton-name), after #17's restore 69c7aa6.
  - Fix = restore both (and their .keep) from be1ec9e. The final set is not affected.
