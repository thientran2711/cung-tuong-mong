import sys,io,contextlib,re
exec(open("dev/handover/reports/BUILDFIX4/sim.py").read().split("res=dict")[0])
p,t=sys.argv[1],int(sys.argv[2])
with contextlib.redirect_stdout(io.StringIO()): S=B.build_season(p,t,"a18","thu")[1]
print(len(S))
for i,s in enumerate(re.split(r"(?<=\.) (?=[A-Z])",S)): print(i,len(s),s if len(s)<400 or "-f" in sys.argv else s[:400]+" …")
