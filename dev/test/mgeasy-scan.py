#!/usr/bin/env python3
"""mg-easy scan (LUẬT SỬA CẢ NHÓM): every minigame engine that asks for knowledge/recall, and whether it carries the easy-aid set.
usage: python3 dev/test/mgeasy-scan.py [git-ref]   (default: working tree). Prints a table; with a ref reads dev/build/{j82,j91,jexam}.js from that ref (the BEFORE column)."""
import re,subprocess,sys
ref=sys.argv[1] if len(sys.argv)>1 else None
def rd(f):
    if ref: return subprocess.run(['git','show',f'{ref}:dev/build/{f}'],capture_output=True,text=True).stdout
    return open(f'dev/build/{f}',encoding='utf-8').read()
src={f:rd(f) for f in ['j82.js','j91.js','jexam.js']}
def fn(name):
    for f,t in src.items():
        m=re.search(r'function '+name+r'\(',t)
        if m:
            i=m.start();nxt=re.search(r'\n(?:function |/\* ===|const KG82_ENG|Object\.assign)',t[i+20:])
            return t[i:i+20+(nxt.start() if nxt else len(t))]
    return ''
# kind -> (engine function, what it asks, knowledge risk)
G=[('tho','k91Verse','old verse (lục bát rhyme)'),('doi','k91Pair','parallel word pairs'),('doden','k91Lantern','folk riddles'),
   ('co','kg82Go','go "khí" rule'),('le/tc/xa/thq (khảo hạch)','kg82Quiz','palace manners / duties'),
   ('banh','k91Cook','recipe order (recipe is shown)'),('huong','k91Blend','match a sample colour (shown)'),('hoa(cắm)','k91Arrange','Thiên/Nhân/Địa by stem length (shown)'),
   ('dan','kg82Rhythm','rhythm'),('hat','k91Hold','follow a ribbon'),('ban','kg82Aim','timing'),('dauho','k91Fling','physics'),('ve','k91Trace','trace a faint line'),
   ('theu','kg82Pattern','memory'),('mua','kg82Steps','memory'),('kim','k91Untangle','untangle')]
cols=[('tier','kg82Tier'),('Gợi ý','Gợi ý'),('idle-hint','IDLE'),('bounce/instant check','bounce|P.lock|t.locked|hinted|wrongs|P.dis'),('1-screen demo','k91DemoCard'),('shown rhyme/aid','k91End|vòng vàng|gợi ý:|Mẹo:')]
print('%-26s %-34s'%('kind','asks')+' '.join('%-12s'%c[0] for c in cols))
for k,f,a in G:
    t=fn(f);print('%-26s %-34s'%(k,a)+' '.join('%-12s'%('yes' if re.search(c[1],t) else '-') for c in cols))
