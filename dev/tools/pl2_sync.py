"""Palace detail maps (kitPalaceMap, KIT §33).
python3 dev/tools/pl2_sync.py [rawdir]
 - rawdir (optional): Phượng Lệnh L2 files named <grade>-<form>-<state>.webp (from places/palace/<grade>/x/L2/<form>/<state>.webp,
   '_' -> '-'); each is resized to 1792 px wide, webp q80, into img/pl2/.
 - rebuilds the 'have' (states per dir) lists in img/pl2/hotspots.json
   and inlines the JSON into dev/build/jpm.js between /*@pl2*/ and /*@*/."""
import sys,os,glob,json,re
R=os.path.dirname(os.path.abspath(__file__))+'/../../'
if len(sys.argv)>1:
  from PIL import Image
  for f in sorted(glob.glob(sys.argv[1]+'/*.webp')):
    o=R+'img/pl2/'+os.path.basename(f)
    if os.path.exists(o):continue
    im=Image.open(f).convert('RGB');im=im.resize((1792,round(1792*im.height/im.width)),Image.LANCZOS);im.save(o,quality=80,method=6)
J=R+'img/pl2/hotspots.json';D=json.load(open(J,encoding='utf-8'))
have={}
for f in sorted(glob.glob(R+'img/pl2/*.webp')):
  n=os.path.basename(f)[:-5]
  m=re.match(r'^((?:nhat|nhi|tam)-.+?)-((?:xuan|ha|thu|dong|newyear|giaothua|nguyentieu|thanhminh|doanngo|thattich|trungthu|trungcuu|dongchi|phoenix)-(?:sang|trua|chieu|toi))$',n)
  if m:have.setdefault(m.group(1),[]).append(m.group(2))
D['have']=have
D.pop('rooms',None)  # room pictures: jres.js residenceArt (one source)
json.dump(D,open(J,'w',encoding='utf-8'),ensure_ascii=False,indent=1)
P=R+'dev/build/jpm.js';s=open(P,encoding='utf-8').read()
s=re.sub(r'/\*@pl2\*/.*?/\*@\*/',lambda m:'/*@pl2*/'+json.dumps(D,ensure_ascii=False,separators=(',',':'))+'/*@*/',s,flags=re.S)
open(P,'w',encoding='utf-8').write(s);print('dirs',{k:len(v) for k,v in have.items()})
