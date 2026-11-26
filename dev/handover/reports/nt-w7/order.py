# NB-b (law 1/6/11): relAdd(doer, hurt, n) — j9: n<0 → hurt one gains |n|×BAL.relOan.hurt oán, doer |n|×doer; n>0 → hurt one's oán melts |n|×mend.
# Every call site that passed the victim / receiver first, swapped. Idempotent.
import sys
D='/home/user/wt/ng/dev/build/'
FIX=[("jface.js","relAdd(t,a,B.rel[sev])","relAdd(a,t,B.rel[sev])","Tát: a slaps t"),
("jface.js","relAdd(t,a,FXF.phatRel)","relAdd(a,t,FXF.phatRel)","Phạt quỳ: a punishes t"),
("jslap.js","relAdd(S,a,B.missRel)","relAdd(a,S,B.missRel)","NPC a's slap at her missed"),
("jslap.js","relAdd(t,a,B.missRel)","relAdd(a,t,B.missRel)","a's slap at t dodged"),
("jpoison.js","relAdd(t,a,BAL.eff.jpoison.pgGive)","relAdd(a,t,BAL.eff.jpoison.pgGive)","a's poisoned gift noticed by t"),
("jpoison.js","relAdd(S,f,BAL.eff.jpoison.found)","relAdd(f,S,BAL.eff.jpoison.found)","f's poisoned gift found by her"),
("jpetcare.js","relAdd(t,a,BAL.pet.helpRel)","relAdd(a,t,BAL.pet.helpRel)","a helps with t's pet (kindness)"),
("jagacts2.js","relAdd(t,v,-X.rel)","relAdd(v,t,-X.rel)","v searches t's chest"),
("j70.js","relAdd(a,S,BAL.eff.j70.exec70)","relAdd(S,a,BAL.eff.j70.exec70)","her trap catches a's people"),
("jecon.js","relAdd(v,p,-BAL.favorCost)","relAdd(p,v,-BAL.favorCost)","p spends v's favour"),
("jecon.js","relAdd(v,p,BAL.eff.jecon.econDoDuty)","relAdd(p,v,BAL.eff.jecon.econDoDuty)","p pays bạc to v"),
("jworld2.js","relAdd(mother,v,-b.skipOan)","relAdd(v,mother,-b.skipOan)","v is cold to the mother's feast"),
("jworld2.js","relAdd(m,S,-b.skipOan)","relAdd(S,m,-b.skipOan)","she skips m's feast"),]
for f,o,n,w in FIX:
  s=open(D+f).read()
  if o in s:
    assert s.count(o)==1,(f,o); s=s.replace(o,n); open(D+f,'w').write(s); print('fixed',f,w)
  elif n in s: print('already',f,w)
  else: print('MISSING',f,o); sys.exit(1)
