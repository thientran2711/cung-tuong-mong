#!/usr/bin/env python3
# review/balance-pace: lessons / khắc / game days a player needs per bậc, from the game's own rules (jbalcore crsPush, lesG, jtd tdPoints),
# for the OLD curve (live 1623b417), the RECOMMENDED one (this branch) and two options. usage: python3 dev/measure/pace-calc.py
# Calendar (OD:L31, OD 24/11): 1 game day = 1 tuần = 16 khắc; 1 month = 3 days; a lesson = 2 khắc. Courses: 8 Tài nghệ + 4 Tứ đức = 12.
TIER=[0,10,25,45,70,100]
CURVES={
 'old (live)':      dict(gain=[1.2,1,.8,.6,.4], self=lambda p:max(1,round(p*.6)), vself=lambda raw:2 if raw>=9 else 1),
 'A recommended':   dict(gain=[2,1.5,1.1,.9,.8], self=lambda p:max(1,round(p*1)),  vself=None),
 'B gentler (fast)':dict(gain=[2.8,2.1,1.5,1.25,1.1], self=lambda p:max(1,round(p*1)), vself=None),
 'C harsher (slow)':dict(gain=[1.5,1.1,.8,.65,.6], self=lambda p:max(1,round(p*1)), vself=None),
}
def pts(raw):return 3 if raw>=8 else 2 if raw>=5 else 1 if raw>=2 else 0   # BAL.mgTier.lessonPts [2,5,8]
def games(gain,g):
  lv,have,n,at=0,0.0,0,[]
  while lv<5 and n<999:
    left=g;n+=1
    while left>1e-9 and lv<5:
      need=TIER[lv+1]-TIER[lv];give=left*gain[lv]
      if have+give<need-1e-9:have+=give;left=0
      else:left-=(need-have)/gain[lv];have=0;lv+=1;at.append(n)
  return at
HANDS={'good (Xuất sắc, raw 8–10)':8.5,'average (raw 5–7)':6,'weak (raw 2–4)':3}
print('# Course pace per curve (one course; self-study, 2 khắc a game)\n')
print('| curve | hand | games to bậc 1 / 2 / 3 / 4 / 5 | khắc to Tông sư | game days (16 khắc) all on one course | 12 courses at 6 khắc/day: game months to all Tông sư |')
print('|---|---|---|---|---|---|')
for cn,c in CURVES.items():
  for hn,raw in HANDS.items():
    g=c['self'](pts(raw));at=games(c['gain'],g);k=2*at[-1]
    allm=round(12*k/6/3,1)
    print(f"| {cn} | {hn} | {' / '.join(map(str,at))} | {k} | {round(k/16,1)} | {allm} |")
print('\n# Teacher (Học với thầy, +1 over self-study, Bạc), good hand\n')
for cn,c in CURVES.items():
  s=c['self'](pts(8.5));t=max(pts(8.5),s+1);at=games(c['gain'],t);print(f"- {cn}: {' / '.join(map(str,at))} games ({2*at[-1]} khắc)")
