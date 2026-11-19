#!/usr/bin/env python3
"""log.py mNN aXX GEN_ID CUT_ID CREDITS [note] -> appends one line to dev/art/gen_ledger.jsonl (NDX3 Nữ đế set B)."""
import sys,json,datetime,os
R=os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),"../../.."))
p,age,gid,cut,cr=sys.argv[1:6]; note=sys.argv[6] if len(sys.argv)>6 else ""
kc=json.load(open(os.path.join(R,"dev/art/KC_REFS.json"),encoding="utf-8"))["people"][p]
opt="ABCD"[(int(p[1:])-1)%4]
e={"ts":datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),"kind":"NUDE-B","worker":os.environ.get("NDX_WORKER","NDX3"),
 "settings":"gpt-2-6 1024x2304 2k, no seed, folder ba4aecfe","refs":[{"type":"image","id":kc["ref_id"],"what":"set-B thiếu nữ v3 cut"},{"type":"image","id":"TdwDfOyVNR","what":"royal swatch"}]+([{"type":"image","id":os.environ["NDX_REF3"],"what":"her own Nữ đế a36 picture (D15 style lock)"}] if os.environ.get("NDX_REF3") else []),
 "store_check":"PASS","approved_check":"PASS","kc_check":"PASS","person":p,"age":age,"nudeopt":opt,
 "gen_id":gid,"cut_id":cut,"credits":int(cr),"prompt_file":f"dev/art/nude-B/prompts/{p}_{age}.txt",
 "store_args":f"{p} v0 --state nude --spec5pose --nudeopt {opt} --nostyle"+("" if age=="a18" else f" --age {age}")+" + nude-B/mk.py (ROOT-50 ruling b)"+os.environ.get("NDX_ARGS_TAIL",""),"note":note}
open(os.path.join(R,"dev/art/gen_ledger.jsonl"),"a",encoding="utf-8").write(json.dumps(e,ensure_ascii=False)+"\n"); print("logged",p,age,gid,cut)
