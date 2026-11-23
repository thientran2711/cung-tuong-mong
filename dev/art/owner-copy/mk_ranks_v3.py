# Lượt 306-308/321 builder (t1-t3 add SLEEVES sentence): princesses V3 + m19 V5, base = m19_tN_V4.txt (approved prompt), only parts swapped.
import re
B='/home/user/cung-tuong-mong/dev/art/owner-copy/'
FL={1:['osmanthus clusters', 'lilac sprays', 'pear blossoms', 'single peach blossoms', 'plum blossoms'],
    2:['cymbidium orchids', 'tiger lilies', 'narcissus flowers', 'lily magnolias', 'pomegranate flowers'],
    3:['michelia blossoms', 'semi-double China roses', 'double azaleas', 'semi-double rose-of-Sharon flowers', 'wintersweet blossoms'],
    4:['epiphyllum flowers', 'lotus flowers', 'double peach blossoms', 'double kerria pompons', 'double daylilies'],
    5:['formal double camellias', 'double hollyhocks', 'tea-scented China roses', 'double cotton-rose hibiscus flowers', 'double gardenias'],
    6:['tree peonies', 'incurved chrysanthemums', 'thousand-petal lotuses', 'mophead hydrangeas', 'bomb-form herbaceous peonies']}   # F2 NEW TABLE owner DUYỆT Lượt 1352 (FLORA1; = t8-prompt-B/build.py F2_FL plural)
SZ={1: 'HAIR FLOWER SIZE: the fresh hair flower is a LARGE full bloom about the size of her palm, clearly visible at game size (never tiny florets).', 2: 'HAIR FLOWER SIZE: the fresh hair flower is a LARGE full bloom about the size of her palm, clearly visible at game size (never tiny florets).', 3: 'HAIR FLOWER SIZE: the fresh hair flowers are LARGE full blooms about the size of her palm with a few buds, clearly visible at game size (never tiny florets).', 4: 'HAIR FLOWER SIZE: the fresh hair flowers are LARGER than a palm, one big bloom plus smaller blooms, clearly bigger than the lower ranks.', 5: 'HAIR FLOWER SIZE: two or three BIG full blooms, each larger than her palm, clearly bigger than the Tần rank.', 6: 'HAIR FLOWER SIZE: a big lush cluster of the LARGEST blooms of all ranks, each larger than her palm, the grandest hair flowers in the palace.'}
FLCOL=" in a soft colour that suits her outfit (never her main robe colour)"
ANG=[("FULLY FRONTAL, her body, shoulders and face squarely facing the viewer, no turn","a light graceful step, {item}","feet close together, one foot a little forward and lightly on its toes, toes peeking from under the hem"),
 ("a SLIGHT shoulder turn to the LEFT (about 15 degrees), body almost frontal, face toward the viewer","{item}, head tilted very slightly","weight on her back foot, the front foot turned slightly the same way as her shoulders, toes peeking under the hem"),
 ("a clear THREE-QUARTER view, NOT frontal: her whole body, shoulders, hips and face turned about 45 degrees toward the viewer's RIGHT, her left shoulder nearer the viewer, face fully visible","swaying gently in a light turn, {item}, skirt swirling","her feet pointing the same way as her hips, one knee softly bent so the skirt swings"),
 ("walking STRAIGHT TOWARD the viewer, body and face frontal","walking mid-step, {item}, the free long sleeve floating out","one foot stepping forward under the swinging hem, the back heel lifting, a natural easy walking stride"),
 ("a clear THREE-QUARTER view toward the LEFT, NOT frontal: her whole body, hips and face turned about 45 degrees to the left, her right shoulder nearer the viewer, face fully visible (never side view)","{item}, poised","her feet pointing the same way as her hips, one foot slightly in front, toes peeking under the hem"),
 ("a SLIGHT shoulder turn to the RIGHT (about 15 degrees), body almost frontal, face toward the viewer","{item}, chin slightly lifted","weight on one foot, the other foot resting slightly to the side, toes peeking under the hem"),
 ("a SLIGHT turn to the LEFT (about 15 degrees), body almost frontal, face toward the viewer","{item}, the wide sleeves falling in soft folds, with stately grace","one foot slightly forward as if about to step, the hem barely lifted")]
def _mir(x):
    return x.replace('LEFT','@@').replace('RIGHT','LEFT').replace('@@','RIGHT').replace('left shoulder','@@').replace('right shoulder','left shoulder').replace('@@','right shoulder').replace('to the left','@@').replace('to the right','to the left').replace('@@','to the right')
MIRROR=[(_mir(a)+('' if ('LEFT' in a or 'RIGHT' in a) else ', mirrored: her weight and the item on her LEFT side'),_mir(b),_mir(c)) for a,b,c in ANG]
ANG=ANG+MIRROR  # Lượt 321: 7 angles + 7 mirrored = 14, rotated per person
T8=("FULLY FRONTAL, body, shoulders and face squarely facing the viewer, a calm, stately standing pose","{item}, with majestic grace","feet together, toes peeking under the hem, perfectly balanced and still")
P={
'm19':dict(n=19,main='caramel apricot',hex1='#DFBBA1',sec='soft teal blue',hex2='#6E9CA8',
 item={1:'a single small branch of pink peach blossoms held in one hand',2:'a thread-bound poetry book with a deep red cover held at her chest',3:'a small red lacquered box inlaid with mother-of-pearl held up near her shoulder',4:'a sachet of deep crimson silk brocade with a jade tassel held up beside her cheek',5:'a folding fan of white silk painted with ink plum blossoms held half-open at her chest',6:'a white jade ruyi sceptre with a red silk tassel held in one hand',7:'a gilded hand censer set with small gems held at chest height',8:'an imperial round fan embroidered with a phoenix, on a carved gold-and-jade handle with pearl tassels, held in one hand at chest height below the chin, the other hand resting lightly on her sash'}),
'bt':dict(n=1,country='Ba Tư (a Persian-style foreign kingdom)',main='indigo blue',hex1='#5B6CA6',sec='ivory',hex2='#EFE6D2',
 touch="STRONG PERSIAN CHARACTER of her homeland, clearly visible at game size: her national colours indigo blue and ivory stay the two colours of the outfit; all robe borders are embroidered with wide gold-thread Persian arabesques and small birds; a jewelled Persian tiara band with small teardrop pearls is set in front of her bun; a sheer ivory silk head veil falls from the back of her crown down her back; teardrop pearl earrings.",
 nat={1:"a long fitted silk coat-gown of indigo-blue silk opening over a flowing ivory silk skirt, narrow gold-thread arabesque borders along the edges, long narrow sleeves, a small pearl circlet on her hair and small teardrop pearl earrings",
      2:"a long fitted brocade coat-gown of indigo-blue silk opening over a flowing ivory silk skirt, embroidered all along the edges with gold-thread arabesques and small birds, long narrow sleeves under wide open over-sleeves lined with ivory satin, a belt of small gold plaques, a small gold jewelled tiara and teardrop pearl earrings",
      3:"a rich long brocade coat-gown of indigo-blue silk densely embroidered with gold-thread arabesques, birds and pomegranate flowers, opening over a flowing ivory satin skirt with a wide gold-embroidered hem band, wide open over-sleeves lined with ivory satin, a jewelled gold belt with hanging pearl chains, layered gold-and-pearl necklaces, a taller jewelled gold tiara with a central ruby and short pearl strands"},
 hair={1:"her glossy pure BLACK hair (never brown), long and loose in soft waves down her back, a sheer ivory silk veil laid over the back of her head and falling down her back, held by the small pearl circlet, fresh {fl} tucked at her temple",
       2:"her glossy pure BLACK hair (never brown), long and loose in soft waves, two thin side braids joined at the back, a sheer ivory silk veil laid over the back of her head and falling down her back, held by the jewelled tiara, fresh {fl} tucked at her temple",
       3:"her glossy pure BLACK hair (never brown), long, in two long loose braids woven with small pearls falling over the front of her shoulders, a sheer ivory silk veil laid over the back of her head and falling down her back, held by the tall tiara, fresh {fl} tucked at her temple"},
 item={1:'a single long-stemmed red rose held in one hand',2:'a small gold perfume flask with a long neck held at her chest in both hands',3:'a small gold hand mirror set with turquoise held at her waist',4:'a short pomegranate branch with two ripe red fruits held up in one hand',5:'a small turquoise-and-gold jewel casket held in both hands at her waist',6:'a peacock-feather fan in iridescent green and gold held in one hand',7:'a tall slim gold-and-enamel rosewater flask held at chest height'}),
'cl':dict(n=2,country='Cao Ly (a Korean-style foreign kingdom)',main='deep rose',hex1='#C9708A',sec='jade green',hex2='#79A98F',
 touch="STRONG KOREAN CHARACTER of her homeland, clearly visible at game size: her national colours deep rose and jade green stay the two colours of the outfit; the skirt is very full and bell-shaped like a Korean royal skirt; a long ornate norigae tassel ornament (a jade knot with a long deep-rose silk tassel) hangs from her sash.",
 nat={1:"a light everyday royal hanbok: a short jade-green silk jacket with a small deep-rose ribbon tied at the chest and plain deep-rose cuffs, a full high-waisted floor-length skirt of soft deep-rose silk billowing like a bell with a narrow gold-stamped hem, a small simple norigae tassel",
      2:"a festive royal hanbok: a short jade-green silk jacket covered with gold-stamped flower patterns, long deep-rose ribbons tied at the chest, a very full deep-rose silk skirt billowing like a bell with TWO wide gold-stamped flower bands at the hem, a long ornate norigae tassel ornament",
      3:"a ceremonial royal dangui: a long jade-green silk ceremonial jacket-robe reaching the knees with curved side hems, covered all over with gold-stamped cloud and flower patterns, worn over a very full deep-rose silk bell skirt with a wide gold-stamped hem band, a triple norigae of jade and deep-rose silk tassels hanging at her side; nothing round or flat on the chest"},
 hair={1:"her glossy pure BLACK hair (never brown) parted in the middle and smoothed into a low bun at the nape, a plain silver binyeo lying HORIZONTALLY through the bun, fresh {fl} tucked beside it",
       2:"her glossy pure BLACK hair (never brown) parted in the middle and smoothed into a low braided bun at the nape, a long gold binyeo with a jewelled end lying HORIZONTALLY through the bun, fresh {fl} tucked beside it",
       3:"her glossy pure BLACK hair (never brown) parted in the middle in a fuller low bun at the nape, a long ornate gold binyeo with jewelled flower ends lying HORIZONTALLY through it, a small jewelled flower crown (hwagwan) of gold and pearls on top of her head, fresh {fl} tucked beside the bun"},
 item={1:'a branch of white plum blossoms held in front of her with both hands',2:'a round fan of pale gold silk embroidered with white cranes held in one hand at her waist',3:'a small white paper lantern with a red silk tassel on a short handle held in one hand',4:'a long-stemmed white lotus flower held up beside her shoulder in one hand',5:'a small pale-wood embroidery hoop with a half-finished white flower held in both hands at her waist',6:'a white crane-feather fan held in one hand',7:'a carved white jade pendant on a gold silk cord held up at chest height in one hand'}),
'pt':dict(n=3,country='Phù Tang (a Japanese-style foreign kingdom)',main='wisteria purple',hex1='#9C88BC',sec='soft crimson',hex2='#B8556A',
 touch="STRONG HEIAN CHARACTER of her homeland, clearly visible at game size: her national colours wisteria purple and soft crimson stay the two colours of the outfit; at the collar, the sleeve openings and the hem the edges of many thin layered robes show in graded shades of wisteria purple with a soft crimson innermost edge; a long pleated soft crimson under-skirt.",
 nat={1:"several thin silk robes layered one over another, their edges showing at the collar, the sleeve openings and the hem in graded shades of wisteria purple, the innermost edge soft crimson, the outer robe of soft wisteria-purple silk woven with small white wisteria patterns, wide long open sleeves, long pleated soft crimson trousers-skirt reaching the floor",
      2:"more silk robes layered one over another, their edges showing at the collar, the sleeve openings and the hem in graded shades of wisteria purple, the innermost edge soft crimson, the outer robe of wisteria-purple silk woven with white wisteria and paulownia patterns, very wide long open sleeves, a short trailing pleated over-apron of soft crimson silk at the back, long pleated soft crimson trousers-skirt reaching the floor",
      3:"a full formal court ensemble of many silk robes layered one over another, their edges showing at the collar, the sleeve openings and the hem in graded shades of wisteria purple, the innermost edge soft crimson, the outer robe of rich wisteria-purple silk brocade woven with gold and white wisteria and paulownia patterns, very wide long open sleeves, a long pleated train-apron of soft crimson silk with painted white flowers falling behind, long pleated soft crimson trousers-skirt reaching the floor"},
 hair={1:"her glossy pure BLACK hair (never brown), very long and straight, falling loose down her back to the knees, tied loosely low with a thin white paper ribbon, small fresh {fl} as hair ornaments at the crown",
       2:"her glossy pure BLACK hair (never brown), very long and straight, falling loose down her back to the knees, tied loosely low with a red-and-white silk cord, a gold comb and small fresh {fl} at the crown",
       3:"her glossy pure BLACK hair (never brown), very long and straight, falling loose down her back to the knees, tied low with a red silk cord, a gold crown-like hair ornament with small dangles and fresh {fl} at the crown"},
 item={1:'a long drooping branch of white wisteria held in one hand',2:'a folding fan of pale natural wood slats with long white and gold silk cords held half-open in both hands at her chest',3:'a long slip of pale gold poem paper (tanzaku) held in one hand at her chest',4:'a closed parasol of pale gold-yellow oiled paper resting against her shoulder in one hand',5:'a slim natural bamboo flute held across her waist in both hands',6:'a white-and-gold embroidered silk temari ball resting in her raised palm',7:'a small gilded birdcage with a white bird held in one hand'}),
}
RANK={1:'Đáp ứng',2:'Thường tại',3:'Quý nhân'}
EYE="Eyes soft, warm and round-almond, never slanted or upturned, never teary."
GL="Her legs and feet follow the pose naturally: weight resting on one leg, the other knee softly bent, feet natural under the skirt hem, never both feet splayed outward, never stiff straight legs; the lower body matches the movement of the upper body."
VEIL="no sheer floating scarf, stole, shawl or veil."
def rep(s,a,b,need=True):
    if need: assert a in s,(a[:60])
    return s.replace(a,b)
def build(k,t,hh_orig=False):
    d=P[k]; pr=k!='m19'; s=open(B+f'm19_t{t}_V4.txt').read()
    fl=(FL[t][(d['n']-1)%5]+FLCOL) if t<=6 else None
    if pr:
        s=rep(s,'An imperial consort.',f'An imperial consort, a foreign princess from {d["country"]} who has entered the imperial palace.')
        s=rep(s,'about 22, youthful adult.','about 20, youthful adult.')
        s=rep(s,EYE,"Her eyes exactly as in image 1, open and bright, never teary.")
    # pose (rotation, t8 fixed)
    a,act,legs=(T8 if t==8 else ANG[(t-1+(d['n']-1))%14])
    pa=s.index('Pose:'); pe=s.index('The item',pa)
    s=s[:pa]+f'Pose: ANGLE: {a}; '+act.format(item=d['item'][t])+'. '+s[pe:]
    s=rep(s,GL,f"Her LEGS and FEET for this pose: {legs}; never both feet splayed outward, never stiff straight legs.")
    s=rep(s,'The item is in a contrasting colour, not the robe colour,','The held item keeps the colours named above, never the colour of her outfit (neither her main nor her secondary colour),')
    # hair flowers + capes (before colour swap; base words are caramel apricot)
    if t==6:
        s=rep(s,'an embroidered caramel apricot pearl-edged cape over the shoulders','TWO layered embroidered caramel apricot pearl-edged shoulder capes, one over the other (the upper one shorter), softly draping over the shoulders')
        s=rep(s,'decorated with several gold hairpins',f'decorated with fresh {fl} and several gold hairpins')
    if t==7:
        s=rep(s,'a jewelled cloud-collar cape edged with pearls and gold over the shoulders','TWO layered soft embroidered silk shoulder capes, one over the other (the upper one shorter), richly edged with pearls and gold, draping softly and naturally over the shoulders like the noble consort\'s but grander, NOT a stiff cloud collar')
        s=rep(s,'with pearl strands, kingfisher-blue inlay and a few gold tassels.','with pearl strands, kingfisher-blue inlay and a few gold tassels; NO flowers in the hair, only gold, pearls and jewels.')
    if t==8: s=rep(s,'in a HIGH BUN.','in a HIGH BUN; NO flowers in the hair, only gold, pearls and jewels.')
    if t in (4,5): s=rep(s,'decorated with fresh flowers and several',f'decorated with fresh {fl} and several')
    if t<=3 and not pr:
        s=s.replace('a fresh flower (a white jasmine sprig)',f'fresh {fl}').replace('and a fresh flower,',f'and fresh {fl},').replace('with silver, pearl and fresh flowers',f'with silver and pearl pins and fresh {fl}')
        assert fl in s
    if t<=3 and pr:
        oa=s.index('Outfit ('); oe=s.index('COLOUR RULE',oa)
        s=s[:oa]+f'Outfit (rank-{t} consort ({RANK[t]}), still dressed in the costume of her own homeland, {"elegant, never poor" if t==1 else "clearly more ornate than the rank below" if t==2 else "clearly the richest of her homeland costumes"}, splendid and royal, never servant-like, never a maid): {d["nat"][t]}. '+s[oe:]
        ha=s.index('Hair:'); he=s.index('No phoenix',ha)
        s=s[:ha]+'Hair: '+d['hair'][t].format(fl=fl)+'. '+s[he:]
        if k=='cl':
            s=rep(s,"Every hairpin is inserted into the hair pointing upward or backward with dangles hanging down, no hairpin horizontal or sticking out to the side.","The binyeo hairpin lies HORIZONTALLY through the low bun at the nape, as in Korean royal fashion; any other small pins point upward or backward.")
    if t<=6:
        anc='No phoenix' if 'No phoenix' in s else 'All flowers'
        s=s.replace(anc,SZ[t]+' '+anc,1)
    if pr and 4<=t<=7:
        i=s.index('All flowers'); s=s[:i]+d['touch']+' '+s[i:]
    if k=='bt' and (t<=7): s=rep(s,VEIL,'no floating scarf, stole or shawl; her only veil is the sheer head veil described above.')
    # colours
    if hh_orig:
        ca=s.index('COLOUR RULE'); ce=s.index('Hair:',ca)
        s=s[:ca]+"COLOUR RULE: all colours fresh, clear and luminous, never dusty or greyed; ORIGINAL-COLOUR SET: her own caramel apricot silk like #DFBBA1 is the DOMINANT colour of the robe, mantle, sleeves and skirt (more than half of everything visible), soft teal blue like #6E9CA8 is the secondary colour (inner robe, wide borders, collar lining), and the royal yellow of image 3 appears only as touches (narrow borders, the sash and embroidery accents); the crown, hairpin and jewellery gold in 18K tone; NOT a yellow robe. "+s[ce:]
        s=rep(s,"of golden yellow silk mixed with caramel apricot","of caramel apricot silk with royal yellow touches")
    if t==8 and not hh_orig: s=rep(s,', with gold like #C7A085 in the linings','')
    s=s.replace('a deeper caramel like #C7A085',f'{d["sec"]} like {d["hex2"]}').replace('gold like #C7A085',f'{d["sec"]} like {d["hex2"]}')
    s=s.replace('caramel apricot and gold stays the MAIN robe colour',f'caramel apricot stays the MAIN robe colour, {d["sec"]} the SECONDARY colour').replace('(her signature colour family caramel apricot and gold)',f'(her signature colours caramel apricot and {d["sec"]})')
    s=s.replace('caramel apricot and gold thread',f'caramel apricot and {d["sec"]} thread')
    if pr:
        s=s.replace('#DFBBA1',d['hex1']).replace('caramel apricot',d['main'])
        s=s.replace('NOT green','NOT orange' if k=='cl' else 'NOT green')
        if k=='bt': s=s.replace('NOT ivory, ','')
    if t>=6:
        anc={6:'No phoenix',7:'All flowers',8:'Hair:'}[t]
        s=rep(s,anc,"Image 3 is only a colour reference (a flat swatch of the exact royal yellow): use exactly that yellow for every yellow part, never copy anything but its colour. "+anc)
    if t<=7 or hh_orig:
        m=d['main']; sc=d['sec']
        extra=" At this rank the royal yellow of image 3 appears only as the rank's yellow parts described above, never replacing her two colours." if t in (6,7) else (" The royal yellow of image 3 appears only as small touches." if hh_orig else "")
        tc=f"TWO-COLOUR RULE: the whole outfit uses EXACTLY TWO colours that clearly interact: the MAIN colour {m} and the SECONDARY colour {sc}, the secondary clearly visible in large areas (inner robe or skirt, wide borders, sash, cuffs, linings), never a single flat colour all over; gold or silver only as thin accents, never a third colour.{extra} Every layer has full-length long sleeves: NO short-sleeved or half-sleeved layer over the long sleeves. "
    else:
        tc=f"TWO-COLOUR RULE: exactly two colours: the ROYAL YELLOW of image 3 dominant and her own {d['main']} second; gold only as thin accents. Every layer has full-length long sleeves: NO short-sleeved or half-sleeved layer over the long sleeves. "
    if 4<=t<=6: tc="SLEEVES: the wide sleeves of the outer robe are very long and hang all the way down to her ANKLES, one single sleeve layer, flowing softly, never stiff. "+tc
    if t<=3: tc="SLEEVES: very long, wide, flowing sleeves of thin light silk that fall well past her hands and hang down to her KNEES, swaying gracefully and trailing elegantly (thướt tha); never short, narrow, cuffed or tight working sleeves like a maid's or palace servant's. "+tc
    i=s.find('Hair:'); i=i if i>=0 else s.index('All flowers'); s=s[:i]+tc+s[i:]
    if pr: assert 'caramel' not in s and 'apricot silk' not in s,(k,t)
    return s
out=[]
for t in range(1,9): out.append((f'm19_t{t}_V5.txt',build('m19',t)))
out.append(('m19_t8o_V5.txt',build('m19',8,hh_orig=True)))
for k in ('bt','cl','pt'):
    for t in range(1,8): out.append((f'pr_{k}_t{t}_V3.txt',build(k,t)))
for f,s in out: open(B+f,'w').write(s)
print(len(out),'files')
