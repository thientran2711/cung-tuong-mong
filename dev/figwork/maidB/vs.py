# vs.py JID... : compact: jid style ref | colour(+flower) | 4 poses
import sys,re; sys.argv,args=[sys.argv[0]],sys.argv[1:]
exec(open(__file__.replace("vs.py","mjobs.py")).read().split('if __name__')[0])
for j in args:
    s,r,p=job(j); o=p[p.index("a NEW outfit, ")+14:p.index(" Poses (NEW")]
    c=re.search(r" in ([^,]+), NOT green",o); c=c.group(1) if c else o[:60]
    f=re.search(r"\(trâm\) with ([^;]+);",o); 
    ps=re.findall(r"about \d\d: (.*?), (?:body slightly|three-quarter|slight turn|gently frontal)",p)
    print(j,s,r,"|",c+(" / "+f.group(1) if f else ""),"|"," ; ".join(ps))
