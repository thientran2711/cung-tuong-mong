# runswap.py: replace non-allowed huadian motifs (berries/grapes/beads/objects) by a donor flower of the same colour family.
# usage (cwd=work): runswap.py SRC OUT names...   (names: por-<style>-t<T>-a<A>); donor map in SWAP below (recipient style -> donor style, same tier+age)
import sys,os,json,re
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import numpy as np
from PIL import Image
import runpor
from shrink2 import swap
SWAP=json.load(open(os.path.dirname(os.path.abspath(__file__))+'/swap_map.json'))
def process(path,name,src):
    m=re.match(r'por-(.*)-t(\d)-a(\d+)',name); st,t,a=m.groups()
    rule=SWAP.get(f'{st}-t{t}') or SWAP[st]; dn=f'por-{rule["donor"]}-t{t}-a{a}'
    info,_,an=runpor.process(path,name,src)
    if an is None or info['status'] in('suspect','nomark'): info['status']='swap_'+info['status']; return info,None
    dinfo,_,dan=runpor.process(f'{src}/{dn}.webp',dn,src)
    if dan is None or dinfo['status'] in('suspect','nomark'): info['status']='swap_nodonor'; return info,None
    out,s=swap(Image.open(path).convert('RGBA'),an,dan,runpor.TARGET); info['status']='swapped'; info['donor']=dn; info['scale']=round(float(s),3)
    info['wsrc']=info['ratio']; return info,out
if __name__=='__main__':
    src,out=sys.argv[1:3]; os.makedirs(out,exist_ok=True)
    for n in sys.argv[3:]:
        try:
            info,im=process(f'{src}/{n}.webp',n,src)
            if im is not None: im.save(f'{out}/{n}.webp','WEBP',quality=90,method=4)
        except Exception as e: info=dict(name=n,status='error',err=repr(e))
        print(json.dumps(info),flush=True)
