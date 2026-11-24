#!/usr/bin/env python3
"""robot10-coop stuckcap family scan: every MANUAL kit scene (j93 kmStage(...,{manual:true})) in dev/build — no timer close, only its own
[data-km-close] button. Before: dev/test/lib/coop-clear.js TAP pressed that button only when VISIBLE; a scene whose button waits for a reveal
(a timer or a tap on the picture) stayed up if the reveal did not come. After: TAP taps the scene once when its close button is hidden.
usage: python3 dev/test/r10c-manual-scene-scan.py   (exit 1 if coop-clear lacks the hidden-close rule while a manual scene exists)"""
import re,os,glob,sys
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..')
cc=open(os.path.join(R,'test/lib/coop-clear.js'),encoding='utf-8').read()
rule="querySelectorAll('[data-km-close],.kmend,.krevok')].some(b=>vis(b)" in cc
rows=[]
for f in sorted(glob.glob(os.path.join(R,'build/j*.js'))):
    s=open(f,encoding='utf-8').read()
    for m in re.finditer(r'kmStage\(("[^"]*"|[a-zA-Z_]+)',s):
        seg=s[m.start():m.start()+1500]
        if 'manual:true' not in seg[:600]:continue
        line=s.count('\n',0,m.start())+1
        blk=s[m.start():m.start()+4000];cl='[data-km-close]' if 'data-km-close' in s else ('kitSceneEnd .kmend' if 'kitSceneEnd' in blk else '?')
        rows.append((os.path.basename(f)+':'+str(line),m.group(1),cl))
for f in sorted(glob.glob(os.path.join(R,'build/j*.js'))):
    s=open(f,encoding='utf-8').read();m=re.search(r'function kitNewDay',s)
    if m:rows.append((os.path.basename(f)+':'+str(s.count('\n',0,m.start())+1),'#dawn.kne-day (kitNewDay beats)','kitSceneEnd .kmend'))
rule=rule and "#dawn.kne-day" in cc
print(f"manual kit scenes: {len(rows)} · coop-clear hidden-close rule: {'ON' if rule else 'OFF'}")
print("| scene (file:line) | class | close | reachable by the co-op bot before | now |")
print("|---|---|---|---|---|")
for w,c,cl in rows:
    print(f"| {w} | {c} | own {cl} after its reveal (timer or a tap) | only if the reveal came | {'yes (taps the scene when the close is hidden)' if rule else 'only if the reveal came'} |")
sys.exit(0 if rule or not rows else 1)
