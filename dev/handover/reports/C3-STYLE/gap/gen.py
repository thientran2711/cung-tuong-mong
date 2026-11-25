import json,subprocess,re
j=json.loads(subprocess.check_output(['git','show','FETCH_HEAD:dev/art/place-rank/roomnc/prompts_roomnc.json']))
j['canh-phuc-cung-dong-phoi']  # exists
P={
'khai-tuong-cung':dict(n='Khải Tường',fl='lotus',flp='lotus flowers',an='cranes',wood='nanmu',door='vase-shaped doorway in a hexagonal lattice partition',garden='lotus'),
'chung-tu-cung':dict(n='Chung Tú',fl='plum blossom',flp='plum blossoms',an='magpies',wood='dark red sandalwood',door='rectangular doorway with rounded corners in a cracked-ice lattice partition',garden='plum-blossom'),
'dien-huy-cung':dict(n='Diên Huy',fl='chrysanthemum',flp='chrysanthemums',an='swallows',wood='chestnut-brown huanghuali',door='octagonal doorway in a lattice partition of interlocking coin circles',garden='chrysanthemum'),
'ham-an-cung':dict(n='Hàm An',fl='orchid',flp='orchids',an='butterflies',wood='light walnut-brown elm',door='four-lobed begonia-shaped doorway in a key-fret lattice partition',garden='orchid'),
'thua-minh-cung':dict(n='Thừa Minh',fl='osmanthus',flp='osmanthus blossoms',an='mandarin ducks',wood='amber-brown camphor',door='fan-shaped doorway in a lattice partition of step-patterned frets',garden='osmanthus'),
'vinh-hoa-cung':dict(n='Vĩnh Hòa',fl='camellia',flp='camellias',an='orioles',wood='reddish-brown jichimu',door='gourd-shaped doorway in a lattice partition of overlapping lozenges',garden='bamboo'),
'canh-phuc-cung':dict(n='Cảnh Phúc',fl='crabapple blossom',flp='crabapple blossoms',an='bats',wood='dark rosewood',door='round moon-gate opening in a carved partition',garden='crabapple'),
}
SIG={'canh-phuc-cung':"Cảnh Phúc cung signature style, the same in every room of this palace: crabapple blossoms (hải đường) are its flower, painted on the screens, embroidered on the silks and in the vases; motifs of bats among auspicious clouds carved in the beams and furniture; dark rosewood with jade-green inlay and jade ornaments; round-backed rosewood furniture; a round moon-gate opening in a carved partition."}
for k,v in j.items():
    m=re.search(r'([^.]*?) cung signature style, the same in every room of this palace:.*?\.(?=  | [A-Z])',v['prompt'])
    if k=='nvp': continue
    pal=re.match(r'(.*?-cung)',k).group(1)
    if m and pal not in SIG and pal!='truong-xuan-cung': SIG[pal]=m.group(0).strip()
FLOORNEW="FLOOR: warm honey-coloured wooden floorboards, matte and soft, lit by soft light shapes cast through the lattice windows; no large rug or carpet; at most a narrow embroidered rug edge at the very bottom corner. LOOK (like image 1): airy, light and warm, cream and peach walls with gilt-lacquer lattice, three-quarter depth, never a dark brown-grey room, never heavy dark walls."
def build(tp,tk,don):
    t=j[don]['prompt'];dp=re.match(r'(.*?-cung)',don).group(1);D=P[dp];T=P[tp]
    ds=re.search(r'[^.]*? cung signature style, the same in every room of this palace:.*?\.(?=  | [A-Z])',t).group(0).strip()
    t=t.replace(ds,SIG[tp])
    t=t.replace(D['n'],T['n'])
    t=t.replace(D['door'],T['door']).replace(D['flp'],T['flp'])
    t=re.sub(r'sunny \w[\w -]* garden','sunny %s garden'%T['garden'],t)
    t=t.replace(D['wood'],T['wood'])
    t=re.sub(r'\b'+re.escape(D['fl'])+r's?\b',lambda m:T['fl']+('s' if m.group(0).endswith('s') else ''),t)
    t=t.replace(D['an'],T['an'])
    t=t.replace("(the bedroom)","(a palace room)")
    t=re.sub(r'FLOOR: [^.]*\.',FLOORNEW,t,1)
    return t
JOBS={ # target key: donor
'canh-phuc-cung-tan':'khai-tuong-cung-tan','canh-phuc-cung-tan-ngu':'thua-minh-cung-tan-ngu',
'canh-phuc-cung-phi':'thua-minh-cung-phi','canh-phuc-cung-phi-ngu':'khai-tuong-cung-phi-ngu',
'canh-phuc-cung-quyphi':'khai-tuong-cung-quyphi','canh-phuc-cung-quyphi-ngu':'thua-minh-cung-quyphi-ngu',
'chung-tu-cung-tan':'khai-tuong-cung-tan','chung-tu-cung-tan-ngu':'thua-minh-cung-tan-ngu',
'dien-huy-cung-tan':'khai-tuong-cung-tan','dien-huy-cung-tan-ngu':'thua-minh-cung-tan-ngu',
'ham-an-cung-tan':'khai-tuong-cung-tan','vinh-hoa-cung-tan-ngu':'thua-minh-cung-tan-ngu',
'thua-minh-cung-dong-phoi':'ham-an-cung-dong-phoi','thua-minh-cung-dong-phoi-ngu':'ham-an-cung-dong-phoi-ngu'}
if __name__=='__main__':
    out={}
    for k,d in JOBS.items():
        tp=re.match(r'(.*?-cung)',k).group(1)
        t=build(tp,k,d);open(f'/tmp/claude-0/s/gap/{k}.txt','w').write(t)
        refs=['SyaeCuVUb8']+j[d]['refs'][1:]
        out[k]={'refs':refs,'donor':d,'len':len(t)}
        left=[w for w in ['lotus','Khải','nanmu'] if w in t and tp!='khai-tuong-cung'] if not d.startswith('khai') else []
        print(k,d,len(t),'LEFTOVER' if any(x in t for x in [P[re.match(r'(.*?-cung)',d).group(1)]['fl'],P[re.match(r'(.*?-cung)',d).group(1)]['an']]) else 'ok')
    json.dump(out,open('/tmp/claude-0/s/gap/jobs.json','w'),indent=1)
