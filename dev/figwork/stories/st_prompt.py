# Story (mệnh truyện) art: 2x2 grids, 4 panels per generation, split locally into img/st-<arc>-<key>.webp
# python3 st_prompt.py --grids        -> list grid ids  (arc:g1|g2|g3)
# python3 st_prompt.py ARC:g1 ...     -> prompt per grid
import json,os,sys,re
H=os.path.dirname(os.path.abspath(__file__)); D=json.load(open(os.path.join(H,'stories.json')))
MOT={'tt':"the chancellor's daughter: scholar-official household, letters in indigo covers, official gauze hats, ink and seals-free documents, indigo and gold",
 'dtq':"the grand general's daughter: military family, armour, war banners, swords, bronze tiger tally, frontier passes",
 'muoi':"the salt merchant's daughter: rich merchant family, salt sacks, cargo boats on canals, silver ingots, abacus, ledgers",
 'cn':"a consort who rose from palace maid: tea trays, servants' corridors, plain past turned to silk",
 'nc':"a foreign princess from the southwest kingdom of Nam Chieu: silver filigree headdresses, peacock feathers, misty tropical mountains, indigo batik",
 'td':"the daughter of a disgraced family seeking justice: old case files, iron chains, white mourning ribbons, autumn",
 'ch':"the Empress Dowager's grand-niece: the Empress Dowager's palace, longevity and phoenix motifs, buddhist prayer beads, incense",
 'thd':"a poor scholar's daughter: books, scrolls, poems, plum blossom, inkstone, examination halls",
 'cnv':"a palace maid serving a mistress: trays, lanterns in servants' corridors, laundry courts, a mistress's grand chambers",
 '*':"palace intrigue in the inner court",
 'st':"a consort in mid-life building power: allies, her children, the crown prince's seat"}
TOK={'v':'một phi tần','v2':'một phi tần khác','hh':'Hoàng hậu','me':'nàng','maid':'cung nữ thân tín','dad':'người cha','dadr':'người cha','man':'một người đàn ông','manr':'người lạ',
 'eun':'lão thái giám','k':'hoàng tử','d':'công chúa','foe':'con gái kẻ thù','foed':'kẻ thù của nhà','mis':'chủ nhân'}
def clean(s,n=95):
    s=re.sub(r'\{(\w+)\}',lambda m:TOK.get(m.group(1),''),s or '');s=re.sub(r'<[^>]+>','',s).replace('“','"').replace('”','"')
    return s if len(s)<=n else s[:n].rsplit(' ',1)[0]+'…'
def panels(aid):
    a=D['arcs'][aid];P=[]
    for k,b in a['B'].items(): P.append((k,f"{clean(b['h'],60)}: {clean(b['t'])}"))
    P.append(('bia',f"bìa tuyến truyện '{a['t']}': {clean(a['g'])}"))
    for k,e in a['E'].items(): P.append(('ket-'+k,f"kết cục {'tốt đẹp' if e['k']>0 else 'cay đắng' if e['k']<0 else 'nửa được nửa mất'} '{e['tag']}': {clean(e['t'])}"))
    if len(P)%4: P.append(('ket',f"khép lại tuyến truyện '{a['t']}', một vật kỷ niệm của câu chuyện đặt trên án thư"))
    return P
def grids():
    out=[]
    for aid in D['arcs']:
        P=panels(aid)
        for i in range(0,len(P),4): out.append((f'{aid}:g{i//4+1}',P[i:i+4]))
    return out
POS=['top-left','top-right','bottom-left','bottom-right']
def prompt(gid):
    aid=gid.split(':')[0];a=D['arcs'][aid];G=dict(grids())[gid]
    s=(f"2x2 grid of four separate portrait card illustrations, thin cream gutters, no text. Chinese palace drama '{a['t']}'; heroine: {MOT[a['o']]}. Scenes (Vietnamese): ")
    for i,(k,t) in enumerate(G): s+=f"{i+1}) {t} "
    s+=("Each panel one clear focal subject; objects and places, people only tiny, silhouetted or from behind, no faces, no close-up hands. "
        "Calm or happy = warm bright day; schemes, danger, grief = night, deep indigo shadow, one candle. "
        "Gufeng watercolour like the reference, soft ink lines, vermilion, gold, jade, soft pink, rich detail. No blood, no text, no seals.")
    return s
if __name__=='__main__' and sys.argv[1:2]!=['--next']:
    if sys.argv[1:]==['--grids']:
        g=grids();print(len(g),'grids',sum(len(p) for _,p in g),'panels');print(' '.join(x for x,_ in g))
    else:
        for gid in sys.argv[1:]: print(gid,'\n'+prompt(gid)+'\n')
def todo():
    done={l.split()[0] for l in open(os.path.join(H,'gens.txt')) if l.strip() and not l.startswith('#')}
    den=set(open(os.path.join(H,'denied.txt')).read().split()) if os.path.exists(os.path.join(H,'denied.txt')) and not os.environ.get('RETRY') else set()
    return [g for g,_ in grids() if g not in done and g not in den]
if __name__=='__main__' and sys.argv[1:2]==['--next']:
    for g in todo()[:int(sys.argv[2])]: print('##',g); print(prompt(g))
