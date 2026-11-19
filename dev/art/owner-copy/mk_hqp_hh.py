# Owner Lượt 333: the HQP (t7) + HH (t8 yellow, t8o original colour) prompts for EVERY NEW character
# = the m19 V7 texts (live prompt copy + Lượt 331 hair-up / long one-layer sleeves), with ONLY these slots changed:
# {FACE} face sentence, {AGE}, {MAIN}/{HEX1} main colour, {SEC}/{HEX2} secondary colour, {ITEM} held item (own, never repeated), {TOUCH} optional national touch.
# NO hair flowers at t7/t8 (only gold, pearls, jewels). Templates: tpl_hqp.txt, tpl_hh.txt, tpl_hh_orig.txt.
B='/home/user/cung-tuong-mong/dev/art/owner-copy/'
M19=dict(MAIN='caramel apricot',HEX1='#DFBBA1',SEC='soft teal blue',HEX2='#6E9CA8',AGE='about 22')
ITEM19={7:'a closed parasol of gold silk inlaid with kingfisher feathers, handle of gold filigree set with gems, with gem tassels',
        8:'a closed parasol of imperial silk embroidered with phoenixes, handle of gold carved with phoenixes and set with pearls, with pearl phoenix tassels'}
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
    s=s.replace('COLOUR RULE',FL2+'COLOUR RULE',1)
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
