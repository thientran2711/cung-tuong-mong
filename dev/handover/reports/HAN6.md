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
