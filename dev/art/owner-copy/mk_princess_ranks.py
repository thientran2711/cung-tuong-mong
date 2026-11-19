import re
B='/home/user/cung-tuong-mong/dev/art/owner-copy/'
P={
'bt':dict(country='Ba Tư (a Persian-style foreign kingdom)',main='indigo blue',hex1='#5B6CA6',sec='ivory',hex2='#EFE6D2',
 touch="ONE clear touch of her Persian homeland, clearly visible at game size: all robe borders are embroidered with gold-thread Persian arabesques and small birds, and she wears teardrop pearl earrings.",
 nat={1:"a long fitted silk coat-gown of indigo-blue silk opening over a flowing ivory silk skirt, narrow gold-thread arabesque borders along the edges, long narrow sleeves, a small pearl circlet on her hair and small teardrop pearl earrings",
      2:"a long fitted brocade coat-gown of indigo-blue silk opening over a flowing ivory silk skirt, embroidered all along the edges with gold-thread arabesques and small birds, long narrow sleeves under wide open over-sleeves lined with ivory satin, a belt of small gold plaques, a small gold jewelled tiara and teardrop pearl earrings",
      3:"a rich long brocade coat-gown of indigo-blue silk densely embroidered with gold-thread arabesques, birds and pomegranate flowers, opening over a flowing ivory satin skirt with a wide gold-embroidered hem band, wide open over-sleeves lined with ivory satin, a jewelled gold belt with hanging pearl chains, layered gold-and-pearl necklaces, a taller jewelled gold tiara with a central ruby and short pearl strands"},
 hair={1:"her glossy pure BLACK hair (never brown), long and loose in soft waves down her back",2:"her glossy pure BLACK hair (never brown), long and loose in soft waves, two thin side braids joined at the back",3:"her glossy pure BLACK hair (never brown), long, in two long loose braids woven with small pearls, falling over the front of her shoulders"},
 pose={1:"standing lightly, one hand lightly raised at her shoulder, a single long-stemmed red rose in the other hand",
       2:"a small gold perfume flask with a long neck held at her chest in both hands, head tilted slightly",
       3:"a small gold hand mirror set with turquoise held at her waist, glancing at the viewer, skirt swirling",
       4:"walking mid-step, a short pomegranate branch with two ripe red fruits raised in one hand, the other sleeve swinging",
       5:"a small turquoise-and-gold jewel casket held in both hands at her waist, poised",
       6:"one hand resting lightly on the pearls at her collar, a white peacock-feather fan held downward in the other hand",
       7:"one hand gathering her wide sleeve, a tall slim gold-and-enamel rosewater flask in the other hand at chest height, with stately grace",
       8:"a jewelled gold seal box held in both hands before her waist"}),
'cl':dict(country='Cao Ly (a Korean-style foreign kingdom)',main='deep rose',hex1='#C9708A',sec='jade green',hex2='#79A98F',
 touch="ONE clear touch of her Korean homeland, clearly visible at game size: a long ornate norigae tassel ornament (a jade and coral knot with a long silk tassel) hanging from her sash.",
 nat={1:"a short jade-green silk jacket with long deep-rose ribbons tied at the chest, a full high-waisted floor-length skirt of soft deep-rose silk billowing like a bell, gold-stamped flower borders, a small norigae tassel ornament hanging from the ribbon",
      2:"a short jade-green silk jacket with long deep-rose ribbons tied at the chest and gold-stamped flower patterns, cuffs striped in several colours, a very full high-waisted floor-length skirt of soft deep-rose silk billowing like a bell with wide gold-stamped borders, a long ornate norigae tassel ornament hanging from the ribbon",
      3:"a ceremonial jade-green silk outer robe with wide sleeves striped at the cuffs in several colours, worn over a very full high-waisted deep-rose silk skirt billowing like a bell, both covered with rich gold-stamped flower and cloud patterns, a gold-embroidered round badge on the chest, a triple norigae tassel ornament of jade, coral and gold hanging from the ribbon"},
 hair={1:"her glossy pure BLACK hair (never brown) parted in the middle and smoothed into a low braided bun at the nape, a long gold binyeo hairpin lying HORIZONTALLY through the bun",2:"her glossy pure BLACK hair (never brown) parted in the middle and smoothed into a low braided bun at the nape, a long gold binyeo hairpin lying HORIZONTALLY through the bun, a small jewelled ornament beside it",3:"her glossy pure BLACK hair (never brown) parted in the middle and smoothed into a fuller low bun at the nape, a long ornate gold binyeo with jewelled ends lying HORIZONTALLY through the bun, small gold flower pins around it"},
 pose={1:"a branch of white plum blossoms held in front of her with both hands",
       2:"a round silk fan embroidered with two cranes held in one hand at her waist",
       3:"a small paper lantern with a red silk tassel on a short handle held in one hand, swaying gently",
       4:"walking mid-step, a long-stemmed pink lotus flower raised beside her shoulder in one hand",
       5:"a small embroidery hoop with a half-finished flower held in both hands at her waist, poised",
       6:"one hand touching her norigae tassel, a white crane-feather fan held in the other hand",
       7:"a carved white jade pendant on a red silk cord held up at chest height in one hand, the wide sleeves falling in soft folds, with stately grace",
       8:"an imperial round fan embroidered with a phoenix, on a carved gold-and-jade handle with pearl tassels, held in one hand at chest height below the chin, the other hand resting lightly on her sash, with majestic grace"}),
'pt':dict(country='Phù Tang (a Japanese-style foreign kingdom)',main='wisteria purple',hex1='#9C88BC',sec='pale lavender',hex2='#D3C8E2',
 touch="ONE clear touch of her Japanese (Heian) homeland, clearly visible at game size: at the collar and sleeve openings the edges of several thin layered inner robes show in graded shades of lilac, pale lavender and white.",
 nat={1:"several thin silk robes layered one over another, their edges showing at the collar, the sleeve openings and the hem in graded shades of wisteria lilac, pale lavender and white, the outer robe of soft wisteria-purple silk woven with small white wisteria patterns, wide long open sleeves, long pleated pale-crimson trousers-skirt reaching the floor",
      2:"more silk robes layered one over another, their edges showing at the collar, the sleeve openings and the hem in graded shades of wisteria lilac, pale lavender and white, the outer robe of wisteria-purple silk woven with white wisteria and paulownia patterns, very wide long open sleeves, a short trailing pleated over-apron of white silk at the back, long pleated pale-crimson trousers-skirt reaching the floor",
      3:"a full formal court ensemble of many silk robes layered one over another, their edges showing at the collar, the sleeve openings and the hem in graded shades of wisteria lilac, pale lavender and white, the outer robe of rich wisteria-purple silk brocade woven with gold and white wisteria and paulownia patterns, a short jacket-robe of deep purple brocade over it, very wide long open sleeves, a long pleated white train-apron with painted flowers falling behind, long pleated crimson trousers-skirt reaching the floor"},
 hair={1:"her glossy pure BLACK hair (never brown), very long and straight, falling loose down her back to the knees, tied loosely low with a thin white paper ribbon, a small gold hair ornament at the crown",2:"her glossy pure BLACK hair (never brown), very long and straight, falling loose down her back to the knees, tied loosely low with a red-and-white silk cord, a gold comb ornament at the crown",3:"her glossy pure BLACK hair (never brown), very long and straight, falling loose down her back to the knees, tied low with a red silk cord, a gold crown-like hair ornament with small dangles at the crown"},
 pose={1:"a long drooping branch of purple wisteria held in one hand",
       2:"a folding fan of thin painted wooden slats with long coloured silk cords, held half-open in both hands at her chest",
       3:"a long slip of coloured poem paper (tanzaku) held in one hand at her chest, swaying gently",
       4:"walking mid-step, a closed red paper parasol resting against her shoulder in one hand",
       5:"a slim bamboo flute held horizontally across her waist in both hands, poised",
       6:"an embroidered silk temari ball resting in her raised palm, the other hand at her sleeve",
       7:"a small gilded birdcage with a white bird held in one hand at chest height, the wide sleeves falling in soft folds, with stately grace",
       8:"a gold-and-jade ruyi sceptre held in both hands before her waist"}),
}
RANK={1:'Đáp ứng',2:'Thường tại',3:'Quý nhân'}
EYE="Eyes soft, warm and round-almond, never slanted or upturned, never teary."
for k,d in P.items():
  for t in range(1,9):
    s=open(B+f'm19_t{t}_V4.txt').read()
    s=s.replace('An imperial consort.',f'An imperial consort, a foreign princess from {d["country"]} who has entered the imperial palace.',1)
    s=s.replace('about 22, youthful adult.','about 20, youthful adult.',1)
    assert EYE in s; s=s.replace(EYE,"Her eyes exactly as in image 1, open and bright, never teary.")
    # pose: keep ANGLE clause, swap action/item
    pa=s.index('Pose:'); pe=s.index('The item',pa); seg=s[pa:pe]
    m=re.search(r'ANGLE:.*?(?=;|, (?:poised|with))',seg) 
    ang=re.search(r'ANGLE: [^;]*?(?=; |$)',seg)
    angle=re.search(r'ANGLE: (.*?)(?:; |, poised|, with stately grace|\. ?$)',seg).group(1)
    s=s[:pa]+f'Pose: ANGLE: {angle}; {d["pose"][t]}. '+s[pe:]
    if t<=3:
      oa=s.index('Outfit ('); oe=s.index('COLOUR RULE',oa)
      s=s[:oa]+f'Outfit (rank-{t} consort ({RANK[t]}), still dressed in the costume of her own homeland, {"elegant, never poor" if t==1 else "a little more ornate than the rank below" if t==2 else "clearly the richest of her homeland costumes"}, splendid and royal, never servant-like, never a maid): {d["nat"][t]}. '+s[oe:]
      ha=s.index('Hair:'); he=s.index('No phoenix',ha)
      s=s[:ha]+f'Hair: {d["hair"][t]}. '+s[he:]
      if k=='cl':
        old="Every hairpin is inserted into the hair pointing upward or backward with dangles hanging down, no hairpin horizontal or sticking out to the side."
        assert old in s; s=s.replace(old,"The long gold binyeo hairpin lies HORIZONTALLY through the low bun at the nape, as in Korean royal fashion; any other small pins point upward or backward.")
    else:
      i=s.index('All flowers'); s=s[:i]+d['touch']+' '+s[i:]
    s=s.replace('caramel apricot and gold',f'{d["main"]} and {d["sec"]}')
    s=s.replace('gold like #C7A085',f'{d["sec"]} like {d["hex2"]}').replace('a deeper caramel like #C7A085',f'{d["sec"]} like {d["hex2"]}')
    s=s.replace('#DFBBA1',d['hex1']).replace('caramel apricot',d['main'])
    if k!='bt': pass
    if d['main']=='deep rose' or True: s=s.replace('NOT green',f'NOT {"green" if k!="cl" else "orange"}')
    assert 'caramel' not in s and 'apricot' not in s, (k,t)
    open(B+f'pr_{k}_t{t}_V1.txt','w').write(s)
print('ok')
