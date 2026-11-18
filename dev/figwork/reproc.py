import sys,json
sys.argv=[sys.argv[0]]+sys.argv[1:]
exec(open(__file__.replace('reproc.py','proc.py')).read().split("for line in open")[0])
figs_list=list(byfile.values())
for f in figs_list:
    name=f["file"][4:-5]; gen=f["magnificUrl"].rsplit('/',1)[1]
    process(name,gen,f"{W}/bg/{name}.png")
json.dump(sorted(byfile.values(),key=lambda f:list(spec).index(f["file"][4:-5])),open(figs_path,"w"),indent=1,ensure_ascii=False)
