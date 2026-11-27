#!/usr/bin/env python3
"""review/sangbuoi-held-fix (LAW 11 family scan): every SILENT EXIT on the buổi-turn path that can leave cards in Q with #modal hidden.
Family = (1) every nextBuoi wrapper (and the base j9 nextBuoi) that RETURNS without calling the layer below, (2) every jdayq hold exit
(dqWait tick, dqArmModal tick, the kmFree newsHold gate, the kmOnReset reset). An exit is SAFE when, with cards waiting in Q, it ends in a
paint (showModal / dqArmModal / dqPaintQ) or the exit is reached only while something is ON SCREEN for her to tap.
usage: python3 dev/test/sangbuoi-exit-scan.py [index.html]   (exit 1 = an unsafe exit is left)"""
import re, sys
s = open(sys.argv[1] if len(sys.argv) > 1 else 'index.html', encoding='utf-8').read()
def body_at(i):
    d = 1; j = i
    while d and j < len(s):
        d += {'{': 1, '}': -1}.get(s[j], 0); j += 1
    return s[i:j]
rows = []
# (1) nextBuoi wrappers: <v>=nextBuoi;nextBuoi=function(){ ... }  (any variable name)
for m in re.finditer(r'(?:const|let|var)?\s*(\w+)\s*=\s*nextBuoi\s*;\s*nextBuoi\s*=\s*(?:window\.nextBuoi\s*=\s*)?function\s*\([^)]*\)\s*\{', s):
    v = m.group(1); b = body_at(m.end())
    flat = b
    for _ in range(4): flat = re.sub(r'function\s*\([^)]*\)\s*\{[^{}]*\}|=>\s*\{[^{}]*\}', '', flat)
    for r in re.finditer(r'\breturn\b(?!\s*' + v + r'\.apply)(?!\s+r\b)(?!\s*\w+\s*\.apply)[^;}]*', flat):
        ctx = flat[max(0, r.start() - 140):r.end()]
        rows.append(('nextBuoi wrapper', re.sub(r'\s+', ' ', ctx)[-200:]))
base = re.search(r'function nextBuoi\(\)\{if\(!S\|\|S\.dead\|\|Q\.length\|\|S\.mg\)return;', s)
# r2: j6 wires the button to the GLOBAL nextBuoi at tap time (= jdayq outermost wrapper, which paints first, then every module wrapper)
m = re.search(r'\$\("next"\)\.onclick=\(\)=>nextBuoi\(\);', s)
rows.append(('#next button (solo = BARE j9)', m.group(0) if m else '(no paint on the button: solo #next runs the bare j9 nextBuoi)'))
rows.append(('j9 base nextBuoi', 'if(!S||S.dead||Q.length||S.mg)return;' if base else '(changed)'))
# (2) jdayq exits
dq = s[s.find('const DQ={'):s.find('window.DQ=DQ;')]
for name, pat in [('dqWait tick drop', r'if\(dqOldPending\(\)\)\{.{0,40}DQ\.t=setTimeout.{0,140}'),
                  ('dqArmModal tick', r'const tick=DQ\.mtf=\(\)=>\{.*?console\.error\("dayq modal"'),
                  ('kmFree newsHold', r'if\(DQ\.newsHold\)\{[^}]*\}'),
                  ('kmOnReset', r'kmOnReset\(\(\)=>\{.*?\}\)')]:
    m = re.search(pat, dq, re.S); rows.append(('jdayq ' + name, (m.group(0)[:200]+(' … '+m.group(0)[-120:] if len(m.group(0))>320 else '')) if m else '(not found)'))
m = re.search(r'render=function\(\)\{const r=rd\.apply.{0,160}', dq); rows.append(('jdayq render net', m.group(0) if m else '(missing: a render that leaves a hidden queue arms nothing)'))
m = re.search(r'nextBuoi=function\(\)\{if\(dqUi\(\)&&!dqForced\(\)&&dq.{0,400}', dq)
rows.append(('jdayq nextBuoi (outermost)', m.group(0)[:300] if m else '(not found)'))
# verdicts
def verdict(kind, txt):
    if kind == '#next button (solo = BARE j9)': return 'SAFE (r2: the button calls the global = outermost wrapped nextBuoi: jdayq paints a hidden queue first, then every module wrapper runs)' if 'onclick=()=>nextBuoi()' in txt and 'dqPaintQ' in dq else 'UNSAFE: solo «Sang buổi» goes straight to the bare j9 nextBuoi (j6 wiring), skipping every wrapper — Robot M4 dead tap'
    if kind == 'j9 base nextBuoi': return 'SAFE (the #next button + the jdayq outermost wrapper paint a hidden queue before this runs)' if 'dqPaintQ' in dq and '$("next").onclick=()=>nextBuoi();' in s else 'UNSAFE: Q.length → silent return, queued cards never painted (Robot M4)'
    if kind == 'jdayq nextBuoi (outermost)': return 'SAFE (paints a hidden queue first: dqPaintQ)' if 'dqPaintQ' in txt else 'UNSAFE: no paint of a hidden queue at the tap'
    if kind == 'jdayq dqWait tick drop': return 'SAFE (paints)' if re.search(r'dqPaintQ|showModal|dqArmModal', txt) else 'UNSAFE: drops the held turn with render() only (Robot M4 root)'
    if kind == 'jdayq render net': return 'SAFE (any render leaving a hidden queue arms dqArmModal)' if 'dqArmModal' in txt else 'UNSAFE'
    if kind == 'jdayq dqArmModal tick': return 'SAFE (waits on dawn/activity ON SCREEN, then showModal; re-arms while an inner gate swallows the paint)' if 'rearm' in txt else 'UNSAFE: ONE-SHOT — an inner showModal gate swallows its paint and nothing re-arms (Robot M4: DQ.mt 0, dropped 0)'
    if kind == 'jdayq kmFree newsHold': return 'SAFE (a scene held behind an unpainted news card paints it: dqPaintQ)' if 'dqPaintQ' in txt else 'UNSAFE: KMQ waits on an unpainted news card → dqOldPending true → buổi held for ever'
    if kind == 'jdayq kmOnReset': return 'SAFE (re-arms a held card; new life)'
    t = txt
    if 'dqUi()&&!dqForced()&&dqOldPending()' in t: return 'jdayq hold → see dqWait'
    if 'dqPaintQ())return' in t: return 'SAFE (jdayq: her tap paints the hidden queue)'
    if re.search(r'waiting\(\)\|\|frozen\(\)\|\|CW\.pend', t): return 'SAFE (co-op room wait: #next locked with its wait words, jcoopworld lockNext)'
    if re.search(r'!isSrv\(\)|!isKc\(\)|!S\)|!\(on\(\)&&CW\.on\)|!CW\.on', t): return 'SAFE (guard calls the base)'
    if 'showModal' in t: return 'SAFE (paints the card it queued)'
    if re.search(r'wantB\(\);return$', t): return 'SAFE (co-op wantB: paints a hidden queue (showModal / reshowQ) and keeps her intent until the cards clear)'
    if re.search(r'S\.dead\)return$', t): return 'SAFE (no life / dead: nothing to paint)'
    if re.search(r'(bend|nightReady)\(\);return$', t): return 'SAFE (co-op step runs: bend / nightReady)'
    if 'E.stat.press' in t or 'press' in t: return 'SAFE (co-op ready step, its own UI)'
    return 'CHECK BY HAND'
bad = 0
print(f'{"exit":34s} | verdict\n{"-"*34}-+-{"-"*60}')
for k, t in rows:
    v = verdict(k, t); bad += v.startswith('UNSAFE')
    print(f'{k:34s} | {v}\n{"":34s} |   {t[:180]}')
print('RESULT:', f'FAIL ({bad} unsafe exits)' if bad else 'PASS (every exit paints a hidden queue or waits on something on screen)')
sys.exit(1 if bad else 0)
