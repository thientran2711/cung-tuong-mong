#!/usr/bin/env python3
"""PALAUDIT1: dump every build_all.py cell (person x rank 1-8 + nude, x age, x season None/dong) to cells_<age>.jsonl. READ ONLY (no prompt edits)."""
import sys,os,io,json,contextlib
ART=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0,os.path.join(ART,"store-all")); sys.path.insert(0,ART); os.chdir(os.path.join(ART,"store-all"))
with contextlib.redirect_stderr(io.StringIO()), contextlib.redirect_stdout(io.StringIO()): import build_all as B
ages=sys.argv[1:] or ["a18"]
for age in ages:
    out=open(os.path.join(os.path.dirname(os.path.abspath(__file__)),f"cells_{age}.jsonl"),"w",encoding="utf-8"); n=e=0
    for p in B.PEOPLE:
        for r in list(range(1,9))+["nude"]:
            for s in (None,"dong"):
                if r=="nude" and s: continue
                try:
                    with contextlib.redirect_stderr(io.StringIO()), contextlib.redirect_stdout(io.StringIO()):
                        res=B.build_season(p,r,age,s) if s else B.build(p,r,age)
                    pr=res[1]
                    try: mw=B.main_words(p); sw=B.secondary(p)[0]
                    except Exception: mw=sw=""
                    out.write(json.dumps({"person":p,"rank":r,"age":age,"season":s,"main":mw,"sec":sw,"prompt":pr},ensure_ascii=False)+"\n"); n+=1
                except BaseException as x:
                    out.write(json.dumps({"person":p,"rank":r,"age":age,"season":s,"err":f"{type(x).__name__}: {str(x)[:150]}"},ensure_ascii=False)+"\n"); e+=1
    out.close(); print(age,"built",n,"errors",e,flush=True)
