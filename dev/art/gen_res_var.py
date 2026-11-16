# Viết lại RES_VAR trong dev/build/jres.js theo các tệp img/<phòng>-<mùa>-<buổi>.webp có thật.
import os,re,json
R=os.path.dirname(os.path.abspath(__file__))+'/../../'
SL=['canh-phuc','khai-tuong','chung-tu','ham-an','thua-minh','dien-huy','vinh-hoa','truong-xuan']
RM=[f'{s}-cung{p}' for s in SL for p in ['','-dong-phoi','-tay-phoi']]+['cung-nhan']
d={}
for s in RM:
    v=[f'{e}-{b}' for e in ['xuan','ha','thu','dong'] for b in ['sang','trua','chieu','toi'] if os.path.exists(f'{R}img/{s}-{e}-{b}.webp')]
    if v:d[s]=' '.join(v)
p=R+'dev/build/jres.js';t=open(p,encoding='utf-8').read()
t=re.sub(r'const RES_VAR=\{.*?\};/\*@RES_VAR\*/','const RES_VAR='+json.dumps(d,ensure_ascii=False,separators=(',',':')).replace('","','",\n "')+';/*@RES_VAR*/',t,flags=re.S)
open(p,'w',encoding='utf-8').write(t);print(sum(len(x.split()) for x in d.values()),'bản')
