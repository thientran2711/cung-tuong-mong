#!/usr/bin/env python3
"""item-big-scan (review/kit-item-big, KIT_REQUEST IT01 / KIT §28.13b): every BIG item display (kitItem size lg / xl) of the game, classified by where its picture comes from, + the art gaps.
Static scan of dev/build/j*.js (not the generated all.js). Classes:
  auto512   the call passes the small img/item-X (kitItemSrc / itemArt .src / x.src): kitItem lg/xl maps it to img/item512/item-X (kitItemBigSrc), falls back to the small one if the 512 file is missing
  gave512   the call already passes src512 (x.src512 || x.src)
  pet512    pet pictures: petSrc(k,1) / petcStageSrc(P,1) = img/pet512/pet-… (the caller asks for the 512 twin itself)
  wd        wardrobe icon w.icon (img/wd-… has no 512 twin: img/wd512/ holds the garment paintings, a different set)
  veil      veil painting img/veil-<tier>.png (one size, no twin)
  ghost     empty slot ghost
  other     anything else (listed)
usage: python3 dev/test/item-big-scan.py [--index <img/_index.json from the CDN>]   → table + the items with no item512 (ART REQUEST list for Foreman C). exit 1 on 'other'."""
import re,sys,glob,os,json
D=os.path.join(os.path.dirname(__file__),'..','build');rows=[];other=0
for f in sorted(glob.glob(D+'/j*.js')):
    b=os.path.basename(f)
    if b in('jk2b.js','jkitpage.js'):continue
    for i,l in enumerate(open(f,encoding='utf-8'),1):
        for m in re.finditer(r'kitItem\((.{0,260}?size:"(?:lg|xl)")',l):
            a=m.group(1)
            if 'empty:true' in a or 'ghost' in a:c='ghost'
            elif 'src512' in a:c='gave512'
            elif 'petSrc' in a or 'petcStageSrc' in a or (b=='jpetcare.js' and 'a.src' in a):c='pet512'
            elif 'w.icon' in a:c='wd'
            elif b=='jshelf.js' and 'kitItemSrc' in a:c='auto512'
            elif 'vlSrc' in a or 'veilSrc' in a:c='veil'
            elif re.search(r'src:\s*(kitItemSrc|a\.src|src\b|x\.src|x\.item\.src|s\b|x\.src\|\|)',a) or 'kitItemSrc' in a or re.search(r'src[,:]',a):c='auto512'
            else:c='other'
            if c=='other':other+=1
            rows.append((b,i,c,a[:70].replace('\n',' ')))
# pets: petPicK / petTipShow call petSrc(...,1,..) in the kitItem args on the previous expression → counted by the 'petSrc' test above
print('file:line | class | src expression');[print(f'{b}:{i} | {c} | {a}') for b,i,c,a in rows]
import collections;print(dict(collections.Counter(c for _,_,c,_ in rows)))
if '--index' in sys.argv:
    d=json.load(open(sys.argv[sys.argv.index('--index')+1]));k={f[0] for f in d['files']}
    small={re.sub(r'^img/item-|\.webp$','',x) for x in k if re.match(r'img/item-[^/]+\.webp$',x)};big={re.sub(r'^img/item512/item-|\.webp$','',x) for x in k if x.startswith('img/item512/item-')}
    print('items with NO item512 (art request, Foreman C):',len(small-big),sorted(small-big))
sys.exit(1 if other else 0)
