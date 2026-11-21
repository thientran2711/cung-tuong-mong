# HAN6 — Hán t1–t3 collar fix (owner L1928 via Foreman C #26)
depth 8 (get_session lineage.depth, limit 8) · START_CTX ~3 % of 1M.

## Cause (why t1–t3 ≠ t4–t6)
- Frozen collar words (G62) are identical in t1–t8. The fabric sentence is identical. All-over embroidery and the 3/4 angle are also in t4, which is OK. So none of those is the cause.
- The real conflict is in the BAND COLOURS. The frozen template says "outer <MAIN>, middle <SECONDARY>, innermost ivory white". For t1–t3 the SECONDARY colour IS ivory white, so the prompt said "outer peach-blossom pink (= robe colour), middle ivory white, innermost ivory white". That leaves only 2 tones: the pink outer band disappears into the pink robe and the two white bands merge into one. The result reads as an ordinary 2-layer crossed collar, so the model draws it narrower and less flat (sheet: t1–t3 V hugs the neck).
- t5 (approved) has a dark→mid→light step: plum robe/outer band → bright blush pink middle → ivory inner.
- Secondary (NOT changed, flag only): t1–t3 have LOOSE hair (rank law, A47 byte-identical), and locks lie over the shoulders in t1–t3, covering where the collar should lie flat. Hair words are not touched; owner/#26 decides.
- Vietnamese line: "Nguyên nhân: ở t1–t3 màu phụ chính là trắng ngà, nên dải giữa và dải trong cùng đều trắng ngà (gộp làm một), còn dải ngoài trùng màu hồng của áo — chỉ còn 2 tông nên cổ thành cổ chéo thường, hẹp, chìm vào áo."

## Fix (band colour words only, G62 allows per-rank colour names)
Files: dev/art/seasons4/s62_t{1,2,3}_HAN_COLLAR_L1928.txt (+ .keep). Generator: make_han_collar_L1928.py. Base = L1915 files.
- Diff (t1–t3): "(outer peach-blossom pink embroidered in gold, middle ivory white, innermost ivory white)" → "(outer deep peach-blossom pink embroidered in gold, middle pale blush pink, innermost ivory white)". This is the same dark→mid→white step as t5, and the colours stay inside the two-colour family (pink shades + ivory).
- t2 only: trimmed ", never looking in two directions" (eyes boilerplate duplicate) to fit 10 000.
- ch t1 9792 / t2 9970 / t3 9829. keep_check PASS ×3. check_store --scope tpN --age a18: only waived M06/M07/S06, the same as the L1915 base, no new FAIL. Frozen early sentence + collar clause verified verbatim ×3.
- Rank ornament unchanged (t1 none, t2 gold thread line, t3 + flower dots).
- RULE CLASH for owner/#26: G62 text says "middle = SECONDARY"; when SECONDARY = ivory white this collides with the frozen ivory innermost band. L1928 uses a pale tint of the MAIN colour for the middle band. Confirm or choose another.

## G61 (front waist) t1–t3
From the sheet: t1 book held at the side, t2 drum at chest height, t3 flute held out to the side. Front waist is free ×3, so no change.

## Gens
Sent to VE7 (session_01D3E3NahACvw1Z1FUUXG1eB): t1|t2|t3 @55 = 165 cr, sheet t1|t2|t3|ref t5 eIPcM8vdqL with Vietnamese labels. Results: pending (VE7 reports to #26/HAN6).

## Results (VE7, 165 cr, commit c154427d4) — sheet dev/handover/review-sheets/han_collar_L1928_t1_t3.png
ids: t1 nVsR0B0YQD · t2 MBJYdaFDCm · t3 gOmr7RDSXO (ref t5 eIPcM8vdqL).
HAN6 read (own look at the sheet):
- All 3 collars are now wide and lie flat on the shoulders, clearly closer to t5 than L1915: about 2/3 along the collarbones, V a little above the bust.
- The ivory innermost band reads clearly. The pale blush middle band is visible but subtle, and the outer deep pink is only slightly deeper than the robe (VE7 says the same).
- Loose hair stays behind the shoulders this time.
- G61 OK: t1 book at the side, t2 drum at chest, t3 flute out to the side.
- If the owner wants stronger band separation, the next lever is a stronger outer tone (e.g. "deep rose pink"), band words only, and only with the owner's yes.
STATUS: waiting for the owner's verdict via Foreman C #27 (session_01D3E3NaDamfSozkn47q9kMK; #26 rolled over).

## OWNER L1953 (via #27) on L1928
- t1–t3 collar APPROVED ("rất đẹp, duyệt"). Locked in dev/art/seasons4/HAN_COLLAR_L1953_T1T3_FROZEN.txt (band line per rank, verbatim). The rule entry is for #27 to add (rule.py).
- Loose hair over the shoulders is fine; never flag it again. The band-merge question is closed.
- t3 bow: s62_t3_HAN_BOW_L1953.txt (+.keep, make_han_t3_bow_L1953.py). The only change is the sash, now "…tied in a neat bow at the CENTRE front of the waist, the two bow loops and ends lying flat…" (G60). 9913 ch. keep PASS. check_store shows only the waived M06/M07/S06. Sent to VE7: 1 @55, sheet CŨ|MỚI han_t3_bow_L1953.png.
- Research (words only): dev/handover/reports/HAN6_HAN_DRESS_RESEARCH_L1953.md (Vietnamese).

## OWNER L1955 (via #27)
- Outer collar band made deeper: "outer deep dusky rose pink, clearly darker than the robe, embroidered in gold".
  - Files: s62_t1_HAN_COLLAR_L1955.txt, s62_t2_HAN_COLLAR_L1955.txt (FILE ONLY, never drawn) and s62_t3_HAN_BOW_L1955.txt (bow + deeper band, sent to VE7 as the single t3 gen instead of L1953). Generator: make_han_band_L1955.py.
  - keep PASS ×3. check_store shows only the waived M06/M07. ch 9812/9990/9941.
- FROZEN file updated. Rule added with rule.py: **G66** (= "G62b"; rule.py auto-numbers).
- Research §4 (embroidery placement and size by rank) added to HAN6_HAN_DRESS_RESEARCH_L1953.md. Embroidery prompts are ON HOLD until the owner has seen it.

## t3 bow gen (VE7): WDg2oC9cXe (55 cr) was drawn from s62_t3_HAN_BOW_L1953.txt (bow only), BEFORE L1955.
The deeper band (s62_t3_HAN_BOW_L1955.txt) is NOT drawn; it needs a new gen + the owner's/#27's OK.

## OWNER L1958 (via #27): Tang drama vs history costume research → dev/handover/reports/HAN6_TANG_DRAMA_RESEARCH_L1958.md (VN, words only)

## OWNER L1965 (via #27)
(1) Research suggestions approved, applied to Hán t1–t8 → s62_t{1,2}_HAN_COLLAR_L1965, s62_t3_HAN_BOW_L1965, s62_t{4..8}_HAN_COLLAR_L1965 (+.keep). Generator: make_han_L1965.py.
Bases: t1/t2 L1955, t3 BOW_L1955, t4–t8 L1915.
- Trims: cuffs get ", the widest trim"; the hem border gets "(narrower than the cuffs, wider than the collar)". t1 "narrow" cuffs/hem → wide / plain wording. Collar and band words untouched (G62/G66 verified verbatim).
- t6/t7/t8 embroidery: "flowing cloud scrolls and small birds (t7 + small phoenixes; t8 phoenixes among cloud scrolls), Han cloud-riding embroidery, no large flowers".
- Head ornaments by rank: t3 + one small gold hairpin; t5 + a pair of small gold bu yao; t6 + gold bu yao; t7 + tall gold bu yao; t8 + the tallest gold bu yao. t1/t2/t4 unchanged (already stepped).
- Fit trims (only in files > 9995, check_store-tested): "her head turns together… never in profile." and "the small embroidered motifs are stitched in fine gold thread." (both duplicates).
- ch 9870/9971/9946/9834/9564/9937/9956/9987. keep PASS ×8. check_store = exactly the base FAILs (waived) ×8. No pendant word. G60/G61 untouched.
- A49 sample: t6 sent to VE7 (1 @55), sheet han_t6_L1965.png (CŨ SyhrsOsUb8 | MỚI).
(2) Weave vs embroidery vs print research (VN): dev/handover/reports/HAN6_WEAVE_VS_EMBROIDERY_L1965.md.
- t6 sample drawn (VE7): dt4THLQXSL, 55 cr, sheet dev/handover/review-sheets/han_t6_L1965.png (CŨ SyhrsOsUb8 | MỚI), VE7 commit cda608844.
HAN6 read:
- The large camellias are gone. Small birds in flight read clearly; the clouds are faint. Small blossoms are still scattered on the body, probably from the fabric/robe words.
- The cuffs are clearly the widest trim, the hem border is narrower, and bu yao dangles show on the headdress. The collar is unchanged.
- G61 note (VE7): the right hand rests at the belt and the jade ball hangs beside the front waist. This is the same as the old picture; the pose words are LADDER4 (A47). Owner/#27 decide.
- If the owner wants stronger clouds: "large flowing cloud scrolls" (words only, only with her yes).
