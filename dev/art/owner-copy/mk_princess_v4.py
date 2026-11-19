# Owner Lượt 326 + 329: Ba Tư t1–t3 V4 (veil grows, clearly different outfits, one wide sleeve layer, head turns with body)
# and t7 HQP V4 for all 3 princesses = m19_t7_V6 (live HQP prompt copy) with only face/colour/national touch/own item swapped.
src=open('/home/user/cung-tuong-mong/dev/art/owner-copy/mk_ranks_v3.py').read()
exec(src[:src.index('out=[]')])   # functions + data only; writes nothing
P['bt']['nat']={
 1:"a simple flowing floor-length dress of soft indigo-blue silk with a high round neck and a narrow ivory silk sash at the waist, narrow gold-thread arabesque borders only at the neck and hem, ONE single layer of WIDE flowing sleeves (no over-sleeves, no second sleeve layer), small teardrop pearl earrings",
 2:"a long indigo-blue silk coat-gown CLOSED at the front and flaring into a flowing floor-length skirt over an ivory silk underskirt, gold-thread arabesque and small-bird embroidery along the front edge and the hem, a WIDE ivory silk sash tied at the waist with long hanging ends, the coat's own very wide flowing sleeves lined with ivory satin (ONE sleeve layer only, no narrow under-sleeve showing), teardrop pearl earrings",
 3:"a grand ceremonial Persian kaftan-robe of rich indigo-blue brocade densely embroidered with gold-thread arabesques, birds and pomegranate flowers, a high stand collar edged with pearls, a wide ivory satin front panel, the robe sweeping down to the FLOOR as long as the lower ranks with a full ivory satin skirt and a wide gold-embroidered hem band, the robe's own very wide trailing sleeves lined with ivory satin (ONE sleeve layer only), a jewelled gold belt with hanging pearl chains, layered gold-and-pearl necklaces"}
P['bt']['hair']={
 1:"her glossy pure BLACK hair (never brown), long and loose in soft waves down her back, a SHORT sheer ivory silk veil laid over the back of her head that reaches ONLY to her shoulders, held by a small pearl circlet, fresh {fl} tucked at her temple",
 2:"her glossy pure BLACK hair (never brown), long and loose in soft waves, two thin side braids joined at the back, a sheer ivory silk veil laid over the back of her head that falls LONGER, down to her WAIST, held by a small gold jewelled tiara, fresh {fl} tucked at her temple",
 3:"her glossy pure BLACK hair (never brown), long, in two long loose braids woven with small pearls falling over the front of her shoulders, a LONG sheer ivory silk veil falling from a tall jewelled gold tiara with a central ruby and short pearl strands all the way down her back to her KNEES, fresh {fl} tucked at her temple"}
HB="HEAD AND BODY: her head turns together with her shoulders and body in the same direction with natural anatomy, never a frontal head on a turned body; the pose is relaxed, lively and graceful, never stiff. "
REF={'bt':'6Abnqu9iJO','cl':'p8ymOwOehw','pt':'ov6CN4g829'}
out=[]
for t in (1,2,3):
    s=build('bt',t); s=rep(s,'Her LEGS and FEET',HB+'Her LEGS and FEET'); out.append((f'pr_bt_t{t}_V4.txt',s))
FACE=s0=None
base=open(B+'m19_t7_V6.txt').read()
fa=base.index('Her face: '); fe=base.index('From the identity reference',fa)
for k in ('bt','cl','pt'):
    d=P[k]; s=base
    s=rep(s,'An imperial consort.',f'An imperial consort, a foreign princess from {d["country"]} who has entered the imperial palace.')
    s=s[:s.index('Her face: ')]+'Her face exactly as in image 1, the same person. '+s[s.index('From the identity reference'):]
    s=rep(s,'about 22, youthful adult.','about 20, youthful adult.')
    s=rep(s,'a closed parasol of gold silk inlaid with kingfisher feathers, handle of gold filigree set with gems, with gem tassels',d['item'][7].split(' held')[0])
    s=rep(s,'Eyes soft, warm and round-almond, never slanted or upturned, never teary.','Her eyes exactly as in image 1, open and bright, both eyes symmetrical, both irises looking straight at the viewer, never cross-eyed, never wall-eyed, never teary.')
    s=rep(s,'All flowers, birds and the phoenix',d['touch']+' All flowers, birds and the phoenix')
    s=s.replace('#DFBBA1',d['hex1']).replace('caramel apricot',d['main']).replace('#6E9CA8',d['hex2']).replace('soft teal blue',d['sec'])
    assert 'caramel' not in s and 'parasol' not in s,(k)
    out.append((f'pr_{k}_t7_V4.txt',s))
for f,s in out: open(B+f,'w').write(s)
print(len(out),'files', REF)
