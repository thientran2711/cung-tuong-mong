# Owner Lượt 333: the HQP (t7) + HH (t8 yellow, t8o original colour) prompts for EVERY NEW character
# = the m19 V7 texts (live prompt copy + Lượt 331 hair-up / long one-layer sleeves), with ONLY these slots changed:
# {FACE} face sentence, {AGE}, {MAIN}/{HEX1} main colour, {SEC}/{HEX2} secondary colour, {ITEM} held item (own, never repeated), {TOUCH} optional national touch.
# NO hair flowers at t7/t8 (only gold, pearls, jewels). Templates: tpl_hqp.txt, tpl_hh.txt, tpl_hh_orig.txt.
B='/home/user/cung-tuong-mong/dev/art/owner-copy/'
M19=dict(MAIN='caramel apricot',HEX1='#DFBBA1',SEC='soft teal blue',HEX2='#6E9CA8',AGE='about 22')
ITEM19={7:'a closed parasol of gold silk inlaid with kingfisher feathers, handle of gold filigree set with gems',
        8:'a closed parasol of imperial silk embroidered with phoenixes, handle of gold carved with phoenixes and set with pearls'}
LOW_TONE="all colours clear, soft and gentle at a medium-light tone, like fine silk in soft daylight: medium-soft saturation, pretty and clean, the secondary colour a real pretty colour (it may be a little deeper or a soft ivory, never heavy, never black, never grey), never rực, never glaring, never neon, never pastel-washed or faded, never dusty, grey, muddy or black; "   # = t8-prompt-B/build.py LOW_TONE (B18)
FL2='FABRIC: thick gold-embroidered brocade with a graceful, flowing drape. '  # owner Lượt 364: prompt B
def templ(t,src):
    s=open(B+src).read()
    fa=s.index('Her face: '); fe=s.index('From the identity reference')
    s=s[:fa]+'{FACE} '+s[fe:]
    s=s.replace(ITEM19[7 if t==7 else 8],'{ITEM}')
    s=s.replace('All flowers, birds and the phoenix','{TOUCH}All flowers, birds and the phoenix',1)
    s=s.replace('Eyes soft, warm and round-almond, never slanted or upturned, never teary.','Eyes: both eyes symmetrical, both irises looking straight at the viewer, never cross-eyed, never wall-eyed, never teary, eyelids fully open.')
    s=s.replace('HAIR UP: ALL of her hair is swept UP','HAIR UP: ALL of her glossy pure BLACK hair (never brown) is swept UP')
    s=s.replace('very long, very wide, flowing sleeves that fall well past her hands down toward her knees, at least as long and wide as the sleeves of the lowest consort ranks','very long, very wide, flowing sleeves that fall well past her hands and hang PAST her ankles all the way down until they TOUCH THE FLOOR')
    if 'until they TOUCH THE FLOOR' in s and 'Even while her hands are raised' not in s: _i=s.index('until they TOUCH THE FLOOR'); _e=s.index('.',_i)+1; s=s[:_e]+' Even while her hands are raised to hold her item at chest height, each wide sleeve still hangs straight down from her forearm and its hem lies on the floor beside her feet; the sleeve hem is NEVER at knee or shin height.'+s[_e:]   # SL1 (owner Lượt 773/778): sleeve-hold sentence right after the floor sleeve sentence
    s=s.replace('COLOUR RULE',FL2+'COLOUR RULE',1)
    # BW4 (owner B8 Lượt 543/551 + K18 Lượt 591): ONE reference = her KC_REFS set-B cut; the retired style image sentence is dropped (refs only from our store, never a live img/ file)
    _st=' The style reference image is only for skin, drawing style, fabric and embroidery: never copy its face, body or pose.'; assert s.count(_st)==1,'style sentence'; s=s.replace(_st,'',1)
    # BW4 (owner B18 Lượt 586/590/592): the same tone sentence as t8-prompt-B/build.py LOW_TONE (copied verbatim)
    _fr='all colours fresh, clear and luminous, never dusty or greyed; '; assert s.count(_fr)==1,'tone clause'; s=s.replace(_fr,LOW_TONE,1)
    for k,v in M19.items(): s=s.replace(v,'{'+k+'}')
    assert 'caramel' not in s and 'parasol' not in s and '{ITEM}' in s
    return s
T={'hqp':templ(7,'m19_t7_V7.txt'),'hh':templ(8,'m19_t8_V7.txt'),'hh_orig':templ(8,'m19_t8o_V7.txt')}
def build(kind,FACE,MAIN,HEX1,SEC,HEX2,ITEM,AGE='about 22',TOUCH='',PRINCESS=None):
    s=T[kind]
    if PRINCESS: s=s.replace('An imperial consort',f'An imperial consort, a foreign princess from {PRINCESS} who has entered the imperial palace',1)
    for k,v in dict(FACE=FACE,MAIN=MAIN,HEX1=HEX1,SEC=SEC,HEX2=HEX2,ITEM=ITEM,AGE=AGE,TOUCH=(TOUCH+' ' if TOUCH else '')).items(): s=s.replace('{'+k+'}',v)
    assert '{' not in s; return s
if __name__=='__main__':
    for k,s in T.items(): open(B+f'tpl_{k}.txt','w').write(s)
    print('templates written', list(T))
