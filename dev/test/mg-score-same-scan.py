#!/usr/bin/env python3
"""review/mg-score-same (owner bug 20/11 ~06:50Z): ONE grading path for the board and the result, whole family (31 KG82 kinds).
Static scan of every mini-game engine file: the HUD "score" cell must come from jmgt mgLive (the ONE grade, mgGrade) — never a raw count
(`${Math.round(pts)}/10`, `${sc()}/10`, `${k}/3`, "–/10"). The four Tứ đức engines pass a float that tdWrap turns into mgLive.
usage: python3 dev/test/mg-score-same-scan.py   (exit 1 on a hit)"""
import re,sys,os
D=os.path.join(os.path.dirname(__file__),'..','build')
FILES=['j82.js','j91.js','j92.js','jlant.js','jnwp.js','jnwq.js','jtd.js','jts.js','jslap.js','jhd.js','jwkg.js','jwkr.js','jcraft.js','jcraft_theu.js','jcraft_kim.js','jcraft_ve.js','jcraft_hoa.js']
bad=[];ok=0
for f in FILES:
    for i,l in enumerate(open(os.path.join(D,f)),1):
        for m in re.finditer(r'env\.hud\(\{score:([^,}]*)',l):
            v=m.group(1)
            if v.startswith('mgLive(') or (f=='jtd.js' and re.match(r'(mgReach\(|10\*Math\.min)',v)) or v=='"0/10"': ok+=1;continue
            bad.append(f'{f}:{i} {v[:60]}')
s=open(os.path.join(D,'j82.js')).read()
end_ok='kg82Set0("score",`${gm}/10`)' in s
print(f'score cells via the ONE grade: {ok}; raw cells: {len(bad)}; kg82Play ends on the given mark: {end_ok}')
for b in bad: print('FAIL',b)
sys.exit(1 if bad or not end_ok else 0)
