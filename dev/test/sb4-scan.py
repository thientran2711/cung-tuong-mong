#!/usr/bin/env python3
"""review/small-bugs-4 static scan (LUẬT SỬA CẢ NHÓM). usage: python3 dev/test/sb4-scan.py   (exit 1 when any class has a hit)
 wear    worn-item label/sentence variants: one word "Đang mặc" (OD 08:00Z 16/11; VANPHONG). Flags "Đang cài/Đang đeo/Đang dùng",
         "Ngươi đang cài|đeo|dùng" (an item sentence), "· đang đeo" labels. The j84 FULL translator row that rewrites old saves is allowed.
 lonng   "theo lòng nàng|ngươi|người|chủ" (ambiguous who; "thiện cảm của <tên> với ngươi" instead)
 whyloss a hard-coded "mất Danh/Đức" inside a thiếu lễ 'Vì sao' line (must be read from leAttire's delta: jaudit aaThieuLeWhy)
 kitpage exactly one kit sample page: one KIT_SAMPLES registry, one kitSamplePage, no kitSample()/?kit entry
 srvwarn the Đức '!' (kstw) is only set through kitStatSet in jk3 and is guarded by kitRoad()"""
import re,glob,sys,os
R=os.path.join(os.path.dirname(__file__),'..','build')
F=[f for f in sorted(glob.glob(R+'/j*.js')) if not os.path.basename(f).startswith('all')]
rules={
 'wear':re.compile(r'Đang cài|Đang đeo|Đang dùng|[Nn]gươi đang (?:cài|đeo|dùng)\b|[·(] đang đeo|\(ngươi đang đeo\)'),
 'lonng':re.compile(r'theo lòng (?:nàng|ngươi|người|chủ)'),
 'whyloss':re.compile(r'thiếu lễ[^"`]{0,60}mất Danh/Đức'),
}
allow={'wear':[re.compile(r'const FULL=\{'),re.compile(r'Dấu ấn|dấu này|tip:`Dấu')]}  # emblem sentences/tooltip keep 'đang dùng' (natural Vietnamese); its bag label is Đang mặc
tot={}
for k,rx in rules.items():
    hits=[]
    for f in F:
        for n,l in enumerate(open(f,encoding='utf-8'),1):
            if rx.search(l) and not any(a.search(l) for a in allow.get(k,[])):hits.append(f'{os.path.basename(f)}:{n}')
    tot[k]=hits
S=''.join(open(f,encoding='utf-8').read() for f in F)
tot['kitpage']=[] if (len(re.findall(r'const KIT_SAMPLES=\[\]',S))==1 and len(re.findall(r'function kitSamplePage\b',S))==1 and not re.search(r'function kitSample\(',S)) else ['more than one sample page / ?kit']
jk3=open(R+'/jk3.js',encoding='utf-8').read();jk4=open(R+'/jk4.js',encoding='utf-8').read()
callers=[os.path.basename(f) for f in F if re.search(r'warn:',open(f,encoding='utf-8').read()) and 'kitStatSet' in open(f,encoding='utf-8').read() and os.path.basename(f) not in('jk4.js',)]
tot['srvwarn']=[] if ('kitRoad' in jk3 and 'hq=S.rank<7&&S.duc<nd&&!(window.kitRoad&&kitRoad())' in jk3 and callers==['jk3.js']) else ['Đức warn not road-guarded or set elsewhere: '+','.join(callers)]
bad=0
for k,v in tot.items():
    print(f'{k:8} {len(v)} hit(s)',*v[:20]);bad+=len(v)
sys.exit(1 if bad else 0)
