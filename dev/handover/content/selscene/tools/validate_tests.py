#!/usr/bin/env python3
"""Validate doidap.md / hanhxu.md (provisional format). usage: validate_tests.py file.md [...]"""
import re,sys
FX={"danh","duc","bac","tamco","sung","quen","oan","mama","tin","phuc"}
EMP={"danghi","mesac","trongtai","hieuthao","nongnay","nhantu","chamchinh","datinh","lanhlung"}
TH={"tuai","nghiem","danghi","quyen","phat"}
F={"Ân cần","Lạnh lùng","Nóng nảy","Điềm tĩnh","Nhiều chuyện","Kín đáo","Kiêu ngạo","Khiêm nhường","Thật thà","Xảo quyệt","Thanh liêm","Ham lợi","Rộng lượng","Thù dai","Trọng nghĩa","Thực dụng","Tham vọng","An phận","Ham học","Ham vui","Mê tín","Thực tế","Vì gia tộc","Vì mình"}
POOL={"hoangthuong":EMP,"thaihau":TH,"hoanghau":F,"noivu":F}
bad=0
def err(m):
    global bad;bad+=1;print("ERR",m)
for fn in sys.argv[1:]:
    txt=open(fn,encoding="utf8").read()
    txt=re.sub(r"```.*?```","",txt,flags=re.S)
    blocks=re.split(r"^### ",txt,flags=re.M)[1:]
    n=0
    for b in blocks:
        h=b.split("\n")[0]
        m=re.match(r"(\w+-\d+) \[(K|D)\] (?:royal=(\w+) )?V=([123]) rank=([0-3])",h)
        if not m: err(f"{fn}: bad header {h}");continue
        n+=1;id_,tag,royal,V,rank=m.groups()
        if "ask:" not in b and "scene:" not in b: err(id_+" no ask/scene")
        if "rise:" not in b: err(id_+" no rise")
        opts=[l for l in b.split("\n") if l.startswith("- ")]
        if not 3<=len(opts)<=4: err(f"{id_} {len(opts)} options")
        for o in opts:
            p=[x.strip() for x in o[2:].split(" | ")]
            if len(p)<6: err(f"{id_} option fields {len(p)}: {o[:50]}");continue
            gl=dict(re.findall(r"([GL])=(\w+)",p[3]))
            if set(gl)!={"G","L"} or gl["G"]==gl["L"] or gl["G"] not in FX or gl["L"] not in FX: err(f"{id_} G/L {p[3]}")
            for k,pref in (("like=",p[4]),("dislike=",p[5])):
                if not pref.startswith(k): err(f"{id_} {k} missing");continue
                for t in filter(None,pref[len(k):].split(",")):
                    if royal and t not in POOL.get(royal,set()): err(f"{id_} nết {t} not in {royal}")
            if "%" in o: err(id_+" has %")
    print(fn,n,"entries")
sys.exit(1 if bad else 0)
