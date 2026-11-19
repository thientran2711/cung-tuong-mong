# Triều phục c06 t1–t8 as IMAGE EDITS of the approved pictures (F3c, ROOT-40 HOLD 19/11 ~04:05Z). NO gen. Wait for ROOT-40 GO.
Method (ROOT-40, as for Tần): the only reference = the approved picture; prompt = "Keep everything in this image identical — the same woman, face, hairstyle, pose, angle, body, drawing style, light, fabric drape and embroidery style — and change ONLY the following: <CHANGE>. Nothing else changes. Transparent background."
Base URL: https://ctm-img.victoria-tntt.workers.dev/
| rank | picture to edit from | its prompt (on disk) | approval status |
|---|---|---|---|
| t1 Đáp ứng | img/_review/t8-reprompt/t1t6/c06_a18_t1_v0.png | owner-copy/trieu/orig/t1_v0_c06.txt (= d18fae6 golden_low) | W72 sample. NOT named as approved in A0 ("t1/t2/t3 new designs NOT APPROVED" refers to later designs). The live alternative is img/hd/fig-consort-c06-t1-a18.webp |
| t2 Thường tại | …/t1t6/c06_a18_t2_v0.png | orig/t2_v0_c06.txt | same as t1 |
| t3 Quý nhân | …/t1t6/c06_a18_t3_v0.png | orig/t3_v0_c06.txt | same as t1 |
| t4 Tần | …/t1t6/c06_a18_t4_v0.png | orig/t4_v0_c06.txt | = the "OLD Tần" the owner praised (Lượt 210–215 verdict, tan-phi-swap.md l.94) |
| t5 Phi | …/t1t6/c06_a18_t5_v0.png | orig/t5_v0_c06.txt | = the "OLD Phi" (same source) |
| t6 Quý phi | …/t1t6/c06_a18_t6_v0.png | orig/t6_v0_c06.txt | = the old Quý phi the owner used as the reference for the BĐ Quý phi ("quý phi cũ") |
| t7 Hoàng quý phi | img/_review/t8-reprompt/c06_a18_t7_v0.png | goldenC2/t7_v0_c06.txt | APPROVED (A0 t7 row, owner 18/11) |
| t8 Hoàng hậu | img/_review/t8-reprompt/c06_a18_t8_v0.png | goldenC2/t8_v0_c06.txt | APPROVED (A0 t8 row; the picture on the vsHH sheets) |
All 8 pictures checked as 200 on the CDN. All are coral-red, with t7 adding yellow and t8 mostly yellow. Poses are near-frontal with a slight turn, and each holds a round fan or a rank item.

## CHANGE sentences (block words from build.py, shortened; no new colour words)
RED = "the court red, a true brick red with no coral, orange or pink cast, like #99443F (linings a slightly deeper #893A37)"
- t1: "make it the formal court robe (triều phục): the robe and both sleeves become RED; the collar band, cuff bands and sash white-jade like #E4EEE2; add two long narrow soft court panels in that white-jade hanging like stoles from the collar down both sides of the front to the hem, gold-edged, a tassel at each tip; add a SMALL jewelled shoulder piece (cầu vai) on each shoulder with a gentle upward curve, pearls and jade beads sewn on its edge, NO fringe; replace the hair flowers and hairpins with one small silver-gilt court crown with white jade and small pearls and a symmetric pair of short gold tassel hairpins"
- t2: same as t1, with rank colour jade-green like #6FA987, the crown a little taller with a jade flower plaque, tassel hairpins short with pearl and jade dangles
- t3: same as t1, with rank colour azure-blue like #6C8FC4, a medium two-tier gold and silver-gilt crown, tassel hairpins short-to-medium
- t4: same pattern, with rank colour rose-pink like #D68AA8, the shoulder piece a little larger with a clear upward curve and a SHORT pearl fringe (about a hand long), a medium-tall two-tier gold crown, medium tassel hairpins
- t5: same pattern, with rank colour lavender-purple like #9C82C2, a medium shoulder piece curving up with a cloud edge and a SHORT pearl fringe, a tall three-tier gold crown, medium-long tassel hairpins
- t6: same pattern, with rank colour vermilion-rose like #D2574A, a shoulder piece the same size as the Phi's with a cloud edge, a rich pearl-jade-gem band and a SHORT pearl fringe, a BIG tall gold crown (no phoenix), long tassel hairpins
- t7: "make it the formal court robe (triều phục): the coral-red parts of the robe and sleeves become RED (keep the yellow parts yellow); add two long narrow soft court panels in warm amber-gold like #DE9448 hanging like stoles from the collar to the hem; over the cloud-collar cape add a medium-large jewelled shoulder piece (cầu vai) on each shoulder, curving up, cloud edge with gold edging, with a LONG pearl fringe hanging down to the elbow"
- t8: "make it the formal court robe (triều phục): BOTH SLEEVES (the arms, shoulder to cuff) and the collar band with its trims become RED; add two long narrow soft court panels in that red hanging like stoles from the collar to the hem; the cloud collar sits on a STIFF, SHORT, structured shoulder piece (cầu vai cứng) of gold brocade edged with pearls on each shoulder, curving up and slightly pointed outward; its pearl fringe is LONG, several strings deep, down to the elbow or longer (at least as long as the Hoàng quý phi's). Keep the yellow robe, mantle, crown, ruyi, embroidery density and pose exactly"
NOTES:
- t1–t6 are the biggest edits: whole robe colour, panels, shoulder pieces, crown. An edit model may redraw more than asked. t7/t8 are small, add-on edits.
- Angle: an edit keeps the source angle (near-frontal, slight turn), so it cannot give the three-angle mix. That would need a separate "change ONLY the angle" step, if she wants it.
- Hair: t1–t6 replace flowers/hairpins with a crown. That is the triều phục headdress, but it is the most visible change. If the owner wants hair untouched, drop the crown clause.
