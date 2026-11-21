# MAIDFIX1 — maid prompts after owner L1653 (K29). 0 gens.
depth 7 · START_CTX ~3 % (used_tokens read 0; estimate) · no rollover needed. Coordinator: Foreman C #16 session_01D3E3NYgpZzskYx2Nvem9yW.

## 1. What the owner CONFIRMED (found, not invented)
- L1352 (briefs/maid-L1352.md) DUYỆT: tam = test3_tm1 (Tdw9BE8VNR), nhị = test5_nhi (dt4ZloSXSL), nhất = test5_nhat (ov6GUhR829) + collar fix (no gap under the knot button; in gpt/nhat_gpt_v7 only, NOT in test5_nhat).
- 20/11 ~16:40Z (briefs/maid-edits-1162.md): SKIRT = blue for tam/nhị/nhất, outer top = pink (secondary); nhị = round-1 outfit, "cái áo nó hơi dài … làm ngắn hơn xíu"; nhất = blue skirt + whole blue sleeves, pink vest.
- 19/11 (FG 547/551): outer layer longer with rank, max just past the knee; nhị tà length between tam and nhất; nhất no outer coat, one added layer (vest). FG "SLEEVES = SHAPE": narrow ranks (thô sử, tam) use shape words only, never "one hand-span".
- L1653 (K29): nhị = ONE pink short-sleeve top, collar OK, sash wraps AROUND the pink top; nhất front tà = back tà; tam old+new "gớm".
- I found no older verbatim "nhị = one pink layer" before L1653; her L1653 words are the source.

## 2. What was wrong in the redraw (8aiVighIrU / kseEeAm16B / eIPYP1ZdqL)
- Nhị: "a LAYERED half-sleeve jacket" → doubled pink sleeves + pink top hanging below the sash in two vạt; long blue sash streamer to the knee reads as a long blue outer layer; "the inner robe and its long sleeves" → a long blue robe. = her "3 lớp".
- Nhất: only "TWO front panels … from the waist" was written, nothing about the back → bare back.
- Tam (old and new): (a) "ends just below the waist" + "FRONT PANEL … from the collar down to its hem" + sash → cropped jacket, then a second pink piece under the sash; (b) "SAME fine silk brocade … as the higher maids" on a tiny jacket → boxy, stiff, square shoulders; (c) "Sleeves about one hand-span wide" (the number the model ignores, FG rule) → wide trumpet blue sleeves; (d) thin ivory ribbon + streamer = cheap; (e) "a her" typo.

## 3. New prompts (dev/art/maid7/, each + .keep; keep_check --sidecar PASS ×3, --all 337 PASS)
| file (base) | change (only) | chars | check_store --scope mama --age a18 |
|---|---|---|---|
| test6_nhi_L1653.txt (test5_nhi_g43) | outfit: blue skirt + ONE pink short-sleeve top (single sleeve layer), sash wraps AROUND it, nothing below the sash, no vạt/long robe/long blue layer, sash ends short; sachet on the sash kept (G43); colour line: blue = skirt + plain sleeves under the short pink sleeves | 6 645 | FAIL S01 + S32 only = same as the approved base (scope noise; S32 = ma ma hai tà, must NOT be in nhị) |
| test6_nhat_L1653.txt (test5_nhat_g43) | S32 front sentence kept verbatim + ADDED: back tà same length/cloth/border/embroidery, edges visible at both sides, never front-only; embroidery + colour lines name the back tà | 7 781 | PASS |
| test6_tam_L1653.txt (test3_tm1_g43) | outfit block rewritten: blue skirt + ONE short pink top in the SAME soft silk as the skirt, sash wraps around it, nothing below the sash; FG shape-sleeve sentence; "never stiff, boxy or padded, natural sloping shoulders"; embroidery, hairpins, sachet, comb box kept; typo fixed | 6 782 | FAIL S01 + S32 only = same as base |
Every dropped phrase is an allow line with its reason. No jade. 1k drafts (55 cr) are the foreman's to release; I fired nothing.
Not added (A18; foreman's choice): nhất L1352 collar fix (gpt/nhat_gpt_v7 wording) — the new picture again shows the knot button with the inner robe visible under it.

## 4. Question for the owner (Vietnamese, short)
Q1 Nhị đẳng — cánh tay dưới tay áo ngắn hồng:
 A. Có tay áo xanh dài tới cổ tay (như hình cũ), nhưng thân chỉ một áo hồng. (prompt hiện tại)
 B. Không có tay xanh: tay áo hồng dài hơn (tới khuỷu/cổ tay), chỉ đúng một lớp.
Q2 Tam đẳng giờ cũng là áo hồng tay ngắn + đai quấn quanh → gần giống nhị. Phân biệt bằng gì?
 A. Tam: tay áo hẹp, ít thêu, đai trơn mỏng; nhị: tay rộng ~2 gang, thêu nhiều hơn, đai thêu. (prompt hiện tại)
 B. Tam đổi kiểu khác (ví dụ quay lại prompt thô sử live tm0 như luật 19/11) — chị chọn kiểu.
 C. Áo hồng tam ngắn tới eo, nhị dài hơn chút qua hông (nhưng vẫn một lớp, đai buộc ngoài áo).
Q3 Nhất đẳng — tà sau: A. một tà sau liền, dài bằng tà trước · B. hai tà sau (xẻ giữa lưng) như hai tà trước.
