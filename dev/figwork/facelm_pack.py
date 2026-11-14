# dict landmarks -> img/face-lm.json flat format (KIT_EXPR.K order, 1 decimal %)
import json,sys
K=["mL","mR","uL","lL","bLi","bLm","bLo","bRi","bRm","bRo","eLo","eLi","eLt","eLb","eRo","eRi","eRt","eRb","fL","fR","fh","chin","nose","mUL","mUR","mLL","mLR"]
o={}
for f in sys.argv[2:]:
  for n,d in json.load(open(f)).items():o[n]=[round(v,1) for k in K for v in d[k]]
json.dump(o,open(sys.argv[1],'w'),separators=(',',':'));print(len(o))
