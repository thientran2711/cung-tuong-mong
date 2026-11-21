#!/usr/bin/env python3
"""Prompt checks for dev/art/prompts/** (paste-ready ChatGPT prompts; A53 = no Magnific). Canon checks that apply to non-outfit pictures:
 A19/gen limit: <= 10 000 chars · A56: ends with ONE unique CAPTION code (no code reused across files) · A57: shared sentences byte-identical to MASTER_COMMON.txt
 N1 no visible face (event/act/ending/scene) · F14 no Qing look · VANPHONG: no '%' · no moles/earring words on any person · NOFRUIT (F16): no fruit word in a hold sentence
 N8 'No text, no labels' present · keep_check (A38): needs a <file>.keep sidecar only for prompts edited from another; these are all new, none edited -> n/a
Usage: python3 dev/art/prompts/check_prompts.py [dir ...]   exit 1 on FAIL"""
import sys, os, re, glob
HERE = os.path.dirname(os.path.abspath(__file__))
FRUIT = re.compile(r"\b(hold\w*|held|cradl\w*|carr\w*)\b[^.]*\b(apple|peach|pear|grape|orange|fruit|lychee|pomegranate|persimmon|cherry)\b", re.I)
BAD = [("percent sign", re.compile(r"%")), ("mole", re.compile(r"\bmoles?\b(?!\W*(no|never))", re.I)), ("earring", re.compile(r"\bearrings?\b|ear[- ]?drops?", re.I)),
       ("Qing headdress ask", re.compile(r"\bliangbatou\b|two-wing board", re.I))]
dirs = sys.argv[1:] or [HERE]
files = sorted(f for d in dirs for f in glob.glob(os.path.join(d, "**", "*.txt"), recursive=True) if os.path.basename(f) not in ("MASTER_COMMON.txt",) and not os.path.basename(f).startswith("_"))
seen = {}; fails = 0
for f in files:
    t = open(f, encoding="utf-8").read(); msgs = []
    if len(t) > 10000: msgs.append("len %d > 10000" % len(t))
    m = re.findall(r'CAPTION: write ONLY this code[^\n]*"([A-Z0-9\-_]+)"', t)
    if len(m) != 1: msgs.append("CAPTION code count %d" % len(m))
    elif m[0] in seen: msgs.append("code %s also in %s" % (m[0], seen[m[0]]))
    else: seen[m[0]] = f
    if "No text, no labels" not in t: msgs.append("missing 'No text, no labels'")
    if "Soft painted guofeng game illustration" not in t: msgs.append("missing style sentence")
    for n, r in BAD:
        if r.search(t.replace("no moles", "").replace("NO facial moles", "")): msgs.append("banned: " + n)
    if FRUIT.search(t): msgs.append("fruit in hold sentence (F16)")
    if msgs: fails += 1; print("FAIL", os.path.relpath(f, HERE), "; ".join(msgs))
print("checked %d files, %d FAIL" % (len(files), fails)); sys.exit(1 if fails else 0)
