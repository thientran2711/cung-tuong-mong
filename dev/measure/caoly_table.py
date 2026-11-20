#!/usr/bin/env python3
# E20 caoly-road: before/after table of every Nam Chieu / Yunnan-image hit (law 11). usage: caoly_table.py <before-ref> -> markdown on stdout
import re,subprocess,sys,glob,os
ref=sys.argv[1] if len(sys.argv)>1 else 'origin/main'
P=re.compile(r'Nam Chi[ếê]u|chim công|múa công|lông công|voi trắng|hoa trà|sơn trà|Nhĩ Hải|Sùng Thánh|Quân Ân|man nữ|man di|lá rừng|té nước|Tết đuốc|vòng đuốc|Lan Thương|nhà sàn|lão Kha|Lão Kha|[Hh]oàng huynh|[Hh]oàng thúc|ba châu|cá nướng|lá chuối|ngọc bích|canh chua|múa voi|chữ Hán|phương nam')
KEEP={'j54.js','j55.js','jht.js','jct2.js','jk2b.js','jroad.js','jrdhp.js','j71.js'}
def lines(src): return src.split('\n')
files=sorted(os.path.basename(f) for f in glob.glob('dev/build/j*.js'))
rows=[];kept=[]
for f in files:
    old=subprocess.run(['git','show',f'{ref}:dev/build/{f}'],capture_output=True,text=True).stdout
    new=open('dev/build/'+f,encoding='utf8').read()
    ol,nl=lines(old),lines(new)
    if len(ol)!=len(nl) and old!=new: nl=nl
    for i,l in enumerate(ol):
        m=P.search(l)
        if not m: continue
        a=max(0,m.start()-30); o=l[a:m.end()+40].strip()
        n=nl[i] if i<len(nl) else ''
        if n==l:
            kept.append((f,i+1,o))
        else:
            mm=P.search(n); 
            na=n[a:a+len(o)+10].strip() if n else ''
            rows.append((f,i+1,o,na))
print('| file:line | before | after |\n|---|---|---|')
for f,i,o,n in rows: print(f"| {f}:{i} | {o.replace('|','/')} | {n.replace('|','/')} |")
print('\n## kept (unchanged)\n| file:line | text | reason |\n|---|---|---|')
for f,i,o in kept:
    r='court event / random event (Nam Chiếu stays, owner 19/11 ~06:50Z)' if f in KEEP or 'Nam Chi' in o and f in ('j71.js','j72.js','j55.js') else 'generic Đại Hy goods / comment / not tied to the princess road'
    print(f"| {f}:{i} | {o.replace('|','/')} | {r} |")
