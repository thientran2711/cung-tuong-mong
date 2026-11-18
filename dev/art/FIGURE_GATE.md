# FIGURE GATE — the ONE checklist for every full-body figure (Foreman C, owner 18/11 ~03:35Z)

Every art worker and every foreman runs ALL of this on EVERY new figure BEFORE reporting it. A worker reports only figures that pass every line; a fail is regenerated first. Foremen paste this file (by path) into every art brief and order; no piecemeal orders.

## Owner's words (verbatim, 18/11 ~03:35Z)
"Bây giờ ghi cái luật xuống đi, lấy cái hình mẫu mà M09 á. Bây giờ khi mà tôi bắt đầu giao cái luật giao cái lệnh vẽ hàng loạt á, tất cả các thợ khi soát ảnh đều bắt buộc phải đè chồng cái M09 lên để mà làm cái tỷ lệ gốc, để mà làm cái chuẩn, để mà so. Ok, và trước khi mà đè lên á, là phải cho tất cả các cái hình người này nằm ngang hàng nhau trên một cái đường màu đỏ, giống như là bạn làm vậy nè, giống như cái hình hình đè mà bạn làm 8 người chung một hàng như vậy á, thì nó mới đúng cái luật, hiểu không, thì nó mới đúng cái tỷ lệ của họ. Và nhất định là phải ghi chú xuống là phải lấy từ đỉnh đầu. Ngoài ra những cái luật xét về trang phục nè, đồ thêu nè, rồi những cái luật mà xét về trăm cài nè, đó phải đi kèm chung luôn, chứ không thể nào mà cứ ra những cái lệnh lắt nhắt cho nên là nhiều khi nó bị rơi rớt, không có kiểm đủ, hiểu không?"
Earlier today (verbatim): "Tôi không hiểu là bạn kiểm cái kiểu gì. Đã nói á, là mỗi lần mà hình mà ra á, có hình á, là phải đặt cái hình mẫu M09 đặt đè chồng lên cái hình mới để mà soi cái tỷ lệ. ..."

## WHO (owner 18/11 ~03:45Z, verbatim: "Người lớn dùng tỷ lệ của M09 luôn, không có khác gì hết trơn á. Tiếp đến là đàn ông, cung nữ, mama. Tức là bây giờ M09 là áp dụng cho phụ nữ. Còn trẻ con á, ... Mày cứ vẽ như bình thường đi là ổn thôi. Cứ vẽ bình thường. ... trước mắt là tao thấy trẻ con tao không ý kiến gì. Cái duy nhất là đàn ông là hơi khó là tại vì mình chưa có biết tỷ lệ đàn ông như thế nào đó. À, bởi vì tao muốn á, là đàn ông á, là phải cao hơn người nữ, nhưng mà bây giờ cái tỷ lệ đó làm sao thì sao chưa biết. Bây giờ mình thử mày vẽ một ảnh mẫu tỷ lệ đàn ông đi. Còn cái vấn đề mà vẽ cái người mà mama á, tao nghĩ tại sao phải vẽ cái người mama ta? Mama là những người cung nữ lớn tuổi, mình có tới 52 người cung nữ lận, thế thì tại sao phải vẽ người mama? Không hiểu tại sao không lấy cái ảnh người lớn tuổi của một cái cung nữ nào đó làm mama, đúng không? Bây giờ cái mình cần bận tâm tới chỉ là người đàn ông. Người đàn ông thì sẽ có thái giám và quan và vua đều có một cái tỷ lệ y chang nhau đó, rồi có các cái tuổi khác nhau vậy thôi chứ có cái gì đâu. Vương gia hoàng tử các nước thì là tất cả đều chung một cái tỷ lệ thôi, công chúa rồi thì theo tỷ lệ của nữ, đàn ông thì theo tỷ lệ của nam, chứ có cái gì mà phải đắn đo ta. Mức lệch 3% là được rồi, không có cần phải chặt quá đâu, vừa vừa tương đối là được.")
- m09 proportion = EVERY woman at EVERY age (a18/a26/a36/a51): consorts, player, maids, mamas, princesses (home or foreign), Thái hậu.
- Men (eunuchs, officials, Emperor, vương gia, princes, foreign men) = ONE shared male standard ("nam mẫu", being painted by W19, reports/male-proportion.md), taller than women; until it is approved, men are not gated.
- Children: draw normally, no proportion gate for now.
- Tolerance ±3% (owner OK: "vừa vừa tương đối").
- Mamas: no separate mama figures needed — use an older-age figure of a maid as the mama (FOR MAIN: game wiring).

## A. PROPORTION (m09 overlay) — tool: dev/art/figure-gate/overlay_m09.py
1. Reference = img/hd/fig-maid-m09-a18.webp (Magnific eIyOFEidqL). It is the ONE standard for body, rendering, fabric and skin (never for the face).
2. ROW FIRST: put ALL figures of the set (a person's ranks t1..t8) side by side in ONE row, each scaled so its SKULL TOP (đỉnh đầu: top of the skull, NOT the bun, NOT hairpins, NOT the crown) sits on the upper RED line and its FEET on the lower RED line. Crowns/buns/pins stick out above the line: that is correct.
   Owner 18/11 ~03:40Z (verbatim): "Người nào mà cao hơn á, thì kéo giãn xuống cho nó bằng với cái đường line màu đỏ, hiểu không? Người nào mà thấp hơn thì kéo cao lên chẳng hạn. Sau khi kéo giãn xong hết rồi, bắt đầu mình mới so, mình mới đặt cái người M09 vào để mà mình so cái tỷ lệ người, tức là thân hình, body và cái đầu có đúng tỷ lệ chưa."
3. THEN OVERLAY: lay m09 (scaled the same way, skull top → feet) over every figure: tinted silhouette + red outline.
4. PASS: face height within ±3% of m09's; shoulders and waist inside m09's outline; body ≈ 7.5 heads (skull top → feet); shoulder points ≈ 2.0 × face height; waist ≈ 1.15 × face height. Fail on any = regenerate.
5. Crowns/buns are EXTRA height above the head; never shrink the head or the body to make room (use a taller canvas, generous headroom).
6. Skull-top detection: Haar face box whose centre is mostly skin colour (the largest box can be hair/pins); skull top ≈ face top − 0.45 × face height. Before go-live every figure gets its img/fig-ht.json head-top row (dev/art/headtop/headtop.py) — the game scales skull top → feet (jkit.js KIT_FIG / kitFigBody); without the row the crown counts as height and the figure shrinks.
7. Output with every report: the row + overlay sheet (all ranks), and the in-game-scale ladder.

## B. HAIRPINS / HEADDRESS (trâm cài)
1. Every rank has FULL hairpins from t1 (Đáp ứng) up — flowers + several trâm with dangles/tassels — like the LIVE original of the same person and rank (img/hd/fig-consort-<cNN>-t<N>-a18.webp). Never "one or two sticks" (looks like a maid).
2. Keep each rank's headdress as in the live original; change only where two ranks look too alike.
3. Every rank reads at least as rich as the rank below; t6 Quý phi, t7 Hoàng quý phi, t8 Hoàng hậu crowns are clearly DIFFERENT from each other (t7 ≠ t8).
4. Real trâm with dangles/tassels, pretty, not overdone; no flat combs; no pin jutting out sideways.
Ranks: t1 Đáp ứng, t2 Thường tại, t3 Quý nhân, t4 Tần, t5 Phi, t6 Quý phi, t7 Hoàng quý phi, t8 Hoàng hậu.

## C. COSTUME / EMBROIDERY
1. Embroidery = real silk embroidery: stitched INTO the cloth, follows folds and light, never pasted/printed/glossy/raised sticker look. "Thêu" means the stitching technique, not "sparse": high ranks are RICH and luxurious, each rank richer than the rank below.
2. Fabric/rendering like m09 (one fabric reference only = m09). A little voile is fine if it looks beautiful.
3. Each person: every rank a DIFFERENT colour AND design from her previous rank; nobody looks like anyone else (own colour line). t7 = own colour + clear imperial yellow; t8 = more yellow MIXED with other colours.
4. Consort sleeves/hem must not read as a maid's. Đáp ứng/Thường tại may be shorter; from Tần up the outer robe reaches the floor; no trains; Hoàng hậu not bulky. Feet/slippers visible.
5. Collars: crossed collar (giao lĩnh) unless the live original says otherwise.

## D. FACE / POSE / STYLE
1. Face = the person's OWN face (her por + face master), never m09's face; small drift from her old figure is OK.
2. Clean bare forehead: NO hoa điền, no dot/mark (hoa điền is an item).
3. Varied hand poses; the hand interacts with the held item (fan, flower branch, lantern, scroll, book…); no teacup/teapot; no stiff identical poses.
4. STYLE_ANCHOR (dev/art/STYLE_ANCHOR.md): semi-realistic near-3D, soft light, luminous skin, beautiful at every age; no slanted narrow eyes, no sad/teary eyes, no closed eyes, no smirk.
5. FRESH gens only (never derive from a previous flawed gen). Magnific gpt-2-6 only, folder ba4aecfe-efce-47e2-b53f-30d292091886. Look at every image.

## E. APPROVAL FLOW
1. No mass production until the owner approves 3–4 consecutive good people (different painters).
2. The owner reviews ONE sheet per person: the row on the red skull-top/feet lines + the m09 overlay (+ in-game ladder), never piecemeal singles. Owner 18/11 ~03:38Z (verbatim): "Tao nghĩ là phòng co giãn tao cũng không có cần vô nữa đâu, bởi vì hiện tại tao thấy cách mày làm cũng khá là hợp ý tao rồi. Cái cách mà mày đặt cái người đó vô so, rồi sau đó có một cái đường màu đỏ đo từ đỉnh đầu của từng người là ok." → the "Phòng co giãn" artifact is NOT used (kept only, not sent).
