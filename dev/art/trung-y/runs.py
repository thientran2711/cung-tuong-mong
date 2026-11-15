#!/usr/bin/env python3
"""runs.py RUNID:role-id ... — read the Magnific Space run status of each run from the Claude transcripts and print bg.txt lines
("role id tier genId -") for every completed generator node; failed nodes are listed as FAIL <nodeId-prefix> so they can be re-run.
Lane generator node ids (prefix, tier order 1..8) of the Space 'Trung y 8 bậc'."""
import sys, glob, json, re, os
LANES = {
 "A": "d99c5c1d 458dfd5a 92accc69 f34b5f1c 6fbf6522 5f243d2d 0a607982 63734441",
 "B": "e76f5127 cae51655 f09ec456 865d766f 581c8304 91eab4ff bd1c33d5 d13dbada",
 "C": "c11a422e fb2c9b6c c53e05e9 3a90a371 b8579f43 4efd70b5 a4986b54 c174391a",
 "D": "8b1f265c be12b22f 20035804 c3b74ec6 fff90e44 282409ab 0efe2dcb 1d5e8234",
 "E": "630b10a7 0653c22f d54f90b7 fa19b219 aa68417f 72173912 de02bbb8 3663d5db",
 "F": "9d50a099 3c902418 74254792 383027b4 d85166db 5e999f74 c8fd98c7 80353cb2"}
TIER = {n: (lane, i + 1) for lane, s in LANES.items() for i, n in enumerate(s.split())}
want = dict(a.split(":") for a in sys.argv[1:])
found = {}
for f in glob.glob("/root/.claude/projects/*/*/subagents/*.jsonl"):
    for line in open(f, errors="ignore"):
        if "workflowRunIdentifier" not in line or "nodeRuns" not in line: continue
        for rid in want:
            if rid not in line: continue
            u = line.replace('\\"', '"'); key = '{"success":true,"allTerminal":true,"workflowRunIdentifier":"' + rid + '"'
            i = u.find(key)
            while i >= 0:
                try: found[rid] = json.JSONDecoder().raw_decode(u[i:])[0]
                except Exception: pass
                i = u.find(key, i + 1)
for rid, who in want.items():
    role, ident = who.split("-")
    st = found.get(rid)
    if not st: print("NOSTATUS", rid, who); continue
    for nr in st["nodeRuns"]:
        t = TIER.get(nr["nodeId"][:8])
        if not t: continue
        if nr["status"] == "completed" and nr["creationIdentifiers"]: print(role, ident, t[1], nr["creationIdentifiers"][0], "-")
        else: print("FAIL", who, t[1], nr["nodeId"])
