#!/usr/bin/env python3
"""Scan every call site that can show a person (figure + «X dặn») in a tip / coach / notice frame (owner 25/11 ~06:55Z, law 11).
Lists: site | topic | speaker (before = always Tống ma ma via kitPersonDlg) | real announcer? | after (person / no person). Exit 1 if a non-announcer site still passes a person."""
import re,sys,os
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','build')
rd=lambda f:open(os.path.join(R,f),encoding='utf8').read()
jt,jp,jg,jk=rd('jtut.js'),rd('jpdlg.js'),rd('jgoal.js'),rd('jkitpage.js')
rows=[];bad=0
# tips (kitTip via showTip): neutral mechanics text -> no person
for m in re.finditer(r'^ "([a-z-]+)":\{t:"([^"]+)"',jt,re.M):
    rows.append((f'jtut TIPS["{m.group(1)}"]',m.group(2),'Tống ma ma','no (mechanics tip)','no person'))
if 'kitTip({id,title:d.t,html:`<p>${say(d.h)}</p>`})' not in jt: bad+=1;rows.append(('jtut showTip','-','-','no','STILL PASSES person?'))
# coach: tour steps + askOnce = ma ma teaching lễ in her own voice ({M}/{m} text) -> keep
rows.append(('jtut show() tour steps','Lời dặn tân thủ (tour)','Tống ma ma','YES (she teaches lễ, text in her voice)','person (person:true)'))
rows.append(('jtut askOnce','Lời dặn tân thủ (hỏi nghe lại)','Tống ma ma','YES','person (person:true)'))
rows.append(('jgoal kitCoach','Mệnh truyện · việc kế (ring the lit card)','Tống ma ma','no (system hint)','no person'))
rows.append(('jkitpage §50.2 sample','kit sample','ma ma','sample','person sample + no-person sample'))
if 'noPerson:!spec.person' not in jt: bad+=1
if jt.count('kitCoach({person:true')!=2: bad+=1
if 'person:true' in jg: bad+=1
w=[max(len(r[i]) for r in rows) for i in range(5)]
print('| site | topic | speaker before | real announcer? | after |\n|---|---|---|---|---|')
for r in rows:print('| '+' | '.join(r)+' |')
print('\nBAD',bad);sys.exit(1 if bad else 0)
