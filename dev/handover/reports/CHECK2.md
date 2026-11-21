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
