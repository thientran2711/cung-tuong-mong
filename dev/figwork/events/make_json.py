# python3 make_json.py -> img/EVENTS.json (only files that exist are listed; a category with no file yet is left out of categories,
# and its events fall back to the "default" file)
import os,sys,json; H=os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0,H); import ev_data as D
ROOT=os.path.abspath(os.path.join(H,'../../..'))
cats={}
for k,c in D.C.items():
    fs=[f for f in D.files(k) if os.path.exists(os.path.join(ROOT,f))]
    if fs: cats[k]={'title':c['title'],'files':fs}
ev={i:c for i,c in sorted(D.E.items()) if c in cats}
out={'note':'Event art (3:4, 768x1024 webp, no faces). events: eventId -> category; ids are namespaced (e68:, j7:, arc:, plot:, qs:, fest:, news:, sys:, j3:, j24:, j54:, j55:, j22:); "hh:*", "lc:*", "cnv:*", "j42:*" = whole prefix. Pick a file by a stable hash of the event id/variant. See dev/art/EVENT_ART.md.',
     'default':'trieu-chinh' if 'trieu-chinh' in cats else next(iter(cats)),'categories':cats,'events':ev}
json.dump(out,open(os.path.join(ROOT,'img/EVENTS.json'),'w'),ensure_ascii=False,indent=1)
print(len(cats),'categories',sum(len(c['files']) for c in cats.values()),'files',len(ev),'events')
