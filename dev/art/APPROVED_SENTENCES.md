# APPROVED SENTENCES — the owner's approved words (GENERATED from dev/art/check_store.py APPROVED/BANNED tables; do not edit by hand)

**Source of truth = the APPROVED and BANNED tables in `dev/art/check_store.py`** (the one STORE GATE, owner Lượt 371/373/375, extended Lượt 500/504). Regenerate this file: `python3 dev/art/check_store.py --registry-md`.

**LAW #0 (Lượt 505):** only sentences/bans the OWNER herself approved or raised are listed; our own remarks are notes to her, never entries. Each sentence is COPIED from the prompt of a picture she approved (`--self` proves it against its proof prompt); only `{slot}` words may differ. A new owner approval is ADDED to the tables by the foreman the same turn, copied, never retyped.

Gate: `python3 dev/art/check_store.py <prompt> <store args>` (store sentences + approved sentences + banned phrases) or, for prompts without store args (triều phục, ma ma spec files…), `python3 dev/art/check_store.py <prompt> --scope tpN|prN|trieuN|mama|nude [--age aNN]`. Must print STORE CHECK PASS; FAIL = no gen; ledger line carries "store_check":"PASS" and "approved_check":"PASS". Audit: dev/art/APPROVED_AUDIT.md. Owner sheet: dev/handover/review-sheets/approved/.

Scopes: `tp1-8` thường phục rank (consorts c01–c32, m01–m52) · `pr1-8` princesses p01–p03 · `trieu1-8` triều phục · `mama` · `nude` Nữ đế · `all`. `scope` = REQUIRED (missing → FAIL); `confirm` = owner still to confirm there → WARN only. `store: yes` = a store sentence, already demanded by the store part when the prompt is checked with store args.

Status: seeded Lượt 500 (AP1); **the owner has NOT yet approved this list as a whole** — sheet sent for her one-time OK.

**NEW CHARACTER (owner Lượt 555):** the only new-person prompt = `dev/art/NEW_CHARACTER_TEMPLATE.md` (set B: COMMON_v3 + mNN.v3 line, ONE ref M09 eIyOFEidqL). RETIRED, never approved sentences: COMMON v1/v2 (dev/art/_retired/face-common/), style-image sentences for 6AbGv6EiJO / style2_portraits / style3_girls Xm9tPkMBfo, kc2k / khuê các 18/11 recipes, the 'new-character style sentence', one-ref from img/hd/fig-*-t1.

## Sentences (S)

### S01 · TWO-COLOUR RULE (hai màu)
- text: `TWO-COLOUR RULE: the whole outfit uses EXACTLY TWO colours that clearly interact: the MAIN colour {main} and the SECONDARY colour {secondary}, the secondary clearly visible in large areas (inner robe or skirt, wide borders, sash, cuffs, linings), never a single flat colour all over; gold or silver only as thin accents, never a third colour.`
- scope: tp1-6 pr1-6 mama
- confirm: nude trieu1-8
- ages: all
- store: no
- luot: 489, 499 (ART_RULES B15); 529 (G14: t7/t8 blocking)
- source: dev/art/owner-copy/pr_cl_t2_V2.txt (Cao Ly V2, owner Lượt 301-303)
- proof: dev/art/owner-copy/pr_cl_t2_V2.txt
- picture: Cao Ly V2 t2 (Lượt 301-303) · gen Lw8y0mCswO · cut 79f3BGcJAL (ledger :288) · NO file on CDN/repo (sent in chat only) — ART_RULES B15 lists xSByOSyjfW/yiuGA83PW9/cpS8oJg0eP, but the ledger (:509/510/518) says those are the later Cao Ly t4/t5/t6 store pictures
- vn: Cả bộ đồ đúng HAI màu: màu chính + màu phụ, màu phụ thấy rõ ở mảng lớn (váy trong, viền rộng, đai, cổ tay, lót); vàng/bạc chỉ viền mảnh.

### S02 · COLOUR RULE tone (B18: clear soft colours, model = foreign princesses nc1-nc3) t1-t6
- text: `COLOUR RULE: all colours clear, soft and gentle at a medium-light tone, like fine silk in soft daylight: medium-soft saturation, pretty and clean, the secondary colour a real pretty colour (it may be a little deeper or a soft ivory, never heavy, never black, never grey), never rực, never glaring, never neon, never pastel-washed or faded, never dusty, grey, muddy or black;`
- scope: tp1-6 pr1-6
- confirm: -
- ages: a18 a26 a36
- store: yes
- luot: 301-303, B14; text B18 Lượt 586/590/592 (BW4)
- source: ART_RULES B18 (owner Lượt 592) -> t8-prompt-B/build.py LOW_TONE (was owner-copy/pr_cl_t2_V2.txt)
- proof: dev/art/approved/proof/bw4_b18_m13_t2_a26.txt
- picture: Cao Ly V2 t2 (Lượt 301-303) · gen Lw8y0mCswO · cut 79f3BGcJAL (ledger :288) · NO file on CDN/repo (sent in chat only) — ART_RULES B15 lists xSByOSyjfW/yiuGA83PW9/cpS8oJg0eP, but the ledger (:509/510/518) says those are the later Cao Ly t4/t5/t6 store pictures · the same sentence is in the store prompts of the Lượt 395 store sheets, approved Lượt 397: https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg
- vn: Mọi màu cùng MỘT độ đậm vừa (như áo đỏ san hô/đỏ gạch của game): không rực, không neon, không nhạt bệch, không xám đục, không đen.

### S03 · COLOUR RULE tone t7/t8/Nữ đế (B18, same words as S02; was prompt B "fresh, clear and luminous")
- text: `COLOUR RULE: all colours clear, soft and gentle at a medium-light tone, like fine silk in soft daylight: medium-soft saturation, pretty and clean, the secondary colour a real pretty colour (it may be a little deeper or a soft ivory, never heavy, never black, never grey), never rực, never glaring, never neon, never pastel-washed or faded, never dusty, grey, muddy or black;`
- scope: tp7-8 pr7-8 nude
- confirm: -
- ages: a18 a26 a36
- store: yes
- luot: 18/11 4c0 (t8 PROMPT B FROZEN); B17/B18 Lượt 583/592 (BW3/BW4)
- source: dev/art/t8-prompt-B/build.py (prompt B)
- proof: dev/art/approved/proof/bw4_b18_m13_t8_a26.txt
- picture: t8 Hoàng hậu prompt B (18/11 ~18:20Z 'Prompt này rất là ok') · c25 a18 t8 v0 · https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/c25_a18_t8_v0.png
- vn: Hoàng quý phi / Hoàng hậu / Nữ đế: cùng câu tông màu B18 với t1-t6 (màu trong, mềm, dịu, không rực, không nhạt bệch, không xám).

### S04 · EMBROIDERY stitched into the cloth (thêu trực tiếp)
- text: `All flowers, birds and {motif} are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted patches, not raised.`
- scope: tp1-8 pr1-8 nude trieu1-8
- confirm: -
- ages: all
- store: yes
- luot: 18/11 07:45Z (G9)
- source: dev/art/owner-copy/pr_cl_t2_V2.txt = store
- proof: dev/art/owner-copy/pr_cl_t2_V2.txt
- picture: Cao Ly V2 t2 (Lượt 301-303) · gen Lw8y0mCswO · cut 79f3BGcJAL (ledger :288) · NO file on CDN/repo (sent in chat only) — ART_RULES B15 lists xSByOSyjfW/yiuGA83PW9/cpS8oJg0eP, but the ledger (:509/510/518) says those are the later Cao Ly t4/t5/t6 store pictures · the same sentence is in the store prompts of the Lượt 395 store sheets, approved Lượt 397: https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg
- vn: Hoa, chim, bướm (phượng/rồng) là chỉ thêu trực tiếp vào vải, phẳng, theo nếp vải; không dán, không nổi.

### S05 · NO PHOENIX t1-t6
- text: `No phoenix anywhere on the robe or in the hair: only flowers, birds, butterflies or other motifs.`
- scope: tp1-6 pr1-6 trieu1-6
- confirm: -
- ages: all
- store: yes
- luot: 18/11 4d, I3
- source: dev/art/owner-copy/pr_cl_t2_V2.txt = store
- proof: dev/art/owner-copy/pr_cl_t2_V2.txt
- picture: Cao Ly V2 t2 (Lượt 301-303) · gen Lw8y0mCswO · cut 79f3BGcJAL (ledger :288) · NO file on CDN/repo (sent in chat only) — ART_RULES B15 lists xSByOSyjfW/yiuGA83PW9/cpS8oJg0eP, but the ledger (:509/510/518) says those are the later Cao Ly t4/t5/t6 store pictures · the same sentence is in the store prompts of the Lượt 395 store sheets, approved Lượt 397: https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg
- vn: Bậc 1-6 không có phượng trên áo hay trên tóc: chỉ hoa, chim, bướm.

### S06 · STORE FABRIC t1-t3 (LAW #1)
- text: `Light, soft, thin flowing silk: the long sleeves, skirt and sash are supple and airy, drifting softly as in a gentle breeze, with soft natural folds, never stiff, flat or board-like.`
- scope: tp1-3 pr1-3
- confirm: -
- ages: all
- store: yes
- luot: LAW #1 Lượt 397 (store gate Lượt 375)
- source: dev/art/t8-prompt-B/build.py --low 1..3 (store)
- proof: dev/art/approved/proof/c06_t1_a18.txt
- picture: Lượt 395 store sheets, approved Lượt 397 'vẽ rất là đẹp' · https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg
- vn: Câu tả vải của KHO (luật số 1): lụa nhẹ, mềm, mỏng, bay; tay áo, váy, đai mềm như gió thổi; không cứng.

### S07 · FABRIC prompt B t7/t8/Nữ đế
- text: `FABRIC: thick gold-embroidered brocade with a graceful, flowing drape.`
- scope: tp7-8 pr7-8 nude
- confirm: -
- ages: all
- store: no
- luot: 364 (B12)
- source: dev/art/store-all/build_all.py FABRIC_B = prompt B
- proof: dev/art/approved/proof/c06_t8_a18.txt
- picture: t8 Hoàng hậu prompt B (18/11 ~18:20Z 'Prompt này rất là ok') · c25 a18 t8 v0 · https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/c25_a18_t8_v0.png
- vn: Hoàng quý phi / Hoàng hậu / Nữ đế: gấm dày thêu kim tuyến, rủ mềm duyên dáng.

### S08 · SLEEVE LENGTH t1-t3 (to the knees)
- text: `SLEEVE LENGTH (rank law): very long, wide, flowing sleeves that fall well past her hands and hang down to her KNEES.`
- scope: tp1-3 pr1-3
- confirm: -
- ages: all
- store: no
- luot: 351, 355 (G5)
- source: dev/art/store-all/build_all.py sleeve()
- proof: dev/art/approved/proof/c06_t1_a18.txt
- picture: Ba Tư t1-t3 store redraw (cuts s7I9PqGl8e / bxMSlav5Y2 / cpS8B2i0eP) · https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg (top row)
- vn: Bậc 1-3: tay áo rất dài, rộng, bay, rủ qua bàn tay xuống tới ĐẦU GỐI.

### S09 · SLEEVE LENGTH t4-t6 (to the ankles)
- text: `SLEEVE LENGTH (rank law): very long, wide, flowing sleeves that hang down to her ANKLES.`
- scope: tp4-6 pr4-6
- confirm: -
- ages: all
- store: no
- luot: 351, 355 (G5)
- source: dev/art/store-all/build_all.py sleeve()
- proof: dev/art/approved/proof/c06_t4_a18.txt
- picture: Phù Tang t4 curved test (Lượt 412) · gen 5jDiW44Kxe · cut EbYOArVuuO · https://ctm-img.victoria-tntt.workers.dev/img/_review/princess/phutang_t4_curved_vs_old.jpg (right half)
- vn: Bậc 4-6: tay áo rất dài, rộng, rủ xuống tới MẮT CÁ CHÂN.

### S10 · SLEEVE LENGTH t7-t8 (touch the floor)
- text: `SLEEVE LENGTH (rank law): very long, very wide sleeves that hang down past her ankles until they touch the floor.`
- scope: tp7-8 pr7-8
- confirm: -
- ages: all
- store: no
- luot: 351, 355 (G5)
- source: dev/art/store-all/build_all.py sleeve()
- proof: dev/art/approved/proof/c06_t8_a18.txt
- picture: t8 Hoàng hậu prompt B (18/11 ~18:20Z 'Prompt này rất là ok') · c25 a18 t8 v0 · https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/c25_a18_t8_v0.png
- vn: Hoàng quý phi / Hoàng hậu: tay áo rất dài, rất rộng, quá mắt cá chạm sàn.

### S11 · ONE SINGLE SLEEVE LAYER
- text: `ONE SINGLE SLEEVE LAYER: each sleeve begins at the shoulder and falls in one piece; NO shorter outer sleeve, NO half-sleeve or elbow-length layer, NO short jacket sleeve or cuff layer visible on top of it.`
- scope: tp1-8 pr1-8
- confirm: -
- ages: all
- store: no
- luot: 331, 353 (G6)
- source: dev/art/store-all/build_all.py ONE_LAYER
- proof: dev/art/approved/proof/c06_t1_a18.txt
- picture: Ba Tư t1-t3 store redraw (cuts s7I9PqGl8e / bxMSlav5Y2 / cpS8B2i0eP) · https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg (top row)
- vn: Chỉ MỘT lớp tay áo, rủ một mảnh từ vai; không tay ngắn chồng lên tay dài.

### S12 · PHI BẠCH (khăn choàng) t1-t6
- text: `PHI BẠCH: {intro} is a very sheer, highly translucent gauze shawl in {colour} (her secondary colour, clearly different from her main robe colour {main}) — the robe, sleeves and arms are clearly visible through it, so it reads as a light airy veil of that hue, never an opaque solid band of colour; it keeps its soft graceful drape.`
- scope: tp1-6 pr1-6
- confirm: -
- ages: all
- store: no
- luot: 397, 412, 434, 469, 483, 486 (G4); F12 Lượt 601 (BW4: very sheer, translucent)
- source: dev/art/store-all/build_all.py phi_bach()
- proof: dev/art/approved/proof/bw4_f12_m13_t2_a26.txt
- picture: Phù Tang t4 curved test (Lượt 412) · gen 5jDiW44Kxe · cut EbYOArVuuO · https://ctm-img.victoria-tntt.workers.dev/img/_review/princess/phutang_t4_curved_vs_old.jpg (right half)
- vn: Khăn phi bạch choàng sau lưng, qua tay, màu KHÁC hẳn màu áo (màu phụ), không lẫn vào áo; chỉ bậc 1-6.

### S13 · CAPELET CUT t4 Tần (curved, opens gradually)
- text: `CAPELET CUT (flowing): the capelet stays the same short round shoulder capelet, but its lower edge and the collar lines are soft CURVES, never flat horizontal edges; the lower edge is {shape}; the front is NOT closed or buttoned from top to bottom: the robe is closed only at the throat clasp and its front opens gradually from the collar downward in a long soft V, the two front panels parting more and more toward the hem, flowing and graceful (uyển chuyển), never cramped or boxy.`
- scope: tp4 pr4
- confirm: -
- ages: all
- store: no
- luot: 397 item 5, 412 (G1)
- source: dev/art/store-all/build_all.py capelet_cut()
- proof: dev/art/approved/proof/c06_t4_a18.txt
- picture: Phù Tang t4 curved test (Lượt 412) · gen 5jDiW44Kxe · cut EbYOArVuuO · https://ctm-img.victoria-tntt.workers.dev/img/_review/princess/phutang_t4_curved_vs_old.jpg (right half)
- vn: Áo choàng vai Tần: đường cắt CONG (hình cong đổi theo người), vạt trước mở dần từ cổ xuống, không cài kín.

### S14 · HOÀNG QUÝ PHI LUXURY t7
- text: `HOÀNG QUÝ PHI LUXURY: richer than every lower rank: more jewels on the phoenix crown (rubies, sapphires, pearls and jade), a layered pearl-and-gold necklace, pearl and jade trims along the cape edges, and long jade-and-gold belt pendants with pearl tassels; still clearly simpler and less golden than the Empress.`
- scope: tp7 pr7
- confirm: -
- ages: all
- store: no
- luot: 486 (G12)
- source: dev/art/store-all/build_all.py HQP_LUX
- proof: dev/art/approved/proof/c06_t7_a18.txt
- picture: HQP c20 pearls (skin) · gen 0eUXPSZTfW · cut xSBwv6vjfW · https://ctm-img.victoria-tntt.workers.dev/img/_keep/skins-1119/c20_hqp_pearls.png
- vn: Hoàng quý phi: nhiều ngọc, trân châu, ngọc bích, vàng hơn bậc dưới, vẫn kém Hoàng hậu.

### S15 · HELD ITEM COLOUR (món cầm khác màu)
- text: `HELD ITEM COLOUR: the held item and any embroidery, painting or tassel on it are in a colour family clearly different from BOTH her robe colour {main} and her secondary colour {secondary}.`
- scope: tp1-8 pr1-8
- confirm: -
- ages: all
- store: no
- luot: 486 (B16)
- source: dev/art/store-all/build_all.py item_colour()
- proof: dev/art/approved/proof/c06_t1_a18.txt
- picture: m13 + m20 8-rank angle sets (Lượt 486 'lively t1-t5 / calm t6-t8') · https://ctm-img.victoria-tntt.workers.dev/img/_review/rank-test/m13_8rank_angles.jpg
- vn: Món cầm tay và hoa văn/tua của nó khác họ màu với CẢ màu chính và màu phụ của áo.

### S16 · POSE TAIL (head up, never looking down)
- text: `The item is in a contrasting colour, not the robe colour, and the hand really grips it; the whole face fully visible with the head up toward the viewer, eyes open, lips closed, never looking down, nothing covering the face.`
- scope: tp1-8 pr1-8
- confirm: -
- ages: all
- store: yes
- luot: D3d, 18/11
- source: dev/art/t8-prompt-B/build.py (store pose tail)
- proof: dev/art/approved/proof/c06_t1_a18.txt
- picture: Cao Ly V2 t2 (Lượt 301-303) · gen Lw8y0mCswO · cut 79f3BGcJAL (ledger :288) · NO file on CDN/repo (sent in chat only) — ART_RULES B15 lists xSByOSyjfW/yiuGA83PW9/cpS8oJg0eP, but the ledger (:509/510/518) says those are the later Cao Ly t4/t5/t6 store pictures · the same sentence is in the store prompts of the Lượt 395 store sheets, approved Lượt 397: https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg
- vn: Món cầm khác màu áo, tay cầm thật; cả mặt thấy rõ, ngẩng đầu nhìn người xem, mắt mở, môi khép, KHÔNG cúi nhìn xuống.

### S17 · HANDS TAIL (ma ma / triều phục)
- text: `Her hands interact naturally with the item (gently presenting, turning or touching it), lively and natural, while her head stays up facing the viewer, eyes open, lips closed, never looking down.`
- scope: mama nude trieu1-8
- confirm: -
- ages: all
- store: no
- luot: D3d, 18/11
- source: dev/art/t8-prompt-B/build.py (state/court pose tail)
- proof: dev/handover/reports/mama-specs/c06-a36.oneref.prompt.txt
- picture: ma ma m01 a36 (Lượt 395/397 OK) · gen s7I4kzhl8e · cut O6E2U81ynm · https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_mama_m01.jpg
- vn: Tay tương tác tự nhiên với món cầm; đầu ngẩng nhìn người xem, mắt mở, môi khép, không cúi xuống.

### S18 · SMILE closed lips (cười mỉm, không hở răng)
- text: `a bright closed-lip smile, lips closed, no teeth, mouth never open`
- scope: all
- confirm: -
- ages: all
- store: yes
- luot: 18/11 16:37Z (D4)
- source: dev/art/owner-copy/pr_cl_t2_V2.txt = store style line
- proof: dev/art/owner-copy/pr_cl_t2_V2.txt
- picture: Cao Ly V2 t2 (Lượt 301-303) · gen Lw8y0mCswO · cut 79f3BGcJAL (ledger :288) · NO file on CDN/repo (sent in chat only) — ART_RULES B15 lists xSByOSyjfW/yiuGA83PW9/cpS8oJg0eP, but the ledger (:509/510/518) says those are the later Cao Ly t4/t5/t6 store pictures · the same sentence is in the store prompts of the Lượt 395 store sheets, approved Lượt 397: https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg
- vn: Mọi người cười mỉm tươi, môi khép, không hở răng, không mở miệng.

### S19 · SKIN / FOREHEAD / FEET tail
- text: `Luminous smooth porcelain skin, bare clean forehead with no forehead mark and no flower mark, eyes open, floor-length robe with slippers visible, no train, no cup, nothing covering the face.`
- scope: all
- confirm: -
- ages: all
- store: yes
- luot: 18/11 23:25Z (D9, D10)
- source: dev/art/owner-copy/pr_cl_t2_V2.txt = store
- proof: dev/art/owner-copy/pr_cl_t2_V2.txt
- picture: Cao Ly V2 t2 (Lượt 301-303) · gen Lw8y0mCswO · cut 79f3BGcJAL (ledger :288) · NO file on CDN/repo (sent in chat only) — ART_RULES B15 lists xSByOSyjfW/yiuGA83PW9/cpS8oJg0eP, but the ledger (:509/510/518) says those are the later Cao Ly t4/t5/t6 store pictures · the same sentence is in the store prompts of the Lượt 395 store sheets, approved Lượt 397: https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg
- vn: Da sáng mịn; trán trơn, không hoa điền; mắt mở; áo dài chạm sàn thấy giày; không đuôi áo, không chén; không che mặt.

### S20 · HAIR loose t1-t3
- text: `HAIR (rank law): her hair stays LOOSE and flowing like her young-lady picture: at most the top half gathered up, most of her hair hanging loose down her back.`
- scope: tp1-3 pr1-3
- confirm: -
- ages: a18 a26
- store: no
- luot: 337 (F1)
- source: dev/art/store-all/build_all.py HAIR_LOW
- proof: dev/art/approved/proof/c06_t1_a18.txt
- picture: Ba Tư t1-t3 store redraw (cuts s7I9PqGl8e / bxMSlav5Y2 / cpS8B2i0eP) · https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg (top row)
- vn: Bậc 1-3: tóc xõa, tối đa búi nửa trên, phần lớn tóc buông sau lưng.

### S21 · HAIR up t4-t8
- text: `HAIR (rank law): ALL her hair is swept UP into a high bun / chignon, nothing loose hanging down her back.`
- scope: tp4-8 pr4-8
- confirm: -
- ages: all
- store: no
- luot: 337 (F1)
- source: dev/art/store-all/build_all.py HAIR_HIGH
- proof: dev/art/approved/proof/c06_t4_a18.txt
- picture: Phù Tang t4 curved test (Lượt 412) · gen 5jDiW44Kxe · cut EbYOArVuuO · https://ctm-img.victoria-tntt.workers.dev/img/_review/princess/phutang_t4_curved_vs_old.jpg (right half)
- vn: Bậc 4-8: toàn bộ tóc búi cao, không sợi nào buông sau lưng.

### S22 · NO hair flowers t7-t8
- text: `NO flowers in the hair or on the crown at this rank (flowers only at ranks 1 to 6).`
- scope: tp7-8 pr7-8
- confirm: -
- ages: all
- store: no
- luot: 323, 331 (F2)
- source: dev/art/store-all/build_all.py NOFLOWER
- proof: dev/art/approved/proof/c06_t8_a18.txt
- picture: t8 Hoàng hậu prompt B (18/11 ~18:20Z 'Prompt này rất là ok') · c25 a18 t8 v0 · https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/c25_a18_t8_v0.png
- vn: Hoàng quý phi / Hoàng hậu: không cài hoa trên tóc hay mũ.

### S23 · HEAD AND BODY turn together
- text: `HEAD AND BODY: her head turns together with her shoulders and body in the same direction with natural anatomy, never a frontal head on a turned body.`
- scope: tp1-8 pr1-8
- confirm: -
- ages: all
- store: no
- luot: 326 (D7)
- source: dev/art/store-all/build_all.py HEADBODY
- proof: dev/art/approved/proof/c06_t1_a18.txt
- picture: m13 + m20 8-rank angle sets (Lượt 486 'lively t1-t5 / calm t6-t8') · https://ctm-img.victoria-tntt.workers.dev/img/_review/rank-test/m13_8rank_angles.jpg
- vn: Đầu xoay cùng hướng với vai và thân, không mặt thẳng trên thân nghiêng.

### S24 · HAIRPINS point up/back
- text: `Every hairpin is inserted into the hair pointing upward or backward with dangles hanging down, no hairpin horizontal or sticking out to the side.`
- scope: tp1-8 pr1-2 pr4-8 mama nude trieu1-8
- confirm: -
- ages: all
- store: yes
- luot: B 18/11 (F5)
- source: dev/art/t8-prompt-B/build.py (store)
- proof: dev/art/approved/proof/c06_t1_a18.txt
- picture: Lượt 395 store sheets, approved Lượt 397 'vẽ rất là đẹp' · https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg
- vn: Mọi cây trâm cắm hướng lên/ra sau, tua rủ xuống; không trâm nằm ngang chĩa ra hai bên (trừ binyeo Cao Ly).

### S25 · TRIỀU PHỤC hà bí shared block (t1-t6)
- text: `The TWO VERTICAL RANK-COLOUR BANDS are the hà bí (霞帔) worn as in the Song–Ming dynasties, the SAME on every rank: two long straight bands of the same width (about a hand wide), the same shape and the same thin gold-thread edge, in {colour}, a strong, saturated colour so the rank reads at a glance, never pastel, never muted, embroidered along their whole length with {pattern}; they come from behind the neck over the shoulders and hang straight down the front of the robe to her ANKLES, where their two tips meet and join into ONE point at ankle height, the same height on every rank; from that point hangs ONE palm-sized bí trụy (帔坠) pendant: {pendant}, hanging at ankle level (NOT on the floor), and below the pendant hangs a small, soft silk tassel, short and graceful.`
- scope: trieu1-6
- confirm: -
- ages: all
- store: no
- luot: 400-410, 452, 459 (H3)
- source: dev/art/owner-copy/trieu/r21 (build_r21.py)
- proof: dev/art/owner-copy/trieu/r21/t3_c06_RAN.txt
- picture: triều phục c06 r21 (Lượt 492: t4, t6, t7, t8 OK; t4 cut u5W4dPuQLD, t6 cut N2q8sOD6D9) · https://ctm-img.victoria-tntt.workers.dev/img/_review/trieu-phuc/r19/c06_sheet21.jpg
- vn: Triều phục: hai dải hà bí cùng rộng, cùng dáng, viền kim tuyến, màu bậc đậm; từ sau cổ qua vai rủ thẳng xuống MẮT CÁ, hai đầu nối thành một điểm, treo MỘT bí trụy cỡ lòng bàn tay + tua lụa nhỏ.

### S26 · TRIỀU PHỤC cầu vai on top of hà bí
- text: `The stiff shoulder piece (cầu vai) lies ON TOP of the hà bí bands at the shoulders and covers them there; the bands appear from under the shoulder piece.`
- scope: trieu1-6
- confirm: -
- ages: all
- store: no
- luot: 452 (H3)
- source: dev/art/owner-copy/trieu/r21
- proof: dev/art/owner-copy/trieu/r21/t3_c06_RAN.txt
- picture: triều phục c06 r21 (Lượt 492: t4, t6, t7, t8 OK; t4 cut u5W4dPuQLD, t6 cut N2q8sOD6D9) · https://ctm-img.victoria-tntt.workers.dev/img/_review/trieu-phuc/r19/c06_sheet21.jpg
- vn: Cầu vai cứng nằm TRÊN dải hà bí ở vai, hà bí lộ ra từ dưới cầu vai.

### S27 · TRIỀU PHỤC cuff bands = hà bí colour
- text: `The cuff bands at the ends of the sleeves are in the SAME colour as the hà bí ({colour}) and are embroidered with the same {pattern}.`
- scope: trieu1-6
- confirm: -
- ages: all
- store: no
- luot: 468 (H6)
- source: dev/art/owner-copy/trieu/r21/build_r21.py CUFF
- proof: dev/art/owner-copy/trieu/r21/t3_c06_RAN.txt
- picture: triều phục c06 r21 (Lượt 492: t4, t6, t7, t8 OK; t4 cut u5W4dPuQLD, t6 cut N2q8sOD6D9) · https://ctm-img.victoria-tntt.workers.dev/img/_review/trieu-phuc/r19/c06_sheet21.jpg
- vn: Viền cổ tay áo cùng màu hà bí, thêu cùng hoa văn hà bí.

### S28 · TRIỀU PHỤC brocade (same in all 8 ranks)
- text: `FABRIC OF THIS COURT ROBE: the robe and sleeves are rich silk BROCADE (gấm) with a woven pattern, flowing as brocade flows, the same brocade on every rank, never thin, limp or flimsy.`
- scope: trieu1-8
- confirm: -
- ages: all
- store: no
- luot: 444 (H2)
- source: dev/art/owner-copy/trieu (r17+)
- proof: dev/art/owner-copy/trieu/r21/t3_c06_RAN.txt
- picture: triều phục c06 r21 (Lượt 492: t4, t6, t7, t8 OK; t4 cut u5W4dPuQLD, t6 cut N2q8sOD6D9) · https://ctm-img.victoria-tntt.workers.dev/img/_review/trieu-phuc/r19/c06_sheet21.jpg
- vn: Triều phục: áo và tay bằng GẤM dệt hoa, rủ như gấm, cùng một câu gấm ở cả 8 bậc.

### S29 · TRIỀU PHỤC sleeves to the ankles (t1-t6)
- text: `SLEEVES: the wide sleeves of the outer robe are very long and hang all the way down to her ANKLES, one single sleeve layer, flowing softly, never stiff.`
- scope: trieu1-6
- confirm: -
- ages: all
- store: no
- luot: 455 (H3)
- source: dev/art/owner-copy/trieu
- proof: dev/art/owner-copy/trieu/r21/t3_c06_RAN.txt
- picture: triều phục c06 r21 (Lượt 492: t4, t6, t7, t8 OK; t4 cut u5W4dPuQLD, t6 cut N2q8sOD6D9) · https://ctm-img.victoria-tntt.workers.dev/img/_review/trieu-phuc/r19/c06_sheet21.jpg
- vn: Triều phục bậc 1-6: tay áo rộng, rất dài, tới mắt cá, một lớp.

### S30 · TRIỀU PHỤC hair fully up, no flowers
- text: `HAIR FULLY UP for this court robe: ALL of her hair is swept up into a neat high bun (updo) under the crown, nothing hanging loose down her back or over her shoulders; NO flowers in the hair (no fresh or silk flowers), only the crown and gold-and-jewel hairpins, solemn.`
- scope: trieu1-8
- confirm: -
- ages: all
- store: no
- luot: 411 (H8)
- source: dev/art/owner-copy/trieu
- proof: dev/art/owner-copy/trieu/r21/t3_c06_RAN.txt
- picture: triều phục c06 r21 (Lượt 492: t4, t6, t7, t8 OK; t4 cut u5W4dPuQLD, t6 cut N2q8sOD6D9) · https://ctm-img.victoria-tntt.workers.dev/img/_review/trieu-phuc/r19/c06_sheet21.jpg
- vn: Triều phục: tóc búi gọn hết lên dưới mũ, KHÔNG hoa trên tóc, trang nghiêm.

### S31 · TRIỀU PHỤC shoulders: only the cầu vai
- text: `The shoulders carry ONLY the stiff cầu vai: no capelet, no round cape, no pearl net or beaded yoke, no shawl and no sheer stole over the shoulders or arms.`
- scope: trieu1-6
- confirm: -
- ages: all
- store: no
- luot: 397 item 2, 400 (H2)
- source: dev/art/owner-copy/trieu
- proof: dev/art/owner-copy/trieu/r21/t3_c06_RAN.txt
- picture: triều phục c06 r21 (Lượt 492: t4, t6, t7, t8 OK; t4 cut u5W4dPuQLD, t6 cut N2q8sOD6D9) · https://ctm-img.victoria-tntt.workers.dev/img/_review/trieu-phuc/r19/c06_sheet21.jpg
- vn: Vai chỉ có cầu vai cứng: không áo choàng vai, không lưới ngọc, không khăn choàng.

### S33 · COLOUR RULE a51/a65 (elder: DEEPER, DARKER, rich and dignified = 18/11 Thái hậu copy; J2 Lượt 624)
- text: `COLOUR RULE: all colours in the DEEPER, DARKER mature shades described above (rich and dignified, never bright, never pastel, never dusty or washed-out); the colour names and hex values below are her young colours, darken them as described above;`
- scope: tp1-8 pr1-8 nude
- confirm: -
- ages: a51 a65
- store: yes
- luot: J2 (owner Lượt 620/622/624: copy the 18/11 Thái hậu elder text verbatim, dev/art/elder-copy/THAIHAU_1811_AGE_COLOUR.md); A0 a51/a65 age texts (c04 elder sheet)
- source: dev/art/t8-prompt-B/build.py AGE_TXT
- proof: dev/art/approved/proof/bw5_elder_m05_t2_a51.txt
- picture: Lượt 395 store sheets, approved Lượt 397 'vẽ rất là đẹp' · https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg
- vn: Tuổi 51/65: mọi màu là sắc ĐẬM HƠN, TỐI HƠN, sang trọng điềm tĩnh như Thái hậu 18/11 (không rực, không pastel, không bạc màu); tên màu + mã hex là màu trẻ, làm đậm như câu tuổi.

### S34 · FOREHEAD: nothing on the forehead (D9)
- text: `NOTHING on the forehead (no hoa điền, no dot, no mark, nothing).`
- scope: any
- confirm: -
- ages: all
- store: yes
- luot: 529 (ART_RULES D9, owner via ROOT-49 chat Lượt 521)
- source: owner words, ART_RULES D9 (dev/art/ART_RULES.md); builders: t8-prompt-B/build.py D9_FOREHEAD, build_npc.py, emperor-B/build.py
- proof: dev/art/t8-prompt-B/build.py
- picture: - (owner order, not a picture verdict)
- vn: Trán KHÔNG có gì (không hoa điền, không chấm, không dấu, không gì cả).

### S35 · NO hair flowers on cung nữ / nữ quan (K15)
- text: `NO flowers in the hair (no fresh or silk flowers), only her hairpins.`
- scope: tm1-2 tm4
- confirm: -
- ages: all
- store: yes
- luot: 520 (K15; ROOT-50 19/11 18:24Z: copy into tm1/tm2 + nữ quan)
- source: dev/art/t8-prompt-B/build.py build_mama --noflower (MMX3, ROOT-50 ruling A)
- proof: dev/art/t8-prompt-B/build.py
- picture: - (owner order Lượt 520)
- vn: Cung nữ, nữ quan: KHÔNG cài hoa trên tóc (không hoa tươi, không hoa lụa), chỉ trâm.

### S32 · MA MA two front panels (hai tà)
- text: `a short front layer made of TWO separate long embroidered front panels (hai tà, never one single panel), one hanging down each side of the front from the waist, each with a gold-edged border, the centre front of the skirt showing between them`
- scope: mama
- confirm: -
- ages: all
- store: no
- luot: 229, 397 (K1)
- source: dev/art/t8-prompt-B/build.py --state mama
- proof: dev/handover/reports/mama-specs/c06-a36.oneref.prompt.txt
- picture: ma ma m01 a36 (Lượt 395/397 OK) · gen s7I4kzhl8e · cut O6E2U81ynm · https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_mama_m01.jpg
- vn: Ma ma: phía trước có HAI tà dài riêng (không phải một tà), viền vàng, lộ giữa váy.

## BANNED phrases (X)

`negation: yes` = a match inside a clause that says no/never/not (e.g. 'never looking down') is ignored. `unless` = allowed when that S entry is present.

### X01 · secondary colour 'only in the inner robe'
- regex: `only in the inner robe`
- scope: all
- unless: -
- negation: yes
- luot: 483
- why: 12c: the secondary colour must show in LARGE areas, never only inside

### X02 · secondary 'in the inner robe and linings' with no TWO-COLOUR RULE
- regex: `in the inner robe and linings`
- scope: tp1-6 pr1-6 mama
- unless: S01
- negation: no
- luot: 483, 489, 499
- why: the old store clause that lost the secondary colour; allowed only together with S01

### X05 · shawl / stole / sash / ribbon in the POSE at t7, t8, Nữ đế
- regex: `Pose:[^.]*\b(stole|ribbon|sash|shawl)\b`
- scope: tp7-8 pr7-8 nude
- unless: -
- negation: no
- luot: 486
- why: no shawl-like drape on t7/t8 (m13 t8 'a breeze lifts her long stole')

### X06 · phi bạch / draped shawl on t7, t8, Nữ đế, triều phục
- regex: `phi bạch|PHI BẠCH|sheer silk shawl|shawl draped|draped shawl|long silk stole`
- scope: tp7-8 pr7-8 nude trieu1-8
- unless: -
- negation: yes
- luot: 397, 412, 486 (G4)
- why: phi bạch only on thường phục t1-t6

### X07 · 'looking down'
- regex: `looking down|looks down|gazing down`
- scope: all
- unless: -
- negation: yes
- luot: D3d
- why: head up, never looking down (negated 'never looking down' is fine)

### X08 · phoenix at t1-t6
- regex: `phoenix(?!-like)`
- scope: tp1-6 pr1-6 trieu1-6
- unless: -
- negation: yes
- luot: 18/11 4d, I1, I3
- why: phoenix only at t7/t8 (negated 'no phoenix' is fine)

### X09 · royal / imperial (deep) yellow at t1-t5 — pale yellow allowed (Lượt 518)
- regex: `(?<!pale )(?:royal yellow|imperial yellow|golden yellow)(?! becomes)`
- scope: tp1-5 pr1-5 trieu1-5
- unless: -
- negation: yes
- luot: 446, 450, 518 (I1)
- why: t1-t5 no yellow

### X10 · 'short jacket' (maid look)
- regex: `short jacket`
- scope: tp1-8 pr1-8
- unless: -
- negation: yes
- luot: 344, 271, 280 (G7)
- why: length lock: never a hip-short jacket

### X11 · teeth / open mouth
- regex: `\bteeth\b|open[- ]mouth|mouth open|\bgrin`
- scope: all
- unless: -
- negation: yes
- luot: 18/11 16:37Z (D4)
- why: closed-lip smile only

### X12 · flowers in the hair at t7, t8, Nữ đế, triều phục
- regex: `fresh flower|hair flower|flower in (?:her|the) hair|flowers in (?:her|the) hair`
- scope: tp7-8 pr7-8 nude trieu1-8
- unless: -
- negation: yes
- luot: 323, 331, 411 (F2, H8)
- why: flowers only t1-t6 thường phục

### X14 · hair flowers on a ma ma (K15)
- regex: `tucked beside the bun|hair flower|fresh flower|flowers? in (?:her|the) hair`
- scope: mama tm0-4
- unless: -
- negation: yes
- luot: 520 (K15; ROOT-50 ruling A, MMX3); 529 scope widened to cung nữ/nữ quan tm0-tm4 (ROOT-50)
- why: ma ma, cung nữ, nữ quan wear NO hair flowers; only consorts

### X13 · style image sentence (style image retired)
- regex: `drawing style of image \d|Image \d is only for the drawing style`
- scope: all
- unless: -
- negation: no
- luot: 482 (B8)
- why: existing people: own picture only, no style image

### X14 · princess 'eight heads tall' / 'long legs'
- regex: `eight heads|long legs`
- scope: pr1-8
- unless: -
- negation: no
- luot: 273 (C7)
- why: princesses never reed-thin

### X03 · phi bạch colour gold/yellow below t6
- slot: S12.colour
- regex: `gold|yellow|amber|honey|saffron|mustard|ochre`
- scope: tp1-5 pr1-5
- luot: 483, 486 (G4)
- why: phi bạch never gold/yellow below t6
