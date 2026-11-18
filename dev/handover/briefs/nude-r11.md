# BRIEF N3: Nữ đế crown fix + Bắc Địch Quý phi recolour (Foreman C ROOT-34, 18/11 ~23:40Z real)
PRIORITY #1 CHECK: owner ~23:33Z verdict (verbatim in FIGURE_GATE: "TRIỀU PHỤC EMBROIDERY EVERYWHERE + NỮ ĐẾ CROWN + EMPEROR", A0 rows "Nữ đế OUTFITS A–D" + "Bắc Địch Quý phi DESIGN", rule 3 "BENCHMARK OF THE GAME COLOUR") | report reports/states-sample.md (N2 round 10b) | builder dev/art/t8-prompt-B/build.py --state nude --nudeopt A|B|C|D, --state bd6 | main/review: none.
OWNER (verbatim, 18/11): "Cho dù mày có đổi phiên đi chăng nữa, cho dù mày có mở thợ mới đi chăng nữa thì làm ơn nhắc các thợ là đọc kỹ." → re-read FIGURE_GATE (A0 + REFERENCES, rule 3, the Nữ đế lines in F and the 23:33Z line) + consort-B10 before every person.

JOB 1: Nữ đế crown (c06 + c25, options A–D = 8 gens).
- The OUTFITS are APPROVED. Do not change one word of the outfit text.
- Change only the crown/headdress text in build.py --state nude:
  - one splendid phoenix-and-dragon imperial crown, with a short bead fringe to the brow only (FIGURE_GATE F Nữ đế line);
  - NO flowers anywhere on the crown or hairpins: no fresh flowers, no flower ornaments.
- Commit the builder. Generate A–D for c06 and c25 (gpt-2-6 1024x2304 2k, transparentBackground; refs per A0 REFERENCES = style3_girls Xm9tPkMBfo + own t1 face + swatch TdwDfOyVNR).
- Sheet per person: Lượt 95 r10b version | new, for A–D.
JOB 2: Bắc Địch Quý phi recolour (1–2 gens).
- The DESIGN is APPROVED. Change only the colour words, per FIGURE_GATE rule 3 (fresh but restrained, deep toned-down shades; the soft subdued feel of the Nữ đế yellow; NOT rực).
- Make 2 options: two different trầm colourways. Sheet: r10b | new 1 | new 2.
CHECKS: LOOK at every image. Closed lips, nothing over the face, frontal/three-quarter, no flowers on the head, no hoa điền, colour not rực (compare with the Nữ đế sheet). Add K3's background line (reports/kc2k-K3.md, "IGNORE its background … NOTHING behind or around her").
OUTPUT:
- CDN img/_review/states-r11/ via dev/site/cdn_sync.py.
- reports/states-sample.md, new section "N3 round 11". Push the handover branch.
- Send READY to Foreman C ROOT-34 (session_01PEhRbxEqMo11RRz1YMMxN4) with the sheet URLs.
Roll over at START_CTX+25 % (ceiling 60 %): write the handover in the report and tell me; I open the successor.
