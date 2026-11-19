# Lượt 735 (m12 dropped mid-task: Tinh nghịch group moved to Kho; m08 Dịu dàng used instead): season try-on. Change ONLY the main/secondary colour words (+hex) in the approved FULL prompt.
import json,os
D=os.path.dirname(os.path.abspath(__file__)); F=os.path.dirname(D)
P=json.load(open(os.path.join(F,'palettes_season.json')))
SPEC={
 'm12':('m12.v3.FULL.txt',[
   ('crisp pale golden-yellow silk','crisp {main} ({mh}) silk'),
   ('long ivory pleated skirt','long {sec} ({sh}) pleated skirt'),
   ('tied with golden-yellow ribbons','tied with {main} ribbons'),
   ('her signature colour family pale golden yellow and ivory','her signature colour family {main} ({mh}) and {sec} ({sh})')]),
 'm08':('m08.v3.FULL.txt',[
   ('with peach silk ribbons','with {main} silk ribbons'),
   ('ruqun of peach-salmon (like #E4AC94) silk satin','ruqun of {main} (like {mh}) silk satin'),
   ('a paler peach (like #F6CFBC) floor-length skirt','a {sec} (like {sh}) floor-length skirt'),
   ('her signature colour family peach-salmon and gold','her signature colour family {main} ({mh}) and {sec} ({sh})')]),
 'm04':('m04.v3b.FULL.txt',[
   ('ruqun of warm apricot silk crepe','ruqun of {main} ({mh}) silk crepe'),
   ('a pale apricot-cream floor-length skirt','a {sec} ({sh}) floor-length skirt'),
   ('tied with an apricot ribbon','tied with a {main} ribbon'),
   ('her signature colour family warm apricot and gold','her signature colour family {main} ({mh}) and {sec} ({sh})')]),
}
for m,(src,reps) in SPEC.items():
  base=open(os.path.join(F,src)).read()
  for s in ['xuan','ha','thu','dong']:
    p=P[m][s]; t=base
    for a,b in reps:
      assert t.count(a)==1,(m,a); t=t.replace(a,b.format(main=p['main'],mh=p['main_hex'],sec=p['sec'],sh=p['sec_hex']))
    open(os.path.join(D,f'{m}.{s}.FULL.txt'),'w').write(t)
    print(m,s,p['main'],p['sec'])
