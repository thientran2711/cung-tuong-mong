import pathlib
D=pathlib.Path("/home/user/cung-tuong-mong/dev/art/thu_comoi/M2203")
B="dev/handover/prompts_L2095/"
K={
1:(B+"M2196-01_s62_t1_thu.txt",[]),2:(B+"M2196-02_s62_t2_thu.txt",[]),3:(B+"M2196-03_s62_t3_thu.txt",[]),4:(B+"M2196-04_s62_t4_thu.txt",[]),
6:(B+"M2196-06_s62_t6_thu.txt",[("L2197 sash richness",["a slim royal-yellow silk sash wrapped all the way around the waist OVER the outer robe","closed at its centre front by a flat endless knot of yellow silk cord","two LONG yellow ties falling straight down either side of it to well past the knees","fitted to the waist"])]),
5:(B+"M2187-05_s62_t5_thu.txt",[
 ("L2191 Phi robe/waist like Tần",["a layered silk court robe of two or three visible layers","long trailing wide sleeves with deep silk cuffs","ONE slim gold silk girdle","only one belt","no second band","set with a row of small flat gold plaques chased with her flower","never slipping down to the hips","wrapped OVER the outer robe and closed at its centre front by a small gold flower clasp","two LONG silk ties falling straight down either side of it to well past the knees","the front of the skirt embroidered with large double hollyhock medallions"]),
 ("L2191 vân kiên = Tần length, 1 tier",["of TWO thin soft layers of the SAME thin","the lower peeking out below the upper as a narrow wavy band","about as long as the Tần's"]),
 ("L2196 Phi = Tần structure (neckline/motif place)",["richly embroidered in shaded silk and silver thread with double hollyhocks and small embroidered birds","a LOW open square neckline just below the collarbones","neck and collarbones bare","NEVER a high stand collar or mandarin collar","framed by ONE wide flat band in her second colour embroidered with double hollyhocks"])]),
7:(B+"M2187-07_s62_t7_thu.txt",[
 ("L2191 neckline/inner robe like QP",["this one robe worn over a royal-yellow inner dress lying flat","never adding bulk at the neckline","where it shows at the front opening and below the outer robe it is a little more embroidered than the Quý phi's","a moderate number of small sprigs of her flower","loosely scattered with plenty of plain cloth between them","in fine silk thread","flat in the cloth","calm and uncluttered"]),
 ("L2191 HQP phoenix = HH wording",["the gold-thread phoenixes are embroidered on the vân kiên's silk first","the pearls stitched on top of the phoenix embroidery","the phoenixes seen through the net"]),
 ("L2191 fringe ladder",["a short pearl fringe along its scalloped edge"]),
 ("L2191 jewels ladder",["small pearls along the trims"]),
 ("L2191/L2196 waist like QP + L2194 ties past knees",["a slim belt of small carved white-jade plaques in gold frames with seed pearls along both edges","over a wide royal-yellow silk sash wrapped OVER the outer robe","two LONG narrow yellow silk streamers fall softly from under the belt all the way down to the floor","their ends touching the floor","one either side of centre","a wide yellow sash and the yellow streamers"]),
 ("L2197 sash clasp = gold filigree with pearls",["closed at the CENTRE front of the waist by a gold cloud plaque"])]),
8:(B+"M2187-08_s62_t8_thu.txt",[
 ("L2191 neckline/inner robe/nothing binding like QP",["this one robe worn over a lilac inner dress lying flat","never adding bulk at the neckline","framed by ONE NARROW flat pearl-edged gold-embroidered band","that lies flat under the vân kiên and never reads as a layer or tier","the bodice soft and loose","never tight or fitted","where it shows at the front opening and below the outer robe it is a little more embroidered than the Hoàng quý phi's","small flowers and a few small clouds","evenly scattered with plain cloth between them","in fine silk thread with a touch of gold","flat in the cloth","calm and uncluttered","never covering the whole layer"]),
 ("L2191 HH clasp pearls + L2196 clasp ladder",["small and gold"]),
 ("L2191 fringe ladder",["a short pearl fringe along its scalloped edge"]),
 ("L2191 jewels ladder",["small pearls along the trims"]),
 ("L2191/L2196 waist like QP + L2194/L2195 ties past knees, tassels",["a slim belt of a few small carved white-jade phoenix-and-cloud plaques","each in a gold frame with pearl rims","over a narrow royal-yellow silk sash wrapped OVER the outer robe","two LONG narrow yellow silk streamers embroidered with small gold phoenixes fall softly from under the belt all the way down to the floor","one either side of centre","their tips capped in gold and touching the floor"]),
 ("L2197 sash clasp = gold filigree with pearls and jade",["closed at the CENTRE front of the waist by a small gold double-phoenix plaque set with white jade and pearls"])]),
}
for n,(base,groups) in K.items():
    t="base: "+base+"\n"+"".join(f"allow: {p}  # owner {tag} via ROOT-B5\n" for tag,ps in groups for p in ps)
    (D/f"M2203-0{n}_s62_t{n}_thu.txt.keep").write_text(t)
