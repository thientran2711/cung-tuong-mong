# Viết lại dữ liệu SCN_VAR trong dev/build/j94.js theo các tệp img/<cảnh>-<mùa>-<buổi>.webp có thật.
import os,re,json
R=os.path.dirname(os.path.abspath(__file__))+'/../../'
SC=['duong-tam-dien','khon-ninh-cung','kinh-su-phong','lanh-cung','ngu-hoa-vien','ngu-thu-phong','phi-tan-cung','tam-cung-dem','thai-y-vien','tu-ninh-cung']
d={}
for s in SC:
    v=[f'{e}-{b}' for e in ['xuan','ha','thu','dong'] for b in ['sang','trua','chieu','toi'] if os.path.exists(f'{R}img/{s}-{e}-{b}.webp')]
    if v: d[s]=' '.join(v)
p=R+'dev/build/j94.js';t=open(p,encoding='utf-8').read()
t=re.sub(r'const SCN_VAR=\{.*?\};/\*@SCN_VAR\*/','const SCN_VAR='+json.dumps(d,ensure_ascii=False,separators=(',',':')).replace('"," ','",\n "')+';/*@SCN_VAR*/',t,flags=re.S)
open(p,'w',encoding='utf-8').write(t);print(sum(len(x.split()) for x in d.values()),'bản')
