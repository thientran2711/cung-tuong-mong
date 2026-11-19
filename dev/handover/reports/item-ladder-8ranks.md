# item-ladder-8ranks — 8 DIFFERENT held items per person (N8b, Lượt 434 item 2)

Problem: item_age.pick_kind gave one person the SAME item KIND at every rank (m07 held a butterfly hair ornament at all 8 ranks; only the material changed).
Fix (build_all.py `_install_ladder`): per person AND age the kinds of ranks t1..t8 are chosen greedily so NO KIND REPEATS across her 8 ranks; start index = person number (+5 per age step) and +3 per rank, so neighbours differ too. Luxury still rises per rank: each rank fills its item with that tier's materials (item_age MAT: t1 plain bamboo/wood/silk → t3 lacquer+silver → t4 jade → t5 gold-inlaid → t6 white jade+gold/pearls → t7 gold filigree+gems → t8 gold phoenix carved with pearls).
Kinds available per rank (item_age cell_kinds, a18; the lists are the 3f lists):

- t1: rfan, ffan, mirror, ball, slant, flute, bfly, fbask, sachet, hoop
- t2: rfan, ffan, mirror, ball, slant, flute, bfly, fbask, sachet, hoop
- t3: rfan, ffan, mirror, ball, slant, flute, bfly, fbask, sachet, hoop
- t4: rfan, ffan, mirror, ball, slant, flute, bfly, fbask, sachet, hoop
- t5: rfan, ffan, mirror, ball, slant, flute, bfly, fbask, sachet, hoop
- t6: rfan, ffan, mirror, ball, slant, flute, bfly, speony, pipa, parasol
- t7: rfan, ffan, mirror, ball, slant, flute, bfly, speony, pipa, parasol
- t8: rfan, ffan, mirror, ball, slant, flute, bfly, speony, pipa, parasol

Example ladders at a18 (kind → item text, one line per rank):

**c06**
- t1: flute of smooth bamboo, with a small silk cord, held across both hands  (flute)
- t2: sachet of embroidered silk, with a small silk tassel  (sachet)
- t3: folding fan of finely embroidered silk, ribs of red lacquer with silver fittings, with a silk tassel and a silver bead  (ffan)
- t4: small lantern of silk brocade on a short stick of carved jade, with a jade tassel  (slant)
- t5: small flower basket of gold-inlaid lacquer with fresh flowers, with a gem tassel  (fbask)
- t6: round fan of pearl-embroidered silk, handle of white jade mounted in gold, with pearl tassels  (rfan)
- t7: embroidered ball (tú cầu) of gold silk inlaid with kingfisher feathers, with gem tassels  (ball)
- t8: butterfly hair ornament of gold carved with phoenixes and set with pearls held in the hand, with pearl phoenix tassels  (bfly)

**c20**
- t1: embroidery hoop of smooth bamboo with a half-finished flower on plain silk  (hoop)
- t2: hand mirror framed in lacquered wood, with a small silk tassel  (mirror)
- t3: flute of red lacquer with silver fittings, with a silk tassel and a silver bead, held across both hands  (flute)
- t4: sachet of silk brocade, with a jade tassel  (sachet)
- t5: folding fan of gold-thread brocade, ribs of gold-inlaid lacquer, with a gem tassel  (ffan)
- t6: small lantern of pearl-embroidered silk on a short stick of white jade mounted in gold, with pearl tassels  (slant)
- t7: artificial peony made of gold silk inlaid with kingfisher feathers on a stem of gold filigree set with gems  (speony)
- t8: round fan of imperial silk embroidered with phoenixes, handle of gold carved with phoenixes and set with pearls, with pearl phoenix tassels  (rfan)

**m07**
- t1: butterfly hair ornament of smooth bamboo held in the hand, with a small silk cord  (bfly)
- t2: embroidery hoop of lacquered wood with a half-finished flower on embroidered silk  (hoop)
- t3: hand mirror framed in red lacquer with silver fittings, with a silk tassel and a silver bead  (mirror)
- t4: flute of carved jade, with a jade tassel, held across both hands  (flute)
- t5: sachet of gold-thread brocade, with a gem tassel  (sachet)
- t6: folding fan of pearl-embroidered silk, ribs of white jade mounted in gold, with pearl tassels  (ffan)
- t7: small lantern of gold silk inlaid with kingfisher feathers on a short stick of gold filigree set with gems, with gem tassels  (slant)
- t8: artificial peony made of imperial silk embroidered with phoenixes on a stem of gold carved with phoenixes and set with pearls  (speony)

**m29**
- t1: sachet of plain silk, with a small silk cord  (sachet)
- t2: folding fan of embroidered silk, ribs of lacquered wood, with a small silk tassel  (ffan)
- t3: small lantern of finely embroidered silk on a short stick of red lacquer with silver fittings, with a silk tassel and a silver bead  (slant)
- t4: small flower basket of carved jade with fresh flowers, with a jade tassel  (fbask)
- t5: round fan of gold-thread brocade, handle of gold-inlaid lacquer, with a gem tassel  (rfan)
- t6: embroidered ball (tú cầu) of pearl-embroidered silk, with pearl tassels  (ball)
- t7: butterfly hair ornament of gold filigree set with gems held in the hand, with gem tassels  (bfly)
- t8: closed parasol of imperial silk embroidered with phoenixes, handle of gold carved with phoenixes and set with pearls, with pearl phoenix tassels  (parasol)

**m01**
- t1: round fan of plain silk, handle of smooth bamboo, with a small silk cord  (rfan)
- t2: embroidered ball (tú cầu) of embroidered silk, with a small silk tassel  (ball)
- t3: butterfly hair ornament of red lacquer with silver fittings held in the hand, with a silk tassel and a silver bead  (bfly)
- t4: embroidery hoop of carved jade with a half-finished flower on silk brocade  (hoop)
- t5: hand mirror framed in gold-inlaid lacquer, with a gem tassel  (mirror)
- t6: flute of white jade mounted in gold, with pearl tassels, held across both hands  (flute)
- t7: small pipa lute inlaid with gold filigree set with gems, with gem tassels  (pipa)
- t8: folding fan of imperial silk embroidered with phoenixes, ribs of gold carved with phoenixes and set with pearls, with pearl phoenix tassels  (ffan)

**m52**
- t1: folding fan of plain silk, ribs of smooth bamboo, with a small silk cord  (ffan)
- t2: small lantern of embroidered silk on a short stick of lacquered wood, with a small silk tassel  (slant)
- t3: small flower basket of red lacquer with silver fittings with fresh flowers, with a silk tassel and a silver bead  (fbask)
- t4: round fan of silk brocade, handle of carved jade, with a jade tassel  (rfan)
- t5: embroidered ball (tú cầu) of gold-thread brocade, with a gem tassel  (ball)
- t6: butterfly hair ornament of white jade mounted in gold held in the hand, with pearl tassels  (bfly)
- t7: closed parasol of gold silk inlaid with kingfisher feathers, handle of gold filigree set with gems, with gem tassels  (parasol)
- t8: hand mirror framed in gold carved with phoenixes and set with pearls, with pearl phoenix tassels  (mirror)

Check: m01–m52 at a18: 52/52 persons have 8 different kinds; adjacent people differ at the same rank (start index +1 per person).
