# Owner Lượt 364/371/373 (19/11 night): princess prompts = STORE text (dev/art/t8-prompt-B/build.py build_low t1-t6, build_t7, build t8) VERBATIM.
# The 3 princesses are registered as store persons (p01 Ba Tư, p02 Cao Ly, p03 Phù Tang) so the store code itself writes every sentence;
# only SLOT words differ (face line, colours+hex, motif, item, hair-flower words). Later owner laws are INSERTED as extra sentences
# (never replacing a store sentence). t8o = original-colour set: colour-slot swap exactly as the approved m19 t8o V9b.
# CHECK: every sentence of the pure store output must be present in the final prompt -> check.txt
import sys,re,os
sys.argv=['build.py']; sys.path.insert(0,'/home/user/cung-tuong-mong/dev/art/t8-prompt-B')
import build as S
S.OLDITEM=True   # items are slot words given below (item_age.py has no rows for new persons)
OUT=os.path.dirname(os.path.abspath(__file__))+'/'
FL={1:['osmanthus clusters', 'lilac sprays', 'pear blossoms'],2:['cymbidium orchids', 'tiger lilies', 'narcissus flowers'],3:['michelia blossoms', 'semi-double China roses', 'double azaleas'],4:['epiphyllum flowers', 'lotus flowers', 'double peach blossoms'],5:['formal double camellias', 'double hollyhocks', 'tea-scented China roses'],6:['tree peonies', 'incurved chrysanthemums', 'thousand-petal lotuses']}   # F2 NEW TABLE owner DUYỆT Lượt 1352 (FLORA1; first 3 of build.py F2_FL, n=1..3)
FLC=' in a soft colour that suits her outfit (never her main robe colour)'
SZ={1:'HAIR FLOWER SIZE: the fresh hair flower is a LARGE full bloom about the size of her palm, clearly visible at game size (never tiny florets).',
    2:'HAIR FLOWER SIZE: the fresh hair flower is a LARGE full bloom about the size of her palm, clearly visible at game size (never tiny florets).',
    3:'HAIR FLOWER SIZE: the fresh hair flowers are LARGE full blooms about the size of her palm with a few buds, clearly visible at game size (never tiny florets).',
    4:'HAIR FLOWER SIZE: the fresh hair flowers are LARGER than a palm, one big bloom plus smaller blooms, clearly bigger than the lower ranks.',
    5:'HAIR FLOWER SIZE: two or three BIG full blooms, each larger than her palm, clearly bigger than the Tần rank.',
    6:'HAIR FLOWER SIZE: a big lush cluster of the LARGEST blooms of all ranks, each larger than her palm, the grandest hair flowers in the palace.'}
FACE="her own face exactly as in image 1, the same person"
P={
'p01':dict(key='bt',name='Ba Tư',country='Ba Tư (a Persian-style foreign kingdom)',pal='indigo blue and ivory',m=('indigo blue silk like #5B6CA6','ivory like #EFE6D2'),main='indigo blue',mot='pomegranate blossoms',
  item={1:('a single long-stemmed red rose','sprig'),2:('a small gold perfume flask with a long neck','vase'),3:('a small gold hand mirror set with turquoise','mirror'),4:('a short pomegranate branch with two ripe red fruits','sprig'),5:('a small turquoise-and-gold jewel casket','box'),6:('a peacock-feather fan in iridescent green and gold','rfan'),7:('a tall slim gold-and-enamel rosewater flask','one'),8:('an ornate gold Persian lantern of pierced filigree set with turquoise, with a short gold chain','two')},
  touch={1:"PERSIAN TOUCH of her homeland: narrow gold-thread arabesque edging along her borders, small teardrop pearl earrings, and a SHORT sheer ivory silk veil laid over the back of her head that reaches ONLY to her shoulders, held by a small pearl circlet.",
         2:"PERSIAN TOUCH of her homeland: gold-thread arabesque and small-bird edging along her borders, teardrop pearl earrings, and a sheer ivory silk veil laid over the back of her head that falls LONGER, down to her WAIST, held by a small gold jewelled tiara.",
         3:"PERSIAN TOUCH of her homeland: wide gold-thread arabesque edging along her borders, teardrop pearl earrings, and a LONG sheer ivory silk veil falling from a jewelled gold tiara with a central ruby all the way down her back to her KNEES.",
         4:"PERSIAN TOUCH of her homeland: all robe borders embroidered with gold-thread Persian arabesques and small birds; a jewelled Persian tiara band with small teardrop pearls set in front of her bun; a sheer ivory silk head veil falling from the back of her bun down her back; teardrop pearl earrings.",
         7:"PERSIAN TOUCH of her homeland: all robe borders embroidered with gold-thread Persian arabesques and small birds; a jewelled Persian tiara band with small teardrop pearls set in front of her bun; a sheer ROYAL-YELLOW silk gauze head veil (still transparent, but clearly royal golden yellow, never ivory or white) falls from the back of her crown down her back; teardrop pearl earrings."}),
'p02':dict(key='cl',name='Cao Ly',country='Cao Ly (a Korean-style foreign kingdom)',pal='deep rose and jade green',m=('deep rose silk like #C9708A','jade green like #79A98F'),main='deep rose',mot='cranes and clouds',
  item={4:('a long-stemmed white lotus flower','sprig'),5:('a small pale-wood embroidery hoop with a half-finished white flower','hoop'),6:('a white crane-feather fan','rfan'),7:('a carved white jade pendant on a gold silk cord','one'),8:('a small square gold ceremonial seal box wrapped in deep red silk with a jade knot','box')},
  touch={4:"KOREAN TOUCH of her homeland: her skirt is very full and bell-shaped like a Korean royal skirt, and a long ornate norigae tassel ornament (a jade knot with a long deep-rose silk tassel) hangs from her sash."}),
'p03':dict(key='pt',name='Phù Tang',country='Phù Tang (a Japanese-style foreign kingdom)',pal='wisteria purple and soft crimson',m=('wisteria purple silk like #9C88BC','soft crimson like #B8556A'),main='wisteria purple',mot='wisteria',
  m_rank={1:('pale lilac silk like #CDBFE0','soft crimson like #B8556A'),2:('deep wisteria violet silk like #7E66AA','soft crimson like #B8556A')},
  item={1:('a long drooping branch of white wisteria','sprig'),2:('a folding fan of pale natural wood slats with long white and gold silk cords','ffan'),4:('a closed parasol of pale gold-yellow oiled paper','lantern'),5:('a slim natural bamboo flute','flute'),6:('a white-and-gold embroidered silk temari ball','dangle')},
  touch={1:"HEIAN TOUCH of her homeland: only THREE thin robe edges show at the collar and the sleeve openings (pale lilac over soft crimson), and a long pleated soft crimson trousers-skirt shows below her hem; simple and light.",
         2:"HEIAN TOUCH of her homeland: FIVE thin layered robe edges show at the collar, the sleeve openings and the hem in graded shades from deep wisteria violet to soft crimson, and a short pleated soft crimson over-apron trails behind her; clearly richer and deeper in colour than the lowest rank.",
         4:"HEIAN TOUCH of her homeland: at the collar, the sleeve openings and the hem the edges of several thin layered robes show in graded shades of wisteria purple with a soft crimson innermost edge."})}
def touch(d,t):
    T=d['touch']; k=max([x for x in T if x<=t]) if t not in T else t
    if d['key']!='bt' and t>=4: k=4
    if d['key']=='bt' and t>=7: k=7
    if d['key']=='bt' and 4<=t<=6: k=4
    return T[k]
for c,d in P.items():
    S.DATA[c]=(d['pal'],FACE); S.ORIG1[c]=d['m']; S.LOWNAME[c]=(d['main'],d['main'])
    S.MOTIF_LOW[c]=(d['mot'],'')
    S.ITEMS_LOW[c]={t:d['item'].get(t,('a silk round fan','rfan')) for t in range(1,7)}
    for t in (4,5,6): S.OUTFIT_JOBS[f"{c}-t{t}"]=S._g3["outfit"](t,d['pal'],d['mot']).replace("Outfit for all four (","Outfit (",1).replace("(Tan)","(Tần)").replace("(Quy phi)","(Quý phi)")
EYES="EYES AND HEAD: both eyes symmetrical, both irises looking in the same direction straight at the viewer, never cross-eyed, never wall-eyed; head held up, chin level or slightly raised, never looking down, eyelids fully open; normal natural head size for her body."
ONE="ONE SINGLE SLEEVE LAYER: each very wide sleeve falls in one piece from the shoulder; NO shorter outer sleeve, half-sleeve or cap-sleeve on top."
def store(c,t,orig=False):
    d=P[c]; n=int(c[1:])
    if t<=6:
        if t<=3: S.MOTIF_LOW[c]=(d['mot'],FL[t][n-1]+FLC)
        if 'm_rank' in d and t in d['m_rank']: S.ORIG1[c]=d['m_rank'][t]
        else: S.ORIG1[c]=d['m']
        s=S.build_low(c,t)
    elif t==7:
        S.ITEMS7.append(d['item'][7]); S.GOLDEN7[c]=len(S.ITEMS7)-1; s=S.build_t7(c)
    else:
        S.ITEMS.append(d['item'][8]); S.EXTRA_ITEM[c]=len(S.ITEMS)-1; s=S.build(c,'v0')
    if orig:  # t8o colour-slot swap, as the approved m19 t8o V9b
        mm=d['main']
        for a,b in ((f"robe of golden yellow silk mixed with {mm}",f"robe of {mm} silk mixed with royal golden yellow"),
                    ("the royal golden yellow is the DOMINANT colour",f"her {mm} is the DOMINANT colour"),
                    ("visible), her colour is the second colour","visible), and the royal golden yellow is the second colour")):
            assert a in s,(c,a); s=s.replace(a,b)
    return s
def laws(c,t,s):
    d=P[c]; n=int(c[1:]); add=[f"She is a foreign princess from {d['country']} who has entered the imperial palace.",touch(d,t)]
    if t<=3:
        add+=["HAIR (ranks 1-3): her hair stays LOOSE and flowing like in image 1 (half-up with most of the long hair hanging down her back is fine), never a high bun.",
              "SLEEVES: very long, wide, flowing sleeves of thin light silk that fall well past her hands and hang down to her KNEES, swaying gracefully and trailing elegantly (thướt tha); never short, narrow, cuffed or tight working sleeves like a maid's or palace servant's.",ONE,SZ[t]]
        if t==1: add.append("LENGTH LOCK: her outer garment and skirt reach her ankles; never a short jacket or hip-length top layer.")
    elif t<=6:
        add+=["HAIR UP: ALL of her hair is swept UP and gathered into a high bun/chignon on top of her head, smooth at the nape; NO hair hanging loose down her back or over her shoulders."]
        if t==6: add.append(f"Her hair is also decorated with fresh {FL[6][n-1]}{FLC}.")
        add+=["SLEEVE LENGTH: the wide sleeves of the outer robe are very long and hang all the way down to her ANKLES, flowing softly, never stiff.",ONE,SZ[t]]
    else:
        add+=["HAIR UP: ALL of her hair is swept UP and gathered into the tall high chignon on top of her head under the crown, smooth at the nape; NO hair hanging loose down her back or over her shoulders.",
              "SLEEVES: very long, very wide, flowing sleeves, ONE single sleeve layer (no shorter outer sleeve on top); the brocade flows and drapes softly like heavy silk, never stiff.",
              "FABRIC: thick gold-embroidered brocade with a graceful, flowing drape.",
              "SLEEVE LENGTH: the very wide sleeves hang PAST her ankles all the way down until they TOUCH THE FLOOR.",
              "Even while her hands are raised to hold her item at chest height, each wide sleeve still hangs straight down from her forearm and its hem lies on the floor beside her feet; the sleeve hem is NEVER at knee or shin height.",   # SL1 (owner Lượt 773/778)
              "Every colour is rich and clear, never faded or silvery."]
    add.append(EYES)
    if t in (4,5): s=s.replace(" Hair: her own hairstyle decorated with fresh flowers and",f" Hair: her own hairstyle decorated with fresh {FL[t][n-1]}{FLC} and",1)
    anc=' No phoenix anywhere' if t<=6 else ' All flowers, birds and the phoenix'
    assert s.count(anc)==1,(c,t); i=s.index(anc)
    return s[:i]+' '+' '.join(add)+s[i:]
SPL=lambda s:[x.strip() for x in re.split(r'(?<=[.;:])\s+',s) if x.strip()]
JOBS=[('p01',t,False) for t in range(1,9)]+[('p01',8,True)]+[('p02',t,False) for t in (4,5,6,7,8)]+[('p02',8,True)]+[('p03',t,False) for t in (1,2,4,5,6)]
chk=[]
for c,t,o in JOBS:
    st=store(c,t,o); fin=laws(c,t,st)
    # flower slot words in t4/t5 change one store sentence's slot -> compare against the slot-filled store text
    st2=st.replace(" Hair: her own hairstyle decorated with fresh flowers and",f" Hair: her own hairstyle decorated with fresh {FL[t][int(c[1:])-1]}{FLC} and",1) if t in (4,5) else st
    miss=[x for x in SPL(st2) if x not in fin]
    nm=f"{P[c]['key']}-t{t}{'o' if o else ''}"
    open(OUT+nm+'.txt','w').write(fin); open(OUT+nm+'.store.txt','w').write(st)
    chk.append(f"{nm}: store sentences {len(SPL(st2))}, missing {len(miss)} {miss[:2]}; refs {'image identity + style M09' + (' + image swatch' if t==6 else '')}")
    assert not miss,(nm,miss)
open(OUT+'check.txt','w').write('\n'.join(chk)+'\n'); print('\n'.join(chk))
