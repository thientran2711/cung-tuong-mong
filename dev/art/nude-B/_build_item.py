#!/usr/bin/env python3
"""Run dev/art/t8-prompt-B/build.py UNCHANGED except: age_item(c,'nude',...) returns env NDX_ITEM/NDX_HK (NDX3, E11 interim, ROOT-51 Lượt 583)."""
import os,sys
B=os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),"../t8-prompt-B/build.py"))
src=open(B,encoding="utf-8").read()
hook='\ndef _hh(fn,hk,right):'
assert src.count(hook)==1
inj='\n_age_item0=age_item\ndef age_item(c,tier,item,hk):\n    if tier=="nude" and os.environ.get("NDX_ITEM"): return os.environ["NDX_ITEM"],os.environ.get("NDX_HK","one")\n    return _age_item0(c,tier,item,hk)\n'
src=src.replace(hook,inj+hook,1)
sys.argv=[B]+sys.argv[1:]
g={"__name__":"__main__","__file__":B}
exec(compile(src,B,"exec"),g)
