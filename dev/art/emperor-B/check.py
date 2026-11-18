import build,re
ps={k:build.build(k) for k in build.FACE}
for k,p in ps.items():
    assert build.PRE in p and build.YEL_NEW in p and build.FAB in p and p.endswith(build.END)
# everything except FACE/OUTFIT/ITEM+hand must be identical
def mask(k,p):
    p=p.replace(build.FACE[k],"@F").replace(build.OUTFIT[k],"@O")
    i,h=build.ITEM[k]; return p.replace(h,"@H").replace(i,"@I")
m={mask(k,p) for k,p in ps.items()}
print("distinct masked prompts:",len(m)); assert len(m)==1,"not byte-identical outside the slots"
print("OK")
