#!/usr/bin/env python3
"""STORE GATE (owner Lượt 371/373/375) + APPROVED SENTENCES (owner Lượt 500, folded in here Lượt 504: ONE gate, ONE source of truth).
Part 1 STORE: a prompt may only ADD sentences to the store text, never drop or rewrite one.
  store_args = the build.py arguments of the store prompt for that person/rank, e.g.  c20 v0 --low 1   |  c20 v0 --t7  |  c20 v0
  Slot words (face, colours, motif, item, flower, hair-ref) are allowed to differ: a store sentence passes if it is present verbatim,
  or (for a slot sentence) if >=90 % of its words are present in one prompt sentence.
Part 2 APPROVED: the owner-approved sentences of the prompt's scope (table APPROVED below) must be present VERBATIM (only {slot} words differ)
  and the BANNED phrases absent. LAW #0 (Lượt 505): only what the OWNER approved/raised is in these tables.
Part 3 BANNED REFS (owner Lượt 554/555): the prompt text or --refs id,id,... must not name an old khuê các set-A key/id (dev/art/KC_BANNED_REFS.json).
Usage
  python3 dev/art/check_store.py <prompt_file> <store_args...> [--refs id,id]                     # both parts (scope from the args / prompt)
  python3 dev/art/check_store.py <prompt_file> --scope tpN|prN|trieuN|mama|nude [--age aNN]   # approved part only (no store args)
  python3 dev/art/check_store.py --self | --audit | --registry-md
Exit 1 = FAIL -> do NOT generate. Ledger lines carry "store_check":"PASS" and "approved_check":"PASS"."""
import subprocess,sys,re,os,glob,collections
ART=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.dirname(os.path.dirname(ART))
NEG=re.compile(r"\b(no|not|never|without|nothing|none|nor)\b", re.I)

# ---------------- APPROVED / BANNED tables (source of truth; APPROVED_SENTENCES.md is generated from these) ----------------
APPROVED = [{'id': 'S01',
  'title': 'TWO-COLOUR RULE (hai màu)',
  'text': 'TWO-COLOUR RULE: the whole outfit uses EXACTLY TWO colours that clearly interact: the MAIN colour {main} and the SECONDARY colour {secondary}, the secondary clearly visible in large areas '
          '(inner robe or skirt, wide borders, sash, cuffs, linings), never a single flat colour all over; gold or silver only as thin accents, never a third colour.',
  'scope': 'tp1-6 pr1-6 mama',
  'confirm': 'nude trieu1-8',
  'ages': '',
  'luot': '489, 499 (ART_RULES B15); 529 (G14: t7/t8 blocking)',
  'source': 'dev/art/owner-copy/pr_cl_t2_V2.txt (Cao Ly V2, owner Lượt 301-303)',
  'proof': 'dev/art/owner-copy/pr_cl_t2_V2.txt',
  'picture': 'Cao Ly V2 t2 (Lượt 301-303) · gen Lw8y0mCswO · cut 79f3BGcJAL (ledger :288) · NO file on CDN/repo (sent in chat only) — ART_RULES B15 lists xSByOSyjfW/yiuGA83PW9/cpS8oJg0eP, but the '
             'ledger (:509/510/518) says those are the later Cao Ly t4/t5/t6 store pictures',
  'vn': 'Cả bộ đồ đúng HAI màu: màu chính + màu phụ, màu phụ thấy rõ ở mảng lớn (váy trong, viền rộng, đai, cổ tay, lót); vàng/bạc chỉ viền mảnh.',
  'store': False},
 {'id': 'S02',
  'title': 'COLOUR RULE tone (B18: clear soft colours, model = foreign princesses nc1-nc3) t1-t6',
  'text': 'COLOUR RULE: all colours clear, soft and gentle at a medium-light tone, like fine silk in soft daylight: medium-soft saturation, pretty and clean, the secondary colour a real pretty colour '
          '(it may be a little deeper or a soft ivory, never heavy, never black, never grey), never rực, never glaring, never neon, never pastel-washed or faded, never dusty, grey, muddy or black;',
  'scope': 'tp1-6 pr1-6',
  'confirm': '',
  'ages': 'a18 a26 a36',
  'luot': '301-303, B14; text B18 Lượt 586/590/592 (BW4)',
  'source': 'ART_RULES B18 (owner Lượt 592) -> t8-prompt-B/build.py LOW_TONE (was owner-copy/pr_cl_t2_V2.txt)',
  'proof': 'dev/art/approved/proof/bw4_b18_m13_t2_a26.txt',
  'picture': 'Cao Ly V2 t2 (Lượt 301-303) · gen Lw8y0mCswO · cut 79f3BGcJAL (ledger :288) · NO file on CDN/repo (sent in chat only) — ART_RULES B15 lists xSByOSyjfW/yiuGA83PW9/cpS8oJg0eP, but the '
             'ledger (:509/510/518) says those are the later Cao Ly t4/t5/t6 store pictures · the same sentence is in the store prompts of the Lượt 395 store sheets, approved Lượt 397: '
             'https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg',
  'vn': 'Mọi màu cùng MỘT độ đậm vừa (như áo đỏ san hô/đỏ gạch của game): không rực, không neon, không nhạt bệch, không xám đục, không đen.',
  'store': True},
 {'id': 'S03',
  'title': 'COLOUR RULE tone t7/t8/Nữ đế (B18, same words as S02; was prompt B "fresh, clear and luminous")',
  'text': 'COLOUR RULE: all colours clear, soft and gentle at a medium-light tone, like fine silk in soft daylight: medium-soft saturation, pretty and clean, the secondary colour a real pretty colour '
          '(it may be a little deeper or a soft ivory, never heavy, never black, never grey), never rực, never glaring, never neon, never pastel-washed or faded, never dusty, grey, muddy or black;',
  'scope': 'tp7-8 pr7-8 nude',
  'confirm': '',
  'ages': 'a18 a26 a36',
  'luot': '18/11 4c0 (t8 PROMPT B FROZEN); B17/B18 Lượt 583/592 (BW3/BW4)',
  'source': 'dev/art/t8-prompt-B/build.py (prompt B)',
  'proof': 'dev/art/approved/proof/bw4_b18_m13_t8_a26.txt',
  'picture': "t8 Hoàng hậu prompt B (18/11 ~18:20Z 'Prompt này rất là ok') · c25 a18 t8 v0 · https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/c25_a18_t8_v0.png",
  'vn': 'Hoàng quý phi / Hoàng hậu / Nữ đế: cùng câu tông màu B18 với t1-t6 (màu trong, mềm, dịu, không rực, không nhạt bệch, không xám).',
  'store': True},
 {'id': 'S04',
  'title': 'EMBROIDERY stitched into the cloth (thêu trực tiếp)',
  'text': 'All flowers, birds and {motif} are fine silk-thread embroidery stitched directly into the fabric, flat and integrated with the cloth, following its folds, not appliqué, not pasted '
          'patches, not raised.',
  'scope': 'tp1-8 pr1-8 nude trieu1-8',
  'confirm': '',
  'ages': '',
  'luot': '18/11 07:45Z (G9)',
  'source': 'dev/art/owner-copy/pr_cl_t2_V2.txt = store',
  'proof': 'dev/art/owner-copy/pr_cl_t2_V2.txt',
  'picture': 'Cao Ly V2 t2 (Lượt 301-303) · gen Lw8y0mCswO · cut 79f3BGcJAL (ledger :288) · NO file on CDN/repo (sent in chat only) — ART_RULES B15 lists xSByOSyjfW/yiuGA83PW9/cpS8oJg0eP, but the '
             'ledger (:509/510/518) says those are the later Cao Ly t4/t5/t6 store pictures · the same sentence is in the store prompts of the Lượt 395 store sheets, approved Lượt 397: '
             'https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg',
  'vn': 'Hoa, chim, bướm (phượng/rồng) là chỉ thêu trực tiếp vào vải, phẳng, theo nếp vải; không dán, không nổi.',
  'store': True},
 {'id': 'S05',
  'title': 'NO PHOENIX t1-t6',
  'text': 'No phoenix anywhere on the robe or in the hair: only flowers, birds, butterflies or other motifs.',
  'scope': 'tp1-6 pr1-6 trieu1-6',
  'confirm': '',
  'ages': '',
  'luot': '18/11 4d, I3',
  'source': 'dev/art/owner-copy/pr_cl_t2_V2.txt = store',
  'proof': 'dev/art/owner-copy/pr_cl_t2_V2.txt',
  'picture': 'Cao Ly V2 t2 (Lượt 301-303) · gen Lw8y0mCswO · cut 79f3BGcJAL (ledger :288) · NO file on CDN/repo (sent in chat only) — ART_RULES B15 lists xSByOSyjfW/yiuGA83PW9/cpS8oJg0eP, but the '
             'ledger (:509/510/518) says those are the later Cao Ly t4/t5/t6 store pictures · the same sentence is in the store prompts of the Lượt 395 store sheets, approved Lượt 397: '
             'https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg',
  'vn': 'Bậc 1-6 không có phượng trên áo hay trên tóc: chỉ hoa, chim, bướm.',
  'store': True},
 {'id': 'S06',
  'title': 'STORE FABRIC t1-t3 (LAW #1)',
  'text': 'Light, soft, thin flowing silk: the long sleeves, skirt and sash are supple and airy, drifting softly as in a gentle breeze, with soft natural folds, never stiff, flat or board-like.',
  'scope': 'tp1-3 pr1-3',
  'confirm': '',
  'ages': '',
  'luot': 'LAW #1 Lượt 397 (store gate Lượt 375)',
  'source': 'dev/art/t8-prompt-B/build.py --low 1..3 (store)',
  'proof': 'dev/art/approved/proof/c06_t1_a18.txt',
  'picture': "Lượt 395 store sheets, approved Lượt 397 'vẽ rất là đẹp' · https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg",
  'vn': 'Câu tả vải của KHO (luật số 1): lụa nhẹ, mềm, mỏng, bay; tay áo, váy, đai mềm như gió thổi; không cứng.',
  'store': True},
 {'id': 'S07',
  'title': 'FABRIC prompt B t7/t8/Nữ đế',
  'text': 'FABRIC: thick gold-embroidered brocade with a graceful, flowing drape.',
  'scope': 'tp7-8 pr7-8 nude',
  'confirm': '',
  'ages': '',
  'luot': '364 (B12)',
  'source': 'dev/art/store-all/build_all.py FABRIC_B = prompt B',
  'proof': 'dev/art/approved/proof/c06_t8_a18.txt',
  'picture': "t8 Hoàng hậu prompt B (18/11 ~18:20Z 'Prompt này rất là ok') · c25 a18 t8 v0 · https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/c25_a18_t8_v0.png",
  'vn': 'Hoàng quý phi / Hoàng hậu / Nữ đế: gấm dày thêu kim tuyến, rủ mềm duyên dáng.',
  'store': False},
 {'id': 'S08',
  'title': 'SLEEVE LENGTH t1-t3 (to the knees)',
  'text': 'SLEEVE LENGTH (rank law): very long, wide, flowing sleeves that fall well past her hands and hang down to her KNEES.',
  'scope': 'tp1-3 pr1-3',
  'confirm': '',
  'ages': '',
  'luot': '351, 355 (G5)',
  'source': 'dev/art/store-all/build_all.py sleeve()',
  'proof': 'dev/art/approved/proof/c06_t1_a18.txt',
  'picture': 'Ba Tư t1-t3 store redraw (cuts s7I9PqGl8e / bxMSlav5Y2 / cpS8B2i0eP) · https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg (top row)',
  'vn': 'Bậc 1-3: tay áo rất dài, rộng, bay, rủ qua bàn tay xuống tới ĐẦU GỐI.',
  'store': False},
 {'id': 'S09',
  'title': 'SLEEVE LENGTH t4-t6 (to the ankles)',
  'text': 'SLEEVE LENGTH (rank law): very long, wide, flowing sleeves that hang down to her ANKLES.',
  'scope': 'tp4-6 pr4-6',
  'confirm': '',
  'ages': '',
  'luot': '351, 355 (G5)',
  'source': 'dev/art/store-all/build_all.py sleeve()',
  'proof': 'dev/art/approved/proof/c06_t4_a18.txt',
  'picture': 'Phù Tang t4 curved test (Lượt 412) · gen 5jDiW44Kxe · cut EbYOArVuuO · https://ctm-img.victoria-tntt.workers.dev/img/_review/princess/phutang_t4_curved_vs_old.jpg (right half)',
  'vn': 'Bậc 4-6: tay áo rất dài, rộng, rủ xuống tới MẮT CÁ CHÂN.',
  'store': False},
 {'id': 'S10',
  'title': 'SLEEVE LENGTH t7-t8 (touch the floor)',
  'text': 'SLEEVE LENGTH (rank law): very long, very wide sleeves that hang down past her ankles until they touch the floor.',
  'scope': 'tp7-8 pr7-8',
  'confirm': '',
  'ages': '',
  'luot': '351, 355 (G5)',
  'source': 'dev/art/store-all/build_all.py sleeve()',
  'proof': 'dev/art/approved/proof/c06_t8_a18.txt',
  'picture': "t8 Hoàng hậu prompt B (18/11 ~18:20Z 'Prompt này rất là ok') · c25 a18 t8 v0 · https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/c25_a18_t8_v0.png",
  'vn': 'Hoàng quý phi / Hoàng hậu: tay áo rất dài, rất rộng, quá mắt cá chạm sàn.',
  'store': False},
 {'id': 'S11',
  'title': 'ONE SINGLE SLEEVE LAYER',
  'text': 'ONE SINGLE SLEEVE LAYER: each sleeve begins at the shoulder and falls in one piece; NO shorter outer sleeve, NO half-sleeve or elbow-length layer, NO short jacket sleeve or cuff layer '
          'visible on top of it.',
  'scope': 'tp1-8 pr1-8',
  'confirm': '',
  'ages': '',
  'luot': '331, 353 (G6)',
  'source': 'dev/art/store-all/build_all.py ONE_LAYER',
  'proof': 'dev/art/approved/proof/c06_t1_a18.txt',
  'picture': 'Ba Tư t1-t3 store redraw (cuts s7I9PqGl8e / bxMSlav5Y2 / cpS8B2i0eP) · https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg (top row)',
  'vn': 'Chỉ MỘT lớp tay áo, rủ một mảnh từ vai; không tay ngắn chồng lên tay dài.',
  'store': False},
 {'id': 'S12',
  'title': 'PHI BẠCH (khăn choàng) t1-t6',
  'text': 'PHI BẠCH: {intro} is a very sheer, highly translucent gauze shawl in {colour} (her secondary colour, clearly different from her main robe colour {main}) — the robe, sleeves and arms are clearly visible through it, so it reads as a light airy veil of that hue, never an opaque solid band of colour; it keeps its soft graceful drape.',
  'scope': 'tp1-6 pr1-6',
  'confirm': '',
  'ages': '',
  'luot': '397, 412, 434, 469, 483, 486 (G4); F12 Lượt 601 (BW4: very sheer, translucent)',
  'source': 'dev/art/store-all/build_all.py phi_bach()',
  'proof': 'dev/art/approved/proof/bw4_f12_m13_t2_a26.txt',
  'picture': 'Phù Tang t4 curved test (Lượt 412) · gen 5jDiW44Kxe · cut EbYOArVuuO · https://ctm-img.victoria-tntt.workers.dev/img/_review/princess/phutang_t4_curved_vs_old.jpg (right half)',
  'vn': 'Khăn phi bạch choàng sau lưng, qua tay, màu KHÁC hẳn màu áo (màu phụ), không lẫn vào áo; chỉ bậc 1-6.',
  'store': False},
 {'id': 'S13',
  'title': 'CAPELET CUT t4 Tần (curved, opens gradually)',
  'text': 'CAPELET CUT (flowing): the capelet stays the same short round shoulder capelet, but its lower edge and the collar lines are soft CURVES, never flat horizontal edges; the lower edge is '
          '{shape}; the front is NOT closed or buttoned from top to bottom: the robe is closed only at the throat clasp and its front opens gradually from the collar downward in a long soft V, the '
          'two front panels parting more and more toward the hem, flowing and graceful (uyển chuyển), never cramped or boxy.',
  'scope': 'tp4 pr4',
  'confirm': '',
  'ages': '',
  'luot': '397 item 5, 412 (G1)',
  'source': 'dev/art/store-all/build_all.py capelet_cut()',
  'proof': 'dev/art/approved/proof/c06_t4_a18.txt',
  'picture': 'Phù Tang t4 curved test (Lượt 412) · gen 5jDiW44Kxe · cut EbYOArVuuO · https://ctm-img.victoria-tntt.workers.dev/img/_review/princess/phutang_t4_curved_vs_old.jpg (right half)',
  'vn': 'Áo choàng vai Tần: đường cắt CONG (hình cong đổi theo người), vạt trước mở dần từ cổ xuống, không cài kín.',
  'store': False},
 {'id': 'S14',
  'title': 'HOÀNG QUÝ PHI LUXURY t7',
  'text': 'HOÀNG QUÝ PHI LUXURY: richer than every lower rank: more jewels on the phoenix crown (rubies, sapphires, pearls and jade), a layered pearl-and-gold necklace, pearl and jade trims along '
          'the cape edges, and long jade-and-gold belt pendants with pearl tassels; still clearly simpler and less golden than the Empress.',
  'scope': 'tp7 pr7',
  'confirm': '',
  'ages': '',
  'luot': '486 (G12)',
  'source': 'dev/art/store-all/build_all.py HQP_LUX',
  'proof': 'dev/art/approved/proof/c06_t7_a18.txt',
  'picture': 'HQP c20 pearls (skin) · gen 0eUXPSZTfW · cut xSBwv6vjfW · https://ctm-img.victoria-tntt.workers.dev/img/_keep/skins-1119/c20_hqp_pearls.png',
  'vn': 'Hoàng quý phi: nhiều ngọc, trân châu, ngọc bích, vàng hơn bậc dưới, vẫn kém Hoàng hậu.',
  'store': False},
 {'id': 'S15',
  'title': 'HELD ITEM COLOUR (món cầm khác màu)',
  'text': 'HELD ITEM COLOUR: the held item and any embroidery, painting or tassel on it are in a colour family clearly different from BOTH her robe colour {main} and her secondary colour '
          '{secondary}.',
  'scope': 'tp1-8 pr1-8',
  'confirm': '',
  'ages': '',
  'luot': '486 (B16)',
  'source': 'dev/art/store-all/build_all.py item_colour()',
  'proof': 'dev/art/approved/proof/c06_t1_a18.txt',
  'picture': "m13 + m20 8-rank angle sets (Lượt 486 'lively t1-t5 / calm t6-t8') · https://ctm-img.victoria-tntt.workers.dev/img/_review/rank-test/m13_8rank_angles.jpg",
  'vn': 'Món cầm tay và hoa văn/tua của nó khác họ màu với CẢ màu chính và màu phụ của áo.',
  'store': False},
 {'id': 'S16',
  'title': 'POSE TAIL (head up, never looking down)',
  'text': 'The item is in a contrasting colour, not the robe colour, and the hand really grips it; the whole face fully visible with the head up toward the viewer, eyes open, lips closed, never '
          'looking down, nothing covering the face.',
  'scope': 'tp1-8 pr1-8',
  'confirm': '',
  'ages': '',
  'luot': 'D3d, 18/11',
  'source': 'dev/art/t8-prompt-B/build.py (store pose tail)',
  'proof': 'dev/art/approved/proof/c06_t1_a18.txt',
  'picture': 'Cao Ly V2 t2 (Lượt 301-303) · gen Lw8y0mCswO · cut 79f3BGcJAL (ledger :288) · NO file on CDN/repo (sent in chat only) — ART_RULES B15 lists xSByOSyjfW/yiuGA83PW9/cpS8oJg0eP, but the '
             'ledger (:509/510/518) says those are the later Cao Ly t4/t5/t6 store pictures · the same sentence is in the store prompts of the Lượt 395 store sheets, approved Lượt 397: '
             'https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg',
  'vn': 'Món cầm khác màu áo, tay cầm thật; cả mặt thấy rõ, ngẩng đầu nhìn người xem, mắt mở, môi khép, KHÔNG cúi nhìn xuống.',
  'store': True},
 {'id': 'S17',
  'title': 'HANDS TAIL (ma ma / triều phục)',
  'text': 'Her hands interact naturally with the item (gently presenting, turning or touching it), lively and natural, while her head stays up facing the viewer, eyes open, lips closed, never '
          'looking down.',
  'scope': 'mama nude trieu1-8',
  'confirm': '',
  'ages': '',
  'luot': 'D3d, 18/11',
  'source': 'dev/art/t8-prompt-B/build.py (state/court pose tail)',
  'proof': 'dev/handover/reports/mama-specs/c06-a36.oneref.prompt.txt',
  'picture': 'ma ma m01 a36 (Lượt 395/397 OK) · gen s7I4kzhl8e · cut O6E2U81ynm · https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_mama_m01.jpg',
  'vn': 'Tay tương tác tự nhiên với món cầm; đầu ngẩng nhìn người xem, mắt mở, môi khép, không cúi xuống.',
  'store': False},
 {'id': 'S18',
  'title': 'SMILE closed lips (cười mỉm, không hở răng)',
  'text': 'a bright closed-lip smile, lips closed, no teeth, mouth never open',
  'scope': 'all',
  'confirm': '',
  'ages': '',
  'luot': '18/11 16:37Z (D4)',
  'source': 'dev/art/owner-copy/pr_cl_t2_V2.txt = store style line',
  'proof': 'dev/art/owner-copy/pr_cl_t2_V2.txt',
  'picture': 'Cao Ly V2 t2 (Lượt 301-303) · gen Lw8y0mCswO · cut 79f3BGcJAL (ledger :288) · NO file on CDN/repo (sent in chat only) — ART_RULES B15 lists xSByOSyjfW/yiuGA83PW9/cpS8oJg0eP, but the '
             'ledger (:509/510/518) says those are the later Cao Ly t4/t5/t6 store pictures · the same sentence is in the store prompts of the Lượt 395 store sheets, approved Lượt 397: '
             'https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg',
  'vn': 'Mọi người cười mỉm tươi, môi khép, không hở răng, không mở miệng.',
  'store': True},
 {'id': 'S19',
  'title': 'SKIN / FOREHEAD / FEET tail',
  'text': 'Luminous smooth porcelain skin, bare clean forehead with no forehead mark and no flower mark, eyes open, floor-length robe with slippers visible, no train, no cup, nothing covering the '
          'face.',
  'scope': 'all',
  'confirm': '',
  'ages': '',
  'luot': '18/11 23:25Z (D9, D10)',
  'source': 'dev/art/owner-copy/pr_cl_t2_V2.txt = store',
  'proof': 'dev/art/owner-copy/pr_cl_t2_V2.txt',
  'picture': 'Cao Ly V2 t2 (Lượt 301-303) · gen Lw8y0mCswO · cut 79f3BGcJAL (ledger :288) · NO file on CDN/repo (sent in chat only) — ART_RULES B15 lists xSByOSyjfW/yiuGA83PW9/cpS8oJg0eP, but the '
             'ledger (:509/510/518) says those are the later Cao Ly t4/t5/t6 store pictures · the same sentence is in the store prompts of the Lượt 395 store sheets, approved Lượt 397: '
             'https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg',
  'vn': 'Da sáng mịn; trán trơn, không hoa điền; mắt mở; áo dài chạm sàn thấy giày; không đuôi áo, không chén; không che mặt.',
  'store': True},
 {'id': 'S20',
  'title': 'HAIR loose t1-t3',
  'text': 'HAIR (rank law): her hair stays LOOSE and flowing like her young-lady picture: at most the top half gathered up, most of her hair hanging loose down her back.',
  'scope': 'tp1-3 pr1-3',
  'confirm': '',
  'ages': 'a18 a26',   # F11 (owner Lượt 583): loose hair ONLY at a18/a26
  'luot': '337 (F1)',
  'source': 'dev/art/store-all/build_all.py HAIR_LOW',
  'proof': 'dev/art/approved/proof/c06_t1_a18.txt',
  'picture': 'Ba Tư t1-t3 store redraw (cuts s7I9PqGl8e / bxMSlav5Y2 / cpS8B2i0eP) · https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg (top row)',
  'vn': 'Bậc 1-3: tóc xõa, tối đa búi nửa trên, phần lớn tóc buông sau lưng.',
  'store': False},
 {'id': 'S21',
  'title': 'HAIR up t4-t8',
  'text': 'HAIR (rank law): ALL her hair is swept UP into a high bun / chignon, nothing loose hanging down her back.',
  'scope': 'tp4-8 pr4-8',
  'confirm': '',
  'ages': '',
  'luot': '337 (F1)',
  'source': 'dev/art/store-all/build_all.py HAIR_HIGH',
  'proof': 'dev/art/approved/proof/c06_t4_a18.txt',
  'picture': 'Phù Tang t4 curved test (Lượt 412) · gen 5jDiW44Kxe · cut EbYOArVuuO · https://ctm-img.victoria-tntt.workers.dev/img/_review/princess/phutang_t4_curved_vs_old.jpg (right half)',
  'vn': 'Bậc 4-8: toàn bộ tóc búi cao, không sợi nào buông sau lưng.',
  'store': False},
 {'id': 'S22',
  'title': 'NO hair flowers t7-t8',
  'text': 'NO flowers in the hair or on the crown at this rank (flowers only at ranks 1 to 6).',
  'scope': 'tp7-8 pr7-8',
  'confirm': '',
  'ages': '',
  'luot': '323, 331 (F2)',
  'source': 'dev/art/store-all/build_all.py NOFLOWER',
  'proof': 'dev/art/approved/proof/c06_t8_a18.txt',
  'picture': "t8 Hoàng hậu prompt B (18/11 ~18:20Z 'Prompt này rất là ok') · c25 a18 t8 v0 · https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/c25_a18_t8_v0.png",
  'vn': 'Hoàng quý phi / Hoàng hậu: không cài hoa trên tóc hay mũ.',
  'store': False},
 {'id': 'S23',
  'title': 'HEAD AND BODY turn together',
  'text': 'HEAD AND BODY: her head turns together with her shoulders and body in the same direction with natural anatomy, never a frontal head on a turned body.',
  'scope': 'tp1-8 pr1-8',
  'confirm': '',
  'ages': '',
  'luot': '326 (D7)',
  'source': 'dev/art/store-all/build_all.py HEADBODY',
  'proof': 'dev/art/approved/proof/c06_t1_a18.txt',
  'picture': "m13 + m20 8-rank angle sets (Lượt 486 'lively t1-t5 / calm t6-t8') · https://ctm-img.victoria-tntt.workers.dev/img/_review/rank-test/m13_8rank_angles.jpg",
  'vn': 'Đầu xoay cùng hướng với vai và thân, không mặt thẳng trên thân nghiêng.',
  'store': False},
 {'id': 'S24',
  'title': 'HAIRPINS point up/back',
  'text': 'Every hairpin is inserted into the hair pointing upward or backward with dangles hanging down, no hairpin horizontal or sticking out to the side.',
  'scope': 'tp1-8 pr1-2 pr4-8 mama nude trieu1-8',
  'confirm': '',
  'ages': '',
  'luot': 'B 18/11 (F5)',
  'source': 'dev/art/t8-prompt-B/build.py (store)',
  'proof': 'dev/art/approved/proof/c06_t1_a18.txt',
  'picture': "Lượt 395 store sheets, approved Lượt 397 'vẽ rất là đẹp' · https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg",
  'vn': 'Mọi cây trâm cắm hướng lên/ra sau, tua rủ xuống; không trâm nằm ngang chĩa ra hai bên (trừ binyeo Cao Ly).',
  'store': True},
 {'id': 'S25',
  'title': 'TRIỀU PHỤC hà bí shared block (t1-t6)',
  'text': 'The TWO VERTICAL RANK-COLOUR BANDS are the hà bí (霞帔) worn as in the Song–Ming dynasties, the SAME on every rank: two long straight bands of the same width (about a hand wide), the same '
          'shape and the same thin gold-thread edge, in {colour}, a strong, saturated colour so the rank reads at a glance, never pastel, never muted, embroidered along their whole length with '
          '{pattern}; they come from behind the neck over the shoulders and hang straight down the front of the robe to her ANKLES, where their two tips meet and join into ONE point at ankle height, '
          'the same height on every rank; from that point hangs ONE palm-sized bí trụy (帔坠) pendant: {pendant}, hanging at ankle level (NOT on the floor), and below the pendant hangs a small, soft '
          'silk tassel, short and graceful.',
  'scope': 'trieu1-6',
  'confirm': '',
  'ages': '',
  'luot': '400-410, 452, 459 (H3)',
  'source': 'dev/art/owner-copy/trieu/r21 (build_r21.py)',
  'proof': 'dev/art/owner-copy/trieu/r21/t3_c06_RAN.txt',
  'picture': 'triều phục c06 r21 (Lượt 492: t4, t6, t7, t8 OK; t4 cut u5W4dPuQLD, t6 cut N2q8sOD6D9) · https://ctm-img.victoria-tntt.workers.dev/img/_review/trieu-phuc/r19/c06_sheet21.jpg',
  'vn': 'Triều phục: hai dải hà bí cùng rộng, cùng dáng, viền kim tuyến, màu bậc đậm; từ sau cổ qua vai rủ thẳng xuống MẮT CÁ, hai đầu nối thành một điểm, treo MỘT bí trụy cỡ lòng bàn tay + tua lụa '
        'nhỏ.',
  'store': False},
 {'id': 'S26',
  'title': 'TRIỀU PHỤC cầu vai on top of hà bí',
  'text': 'The stiff shoulder piece (cầu vai) lies ON TOP of the hà bí bands at the shoulders and covers them there; the bands appear from under the shoulder piece.',
  'scope': 'trieu1-6',
  'confirm': '',
  'ages': '',
  'luot': '452 (H3)',
  'source': 'dev/art/owner-copy/trieu/r21',
  'proof': 'dev/art/owner-copy/trieu/r21/t3_c06_RAN.txt',
  'picture': 'triều phục c06 r21 (Lượt 492: t4, t6, t7, t8 OK; t4 cut u5W4dPuQLD, t6 cut N2q8sOD6D9) · https://ctm-img.victoria-tntt.workers.dev/img/_review/trieu-phuc/r19/c06_sheet21.jpg',
  'vn': 'Cầu vai cứng nằm TRÊN dải hà bí ở vai, hà bí lộ ra từ dưới cầu vai.',
  'store': False},
 {'id': 'S27',
  'title': 'TRIỀU PHỤC cuff bands = hà bí colour',
  'text': 'The cuff bands at the ends of the sleeves are in the SAME colour as the hà bí ({colour}) and are embroidered with the same {pattern}.',
  'scope': 'trieu1-6',
  'confirm': '',
  'ages': '',
  'luot': '468 (H6)',
  'source': 'dev/art/owner-copy/trieu/r21/build_r21.py CUFF',
  'proof': 'dev/art/owner-copy/trieu/r21/t3_c06_RAN.txt',
  'picture': 'triều phục c06 r21 (Lượt 492: t4, t6, t7, t8 OK; t4 cut u5W4dPuQLD, t6 cut N2q8sOD6D9) · https://ctm-img.victoria-tntt.workers.dev/img/_review/trieu-phuc/r19/c06_sheet21.jpg',
  'vn': 'Viền cổ tay áo cùng màu hà bí, thêu cùng hoa văn hà bí.',
  'store': False},
 {'id': 'S28',
  'title': 'TRIỀU PHỤC brocade (same in all 8 ranks)',
  'text': 'FABRIC OF THIS COURT ROBE: the robe and sleeves are rich silk BROCADE (gấm) with a woven pattern, flowing as brocade flows, the same brocade on every rank, never thin, limp or flimsy.',
  'scope': 'trieu1-8',
  'confirm': '',
  'ages': '',
  'luot': '444 (H2)',
  'source': 'dev/art/owner-copy/trieu (r17+)',
  'proof': 'dev/art/owner-copy/trieu/r21/t3_c06_RAN.txt',
  'picture': 'triều phục c06 r21 (Lượt 492: t4, t6, t7, t8 OK; t4 cut u5W4dPuQLD, t6 cut N2q8sOD6D9) · https://ctm-img.victoria-tntt.workers.dev/img/_review/trieu-phuc/r19/c06_sheet21.jpg',
  'vn': 'Triều phục: áo và tay bằng GẤM dệt hoa, rủ như gấm, cùng một câu gấm ở cả 8 bậc.',
  'store': False},
 {'id': 'S29',
  'title': 'TRIỀU PHỤC sleeves to the ankles (t1-t6)',
  'text': 'SLEEVES: the wide sleeves of the outer robe are very long and hang all the way down to her ANKLES, one single sleeve layer, flowing softly, never stiff.',
  'scope': 'trieu1-6',
  'confirm': '',
  'ages': '',
  'luot': '455 (H3)',
  'source': 'dev/art/owner-copy/trieu',
  'proof': 'dev/art/owner-copy/trieu/r21/t3_c06_RAN.txt',
  'picture': 'triều phục c06 r21 (Lượt 492: t4, t6, t7, t8 OK; t4 cut u5W4dPuQLD, t6 cut N2q8sOD6D9) · https://ctm-img.victoria-tntt.workers.dev/img/_review/trieu-phuc/r19/c06_sheet21.jpg',
  'vn': 'Triều phục bậc 1-6: tay áo rộng, rất dài, tới mắt cá, một lớp.',
  'store': False},
 {'id': 'S30',
  'title': 'TRIỀU PHỤC hair fully up, no flowers',
  'text': 'HAIR FULLY UP for this court robe: ALL of her hair is swept up into a neat high bun (updo) under the crown, nothing hanging loose down her back or over her shoulders; NO flowers in the '
          'hair (no fresh or silk flowers), only the crown and gold-and-jewel hairpins, solemn.',
  'scope': 'trieu1-8',
  'confirm': '',
  'ages': '',
  'luot': '411 (H8)',
  'source': 'dev/art/owner-copy/trieu',
  'proof': 'dev/art/owner-copy/trieu/r21/t3_c06_RAN.txt',
  'picture': 'triều phục c06 r21 (Lượt 492: t4, t6, t7, t8 OK; t4 cut u5W4dPuQLD, t6 cut N2q8sOD6D9) · https://ctm-img.victoria-tntt.workers.dev/img/_review/trieu-phuc/r19/c06_sheet21.jpg',
  'vn': 'Triều phục: tóc búi gọn hết lên dưới mũ, KHÔNG hoa trên tóc, trang nghiêm.',
  'store': False},
 {'id': 'S31',
  'title': 'TRIỀU PHỤC shoulders: only the cầu vai',
  'text': 'The shoulders carry ONLY the stiff cầu vai: no capelet, no round cape, no pearl net or beaded yoke, no shawl and no sheer stole over the shoulders or arms.',
  'scope': 'trieu1-6',
  'confirm': '',
  'ages': '',
  'luot': '397 item 2, 400 (H2)',
  'source': 'dev/art/owner-copy/trieu',
  'proof': 'dev/art/owner-copy/trieu/r21/t3_c06_RAN.txt',
  'picture': 'triều phục c06 r21 (Lượt 492: t4, t6, t7, t8 OK; t4 cut u5W4dPuQLD, t6 cut N2q8sOD6D9) · https://ctm-img.victoria-tntt.workers.dev/img/_review/trieu-phuc/r19/c06_sheet21.jpg',
  'vn': 'Vai chỉ có cầu vai cứng: không áo choàng vai, không lưới ngọc, không khăn choàng.',
  'store': False},
 {'id': 'S33',
  'title': 'COLOUR RULE a51/a65 (elder: DEEPER, DARKER, rich and dignified = 18/11 Thái hậu copy; J2 Lượt 624)',
  'text': 'COLOUR RULE: all colours in the DEEPER, DARKER mature shades described above (rich and dignified, never bright, never pastel, never dusty or washed-out); the colour names and hex values below are her '
          'young colours, darken them as described above;',
  'scope': 'tp1-8 pr1-8',
  'confirm': '',
  'ages': 'a51 a65',
  'luot': 'B23 (owner Lượt 702): NOT for nude (Nữ đế keeps her bright a36 colours, see S35 + X17). J2 (owner Lượt 620/622/624: copy the 18/11 Thái hậu elder text verbatim, dev/art/elder-copy/THAIHAU_1811_AGE_COLOUR.md); A0 a51/a65 age texts (c04 elder sheet)',
  'source': 'dev/art/t8-prompt-B/build.py AGE_TXT',
  'proof': 'dev/art/approved/proof/bw5_elder_m05_t2_a51.txt',
  'picture': "Lượt 395 store sheets, approved Lượt 397 'vẽ rất là đẹp' · https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg",
  'vn': 'Tuổi 51/65: mọi màu là sắc ĐẬM HƠN, TỐI HƠN, sang trọng điềm tĩnh như Thái hậu 18/11 (không rực, không pastel, không bạc màu); tên màu + mã hex là màu trẻ, làm đậm như câu tuổi.',
  'store': True},
 {'id': 'S35',
  'title': 'Nữ đế a51/a65 COLOUR RULE = the a36 one verbatim (B23: never darkens with age)',
  'text': 'COLOUR RULE: all colours clear, soft and gentle at a medium-light tone, like fine silk in soft daylight: medium-soft saturation, pretty and clean, the secondary colour a real pretty colour '
          '(it may be a little deeper or a soft ivory, never heavy, never black, never grey), never rực, never glaring, never neon, never pastel-washed or faded, never dusty, grey, muddy or black; '
          'the royal golden yellow is the DOMINANT colour of the robe, mantle, sleeves and skirt (more than half of everything visible), a deep, quiet wine-crimson like #7E2A33 is the second colour '
          '(collar, inner robe, wide borders and a few panels);',
  'scope': 'nude',
  'confirm': '',
  'ages': 'a51 a65',
  'luot': 'B23 (owner Lượt 702)',
  'source': 'dev/art/nude-B/prompts/m05_a36.txt (COLOUR RULE)',
  'proof': 'dev/art/nude-B/prompts/m05_a36.txt',
  'picture': '',
  'vn': 'Nữ đế 51/65 tuổi giữ màu sáng như ảnh 36 tuổi: câu COLOUR RULE y hệt bản 36 tuổi.',
  'store': False},
 {'id': 'S34',
  'title': 'FOREHEAD: nothing on the forehead (D9)',
  'text': 'NOTHING on the forehead (no hoa điền, no dot, no mark, nothing).',
  'scope': 'any',
  'confirm': '',
  'ages': '',
  'luot': '529 (ART_RULES D9, owner via ROOT-49 chat Lượt 521)',
  'source': 'owner words, ART_RULES D9 (dev/art/ART_RULES.md); builders: t8-prompt-B/build.py D9_FOREHEAD, build_npc.py, emperor-B/build.py',
  'proof': 'dev/art/t8-prompt-B/build.py',
  'picture': '- (owner order, not a picture verdict)',
  'vn': 'Trán KHÔNG có gì (không hoa điền, không chấm, không dấu, không gì cả).',
  'store': True},
 {'id': 'S35',
  'title': 'NO hair flowers on cung nữ / nữ quan (K15)',
  'text': 'NO flowers in the hair (no fresh or silk flowers), only her hairpins.',
  'scope': 'tm1-2 tm4',
  'confirm': '',
  'ages': '',
  'luot': '520 (K15; ROOT-50 19/11 18:24Z: copy into tm1/tm2 + nữ quan)',
  'source': 'dev/art/t8-prompt-B/build.py build_mama --noflower (MMX3, ROOT-50 ruling A)',
  'proof': 'dev/art/t8-prompt-B/build.py',
  'picture': '- (owner order Lượt 520)',
  'vn': 'Cung nữ, nữ quan: KHÔNG cài hoa trên tóc (không hoa tươi, không hoa lụa), chỉ trâm.',
  'store': True},
 {'id': 'S32',
  'title': 'MA MA two front panels (hai tà)',
  'text': 'a short front layer made of TWO separate long embroidered front panels (hai tà, never one single panel), one hanging down each side of the front from the waist, each with a gold-edged '
          'border, the centre front of the skirt showing between them',
  'scope': 'mama',
  'confirm': '',
  'ages': '',
  'luot': '229, 397 (K1)',
  'source': 'dev/art/t8-prompt-B/build.py --state mama',
  'proof': 'dev/handover/reports/mama-specs/c06-a36.oneref.prompt.txt',
  'picture': 'ma ma m01 a36 (Lượt 395/397 OK) · gen s7I4kzhl8e · cut O6E2U81ynm · https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_mama_m01.jpg',
  'vn': 'Ma ma: phía trước có HAI tà dài riêng (không phải một tà), viền vàng, lộ giữa váy.',
  'store': False}]

BANNED = [{'id': 'X01',
  'title': "secondary colour 'only in the inner robe'",
  'regex': 'only in the inner robe',
  'slot': '',
  'scope': 'all',
  'unless': '',
  'negation': 'yes',
  'luot': '483',
  'why': '12c: the secondary colour must show in LARGE areas, never only inside'},
 {'id': 'X02',
  'title': "secondary 'in the inner robe and linings' with no TWO-COLOUR RULE",
  'regex': 'in the inner robe and linings',
  'slot': '',
  'scope': 'tp1-6 pr1-6 mama',
  'unless': 'S01',
  'negation': 'no',
  'luot': '483, 489, 499',
  'why': 'the old store clause that lost the secondary colour; allowed only together with S01'},
 {'id': 'X05',
  'title': 'shawl / stole / sash / ribbon in the POSE at t7, t8, Nữ đế',
  'regex': 'Pose:[^.]*\\b(stole|ribbon|sash|shawl)\\b',
  'slot': '',
  'scope': 'tp7-8 pr7-8 nude',
  'unless': '',
  'negation': 'no',
  'luot': '486',
  'why': "no shawl-like drape on t7/t8 (m13 t8 'a breeze lifts her long stole')"},
 {'id': 'X06',
  'title': 'phi bạch / draped shawl on t7, t8, Nữ đế, triều phục',
  'regex': 'phi bạch|PHI BẠCH|sheer silk shawl|shawl draped|draped shawl|long silk stole',
  'slot': '',
  'scope': 'tp7-8 pr7-8 nude trieu1-8',
  'unless': '',
  'negation': 'yes',
  'luot': '397, 412, 486 (G4)',
  'why': 'phi bạch only on thường phục t1-t6'},
 {'id': 'X07',
  'title': "'looking down'",
  'regex': 'looking down|looks down|gazing down',
  'slot': '',
  'scope': 'all',
  'unless': '',
  'negation': 'yes',
  'luot': 'D3d',
  'why': "head up, never looking down (negated 'never looking down' is fine)"},
 {'id': 'X08',
  'title': 'phoenix at t1-t6',
  'regex': 'phoenix(?!-like)',
  'slot': '',
  'scope': 'tp1-6 pr1-6 trieu1-6',
  'unless': '',
  'negation': 'yes',
  'luot': '18/11 4d, I1, I3',
  'why': "phoenix only at t7/t8 (negated 'no phoenix' is fine)"},
 {'id': 'X09',
  'title': 'royal / imperial (deep) yellow at t1-t5 — pale yellow allowed (Lượt 518)',
  'regex': '(?<!pale )(?:royal yellow|imperial yellow|golden yellow)(?! becomes)',
  'slot': '',
  'scope': 'tp1-5 pr1-5 trieu1-5',
  'unless': '',
  'negation': 'yes',
  'luot': '446, 450, 518 (I1)',
  'why': 't1-t5 no yellow'},
 {'id': 'X10',
  'title': "'short jacket' (maid look)",
  'regex': 'short jacket',
  'slot': '',
  'scope': 'tp1-8 pr1-8',
  'unless': '',
  'negation': 'yes',
  'luot': '344, 271, 280 (G7)',
  'why': 'length lock: never a hip-short jacket'},
 {'id': 'X11',
  'title': 'teeth / open mouth',
  'regex': '\\bteeth\\b|open[- ]mouth|mouth open|\\bgrin',
  'slot': '',
  'scope': 'all',
  'unless': '',
  'negation': 'yes',
  'luot': '18/11 16:37Z (D4)',
  'why': 'closed-lip smile only'},
 {'id': 'X12',
  'title': 'flowers in the hair at t7, t8, Nữ đế, triều phục',
  'regex': 'fresh flower|hair flower|flower in (?:her|the) hair|flowers in (?:her|the) hair',
  'slot': '',
  'scope': 'tp7-8 pr7-8 nude trieu1-8',
  'unless': '',
  'negation': 'yes',
  'luot': '323, 331, 411 (F2, H8)',
  'why': 'flowers only t1-t6 thường phục'},
 {'id': 'X14',
  'title': 'hair flowers on a ma ma (K15)',
  'regex': 'tucked beside the bun|hair flower|fresh flower|flowers? in (?:her|the) hair',
  'slot': '',
  'scope': 'mama tm0-4',
  'unless': '',
  'negation': 'yes',
  'luot': '520 (K15; ROOT-50 ruling A, MMX3); 529 scope widened to cung nữ/nữ quan tm0-tm4 (ROOT-50)',
  'why': 'ma ma, cung nữ, nữ quan wear NO hair flowers; only consorts'},
 {'id': 'X15',
  'title': 'two / several hair flowers (F13 one flower only)',
  'regex': r'fresh flowers\b|hair flowers (?:are|plus)|two or three BIG full blooms|lush cluster of the LARGEST blooms|small silk flowers and a fresh flower|one big bloom plus smaller blooms|pair of (?:fresh )?flowers',
  'slot': '',
  'scope': 'tp1-6 pr1-6',
  'unless': '',
  'negation': 'no',
  'luot': '639 (F13)',
  'why': 'owner Lượt 639: exactly ONE hair flower at t1-t6, size grows with rank'},
 {'id': 'X16',
  'title': 'size word inside the hair-flower NAME (F13 ladder sets the size)',
  'regex': r'fresh flower \((?:a|an) (?:tiny|small|little|large|big|huge)\b',
  'slot': '',
  'scope': 'tp1-6 pr1-6',
  'unless': '',
  'negation': 'no',
  'luot': 'ROOT-54 19/11 (A21 small fix, F13)',
  'why': 'the flower name slot must not carry a size ("a tiny camellia" at t3 MEDIUM contradicted the F13 size sentence); only the F13 SZ ladder sets the size'},
 {'id': 'X17',
  'title': 'Nữ đế a51/a65 elder darkening (B23: keeps the bright a36 colours)',
  'regex': r'DEEPER, DARKER|darken them as described',
  'slot': '',
  'scope': 'nude',
  'ages': 'a51 a65',
  'unless': '',
  'negation': 'no',
  'luot': 'B23 (owner Lượt 702)',
  'why': 'the Nữ đế never darkens with age: no DEEPER/DARKER elder colour sentence at a51/a65'},
 {'id': 'X13',
  'title': 'style image sentence (style image retired)',
  'regex': 'drawing style of image \\d|Image \\d is only for the drawing style',
  'slot': '',
  'scope': 'all',
  'unless': '',
  'negation': 'no',
  'luot': '482 (B8)',
  'why': 'existing people: own picture only, no style image'},
 {'id': 'X14',
  'title': "princess 'eight heads tall' / 'long legs'",
  'regex': 'eight heads|long legs',
  'slot': '',
  'scope': 'pr1-8',
  'unless': '',
  'negation': 'no',
  'luot': '273 (C7)',
  'why': 'princesses never reed-thin'},
 {'id': 'X03',
  'title': 'phi bạch colour gold/yellow below t6',
  'regex': 'gold|yellow|amber|honey|saffron|mustard|ochre',
  'slot': 'S12.colour',
  'scope': 'tp1-5 pr1-5',
  'unless': '',
  'negation': '',
  'luot': '483, 486 (G4)',
  'why': 'phi bạch never gold/yellow below t6'}]

# G15 (owner Lượt 559): QUÝ NHÂN t3 DESIGN = option B v2. The t3 outfit-design words of the store (TIER_LOW[3] robe in t8-prompt-B/build.py) are REPLACED
# by the Outfit words of dev/handover/reports/quy-nhan/m13_a26_t3_v2_optB.prompt.txt, copied verbatim; slots only: lilac -> {main}, deep teal -> {sec}
# (her secondary, as in the TWO-COLOUR sentence), wisteria -> {motif} (her own t3 motif, the one the store already used). Used by store-all/build_all.py
# (_t3_slot) and by store_check below: the gate then DEMANDS the option-B words (slots = any words) instead of the old t3 design.
G15_T3_OLD=re.compile(r"a fine silk robe with wide embroidered (.+?) bands at the collar, sleeves and hem, long trailing wide sleeves, a silk waistband with hanging jade belt pendants and tassels, a sheer silk shawl")
G15_T3_OPTB=("a structured, rich COURTLY palace consort dress (cung đình), never plain, never a simple wrap robe, NO crossed wrap collar, NO high-waisted chest-wrap skirt: "
 "an ankle-length {main} silk court robe with a straight SQUARE NECKLINE framed by a wide stiff {sec} embroidered {motif} band; a wide stiff {sec} brocade girdle at the natural waist, "
 "from which hangs down the centre front an embroidered {sec} APRON PANEL (a long narrow ceremonial front panel, {motif} embroidery, gold-braid edge) reaching to the ankles; "
 "on each side of the apron hangs a long ceremonial jade pendant set down to the knees: small carved jade plaques linked by strings of pearls, ending in silk tassels; "
 "wide embroidered {motif} bands at the sleeve ends and the hem; a sheer silk shawl")
def g15_t3(text,main,sec):
    """old t3 design -> option B (exactly one occurrence required)."""
    m=G15_T3_OLD.search(text); assert m and len(G15_T3_OLD.findall(text))==1,"G15 t3 outfit slot"
    return text[:m.start()]+G15_T3_OPTB.format(main=main,sec=sec,motif=m.group(1))+text[m.end():]
def store_check(pf, prompt, args):
    """STORE GATE (owner Lượt 371/373/375), unchanged logic: -> list of (best, sentence) missing/rewritten."""
    B=os.path.join(ART,'t8-prompt-B')
    store=subprocess.run(['python3','build.py']+args,cwd=B,capture_output=True,text=True).stdout
    m=G15_T3_OLD.search(store)
    if m:   # G15: the t3 design words must be option B (main/secondary = any words, motif = the store's motif), never the old t3 design
        rx=re.escape(G15_T3_OPTB).replace(re.escape('{main}'),'(.+?)').replace(re.escape('{sec}'),'(.+?)').replace(re.escape('{motif}'),re.escape(m.group(1)))
        store=store[:m.start()]+store[m.end():]
        if not re.search(rx,prompt): return [(0,'G15 Quý nhân t3 option-B outfit words missing (dev/handover/reports/quy-nhan/m13_a26_t3_v2_optB.prompt.txt)')]
    sp=lambda s:[x.strip() for x in re.split(r'(?<=[.;])\s+',s) if len(x.strip())>12]
    P=sp(prompt); bad=[]
    for s in sp(store):
        if s in prompt or s.startswith(SLOT): continue
        w=set(re.findall(r"[a-zA-Z']+",s.lower()))
        best=max((len(w & set(re.findall(r"[a-zA-Z']+",p.lower())))/max(1,len(w)) for p in P),default=0)
        if best<0.9: bad.append((round(best,2),s[:160]))
    return bad
# SLOT sentences: per-person / per-pose / ref-order / background lines that the builder itself swaps (allowed to differ)
SLOT=('Her face:','Pose:','she holds','Her hands','pretty silver hairpins','silver and pearl hairpins','pearl-tipped hairpins','her signature colour','her ORIGINAL robe colour','Hair:','face clearly visible','From the identity reference','From image 1','do NOT copy','The style reference','Image 2 is','The first reference image','the background is completely transparent','Image 3 is','the royal yellow in the robe','Her eyes','Eyes soft','the robe itself is clearly')


def norm(s): return re.sub(r"\s+", " ", s).strip()


# ---------------- registry = the tables above ----------------
def load_registry():
    return APPROVED, BANNED


def slot_rx(txt):
    out = ""
    for p in re.split(r"(\{[a-z_]+\})", norm(txt)):
        out += "(?P<%s>.{1,220}?)" % p[1:-1] if re.fullmatch(r"\{[a-z_]+\}", p) else re.escape(p)
    return re.compile(out)


def parse_scope(spec):
    """'tp1-6 pr1-6 mama' -> set of scope tokens {'tp1',...,'mama'}; 'all' -> every token."""
    toks = set()
    for t in (spec or "").replace(",", " ").split():
        if t in ("-", "—"): continue
        if t == "all":
            for k in ("tp", "pr", "trieu"): toks |= {f"{k}{i}" for i in range(1, 9)}
            toks |= {"mama", "nude"}; continue
        m = re.fullmatch(r"([a-z]+)(\d)(?:-(\d))?", t)
        if m:
            a = int(m.group(2)); b = int(m.group(3) or a); toks |= {f"{m.group(1)}{i}" for i in range(a, b + 1)}
        else: toks.add(t)
    return toks


def scope_from_store_args(args):
    """check_store / t8-prompt-B build.py args -> scope token."""
    person = next((a for a in args if re.fullmatch(r"[a-z]+\d\d|bt|cl|pt", a)), "")
    pre = "pr" if person in ("p01", "p02", "p03", "bt", "cl", "pt") else "tp"
    if "--state" in args:
        st = args[args.index("--state") + 1]
        if re.fullmatch(r"tm[0-4]", st): return st   # K15/X14 (Lượt 529): cung nữ / nữ quan states get their own scope token
        return {"mama": "mama", "nude": "nude"}.get(st, "state:" + st)
    if "--nude3" in args or "nude" in args: return "nude"
    if "--low" in args: return f"{pre}{int(args[args.index('--low') + 1])}"
    if "--t7" in args: return f"{pre}7"
    return f"{pre}8"


def negated(text, a, b):
    """True when the clause around text[a:b] (bounded by . ; : ( ) ) carries a negation word."""
    lo = max(text.rfind(c, 0, a) for c in ".;:()"); hi = [text.find(c, b) for c in ".;:()"]; hi = min([h for h in hi if h >= 0] or [len(text)])
    return bool(NEG.search(text[lo + 1:hi]))


def best_overlap(sentence, text):
    w = set(re.findall(r"[a-zA-Z']+", re.sub(r"\{[a-z_]+\}", " ", sentence).lower()))
    best = 0
    for s in re.split(r"(?<=[.;])\s+", text):
        best = max(best, len(w & set(re.findall(r"[a-zA-Z']+", s.lower()))) / max(1, len(w)))
    return best


_KC_FACES = None
def _strip_kc_faces(text):
    """remove every exact KC_REFS face_words string (owner-approved identity words, ART_RULES B8) from the text used for the BANNED scan only."""
    global _KC_FACES
    if _KC_FACES is None:
        import json
        P = json.load(open(os.path.join(ART, "KC_REFS.json"), encoding="utf-8"))["people"]
        _KC_FACES = [norm(p["face_words"]) for p in P.values() if p.get("m09_ok") == "yes" and (p.get("face_words") or "").startswith("Her face: ")]
    for f in _KC_FACES:
        if f in text: text = text.replace(f, " ")
    return text
# B19 NO GREY (owner Lượt 591, BW4): grey as an outfit colour (main/secondary/any colour slot). FLAG for now (listed for ROOT-51, who gets the
# replacement colours from the owner); set B19_FAIL=True once the people's data has no grey left. Hair ("silver-grey streaks/strands") and negated clauses ("never grey") are not outfit colours.
B19_FAIL = True   # BW4: owner table wired (Lượt 603), grey data gone -> grey = FAIL
GREY_RX = re.compile(r"\b(?:silvery[- ]grey|silver[- ]grey|pale[- ]grey|grey[- ](?:blue|sage|lilac|green|white|rose|pink)|(?:blue|pink|green|sage|lilac|rose)[- ]grey|grey(?:ish)?|gray(?:ish)?|ash(?:en)?|ash[- ]\w+)\b(?![- ]?(?:streaks|strands|hair|mixed|patch|at the temples))", re.I)
def grey_hits(text):
    """-> list of grey colour phrases in the text that are not negated and not about hair (B19)."""
    out = []
    for m in GREY_RX.finditer(text):
        if negated(text, m.start(), m.end()): continue
        ctx = text[max(0, m.start() - 40):m.end() + 20]
        if re.search(r"hair|temples|eyebrow|brows", ctx, re.I): continue
        out.append(ctx)
    return out
# K18 LIVE GAME HANDS-OFF (owner Lượt 591, BW4): a live game picture path (img/fig-*, img/hd/*, any img/ path outside img/_review and img/_keep) in the prompt or --refs = FAIL.
K18_LIVE = re.compile(r"(?:^|[/\s\"'(,])(img/(?!_review/|_keep/)[\w./-]+|fig-[\w-]+\.(?:webp|png|jpg))")
def check_text(text, scope, S=None, X=None, age=None, skip_store=False):
    """-> (fails, warns, slots) ; fails/warns = list of (id, kind, detail)."""
    if S is None: S, X = load_registry()
    text = norm(text); fails, warns, found = [], [], {}
    for e in S:
        req = e["scope"] == "any" or scope in parse_scope(e["scope"]); conf = scope in parse_scope(e.get("confirm", ""))   # 'any' = every prompt of every scope (D9)
        if not (req or conf): continue
        if skip_store and e.get("store"): continue   # already enforced by the STORE part (same prompt, store args)
        ages = (e.get("ages") or "all").split()
        if age and "all" not in ages and age not in ages: continue
        m = slot_rx(e["text"]).search(text)
        if m: found[e["id"]] = m.groupdict(); continue
        ov = best_overlap(e["text"], text)
        item = (e["id"], "REWRITTEN" if ov >= 0.6 else "MISSING", f"{e['title']} (best overlap {ov:.0%})")
        (fails if req else warns).append(item)
    text = _strip_kc_faces(text)   # B8 (BW3): the owner's verbatim KC face words are approved as a whole: never scanned for banned phrases (m13 "PHOENIX eyes" = eye shape, not the X08 motif; m43 "covering the teeth completely")
    for x in X:
        if scope not in parse_scope(x["scope"]): continue
        xa = (x.get("ages") or "all").split()   # B23 (BW6): X rules may be age-limited like S rules
        if age and "all" not in xa and age not in xa: continue
        if x.get("unless") and x["unless"] in found: continue
        if x.get("slot"):
            sid, sname = x["slot"].split(".")
            v = (found.get(sid) or {}).get(sname)
            if v and re.search(x["regex"], v, re.I): fails.append((x["id"], "BANNED", f"{x['title']}: {sid}.{sname} = '{v}'"))
            continue
        for m in re.finditer(x["regex"], text, re.I if x.get("case", "i") == "i" else 0):
            if x.get("negation", "yes") == "yes" and negated(text, m.start(), m.end()): continue
            ctx = text[max(0, m.start() - 50):m.end() + 30]
            fails.append((x["id"], "BANNED", f"{x['title']}: …{ctx}…")); break
    for g in grey_hits(text)[:3]:   # B19 (BW4): flag (or FAIL when B19_FAIL)
        (fails if B19_FAIL else warns).append(("B19", "GREY", f"grey outfit colour (owner Lượt 591, NO GREY): …{g}…"))
    return fails, warns, found


def report(fn, scope, fails, warns, out=sys.stdout):
    for i, k, d in fails: print(f"  FAIL {i} {k}: {d}", file=out)
    for i, k, d in warns: print(f"  FLAG {i} {k}: {d}" if k == "GREY" else f"  WARN {i} {k} (owner to confirm scope): {d}", file=out)
    print(("APPROVED CHECK FAIL" if fails else "APPROVED CHECK PASS"), fn, "scope", scope, file=out)


# ---------------- self test ----------------
def selftest():
    S, X = load_registry(); bad = 0
    for e in S:
        p = os.path.join(ROOT, e.get("proof", ""))
        if not os.path.isfile(p): print("NO PROOF FILE", e["id"], e.get("proof")); bad += 1; continue
        if not slot_rx(e["text"]).search(norm(open(p, encoding="utf-8").read())): print("PROOF MISMATCH", e["id"], e["proof"]); bad += 1
    for x in X:
        if x.get("regex"): re.compile(x["regex"])
    print(f"registry self-test: {len(S)} sentences, {len(X)} banned, {bad} problem(s)"); return 1 if bad else 0


# ---------------- audit ----------------
def _build_all():
    import importlib.util, io, contextlib
    old = sys.argv; sys.argv = ["build_all.py"]
    spec = importlib.util.spec_from_file_location("build_all_audit", os.path.join(ART, "store-all", "build_all.py"))
    m = importlib.util.module_from_spec(spec)
    try: spec.loader.exec_module(m)
    finally: sys.argv = old
    return m


def audit_sources():
    """yield (group, label, scope, text) for every current builder output / prompt file."""
    ba = _build_all(); ages = ["a18", "a26", "a36", "a51", "a65"]
    for p in ba.PEOPLE:
        pre = "pr" if p in ba.PR else "tp"; grp = "princess" if pre == "pr" else ("consort" if p[0] == "c" else "maid-person")
        for t in range(1, 9):
            for a in ages:
                try: txt = ba.build(p, t, a)[1]
                except Exception as ex:  # noqa
                    yield (f"thường phục {grp}", f"{p} t{t} {a}", f"{pre}{t}", None); continue
                yield (f"thường phục {grp}", f"{p} t{t} {a}", f"{pre}{t}", txt)
    for i in range(1, 33):
        for a in ages:
            yield ("Nữ đế (build_all nude)", f"c{i:02d} nude {a}", "nude", ba.build(f"c{i:02d}", "nude", a)[1])
    tr = os.path.join(ART, "owner-copy", "trieu")
    for t in range(1, 9):
        f = os.path.join(tr, "r21" if t <= 6 else "r18", f"t{t}_c06_RAN.txt")
        yield ("triều phục (r21 t1-t6 + r18 t7/t8)", os.path.relpath(f, ROOT), f"trieu{t}", open(f, encoding="utf-8").read())
    for f in sorted(glob.glob(os.path.join(ROOT, "dev/handover/reports/mama-specs/*.prompt.txt"))):
        g = "ma ma one-ref (current, MMX1b)" if ".oneref." in f else "ma ma 3-ref (older spec files)"
        yield (g, os.path.relpath(f, ROOT), "mama", open(f, encoding="utf-8").read())


def audit(outpath):
    S, X = load_registry(); titles = {e["id"]: e["title"] for e in S + X}
    groups = collections.OrderedDict(); per = collections.defaultdict(collections.Counter); where = collections.defaultdict(lambda: collections.defaultdict(list))
    warnc = collections.defaultdict(collections.Counter); errs = []
    for grp, label, scope, txt in audit_sources():
        m_age = re.search(r"\b(a18|a26|a36|a51|a65)\b", label); age = m_age.group(1) if m_age else None
        g = groups.setdefault(grp, collections.Counter()); g["prompts"] += 1
        if txt is None: g["builder error"] += 1; errs.append(label); continue
        f, w, _ = check_text(txt, scope, S, X, age, skip_store=False)
        g["PASS" if not f else "FAIL"] += 1
        for i, k, d in f:
            per[grp][(i, k)] += 1
            if len(where[grp][(i, k)]) < 6: where[grp][(i, k)].append(label)
        for i, k, d in w: warnc[grp][(i, k)] += 1
    L = ["# APPROVED AUDIT — which approved sentence is missing / which banned phrase is present (AP1, owner Lượt 500)", "",
         "Generated by `python3 dev/art/check_store.py --audit` (APPROVED / BANNED tables in check_store.py; readable list dev/art/APPROVED_SENTENCES.md). REPORT ONLY: no builder prompt text was changed "
         "(the fix is a later owner-approved step). FAIL = that prompt may NOT be generated. WARN = sentence of a scope the owner still has to confirm (no block).", "",
         "Sources: build_all.py (thường phục: 32 consorts c01–c32, 52 maid-persons m01–m52, 3 princesses p01–p03; t1–t8 × a18/a26/a36/a51/a65; Nữ đế c01–c32 × 5 ages), "
         "triều phục dev/art/owner-copy/trieu (r21 t1–t6 + r18 t7/t8, c06 — the only person drawn), ma ma dev/handover/reports/mama-specs/*.prompt.txt.", "",
         "## Totals", "", "| group | prompts | PASS | FAIL |", "|---|---|---|---|"]
    tot = collections.Counter()
    for grp, c in groups.items():
        L.append(f"| {grp} | {c['prompts']} | {c['PASS']} | {c['FAIL']} |"); tot.update(c)
    L.append(f"| **all** | **{tot['prompts']}** | **{tot['PASS']}** | **{tot['FAIL']}** |")
    if errs: L += ["", f"Builder errors ({len(errs)}): " + ", ".join(errs[:20])]
    L += ["", "## What fails, where (count = prompts in that group)", "", "| group | ID | problem | sentence / banned phrase | prompts | examples |", "|---|---|---|---|---|---|"]
    for grp in groups:
        for (i, k), n in sorted(per[grp].items(), key=lambda kv: (-kv[1], kv[0])):
            L.append(f"| {grp} | {i} | {k} | {titles.get(i, i)} | {n} | {', '.join(where[grp][(i, k)])} |")
    L += ["", "## WARN only (scope the owner still has to confirm; not blocking)", "", "| group | ID | problem | sentence | prompts |", "|---|---|---|---|---|"]
    for grp in groups:
        for (i, k), n in sorted(warnc[grp].items(), key=lambda kv: (-kv[1], kv[0])):
            L.append(f"| {grp} | {i} | {k} | {titles.get(i, i)} | {n} |")
    L += ["", "MISSING = the approved sentence is not in the prompt at all (best word overlap < 60 %). REWRITTEN = a similar sentence is there but not the approved words "
          "(overlap ≥ 60 %): somebody wrote new text instead of copying. BANNED = a banned phrase is present (negated uses such as 'never looking down' are ignored).", ""]
    notes = os.path.join(ART, "approved", "AUDIT_NOTES.md")
    if os.path.exists(notes): L += ["", open(notes, encoding="utf-8").read()]
    open(outpath, "w", encoding="utf-8").write("\n".join(L))
    print("\n".join(L[8:8 + len(groups) + 3])); print("wrote", os.path.relpath(outpath, ROOT))
    return tot




# ---------------- human-readable list, GENERATED from the tables (never edited by hand) ----------------
def registry_md():
    L=["# APPROVED SENTENCES — the owner's approved words (GENERATED from dev/art/check_store.py APPROVED/BANNED tables; do not edit by hand)","",
       "**Source of truth = the APPROVED and BANNED tables in `dev/art/check_store.py`** (the one STORE GATE, owner Lượt 371/373/375, extended Lượt 500/504). "
       "Regenerate this file: `python3 dev/art/check_store.py --registry-md`.","",
       "**LAW #0 (Lượt 505):** only sentences/bans the OWNER herself approved or raised are listed; our own remarks are notes to her, never entries. "
       "Each sentence is COPIED from the prompt of a picture she approved (`--self` proves it against its proof prompt); only `{slot}` words may differ. "
       "A new owner approval is ADDED to the tables by the foreman the same turn, copied, never retyped.","",
       "Gate: `python3 dev/art/check_store.py <prompt> <store args>` (store sentences + approved sentences + banned phrases) or, for prompts without store args "
       "(triều phục, ma ma spec files…), `python3 dev/art/check_store.py <prompt> --scope tpN|prN|trieuN|mama|nude [--age aNN]`. Must print STORE CHECK PASS; FAIL = no gen; "
       "ledger line carries \"store_check\":\"PASS\" and \"approved_check\":\"PASS\". Audit: dev/art/APPROVED_AUDIT.md. Owner sheet: dev/handover/review-sheets/approved/.","",
       "Scopes: `tp1-8` thường phục rank (consorts c01–c32, m01–m52) · `pr1-8` princesses p01–p03 · `trieu1-8` triều phục · `mama` · `nude` Nữ đế · `all`. "
       "`scope` = REQUIRED (missing → FAIL); `confirm` = owner still to confirm there → WARN only. `store: yes` = a store sentence, already demanded by the store part when the prompt is checked with store args.","",
       "Status: seeded Lượt 500 (AP1); **the owner has NOT yet approved this list as a whole** — sheet sent for her one-time OK.","","**NEW CHARACTER (owner Lượt 555):** the only new-person prompt = `dev/art/NEW_CHARACTER_TEMPLATE.md` (set B: COMMON_v3 + mNN.v3 line, ONE ref M09 eIyOFEidqL). RETIRED, never approved sentences: COMMON v1/v2 (dev/art/_retired/face-common/), style-image sentences for 6AbGv6EiJO / style2_portraits / style3_girls Xm9tPkMBfo, kc2k / khuê các 18/11 recipes, the 'new-character style sentence', one-ref from img/hd/fig-*-t1.","","## Sentences (S)",""]
    for e in APPROVED:
        L+=[f"### {e['id']} · {e['title']}",f"- text: `{e['text']}`",f"- scope: {e['scope']}",f"- confirm: {e['confirm'] or '-'}",f"- ages: {e['ages'] or 'all'}",
            f"- store: {'yes' if e['store'] else 'no'}",f"- luot: {e['luot']}",f"- source: {e['source']}",f"- proof: {e['proof']}",f"- picture: {e['picture']}",f"- vn: {e['vn']}",""]
    L+=["## BANNED phrases (X)","","`negation: yes` = a match inside a clause that says no/never/not (e.g. 'never looking down') is ignored. `unless` = allowed when that S entry is present.",""]
    for x in BANNED:
        L+=[f"### {x['id']} · {x['title']}"]+([f"- slot: {x['slot']}"] if x.get('slot') else [])+[f"- regex: `{x['regex']}`",f"- scope: {x['scope']}"]
        if not x.get('slot'): L+=[f"- unless: {x.get('unless') or '-'}",f"- negation: {x.get('negation') or 'yes'}"]
        L+=[f"- luot: {x['luot']}",f"- why: {x['why']}",""]
    return "\n".join(L)


def main():
    a=sys.argv[1:]
    if not a or a[0] in ("-h","--help"): print(__doc__); return 0
    if a[0]=="--self": return selftest()
    if a[0]=="--audit": audit(a[a.index("--out")+1] if "--out" in a else os.path.join(ART,"APPROVED_AUDIT.md")); return 0
    if a[0]=="--registry-md":
        open(os.path.join(ART,"APPROVED_SENTENCES.md"),"w",encoding="utf-8").write(registry_md()); print("wrote dev/art/APPROVED_SENTENCES.md"); return 0
    pf=a[0]; prompt=open(pf,encoding="utf-8").read()
    # BANNED REFS (owner Lượt 554/555): old khuê các set A (kc2k / kc2k-mass keys or their Magnific ids) may never be used again.
    refs=a[a.index("--refs")+1] if "--refs" in a else ""
    if "--refs" in a: i=a.index("--refs"); a=a[:i]+a[i+2:]
    sys.path.insert(0,ART); import kc_ref
    hits=kc_ref.banned_hits(prompt+" "+refs)
    if hits:
        print('STORE CHECK FAIL',pf,'— BANNED REF (old khuê các set A, KC_BANNED_REFS.json):',', '.join(sorted(set(hits)))); return 1
    live=[m.group(1) for m in K18_LIVE.finditer(prompt+" "+refs.replace(","," "))]
    if live:   # K18 (owner Lượt 591): references only from our store, never a live game file
        print('STORE CHECK FAIL',pf,'— K18 LIVE GAME FILE used as reference (refs only from our store: KC_REFS cut ids / store ids):',', '.join(sorted(set(live)))); return 1
    if "--scope" in a:   # prompt without store args (triều phục, ma ma spec files, …): approved part only
        scope=a[a.index("--scope")+1]; age=a[a.index("--age")+1] if "--age" in a else None
        f,w,_=check_text(prompt,scope,age=age); report(pf,scope,f,w)
        if f: print('STORE CHECK FAIL',pf,'— APPROVED CHECK FAIL: do NOT generate'); return 1
        print('STORE CHECK PASS',pf,'(approved_check PASS, scope',scope+')'); return 0
    args=a[1:]
    bad=store_check(pf,prompt,args)
    if bad:
        print('STORE CHECK FAIL',pf,'—',len(bad),'store sentence(s) missing or rewritten:')
        for b,s in bad: print(f'  [{b}] {s}')
        return 1
    scope=('nude' if 'NỮ ĐẾ:' in prompt else 'mama' if 'A palace ma ma' in prompt else scope_from_store_args(args))
    age=args[args.index('--age')+1] if '--age' in args else 'a18'
    f,w,_=check_text(prompt,scope,age=age,skip_store=True); report(pf,scope,f,w)
    if f: print('STORE CHECK FAIL',pf,'— APPROVED CHECK FAIL (APPROVED/BANNED tables in check_store.py): do NOT generate'); return 1
    print('STORE CHECK PASS',pf,'(approved_check PASS)'); return 0


if __name__=="__main__":
    sys.exit(main())
