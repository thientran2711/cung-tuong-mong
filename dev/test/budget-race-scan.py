#!/usr/bin/env python3
"""budget-race-scan (review/coop-one-world-flake, LAW 11 family scan): seeded probes that a loaded machine can flip.
The game spreads NPC agent work over frames with a wall-clock budget (jagent agSlice / jagday agLzRun: BAL.ag.perf.slice = 3 ms,
performance.now()); work left over waits for a setTimeout(0) frame. A probe that runs week ends inside ONE page.evaluate (sync)
never yields that frame, so HOW MANY NPCs decide each buổi depends on CPU speed: under load fewer decide, the seeded Math.random
stream shifts and the outcome changes (the 22/11 coop-one-world seed-3 flake). The game's own switch window.__agAll=1 runs every
slice at once (CPU-independent); jagent/jagday tests already set it.
Flags a test that (a) replaces Math.random with a seeded stream or compares two runs, (b) runs the turn engine (endTurn / nextBuoi /
advance) and (c) never sets window.__agAll.  usage: python3 dev/test/budget-race-scan.py [--all]   (default: co-op tests + core gates)
Exit 1 when a CORE gate is flagged."""
import re,sys,glob,os
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..')
CORE=['coop-one-world','coop-e2e','mk-layer-scan','time-spill-guard','kit-conform','emotion-acts','rules-one-source','odds-cap','dialog-fixed','npc-purpose-scan','one-core-guard','one-core-bind','one-core-text']
fs=sorted(glob.glob(os.path.join(R,'dev/test/*.js')))
if '--all' not in sys.argv:fs=[f for f in fs if os.path.basename(f)[:-3] in CORE or os.path.basename(f).startswith('coop-')]
# checked by hand, not a member (reason):
ALLOW={'coop-host-lag-scan':'its endTurn months run UNSEEDED once into the snapshot D that both seats load; the seeded part is render/face picks only (no agents)'}
seed=re.compile(r'Math\.random\s*=(?!=)');turn=re.compile(r'\b(endTurn|nextBuoi|advance)\s*\(');ag=re.compile(r'__agAll')
bad=[];core_bad=[]
for f in fs:
    t=open(f,encoding='utf8',errors='replace').read();b=os.path.basename(f)[:-3]
    if b.startswith('zz-'):continue
    if b in ALLOW:print('ok   dev/test/'+b+'.js: '+ALLOW[b]);continue
    if seed.search(t) and turn.search(t) and not ag.search(t):
        bad.append(b)
        if b in CORE:core_bad.append(b)
for b in bad:print(('CORE ' if b in core_bad else '     ')+'dev/test/'+b+'.js: seeded + turn engine, no window.__agAll')
print(f'TOTAL {len(bad)} flagged ({len(core_bad)} core gate) of {len(fs)} file(s)')
sys.exit(1 if core_bad else 0)
