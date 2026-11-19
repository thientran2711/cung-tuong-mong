# BRIEF NỮ ĐẾ MASS (Foreman C ROOT-34, 19/11 ~00:15Z real)
PRIORITY #1 CHECK: owner ~00:13Z (verbatim): "Tiếp đến á, là ở lượt 110 ảnh ngữ đế mới, C mới, ok duyệt. Rồi tiến hành làm cho tất cả mọi người nữ đế đi, ở các độ tuổi luôn." | FIGURE_GATE A0 row "Nữ đế OUTFITS A–D" (all 4 outfits + crowns A/B/D r11 + C r11b APPROVED), H Nữ đế item list, AGE 51 + ELDER COLOURS lines, rule 3 colour | builder build.py --state nude --nudeopt A|B|C|D (N3 99f9ffe); states-sample.md N3 r11/r11b | NUDE_ITEM only holds c06/c25 (KeyError c10), and --age is not applied in build_nude_own.
OWNER (verbatim, 18/11): "Cho dù mày có đổi phiên đi chăng nữa, cho dù mày có mở thợ mới đi chăng nữa thì làm ơn nhắc các thợ là đọc kỹ." → re-read FIGURE_GATE + consort-B10 before every person.

PHASE 1: BUILDER (worker N4 only, before any mass gen).
a) NUDE_ITEM for c01–c32: one item each from the FIGURE_GATE H NỮ ĐẾ list. Spread the items so neighbours differ, never the same item as her own t8 item. Keep c06/c25 as they are.
b) OPTION per person: spread A/B/C/D evenly (c01 A, c02 B, c03 C, c04 D, c05 A, …). Keep c06 and c25 on the options the owner saw. Write the table into build.py and into the report.
c) AGES a18 / a26 / a36 / a51 / a65:
   - Apply AGE_TXT in build_nude_own.
   - a51/a65: elder colours per FIGURE_GATE ELDER COLOURS (elegant calm deeper tones, never fresh, never black/brown), calm composed pose (calm skip), elder hair/face per the AGE 51 line, the same outfit design.
   - a18/a26/a36: approved colours unchanged.
d) Guard: c06 + c25 a18 A–D output byte-identical to 99f9ffe. Commit.
e) SAMPLE before the mass: c10 at a18 and a51, and c10 at a65 (3 gens). Look at them. Send READY with the sheet to Foreman C, who shows the owner the elder sample. The a18/a26/a36 mass may start without waiting for that; a51/a65 wait for the Foreman's GO.

PHASE 2: MASS (Foreman C opens the painters after Phase 1).
- Per person: a18, a26, a36, a51, a65 = 5 gens.
- 32 people minus the already-made c06/c25 a18 → about 158 gens, ≈ 21k credits. Check the balance first.
- Settings: gpt-2-6 1024x2304 2k, transparentBackground. Refs = own live t1 of that age (face) + style3_girls Xm9tPkMBfo + royal swatch TdwDfOyVNR.
- Include the no-background line.
- LOOK at every image:
  - closed lips, nothing over the face, no flowers on the crown, no hoa điền;
  - one item, below the chin;
  - colour not rực;
  - elders read their age.
  Regen fails (max 3).
- Output: img/_review/nude-mass/cNN_aNN_nude.png + one sheet per 8 people (sheet_cAA-cBB.jpg, rows people × cols ages). cdn_sync.
- Report: reports/nude-mass-<painter>.md. READY to Foreman C ROOT-34 (session_01PEhRbxEqMo11RRz1YMMxN4) per batch of 8 people.
Roll over at START_CTX+25 % (ceiling 60 %): write the handover in the report and tell me; I open the successor.

## UPDATE 19/11 ~00:20Z (Foreman C ROOT-34)
- OWNER GO for the elder ages (verbatim): "Ok, vẽ hàng loạt nữ đế đi. 51, 65 gì đó vẽ đi." → all 5 ages for everyone.
- Builder = N4's 421fee3 (or later): `python3 build.py cNN v0 --state nude --spec5pose --nudeopt auto --age aNN`. Phase 1 is done; mass painters go straight to Phase 2.
- a65 face ref = her a51 t1 when no a65 t1 exists. Keep the a65 yellow as soft as the a51 (no ochre/mustard).
- Split: N4 c01–c08 · N5 c09–c16 · N6 c17–c24 · N7 c25–c32 (c06 and c25 a18 already exist; skip them).
