#!/usr/bin/env python3
"""timer-wait-scan (review/live-test-reds): lists every fixed-timer wait in the CORE GATES (the tests quickcheck / coregates / land runs on every merge).
A fixed timer before an assertion is a race: it passes on a fast machine and fails on a loaded one. The gate must wait for the real condition
(waitForFunction / waitForSelector / a polling loop on the state it asserts). usage: python3 dev/test/timer-wait-scan.py [--all]
Core gates = coregates.sh G2/G3 + quickcheck.d hooks + emotion-acts + coop-e2e (+ --all: every dev/test/*.js). Waits < 300 ms are ignored (animation frames)."""
import re,sys,glob,os
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..')
CORE=['rules-one-source','coop-one-world','mk-layer-scan','time-spill-guard','kit-conform','emotion-acts','coop-e2e']
files=sorted(glob.glob(os.path.join(R,'dev/test/*.js'))+[os.path.join(R,'dev/tools/quickcheck.js')]) if '--all' in sys.argv else [os.path.join(R,'dev/test',c+'.js') for c in CORE]+[os.path.join(R,'dev/tools/quickcheck.js'),os.path.join(R,'dev/test/odds-cap.js')]  # review r1: quickcheck.js (gate 2) + odds-cap (hook 40) were not scanned
pat=re.compile(r'(?:\bsleep|\bsl|waitForTimeout)\((\d+)\)')  # r1: also the sl(ms) helper of quickcheck.js
tot=0
for f in files:
    if not os.path.exists(f): continue
    n=0
    for i,l in enumerate(open(f,encoding='utf8',errors='replace'),1):
        for m in pat.finditer(l):
            if int(m.group(1))>=300:
                n+=1;print(f"{os.path.relpath(f,R)}:{i}: {m.group(0)}")
    tot+=n
print(f"TOTAL {tot} fixed-timer waits >=300 ms in {len(files)} file(s)")
