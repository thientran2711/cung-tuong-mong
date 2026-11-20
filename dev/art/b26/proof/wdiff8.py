# B26FAB4 A39 word diff: per changed cell Counter(base words) - Counter(new words) (lost) and new - base (added); summary over all changed cells.
import sys,json,re,collections
B=json.load(open(sys.argv[1])); N=json.load(open(sys.argv[2])); W=lambda s:collections.Counter(re.findall(r"[A-Za-zÀ-ỹ'#0-9/-]+",s.lower()))
lost=collections.Counter(); added=collections.Counter(); n=0; ex=None
for k,v in N.items():
    if v==B[k]: continue
    n+=1; l=W(B[k])-W(v); a=W(v)-W(B[k]); lost.update(l.keys()); added.update(a.keys())
    if k=="m22|5|a65|dong": ex=(dict(l),dict(a))
print("changed cells",n); print("words ever lost (cells):",dict(lost.most_common())); print("words ever added (cells):",dict(added) or "NONE")
print("example m22 t5 a65 đông lost:",ex[0] if ex else None,"added:",ex[1] if ex else None)
