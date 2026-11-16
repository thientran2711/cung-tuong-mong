# runswap.py: replace non-allowed huadian motifs (berries/grapes/beads/objects) by a donor flower of the same colour family.
# usage (cwd=work): runswap.py SRC OUT names...   (names: por-<style>-t<T>-a<A>); donor map in SWAP below (recipient style -> donor style, same tier+age)
import sys,os,json,re
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import numpy as np
from PIL import Image
import runpor
from shrink2 import swap
SWAP=json.load(open(os.environ.get('SWAPMAP') or os.path.dirname(os.path.abspath(__file__))+'/swap_map.json'))
def prune_donor(an,fw):
    # keep only the largest cluster of the donor mark (drops detached specks/pendants that would shrink the flower)
    import cv2
    g=an['strong'].astype(np.uint8); gap=max(3,int(0.06*fw))|1
    n,lbl,st,_=cv2.connectedComponentsWithStats(cv2.dilate(g,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(gap,gap))))
    if n>2:
        areas=[(g[lbl==i].sum(),i) for i in range(1,n)]; keep=max(areas)[1]; km=(lbl==keep)
        near=cv2.dilate(km.astype(np.uint8),np.ones((9,9),np.uint8)).astype(bool)
        an=dict(an); an['strong']=an['strong']&km; an['mark']=an['mark']&near; g=an['strong'].astype(np.uint8)
    # step 2: drop pendants (separate small clusters hanging below the flower body)
    g2=max(3,int(0.012*fw))|1
    n2,l2,_,_=cv2.connectedComponentsWithStats(cv2.dilate(g,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(g2,g2))))
    if n2>2:
        ar=[(g[l2==i].sum(),i) for i in range(1,n2)]; mi=max(ar)[1]; mrows=np.nonzero(((l2==mi)&(g>0)).any(1))[0]; mb=mrows.max()
        cy=(mrows.min()+mb)/2; km=np.zeros(g.shape,bool)
        for a_,i in ar:
            rows=np.nonzero(((l2==i)&(g>0)).any(1))[0]
            if i==mi or rows.min()<mb-0.02*fw or rows.mean()<cy: km|=(l2==i)
        near=cv2.dilate(km.astype(np.uint8),np.ones((9,9),np.uint8)).astype(bool)
        an=dict(an); an['strong']=an['strong']&km; an['mark']=an['mark']&near
    return an
def process(path,name,src):
    m=re.match(r'por-(.*)-t(\d)-a(\d+)',name); st,t,a=m.groups()
    rule=SWAP[st]; dn=f'por-{rule.get("by_tier",{}).get(t,rule["donor"])}-t{t}-a{a}'
    info,_,an=runpor.process(path,name,src)
    if an is None or info['status'] in('suspect','nomark'): info['status']='swap_'+info['status']; return info,None
    dinfo,_,dan=runpor.process(f'{src}/{dn}.webp',dn,src)
    if dan is None or dinfo['status'] in('suspect','nomark'): info['status']='swap_nodonor'; return info,None
    dan=prune_donor(dan,dinfo['fw']) if os.environ.get('PRUNE') else dan
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
