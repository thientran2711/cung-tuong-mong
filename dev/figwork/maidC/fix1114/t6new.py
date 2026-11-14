# t6new.py JID : fresh redraw prompt for t6 (11/14 fix: huadian = flat painted gold-leaf mark, no pearl bead, nothing hanging over the forehead)
import sys,subprocess,os,re
H=os.path.dirname(os.path.abspath(__file__))
def prompt(j):
    o=subprocess.run(["python3",H+"/mjobs.py",j],capture_output=True,text=True).stdout.splitlines()
    h,p=o[0],o[1]
    m=re.search(r"Forehead: a huadian ornament between the brows: (.*?) of gold leaf with (.*?) inlay and ONE tiny seed pearl at its centre;",p)
    assert m, j
    p=p.replace(m.group(0),f"Forehead: a PAINTED huadian (a flat makeup mark, not jewellery) between the brows: {m.group(1)} painted in gold leaf and filled with {m.group(2)}, edged with a fine double gold line, one single compact motif;")
    b="the same huadian on all four figures."
    assert b in p
    p=p.replace(b,"the same huadian on all four figures; flat paint only: NO stem, NO line above or below it, NO string, NO chain, NO drop, NO bead, nothing dangling; the headdress has NO forehead chain and NO centre strand, nothing hangs over the forehead.")
    return h,p
if __name__=="__main__":
    for j in sys.argv[1:]:
        h,p=prompt(j); print(h); print(p)
