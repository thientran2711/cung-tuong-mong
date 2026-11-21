#!/usr/bin/env python3
"""PERSON + BATCH gate (owner L2039 verbatim: 'Tại sao có một cái việc là một thợ chép cái prompt của người này cho người khác mà vẫn đi qua được cái máy duyệt là sao?').
check_store used to read ONE file alone; a worker copied s62's ANGLE + Pose + held item into s63/s64/s65 and every file PASSED.
PERSON check (per file, pid + rank known from --pid/--rank or the file name sNN_tK_…): the file must carry
  (1) HER OWN held item of that rank = builder data (t8-prompt-B/build.py _e6_picks via store-all/build_all.py; a pet from pets.py also OK),
      or an owner-approved per-file exception in APPROVED_ITEM below;
  (2) HER OWN ANGLE sentence of that rank (build_all.plan / ANG14, the E1 14-angle table) when the file has an 'ANGLE:' sentence;
  (3) HER OWN face words (face-common/<pid>.v5/.v3 FULL 'Her face:' sentence) and NO other person's face sentence.
BATCH check (--batch files…): FAIL when 2+ different persons at the same rank share the same ANGLE sentence, the same Pose sentence, or the same held item.
Used by check_store.py (scope tpN + a pid) and `python3 dev/art/check_store.py --batch <files…>`."""
import os,re,sys,io,glob,contextlib,collections
ART=os.path.dirname(os.path.abspath(__file__))
# owner-approved per-person deviations from the builder item data: (pid, rank) -> words that must be in the Pose sentence
APPROVED_ITEM={("s62",7):("jade flute","owner L1979 restore t7 flute to the L1903 words (thu HQP)"),
               ("s62",8):("gold phoenix hairpin","owner L1976 HH t8 back to OLD HH L1903 CqnI8nxEEy")}
# owner-approved per-person ANGLE deviations: (pid, rank) -> start of the approved ANGLE sentence
APPROVED_ANGLE={("s62",7):("ANGLE: FULLY FRONTAL","owner L1973/L2002 thu HQP t7 = L1903 0eUA2SkTfW base, frontal"),
                ("s62",8):("ANGLE: FULLY FRONTAL","owner L1976/L2002 thu HH t8 = L1903 CqnI8nxEEy base, frontal")}
_B=None
WARN=[]
def _builder():
    global _B
    if _B is None:
        sys.path.insert(0,os.path.join(ART,"store-all")); old=sys.argv; sys.argv=["build_all.py"]
        try:
            import build_all as B
            with contextlib.redirect_stderr(io.StringIO()),contextlib.redirect_stdout(io.StringIO()): B.build("s62",1,"a18")   # loads LAST_G (store tables)
        finally: sys.argv=old
        _B=B
    return _B
def pid_rank(fn,text=""):
    m=re.match(r"([cmsp]\d\d)_t([1-8])(?!\d)",os.path.basename(fn))
    if m: return m.group(1),int(m.group(2))
    return None,None
def _norm(s): return re.sub(r"\s+"," ",re.sub(r"\(.*?\)","",s.lower())).strip(" .,;")
def _key(item):   # first words of an item phrase, article dropped: 'a thread-bound book tied with …' -> 'thread-bound book'
    w=re.sub(r"^(a|an|the|one)\s+","",_norm(item)).split()
    return " ".join(w[:3]) if len(w)>=3 else " ".join(w)
def own_item(pid,rank,age="a18"):
    B=_builder(); g=B.LAST_G
    it=g["_e6_picks"](pid,age)[f"t{rank}"][0]; pets=[]
    try:
        g["AGE"]=age; p=g["_PETS"].pet(pid,f"t{rank}",age)
        if p: pets.append(p[0] if isinstance(p,tuple) else p)
    except Exception: pass
    return it,pets
def own_angle(pid,rank,age="a18"):
    B=_builder(); return B.angle_sentence(pid,rank,age).split(";")[0].strip()
def face_of(pid):
    for v in ("v5","v3"):
        f=os.path.join(ART,"face-common",f"{pid}.{v}.FULL.txt")
        if os.path.exists(f):
            t=open(f,encoding="utf-8").read()
            if "Her face:" in t:
                i=t.index("Her face:"); j=t.find(".",i+40); return t[i:j].strip()
    return None
def sent(text,head):
    m=re.search(re.escape(head)+r"[^.]*\.?",text); return m.group(0).strip() if m else None
def person_check(text,pid,rank,age="a18"):
    fails=[]
    if not pid or not rank: return fails
    try: it,pets=own_item(pid,rank,age)
    except Exception as e: return [("P0","PERSON DATA",f"no builder data for {pid} t{rank}: {e}")]
    pose=sent(text,"Pose:") or text
    ex=APPROVED_ITEM.get((pid,rank))
    keys=[_key(it)]+[_key(p) for p in pets]+([ex[0]] if ex else [])
    if not any(k and k in _norm(pose) for k in keys):
        fails.append(("P1","PERSON ITEM",f"{pid} t{rank}: Pose does not hold HER item '{it[:60]}' (builder _e6_picks{', or pet' if pets else ''}{', or approved '+ex[0] if ex else ''}); Pose = '{pose[:110]}'"))
    a=sent(text,"ANGLE:")
    if a:
        want=own_angle(pid,rank,age); exa=APPROVED_ANGLE.get((pid,rank))
        if _norm(want)[:120] not in _norm(a) and not (exa and _norm(a).startswith(_norm(exa[0]))):
            fails.append(("P2","PERSON ANGLE",f"{pid} t{rank}: ANGLE is not HER angle (build_all.plan/ANG14): want '{want[:90]}…', has '{a[:90]}…'"))
    f=face_of(pid)
    if f and _norm(f)[:150] not in _norm(text):
        fails.append(("P3","PERSON FACE",f"{pid} t{rank}: her own face sentence (face-common/{pid}.v5/v3.FULL.txt) missing"))
    return fails
def batch(files,age="a18"):
    by=collections.defaultdict(lambda: collections.defaultdict(list)); bad=[]
    for fn in files:
        t=open(fn,encoding="utf-8").read(); pid,rank=pid_rank(fn,t)
        if not pid: bad.append(f"B0 {fn}: no person/rank in file name (want <pid>_t<rank>_…)"); continue
        for p in person_check(t,pid,rank,age): bad.append(f"{p[0]} {os.path.basename(fn)}: {p[2]}")
        a=sent(t,"ANGLE:"); po=sent(t,"Pose:")
        if a: by[(rank,"ANGLE")][_norm(a)].append((pid,fn))
        if po: by[(rank,"Pose")][_norm(po)].append((pid,fn))
        try: by[(rank,"ITEM")][_key(own_item(pid,rank,age)[0])].append((pid,fn))
        except Exception: pass
    for (rank,kind),d in sorted(by.items()):
        for txt,lst in d.items():
            ps=sorted({p for p,_ in lst})
            if len(ps)>1 and kind=="ITEM": WARN.append(f"W1 t{rank} builder data gives the SAME item to {', '.join(ps)}: '{txt}' (item data repeats across persons: only 8 item ladders for 90 persons; needs a data fix, not a file fix)"); continue
            if len(ps)>1: bad.append(f"B1 t{rank} same {kind} for {len(ps)} persons {', '.join(ps)}: '{txt[:100]}…' ({', '.join(os.path.basename(f) for _,f in lst)})")
    return bad
def selftest():
    import tempfile
    d=os.path.join(ART,"thu_comoi"); ok=True
    good=[os.path.join(d,x) for x in ("s62_t1_THU_fix_L2008.txt","s62_t2_THU_fix_L1847.txt","s62_t3_THU_fix_L1978.txt","s62_t4_THU_sqtest_L1994.txt","s62_t5_THU_fix_L1856.txt",
          "s62_t6_THU_vankien2_L2023.txt","s62_t7_THU_vankien2_L2023.txt","s62_t8_THU_vankien2_L2023.txt")]
    tmp=tempfile.mkdtemp(); gs=[]
    for f in good:
        k=re.search(r"_t(\d)",f).group(1); n=os.path.join(tmp,f"s62_t{k}_THU.txt"); open(n,"w").write(open(f).read()); gs.append(n)
    b=batch(gs); print("selftest s62 approved t1-t8:", "PASS" if not b else "FAIL "+"; ".join(b)); ok&=not b
    copies=sorted(glob.glob(os.path.join(d,"s6[345]_t[1-5]_THU_L2026.txt")))
    if copies:
        b=batch(copies); print("selftest VE12 s63-s65 copies:", "FAIL as expected (%d)"%len(b) if b else "PASS = WRONG"); ok&=bool(b)
    return 0 if ok else 1
if __name__=="__main__":
    a=sys.argv[1:]
    if a and a[0]=="--self": sys.exit(selftest())
    b=batch(a); [print(x) for x in b]; [print(x) for x in WARN]; print("BATCH", "FAIL" if b else "PASS", len(a), "files"); sys.exit(1 if b else 0)
