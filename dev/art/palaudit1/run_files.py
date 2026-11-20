import json,sys,re,glob,os,collections
sys.path.insert(0,'.'); import audit as A
ART=A.ART
SETS={
 "SAMPLE seasons4 (not yet duyệt)":glob.glob(ART+"/seasons4/*.txt"),
 "SAMPLE thu_comoi (not yet duyệt)":glob.glob(ART+"/thu_comoi/*.txt"),
 "SAMPLE b26 s62 (not yet duyệt)":glob.glob(ART+"/b26/s62_*.txt"),
 "APPROVED approved/proof":glob.glob(ART+"/approved/proof/*.txt"),
 "APPROVED owner-copy":glob.glob(ART+"/owner-copy/**/*.txt",recursive=True),
 "APPROVED KC face pictures (KC_REFS prompt_file)":sorted({ART+"/../../"+v["prompt_file"] for v in json.load(open(ART+"/KC_REFS.json"))["people"].values() if v.get("prompt_file") and v.get("m09_ok")=="yes"}),
}
SEAS={"xuan":"xuan","XUAN":"xuan","ha":"ha","HA":"ha","thu":"thu","THU":"thu","dong":"dong","DONG":"dong"}
def cells():
    for src,fs in SETS.items():
        for f in fs:
            if not os.path.exists(f): continue
            b=os.path.basename(f); m=re.match(r"(?:bw\d_\w+?_|bw5_elder_)?([cmsp]\d\d)",b) or re.search(r"([cms]\d\d)",b)
            pid=m.group(1) if m else ""
            se=None
            for tok in re.split(r"[_.\-]",b):
                if tok in SEAS: se=SEAS[tok]
            if "HAN" in b or "MINH" in b or "TONG" in b or "COMOI" in b or "covuong" in b.lower():
                pass
            rk=re.search(r"_t(\d)",b); rank=int(rk.group(1)) if rk else None
            ex=["royal","yellow"] if rank and rank>=6 else []
            yield {"src":src,"id":os.path.relpath(f,ART),"person":pid,"rank":rank,"season":se,"season_strict":se,"prompt":open(f,encoding="utf-8",errors="replace").read(),"extra_words":ex}
G,st=A.audit(cells())
print(st)
rows=sorted(G.items(),key=lambda kv:-len(kv[1]["cells"]))
json.dump([{"src":k[0],"term":k[1],"cls":k[2],"tmpl":k[3],"cells":len(v["cells"]),"people":len(v["people"]),"files":sorted(v["cells"])[:8],"ex":v["ex"]} for k,v in rows],open("g_files.json","w"),ensure_ascii=False,indent=0)
for s,fs in SETS.items(): print(s,len(fs))
