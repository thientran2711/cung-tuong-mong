# Owner Lượt 331: add ONLY the changed parts to the approved V6 / princess V4 prompts.
B='/home/user/cung-tuong-mong/dev/art/owner-copy/'
ONE="ONE SINGLE SLEEVE LAYER: each very long wide sleeve begins at the shoulder and falls in one piece to below her hands; NO shorter outer sleeve, NO half-sleeve or elbow-length layer, NO short jacket sleeve or cuff layer visible on top of it. "
UP="HAIR UP: ALL of her glossy pure BLACK hair (never brown) is swept UP and gathered into the tall high chignon on top of her head under the crown, smooth at the nape; NO hair hanging loose down her back or over her shoulders. "
LS="SLEEVES: very long, very wide, flowing sleeves that fall well past her hands down toward her knees, at least as long and wide as the sleeves of the lowest consort ranks, ONE single sleeve layer (no shorter outer sleeve on top); the brocade flows and drapes softly like heavy silk, never stiff. "
def ins(s,anchor,add):
    assert anchor in s,anchor[:40]; i=s.index(anchor); return s[:i]+add+s[i:]
out={}
for t in (1,2,3):
    s=open(B+f'm19_t{t}_V6.txt').read()
    s=ins(s,'TWO-COLOUR RULE',ONE) if 'TWO-COLOUR RULE' in s else ins(s,'Hair:',ONE)
    out[f'm19_t{t}_V7.txt']=s
for f in ('m19_t7_V6','m19_t8_V6','m19_t8o_V6','pr_bt_t7_V4','pr_cl_t7_V4','pr_pt_t7_V4'):
    s=open(B+f+'.txt').read()
    s=ins(s,'COLOUR RULE',UP+LS)
    nf=f.replace('_V6','_V7').replace('_V4','_V5')
    out[nf+'.txt']=s
for f,s in out.items(): open(B+f,'w').write(s)
print(sorted(out))
