# APPROVED PROMPTS — THE ONLY FORMS A PAINTER MAY USE (mandatory; read before EVERY gen)
OWNER (verbatim, 18/11 ~22:20Z real): "Tức là cái nào mà tao đã ưng rồi á thì làm ơn viết xuống ở một cái nơi bắt buộc, có nghĩa là khi mà các thợ mở ra là chỉ bắt buộc lấy cái form, copy cái form đó y chang mà đưa vào thôi, chứ không có vẽ hay không có viết gì thêm một cái form mới, không có tự ý sửa đổi cái gì hết, mày hiểu không? Cái mà sửa đổi thì cùng lắm chỉ là cái món cầm trên tay hoặc là cái tư thế đứng như thế nào thôi, nhưng mà như tao nói rồi, càng lên bậc càng cao là càng phải trầm tĩnh đó, chứ không thể nào mà thái hậu mà có thể đứng ầm, giang tay giang chân múa rồi hát được, đúng không? Tức là vẫn có thể đưa tay ra, nhưng mà mình thấy đó là một cái sự điềm tĩnh. Thì nói chung á là mày đã viết cái prompt thái hậu ok rồi, nhưng mà tao đang nhắc mày về cái vấn đề là tương tác với cái món cầm trên tay làm sao cho phù hợp với địa vị của mình và độ tuổi của mình, vậy thôi."

## THE RULE
1. For anything listed below as APPROVED: run the listed builder command and paste its output UNCHANGED, with the listed references. Never write a new form, never add or remove a sentence, never "improve" it.
2. The ONLY things that may change: (a) the HELD ITEM (from the status/rank list: FIGURE_GATE 3f for consort ranks, FIGURE_GATE H for other statuses); (b) the POSE (FIGURE_GATE D.3a: spec5 POSES copied, frontal or three-quarter only, never back-turned/looking back).
3. CALM WITH RANK AND AGE: the higher the rank and the older the age, the calmer and more composed the pose and the hand–item interaction: low ranks / young may be lively (a step, a turn of the wrist, sleeves moving); high ranks (t6–t8, Thái hậu, Nữ đế) and a51/a65 = serene, dignified, small restrained gestures (a hand may extend, but calmly); NEVER wide-spread arms or legs, dancing, twirling, skipping or any boisterous movement for them. The item is held/used the way a lady of that rank and age would.
4. Not listed here = NOT approved = sample only, never mass. A new owner approval is added here the same hour (Foreman C), with the builder command, the build.py commit and the approved sheet.
5. Every brief to a painter points to this file; reviewers FAIL any gen whose prompt differs from the listed form in anything but item/pose.

## APPROVED FORMS (newest last)
| What | Builder command (dev/art/t8-prompt-B/build.py, handover branch) | References | Approved sheet / owner |
|---|---|---|---|
| t8 Hoàng hậu, a18/a26/a36 | `build.py cNN v0|v1|v2 [--age aNN]` | own t1 (b10 a18 t1 v0) + m09 eIyOFEidqL (refs.txt) | FIGURE_GATE 18/11 ~22:00Z "hoàng hậu và hoàng quý phi tao đã duyệt ok hết rồi" |
| t7 Hoàng quý phi | `build.py cNN --t7 v0|v1|v2 [--age aNN]` | same | same |
| a51 / a65 age texts (t7/t8) | `--age a51` / `--age a65` (AGE_TXT as in build.py) | own live t1 of that age + style | c04 elder sheet (Lượt 41) |
| Per-person headdress t7/t8 | add `--head` (HEAD table, 108e27b3) | same | head_sample (Lượt 52) "Ok, mũ phượng của từng người ... là mũ phượng" |
| Held items t1/t4/t5/t6 (3f lists) | `build.py cNN --low N v0|v1|v2` (items3f, ≥ c4291fcf) | own t1 + style B kspkwKx16B (+ swatch TdwDfOyVNR at t6) | items-sample (Lượt 42) "ok rồi vậy đi tiến hành mà làm" |
| Poses (all builders) | spec5 POSES per FIGURE_GATE D.3a, facing rule, calm-with-rank rule 3 above | — | spec5pose-sample (Lượt 57) "tư thế đẹp hơn rồi" + facing rule |
| Thái hậu a36/a51/a65 | `build.py cNN --state thaihau --age a36|a51|a65` (states-sample round 3) | own live t1 of that age + style B kspkwKx16B | sheet3 (Lượt 54): "Thái hậu, ok nè ... thái hậu nào trong game cũng sẽ dùng cái cổ áo như thế này" ; mass GO 22:14Z |
| Nhà nghèo | old live prompt: `ngheo_old.py` / `build.py cNN --state ngheo` (states round 3b) | own identity + style B | sheet4 (Lượt 54): "hình con nhà nghèo, ok" — but existing liked images are re-made, not redrawn (FIGURE_GATE 22:05Z block) |
NOT APPROVED (samples only): t1/t2/t3 new designs, Phi redesign, triều phục, Nữ đế, khuê các new drawing, Bắc Địch Quý phi.
