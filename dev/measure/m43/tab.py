import json,glob,sys
g=sys.argv[1]
P={}
for f in glob.glob(f'out_{g}_*.json'):
    d=json.loads(open(f).read())
    for t,D in d['pl'].items():
        Q=P.setdefault(t,{})
        for k,v in D.items():Q[k]=Q.get(k,0)+v
TR=["Hiểm độc","Kiêu ngạo","Hiền lành","Đa nghi","Tham vọng","Nhu mì","Ghen tuông","Thù dai","Nhiều chuyện","Tham tiền","Trọng nghĩa","Cả nể","Thẳng thắn","Mê tín","Khéo léo","Hiếu thảo"]
g_=lambda Q,k:Q.get(k,0)
print("%-12s %6s %6s %6s %7s %6s %6s %6s %6s %6s %6s %6s %6s"%("trait","decide","mist%","acts","wrongB%","tells","seen","withh","hesit","wait","rash","overr","clue"))
for t in TR+["__all"]:
    Q=P.get(t,{});dc=g_(Q,'_decide');ac=g_(Q,'_act')
    if not dc:continue
    print("%-12s %6d %5.0f%% %6d %6.0f%% %6d %6d %6d %6d %6d %6d %6d %6d"%(t,dc,100*g_(Q,'_mistake')/dc,ac,100*g_(Q,'_actWrong')/ac if ac else 0,g_(Q,'_tell'),g_(Q,'_tellSeen'),g_(Q,'_tellWithheld'),g_(Q,'_hesitate'),g_(Q,'_wait'),g_(Q,'_rash')+g_(Q,'_badWeek'),g_(Q,'_overreach'),g_(Q,'_clue')))
A=P['__all'];print('beliefs formed',g_(A,'_belief'),'wrong',g_(A,'_wrongBelief'),'dark',g_(A,'_dark'),'slips',g_(A,'_slip'),'fails',g_(A,'_fail'),'badWeek',g_(A,'_badWeek'),'abandon',g_(A,'_abandon'))
