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
  python3 dev/art/check_store.py <prompt_file> --scope tpN|prN|trieuN|mama|nude|face [--age aNN]   # approved part only (no store args)
  python3 dev/art/check_store.py --maid-items <dir> <tag>   # E13 (owner L1919): maid held items, FAIL on a repeat inside one person / same item at the same rank across persons
  scope face = thiếu nữ face prompts (face-common mNN/cNN/sNN .FULL.txt, or a maker's stdout via prompt_file "-")
  --pid sNN (scope face): B20 root-hex check, her root pair only (MG3 L784 #6); every scope: prompt > 10 000 chars = FAIL (gen tool limit)
MASTER BLOCK (owner B25, Lượt 745/766, MG1): in EVERY scope every sentence of dev/art/MASTER_COMMON.txt must be present verbatim exactly once
PETS (owner Lượt 1057/1059, rule F17): a pet in a hold sentence only at --age a18/a26 (or none), scope tp1-6/pr1-6/state:kc/face; never beside her = else FAIL; + kids (owner 20/11): --scope girl (Công chúa kid-f) a4/a9/a14/a20, --scope boy (Hoàng tử kid-p) a4/a9/a14; maids / nhà nghèo / Nữ đế none; table + >=3 count: t8-prompt-B/pets.py check
NOFRUIT (owner Lượt 1052/1054, 20/11, rule F16): in EVERY scope a fruit word in a hold sentence (holding/held/cradling/carrying…) = FAIL; no exemption (drawn s44/s64 records in face-common/legacy_fruit/ FAIL if reused)
NOEAR (owner Lượt 1037, 20/11, rule F15): in EVERY woman/girl scope (all but --scope emperor|men) master_common.EAR_SENT exactly once + NO earring word (earring, ear drop/pendant/stud, jewels at the ears, hoa tai…) = else FAIL
  (dev/art/master_common.py); missing / edited / doubled = FAIL "MASTER ...".
  python3 dev/art/check_store.py --self | --audit | --registry-md
PERSON + BATCH (owner L2039, dev/art/person_gate.py): scope tp1-tp8 with --pid or a <pid>_t<rank>_ file name = her OWN item / ANGLE / face (P1/P2/P3);
  python3 dev/art/check_store.py --batch <files…> [--age aNN]  = FAIL when 2+ persons share a rank's ANGLE or Pose sentence (B1) + the person check per file. MANDATORY before every multi-person gen run.
Exit 1 = FAIL -> do NOT generate. Ledger lines carry "store_check":"PASS" and "approved_check":"PASS"."""
import subprocess,sys,re,os,glob,collections,json
ART=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.dirname(os.path.dirname(ART))
sys.path.insert(0, ART); import master_common   # B25 ONE MASTER COMMON BLOCK (dev/art/MASTER_COMMON.txt), checked in EVERY scope
NEG=re.compile(r"\b(no|not|never|without|nothing|none|nor)\b", re.I)

# ---------------- APPROVED / BANNED tables (source of truth; APPROVED_SENTENCES.md is generated from these) ----------------
APPROVED = [{'id': 'W01', 'title': 'WINTER FUR Lông 1 t1-t3 (G26)', 'text': "WINTER: a WIDE band of soft plain ivory-white fur trim, about a hand's width, along her collar, the front edges and hem of her outer garment, and her cuffs, visibly warm and cosy, yet lying smooth and close, never puffy or bulky; the same plain ivory at every rank, no coloured fur, never covering her face or neck, the neckline keeps its shape.", 'scope': 'tp1-3 pr1-3', 'confirm': '', 'ages': '', 'store': False, 'season': 'dong',
  'luot': 'owner 20/11 ~16:50Z (fur 1/2/3 approved) + "đưa vào cái prompt chính vào cái máy duyệt prompt"', 'source': 'dev/art/winter_g28.py FUR[1]', 'proof': 'dev/art/winter1/g28/s62_t1_dong.txt', 'picture': 'VX7Nn0OMMU (width sample)', 'vn': 'Đông: viền lông ngà rộng ~1 bàn tay (bậc 1–3).'},
 {'id': 'W02', 'title': 'WINTER FUR Lông 2 t4-t6 (G26)', 'text': 'WINTER: a VERY WIDE, luxurious band of thick soft plain ivory-white fur trim, wider than at the lower ranks, about two and a half hands wide, along her collar, the front edges and hem of her outer garment, and her cuffs, rich, warm and cosy, yet lying smooth and close, never puffy or bulky; the same plain ivory at every rank, no coloured fur, never covering her face or neck, the neckline keeps its shape.', 'scope': 'tp4-6 pr4-6', 'confirm': '', 'ages': '', 'store': False, 'season': 'dong',
  'luot': 'owner 20/11 ~16:50Z', 'source': 'dev/art/winter_g28.py FUR[2]', 'proof': 'dev/art/winter1/g28/s62_t5_dong.txt', 'picture': 'eIPZ5GkdqL (width sample)', 'vn': 'Đông: viền lông ngà rất rộng ~2,5 bàn tay (bậc 4–6).'},
 {'id': 'W03', 'title': 'WINTER FUR Lông 3 t7-t8 (G26)', 'text': 'WINTER: the WIDEST, THICKEST and most luxurious band of deep, dense, plush soft plain ivory-white fur trim, far wider and fuller than at any lower rank, about three and a half hands wide and visibly thick and lush, along her collar, the front edges and hem of her outer garment, and her cuffs, rich, warm and sumptuous, softly rounded and full, yet neat and elegant; the same plain ivory at every rank, no coloured fur, never covering her face or neck, the neckline keeps its shape.', 'scope': 'tp7-8 pr7-8', 'confirm': '', 'ages': '', 'store': False, 'season': 'dong',
  'luot': 'owner 20/11 ~16:50Z ("lông ba mới cho bậc hoàng hậu và hoàng quý phi")', 'source': 'dev/art/winter_g28.py FUR[3] = dev/art/seasons4/s62_t8_dong_LONG3moi.txt', 'proof': 'dev/art/winter1/g28/s62_t8_dong.txt', 'picture': 'owner ChatGPT run', 'vn': 'Đông: viền lông ngà rộng nhất, dày ~3,5 bàn tay (HQP, HH).'},
 {'id': 'W04', 'title': 'WINTER STORE FABRIC t1-t3 (G28, twin of S06)', 'text': 'Light, soft, flowing OPAQUE silk: the long sleeves, skirt and sash are supple and airy, drifting softly as in a gentle breeze, with soft natural folds, never see-through, never stiff, flat or board-like.', 'scope': 'tp1-3 pr1-3', 'confirm': '', 'ages': '', 'store': False, 'season': 'dong',
  'luot': 'owner 20/11 ~19:24Z answer A ("vải không xuyên thấu")', 'source': 'dev/art/winter_g28.py FABRIC[1]', 'proof': 'dev/art/winter1/g28/s62_t1_dong.txt', 'picture': '', 'vn': 'Đông: lụa mềm bay nhưng KHÔNG xuyên thấu (thay S06).'},
 # G34/G36 (owner L1439/L1446): winter has NO phi bạch -> W05 no longer required (was 'tp1-6 pr1-6')
 {'id': 'W05', 'title': 'WINTER PHI BẠCH t1-t6 (G28, twin of S12)', 'text': 'PHI BẠCH (winter): the shawl draped behind her back and over her arms is a soft, light, flowing OPAQUE silk shawl in {sec} (her secondary colour, clearly different from her main robe colour {main}), never see-through, never stiff or bulky; it keeps its soft graceful drape.', 'scope': '-', 'confirm': '', 'ages': '', 'store': False, 'season': 'dong',
  'luot': 'owner 20/11 ~19:24Z answer A', 'source': 'dev/art/winter_g28.py PHI_WINTER', 'proof': 'dev/art/winter1/g28/s62_t1_dong.txt', 'picture': '', 'vn': 'Đông: khăn choàng lụa mềm KHÔNG xuyên thấu (thay S12).'},
 {'id': 'S01',
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
  'store': True,
  'not_season': 'dong'},
 {'id': 'S07',
  'title': 'FABRIC prompt B t7/t8/Nữ đế',
  'text': 'FABRIC: thick gold-embroidered brocade with a graceful, flowing drape.',
  'scope': 'tp6-8 pr7-8 nude trieu6-8 thaihau state:thaihau emperor',
  'confirm': '',
  'ages': '',
  'luot': '364 (B12); 781 (B12 rewritten: t6 Quý phi and above, Thái hậu, Hoàng thượng, Nữ đế, triều t6-t8)',
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
 {'id': 'S37',
  'title': 'SLEEVE HEM ON THE FLOOR while holding the item (t7-t8, Nữ đế, Thái hậu)',
  'text': 'Even while her hands are raised to hold her item at chest height, each wide sleeve still hangs straight down from her forearm and its hem lies on the floor beside her feet; the sleeve hem is NEVER at knee or shin height.',
  'scope': 'tp7-8 pr7-8 nude',
  'confirm': '',
  'ages': '',
  'luot': '773, 774 (SL1; companion of S10, same places)',
  'source': 'dev/art/store-all/build_all.py SLEEVE_FLOOR_HOLD (laws t>=7; Thái hậu inherits; nude-B/mk.py HHS)',
  'proof': 'dev/art/approved/proof/m05_t8_a18_SL1.txt',
  'picture': "owner Lượt 773/774: Nữ đế a36/a51/a65 + Thái hậu a36 sleeves ended at the knees; sentence added so future pictures keep the hem on the floor (no redraw, owner Lượt 777)",
  'vn': 'Dù tay nâng món đồ ngang ngực, tay áo rộng vẫn rủ thẳng từ cẳng tay, mép tay áo nằm trên sàn cạnh chân; không bao giờ chỉ tới gối hay ống chân.',
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
  'text': 'PHI BẠCH: {intro} is a very sheer, highly translucent gauze shawl in {colour} with a THIN GOLD EDGE along its borders ({kind}, the only colour outside her two robe colours) — the robe, sleeves and arms are clearly visible through it, so it reads as {veil}, never an opaque solid band of colour; it keeps its soft graceful drape.',   # L1834: {colour} = her 3rd colour from face-common/phibach_3rd_L1821.json prompt_colour, {kind} 'a soft pastel', {veil} 'a light airy veil of that soft hue' (G56 ivory form: 'a soft neutral' / 'a light airy ivory veil'); G56 (owner L1804/L1805): {colour} = pale IVORY-CREAM silk; t6 thick form = G54/G56; old F12 text: 'PHI BẠCH: {intro} is a very sheer, highly translucent gauze shawl in {colour} (her secondary colour, clearly different from her main robe colour {main}) — the robe, sleeves and arms are clearly visible through it, so it reads as a light airy veil of that hue, never an opaque solid band of colour; it keeps its soft graceful drape.',
  'scope': '-',   # G36 (owner L1446): phi bạch only hạ + thu; builder xuân (current Hán set) / đông have none -> no longer required (was 'tp1-6 pr1-6')
  'confirm': '',
  'ages': '',
  'luot': '397, 412, 434, 469, 483, 486 (G4); F12 Lượt 601 (BW4: very sheer, translucent)',
  'source': 'dev/art/store-all/build_all.py phi_bach()',
  'proof': 'dev/art/approved/proof/bw4_f12_m13_t2_a26.txt',
  'picture': 'Phù Tang t4 curved test (Lượt 412) · gen 5jDiW44Kxe · cut EbYOArVuuO · https://ctm-img.victoria-tntt.workers.dev/img/_review/princess/phutang_t4_curved_vs_old.jpg (right half)',
  'vn': 'Khăn phi bạch choàng sau lưng, qua tay, màu KHÁC hẳn màu áo (màu phụ), không lẫn vào áo; chỉ bậc 1-6.',
  'store': False,
  'not_season': 'dong'},
 {'id': 'S13',
  'title': 'CAPELET CUT t4 Tần (curved, opens gradually)',
  'text': 'CAPELET CUT (flowing): its lower edge and collar lines are soft CURVES, never flat; the lower edge is {shape}; the robe closes only at the throat clasp, never buttoned down the front, opening gradually in a long soft V toward the hem, graceful (uyển chuyển), never boxy.',
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
  'text': 'HOÀNG QUÝ PHI LUXURY: richer than every lower rank: more jewels on the phoenix crown (rubies, sapphires, pearls and jade), pearl and jade trims along '
          'the cape edges; still clearly simpler and less golden than the Empress.',
  'scope': 'tp7 pr7',
  'confirm': '',
  'ages': '',
  'luot': '486 (G12); A41 owner Lượt 1411 (no necklace for anyone): "a layered pearl-and-gold necklace, " removed (B26FAB4, Foreman C #8)',
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
  'text': 'Luminous smooth porcelain skin, bare clean forehead with no forehead mark and no flower mark, eyes open, floor-length robe, only slipper toe tips peeking under the hem, no train, no cup, nothing covering the '
          'face.',
  'scope': 'all',
  'confirm': '',
  'ages': '',
  'luot': '18/11 23:25Z (D9, D10); feet words changed by G23 (owner 20/11 verbatim: "Sửa cái prompt, cái chân lại cho nó phù hợp đi."): was "floor-length robe with slippers visible"',
  'source': 'dev/art/owner-copy/pr_cl_t2_V2.txt = store',
  'proof': 'dev/art/owner-copy/pr_cl_t2_V2.txt',
  'picture': 'Cao Ly V2 t2 (Lượt 301-303) · gen Lw8y0mCswO · cut 79f3BGcJAL (ledger :288) · NO file on CDN/repo (sent in chat only) — ART_RULES B15 lists xSByOSyjfW/yiuGA83PW9/cpS8oJg0eP, but the '
             'ledger (:509/510/518) says those are the later Cao Ly t4/t5/t6 store pictures · the same sentence is in the store prompts of the Lượt 395 store sheets, approved Lượt 397: '
             'https://ctm-img.victoria-tntt.workers.dev/img/_review/morning-1119/sheet_congchua.jpg',
  'vn': 'Da sáng mịn; trán trơn, không hoa điền; mắt mở; áo dài chạm sàn, chỉ ló mũi giày dưới gấu áo; không đuôi áo, không chén; không che mặt.',
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
  'text': 'FABRIC OF THIS COURT ROBE: the robe and sleeves are the LIGHTEST thin, supple brocade (gấm) with a soft matte finish, never thick, stiff or heavy, with a graceful, flowing drape, the same on every rank.',   # BUILDFIX5: owner L2122 lightest gấm (= master_common.TRIEU_GAM; old words = TRIEU_GAM_OLD)
  'scope': 'trieu1-8',
  'confirm': '',
  'ages': '',
  'luot': '444 (H2); L2122 (lightest gấm, BUILDFIX5)',
  'source': 'dev/art/owner-copy/trieu (r17+; r27 = L2122 light gấm)',
  'proof': 'dev/art/owner-copy/trieu/r27/t3_c06_RAN.txt',
  'picture': 'triều phục c06 r21 (Lượt 492: t4, t6, t7, t8 OK; t4 cut u5W4dPuQLD, t6 cut N2q8sOD6D9) · https://ctm-img.victoria-tntt.workers.dev/img/_review/trieu-phuc/r19/c06_sheet21.jpg',
  'vn': 'Triều phục: áo và tay bằng GẤM NHẸ NHẤT, mỏng, mềm, mặt lì, không dày/cứng/nặng, rủ thướt tha, cùng một câu ở cả 8 bậc (owner L2122).',
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
          'the royal golden yellow is the DOMINANT colour of the robe, mantle, sleeves and skirt (more than half of everything visible), {second} is the second colour '
          '(collar, inner robe, wide borders and a few panels);',
  'scope': 'nude',
  'confirm': '',
  'ages': 'a51 a65',
  'luot': 'B23 (owner Lượt 702); SL1: second colour = {second} slot (it is her outfit option\'s own second colour: A/C wine-crimson, B black silk …); mk.py asserts a51/a65 = her a36 rule verbatim',
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
  'store': False},
 {'id': 'S36',
  'title': 'D15 ELDER STYLE LOCK a51/a65 (ma ma r55 sentence, verbatim, exactly once)',
  'text': 'STYLE LOCK (same drawing as her 36-year-old picture, the {ordinal} reference): exactly the same soft painterly guofeng illustration rendering, the same smooth luminous painted skin'
          ', soft stylised features and gentle painted shading as the 36-year-old picture; her age shows ONLY through the silver in her hair and a few soft painted lines, NEVER photographic, '
          'NEVER photo-realistic, no realistic skin texture, no pores, no detailed wrinkles.',
  'scope': 'any-but-nude',
  'confirm': '',
  'ages': 'a51 a65',
  'strict_ages': True,
  'once': 'STYLE LOCK (',
  'slot_values': {'ordinal': ['second', 'third']},
  'luot': 'D15 (owner Lượt 692 + 694, via ROOT-55/ROOT-56): copy the ma ma a51/a65 STYLE LOCK to everyone; Nữ đế excluded here (nude-B/mk.py owns it)',
  'source': 'dev/handover/reports/mama-specs/m05-a51.styleref.r55.prompt.txt -> t8-prompt-B/build.py AGE_TXT a51/a65 (D15_STYLE); store-all/build_all.py thaihau()',
  'proof': 'dev/handover/reports/mama-specs/m05-a51.styleref.r55.prompt.txt',
  'picture': 'ma ma m05 a51 gOmpWytSXO / a65 eIPlkhrdqL (owner Lượt 694 OK, MMX4)',
  'vn': 'Tuổi 51/65: câu KHÓA NÉT VẼ của ma ma (giống hệt nét vẽ ảnh 36 tuổi, không ảnh thật), đúng một lần; ảnh 36 tuổi là ảnh tham chiếu thứ hai (thứ ba khi ảnh 2 là mẫu màu vàng).',
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
  'why': 'phi bạch never gold/yellow below t6'},
 {'id': 'X18',
  'title': "old store drawing style 'semi-realistic / near-3D / realistic rendering'",
  'regex': 'semi-realistic|near-3D|realistic rendering',
  'slot': '',
  'scope': 'any',
  'unless': '',
  'negation': 'no',
  'luot': '779 (C1, via ROOT-57; MG2)',
  'why': "the drawing style is the approved thiếu nữ style ONLY (master M01/M02); the old store style clause is gone from every builder. Scope 'any' = every prompt of every scope, faces and states included"},
 {'id': 'X19',
  'title': "transparent-background words (B9 GEN METHOD: draw on parchment, then images_remove_background)",
  'regex': 'background is (?:completely |fully )?transparent|transparent background|(?:completely|fully) transparent with NOTHING',
  'slot': '',
  'scope': 'any',
  'unless': '',
  'negation': 'no',
  'luot': '780 (C2 = B9, via ROOT-57; MG2)',
  'why': "B9 GEN METHOD: no transparentBackground and no transparent-background prompt words; master M03 (plain light parchment) is the ONLY background sentence; the cut-out is images_remove_background after the gen. Scope 'any' incl. face and states"},
 {'id': 'F14',
  'title': "Qing headdress words (liangbatou / two-wing board / flag-style headdress / Qing / Manchu)",
  'regex': r'liang[- ]?ba[- ]?tou|\bqi[- ]?tou\b|two[- ]wing(?:ed)?\s+(?:black\s+)?(?:satin\s+)?(?:board|headdress)|(?:flat|black)[- ]board\s+headdress|board[- ]like\s+headdress|flag[- ](?:style|shaped)\s+headdress|banner\s+headdress|\bQing\b|\bManchu(?:rian)?\b',
  'slot': '',
  'scope': 'any',
  'unless': '',
  'negation': 'no',
  'luot': '800 (F14, via ROOT-58; MG3)',
  'why': "owner Lượt 800: no black two-wing board headdress (liangbatou, 'cái cục trên đầu') and no Qing look on ANY person; the words are banned in every scope, even negated (seal prompts included)"},
 {'id': 'X20',
  'title': "Quý nhân t3 spiky hairpins (pearl-tipped hairpins = 'con nhím')",
  'regex': r'pearl-tipped hairpins',
  'slot': '',
  'scope': 'tp3 pr3',
  'unless': '',
  'negation': 'no',
  'luot': 'owner L1566 + L1568 (G39, via Foreman C #13, DESIGN17)',
  'why': "owner L1566: the Quý nhân hairpins look like a hedgehog (many straight pins fanning out) = a prompt fault; L1568: fix it in the common prompt for everyone. Store TIER_LOW[3] now: two or three slim pearl hairpins set INTO her gathered hair at natural angles, mostly hidden, small dangling pearl ornaments, never a radiating crown"}]

# G15 (owner Lượt 559): QUÝ NHÂN t3 DESIGN = option B v2. The t3 outfit-design words of the store (TIER_LOW[3] robe in t8-prompt-B/build.py) are REPLACED
# by the Outfit words of dev/handover/reports/quy-nhan/m13_a26_t3_v2_optB.prompt.txt, copied verbatim; slots only: lilac -> {main}, deep teal -> {sec}
# (her secondary, as in the TWO-COLOUR sentence), wisteria -> {motif} (her own t3 motif, the one the store already used). Used by store-all/build_all.py
# (_t3_slot) and by store_check below: the gate then DEMANDS the option-B words (slots = any words) instead of the old t3 design.
G15_T3_OLD=re.compile(r"a fine silk robe with wide embroidered (.+?) bands at the collar, sleeves and hem, long trailing wide sleeves, a silk waistband with hanging jade belt pendants and tassels, a sheer silk shawl")
G15_T3_OPTB=("a structured, rich COURTLY palace consort dress (cung đình), never plain, never a simple wrap robe, NO crossed wrap collar, NO high-waisted chest-wrap skirt: "
 "an ankle-length {main} silk court robe with a straight SQUARE NECKLINE framed by a wide stiff {sec} embroidered {motif} band; a wide stiff {sec} brocade girdle at the natural waist, "
 "from which hangs down the centre front an embroidered {sec} APRON PANEL (a long narrow ceremonial front panel, {motif} embroidery, gold-braid edge) reaching to the ankles; "
 "the apron hangs plain to the knees; "
 "wide embroidered {motif} bands at the sleeve ends and the hem")   # G36 (owner L1446): '; a sheer silk shawl' removed (no phi bạch in xuân/đông)
# G21 (owner 20/11, ROOT-67 chat Lượt 1128: 'Cái cổ áo từ 36, 51 và 65 tuổi á, là phải là cái cổ xéo kín đáo ... copy cái cổ này qua cho bên quý nhân'):
# at a36/a51/a65 the t3 option-B words keep everything except the collar: the square neckline becomes the same snug crossed collar as the old (pre-G17) Đáp ứng words.
G21_AGES=("a36","a51","a65")
G21_T3_COLLAR=[("never plain, never a simple wrap robe, NO crossed wrap collar, NO high-waisted chest-wrap skirt: ","never plain, never a simple wrap robe, NO high-waisted chest-wrap skirt: "),
 ("with a straight SQUARE NECKLINE framed by a wide stiff {sec} embroidered {motif} band;","with a modest snug crossed-collar neckline framed by a wide stiff {sec} embroidered {motif} band;")]
def g15_t3_words(age=None):
    w=G15_T3_OPTB
    if age in G21_AGES:
        for a,b in G21_T3_COLLAR: assert w.count(a)==1,("G21 t3 collar slot",a); w=w.replace(a,b)
    return w
def g15_t3(text,main,sec,age=None):
    """old t3 design -> option B (exactly one occurrence required); G21: crossed collar at a36/a51/a65."""
    m=G15_T3_OLD.search(text); assert m and len(G15_T3_OLD.findall(text))==1,"G15 t3 outfit slot"
    return text[:m.start()]+g15_t3_words(age).format(main=main,sec=sec,motif=m.group(1))+text[m.end():]
# HQP COLLAR (owner Lượt 1384 via Foreman C #7, 20/11): t7 current outfit LAYERED NECKLINE = dev/art/thu_comoi/s62_t7_THU_COMOI.txt words (make_thu_comoi.py layer() + OPEN);
# ONE copy here, used by store-all/build_all.hqp_collar. Store gate: a t7 prompt holding the block (long or SHORT form, her own colour words) is compared with the
# store text carrying the same block; prompts without it are checked as before.
HQP_NO="never a round collar, never a V, NO crossed wrap collar"
HQP_OPEN="its front CUT AWAY (its lobes resting on the shoulders and back, never covering the neck or the square neckline)"
HQP_CAPE="a jewelled cloud-collar cape edged with pearls and gold over the shoulders, "
def hqp_layer(main,sec,short=False):
    # BUILDFIX1 (owner L1996/L1982/L1990 + THUROOT1 L2023 approved thu t7 words): ONE robe over the inner dress (no layered neckline, no inner top, no open outer robe),
    # the square neckline framed on all sides by the pearl-edged gold band; main is kept in the signature (store gate regex), not written.
    if short: return (f"a SQUARE neckline at a modest height (no crossed collar), framed (across the upper chest AND up both sides to the shoulders) by a wide flat pearl-edged gold-embroidered band, "
                      f"this one robe worn over a {sec} inner dress; NO crossed wrap collar")
    return (f"a SQUARE neckline at a modest height (no crossed collar), framed (across the upper chest AND up both sides to the shoulders) by a wide flat pearl-edged gold-embroidered band, "
            f"always fully visible, this one robe worn over a {sec} inner dress; {HQP_NO}")
HQP_SLOT=re.compile(r"a near-empress ceremonial robe of ([^,]+?) silk, ")
def hqp_store(store,prompt):
    """-> store with the prompt's HQP block when the prompt holds a valid one (template, any colour words), else store unchanged."""
    m=HQP_SLOT.search(store)
    if not m: return store
    for short in (False,True):
        import lowneck_L2228 as _LN; _g76=(lambda x:_LN.post(x)[0]) if _LN.PHRASE in prompt else (lambda x:x)   # G76 (owner L2228): a18-a36 HQP words read with the low-neckline swaps
        rx=re.escape(_g76(f"a near-empress ceremonial robe of {m.group(1)} silk with "+hqp_layer("\x00","\x01",short)+"; the robe ")).replace(re.escape("\x00"),"([^,;()]+?)").replace(re.escape("\x01"),"([^,;()]+?)")
        pm=re.search(rx,prompt)
        if pm and _g76(HQP_CAPE+HQP_OPEN+", ") in prompt and store.count(HQP_CAPE)==1:   # BUILDFIX5: + the L2119 one-tier vân kiên form
            return store.replace(m.group(0),pm.group(0),1).replace(HQP_CAPE,HQP_CAPE+HQP_OPEN+", ",1)
    return store
def thu_fabric_waiver(text, scope):
    """BUILDFIX3 (ROOT-B2 answer 1): a thu t4/t5 ladder prompt (G53 square-collar words, no WINTER) carrying the approved M06 thin-silk FABRIC sentence."""
    import winter_g28
    if scope not in ("tp4", "tp5") or winter_g28.is_winter(text): return False
    sys.path.insert(0, os.path.join(ART, "store-all")); import build_all as _ba
    m06 = master_common.sentences()[master_common.ids().index(master_common.M06_ID)]
    return (_ba.is_thu(text) or SEASON_ARG == "thu") and m06 in text   # G76 (owner L2228): a18-a36 thu cells no longer carry the G53 square-collar marker words -> --season thu marks them
SEASON_ARG = None   # BUILDFIX3: --season xuan|ha|thu|dong given to the store gate
def store_check(pf, prompt, args):
    """STORE GATE (owner Lượt 371/373/375), unchanged logic: -> list of (best, sentence) missing/rewritten."""
    B=os.path.join(ART,'t8-prompt-B')
    store=subprocess.run(['python3','build.py']+args,cwd=B,capture_output=True,text=True).stdout
    import winter_g28   # SEASON đông (G25): t1-t3 winter wear the old crossed collar = the store's own a36 Outfit sentence
    _w25=winter_g28.is_winter(prompt) and '--low' in args and int(args[args.index('--low')+1])<=3
    if _w25 and 'Outfit (' in store:
        _a=[x for i,x in enumerate(args) if not (x=='--age' or (i and args[i-1]=='--age'))]+['--age','a36']
        _s36=subprocess.run(['python3','build.py']+_a,cwd=B,capture_output=True,text=True).stdout
        store=store.replace(winter_g28.outfit(store),winter_g28.outfit(_s36),1)
    if winter_g28.is_winter(prompt) and args and not args[0].startswith("-"):   # PALFIX c3 (owner L1419, B26FAB5): winter colours = her B20 đông palette -> the same word swap on the store text
        sys.path.insert(0,os.path.join(ART,"store-all")); import build_all as _ba
        _wp=_ba.winter_pairs(args[0])
        if _wp: store=_ba.b20_winter_words(store,_wp)
    sys.path.insert(0,os.path.join(ART,"store-all")); import build_all as _ba
    if SEASON_ARG in ("xuan","ha") and args and not args[0].startswith("-") and not winter_g28.is_winter(prompt):   # BUILDFIX3: xuân / hạ cells = her season palette on the store text (as the builder); before, the gate compared them with root colours
        store=_ba.season_store(store,args[0],int(args[args.index('--low')+1]) if '--low' in args else 7 if '--t7' in args else 8,SEASON_ARG)
    if not winter_g28.is_winter(prompt) and (SEASON_ARG=="thu" or (SEASON_ARG is None and _ba.is_thu(prompt))) and args and not args[0].startswith("-") and ('--low' not in args or int(args[args.index('--low')+1])<=6):   # BUILDFIX3: t7 (--t7) / t8 (no rank arg) too; BUILDFIX2 THU: palette + thu ladder words (G53) on the store text, as the builder
        _rk=int(args[args.index('--low')+1]) if '--low' in args else 7 if '--t7' in args else 8
        store=_ba.season_store(store,args[0],_rk,"thu")
        for _bp in _ba.THU_TRIMS+_ba.THU_TRIMS_RANK.get(_rk,()):   # BUILDFIX2: thu length trims (boilerplate the approved thu files go without) are optional
            if _bp.strip() not in prompt: store=store.replace(_bp,"",1)
    m=G15_T3_OLD.search(store)
    if m:   # G15: the t3 design words must be option B (main/secondary = any words, motif = the store's motif), never the old t3 design
        _age='a36' if _w25 else (args[args.index('--age')+1] if '--age' in args else None)   # SEASON đông: t3 winter = G15 option B with the a36 crossed collar (G21/G25)
        _g15=g15_t3_words(_age); _g15=winter_g28.fabric_form(_g15) if winter_g28.is_winter(prompt) else _g15
        if " brocade girdle" not in prompt and " silk girdle" in prompt and "WINTER:" not in prompt: _g15=master_common.b32_post(_g15,3)[0]   # BUILDFIX5 B32 (owner L2122): thu t3 girdle = silk   # SEASON đông: G28 opaque shawl inside the t3 words
        if __import__("lowneck_L2228").PHRASE in prompt: _g15=__import__("lowneck_L2228").post(_g15)[0]   # G76 (owner L2228): a18-a36 t3 option-B words with the one low-neckline phrase
        rx=re.escape(_g15).replace(re.escape('{main}'),'(.+?)').replace(re.escape('{sec}'),'(.+?)').replace(re.escape('{motif}'),re.escape(m.group(1)))
        store=store[:m.start()]+store[m.end():]
        if not re.search(rx,prompt): return [(0,'G15 Quý nhân t3 option-B outfit words missing (dev/handover/reports/quy-nhan/m13_a26_t3_v2_optB.prompt.txt)')]
    if scope_from_store_args(args) in ("tp6","tp7","tp8"): store=master_common.new_words_unswap(store)   # BUILDFIX5: the season store text already carries the L2119/B32 words (season_post) -> old words first; swapped back below
    store=hqp_store(store,master_common.new_words_unswap(prompt))   # HQP COLLAR (L1384)   # BUILDFIX5: slot regex on the old words (L2119/B32 new words put back first)
    store=re.sub(r"(?:,|;) a sheer silk shawl(?=[;.,])","",store)   # G36 (owner L1446): the store shawl words are optional (builder xuân/đông drop them)
    _sc=scope_from_store_args(args); store=master_common.b29_store_swap(store,prompt,_sc,master_common.high_scope(_sc),master_common.doan_scope(_sc),winter_g28.is_winter(prompt))   # B29 (owner L1556/L1558): the group's table sentence may stand in the fabric slot
    store=master_common.b32_store_swap(store,prompt,_sc)   # BUILDFIX5 B32 (owner L2122): thu t6-t8 brocade store words read as the t1-t5 thu fabric words
    store=master_common.l2119_store_swap(store,prompt)   # BUILDFIX5 L2105/L2119: old vân kiên / cape store words read as the new words when the prompt has them
    import lowneck_L2228 as _LN; store=_LN.store_swap(store,prompt)   # G76 (owner L2228): a18-a36 low neckline -> the store collar words read as the one phrase when the prompt has it
    for _o,_n in master_common.doan_cuts_made(prompt,scope_from_store_args(args)):   # B26 length exception (Foreman C #5 (a)): the same master-repeat clauses cut from the store text (prefix + necessity rule)
        store=store.replace(_o,_n,1)
    sp=lambda s:[x.strip() for x in re.split(r'(?<=[.;])\s+',s) if len(x.strip())>12]
    P=sp(prompt); bad=[]
    for s in sp(store):
        if s in prompt or s.startswith(SLOT): continue
        w=set(re.findall(r"[a-zA-Z']+",s.lower()))
        best=max((len(w & set(re.findall(r"[a-zA-Z']+",p.lower())))/max(1,len(w)) for p in P),default=0)
        if best<0.9: bad.append((round(best,2),s[:160]))
    return bad
# SLOT sentences: per-person / per-pose / ref-order / background lines that the builder itself swaps (allowed to differ)
SLOT=('Her face:','Pose:','she holds','Her hands','pretty silver hairpins','silver and pearl hairpins','pearl-tipped hairpins','two or three slim pearl hairpins','her signature colour','her ORIGINAL robe colour','Hair:','face clearly visible','From the identity reference','From image 1','do NOT copy','The style reference','Image 2 is','The first reference image','the background is completely transparent','Image 3 is','the royal yellow in the robe','Her eyes','Eyes soft','the robe itself is clearly')


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


S14_L1794 = 'HOÀNG QUÝ PHI LUXURY: richer than every lower rank: more jade, pearls, gold and a few smooth red gems on the phoenix crown, pearl and jade trims along the cape edges; still clearly simpler and less golden than the Empress.'   # owner L1794 + L1799: jade/pearl/gold; red gems only on the crown, never on clothing; S14 override OK'd by Foreman C #22
S14_VK = S14_L1794.replace('trims along the cape edges', 'trims along the vân kiên edges')   # ROOT-B1/ROOT (G67, 21/11): thu t7 has no cape -> 'vân kiên edges' form accepted in the S14 slot too
# SUPERSEDED (owner L1825: approved G26 ladder W01/W02/W03 verbatim, t8 = t7 width); kept only so the old _L1803 files still read. owner L1803 (winter1 sheet s62_dong_coLong): fur t1-t3 DOUBLE, t4-t6 DOUBLE AGAIN, t7 a little thicker, t8 keep the sheet sentence; accepted forms in the W01/W02/W03 slots, OK'd by Foreman C #23 (REVERT2)
W01_L1803 = "WINTER: a THICK band of soft plain ivory-white fur trim, DOUBLE the width and thickness of a slim trim, about four fingers wide, along her collar, the front edges and hem of her outer garment, and her cuffs, visibly warm and cosy, yet lying smooth and close, never puffy or bulky; the same plain ivory at every rank, no coloured fur, never covering her face or neck, the neckline keeps its shape."
W02_L1803 = "WINTER: a VERY THICK, luxurious band of soft plain ivory-white fur trim, twice as wide and twice as thick as at the three lower ranks, about two hands wide, along her collar, the front edges and hem of her outer garment, and her cuffs, rich, warm and cosy, yet lying smooth and close, never puffy or bulky; the same plain ivory at every rank, no coloured fur, never covering her face or neck, the neckline keeps its shape."
W03_L1803_T7 = "WINTER: a WIDE, THICK and luxurious band of dense, plush soft plain ivory-white fur trim, a little wider and fuller than at the ranks below, about two and a half hands wide, along her collar, the front edges and hem of her outer garment, and her cuffs, rich, warm and sumptuous, yet neat and elegant; the same plain ivory at every rank, no coloured fur, never covering her face or neck, the neckline keeps its shape."
W03_L1803_T8 = "WINTER: soft plain ivory-white fur trim along her collar, the front edges and hem of her outer garment, and her cuffs; the same ivory fur at every rank, no coloured fur, never covering her face or neck."
W_L1803 = {"W01": (W01_L1803,), "W02": (W02_L1803,), "W03": (W03_L1803_T7, W03_L1803_T8)}
S13_THU_L2041 = 'CAPELET CUT (flowing): its lower edge and collar lines are soft CURVES, never flat; the lower edge is {shape}; graceful (uyển chuyển), never boxy.'   # owner L2041 (thu Tần t4, one SQUARE collar, capelet OPEN at the front): approved s62_t4_THU_L2041 drops the throat-clasp / long-V clause (BUILDFIX2)
S13_COMOI = 'CAPELET CUT (flowing): its lower edge and collar lines are soft CURVES, never flat; the lower edge is {shape}; the outer robe closes only at the sash, never at the throat, never buttoned down the front, opening gradually in a long soft V toward the hem, graceful (uyển chuyển), never boxy.'

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
        # BUILDFIX3 (X08 m13 / X11 m43 family): the builder puts the EYES sentence between 'Her face: …' and 'Expression: …', so the whole
        # face_words string is never found verbatim -> also strip each of its sentences (each one still verbatim owner words, ≥ 40 chars)
        _KC_FACES = _KC_FACES + [x for f in _KC_FACES for x in re.split(r"(?<=\.)\s+(?=[A-Z])", f) if len(x) >= 40 and x not in _KC_FACES]
    for f in _KC_FACES:
        if f in text: text = text.replace(f, " ")
    return text
# B19 NO GREY (owner Lượt 591, BW4): grey as an outfit colour (main/secondary/any colour slot). FLAG for now (listed for ROOT-51, who gets the
# replacement colours from the owner); set B19_FAIL=True once the people's data has no grey left. Hair ("silver-grey streaks/strands") and negated clauses ("never grey") are not outfit colours.
B19_FAIL = True   # BW4: owner table wired (Lượt 603), grey data gone -> grey = FAIL
# BUILDFIX4 (owner L2096 "Hồng tro ok, chỉ là cấm màu xám thôi"): 'ash' words removed -> 'ash rose' (hồng tro) allowed; only grey / gray colours banned.
GREY_RX = re.compile(r"\b(?:silvery[- ]grey|silver[- ]grey|pale[- ]grey|grey[- ](?:blue|sage|lilac|green|white|rose|pink)|(?:blue|pink|green|sage|lilac|rose)[- ]grey|grey(?:ish)?|gray(?:ish)?)\b(?![- ]?(?:streaks|strands|hair|mixed|patch|at the temples))", re.I)
def grey_hits(text):
    """-> list of grey colour phrases in the text that are not negated and not about hair (B19)."""
    out = []
    for m in GREY_RX.finditer(text):
        if negated(text, m.start(), m.end()): continue
        ctx = text[max(0, m.start() - 40):m.end() + 20]
        if re.search(r"hair|temples|eyebrow|brows", ctx, re.I): continue
        out.append(ctx)
    return out
# MG3 (owner Lượt 784 item 6, B20 Lượt 763/769/770): a FACE prompt of a known person must carry exactly her ROOT hex pair
# (L27: root_drawn of the root season when present; else s-ids: face-common/s_root_colours.json; others: palettes_season.json, the season marked root:true) and no other #hex; old / self-picked hex = FAIL.
PROMPT_MAX = 10000   # MG3: the Magnific gen tool refuses prompts over 10 000 characters (Thái hậu a51 L781 = 10 229 -> refused) -> FAIL before the gen
HEX_RX = re.compile(r"#[0-9A-Fa-f]{6}\b")
# NOFRUIT (owner Lượt 1052/1054, 20/11, rule F16): "Thôi, đừng có cho cầm trái cây. Cứ như là đi bán buôn gì đó" + "Cái người nào mà lỡ vẽ mà cầm
# trái cây ở bậc thiếu nữ rồi thì thôi kệ, đừng có vẽ lại, nhưng mà trong cái prompt mình nên sửa lại ở những bậc sau, cái đồ mà họ cầm tay là phải thay đổi."
# Every scope: a fruit word in a HOLD sentence (holding / holds / held / cradling / carrying / hugging / in her hand) = FAIL. Colour words
# (peach pink, apricot, orange…), blossoms (peach / plum / pear blossom), peach-wood, pomegranate flowers (embroidery) and face shapes are not fruit.
# Owner correction (Lượt 1058): "Không cầm trái cây là cho tất cả mọi người, tất cả mọi độ tuổi, chứ không phải là chỉ có độ tuổi 36 trở lên." -> NO exemption in any
# prompt for a future gen. Already-drawn pictures stay (no redraw); their drawn prompts are kept as records in face-common/legacy_fruit/ (FRUIT_FROZEN) and FAIL if reused.
FRUIT_FROZEN = {"s44": "small red pomegranate (s44.v5 Sắc sảo 79foGbpJAL + s44.qr Quyến rũ DoOgxICpcl)", "s64": "golden-orange loquats (s64.v5 JNChlRROq4, Lượt 1046)"}
FRUIT_RX = re.compile(r"\b(?:fruits?|peach(?:es)?|pomegranates?|persimmons?|loquats?|lychees?|litchis?|longans?|grapes?|jujubes?|kumquats?|tangerines?|mandarin oranges?"
                      r"|citrons?|buddha'?s[- ]hands?|apples?|pears?|plums|cherries|melons?|gourds?|figs|dates|bananas?|mangoes|mangos?|trái cây|hoa quả|quả)\b"
                      r"(?![- ]?(?:blossoms?|flowers?|wood|pink|orange|cream|ivory|silk|colou?r|tone|tint|shade|coral|salmon|beige|gold|shaped|cheeks?|red|rose|blush|sorbet|ribbons?|sash|skirt|robe|top|trim|cord|tassels?|thread|satin|brocade|cotton|lining|border|hem|bow|apricot|sand|tan|nude|doorway|door|window|arch|tinged|piping|edging|edges?|bands?|binding|panels?|collars?|sleeves?|cuffs?|layers?|dress|gauze|stole|veil|capelet|cape|vest|jacket|embroidery|accents?|lace|petals?))", re.I)   # BUILDFIX3: 'peach-tinged' = a palette colour word (thu m20/m29/c06 t6)   # BUILDFIX4: + cloth / trim nouns after a colour word ('pastel peach piping', xuân s39 t2 false F16)
HOLD_RX = re.compile(r"\bPose:|\b(?:hold(?:s|ing)?|held|cradl(?:es|ing)|carr(?:y|ies|ying)|hugg?(?:s|ing)|grips?|gripping|rais(?:es|ing)|lift(?:s|ing)|offer(?:s|ing)|present(?:s|ing)|show(?:s|ing)|tw(?:irl|irling|irls)|clasp(?:s|ing)?|(?:in|with) (?:her|his|one|both|each) hands?|in her palm|cầm|ôm|bưng)\b", re.I)
def fruit_fails(text, scope=None, pid=None):
    out = []
    for sent in re.split(r"(?<=[.;])\s+", text):
        if not HOLD_RX.search(sent): continue
        if sent.lstrip().startswith("HELD ITEM COLOUR:"): continue   # BUILDFIX2: the B15 item-colour law names only her robe colours (light pale tangerine, pastel peach …), never a held object
        for m in FRUIT_RX.finditer(sent):
            if re.search(r"colou?r(?: family)?(?: is)? $", sent[max(0, m.start() - 20):m.start()], re.I): continue   # BUILDFIX1: a colour NAME (her robe colour persimmon) is not a held fruit
            if NEG.search(sent[max(0, m.start() - 30):m.start()]): continue   # 'no fruit', 'never a peach' (a later 'never …' in the clause does not excuse it)
            out.append(("F16", "NOFRUIT", f"fruit in a held item (owner Lượt 1052/1054/1058: nobody holds fruit, any rank, any age): …{sent[max(0, m.start()-60):m.end()+30]}…")); break
        if out: break
    return out
# NOVASE (owner L1438 20/11 "no vase for anyone" + L1642 21/11, verbatim: "bỏ hết tất cả các món đồ mà cầm cái bình hoa"): in EVERY scope a vase / flower vase
# in a HOLD sentence (Pose: / holding / held / cradling …) = FAIL. Replacement items = lotus lamps (B26FAB4 list, dev/art/novase_L1642.py). Not a fail: "no vase",
# room décor, and the maid's "flower basket / bundle of flowers for the vases" (the vases are not held). DESIGN20.
VASE_RX = re.compile(r"(?<!for the )\b(?:vases?|bình hoa|lọ hoa|bình cắm hoa)\b", re.I)
def vase_fails(text):
    for sent in re.split(r"(?<=[.;])\s+", text):
        if not HOLD_RX.search(sent): continue
        for m in VASE_RX.finditer(sent):
            if NEG.search(sent[max(0, m.start() - 30):m.start()]): continue
            return [("F19", "NOVASE", f"held vase (owner L1438/L1642: nobody holds a vase, any rank/season/person; use the lotus lamp of the rank): …{sent[max(0, m.start()-60):m.end()+30]}…")]
    return []
# PETS (owner Lượt 1057/1059, 20/11, rule F17; table dev/art/t8-prompt-B/pets.py): a pet only at ages 18/26, only kc (thiếu nữ) / face and ranks 1–6;
# none at t7 HQP, t8 HH, Thái hậu, triều phục, Nữ đế, maids/states, ages 36+; the animal only IN CONTACT, never beside her / at her feet.
PET_RX = re.compile(r"\b(?:rabbits?|bunn(?:y|ies)|kittens?|cats?|pupp(?:y|ies)|dogs?|sparrows?|butterfl(?:y|ies)|doves?|canar(?:y|ies)|lovebirds?|parrots?|nightingales?"
                    r"|orioles?|white-eye|kingfishers?|swallows?|songbirds?|birds?|cranes?|peacocks?|carps?|goldfish|fish|squirrels?|turtles?|deer|fawns?|chicks?|ducklings?|mynas?)\b(?! cage| shaped|-shaped|[- ]toys?| motif| pattern|[- ]blue|[- ]feathers?|[- ]inlay|[- ]green|-and-|[- ]silk|[- ]wings?| \(mõ\)|[- ]hairpin)", re.I)
PET_SENT_RX = re.compile(r"\bPose:|\b(?:she|he) holds\b|\bholding\b|\bhugging\b|\bcupped\b|\bperched\b|\bcradl\w*|\bin (?:her|his) arms\b|\bbeside (?:her|him)\b|\bat (?:her|his) feet\b", re.I)
PET_BESIDE_RX = re.compile(r"\b(?:beside (?:her|him)(?! cheek| face| ear| chin| hair| temple| shoulder)|at (?:her|his) feet|next to (?:her|him)|by (?:her|his) side|by (?:the|her) chair|at her side on the ground|sitting beside|standing beside)\b", re.I)
PET_SCOPES = {f"tp{i}" for i in range(1, 7)} | {f"pr{i}" for i in range(1, 7)} | {"state:kc", "face"}
# + kids (owner Lượt 1076, 20/11 ~07:20Z via ROOT-68: "Cung nữ nhà nghèo, nữ đế là không ôm thú cưng, công chúa trẻ con thì có ôm thú cưng."; FRUITPET2):
#   --scope girl = Công chúa kid-f at her drawn ages a4 a9 a14 a20; --scope boy = Hoàng tử kid-p at the child ages a4 a9 a14 (a20 = grown man: none). Maids, nhà nghèo, Nữ đế: none.
KID_PET_AGES = {"girl": ("a4", "a9", "a14", "a20"), "boy": ("a4", "a9", "a14")}
def pet_fails(text, scope=None, age=None):
    out = []
    for sent in re.split(r"(?<=[.;])\s+", text):
        if not PET_SENT_RX.search(sent) or "Every hairpin" in sent: continue
        m = PET_RX.search(sent)
        if not m or NEG.search(sent[max(0, m.start() - 30):m.start()]) or re.search(r"\b(?:embroider\w*|motifs?|pattern|painted|carved|woven|jade|gold|silver|toy|scroll|painting|wooden|sandalwood|kite|lantern|fan|hairpin)\b[^,;]{0,40}$", sent[:m.start()], re.I): continue
        ctx = sent[max(0, m.start() - 60):m.end() + 40]
        if scope in KID_PET_AGES:
            if age not in KID_PET_AGES[scope]: out.append(("F17", "PET AGE", f"kid pet at age {age} (owner 20/11: công chúa {'/'.join(KID_PET_AGES['girl'])}, trẻ con {'/'.join(KID_PET_AGES['boy'])}; --age required): …{ctx}…")); break
        elif scope not in PET_SCOPES: out.append(("F17", "PET RANK", f"pet in a rank/state without pets (owner Lượt 1059: only thiếu nữ + ranks 1–6 + công chúa / trẻ con): …{ctx}…")); break
        elif age and age not in ("a18", "a26"): out.append(("F17", "PET AGE", f"pet at age {age} (owner Lượt 1059: only 18–26): …{ctx}…")); break
        if PET_BESIDE_RX.search(sent): out.append(("F17", "PET BESIDE", f"pet beside her, not in contact (owner Lượt 1057): …{ctx}…")); break
    return out
DEEP_COLOUR_RX = re.compile(r"\b(?:deep|dark|darker|deeper|dusky)[- ](?:blue|violet|blue-violet|purple|green|red|pink|rose|plum|teal|jade|navy|burgundy|crimson|wine|aubergine|lilac|lavender|aqua|aquamarine|turquoise|coral|peach|gold|yellow|orange|mint|periwinkle|emerald|sapphire|indigo|magenta|mauve|ochre|cyan|celadon|olive|maroon|scarlet|ruby|amber)\b", re.I)
DEEP_ROOT_IDS = {"s44"}   # ids whose root pair is read from palettes_season_deep.json (ROOT-64, s44 only)
DEEP_SEASON_TRIAL = {"c06": ["thu", "ha"]}   # ROOT-65 Lượt 982 owner "Vẽ 1 cô thử theo bảng màu mới" (thu) + "Làm thử cô đó màu hạ xem" (ha, PR19): trial gens, pair = one of these seasons of palettes_season_deep.json (the one the prompt carries)
def root_pair(pid):
    """-> (main_hex, sec_hex) of the person's ROOT palette, or None when the id has none (Kho / Công chúa / unknown)."""
    if not pid: return None
    fc = os.path.join(ART, "face-common")
    if pid in DEEP_SEASON_TRIAL:
        v = json.load(open(os.path.join(fc, "palettes_season_deep.json"), encoding="utf-8"))[pid][DEEP_SEASON_TRIAL[pid][0]]
        return (v["main_hex"].upper(), v["sec_hex"].upper())
    if pid in DEEP_ROOT_IDS:   # F3/ROOT-64: s44 sec sage grey -> sage green (owner 'Xám là bỏ hết'); pair lives in P3's palettes_season_deep.json
        dp = json.load(open(os.path.join(fc, "palettes_season_deep.json"), encoding="utf-8")).get(pid, {})
        for k, v in dp.items():
            if isinstance(v, dict) and v.get("root"): return (v["main_hex"].upper(), v["sec_hex"].upper())
    ps = json.load(open(os.path.join(fc, "palettes_season.json"), encoding="utf-8")).get(pid)
    # L27 (owner 20/11 'Giữ lại bảng áo đậm màu' + 'Thôi đại đi, có người màu này màu kia'): a person with a root_drawn entry
    # (the DEEP colours her picture was drawn in) -> new/redrawn pictures use root_drawn, not the softened Lượt 769/770 codes.
    if isinstance(ps, dict):
        for k, v in ps.items():
            if isinstance(v, dict) and v.get("root") and isinstance(v.get("root_drawn"), dict):
                return (v["root_drawn"]["main_hex"].upper(), v["root_drawn"]["sec_hex"].upper())
    sr = json.load(open(os.path.join(fc, "s_root_colours.json"), encoding="utf-8"))
    if pid in sr and pid != "_note": return (sr[pid]["main_hex"].upper(), sr[pid]["sec_hex"].upper())
    if isinstance(ps, dict):
        for k, v in ps.items():
            if isinstance(v, dict) and v.get("root"): return (v["main_hex"].upper(), v["sec_hex"].upper())
    return None
def root_hex_fails(text, pid):
    rp = root_pair(pid)
    if not rp: return []
    have = {h.upper() for h in HEX_RX.findall(text)}
    if pid in DEEP_SEASON_TRIAL:   # trial: the season pair the prompt carries (most hexes present)
        dp = json.load(open(os.path.join(ART, "face-common", "palettes_season_deep.json"), encoding="utf-8"))[pid]
        prs = [(dp[k]["main_hex"].upper(), dp[k]["sec_hex"].upper()) for k in DEEP_SEASON_TRIAL[pid]]
        rp = max(prs, key=lambda p: sum(h in have for h in p))
    out = []
    miss = [h for h in rp if h not in have]
    if miss: out.append(("B20", "ROOT HEX", f"{pid}: root pair {rp[0]}/{rp[1]} required, missing {', '.join(miss)}"))
    extra = sorted(have - set(rp))
    if extra: out.append(("B20", "ROOT HEX", f"{pid}: hex not in her root pair (old or self-picked): {', '.join(extra)}"))
    return out
# MG3 (owner Lượt 784 item 7 = B24, owner Lượt 726/728/766): ONE rank colour per rank. A triều phục prompt (scope trieuN) must carry
# the B24 hex of rank N and no other rank's B24 hex (royal yellow #EFBD69 allowed at t6+: 'small royal-yellow touch' / t8 itself)
# and none of the dead option-B / old codes.
B24_HEX = {1: "#EAE3D0", 2: "#7FB394", 3: "#7E9CCB", 4: "#E3A3B8", 5: "#A88BCB", 6: "#E3A25B", 7: "#D46A64", 8: "#EFBD69"}
B24_DEAD = {"#5FA8A6": "old t4 jade-teal (option B)", "#4F86A8": "old t6 kingfisher blue (option B)"}
def b24_fails(text, scope):
    m = re.fullmatch(r"trieu(\d)", scope or "")
    if not m: return []
    n = int(m.group(1)); have = {h.upper() for h in HEX_RX.findall(text)}; out = []
    if B24_HEX[n] not in have: out.append(("B24", "RANK HEX", f"triều t{n}: rank colour {B24_HEX[n]} missing (B24 Lượt 726/728)"))
    other = sorted(h for k, h in B24_HEX.items() if k != n and h in have and not (h == "#EFBD69" and n >= 6))
    if other: out.append(("B24", "RANK HEX", f"triều t{n}: another rank's B24 colour in the prompt: {', '.join(other)}"))
    dead = sorted(f"{h} ({w})" for h, w in B24_DEAD.items() if h in have)
    if dead: out.append(("B24", "DEAD HEX", f"triều t{n}: dead rank code(s): {', '.join(dead)}"))
    return out
# MG3 (owner Lượt 806 angle audit, E1 Lượt 469/476/440): an "ANGLE: …;" sentence must be one of the 14 store angles (build.py ANG14) or the
# triều phục angle words (build.py _TA_NF/_TA_TQ/_TA_MID left/right) — invented / dead angle words (e.g. "walking STRAIGHT TOWARD the viewer") = FAIL.
def _angles():
    import ast
    src = open(os.path.join(ART, "t8-prompt-B", "build.py"), encoding="utf-8").read(); v = {}
    for n in ast.parse(src).body:
        if isinstance(n, ast.Assign) and len(n.targets) == 1 and getattr(n.targets[0], "id", "") in ("ANG14", "_TA_NF", "_TA_TQ", "_TA_MID"):
            v[n.targets[0].id] = ast.literal_eval(n.value)
    return set(v["ANG14"]) | {v[k].format(s=x) for k in ("_TA_NF", "_TA_TQ", "_TA_MID") for x in ("left", "right")}
ANGLES_OK = _angles()
ANGLE_RX = re.compile(r"\bANGLE: (.+?);")
def angle_fails(text):
    return [("E1", "ANGLE", f"angle words not in the 14-angle table (E1): '{m.group(1)[:90]}'") for m in ANGLE_RX.finditer(text) if m.group(1).strip() not in ANGLES_OK][:1]
# K18 LIVE GAME HANDS-OFF (owner Lượt 591, BW4): a live game picture path (img/fig-*, img/hd/*, any img/ path outside img/_review and img/_keep) in the prompt or --refs = FAIL.
K18_LIVE = re.compile(r"(?:^|[/\s\"'(,])(img/(?!_review/|_keep/)[\w./-]+|fig-[\w-]+\.(?:webp|png|jpg))")
FLOOR_SLEEVE_RX = re.compile(r"(?:SLEEVE LENGTH|SLEEVES:)[^.]*(?:touch(?:es|ing)? the floor|sweep(?:s|ing)? the floor|reach(?:es|ing)? the floor|to the floor)", re.I)   # SL1: floor-length sleeve sentence (any wording)


# G23 (owner 20/11 verbatim: "Sửa cái prompt, cái chân lại cho nó phù hợp đi."): a walking pose and "still and straight" in the same prompt = contradiction -> FAIL
WALK_RX = re.compile(r"\bwalk(?:s|ing)?\b|mid-step|\bstep(?:s|ping)?\b(?! stool)|\bstrid(?:e|es|ing)\b|\bstroll", re.I)
def walk_still_fails(text):
    m = re.search(r" Pose: (.+?)\.(?: |$)", text); pose = m.group(1) if m else text
    if WALK_RX.search(pose) and re.search(r"still and straight", text, re.I):
        return [("G23", "WALK+STILL", f"walking pose ('{WALK_RX.search(pose).group(0)}') and 'still and straight' in the same prompt")]
    return []


def out1_fails(text):
    """G40 OUT1 (owner L1592, corrects L1590): the OUTER robe is HELD IN by the sash/girdle tied over it on all 8 tiers, never a loose open coat
    hanging outside. -> (fails, warns)."""
    f, w = [], []
    m = re.search(r"(outer (robe|garment|layer)|upper garment|over-?robe)[^.;]{0,120}\b(hangs?|hanging|falls?|worn)[^.;]{0,40}\b(outside|over) the (sash|girdle|belt|ribbon band)", text, re.I)
    if m and not re.search(r"never a loose open coat", m.group(0), re.I):
        f.append(("OUT1", "OUTER OUTSIDE", f"outer layer hangs outside the sash (G40, owner L1592: held in by the sash, all 8 tiers): …{m.group(0)[:160]}…"))
    if re.search(r"outer robe worn OPEN at the front", text) and not re.search(r"HELD IN by the sash", text):
        w.append(("OUT1", "OUTER NOT HELD IN?", "open outer robe without the G40 clause master_common.OUTER_IN (owner L1592: held in by the sash, all 8 tiers)"))
    return f, w

# G43 MAIDS NO JADE PENDANT (owner L1608 21/11, verbatim: "Sửa lại là cung nữ là sẽ không có đeo ngọc bội, nhưng mà đổi lại thì cung nữ có thể đeo túi thơm nha."):
# a maid prompt (cung nữ any grade, thân cận, chưởng sự cô cô, ma ma) with a jade pendant / jade disc / ngọc bội = FAIL; (G59, owner L1874: sachets are gone too - no sachet at the sash either)
G43_MAID_RX = re.compile(r"\b[Cc]ung n[uữ]\b|\bA (?:[\w-]+ ){0,3}palace maid\b|\bA palace ma ma\b|\b[Cc]huong su co co\b|\b[Cc]hưởng sự\b|\bmistress of servants\b")   # subject words only (case-sensitive "A ..."): a consort line "finer than a palace maid's" is not a maid
G43_JADE_RX = re.compile(r"\bjade (?:or tassel )?pendants?\b|\bjade discs?\b|\bngọc bội\b|\bngoc boi\b", re.I)
def g43_fails(text, scope=None):
    if not (scope == "mama" or G43_MAID_RX.search(text)): return []
    m = G43_JADE_RX.search(text)
    return [("G43", "MAID JADE PENDANT", f"maids wear no jade pendant (owner L1608) and no sachet (G59, owner L1874): …{text[max(0, m.start()-60):m.end()+30]}…")] if m else []

# G45 JADE PENDANT VISIBLE (owner L1622 21/11, verbatim: "... cái tay để đó ok, miễn sao rằng là không có cái tà áo hay cái gì đó nó che cái ngọc bội hết ..."):
# hands / the held item in front of the waist are FINE (the pendant is a layer behind the hands in game); words that put a SLEEVE, robe flap, shawl,
# stole, cape or any cloth over the waist / sash front / pendant = FAIL. Negated wording ("no sleeve ... over it", "kept clear of") passes. POSEFIX1.
G45_RX = re.compile(r"\b(?:hands?|arms?) (?:folded|clasped|hidden|tucked|crossed)[^.;,]{0,30}\b(?:under|in|inside|within) (?:the |her )?(?:long |wide )?sleeves?\b"
                    r"|\bsleeves? (?:folded|draped|crossed|hanging|falling|gathered|covering)[^.;,]{0,12}\b(?:over|across|in front of) (?:the front of )?(?:her )?(?:waist|belly|sash|girdle|belt|jade|pendant)"
                    r"|\b(?:shawl|stole|cape|scarf|robe flap|front flap|cloth|veil)[^.;,]{0,30}\b(?:over|across|covering) (?:the front of )?(?:her )?(?:waist|belly|sash front|girdle front|jade|pendant)"
                    r"|\badjusting her (?:belt |sash |girdle )?pendant", re.I)
def g45_fails(text):
    for m in G45_RX.finditer(text):
        pre = text[max(0, m.start()-25):m.start()].lower()
        if re.search(r"\b(no|never|not|without)\b[^.;,]*$", pre): continue
        return [("G45", "CLOTH OVER JADE", f"cloth over the waist / jade pendant (G45, owner L1622: hands are OK, no sleeve, robe flap, shawl or cloth over the pendant): …{text[max(0, m.start()-40):m.end()+30]}…")]
    return []

# G57 NO JADE PENDANT ANYWHERE (owner L1851 21/11, verbatim: "tất cả các cái prompt loại bỏ hết ngọc bội, không có cái prompt nào có ngọc bội để cho sau này mình chơi cái game gắn ngọc bội"):
# NO prompt (any scope / rank / season) may name a jade pendant / yupei / zupei / jinbu / ngọc bội / jade disc|plaque|ring on cords / jade(-and-gold) belt / belt pendant.
# Negated wording ("no pendants", "never on ... belt or pendants") passes. The hà bí chui (bí trụy) of the trieu block is a cape-band tip, not a waist pendant: exempt (foreman to confirm).
G57_RX = re.compile(r"\b(?:yu ?pei|zupei|jinbu|ngọc bội|ngoc boi)\b|(?<!\bno )(?<!\bor )(?<!\bear )(?<!\bear drop/)\bpendants?\b|\bjade (?:discs?|plaques? linked|rings?)\b", re.I)
# G57 (owner L1851, narrowed L1979): ONLY a jade pendant / ngọc bội worn on the BODY (sash, belt, girdle, waist, chest). A clause about a HELD item (flute, fan, ball, lantern, lamp, held...) is never matched.
G57_HELD = re.compile(r"\b(?:held|holds?|holding|in (?:the other|one|both|her) hands?|flute|fans?|parasol|lantern|tú cầu|silk ball|\bball\b|ruyi|scepter|lamp|basket|mirror|scroll|casket|tablet|incense|brush|book|letter|dance fans?|item)\b", re.I)
def g57_fails(text):
    t = re.sub(r"\bbí trụy \(帔坠\) pendant\b|\bthe pendant\b(?= hanging| hangs)|\bbelow the pendant\b", "", text)
    for m in G57_RX.finditer(t):
        a = max(t.rfind(",", 0, m.start()), t.rfind(";", 0, m.start()), t.rfind(".", 0, m.start()), t.rfind(":", 0, m.start()))
        bs = [x for x in (t.find(",", m.end()), t.find(";", m.end()), t.find(".", m.end())) if x >= 0]
        clause = t[a + 1:(min(bs) if bs else len(t))]
        if G57_HELD.search(clause): continue   # held item: free (owner L1979)
        _ps = t.rfind(" Pose: ", 0, m.start()); _pe = t.find(". ", _ps + 7) if _ps >= 0 else -1
        if _ps >= 0 and (_pe < 0 or m.start() < _pe) and not re.search(r"\b(?:waist|sash|belt|girdle|hip)\b", clause, re.I): continue   # BUILDFIX1: inside the Pose sentence = her held item (L1979)
        return [("G57", "JADE PENDANT", f"no jade pendant / ngọc bội worn on the body (owner L1851/L1979: the game attaches pendants later; held items are free): …{t[max(0, m.start()-50):m.end()+30]}…")]
    return []

# G59 NO SACHET ANYWHERE (owner L1874 21/11, verbatim: "Túi thơm là dẹp hết nha. Tất cả các prompt của các người túi thơm nè, ngọc bội là dẹp hết."):
# NO people prompt (any scope: consorts, maids, mama, all seasons) may name a sachet / túi thơm / scent pouch / perfume bag / hà bao / embroidered pouch. Supersedes the sachet-OK part of G43/G57.
G59_RX = re.compile(r"\bsachets?\b|\btúi thơm\b|\btui thom\b|\bscent(?:ed)? pouch\b|\bperfume bag\b|\bhà bao\b|\bha bao\b|\bfragrant pouch\b|\bembroidered pouch\b", re.I)
# G65 EMBROIDERY PLACEMENT + SIZE (owner L1952 via #27): bands/cuffs/trims/borders SMALL motifs only; big motifs on skirt panels / shoulder or chest-band roundels, never on the robe body. Logic in dev/art/g65_check.py.
def g65_rank_exempt(scope):
    """Owner L1971 (via #27): big flowers ALLOWED from t4 up; G65 bans them only for t1–t3 (and maids/ma ma stay small motifs)."""
    m = re.match(r"(?:tp|pr|trieu|t)(\d)$", str(scope or ""))
    return bool(m) and int(m.group(1)) >= 4
def g65_fails(text, scope=None):
    if g65_rank_exempt(scope): return []
    try:
        import g65_check
    except ImportError:
        sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); import g65_check
    return [("G65", "EMBROIDERY SIZE/PLACE", m) for m in g65_check.check(text)]
def g59_fails(text):
    m = G59_RX.search(text)
    return [("G59", "SACHET", f"no sachet / túi thơm in any prompt (owner L1874): …{text[max(0, m.start()-50):m.end()+30]}…")] if m else []

# G60 BOW CENTRED (owner L1890 21/11, verbatim: "Cái nơ không phải là nơ lệch qua một bên mà phải là cái nơ ngay giữa ... sửa lại cho tất cả các bậc, tất cả các mùa"):
# every waist / sash bow or knot is at the CENTRE front: words that put a bow / knot / ribbon / sash to one side, off-centre, at a hip, left/right = FAIL (negated "never to one side" passes).
G60_RX = re.compile(r"\b(?:bows?|knots?|sash(?:es)?)\b[^.;:]{0,30}\b(?:to one side|(?:at|on) (?:the|her|one) (?:left|right|side)|at the side|off[- ]?cent(?:re|er)|lopsided|slanted|crooked|asymmetric\w*)\b|\b(?:left|right|side|off[- ]?cent(?:re|er)(?:ed)?|lopsided|crooked)(?:-side)? (?:hip )?(?:bows?|knot)\b|\b(?:bows?|knot)\b[^.;:]{0,20}\bhip\b", re.I)
def g60_fails(text):
    for m in G60_RX.finditer(text):
        if re.search(r"\b(no|never|not|without)\b[^.;,]*$", text[max(0, m.start()-25):m.start()].lower()): continue
        return [("G60", "BOW NOT CENTRED", f"the bow / sash knot must be at the CENTRE front, never to one side (owner L1890): …{text[max(0, m.start()-30):m.end()+30]}…")]
    return []

# G61 FRONT WAIST FREE (owner L1905 21/11): in consort prompts (not men / emperor) no hand or held item may be placed in front of the waist / belly (the in-game ngọc bội slot):
# FAIL on a Pose / hands-and-body / holds sentence saying held / lowered / folded / clasped ... at|before|in front of|across her waist / belly / sash, "at waist height", "before the waist", "in her lap".
# Allowed: held to the side, raised at chest height, hanging from one hand at the side; "sleeves kept clear of the front of her waist" is fine.
G61_SENT = re.compile(r"(?:\bPose: |\b[Hh]er hands and body: |\bshe holds )[^.]*")
G61_RX = re.compile(r"\b(?:held|holding|hold|lowered|folded|clasped|cradled|resting|rested|hands?|item)\b[^.;]{0,50}\b(?:at|before|in front of|across|over|on|against) (?:her |the )?(?:waist|belly|abdomen|stomach|sash|lap)\b|\bwaist height\b|\bbefore the waist\b|\bin her lap\b", re.I)
def g61_fails(text, scope=None):
    if scope in ("men", "emperor"): return []
    for s in G61_SENT.finditer(text):
        if re.search(r"\b(?:he|his|him) ", s.group(0), re.I): continue
        for m in G61_RX.finditer(s.group(0)):
            if re.search(r"\b(no|never|not|without|clear of)\b[^.;,]*$", s.group(0)[max(0, m.start()-30):m.start()].lower()) or re.search(r"\b(?:no|never|not|without|clear of)\b", m.group(0), re.I): continue
            return [("G61", "HAND/ITEM AT FRONT WAIST", f"no hand or held item in front of the waist (owner L1905: the ngọc bội slot stays free; hold it at the side / chest height): …{s.group(0)[max(0, m.start()-30):m.end()+20]}…")]
    return []

# ======== GATE7 (owner L2021 via Foreman C ROOT: "những cái gì mà tao kêu là ghi xuống vô cái bộ máy prompt để duyệt đi đã đưa vào chưa?") ========
# Every owner prompt-word ruling of L1935–L2020 that had NO check is enforced here. Rank / season / era scoping is explicit per check.
def _rank(scope):
    m = re.match(r"(?:tp|pr|t)(\d)$", str(scope or "")); return int(m.group(1)) if m else None
def _sentences(text): return [s for s in re.split(r"(?<=\.)\s+", text) if s.strip()]
def _clause(text, a, b):
    lo = max(text.rfind(c, 0, a) for c in ".;:"); hi = [text.find(c, b) for c in ".;:"]; hi = min([h for h in hi if h >= 0] or [len(text)])
    return text[lo + 1:hi]
def _ctx(text, m, l=50, r=40): return text[max(0, m.start() - l):m.end() + r]
HAN_RX = re.compile(r"Han-dynasty|Thiết kế thời Hán|\bquju\b|khúc cư", re.I)
def is_han(text): return bool(HAN_RX.search(text))
def is_maid_text(text, scope=None): return scope in ("maid", "mama") or bool(G43_MAID_RX.search(text))
SQ_RX = re.compile(r"\bsquare (?:neckline|neck|collar|opening)\b|\bSQUARE (?:NECKLINE|collar|neckline)\b", re.I)
def _square_neck(text):
    """first NON-negated square-neckline mention (the gate's 'this file says square neck')."""
    for m in SQ_RX.finditer(text):
        if re.search(r"\b(?:no|never|not|without|instead of)\b[^.;,:]{0,25}$", text[max(0, m.start() - 30):m.start()], re.I): continue
        return m
    return None

# G35 NO CLEAVAGE WORDS (owner L1442 'bỏ cái câu prompt liên quan tới cái khe ngực ra, không có nhắc gì tới hết'; again L1990/L1996 on thu t7/t8):
# ANY scope: the word itself is banned, negated or not ('không có nhắc gì tới hết' = never mention it). A42 standard phrase is REVOKED.
G35_RX = re.compile(r"\bcleavage\b|khe ngực|khe nguc|\bd[ée]collet(?:é|e|age)\b|\bbust(?:line)?\b[^.;,]{0,20}\b(?:pushed|lifted|squeezed)\b|\bpush(?:ed)?[- ]up (?:bust|chest|breasts?)\b", re.I)
def g35_fails(text):
    m = G35_RX.search(text)
    return [("G35", "CLEAVAGE WORD", f"no cleavage / khe ngực wording at all, not even negated (owner L1442 'không có nhắc gì tới hết', L1996): …{_ctx(text, m)}…")] if m else []

# L1996 t7/t8 CHEST = LOWER-RANK NECKLINE (owner L1996 angry, via #27: t7/t8 chest words vs lower ranks; remove the inner-top / layered neckline and the pearl swags across the chest):
# scope tp7-8 / pr7-8 (everyday, every season/era; triều phục not touched). Supersedes the 'pearl strands across the chest' half of G35 (A48 later wins).
G96_INNER = re.compile(r"\bLAYERED NECKLINE\b|\binner top\b|\btube[- ]top\b|\bbodice\b|\btwo-garment look\b", re.I)
G96_PEARL = re.compile(r"\b(?:pearls?|pearl[- ]and[- ]gold)\b[^.;:]{0,40}\b(?:swags?|swagged|strands?|ropes?|festoons?|strings?|chains?|garlands?)\b[^.;:]{0,60}\b(?:across|over|on) (?:the |her )?(?:upper )?(?:chest|bust|bodice|breast)\b"
                       r"|\b(?:swags?|strands?|ropes?|festoons?|strings?|chains?|garlands?) of (?:small |fine |many |large )?pearls?\b[^.;:]{0,60}\b(?:across|over|on) (?:the |her )?(?:upper )?(?:chest|bust|bodice|breast)\b", re.I)
def g96_fails(text, scope):
    if _rank(scope) not in (7, 8): return []
    out = []
    for rx, kind, why in ((G96_INNER, "INNER TOP", "no layered neckline / inner top / bodice words at t7/t8: copy the lower-rank neckline"), (G96_PEARL, "PEARL SWAG", "no pearl swags / strands across the chest at t7/t8 (pearls may lie on the vân kiên)")):
        for m in rx.finditer(text):
            if negated(text, m.start(), m.end()): continue
            out.append(("G70", kind, f"{why} (owner L1996): …{_ctx(text, m)}…")); break
    return out

# G67 NO OUTER CLOAK FOR QP / HQP / HH (owner L1982 + L1714 row 15 + L1971 'only 2 layers'): t6/t7/t8 everyday, every season/era = the one robe over the inner dress;
# NO open outer robe, open coat, cloak, cape falling from the shoulders, mantle. Triều phục (trieu scopes) keep their cloak. Hán's quju + inner robe = the 2 layers (allowed).
G67_RX = re.compile(r"\b(?:cloaks?|mantles?|overcoats?|surcoats?|open coats?|open outer robes?|OPEN outer robe)\b|\bouter robe\b[^.;:]{0,40}\b(?:worn open|open at the front|OPEN at the front|falling (?:open )?from the shoulders)\b"
                    r"|\b(?:long|ceremonial|floor-length|full-length)\b[^.;:]{0,25}\bcape\b|\bcape\b[^.;:]{0,30}\b(?:falling|reaching|trailing) (?:from the shoulders |down )?to the (?:floor|ground|hem|ankles)\b|\ba third (?:robe|layer)\b", re.I)
def g67_fails(text, scope):
    if _rank(scope) not in (6, 7, 8): return []
    for m in G67_RX.finditer(text):
        if negated(text, m.start(), m.end()): continue
        if re.search(r"vân kiên|cloud[- ]collar|yunjian", _clause(text, m.start(), m.end()), re.I) and not re.search(r"cloak|mantle|coat|outer robe", m.group(0), re.I): continue
        return [("G67", "OUTER CLOAK", f"QP/HQP/HH = TWO layers only: no open outer robe / coat / cloak / long cape / mantle (owner L1982; triều phục keep the cloak): …{_ctx(text, m)}…")]
    return []

# G68 TẦN t4 DENSITY LOCK (owner L2006 on VX7nsw2MMU): everyday t4 a18/a26 (not Hán, not winter): the store words
# 'clearly more than at Thường tại, still fewer than the Phi' must be there and the superseded 'a few LARGE embroidered' must not.
G68_NEED = "(clearly more than at Thường tại, still fewer than the Phi)"
def g68_fails(text, scope, age=None, winter=False):
    if _rank(scope) != 4 or is_han(text) or winter or (age and age not in ("a18", "a26")) or is_maid_text(text, scope): return []
    if re.search(r"\ba few LARGE embroidered\b", text): return [("G68", "TẦN DENSITY", "old t4 words 'a few LARGE embroidered …' (owner L2006: a few MEDIUM … scattered on the robe body and the sleeves (clearly more than at Thường tại, still fewer than the Phi) and sprays … on the skirt front)")]
    if not _square_neck(text): return []   # G68 = the a18/a26 square-cut t4 words; the crossed-collar a36+ t4 is unchanged
    if G68_NEED not in text or not re.search(r"\ba few MEDIUM embroidered\b", text): return [("G68", "TẦN DENSITY", f"t4 Tần embroidery density lock missing: 'a few MEDIUM embroidered … {G68_NEED}' (owner L2006)")]
    return []

# G69 ĐÁP ỨNG t1 CHEST FLOWER (owner L2008): everyday t1 a18/a26 with the square-neckline words (not Hán, not winter, not maids): a small embroidered flower cluster at the CENTRE of the chest.
G69_RX = re.compile(r"\b(?:at|on) the (?:CENTRE|centre|CENTER|center) of (?:the|her) chest\b|\bchest[- ]cent(?:re|er)\b", re.I)
def g69_fails(text, scope, age=None, winter=False):
    if _rank(scope) != 1 or is_han(text) or winter or (age and age not in ("a18", "a26")) or is_maid_text(text, scope) or not _square_neck(text): return []
    return [] if G69_RX.search(text) else [("G69", "T1 CHEST FLOWER", "Đáp ứng t1 needs a sparse small embroidered flower cluster at the CENTRE of the chest (owner L2008)")]

# F19 HAIR FLOWER = BLOOM ONLY, NO LEAVES (owner L1723, again L2011; L2015: ONLY hair flowers; robe embroidery may keep leaves) + NO CHRYSANTHEMUM anywhere (L1723/L1726).
HAIRFL_RX = re.compile(r"\bfresh flower\b|\bhair[- ]flower\b|\bflowers? (?:tucked |pinned |set )?(?:in|into|beside|behind) (?:her|the) (?:hair|bun|ear)\b|\btucked beside the bun\b", re.I)
LEAF_RX = re.compile(r"\bleaf\b|\bleaves\b|\bleafy\b|\bfoliage\b|\bsprigs?\b|\bsprays?\b|\bgreen stems?\b|\bwith (?:its |a )?stem\b", re.I)
NOLEAF_RX = re.compile(r"\b(?:no|without) leaves\b|\bbloom only\b|\bbloom ONLY\b|\bleafless\b|\bonly the bloom\b|\bnever (?:any )?leaves\b", re.I)
def f19_hair_fails(text, scope=None):
    out = []
    hits = [m for m in HAIRFL_RX.finditer(text) if not negated(text, m.start(), m.end())]
    if hits:
        for m in hits:
            cl = _clause(text, m.start(), m.end())
            for lm in LEAF_RX.finditer(cl):
                if re.search(r"\b(?:no|never|without|not)\b[^,;]{0,25}$", cl[:lm.start()], re.I): continue
                out.append(("F19", "HAIR FLOWER LEAVES", f"hair flower = the bloom ONLY, no leaves / sprigs (owner L1723/L2011; embroidery may keep leaves, L2015): …{cl.strip()[:160]}…")); break
            if out: break
        if not out and not NOLEAF_RX.search(text):
            out.append(("F19", "HAIR FLOWER NO-LEAF WORDS", f"a hair flower is written but no 'bloom only, no leaves' words (owner L2011: the picture kept leaves): …{_ctx(text, hits[0])}…"))
    m = re.search(r"\bchrysanthemums?\b|\bhoa cúc\b", text, re.I)
    if m and not negated(text, m.start(), m.end()): out.append(("F19", "CHRYSANTHEMUM", f"no chrysanthemum anywhere, hair or embroidery (owner L1723/L1726): …{_ctx(text, m)}…"))
    return out

# L1990 / L1992 SQUARE NECKLINE = A FRAMED neckline (owner L1990: 'a FULL embroidered square frame (horizontal band + vertical bands up to the shoulders), not one horizontal band';
# L1992: the approved Quý phi eIPcGThdqL collar). Every consort file that says square neck (not maids): the square neckline sentence must say it is framed / edged by a band;
# t7/t8 (where L1990 was raised): the FULL frame words 'up both sides to the shoulders' must be there.
SQFRAME_RX = re.compile(r"\b(?:framed|edged|bordered|outlined|trimmed)\b[^.;]{0,150}\bband\b|\bband\b[^.;]{0,40}\b(?:framing|edging|bordering)\b", re.I)
SQFULL_RX = re.compile(r"\bup both sides\b[^.;]{0,30}\bshoulders\b|\bon ALL sides\b|\bframed on all four sides\b", re.I)
def l1990_fails(text, scope, winter=False):
    r = _rank(scope)
    if r is None or is_maid_text(text, scope): return []
    m = _square_neck(text)
    if not m: return []
    out = []
    if winter and r <= 5: out.append(("G25", "WINTER SQUARE NECK", f"winter = crossed collar (cổ chéo) for t1–t5, never a square neckline (G25; owner L1971 #4 'winter t4 square collar WRONG'): …{_ctx(text, m)}…")); return out
    s = next((x for x in _sentences(text) if _square_neck(x)), "")
    if not SQFRAME_RX.search(s): out.append(("G71", "SQUARE NOT FRAMED", f"the square neckline must be framed by an embroidered band (owner L1990/L1992): …{_ctx(text, m, 10, 160)}…"))
    elif r in (7, 8) and not SQFULL_RX.search(s): out.append(("G71", "SQUARE FRAME NOT FULL", "t7/t8 square neckline = FULL frame: 'framed on ALL sides (across the chest AND up both sides to the shoulders)' (owner L1990)"))
    return out

# G60b LONG TRAILING BOW TIES (owner L1971 #2: 'everyone with a bow in game -> long trailing ties, thướt tha'): a prompt that ties a (non-negated) bow must
# give that bow LONG trailing ties somewhere in the prompt (a 'BOW POSITION' line may stand apart from the bow description). Cupid's bow / archery bows are not bows.
BOW_RX = re.compile(r"(?<!cupid's )(?<!cupid’s )\bbows?\b(?! (?:her|their|his) head)(?! and arrows?)", re.I)
LONGTIE_RX = re.compile(r"\blong\b[^.;]{0,60}\b(?:ties|tails|ribbon ends|ends|streamers|ribbons|loops and ties)\b|\btrailing\b[^.;]{0,40}\b(?:ties|tails|ends|ribbons|streamers)\b|\b(?:ties|tails|ends|ribbons|streamers)\b[^.;]{0,40}\b(?:trailing|flowing down|falling (?:long|to)|thướt tha)\b", re.I)
def g60b_fails(text):
    for m in BOW_RX.finditer(text):
        if negated(text, m.start(), m.end()): continue
        if re.search(r"\b(?:archery|arrows?|bowstring|bowman)\b", _clause(text, m.start(), m.end()), re.I): continue
        if re.search(r"\b(?:lips?|mouth)\b", _clause(text, m.start(), m.end()), re.I) or text[m.end():m.end()+7]=="-shaped": continue   # BUILDFIX1: face words (lips 'with a soft curved bow', 'bow-shaped mouth') are not a bow
        if LONGTIE_RX.search(text): return []
        return [("G60", "BOW TIES NOT LONG", f"every bow has LONG trailing silk ties, thướt tha (owner L1971): …{_ctx(text, m, 60, 60)}…")]
    return []

# G62 HÁN COLLAR FROZEN WORDS (owner L1915, locked; G66 t1–t3): every Hán prompt carries the frozen NECKLINE sentence + collar clause verbatim.
def _han_frozen():
    t = open(os.path.join(ART, "seasons4", "HAN_COLLAR_L1915_FROZEN.txt"), encoding="utf-8").read().splitlines()
    return [norm(t[i + 1]) for i, l in enumerate(t) if l.startswith(("EARLY", "COLLAR CLAUSE"))]
def g62_fails(text):
    if not is_han(text): return []
    return [("G62", "HÁN COLLAR WORDS", f"Hán collar words changed / missing (frozen dev/art/seasons4/HAN_COLLAR_L1915_FROZEN.txt, owner L1915): '{w[:70]}…'") for w in _han_frozen() if w.rstrip(".") not in text]

def gate7_fails(text, scope, age=None):
    import winter_g28; w = winter_g28.is_winter(text)
    f = []
    f += g35_fails(text); f += g96_fails(text, scope); f += g67_fails(text, scope)
    f += g68_fails(text, scope, age, w); f += g69_fails(text, scope, age, w)
    f += f19_hair_fails(text, scope); f += l1990_fails(text, scope, w); f += g60b_fails(text); f += g62_fails(text)
    return f
# ======== /GATE7 ========


def check_text(text, scope, S=None, X=None, age=None, skip_store=False, pid=None):
    """-> (fails, warns, slots) ; fails/warns = list of (id, kind, detail). pid = person id (sNN/mNN/cNN) for the face root-hex check."""
    if S is None: S, X = load_registry()
    fails, warns, found = [], [], {}
    fails += walk_still_fails(text)   # G23
    if len(text.strip()) > PROMPT_MAX: fails.append(("LEN", "TOO LONG", f"prompt is {len(text.strip())} characters, the gen tool refuses more than {PROMPT_MAX}"))
    text = norm(text)
    fails += b24_fails(text, scope)   # MG3 L784 item 7 (B24)
    fails += angle_fails(text)   # MG3 L806 (E1)
    fails += pet_fails(text, scope, age)   # F17 PETS (owner Lượt 1057/1059): ages 18/26, kc + ranks 1–6 only, in contact only
    fails += fruit_fails(text, scope, pid)
    fails += vase_fails(text)   # F19 NOVASE (owner L1438/L1642)
    fails += g43_fails(text, scope)   # G43 maids: no jade pendant (owner L1608)
    fails += g61_fails(text, scope)   # G61 front waist free (owner L1905)
    fails += g60_fails(text)   # G60 bow centred (owner L1890)
    fails += gate7_fails(text, scope, age)   # GATE7 (owner L2021): G35 no cleavage · L1996 t7/t8 chest · G67 no cloak t6–t8 · G68 Tần density · G69 t1 chest flower · F19 hair no leaves + no chrysanthemum · L1990 square frame (+G25 winter crossed) · G60 long bow ties · G62 Hán collar words
    fails += g59_fails(text)   # G59 no sachet anywhere (owner L1874)
    fails += g65_fails(text, scope)   # G65 (t4+ exempt, owner L1971) embroidery placement + size (owner L1952)
    fails += g57_fails(text)   # G57 no jade pendant anywhere (owner L1851)
    fails += g45_fails(text)   # G45 jade pendant visible: no cloth over the waist (owner L1622)
    _f, _w = out1_fails(text); fails += _f; warns += _w   # G40 OUT1 (owner L1590)   # F16 NOFRUIT (owner Lượt 1052/1054): no fruit as a held item, except the frozen drawn thiếu nữ s44 / s64
    if scope == "face":   # MG3 L784 item 6 (B20 / Lượt 763/769/770)
        fails += root_hex_fails(text, pid)
        for m in DEEP_COLOUR_RX.finditer(text):
            if negated(text, m.start(), m.end()): continue
            fails.append(("B20", "DEEP COLOUR", f"'deep/dark' adjective on a colour word (all seasons light and fresh, Lượt 769): …{text[max(0,m.start()-30):m.end()+20]}…")); break
    import winter_g28; _winter = winter_g28.is_winter(text)   # SEASON đông: G26 fur sentence present -> winter twins (W*) replace S06/S12, M06 in its G28 form
    _doan = master_common.doan_scope(scope)
    if _doan and thu_fabric_waiver(text, scope): _doan = False; warns.append(("B26", "THU WAIVER", "thu t4/t5: approved thin-silk FABRIC words (L2041/L2050 pictures) kept, B26 satin đoạn waived (ROOT-B2 answer 1, 21/11)"))
    _high = master_common.high_scope(scope)
    if _high and master_common.thu_b32(text, scope): _high = False; warns.append(("B32", "THU FABRIC", "thu t6-t8 thường phục: the t1-t5 thu fabric sentence (M06) stands in the brocade slot (owner L2122 CHỐT)"))
    for k, kind, d in master_common.check(text, high=_high, female=not master_common.male_scope(scope), winter=_winter, doan=_doan, scope=scope):   # + NOEAR (owner Lượt 1037): every woman / girl scope = bare-earlobes sentence once + no earring word; men / boys (--scope emperor|men) unchanged   # + B12 (Lượt 781): fabric by rank   # B25 MASTER BLOCK (owner Lượt 745/766, MG1): EVERY scope, faces included -> missing / edited / doubled = FAIL
        fails.append((k, "MASTER " + kind, d))
    for k, kind, d in master_common.check_elder(text, scope, age):   # C5 (owner Lượt 779/784): elder colours win over M05 at a51/a65, never in Nữ đế
        fails.append((k, kind, d))
    # SL1 (owner Lượt 773/778): ANY prompt (every scope) whose sleeve sentence sends the sleeves to the floor must carry S37 (sleeve-hold sentence) exactly once
    if FLOOR_SLEEVE_RX.search(text):
        _s37 = next(e["text"] for e in S if e["id"] == "S37"); _n = text.count(norm(_s37))
        if _n != 1: fails.append(("S37", "FLOOR SLEEVE", f"a floor-length sleeve sentence is present but the sleeve-hold sentence S37 appears {_n} times (must be exactly once)"))
    for e in S:
        req = e["scope"] == "any" or (e["scope"] == "any-but-nude" and scope != "nude") or scope in parse_scope(e["scope"]); conf = scope in parse_scope(e.get("confirm", ""))   # 'any' = every prompt of every scope (D9)
        if not (req or conf): continue
        if e.get("season") and not _winter: continue   # SEASON: winter-only sentence (W01-W05)
        if e.get("not_season") and _winter: continue   # SEASON: replaced in winter by its W twin
        if e["id"] == "S18" and master_common.DOAN_LEN_CUTS[2][0] in [x[0] for x in master_common.doan_cuts_made(text,scope)]: continue   # BUILDFIX2: B26 length cut M10 ('closed-lip smile;' repeats master M10) shortens S18 the same way
        if e["id"] in ("S24", "S16", "S19"):   # B26 length exception: S24 repeats master M13 (cut 5); B26FAB4: S16 / S19 tails cut by LEN_CUTS2 N1 / N2 (same-prompt repeats), only when needed
            _made = [x[0] for x in master_common.doan_cuts_made(text,scope)]; _k = {"S24": master_common.DOAN_LEN_CUTS[4][0], "S16": master_common.LEN_CUTS2[0][0], "S19": master_common.LEN_CUTS2[2][0]}[e["id"]]
            if _k in _made: continue
        if e["id"] == "S07" and master_common.thu_b32(text, scope): continue   # BUILDFIX5 B32 (owner L2122 CHỐT): thu t6-t8 thường phục carry the t1-t5 thu fabric sentence, not brocade
        if e["id"] == "S07" and master_common.high_scope(scope) and master_common.b29_alt_in(text, scope, high=True): continue   # B29 (owner L1556/L1558, B28): the one light gấm sentence stands in the S07 brocade slot
        if e["id"] == "S14" and (slot_rx(S14_L1794).search(text) or slot_rx(S14_VK).search(text)): continue   # owner L1794: jade/pearl/gold-only HQP luxury form stands in the S14 slot (A46)
        if e["id"] in W_L1803 and any(slot_rx(f).search(text) for f in W_L1803[e["id"]]): continue   # owner L1803: thicker-fur ladder forms (t1-t3 x2, t4-t6 x4, t7 a little thicker, t8 sheet sentence) stand in the W01/W02/W03 slots
        if e["id"] == "S13" and (slot_rx(S13_COMOI).search(text) or (("ONE straight SQUARE collar only" in text or __import__("lowneck_L2228").PHRASE in text) and slot_rx(S13_THU_L2041).search(text))): continue   # + owner L2041 thu Tần square-collar form (BUILDFIX2)
        if e["id"] == "S13" and slot_rx(S13_COMOI).search(text): continue   # owner L1377 (thu COMOI new collar OK, newer than G25/S13): the COMOI open-collar form "closes only at the sash, never at the throat" stands in the S13 slot (Foreman C #13, L1572)
        if skip_store and e.get("store") and not e.get("season"): continue   # already enforced by the STORE part (same prompt, store args)
        ages = (e.get("ages") or "all").split()
        if age and "all" not in ages and age not in ages: continue
        if e.get("strict_ages") and not age: continue   # D15 (S36): age-only sentence -> needs a known age
        m = slot_rx(e["text"]).search(text)
        if m and e.get("once") and (len(list(slot_rx(e["text"]).finditer(text))) != 1 or text.count(e["once"]) != 1):   # D15 (S36): exactly once
            (fails if req else warns).append((e["id"], "NOT ONCE", f"{e['title']} ({text.count(e['once'])} times)")); continue
        bad_v = [f"{k}='{m.group(k)}'" for k, v in (e.get("slot_values") or {}).items() if m and m.group(k) not in v]
        if bad_v: (fails if req else warns).append((e["id"], "SLOT", f"{e['title']}: " + ", ".join(bad_v))); continue
        if m: found[e["id"]] = m.groupdict(); continue
        ov = best_overlap(e["text"], text)
        item = (e["id"], "REWRITTEN" if ov >= 0.6 else "MISSING", f"{e['title']} (best overlap {ov:.0%})")
        (fails if req else warns).append(item)
    text = _strip_kc_faces(text)   # B8 (BW3): the owner's verbatim KC face words are approved as a whole: never scanned for banned phrases (m13 "PHOENIX eyes" = eye shape, not the X08 motif; m43 "covering the teeth completely")
    for x in X:
        if x["scope"] != "any" and scope not in parse_scope(x["scope"]): continue   # 'any' = every scope incl. face/states (X18, Lượt 779), as for S entries
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
    for t, want in [("Pose: walking, raising a carved jade longevity peach beside her cheek with one hand.", 1), ("A small tray with fresh fruit held in both hands.", 1),
                    ("Pose: holding a sprig of pink peach blossom; a round fan in soft peach pink silk; a carved peach-wood comb.", 0),
                    ("Pose: she holds a round jade longevity plaque carved with a round shou symbol.", 0), ("She holds nothing, no fruit in her hands.", 0)]:   # F16 NOFRUIT
        if bool(fruit_fails(norm(t))) != bool(want): print("NOFRUIT SELFTEST", want, t); bad += 1
    for t, want in [("Pose: walking with a small white-jade vase with blossoms held upright in one hand.", 1), ("both hands holding a gold-mounted jade vase with peonies in front", 1),
                    ("Pose: walking with a small white-jade lotus lamp held upright in one hand.", 0), ("Pose: holding a flower basket of rattan for the vases.", 0),
                    ("Pose: holding a round fan; no vase, no cup.", 0)]:   # F19 NOVASE (owner L1438/L1642)
        if bool(vase_fails(norm(t))) != bool(want): print("NOVASE SELFTEST", want, t); bad += 1
    for t, sc, want in [("A palace maid (cung nu, tam dang). a decorative sash with a small jade or tassel pendant.", "tp1", 1),
                        ("A palace ma ma. a wide silk sash, a jade pendant on a silk cord.", "mama", 1),
                        ("A palace maid (cung nu, nhi dang). an embroidered silk sash.", "mama", 0),
                        ("A consort. a soft silk sash with a small jade pendant.", "tp2", 0)]:   # G43 maids no jade pendant (owner L1608)
        if bool(g43_fails(norm(t), sc)) != bool(want): print("G43 SELFTEST", want, sc, t); bad += 1
    for t, want in [("Pose: hands folded at her waist under the long sleeves, the item held between them.", 1), ("Pose: one hand adjusting her belt pendant, the item in the other hand.", 1),
                    ("Pose: her wide sleeves draped over her waist.", 1), ("a long stole falling across her waist.", 1),
                    ("Pose: the item held at her waist with both hands, her sleeves kept clear of the front of her waist.", 0),
                    ("the jade pendant at her waist stays fully visible, no sleeve, robe flap or cloth over it.", 0), ("no shawl or stole draped across her waist.", 0)]:   # G45 (owner L1622)
        if bool(g45_fails(norm(t))) != bool(want): print("G45 SELFTEST", want, t); bad += 1
    for t, want in [("one hand holding a jade pendant on a red cord, held up dangling.", 0), ("dance fans with jade pendants in her hand", 0), ("a sash with a jade pendant on a silk cord", 1)]:   # G57 body-only (owner L1979)
        if bool(g57_fails(norm(t))) != bool(want): print("G57c SELFTEST", want, t); bad += 1
    for t, want in [("a soft silk sash with a small jade pendant on a silk cord.", 1), ("belt pendants and tassels", 1), ("a set of jade discs and pearl strands (zupei)", 1), ("a carved jade pendant set (ngọc bội)", 1),
                    ("a small jade clasp at the chest", 0), ("a silk ball with jade tassels", 0), ("no belt plaque, no pendants; a plain silk sash tied flat.", 0), ("red gems ONLY on the crown, NEVER on the robe, collar, belt or pendants", 0)]:   # G57 (owner L1851)
        if bool(g57_fails(norm(t))) != bool(want): print("G57 SELFTEST", want, t); bad += 1
    for t, want in [("a sash with a small embroidered silk fragrant sachet (túi thơm) hanging from it.", 1), ("she holds a sachet of silk brocade", 1), ("a hà bao at the waist", 1), ("a plain embroidered silk sash tied in a bow.", 0)]:   # G59 (owner L1874)
        if bool(g59_fails(norm(t))) != bool(want): print("G59 SELFTEST", want, t); bad += 1
    for t, want in [("a ribbon bow tied to one side at the waist.", 1), ("the sash knotted at her left hip.", 1), ("an off-centre bow", 1), ("a bow tied at the centre front, never to one side.", 0), ("sash tied flat at the CENTRE front, NO bow", 0)]:   # G60 (owner L1890)
        if bool(g60_fails(norm(t))) != bool(want): print("G60 SELFTEST", want, t); bad += 1
    for t, want in [("Pose: one hand touching her hairpin, a flute in the other hand at her waist, the hem swinging.", 1), ("Pose: standing, a letter held level at her waist with both hands.", 1), ("Her hands and body: the item held in both hands lowered before her at waist height, head tilted.", 1),
                    ("Pose: the item held in one hand out to her side at chest height, her sleeves kept clear of the front of her waist.", 0), ("Pose: a flute held low at her side, never in front of her waist.", 0)]:   # G61 (owner L1905)
        if bool(g61_fails(norm(t))) != bool(want): print("G61 SELFTEST", want, t); bad += 1
    # GATE7 (owner L2021): each new check fires on the owner's fault words and stays quiet on the fixed words
    for t, sc, age, ids in [
        ("the square neckline shows a soft, natural hint of cleavage, tasteful and elegant.", "tp6", "a18", {"G35", "G71"}),   # G35 (L1442/L1996)
        ("a modest neckline (no cleavage).", "maid", "a18", {"G35"}),   # G35: not even negated
        ("a LAYERED NECKLINE: a lilac inner top with a low square neckline framed on ALL sides (across the chest AND up both sides to the shoulders) by a wide band.", "tp7", "a18", {"G70"}),
        ("strands of pearls swagged across the chest from collar edge to collar edge.", "tp8", "a18", {"G70"}),
        ("many pearl strands lying flat on the vân kiên.", "tp8", "a18", set()),
        ("strands of pearls across the chest.", "tp5", "a18", set()),   # L1996 is t7/t8 only
        ("over it a long ceremonial silk mantle falling from the shoulders to the floor.", "tp8", "a18", {"G67"}),   # G67 (L1982)
        ("under the OPEN outer robe, its fronts falling from the shoulders.", "tp7", "a18", {"G67"}),
        ("this one robe worn over a lilac inner dress, NO outer robe, NO open coat, NO cloak or mantle over it.", "tp8", "a18", set()),
        ("a jewelled cloud-collar cape edged with pearls over the shoulders.", "tp7", "a18", set()),   # vân kiên is a collar
        ("over it a long ceremonial silk mantle falling from the shoulders to the floor.", "trieu8", "a18", set()),   # triều phục keeps the cloak
        ("a straight SQUARE collar framed by a wide stiff lilac band, a few LARGE embroidered lotus flowers on the robe (fewer than Phi).", "tp4", "a18", {"G68"}),   # G68 (L2006)
        ("a straight SQUARE collar framed by a wide stiff lilac band, a few MEDIUM embroidered lotus flowers scattered on the robe body and the sleeves (clearly more than at Thường tại, still fewer than the Phi).", "tp4", "a18", set()),
        ("a LOW open square neckline framed by a wide flat lilac band, small lilac flowers at the hem.", "tp1", "a18", {"G69"}),   # G69 (L2008)
        ("a LOW open square neckline framed by a wide flat lilac band, a sparse small cluster of embroidered lilac flowers at the CENTRE of the chest.", "tp1", "a18", set()),
        ("a modest snug crossed collar, small lilac flowers at the hem.", "tp1", "a51", set()),
        ("silver hairpins and a fresh flower (a lilac spray with leaves).", "tp1", "a18", {"F19"}),   # F19 (L2011)
        ("silver hairpins and a fresh flower (a tiger lily).", "tp2", "a18", {"F19"}),   # no 'bloom only' words
        ("silver hairpins and a fresh flower (a tiger lily, bloom only, no leaves); embroidered lilies with leaves on the hem.", "tp2", "a18", set()),   # L2015: embroidery leaves OK
        ("embroidered golden chrysanthemums on the hem.", "tp5", "a18", {"F19"}),
        ("a LOW open square neckline across the upper chest, neck and collarbones bare.", "tp5", "a18", {"G71"}),   # L1990/L1992
        ("a LOW open square neckline across the upper chest, framed by a wide flat lilac band.", "tp7", "a18", {"G71"}),   # t7/t8 need the full frame
        ("a LOW open square neckline, framed on ALL sides (across the chest AND up both sides to the shoulders) by a wide flat embroidered lilac band.", "tp8", "a18", set()),
        ("WINTER: a WIDE band of soft plain ivory-white fur trim. a straight SQUARE collar framed by a wide band.", "tp4", "a18", {"G25"}),   # winter = crossed collar
        ("the sash tied at the front in a small, pretty bow.", "maid", "a18", {"G60"}),   # G60b (L1971)
        ("the sash tied at the centre front in a bow with two long trailing ties.", "maid", "a18", set()),
        ("thin lips with a sharp defined cupid's bow.", "maid", "a18", set()),
        ("sash tied flat at the CENTRE front, NO bow.", "tp3", "a18", set()),
        ("a full Han-dynasty court look in TWO visible robes.", "tp5", "a18", {"G62"}),   # G62 frozen Hán collar words missing
    ]:
        got = {i for i, k, d in gate7_fails(norm(t), sc, age)}
        if got != ids: print("GATE7 SELFTEST want", sorted(ids), "got", sorted(got), sc, t[:80]); bad += 1
    sys.path.insert(0, os.path.join(ART, "t8-prompt-B")); import pets as _PETS
    for b in _PETS.check(): print("PETS TABLE", b); bad += 1
    for t, sc, ag, want in [("Pose: holding a small white rabbit cradled gently in her arms.", "tp2", "a18", 0), ("Pose: holding a small white rabbit cradled gently in her arms.", "tp2", "a36", 1),
                            ("Pose: holding a small songbird perched on her lightly raised finger.", "tp7", "a18", 1), ("Pose: a Persian cat sitting beside her, one hand holding a fan.", "tp4", "a18", 1),
                            ("Pose: holding a fan embroidered with butterflies and cranes.", "tp8", "a51", 0), ("Pose: holding a small woven-grass cricket cage.", "tp8", "a51", 0),
                            ("about 4 years old, a sweet toddler girl, hugging a small white rabbit in her arms.", "girl", "a4", 0), ("about 14 years old, a handsome young boy, a small black myna bird perched on his wrist.", "boy", "a14", 0),
                            ("about 20 years old, a handsome young man, a little yellow canary perched on his finger.", "boy", "a20", 1), ("a toddler, hugging a small fluffy white puppy in her arms.", "mama", "a18", 1),
                            ("a sweet toddler girl, hugging a little cloth rabbit toy.", "girl", "a4", 0), ("a little girl, holding a butterfly toy on a stick.", "girl", "a9", 0),
                            ("a little boy, a small puppy sitting beside him.", "boy", "a9", 1)]:   # F17 PETS (+ kids, FRUITPET2)
        if bool(pet_fails(norm(t), sc, ag)) != bool(want): print("PETS SELFTEST", want, sc, ag, t); bad += 1
    if fruit_fails(norm(open(os.path.join(ART, "face-common", "s64.v5.FULL.txt"), encoding="utf-8").read()), "face", "s64"): print("NOFRUIT s64 store still has fruit"); bad += 1
    if not fruit_fails(norm(open(os.path.join(ART, "face-common", "legacy_fruit", "s64.v5.FULL.txt"), encoding="utf-8").read()), "face", "s64"): print("NOFRUIT legacy s64 record passes"); bad += 1
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
    if a[0]=="--self":
        r=selftest(); import person_gate; r2=person_gate.selftest(); return r or r2   # + PERSON/BATCH self-test (owner L2039)
    if a[0]=="--maid-items":   # E13 (owner L1919): every maid rank of one person holds a different item/kind; same rank across persons never the exact same item
        sys.path.insert(0,ART); import maid_items
        d,tag=a[1],a[2]; bad,per=maid_items.gate(d,tag)
        if not per: print('MAID ITEMS FAIL — no <pid>_<rank>_'+tag+'.txt files in',d); return 1
        if bad:
            print('MAID ITEMS FAIL',d,tag,'—',len(bad),'repeat(s):'); [print('  '+b) for b in bad]; return 1
        print('MAID ITEMS PASS',d,tag,'(%d persons, %d files: every rank a different item/kind, no same item at the same rank across persons)'%(len(per),sum(map(len,per.values())))); return 0
    if a[0]=="--batch":   # BATCH gate (owner L2039): 2+ persons in one batch never share a rank's ANGLE / Pose sentence; every file = that person's own item/angle/face
        import person_gate
        fs=[x for x in a[1:] if not x.startswith("--")]; bad=person_gate.batch(fs,a[a.index("--age")+1] if "--age" in a else "a18")
        [print("  FAIL "+b) for b in bad]; [print("  WARN "+w) for w in person_gate.WARN]
        print("BATCH CHECK", "FAIL — do NOT generate" if bad else "PASS", f"({len(fs)} files)"); return 1 if bad else 0
    if a[0]=="--audit": audit(a[a.index("--out")+1] if "--out" in a else os.path.join(ART,"APPROVED_AUDIT.md")); return 0
    if a[0]=="--registry-md":
        open(os.path.join(ART,"APPROVED_SENTENCES.md"),"w",encoding="utf-8").write(registry_md()); print("wrote dev/art/APPROVED_SENTENCES.md"); return 0
    pf=a[0]; prompt=sys.stdin.read() if pf=="-" else open(pf,encoding="utf-8").read()   # "-" = a builder's stdout piped in (face makers, MG1)
    # KEEP CHECK (owner Lượt 1274): an edited prompt with a sidecar <prompt>.keep must not lose any BASE phrase except the allowed ones.
    if pf!="-" and os.path.exists(pf+".keep"):
        sys.path.insert(0,ART); import keep_check
        kb,ka=keep_check.read_sidecar(pf)
        if not kb or not keep_check.report(kb,pf,ka):
            print('STORE CHECK FAIL',pf,'— KEEP CHECK: details cut vs base (dev/art/keep_check.py); restore them or get them allowed'); return 1
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
        scope=a[a.index("--scope")+1]; age=a[a.index("--age")+1] if "--age" in a else None; pid=a[a.index("--pid")+1] if "--pid" in a else None
        f,w,_=check_text(prompt,scope,age=age,pid=pid)
        if re.fullmatch(r"tp[1-8]",scope) and "--no-person" not in a:   # PERSON gate (owner L2039): her own item / angle / face, never another person's (dev/art/person_gate.py)
            import person_gate
            _pp,_pr=person_gate.pid_rank(pf) if pf!="-" else (None,None)
            _pp=pid or _pp; _pr=int(scope[2:]) if _pp else None
            if _pp and re.fullmatch(r"[cmsp]\d\d",_pp): f=f+person_gate.person_check(prompt,_pp,_pr,age or "a18")
        report(pf,scope,f,w)
        if f: print('STORE CHECK FAIL',pf,'— APPROVED CHECK FAIL: do NOT generate'); return 1
        print('STORE CHECK PASS',pf,'(approved_check PASS, scope',scope+')'); return 0
    args=a[1:]
    global SEASON_ARG
    if "--season" in args: i=args.index("--season"); SEASON_ARG=args[i+1]; args=args[:i]+args[i+2:]   # BUILDFIX3: season cell (builder gate passes it): the same palette + season words on the store text
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
