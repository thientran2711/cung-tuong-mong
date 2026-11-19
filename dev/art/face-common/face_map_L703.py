#!/usr/bin/env python3
"""face_map_L703.py -> FACE_MAP_L703.json: current face cut id per person (owner Lượt 703 tick page).
Source: OWNER_GROUPS_L686.json (group, 'Kho' = hidden) + gen_ledger.jsonl (latest KEPT entry whose prompt_file is
dev/art/face-common/<id>.v*.FULL.txt; cut = cut_id or 'remove_bg XXXX' in the note; entries saying rejected/unused/
superseded are skipped) + KC_REFS.json ref_id for m (thiếu nữ v3) when the ledger has none."""
import json, re, os
R = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
F = lambda p: os.path.join(R, p)
G = json.load(open(F("dev/art/face-common/OWNER_GROUPS_L686.json"), encoding="utf-8"))
KC = json.load(open(F("dev/art/KC_REFS.json"), encoding="utf-8"))["people"]
L = [json.loads(l) for l in open(F("dev/art/gen_ledger.jsonl"), encoding="utf-8") if l.strip()]
BAD = re.compile(r"REJECTED")
best = {}
for x in L:
    m = re.search(r"face-common/([mcs]\d\d)\.(v[\w]+)\.FULL\.txt", str(x.get("prompt_file", "")))
    if not m: continue
    pid, ver = m.groups(); note = x.get("note", "")
    cut = x.get("cut_id") or (re.search(r"remove_bg ([A-Za-z0-9]{10})", note) or [None, None])[1]
    if not cut or BAD.search(note.split("replaces")[0]): continue
    if pid not in best or x["ts"] >= best[pid]["ts"]:
        best[pid] = {"ts": x["ts"], "cut": cut, "gen": x.get("gen_id"), "ver": ver, "prompt_file": x["prompt_file"], "kind": x.get("kind")}
out = {}
for pid, grp in G.items():
    b = best.get(pid)
    if not b and pid in KC and KC[pid].get("ref_id"):
        b = {"cut": KC[pid]["ref_id"], "gen": KC[pid].get("gen_id"), "ver": "v3", "prompt_file": KC[pid].get("prompt_file"), "kind": "KC_REFS", "ts": ""}
    out[pid] = {"group": grp, "hidden": grp == "Kho", **(b or {"cut": None})}
json.dump(out, open(F("dev/art/face-common/FACE_MAP_L703.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
miss = [k for k, v in out.items() if not v["cut"]]
print(len(out), "people;", sum(not v["hidden"] for v in out.values()), "shown; missing cut:", miss)
