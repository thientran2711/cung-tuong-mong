"""LUẬT SỬA CẢ NHÓM scan for jworld (research §5): every event DEFINITION whose text is a palace-wide world happening
(fire, flood, drought, plague, envoy, draft, mourning, eclipse/comet, amnesty, the Emperor away). Prints file:line, id, keyword.
usage: python3 dev/measure/world_scan.py"""
import re,glob,os
KW=r"hỏa hoạn|bốc cháy|lũ lụt|hạn hán|ôn dịch|dịch bệnh|sứ thần|sứ đoàn|tuyển tú|quốc tang|nhật thực|sao chổi|đại xá|ân xá|thân chinh|tuần du|thu săn|đi săn|tế trời|Nam Giao"
DEF=re.compile(r'(?:\bev\(|MF\(|EVI\.|PEND\.|ARC67|ev7\(|evDef\(|rdDef\(|\bdil\(|FESTEV)\s*\.?\s*["\']?([A-Za-z0-9_]+)')
d=os.path.dirname(os.path.abspath(__file__))+'/../build/'
rows=[]
for f in sorted(glob.glob(d+'j*.js')):
    b=os.path.basename(f)
    if b.startswith('all') or b=='jworld.js':continue
    cur=None;seen=set()
    for i,l in enumerate(open(f,encoding='utf-8'),1):
        m=DEF.search(l)
        if m:cur=(i,m.group(1))
        k=re.search(KW,l,re.I)
        if k and cur and i-cur[0]<=6 and (b,cur[1]) not in seen:seen.add((b,cur[1]));rows.append((b,cur[0],cur[1],k.group(0)))
for r in rows:print("%s:%d\t%s\t%s"%r)
print("TOTAL",len(rows))
